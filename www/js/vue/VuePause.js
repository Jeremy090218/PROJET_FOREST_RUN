class VuePause extends Vue {
  constructor(ctrl) {
    super(ctrl, 'pause');

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Pause";

    const buttonReprendre = this.create('button');
    this.add(buttonReprendre);
    buttonReprendre.innerHTML = "Reprendre";
    buttonReprendre.onclick = () => {
      this.delete();
    }

    const buttonMenuPrincip = this.create('button');
    this.add(buttonMenuPrincip);
    buttonMenuPrincip.innerHTML = "Menu principal";
    buttonMenuPrincip.onclick = () => {
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur), this);
    }
  }
}
