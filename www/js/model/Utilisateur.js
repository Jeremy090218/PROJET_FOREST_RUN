class Utilisateur {
  constructor(ctrl/*,texture,argent*/) {
    this.setControleur(ctrl);
    this.setBoutique(new Boutique());
    //this.setItems(this.getBoutique().recupItemAchat());
    //this.setArgent(argent);
    //this.setPersonnage(new Personnage(ctrl));
  }


////////////////////////////////////////////////////////////////////////////////
///////////////////////// GETTERS //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  getControleur(){return this.controleur;}
  getBoutique(){return this.boutique;}
  getItems(){return this.items;}
  getItemEquipe(){return this.itemEquipe;}
  getArgent(){return this.argent;}
  getSkins(){return this.skins;}
  getHighScore(){return this.highScore;}

  getPersonnageRunner(){
    return new Personnage(this.controleur, this.getSkins().textureAnim, this.getSkins().son, this.getItemEquipe());
  }

  getPersonnageShooter(){
    return new Personnage(this.controleur, this.getSkins().textureFixe, this.getItemEquipe());
  }


////////////////////////////////////////////////////////////////////////////////
///////////////////////// SETTERS //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  setControleur(i){this.controleur = i;}
  setBoutique(i){this.boutique = i;}
  setItems(i){this.items = i;}
  setItemEquipe(i){this.itemEquipe = i;}
  setArgent(i){this.argent = i;}
  setSkins(s){this.skins = s;}
  setHighScore(s){
    if(!this.highScore ||this.highScore < s) this.highScore = s;
  }

  setFromSauvegarde(data){
    this.setItems(data.achete);
    this.setItemEquipe(data.equipe);
    this.setSkins(data.persoCourant);
    this.setHighScore(data.highScore);
    this.setArgent(data.argent);
}

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
