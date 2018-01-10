class Vue {
  constructor(ctrl, type, affiche = true) {
    this.alive = true;
    this.controleur = ctrl;
    this.divIHM = document.getElementById('ihm');
    this.div = document.createElement('div');
    this.div.id = type;

    if (affiche) this.afficher();
  }

  create(nomBalise){
    return document.createElement(nomBalise);
  }

  add(balise1, balise2 = null){
    if(balise2) balise1.appendChild(balise2);
    else this.div.appendChild(balise1);
  }

  remove(balise){
    this.div.removeChild(balise);
  }

  afficher(){
    this.divIHM.appendChild(this.div);
  }

  delete(){
    this.divIHM.removeChild(this.div);
    this.alive = false;
  }

  isAlive(){
    return this.alive;
  }
}
