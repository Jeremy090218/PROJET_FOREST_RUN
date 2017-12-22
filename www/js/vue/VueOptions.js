class VueOptions extends Vue {
  constructor(ctrl) {
      super(ctrl, 'Options');

      const buttonRetour = this.create('button');
      buttonRetour.id="btnHD";
      this.add(buttonRetour);
      buttonRetour.innerHTML = "Menu Principal";
      buttonRetour.onclick = () => {
        this.controleur.changerVue(new VueMenuPrincipal(this.controleur), this);
      }

      const titre = this.create('h1');
      this.add(titre);
      titre.innerHTML = "Options";

      const caseMuteText = this.create('label');
      caseMuteText.innerHTML = "Son";
      this.add(caseMuteText);

      const caseMute = this.create('input');
      caseMute.type = 'checkbox';
      this.add(caseMute);

      const buttonReinit = this.create('button');
      this.add(buttonReinit);
      buttonReinit.innerHTML = "Reinit. Données";
      buttonReinit.onclick = () => {
        this.controleur.changerVue(new VueConfirmationReinit(this.controleur), this);
      }

      const buttonCredit = this.create('button');
      this.add(buttonCredit);
      buttonCredit.innerHTML = "Crédits";
      buttonCredit.onclick = () => {
        this.controleur.changerVue(new VueCredits(this.controleur), this);
      }

      const buttonStats = this.create('button');
      this.add(buttonStats);
      buttonStats.innerHTML = "Statistiques";
      buttonStats.onclick = () => {
        this.controleur.changerVue(new VueStats(this.controleur), this);
      }
  }
}
