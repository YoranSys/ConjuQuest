export const RARETES = {
  commune:     { label: 'Commune',     couleur: '#9ca3af', probabilite: 0.60, xpBonus: 0 },
  peu_commune: { label: 'Peu commune', couleur: '#22c55e', probabilite: 0.25, xpBonus: 5 },
  rare:        { label: 'Rare',        couleur: '#3b82f6', probabilite: 0.10, xpBonus: 10 },
  epique:      { label: 'Épique',      couleur: '#a855f7', probabilite: 0.04, xpBonus: 20 },
  legendaire:  { label: 'Légendaire',  couleur: '#f59e0b', probabilite: 0.01, xpBonus: 50 },
};

export const LOOT_TABLE = [
  // Cosmétiques communes
  { id: 'skin_vaisseau_bleu',    type: 'cosmétique',  rareté: 'commune',     nom: 'Vaisseau Bleu',           description: 'Un vaisseau bleu classique',                icon: '🚀' },
  { id: 'skin_vaisseau_vert',    type: 'cosmétique',  rareté: 'commune',     nom: 'Vaisseau Vert',           description: 'Un vaisseau vert de base',                  icon: '🛸' },
  { id: 'particule_etoile',      type: 'cosmétique',  rareté: 'commune',     nom: 'Particules Étoile',       description: 'Des étoiles sur chaque bonne réponse',      icon: '⭐' },
  { id: 'cadre_basique',         type: 'cosmétique',  rareté: 'commune',     nom: 'Cadre Bronze',            description: 'Un cadre de profil bronze',                 icon: '🟫' },
  // Peu communes
  { id: 'boost_xp',              type: 'fonctionnel', rareté: 'peu_commune', nom: 'Boost XP x2',             description: 'Double XP pendant 10 minutes',              icon: '⚡' },
  { id: 'joker',                 type: 'fonctionnel', rareté: 'peu_commune', nom: 'Joker',                   description: 'Passe une question difficile',               icon: '🃏' },
  { id: 'particule_flamme',      type: 'cosmétique',  rareté: 'peu_commune', nom: 'Particules Flamme',       description: 'Des flammes sur chaque combo',               icon: '🔥' },
  { id: 'theme_ocean',           type: 'cosmétique',  rareté: 'peu_commune', nom: 'Thème Océan',             description: 'Interface thème océan',                     icon: '🌊' },
  // Rares
  { id: 'skin_vaisseau_or',      type: 'cosmétique',  rareté: 'rare',        nom: 'Vaisseau Doré',           description: 'Un magnifique vaisseau doré',               icon: '✨' },
  { id: 'bouclier',              type: 'fonctionnel', rareté: 'rare',        nom: 'Bouclier',                description: 'Protège une vie',                           icon: '🛡️' },
  { id: 'theme_foret',           type: 'cosmétique',  rareté: 'rare',        nom: 'Thème Forêt',             description: 'Interface thème forêt enchantée',           icon: '🌲' },
  // Épiques
  { id: 'anim_explosion',        type: 'cosmétique',  rareté: 'epique',      nom: 'Animation Explosion',     description: 'Explosion spectaculaire sur combo',         icon: '💥' },
  { id: 'titre_maitre',          type: 'cosmétique',  rareté: 'epique',      nom: 'Titre : Maître',          description: 'Titre "Maître des Temps" sur profil',       icon: '👑' },
  // Légendaires
  { id: 'carte_etre',            type: 'collection',  rareté: 'legendaire',  nom: 'Carte Légendaire : Être', description: 'La carte collector du verbe être',          icon: '🌟' },
  { id: 'badge_legende',         type: 'collection',  rareté: 'legendaire',  nom: 'Badge Légende',           description: 'Badge "Légende de ConjuQuest"',             icon: '🏆' },
];

export const COFFRES = {
  bois:    { nom: 'Coffre Bois',    icon: '📦', sessions: 1,  rarete_min: 'commune',     couleur: '#92400e' },
  argent:  { nom: 'Coffre Argent',  icon: '🗃️', sessions: 5,  rarete_min: 'peu_commune', couleur: '#6b7280' },
  or:      { nom: 'Coffre Or',      icon: '💰', sessions: 20, rarete_min: 'rare',        couleur: '#f59e0b' },
  cristal: { nom: 'Coffre Cristal', icon: '💎', sessions: -1, rarete_min: 'rare',        couleur: '#06b6d4' },
};
