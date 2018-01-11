class VuePause extends Vue {
  constructor(ctrl, vueRunner) {
    super(ctrl, 'pause');

    this.vueRunner = vueRunner;

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Pause";

    const buttonReprendre = this.create('button');
    this.add(buttonReprendre);
    buttonReprendre.innerHTML = "Reprendre";
    buttonReprendre.onclick = () => {
      this.vueRunner.pause = 0;
      this.delete();
      this.controleur.rafraichirVues();
      this.controleur.play();
      this.vueRunner.affBtn();
    }

    const buttonMenuPrincip = this.create('button');
    this.add(buttonMenuPrincip);
    buttonMenuPrincip.innerHTML = "Menu principal";
    buttonMenuPrincip.onclick = () => {
      this.controleur.changerVueUnique(new VueMenuPrincipal(this.controleur));
    }


    //missions
    const missionPieceIHM = this.create('p');
    this.add(missionPieceIHM);
    missionPieceIHM.innerHTML = this.controleur.missionPiece.getMission();

    const missionScoreIHM = this.create('p');
    this.add(missionScoreIHM);
    missionScoreIHM.innerHTML = this.controleur.missionScore.getMission();

    const missionQuestionIHM = this.create('p');
    this.add(missionQuestionIHM);
    missionQuestionIHM.innerHTML = this.controleur.missionQuestion.getMission();
  }


}
