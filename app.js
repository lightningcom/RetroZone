/* ============================================================
   हॉर्न ओके प्लीज — App Engine
   Architecture directly based on hornokplease.xyz
   - YouTube playback from each station's playlist ID
   - 60fps rAF seek bar with extrapolation
   - 6 Curated Radio Stations (Highway, Dhaba, 2000s Dance, 90s Retro, Anti-Depression, Fred again..)
   - Synthesised Indian Truck Horn
   ============================================================ */

const STATIONS = {
  highway: {
    id: "highway",
    name: "ऑन द हाईवे",
    freq: "FM 98.4",
    logoLine1: "हाईवे",
    logoLine2: "वाला रेडियो",
    playlistId: "PLfH-6xXh3waM",
    icon: "🚛",
    tag: "90s Bangers",
    slogans: [
      "बुरी नज़र वाले तेरा मुंह काला",
      "सफर खूबसूरत है मंजिल से भी",
      "जब वी मेट हाईवे पर, तब हुई बात दिल की",
      "फिर मिलेंगे — हाईवे वाला रेडियो",
      "हंस मत पगली, प्यार हो जाएगा",
      "दम है तो क्रॉस कर, नहीं तो बर्दाश्त कर",
      "धीरे चलोगे तो बार-बार मिलोगे, तेज चलोगे तो हरिद्वार मिलोगे",
      "हॉर्न ओके प्लीज — प्यार का पासवर्ड",
      "माल गाड़ी है, दिल पत्थर नहीं",
      "आगे देखो, पीछे मोहब्बत छोड़ दो",
      "ओवरटेक से प्यार, अकड़ से किनारा",
      "रात की हाईवे, दिल की कहानी",
      "क्लच मत छोड़ना, हिम्मत मत हारना",
      "रास्ते बदलते हैं, गाने नहीं"
    ],
    wallpapers: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"
    ]
  },
  dhaba: {
    id: "dhaba",
    name: "ढाबा सूफ़ियाना",
    freq: "FM 91.1",
    logoLine1: "ढाबा",
    logoLine2: "सूफ़ियाना",
    playlistId: "PLDd3GFEUXVbA",
    icon: "❄️",
    tag: "Sufi & Qawwali",
    slogans: [
      "सर्द हवा, कुल्हड़ की चाय और सूफ़ी की धुन",
      "ढाबे की आग, दिल का सुकून",
      "बर्फ़ीली रात में सूफ़ी नगमे",
      "ढाबे पर रुको, गज़ल सुनो",
      "यहाँ आत्मा को सुकून मिलता है",
      "आलू पराठा, अदरक चाय, पुराना तराना",
      "कव्वाली की गूंज, तवे की सीटी",
      "सुबह की पहली चाय यहीं रुकती है",
      "नूर है आवाज़ में, नमक है दाल में",
      "ट्रक नीचे, कुल्हड़ हाथ में",
      "यहाँ वक्त रुकता है, दिल चलता है",
      "सूफ़ी का सुर, ढाबे का धुआँ",
      "रात का पड़ाव, दिल का ठिकाना"
    ],
    wallpapers: [
      "https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1548777123-e216912df7f8?auto=format&fit=crop&w=1920&q=80"
    ]
  },
  dance2000: {
    id: "dance2000",
    name: "२०००s डांस धमाका",
    freq: "FM 102.5",
    logoLine1: "२०००s",
    logoLine2: "डांस धमाका",
    playlistId: "PLPo3EhjC8W4A",
    icon: "💿",
    tag: "Party Hits",
    slogans: [
      "रात के दो बजे डिस्को चलता है",
      "नाचो! यही वक्त है",
      "२०००s की याद दिला दी",
      "पार्टी अभी बाकी है",
      "डीजे वाला बाबू, बजा दे धमाका",
      "फुल मस्ती, नो ब्रेक",
      "शेक इट लाइक २००४",
      "इत्तेफाक से फ्लोर मिल गया",
      "वो वाला नशा, वो वाला बीट",
      "लाउड, प्राउड, २०००s",
      "आइटम नंबर ऑन, दिल ऑफ",
      "बॉलीवुड डांस फ्लोर चालू"
    ],
    wallpapers: [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80"
    ]
  },
  retro90s: {
    id: "retro90s",
    name: "९०s नॉस्टैल्जिया",
    freq: "FM 88.0",
    logoLine1: "नब्बे का",
    logoLine2: "दशक",
    playlistId: "PLEFafAVNRJBo",
    icon: "📼",
    tag: "Golden Melodies",
    slogans: [
      "कुमार सानू की आवाज़, ९०s का नशा",
      "वो दिन भी क्या दिन थे",
      "रेट्रो वाइब्स, दिल के करीब",
      "नब्बे के नगमे, दिल के सगे",
      "कैसेट पलटो, यादें लौट आओ",
      "डीडी पर विज्ञापन, दिल में गाना",
      "वॉकमैन ऑन, दुनिया ऑफ",
      "अलका-सानू का ज़माना",
      "एक बार और, वही पुराना लिरिक",
      "टेप घिसी, भावना नई",
      "गाँव की बस, शहर का गाना",
      "नब्बे का दशक, दिल का पता"
    ],
    wallpapers: [
      "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1920&q=80"
    ]
  },
  antidepression: {
    id: "antidepression",
    name: "एंटी-डिप्रेशन",
    freq: "FM 94.3",
    logoLine1: "मन की",
    logoLine2: "शांति",
    playlistId: "PLANlPz-KKq6k",
    icon: "🌿",
    tag: "Soul Healing",
    slogans: [
      "साँस लो, सुनो, शांत हो जाओ",
      "यह धुन तुम्हारे साथ है",
      "अकेले नहीं हो, हम हैं",
      "मन को चैन दो, दिल को सुकून",
      "आज बस इतना काफी है",
      "रोशनी धीरे-धीरे आती है",
      "तुम ठीक हो, बस थक गए हो",
      "यह रात भी गुज़र जाएगी",
      "कंधे पर कोई गाना रख दो",
      "धीरे-धीरे सब सँवरता है",
      "दिल को छुट्टी दो",
      "यहाँ जल्दबाज़ी मना है"
    ],
    wallpapers: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80"
    ]
  },
  fredagain: {
    id: "fredagain",
    name: "फ्रेड अगेन...",
    freq: "FM 106.8",
    logoLine1: "फ्रेड",
    logoLine2: "अगेन...",
    playlistId: "PLZIT0z5Rfu98",
    icon: "⚡",
    tag: "Electronic",
    slogans: [
      "Feel it. Live it. Fred again.",
      "Dance like nobody's watching",
      "Emotional, electronic, alive",
      "The beat that finds your soul",
      "Again, again, again",
      "City lights, analog heart",
      "Turn it up, then turn it in",
      "रात देर है, बीट करीब है",
      "Late night, loud feelings",
      "Levitating on a long drive",
      "4/4 पर दिल बैठ जाता है",
      "Keep going — Fred again.."
    ],
    wallpapers: [
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80"
    ]
  }
};

