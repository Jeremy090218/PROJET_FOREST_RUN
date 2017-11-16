class VueMenuPrincipal extends Vue {
  constructor(ctrl) {
    super(ctrl, 'menuPrincipal');

    let titre = this.add('h1');
    titre.innerHTML = "Forest Run";

    let button = this.add('button');
    button.innerHTML = "Atelier";
    button.onclick = () => {
      this.controleur.changerVue(new VueAtelier(this.controleur), this);
    }
  }
}
