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
    this.setVelocite(-35);
  }
  //Action Bas
  seBaisser(){
    this.setVelocite(70);
  }
  retomber(){
    this.setVelocite(35);
  }
  //Action Gauche
  deplacementGauche(){
    this.setX(this.getX()-10);
  }
  //Action Droite
  deplacementDroite(){
    this.setX(this.getX()+10);
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
    if(this.getY() != 620 || this.getVelocite() != 0){  // si le personnage possede une velocite different de 0 ou un y different a 0 alors
                                                        // il doit continuer son mouvement
      if(this.getY() > 620){                            /// si le personnage est baisser
        this.setVelocite(this.getVelocite() -1);
        if(this.getVelocite() != 0){
          this.setY(635);
        }else{
          this.setY(620);
        }
      }else if(this.getY() < 620){                    /// sinon le personnage est entrain de sauter
        this.setY(this.getVelocite()/7+this.getY());
        this.setVelocite(this.getVelocite() + 1  );
        if(this.getY() < 620){
          this.setY(620);
          this.setVelocite(0);
        }

      }
    }
    }
  }

}