const STATION_ORDER = ["highway", "dhaba", "dance2000", "retro90s", "antidepression", "fredagain"];

// ------------------------------------------------------------
// 2. STATE VARIABLES
// ------------------------------------------------------------
const $ = (id) => document.getElementById(id);

const el = {
  player: $('player-pill'),
  disc: $('disc'),
  discImg: $('disc-img'),
  title: $('track-title'),
  artist: $('track-artist'),
  seek: $('seek-bar'),
  seekFill: $('seek-fill'),
  seekKnob: $('seek-knob'),
  tCur: $('time-cur'),
  tTot: $('time-tot'),
  play: $('play-btn'),
  prev: $('prev-btn'),
  next: $('next-btn'),
  shuffle: $('shuffle-btn'),
  listBtn: $('list-btn'),
  list: $('playlist-panel'),
  listItems: $('track-list'),
  stationsBtn: $('stations-btn'),
  genrePanel: $('genre-panel'),
  genreGrid: $('genre-grid'),
  genreHint: $('genre-hint'),
  clock: $('clock'),
  weatherTemp: $('weather-temp'),
  weatherIcon: $('weather-icon'),
  weatherCity: $('weather-city'),
  presenceText: $('presence-text'),
  bumperText: $('bumper-text'),
  bumperNext: $('bumper-next'),
  hornBtn: $('horn-btn'),
  logo: $('logo'),
  logoLine1: $('logo-line1'),
  logoLine2: $('logo-line2'),
  ytLink: $('yt-link'),
  listYtLink: $('list-yt-link')
};

let currentGenre = "highway";
const state = {
  tracks: [],
  order: [],
  pos: 0,
  shuffle: true,
  ready: false,
  playing: false,
  started: false,
  wantPlay: false,
  scrubbing: false,
  epoch: 0,
  boundListId: ''
};

let yt = null;
let sloganTimer = null;
let currentSloganIdx = 0;
let audioCtx = null;

// ------------------------------------------------------------
// 3. HELPERS
// ------------------------------------------------------------
const fmtTime = (s) => {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
};

function playlistIdOf(station) {
  if (!station) return '';
  return station.playlistId || '';
}

function playlistUrlOf(station) {
  const id = playlistIdOf(station);
  return id ? `https://www.youtube.com/playlist?list=${id}` : '#';
}

