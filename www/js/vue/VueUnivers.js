class VueUnivers extends Vue {
  constructor(ctrl) {
    super(ctrl, 'VueUnivers');

    const buttonRetour = this.create('button');
    buttonRetour.id="btnHD";
    this.add(buttonRetour);
    buttonRetour.innerHTML = "Menu Principal";
    buttonRetour.onclick = () => {
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur), this);
    }

    const titre = this.create('h2');
    this.add(titre);
    titre.innerHTML = "Univers";

    const blabla = this.create('p');
    this.add(blabla);
    blabla.innerHTML = "bfhgirifh hg^rei hgig erihg igi hoâ fqcçg euipfrê gôuagû iger^rui^gruiê";

  }
}
