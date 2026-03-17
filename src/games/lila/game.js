import { genererSerieMath, getOperationEmoji, getOperationLabel } from '../../data/math-questions.js';
import { calcXP, getComboLabel } from '../../engine/xp.js';
import { addXP, incrementStreak, resetStreak, recordResponse } from '../../state.js';
import { playCorrect, playWrong, playCombo } from '../../utils/audio.js';
import { vibrate } from '../../utils/haptics.js';
import { showFeedback } from '../../ui/components/feedback.js';

const MAZE_LENGTH = 8;
const REWARDS = ['⭐', '🍬', '🎁', '🌈', '🎀', '🍭', '🏅', '🏆'];
const THEMES = [
  { label: '🌲 Forêt enchantée', bg: '#0d1f0d' },
  { label: '🏰 Château magique', bg: '#110d1f' },
  { label: '🏖️ Plage des trésors', bg: '#0d1a1f' },
];

export class LilaGame {
  constructor(options = {}) {
    const niveau = options.niveau || 1;
    this.questions = genererSerieMath(options.n || MAZE_LENGTH, niveau);
    this.niveau = niveau;
    this.currentIndex = 0;
    this.vies = 3;
    this.streak = 0;
    this.score = 0;
    this.stars = 0;
    this.onComplete = options.onComplete || (() => {});
    this.container = null;
    this.questionStartTime = null;
    this.theme = THEMES[Math.floor(Math.random() * THEMES.length)];
  }

  start(container) {
    this.container = container;
    this.container.innerHTML = '';
    this.render();
    this.afficherQuestion();
  }

  render() {
    this.container.innerHTML = `
      <div class="lila-game">
        <div class="game-header">
          <div class="vies">
            ${[...Array(3)].map((_, i) =>
              `<span class="vie ${i < this.vies ? 'active' : 'lost'}">❤️</span>`
            ).join('')}
          </div>
          <div class="lila-theme-label">${this.theme.label}</div>
          <div class="lila-stars-display">⭐ <span id="lila-stars">0</span></div>
        </div>

        <div class="lila-maze-wrapper">
          <div class="lila-path" id="lila-path"></div>
        </div>

        <div class="question-area" id="question-area">
          <div class="lila-op-badge" id="lila-op-badge"></div>
          <div class="question-text" id="question-text"></div>
          <div class="choices" id="choices"></div>
        </div>

        <div class="combo-display" id="combo-display"></div>
        <div class="feedback-overlay" id="feedback-overlay"></div>
      </div>
    `;
    this._renderPath();
  }

  _renderPath() {
    const path = document.getElementById('lila-path');
    if (!path) return;
    path.innerHTML = '';
    for (let i = 0; i < this.questions.length; i++) {
      const cell = document.createElement('div');
      const isDone = i < this.currentIndex;
      const isCurrent = i === this.currentIndex;
      const isLast = i === this.questions.length - 1;
      cell.className = `lila-cell${isDone ? ' lila-cell-done' : isCurrent ? ' lila-cell-current' : ''}`;
      if (isDone) {
        cell.textContent = REWARDS[i % REWARDS.length];
      } else if (isLast) {
        cell.textContent = '💎';
      } else {
        cell.textContent = isCurrent ? '🧝' : '📦';
      }
      path.appendChild(cell);
    }
  }

  afficherQuestion() {
    if (this.currentIndex >= this.questions.length) {
      this.terminer();
      return;
    }

    const q = this.questions[this.currentIndex];
    this.questionStartTime = Date.now();

    this._renderPath();

    const questionText = document.getElementById('question-text');
    const opBadge = document.getElementById('lila-op-badge');
    const choices = document.getElementById('choices');

    if (!questionText) return;

    opBadge.textContent = `${getOperationEmoji(q.operation)} ${getOperationLabel(q.operation)}`;
    questionText.textContent = q.texte;

    choices.innerHTML = '';
    q.choix.forEach((choix) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choix;
      btn.dataset.value = choix;
      btn.addEventListener('click', () => this.repondre(choix, btn));
      choices.appendChild(btn);
    });

    document.getElementById('lila-stars').textContent = this.stars;
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

    if (correct) {
      this.streak++;
      this.stars++;
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

    document.getElementById('lila-stars').textContent = this.stars;

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
      stars: this.stars,
      game: 'lila',
    });
  }

  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
