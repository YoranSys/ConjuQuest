import { RARETES } from '../../data/loot-tables.js';
import { renderItemCard } from '../components/item-card.js';

export function renderLootScreen(container, item, onContinue) {
  const rarete = RARETES[item.rareté] || RARETES.commune;

  container.innerHTML = `
    <div class="screen screen-loot">
      <div class="loot-bg" style="--rarete-color: ${rarete.couleur}"></div>
      <div class="loot-content">
        <h2 class="loot-title">✨ Nouveau loot !</h2>
        <div class="loot-rarity-label" style="color: ${rarete.couleur}">
          ${rarete.label.toUpperCase()}
        </div>
        <div class="loot-item-display" id="loot-item-display">
          <div class="loot-item-icon loot-animate">${item.icon || '📦'}</div>
          <div class="loot-item-name">${item.nom}</div>
          <div class="loot-item-desc">${item.description}</div>
        </div>
        <button class="btn-primary loot-continue-btn" id="btn-loot-continue">
          Super ! Continuer →
        </button>
      </div>
    </div>
  `;

  document.getElementById('btn-loot-continue').addEventListener('click', onContinue);
}
