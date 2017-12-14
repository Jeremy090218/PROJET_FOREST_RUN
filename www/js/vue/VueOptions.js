class VueOptions extends Vue {
  constructor(ctrl) {
      super(ctrl, 'Options');

      const buttonRetour = this.create('button');
      this.add(buttonRetour);
      buttonRetour.innerHTML = "Menu Principal";
      buttonRetour.onclick = () => {
        this.controleur.changerVue(new VueMenuPrincipal(this.controleur), this);
      }

      const buttonStats = this.create('button');
      this.add(buttonStats);
      buttonStats.innerHTML = "Statistiques";
      buttonStats.onclick = () => {
        this.controleur.changerVue(new VueStats(this.controleur), this);
      }
  }
}
