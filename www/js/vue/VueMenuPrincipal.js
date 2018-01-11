class VueMenuPrincipal extends Vue {
  constructor(ctrl) {
    super(ctrl, 'menuPrincipal');

    this.controleur.changerMusique("musique_menu.mp3");
    console.log(this.controleur.utilisateur.getSkins());
    //Button option
    const buttonOption = this.create('button');
    buttonOption.id="btnHD";
    this.add(buttonOption);
    buttonOption.innerHTML = "Options";
    buttonOption.onclick = () => {
    this.controleur.changerVue(new VueOptions(this.controleur), this);
    }
    //titre
    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Forest Run";


    //this.add(this.controleur.textures.getObjet("fondtest.png"));


    //button jouer
    const buttonJouer = this.create('button');
    this.add(buttonJouer);
    buttonJouer.innerHTML = "Jouer";
    buttonJouer.onclick = () => {
      this.controleur.switchMode("nouvellePartie");
      this.controleur.play();
    }

    //button atelier
    const buttonAtl = this.create('button');
    this.add(buttonAtl);
    buttonAtl.innerHTML = "Atelier";
    buttonAtl.onclick = () => {
      this.controleur.changerVue(new VueAtelier(this.controleur), this);
    }

    //button univers
    const buttonUnivers = this.create('button');
    this.add(buttonUnivers);
    buttonUnivers.innerHTML = "Univers";
    buttonUnivers.onclick = () => {
      this.controleur.changerVue(new VueUnivers(this.controleur), this);
    }

    //button règle
    const buttonRegle = this.create('button');
    this.add(buttonRegle);
    buttonRegle.innerHTML = "Règles";
    buttonRegle.onclick = () => {
      this.controleur.changerVue(new VueRegle(this.controleur), this);
    }

    //button leçons
    const buttonLecons = this.create('button');
    this.add(buttonLecons);
    buttonLecons.innerHTML = "Leçons";
    buttonLecons.onclick = () => {
      this.controleur.changerVue(new VueLecons(this.controleur), this);
    }

  }
}
