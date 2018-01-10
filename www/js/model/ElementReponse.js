class ElementReponseShooter extends Element {
  constructor(ctrl, texture, valeur, vitesse = 5) {
    super(ctrl, texture);
    this.valeur = valeur;
    this.setX(Math.random() * Partie.virtualW);
    this.setY(Math.random() * Partie.virtualH);
    this.v = {x: (Math.random()-0.5)*vitesse, y: (Math.random()-0.5)*vitesse};
  }

  getValeur(){
    return this.valeur;
  }

  update(){
    this.setX(this.getX() + this.v.x);
    this.setY(this.getY() + this.v.y);

    if(this.getX() <= 30){
      this.setX(30);
      this.v.x *= -1;
    } else if(this.getX() >= Partie.virtualW - 30){
      this.setX(Partie.virtualW - 30);
      this.v.x *= -1;
    }

    if(this.getY() <= 60){
      this.setY(60);
      this.v.y *= -1;
    } else if(this.getY() >= Partie.virtualH - 100){
      this.setY(Partie.virtualH - 100);
      this.v.y *= -1;
    }
  }
}
