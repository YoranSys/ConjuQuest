import { genererSerie, getTempsFormule, getTempsCouleur } from '../../data/questions.js';
import { calcXP, getComboLabel } from '../../engine/xp.js';
import { addXP, incrementStreak, resetStreak, recordResponse } from '../../state.js';
import { DB } from '../../db.js';
import { playCorrect, playWrong, playCombo } from '../../utils/audio.js';
import { vibrate } from '../../utils/haptics.js';
import { showFeedback } from '../../ui/components/feedback.js';

export class MissileGame {
  constructor(options = {}) {
    this.questions = genererSerie(options.n || 10, options.temps || null);
    this.currentIndex = 0;
    this.vies = 3;
    this.streak = 0;
    this.score = 0;
    this.startTime = null;
    this.onComplete = options.onComplete || (() => {});
    this.container = null;
    this.questionStartTime = null;
  }

  start(container) {
    this.container = container;
    this.container.innerHTML = '';
    this.render();
    this.afficherQuestion();
  }

  render() {
    this.container.innerHTML = `
      <div class="missile-game">
        <div class="game-header">
          <div class="vies">
            ${[...Array(3)].map((_, i) => `<span class="vie ${i < this.vies ? 'active' : 'lost'}">❤️</span>`).join('')}
          </div>
          <div class="progress-text">
            Question <span id="q-current">1</span>/<span id="q-total">${this.questions.length}</span>
          </div>
          <div class="score-display">Score: <span id="score">0</span></div>
        </div>

        <div class="game-scene">
          <div class="space-bg">
            <div class="rocket" id="rocket">🚀</div>
            <div class="planet" id="planet">🪐</div>
            <div class="progress-bar-container">
              <div class="progress-bar" id="game-progress" style="width: 0%"></div>
            </div>
          </div>
        </div>

        <div class="question-area" id="question-area">
          <div class="question-text" id="question-text"></div>
          <div class="temps-label" id="temps-label"></div>
          <div class="choices" id="choices"></div>
          <div class="phrase-motivation" id="phrase-motivation"></div>
        </div>

        <div class="combo-display" id="combo-display"></div>
        <div class="feedback-overlay" id="feedback-overlay"></div>
      </div>
    `;
  }

  afficherQuestion() {
    if (this.currentIndex >= this.questions.length) {
      this.terminer();
      return;
    }

    const q = this.questions[this.currentIndex];
    this.questionStartTime = Date.now();

    const questionText = document.getElementById('question-text');
    const tempsLabel = document.getElementById('temps-label');
    const choices = document.getElementById('choices');
    const qCurrent = document.getElementById('q-current');
    const progress = document.getElementById('game-progress');
    const phraseEl = document.getElementById('phrase-motivation');

    if (!questionText) return;

    qCurrent.textContent = this.currentIndex + 1;
    questionText.textContent = q.texte;
    tempsLabel.textContent = getTempsFormule(q.temps);
    tempsLabel.className = `temps-label ${getTempsCouleur(q.temps)}`;
    if (phraseEl) phraseEl.textContent = q.phrase || '';

    choices.innerHTML = '';
    q.choix.forEach((choix) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choix;
      btn.dataset.value = choix;
      btn.addEventListener('click', () => this.repondre(choix, btn));
      choices.appendChild(btn);
    });

    const percent = (this.currentIndex / this.questions.length) * 100;
    progress.style.width = `${percent}%`;
    const rocket = document.getElementById('rocket');
    if (rocket) rocket.style.left = `${percent}%`;

    document.getElementById('score').textContent = this.score;
  }

  repondre(choix, btn) {
    const q = this.questions[this.currentIndex];
    const tempsMs = Date.now() - this.questionStartTime;
    const correct = choix === q.correcte;

    const allBtns = this.container.querySelectorAll('.choice-btn');
    allBtns.forEach(b => {
      b.disabled = true;
      if (b.dataset.value === q.correcte) b.classList.add('correct');
      else if (b === btn && !correct) b.classList.add('wrong');
    });

    DB.updateStat(q.verbeId, q.temps, correct);

    if (correct) {
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
        this.showCombo(combo);
        playCombo();
      }

      showFeedback(this.container.querySelector('#feedback-overlay'), true, `+${xp} XP`);
    } else {
      this.streak = 0;
      resetStreak();
      recordResponse(false);
      this.vies--;

      playWrong();
      vibrate([100, 50, 100]);

      this.updateVies();
      showFeedback(this.container.querySelector('#feedback-overlay'), false, q.correcte);

      if (this.vies <= 0) {
        setTimeout(() => this.terminer(), 1500);
        return;
      }
    }

    document.getElementById('score').textContent = this.score;

    setTimeout(() => {
      this.currentIndex++;
      this.afficherQuestion();
    }, 1200);
  }

  updateVies() {
    const viesEl = this.container.querySelector('.vies');
    if (!viesEl) return;
    viesEl.innerHTML = [...Array(3)].map((_, i) =>
      `<span class="vie ${i < this.vies ? 'active' : 'lost'}">❤️</span>`
    ).join('');
  }

  showCombo(combo) {
    const el = document.getElementById('combo-display');
    if (!el) return;
    el.innerHTML = `<span class="${combo.class}">${combo.icon} ${combo.label}</span>`;
    el.style.opacity = '1';
    setTimeout(() => { el.style.opacity = '0'; }, 2000);
  }

  terminer() {
    this.onComplete({
      score: this.score,
      streak: this.streak,
      viesRestantes: this.vies,
      questions: this.questions.length,
      game: 'missile',
    });
  }

  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
