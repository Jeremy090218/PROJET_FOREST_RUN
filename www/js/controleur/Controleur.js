class Controleur {
  constructor() {
////Pour la boucle de jeu///////////////
    this.TPS = 65;
    this.temps = 0;
    this.acumulateur = 0;
    this.PAS = ((1 / this.TPS) * 1000);
    this.run = false;
///////////////////////////////////////
    this.partieRunner = null;
    this.partieShooter = null;

    this.vues = new Array();

    this.textures = new Bank("img", "textures/", ["default.png"]);

    this.chargement();
  }

  chargement(){
    this.textures.chargement(() => {
      console.log("Fin chargement");
      this.changerVue(new VueMenuPrincipal(this));
    }, (prog) => {
      console.log(prog +"%");
    });
  }

  changerVue(vue, vueActuelle = null){
    if(vueActuelle) vueActuelle.delete();
    for (let i = 0; i < this.vues.length; ++i) {
      if(!this.vues[i].isAlive()){
        this.vues.splice(i--, 1);
      }
    }

    this.vues.push(vue);
  }

  nouvellePartie(){
    this.partieRunner = new PartieRun(this);
    this.play();
  }

  pause(){
    console.log("pause");
    this.run = false;
  }

  play(){
    console.log("play");
    this.run = true;
    this.acumulateur = 1001;
    this.boucleDeJeu(0);
  }

  boucleDeJeu(millis){
    if(this.run){
      this.acumulateur += (millis - this.temps);
      if(this.acumulateur > 1000) this.acumulateur = 0;
      while (this.acumulateur > this.PAS) {
        this.update();
        this.acumulateur -= this.PAS;
      }
      this.draw();
      this.temps = millis;
      requestAnimationFrame((m) => {
        this.boucleDeJeu(m);
      });
    }
  }

  draw(){
    //console.log("draw");
  }

  update(){
    //console.log("update");
  }
}
