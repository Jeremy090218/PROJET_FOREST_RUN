class VueQuestion extends Vue {
  constructor(ctrl, vueRunner) {
    super(ctrl, 'question');

    this.vueRunner = vueRunner;

    this.controleur.pause();

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Question :";

    this.vueRunner.buttonPause.className= "btnInactif";

    const question = this.create('p');
    this.add(question);
    question.innerHTML = this.controleur.partieRunner.questionEquation.getQuestion();

    const buttonReprendre = this.create('button');
    this.add(buttonReprendre);
    buttonReprendre.innerHTML = "Reprendre";
    buttonReprendre.onclick = () => {
      this.vueRunner.pause = 0;
      this.controleur.play();
      this.delete();
      this.vueRunner.affBtn();
      this.controleur.rafraichirVues();

    }
  }
}
