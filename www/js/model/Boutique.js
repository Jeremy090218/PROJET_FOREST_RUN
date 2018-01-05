class Boutique {
  constructor(utilisateur) {
    this.setUtilisateur(utilisateur);
    this.setItems(new Array());
    this.initialiserItem();
  }

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// GETTERS ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  getUtilisateur(){return this.utilisateur;}
  getItems(){return this.items}

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// SETTERS //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  setUtilisateur(i){this.utilisateur = i ;}
  setItems(i){this.items = i;}

////////////////////////////////////////////////////////////////////////////////
/////////// gestion des Items
////////////////////////////////////////////////////////////////////////////////

  initialiserItem(){
    this.ajoutItem(new Item("Esquive +",true,false,20));
    this.ajoutItem(new Item("Vie +",true,true,20));
    this.ajoutItem(new Item("Saut +",true,false,20));
  }



  ajoutItem(i){
    this.getItems().push(i);
  }
  enleverItem(j){
    for (var i = 0; i < this.getItems().length; i++) {
      if(this.getItems()[i] == j){
        this.getItems().splice(i,1);
      }
    }
  }

  recupItemAchat(){                                         // recupere tout les items acheter puis les enlevent de la boutique
    let itemsAcheter = new Array();
    for (var i = 0; i < this.getItems().length; i++) {
      if(this.getItems()[i].getAchat()){
        itemsAcheter.push(this.getItems()[i]);
      }
    }
    for (var i = 0; i < itemsAcheter.length; i++) {
      this.enleverItem(itemsAcheter[i]);
    }
    return itemsAcheter;
  }


////////////////////////////////////////////////////////////////////////////////
/////// gestion des achats
////////////////////////////////////////////////////////////////////////////////

  achatItemPossible(item){
    if(this.getUtilisateur().getArgent() >= item.getPrix()){
      return true;
    }else{
      return false;
    }
  }


}
