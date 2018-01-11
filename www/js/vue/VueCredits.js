class VueCredits extends Vue {
  constructor(ctrl) {
    super(ctrl, 'VueCredits');

    const buttonRetour = this.create('button');
    buttonRetour.id="btnHD";
    this.add(buttonRetour);
    buttonRetour.innerHTML = "Retour";
    buttonRetour.onclick = () => {
      this.controleur.changerVue(new VueOptions(this.controleur), this);
    }

    const credits = this.create('p');
    this.add(credits);
    credits.innerHTML = "Jérémy ANDRE </br> Mathilde BENETTI </br> Romain GRUSON </br> Romain LASCAUX </br> Thomas LAURENT </br> Clément MARTIN </br> Jérémy MARTIN";

}
}
