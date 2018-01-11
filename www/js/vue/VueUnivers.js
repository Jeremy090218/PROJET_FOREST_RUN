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
    blabla.innerHTML = "Bienvenue dans FOREST RUN, un monde où une paix harmonieuse régnait depuis plusieurs Millénaires. Cet univers fait cohabiter différentes espèces d'animaux qui vivaient en parfaite symbiose.";

    const blabla2 = this.create('p');
    this.add(divU, blabla2);
    blabla2.innerHTML = "Mais l'équilibre de la Forêt est à présent menacé ! Les Arbres Centenaires, maîtres de la Forêt ont été contaminés par une Force Obscure et certains animaux ont commencé à s'attaquer à leurs congénères.";

    const blabla3 = this.create('p');
    this.add(divU, blabla3);
    blabla3.innerHTML = "Tu vas donc incarner un de ses animaux pour essayer de rétablir l'ordre dans l'univers de FOREST RUN !";

  }
}
