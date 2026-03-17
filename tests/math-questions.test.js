import { describe, it, expect } from 'vitest';
import { genererQuestionMath, genererSerieMath, getOperationEmoji, getOperationLabel } from '../src/data/math-questions.js';

describe('genererQuestionMath — CE1 (niveau 1)', () => {
  it('retourne un objet question avec les propriétés requises', () => {
    const q = genererQuestionMath(1);
    expect(q.texte).toBeTruthy();
    expect(q.correcte).toBeTruthy();
    expect(Array.isArray(q.choix)).toBe(true);
    expect(q.choix).toHaveLength(4);
    expect(q.operation).toMatch(/addition|soustraction/);
    expect(q.niveau).toBe(1);
  });

  it('la bonne réponse est incluse dans les choix', () => {
    for (let i = 0; i < 50; i++) {
      const q = genererQuestionMath(1);
      expect(q.choix).toContain(q.correcte);
    }
  });

  it('tous les choix sont des chaînes représentant des entiers non négatifs', () => {
    for (let i = 0; i < 50; i++) {
      const q = genererQuestionMath(1);
      q.choix.forEach(c => {
        expect(Number.isInteger(Number(c))).toBe(true);
        expect(Number(c)).toBeGreaterThanOrEqual(0);
      });
    }
  });

  it('les 4 choix sont distincts', () => {
    for (let i = 0; i < 50; i++) {
      const q = genererQuestionMath(1);
      const unique = new Set(q.choix);
      expect(unique.size).toBe(4);
    }
  });

  it('le texte de la question contient le symbole = ?', () => {
    for (let i = 0; i < 20; i++) {
      const q = genererQuestionMath(1);
      expect(q.texte).toContain('= ?');
    }
  });

  it('la réponse correcte est mathématiquement juste (addition)', () => {
    for (let i = 0; i < 100; i++) {
      const q = genererQuestionMath(1);
      if (q.operation === 'addition') {
        const [a, b] = q.texte.replace(' = ?', '').split(' + ').map(Number);
        expect(Number(q.correcte)).toBe(a + b);
      }
    }
  });

  it('la réponse correcte est mathématiquement juste (soustraction)', () => {
    for (let i = 0; i < 100; i++) {
      const q = genererQuestionMath(1);
      if (q.operation === 'soustraction') {
        const [a, b] = q.texte.replace(' = ?', '').split(' - ').map(Number);
        expect(Number(q.correcte)).toBe(a - b);
        expect(Number(q.correcte)).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it('les opérations restent dans la plage CE1 (opérandes ≤ 100, résultat ≥ 0)', () => {
    for (let i = 0; i < 100; i++) {
      const q = genererQuestionMath(1);
      expect(Number(q.correcte)).toBeGreaterThanOrEqual(0);
      if (q.operation === 'addition') {
        const [a, b] = q.texte.replace(' = ?', '').split(' + ').map(Number);
        expect(a).toBeLessThanOrEqual(100);
        expect(b).toBeLessThanOrEqual(100);
      }
      if (q.operation === 'soustraction') {
        const [a, b] = q.texte.replace(' = ?', '').split(' - ').map(Number);
        expect(a).toBeLessThanOrEqual(100);
        expect(Number(q.correcte)).toBeGreaterThanOrEqual(0);
      }
    }
  });
});

describe('genererQuestionMath — CE2 (niveau 2)', () => {
  it('retourne une opération CE2 (multiplication ou division)', () => {
    for (let i = 0; i < 50; i++) {
      const q = genererQuestionMath(2);
      expect(q.operation).toMatch(/multiplication|division/);
      expect(q.niveau).toBe(2);
    }
  });

  it('la réponse correcte est mathématiquement juste (multiplication)', () => {
    for (let i = 0; i < 100; i++) {
      const q = genererQuestionMath(2);
      if (q.operation === 'multiplication') {
        const [a, b] = q.texte.replace(' = ?', '').split(' × ').map(Number);
        expect(Number(q.correcte)).toBe(a * b);
      }
    }
  });

  it('la réponse correcte est mathématiquement juste (division)', () => {
    for (let i = 0; i < 100; i++) {
      const q = genererQuestionMath(2);
      if (q.operation === 'division') {
        const [a, b] = q.texte.replace(' = ?', '').split(' ÷ ').map(Number);
        expect(Number(q.correcte)).toBe(a / b);
        expect(Number.isInteger(a / b)).toBe(true);
      }
    }
  });

  it('les tables de multiplication restent dans 2–10', () => {
    for (let i = 0; i < 100; i++) {
      const q = genererQuestionMath(2);
      if (q.operation === 'multiplication') {
        const [a, b] = q.texte.replace(' = ?', '').split(' × ').map(Number);
        expect(a).toBeGreaterThanOrEqual(2);
        expect(a).toBeLessThanOrEqual(10);
        expect(b).toBeGreaterThanOrEqual(2);
        expect(b).toBeLessThanOrEqual(10);
      }
    }
  });
});

describe('genererSerieMath', () => {
  it('génère le bon nombre de questions', () => {
    expect(genererSerieMath(8)).toHaveLength(8);
    expect(genererSerieMath(5)).toHaveLength(5);
  });

  it('chaque question a les propriétés requises', () => {
    genererSerieMath(10, 1).forEach((q, i) => {
      expect(q.texte, `Question ${i} manque texte`).toBeTruthy();
      expect(q.choix, `Question ${i} doit avoir 4 choix`).toHaveLength(4);
      expect(q.correcte, `Question ${i} manque correcte`).toBeTruthy();
      expect(q.choix, `Question ${i}: la correcte doit être dans choix`).toContain(q.correcte);
    });
  });

  it('génère des questions CE2 pour niveau 2', () => {
    genererSerieMath(10, 2).forEach(q => {
      expect(q.operation).toMatch(/multiplication|division/);
    });
  });
});

describe('getOperationEmoji et getOperationLabel', () => {
  it('retourne des emojis pour chaque opération', () => {
    expect(getOperationEmoji('addition')).toBe('➕');
    expect(getOperationEmoji('soustraction')).toBe('➖');
    expect(getOperationEmoji('multiplication')).toBe('✖️');
    expect(getOperationEmoji('division')).toBe('➗');
  });

  it('retourne des libellés pour chaque opération', () => {
    expect(getOperationLabel('addition')).toBe('Addition');
    expect(getOperationLabel('soustraction')).toBe('Soustraction');
    expect(getOperationLabel('multiplication')).toBe('Multiplication');
    expect(getOperationLabel('division')).toBe('Division');
  });
});
