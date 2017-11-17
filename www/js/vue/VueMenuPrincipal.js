class VueMenuPrincipal extends Vue {
  constructor(ctrl) {
    super(ctrl, 'menuPrincipal');

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Forest Run";

    const button = this.create('button');
    this.add(button);
    button.innerHTML = "Atelier";
    button.onclick = () => {
      this.controleur.changerVue(new VueAtelier(this.controleur), this);
    }
  }
}
