/*class Question extends Element {
  constructor(reponses,bonneReponse) {
    super();
    this.reponses = reponses ;
    this.bonneReponse = bonneReponse ;
  }


////////////////////////////////////////////////////////////////////////////////
//////////////////////////// GETTERS ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  getReponses(){return this.reponses ;}
  getBonneReponse(){return this.bonneReponse;}

////////////////////////////////////////////////////////////////////////////////
//////////////////////////// SETTERS ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  setReponses(i){this.reponses = i ;}
  setBonneReponse(i){this.bonneReponse = i;}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  reponseJuste(reponse){                      // return vrai si la reponse est juste
    return this.getBonneReponse() == reponse;
  }
}
*/
//require('algebra-0.2.6.min.js');

class Question extends Element {
  constructor(ctrl) {
    super(ctrl);
    if(!Element.id) Element.id = 0;
    this.id = ++Element.id;
    this.question = null;
    this.reponse = null;
    this.setQuestion();    
  }


  getRndBias(min, max, bias, influence) {
    let rnd = Math.random() * (max - min) + min,   // random in range
        mix = Math.random() * influence;           // random mixer
    return Math.floor(rnd * (1 - mix) + bias * mix);           // mix full range and bias
  }


  getQuestion() {
    return this.question;
  }


  getReponse() {
    return this.reponse;
  }
  

  setQuestion() {
    this.question = this.createQuestion();
  }
  
  
  setReponse(reponse) {
    this.reponse = reponse;
  }


  isInt(value) {
    return Math.round(value) == value;
  }


  solver(e) {
    let Fraction = algebra.Fraction;
    let Expression = algebra.Expression;
    let Equation = algebra.Equation;

    let eq = algebra.parse(e);
    let ans = eq.solveFor("x");
    return ans.toString();
  }


  createQuestion() {
    let Fraction = algebra.Fraction;
    let Expression = algebra.Expression;
    let Equation = algebra.Equation;

    let div = this.getRndBias(1,3,1,1);

    let expGauche = new Expression("x");
        expGauche = expGauche.multiply(this.getRndBias(1,10,0,0));
        expGauche = expGauche.add(this.getRndBias(-10,10,0,0.5));
        expGauche = expGauche.divide(div);

    let expDroite = new Expression("x");
        expDroite = expDroite.multiply(this.getRndBias(-10,10,0,0.75));
        expDroite = expDroite.add(this.getRndBias(-10,10,0,0));
        expDroite = expDroite.divide(div);

    let eq = expGauche.toString() + " = " + expDroite.toString();

    try {
      if (this.solver(eq) > 0 && this.isInt(this.solver(eq))) {
        this.setReponse(new Reponse(ctrl, this.solver(eq)));
        return eq;
      } else {
        return this.createQuestion();
      }
    } catch(EvalError) {
      return this.createQuestion();
    }
  }

  
  repondre(rep) {
    return rep == this.reponse.getReponse();
  }
}