class Boutique {
  constructor(ctrl) {
    this.produits =  [new Item("Rien", true, true, 0),new Item("Saut +",true,false,50),new Item("Esquive ++",true,false,50),new Item("Saut ++",true,false,50),new Item("Vie ++",true,false,70),new Item("Teleportation",true,false,100),];

  }

  getProduits(){return this.produits;}

  enleverItem(i){
    for (let j = 0; j < this.produits.length; j++) {
      if (i.getNom() == this.produits[j].getNom()) {
        this.produits.splice(j, 1);
      }
    }
  }
}
