class VueShooter extends VueJeu {
  constructor(ctrl) {
    super(ctrl, 'shooter');

    setTimeout(() => {
      document.addEventListener('touchstart', this.touchstart = (e) => {
        const pt = e.touches[0];
        if (pt.clientX*this.ew > 290 && pt.clientY*this.eh < 50) {

        } else if (this.controleur.isRunning()) {
          this.controleur.partieShooter.verifierQuestion(pt.clientX,pt.clientY);
        }

      }, false);
    }, 800);

    this.question = this.create('p');
    this.add(this.question);
    this.question.id = "afficheQuestionShooter";

    this.refreshQuestion()
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

  refreshQuestion(){
    this.question.innerHTML = this.controleur.partieShooter.question.getIntitule() + "</br>" + this.controleur.partieShooter.question.getQuestion();
  }
}