function trackFromId(id, fallback = {}) {
  const station = STATIONS[currentGenre];
  return {
    id,
    title: fallback.title || 'YouTube',
    artist: fallback.artist || (station && station.name) || '',
    duration: fallback.duration || 0,
    cover: fallback.cover || `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  };
}

function applyTracks(tracks) {
  state.tracks = tracks;
  state.order = buildOrder();
  if (state.pos >= state.order.length) state.pos = 0;
  renderList();
  renderTrack();
}

function videoIdsInPlayOrder() {
  return state.order.map((i) => state.tracks[i] && state.tracks[i].id).filter(Boolean);
}

function playerMatchesStation() {
  if (!yt) return false;
  const expected = new Set(state.tracks.map((t) => t.id));
  try {
    const vid = yt.getVideoData?.()?.video_id;
    const ids = yt.getPlaylist?.() || [];
    if (!expected.size) return ids.length > 0 || Boolean(vid);
    if (vid && expected.has(vid)) return true;
    if (!ids.length) return false;
    const hits = ids.filter((id) => expected.has(id)).length;
    return hits >= Math.min(2, expected.size) || hits / ids.length >= 0.5;
  } catch (_) {
    return false;
  }
}

async function loadTracksForStation(station, epoch) {
  const listId = playlistIdOf(station);
  el.title.textContent = 'प्लेलिस्ट लोड हो रही है...';
  el.artist.textContent = station.name;
  if (!listId) {
    if (epoch === state.epoch) applyTracks([]);
    return;
  }
  const boot = window.BOOTSTRAP && window.BOOTSTRAP.tracks && window.BOOTSTRAP.tracks[station.id];
  if (Array.isArray(boot) && boot.length) {
    if (epoch === state.epoch) applyTracks(boot);
    return;
  }
  try {
    const res = await fetch(`/api/playlist?list=${encodeURIComponent(listId)}`);
    if (epoch !== state.epoch) return;
    if (res.ok) {
      const data = await res.json();
      if (epoch !== state.epoch) return;
      if (Array.isArray(data.tracks) && data.tracks.length) {
        applyTracks(data.tracks);
        return;
      }
    }
  } catch (err) {
    console.warn('Playlist fetch failed:', err);
  }
  if (epoch === state.epoch) applyTracks([]);
}

function cueOrLoadStationPlaylist(autoPlay) {
  if (!yt) return;
  const listId = playlistIdOf(STATIONS[currentGenre]);
  const ids = videoIdsInPlayOrder();
  state.boundListId = listId;
  try { yt.stopVideo?.(); } catch (_) {}
  try {
    if (ids.length) {
      if (autoPlay) {
        state.started = true;
        state.wantPlay = true;
        enableBackgroundPlayback();
        yt.loadPlaylist(ids, 0);
      } else {
        yt.cuePlaylist(ids, 0);
      }
      return;
    }
    if (!listId) return;
    const opts = { listType: 'playlist', list: listId, index: 0 };
    if (autoPlay) {
      state.started = true;
      state.wantPlay = true;
      enableBackgroundPlayback();
      yt.loadPlaylist(opts);
    } else {
      yt.cuePlaylist(opts);
    }
  } catch (err) {
    console.warn('Could not load YouTube playlist:', err);
  }
}

function hydrateCurrentFromPlayer() {
  if (!yt) return;
  try {
    const data = yt.getVideoData?.() || {};
    if (data.video_id && !state.tracks.some((t) => t.id === data.video_id)) return;
    const t = currentTrack();
    if (!t) return;
    if (data.title) t.title = data.title;
    if (data.author) t.artist = data.author;
    const dur = yt.getDuration?.();
    if (dur) t.duration = Math.round(dur);
  } catch (_) {}
}

function syncFromPlayer() {
  if (!yt || !playerMatchesStation()) return;
  const ids = typeof yt.getPlaylist === 'function' ? yt.getPlaylist() : [];
  const byId = Object.fromEntries(state.tracks.map((t) => [t.id, t]));
  if (Array.isArray(ids) && ids.length) {
    const next = ids.map((id) => byId[id]).filter(Boolean);
    if (next.length) {
      state.tracks = next;
      state.order = next.map((_, i) => i);
    }
    const idx = yt.getPlaylistIndex?.();
    if (Number.isInteger(idx) && idx >= 0 && idx < state.order.length) state.pos = idx;
  } else {
    const vid = yt.getVideoData?.()?.video_id;
    const trackIdx = state.tracks.findIndex((t) => t.id === vid);
    if (trackIdx >= 0) {
      const orderIdx = state.order.indexOf(trackIdx);
      state.pos = orderIdx >= 0 ? orderIdx : trackIdx;
    }
  }
  hydrateCurrentFromPlayer();
  renderList();
  renderTrack();
}

function shuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildOrder() {
  const seq = Array.from({ length: state.tracks.length }, (_, i) => i);
  return state.shuffle ? shuffleArr([...seq]) : seq;
}

const currentTrack = () => state.tracks[state.order[state.pos]] || state.tracks[0];

const ambianceCache = new Map();
let ambianceToken = 0;

function thumbOf(track, kind = 'mqdefault') {
  if (track && track.id) return `https://i.ytimg.com/vi/${track.id}/${kind}.jpg`;
  return (track && track.cover) || '';
}

function rgbaStr(r, g, b, a) {
  return `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${a})`;
}

function rgbStr(r, g, b) {
  return `rgb(${r | 0}, ${g | 0}, ${b | 0})`;
}

function mixToward(r, g, b, tr, tg, tb, t) {
  return [r + (tr - r) * t, g + (tg - g) * t, b + (tb - b) * t];
}

function saturateRgb(r, g, b, amount) {
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return [
    Math.max(0, Math.min(255, luma + (r - luma) * amount)),
    Math.max(0, Math.min(255, luma + (g - luma) * amount)),
    Math.max(0, Math.min(255, luma + (b - luma) * amount))
  ];
}

function paletteFromImage(img) {
  const w = 48;
  const h = 48;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;
  const buckets = new Map();
  for (let y = 4; y < h - 4; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const i = (y * w + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      if (luma < 18 || luma > 248) continue;
      const sat = max === 0 ? 0 : (max - min) / max;
      if (sat < 0.05 && luma < 50) continue;
      const key = `${r >> 4},${g >> 4},${b >> 4}`;
      const cur = buckets.get(key) || { r: 0, g: 0, b: 0, n: 0, sat: 0 };
      cur.r += r;
      cur.g += g;
      cur.b += b;
      cur.n += 1;
      cur.sat += sat;
      buckets.set(key, cur);
    }
  }
  const ranked = [...buckets.values()]
    .map((c) => ({
      r: c.r / c.n,
      g: c.g / c.n,
      b: c.b / c.n,
      n: c.n,
      sat: c.sat / c.n
    }))
    .sort((a, b) => (b.n * (0.35 + b.sat)) - (a.n * (0.35 + a.sat)));
  if (!ranked.length) return null;
  const c1 = ranked[0];
  const c2 = ranked.find((c, i) => i > 0 && Math.abs(c.r - c1.r) + Math.abs(c.g - c1.g) + Math.abs(c.b - c1.b) > 80) || ranked[Math.min(1, ranked.length - 1)];
  const c3 = ranked.find((c, i) => i > 0 && c !== c2 && Math.abs(c.r - c1.r) + Math.abs(c.g - c1.g) + Math.abs(c.b - c1.b) > 50) || ranked[Math.min(2, ranked.length - 1)];
  const v1 = saturateRgb(c1.r, c1.g, c1.b, 1.7);
  const v2 = saturateRgb(c2.r, c2.g, c2.b, 1.5);
  const v3 = saturateRgb(c3.r, c3.g, c3.b, 1.45);
  const deep = mixToward(v1[0], v1[1], v1[2], 8, 10, 16, 0.74);
  const mid = mixToward(v1[0], v1[1], v1[2], 12, 16, 24, 0.58);
  const bot = mixToward(v3[0], v3[1], v3[2], 6, 8, 12, 0.8);
  return {
    a: rgbaStr(v1[0], v1[1], v1[2], 0.78),
    b: rgbaStr(v2[0], v2[1], v2[2], 0.62),
    c: rgbaStr(v3[0], v3[1], v3[2], 0.55),
    top: rgbStr(deep[0], deep[1], deep[2]),
    mid: rgbStr(mid[0], mid[1], mid[2]),
    bot: rgbStr(bot[0], bot[1], bot[2])
  };
}

function applyPalette(palette) {
  if (!palette) return;
  const root = document.body;
  root.style.setProperty('--wash-a', palette.a);
  root.style.setProperty('--wash-b', palette.b);
  root.style.setProperty('--wash-c', palette.c);
  root.style.setProperty('--wash-top', palette.top);
  root.style.setProperty('--wash-mid', palette.mid);
  root.style.setProperty('--wash-bot', palette.bot);
}

function loadAmbianceImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function applyTrackAmbiance(track) {
  const bloom = document.getElementById('bg-bloom');
  if (!track || !track.id) {
    if (bloom) {
      bloom.style.backgroundImage = '';
      bloom.classList.remove('is-on');
    }
    return;
  }
  const token = ++ambianceToken;
  const bloomUrl = thumbOf(track, 'mqdefault');
  if (bloom) {
    bloom.style.backgroundImage = `url("${bloomUrl}")`;
    bloom.classList.add('is-on');
  }
  if (ambianceCache.has(track.id)) {
    applyPalette(ambianceCache.get(track.id));
    return;
  }
  const encoded = encodeURIComponent(`https://i.ytimg.com/vi/${track.id}/mqdefault.jpg`);
  const sources = [
    `https://wsrv.nl/?url=${encoded}&w=64&h=64&output=jpg`,
    `https://images.weserv.nl/?url=${encoded}&w=64&h=64&output=jpg`,
    thumbOf(track, 'mqdefault')
  ];
  for (const src of sources) {
    try {
      const img = await loadAmbianceImage(src);
      if (token !== ambianceToken) return;
      const palette = paletteFromImage(img);
      if (!palette) continue;
      ambianceCache.set(track.id, palette);
      applyPalette(palette);
      return;
    } catch (_) {}
  }
}

// ------------------------------------------------------------
// 4. RENDERING & UI SYNC
// ------------------------------------------------------------
function renderTrack() {
  const t = currentTrack();
  if (!t) return;

  el.player.classList.add('is-swapping');
  setTimeout(() => el.player.classList.remove('is-swapping'), 180);

  el.title.textContent = t.title;
  el.artist.textContent = t.artist;
  el.discImg.src = t.cover;
  el.discImg.alt = `${t.title} artwork`;

  [...el.listItems.children].forEach((li, i) =>
    li.classList.toggle('active', i === state.pos)
  );
  
  const active = el.listItems.children[state.pos];
  if (active && el.list.classList.contains('is-open')) {
    active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  updateMediaSession();
  applyTrackAmbiance(t);
}

function renderList() {
  el.listItems.replaceChildren();
  if (!state.order.length) {
    const empty = document.createElement('li');
    empty.className = 'list__item list__empty';
    empty.textContent = 'इस प्लेलिस्ट में अभी गाने नहीं हैं';
    el.listItems.appendChild(empty);
    return;
  }
  state.order.forEach((trackIdx, i) => {
    const t = state.tracks[trackIdx];
    if (!t) return;
    const li = document.createElement('li');
    li.className = 'list__item' + (i === state.pos ? ' active' : '');

    const num = document.createElement('span');
    num.className = 'item-num';
    num.textContent = String(i + 1);

    const info = document.createElement('div');
    info.className = 'item-info';
    const title = document.createElement('span');
    title.className = 'item-title';
    title.textContent = t.title || '';
    const artist = document.createElement('span');
    artist.className = 'item-artist';
    artist.textContent = t.artist || '';
    info.append(title, artist);

    const dur = document.createElement('span');
    dur.className = 'item-dur';
    dur.textContent = fmtTime(t.duration);

    li.append(num, info, dur);
    li.addEventListener('click', () => {
      ensureAudio();
      go(i);
    });
    el.listItems.appendChild(li);
  });
}

function renderPlaying(on) {
  state.playing = on;
  el.player.classList.toggle('is-playing', on);
  const iconPlay = document.querySelector('.icon-play');
  const iconPause = document.querySelector('.icon-pause');
  if (iconPlay) iconPlay.style.display = on ? 'none' : '';
  if (iconPause) iconPause.style.display = on ? '' : 'none';
  el.play.setAttribute('aria-label', on ? 'Pause' : 'Play');
}

// ------------------------------------------------------------
// 5. PLAYBACK ACTIONS
// ------------------------------------------------------------
function go(newPos) {
  const n = state.order.length;
  if (!n) return;
  state.pos = ((newPos % n) + n) % n;
  renderTrack();
  if (!yt) return;
  state.started = true;
  state.wantPlay = true;
  enableBackgroundPlayback();
  const ids = videoIdsInPlayOrder();
  if (ids.length && playerMatchesStation() && typeof yt.playVideoAt === 'function') {
    yt.playVideoAt(state.pos);
  } else if (ids.length) {
    yt.loadPlaylist(ids, state.pos);
  } else if (currentTrack()) {
    yt.loadVideoById(currentTrack().id);
  }
}

function toggle() {
  ensureAudio();
  if (!yt || !state.ready) return;
  if (state.playing || state.wantPlay) {
    state.wantPlay = false;
    disableBackgroundPlayback();
    yt.pauseVideo();
  } else {
    state.started = true;
    state.wantPlay = true;
    enableBackgroundPlayback();
    yt.playVideo();
  }
}

// ------------------------------------------------------------
// 6. 60FPS PROGRESS LOOP WITH EXTRAPOLATION
// ------------------------------------------------------------
const poll = { at: 0, time: 0, duration: 0 };
let lastSecond = -1;
let lastDuration = -1;

function samplePlayer() {
  if (!yt || typeof yt.getCurrentTime !== 'function') return;
  poll.time = yt.getCurrentTime() || 0;
  poll.duration = yt.getDuration() || 0;
  poll.at = performance.now();
}

function paintProgress() {
  requestAnimationFrame(paintProgress);
  if (!yt || state.scrubbing || !poll.duration) return;

  const drift = state.playing ? (performance.now() - poll.at) / 1000 : 0;
  const cur = Math.min(poll.duration, poll.time + drift);
  const frac = Math.min(1, Math.max(0, cur / poll.duration));

  el.seekFill.style.transform = `scaleX(${frac})`;
  el.seekKnob.style.transform = `translate(-50%, -50%) translateX(${frac * el.seek.clientWidth}px)`;

  const second = Math.floor(cur);
  if (second !== lastSecond) {
    lastSecond = second;
    el.tCur.textContent = fmtTime(cur);
    el.seek.setAttribute('aria-valuenow', String(Math.round(frac * 100)));
  }
  if (poll.duration !== lastDuration) {
    lastDuration = poll.duration;
    el.tTot.textContent = fmtTime(poll.duration);
  }
}

// ------------------------------------------------------------
// 7. SEEKING
// ------------------------------------------------------------
function fractionFromEvent(e) {
  const r = el.seek.getBoundingClientRect();
  return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
}

function previewSeek(frac) {
  el.seekFill.style.transform = `scaleX(${frac})`;
  el.seekKnob.style.transform = `translate(-50%, -50%) translateX(${frac * el.seek.clientWidth}px)`;
  if (yt && typeof yt.getDuration === 'function') {
    el.tCur.textContent = fmtTime((yt.getDuration() || 0) * frac);
  }
}

el.seek.addEventListener('pointerdown', (e) => {
  if (!yt) return;
  state.scrubbing = true;
  el.seek.setPointerCapture(e.pointerId);
  previewSeek(fractionFromEvent(e));
});

el.seek.addEventListener('pointermove', (e) => {
  if (state.scrubbing) previewSeek(fractionFromEvent(e));
});

el.seek.addEventListener('pointerup', (e) => {
  if (!state.scrubbing) return;
  state.scrubbing = false;
  el.seek.releasePointerCapture(e.pointerId);
  const dur = yt?.getDuration?.() || 0;
  if (dur) yt.seekTo(dur * fractionFromEvent(e), true);
  samplePlayer();
});

// ------------------------------------------------------------
// 8. YOUTUBE IFRAME BOOT (Guaranteed Playback)
// ------------------------------------------------------------
function preferAudio() {
  try {
    yt?.setPlaybackQuality?.('tiny');
  } catch (_) {}
}

// Same-origin top window (Streamlit wraps us in a srcdoc iframe that phones freeze).
function mediaWin() {
  try {
    void window.top.document.body;
    return window.top;
  } catch (_) {}
  try {
    void window.parent.document.body;
    return window.parent;
  } catch (_) {}
  return window;
}

const SILENT_WAV =
  'data:audio/wav;base64,UklGRiQCAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';

function markIframesAllowPlayback(doc) {
  const allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture; accelerometer';
  try {
    doc.querySelectorAll('iframe').forEach((frame) => {
      const current = frame.getAttribute('allow') || '';
      if (!current.includes('autoplay')) {
        frame.setAttribute('allow', current ? `${current}; ${allow}` : allow);
      }
      frame.setAttribute('allowfullscreen', '');
    });
  } catch (_) {}
}

function unlockEmbeddedPlayback() {
  const w = mediaWin();
  try {
    if (w.navigator.audioSession) w.navigator.audioSession.type = 'playback';
  } catch (_) {}
  try {
    if (navigator.audioSession) navigator.audioSession.type = 'playback';
  } catch (_) {}
  markIframesAllowPlayback(document);
  try { markIframesAllowPlayback(w.document); } catch (_) {}
  try {
    const frame = window.frameElement;
    if (frame) {
      frame.setAttribute('allow', 'autoplay; encrypted-media; fullscreen; picture-in-picture');
      frame.setAttribute('allowfullscreen', '');
    }
  } catch (_) {}
  try {
    const iframe = yt?.getIframe?.();
    if (iframe) {
      iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen; picture-in-picture');
      iframe.setAttribute('playsinline', '1');
      iframe.setAttribute('webkit-playsinline', '1');
    }
  } catch (_) {}
}

function ensureParentAudio() {
  const w = mediaWin();
  if (w.__hzAudio) return w.__hzAudio;
  const audio = w.document.createElement('audio');
  audio.setAttribute('playsinline', 'true');
  audio.setAttribute('webkit-playsinline', 'true');
  audio.setAttribute('preload', 'auto');
  audio.loop = true;
  audio.src = SILENT_WAV;
  audio.volume = 1;
  audio.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0.01;left:0;bottom:0;pointer-events:none;';
  w.document.body.appendChild(audio);
  w.__hzAudio = audio;
  return audio;
}

function armBackgroundAudio() {
  unlockEmbeddedPlayback();
  const audio = ensureParentAudio();
  try {
    const play = audio.play();
    if (play && play.catch) play.catch(() => {});
  } catch (_) {}
  try { audioCtx?.resume?.(); } catch (_) {}
}

function installParentKeepAlive() {
  const w = mediaWin();
  if (w.__hzTimer) return;
  try {
    w.__hzKeepAliveFn = w.Function(
      'try{if(window.__hzWant&&window.__hzYt&&window.__hzYt.playVideo){var s=window.__hzYt.getPlayerState();if(s!==1&&s!==3)window.__hzYt.playVideo()}var a=window.__hzAudio;if(window.__hzWant&&a&&a.paused){var p=a.play();if(p&&p.catch)p.catch(function(){})}if(window.navigator&&window.navigator.audioSession)window.navigator.audioSession.type="playback"}catch(e){}'
    );
    w.__hzTimer = w.setInterval(w.__hzKeepAliveFn, 1200);
  } catch (_) {
    w.__hzTimer = w.setInterval(() => {
      try {
        if (w.__hzWant && w.__hzYt && w.__hzYt.playVideo) {
          const status = w.__hzYt.getPlayerState();
          if (status !== 1 && status !== 3) w.__hzYt.playVideo();
        }
      } catch (__) {}
    }, 1200);
  }
}

function pageIsHidden() {
  try {
    if (mediaWin().document.hidden) return true;
  } catch (_) {}
  return document.hidden === true;
}

function resumeWantedPlayback() {
  if (!state.wantPlay || !yt || !state.ready) return;
  const w = mediaWin();
  w.__hzWant = true;
  w.__hzYt = yt;
  unlockEmbeddedPlayback();
  armBackgroundAudio();
  try {
    const status = yt.getPlayerState?.();
    const S = (w.YT && w.YT.PlayerState) || (window.YT && window.YT.PlayerState);
    if (!S || status === S.PAUSED || status === S.CUED || status === S.UNSTARTED || status === -1) {
      yt.playVideo();
    }
  } catch (_) {}
}

function enableBackgroundPlayback() {
  const w = mediaWin();
  w.__hzWant = true;
  w.__hzYt = yt;
  armBackgroundAudio();
  installParentKeepAlive();
  updateMediaSession();
}

function disableBackgroundPlayback() {
  const w = mediaWin();
  w.__hzWant = false;
  try {
    const audio = w.__hzAudio;
    if (audio) audio.pause();
  } catch (_) {}
  try {
    const session = w.navigator.mediaSession;
    if (session) session.playbackState = 'paused';
  } catch (_) {}
}

function updateMediaSession() {
  const w = mediaWin();
  const session = w.navigator && w.navigator.mediaSession;
  if (!session) return;
  const t = currentTrack();
  const station = STATIONS[currentGenre];
  const Meta = w.MediaMetadata || window.MediaMetadata;
  try {
    if (Meta) {
      session.metadata = new Meta({
        title: (t && t.title) || (station && station.name) || 'हॉर्न ओके प्लीज',
        artist: (t && t.artist) || (station && station.name) || '',
        album: (station && station.name) || 'हिंदी हाईवे रेडियो',
        artwork: t && t.cover ? [
          { src: t.cover, sizes: '320x180', type: 'image/jpeg' },
          { src: t.cover, sizes: '512x512', type: 'image/jpeg' }
        ] : []
      });
    }
    session.playbackState = state.wantPlay || state.playing ? 'playing' : 'paused';
    session.setActionHandler('play', () => {
      state.wantPlay = true;
      enableBackgroundPlayback();
      try { yt?.playVideo?.(); } catch (_) {}
    });
    session.setActionHandler('pause', () => {
      state.wantPlay = false;
      disableBackgroundPlayback();
      try { yt?.pauseVideo?.(); } catch (_) {}
    });
    session.setActionHandler('nexttrack', () => go(state.pos + 1));
    session.setActionHandler('previoustrack', () => go(state.pos - 1));
    session.setActionHandler('stop', () => {
      state.wantPlay = false;
      disableBackgroundPlayback();
      try { yt?.pauseVideo?.(); } catch (_) {}
    });
  } catch (_) {}
}

function mountYouTubeHost(win) {
  const hidden =
    'position:fixed;left:0;bottom:0;width:1px;height:1px;opacity:0;overflow:hidden;clip:rect(0,0,0,0);clip-path:inset(100%);border:0;z-index:-1;pointer-events:none;';
  if (!win.document.getElementById('hz-yt-hide')) {
    const style = win.document.createElement('style');
    style.id = 'hz-yt-hide';
    style.textContent = '#hz-yt-host,#hz-yt-host iframe,#hz-yt-player{position:fixed!important;left:0!important;bottom:0!important;width:1px!important;height:1px!important;min-width:0!important;min-height:0!important;opacity:0!important;overflow:hidden!important;clip-path:inset(100%)!important;border:0!important;pointer-events:none!important;z-index:-1!important;}';
    win.document.head.appendChild(style);
  }
  let host = win.document.getElementById('hz-yt-host');
  if (!host) {
    host = win.document.createElement('div');
    host.id = 'hz-yt-host';
    host.setAttribute('aria-hidden', 'true');
    win.document.body.appendChild(host);
  }
  host.style.cssText = hidden;
  let mount = win.document.getElementById('hz-yt-player');
  if (!mount) {
    mount = win.document.createElement('div');
    mount.id = 'hz-yt-player';
    host.appendChild(mount);
  }
  return mount.id;
}

function loadYtApiOn(win) {
  return new Promise((resolve) => {
    if (win.YT && typeof win.YT.Player === 'function') {
      resolve();
      return;
    }
    const prev = win.onYouTubeIframeAPIReady;
    win.onYouTubeIframeAPIReady = () => {
      try { if (typeof prev === 'function') prev(); } catch (_) {}
      resolve();
    };
    if (!win.document.querySelector('script[data-hz-yt]')) {
      const script = win.document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.setAttribute('data-hz-yt', '1');
      win.document.head.appendChild(script);
    }
  });
}

let ytBooted = false;

function loadYouTubeApi() {
  if (ytBooted) return;
  const w = mediaWin();
  unlockEmbeddedPlayback();
  loadYtApiOn(w).then(bootYouTubePlayer);
}

function bootYouTubePlayer() {
  if (ytBooted) return;
  ytBooted = true;
  const w = mediaWin();
  const mountId = mountYouTubeHost(w);
  const first = currentTrack();
  const YTref = w.YT || window.YT;
  yt = new YTref.Player(mountId, {
    height: '1',
    width: '1',
    videoId: first ? first.id : undefined,
    playerVars: {
      playsinline: 1,
      controls: 0,
      disablekb: 1,
      enablejsapi: 1,
      rel: 0,
      fs: 0,
      modestbranding: 1,
      iv_load_policy: 3,
      origin: w.location.origin,
      autoplay: 0
    },
    events: {
      onReady: () => {
        state.ready = true;
        el.play.disabled = false;
        w.__hzYt = yt;
        unlockEmbeddedPlayback();
        preferAudio();
        cueOrLoadStationPlaylist(false);
        installParentKeepAlive();
      },
      onStateChange: (e) => {
        const S = YTref.PlayerState;
        if (e.data === S.PLAYING) {
          state.wantPlay = true;
          w.__hzWant = true;
          renderPlaying(true);
          preferAudio();
          syncFromPlayer();
          updateMediaSession();
        } else if (e.data === S.CUED) {
          syncFromPlayer();
        } else if (e.data === S.PAUSED) {
          if (state.wantPlay && pageIsHidden()) resumeWantedPlayback();
          else if (!state.wantPlay) renderPlaying(false);
        } else if (e.data === S.BUFFERING) {
          renderPlaying(state.playing || state.wantPlay);
        }
      },
      onError: (e) => {
        console.warn("YouTube player error:", e.data);
        if (state.started && playerMatchesStation() && typeof yt.nextVideo === 'function') {
          setTimeout(() => yt.nextVideo(), 800);
        }
      }
    }
  });
  w.__hzYt = yt;

  w.setInterval(() => {
    try { samplePlayer(); } catch (_) {}
  }, 400);
  requestAnimationFrame(paintProgress);
}

// ------------------------------------------------------------
// 9. STATION SWITCHING
// ------------------------------------------------------------
function renderStationChooser() {
  if (!el.genreGrid) return;
  el.genreGrid.replaceChildren();
  STATION_ORDER.forEach((id, i) => {
    const station = STATIONS[id];
    if (!station) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'genre-btn' + (id === currentGenre ? ' active' : '');
    btn.dataset.genre = id;
    btn.setAttribute('aria-pressed', String(id === currentGenre));
    btn.style.setProperty('--stagger', `${i * 45}ms`);

    const icon = document.createElement('span');
    icon.className = 'gb-icon';
    icon.textContent = station.icon || '📻';

    const info = document.createElement('div');
    info.className = 'gb-info';
    const label = document.createElement('span');
    label.className = 'gb-label';
    label.textContent = station.name;
    const fm = document.createElement('span');
    fm.className = 'gb-fm';
    fm.textContent = station.tag ? `${station.freq} • ${station.tag}` : station.freq;
    info.append(label, fm);

    const live = document.createElement('span');
    live.className = 'gb-live';
    live.textContent = 'ON AIR';

    btn.append(icon, info, live);
    btn.addEventListener('click', () => {
      ensureAudio();
      switchGenre(id, true);
    });
    el.genreGrid.appendChild(btn);
  });
}

function markActiveStation(genreId) {
  document.querySelectorAll('.genre-btn').forEach((btn) => {
    const on = btn.dataset.genre === genreId;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-pressed', String(on));
  });
  if (el.genreHint && STATIONS[genreId]) {
    el.genreHint.textContent = `अभी: ${STATIONS[genreId].name} · ${STATIONS[genreId].freq}`;
  }
}

async function switchGenre(genreId, autoPlay = true) {
  const station = STATIONS[genreId];
  if (!station) return;
  if (genreId === currentGenre && state.tracks.length && autoPlay && yt && state.ready) {
    cueOrLoadStationPlaylist(true);
    if (el.genrePanel.classList.contains('is-open')) toggleGenrePanel();
    return;
  }

  const epoch = ++state.epoch;
  currentGenre = genreId;
  document.body.className = "genre--" + genreId;

  el.logoLine1.textContent = station.logoLine1;
  el.logoLine2.textContent = station.logoLine2;
  el.presenceText.textContent = station.name;
  el.ytLink.href = playlistUrlOf(station);
  el.listYtLink.href = playlistUrlOf(station);
  document.getElementById('list-title').textContent = "प्लेलिस्ट — " + station.name;

  markActiveStation(genreId);

  state.pos = 0;
  applyTracks([]);
  await loadTracksForStation(station, epoch);
  if (epoch !== state.epoch) return;
  cycleSlogans(station.slogans);

  if (yt && state.ready) cueOrLoadStationPlaylist(autoPlay);

  if (el.genrePanel.classList.contains('is-open')) toggleGenrePanel();
}

// ------------------------------------------------------------
// 11. BUMPER SLOGANS
// ------------------------------------------------------------
function cycleSlogans(slogans) {
  if (sloganTimer) clearInterval(sloganTimer);
  currentSloganIdx = 0;
  el.bumperText.textContent = slogans[0];

  const updateText = (idx) => {
    el.bumperText.classList.add('is-swapping');
    setTimeout(() => {
      el.bumperText.textContent = slogans[idx];
      el.bumperText.classList.remove('is-swapping');
    }, 280);
  };

  el.bumperNext.onclick = () => {
    currentSloganIdx = (currentSloganIdx + 1) % slogans.length;
    updateText(currentSloganIdx);
  };

  sloganTimer = setInterval(() => {
    currentSloganIdx = (currentSloganIdx + 1) % slogans.length;
    updateText(currentSloganIdx);
  }, 8000);
}

// ------------------------------------------------------------
// 12. TRUCK HORN AUDIO
// ------------------------------------------------------------
function ensureAudio() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  } catch (_) {
    return null;
  }
}

