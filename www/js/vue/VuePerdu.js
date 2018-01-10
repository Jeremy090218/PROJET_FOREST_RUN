class VuePerdu extends Vue {
  constructor(ctrl) {
    super(ctrl, 'perdu');

    const divB = this.create('div');
    this.add(divB);
    divB.id = "divB";

    const buttonPerdu = this.create('button');
    this.add(divB;buttonPerdu);
    buttonPerdu.innerHTML = "Menu Principal";
    buttonPerdu.onclick = () => {
        this.controleur.changerVueUnique(new VueMenuPrincipal(this.controleur));
    }

    const titre = this.create('h1');
    this.add(divB,titre);
    titre.innerHTML = "PERDU";

    this.message = this.create('h2');
    this.add(divB,this.message);
    this.message.innerHTML = "Vous avez obtenu";

    this.score = this.create('p');
    this.add(divB,this.score);
    this.score.innerHTML = this.controleur.partieRunner.getScore()+" points";

    this.pieces = this.create('p');
    this.add(divB,this.pieces);
    this.pieces.innerHTML = this.controleur.partieRunner.getPieceRecup();
    this.pieces.id = "nbPiecesVuePerdu";

    this.add(this.pieces, this.controleur.textures.getObjet("Coin_1.png"));

    this.pieces = this.create('p');
    this.add(divB,this.pieces);
    this.pieces.innerHTML = "Votre meilleur score est de "+this.controleur.getUtilisateur().getHighScore()+" points";


  }
}
