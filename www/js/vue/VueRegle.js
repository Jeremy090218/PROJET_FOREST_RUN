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
    rRunner.innerHTML = "<strong>Runner</strong> </br> Tu incarnes un personnage que tu peux déplacer de gauche à droite et faire sauter grâce à ton doigt. </br> Ton objectif sera d'éviter les obstacles qui se présenteront sur ton chemin et de répondre aux diverses questions que l'on te pose en récupérant des fioles. Les fioles bleues augmentent ton nombres de fioles ramassées tandis que les fioles rouges le diminue. <br> Tu pourra également ramasser des pièces qui te permettront d'augmenter ton score et d'acheter des objets dans la Boutique.";

    const rShooter = this.create('p');
    this.add(divR,rShooter);
    rShooter.innerHTML = "<strong>Shooter</strong> </br> Tu dois répondre à la question posé en sélectionnant la bonne cible avec ton doigt. </br> Si tu échoues, la partie se termine. </br> Si tu réussi, tu reviens dans le Runner pour continuer ta progression dans le partie.";

    const rAtelier = this.create('p');
    this.add(divR,rAtelier);
    rAtelier.innerHTML = "<strong>Atelier</strong> </br> Depuis le Menu Principal, tu peux accéder à l'Atelier. </br>Ainsi, tu pourras choisir l'Animal que tu souhaite incarner et lui appliquer le bonus que tu souhaites.";

    const rBoutique = this.create('p');
    this.add(divR,rBoutique);
    rBoutique.innerHTML = "<strong>Boutique</strong> </br> Depuis l'Atelier, tu pourras accéder à la Boutique. Tu pourras y acheter de nouveaux personnages à jouer mais aussi de nouveaux objets qui te permettront d'améliorer tes performances ou encore de personnaliser ton jeu. </br> À toi de choisir !";

    const rLecons = this.create('p');
    this.add(divR,rLecons);
    rLecons.innerHTML = "<strong>Leçons</strong></br> Tu pourras accéder à différentes leçons à partir du menu principal. N'hésite pas si tu as des doutes à aller lire ces leçons qui seront t'aider.";


  }
}
