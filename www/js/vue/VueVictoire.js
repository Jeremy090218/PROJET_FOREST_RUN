class VueVictoire extends Vue {
  constructor(ctrl) {
    super(ctrl, 'victoire');

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Victoire";

    const buttonMenuPrincip = this.create('button');
    this.add(buttonMenuPrincip);
    buttonMenuPrincip.innerHTML = "Menu principal";
    buttonMenuPrincip.onclick = () => {
      this.controleur.changerVueUnique(new VueMenuPrincipal(this.controleur));
    }
  }

}
