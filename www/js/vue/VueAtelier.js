class VueAtelier extends Vue {
  constructor(ctrl) {
    super(ctrl, 'atelier');

    let titre = this.add('h2');
    titre.innerHTML = "Atelier";

    let button = this.add('button');
    button.innerHTML = "Menu principal";
    button.onclick = () => {
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur),this);
    }
  }
}
