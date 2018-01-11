class VueMenuPrincipal extends Vue {
  constructor(ctrl) {
    super(ctrl, 'menuPrincipal');

    this.controleur.changerMusique("musique_menu.mp3");
    //Button option
    const buttonOption = this.create('button');
    buttonOption.id="btnHD";
    this.add(buttonOption);
    buttonOption.innerHTML = "Options";
    buttonOption.onclick = () => {
    this.controleur.changerVue(new VueOptions(this.controleur), this);
    }

    //titre
    /*const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Forest Run";*/
    const bannier = this.controleur.textures.getObjet("Bannier.png")
    this.add(bannier);
    bannier.style = "width: 100%";


    //this.add(this.controleur.textures.getObjet("fondtest.png"));

    const div1 = this.create('div');
    this.add(div1);
    div1.id = "div1";
    //button jouer
    const buttonJouer = this.create('button');
    this.add(div1,buttonJouer);
    buttonJouer.innerHTML = "Jouer";
    buttonJouer.onclick = () => {
      this.controleur.switchMode("nouvellePartie");
      this.controleur.play();
    }

    //button atelier
    const buttonAtl = this.create('button');
    this.add(div1,buttonAtl);
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

    //missions
    const divMis = this.create('div');
    this.add(divMis);
    divMis.id = "divMis";

    const missionPieceIHM = this.create('p');
    this.add(divMis,missionPieceIHM);
    missionPieceIHM.innerHTML = this.controleur.missionPiece.getMission();

    const missionScoreIHM = this.create('p');
    this.add(divMis,missionScoreIHM);
    missionScoreIHM.innerHTML = this.controleur.missionScore.getMission();

    const missionQuestionIHM = this.create('p');
    this.add(divMis,missionQuestionIHM);
    missionQuestionIHM.innerHTML = this.controleur.missionQuestion.getMission();
  }
}
