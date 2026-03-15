#!/usr/bin/env node
// Valide l'exhaustivité et la cohérence des conjugaisons dans verbes.js
import { VERBES } from '../src/data/verbes.js';

const TEMPS_REQUIS = ['present', 'imparfait', 'passe_compose', 'futur'];
const PRONOMS_COUNT = 6;

let errors = 0;
let warnings = 0;

console.log(`\n🔍 Validation de ${VERBES.length} verbes...\n`);

VERBES.forEach(verbe => {
  const prefix = `  [${verbe.id}]`;

  if (!verbe.id) { console.error(`${prefix} Manque l'id`); errors++; }
  if (!verbe.infinitif) { console.error(`${prefix} Manque l'infinitif`); errors++; }
  if (![1, 2, 3].includes(verbe.groupe)) { console.error(`${prefix} Groupe invalide: ${verbe.groupe}`); errors++; }
  if (!verbe.auxiliaire) { console.error(`${prefix} Manque l'auxiliaire`); errors++; }
  if (!verbe.participe_passe) { console.error(`${prefix} Manque participe_passe`); errors++; }

  if (!verbe.temps) {
    console.error(`${prefix} Manque le champ "temps"`);
    errors++;
    return;
  }

  TEMPS_REQUIS.forEach(temps => {
    if (!verbe.temps[temps]) {
      console.error(`${prefix} Manque le temps "${temps}"`);
      errors++;
      return;
    }
    if (verbe.temps[temps].length !== PRONOMS_COUNT) {
      console.error(`${prefix} Temps "${temps}" a ${verbe.temps[temps].length} formes, attendu ${PRONOMS_COUNT}`);
      errors++;
    }
    verbe.temps[temps].forEach((forme, i) => {
      if (!forme || forme.trim() === '') {
        console.error(`${prefix} Temps "${temps}" idx ${i} est vide`);
        errors++;
      }
    });
  });

  if (verbe.groupe === 2) {
    const present = verbe.temps.present;
    if (present && !present[3].includes('iss')) {
      console.warn(`${prefix} Groupe 2 - "nous" présent "${present[3]}" ne contient pas "iss"`);
      warnings++;
    }
  }
});

const ids = VERBES.map(v => v.id);
const seen = new Set();
ids.forEach(id => {
  if (seen.has(id)) { console.error(`  Doublon d'id: ${id}`); errors++; }
  seen.add(id);
});

console.log(`\n${errors === 0 ? '✅' : '❌'} Résultat: ${errors} erreur(s), ${warnings} avertissement(s)`);
console.log(`   ${VERBES.length} verbes validés\n`);

if (errors > 0) process.exit(1);
