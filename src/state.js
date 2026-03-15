import { DB, initProfile } from './db.js';
import { getNiveau, getXPPourNiveau } from './engine/xp.js';

let _state = {
  profile: null,
  inventory: [],
  stats: {},
  chests: [],
  currentScreen: 'home',
  currentGame: null,
  streak: 0,
  boostXP: false,
  boostXPExpiry: null,
};

const _listeners = new Set();

export function getState() {
  return { ..._state };
}

export function subscribe(fn) {
  _listeners.add(fn);
  return () => _listeners.delete(fn);
}

function emit() {
  _listeners.forEach(fn => fn(_state));
}

export function setState(partial) {
  _state = { ..._state, ...partial };
  emit();
}

export async function initState() {
  const profile = initProfile();
  const inventory = DB.getInventory();
  const stats = DB.getStats();
  const chests = DB.getChests();

  setState({ profile, inventory, stats, chests });
}

export function navigate(screen) {
  setState({ currentScreen: screen });
}

export function addXP(amount) {
  const state = getState();
  const { profile } = state;

  let bonus = amount;
  if (state.boostXP && state.boostXPExpiry > Date.now()) {
    bonus *= 2;
  }

  const newXP = profile.xp + bonus;
  const newNiveau = getNiveau(newXP);
  const leveledUp = newNiveau > profile.niveau;

  const updatedProfile = {
    ...profile,
    xp: newXP,
    niveau: newNiveau,
    xpPourProchainNiveau: getXPPourNiveau(newNiveau + 1),
  };

  DB.saveProfile(updatedProfile);
  setState({ profile: updatedProfile });

  return { leveledUp, newNiveau, xpGained: bonus };
}

export function incrementStreak() {
  const { streak } = _state;
  const newStreak = streak + 1;
  setState({ streak: newStreak });

  const { profile } = _state;
  if (newStreak > (profile.maxStreak || 0)) {
    const updatedProfile = { ...profile, maxStreak: newStreak };
    DB.saveProfile(updatedProfile);
    setState({ profile: updatedProfile });
  }

  return newStreak;
}

export function resetStreak() {
  setState({ streak: 0 });
}

export function recordResponse(correct) {
  const { profile } = _state;
  const updatedProfile = {
    ...profile,
    totalReponses: (profile.totalReponses || 0) + 1,
    totalCorrectes: (profile.totalCorrectes || 0) + (correct ? 1 : 0),
  };
  DB.saveProfile(updatedProfile);
  setState({ profile: updatedProfile });
}
