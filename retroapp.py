import json
import os
import urllib.parse
import urllib.request

import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(
    page_title="हॉर्न ओके प्लीज — हिंदी हाईवे रेडियो",
    page_icon="🚛",
    layout="wide",
    initial_sidebar_state="collapsed",
)

st.markdown(
    """
<style>
  #MainMenu, footer, header,
  [data-testid="stToolbar"],
  [data-testid="stDecoration"],
  [data-testid="stStatusWidget"],
  [data-testid="stHeader"],
  [data-testid="stSidebar"],
  [data-testid="collapsedControl"],
  [data-testid="stBottomBlockContainer"],
  [class*="viewerBadge"],
  a[href="https://streamlit.io"],
  a[href*="streamlit.io"] {
    visibility: hidden !important;
    height: 0 !important;
    min-height: 0 !important;
    display: none !important;
    pointer-events: none !important;
  }
  .block-container,
  [data-testid="block-container"],
  [data-testid="stAppViewContainer"],
  [data-testid="stAppViewContainer"] > section,
  [data-testid="stVerticalBlock"],
  [data-testid="stVerticalBlockBorderWrapper"] {
    padding: 0 !important;
    margin: 0 !important;
    max-width: 100% !important;
    gap: 0 !important;
  }
  iframe {
    border: none !important;
    width: 100vw !important;
    height: 100vh !important;
    display: block !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
  }
  html, body { overflow: hidden !important; }
</style>
""",
    unsafe_allow_html=True,
)

APP_DIR = os.path.dirname(os.path.abspath(__file__))


def _secret(name, default=""):
    try:
        return st.secrets[name]
    except Exception:
        return os.environ.get(name, default)


def bootstrap_weather():
    key = _secret("OWM_API_KEY", "").strip()
    if not key:
        return None
    lat = _secret("WEATHER_LAT", "28.6139")
    lon = _secret("WEATHER_LON", "77.2090")
    params = urllib.parse.urlencode(
        {"lat": lat, "lon": lon, "appid": key, "units": "metric"}
    )
    url = f"https://api.openweathermap.org/data/2.5/weather?{params}"
    req = urllib.request.Request(url, headers={"User-Agent": "RelaxZone/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            return json.loads(resp.read().decode("utf-8", "replace"))
    except Exception:
        return None


@st.cache_data(ttl=1800, show_spinner=False)
def bootstrap_tracks():
    from server import STATION_PLAYLISTS, fetch_youtube_playlist

    tracks = {}
    for station_id, playlist_id in STATION_PLAYLISTS.items():
        try:
            data = fetch_youtube_playlist(playlist_id)
            tracks[station_id] = data.get("tracks") or []
        except Exception:
            tracks[station_id] = []
    return tracks


def load_app_html() -> str:
    with open(os.path.join(APP_DIR, "index.html"), encoding="utf-8") as handle:
        html = handle.read()
    with open(os.path.join(APP_DIR, "style.css"), encoding="utf-8") as handle:
        css = handle.read()
    with open(os.path.join(APP_DIR, "app.js"), encoding="utf-8") as handle:
        js = handle.read()

    bootstrap = {
        "tracks": bootstrap_tracks(),
        "weather": bootstrap_weather(),
    }
    payload = json.dumps(bootstrap, ensure_ascii=False).replace("<", "\\u003c")

    html = html.replace(
        '<link rel="stylesheet" href="style.css" />',
        f"<style>\n{css}\n</style>",
    )
    html = html.replace(
        '<script src="app.js"></script>',
        f"<script>window.BOOTSTRAP = {payload};</script>\n<script>\n{js}\n</script>",
    )
    return html


components.html(load_app_html(), height=10000, scrolling=False)
