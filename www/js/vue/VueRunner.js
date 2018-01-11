class VueRunner extends VueJeu {
  constructor(ctrl) {
    super(ctrl, 'runner');

    this.controleur.sauvegarderDonnees();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.controleur.changerMusique("musique_jeu01.mp3");

    this.ctx.font = "40px FredokaOne-Regular";

    this.pointeur = {x: -1, y: -1};
    this.depart = {x: -1, y: -1};
    this.mov = 0;

    document.addEventListener('touchstart', this.touchstart = (e) => {
      const pt = e.touches[0];
      this.depart.x = pt.clientX;
      this.depart.y = pt.clientY;
    }, false);

    document.addEventListener('touchmove', this.touchmove = (e) => {
      ++this.mov;
      const pt = e.changedTouches[0];
      this.pointeur.x = pt.clientX;
      this.pointeur.y = pt.clientY;
      if (this.mov == 3) {
        const a = Math.atan2(this.pointeur.x - this.depart.x, this.pointeur.y - this.depart.y);
        if(a >= -Math.PI/4 && a < Math.PI/4){
          //console.log("bas");
          this.controleur.partieRunner.actionBas();
        } else if (a >= Math.PI/4 && a < 3*Math.PI/4) {
          //console.log("droite");
          this.controleur.partieRunner.actionDroite();
        } else if (a <= -Math.PI/4 && a > -3*Math.PI/4) {
          //console.log("gauche");
          this.controleur.partieRunner.actionGauche();
        } else {
          //console.log("haut");
          this.controleur.partieRunner.actionHaut();
        }
      }
    }, false);

    document.addEventListener('touchcancel', this.touchcancel = (e) => {
      console.log("touchcancel");
    }, false);

    document.addEventListener('touchend', this.touchend = (e) => {
      this.mov = 0;
    }, false);

    this.textureVie = this.controleur.textures.getObjet("IconCoeur.png");
    this.texturePiece = this.controleur.textures.getObjet("Coin_1.png");
    this.texturePotion = this.controleur.textures.getObjet("potionBleu.png");

    this.couleurSol = [17, 170, 85];
    this.goCouleurSol = [17, 170, 85];

    this.controleur.partieRunner.setOnChangeMonde((m) => {
      switch (m) {
        case 0: this.goCouleurSol = [17, 170, 85]; break;
        case 1: this.goCouleurSol = [17, 200, 40]; break;
        case 2: this.goCouleurSol = [241, 196, 15]; break;
      }
    });
  }

  draw(){
    //super.draw();
    if(this.goCouleurSol[0] < this.couleurSol[0]) --this.couleurSol[0];
    if(this.goCouleurSol[0] > this.couleurSol[0]) ++this.couleurSol[0];
    if(this.goCouleurSol[1] < this.couleurSol[1]) --this.couleurSol[1];
    if(this.goCouleurSol[1] > this.couleurSol[1]) ++this.couleurSol[1];
    if(this.goCouleurSol[2] < this.couleurSol[2]) --this.couleurSol[2];
    if(this.goCouleurSol[2] > this.couleurSol[2]) ++this.couleurSol[2];

    this.ctx.fillStyle = "rgb("+ this.couleurSol[0] +", "+ this.couleurSol[1] +", "+ this.couleurSol[2] +")";
    this.ctx.fillRect(0, 300, 360, 340);

    this.ctx.fillStyle = "#15a";
    this.ctx.fillRect(0, 0, 360, 300);

    /*this.iterDrawPercpec(this.controleur.partieRunner.getElementsDecors());
    this.iterDrawPercpec(this.controleur.partieRunner.getRamassables());
    this.iterDrawPercpec(this.controleur.partieRunner.getObstacles());

    this.iterDrawPercpec(this.controleur.partieRunner.elementReponses);*/

    this.iterDrawPercpec(this.controleur.partieRunner.getFileRendu());

    this.iterDrawEmetteur(this.controleur.partieRunner.getEmetteurParticules());

    //this.iterDrawPercpecAnim([this.controleur.partieRunner.getPersonnage()]);

    //const vie = this.controleur.textures.getObjet("IconCoeur.png");
    for (let i = 0; i < this.controleur.partieRunner.getPersonnage().getVie(); ++i) {
      this.ctx.drawImage(this.textureVie, i*25, 0);
    }

    //this.ctx.save();
    //this.ctx.scale(0.66, 0.66);

    this.ctx.drawImage(this.texturePiece, 10, 50);
    this.ctx.drawImage(this.texturePotion, 10, 100);
    //this.ctx.restore();


    this.ctx.textAlign="left";
    this.ctx.fillStyle = "#26A65B";
    this.ctx.fillText(this.controleur.partieRunner.pieceRecup,70,88);
    this.ctx.fillText(this.controleur.partieRunner.nbReponse,70,140);

    this.ctx.textAlign="center";
    this.ctx.fillText(this.controleur.partieRunner.score,Partie.virtualW/2,50);
  }

  delete(){
    document.removeEventListener('touchstart', this.touchstart);
    document.removeEventListener('touchmove', this.touchmove);
    document.removeEventListener('touchcancel', this.touchcancel);
    document.removeEventListener('touchend', this.touchend);
    super.delete();
  }
}
