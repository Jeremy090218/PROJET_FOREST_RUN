class Reponse extends ElementPartie{
  constructor(ctrl, rep) {
    super(ctrl);
    this.reponse = null;
    this.faussesRep = new Array();
    this.setReponse(rep);
    this.setFaussesRep(2);
  }


  getRndBias(min, max, bias, influence) {
    let rnd = Math.random() * (max - min) + min,   // random in range
        mix = Math.random() * influence;           // random mixer
    return Math.floor(rnd * (1 - mix) + bias * mix);           // mix full range and bias
  }


  getReponse() {
    return this.reponse;
  }


  getFaussesRep() {
    return this.faussesRep;
  }


  setReponse(rep) {
    this.reponse = rep;
  }


  setFaussesRep(nb) {
    for(let i = 0; i < nb; i ++) {
      let fRep = this.getRndBias(1,parseInt(this.reponse)+10,parseInt(this.reponse)+3,0.3);
      while(fRep == this.reponse && fRep == this.faussesRep[i-1]) {
        fRep = this.getRndBias(1,parseInt(this.reponse)+10,parseInt(this.reponse)+3,0.3);
      }
      this.faussesRep.push(fRep);
    }
  }

}
