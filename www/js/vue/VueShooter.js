class VueShooter extends VueJeu {
  constructor(ctrl) {
    super(ctrl, 'shooter');
    document.addEventListener('touchstart', this.touchstart = (e) => {
      const pt = e.touches[0];
      this.controleur.partieShooter.verifierQuestion(pt.clientX,pt.clientY);
    }, false);
  }



  draw(){
    this.ctx.fillStyle = "#152";
    this.ctx.fillRect(0, 0, Partie.virtualW, Partie.virtualH);

    this.iterDrawPercpec(this.controleur.partieShooter.getFileRendu());
  }
  delete(){
    document.removeEventListener('touchstart', this.touchstart);
    super.delete();
  }
}
