class VueStats extends Vue {
  constructor(ctrl) {
    super(ctrl, 'VueStats');

    const buttonRetour = this.create('button');
    this.add(buttonRetour);
    buttonRetour.innerHTML = "Retour";
    buttonRetour.onclick = () => {
      this.controleur.changerVue(new VueOptions(this.controleur), this);
    }
}
}
