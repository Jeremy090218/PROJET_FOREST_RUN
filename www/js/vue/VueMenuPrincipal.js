class VueMenuPrincipal extends Vue {
  constructor(ctrl) {
    super(ctrl, 'menuPrincipal');

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Forest Run";

    const buttonAtl = this.create('button');
    this.add(buttonAtl);
    buttonAtl.innerHTML = "Atelier";
    buttonAtl.onclick = () => {
      this.controleur.changerVue(new VueAtelier(this.controleur), this);
    }

    const buttonJouer = this.create('button');
    this.add(buttonJouer);
    buttonJouer.innerHTML = "Jouer";
    buttonJouer.onclick = () => {
      this.controleur.changerVue(new VueRunner(this.controleur), this);
    }

    const buttonOption = this.create('button');
    this.add(buttonOption);
    buttonOption.innerHTML = "Option";
    buttonOption.onclick = () => {
    this.controleur.changerVue(new VueOptions(this.controleur), this);
    }

  }
}
