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
    }

    const buttonMenuPrincip = this.create('button');
    this.add(buttonMenuPrincip);
    buttonMenuPrincip.innerHTML = "Menu principal";
    buttonMenuPrincip.onclick = () => {
      this.controleur.changerVueUnique(new VueMenuPrincipal(this.controleur));
    }
  }
}
