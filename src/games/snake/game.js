import { addXP } from '../../state.js';
import { playCorrect, playWrong } from '../../utils/audio.js';
import { vibrate } from '../../utils/haptics.js';
import { showFeedback } from '../../ui/components/feedback.js';

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

export function isOppositeDirection(a, b) {
  return a.x + b.x === 0 && a.y + b.y === 0;
}

export function nextHead(head, direction, gridSize) {
  return {
    x: (head.x + direction.x + gridSize) % gridSize,
    y: (head.y + direction.y + gridSize) % gridSize,
  };
}

export function getRandomFoodPosition(gridSize, snake) {
  const occupied = new Set(snake.map((segment) => `${segment.x}:${segment.y}`));
  const free = [];
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const key = `${x}:${y}`;
      if (!occupied.has(key)) free.push({ x, y });
    }
  }
  return free[Math.floor(Math.random() * free.length)];
}

export class SnakeGame {
  constructor(options = {}) {
    this.gridSize = options.gridSize || 12;
    this.tickMs = options.tickMs || 240;
    this.targetFruits = options.targetFruits || 8;
    this.onComplete = options.onComplete || (() => {});
    this.scorePerFruit = 12;
    this.container = null;
    this.loop = null;
    this.snake = [];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.food = null;
    this.score = 0;
    this.collected = 0;
    this.keyboardHandler = (event) => this.onKeydown(event);
  }

  start(container) {
    this.container = container;
    this.resetSnake();
    this.food = getRandomFoodPosition(this.gridSize, this.snake);
    this.render();
    this.paintBoard();
    this.attachControls();
    this.loop = setInterval(() => this.tick(), this.tickMs);
  }

  resetSnake() {
    const center = Math.floor(this.gridSize / 2);
    this.snake = [
      { x: center, y: center },
      { x: center - 1, y: center },
      { x: center - 2, y: center },
    ];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
  }

  render() {
    this.container.innerHTML = `
      <div class="snake-game">
        <div class="game-header">
          <div class="progress-text">Serpent Arc-en-ciel</div>
          <div class="score-display">Score: <span id="snake-score">0</span></div>
        </div>
        <div class="snake-caption">
          Attrape <strong>${this.targetFruits} fruits</strong> pour gagner. Ici, pas de game over brutal 💜
        </div>
        <div class="snake-board" id="snake-board"></div>
        <div class="snake-controls">
          <button class="snake-control up" data-key="ArrowUp">⬆️</button>
          <button class="snake-control left" data-key="ArrowLeft">⬅️</button>
          <button class="snake-control down" data-key="ArrowDown">⬇️</button>
          <button class="snake-control right" data-key="ArrowRight">➡️</button>
        </div>
        <div class="feedback-overlay" id="feedback-overlay"></div>
      </div>
    `;
  }

  paintBoard() {
    const board = this.container.querySelector('#snake-board');
    if (!board) return;
    const cells = [];
    const snakeMap = new Map(this.snake.map((segment, index) => [`${segment.x}:${segment.y}`, index]));
    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize; x++) {
        const key = `${x}:${y}`;
        let className = 'snake-cell';
        if (x === this.food.x && y === this.food.y) className += ' is-food';
        if (snakeMap.has(key)) {
          className += snakeMap.get(key) === 0 ? ' is-head' : ' is-body';
        }
        cells.push(`<div class="${className}"></div>`);
      }
    }
    board.innerHTML = cells.join('');
    this.container.querySelector('#snake-score').textContent = this.score;
  }

  attachControls() {
    document.addEventListener('keydown', this.keyboardHandler);
    this.container.querySelectorAll('.snake-control').forEach((button) => {
      button.addEventListener('click', () => this.changeDirection(button.dataset.key));
    });
  }

  onKeydown(event) {
    this.changeDirection(event.key);
  }

  changeDirection(key) {
    const next = DIRECTIONS[key];
    if (!next) return;
    if (isOppositeDirection(next, this.direction)) return;
    this.nextDirection = next;
  }

  tick() {
    this.direction = this.nextDirection;
    const head = this.snake[0];
    const next = nextHead(head, this.direction, this.gridSize);
    const hitBody = this.snake.some((segment) => segment.x === next.x && segment.y === next.y);

    if (hitBody) {
      playWrong();
      vibrate([70]);
      this.resetSnake();
      showFeedback(this.container.querySelector('#feedback-overlay'), false, 'On repart tranquillement 🌈');
      this.paintBoard();
      return;
    }

    this.snake.unshift(next);

    const ateFood = next.x === this.food.x && next.y === this.food.y;
    if (ateFood) {
      this.collected++;
      this.score += this.scorePerFruit;
      addXP(this.scorePerFruit);
      playCorrect();
      vibrate([35]);
      showFeedback(this.container.querySelector('#feedback-overlay'), true, '+12 XP');
      this.food = getRandomFoodPosition(this.gridSize, this.snake);
      if (this.collected >= this.targetFruits) {
        this.finish();
        return;
      }
    } else {
      this.snake.pop();
    }

    this.paintBoard();
  }

  finish() {
    this.destroy();
    this.onComplete({
      game: 'snake',
      score: this.score,
      streak: this.collected,
      viesRestantes: 3,
      questions: this.targetFruits,
    });
  }

  destroy() {
    if (this.loop) {
      clearInterval(this.loop);
      this.loop = null;
    }
    document.removeEventListener('keydown', this.keyboardHandler);
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
