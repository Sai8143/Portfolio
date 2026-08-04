// Global Button Click Audio Manager
// Plays Digital Click.mp3 for all button and interactive element clicks across the website

let audioBuffer = null;
let sharedAudioCtx = null;
let isFetching = false;

const audioPool = [];
const POOL_SIZE = 8;

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

export function preloadClickSound() {
  if (typeof window === "undefined") return;

  // Initialize pool for HTML5 Audio fallback
  if (audioPool.length === 0) {
    for (let i = 0; i < POOL_SIZE; i++) {
      const audio = new Audio("/Digital Click.mp3");
      audio.preload = "auto";
      audio.volume = 0.50;
      audioPool.push(audio);
    }
  }

  // Preload into Web Audio API AudioBuffer for 0-latency playback
  const ctx = getAudioContext();
  if (ctx && !audioBuffer && !isFetching) {
    isFetching = true;
    fetch("/Digital Click.mp3")
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

export function playDigitalClickSound() {
  try {
    const ctx = getAudioContext();

    // Strategy 1: High-Fidelity 0-latency Web Audio API
    if (ctx && audioBuffer && ctx.state === "running") {
      const source = ctx.createBufferSource();
      const gainNode = ctx.createGain();

      source.buffer = audioBuffer;
      gainNode.gain.setValueAtTime(0.55, ctx.currentTime);

      source.connect(gainNode);
      gainNode.connect(ctx.destination);
      source.start(0);
      return;
    }

    // Strategy 2: Fast HTML5 Audio Pool
    const availableAudio = audioPool.find((a) => a.paused || a.ended);
    if (availableAudio) {
      availableAudio.currentTime = 0;
      availableAudio.volume = 0.55;
      availableAudio.play().catch(() => {});
      return;
    }
  } catch (e) {
    // Ignore autoplay errors safely
  }
}

// Global Event Listener attached to window
export function initGlobalButtonClickSound() {
  if (typeof window === "undefined") return;

  preloadClickSound();

  const handleGlobalClick = (e) => {
    const target = e.target;
    if (!target) return;

    // Check if clicked element is a button, link, or interactive role
    const isInteractive = target.closest(
      'button, a, [role="button"], input[type="submit"], input[type="button"], select, label, .cursor-pointer'
    );

    if (isInteractive) {
      playDigitalClickSound();
    }
  };

  window.addEventListener("pointerdown", handleGlobalClick, { capture: true, passive: true });

  return () => {
    window.removeEventListener("pointerdown", handleGlobalClick, { capture: true });
  };
}
