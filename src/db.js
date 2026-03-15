// Wrapper localStorage pour persistance légère (pas de dépendance externe)
const PREFIX = 'cq_';

function storageGet(key) {
  try {
    const val = localStorage.getItem(PREFIX + key);
    return val ? JSON.parse(val) : null;
  } catch { return null; }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch { /* quota exceeded */ }
}

function storageUpdate(key, fn) {
  const current = storageGet(key);
  const updated = fn(current);
  storageSet(key, updated);
  return updated;
}

export const DB = {
  getProfile: () => storageGet('profile'),
  saveProfile: (data) => storageSet('profile', data),

  getInventory: () => storageGet('inventory') ?? [],
  addItem: (item) => storageUpdate('inventory', inv => [...(inv ?? []), item]),

  getStats: () => storageGet('stats') ?? {},
  updateStat: (verbeId, temps, correct) => storageUpdate('stats', s => {
    const key = `${verbeId}_${temps}`;
    const cur = s?.[key] ?? { correct: 0, total: 0 };
    return { ...s, [key]: { correct: cur.correct + (correct ? 1 : 0), total: cur.total + 1 } };
  }),

  getChests: () => storageGet('chests') ?? [],
  addChest: (chest) => storageUpdate('chests', chests => [...(chests ?? []), chest]),
  removeChest: (id) => storageUpdate('chests', chests => (chests ?? []).filter(c => c.id !== id)),

  getSessionCount: () => storageGet('sessionCount') ?? 0,
  incrementSession: () => storageUpdate('sessionCount', n => (n ?? 0) + 1),

  clear: () => {
    ['profile','inventory','stats','chests','sessionCount'].forEach(k => {
      try { localStorage.removeItem(PREFIX + k); } catch {}
    });
  },
};

export function initProfile() {
  const existing = DB.getProfile();
  if (existing) return existing;

  const profile = {
    nom: 'Aventurier',
    niveau: 1,
    xp: 0,
    xpPourProchainNiveau: 50,
    streak: 0,
    maxStreak: 0,
    totalReponses: 0,
    totalCorrectes: 0,
    creeLe: new Date().toISOString(),
  };
  DB.saveProfile(profile);
  return profile;
}
