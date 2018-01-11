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

    const divU = this.create('div');
    this.add(divU);
    divU.id = "divU";

    const blabla = this.create('p');
    this.add(divU, blabla);
    blabla.innerHTML = "Bienvenu dans ForestRun, un monde où règne la paix depuis des millénaire. Un univers où cohabite différents animaux, prédateurs et proies vivent en parfaite harmonie.";

    const blabla2 = this.create('p');
    this.add(divU, blabla2);
    blabla2.innerHTML = "Mais voilà que l'équilibre est menacée, les arbres Centenaires qui maintenaient cet équilibre ont été contaminés par une force obscurs et certains animaux ont commencé à s'en prendre aux autres.";

    const blabla3 = this.create('p');
    this.add(divU, blabla3);
    blabla3.innerHTML = "Incarne un de ses animaux et rétablis l'ordre !";

  }
}
