import { RARETES } from '../../data/loot-tables.js';

export function renderItemCard(item) {
  const rarete = RARETES[item.rareté] || RARETES.commune;

  const card = document.createElement('div');
  card.className = `item-card item-card--${item.rareté}`;
  card.style.borderColor = rarete.couleur;
  card.innerHTML = `
    <div class="item-icon">${item.icon || '📦'}</div>
    <div class="item-name">${item.nom}</div>
    <div class="item-rarity" style="color: ${rarete.couleur}">${rarete.label}</div>
    <div class="item-desc">${item.description}</div>
  `;

  return card;
}
