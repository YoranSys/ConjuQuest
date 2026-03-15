import { genererSerie } from '../../data/questions.js';
import { calcXP, getComboLabel } from '../../engine/xp.js';
import { addXP, incrementStreak, resetStreak, recordResponse } from '../../state.js';
import { DB } from '../../db.js';
import { playCorrect, playWrong, playCombo } from '../../utils/audio.js';
import { vibrate } from '../../utils/haptics.js';
import { showFeedback } from '../../ui/components/feedback.js';

const GRID = 16;
const SPEED_MS = 220;

const TEMPS_LABELS = {
  present: 'Présent',
  imparfait: 'Imparfait',
  passe_compose: 'Passé composé',
  futur: 'Futur',
};

export class SnakeGame {
  constructor(options = {}) {
    this.questions = genererSerie(options.n || 10, options.temps || null);
    this.currentIndex = 0;
    this.vies = 3;
    this.streak = 0;
    this.score = 0;
    this.onComplete = options.onComplete || (() => {});
    this.container = null;

    this.snake = [];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.food = null;
    this.questionActive = false;
    this.questionStartTime = null;
    this.gameLoopId = null;
    this.lastStepTime = 0;

    this.canvas = null;
    this.ctx = null;
    this.cellSize = 0;

    this._keyHandler = null;
    this._touchStartX = 0;
    this._touchStartY = 0;
    this._touchStartHandler = null;
    this._touchEndHandler = null;
  }

  start(container) {
    this.container = container;
    container.innerHTML = '';
    this._render();
    this._initCanvas();
    this._initSnake();
    this._placeFood();
    this._bindEvents();
    this._startLoop();
  }

  _render() {
    const hearts = [...Array(3)]
      .map((_, i) => `<span class="vie ${i < this.vies ? 'active' : 'lost'}">❤️</span>`)
      .join('');

    this.container.innerHTML = `
      <div class="snake-game">
        <div class="game-header">
          <div class="vies">${hearts}</div>
          <div class="progress-text">
            Question <span id="q-current">0</span>/<span id="q-total">${this.questions.length}</span>
          </div>
          <div class="score-display">Score: <span id="score">0</span></div>
        </div>

        <div class="snake-canvas-wrapper">
          <canvas id="snake-canvas"></canvas>
        </div>

        <div class="snake-hint">🐍 Dirige le serpent vers la 🍎 pour répondre !</div>

        <div class="snake-dpad">
          <div class="dpad-row"><button class="dpad-btn" id="dpad-up">▲</button></div>
          <div class="dpad-row">
            <button class="dpad-btn" id="dpad-left">◀</button>
            <div class="dpad-center"></div>
            <button class="dpad-btn" id="dpad-right">▶</button>
          </div>
          <div class="dpad-row"><button class="dpad-btn" id="dpad-down">▼</button></div>
        </div>

        <div class="snake-question-overlay" id="snake-question-overlay" style="display:none;">
          <div class="snake-question-box">
            <div class="question-text" id="snake-question-text"></div>
            <div class="temps-label" id="snake-temps-label"></div>
            <div class="choices" id="snake-choices"></div>
          </div>
        </div>

        <div class="combo-display" id="combo-display"></div>
        <div class="feedback-overlay" id="feedback-overlay"></div>
      </div>
    `;
  }

  _initCanvas() {
    this.canvas = document.getElementById('snake-canvas');
    const wrapper = this.canvas.parentElement;
    const available = Math.min(wrapper.clientWidth || 300, 320);
    this.cellSize = Math.floor(available / GRID);
    this.canvas.width = GRID * this.cellSize;
    this.canvas.height = GRID * this.cellSize;
    this.ctx = this.canvas.getContext('2d');
  }

  _initSnake() {
    const mid = Math.floor(GRID / 2);
    this.snake = [
      { x: mid, y: mid },
      { x: mid - 1, y: mid },
      { x: mid - 2, y: mid },
    ];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
  }

