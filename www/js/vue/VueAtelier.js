class VueAtelier extends Vue {
  constructor(ctrl) {
    super(ctrl, 'atelier');

    const buttonMenuPrincip = this.create('button');
    buttonMenuPrincip.id="divA";
    this.add(buttonMenuPrincip);
    buttonMenuPrincip.innerHTML = "Menu principal";
    buttonMenuPrincip.onclick = () => {
      this.controleur.changerVue(new VueMenuPrincipal(this.controleur),this);
    }

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Atelier";

    const buttonBtq = this.create('button');
    buttonBtq.id="divA";
    this.add(buttonBtq);
    buttonBtq.innerHTML = "Boutique";
    buttonBtq.onclick = () => {
      this.controleur.changerVue(new VueBoutique(this.controleur), this);
    }

    let perso = this.controleur.textures.getObjet("Character_0_vue_0.png");
    perso.id="perso_choisi";
    this.add(perso);

    const choix_perso = this.create('select');
    choix_perso.options[0] = new Option("Chat", "Chat", true, true);
    choix_perso.options[1] = new Option("Chèvre", "Chèvre", true, true);
    choix_perso.options[2] = new Option("Lapin", "Lapin", true, true);
    choix_perso.options[0].selected = true;
    this.add(choix_perso);

    const chat = this.controleur.textures.getObjet("Character_0_vue_0.png");
    const chevre = this.controleur.textures.getObjet("Character_1_vue_0.png");
    const lapin = this.controleur.textures.getObjet("Character_2_vue_0.png");
    const vueAtelier = this;
    const controleur = this.controleur;

    choix_perso.onchange = function(){
      if (choix_perso.options[0].selected) {
        perso = chat;
        perso.id="perso_choisi";
        vueAtelier.add(perso);
        controleur.rafraichirVues();
      }
      if (choix_perso.options[1].selected) {
        perso = chevre;
        perso.id="perso_choisi";
        vueAtelier.add(perso);
        controleur.rafraichirVues();
      }
      if (choix_perso.options[2].selected) {
        perso = lapin;
        perso.id="perso_choisi";
        vueAtelier.add(perso);
        controleur.rafraichirVues();
      }
    };
  }

}
