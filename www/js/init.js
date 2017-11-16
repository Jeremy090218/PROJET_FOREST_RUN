(() => {
  const chargeJS = (j, liste, doss, cb) => {
    const s = document.createElement('script');
    s.type = "text/javascript";
    s.src = "js/"+ doss + liste[j] +".js";
    body.appendChild(s);
    s.onload = () => {
      if (++j < liste.length) chargeJS(j, liste, doss, cb);
      else cb();
    }
  }

  const classes = [
    ['Controleur'],
    ['Element', 'Partie', 'Bank', 'ElementPartie', 'Atelier', 'Boutique', 'Cible', 'ElementDecor', 'Item', 'ObjetRamassable', 'Obstacle', 'PartieRun', 'PartieShoot', 'Personnage', 'Question', 'Reponse', 'Trajectoire', 'Utilisateur'],
    ['Vue', 'VueAtelier', 'VueJeu', 'VueRunner', 'VueLeconsStats', 'VueMenuPrincipal', 'VueOptions', 'VuePause', 'VuePerdu', 'VueShooterBoss', 'VueShooterEchec', 'VueVictoire']
  ];

  const body = document.getElementsByTagName('body')[0];
  let dossier;
  let nb = 0;
  for (let i = 0; i < classes.length; ++i) {
    switch (i) {
      case 0: dossier = "controleur/"; break;
      case 1: dossier = "model/"; break;
      case 2: dossier = "vue/"; break;
      default: dossier = "";
    }

    chargeJS(0, classes[i], dossier, () => {
      if(++nb == classes.length){
        let arr = ['main'];
        if ((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)) arr.unshift('cordova');
        chargeJS(0, arr, "", () => {});
      }
    });
  }
})();
