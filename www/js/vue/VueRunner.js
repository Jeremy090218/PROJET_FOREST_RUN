class VueRunner extends VueJeu {
  constructor(ctrl) {
    super(ctrl, 'runner');

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Runner";

    const buttonPause = this.create('button');
    this.add(buttonPause);
    buttonPause.innerHTML = "Pause";
    buttonPause.onclick = () => {
      this.controleur.changerVue(new VuePause(this.controleur));
    }

    const buttonPerdu = this.create('button');
    this.add(buttonPerdu);
    buttonPerdu.innerHTML = "Perdu";
    buttonPerdu.onclick = () => {
      this.controleur.changerVue(new VuePerdu(this.controleur), this);
    }

    const buttonVct = this.create('button');
    this.add(buttonVct);
    buttonVct.innerHTML = "Victoire";
    buttonVct.onclick = () => {
      this.controleur.changerVue(new VueVictoire(this.controleur),this);
    }
  }
}
