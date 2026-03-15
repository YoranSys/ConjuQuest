import { VERBES } from './verbes.js';

const PRONOMS = ["je","tu","il/elle","nous","vous","ils/elles"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function genererQuestion(verbe, temps, difficulte = 'moyen') {
  const idx = Math.floor(Math.random() * 6);
  const pronom = PRONOMS[idx];
  const correcte = verbe.temps[temps][idx];

  // Distracteurs: formes du même verbe à d'autres temps
  const autresTemps = Object.keys(verbe.temps).filter(t => t !== temps);
  let distracteurs = autresTemps
    .map(t => verbe.temps[t][idx])
    .filter(f => f !== correcte);

  // Si pas assez de distracteurs, prendre d'autres personnes du même temps
  if (distracteurs.length < 3) {
    const autresForms = verbe.temps[temps]
      .filter((f, i) => i !== idx && f !== correcte);
    distracteurs = [...distracteurs, ...autresForms];
  }

  distracteurs = shuffle(distracteurs).slice(0, 3);

  // Remplir si besoin avec des formes génériques
  while (distracteurs.length < 3) {
    distracteurs.push('...');
  }

  return {
    texte: `${pronom.charAt(0).toUpperCase() + pronom.slice(1)} ___ (${verbe.infinitif})`,
    pronom,
    correcte,
    choix: shuffle([correcte, ...distracteurs]),
    verbeId: verbe.id,
    temps,
    pronomIdx: idx,
    infinitif: verbe.infinitif,
  };
}

export function genererSerie(n = 10, tempsFilter = null) {
  const verbesDisponibles = VERBES.filter(v =>
    tempsFilter ? v.temps[tempsFilter] : true
  );
  const shuffled = shuffle(verbesDisponibles);
  const questions = [];

  for (let i = 0; i < n; i++) {
    const verbe = shuffled[i % shuffled.length];
    const temps = tempsFilter || getTempsAleatoire(verbe);
    questions.push(genererQuestion(verbe, temps));
  }

  return questions;
}

function getTempsAleatoire(verbe) {
  const temps = Object.keys(verbe.temps);
  return temps[Math.floor(Math.random() * temps.length)];
}

export function getTempsLabel(temps) {
  const labels = {
    present: 'présent',
    imparfait: 'imparfait',
    passe_compose: 'passé composé',
    futur: 'futur',
  };
  return labels[temps] || temps;
}

/**
 * Returns the correctly formed French instruction for a tense,
 * using "à l'" before vowels and "au" otherwise.
 * e.g. "Conjugue à l'imparfait" or "Conjugue au présent"
 */
export function getTempsFormule(temps) {
  const formules = {
    present:       "Conjugue au présent",
    imparfait:     "Conjugue à l'imparfait",
    passe_compose: "Conjugue au passé composé",
    futur:         "Conjugue au futur",
  };
  return formules[temps] || `Conjugue au ${temps}`;
}

/** CSS class name for colour-coding a tense. */
export function getTempsCouleur(temps) {
  const couleurs = {
    present:       'temps-present',
    imparfait:     'temps-imparfait',
    passe_compose: 'temps-passe-compose',
    futur:         'temps-futur',
  };
  return couleurs[temps] || '';
}
