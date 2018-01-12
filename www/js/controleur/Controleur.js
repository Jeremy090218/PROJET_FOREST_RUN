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

    /*this.missionPiece = new MissionPiece(20);
    this.missionScore = new MissionScore(1000);
    this.missionQuestion =  new MissionQuestion(10);*/

    this.vues = new Array();
    this.vueRendu = null;

    this.textures = new Bank("img", "textures/", ["default.png", "fondtest.png", "Ground_0_1.png","caillou.png", "Bannier.png",
                                                  "Obstacle_1.png", "Bonsai_droit.png", "Bonsai_gauche.png",
                                                  "Tree_0_1.png","Bambou.png","Palmier_droit.png","Palmier_gauche.png",
                                                  "Nuage_0_1.png", "cible.png","Coco_0.png", "Boss_0.png", "Boss_1.png",
                                                  "Rock_1.png","Rock_2.png","Tree_1_1.png","Tree_1_2.png",
                                                  "Coin_1.png", "IconCoeur.png", "potionBleu.png","potionRouge.png", "Character_0_annimation.png", "Snowman_0.png",
                                                  "Character_0_vue_4.png","Character_0_vue_0.png", "Character_1_vue_0.png", "Character_2_vue_0.png","Ecran_accueil.png",
                                                  "Character_1_annimation.png",
                                                  "Character_2_annimation.png", "Ecran_atelier.png",
                                                  "Ground_0_1_3D.png"]);

    this.sons = new Bank("audio", "sons/", ["Chat.mp3", "crash.mp3", "Lapin.mp3", "Chevre.mp3", "piece.mp3",
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
    if(vueActuelle && vueActuelle.delete) vueActuelle.delete();
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
        this.partieShooter = new PartieShoot(this, this.utilisateur.getPersonnageShooter());
        this.partieRendu = this.partieShooter;
        this.changerVueUnique(new VueShooter(this));
        break;
      case "nouvellePartie":
        console.log("nouvellePartie");
        this.partieRunner = new PartieRun(this, this.utilisateur.getPersonnageRunner());
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
      this.temps = 0;
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
    const dafaultData = `{
      "persoCourant": {"nom": "Chat", "textureFixe": "Character_0_vue_0.png", "son":"Chat.mp3", "textureAnim": "Character_0_annimation.png"},
      "achete": [{"nom": "Rien", "achat": true, "equipe": true, "prix": 0}],
      "equipe": {"nom": "Rien", "achat": true, "equipe": true, "prix": 0},
      "argent": 0,
      "highScore": 0,

      "missions": [{"eCourant": 20, "eDepart": 20},
                   {"eCourant": 1000},
                   {"eCourant": 10, "eDepart": 10}]
    }`;

    let data = localStorage.getItem('forestSave');

    if(!data || data == "[object Object]") data = dafaultData;

    data = JSON.parse(data);

    for (let i = 0; i < data.achete.length; ++i) {
      const o = data.achete[i];
      data.achete[i] = new Item(o.nom, o.achete, o.equipe, o.prix);
    }

    const o = data.equipe;
    data.equipe = new Item(o.nom, o.achete, o.equipe, o.prix);

    this.missionPiece = new MissionPiece(data.missions[0].eDepart, data.missions[0].eCourant);
    this.missionScore = new MissionScore(data.missions[1].eCourant);
    this.missionQuestion =  new MissionQuestion(data.missions[2].eDepart, data.missions[2].eCourant);

    ctrl.utilisateur.setFromSauvegarde(data);

    cb();
  }

  sauvegarderDonnees(){
      /*const dataUtilisateur = {
        persoCourant: {nom: "Chat", textureFixe: "Character_0_vue_0.png", son:"Chat.mp3", textureAnim: "Character_0_annimation.png"},
        achete: [{nom: "Esquive +", achat: true, equipe: true, prix: 20}, {nom: "Vie +", achat: true, equipe: false, prix: 100}],
        equipe: {nom: "Rien", achat: true, equipe: true, pric: 20},
        argent: 1000,
        highScore: 150
      }*/

      const u = this.getUtilisateur();

      let listAchete = new Array();

      for (let i of u.getItems()) {
        listAchete.push({nom: i.getNom(), achat: i.getAchat(), equipe: i.getEquiper(), prix: i.getPrix()});
      }

      const i = u.getItemEquipe();

      const dataUtilisateur = {
        persoCourant: u.getSkins(),
        achete: listAchete,
        equipe: {nom: i.getNom(), achat: i.getAchat(), equipe: i.getEquiper(), prix: i.getPrix()},
        argent: u.getArgent(),
        highScore: u.getHighScore(),

        missions: [{eCourant: this.missionPiece.getNbPiece(), eDepart: this.missionPiece.getNbPieceD()},
                   {eCourant: this.missionScore.getScore()},
                   {eCourant: this.missionQuestion.getNbQuestion(), eDepart: this.missionQuestion.getNbQ()}]
      }

      localStorage.setItem('forestSave', JSON.stringify(dataUtilisateur));
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
    if(!this.musiqueCourante) this.musiqueCourante = {nom: "wow", pause: () => {}};

    if(musique != this.musiqueCourante.nom){
      this.musiqueCourante.pause();
      this.musiqueCourante = this.sons.getObjet(musique);
      this.musiqueCourante.currentTime = 0;
      this.musiqueCourante.play();
      this.musiqueCourante.loop = true;
    }
  }

  updateMission(piece,score,nbQuestion){

    console.log(piece,score,nbQuestion);
    this.missionPiece.enleverPiece(piece);
    this.missionQuestion.enleverQuestion(nbQuestion);

    if(this.missionScore.verifierMission(score)){
      this.getUtilisateur().setArgent(this.getUtilisateur().getArgent() + 100);
      this.missionScore = new MissionScore(this.missionScore.getScore() + 500);
    }
    if(this.missionPiece.verifierMission()){
      this.getUtilisateur().setArgent(this.getUtilisateur().getArgent() + 100);
      this.missionPiece = new MissionPiece(this.missionPiece.getNbPieceD() + 20,this.missionPiece.getNbPieceD() + 20);
    }
    if(this.missionQuestion.verifierMission()){
      this.getUtilisateur().setArgent(this.getUtilisateur().getArgent() + 100);
      this.missionQuestion = new MissionQuestion(this.missionQuestion.getNbQ() + 5,this.missionQuestion.getNbQ() + 5);
    }


  }

  couperSon(){
    this.musiqueCourante.volume = 0;
  }
}