  _placeFood() {
    let pos;
    do {
      pos = {
        x: Math.floor(Math.random() * GRID),
        y: Math.floor(Math.random() * GRID),
      };
    } while (this.snake.some(s => s.x === pos.x && s.y === pos.y));
    this.food = pos;
  }

  _bindEvents() {
    const DIR_MAP = {
      ArrowUp:    { x: 0,  y: -1 },
      ArrowDown:  { x: 0,  y:  1 },
      ArrowLeft:  { x: -1, y:  0 },
      ArrowRight: { x: 1,  y:  0 },
    };

    this._keyHandler = (e) => {
      if (this.questionActive) return;
      const d = DIR_MAP[e.key];
      if (d && (d.x !== -this.direction.x || d.y !== -this.direction.y)) {
        this.nextDirection = d;
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', this._keyHandler);

    const dpadMap = {
      'dpad-up':    { x: 0,  y: -1 },
      'dpad-down':  { x: 0,  y:  1 },
      'dpad-left':  { x: -1, y:  0 },
      'dpad-right': { x: 1,  y:  0 },
    };
    Object.entries(dpadMap).forEach(([id, dir]) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener('click', () => {
        if (!this.questionActive && (dir.x !== -this.direction.x || dir.y !== -this.direction.y)) {
          this.nextDirection = dir;
        }
      });
    });

    this._touchStartHandler = (e) => {
      this._touchStartX = e.touches[0].clientX;
      this._touchStartY = e.touches[0].clientY;
    };
    this._touchEndHandler = (e) => {
      if (this.questionActive) return;
      const dx = e.changedTouches[0].clientX - this._touchStartX;
      const dy = e.changedTouches[0].clientY - this._touchStartY;
      let d;
      if (Math.abs(dx) > Math.abs(dy)) {
        d = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
      } else {
        d = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
      }
      if (d.x !== -this.direction.x || d.y !== -this.direction.y) {
        this.nextDirection = d;
      }
    };
    this.canvas.addEventListener('touchstart', this._touchStartHandler, { passive: true });
    this.canvas.addEventListener('touchend', this._touchEndHandler, { passive: true });
  }

  _startLoop() {
    const loop = (timestamp) => {
      if (!this.container) return;
      if (!this.questionActive && timestamp - this.lastStepTime >= SPEED_MS) {
        this.lastStepTime = timestamp;
        this._step();
      }
      this._draw();
      this.gameLoopId = requestAnimationFrame(loop);
    };
    this.gameLoopId = requestAnimationFrame(loop);
  }

  _step() {
    this.direction = this.nextDirection;
    const head = this.snake[0];
    const newHead = {
      x: (head.x + this.direction.x + GRID) % GRID,
      y: (head.y + this.direction.y + GRID) % GRID,
    };

    if (this.snake.some(s => s.x === newHead.x && s.y === newHead.y)) {
      this._initSnake();
      return;
    }

    this.snake.unshift(newHead);

    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      this._showQuestion();
    } else {
      this.snake.pop();
    }
  }

  _showQuestion() {
    if (this.currentIndex >= this.questions.length) {
      this._terminer();
      return;
    }

    this.questionActive = true;
    this.questionStartTime = Date.now();
    const q = this.questions[this.currentIndex];

    const questionText = document.getElementById('snake-question-text');
    const tempsLabel = document.getElementById('snake-temps-label');
    const choices = document.getElementById('snake-choices');

    if (!questionText || !tempsLabel || !choices) return;

    questionText.textContent = q.texte;
    tempsLabel.textContent = `Conjugue au ${TEMPS_LABELS[q.temps] || q.temps}`;

    choices.innerHTML = '';
    q.choix.forEach((choix) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choix;
      btn.dataset.value = choix;
      btn.addEventListener('click', () => this._repondre(choix, btn));
      choices.appendChild(btn);
    });

