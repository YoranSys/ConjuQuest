const XP_BASE = 10;
const NIVEAUX = [0, 50, 120, 250, 450, 700, 1000, 1400, 1900, 2500, 3200];

export function getXPPourNiveau(niveau) {
  if (niveau >= NIVEAUX.length) {
    return NIVEAUX[NIVEAUX.length - 1] + (niveau - NIVEAUX.length + 1) * 800;
  }
  return NIVEAUX[niveau] ?? Infinity;
}

export function getNiveau(xpTotal) {
  for (let i = NIVEAUX.length - 1; i >= 0; i--) {
    if (xpTotal >= NIVEAUX[i]) return i;
  }
  return 0;
}

export function getNomNiveau(niveau) {
  const noms = [
    'Débutant',
    'Apprenti conjugueur',
    'Explorateur des temps',
    'Gardien du présent',
    "Maître de l'imparfait",
    'Seigneur du futur',
    'Héros de la grammaire',
    'Champion des verbes',
    'Grand Maître',
    'Légende de ConjuQuest',
    'Légende de ConjuQuest',
  ];
  return noms[Math.min(niveau, noms.length - 1)];
}

export function calcXP(correct, streak, tempsMs, viesRestantes) {
  if (!correct) return 0;

  const bonusStreak = Math.min(streak * 2, 20);
  const bonusSpeed = tempsMs < 3000 ? 5 : 0;
  const bonusVie = viesRestantes === 3 ? 5 : 0;

  return XP_BASE + bonusStreak + bonusSpeed + bonusVie;
}

export function getComboLabel(streak) {
  if (streak >= 10) return { label: 'LÉGENDAIRE !', icon: '🌟', class: 'combo-legendaire' };
  if (streak >= 6)  return { label: 'COMBO x3 !',  icon: '🔥', class: 'combo-x3' };
  if (streak >= 3)  return { label: 'COMBO x2 !',  icon: '⚡', class: 'combo-x2' };
  return null;
}

export function getXPProgressPercent(profile) {
  const xpCourant = profile.xp - getXPPourNiveau(profile.niveau);
  const xpPourProchain = getXPPourNiveau(profile.niveau + 1) - getXPPourNiveau(profile.niveau);
  return Math.min(100, Math.round((xpCourant / xpPourProchain) * 100));
}
