class PartieShoot extends Partie {
  constructor(ctrl, personnage) {
    super(ctrl, personnage);

    this.personnage.stop();
    this.personnage.setX(Partie.virtualW/2);
    this.personnage.setY(Partie.virtualH - 10);
    this.personnage.setZ(2);

    const o = new ElementReponse(ctrl, "Coin_1.png", 5);
    this.elementsReponse = [o];
    this.fileRendu.push(o);
  }

  update(){
    this.updateArray(this.getElementsReponse());
  }

  getElementsReponse(){
    return this.elementsReponse;
  }
}
