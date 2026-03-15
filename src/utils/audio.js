let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return audioCtx;
}

function playTone(freq, duration, type = 'sine', volume = 0.3) {
  const ctx = getAudioCtx();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export function playCorrect() {
  playTone(523, 0.1);
  setTimeout(() => playTone(659, 0.1), 100);
  setTimeout(() => playTone(784, 0.2), 200);
}

export function playWrong() {
  playTone(200, 0.3, 'sawtooth', 0.2);
}

export function playCombo() {
  playTone(523, 0.08);
  setTimeout(() => playTone(659, 0.08), 80);
  setTimeout(() => playTone(784, 0.08), 160);
  setTimeout(() => playTone(1047, 0.3), 240);
}

export function playLevelUp() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => setTimeout(() => playTone(freq, 0.15), i * 100));
}
