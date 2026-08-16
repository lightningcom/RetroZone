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

function applyTracks(tracks, { randomStart = true } = {}) {
  state.tracks = tracks;
  state.order = buildOrder();
  if (randomStart && state.shuffle && state.order.length) {
    state.pos = Math.floor(Math.random() * state.order.length);
  } else if (state.pos >= state.order.length) {
    state.pos = 0;
  }
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
        yt.loadPlaylist(ids, state.pos);
      } else {
        yt.cuePlaylist(ids, state.pos);
      }
      return;
    }
    if (!listId) return;
    const opts = { listType: 'playlist', list: listId, index: state.pos || 0 };
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
        cueOrLoadStationPlaylist(true);
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

    const info = document.createElement('div');
    info.className = 'gb-info';
    const fm = document.createElement('span');
    fm.className = 'gb-fm';
    fm.textContent = station.freq;
    const label = document.createElement('span');
    label.className = 'gb-label';
    label.textContent = station.name;
    const tag = document.createElement('span');
    tag.className = 'gb-tag';
    tag.textContent = station.tag || '';
    info.append(fm, label, tag);

    const live = document.createElement('span');
    live.className = 'gb-live';
    live.textContent = 'ON AIR';

    btn.append(info, live);
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
// 12. TRUCK HORN AUDIO (same sample as hornokplease.xyz)
// ------------------------------------------------------------
const HORN_SRC = window.HORN_SRC || 'assets/horn.mp3';
let hornBytes = null;
let hornBuffer = null;
let hornSource = null;
let duckTimer = null;
let duckedFrom = null;

try {
  if (navigator.audioSession) navigator.audioSession.type = 'playback';
} catch (_) {}

fetch(HORN_SRC)
  .then((r) => (r.ok ? r.arrayBuffer() : null))
  .then((b) => { hornBytes = b; })
  .catch(() => {});

function ensureAudio() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  } catch (_) {
    return null;
  }
}

async function loadHorn(ctx) {
  if (hornBuffer) return hornBuffer;
  if (!hornBytes) {
    try {
      const res = await fetch(HORN_SRC);
      hornBytes = res.ok ? await res.arrayBuffer() : null;
    } catch (_) {
      return null;
    }
  }
  if (!hornBytes) return null;
  try {
    hornBuffer = await ctx.decodeAudioData(hornBytes.slice(0));
  } catch (_) {
    return null;
  }
  return hornBuffer;
}

function duckMusic(ms) {
  if (!yt || typeof yt.getVolume !== 'function' || typeof yt.setVolume !== 'function') return;
  if (duckedFrom === null) duckedFrom = yt.getVolume();
  yt.setVolume(Math.round(duckedFrom * 0.4));
  clearTimeout(duckTimer);
  duckTimer = setTimeout(() => {
    if (duckedFrom !== null) yt.setVolume(duckedFrom);
    duckedFrom = null;
  }, ms + 120);
}

async function honk() {
  const ctx = ensureAudio();
  if (!ctx) return;

  const buffer = await loadHorn(ctx);
  if (!buffer) return;

  try { hornSource?.stop(); } catch (_) {}

  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  source.buffer = buffer;
  gain.gain.value = 0.9;
  source.connect(gain).connect(ctx.destination);
  source.onended = () => {
    if (hornSource === source) hornSource = null;
  };
  source.start();
  hornSource = source;

  const ms = buffer.duration * 1000;
  duckMusic(ms);

  el.logo.classList.remove('is-shaking');
  void el.logo.offsetWidth;
  el.logo.classList.add('is-shaking');
  setTimeout(() => el.logo.classList.remove('is-shaking'), 720);

  el.hornBtn.classList.add('is-blaring');
  setTimeout(() => el.hornBtn.classList.remove('is-blaring'), 450);
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
  await switchGenre("highway", true);
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
      const ctx = ensureAudio();
      if (ctx) loadHorn(ctx);
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
