import { genererSerie, getTempsLabel } from '../../data/questions.js';
import { calcXP, getComboLabel } from '../../engine/xp.js';
import { addXP, incrementStreak, resetStreak, recordResponse } from '../../state.js';
import { DB } from '../../db.js';
import { playCorrect, playWrong, playCombo } from '../../utils/audio.js';
import { vibrate } from '../../utils/haptics.js';
import { showFeedback } from '../../ui/components/feedback.js';

export class FrappeEclairGame {
  constructor(options = {}) {
    this.questions = genererSerie(options.n || 10, options.temps || null);
    this.currentIndex = 0;
    this.vies = 3;
    this.streak = 0;
    this.score = 0;
    this.onComplete = options.onComplete || (() => {});
    this.container = null;
    this.questionStartTime = null;
  }

  start(container) {
    this.container = container;
    this.container.innerHTML = '';
    this._render();
    this._afficherQuestion();
  }

  _render() {
    this.container.innerHTML = `
      <div class="frappe-game">
        <div class="game-header">
          <div class="vies">
            ${[...Array(3)].map((_, i) => `<span class="vie ${i < this.vies ? 'active' : 'lost'}">❤️</span>`).join('')}
          </div>
          <div class="progress-text">
            Question <span id="q-current">1</span>/<span id="q-total">${this.questions.length}</span>
          </div>
          <div class="score-display">Score: <span id="score">0</span></div>
        </div>

        <div class="frappe-area">
          <div class="question-text" id="question-text"></div>
          <div class="temps-label" id="temps-label"></div>
          <div class="frappe-input-wrapper">
            <input
              type="text"
              id="frappe-input"
              class="frappe-input"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              placeholder="Ta réponse…"
            >
            <button class="frappe-submit" id="frappe-submit">⚡</button>
          </div>
        </div>

        <div class="combo-display" id="combo-display"></div>
        <div class="feedback-overlay" id="feedback-overlay"></div>
      </div>
    `;
  }

  _afficherQuestion() {
    if (this.currentIndex >= this.questions.length) {
      this._terminer();
      return;
    }

    const q = this.questions[this.currentIndex];
    this.questionStartTime = Date.now();

    const questionText = document.getElementById('question-text');
    const tempsLabel = document.getElementById('temps-label');
    const input = document.getElementById('frappe-input');
    const submitBtn = document.getElementById('frappe-submit');
    const qCurrent = document.getElementById('q-current');

    if (!questionText) return;

    qCurrent.textContent = this.currentIndex + 1;
    questionText.textContent = q.texte;
    tempsLabel.textContent = `Conjugue au ${getTempsLabel(q.temps)}`;

    input.value = '';
    input.disabled = false;
    input.classList.remove('frappe-correct', 'frappe-wrong');
    submitBtn.disabled = false;

    submitBtn.onclick = () => this._valider();
    input.onkeydown = (e) => { if (e.key === 'Enter') this._valider(); };

    input.focus();

    document.getElementById('score').textContent = this.score;
  }

  _normaliser(str) {
    return str.trim().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  _valider() {
    const input = document.getElementById('frappe-input');
    if (!input || input.disabled) return;

    const q = this.questions[this.currentIndex];
    const tempsMs = Date.now() - this.questionStartTime;
    const correct = this._normaliser(input.value) === this._normaliser(q.correcte);

    input.disabled = true;
    document.getElementById('frappe-submit').disabled = true;

    DB.updateStat(q.verbeId, q.temps, correct);

    if (correct) {
      input.classList.add('frappe-correct');
      this.streak++;
      incrementStreak();
      const xp = calcXP(true, this.streak, tempsMs, this.vies);
      addXP(xp);
      recordResponse(true);
      this.score += xp;

      playCorrect();
      vibrate([50]);

      const combo = getComboLabel(this.streak);
      if (combo) {
        this._showCombo(combo);
        playCombo();
      }

      showFeedback(this.container.querySelector('#feedback-overlay'), true, `+${xp} XP`);
    } else {
      input.classList.add('frappe-wrong');
      this.streak = 0;
      resetStreak();
      recordResponse(false);
      this.vies--;

      playWrong();
      vibrate([100, 50, 100]);

      this._updateVies();
      showFeedback(this.container.querySelector('#feedback-overlay'), false, q.correcte);

      if (this.vies <= 0) {
        setTimeout(() => this._terminer(), 1500);
        return;
      }
    }

    document.getElementById('score').textContent = this.score;

    setTimeout(() => {
      this.currentIndex++;
      this._afficherQuestion();
    }, 1200);
  }

  _updateVies() {
    const viesEl = this.container.querySelector('.vies');
    if (!viesEl) return;
    viesEl.innerHTML = [...Array(3)].map((_, i) =>
      `<span class="vie ${i < this.vies ? 'active' : 'lost'}">❤️</span>`
    ).join('');
  }

  _showCombo(combo) {
    const el = document.getElementById('combo-display');
    if (!el) return;
    el.innerHTML = `<span class="${combo.class}">${combo.icon} ${combo.label}</span>`;
    el.style.opacity = '1';
    setTimeout(() => { el.style.opacity = '0'; }, 2000);
  }

  _terminer() {
    this.onComplete({
      score: this.score,
      streak: this.streak,
      viesRestantes: Math.max(this.vies, 0),
      questions: this.questions.length,
      game: 'frappe',
    });
  }

  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
