class VueRegle extends Vue {
  constructor(ctrl) {
    super(ctrl, 'VueRegle');

    const buttonRetour = this.create('button');
    buttonRetour.id="btnHD";
    this.add(buttonRetour);
    buttonRetour.innerHTML = "Menu Principal";
    buttonRetour.onclick = () => {
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur), this);
    }

    const titre = this.create('h2');
    this.add(titre);
    titre.innerHTML = "Règle du jeu";

  }
}
