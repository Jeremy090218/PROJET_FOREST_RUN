class VueRunner extends VueJeu {
  constructor(ctrl) {
    super(ctrl, 'runner');

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Runner";

    const buttonPause = this.create('buttonPause');
    this.add(button);
    buttonPause.innerHTML = "Pause";
    buttonPause.onclick = () => {
      this.controleur.changerVue(new VuePause(this.controleur));
    }

    const buttonVct = this.create('button');
    this.add(buttonVtc);
    buttonVct.innerHTML = "Victoire";
    buttonVct.onclick = () => {
      this.controleur.changerVue(new VueVictoire(this.controleur),this);
    }
  }
}
