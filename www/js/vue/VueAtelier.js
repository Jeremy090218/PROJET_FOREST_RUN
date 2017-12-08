class VueAtelier extends Vue {
  constructor(ctrl) {
    super(ctrl, 'atelier');



    const buttonMenuPrincip = this.create('button');
    buttonMenuPrincip.id="divA";
    this.add(buttonMenuPrincip);
    buttonMenuPrincip.innerHTML = "Menu principal";
    buttonMenuPrincip.onclick = () => {
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur),this);
    }

    const buttonBtq = this.create('button');
    buttonBtq.id="divA";
    this.add(buttonBtq);
    buttonBtq.innerHTML = "Boutique";
    buttonBtq.onclick = () => {
      this.controleur.changerVue(new VueBoutique(this.controleur));
    }

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Atelier";

  }
}
