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
                                                  "Nuage_0_1.png",
                                                  "Coin_1.png", "IconCoeur.png", "potion.png", "Character_0_annimation.png",
                                                  "Character_0_vue_4.png","Character_0_vue_0.png", "Character_1_vue_0.png", "Character_2_vue_0.png","Ecran_accueil.png",
                                                  "Character_1_annimation.png",
                                                  "Character_2_annimation.png"]);
    this.sons = new Bank("audio", "sons/", ["chat.mp3", "crash.mp3", "lapin.mp3", "mouton.mp3", "piece.mp3",
                                            "musique_jeu01.mp3", "musique_jeu02.mp3", "musique_jeu03.mp3", "musique_menu.mp3"]);



    this.chargement();
  }

  chargement(){
    this.textures.chargement(() => {
      console.log("Fin chargement des textures");
      this.utilisateur = new Utilisateur(this);
      this.sons.chargement(() => {
        console.log("Fin chargement des sons");
        this.chargerDonneesSauvegarde(() => {
          console.log("Fin chargement des données utilisateur");
          this.changerVue(new VueMenuPrincipal(this));

          this.changerMusique("musique_menu.mp3");
        });
      }, (prog) => {
        console.log(prog +"%");
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

  switchMode(m){
    switch (m) {
      case "runner":
        if(!this.partieRunner) console.log("Erreur: aucune nouvelle partie initialisée");
        else {
            this.partieRendu = this.partieRunner;
            this.changerVueUnique(new VueRunner(this));
        }
        break;
      case "shooter":
        if(!this.partieShooter){
          this.partieShooter = new PartieShoot(this, this.utilisateur.getPersonnageShooter(),null);
        }
        this.partieRendu = this.partieShooter;
        this.changerVueUnique(new VueShooter(this));
        break;
      case "nouvellePartie":
        this.partieRunner = new PartieRun(this, this.utilisateur.getPersonnageRunner(), null);
        this.partieShooter = null;
        this.partieRendu = this.partieRunner;
        this.changerVueUnique(new VueRunner(this));
        break;
      default:
        console.log("switchMode incorrecte");
    }
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
      console.log("Play impossible, aucune partie initialisée");
    }
  }

  isRunning(){
    return this.run;
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
    } else {
      this.vueRendu.EcranPause();
    }
  }

  draw(){
    //console.log("draw");
    this.vueRendu.draw();
  }

  update(){
    //console.log("update");
    this.partieRendu.update();
  }

  chargerDonneesSauvegarde(cb){
    // TODO: utiliser plugin cordova pour faire un read ou utiliser un XMLHttpRequest
    const dataUtilisateur = {
      persoCourant: {nom: "Chat", textureFixe: "Character_0_vue_0.png", textureAnim: "Character_0_annimation.png"},
      achete: [new Item("Esquive +",true,true,20), new Item("Vie +",true,false,100)],
      equipe: new Item("Esquive +",true,true,20),
      //boutique: [new Item("Saut +",true,false,50),new Item("Esquive ++",true,false,100)],
      //argent: 100
    }

    this.utilisateur.setFromSauvegarde(dataUtilisateur);

    // VALEUR POUR TESTER
    this.utilisateur.setArgent(100);

    cb();
  }

  sauvegarderDonnees(){
    // TODO: utiliser plugin cordova pour faire un write
  }

  getUtilisateur(){
    return this.utilisateur;
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
    console.log("PartieRunner:", this.partieRunner);
    console.log("PartieShooter:", this.partieShooter);
    console.log("Partie en cours de fonctionnement:", this.partieRendu);
    console.log("Vues:", this.vues);
    console.log("Vue du rendu graphique courant:", this.vueRendu);
    console.log("Acumulateur: "+ this.acumulateur);
    console.log("Utilisateur:", this.utilisateur);
  }

  changerMusique(musique){
    this.musiqueCourante = this.sons.getObjet(musique);
    this.musiqueCourante.play();
    this.musiqueCourante.loop = true;
  }
}
