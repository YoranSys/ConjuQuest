import { describe, it, expect } from 'vitest';
import { isOppositeDirection, nextHead, getRandomFoodPosition } from '../src/games/snake/game.js';

describe('snake helpers', () => {
  it('détecte les directions opposées', () => {
    expect(isOppositeDirection({ x: 1, y: 0 }, { x: -1, y: 0 })).toBe(true);
    expect(isOppositeDirection({ x: 0, y: 1 }, { x: 0, y: -1 })).toBe(true);
    expect(isOppositeDirection({ x: 1, y: 0 }, { x: 0, y: 1 })).toBe(false);
  });

  it('gère le wrap sur les bordures de la grille', () => {
    expect(nextHead({ x: 0, y: 5 }, { x: -1, y: 0 }, 12)).toEqual({ x: 11, y: 5 });
    expect(nextHead({ x: 11, y: 0 }, { x: 1, y: 0 }, 12)).toEqual({ x: 0, y: 0 });
    expect(nextHead({ x: 3, y: 11 }, { x: 0, y: 1 }, 12)).toEqual({ x: 3, y: 0 });
  });

  it('place la nourriture sur une case libre', () => {
    const snake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ];
    const food = getRandomFoodPosition(4, snake);
    expect(snake.some((segment) => segment.x === food.x && segment.y === food.y)).toBe(false);
  });
});
