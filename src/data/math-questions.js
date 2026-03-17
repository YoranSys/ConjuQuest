// Math question generator for CE1/CE2 (6–8 year olds)
// CE1 (niveau 1): addition / soustraction up to 100
// CE2 (niveau 2): multiplication / division (tables up to 10)

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function distracteurs(correcte) {
  const offsets = [-3, -2, -1, 1, 2, 3, 5, -5, 4, -4, 6, -6];
  const set = new Set();
  for (const d of offsets) {
    const v = correcte + d;
    if (v >= 0 && v !== correcte) set.add(v);
    if (set.size >= 3) break;
  }
  let v = 1;
  while (set.size < 3) {
    if (v !== correcte) set.add(v);
    v++;
  }
  return [...set].slice(0, 3).map(String);
}

function questionAddition(niveau) {
  const max = niveau === 1 ? 100 : 1000;
  const a = rand(1, max - 1);
  const b = rand(1, max - a);
  const correcte = a + b;
  return {
    texte: `${a} + ${b} = ?`,
    correcte: String(correcte),
    choix: shuffle([String(correcte), ...distracteurs(correcte)]),
    operation: 'addition',
    niveau,
  };
}

function questionSoustraction(niveau) {
  const max = niveau === 1 ? 100 : 1000;
  const a = rand(2, max);
  const b = rand(1, a - 1);
  const correcte = a - b;
  return {
    texte: `${a} - ${b} = ?`,
    correcte: String(correcte),
    choix: shuffle([String(correcte), ...distracteurs(correcte)]),
    operation: 'soustraction',
    niveau,
  };
}

function questionMultiplication() {
  const a = rand(2, 10);
  const b = rand(2, 10);
  const correcte = a * b;
  return {
    texte: `${a} × ${b} = ?`,
    correcte: String(correcte),
    choix: shuffle([String(correcte), ...distracteurs(correcte)]),
    operation: 'multiplication',
    niveau: 2,
  };
}

function questionDivision() {
  // Generate from multiplication to guarantee whole-number result
  const b = rand(2, 10);
  const correcte = rand(2, 10);
  const a = b * correcte;
  return {
    texte: `${a} ÷ ${b} = ?`,
    correcte: String(correcte),
    choix: shuffle([String(correcte), ...distracteurs(correcte)]),
    operation: 'division',
    niveau: 2,
  };
}

/**
 * Generate a single math question.
 * @param {number} niveau – 1 for CE1 (addition/soustraction), 2 for CE2 (multiplication/division)
 * @returns {{ texte, correcte, choix, operation, niveau }}
 */
export function genererQuestionMath(niveau = 1) {
  if (niveau >= 2) {
    return Math.random() < 0.6 ? questionMultiplication() : questionDivision();
  }
  return Math.random() < 0.55 ? questionAddition(1) : questionSoustraction(1);
}

/**
 * Generate a series of n math questions.
 * @param {number} n
 * @param {number} niveau
 * @returns {Array}
 */
export function genererSerieMath(n = 8, niveau = 1) {
  return Array.from({ length: n }, () => genererQuestionMath(niveau));
}

/** Emoji for each operation type. */
export function getOperationEmoji(operation) {
  const map = { addition: '➕', soustraction: '➖', multiplication: '✖️', division: '➗' };
  return map[operation] || '🔢';
}

/** Human-readable label for each operation type. */
export function getOperationLabel(operation) {
  const map = {
    addition: 'Addition',
    soustraction: 'Soustraction',
    multiplication: 'Multiplication',
    division: 'Division',
  };
  return map[operation] || operation;
}
