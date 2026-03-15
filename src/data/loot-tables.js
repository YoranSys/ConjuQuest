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

// Coffres sous forme de licornes — chaque coffre est un personnage différent.
// Les clés restent inchangées pour la compatibilité avec la logique existante.
export const COFFRES = {
  bois:    { nom: "Luna l'Étoilée",      icon: '🦄', sessions: 1,  rarete_min: 'commune',     couleur: '#a78bfa' },
  argent:  { nom: 'Iris Arc-en-Ciel',    icon: '🌈', sessions: 5,  rarete_min: 'peu_commune', couleur: '#34d399' },
  or:      { nom: 'Solana la Guerrière', icon: '☀️', sessions: 20, rarete_min: 'rare',        couleur: '#fbbf24' },
  cristal: { nom: 'Cristalia la Sage',   icon: '💎', sessions: -1, rarete_min: 'rare',        couleur: '#67e8f9' },
};

// Histoire épique des licornes — une nouvelle partie se dévoile à chaque coffre ouvert.
export const HISTOIRE_LICORNES = [
  {
    partie: 1,
    titre: "L'Appel de l'Aventure",
    texte: "Dans le Royaume des Mots vivait Luna l'Étoilée, une licorne à la corne argentée. Un matin, elle découvrit l'impensable : tous les mots avaient disparu ! Les habitants étaient silencieux, tristes. Sans hésiter, Luna branda sa corne : « Le courage, c'est agir même quand on tremble. » Elle prit son envol vers l'inconnu.",
    licorne: "Luna l'Étoilée",
    icon: '🦄',
    valeur: 'Le Courage',
  },
  {
    partie: 2,
    titre: "La Force de l'Amitié",
    texte: "Luna rencontra Iris Arc-en-Ciel, licorne aux couleurs de la joie. « Seule, tu ne peux pas tout faire, » dit Iris avec douceur, « mais ensemble, nous pouvons tout accomplir ! » Iris apprit à Luna que demander de l'aide n'est pas une faiblesse — c'est une force. Les deux licornes partirent côte à côte.",
    licorne: 'Iris Arc-en-Ciel',
    icon: '🌈',
    valeur: 'La Gentillesse',
  },
  {
    partie: 3,
    titre: "La Leçon de Solana",
    texte: "La route fut longue et les épreuves difficiles. Solana la Guerrière Dorée les rejoignit alors. « J'ai échoué cent fois avant de réussir, » dit-elle fièrement. « Chaque erreur est une leçon précieuse. Ne renoncez jamais ! » Grâce à sa détermination, les trois licornes avancèrent plus loin que jamais.",
    licorne: 'Solana la Guerrière',
    icon: '☀️',
    valeur: 'La Persévérance',
  },
  {
    partie: 4,
    titre: "La Sagesse de Cristalia",
    texte: "Au sommet de la Montagne des Mots brillait Cristalia la Sage, licorne de cristal. « Les mots ont disparu parce que les enfants ont cessé d'apprendre et de partager, » révéla-t-elle. « Votre savoir est le trésor le plus précieux. Offrez-le au monde, et la magie reviendra ! »",
    licorne: 'Cristalia la Sage',
    icon: '💎',
    valeur: 'La Sagesse',
  },
  {
    partie: 5,
    titre: "Le Retour de la Magie",
    texte: "Les quatre licornes unirent leurs pouvoirs : le courage de Luna, la gentillesse d'Iris, la persévérance de Solana et la sagesse de Cristalia. Un à un, les mots revinrent dans le Royaume ! Désormais, chaque enfant qui apprend à conjuguer fait briller leur étoile un peu plus fort. Tu es l'un d'eux — continue ! ⭐🦄",
    licorne: 'Les Quatre Licornes',
    icon: '🌟',
    valeur: "L'Union",
  },
];
