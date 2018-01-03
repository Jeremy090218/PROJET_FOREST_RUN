class PartieRun extends Partie {
  constructor(ctrl, personnage, gravite = 1) {
    super(ctrl, personnage);

    this.setGravite(gravite);
    this.setScore(0) ;
    this.setPieceRecup(0);
    this.setNbReponse(0);
    this.setQuestionEquation(0);
    this.setTrajPossible([
      [{x: 180, y: 300, z: 0.1}, {x: 180, y: 810, z: 3}],
      [{x: 175, y: 300, z: 0.1}, {x: 20, y: 800, z: 3}],
      [{x: 185, y: 300, z: 0.1}, {x: 340, y: 800, z: 3}]
    ]);
    this.setLastTraj(1);
    this.setTemps(1200);
    this.setElementsDecors(new Array());    // Pour les decors
    this.setElementsPartie(new Array());    // Pour les elements en interraction avec le personnage
    this.setFileRendu(new Array());         // Pour l'update
  }
////////////////////////////////////////////////////////////////////////////////
///////////////////////// GETTERS //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  getGravite(){return this.gravite;}
  getScore(){return this.score;}
  getPieceRecup(){return this.pieceRecup;}
  getNbReponse(){return this.nbReponse;}
  getQuestionEquation(){return this.questionEquation;}
  getTrajPossible(){return this.trajsPossible;}
  getLastTraj(){return this.lastTraj;}
  getTemps(){return this.temps;}
  getElementsDecors(){return this.elementsDecors;}
  getElementsPartie(){return this.elementsPartie;}
  getFileRendu(){return this.fileRendu}

  getTrajectoire(){
    let i = Math.round(Math.random()*2);
    while(i == this.lastTraj){
      i = Math.round(Math.random()*2);
    }
    this.lastTraj = i;
    return this.trajsPossible[this.lastTraj];
  }


////////////////////////////////////////////////////////////////////////////////
///////////////////////// SETTERS //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
setGravite(i){this.gravite = i;}
setScore(i){this.score= i;}
setPieceRecup(i){this.pieceRecup= i;}
setNbReponse(i){this.nbReponse= i;}
setQuestionEquation(i){this.questionEquation=i;}
setTrajPossible(i){this.trajsPossible=i;}
setLastTraj(i){this.lastTraj=i;}
setTemps(i){this.temps=i;}
setElementsDecors(i){this.elementsDecors=i;}
setElementsPartie(i){this.elementsPartie=i;}
setFileRendu(i){this.fileRendu=i;}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                              //// Pour l'incrémenation
  incrementerScore(){this.score++;}
  incrementerPieceRecup(){this.pieceRecup++;}
  incrementerNbReponse(){this.nbReponse++;}
  incrementerTemps(){this.temps++;}

                              ///// Pour decrémenter
  decrementerScore(){this.score--;}
  decrementerPieceRecup(){this.pieceRecup--;}
  decrementerNbReponse(){this.nbReponse--;}
  decrementerTemps(){this.temps--;}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                              ////// Pour la mise a jour de tout element de la partie

  update(){
                        ////// Mise a jour de tout les elements
    this.updatePersonnage();
    this.updateArray(this.getElementsDecors());
    this.updateArray(this.getElementsPartie());


    for (var i = 0; i < this.getElementsPartie().length; i++) {
                          // Parcours de la liste des elements partie
      if(this.getPersonnage().estEnColision(this.getElementsPartie()[i])){      // Test de la colision avec les objets

        if(this.getElementsPartie()[i] instanceof ElementReponse ){             // Test du type : Si ElementReponse
                                                                                // alors ajouter 1 a la reponse
          this.incrementerNbReponse();

        }else if(this.getElementsPartie()[i] instanceof ObjetRamassable ){      // Test du type : sinonSi ObjetRamassable
                                                                                // alors augmenter le score et ajouter un Piece
          this.setScore(this.getScore() + 20);
          this.incrementerPieceRecup();
        }else{                                                                  // Test du type :  Sinon Obstacle
          this.getPersonnage().decrementerVie();                                // alors  decrementer Vie
        }
        this.getElementsPartie()[i].detruire();   // qu'importe le type la colision a eu lieu l'element doit etre detruie
      }
    }
    /////////////////////Gestion des ajouts des elements Partie

    if(this.getTemps()%71 == 0){   // Tout les 45 Tics: ajouter Obstacle
      this.addObstacle();
    }
    if(this.getTemps()%45 == 0){   // Tout les 23 Tics: ajouter Ramassable et ElementReponse
      if(Math.random() > 0.7){
         this.addRamassables();
      }
      this.incrementerScore();
    }
    if(this.getTemps()%42 == 0){
      if(Math.random() > 0.7){
        this.addElementReponse();
      }
    }

    //////////////////////// Gestion des elements Decors
    if(this.getTemps()%20 == 0){ // Tout les 10 Tics: ajouter un arbre et un nuage
      this.addArbres();
      this.addCiel();
    }

    if(this.getTemps() == 0){
      this.setTemps(1200) ;
      this.setQuestionEquation(new Question(this.getControleur(),0));
      this.setNbReponse(0);
      this.getControleur().changerVue(new VueQuestion(this.getControleur(), this.controleur.vueRendu));
    }else if(this.getTemps() == 1){
      if(this.getQuestionEquation()){
        if(!this.testQuestion()){
          this.getPersonnage().decrementerVie();
        }
      }
    }
    this.decrementerTemps();

    if(this.getPersonnage().estMort()){
      this.controleur.pause();
      this.controleur.changerVueUnique(new VuePerdu(this.controleur));
    }
  }


  testQuestion(){
    return this.questionEquation.repondre(this.nbReponse);
  }

  updatePersonnage(){
    this.getPersonnage().update();
  }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                                      ////// Pour les actions du personnage

  actionHaut(){
                          // Si le personnage est déjà en saut ne pas resauter
    if(this.controleur.isRunning()){
      if(this.getPersonnage().getY() >= 620 ){
        this.getPersonnage().sauter();
      }
    }
  }

  actionBas(){
    if (this.controleur.isRunning()) {
      if(this.getPersonnage().getY() == 620){
                                  // Si le pesonnage court normalement, il doit se baisser
        this.getPersonnage().seBaisser();
      }else if(this.getPersonnage().getY() < 620){
                                  // Si le personnage est en vole alors il doit retomber
        this.getPersonnage().retomber();
      }
    }
  }
  actionGauche(){
    ///   -10 +++++++ 0 +++++++++ 10  ///
    if(this.controleur.isRunning()){
      if(this.getPersonnage().getX() >= 180){
                                // Si le personnage n'est pas déja sur la colonne de gauche
        this.getPersonnage().deplacementGauche();
      }
    }

  }
  actionDroite(){
    if(this.controleur.isRunning()){
      if(this.getPersonnage().getX() <= 180){
                                // Si le personnage n'est pas déja sur la colonne de droite
        this.getPersonnage().deplacementDroite();
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                                            //// Gestion des Ramassable

  addRamassables(){
    const o = new ObjetRamassable(this.controleur,"Coin_1.png",this.getTrajectoire(),1);
    this.getElementsPartie().unshift(o);
    this.getFileRendu().unshift(o);

  }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                                            /////// Gestion des elementReponses
  addElementReponse(){
    const o = new ElementReponse(this.controleur,"potion.png",this.getTrajectoire(),1);
    this.getElementsPartie().unshift(o);
    this.getFileRendu().unshift(o);
  }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                                            /////// Gestion des Decors

  addArbres(){
    const o1 = new ElementDecor(this.controleur,Math.floor(Math.random()*120)+50,1);
    const o2 = new ElementDecor(this.controleur,Math.floor(Math.random()*120)+200,1);
    this.getElementsDecors().unshift(o1);
    this.getElementsDecors().unshift(o2);
    this.getFileRendu().unshift(o1);
    this.getFileRendu().unshift(o2);
  }

  addCiel(){
    let o1 = 0;
    if(Math.random()>0.5){
      o1 = new ElementCiel(this.controleur,Math.floor(Math.random()*120)+50,1);
    }else{
      o1 = new ElementCiel(this.controleur,Math.floor(Math.random()*120)+200,1);
    }
    this.getElementsDecors().unshift(o1);
    this.getFileRendu().unshift(o1);
  }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                                            ////// Gestion des Obstacles

  addObstacle(){
    const o = new Obstacle(this.controleur, "Obstacle_1.png", this.getTrajectoire(), 1);
    this.getElementsPartie().unshift(o);
    this.getFileRendu().unshift(o);
  }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                                  ////Pour les colisions entre les elements

  testColision(elem){
    //////// test la colision entre tout l'element choisi et le personnage
    /////// return vrai si l'element possede les meme x,y,z du personnage
    return this.getPersonnge().estEnColision(elem);
  }
}
