import { describe, it, expect } from 'vitest';
import { VERBES } from '../src/data/verbes.js';

const PRONOMS_COUNT = 6;
const TEMPS_REQUIS = ['present', 'imparfait', 'passe_compose', 'futur'];

describe('VERBES dataset', () => {
  it('contient exactement 50 verbes', () => {
    expect(VERBES).toHaveLength(50);
  });

  it('chaque verbe a un id unique', () => {
    const ids = VERBES.map(v => v.id);
    const uniq = new Set(ids);
    expect(uniq.size).toBe(VERBES.length);
  });

  it('chaque verbe a les propriétés requises', () => {
    VERBES.forEach(v => {
      expect(v.id).toBeTruthy();
      expect(v.infinitif).toBeTruthy();
      expect([1, 2, 3]).toContain(v.groupe);
      expect(typeof v.irregulier).toBe('boolean');
      expect(v.temps).toBeTruthy();
      expect(v.auxiliaire).toMatch(/^(avoir|être)$/);
      expect(v.participe_passe).toBeTruthy();
    });
  });

  it('chaque verbe a les 4 temps requis', () => {
    VERBES.forEach(v => {
      TEMPS_REQUIS.forEach(temps => {
        expect(v.temps[temps], `Verbe ${v.id} manque le temps ${temps}`).toBeTruthy();
        expect(v.temps[temps]).toHaveLength(PRONOMS_COUNT);
      });
    });
  });

  it('chaque conjugaison est une chaîne non vide', () => {
    VERBES.forEach(v => {
      Object.entries(v.temps).forEach(([temps, formes]) => {
        formes.forEach((forme, idx) => {
          expect(typeof forme, `Verbe ${v.id} temps ${temps} idx ${idx}`).toBe('string');
          expect(forme.trim().length, `Verbe ${v.id} temps ${temps} idx ${idx} est vide`).toBeGreaterThan(0);
        });
      });
    });
  });

  it('être a les conjugaisons correctes au présent', () => {
    const etre = VERBES.find(v => v.id === 'etre');
    expect(etre).toBeTruthy();
    expect(etre.temps.present).toEqual(['suis','es','est','sommes','êtes','sont']);
  });

  it('avoir a les conjugaisons correctes au présent', () => {
    const avoir = VERBES.find(v => v.id === 'avoir');
    expect(avoir).toBeTruthy();
    expect(avoir.temps.present).toEqual(['ai','as','a','avons','avez','ont']);
  });

  it('aller a les conjugaisons correctes au futur', () => {
    const aller = VERBES.find(v => v.id === 'aller');
    expect(aller).toBeTruthy();
    expect(aller.temps.futur).toEqual(['irai','iras','ira','irons','irez','iront']);
  });

  it('finir est un verbe du 2ème groupe avec -iss-', () => {
    const finir = VERBES.find(v => v.id === 'finir');
    expect(finir).toBeTruthy();
    expect(finir.groupe).toBe(2);
    expect(finir.temps.present[3]).toBe('finissons');
    expect(finir.temps.present[5]).toBe('finissent');
  });

  it('les verbes avec auxiliaire être ont le bon auxiliaire', () => {
    const avecEtre = ['aller', 'venir', 'partir', 'sortir'];
    avecEtre.forEach(id => {
      const v = VERBES.find(v => v.id === id);
      expect(v, `Verbe ${id} non trouvé`).toBeTruthy();
      expect(v.auxiliaire, `Verbe ${id} devrait utiliser être`).toBe('être');
    });
  });
});
