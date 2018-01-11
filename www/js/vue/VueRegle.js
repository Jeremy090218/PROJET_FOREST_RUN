class VueRegle extends Vue {
  constructor(ctrl) {
    super(ctrl, 'VueRegle');

    const buttonRetour = this.create('button');
    buttonRetour.id="btnHD";
    this.add(buttonRetour);
    buttonRetour.innerHTML = "Menu Principal";
    buttonRetour.onclick = () => {
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur), this);
    }

    const divR = this.create('div');
    this.add(divR);
    divR.id = "divR";

    const titre = this.create('h2');
    this.add(divR,titre);
    titre.innerHTML = "Règles du jeu";


    const rRunner = this.create('p');
    this.add(divR,rRunner);
    rRunner.innerHTML = "<strong>Runner</strong> </br> Tu incarne un personnage que tu peux déplacer de gauche à droite et faire sauter avec ton doigt. </br> Ton objectif sera d'éviter les obstacles qui se présenteront sur ton chemin et de répondres aux diverses questions, tout en ramassant des pièces qui te permettront d'augmenter ton score et d'acheter des objects dans la boutique.";

    const rShooter = this.create('p');
    this.add(divR,rShooter);
    rShooter.innerHTML = "<strong>Shooter</strong> </br> Répond à la question posé en sélectionnant la bonne cible avec ton doigt.";

    const rAtelier = this.create('p');
    this.add(divR,rAtelier);
    rAtelier.innerHTML = "<strong>Atelier</strong> </br> Du menu principal tu peux accéder à l'atelier. Ainsi, tu pourras choisir l'animal que tu souhaite incarner et lui appliquer le bonus que tu souhaites. </br> L'atelier te permet aussi d'accèder à la boutique.";

    const rBoutique = this.create('p');
    this.add(divR,rBoutique);
    rBoutique.innerHTML = "<strong>Boutique</strong> </br> A partir de l'atelier tu as accès à la boutique. Tu pourras acheter de nouveaux animaux mais aussi de nouveaux objects qui te permettront d'améliorer tes performances ou encore de personnaliser ton jeu. </br> A toi de choisir !";

    const rLecons = this.create('p');
    this.add(divR,rLecons);
    rLecons.innerHTML = "<strong>Lecons</strong></br> Tu pourras accéder à différentes leçons à partir du menu principal. Alors n'hésite pas, si tu as des doutes, ces leçons sont là pour t'aider.";


  }
}
