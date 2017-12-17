class VueConfirmationReinit extends Vue {
  constructor(ctrl) {
    super(ctrl, 'VueConfirmationReinit');

    const confirmation = this.create('h5');
    this.add(confirmation);
    confirmation.innerHTML = "Veux-tu vraiment réinitialiser les données de l'application ? Toute progression sera perdue.";

    const buttonAccepter = this.create('button');
    this.add(buttonAccepter);
    buttonAccepter.innerHTML = "Oui";
    buttonAccepter.onclick = () => {
      this.controleur.changerVue(new VueOptions(this.controleur), this);
    }

    const buttonRetour = this.create('button');
    this.add(buttonRetour);
    buttonRetour.innerHTML = "Non";
    buttonRetour.onclick = () => {
      this.controleur.changerVue(new VueOptions(this.controleur), this);
    }
}
}
