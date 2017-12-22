class VueQuestion extends Vue {
  constructor(ctrl, vueRunner) {
    super(ctrl, 'question');

    this.vueRunner = vueRunner;

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Question :";

    const question = this.create('p');
    this.add(question);
    question.innerHTML = this.controleur.questionEquation;

    const buttonReprendre = this.create('button');
    this.add(buttonReprendre);
    buttonReprendre.innerHTML = "Reprendre";
    buttonReprendre.onclick = () => {
      this.vueRunner.pause = 0;
      this.delete();
      this.controleur.rafraichirVues();
      this.controleur.play();
      this.vueRunner.affBtn();
    }
  }
}
