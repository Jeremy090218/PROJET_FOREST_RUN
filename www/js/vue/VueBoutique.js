class VueBoutique extends Vue {
  constructor(ctrl) {
    super(ctrl, 'boutique');
    const vueBoutique = this;


    const buttonRetourAtl = this.create('button');
    buttonRetourAtl.id="btnHD";
    this.add(buttonRetourAtl);
    buttonRetourAtl.innerHTML = "Retour à l'Atelier";
    buttonRetourAtl.onclick = () => {
      this.controleur.changerVueUnique(new VueAtelier(this.controleur));
    }

    const argent = this.create('h3');
    this.add(argent);
    argent.innerHTML = "Ton argent : "+this.controleur.getUtilisateur().getArgent();

    const titre = this.create('h1');
    this.add(titre);
    titre.innerHTML = "Boutique";

    for (let produit of this.controleur.getUtilisateur().getBoutique().getProduits()) {
      const titre_produit = this.create('h3');
      this.add(titre_produit);
      titre_produit.innerHTML = produit.getNom();

      const prix_produit = this.create('h4');
      this.add(prix_produit);
      prix_produit.innerHTML = "Prix : " + produit.getPrix();

      const btnAcheter = this.create('button');
      this.add(btnAcheter);
      btnAcheter.innerHTML = "Acheter";
      btnAcheter.onclick = () => {
        if (vueBoutique.controleur.getUtilisateur().getArgent() >= produit.getPrix()) {
          vueBoutique.controleur.getUtilisateur().achatItem(produit);
        }

      }
    }
 }
}
