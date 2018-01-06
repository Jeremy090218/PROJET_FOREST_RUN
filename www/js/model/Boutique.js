class Boutique {
  constructor(ctrl) {
    this.produits =  [new Item("Saut +",true,false,50),new Item("Esquive ++",true,false,100)];

  }

  getProduits(){return this.produits;}

  enleverItem(i){
    let j = 0;
    console.log(i.getNom());
    for (let produit of this.getProduits()) {
      produit.getNom();
      if (i.getNom() == produit.getNom()) {
        delete this.getProduits[j];
      }
      j++;
    }
  }
}
