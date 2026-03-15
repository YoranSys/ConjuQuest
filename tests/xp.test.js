import { describe, it, expect } from 'vitest';
import { calcXP, getNiveau, getXPPourNiveau, getNomNiveau, getComboLabel } from '../src/engine/xp.js';

describe('calcXP', () => {
  it('retourne 0 si la réponse est incorrecte', () => {
    expect(calcXP(false, 0, 5000, 3)).toBe(0);
  });

  it('retourne XP_BASE (10) pour une réponse correcte standard', () => {
    expect(calcXP(true, 0, 5000, 2)).toBe(10);
  });

  it('ajoute bonus streak', () => {
    expect(calcXP(true, 3, 5000, 2)).toBe(10 + 6);
    expect(calcXP(true, 5, 5000, 2)).toBe(10 + 10);
  });

  it('plafonne le bonus streak à 20', () => {
    expect(calcXP(true, 20, 5000, 2)).toBe(10 + 20);
    expect(calcXP(true, 100, 5000, 2)).toBe(10 + 20);
  });

  it('ajoute bonus speed si < 3000ms', () => {
    expect(calcXP(true, 0, 2999, 2)).toBe(10 + 5);
    expect(calcXP(true, 0, 3000, 2)).toBe(10);
  });

  it('ajoute bonus sans faute (3 vies restantes)', () => {
    expect(calcXP(true, 0, 5000, 3)).toBe(10 + 5);
  });

  it('combine tous les bonus', () => {
    expect(calcXP(true, 5, 1000, 3)).toBe(10 + 10 + 5 + 5);
  });
});

describe('getNiveau', () => {
  it('niveau 0 à 0 XP', () => {
    expect(getNiveau(0)).toBe(0);
  });

  it('niveau 1 à 50 XP', () => {
    expect(getNiveau(50)).toBe(1);
  });

  it('niveau 2 à 120 XP', () => {
    expect(getNiveau(120)).toBe(2);
  });

  it('niveau correct pour XP intermédiaire', () => {
    expect(getNiveau(80)).toBe(1);
    expect(getNiveau(119)).toBe(1);
    expect(getNiveau(121)).toBe(2);
  });
});

describe('getXPPourNiveau', () => {
  it('retourne 50 pour le niveau 1', () => {
    expect(getXPPourNiveau(1)).toBe(50);
  });

  it('retourne 0 pour le niveau 0', () => {
    expect(getXPPourNiveau(0)).toBe(0);
  });

  it('progression croissante', () => {
    for (let i = 1; i < 10; i++) {
      expect(getXPPourNiveau(i + 1)).toBeGreaterThan(getXPPourNiveau(i));
    }
  });
});

describe('getComboLabel', () => {
  it('retourne null pour streak < 3', () => {
    expect(getComboLabel(0)).toBeNull();
    expect(getComboLabel(2)).toBeNull();
  });

  it('retourne COMBO x2 pour streak 3-5', () => {
    const combo = getComboLabel(3);
    expect(combo).not.toBeNull();
    expect(combo.class).toBe('combo-x2');
  });

  it('retourne COMBO x3 pour streak 6-9', () => {
    const combo = getComboLabel(6);
    expect(combo).not.toBeNull();
    expect(combo.class).toBe('combo-x3');
  });

  it('retourne LÉGENDAIRE pour streak >= 10', () => {
    const combo = getComboLabel(10);
    expect(combo).not.toBeNull();
    expect(combo.class).toBe('combo-legendaire');
  });
});
