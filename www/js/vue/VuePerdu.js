class VuePerdu extends Vue {
  constructor(ctrl) {
    super(ctrl, 'perdu');

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Perdu";

    const button = this.create('button');
    this.add(button);
    button.innerHTML = "Menu Principal";
    button.onclick = () => {
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur), this);
    }
  }
}
