export function animateIn(el, animation = 'fadeIn') {
  if (!el) return;
  el.classList.add('anim-' + animation);
  el.addEventListener('animationend', () => el.classList.remove('anim-' + animation), { once: true });
}

export function animateNumber(el, from, to, duration = 500) {
  if (!el) return;
  const start = performance.now();
  const diff = to - from;

  function frame(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + diff * eased);
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

export function shakeElement(el) {
  if (!el) return;
  el.classList.add('anim-shake');
  el.addEventListener('animationend', () => el.classList.remove('anim-shake'), { once: true });
}

export function pulseElement(el) {
  if (!el) return;
  el.classList.add('anim-pulse');
  el.addEventListener('animationend', () => el.classList.remove('anim-pulse'), { once: true });
}
