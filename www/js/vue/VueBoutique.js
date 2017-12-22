class VueBoutique extends Vue {
  constructor(ctrl) {
    super(ctrl, 'boutique');

    const buttonRetourAtl = this.create('button');
    buttonRetourAtl.id="btnHD";
    this.add(buttonRetourAtl);
    buttonRetourAtl.innerHTML = "Retour à l'Atelier";
    buttonRetourAtl.onclick = () => {
      this.controleur.changerVueUnique(new VueAtelier(this.controleur));
    }

    const buttonMenuPrincip = this.create('button');
    buttonMenuPrincip.id="btnHD";
    this.add(buttonMenuPrincip);
    buttonMenuPrincip.innerHTML = "Menu principal";
    buttonMenuPrincip.onclick = () => {
      this.controleur.changerVueUnique(new VueMenuPrincipal(this.controleur));
  }

      const titre = this.create('h1');
      this.add(titre);
      titre.innerHTML = "Boutique";
 }
}
