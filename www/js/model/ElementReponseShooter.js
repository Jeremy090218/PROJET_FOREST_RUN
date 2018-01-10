class ElementReponseShooter extends Element {
  constructor(ctrl, texture, valeur, vitesse = 5) {
    super(ctrl, "null");
    this.valeur = valeur;
    this.setX(Math.random() * Partie.virtualW);
    this.setY(Math.random() * Partie.virtualH);
    this.v = {x: (Math.random()-0.5)*vitesse, y: (Math.random()-0.5)*vitesse};

    this.setTexture(texture);
  }

  setTexture(t){
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");

    const img = this.controleur.textures.getObjet(t);

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.font = "30px FredokaOne-Regular";
    ctx.fillStyle = "#a0a";
    ctx.textAlign = "center";

    ctx.drawImage(img, 0, 0);
    ctx.fillText(this.getValeur(), canvas.width/2, canvas.height/2 +10);

    const image = new Image();
    image.src = canvas.toDataURL();

    this.texture = image;
  }

  getValeur(){
    return this.valeur;
  }

  update(){
    super.update();
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
