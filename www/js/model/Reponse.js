class Reponse /*extends ElementPartie*/{
  constructor(ctrl, typeQ, rep) {
    //super(ctrl);
    this.reponse = null;
    this.typeQ = null;
    this.faussesRep = new Array();
    this.setReponse(rep);
    this.setTypeQ(typeQ);
    //this.setReponses(2);
  }


  getRndBias(min, max, bias, influence) {
    let rnd = Math.random() * (max - min) + min,   // random in range
        mix = Math.random() * influence;           // random mixer
    return Math.round(rnd * (1 - mix) + bias * mix);           // mix full range and bias
  }


  getReponse() {
    return this.reponse;
  }


  getTypeQ() {
    return this.typeQ;
  }


  getFaussesRep() {
    return this.faussesrep;
  }


  setReponse(rep) {
    this.reponse = rep;
  }


  setTypeQ(typeQ) {
    this.typeQ = typeQ;
  }


  setFaussesRep(nb) {
    if(this.typeQ == 0 || this.typeQ == 1 || this.typeQ == 2) {

      for(let i = 0; i < nb; i ++) {
        let fRep = this.getRndBias(1,parseInt(this.reponse)+10,parseInt(this.reponse)+3,0.3);
        while(this.faussesRep.includes(fRep)) {
          fRep = this.getRndBias(1,parseInt(this.reponse)+10,parseInt(this.reponse)+3,0.3);
        }
        this.faussesRep.push(fRep);
      }
      this.faussesRep.sort((a, b) => {  return a - b;  });

    } else if(this.typeQ == 3 || this.typeQ == 4) {

      this.faussesRep.push(!this.reponse);
    }
  }
}
