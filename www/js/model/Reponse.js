class Reponse extends ElementPartie{
  constructor(ctrl, rep) {
    super(ctrl);
    this.reponse = null;
    this.reponses = new Array();
    this.setReponse(rep);
    this.setReponses(2);
  }


  getRndBias(min, max, bias, influence) {
    let rnd = Math.random() * (max - min) + min,   // random in range
        mix = Math.random() * influence;           // random mixer
    return Math.floor(rnd * (1 - mix) + bias * mix);           // mix full range and bias
  }


  getReponse() {
    return this.reponse;
  }


  getReponses() {
    return this.reponses;
  }


  setReponse(rep) {
    this.reponse = rep;
  }


  setReponses(nb) {
    this.reponses.push(parseInt(this.reponse));

    for(let i = 0; i < nb; i ++) {
      let fRep = this.getRndBias(1,parseInt(this.reponse)+10,parseInt(this.reponse)+3,0.3);

      while(this.reponses.includes(fRep)) {
        fRep = this.getRndBias(1,parseInt(this.reponse)+10,parseInt(this.reponse)+3,0.3);
      }

      this.reponses.push(fRep);
    }
    
    this.reponses.sort((a, b) => {  return a - b;  });
  }

}
