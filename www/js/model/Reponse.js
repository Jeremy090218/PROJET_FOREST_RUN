class Reponse {
  constructor(ctrl, typeQ, rep) {
    //super(ctrl);
    this.bonneRep = null;
    this.typeQ = null;
    this.reponses = new Array();
    this.setBonneRep(rep);
    this.setTypeQ(typeQ);
    this.setReponses();
  }


  getRndBias(min, max, bias, influence) {
    let rnd = Math.random() * (max - min) + min,   // random in range
        mix = Math.random() * influence;           // random mixer
    return Math.round(rnd * (1 - mix) + bias * mix);           // mix full range and bias
  }


  getBonneRep() {
    return this.bonneRep;
  }


  getTypeQ() {
    return this.typeQ;
  }


  getReponses() {
    return this.reponses;
  }


  setBonneRep(rep) {
    this.bonneRep = rep;
  }


  setTypeQ(typeQ) {
    this.typeQ = typeQ;
  }


  setReponses() {
    this.reponses.push(this.bonneRep);

    if(this.typeQ == 0 || this.typeQ == 1 || this.typeQ == 2 || this.typeQ == 3) {
      for(let i = 0; i < 5; i ++) {
        let fRep = this.getRndBias(parseInt(this.bonneRep)-10,parseInt(this.bonneRep)+10,parseInt(this.bonneRep)+3,0.3);
        while(this.reponses.includes(fRep) || fRep == this.reponse) {
          fRep = this.getRndBias(parseInt(this.bonneRep)-10,parseInt(this.bonneRep)+10,parseInt(this.bonneRep)+3,0.3);
        }
        this.reponses.push(fRep);
      }
      this.reponses.sort((a, b) => {  return a - b;  });

    } else if(this.typeQ == 4 || this.typeQ == 5) {
      this.reponses.push(!this.bonneRep);
      this.reponses.push("Vrai");
      this.reponses.push("Faux");
      this.reponses.push("Vrai");
      this.reponses.push("Faux");
    }
  }
}
