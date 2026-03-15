import { navigate } from '../../state.js';
import { DB } from '../../db.js';
import { doitRecevoirCoffre } from '../../engine/loot.js';
import { COFFRES } from '../../data/loot-tables.js';

export function renderGameResult(container, result) {
  const sessionCount = DB.incrementSession();
  const coffre = doitRecevoirCoffre(sessionCount);

  const chestId = `chest_${Date.now()}`;
  DB.addChest({ id: chestId, type: coffre });

  container.innerHTML = `
    <div class="screen screen-result">
      <div class="result-header">
        <h2 class="result-title">🏁 Session terminée !</h2>
      </div>
      <div class="result-stats">
        <div class="result-score">
          <span class="result-score-value">${result.score}</span>
          <span class="result-score-label">XP gagnés</span>
        </div>
        <div class="result-details">
          <div class="result-detail">
            <span class="result-detail-icon">❤️</span>
            <span>${result.viesRestantes} vie(s) restante(s)</span>
          </div>
          <div class="result-detail">
            <span class="result-detail-icon">🔥</span>
            <span>Streak max : ${result.streak}</span>
          </div>
        </div>
      </div>

      <div class="result-chest">
        <h3>🎁 Tu as gagné un coffre !</h3>
        <div class="result-chest-display">
          ${COFFRES[coffre]?.icon} ${COFFRES[coffre]?.nom}
        </div>
        <p class="result-chest-hint">Va sur l'écran d'accueil pour l'ouvrir !</p>
      </div>

      <div class="result-actions">
        <button class="btn-primary" id="btn-rejouer">🔄 Rejouer</button>
        <button class="btn-secondary" id="btn-retour">🏠 Accueil</button>
      </div>
    </div>
  `;

  document.getElementById('btn-rejouer').addEventListener('click', () => navigate('missile'));
  document.getElementById('btn-retour').addEventListener('click', () => navigate('home'));
}
