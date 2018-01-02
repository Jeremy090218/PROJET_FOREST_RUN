class Personnage extends Element {
  constructor(ctrl, velociteY = 0) {
    super(ctrl,"Character_0_annimation.png",180,620,2);
    this.velociteY = velociteY;
    this.velociteX = 0;
    this.vie = 3;
    this.items = [];
    this.mouvementY = false; /// a changer inserer getters et setter de mouvemet
    this.mouvementX = false;
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

  /////// Pour les actions
  //Action haut
  sauter(){
    this.setY(620);
    this.setVelocite(-70);
    this.mouvementY = true;
  }
  //Action Bas
  seBaisser(){
    this.setVelocite(71);
    this.mouvementY = true;
  }
  retomber(){
    this.setVelocite(Math.abs(this.getVelocite()));
    this.mouvementY = true;
  }
  //Action Gauche
  deplacementGauche(){
    if(this.velociteX == 0){
      this.velociteX = -30;
      this.mouvementX = true;
    }
  }
  //Action Droite
  deplacementDroite(){
    if(this.velociteX == 0){
      this.velociteX = 0;
      this.mouvementX = true;
    }
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
    if(this.mouvementY){
      this.setY(this.getY() + this.getVelocite()/7); /// ajout en y la distance qu'il doit parcourir en 1 frame suivant sa velocite
      this.setVelocite(this.getVelocite()+2);  // modification de la velocite suivant le mouvement
      if(this.getY()>620){                    // si le Y est plus grand que le sol alors le mouvement de se baisser doit continuer
        this.setY(635);
      }
      if(this.getVelocite()>140){             // Si la velocite > 140 alors les mouvements doivent s'arreter
        this.setY(620);
        this.mouvementY = false;
      }
      if(this.getY() == 620){                 // si le Y == 620 alors le personnage est arriver au sol donc velocite = 0
        this.setVelocite(0);
        this.mouvementY = false;
      }
    }

    if(this.mouvementX){
      this.setX(this.getX() + this.velociteX);
      this.velociteX = this.velociteX + 5;
      if(this.velociteX == 0 || this.velociteX == 35){

        this.mouvementX = false;
        this.velociteX = 0;
      }
    }

    if(this.mouvementY || ++this.frame >= 40) this.frame = 0;
  }
}
