class VueBoutique extends Vue {
  constructor(ctrl) {
    super(ctrl, 'boutique');

    const buttonRetourAtl = this.create('button');
    buttonRetourAtl.id="btnHD";
    this.add(buttonRetourAtl);
    buttonRetourAtl.innerHTML = "Retour à l'Atelier";
    buttonRetourAtl.onclick = () => {
      this.controleur.changerVueUnique(new VueAtelier(this.controleur));
    }

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Boutique";

    const argent = this.create('h3');
    this.add(argent);
    argent.innerHTML = "Ton argent : "+this.controleur.getUtilisateur().getArgent();



    const vueBoutique = this;

    const divB = this.create('div');
    this.add(divB);
    divB.id = "divB";

    for (let produit of this.controleur.getUtilisateur().getBoutique().getProduits()) {
      if (produit) {
        const titre_produit = this.create('h3');
        this.add(divB,titre_produit);
        titre_produit.innerHTML = produit.getNom();

        const prix_produit = this.create('h4');
        this.add(divB,prix_produit);
        prix_produit.innerHTML = "Prix : " + produit.getPrix();

        const btnAcheter = this.create('button');
        this.add(divB,btnAcheter);
        btnAcheter.innerHTML = "Acheter";
        btnAcheter.onclick = () => {
          if (vueBoutique.controleur.getUtilisateur().getArgent() >= produit.getPrix()) {
            vueBoutique.controleur.getUtilisateur().achatItem(produit);
            vueBoutique.controleur.changerVueUnique(new VueBoutique(this.controleur));
          }
        }
      }
    }
 }
}
