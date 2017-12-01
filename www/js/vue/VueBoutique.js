class VueBoutique extends Vue {
  constructor(ctrl) {
    super(ctrl, 'boutique');

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Boutique";

    const buttonRetourAtl = this.create('button');
    this.add(buttonRetourAtl);
    buttonRetourAtl.innerHTML = "Retour à l'Atelier";
    buttonRetourAtl.onclick = () => {
      this.delete();
      this.controleur.rafraichirVues();
    }

    const buttonMenuPrincip = this.create('button');
    this.add(buttonMenuPrincip);
    buttonMenuPrincip.innerHTML = "Menu principal";
    buttonMenuPrincip.onclick = () => {
      this.controleur.changerVueUnique(new VueMenuPrincipal(this.controleur));
  }
 }
}
