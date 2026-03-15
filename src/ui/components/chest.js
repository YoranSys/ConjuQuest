import { COFFRES } from '../../data/loot-tables.js';

export function renderChest(chest, onClick) {
  const config = COFFRES[chest.type] || COFFRES.bois;

  const el = document.createElement('div');
  el.className = 'chest-item';
  el.style.borderColor = config.couleur;
  el.innerHTML = `
    <div class="chest-icon">${config.icon}</div>
    <div class="chest-name">${config.nom}</div>
    <div class="chest-action">Rencontrer !</div>
  `;

  el.addEventListener('click', () => onClick(chest));
  return el;
}
