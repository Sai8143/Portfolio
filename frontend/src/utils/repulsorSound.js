// Iron Man Repulsor Sound Manager
// Plays Iron man repulsor.mp3 when the user clicks "Initialize Connection" in Contact section

let audioBuffer = null;
let sharedAudioCtx = null;
let isFetching = false;

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

export function preloadRepulsorSound() {
  if (typeof window === "undefined") return;

  const ctx = getAudioContext();
  if (ctx && !audioBuffer && !isFetching) {
    isFetching = true;
    fetch("/Iron man repulsor.mp3")
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

export function playRepulsorSound() {
  try {
    const ctx = getAudioContext();

    // Strategy 1: High-fidelity Web Audio API
    if (ctx && audioBuffer && ctx.state === "running") {
      const source = ctx.createBufferSource();
      const gainNode = ctx.createGain();

      source.buffer = audioBuffer;
      gainNode.gain.setValueAtTime(0.75, ctx.currentTime);

      source.connect(gainNode);
      gainNode.connect(ctx.destination);
      source.start(0);
      return;
    }

    // Strategy 2: HTML5 Audio Fallback
    const audio = new Audio("/Iron man repulsor.mp3");
    audio.volume = 0.75;
    audio.play().catch(() => {});
  } catch (e) {
    // Fallback safe play
    const audio = new Audio("/Iron man repulsor.mp3");
    audio.volume = 0.75;
    audio.play().catch(() => {});
  }
}
