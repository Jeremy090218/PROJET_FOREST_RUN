class VueReponse extends Vue {
  constructor(ctrl, vueRunner, cbSuite, affQuestionSuivante = true, reussi = true) {
    super(ctrl, 'reponse');

    this.vueRunner = vueRunner;

    this.controleur.pause();

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Réponse :";

    const intitule = this.create('p');
    this.add(intitule);
    intitule.innerHTML = this.controleur.partieRendu.getQuestionEquation().getIntitule();

    this.vueRunner.buttonPause.className= "btnInactif";

    const question = this.create('p');
    this.add(question);
    question.innerHTML = this.controleur.partieRendu.getQuestionEquation().getQuestion();

    const reponse = this.create('p');
    this.add(reponse);
    reponse.id = "rep";
    reponse.innerHTML = this.controleur.partieRendu.getQuestionEquation().getReponse().bonneRep;


    const buttonReprendre = this.create('button');
    this.add(buttonReprendre);
    buttonReprendre.innerHTML = affQuestionSuivante ? "Question suivante" : "Continuer";
    buttonReprendre.onclick = () => {
      //cbSuite();

      if (affQuestionSuivante) {
        this.controleur.partieRunner.setTemps(1200) ;
        this.controleur.partieRunner.setQuestionEquation(new Question(this.controleur));
        this.controleur.partieRunner.setNbReponse(0);
        this.controleur.changerVue(new VueQuestion(this.controleur, this.controleur.vueRendu), this);
      } else {
        this.controleur.play();
        /*if(reussi) {
          this.delete();
        }*/

        this.delete();
      }

      cbSuite();
    }
  }



  delete(){
    const self = document.getElementById('reponse');
    if(self) {
      this.divIHM.removeChild(self);
      this.alive = false;
    }
  }
}
