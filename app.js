/* ============================================================
   हॉर्न ओके प्लीज — App Engine
   Architecture directly based on hornokplease.xyz
   - YouTube playback from each station's playlist ID
   - 60fps rAF seek bar with extrapolation
   - 6 Curated Radio Stations (Highway, Dhaba, 2000s Dance, 90s Retro, Anti-Depression, Fred again..)
   - Synthesised Indian Truck Horn
   - Real-time Clock & OpenWeatherMap
   - 1-minute wallpaper rotation
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
      "धीरे चलोगे तो बार-बार मिलोगे, तेज चलोगे तो हरिद्वार मिलोगे"
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
      "यहाँ आत्मा को सुकून मिलता है"
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
      "पार्टी अभी बाकी है"
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
      "नब्बे के नगमे, दिल के सगे"
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
      "मन को चैन दो, दिल को सुकून"
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
      "The beat that finds your soul"
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
  scrubbing: false
};

let yt = null;
let wallpaperTimer = null;
let wallpaperIdx = 0;
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
  state.order = tracks.map((_, i) => i);
  if (state.pos >= tracks.length) state.pos = 0;
  renderList();
  renderTrack();
}

async function loadTracksForStation(station) {
  const listId = playlistIdOf(station);
  el.title.textContent = 'प्लेलिस्ट लोड हो रही है...';
  el.artist.textContent = station.name;
  if (!listId) {
    applyTracks([]);
    return;
  }
  try {
    const res = await fetch(`/api/playlist?list=${encodeURIComponent(listId)}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.tracks) && data.tracks.length) {
        applyTracks(data.tracks);
        return;
      }
    }
  } catch (err) {
    console.warn('Playlist fetch failed:', err);
  }
  applyTracks([]);
}

function cueOrLoadStationPlaylist(autoPlay) {
  const listId = playlistIdOf(STATIONS[currentGenre]);
  if (!yt || !listId) return;
  const opts = { listType: 'playlist', list: listId, index: 0 };
  try {
    if (autoPlay) {
      state.started = true;
      yt.loadPlaylist(opts);
    } else {
      yt.cuePlaylist(opts);
    }
    yt.setShuffle?.(state.shuffle);
  } catch (err) {
    console.warn('Could not load YouTube playlist:', err);
  }
}

function hydrateCurrentFromPlayer() {
  if (!yt) return;
  try {
    const data = yt.getVideoData?.() || {};
    const t = currentTrack();
    if (!t) return;
    if (data.title) t.title = data.title;
    if (data.author) t.artist = data.author;
    const dur = yt.getDuration?.();
    if (dur) t.duration = Math.round(dur);
  } catch (_) {}
}

function syncFromPlayer() {
  if (!yt || typeof yt.getPlaylist !== 'function') return;
  const ids = yt.getPlaylist();
  if (!Array.isArray(ids) || !ids.length) return;
  const byId = Object.fromEntries(state.tracks.map((t) => [t.id, t]));
  state.tracks = ids.map((id) => trackFromId(id, byId[id] || {}));
  state.order = state.tracks.map((_, i) => i);
  const idx = yt.getPlaylistIndex?.();
  state.pos = Number.isInteger(idx) && idx >= 0 ? idx : 0;
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

  // Highlight in list
  [...el.listItems.children].forEach((li, i) =>
    li.classList.toggle('active', i === state.pos)
  );
  
  const active = el.listItems.children[state.pos];
  if (active && el.list.classList.contains('is-open')) {
    active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
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
  if (typeof yt.playVideoAt === 'function') yt.playVideoAt(state.pos);
  else if (currentTrack()) yt.loadVideoById(currentTrack().id);
}

function toggle() {
  ensureAudio();
  if (!yt || !state.ready) return;
  if (state.playing) {
    yt.pauseVideo();
  } else {
    state.started = true;
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

let ytBooted = false;

function loadYouTubeApi() {
  if (window.YT && typeof window.YT.Player === 'function') {
    window.onYouTubeIframeAPIReady();
    return;
  }
  const s = document.createElement('script');
  s.src = 'https://www.youtube.com/iframe_api';
  document.head.append(s);
}

window.onYouTubeIframeAPIReady = () => {
  if (ytBooted) return;
  ytBooted = true;
  const listId = playlistIdOf(STATIONS[currentGenre]);
  const playerVars = {
    playsinline: 1,
    controls: 0,
    disablekb: 1,
    modestbranding: 1,
    rel: 0,
    autoplay: 0
  };
  if (listId) {
    playerVars.listType = 'playlist';
    playerVars.list = listId;
    playerVars.index = 0;
  }
  yt = new YT.Player('yt-player', {
    height: '1',
    width: '1',
    playerVars,
    events: {
      onReady: () => {
        state.ready = true;
        el.play.disabled = false;
        preferAudio();
        cueOrLoadStationPlaylist(false);
      },
      onStateChange: (e) => {
        const S = YT.PlayerState;
        if (e.data === S.PLAYING) {
          renderPlaying(true);
          preferAudio();
          syncFromPlayer();
        } else if (e.data === S.CUED) {
          syncFromPlayer();
        } else if (e.data === S.PAUSED || e.data === S.BUFFERING) {
          renderPlaying(e.data === S.BUFFERING && state.playing);
        }
        // Playlist mode already advances on ENDED — do not skip ahead.
      },
      onError: (e) => {
        console.warn("YouTube player error:", e.data);
        if (state.started && typeof yt.nextVideo === 'function') {
          setTimeout(() => yt.nextVideo(), 800);
        }
      }
    }
  });

  setInterval(samplePlayer, 250);
  requestAnimationFrame(paintProgress);
};

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
  await loadTracksForStation(station);
  startWallpaperRotation(await loadWallpapers(station));
  cycleSlogans(station.slogans);

  if (yt && state.ready) cueOrLoadStationPlaylist(autoPlay);

  if (el.genrePanel.classList.contains('is-open')) toggleGenrePanel();
}

// ------------------------------------------------------------
// 10. BACKGROUND WALLPAPERS (1 Minute Delay)
// ------------------------------------------------------------
function crossfadeBg(url) {
  const layer1 = document.querySelector(".bg__layer--1");
  const layer2 = document.querySelector(".bg__layer--2");
  const active = document.querySelector(".bg__layer.is-active");
  const inactive = active === layer1 ? layer2 : layer1;
  inactive.style.backgroundImage = `url("${url}")`;
  inactive.classList.add("is-active");
  active.classList.remove("is-active");
}

async function loadWallpapers(station) {
  try {
    const res = await fetch(`/api/wallpapers?genre=${encodeURIComponent(station.id)}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.wallpapers) && data.wallpapers.length) return data.wallpapers;
    }
  } catch (_) {}
  return station.wallpapers || [];
}

function startWallpaperRotation(customWallpapers) {
  const list = customWallpapers || STATIONS[currentGenre].wallpapers;
  if (!list || !list.length) return;

  if (wallpaperTimer) clearInterval(wallpaperTimer);
  wallpaperIdx = 0;
  crossfadeBg(list[0]);

  // 60,000ms = 1 minute delay
  wallpaperTimer = setInterval(() => {
    wallpaperIdx = (wallpaperIdx + 1) % list.length;
    crossfadeBg(list[wallpaperIdx]);
  }, 60000);
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
  [
    { freq: 320, type: "sawtooth" },
    { freq: 440, type: "square" }
  ].forEach(item => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = item.type;
    osc.frequency.setValueAtTime(item.freq, now);
    osc.frequency.exponentialRampToValueAtTime(item.freq * 1.05, now + 0.05);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.06);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.35);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.45);
    gain.gain.linearRampToValueAtTime(0.38, now + 0.5);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.85);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.15);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.2);
  });

  // Wordmark rattle & Horn tactile animation
  el.logo.classList.remove('is-shaking');
  void el.logo.offsetWidth;
  el.logo.classList.add('is-shaking');

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
    const res = await fetch('/api/weather' + qs);
    if (res.ok) applyData(await res.json());
  } catch (_) {
    el.weatherTemp.textContent = "--°C";
    el.weatherIcon.textContent = "⛅";
    el.weatherCity.textContent = "लोकेशन बंद";
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
    state.shuffle = !state.shuffle;
    el.shuffle.classList.toggle('active', state.shuffle);
    el.shuffle.setAttribute('aria-pressed', String(state.shuffle));
    try { yt?.setShuffle?.(state.shuffle); } catch (_) {}
    if (yt && state.ready) setTimeout(syncFromPlayer, 250);
    else {
      state.order = buildOrder();
      state.pos = 0;
      renderList();
      renderTrack();
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
    document.addEventListener(evt, () => ensureAudio(), { once: true, capture: true });
  });
});
