class VueLecons extends Vue {
  constructor(ctrl) {
    super(ctrl, 'VueLecons');

    const buttonRetour = this.create('button');
    this.add(buttonRetour);
    buttonRetour.innerHTML = "Menu Principal";
    buttonRetour.onclick = () => {
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur), this);
    }
}
}
