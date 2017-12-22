class VueStats extends Vue {
  constructor(ctrl) {
    super(ctrl, 'VueStats');

        const buttonRetour = this.create('button');
        buttonRetour.id="btnHD";
        this.add(buttonRetour);
        buttonRetour.innerHTML = "Retour";
        buttonRetour.onclick = () => {
            this.controleur.changerVue(new VueOptions(this.controleur), this);
          }

        const tMoy = this.create('h3');
        this.add(tMoy);
        tMoy.innerHTML = "Note moyenne aux questions";

        const tTps = this.create('h3');
        this.add(tTps);
        tTps.innerHTML = "Temps total en jeu";

        const tDP = this.create('h3');
        this.add(tDP);
        tDP.innerHTML = "Distance parcourue";

        const tBossB = this.create('h3');
        this.add(tBossB);
        tBossB.innerHTML = "Progression dans le jeu";

        const tExNR = this.create('h3');
        this.add(tExNR);
        tExNR.innerHTML = "Types exercices le moins réussi";

        const tExR = this.create('h3');
        this.add(tExR);
        tExR.innerHTML = "Types exercices le plus réussi";





}
}