    document.getElementById('snake-question-overlay').style.display = 'flex';
    document.getElementById('q-current').textContent = this.currentIndex + 1;
  }

  _repondre(choix, btn) {
    const q = this.questions[this.currentIndex];
    const tempsMs = Date.now() - this.questionStartTime;
    const correct = choix === q.correcte;

    const allBtns = this.container.querySelectorAll('#snake-choices .choice-btn');
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
        this._showCombo(combo);
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
      this._updateVies();
      showFeedback(this.container.querySelector('#feedback-overlay'), false, q.correcte);
    }

    document.getElementById('score').textContent = this.score;

    setTimeout(() => {
      const overlay = document.getElementById('snake-question-overlay');
      if (overlay) overlay.style.display = 'none';

      this.currentIndex++;
      this.questionActive = false;

      if (this.vies <= 0) {
        this._terminer();
        return;
      }

      if (!correct) {
        this._initSnake();
      }

      this._placeFood();

      if (this.currentIndex >= this.questions.length) {
        this._terminer();
      }
    }, 1200);
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

  _draw() {
    const { ctx, cellSize } = this;
    if (!ctx) return;
    const W = GRID * cellSize;

    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, W, W);

    ctx.strokeStyle = 'rgba(83,74,183,0.12)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * cellSize, 0); ctx.lineTo(i * cellSize, W); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * cellSize); ctx.lineTo(W, i * cellSize); ctx.stroke();
    }

    if (this.food) {
      ctx.font = `${cellSize * 0.8}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🍎', (this.food.x + 0.5) * cellSize, (this.food.y + 0.5) * cellSize);
    }

    this.snake.forEach((seg, i) => {
      const t = 1 - (i / this.snake.length) * 0.55;
      ctx.fillStyle = i === 0 ? '#a78bfa' : `rgba(83,74,183,${t})`;
      ctx.beginPath();
      ctx.roundRect(
        seg.x * cellSize + 1,
        seg.y * cellSize + 1,
        cellSize - 2,
        cellSize - 2,
        3,
      );
      ctx.fill();

      if (i === 0) {
        const eyeSize = Math.max(2, Math.floor(cellSize / 5));
        ctx.fillStyle = '#fff';
        const { x: dx, y: dy } = this.direction;
        const cx = seg.x * cellSize;
        const cy = seg.y * cellSize;
        const c = cellSize;
        if (dx === 1) {
          ctx.fillRect(cx + c * 0.6, cy + c * 0.2, eyeSize, eyeSize);
          ctx.fillRect(cx + c * 0.6, cy + c * 0.55, eyeSize, eyeSize);
        } else if (dx === -1) {
          ctx.fillRect(cx + c * 0.15, cy + c * 0.2, eyeSize, eyeSize);
          ctx.fillRect(cx + c * 0.15, cy + c * 0.55, eyeSize, eyeSize);
        } else if (dy === -1) {
          ctx.fillRect(cx + c * 0.2, cy + c * 0.15, eyeSize, eyeSize);
          ctx.fillRect(cx + c * 0.55, cy + c * 0.15, eyeSize, eyeSize);
        } else {
          ctx.fillRect(cx + c * 0.2, cy + c * 0.6, eyeSize, eyeSize);
          ctx.fillRect(cx + c * 0.55, cy + c * 0.6, eyeSize, eyeSize);
        }
      }
    });
  }

  _terminer() {
    this.onComplete({
      score: this.score,
      streak: this.streak,
      viesRestantes: this.vies,
      questions: this.questions.length,
      game: 'snake',
    });
  }

  destroy() {
    if (this.gameLoopId) {
      cancelAnimationFrame(this.gameLoopId);
      this.gameLoopId = null;
    }
    if (this._keyHandler) {
      document.removeEventListener('keydown', this._keyHandler);
      this._keyHandler = null;
    }
    if (this.canvas && this._touchStartHandler) {
      this.canvas.removeEventListener('touchstart', this._touchStartHandler);
      this.canvas.removeEventListener('touchend', this._touchEndHandler);
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
