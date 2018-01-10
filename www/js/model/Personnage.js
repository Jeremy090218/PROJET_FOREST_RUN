class Personnage extends Element {
  constructor(ctrl, texture = "null", item = null) {
    super(ctrl, texture, 180, 620, 2);
    this.setItems(item);
    this.setMouvementY(false);
    this.setMouvementX(false);
    this.setMouvGauche(false);
    this.setMouvDroite(false);
    this.setDeplacementX(2);
    this.setDeplacementY(2);
    this.setTeleportation(false);
    this.initialisation();
    this.run();
  }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////GETTERS ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  getVelociteY(){return this.velociteY;}
  getVelociteX(){return this.velociteX;}
  getVie(){return this.vie;}
  getItems(){return this.item;}
  getMouvementY(){return this.mouvementY;}
  getMouvementX(){return this.mouvementX;}
  getMouvGauche(){return this.mouvGauche;}
  getMouvDroite(){return this.mouvDroite;}
  getTeleportation(){return this.teleportation;}
  getDeplacementX(){return this.deplacementX;}
  getDeplacementY(){return this.deplacementY;}


////////////////////////////////////////////////////////////////////////////////
//////////////////////////// SETTERS////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  setVelociteY(i){this.velociteY = i;}
  setVelociteX(i){this.velociteX = i;}
  setVie(i){this.vie = i;}
  setItems(i){this.item = i;}
  setMouvementY(i){this.mouvementY = i;}
  setMouvementX(i){this.mouvementX = i;}
  setMouvGauche(i){this.mouvGauche=i;}
  setMouvDroite(i){this.mouvDroite=i;}
  setTeleportation(i){this.teleportation = i;}
  setDeplacementX(i){this.deplacementX = i;}
  setDeplacementY(i){this.deplacementY = i}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
///////////// Initialiser Perso
////////////////////////////////////////////////////////////////////////////////

  initialisation(){
    this.setVie(3);
    this.setVelociteX(0);
    this.setVelociteY(0);
    if(this.getItems()){
      switch (this.getItems().getNom()) {
        case "Teleportation":
          this.setTeleportation(true);
        break;
        case "Vie +":
          this.setVie(4);
        break;
        case "Vie ++":
          this.setVie(5);
        break;
        case "Saut +":
          this.setDeplacementY(1.8);
        break;
        case "Saut ++":
          this.setDeplacementY(1.5);
        break;
        case "Esquive +":
          this.setDeplacementX(5);
        break;
        case "Esquive ++":
          this.setDeplacementX(10);
        break;
        default :
          console.log("aucun item choisi");
      }
    }
  }
////// Gestion de la vie
  decrementerVie(){
    if (this.getVie()>0) {
      this.setVie(this.getVie() -1 );
    }
  }

  incrementerVie(){
    if (this.getVie()<3) {
      this.setVie(this.getVie() +1 );
    }
  }

  estMort(){
    return this.getVie() == 0;
  }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
/////////// Gestion Equipement
////////////////////////////////////////////////////////////////////////////////

  changerItem(i){
    this.setItems(i);
    initialisation();
  }


  /////// Pour les actions
  //Action haut
  sauter(){
    this.setY(620);
    this.setVelociteY(-70);
    this.setMouvementY(true);

    this.controleur.partieRendu.addEmetteurParticules(5, 10, "Nuage_0_1.png", this.getX(), this.getY(), 0.5);
  }
  //Action Bas
  seBaisser(){
    this.setVelociteY(71);
    this.setMouvementY(true);
  }
  retomber(){
    this.setVelociteY(Math.abs(this.getVelociteY()));
    this.setMouvementY(true);
  }
  //Action Gauche
  deplacementGauche(){
    if(!this.getTeleportation()){
      if(this.getVelociteX() == 0){
        this.setVelociteX(0);
        this.setMouvGauche(true);
        this.setMouvementX(true);
      }
    }else{
      if(this.getX()>179){
        this.setX(this.getX()-105);
      }
    }
  }
  //Action Droite
  deplacementDroite(){
    if(!this.getTeleportation()){
      if(this.getVelociteX() == 0){
        this.setVelociteX(0);
        this.setMouvDroite(true);
        this.setMouvementX(true);
      }
    }else{
      if(this.getX()<181){
        this.setX(this.getX()+105);
      }
    }
  }

  run(){
    this.running = true;
  }

  stop(){
    this.running = false;
  }

  isRunning(){
    return this.running;
  }

  // test de la colision avec un element
  // return true si x,y,z sont en inferieur a 10 apres la soustraction
  //sinon return false
  estEnColision(element){
    if(1.8 < element.getZ()){
      if(10 > Math.abs(element.getY()-this.getY())){
        if(10 > Math.abs(element.getX()-this.getX())){
          return true;
        }
      }
    }
    return false;
  }



  update(){
                  /// Si la Velocite est different de 0 alors le personnage effuctue le mouvement demander
    if(this.getMouvementY()){
      this.setY(this.getY() + this.getVelociteY()/7); /// ajout en y la distance qu'il doit parcourir en 1 frame suivant sa velocite
      this.setVelociteY(this.getVelociteY()+this.getDeplacementY());  // modification de la velocite suivant le mouvement
      if(this.getY()>620){                    // si le Y est plus grand que le sol alors le mouvement de se baisser doit continuer
        this.setY(635);
      }
      if(this.getVelociteY()>140){             // Si la velocite > 140 alors les mouvements doivent s'arreter
        this.setY(620);
        this.setMouvementY(false);
      }
      if(this.getY() == 620){                 // si le Y == 620 alors le personnage est arriver au sol donc velocite = 0
        this.setVelociteY(0);
        this.setMouvementY(false);
      }
    }

    if(this.getMouvementX()){
      if(this.getMouvDroite()){
        if(this.getX()<180){                                        // Si le X du personnage <180 alors il est sur la voie de gauche
          if(this.getX() + this.getVelociteX()>=180){                        // si la velocite fait depasser 180 alors le X doit prendre 180
            this.setX(180);
            this.setVelociteX(0);
            this.setMouvementX(false);this.setMouvDroite(false);
          }else{
            this.setX(this.getX() + this.getVelociteX());                   // sinon on ajoute la velocite a son X
            this.setVelociteX(this.getVelociteX()+ this.getDeplacementX());
          }
        }else{                                                      // Sinon le personnage est sur l'axe du milieu
          if(this.getX() + this.getVelociteX()>285){
            this.setX(285);                                                 // si la velocite fait depasser 285 alors le X doit prendre 285
            this.setVelociteX(0);
            this.setMouvementX(false);this.setMouvDroite(false);
          }else{
            this.setX(this.getX() + this.getVelociteX());                   // sinon on ajoute la velocite a son X
            this.setVelociteX(this.getVelociteX()+ this.getDeplacementX());
          }
        }
      }else if(this.getMouvGauche()){
        if(this.getX()<=180){
          if(this.getX() + this.getVelociteX()<105){
            this.setX(75);
            this.setVelociteX(0);
            this.setMouvementX(false);this.setMouvGauche(false);
          }else{
            this.setX(this.getX() + this.getVelociteX());                   // sinon on ajoute la velocite a son X
            this.setVelociteX(this.getVelociteX() - this.getDeplacementX());
          }
        }else{
          if(this.getX() + this.getVelociteX()<=180){
            this.setX(180);
            this.setVelociteX(0);
            this.setMouvementX(false);this.setMouvGauche(false);
          }else{
            this.setX(this.getX() + this.getVelociteX());
            this.setVelociteX(this.getVelociteX() - this.getDeplacementX());
          }
        }
      }
/*
      this.setX(this.getX() + this.getVelociteX());
      this.setVelociteX(this.getVelociteX()+this.getDeplacementX());
      if(this.getVelociteX() == 0 || this.getVelociteX() == 35){
        this.setMouvementX(false);
        this.setVelociteX(0);
      }*/
    }

    if(this.mouvementY || ++this.frame >= (this.isRunning() ? 40 : 0)) this.frame = 0;
  }
}