function honk() {
  const ctx = ensureAudio();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 1.35;
  const master = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(980, now);
  filter.Q.value = 0.85;
  master.gain.setValueAtTime(0.72, now);
  filter.connect(master);
  master.connect(ctx.destination);

  // Dual-tone air horn (classical truck / lorry): Eb + F# fifth-ish stack + sub.
  const voices = [
    { freq: 311.13, type: "sawtooth", gain: 0.28, detune: -6 },
    { freq: 370.0, type: "square", gain: 0.22, detune: 4 },
    { freq: 311.13, type: "triangle", gain: 0.16, detune: 9 },
    { freq: 466.16, type: "sawtooth", gain: 0.09, detune: -3 },
    { freq: 155.56, type: "sine", gain: 0.18, detune: 0 }
  ];

  voices.forEach((voice) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = voice.type;
    osc.frequency.setValueAtTime(voice.freq, now);
    osc.detune.setValueAtTime(voice.detune, now);
    gain.gain.setValueAtTime(0, now);
    // Two blasts: short then longer "paa-paaa"
    gain.gain.linearRampToValueAtTime(voice.gain, now + 0.018);
    gain.gain.setValueAtTime(voice.gain, now + 0.16);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.22);
    gain.gain.setValueAtTime(0.0008, now + 0.30);
    gain.gain.linearRampToValueAtTime(voice.gain * 1.08, now + 0.34);
    gain.gain.setValueAtTime(voice.gain * 0.92, now + 1.05);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + duration);
    osc.connect(gain);
    gain.connect(filter);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  });

  el.logo.classList.remove('is-shaking');
  void el.logo.offsetWidth;
  el.logo.classList.add('is-shaking');

  el.hornBtn.classList.add('is-blaring');
  setTimeout(() => el.hornBtn.classList.remove('is-blaring'), 1350);
}

