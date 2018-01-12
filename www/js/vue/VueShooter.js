class VueShooter extends VueJeu {
  constructor(ctrl) {
    super(ctrl, 'shooter');

    setTimeout(() => {
      document.addEventListener('touchstart', this.touchstart = (e) => {
        const pt = e.touches[0];
        if (pt.clientX/this.ew > 290 && pt.clientY/this.eh < 50) {

        } else if (this.controleur.isRunning()) {
          //console.log("click: ", pt.clientX/this.ew, pt.clientY/this.eh);
          this.controleur.partieShooter.verifierQuestion(pt.clientX/this.ew,pt.clientY/this.eh);
        }

      }, false);
    }, 800);

    this.question = this.create('p');
    this.add(this.question);
    this.question.id = "afficheQuestionShooter";

    const num = Math.floor(Math.random()*1.99);

    this.boss = this.controleur.textures.getObjet("Boss_"+num+".png");
    this.bambou = this.controleur.textures.getObjet("Bambou.png");

    this.refreshQuestion();
  }



  draw(){
    //this.ctx.fillStyle = "#152";
    this.ctx.fillStyle = "#132";
    this.ctx.fillRect(0, 0, Partie.virtualW, Partie.virtualH);

    this.ctx.fillStyle = "#004D40";
    this.ctx.fillRect(0, 390, 360, 250);

    for (let i = 0; i < 5; ++i) {
      this.ctx.save();
      this.ctx.translate((Partie.virtualW/5)*i, Partie.virtualH/2 - 100);
      this.ctx.scale(3, 3);
      this.ctx.translate(-this.bambou.width/2, -this.bambou.height/2);
      this.ctx.drawImage(this.bambou, 0, 0);
      this.ctx.restore();
    }

    for (let i = 0; i < 5; ++i) {
      this.ctx.save();
      this.ctx.translate((Partie.virtualW/5)*i, Partie.virtualH/2);
      this.ctx.scale(3, 3);
      this.ctx.translate(-this.bambou.width/2, -this.bambou.height/2);
      this.ctx.drawImage(this.bambou, 0, 0);
      this.ctx.restore();
    }

    this.ctx.save();
    this.ctx.translate(Partie.virtualW/2, Partie.virtualH/2);
    this.ctx.scale(4, 4);
    this.ctx.translate(-this.boss.width/2, -this.boss.height/2);
    this.ctx.drawImage(this.boss, 0, 0);
    this.ctx.restore();



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
