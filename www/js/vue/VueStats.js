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
/*
        const tMoy = this.create('h5');
        this.add(tMoy);
        tMoy.innerHTML = "Note moyenne aux questions";

        const tTps = this.create('h5');
        this.add(tTps);
        tTps.innerHTML = "Temps total en jeu";

        const tDP = this.create('h5');
        this.add(tDP);
        tDP.innerHTML = "Distance parcourue";
*/
        const hscore = this.create('h5');
        this.add(hscore);
        hscore.innerHTML = "Votre meilleur score est de "+this.controleur.getUtilisateur().getHighScore()+" points";
/*
        const tExNR = this.create('h5');
        this.add(tExNR);
        tExNR.innerHTML = "Types exercices le moins réussi";

        const tExR = this.create('h5');
        this.add(tExR);
        tExR.innerHTML = "Types exercices le plus réussi";
*/




}
}
