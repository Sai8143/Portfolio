// Cinematic Icon Whoosh Audio Manager
// Plays cinematic-whoosh-for-icons-1_bgMWBseW.mp3 ONLY for icons coming VERY CLOSE to the screen

let audioBuffer = null;
let sharedAudioCtx = null;
let isFetching = false;
let lastWhooshTime = 0;

// Audio element pool for fast playback
const audioPool = [];
const POOL_SIZE = 4;

function getAudioContext() {
  if (!sharedAudioCtx) {
    const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
    if (AudioCtxClass) {
      sharedAudioCtx = new AudioCtxClass();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

// Preload the MP3 file into Web Audio API buffer & HTMLAudioElement pool
export function preloadWhooshSound() {
  if (typeof window === "undefined") return;

  if (audioPool.length === 0) {
    for (let i = 0; i < POOL_SIZE; i++) {
      const audio = new Audio("/cinematic-whoosh-for-icons-1_bgMWBseW.mp3");
      audio.preload = "auto";
      audio.volume = 0.55;
      audioPool.push(audio);
    }
  }

  const ctx = getAudioContext();
  if (ctx && !audioBuffer && !isFetching) {
    isFetching = true;
    fetch("/cinematic-whoosh-for-icons-1_bgMWBseW.mp3")
      .then((res) => res.arrayBuffer())
      .then((buffer) => ctx.decodeAudioData(buffer))
      .then((decoded) => {
        audioBuffer = decoded;
      })
      .catch(() => {})
      .finally(() => {
        isFetching = false;
      });
  }
}

// Play whoosh sound ONLY when an icon passes VERY CLOSE to the screen
// Enforces a strict 1.2s global throttle so sounds remain cinematic & non-repetitive
export function playIconWhooshSound(volume = 0.55) {
  try {
    const now = performance.now();
    // 1.2s Global Throttle Guard: prevents overlapping/frequent whooshes
    if (now - lastWhooshTime < 1200) {
      return;
    }
    lastWhooshTime = now;

    const ctx = getAudioContext();

    // Strategy 1: High-fidelity Web Audio API buffer playback
    if (ctx && audioBuffer && ctx.state === "running") {
      const source = ctx.createBufferSource();
      const gainNode = ctx.createGain();

      source.buffer = audioBuffer;
      gainNode.gain.setValueAtTime(Math.min(0.70, Math.max(0.20, volume)), ctx.currentTime);

      source.connect(gainNode);
      gainNode.connect(ctx.destination);
      source.start(0);
      return;
    }

    // Strategy 2: HTML5 Audio Pool fallback
    const availableAudio = audioPool.find((a) => a.paused || a.ended);
    if (availableAudio) {
      availableAudio.currentTime = 0;
      availableAudio.volume = Math.min(0.70, Math.max(0.20, volume));
      availableAudio.play().catch(() => {});
      return;
    }
  } catch (e) {
    // Ignore autoplay restriction errors safely
  }
}
