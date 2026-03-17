import { navigate } from '../../state.js';

const SECTIONS = [
  {
    id: 'verbes',
    titre: '🔤 Qu\'est-ce qu\'un verbe ?',
    emoji: '🔤',
    contenu: `
      <p>Un <strong>verbe</strong> est un mot d'action ou d'état qui anime chaque phrase.</p>
      <div class="aide-exemples">
        <div class="aide-ex-card">
          <span class="aide-ex-verb">courir</span>
          <span class="aide-ex-desc">action physique</span>
        </div>
        <div class="aide-ex-card">
          <span class="aide-ex-verb">rêver</span>
          <span class="aide-ex-desc">action mentale</span>
        </div>
        <div class="aide-ex-card">
          <span class="aide-ex-verb">être</span>
          <span class="aide-ex-desc">état</span>
        </div>
      </div>
      <p class="aide-tip">💡 <em>Astuce :</em> Si tu peux mettre « je » devant, c'est un verbe&nbsp;! <strong>Je cours, je rêve, je suis.</strong></p>
    `,
  },
  {
    id: 'groupes',
    titre: '🏷️ Les 3 groupes',
    emoji: '🏷️',
    contenu: `
      <p>En français, les verbes sont classés en <strong>3 groupes</strong> selon leur terminaison à l'infinitif.</p>
      <div class="aide-groupes">
        <div class="aide-groupe-card aide-groupe-1">
          <div class="aide-groupe-num">Groupe 1</div>
          <div class="aide-groupe-term">-ER</div>
          <div class="aide-groupe-ex">chanter · parler · jouer</div>
          <div class="aide-groupe-nb">90 % des verbes !</div>
        </div>
        <div class="aide-groupe-card aide-groupe-2">
          <div class="aide-groupe-num">Groupe 2</div>
          <div class="aide-groupe-term">-IR (réguliers)</div>
          <div class="aide-groupe-ex">finir · grandir · choisir</div>
          <div class="aide-groupe-nb">se reconnaît au -issons</div>
        </div>
        <div class="aide-groupe-card aide-groupe-3">
          <div class="aide-groupe-num">Groupe 3</div>
          <div class="aide-groupe-term">Irréguliers</div>
          <div class="aide-groupe-ex">être · avoir · aller · venir</div>
          <div class="aide-groupe-nb">à apprendre par cœur !</div>
        </div>
      </div>
    `,
  },
  {
    id: 'present',
    titre: '🟢 Le Présent',
    emoji: '🟢',
    couleur: 'temps-present',
    contenu: `
      <p>Le présent décrit <strong>ce qui se passe maintenant</strong>, une habitude ou une vérité générale.</p>
      <div class="aide-phrase-ex">
        <span class="aide-phrase">Je <strong>mange</strong> une pomme.</span>
        <span class="aide-phrase">Le soleil <strong>brille</strong> tous les jours.</span>
      </div>
      <div class="aide-conjugaison temps-present-bg">
        <div class="aide-conj-titre">chanter — présent</div>
        <div class="aide-conj-grid">
          <span>je <strong>chante</strong></span><span>nous <strong>chantons</strong></span>
          <span>tu <strong>chantes</strong></span><span>vous <strong>chantez</strong></span>
          <span>il/elle/on <strong>chante</strong></span><span>ils/elles <strong>chantent</strong></span>
        </div>
      </div>
      <p class="aide-tip">💡 Terminaisons gr.1 : <strong>-e · -es · -e · -ons · -ez · -ent</strong></p>
      <p class="aide-tip">✨ <strong>il</strong>, <strong>elle</strong> et <strong>on</strong> partagent la même forme. Pareil pour <strong>ils</strong> et <strong>elles</strong> !</p>
    `,
  },
  {
    id: 'imparfait',
    titre: '🔵 L\'Imparfait',
    emoji: '🔵',
    couleur: 'temps-imparfait',
    contenu: `
      <p>L'imparfait décrit une action <strong>répétée ou en cours dans le passé</strong>, ou une description dans le passé.</p>
      <div class="aide-phrase-ex">
        <span class="aide-phrase">Enfant, je <strong>jouais</strong> dans le jardin.</span>
        <span class="aide-phrase">Il <strong>pleuvait</strong> fort ce soir-là.</span>
      </div>
      <div class="aide-conjugaison temps-imparfait-bg">
        <div class="aide-conj-titre">chanter — imparfait</div>
        <div class="aide-conj-grid">
          <span>je <strong>chantais</strong></span><span>nous <strong>chantions</strong></span>
          <span>tu <strong>chantais</strong></span><span>vous <strong>chantiez</strong></span>
          <span>il/elle/on <strong>chantait</strong></span><span>ils/elles <strong>chantaient</strong></span>
        </div>
      </div>
      <p class="aide-tip">💡 Terminaisons imparfait : <strong>-ais · -ais · -ait · -ions · -iez · -aient</strong> — toujours les mêmes !</p>
      <p class="aide-tip">✨ <strong>il</strong>, <strong>elle</strong> et <strong>on</strong> partagent la même forme. Pareil pour <strong>ils</strong> et <strong>elles</strong> !</p>
    `,
  },
  {
    id: 'passe_compose',
    titre: '🟠 Le Passé Composé',
    emoji: '🟠',
    couleur: 'temps-passe-compose',
    contenu: `
      <p>Le passé composé exprime une action <strong>terminée dans le passé</strong>, souvent avec un lien avec le présent.</p>
      <div class="aide-phrase-ex">
        <span class="aide-phrase">J'<strong>ai mangé</strong> une pizza hier.</span>
        <span class="aide-phrase">Elle <strong>est partie</strong> ce matin.</span>
      </div>
      <div class="aide-conjugaison temps-passe-compose-bg">
        <div class="aide-conj-titre">chanter — passé composé</div>
        <div class="aide-conj-grid">
          <span>j'<strong>ai chanté</strong></span><span>nous <strong>avons chanté</strong></span>
          <span>tu <strong>as chanté</strong></span><span>vous <strong>avez chanté</strong></span>
          <span>il/elle/on <strong>a chanté</strong></span><span>ils/elles <strong>ont chanté</strong></span>
        </div>
      </div>
      <p class="aide-tip">💡 Formule : <strong>auxiliaire (avoir/être) + participe passé</strong>. Avec <em>être</em> : « je suis allé(e) ».</p>
      <p class="aide-tip">✨ <strong>il</strong>, <strong>elle</strong> et <strong>on</strong> partagent la même forme. Pareil pour <strong>ils</strong> et <strong>elles</strong> !</p>
    `,
  },
  {
    id: 'futur',
    titre: '🩵 Le Futur',
    emoji: '🩵',
    couleur: 'temps-futur',
    contenu: `
      <p>Le futur simple exprime <strong>ce qui va se passer</strong>, une promesse ou une certitude future.</p>
      <div class="aide-phrase-ex">
        <span class="aide-phrase">Demain, je <strong>chanterai</strong> sous la pluie.</span>
        <span class="aide-phrase">Ils <strong>partiront</strong> en vacances.</span>
      </div>
      <div class="aide-conjugaison temps-futur-bg">
        <div class="aide-conj-titre">chanter — futur</div>
        <div class="aide-conj-grid">
          <span>je <strong>chanterai</strong></span><span>nous <strong>chanterons</strong></span>
          <span>tu <strong>chanteras</strong></span><span>vous <strong>chanterez</strong></span>
          <span>il/elle/on <strong>chantera</strong></span><span>ils/elles <strong>chanteront</strong></span>
        </div>
      </div>
      <p class="aide-tip">💡 Terminaisons futur : <strong>-rai · -ras · -ra · -rons · -rez · -ront</strong> — pensez au verbe « avoir » !</p>
      <p class="aide-tip">✨ <strong>il</strong>, <strong>elle</strong> et <strong>on</strong> partagent la même forme. Pareil pour <strong>ils</strong> et <strong>elles</strong> !</p>
    `,
  },
  {
    id: 'pronoms',
    titre: '👤 Les Pronoms Sujets',
    emoji: '👤',
    contenu: `
      <p>Le pronom sujet indique <strong>qui fait l'action</strong>. On distingue 9 pronoms sujets en français.</p>
      <div class="aide-pronoms-grid">
        <div class="aide-pronom-card"><span class="aide-pronom">je</span><span>1ʳᵉ pers. singulier</span></div>
        <div class="aide-pronom-card"><span class="aide-pronom">tu</span><span>2ᵉ pers. singulier</span></div>
        <div class="aide-pronom-card"><span class="aide-pronom">il</span><span>3ᵉ pers. singulier</span></div>
        <div class="aide-pronom-card"><span class="aide-pronom">elle</span><span>3ᵉ pers. singulier</span></div>
        <div class="aide-pronom-card"><span class="aide-pronom">on</span><span>3ᵉ pers. singulier</span></div>
        <div class="aide-pronom-card"><span class="aide-pronom">nous</span><span>1ʳᵉ pers. pluriel</span></div>
        <div class="aide-pronom-card"><span class="aide-pronom">vous</span><span>2ᵉ pers. pluriel</span></div>
        <div class="aide-pronom-card"><span class="aide-pronom">ils</span><span>3ᵉ pers. pluriel</span></div>
        <div class="aide-pronom-card"><span class="aide-pronom">elles</span><span>3ᵉ pers. pluriel</span></div>
      </div>
      <p class="aide-tip">✨ <em>À retenir :</em> <strong>il</strong>, <strong>elle</strong> et <strong>on</strong> se conjuguent de la même façon. <strong>ils</strong> et <strong>elles</strong> aussi !</p>
      <p class="aide-tip">🎓 <em>Surprise :</em> « vous » peut désigner une seule personne — c'est le <strong>vouvoiement</strong> de politesse !</p>
    `,
  },
  {
    id: 'conseils',
    titre: '🚀 Conseils pour progresser',
    emoji: '🚀',
    contenu: `
      <ul class="aide-conseils-list">
        <li>🎯 <strong>Joue chaque jour</strong> — 5 minutes suffisent pour progresser.</li>
        <li>🔁 <strong>Répète tes erreurs</strong> — le jeu repère ce que tu rates !</li>
        <li>🗣️ <strong>Dis les formes à voix haute</strong> — la mémoire auditive est puissante.</li>
        <li>📖 <strong>Lis en français</strong> — tu verras les temps en contexte réel.</li>
        <li>🧩 <strong>Fais le Mémory</strong> — associer un verbe à sa conjugaison ancre les formes.</li>
        <li>🌟 <strong>Vise le streak</strong> — enchaîner les bonnes réponses triple tes XP !</li>
      </ul>
      <div class="aide-fun-fact">
        <span class="aide-fun-emoji">🦄</span>
        <p>Le français possède plus de <strong>12 000 verbes</strong> — mais seulement <strong>300</strong> sont vraiment courants. Tu en maîtrises déjà une belle partie !</p>
      </div>
    `,
  },
];

