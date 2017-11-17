class VueBoutique extends Vue {
  constructor(ctrl) {
    super(ctrl, 'boutique');

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Boutique";

    const buttonAtl = this.create('button');
    this.add(buttonAtl);
    buttonAtl.innerHTML = "Retour à l'Atelier";
    buttonAtl.onclick = () => {
      this.delete();
    }

    const buttonMenuPrincip = this.create('button');
    this.add(buttonMenuPrincip);
    buttonMenuPrincip.innerHTML = "Menu principal";
    buttonMenuPrincip.onclick = () => {
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur),this);
    }
  }
}
