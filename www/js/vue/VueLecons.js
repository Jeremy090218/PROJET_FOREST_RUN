class VueLecons extends Vue {
  constructor(ctrl) {
    super(ctrl, 'VueLecons');

    const buttonRetour = this.create('button');
    buttonRetour.id="btnHD";
    this.add(buttonRetour);
    buttonRetour.innerHTML = "Menu Principal";
    buttonRetour.onclick = () => {
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur), this);
    }

    // Création du vecteur contenant les leçons
    let cours = [];

    // Ajout des leçons dans le vecteur
    cours = ["Angles Inscrits & Polygones Reguliers",  "Equations, Inequations & Systemes", "Geometrie dans l'Espace", "Fonction Numerique", "Fonctions Lineaires & Affines", "Identites Remarquables & Equations Produit", "Nombres Entiers & Rationnels", "Probabilites","Thales", "Puissances d'Exposants Relatifs", "Racines Carrees", "Sphere", "Statistiques", "Trigonometrie"];

    // Création d'un bouton pour chaque cours
    const divL = this.create('div');
    this.add(divL);
    divL.id = "divL";

    for (let lecon of cours) {
      const buttonl = this.create('button');
      buttonl.id="btnL";
      this.add(divL, buttonl);

      buttonl.innerHTML = lecon;
      buttonl.onclick = () => {
        this.controleur.changerVue(new VueLecon(this.controleur, lecon), this);
      }
    }

}

}
