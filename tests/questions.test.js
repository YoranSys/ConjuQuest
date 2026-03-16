import { describe, it, expect } from 'vitest';
import { genererQuestion, genererSerie } from '../src/data/questions.js';
import { VERBES } from '../src/data/verbes.js';
import { PHRASES } from '../src/data/phrases.js';

describe('PHRASES dataset', () => {
  it('contient des phrases pour tous les verbes du dataset', () => {
    VERBES.forEach(v => {
      expect(PHRASES[v.id], `Verbe ${v.id} manque dans PHRASES`).toBeTruthy();
      expect(PHRASES[v.id].length, `Verbe ${v.id} doit avoir au moins une phrase`).toBeGreaterThan(0);
    });
  });

  it('chaque complément est une chaîne non vide', () => {
    Object.entries(PHRASES).forEach(([id, complements]) => {
      complements.forEach((c, i) => {
        expect(typeof c, `PHRASES[${id}][${i}] doit être une chaîne`).toBe('string');
        expect(c.trim().length, `PHRASES[${id}][${i}] ne doit pas être vide`).toBeGreaterThan(0);
      });
    });
  });
});

describe('genererQuestion', () => {
  const verbe = VERBES.find(v => v.id === 'chanter');

  it('retourne un objet question avec les propriétés requises', () => {
    const q = genererQuestion(verbe, 'present');
    expect(q.texte).toBeTruthy();
    expect(q.pronom).toBeTruthy();
    expect(q.correcte).toBeTruthy();
    expect(Array.isArray(q.choix)).toBe(true);
    expect(q.choix).toHaveLength(4);
    expect(q.verbeId).toBe('chanter');
    expect(q.temps).toBe('present');
    expect(q.infinitif).toBe('chanter');
  });

  it('le texte contient toujours le symbole ___', () => {
    for (let i = 0; i < 20; i++) {
      const q = genererQuestion(verbe, 'present');
      expect(q.texte).toContain('___');
    }
  });

  it('le texte contient toujours l\'infinitif entre parenthèses', () => {
    for (let i = 0; i < 20; i++) {
      const q = genererQuestion(verbe, 'present');
      expect(q.texte).toContain('(chanter)');
    }
  });

  it('le texte commence toujours par le pronom en majuscule', () => {
    for (let i = 0; i < 30; i++) {
      const q = genererQuestion(verbe, 'present');
      const firstChar = q.texte.charAt(0);
      expect(firstChar).toBe(firstChar.toUpperCase());
    }
  });

  it('les phrases à trous apparaissent avec une fréquence approximative de 30%', () => {
    // Detect phrase à trous by checking if texte has a complement between ___ and (infinitif)
    const standardPattern = /^.+ ___ \(\w+\)$/;
    const phrasePattern = /^.+ ___ .+ \(\w+\)$/;
    let phraseCount = 0;
    const N = 500;
    for (let i = 0; i < N; i++) {
      const q = genererQuestion(verbe, 'present');
      if (phrasePattern.test(q.texte) && !standardPattern.test(q.texte)) {
        phraseCount++;
      }
    }
    const ratio = phraseCount / N;
    // Allow ±15% tolerance around 30%
    expect(ratio).toBeGreaterThan(0.15);
    expect(ratio).toBeLessThan(0.45);
  });

  it('le complément de la phrase à trous vient bien de PHRASES', () => {
    const complements = PHRASES[verbe.id];
    for (let i = 0; i < 100; i++) {
      const q = genererQuestion(verbe, 'present');
      // If it's a phrase à trous, the complement must be from PHRASES
      const standardSuffix = ` ___ (${verbe.infinitif})`;
      if (!q.texte.endsWith(standardSuffix)) {
        const matchedComplement = complements.some(c => q.texte.includes(c));
        expect(matchedComplement).toBe(true);
      }
    }
  });
});

describe('genererSerie', () => {
  it('génère le bon nombre de questions', () => {
    const serie = genererSerie(10);
    expect(serie).toHaveLength(10);
  });

  it('chaque question de la série a les propriétés requises', () => {
    const serie = genererSerie(10);
    serie.forEach((q, i) => {
      expect(q.texte, `Question ${i} manque texte`).toBeTruthy();
      expect(q.texte, `Question ${i} doit contenir ___`).toContain('___');
      expect(q.choix, `Question ${i} doit avoir 4 choix`).toHaveLength(4);
      expect(q.correcte, `Question ${i} manque correcte`).toBeTruthy();
    });
  });
});
