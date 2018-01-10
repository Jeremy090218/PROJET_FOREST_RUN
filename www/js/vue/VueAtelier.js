class VueAtelier extends Vue {
  constructor(ctrl) {
    super(ctrl, 'atelier');

    //Interface
    const buttonMenuPrincip = this.create('button');
    buttonMenuPrincip.id="btnHD";
    this.add(buttonMenuPrincip);
    buttonMenuPrincip.innerHTML = "Menu principal";
    buttonMenuPrincip.onclick = () => {
      console.log("Item choisi : " + this.controleur.getUtilisateur().getItemEquipe().getNom());
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

    const vueAtelier = this;

    // Création du bandeau déroulant de choix du perso
    // (par défaut le chat est sélectionné)
    const choix_perso = this.create('select');
    choix_perso.options[0] = new Option("Chat", 0, false, this.controleur.getUtilisateur().getSkins().nom == "Chat");
    choix_perso.options[1] = new Option("Chèvre", 1, false, this.controleur.getUtilisateur().getSkins().nom == "Chèvre");
    choix_perso.options[2] = new Option("Lapin", 2, false, this.controleur.getUtilisateur().getSkins().nom == "Lapin");
    //choix_perso.options[0].selected = true;
    this.add(choix_perso);

    // Création de la variable stockant l'image du perso choisi
    // Initialisation par défaut de cette variable avec l'image du chat
    let perso = this.controleur.textures.getObjet(this.controleur.getUtilisateur().getSkins().textureFixe);
    perso.id="perso_choisi";
    this.add(perso);



    // Fonction permettant de changer de perso à partir du bandeau déroulant
    choix_perso.onchange = function(){
      for (let choix of choix_perso.options) {
        if(choix.selected){
          vueAtelier.remove(perso);

          const texturePerso = "Character_"+ choix.value +"_vue_0.png";

          perso = vueAtelier.controleur.textures.getObjet(texturePerso);
          perso.id="perso_choisi";
          vueAtelier.add(perso);
          vueAtelier.controleur.getUtilisateur().setSkins({
            nom: choix.innerHTML,
            textureFixe: texturePerso,
            textureAnim: "Character_"+ choix.value +"_annimation.png"
          });
        }
      }
    };

    // Bandeau déroulant de sélection d'item pour le perso
    const item_choisi = this.create('select');
    let i = 0;
    for (let achete of this.controleur.getUtilisateur().getItems()) {
      item_choisi.options[i] = new Option(achete.getNom(), i, false, achete.getNom() == this.controleur.getUtilisateur().getItemEquipe().getNom());
      i++;
    }
    this.add(item_choisi);

    // Fonction permettant de changer d'item à partir du bandeau déroulant
    item_choisi.onchange = function(){
      for (let choix of item_choisi.options) {
        if(choix.selected){
          let item = null;
          for (let achete of vueAtelier.controleur.getUtilisateur().getItems()) {
            if (choix.innerHTML == achete.getNom()) {
              item = achete;
            }
          }
          vueAtelier.controleur.getUtilisateur().setItemEquipe(item);
        }
      }
    };
  }
}
