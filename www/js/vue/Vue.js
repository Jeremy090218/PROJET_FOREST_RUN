class Vue {
  constructor(ctrl, type, affiche = true) {
    this.alive = true;
    this.controleur = ctrl;
    this.divIHM = document.getElementById('ihm');
    this.div = document.createElement('div');
    this.div.id = type;

    if (affiche) this.afficher();
  }

  add(nomBalise){
    let balise = document.createElement(nomBalise);
    this.div.appendChild(balise);
    return balise;
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
