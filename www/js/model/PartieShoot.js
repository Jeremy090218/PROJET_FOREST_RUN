class PartieShoot extends Partie {
  constructor(ctrl, personnage) {
    super(ctrl, personnage);

    this.personnage.stop();
    this.personnage.setX(Partie.virtualW/2);
    this.personnage.setY(Partie.virtualH - 10);
    this.personnage.setZ(2);

    const o = new ElementReponseShooter(ctrl, "Coin_1.png", 5);
    this.elementsReponse = [o];
    this.fileRendu.push(o);

    this.setNewQuestion();
  }

  setNewQuestion(){
    this.question = new Question(this.controleur, 0);
  }

  update(){
    this.updateArray(this.getElementsReponse());
  }

  getElementsReponse(){
    return this.elementsReponse;
  }
}
