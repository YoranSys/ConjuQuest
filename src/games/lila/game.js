import { genererSerieMath, getOperationEmoji, getOperationLabel } from '../../data/math-questions.js';
import { calcXP, getComboLabel } from '../../engine/xp.js';
import { addXP, incrementStreak, resetStreak, recordResponse } from '../../state.js';
import { playCorrect, playWrong, playCombo } from '../../utils/audio.js';
import { vibrate } from '../../utils/haptics.js';
import { showFeedback } from '../../ui/components/feedback.js';

const MAZE_LENGTH = 8;
const MAZE_ROWS = 5;
const MAZE_COLS = 5;
const REWARDS = ['⭐', '🍬', '🎁', '🌈', '🎀', '🍭', '🏅', '🏆'];
const THEMES = [
  { label: '🌲 Forêt enchantée', bg: '#0d1f0d' },
  { label: '🏰 Château magique', bg: '#110d1f' },
  { label: '🏖️ Plage des trésors', bg: '#0d1a1f' },
];

// Solution path: 9 positions = 8 steps = 8 questions.
// Enters from the LEFT at row 2, exits to the RIGHT at row 2.
const MAZE_PATH = [
  [2, 0], [1, 0], [0, 0], [0, 1], [0, 2],
  [1, 2], [2, 2], [2, 3], [2, 4],
];
const ENTRY_EXIT_ROW = 2;

/**
 * Build a 5×5 maze wall structure.
 * hW[r][c] = true  →  wall between row r and row r+1 at column c
 * vW[r][c] = true  →  wall between col c and col c+1 at row r
 *
 * All 40 interior walls start PRESENT. Only the 8 solution-path passages
 * plus 16 carefully chosen dead-end corridors are opened, leaving 40 % of
 * walls visible — enough for a proper maze look without any isolated cells.
 *
 * Solution path (9 cells, 8 steps):
 *   Enter LEFT at row 2 → up left col → right along top → down to row 2 → exit RIGHT
 *   [2,0]→[1,0]→[0,0]→[0,1]→[0,2]→[1,2]→[2,2]→[2,3]→[2,4]
 */
