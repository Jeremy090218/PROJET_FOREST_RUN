class Bank {
  constructor(type, repertoire, liste){
    this.type = type;
    this.rep = repertoire;
    this.liste = liste;
    this.obj = [];
    this.total = this.liste.length;
  }

  chargement(cb, cbProg){
    this.cbProg = cbProg;

    for (let i = 0; i < this.liste.length; ++i) {
      this.obj[i] = document.createElement(this.type);
      this.obj[i].src = this.rep + this.liste[i];
      this.obj[i].nom = this.liste[i];
      if(this.type == "img"){
        this.obj[i].onload = () => {this.compte(cb);};
      } else {
        this.obj[i].onloadedmetadata = () => {this.compte(cb);};
      }
    }
  }

  compte(cb){
    --this.total;
    if(this.cbProg){
      this.cbProg(this.getProgression());
      //console.log(this.getProgression() +"%");
    }
    if (this.total == 0) {
      //console.log("Bank chargée");
      cb();
    }
  }

  getObjet(nom){
    let i = 0;
    while(i < this.liste.length && nom != this.liste[i]){
      ++i;
    }
    if(i != this.liste.length){
      return this.obj[i];
    } else {
      return this.obj[0];
    }
  }

  getAll(){
    return this.obj;
  }

  getProgression(){
    return (((this.liste.length - this.total) / this.liste.length) * 100)|0;
  }
}
