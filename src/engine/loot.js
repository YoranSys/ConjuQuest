import { RARETES, LOOT_TABLE, COFFRES } from '../data/loot-tables.js';

export function tirerRarete(rarete_min = null) {
  const rand = Math.random();
  let cumul = 0;

  const raretesOrdre = ['legendaire', 'epique', 'rare', 'peu_commune', 'commune'];

  // If rarete_min, ne garder que les raretés >= rarete_min (i.e. aussi bonnes ou meilleures).
  // If the value is unknown, fall back to using all rarities.
  const minIndex = rarete_min ? raretesOrdre.indexOf(rarete_min) : -1;
  const raretesDisponibles = minIndex > -1
    ? raretesOrdre.slice(0, minIndex + 1)
    : raretesOrdre;

  // Redistribuer les probabilités
  const total = raretesDisponibles.reduce((s, r) => s + RARETES[r].probabilite, 0);

  for (const rareté of raretesDisponibles) {
    cumul += RARETES[rareté].probabilite / total;
    if (rand <= cumul) return rareté;
  }

  return raretesDisponibles[raretesDisponibles.length - 1];
}

export function tirerItem(rarete_min = null) {
  const rareté = tirerRarete(rarete_min);
  const itemsDeCetteRarete = LOOT_TABLE.filter(item => item.rareté === rareté);

  if (itemsDeCetteRarete.length === 0) {
    return LOOT_TABLE[0];
  }

  return itemsDeCetteRarete[Math.floor(Math.random() * itemsDeCetteRarete.length)];
}

export function ouvrirCoffre(typeCoffre) {
  const config = COFFRES[typeCoffre];
  if (!config) return null;

  const item = tirerItem(config.rarete_min);
  return {
    ...item,
    obtenuLe: new Date().toISOString(),
    coffre: typeCoffre,
  };
}

export function doitRecevoirCoffre(sessionCount) {
  if (sessionCount % 20 === 0 && sessionCount > 0) return 'or';
  if (sessionCount % 5 === 0 && sessionCount > 0) return 'argent';
  return 'bois';
}

export function distribuerRaretes(n = 1000) {
  const counts = Object.fromEntries(Object.keys(RARETES).map(r => [r, 0]));
  for (let i = 0; i < n; i++) {
    counts[tirerRarete()]++;
  }
  return Object.fromEntries(
    Object.entries(counts).map(([r, c]) => [r, c / n])
  );
}
