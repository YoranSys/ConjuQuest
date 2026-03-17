import { getState, navigate, setState } from '../../state.js';
import { renderXPBar } from '../components/xp-bar.js';
import { DB } from '../../db.js';
import { ouvrirCoffre } from '../../engine/loot.js';
import { renderChest } from '../components/chest.js';
import { HISTOIRE_LICORNES } from '../../data/loot-tables.js';

export function renderHome(container) {
  const state = getState();
  const { profile } = state;
  const niveau = profile?.niveau || 0;

  const frappeUnlocked = niveau >= 2;
  const memoryUnlocked = niveau >= 3;

  const frappeCard = frappeUnlocked
    ? `<button class="game-card" id="btn-frappe">
         <div class="game-icon">⚡</div>
         <div class="game-name">Frappe Éclair</div>
         <div class="game-desc">Tape la conjugaison</div>
         <div class="game-unlock">Disponible</div>
       </button>`
    : `<div class="game-card game-locked">
         <div class="game-icon">⚡</div>
         <div class="game-name">Frappe Éclair</div>
         <div class="game-desc">Tape la conjugaison</div>
         <div class="game-unlock">Niveau 2</div>
       </div>`;

  const memoryCard = memoryUnlocked
    ? `<button class="game-card" id="btn-memory">
         <div class="game-icon">🃏</div>
         <div class="game-name">Mémory des Temps</div>
         <div class="game-desc">Trouve les paires</div>
         <div class="game-unlock">Disponible</div>
       </button>`
    : `<div class="game-card game-locked">
         <div class="game-icon">🃏</div>
         <div class="game-name">Mémory des Temps</div>
         <div class="game-desc">Trouve les paires</div>
         <div class="game-unlock">Niveau 3</div>
       </div>`;

  container.innerHTML = `
    <div class="screen screen-home">
      <div class="home-header">
        <h1 class="game-title">🚀 ConjuQuest</h1>
        <p class="home-subtitle">Apprends la conjugaison en jouant !</p>
      </div>

      <div id="xp-bar-container"></div>

      <div class="home-stats">
        <div class="stat-card">
          <div class="stat-value">${profile?.totalCorrectes || 0}</div>
          <div class="stat-label">Bonnes réponses</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${profile?.maxStreak || 0}</div>
          <div class="stat-label">Meilleur streak</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${state.inventory?.length || 0}</div>
          <div class="stat-label">Objets collectés</div>
        </div>
      </div>

      <div class="home-chests" id="home-chests">
        <h2 class="section-title">🦄 Licornes disponibles</h2>
        <div class="chests-row" id="chests-row"></div>
      </div>

      <div class="home-games">
        <h2 class="section-title">🎮 Mini-jeux de conjugaison</h2>
        <div class="games-grid">
          <button class="game-card" id="btn-missile">
            <div class="game-icon">🚀</div>
            <div class="game-name">Missile Spatial</div>
            <div class="game-desc">QCM — Choisis la bonne conjugaison</div>
            <div class="game-unlock">Disponible</div>
          </button>
          <button class="game-card" id="btn-snake">
            <div class="game-icon">🐍</div>
            <div class="game-name">Serpent Conjugueur</div>
            <div class="game-desc">Guide le serpent vers la bonne réponse</div>
            <div class="game-unlock">Disponible</div>
          </button>
          ${frappeCard}
          ${memoryCard}
        </div>
      </div>

      <div class="home-games home-lila-section">
        <h2 class="section-title">🧮 Mathémagique</h2>
        <button class="game-card lila-card" id="btn-lila">
          <div class="game-icon">🧝</div>
          <div class="game-name">L'Aventure de Lila</div>
          <div class="game-desc">Résous des énigmes maths dans le labyrinthe !</div>
          <div class="game-unlock">CE1 / CE2 — Disponible</div>
        </button>
      </div>

      <div class="home-actions">
        <button class="btn-secondary" id="btn-profile">👤 Mon Profil</button>
        <button class="btn-aide" id="btn-aide">📚 Guide de conjugaison</button>
      </div>
    </div>
  `;

  renderXPBar(document.getElementById('xp-bar-container'));

  const chestsRow = document.getElementById('chests-row');
  const chests = DB.getChests();

  if (chests.length === 0) {
    chestsRow.innerHTML = '<p class="no-chests">Termine une session pour rencontrer une licorne !</p>';
  } else {
    chests.forEach(chest => {
      const el = renderChest(chest, (c) => openChest(c, container));
      chestsRow.appendChild(el);
    });
  }

  document.getElementById('btn-missile').addEventListener('click', () => navigate('missile'));
  document.getElementById('btn-snake').addEventListener('click', () => navigate('snake'));
  if (frappeUnlocked) document.getElementById('btn-frappe').addEventListener('click', () => navigate('frappe'));
  if (memoryUnlocked) document.getElementById('btn-memory').addEventListener('click', () => navigate('memory'));
  document.getElementById('btn-lila').addEventListener('click', () => navigate('lila'));
  document.getElementById('btn-profile').addEventListener('click', () => navigate('profile'));
  document.getElementById('btn-aide').addEventListener('click', () => navigate('aide'));
}

function openChest(chest, container) {
  const goHome = () => import('./home.js').then(({ renderHome }) => renderHome(container));

  const item = ouvrirCoffre(chest.type);
  DB.removeChest(chest.id);

  // Reveal the next story part
  const storyIndex = DB.getStoryProgress();
  const storyPart = HISTOIRE_LICORNES[storyIndex] || null;
  if (storyPart) DB.advanceStoryProgress();

  if (!item) {
    setState({ chests: DB.getChests() });
    goHome();
    return;
  }

  DB.addItem(item);
  setState({ inventory: DB.getInventory(), chests: DB.getChests() });

  import('./loot-screen.js').then(({ renderLootScreen }) => {
    renderLootScreen(container, item, storyPart, goHome);
  });
}
