class PartieRun extends Partie {
  constructor(ctrl, personnage, questions, gravite = 1) {
    super(ctrl, personnage, questions);
    this.gravite = gravite;
    this.obstacles = [];
    this.ramassables = [];
    this.initElement();
  }
////////////////////////////////////////////////////////////////////////////////
///////////////////////// GETTERS //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  getGravite(){return this.gravite;}
  getObstacles(){return this.obstacles;}
  getObstaclesIn(i){return this.obstacle[i]}  /// recupération par son indice
  getRamassables(){return this.ramassables;}
  getRamassablesIn(i){return this.ramassables[i];}

////////////////////////////////////////////////////////////////////////////////
///////////////////////// SETTERS //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  setGravite(i){this.gravite = i;}
  setObstacles(i){this.obstacles = i;}
  setRamassables(i){this.ramassables = i;}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                              //// Pour l'initialisation de la partie

  initElement(){
    //// Initialise tout les éléments de la Partie Run au lancement
  }


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                              ////// Pour la mise a jour de tout element de la partie

  update(){
                        ////// Mise a jour de tout les elements
    this.updateDecor();
    this.updatePersonnage();
    this.updateObstacles();
    this.updateObjets();
  }

  updatePersonnage(){
    this.getPersonnage().update();
  }

  updateObstacles(){
    for (let obstacle in this.getObstacles()) {
      obstacle.update();
    }
  }

  updateObjets(){
    for (var ramassable in this.getRamassables()) {
      ramassable.update();
    }
  }

  updateDecor(){

  }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                                      ////// Pour les actions du personnage

  actionHaut(){
                          // Si le personnage est déjà en saut ne pas resauter
    if(this.getPersonnage().getY() <= 0 ){
      this.getPersonnage().sauter(this.getGravite());
    }
  }

  actionBas(){
    if(this.getPersonnage().getY() == 0){
                                // Si le pesonnage court normalement, il doit se baisser
      this.getPersonnage().seBaisser();
    }else if(this.getPersonnage().getY() > 0){
                                // Si le personnage est en vole alors il doit retomber
      this.getPersonnage().retomber();
    }
    // sinon ne rien faire
  }
  actionGauche(){
    ///   -10 +++++++ 0 +++++++++ 10  ///
    if(this.getPersonnge().getX() != -10){
                              // Si le personnage n'est pas déja sur la colonne de gauche
      this.getPersonnage().deplacementGauche();
    }

  }
  actionDroite(){
    if(this.getPersonnge().getX() != 10){
                              // Si le personnage n'est pas déja sur la colonne de droite
      this.getPersonnage().deplacementDroite();
    }
  }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                                            //// Gestion des Ramassable

  creationRamassables(){

  }
  addRamassables(ramassable){
    this.getRamassables().push(ramasable);
  }
  supprimerRamassables(ramassable){
    for (var i = 0; i < this.getRamassables().length; i++) {
      if (ramassable.getId() == this.getRamassables()[i].getId()) {
        this.getRamassables().splice(i,1);
      }
    }
  }
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                                            ////// Gestion des Obstacles
  creationObstacle(){

  }
  addObstacle(obstacle){
    this.getRamassables().push(obstacle);
  }
  supprimerObstacle(obstacle){
    for (var i = 0; i < this.getObstacles().length; i++) {
      if (obstacle.getId() == this.getObstacles()[i].getId()) {
        this.getObstacle().splice(i,1);
      }
    }
  }



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                                  ////Pour les colisions entre les elements

  testColision(elem){
    //////// test la colision entre tout l'element choisi et le personnage
    /////// return vrai si l'element possede les meme x,y,z du personnage
  }


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                                /////// Je sais pas a quoi sa sert
  supprimerElementPartie(){

  }



















}
