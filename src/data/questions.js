import { VERBES } from './verbes.js';
import { PHRASES } from './phrases.js';

const PRONOMS = ["je", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles"];
// Maps each pronoun index to the corresponding verb conjugation form index (0–5)
const PRONOMS_FORM_IDX = [0, 1, 2, 2, 2, 3, 4, 5, 5];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function genererQuestion(verbe, temps, difficulte = 'moyen') {
  const idx = Math.floor(Math.random() * PRONOMS.length);
  const pronom = PRONOMS[idx];
  const formIdx = PRONOMS_FORM_IDX[idx];
  const correcte = verbe.temps[temps][formIdx];

  // Distracteurs: formes du même verbe à d'autres temps
  const autresTemps = Object.keys(verbe.temps).filter(t => t !== temps);
  let distracteurs = autresTemps
    .map(t => verbe.temps[t][formIdx])
    .filter(f => f !== correcte);

  // Si pas assez de distracteurs, prendre d'autres personnes du même temps
  if (distracteurs.length < 3) {
    const autresForms = verbe.temps[temps]
      .filter((f, i) => i !== formIdx && f !== correcte);
    distracteurs = [...distracteurs, ...autresForms];
  }

  distracteurs = shuffle(distracteurs).slice(0, 3);

  // Remplir si besoin avec des formes génériques
  while (distracteurs.length < 3) {
    distracteurs.push('...');
  }

  const pronCapitalized = pronom.charAt(0).toUpperCase() + pronom.slice(1);
  const complements = PHRASES[verbe.id];
  const usePhraseATrous = Math.random() < 0.3 && !!complements && complements.length > 0;
  const complement = usePhraseATrous
    ? complements[Math.floor(Math.random() * complements.length)]
    : null;
  const texte = complement
    ? `${pronCapitalized} ___ ${complement} (${verbe.infinitif})`
    : `${pronCapitalized} ___ (${verbe.infinitif})`;

  return {
    texte,
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
 * Returns the correctly formed French instruction for a tense.
 * Known tenses are hard-coded; unknown tenses fall back to a vowel-aware
 * article: "à l'" before a vowel, "au" otherwise.
 * e.g. "Conjugue à l'imparfait" or "Conjugue au présent"
 */
export function getTempsFormule(temps) {
  const formules = {
    present:       'Conjugue au présent',
    imparfait:     "Conjugue à l'imparfait",
    passe_compose: 'Conjugue au passé composé',
    futur:         'Conjugue au futur',
  };
  if (formules[temps]) return formules[temps];
  const label = getTempsLabel(temps);
  const startsWithVowel = /^[aeiouyàâéèêëîïôùûü]/i.test(label);
  return startsWithVowel ? `Conjugue à l'${label}` : `Conjugue au ${label}`;
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
