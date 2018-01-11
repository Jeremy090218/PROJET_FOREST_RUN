class PartieShoot extends Partie {
  constructor(ctrl, personnage) {
    super(ctrl, personnage);
    this.personnage.stop();
    this.personnage.setX(50);
    this.personnage.setY(Partie.virtualH - 10);
    this.personnage.setZ(2);

    this.nbQuestion = 3;

    this.setNewQuestion();
  }

  setNewQuestion(){
    this.elementsReponse = new Array();

    this.question = new Question(this.controleur, "shooter");
    console.log(this.question.getIntitule());
    console.log(this.question.getQuestion());
    /*for (let i = 0; i < 5; ++i) {
      this.addElementReponse(i == 0);
    }*/
    this.addElementReponse();
  }

  /*addElementReponse(correct = false){
    let reponse = parseInt(this.question.getReponse().reponse);

    if(!correct) reponse += Math.floor(Math.random()* 2 - 1);

    const o = new ElementReponseShooter(ctrl, "cible.png", reponse);
    this.elementsReponse.push(o);
    this.fileRendu.push(o);
  }*/

  addElementReponse() {
    let reponses = this.question.getReponse().getReponses();
    console.log("yo : " + reponses);
    for(let i = 0; i < 6; i++) {
      const o = new ElementReponseShooter(ctrl, "cible.png", reponses[i]);
      this.elementsReponse.push(o);
      this.fileRendu.push(o);
    }
  }

  update(){
    this.updateArray(this.getElementsReponse());
  }

  getElementsReponse(){
    return this.elementsReponse;
  }

  verifierQuestion(x,y){
    let reussi = false;
    let i = 0;
    while(i<this.elementsReponse.length && !reussi){
      if(this.elementsReponse[i].verifierCoord(x*this.controleur.vueRendu.ew,y*this.controleur.vueRendu.eh)){
        let reponse = this.elementsReponse[i];
        if(this.question.repondre(reponse.getValeur())){
          reussi = true ;
        }
      }
      i ++;
    }
    if(reussi){
      this.controleur.partieRunner.getPersonnage().initialisation();

      if(this.nbQuestion-- == 0) {
        this.controleur.switchMode("runner");
      } else {
        for (let i of this.getElementsReponse()) {
          i.detruire();
        }
        this.setNewQuestion();
      }
    }else{
      this.controleur.pause();
      this.controleur.getUtilisateur().setHighScore(this.controleur.partieRunner.getScore());
      this.controleur.getUtilisateur().setArgent(this.controleur.getUtilisateur().getArgent() + this.controleur.partieRunner.getPieceRecup());

      console.log(this.controleur.getUtilisateur().getArgent());
      this.controleur.sauvegarderDonnees();
      this.controleur.changerVueUnique(new VuePerdu(this.controleur));
    }
  }
}
