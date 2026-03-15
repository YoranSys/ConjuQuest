import { genererSerie, getTempsLabel } from '../../data/questions.js';
import { calcXP, getComboLabel } from '../../engine/xp.js';
import { addXP, incrementStreak, resetStreak, recordResponse } from '../../state.js';
import { DB } from '../../db.js';
import { playCorrect, playWrong, playCombo } from '../../utils/audio.js';
import { vibrate } from '../../utils/haptics.js';
import { showFeedback } from '../../ui/components/feedback.js';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PAIRS_COUNT = 8;

export class MemoryGame {
  constructor(options = {}) {
    this.n = PAIRS_COUNT;
    this.onComplete = options.onComplete || (() => {});
    this.container = null;

    this.cards = [];
    this._questions = [];
    this.flippedCards = [];
    this.pairsFound = 0;
    this.vies = 3;
    this.streak = 0;
    this.score = 0;
    this.isLocked = false;
    this.questionStartTime = null;
  }

  start(container) {
    this.container = container;
    this._generateCards();
    this._render();
  }

  _generateCards() {
    this._questions = genererSerie(this.n);
    const pairs = [];

    this._questions.forEach((q, i) => {
      const clueText = `${q.pronom.charAt(0).toUpperCase() + q.pronom.slice(1)} ___ (${q.infinitif}) — ${getTempsLabel(q.temps)}`;
      pairs.push(
        { id: `q${i}`, pairId: i, type: 'clue', content: clueText },
        { id: `a${i}`, pairId: i, type: 'answer', content: q.correcte },
      );
    });

    this.cards = shuffle(pairs).map((c, idx) => ({ ...c, index: idx, flipped: false, matched: false }));
  }

  _render() {
    const hearts = [...Array(3)]
      .map((_, i) => `<span class="vie ${i < this.vies ? 'active' : 'lost'}">❤️</span>`)
      .join('');

    this.container.innerHTML = `
      <div class="memory-game">
        <div class="game-header">
          <div class="vies">${hearts}</div>
          <div class="progress-text">
            Paires <span id="pairs-found">0</span>/<span id="pairs-total">${this.n}</span>
          </div>
          <div class="score-display">Score: <span id="score">0</span></div>
        </div>

        <div class="memory-hint">🃏 Associe chaque verbe avec sa conjugaison !</div>

        <div class="memory-grid" id="memory-grid">
          ${this.cards.map(card => `
            <button class="memory-card" type="button" data-index="${card.index}">
              <div class="memory-card-inner">
                <div class="memory-card-front">🃏</div>
                <div class="memory-card-back ${card.type === 'clue' ? 'memory-card-clue' : 'memory-card-answer'}">${card.content}</div>
              </div>
            </button>
          `).join('')}
        </div>

        <div class="combo-display" id="combo-display"></div>
        <div class="feedback-overlay" id="feedback-overlay"></div>
      </div>
    `;

    document.getElementById('memory-grid').addEventListener('click', (e) => {
      const cardEl = e.target.closest('.memory-card');
      if (!cardEl) return;
      const index = parseInt(cardEl.dataset.index, 10);
      this._flipCard(index);
    });
  }

  _flipCard(index) {
    const card = this.cards[index];
    if (this.isLocked || card.flipped || card.matched) return;
    if (this.flippedCards.length >= 2) return;

    card.flipped = true;
    this._updateCardDOM(index);
    this.flippedCards.push(index);

    if (this.flippedCards.length === 1) {
      this.questionStartTime = Date.now();
    } else if (this.flippedCards.length === 2) {
      this._checkMatch();
    }
  }

  _checkMatch() {
    this.isLocked = true;
    const [i1, i2] = this.flippedCards;
    const c1 = this.cards[i1];
    const c2 = this.cards[i2];
    const tempsMs = Date.now() - this.questionStartTime;

    const correct = c1.pairId === c2.pairId && c1.type !== c2.type;
    const q = this._questions[c1.pairId] ?? this._questions[c2.pairId];

    DB.updateStat(q.verbeId, q.temps, correct);

    if (correct) {
      this.streak++;
      incrementStreak();
      const xp = calcXP(true, this.streak, tempsMs, this.vies);
      addXP(xp);
      recordResponse(true);
      this.score += xp;
      this.pairsFound++;

      playCorrect();
      vibrate([50]);

      const combo = getComboLabel(this.streak);
      if (combo) {
        this._showCombo(combo);
        playCombo();
      }

      showFeedback(this.container.querySelector('#feedback-overlay'), true, `+${xp} XP`);

      this.cards[i1].matched = true;
      this.cards[i2].matched = true;
      this._updateCardDOM(i1, 'matched');
      this._updateCardDOM(i2, 'matched');

      document.getElementById('pairs-found').textContent = this.pairsFound;
      document.getElementById('score').textContent = this.score;

      this.flippedCards = [];
      this.isLocked = false;

      if (this.pairsFound >= this.n) {
        setTimeout(() => this._terminer(), 800);
      }
    } else {
      this.streak = 0;
      resetStreak();
      recordResponse(false);
      this.vies--;

      playWrong();
      vibrate([100, 50, 100]);

      this._updateVies();
      showFeedback(this.container.querySelector('#feedback-overlay'), false, '');

      if (this.vies <= 0) {
        setTimeout(() => this._terminer(), 1500);
        return;
      }

      setTimeout(() => {
        this.cards[i1].flipped = false;
        this.cards[i2].flipped = false;
        this._updateCardDOM(i1);
        this._updateCardDOM(i2);
        this.flippedCards = [];
        this.isLocked = false;
      }, 1000);
    }
  }

  _updateCardDOM(index, state = null) {
    const cardEl = this.container.querySelector(`[data-index="${index}"]`);
    if (!cardEl) return;

    if (this.cards[index].flipped || this.cards[index].matched) {
      cardEl.classList.add('flipped');
    } else {
      cardEl.classList.remove('flipped');
    }

    if (state === 'matched') {
      cardEl.classList.add('matched');
    }
  }

  _updateVies() {
    const viesEl = this.container.querySelector('.vies');
    if (!viesEl) return;
    viesEl.innerHTML = [...Array(3)]
      .map((_, i) => `<span class="vie ${i < this.vies ? 'active' : 'lost'}">❤️</span>`)
      .join('');
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
      questions: this.n,
      game: 'memory',
    });
  }

  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
