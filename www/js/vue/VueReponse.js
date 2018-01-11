class VueReponse extends Vue {
  constructor(ctrl, vueRunner) {
    super(ctrl, 'reponse');

    this.vueRunner = vueRunner;

    this.controleur.pause();

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Réponse :";

    const intitule = this.create('p');
    this.add(intitule);
    intitule.innerHTML = this.controleur.partieRunner.getQuestionEquation().getIntitule();

    this.vueRunner.buttonPause.className= "btnInactif";

    const question = this.create('p');
    this.add(question);
    question.innerHTML = this.controleur.partieRunner.questionEquation.getQuestion();

    const reponse = this.create('p');
    this.add(reponse);
<<<<<<< HEAD
      reponse.id = "rep";
    reponse.innerHTML = this.controleur.partieRunner.getNbReponse();
=======
    console.log(this.controleur.partieRunner.questionEquation.getReponse());
    reponse.innerHTML = this.controleur.partieRunner.questionEquation.getReponse().bonneRep;
>>>>>>> ed81bdffd1d61c5a0bc8b5278358df62af9778b6


    const buttonReprendre = this.create('button');
    this.add(buttonReprendre);
    buttonReprendre.innerHTML = "Question suivante";
    buttonReprendre.onclick = () => {
      this.controleur.partieRunner.setTemps(1200) ;
      this.controleur.partieRunner.setQuestionEquation(new Question(this.controleur));
      this.controleur.partieRunner.setNbReponse(0);
      this.controleur.changerVue(new VueQuestion(this.controleur, this.controleur.vueRendu), this);
    }
  }
}
