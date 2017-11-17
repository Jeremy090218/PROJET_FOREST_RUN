class VueRunner extends VueJeu {
  constructor(ctrl) {
    super(ctrl, 'runner');

    let titre = this.add('h1');
    titre.innerHTML = "Runner";

    let button = this.add('button');
    button.innerHTML = "Pause";
    button.onclick = () => {
      this.controleur.changerVue(new VuePause(this.controleur));
    }
  }
}
