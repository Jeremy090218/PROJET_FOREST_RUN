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

    ////////////////////
    const testS = this.create('button');
    this.add(testS);
    testS.innerHTML = "Shooter";
    testS.onclick = () => {
      this.controleur.switchMode('shooter');
      this.controleur.play();
    }

    const testR = this.create('button');
    this.add(testR);
    testR.innerHTML = "Runner";
    testR.onclick = () => {
      this.controleur.switchMode('runner');
      this.controleur.play();
    }
  }


}
