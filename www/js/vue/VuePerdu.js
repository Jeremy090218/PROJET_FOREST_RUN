class VuePerdu extends Vue {
  constructor(ctrl) {
    super(ctrl, 'perdu');

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "PERDU";

    this.message = this.create('h2');
    this.add(this.message);
    this.message.innerHTML = "Vous avez obtenu";

    this.score = this.create('p');
    this.add(this.score);
    this.score.innerHTML = this.controleur.partieRunner.getScore()+" points";

    this.pieces = this.create('p');
    this.add(this.pieces);
    this.pieces.innerHTML = this.controleur.partieRunner.getPieceRecup();
    this.pieces.id = "nbPiecesVuePerdu";

    this.add(this.pieces, this.controleur.textures.getObjet("Coin_1.png"));

    this.pieces = this.create('p');
    this.add(this.pieces);
    this.pieces.innerHTML = "Votre meilleur score est de "+this.controleur.getUtilisateur().getHighScore()+" points";

    const buttonPerdu = this.create('button');
    this.add(buttonPerdu);
    buttonPerdu.innerHTML = "Menu Principal";
    buttonPerdu.onclick = () => {
        this.controleur.changerVueUnique(new VueMenuPrincipal(this.controleur));
    }
  }
}
