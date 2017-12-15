class Personnage extends Element {
  constructor(ctrl, velociteY = 0) {
    super(ctrl,null,180,620,0);
    this.velociteY = velociteY;
    this.vie = 3;
    this.items = [];
  }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////GETTERS ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  getVelocite(){return this.velociteY;}
  getVie(){return this.vie;}
  getItems(){return this.items;}


////////////////////////////////////////////////////////////////////////////////
//////////////////////////// SETTERS////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  setVelocite(i){this.velociteY = i;}
  setVie(i){this.vie = i;}
  setItems(i){this.items = i;}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

////// Gestion de la vie
  decrementerVie(){
    if (this.getVie()<1) {
      this.setVie(this.getVie() -1 );
    }
  }

  incrementerVie(){
    if (this.getVie()<3) {
      this.setVie(this.getVie() +1 );
    }
  }

  estMort(){
    return this.setVie(0);
  }

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  /////// Pour les actions
  //Action haut
  sauter(){
    this.setY(0);
    this.setVelocite(-140);
  }
  //Action Bas
  seBaisser(){
    this.setVelocite(71);
  }
  retomber(){
    this.setVelocite(Math.abs(this.getVelocite()));
  }
  //Action Gauche
  deplacementGauche(){
    this.setX(this.getX()-35);
  }
  //Action Droite
  deplacementDroite(){
    this.setX(this.getX()+35);
  }


  // test de la colision avec un element
  // return true si x,y,z sont en inferieur a 10 apres la soustraction
  //sinon return false
  estEnColision(element){
    if(10 > Math.abs(element.getZ()-this.getZ())){
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
    if(this.getVelocite() != 0){
      this.setY(this.getY() + this.getVelocite()/10); /// ajout en y la distance qu'il doit parcourir en 1 frame suivant sa velocite
      this.setVelocite(this.getVelocite()+2);  // modification de la velocite suivant le mouvement
      if(this.getY()>620){                    // si le Y est plus grand que le sol alors le mouvement de se baisser doit continuer
        this.setY(635);
      }
      if(this.getVelocite()>140){             // Si la velocite > 140 alors les mouvements doivent s'arreter
        this.setY(620);
      }
      if(this.setY() == 620){                 // si le Y == 620 alors le personnage est arriver au sol donc velocite = 0
        this.setVelocite(0);
      }
    }
  }
}
