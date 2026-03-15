import { describe, it, expect } from 'vitest';
import { tirerRarete, tirerItem, ouvrirCoffre, distribuerRaretes } from '../src/engine/loot.js';
import { RARETES, LOOT_TABLE, COFFRES } from '../src/data/loot-tables.js';

describe('tirerRarete', () => {
  it('retourne une rareté valide', () => {
    for (let i = 0; i < 100; i++) {
      const r = tirerRarete();
      expect(Object.keys(RARETES)).toContain(r);
    }
  });

  it('respecte les probabilités approximativement', () => {
    const dist = distribuerRaretes(10000);
    expect(dist.commune).toBeGreaterThan(0.50);
    expect(dist.commune).toBeLessThan(0.70);
    expect(dist.legendaire).toBeLessThan(0.05);
    expect(dist.legendaire).toBeGreaterThanOrEqual(0);
  });

  it('avec rarete_min=rare, ne tire jamais commune ou peu_commune', () => {
    for (let i = 0; i < 200; i++) {
      const r = tirerRarete('rare');
      expect(['rare', 'epique', 'legendaire']).toContain(r);
    }
  });
});

describe('tirerItem', () => {
  it('retourne un item de la loot table', () => {
    const ids = LOOT_TABLE.map(i => i.id);
    for (let i = 0; i < 50; i++) {
      const item = tirerItem();
      expect(ids).toContain(item.id);
    }
  });

  it('retourne un item avec les propriétés attendues', () => {
    const item = tirerItem();
    expect(item.id).toBeTruthy();
    expect(item.nom).toBeTruthy();
    expect(item.rareté).toBeTruthy();
    expect(item.icon).toBeTruthy();
  });
});

describe('ouvrirCoffre', () => {
  it('retourne null pour un type invalide', () => {
    expect(ouvrirCoffre('inexistant')).toBeNull();
  });

  it('retourne un item pour coffre bois', () => {
    const item = ouvrirCoffre('bois');
    expect(item).not.toBeNull();
    expect(item.coffre).toBe('bois');
    expect(item.obtenuLe).toBeTruthy();
  });

  it('coffre argent donne au minimum peu_commune', () => {
    const raretesValides = ['peu_commune', 'rare', 'epique', 'legendaire'];
    for (let i = 0; i < 50; i++) {
      const item = ouvrirCoffre('argent');
      expect(raretesValides).toContain(item.rareté);
    }
  });

  it('coffre or donne au minimum rare', () => {
    const raretesValides = ['rare', 'epique', 'legendaire'];
    for (let i = 0; i < 50; i++) {
      const item = ouvrirCoffre('or');
      expect(raretesValides).toContain(item.rareté);
    }
  });
});

describe('LOOT_TABLE', () => {
  it('tous les items ont les propriétés requises', () => {
    LOOT_TABLE.forEach(item => {
      expect(item.id).toBeTruthy();
      expect(item.nom).toBeTruthy();
      expect(item.rareté).toBeTruthy();
      expect(item.icon).toBeTruthy();
      expect(item.description).toBeTruthy();
    });
  });

  it('toutes les raretés sont valides', () => {
    const raretesValides = Object.keys(RARETES);
    LOOT_TABLE.forEach(item => {
      expect(raretesValides).toContain(item.rareté);
    });
  });
});
