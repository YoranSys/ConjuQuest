export function showFeedback(container, correct, message = '') {
  if (!container) return;

  container.textContent = '';
  container.className = `feedback-overlay ${correct ? 'feedback-correct' : 'feedback-wrong'}`;
  container.style.opacity = '1';
  container.textContent = correct ? `✅ ${message}` : `❌ Réponse : ${message}`;

  setTimeout(() => {
    container.style.opacity = '0';
    container.className = 'feedback-overlay';
  }, 1000);
}
