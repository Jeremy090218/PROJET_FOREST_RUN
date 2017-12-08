class VueOptions extends Vue {
  constructor(ctrl) {
      super(ctrl, 'Options');

      const buttonRetour = this.create('button');
      this.add(buttonRetour);
      buttonRetour.innerHTML = "Menu Principal";
      buttonRetour.onclick = () => {
        this.controleur.changerVue(new VueMenuPrincipal(this.controleur), this);
      }
  }
}
