 class VueLecon extends Vue {
  constructor(ctrl, lecon) {
    super(ctrl, 'VueLecon');

    const lecon_frame = this.create('iframe');
    this.add(lecon_frame);
    //lecon_frame.src= "cours_maths_3eme/"+lecon+".pdf";
    lecon_frame.src= "cours_maths_3eme/"+lecon+"/index.html";

    const buttonRetour = this.create('button');
    this.add(buttonRetour);
    buttonRetour.innerHTML = "Retour";
    buttonRetour.onclick = () => {
      this.controleur.changerVueUnique(new VueLecons(this.controleur), this);
    }
}

}
