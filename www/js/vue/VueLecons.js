class VueLecons extends Vue {
  constructor(ctrl) {
    super(ctrl, 'VueLecons');

    const buttonRetour = this.create('button');
    this.add(buttonRetour);
    buttonRetour.innerHTML = "Menu Principal";
    buttonRetour.onclick = () => {
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur), this);
    }

    // Création du vecteur contenant les leçons
    let cours = [];

    // Ajout des leçons dans le vecteur
    cours = ["Angles Inscrits & Polygones Reguliers", "Thales", "Equations, Inequations & Systemes", "Geometrie dans l'Espace", "Fonction Numerique", "Fonctions Lineaires & Affines", "Identites Remarquables & Equations Produit", "Nombres Entiers & Rationnels", "Probabilites", "Puissances d'Exposants Relatifs", "Racines Carrees", "Sphere", "Statistiques", "Trigonometrie"];

    // Création d'un bouton pour chaque cours

    for (let lecon of cours) {
      const button = this.create('button');
      this.add(button);
      button.innerHTML = lecon;
      button.onclick = () => {
        this.controleur.changerVue(new VueLecon(this.controleur, lecon), this);
      }
    }

}

}
