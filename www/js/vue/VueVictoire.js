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
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur),this);
    }
  }
  console.log("Petite Pomme");
}
