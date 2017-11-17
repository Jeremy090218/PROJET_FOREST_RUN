class Bank {
  constructor(type, repertoire, liste){
    this.type = type;
    this.rep = repertoire;
    this.liste = liste;
    this.obj = new Array();
    this.total = this.liste.length;
  }

  chargement(cb, cbProg){
    this.cbProg = cbProg;

    for (let i = 0; i < this.total; ++i) {
      const index = this.liste[i];
      this.obj[index] = document.createElement(this.type);
      this.obj[index].src = this.rep + this.liste[i];
      this.obj[index].nom = this.liste[i];
      if(this.type == "img"){
        this.obj[index].onload = () => {this.compte(cb);};
      } else {
        this.obj[index].onloadedmetadata = () => {this.compte(cb);};
      }
    }
  }

  compte(cb){
    --this.total;
    if(this.cbProg) this.cbProg(this.getProgression());
    if (this.total == 0) cb();
  }

  getObjet(nom){
    if (this.obj[nom]) return this.obj[nom];
    else return this.getObjet('default.png');
  }

  getAll(){
    return this.obj;
  }

  getProgression(){
    return (((this.liste.length - this.total) / this.liste.length) * 100)|0;
  }
}
