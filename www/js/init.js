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
    ['algebra-0.2.6.min'],
    ['Controleur'],
    ['Element', 'Partie', 'Bank', 'ElementPartie','Mission', 'EmetteurParticules', 'Atelier', 'Boutique', 'ElementDecor','ElementReponse', 'ElementReponseShooter', 'Item', 'ObjetRamassable', 'Obstacle', 'PartieRun', 'PartieShoot', 'Personnage', 'Question', 'Reponse', 'Trajectoire', 'Utilisateur'],
    ['Vue', 'VueJeu', 'VueAtelier', 'VueRunner', 'VueLecons', 'VueQuestion', 'VueUnivers', 'VueRegle', 'VueLecon', 'VueStats', 'VueMenuPrincipal', 'VueOptions', 'VuePause', 'VuePerdu', 'VueShooter', 'VueVictoire', 'VueBoutique', 'VueConfirmationReinit', 'VueCredits']
  ];

  const body = document.getElementsByTagName('body')[0];
  let dossier;
  let nb = 0;
  for (let i = 0; i < classes.length; ++i) {
    switch (i) {
      case 1: dossier = "controleur/"; break;
      case 2: dossier = "model/"; break;
      case 3: dossier = "vue/"; break;
      default: dossier = "";
    }

    chargeJS(0, classes[i], dossier, () => {
      if(++nb == classes.length){
        chargeJS(0, ['main'], "", () => {});
      }
    });
  }
})();
