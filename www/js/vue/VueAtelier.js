class VueAtelier extends Vue {
  constructor(ctrl) {
    super(ctrl, 'atelier');

    const titre = this.create('h2');
    this.add(titre);
    titre.innerHTML = "Atelier";

    const button = this.create('button');
    this.add(button);
    button.innerHTML = "Menu principal";
    button.onclick = () => {
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur),this);
    }

    const p = this.create('p');
    this.add(button, p);
    p.innerHTML = "zuaeyizatei";
  }
}