function buildMaze() {
  const hW = Array.from({ length: MAZE_ROWS - 1 }, () => new Array(MAZE_COLS).fill(true));
  const vW = Array.from({ length: MAZE_ROWS }, () => new Array(MAZE_COLS - 1).fill(true));

  const oH = (r, c) => { if (r >= 0 && r < MAZE_ROWS - 1 && c >= 0 && c < MAZE_COLS) hW[r][c] = false; };
  const oV = (r, c) => { if (r >= 0 && r < MAZE_ROWS && c >= 0 && c < MAZE_COLS - 1) vW[r][c] = false; };

  // ── Solution path passages (8) ──────────────────────────────────────────
  oH(0, 0); oH(1, 0);           // left col: (2,0)↔(1,0)↔(0,0)
  oV(0, 0); oV(0, 1);           // top row:  (0,0)↔(0,1)↔(0,2)
  oH(0, 2); oH(1, 2);           // descent:  (0,2)↔(1,2)↔(2,2)
  oV(2, 2); oV(2, 3);           // exit:     (2,2)↔(2,3)↔(2,4)

  // ── Dead-end corridors (16) — every cell reachable, no shortcuts ────────
  // Top-right cluster — false path branching off path cell (2,3)
  oV(0, 3);                      // (0,3)↔(0,4)
  oH(0, 3);                      // (0,3)↔(1,3)
  oV(1, 3);                      // (1,3)↔(1,4)
  oH(1, 3);                      // (1,3)↔(2,3) [dead-end bait]

  // Centre-left — stub off path cell (1,0)
  oV(1, 0);                      // (1,0)↔(1,1)

  // Lower-left cluster — branches off path cell (2,0)
  oH(2, 0);                      // (2,0)↔(3,0)
  oV(3, 0);                      // (3,0)↔(3,1)
  oH(2, 1);                      // (2,1)↔(3,1) [also connects isolated (2,1)]
  oH(3, 1);                      // (3,1)↔(4,1)
  oV(4, 0); oV(4, 1);            // (4,0)↔(4,1)↔(4,2)

  // Lower-right cluster — branches off path cell (2,2)
  oH(2, 2);                      // (2,2)↔(3,2)
  oV(3, 2);                      // (3,2)↔(3,3)
  oH(3, 3);                      // (3,3)↔(4,3)
  oV(4, 3);                      // (4,3)↔(4,4)

  // Exit dead-end — one step below the exit cell
  oH(2, 4);                      // (2,4)↔(3,4)

  return { hW, vW };
}

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
    this.mazeData = buildMaze();
  }

  start(container) {
    this.container = container;
    this.container.innerHTML = '';
    this.render();
    this.afficherQuestion();
  }

  render() {
    this.container.innerHTML = `
      <div class="lila-game" style="background-color: ${this.theme.bg};">
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
          <canvas id="maze-canvas" class="lila-maze-canvas"></canvas>
        </div>

        <div class="lila-question-area" id="question-area">
          <div class="lila-progress-text" id="lila-progress">Question 1 / ${this.questions.length}</div>
          <div class="lila-op-badge" id="lila-op-badge"></div>
          <div class="question-text" id="question-text"></div>
          <div class="choices" id="choices"></div>
        </div>

        <div class="combo-display" id="combo-display"></div>
        <div class="feedback-overlay" id="feedback-overlay"></div>
      </div>
    `;
    this._drawMaze();
  }

  _drawMaze() {
    const canvas = this.container && this.container.querySelector('#maze-canvas');
    if (!canvas) return;
    const { hW, vW } = this.mazeData;

    // Fit to wrapper width (cap at 320 so it never exceeds the card)
    const wrapper = canvas.parentElement;
    if (!wrapper) return;
    const availW = Math.min(wrapper.clientWidth - 8, 320);
    const CELL = Math.max(48, Math.floor(availW / MAZE_COLS));
    const WALL = 3;
    const canvasW = MAZE_COLS * CELL;
    const canvasH = MAZE_ROWS * CELL;

    const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;
    canvas.width = canvasW * dpr;
    canvas.height = canvasH * dpr;
    canvas.style.width = canvasW + 'px';
    canvas.style.height = canvasH + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // ── Background ──────────────────────────────────────────────────────────
    ctx.fillStyle = this.theme.bg;
    ctx.fillRect(0, 0, canvasW, canvasH);

    // ── Cell highlights for the solution path ──────────────────────────────
    for (let i = 0; i < MAZE_PATH.length; i++) {
      const [r, c] = MAZE_PATH[i];
      if (i < this.currentIndex) {
        ctx.fillStyle = 'rgba(34,197,94,0.22)';
        ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2);
      } else if (i === this.currentIndex) {
        ctx.fillStyle = 'rgba(251,191,36,0.28)';
        ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2);
      }
    }

    // ── Walls ──────────────────────────────────────────────────────────────
    const wallColor = '#c4880d';
    ctx.strokeStyle = wallColor;
    ctx.lineWidth = WALL;
    ctx.lineCap = 'square';

    // Outer border with openings at ENTRY_EXIT_ROW on left and right
    const er = ENTRY_EXIT_ROW;
    // Top
    ctx.beginPath(); ctx.moveTo(0, WALL / 2); ctx.lineTo(canvasW, WALL / 2); ctx.stroke();
    // Bottom
    ctx.beginPath(); ctx.moveTo(0, canvasH - WALL / 2); ctx.lineTo(canvasW, canvasH - WALL / 2); ctx.stroke();
    // Left (gap for entry)
    ctx.beginPath(); ctx.moveTo(WALL / 2, 0); ctx.lineTo(WALL / 2, er * CELL); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(WALL / 2, (er + 1) * CELL); ctx.lineTo(WALL / 2, canvasH); ctx.stroke();
    // Right (gap for exit)
    ctx.beginPath(); ctx.moveTo(canvasW - WALL / 2, 0); ctx.lineTo(canvasW - WALL / 2, er * CELL); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(canvasW - WALL / 2, (er + 1) * CELL); ctx.lineTo(canvasW - WALL / 2, canvasH); ctx.stroke();

    // Interior horizontal walls (between row r and row r+1)
    for (let r = 0; r < MAZE_ROWS - 1; r++) {
      for (let c = 0; c < MAZE_COLS; c++) {
        if (hW[r][c]) {
          ctx.beginPath();
          ctx.moveTo(c * CELL, (r + 1) * CELL);
          ctx.lineTo((c + 1) * CELL, (r + 1) * CELL);
          ctx.stroke();
        }
      }
    }

    // Interior vertical walls (between col c and col c+1)
    for (let r = 0; r < MAZE_ROWS; r++) {
      for (let c = 0; c < MAZE_COLS - 1; c++) {
        if (vW[r][c]) {
          ctx.beginPath();
          ctx.moveTo((c + 1) * CELL, r * CELL);
          ctx.lineTo((c + 1) * CELL, (r + 1) * CELL);
          ctx.stroke();
        }
      }
    }

    // ── Emoji on path cells ────────────────────────────────────────────────
    const fontSize = Math.floor(CELL * 0.52);
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < MAZE_PATH.length; i++) {
      const [r, c] = MAZE_PATH[i];
      const cx = c * CELL + CELL / 2;
      const cy = r * CELL + CELL / 2;
      let emoji = '';
      if (i < this.currentIndex) {
        emoji = REWARDS[i % REWARDS.length];
      } else if (i === this.currentIndex) {
        emoji = '🧝';
      } else if (i === MAZE_PATH.length - 1) {
        emoji = '💎';
      }
      if (emoji) ctx.fillText(emoji, cx, cy);
    }
  }

  afficherQuestion() {
    if (this.currentIndex >= this.questions.length) {
      this.terminer();
      return;
    }

    const q = this.questions[this.currentIndex];
    this.questionStartTime = Date.now();

    this._drawMaze();

    const questionText = document.getElementById('question-text');
    const opBadge = document.getElementById('lila-op-badge');
    const choices = document.getElementById('choices');

    if (!questionText) return;

    opBadge.textContent = `${getOperationEmoji(q.operation)} ${getOperationLabel(q.operation)}`;
    questionText.textContent = q.texte;

    const progressEl = document.getElementById('lila-progress');
    if (progressEl) progressEl.textContent = `Question ${this.currentIndex + 1} / ${this.questions.length}`;

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
