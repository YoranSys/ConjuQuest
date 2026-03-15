import { getState, navigate } from '../../state.js';
import { renderXPBar } from '../components/xp-bar.js';
import { renderItemCard } from '../components/item-card.js';
import { getNomNiveau } from '../../engine/xp.js';

export function renderProfile(container) {
  const state = getState();
  const { profile, inventory, stats } = state;

  const tempStats = {};
  Object.entries(stats || {}).forEach(([key, val]) => {
    // Key format is "{verbeId}_{temps}". Split on first '_' only so that
    // compound temps like "passe_compose" are kept intact.
    const sep = key.indexOf('_');
    const temps = sep === -1 ? key : key.slice(sep + 1);
    if (!tempStats[temps]) tempStats[temps] = { correct: 0, total: 0 };
    tempStats[temps].correct += val.correct;
    tempStats[temps].total += val.total;
  });

  const tempsLabels = {
    present: 'Présent',
    imparfait: 'Imparfait',
    passe_compose: 'Passé composé',
    futur: 'Futur',
  };

  container.innerHTML = `
    <div class="screen screen-profile">
      <div class="profile-header">
        <button class="btn-back" id="btn-back">← Retour</button>
        <h2 class="profile-title">👤 Mon Profil</h2>
      </div>

      <div class="profile-avatar">
        <div class="avatar-circle">⚔️</div>
        <div class="profile-name">${profile?.nom || 'Aventurier'}</div>
        <div class="profile-level-name">${getNomNiveau(profile?.niveau || 1)}</div>
      </div>

      <div id="xp-bar-container"></div>

      <div class="profile-stats-grid">
        <div class="stat-card">
          <div class="stat-value">${profile?.niveau || 1}</div>
          <div class="stat-label">Niveau</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${profile?.xp || 0}</div>
          <div class="stat-label">XP total</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${profile?.totalCorrectes || 0}</div>
          <div class="stat-label">Réponses correctes</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${profile?.maxStreak || 0}</div>
          <div class="stat-label">Meilleur streak</div>
        </div>
      </div>

      <div class="profile-temps-section">
        <h3 class="section-title">📊 Stats par temps</h3>
        <div class="temps-stats">
          ${Object.entries(tempsLabels).map(([key, label]) => {
            const s = tempStats[key] || { correct: 0, total: 0 };
            const pct = s.total > 0 ? Math.round(s.correct / s.total * 100) : 0;
            return `
              <div class="temps-stat-row">
                <span class="temps-name">${label}</span>
                <div class="temps-bar-bg">
                  <div class="temps-bar-fill" style="width: ${pct}%"></div>
                </div>
                <span class="temps-pct">${pct}%</span>
                <span class="temps-count">${s.correct}/${s.total}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="profile-inventory">
        <h3 class="section-title">🎒 Inventaire (${(inventory || []).length} objets)</h3>
        <div class="inventory-grid" id="inventory-grid">
          ${(inventory || []).length === 0 ? '<p class="empty-inventory">Aucun objet encore. Joue pour en gagner !</p>' : ''}
        </div>
      </div>
    </div>
  `;

  renderXPBar(document.getElementById('xp-bar-container'));

  const invGrid = document.getElementById('inventory-grid');
  (inventory || []).forEach(item => {
    invGrid.appendChild(renderItemCard(item));
  });

  document.getElementById('btn-back').addEventListener('click', () => navigate('home'));
}
