class VueRunner extends VueJeu {
  constructor(ctrl) {
    super(ctrl, 'runner');

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Runner";

    const buttonPause = this.create('button');
    this.add(buttonPause);
    buttonPause.innerHTML = "Pause";
    this.pause = 0;
    buttonPause.onclick = () => {
      if (this.pause == 0) {
        this.pause = 1;
        this.controleur.changerVue(new VuePause(this.controleur, this));
        this.controleur.pause();
      }
    }

    const buttonPerdu = this.create('button');
    this.add(buttonPerdu);

    buttonPerdu.innerHTML = "Perdu";

    buttonPerdu.onclick = () => {
      this.controleur.changerVue(new VuePerdu(this.controleur), this);
    }

    const buttonVct = this.create('button');
    this.add(buttonVct);
    buttonVct.innerHTML = "Victoire";
    buttonVct.onclick = () => {
      this.controleur.changerVue(new VueVictoire(this.controleur),this);
    }

    this.controleur.switchMode("runner");





    this.pointeur = {x: -1, y: -1};
    this.depart = {x: -1, y: -1};
    this.mov = 0;

    document.addEventListener('touchstart', (e) => {
      const pt = e.touches[0];
      this.depart.x = pt.clientX;
      this.depart.y = pt.clientY;
    }, false);

    document.addEventListener('touchmove', (e) => {
      ++this.mov;
      const pt = e.changedTouches[0];
      this.pointeur.x = pt.clientX;
      this.pointeur.y = pt.clientY;
      if (this.mov == 3) {
        const a = Math.atan2(this.pointeur.x - this.depart.x, this.pointeur.y - this.depart.y);
        if(a >= -Math.PI/4 && a < Math.PI/4){
          console.log("bas");
          this.controleur.partieRunner.actionBas();
        } else if (a >= Math.PI/4 && a < 3*Math.PI/4) {
          console.log("droite");
          this.controleur.partieRunner.actionDroite();
        } else if (a <= -Math.PI/4 && a > -3*Math.PI/4) {
          console.log("gauche");
          this.controleur.partieRunner.actionGauche();
        } else {
          console.log("haut");
          this.controleur.partieRunner.actionHaut();
        }
      }
    }, false);

    document.addEventListener('touchcancel', (e) => {
      //console.log("Cancel");
    }, false);

    document.addEventListener('touchend', (e) => {
      //console.log("End");
      this.mov = 0;
    }, false);
  }

  draw(){
    super.draw();

    /*for (let o of this.controleur.partieRunner.getObstacles()) {
      this.ctx.save();
      this.ctx.translate(o.getX(), o.getY());
      this.ctx.scale((o.getY()/o.getZ()), (o.getY()/o.getZ()));
      this.ctx.drawImage(o.getTexture(), 0, 0);
      this.ctx.restore();
    }*/

    this.iterDrawPercpec(this.controleur.partieRunner.getElementsDecors());
    this.iterDrawPercpec(this.controleur.partieRunner.getObstacles());
    this.iterDrawPercpec(this.controleur.partieRunner.getRamassables());
    this.iterDrawPercpec([this.controleur.partieRunner.getPersonnage()]);

  }

  iterDrawPercpec(arr){
    for (let o of arr) {
      this.ctx.save();
      this.ctx.translate(o.getX(), o.getY());
      this.ctx.scale(o.getZ(), o.getZ());
      this.ctx.drawImage(o.getTexture(), 0, 0);
      this.ctx.restore();
    }
  }
}
