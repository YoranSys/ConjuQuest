export function vibrate(pattern) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

export function vibrateCorrect() {
  vibrate([50]);
}

export function vibrateWrong() {
  vibrate([100, 50, 100]);
}
