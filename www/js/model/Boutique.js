class Boutique {
  constructor(ctrl) {
    this.produits =  [new Item("Saut +",true,false,50),new Item("Esquive ++",true,false,100)];

  }

  getProduits(){return this.produits;}

  enleverItem(i){
    let j = 0;
    console.log(i.getNom());
    for (let produit of this.produits) {
      if (i.getNom() == produit.getNom()) {
        console.log(produit.getNom());
        delete this.produits[j];
      }
      j++;
    }
  }
}
