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

    this.missionPiece = new MissionPiece(20);
    this.missionScore = new MissionScore(1000);
    this.missionQuestion =  new MissionQuestion(10);

    this.vues = new Array();
    this.vueRendu = null;

    this.textures = new Bank("img", "textures/", ["default.png", "fondtest.png", "Ground_0_1.png","caillou.png", "Bannier.png",
                                                  "Obstacle_1.png", "Bonsai_droit.png", "Bonsai_gauche.png",
                                                  "Tree_0_1.png","Bambou.png","Palmier_droit.png","Palmier_gauche.png",
                                                  "Nuage_0_1.png", "cible.png",
                                                  "Coin_1.png", "IconCoeur.png", "potionBleu.png","potionRouge.png", "Character_0_annimation.png",
                                                  "Character_0_vue_4.png","Character_0_vue_0.png", "Character_1_vue_0.png", "Character_2_vue_0.png","Ecran_accueil.png",
                                                  "Character_1_annimation.png",
                                                  "Character_2_annimation.png",
                                                  "Ground_0_1_3D.png"]);

    this.sons = new Bank("audio", "sons/", ["Chat.mp3", "crash.mp3", "Lapin.mp3", "Chèvre.mp3", "piece.mp3",
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
    // TODO: utiliser plugin cordova pour faire un read ou utiliser un XMLHttpRequest

    const dafaultData = {
      persoCourant: {nom: "Chat", textureFixe: "Character_0_vue_0.png", son:"Chat.mp3", textureAnim: "Character_0_annimation.png"},
      achete: [],
      equipe: {nom: "Rien", achat: true, equipe: true, pric: 20},
      argent: 0,
      highScore: 0
    }

    let ctrl = this;

    function onDeviceReady() {
      function readFromFile(fileName, cb) {
          var pathToFile = cordova.file.dataDirectory + fileName;
          window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
              fileEntry.file(function (file) {
                  var reader = new FileReader();

                  reader.onloadend = function (e) {
                      cb(JSON.parse(this.result));
                  };

                  reader.readAsText(file);
              }, cb(dafaultData));
          }, cb(dafaultData));
      }

      var fileData;
      readFromFile('forestRunSave.json', (data) => {
          //fileData = data;

          for (let i = 0; i < data.achete.length; ++i) {
            const o = data.achete[i];
            data.achete[i] = new Item(o.nom, o.achete, o.equipe, o.prix);
          }

          const o = data.equipe;
          data.equipe = new Item(o.nom, o.achete, o.equipe, o.prix);

          ctrl.utilisateur.setFromSauvegarde(data);

          cb();
      });
    }

    try {
      onDeviceReady();
    } catch (e) {
      let data = dafaultData;

      for (let i = 0; i < data.achete.length; ++i) {
        const o = data.achete[i];
        data.achete[i] = new Item(o.nom, o.achete, o.equipe, o.prix);
      }

      const o = data.equipe;
      data.equipe = new Item(o.nom, o.achete, o.equipe, o.prix);

      ctrl.utilisateur.setFromSauvegarde(data);

      cb();






      /*setTimeout(()=>{
        const v = ctrl.vues[0];
        const p = v.create('p');
        v.add(p);
        p.innerHTML = e;
      }, 1000);*/
    }

    /*const dataUtilisateur = {
      persoCourant: {nom: "Chat", textureFixe: "Character_0_vue_0.png", son:"Chat.mp3", textureAnim: "Character_0_annimation.png"},
      achete: [new Item("Esquive +",true,true,20), new Item("Vie +",true,false,100)],
      equipe: new Item("Rien",true,true,20),
      argent: 1000,
      highScore: 150
      //boutique: [new Item("Saut +",true,false,50),new Item("Esquive ++",true,false,100)],
      //argent: 100
    }*/

    /*this.utilisateur.setFromSauvegarde(dataUtilisateur);

    cb();*/
  }

  sauvegarderDonnees(){
    // TODO: utiliser plugin cordova pour faire un write
    function onDeviceReady() {
      function writeToFile(fileName, data) {
          data = JSON.stringify(data, null, '\t');
          window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
              directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
                  fileEntry.createWriter(function (fileWriter) {
                      fileWriter.onwriteend = function (e) {
                          // for real-world usage, you might consider passing a success callback
                          console.log('Write of file "' + fileName + '"" completed.');
                      };

                      fileWriter.onerror = function (e) {
                          // you could hook this up with our global error handler, or pass in an error callback
                          console.log('Write failed: ' + e.toString());
                      };

                      var blob = new Blob([data], { type: 'text/plain' });
                      fileWriter.write(blob);
                  }, () => {});
              }, () => {});
          }, () => {});
      }



      /*const dataUtilisateur = {
        persoCourant: {nom: "Chat", textureFixe: "Character_0_vue_0.png", textureAnim: "Character_0_annimation.png"},
        achete: [new Item("Esquive +",true,true,20), new Item("Vie +",true,false,100)],
        equipe: new Item("Rien",true,true,20),
        argent: 1000,
        highScore: 150
      }*/

      const dataUtilisateur = {
        persoCourant: {nom: "Chat", textureFixe: "Character_0_vue_0.png", textureAnim: "Character_0_annimation.png"},
        achete: [{nom: "Esquive +", achat: true, equipe: true, prix: 20}, {nom: "Vie +", achat: true, equipe: false, prix: 100}],
        equipe: {nom: "Rien", achat: true, equipe: true, pric: 20},
        argent: 1000,
        highScore: 150
      }



      try {
        writeToFile('forestRunSave.json', dataUtilisateur);
      } catch (e) {
        /*setTimeout(()=>{
          const v = ctrl.vues[0];
          const p = v.create('p');
          v.add(p);
          p.innerHTML = e;
        }, 1000);*/
      }

    }

    onDeviceReady();
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
    this.missionPiece.enleverPiece(piece);
    this.missionQuestion.enleverQuestion(nbQuestion);

    if(this.missionScore.verifierMission(score)){
      this.getUtilisateur().setArgent(this.getUtilisateur() + 100);
      this.missionScore = new MissionScore(this.missionScore.getScore() + 500);
    }
    if(this.missionPiece.verifierMission()){
      this.getUtilisateur().setArgent(this.getUtilisateur() + 100);
      this.missionPiece = new MissionPiece(this.missionPiece.getNbPieceD() + 20);
    }
    if(this.missionQuestion.verifierMission()){
      this.getUtilisateur().setArgent(this.getUtilisateur() + 100);
      this.missionQuestion = new MissionQuestion(this.missionQuestion.getNbQ() + 5);
    }


  }
}
