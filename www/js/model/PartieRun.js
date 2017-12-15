class PartieRun extends Partie {
  constructor(ctrl, personnage, gravite = 1) {
    super(ctrl, personnage);
    this.gravite = gravite;
    this.obstacles = new Array();
    this.trajsPossible = [  //// faire getters
      [{x: 180, y: 300, z: 0.1}, {x: 180, y: 640, z: 2}],
      [{x: 175, y: 300, z: 0.1}, {x: 75, y: 640, z: 2}],
      [{x: 185, y: 300, z: 0.1}, {x: 285, y: 640, z: 2}]
    ];
    this.lastTraj = 1;
    this.ramassables = new Array();
    this.initElement();
  }
////////////////////////////////////////////////////////////////////////////////
///////////////////////// GETTERS //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  getGravite(){return this.gravite;}
  getObstacles(){return this.obstacles;}
  getObstaclesIn(i){return this.obstacles[i]}  /// recupération par son indice
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
    //this.updateDecor();
    this.updateArray(this.getElementsDecors());
    this.updatePersonnage();
    //this.updateObstacles();
    //this.updateObjets();
    this.updateArray(this.getObstacles());
    this.updateArray(this.getRamassables());

    for (var i = 0; i < this.getObstacles().length; i++) {
      if(this.getPersonnage().estEnColision(this.getObstacles()[i])){
        this.getPersonnage().decrementerVie();
        this.getObstaclesIn(i).detruire();
        if(this.getPersonnage().estMort()){
          this.controleur.pause();
          this.controleur.changerVueUnique(new VuePerdu(this.controleur));
        }
      }
    }

    for (var i = 0; i < this.getRamassables().length; i++) {
      if(this.getPersonnage().estEnColision(this.getRamassables()[i])){
        this.getRamassablesIn(i).detruire();
        console.log("1 piece en plus");
      }
    }

    if(!this.cd){
      this.addObstacle();
      this.cd = 45;
    } else{
      --this.cd ;
    }
    if(this.cd == 23){
      if(Math.random() > 0.5) this.addRamassables();
    }
  }

  updatePersonnage(){
    this.getPersonnage().update();
  }

  /*updateObstacles(){

    const o = this.getObstacles();
    for (let i = 0; i < o.length; ++i) {
      if(!o[i].estDetruit()) o[i].update();
      else o.splice(i--, 1);
    }
  }

  updateObjets(){
    for (let ramassable of this.getRamassables()) {
      ramassable.update();
    }
  }

  updateDecor(){

  }*/

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                                      ////// Pour les actions du personnage

  actionHaut(){
                          // Si le personnage est déjà en saut ne pas resauter
    if(this.controleur.isRunning()){
      if(this.getPersonnage().getY() >= 620 ){
        this.getPersonnage().sauter();
      }
    } else {
      console.log("annulée");
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
      // sinon ne rien faire else {
    } else {
      console.log("annulée");
    }
  }
  actionGauche(){
    ///   -10 +++++++ 0 +++++++++ 10  ///
    if(this.controleur.isRunning()){
      if(this.getPersonnage().getX() >= 180){
                                // Si le personnage n'est pas déja sur la colonne de gauche
        this.getPersonnage().deplacementGauche();
      }
    } else {
      console.log("annulée");
    }

  }
  actionDroite(){
    if(this.controleur.isRunning()){
      if(this.getPersonnage().getX() <= 180){
                                // Si le personnage n'est pas déja sur la colonne de droite
        this.getPersonnage().deplacementDroite();
      }
    } else {
      console.log("annulée");
    }
  }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                                            //// Gestion des Ramassable

  creationRamassables(){

  }

  addRamassables(){
    this.getRamassables().unshift(new ObjetRamassable(this.controleur,"Coin_1.png",this.getTrajectoire(),1));
  }

  supprimerRamassables(ramassable){
    for (let i = 0; i < this.getRamassables().length; ++i) {
      if (ramassable.getId() == this.getRamassables()[i].getId()) {
        this.getRamassables().splice(i,1);
      }
    }
  }
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                                            ////// Gestion des Obstacles

  addObstacle(){
    this.getObstacles().unshift(new Obstacle(this.controleur, "Obstacle_1.png", this.getTrajectoire(), 1));
  }

  supprimerObstacle(obstacle){
    for (var i = 0; i < this.getObstacles().length; i++) {
      if (obstacle.getId() == this.getObstacles()[i].getId()) {
        this.getObstacle().splice(i,1);
      }
    }
  }

  getTrajectoire(){
    let i = Math.round(Math.random()*2);
    while(i == this.lastTraj){
      i = Math.round(Math.random()*2);
    }
    this.lastTraj = i;
    return this.trajsPossible[this.lastTraj];
  }



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                                  ////Pour les colisions entre les elements

  testColision(elem){
    //////// test la colision entre tout l'element choisi et le personnage
    /////// return vrai si l'element possede les meme x,y,z du personnage
    return this.getPersonnge().estEnColision(elem);
  }


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
                                /////// Je sais pas a quoi sa sert
  supprimerElementPartie(){

  }



















}
