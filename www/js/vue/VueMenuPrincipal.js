class VueMenuPrincipal extends Vue {
  constructor(ctrl) {
    super(ctrl, 'menuPrincipal');


    //Button option
<<<<<<< HEAD
    const buttonOptions = this.create('button');
    this.add(buttonOptions);
    buttonOptions.innerHTML = "Options";
    buttonOptions.onclick = () => {
=======
    const buttonOption = this.create('button');
    buttonOption.id="btnO";
    this.add(buttonOption);
    buttonOption.innerHTML = "Options";
    buttonOption.onclick = () => {
>>>>>>> 8a257cb7aaca9930ebbc4bee179566d48c40c09c
    this.controleur.changerVue(new VueOptions(this.controleur), this);
    }
    //titre
    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Forest Run";


    //button jouer
    const buttonJouer = this.create('button');
    this.add(buttonJouer);
    buttonJouer.innerHTML = "Jouer";
    buttonJouer.onclick = () => {
      this.controleur.changerVue(new VueRunner(this.controleur), this);
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
