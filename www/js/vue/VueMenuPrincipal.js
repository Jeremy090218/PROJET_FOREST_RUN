class VueMenuPrincipal extends Vue {
  constructor(ctrl) {
    super(ctrl, 'menuPrincipal');


    //Button option
    const buttonOption = this.create('button');
    buttonOption.id="btn0";
    this.add(buttonOption);
    buttonOption.innerHTML = "Options";
    buttonOption.onclick = () => {
    this.controleur.changerVue(new VueOptions(this.controleur), this);
    }
    //titre
    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Forest Run";


    /*this.add(this.controleur.textures.getObjet("fondtest.png");*/


    //button jouer
    const buttonJouer = this.create('button');
    this.add(buttonJouer);
    buttonJouer.innerHTML = "Jouer";
    buttonJouer.onclick = () => {
      this.controleur.switchMode("nouvellePartie");
      this.controleur.changerVue(new VueRunner(this.controleur), this);
      this.controleur.play();
    }

    //button Atelier
    const buttonAtl = this.create('button');
    this.add(buttonAtl);
    buttonAtl.innerHTML = "Atelier";
    buttonAtl.onclick = () => {
      this.controleur.changerVue(new VueAtelier(this.controleur), this);
    }

    //button Stats et leçons
    const buttonLeconsStats = this.create('button');
    this.add(buttonLeconsStats);
    buttonLeconsStats.innerHTML = "Leçons et statistiques";
    buttonLeconsStats.onclick = () => {
      this.controleur.changerVue(new VueLeconsStats(this.controleur), this);
    }

  }
}
