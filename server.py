import http.server
import json
import os
import re
import socketserver
import urllib.error
import urllib.parse
import urllib.request

DIRECTORY = os.path.dirname(os.path.abspath(__file__))
PLAYLIST_ID_RE = re.compile(r"^[A-Za-z0-9_-]{10,128}$")
YT_CTX = {
    "client": {
        "clientName": "WEB",
        "clientVersion": "2.20260813.05.00",
        "hl": "en",
        "gl": "IN",
    }
}
ALLOWED_PLAYLIST_IDS = {
    "PLfH-6xXh3waM",  # highway / truck
    "PLDd3GFEUXVbA",  # dhaba
    "PLPo3EhjC8W4A",  # dance 2000s
    "PLEFafAVNRJBo",  # retro 90s
    "PLANlPz-KKq6k",  # anti-depression
    "PLZIT0z5Rfu98",  # fred again
}


def load_dotenv(path):
    if not os.path.isfile(path):
        return
    with open(path, encoding="utf-8") as handle:
        for raw in handle:
            line = raw.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip("'").strip('"')
            os.environ.setdefault(key, value)


load_dotenv(os.path.join(DIRECTORY, ".env"))

PORT = int(os.environ.get("PORT", "3000"))
OWM_API_KEY = os.environ.get("OWM_API_KEY", "").strip()
WEATHER_LAT = os.environ.get("WEATHER_LAT", "28.6139")
WEATHER_LON = os.environ.get("WEATHER_LON", "77.2090")
WEATHER_CITY = os.environ.get("WEATHER_CITY", "दिल्ली")


def _innertube(endpoint, payload):
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"https://www.youtube.com/youtubei/v1/{endpoint}?prettyPrint=false",
        data=data,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
            ),
            "Content-Type": "application/json",
            "Accept-Language": "en-US,en;q=0.9",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode("utf-8", "replace"))


def _text_of(node):
    if node is None:
        return ""
    if isinstance(node, str):
        return node
    if isinstance(node, dict):
        if "simpleText" in node:
            return node["simpleText"]
        if isinstance(node.get("content"), str):
            return node["content"]
        if "runs" in node:
            return "".join(x.get("text", "") for x in node["runs"])
        if "text" in node:
            return _text_of(node["text"])
    return ""


def _parse_length(renderer):
    raw = renderer.get("lengthSeconds")
    if raw is not None:
        try:
            return int(raw)
        except (TypeError, ValueError):
            pass
    text = _text_of(renderer.get("lengthText"))
    if text and ":" in text:
        parts = text.split(":")
        try:
            total = 0
            for part in parts:
                total = total * 60 + int(part)
            return total
        except ValueError:
            return 0
    return 0


def _cover(video_id):
    return f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg"


def _extract_tracks(node, tracks, tokens):
    if isinstance(node, dict):
        if "playlistVideoRenderer" in node:
            item = node["playlistVideoRenderer"]
            vid = item.get("videoId")
            if vid:
                tracks.append(
                    {
                        "id": vid,
                        "title": _text_of(item.get("title")) or vid,
                        "artist": _text_of(item.get("shortBylineText")),
                        "duration": _parse_length(item),
                        "cover": _cover(vid),
                    }
                )
        if "lockupViewModel" in node:
            lockup = node["lockupViewModel"]
            vid = lockup.get("contentId")
            if isinstance(vid, str) and len(vid) == 11:
                title = vid
                artist = ""
                try:
                    meta = lockup["metadata"]["lockupMetadataViewModel"]
                    title = _text_of(meta.get("title")) or vid
                    rows = (
                        meta.get("metadata", {})
                        .get("contentMetadataViewModel", {})
                        .get("metadataRows")
                        or []
                    )
                    if rows:
                        parts = rows[0].get("metadataParts") or []
                        if parts:
                            artist = _text_of(parts[0].get("text"))
                except (KeyError, TypeError, IndexError):
                    pass
                tracks.append(
                    {
                        "id": vid,
                        "title": title,
                        "artist": artist,
                        "duration": 0,
                        "cover": _cover(vid),
                    }
                )
        if "continuationCommand" in node:
            token = node["continuationCommand"].get("token")
            if token:
                tokens.append(token)
        for value in node.values():
            _extract_tracks(value, tracks, tokens)
    elif isinstance(node, list):
        for value in node:
            _extract_tracks(value, tracks, tokens)


