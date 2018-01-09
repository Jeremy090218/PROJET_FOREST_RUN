class Reponse /*extends ElementPartie*/{
  constructor(ctrl, typeQ, rep) {
    //super(ctrl);
    this.reponse = null;
    this.typeQ = null;
    this.reponses = new Array();
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


  getReponses() {
    return this.reponses;
  }


  setReponse(rep) {
    this.reponse = rep;
  }


  setTypeQ(typeQ) {
    this.typeQ = typeQ;
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

  update(){

  }
}
