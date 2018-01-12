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

    this.addElementReponse();
  }

  getQuestionEquation(){return this.question;}

  addElementReponse() {
    let reponses = this.question.getReponse().getReponses();
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
      if(this.elementsReponse[i].verifierCoord(x,y)){
        let reponse = this.elementsReponse[i];
        if(this.question.repondre(reponse.getValeur())){
          reussi = true ;
        }
      }
      i ++;
    }

    this.getControleur().changerVue(new VueReponse(this.getControleur(), this.controleur.vueRendu, () => {


      if(reussi){
        this.controleur.partieRunner.getPersonnage().initialisation();

        if(--this.nbQuestion == 0) {
          this.controleur.switchMode("runner");
        } else {
          for (let i of this.getElementsReponse()) {
            i.detruire();
          }
          this.setNewQuestion();
          this.controleur.vueRendu.refreshQuestion();
        }
      }else{
        this.controleur.pause();
        this.controleur.getUtilisateur().setHighScore(this.controleur.partieRunner.getScore());
        this.controleur.getUtilisateur().setArgent(this.controleur.getUtilisateur().getArgent() + this.controleur.partieRunner.getPieceRecup());

        this.controleur.sauvegarderDonnees();
        this.controleur.changerVueUnique(new VuePerdu(this.controleur));
      }



    }, false, reussi && this.nbQuestion != 0));


  }
}
