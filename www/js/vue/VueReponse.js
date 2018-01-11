class VueReponse extends Vue {
  constructor(ctrl, vueRunner) {
    super(ctrl, 'reponse');

    this.vueRunner = vueRunner;

    this.controleur.pause();

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Reponse :";

    const intitule = this.create('p');
    this.add(intitule);
    intitule.innerHTML = this.controleur.partieRunner.getQuestionEquation().getIntitule();

    this.vueRunner.buttonPause.className= "btnInactif";

    const question = this.create('p');
    this.add(question);
    question.innerHTML = this.controleur.partieRunner.questionEquation.getQuestion();

    const reponse = this.create('p');
    this.add(reponse);
    reponse.innerHTML = this.controleur.partieRunner.getNbReponse();


    const buttonReprendre = this.create('button');
    this.add(buttonReprendre);
    buttonReprendre.innerHTML = "Question suivante";
    buttonReprendre.onclick = () => {
      this.controleur.changerVue(new VueQuestion(this.controleur, this.controleur.vueRendu), this);
    }
  }
}