def _playlist_title(data):
    meta = data.get("metadata") or {}
    renderer = meta.get("playlistMetadataRenderer") if isinstance(meta, dict) else None
    if renderer:
        return renderer.get("title") or ""
    header = data.get("header") or {}
    if isinstance(header, dict):
        page = header.get("pageHeaderRenderer") or {}
        return page.get("pageTitle") or ""
    return ""


def fetch_youtube_playlist(playlist_id):
    tracks = []
    seen = set()

    def absorb(batch):
        for track in batch:
            vid = track.get("id")
            if vid and vid not in seen:
                seen.add(vid)
                tracks.append(track)

    data = _innertube("browse", {"context": YT_CTX, "browseId": "VL" + playlist_id})
    batch, tokens = [], []
    _extract_tracks(data, batch, tokens)
    absorb(batch)
    title = _playlist_title(data)

    guard = 0
    while tokens and guard < 20:
        guard += 1
        token = tokens.pop(0)
        more = _innertube("browse", {"context": YT_CTX, "continuation": token})
        batch, more_tokens = [], []
        _extract_tracks(more, batch, more_tokens)
        absorb(batch)
        tokens.extend(more_tokens)

    return {"id": playlist_id, "title": title, "tracks": tracks}


def _parse_coord(query, key, default, lo, hi):
    raw = (query.get(key) or [None])[0]
    if raw is None:
        return float(default)
    try:
        value = float(raw)
    except (TypeError, ValueError):
        return float(default)
    if value < lo or value > hi:
        return float(default)
    return value


def fetch_weather(lat=None, lon=None):
    if not OWM_API_KEY:
        return None
    params = urllib.parse.urlencode(
        {
            "lat": WEATHER_LAT if lat is None else lat,
            "lon": WEATHER_LON if lon is None else lon,
            "appid": OWM_API_KEY,
            "units": "metric",
        }
    )
    url = f"https://api.openweathermap.org/data/2.5/weather?{params}"
    req = urllib.request.Request(url, headers={"User-Agent": "RelaxZone/1.0"})
    with urllib.request.urlopen(req, timeout=12) as resp:
        return json.loads(resp.read().decode("utf-8", "replace"))


class RadioHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def _json(self, payload, status=200):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        query = urllib.parse.parse_qs(parsed_url.query)

        if path == "/api/playlist":
            raw = (query.get("list") or [""])[0].strip()
            if not PLAYLIST_ID_RE.match(raw) or raw not in ALLOWED_PLAYLIST_IDS:
                self._json({"error": "unknown playlist", "tracks": []}, 400)
                return
            try:
                self._json(fetch_youtube_playlist(raw))
            except urllib.error.HTTPError as err:
                self._json({"error": f"youtube HTTP {err.code}", "tracks": []}, 502)
            except Exception as err:
                self._json({"error": str(err), "tracks": []}, 502)
            return

        if path == "/api/weather":
            lat = _parse_coord(query, "lat", WEATHER_LAT, -90, 90)
            lon = _parse_coord(query, "lon", WEATHER_LON, -180, 180)
            try:
                data = fetch_weather(lat, lon)
            except Exception as err:
                self._json({"error": str(err)}, 502)
                return
            if not data:
                self._json({"error": "weather unavailable", "name": WEATHER_CITY}, 503)
                return
            self._json(data)
            return

        if path == "/api/wallpapers":
            genre_id = os.path.basename((query.get("genre") or ["highway"])[0])
            genre_dir = os.path.join(DIRECTORY, "images", genre_id)
            wallpapers = []
            valid_extensions = (".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif")
            if os.path.isdir(genre_dir):
                for filename in sorted(os.listdir(genre_dir)):
                    if filename.lower().endswith(valid_extensions):
                        wallpapers.append(f"images/{genre_id}/{filename}")
            self._json({"genre": genre_id, "wallpapers": wallpapers})
            return

        return super().do_GET()


if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), RadioHandler) as httpd:
        print(f"RelaxZone running at http://localhost:{PORT}")
        httpd.serve_forever()