export function renderAide(container) {
  container.innerHTML = `
    <div class="screen screen-aide">
      <div class="aide-header">
        <button class="btn-back" id="btn-aide-back">← Retour</button>
        <h1 class="aide-title">📚 Guide de conjugaison</h1>
        <p class="aide-subtitle">Tout ce qu'il faut savoir pour conjuguer comme un champion !</p>
      </div>

      <div class="aide-nav">
        ${SECTIONS.map(s => `
          <button class="aide-nav-btn ${s.couleur || ''}" data-target="${s.id}" aria-label="${s.titre}">
            ${s.emoji}
          </button>
        `).join('')}
      </div>

      <div class="aide-sections" id="aide-sections">
        ${SECTIONS.map(s => `
          <div class="aide-section ${s.couleur || ''}" id="aide-${s.id}">
            <details>
              <summary class="aide-section-header">
                <span class="aide-section-title">${s.titre}</span>
                <span class="aide-section-chevron">▼</span>
              </summary>
              <div class="aide-section-body">
                ${s.contenu}
              </div>
            </details>
          </div>
        `).join('')}
      </div>

      <div class="aide-footer">
        <button class="btn-primary" id="btn-aide-jouer">🎮 Jouer maintenant !</button>
      </div>
    </div>
  `;

  document.getElementById('btn-aide-back').addEventListener('click', () => navigate('home'));
  document.getElementById('btn-aide-jouer').addEventListener('click', () => navigate('home'));

  // Nav pills scroll to section
  container.querySelectorAll('.aide-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(`aide-${btn.dataset.target}`);
      if (!target) return;
      const details = target.querySelector('details');
      if (details) details.open = true;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
