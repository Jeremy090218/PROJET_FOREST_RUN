class VuePerdu extends Vue {
  constructor(ctrl) {
    super(ctrl, 'perdu');

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Perdu";

    const buttonPerdu = this.create('button');
    this.add(buttonPerdu);
    buttonPerdu.innerHTML = "Menu Principal";
    buttonPerdu.onclick = () => {
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur), this);
    }

    // Test //
    const titreThomas = this.create('h2');
    this.add(titreThomas);
    titreThomas.innerHTML = "Salut c'est Jérémy";
  }
}
