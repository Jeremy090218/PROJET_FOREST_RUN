class VuePerdu extends Vue {
  constructor(ctrl) {
    super(ctrl, 'perdu');

    let titre = this.add('h1');
    titre.innerHTML = "Perdu";

    let button = this.add('button');
    button.innerHTML = "Menu Principal";
    button.onclick = () => {
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur), this);
    }
  }
}
