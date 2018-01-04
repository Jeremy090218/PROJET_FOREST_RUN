class VueShooter extends VueJeu {
  constructor(ctrl) {
    super(ctrl, 'shooter');

  }

  draw(){
    this.ctx.fillStyle = "#152";
    this.ctx.fillRect(0, 0, Partie.virtualW, Partie.virtualH);

    this.iterDrawPercpec(this.controleur.partieShooter.getFileRendu());
  }
}
