class VueAtelier extends Vue {
  constructor(ctrl) {
    super(ctrl, 'atelier');

    const buttonMenuPrincip = this.create('button');
    buttonMenuPrincip.id="btnHD";
    this.add(buttonMenuPrincip);
    buttonMenuPrincip.innerHTML = "Menu principal";
    buttonMenuPrincip.onclick = () => {
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur),this);
    }

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Atelier";

    const buttonBtq = this.create('button');
    this.add(buttonBtq);
    buttonBtq.innerHTML = "Boutique";
    buttonBtq.onclick = () => {
      this.controleur.changerVue(new VueBoutique(this.controleur), this);
    }

    // Création de la variable stockant l'image du perso choisi
    // Initialisation par défaut de cette variable avec l'image du chat
    let perso = this.controleur.textures.getObjet(this.controleur.getDataUtilisateur().persoCourant.texture);
    perso.id="perso_choisi";
    this.add(perso);

    // Création du bandeau déroulant de choix du perso
    // (par défaut le chat est sélectionné)
    const choix_perso = this.create('select');
    choix_perso.options[0] = new Option("Chat", 0, false, this.controleur.getDataUtilisateur().persoCourant.nom == "Chat");
    choix_perso.options[1] = new Option("Chèvre", 1, false, this.controleur.getDataUtilisateur().persoCourant.nom == "Chèvre");
    choix_perso.options[2] = new Option("Lapin", 2, false, this.controleur.getDataUtilisateur().persoCourant.nom == "Lapin");
    //choix_perso.options[0].selected = true;
    this.add(choix_perso);


    // Stockage de la vueAtelier et du controleur dans des variables
    // (nécessaire à la fonction permettant de changer de perso à partir du bandeau déroulant)
    const vueAtelier = this;
    const controleur = this.controleur;

    // Fonction permettant de changer de perso à partir du bandeau déroulant
    choix_perso.onchange = function(){
      for (let choix of choix_perso.options) {
        if(choix.selected){
          vueAtelier.remove(perso);

          const texturePerso = "Character_"+ choix.value +"_vue_0.png";

          perso = controleur.textures.getObjet(texturePerso);
          perso.id="perso_choisi";
          vueAtelier.add(perso);
          controleur.getDataUtilisateur().persoCourant = {
            nom: choix.innerHTML,
            texture: texturePerso,
            textureAnime: "Character_"+ choix.value +"_annimation.png"
          }
        }
      }
    };
  }

}
