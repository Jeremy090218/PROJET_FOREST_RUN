class VueMenuPrincipal extends Vue {
  constructor(ctrl) {
    super(ctrl, 'menuPrincipal');

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Forest Run";

    const img = this.controleur.textures.getObjet('Coin_1.png');


    const button = this.create('button');
    this.add(button);
    this.add(button, img);
    button.innerHTML += "Atelier";

    button.onclick = () => {
      this.controleur.changerVue(new VueAtelier(this.controleur), this);
    }

    let button2 = this.add('button');
    button2.innerHTML = "Perdu";
    button2.onclick = () => {
      this.controleur.changerVue(new VuePerdu(this.controleur), this);
    }

    let button3 = this.add('button');
    button3.innerHTML = "Jouer";
    button3.onclick = () => {
      this.controleur.changerVue(new VueRunner(this.controleur), this);
    }

  }
}
