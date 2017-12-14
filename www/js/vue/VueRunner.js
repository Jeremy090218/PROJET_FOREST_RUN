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
  }

  draw(){
    super.draw();

    for (let o of this.controleur.partieRunner.getObstacles()) {
      this.ctx.save();
      this.ctx.translate(o.getX(), o.getY());
      this.ctx.scale((o.getY()/450), (o.getY()/450));
      this.ctx.drawImage(o.getTexture(), 0, 0);
      this.ctx.restore();
    }
  }
}
