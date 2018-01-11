class PartieShoot extends Partie {
  constructor(ctrl, personnage) {
    super(ctrl, personnage);

    this.personnage.stop();
    this.personnage.setX(50);
    this.personnage.setY(Partie.virtualH - 10);
    this.personnage.setZ(2);

    this.elementsReponse = new Array();

    this.setNewQuestion();
  }

  setNewQuestion(){
    this.question = new Question(this.controleur, 0);
    console.log(this.question.getIntitule());
    console.log(this.question.getQuestion());
    for (let i = 0; i < 5; ++i) {
      this.addElementReponse(i == 0);
    }
  }

  addElementReponse(correct = false){
    let reponse = parseInt(this.question.getReponse().reponse);

    if(!correct) reponse += Math.floor(Math.random()* 2 - 1);

    const o = new ElementReponseShooter(ctrl, "cible.png", reponse);
    this.elementsReponse.push(o);
    this.fileRendu.push(o);
  }

  update(){
    this.updateArray(this.getElementsReponse());
  }

  getElementsReponse(){
    return this.elementsReponse;
  }
}
