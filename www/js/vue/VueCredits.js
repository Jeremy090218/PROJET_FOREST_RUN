class VueCredits extends Vue {
  constructor(ctrl) {
    super(ctrl, 'VueCredits');

    const buttonRetour = this.create('button');
    this.add(buttonRetour);
    buttonRetour.innerHTML = "Retour";
    buttonRetour.onclick = () => {
      this.controleur.changerVue(new VueOptions(this.controleur), this);
    }

    const credits = this.create('p');
    this.add(credits);
    credits.innerHTML = "Jérémy ANDRE \n Mathilde BENETTI \n Romain GRUSON \n Romain LASCAUX \n Thomas LAURENT \n Clément MARTIN \n Jérémy MARTIN";

}
}
