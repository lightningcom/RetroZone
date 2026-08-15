/* ============================================================
   हॉर्न ओके प्लीज — App Engine
   Architecture directly based on hornokplease.xyz
   - 100% reliable YouTube playback with direct video IDs
   - 60fps rAF seek bar with extrapolation
   - 6 Curated Radio Stations (Highway, Dhaba, 2000s Dance, 90s Retro, Anti-Depression, Fred again..)
   - Synthesised Indian Truck Horn
   - Real-time Clock & OpenWeatherMap
   - 1-minute wallpaper rotation
   ============================================================ */

const OWM_API_KEY = "3c5abde3da68c520fb2c16ada9909fcc";

// ------------------------------------------------------------
// 1. STATION DATABASE WITH DIRECT YOUTUBE VIDEO TRACKS
// ------------------------------------------------------------
const STATIONS = {
  highway: {
    id: "highway",
    name: "ऑन द हाईवे",
    freq: "FM 98.4",
    logoLine1: "हाईवे",
    logoLine2: "वाला रेडियो",
    playlistUrl: "https://www.youtube.com/playlist?list=PLfH-6xXh3waM_xq9ycX40mT8DItNVg7bM",
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
    ],
    tracks: [
      { id: "N0jnLZxYwYc", title: "Mujhse Mohabbat Ka Izhaar Karta", artist: "Kumar Sanu & Alka Yagnik", duration: 304, cover: "https://img.youtube.com/vi/N0jnLZxYwYc/hqdefault.jpg" },
      { id: "3NWMK2MRqIk", title: "Tumsa Koi Pyaara", artist: "Kumar Sanu & Alka Yagnik", duration: 376, cover: "https://img.youtube.com/vi/3NWMK2MRqIk/hqdefault.jpg" },
      { id: "9b0iydtDZLU", title: "Waada Raha Sanam", artist: "Abhijeet & Alka Yagnik", duration: 365, cover: "https://img.youtube.com/vi/9b0iydtDZLU/hqdefault.jpg" },
      { id: "fg9G1dacXjk", title: "Chhupana Bhi Nahin Aata", artist: "Vinod Rathod (Baazigar)", duration: 253, cover: "https://img.youtube.com/vi/fg9G1dacXjk/hqdefault.jpg" },
      { id: "u0AgbGWvzdA", title: "Jhanjharia", artist: "Abhijeet & Alka Yagnik", duration: 309, cover: "https://img.youtube.com/vi/u0AgbGWvzdA/hqdefault.jpg" },
      { id: "YflQv9Nn-V8", title: "Tumhein Apna Banane Ki Kasam", artist: "Kumar Sanu & Anuradha Paudwal", duration: 338, cover: "https://img.youtube.com/vi/YflQv9Nn-V8/hqdefault.jpg" },
      { id: "kC9R0Jg7040", title: "Pardesi Pardesi (Sad)", artist: "Alka Yagnik & Suresh Wadkar", duration: 310, cover: "https://img.youtube.com/vi/kC9R0Jg7040/hqdefault.jpg" },
      { id: "7r150D3cZ1k", title: "Aye Mere Humsafar", artist: "Udit Narayan & Alka Yagnik", duration: 350, cover: "https://img.youtube.com/vi/7r150D3cZ1k/hqdefault.jpg" },
      { id: "c18A2T8K8U4", title: "Dard Dilo Ke Kam Ho Jaate", artist: "Mohammed Irfan", duration: 305, cover: "https://img.youtube.com/vi/c18A2T8K8U4/hqdefault.jpg" }
    ]
  },
  dhaba: {
    id: "dhaba",
    name: "ढाबा सूफ़ियाना",
    freq: "FM 91.1",
    logoLine1: "ढाबा",
    logoLine2: "सूफ़ियाना",
    playlistUrl: "https://www.youtube.com/playlist?list=PLDd3GFEUXVbAE1Q55DxMCi90Mf_v-dDdk",
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
    ],
    tracks: [
      { id: "e_z24a_bZ04", title: "Afreen Afreen", artist: "Rahat Fateh Ali Khan & Momina", duration: 405, cover: "https://img.youtube.com/vi/e_z24a_bZ04/hqdefault.jpg" },
      { id: "0B1zKzUv56M", title: "Kun Faya Kun", artist: "A.R. Rahman, Javed Ali, Mohit Chauhan", duration: 472, cover: "https://img.youtube.com/vi/0B1zKzUv56M/hqdefault.jpg" },
      { id: "0WkOxYmbdt4", title: "Mere Rashke Qamar", artist: "Nusrat Fateh Ali Khan", duration: 220, cover: "https://img.youtube.com/vi/0WkOxYmbdt4/hqdefault.jpg" },
      { id: "yIIGQP7V4GY", title: "Chaap Tilak", artist: "Abida Parveen & Rahat Fateh Ali Khan", duration: 540, cover: "https://img.youtube.com/vi/yIIGQP7V4GY/hqdefault.jpg" },
      { id: "vS2LvxEE7qQ", title: "Teri Deewani", artist: "Kailash Kher", duration: 320, cover: "https://img.youtube.com/vi/vS2LvxEE7qQ/hqdefault.jpg" },
      { id: "kw4tT7SCmaY", title: "Tajdar-e-Haram", artist: "Atif Aslam", duration: 628, cover: "https://img.youtube.com/vi/kw4tT7SCmaY/hqdefault.jpg" },
      { id: "pA_mE1s0H28", title: "Maula Mere Maula", artist: "Roop Kumar Rathod", duration: 350, cover: "https://img.youtube.com/vi/pA_mE1s0H28/hqdefault.jpg" }
    ]
  },
  dance2000: {
    id: "dance2000",
    name: "२०००s डांस धमाका",
    freq: "FM 102.5",
    logoLine1: "२०००s",
    logoLine2: "डांस धमाका",
    playlistUrl: "https://www.youtube.com/playlist?list=PLPo3EhjC8W4ASmZ2RHNXF5sdOFMKgtBeK",
    slogans: [
      "रात के दो बजे डिस्को चलता है",
      "नाचो! यही वक्त है",
      "२०००s की याद दिला दी",
      "पार्टी अभी बाकी है"
    ],
    wallpapers: [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80"
    ],
    tracks: [
      { id: "3Rfb74x0-8Q", title: "Mauja Hi Mauja", artist: "Mika Singh (Jab We Met)", duration: 245, cover: "https://img.youtube.com/vi/3Rfb74x0-8Q/hqdefault.jpg" },
      { id: "Wq54FzV5s4E", title: "Dus Bahane", artist: "Shaan & KK (Dus)", duration: 210, cover: "https://img.youtube.com/vi/Wq54FzV5s4E/hqdefault.jpg" },
      { id: "W_K_m10Y_G4", title: "Dhoom Machale", artist: "Sunidhi Chauhan (Dhoom)", duration: 230, cover: "https://img.youtube.com/vi/W_K_m10Y_G4/hqdefault.jpg" },
      { id: "xW2O6k_v5bU", title: "It's the Time to Disco", artist: "Shaan, Vasundhara Das, KK", duration: 333, cover: "https://img.youtube.com/vi/xW2O6k_v5bU/hqdefault.jpg" },
      { id: "7zp1TbLFPp8", title: "Desi Girl", artist: "Shankar Mahadevan & Sunidhi Chauhan", duration: 305, cover: "https://img.youtube.com/vi/7zp1TbLFPp8/hqdefault.jpg" },
      { id: "1yBm6X1fQEQ", title: "Rock N Roll Soniye", artist: "Shankar Mahadevan, Shaan", duration: 340, cover: "https://img.youtube.com/vi/1yBm6X1fQEQ/hqdefault.jpg" }
    ]
  },
  retro90s: {
    id: "retro90s",
    name: "९०s नॉस्टैल्जिया",
    freq: "FM 88.0",
    logoLine1: "नब्बे का",
    logoLine2: "दशक",
    playlistUrl: "https://www.youtube.com/playlist?list=PLEFafAVNRJBoKFSKFx1MCPMhf9kzJBFxC",
    slogans: [
      "कुमार सानू की आवाज़, ९०s का नशा",
      "वो दिन भी क्या दिन थे",
      "रेट्रो वाइब्स, दिल के करीब",
      "नब्बे के नगमे, दिल के सगे"
    ],
    wallpapers: [
      "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1920&q=80"
    ],
    tracks: [
      { id: "4h0K5hZ4m_0", title: "Chura Ke Dil Mera", artist: "Kumar Sanu & Alka Yagnik", duration: 350, cover: "https://img.youtube.com/vi/4h0K5hZ4m_0/hqdefault.jpg" },
      { id: "M_p0xN8P9yU", title: "Dheere Dheere Se", artist: "Kumar Sanu & Anuradha Paudwal", duration: 320, cover: "https://img.youtube.com/vi/M_p0xN8P9yU/hqdefault.jpg" },
      { id: "1_VbF-V_f0g", title: "Pehla Nasha", artist: "Udit Narayan & Sadhana Sargam", duration: 290, cover: "https://img.youtube.com/vi/1_VbF-V_f0g/hqdefault.jpg" },
      { id: "cNV5hL42g74", title: "Tujhe Dekha Toh", artist: "Kumar Sanu & Lata Mangeshkar", duration: 302, cover: "https://img.youtube.com/vi/cNV5hL42g74/hqdefault.jpg" },
      { id: "Q_40jP7F_1M", title: "Tip Tip Barsa Paani", artist: "Alka Yagnik & Udit Narayan", duration: 355, cover: "https://img.youtube.com/vi/Q_40jP7F_1M/hqdefault.jpg" }
    ]
  },
  antidepression: {
    id: "antidepression",
    name: "एंटी-डिप्रेशन",
    freq: "FM 94.3",
    logoLine1: "मन की",
    logoLine2: "शांति",
    playlistUrl: "https://www.youtube.com/playlist?list=PLANlPz-KKq6kl2pFv-AriPSMbnoXvqFnH",
    slogans: [
      "साँस लो, सुनो, शांत हो जाओ",
      "यह धुन तुम्हारे साथ है",
      "अकेले नहीं हो, हम हैं",
      "मन को चैन दो, दिल को सुकून"
    ],
    wallpapers: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80"
    ],
    tracks: [
      { id: "fSS_R91Nimw", title: "Iktara", artist: "Amit Trivedi & Kavita Seth", duration: 254, cover: "https://img.youtube.com/vi/fSS_R91Nimw/hqdefault.jpg" },
      { id: "jHNNMj5bNQw", title: "Kabira (Acoustic)", artist: "Tochi Raina & Rekha Bhardwaj", duration: 223, cover: "https://img.youtube.com/vi/jHNNMj5bNQw/hqdefault.jpg" },
      { id: "h_fM2eJv2y4", title: "Sham", artist: "Amit Trivedi & Nikhil D'Souza", duration: 284, cover: "https://img.youtube.com/vi/h_fM2eJv2y4/hqdefault.jpg" },
      { id: "V476m5_t-zM", title: "Baarishein", artist: "Anuv Jain", duration: 208, cover: "https://img.youtube.com/vi/V476m5_t-zM/hqdefault.jpg" },
      { id: "6B3_C7F3j_M", title: "Phir Le Aya Dil", artist: "Arijit Singh & Pritam", duration: 305, cover: "https://img.youtube.com/vi/6B3_C7F3j_M/hqdefault.jpg" }
    ]
  },
  fredagain: {
    id: "fredagain",
    name: "फ्रेड अगेन...",
    freq: "FM 106.8",
    logoLine1: "फ्रेड",
    logoLine2: "अगेन...",
    playlistUrl: "https://www.youtube.com/playlist?list=PLZIT0z5Rfu98GEqiC7T7lknMLGYNHiEtU",
    slogans: [
      "Feel it. Live it. Fred again.",
      "Dance like nobody's watching",
      "Emotional, electronic, alive",
      "The beat that finds your soul"
    ],
    wallpapers: [
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80"
    ],
    tracks: [
      { id: "vj0gNfB27jY", title: "Delilah (pull me out of this)", artist: "Fred again..", duration: 250, cover: "https://img.youtube.com/vi/vj0gNfB27jY/hqdefault.jpg" },
      { id: "F77w_Hl60c8", title: "Jungle", artist: "Fred again..", duration: 198, cover: "https://img.youtube.com/vi/F77w_Hl60c8/hqdefault.jpg" },
      { id: "qEkn0r9Vn_Q", title: "Rumble", artist: "Skrillex, Fred again.. & Flowdan", duration: 146, cover: "https://img.youtube.com/vi/qEkn0r9Vn_Q/hqdefault.jpg" },
      { id: "U31y_s9q_t0", title: "leavemealone", artist: "Fred again.. & Baby Keem", duration: 222, cover: "https://img.youtube.com/vi/U31y_s9q_t0/hqdefault.jpg" },
      { id: "N3dJ_p7l9iU", title: "adore u", artist: "Fred again.. & Obongjayar", duration: 220, cover: "https://img.youtube.com/vi/N3dJ_p7l9iU/hqdefault.jpg" },
      { id: "g-5Vf0N24d0", title: "Marea (we've lost dancing)", artist: "Fred again..", duration: 285, cover: "https://img.youtube.com/vi/g-5Vf0N24d0/hqdefault.jpg" }
    ]
  }
};

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
  el.listItems.innerHTML = '';
  state.order.forEach((trackIdx, i) => {
    const t = state.tracks[trackIdx];
    const li = document.createElement('li');
    li.className = 'list__item' + (i === state.pos ? ' active' : '');
    li.innerHTML = `
      <span class="item-num">${i + 1}</span>
      <div class="item-info">
        <span class="item-title">${t.title}</span>
        <span class="item-artist">${t.artist}</span>
      </div>
      <span class="item-dur">${fmtTime(t.duration)}</span>
    `;
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
  yt.loadVideoById(currentTrack().id);
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

window.onYouTubeIframeAPIReady = () => {
  const firstTrack = currentTrack();
  yt = new YT.Player('yt-player', {
    height: '1',
    width: '1',
    videoId: firstTrack ? firstTrack.id : 'N0jnLZxYwYc',
    playerVars: {
      playsinline: 1,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      rel: 0,
      autoplay: 0
    },
    events: {
      onReady: () => {
        state.ready = true;
        el.play.disabled = false;
        preferAudio();
      },
      onStateChange: (e) => {
        const S = YT.PlayerState;
        if (e.data === S.PLAYING) {
          renderPlaying(true);
          preferAudio();
        } else if (e.data === S.PAUSED || e.data === S.BUFFERING) {
          renderPlaying(e.data === S.BUFFERING && state.playing);
        } else if (e.data === S.ENDED) {
          go(state.pos + 1);
        }
      },
      onError: (e) => {
        console.warn("YouTube player error:", e.data);
        if (state.started) setTimeout(() => go(state.pos + 1), 1000);
      }
    }
  });

  setInterval(samplePlayer, 250);
  requestAnimationFrame(paintProgress);
};

// ------------------------------------------------------------
// 9. STATION SWITCHING
// ------------------------------------------------------------
function switchGenre(genreId, autoPlay = true) {
  const station = STATIONS[genreId];
  if (!station) return;

  currentGenre = genreId;
  document.body.className = "genre--" + genreId;

  el.logoLine1.textContent = station.logoLine1;
  el.logoLine2.textContent = station.logoLine2;
  el.presenceText.textContent = station.name;
  el.ytLink.href = station.playlistUrl;
  el.listYtLink.href = station.playlistUrl;
  document.getElementById('list-title').textContent = "प्लेलिस्ट — " + station.name;

  // Update genre buttons
  document.querySelectorAll('.genre-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.genre === genreId);
  });

  // Load tracks
  state.tracks = station.tracks;
  state.order = buildOrder();
  state.pos = 0;
  renderList();
  renderTrack();

  // Wallpapers & Slogans
  startWallpaperRotation(station.wallpapers);
  cycleSlogans(station.slogans);

  // Play immediately if user clicked
  if (yt && state.ready && autoPlay) {
    state.started = true;
    yt.loadVideoById(currentTrack().id);
  }

  // Close panel
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
    el.weatherTemp.textContent = Math.round(data.main.temp) + "°C";
    el.weatherIcon.textContent = getWeatherEmoji(data.weather[0].id);
    el.weatherCity.textContent = data.name || "दिल्ली";
  };

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=28.6139&lon=77.2090&appid=${OWM_API_KEY}&units=metric`);
    if (res.ok) applyData(await res.json());
  } catch (_) {
    el.weatherTemp.textContent = "28°C";
    el.weatherIcon.textContent = "⛅";
    el.weatherCity.textContent = "दिल्ली";
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
  el.listBtn.classList.toggle('active', open);
  el.listBtn.setAttribute('aria-expanded', String(open));
  if (open && el.genrePanel.classList.contains('is-open')) toggleGenrePanel();
}

function toggleGenrePanel() {
  const open = !el.genrePanel.classList.contains('is-open');
  el.genrePanel.classList.toggle('is-open', open);
  el.stationsBtn.classList.toggle('active', open);
  el.stationsBtn.setAttribute('aria-expanded', String(open));
  if (open && el.list.classList.contains('is-open')) togglePlaylist();
}

// ------------------------------------------------------------
// 15. INITIALIZATION
// ------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  tickClock();
  setInterval(tickClock, 10000);
  fetchWeather();

  // Load initial highway station
  state.tracks = STATIONS.highway.tracks;
  state.order = buildOrder();
  state.pos = 0;
  renderList();
  renderTrack();
  startWallpaperRotation(STATIONS.highway.wallpapers);
  cycleSlogans(STATIONS.highway.slogans);

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
    state.pos = Math.max(0, state.order.indexOf(state.tracks.indexOf(keep)));
    renderList();
    renderTrack();
  });

  el.listBtn.addEventListener('click', togglePlaylist);
  el.stationsBtn.addEventListener('click', toggleGenrePanel);
  el.hornBtn.addEventListener('click', honk);

  // Genre selection
  document.querySelectorAll('.genre-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      ensureAudio();
      switchGenre(btn.dataset.genre, true);
    });
  });

  // Global keybindings (Space = play/pause, H = horn, N = next, P = prev)
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
