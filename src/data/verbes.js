export const VERBES = [
  // ── Groupe 1 – réguliers ──────────────────────────────────────────────────
  {
    id: 'chanter', infinitif: 'chanter', groupe: 1, irregulier: false,
    illustration: 'music', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'chanté',
    temps: {
      present:       ['chante','chantes','chante','chantons','chantez','chantent'],
      imparfait:     ['chantais','chantais','chantait','chantions','chantiez','chantaient'],
      passe_compose: ['ai chanté','as chanté','a chanté','avons chanté','avez chanté','ont chanté'],
      futur:         ['chanterai','chanteras','chantera','chanterons','chanterez','chanteront'],
    },
  },
  {
    id: 'parler', infinitif: 'parler', groupe: 1, irregulier: false,
    illustration: 'speech', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'parlé',
    temps: {
      present:       ['parle','parles','parle','parlons','parlez','parlent'],
      imparfait:     ['parlais','parlais','parlait','parlions','parliez','parlaient'],
      passe_compose: ['ai parlé','as parlé','a parlé','avons parlé','avez parlé','ont parlé'],
      futur:         ['parlerai','parleras','parlera','parlerons','parlerez','parleront'],
    },
  },
  {
    id: 'manger', infinitif: 'manger', groupe: 1, irregulier: false,
    illustration: 'food', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'mangé',
    temps: {
      present:       ['mange','manges','mange','mangeons','mangez','mangent'],
      imparfait:     ['mangeais','mangeais','mangeait','mangions','mangiez','mangeaient'],
      passe_compose: ['ai mangé','as mangé','a mangé','avons mangé','avez mangé','ont mangé'],
      futur:         ['mangerai','mangeras','mangera','mangerons','mangerez','mangeront'],
    },
  },
  {
    id: 'jouer', infinitif: 'jouer', groupe: 1, irregulier: false,
    illustration: 'game', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'joué',
    temps: {
      present:       ['joue','joues','joue','jouons','jouez','jouent'],
      imparfait:     ['jouais','jouais','jouait','jouions','jouiez','jouaient'],
      passe_compose: ['ai joué','as joué','a joué','avons joué','avez joué','ont joué'],
      futur:         ['jouerai','joueras','jouera','jouerons','jouerez','joueront'],
    },
  },
  {
    id: 'aimer', infinitif: 'aimer', groupe: 1, irregulier: false,
    illustration: 'heart', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'aimé',
    temps: {
      present:       ['aime','aimes','aime','aimons','aimez','aiment'],
      imparfait:     ['aimais','aimais','aimait','aimions','aimiez','aimaient'],
      passe_compose: ['ai aimé','as aimé','a aimé','avons aimé','avez aimé','ont aimé'],
      futur:         ['aimerai','aimeras','aimera','aimerons','aimerez','aimeront'],
    },
  },
  {
    id: 'regarder', infinitif: 'regarder', groupe: 1, irregulier: false,
    illustration: 'eye', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'regardé',
    temps: {
      present:       ['regarde','regardes','regarde','regardons','regardez','regardent'],
      imparfait:     ['regardais','regardais','regardait','regardions','regardiez','regardaient'],
      passe_compose: ['ai regardé','as regardé','a regardé','avons regardé','avez regardé','ont regardé'],
      futur:         ['regarderai','regarderas','regardera','regarderons','regarderez','regarderont'],
    },
  },
  {
    id: 'ecouter', infinitif: 'écouter', groupe: 1, irregulier: false,
    illustration: 'ear', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'écouté',
    temps: {
      present:       ['écoute','écoutes','écoute','écoutons','écoutez','écoutent'],
      imparfait:     ['écoutais','écoutais','écoutait','écoutions','écoutiez','écoutaient'],
      passe_compose: ['ai écouté','as écouté','a écouté','avons écouté','avez écouté','ont écouté'],
      futur:         ['écouterai','écouteras','écoutera','écouterons','écouterez','écouteront'],
    },
  },
  {
    id: 'travailler', infinitif: 'travailler', groupe: 1, irregulier: false,
    illustration: 'work', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'travaillé',
    temps: {
      present:       ['travaille','travailles','travaille','travaillons','travaillez','travaillent'],
      imparfait:     ['travaillais','travaillais','travaillait','travaillions','travailliez','travaillaient'],
      passe_compose: ['ai travaillé','as travaillé','a travaillé','avons travaillé','avez travaillé','ont travaillé'],
      futur:         ['travaillerai','travailleras','travaillera','travaillerons','travaillerez','travailleront'],
    },
  },
  {
    id: 'marcher', infinitif: 'marcher', groupe: 1, irregulier: false,
    illustration: 'walk', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'marché',
    temps: {
      present:       ['marche','marches','marche','marchons','marchez','marchent'],
      imparfait:     ['marchais','marchais','marchait','marchions','marchiez','marchaient'],
      passe_compose: ['ai marché','as marché','a marché','avons marché','avez marché','ont marché'],
      futur:         ['marcherai','marcheras','marchera','marcherons','marcherez','marcheront'],
    },
  },
  {
    id: 'danser', infinitif: 'danser', groupe: 1, irregulier: false,
    illustration: 'dance', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'dansé',
    temps: {
      present:       ['danse','danses','danse','dansons','dansez','dansent'],
      imparfait:     ['dansais','dansais','dansait','dansions','dansiez','dansaient'],
      passe_compose: ['ai dansé','as dansé','a dansé','avons dansé','avez dansé','ont dansé'],
      futur:         ['danserai','danseras','dansera','danserons','danserez','danseront'],
    },
  },
  {
    id: 'dessiner', infinitif: 'dessiner', groupe: 1, irregulier: false,
    illustration: 'art', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'dessiné',
    temps: {
      present:       ['dessine','dessines','dessine','dessinons','dessinez','dessinent'],
      imparfait:     ['dessinais','dessinais','dessinait','dessinions','dessiniez','dessinaient'],
      passe_compose: ['ai dessiné','as dessiné','a dessiné','avons dessiné','avez dessiné','ont dessiné'],
      futur:         ['dessinerai','dessineras','dessinera','dessinerons','dessinerez','dessineront'],
    },
  },
  // ── Groupe 1 – orthographe spéciale ──────────────────────────────────────
  {
    id: 'lancer', infinitif: 'lancer', groupe: 1, irregulier: false,
    illustration: 'throw', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'lancé',
    temps: {
      present:       ['lance','lances','lance','lançons','lancez','lancent'],
      imparfait:     ['lançais','lançais','lançait','lancions','lanciez','lançaient'],
      passe_compose: ['ai lancé','as lancé','a lancé','avons lancé','avez lancé','ont lancé'],
      futur:         ['lancerai','lanceras','lancera','lancerons','lancerez','lanceront'],
    },
  },
  {
    id: 'commencer', infinitif: 'commencer', groupe: 1, irregulier: false,
    illustration: 'start', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'commencé',
    temps: {
      present:       ['commence','commences','commence','commençons','commencez','commencent'],
      imparfait:     ['commençais','commençais','commençait','commencions','commenciez','commençaient'],
      passe_compose: ['ai commencé','as commencé','a commencé','avons commencé','avez commencé','ont commencé'],
      futur:         ['commencerai','commenceras','commencera','commencerons','commencerez','commenceront'],
    },
  },
  {
    id: 'voyager', infinitif: 'voyager', groupe: 1, irregulier: false,
    illustration: 'travel', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'voyagé',
    temps: {
      present:       ['voyage','voyages','voyage','voyageons','voyagez','voyagent'],
      imparfait:     ['voyageais','voyageais','voyageait','voyagions','voyagiez','voyageaient'],
      passe_compose: ['ai voyagé','as voyagé','a voyagé','avons voyagé','avez voyagé','ont voyagé'],
      futur:         ['voyagerai','voyageras','voyagera','voyagerons','voyagerez','voyageront'],
    },
  },
  {
    id: 'nager', infinitif: 'nager', groupe: 1, irregulier: false,
    illustration: 'swim', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'nagé',
    temps: {
      present:       ['nage','nages','nage','nageons','nagez','nagent'],
      imparfait:     ['nageais','nageais','nageait','nagions','nagiez','nageaient'],
      passe_compose: ['ai nagé','as nagé','a nagé','avons nagé','avez nagé','ont nagé'],
      futur:         ['nagerai','nageras','nagera','nagerons','nagerez','nageront'],
    },
  },
  {
    id: 'appeler', infinitif: 'appeler', groupe: 1, irregulier: false,
    illustration: 'phone', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'appelé',
    temps: {
      present:       ['appelle','appelles','appelle','appelons','appelez','appellent'],
      imparfait:     ['appelais','appelais','appelait','appelions','appeliez','appelaient'],
      passe_compose: ['ai appelé','as appelé','a appelé','avons appelé','avez appelé','ont appelé'],
      futur:         ['appellerai','appelleras','appellera','appellerons','appellerez','appelleront'],
    },
  },
  {
    id: 'jeter', infinitif: 'jeter', groupe: 1, irregulier: false,
    illustration: 'throw', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'jeté',
    temps: {
      present:       ['jette','jettes','jette','jetons','jetez','jettent'],
      imparfait:     ['jetais','jetais','jetait','jetions','jetiez','jetaient'],
      passe_compose: ['ai jeté','as jeté','a jeté','avons jeté','avez jeté','ont jeté'],
      futur:         ['jetterai','jetteras','jettera','jetterons','jetterez','jetteront'],
    },
  },
  {
    id: 'acheter', infinitif: 'acheter', groupe: 1, irregulier: false,
    illustration: 'shop', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'acheté',
    temps: {
      present:       ['achète','achètes','achète','achetons','achetez','achètent'],
      imparfait:     ['achetais','achetais','achetait','achetions','achetiez','achetaient'],
      passe_compose: ['ai acheté','as acheté','a acheté','avons acheté','avez acheté','ont acheté'],
      futur:         ['achèterai','achèteras','achètera','achèterons','achèterez','achèteront'],
    },
  },
  {
    id: 'preferer', infinitif: 'préférer', groupe: 1, irregulier: false,
    illustration: 'star', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'préféré',
    temps: {
      present:       ['préfère','préfères','préfère','préférons','préférez','préfèrent'],
      imparfait:     ['préférais','préférais','préférait','préférions','préfériez','préféraient'],
      passe_compose: ['ai préféré','as préféré','a préféré','avons préféré','avez préféré','ont préféré'],
      futur:         ['préférerai','préféreras','préférera','préférerons','préférerez','préféreront'],
    },
  },
  {
    id: 'esperer', infinitif: 'espérer', groupe: 1, irregulier: false,
    illustration: 'hope', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'espéré',
    temps: {
      present:       ['espère','espères','espère','espérons','espérez','espèrent'],
      imparfait:     ['espérais','espérais','espérait','espérions','espériez','espéraient'],
      passe_compose: ['ai espéré','as espéré','a espéré','avons espéré','avez espéré','ont espéré'],
      futur:         ['espérerai','espéreras','espérera','espérerons','espérerez','espéreront'],
    },
  },
  // ── Groupe 2 ──────────────────────────────────────────────────────────────
  {
    id: 'finir', infinitif: 'finir', groupe: 2, irregulier: false,
    illustration: 'finish', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'fini',
    temps: {
      present:       ['finis','finis','finit','finissons','finissez','finissent'],
      imparfait:     ['finissais','finissais','finissait','finissions','finissiez','finissaient'],
      passe_compose: ['ai fini','as fini','a fini','avons fini','avez fini','ont fini'],
      futur:         ['finirai','finiras','finira','finirons','finirez','finiront'],
    },
  },
  {
    id: 'choisir', infinitif: 'choisir', groupe: 2, irregulier: false,
    illustration: 'choice', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'choisi',
    temps: {
      present:       ['choisis','choisis','choisit','choisissons','choisissez','choisissent'],
      imparfait:     ['choisissais','choisissais','choisissait','choisissions','choisissiez','choisissaient'],
      passe_compose: ['ai choisi','as choisi','a choisi','avons choisi','avez choisi','ont choisi'],
      futur:         ['choisirai','choisiras','choisira','choisirons','choisirez','choisiront'],
    },
  },
  {
    id: 'grandir', infinitif: 'grandir', groupe: 2, irregulier: false,
    illustration: 'grow', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'grandi',
    temps: {
      present:       ['grandis','grandis','grandit','grandissons','grandissez','grandissent'],
      imparfait:     ['grandissais','grandissais','grandissait','grandissions','grandissiez','grandissaient'],
      passe_compose: ['ai grandi','as grandi','a grandi','avons grandi','avez grandi','ont grandi'],
      futur:         ['grandirai','grandiras','grandira','grandirons','grandirez','grandiront'],
    },
  },
  {
    id: 'reussir', infinitif: 'réussir', groupe: 2, irregulier: false,
    illustration: 'trophy', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'réussi',
    temps: {
      present:       ['réussis','réussis','réussit','réussissons','réussissez','réussissent'],
      imparfait:     ['réussissais','réussissais','réussissait','réussissions','réussissiez','réussissaient'],
      passe_compose: ['ai réussi','as réussi','a réussi','avons réussi','avez réussi','ont réussi'],
      futur:         ['réussirai','réussiras','réussira','réussirons','réussirez','réussiront'],
    },
  },
  {
    id: 'remplir', infinitif: 'remplir', groupe: 2, irregulier: false,
    illustration: 'fill', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'rempli',
    temps: {
      present:       ['remplis','remplis','remplit','remplissons','remplissez','remplissent'],
      imparfait:     ['remplissais','remplissais','remplissait','remplissions','remplissiez','remplissaient'],
      passe_compose: ['ai rempli','as rempli','a rempli','avons rempli','avez rempli','ont rempli'],
      futur:         ['remplirai','rempliras','remplira','remplirons','remplirez','rempliront'],
    },
  },
  {
    id: 'obeir', infinitif: 'obéir', groupe: 2, irregulier: false,
    illustration: 'obey', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'obéi',
    temps: {
      present:       ['obéis','obéis','obéit','obéissons','obéissez','obéissent'],
      imparfait:     ['obéissais','obéissais','obéissait','obéissions','obéissiez','obéissaient'],
      passe_compose: ['ai obéi','as obéi','a obéi','avons obéi','avez obéi','ont obéi'],
      futur:         ['obéirai','obéiras','obéira','obéirons','obéirez','obéiront'],
    },
  },
  {
    id: 'batir', infinitif: 'bâtir', groupe: 2, irregulier: false,
    illustration: 'build', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'bâti',
    temps: {
      present:       ['bâtis','bâtis','bâtit','bâtissons','bâtissez','bâtissent'],
      imparfait:     ['bâtissais','bâtissais','bâtissait','bâtissions','bâtissiez','bâtissaient'],
      passe_compose: ['ai bâti','as bâti','a bâti','avons bâti','avez bâti','ont bâti'],
      futur:         ['bâtirai','bâtiras','bâtira','bâtirons','bâtirez','bâtiront'],
    },
  },
  {
    id: 'rougir', infinitif: 'rougir', groupe: 2, irregulier: false,
    illustration: 'blush', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'rougi',
    temps: {
      present:       ['rougis','rougis','rougit','rougissons','rougissez','rougissent'],
      imparfait:     ['rougissais','rougissais','rougissait','rougissions','rougissiez','rougissaient'],
      passe_compose: ['ai rougi','as rougi','a rougi','avons rougi','avez rougi','ont rougi'],
      futur:         ['rougirai','rougiras','rougira','rougirons','rougirez','rougiront'],
    },
  },
  {
    id: 'nourrir', infinitif: 'nourrir', groupe: 2, irregulier: false,
    illustration: 'food', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'nourri',
    temps: {
      present:       ['nourris','nourris','nourrit','nourrissons','nourrissez','nourrissent'],
      imparfait:     ['nourrissais','nourrissais','nourrissait','nourrissions','nourrissiez','nourrissaient'],
      passe_compose: ['ai nourri','as nourri','a nourri','avons nourri','avez nourri','ont nourri'],
      futur:         ['nourrirai','nourriras','nourrira','nourrirons','nourrirez','nourriront'],
    },
  },
  {
    id: 'applaudir', infinitif: 'applaudir', groupe: 2, irregulier: false,
    illustration: 'clap', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'applaudi',
    temps: {
      present:       ['applaudis','applaudis','applaudit','applaudissons','applaudissez','applaudissent'],
      imparfait:     ['applaudissais','applaudissais','applaudissait','applaudissions','applaudissiez','applaudissaient'],
      passe_compose: ['ai applaudi','as applaudi','a applaudi','avons applaudi','avez applaudi','ont applaudi'],
      futur:         ['applaudirai','applaudiras','applaudira','applaudirons','applaudirez','applaudiront'],
    },
  },
  // ── Groupe 3 – irréguliers ────────────────────────────────────────────────
  {
    id: 'etre', infinitif: 'être', groupe: 3, irregulier: true,
    illustration: 'being', rareté: 'rare', auxiliaire: 'être', participe_passe: 'été',
    temps: {
      present:       ['suis','es','est','sommes','êtes','sont'],
      imparfait:     ['étais','étais','était','étions','étiez','étaient'],
      passe_compose: ['ai été','as été','a été','avons été','avez été','ont été'],
      futur:         ['serai','seras','sera','serons','serez','seront'],
    },
  },
  {
    id: 'avoir', infinitif: 'avoir', groupe: 3, irregulier: true,
    illustration: 'hand', rareté: 'rare', auxiliaire: 'avoir', participe_passe: 'eu',
    temps: {
      present:       ['ai','as','a','avons','avez','ont'],
      imparfait:     ['avais','avais','avait','avions','aviez','avaient'],
      passe_compose: ['ai eu','as eu','a eu','avons eu','avez eu','ont eu'],
      futur:         ['aurai','auras','aura','aurons','aurez','auront'],
    },
  },
  {
    id: 'aller', infinitif: 'aller', groupe: 3, irregulier: true,
    illustration: 'walk', rareté: 'rare', auxiliaire: 'être', participe_passe: 'allé',
    temps: {
      present:       ['vais','vas','va','allons','allez','vont'],
      imparfait:     ['allais','allais','allait','allions','alliez','allaient'],
      passe_compose: ['suis allé','es allé','est allé','sommes allés','êtes allés','sont allés'],
      futur:         ['irai','iras','ira','irons','irez','iront'],
    },
  },
  {
    id: 'faire', infinitif: 'faire', groupe: 3, irregulier: true,
    illustration: 'hand', rareté: 'peu_commune', auxiliaire: 'avoir', participe_passe: 'fait',
    temps: {
      present:       ['fais','fais','fait','faisons','faites','font'],
      imparfait:     ['faisais','faisais','faisait','faisions','faisiez','faisaient'],
      passe_compose: ['ai fait','as fait','a fait','avons fait','avez fait','ont fait'],
      futur:         ['ferai','feras','fera','ferons','ferez','feront'],
    },
  },
  {
    id: 'dire', infinitif: 'dire', groupe: 3, irregulier: true,
    illustration: 'speech', rareté: 'peu_commune', auxiliaire: 'avoir', participe_passe: 'dit',
    temps: {
      present:       ['dis','dis','dit','disons','dites','disent'],
      imparfait:     ['disais','disais','disait','disions','disiez','disaient'],
      passe_compose: ['ai dit','as dit','a dit','avons dit','avez dit','ont dit'],
      futur:         ['dirai','diras','dira','dirons','direz','diront'],
    },
  },
  {
    id: 'prendre', infinitif: 'prendre', groupe: 3, irregulier: true,
    illustration: 'hand', rareté: 'peu_commune', auxiliaire: 'avoir', participe_passe: 'pris',
    temps: {
      present:       ['prends','prends','prend','prenons','prenez','prennent'],
      imparfait:     ['prenais','prenais','prenait','prenions','preniez','prenaient'],
      passe_compose: ['ai pris','as pris','a pris','avons pris','avez pris','ont pris'],
      futur:         ['prendrai','prendras','prendra','prendrons','prendrez','prendront'],
    },
  },
  {
    id: 'venir', infinitif: 'venir', groupe: 3, irregulier: true,
    illustration: 'walk', rareté: 'peu_commune', auxiliaire: 'être', participe_passe: 'venu',
    temps: {
      present:       ['viens','viens','vient','venons','venez','viennent'],
      imparfait:     ['venais','venais','venait','venions','veniez','venaient'],
      passe_compose: ['suis venu','es venu','est venu','sommes venus','êtes venus','sont venus'],
      futur:         ['viendrai','viendras','viendra','viendrons','viendrez','viendront'],
    },
  },
  {
    id: 'voir', infinitif: 'voir', groupe: 3, irregulier: true,
    illustration: 'eye', rareté: 'peu_commune', auxiliaire: 'avoir', participe_passe: 'vu',
    temps: {
      present:       ['vois','vois','voit','voyons','voyez','voient'],
      imparfait:     ['voyais','voyais','voyait','voyions','voyiez','voyaient'],
      passe_compose: ['ai vu','as vu','a vu','avons vu','avez vu','ont vu'],
      futur:         ['verrai','verras','verra','verrons','verrez','verront'],
    },
  },
  {
    id: 'savoir', infinitif: 'savoir', groupe: 3, irregulier: true,
    illustration: 'brain', rareté: 'peu_commune', auxiliaire: 'avoir', participe_passe: 'su',
    temps: {
      present:       ['sais','sais','sait','savons','savez','savent'],
      imparfait:     ['savais','savais','savait','savions','saviez','savaient'],
      passe_compose: ['ai su','as su','a su','avons su','avez su','ont su'],
      futur:         ['saurai','sauras','saura','saurons','saurez','sauront'],
    },
  },
  {
    id: 'pouvoir', infinitif: 'pouvoir', groupe: 3, irregulier: true,
    illustration: 'power', rareté: 'peu_commune', auxiliaire: 'avoir', participe_passe: 'pu',
    temps: {
      present:       ['peux','peux','peut','pouvons','pouvez','peuvent'],
      imparfait:     ['pouvais','pouvais','pouvait','pouvions','pouviez','pouvaient'],
      passe_compose: ['ai pu','as pu','a pu','avons pu','avez pu','ont pu'],
      futur:         ['pourrai','pourras','pourra','pourrons','pourrez','pourront'],
    },
  },
  {
    id: 'vouloir', infinitif: 'vouloir', groupe: 3, irregulier: true,
    illustration: 'heart', rareté: 'peu_commune', auxiliaire: 'avoir', participe_passe: 'voulu',
    temps: {
      present:       ['veux','veux','veut','voulons','voulez','veulent'],
      imparfait:     ['voulais','voulais','voulait','voulions','vouliez','voulaient'],
      passe_compose: ['ai voulu','as voulu','a voulu','avons voulu','avez voulu','ont voulu'],
      futur:         ['voudrai','voudras','voudra','voudrons','voudrez','voudront'],
    },
  },
  {
    id: 'devoir', infinitif: 'devoir', groupe: 3, irregulier: true,
    illustration: 'task', rareté: 'peu_commune', auxiliaire: 'avoir', participe_passe: 'dû',
    temps: {
      present:       ['dois','dois','doit','devons','devez','doivent'],
      imparfait:     ['devais','devais','devait','devions','deviez','devaient'],
      passe_compose: ['ai dû','as dû','a dû','avons dû','avez dû','ont dû'],
      futur:         ['devrai','devras','devra','devrons','devrez','devront'],
    },
  },
  {
    id: 'partir', infinitif: 'partir', groupe: 3, irregulier: true,
    illustration: 'walk', rareté: 'commune', auxiliaire: 'être', participe_passe: 'parti',
    temps: {
      present:       ['pars','pars','part','partons','partez','partent'],
      imparfait:     ['partais','partais','partait','partions','partiez','partaient'],
      passe_compose: ['suis parti','es parti','est parti','sommes partis','êtes partis','sont partis'],
      futur:         ['partirai','partiras','partira','partirons','partirez','partiront'],
    },
  },
  {
    id: 'sortir', infinitif: 'sortir', groupe: 3, irregulier: true,
    illustration: 'door', rareté: 'commune', auxiliaire: 'être', participe_passe: 'sorti',
    temps: {
      present:       ['sors','sors','sort','sortons','sortez','sortent'],
      imparfait:     ['sortais','sortais','sortait','sortions','sortiez','sortaient'],
      passe_compose: ['suis sorti','es sorti','est sorti','sommes sortis','êtes sortis','sont sortis'],
      futur:         ['sortirai','sortiras','sortira','sortirons','sortirez','sortiront'],
    },
  },
  {
    id: 'dormir', infinitif: 'dormir', groupe: 3, irregulier: true,
    illustration: 'sleep', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'dormi',
    temps: {
      present:       ['dors','dors','dort','dormons','dormez','dorment'],
      imparfait:     ['dormais','dormais','dormait','dormions','dormiez','dormaient'],
      passe_compose: ['ai dormi','as dormi','a dormi','avons dormi','avez dormi','ont dormi'],
      futur:         ['dormirai','dormiras','dormira','dormirons','dormirez','dormiront'],
    },
  },
  {
    id: 'mettre', infinitif: 'mettre', groupe: 3, irregulier: true,
    illustration: 'box', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'mis',
    temps: {
      present:       ['mets','mets','met','mettons','mettez','mettent'],
      imparfait:     ['mettais','mettais','mettait','mettions','mettiez','mettaient'],
      passe_compose: ['ai mis','as mis','a mis','avons mis','avez mis','ont mis'],
      futur:         ['mettrai','mettras','mettra','mettrons','mettrez','mettront'],
    },
  },
  {
    id: 'ecrire', infinitif: 'écrire', groupe: 3, irregulier: true,
    illustration: 'pen', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'écrit',
    temps: {
      present:       ['écris','écris','écrit','écrivons','écrivez','écrivent'],
      imparfait:     ['écrivais','écrivais','écrivait','écrivions','écriviez','écrivaient'],
      passe_compose: ['ai écrit','as écrit','a écrit','avons écrit','avez écrit','ont écrit'],
      futur:         ['écrirai','écriras','écrira','écrirons','écrirez','écriront'],
    },
  },
  {
    id: 'lire', infinitif: 'lire', groupe: 3, irregulier: true,
    illustration: 'book', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'lu',
    temps: {
      present:       ['lis','lis','lit','lisons','lisez','lisent'],
      imparfait:     ['lisais','lisais','lisait','lisions','lisiez','lisaient'],
      passe_compose: ['ai lu','as lu','a lu','avons lu','avez lu','ont lu'],
      futur:         ['lirai','liras','lira','lirons','lirez','liront'],
    },
  },
  {
    id: 'vivre', infinitif: 'vivre', groupe: 3, irregulier: true,
    illustration: 'life', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'vécu',
    temps: {
      present:       ['vis','vis','vit','vivons','vivez','vivent'],
      imparfait:     ['vivais','vivais','vivait','vivions','viviez','vivaient'],
      passe_compose: ['ai vécu','as vécu','a vécu','avons vécu','avez vécu','ont vécu'],
      futur:         ['vivrai','vivras','vivra','vivrons','vivrez','vivront'],
    },
  },
  {
    id: 'courir', infinitif: 'courir', groupe: 3, irregulier: true,
    illustration: 'run', rareté: 'commune', auxiliaire: 'avoir', participe_passe: 'couru',
    temps: {
      present:       ['cours','cours','court','courons','courez','courent'],
      imparfait:     ['courais','courais','courait','courions','couriez','couraient'],
      passe_compose: ['ai couru','as couru','a couru','avons couru','avez couru','ont couru'],
      futur:         ['courrai','courras','courra','courrons','courrez','courront'],
    },
  },
];
