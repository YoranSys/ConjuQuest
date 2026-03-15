import { getXPProgressPercent, getNomNiveau } from '../../engine/xp.js';
import { getState } from '../../state.js';

export function renderXPBar(container) {
  const { profile } = getState();
  if (!profile || !container) return;

  const percent = getXPProgressPercent(profile);
  const nomNiveau = getNomNiveau(profile.niveau);

  container.innerHTML = `
    <div class="xp-bar-wrapper">
      <div class="xp-level-info">
        <span class="level-badge">Niv. ${profile.niveau}</span>
        <span class="level-name">${nomNiveau}</span>
        <span class="xp-text">${profile.xp} XP</span>
      </div>
      <div class="xp-bar-bg">
        <div class="xp-bar-fill" style="width: ${percent}%"></div>
      </div>
    </div>
  `;
}
