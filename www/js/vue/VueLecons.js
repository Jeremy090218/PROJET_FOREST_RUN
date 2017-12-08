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
    cours = ["Angles", "Thales", "Equations", "Espace", "Fonctions_num", "Fonctions_lin", "Identites", "Nombres_entiers", "Probabilites", "Puissances", "Racines", "Sphere", "Statistiques", "Trigo"];

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
