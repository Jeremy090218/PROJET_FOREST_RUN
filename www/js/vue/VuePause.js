class VuePause extends Vue {
  constructor(ctrl) {
    super(ctrl, 'pause');

    let titre = this.add('h1');
    titre.innerHTML = "Pause";

    let button = this.add('button');
    button.innerHTML = "Reprendre";
    button.onclick = () => {
      this.delete();
    }
  }
}
