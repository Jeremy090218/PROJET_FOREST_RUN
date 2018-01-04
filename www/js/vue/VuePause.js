class VuePause extends Vue {
  constructor(ctrl, vueRunner) {
    super(ctrl, 'pause');

    this.vueRunner = vueRunner;

    const ctx = this.vueRunner.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "hue";
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 360, 640);
    ctx.restore();

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Pause";

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

    const buttonMenuPrincip = this.create('button');
    this.add(buttonMenuPrincip);
    buttonMenuPrincip.innerHTML = "Menu principal";
    buttonMenuPrincip.onclick = () => {
      this.controleur.changerVueUnique(new VueMenuPrincipal(this.controleur));
    }


  }


}