// ------------------------------------------------------------
// 13. WEATHER & CLOCK
// ------------------------------------------------------------
function readUserCoords() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 15 * 60 * 1000 }
    );
  });
}

async function fetchWeather() {
  const getWeatherEmoji = (code) => {
    if (code >= 200 && code < 300) return "🌩️";
    if (code >= 300 && code < 600) return "🌧️";
    if (code >= 600 && code < 700) return "❄️";
    if (code >= 700 && code < 800) return "🌫️";
    if (code === 800) return "☀️";
    return "⛅";
  };

  const applyData = (data) => {
    if (!data || !data.main) return;
    el.weatherTemp.textContent = Math.round(data.main.temp) + "°C";
    el.weatherIcon.textContent = getWeatherEmoji((data.weather && data.weather[0] && data.weather[0].id) || 801);
    el.weatherCity.textContent = data.name || "आपकी जगह";
  };

  try {
    const coords = await readUserCoords();
    const qs = coords
      ? `?lat=${encodeURIComponent(coords.lat)}&lon=${encodeURIComponent(coords.lon)}`
      : '';
    const bootWx = window.BOOTSTRAP && window.BOOTSTRAP.weather;
    const res = await fetch('/api/weather' + qs);
    if (res.ok) {
      applyData(await res.json());
      return;
    }
    if (bootWx) applyData(bootWx);
  } catch (_) {
    const bootWx = window.BOOTSTRAP && window.BOOTSTRAP.weather;
    if (bootWx) applyData(bootWx);
    else {
      el.weatherTemp.textContent = "--°C";
      el.weatherIcon.textContent = "⛅";
      el.weatherCity.textContent = "लोकेशन बंद";
    }
  }
}

function tickClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  el.clock.textContent = `${h}:${m}`;
}

// ------------------------------------------------------------
// 14. PANELS (Stations & Playlist Drawer)
// ------------------------------------------------------------
function togglePlaylist() {
  const open = !el.list.classList.contains('is-open');
  el.list.classList.toggle('is-open', open);
  el.list.setAttribute('aria-hidden', String(!open));
  el.listBtn.classList.toggle('active', open);
  el.listBtn.setAttribute('aria-expanded', String(open));
  if (open && el.genrePanel.classList.contains('is-open')) toggleGenrePanel();
}

function toggleGenrePanel() {
  const open = !el.genrePanel.classList.contains('is-open');
  el.genrePanel.classList.toggle('is-open', open);
  el.genrePanel.setAttribute('aria-hidden', String(!open));
  el.stationsBtn.classList.toggle('active', open);
  el.stationsBtn.setAttribute('aria-expanded', String(open));
  if (open && el.list.classList.contains('is-open')) togglePlaylist();
}

// ------------------------------------------------------------
// 15. INITIALIZATION
// ------------------------------------------------------------
document.addEventListener("DOMContentLoaded", async () => {
  tickClock();
  setInterval(tickClock, 10000);
  fetchWeather();

  renderStationChooser();
  await switchGenre("highway", false);
  el.shuffle.classList.toggle('active', state.shuffle);
  el.shuffle.setAttribute('aria-pressed', String(state.shuffle));
  loadYouTubeApi();

  // Bind controls
  el.play.addEventListener('click', toggle);
  el.next.addEventListener('click', () => go(state.pos + 1));
  el.prev.addEventListener('click', () => {
    if (yt && (yt.getCurrentTime() || 0) > 3) yt.seekTo(0, true);
    else go(state.pos - 1);
  });

  el.shuffle.addEventListener('click', () => {
    const keep = currentTrack();
    state.shuffle = !state.shuffle;
    el.shuffle.classList.toggle('active', state.shuffle);
    el.shuffle.setAttribute('aria-pressed', String(state.shuffle));
    state.order = buildOrder();
    if (keep) {
      const idx = state.order.findIndex((i) => state.tracks[i] && state.tracks[i].id === keep.id);
      state.pos = Math.max(0, idx);
    }
    renderList();
    renderTrack();
    if (yt && state.ready) {
      const ids = videoIdsInPlayOrder();
      if (!ids.length) return;
      try {
        if (state.started) yt.loadPlaylist(ids, state.pos);
        else yt.cuePlaylist(ids, state.pos);
      } catch (_) {}
    }
  });

  el.listBtn.addEventListener('click', togglePlaylist);
  el.stationsBtn.addEventListener('click', toggleGenrePanel);
  el.hornBtn.addEventListener('click', honk);

  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea')) return;
    if (e.key === ' ' || e.key === 'k') { e.preventDefault(); toggle(); }
    else if (e.key === 'n' || e.key === 'ArrowRight') go(state.pos + 1);
    else if (e.key === 'p' || e.key === 'ArrowLeft') go(state.pos - 1);
    else if (e.key === 'h') honk();
  });

  // Prime audio on first touch
  ['pointerdown', 'keydown'].forEach(evt => {
    document.addEventListener(evt, () => {
      ensureAudio();
      armBackgroundAudio();
    }, { capture: true });
  });

  unlockEmbeddedPlayback();
  const visTarget = mediaWin();
  const onLeave = () => { if (state.wantPlay) resumeWantedPlayback(); };
  document.addEventListener('visibilitychange', onLeave);
  visTarget.document.addEventListener('visibilitychange', onLeave);
  ['pagehide', 'pageshow', 'focus', 'blur', 'freeze', 'resume'].forEach((evt) => {
    visTarget.addEventListener(evt, onLeave, { capture: true });
    window.addEventListener(evt, onLeave, { capture: true });
  });
});
