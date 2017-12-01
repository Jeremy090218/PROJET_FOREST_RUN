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
    this.partieRendu = null;

    this.vues = new Array();
    this.vueRendu = null;

    this.textures = new Bank("img", "textures/", ["default.png", "fondtest.png", "Ground_0_1.png",
                                                  "Obstacle_1.png",
                                                  "Tree_0_1.png",
                                                  "Coin_1.png"]);

    this.chargement();
  }

  chargement(){
    this.textures.chargement(() => {
      console.log("Fin chargement des textures");
      this.chargerDonneesSauvegarde(() => {
        console.log("Fin chargement des données utilisateur");
        this.changerVue(new VueMenuPrincipal(this));
      });
    }, (prog) => {
      console.log(prog +"%");
    });
  }

  rafraichirVues(){
    for (let i = 0; i < this.vues.length; ++i) {
      if(!this.vues[i].isAlive()){
        this.vues.splice(i--, 1);
      }
    }
  }

  changerVueUnique(vue){
    for (let i = 0; i < this.vues.length; ++i) {
      this.vues[i].delete();
    }
    this.changerVue(vue);
  }

  setVueRendu(v){
    this.vueRendu = v;
  }

  changerVue(vue, vueActuelle = null){
    if(vueActuelle) vueActuelle.delete();
    this.rafraichirVues();
    this.vues.push(vue);
  }

  nouvellePartie(){
    this.partieRunner = new PartieRun(this);
    this.partieRendu = this.partieRunner;
    this.play();
  }

  pause(){
    console.log("pause");
    this.run = false;
  }

  play(){
    if(this.partieRendu){
      console.log("play");
      this.run = true;
      this.acumulateur = 1001;
      this.boucleDeJeu(0);
    } else {
      console.log("Play impossible, aucune partie initialisé");
    }
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
    this.vueRendu.draw();
  }

  update(){
    //console.log("update");
    this.partieRunner.update();
  }

  chargerDonneesSauvegarde(cb){
    // TODO: utiliser plugin cordova pour faire un read ou utiliser un XMLHttpRequest
    this.dataUtilisateur = {
      achete: ["wowo", "ofhvoqjdhv", "qfdsghgfdfgh"],
      equipe: ["iihiu", "gqdfgqdf", "qsdgoqu", "sqgq"]
    }

    cb();
  }

  sauvegarderDonnees(){
    // TODO: utiliser plugin cordova pour faire un write
    //this.dataUtilisateur;
  }

  getDataUtilisateur(){
    return this.dataUtilisateur;
  }

  resetDataUtilisateur(){
    if (confirm("Effacer toutes vos données ? Cette action est irreversible !!!")) {
      for (let atr in this.dataUtilisateur) {
        console.log("Remise à zero de: "+atr);
        this.dataUtilisateur[atr] = null;
      }
      this.sauvegarderDonnees();
    }
  }

  debbug(){
    console.log("Etat run: "+ this.run);
    console.log("PartieRunner: "+ this.partieRunner);
    console.log("PartieShooterr: "+ this.partieShooter);
    console.log("Vues:", this.vues);
    console.log("Vue du rendu graphique courant:", this.vueRendu);
    console.log("Acumulateur: "+ this.acumulateur);
  }
}
