class Utilisateur {
  constructor(ctrl,texture,argent) {
    this.setControleur(ctrl);
    this.setBoutique(new Boutique());
    this.setItems(this.getBoutique().recupItemAchat());
    this.setArgent(argent);
    this.setPersonnage(new Personnage(ctrl,texture,this.recupItemPerso()));
  }


////////////////////////////////////////////////////////////////////////////////
///////////////////////// GETTERS //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  getControleur(){return this.controleur;}
  getPersonnage(){return this.personnage;}
  getBoutique(){return this.boutique;}
  getItems(){return this.items;}
  getArgent(){return this.argent;}

////////////////////////////////////////////////////////////////////////////////
///////////////////////// SETTERS //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  setControleur(i){this.controleur = i;}
  setPersonnage(i){this.personnage = i ;}
  setBoutique(i){this.boutique = i;}
  setItems(i){this.items = i;}
  setArgent(i){this.argent =i;}


////////////////////////////////////////////////////////////////////////////////
/////////// gestion Items
////////////////////////////////////////////////////////////////////////////////

  recupItemPerso(){
    let item = null ;
    for (var i = 0; i < this.getItems().length; i++) {
      if(this.getItems()[i].getEquiper()){
        item = this.getItems()[i];
      }
    }
    return item ;
  }

  ajouterItem(i){
    this.getItems().push(i);
  }
  changerItem(i){
    this.getItems().desequiperItem();
    this.getPersonnage().changerItem(i);
    this.getItems().equiperItem();
  }


////////////////////////////////////////////////////////////////////////////////
//////////// gestion Argent
////////////////////////////////////////////////////////////////////////////////

ajouterArgent(i){
  this.setArgent(this.getArgent() + i);
}

enleverArgent(i){
  this.setArgent(this.getArgent() -i);
}


///////////////////////////////////////////////////////////////////////////////
//////////achats
////////////////////////////////////////////////////////////////////////////////

achatPossible(item){
  return this.getBoutique().achatItemPossible(item);
}

achatItem(item){
  this.ajouterItem(item);
  this.getBoutique().enleverItem(item);
  this.enleverArgent(item.getPrix());
}




}
