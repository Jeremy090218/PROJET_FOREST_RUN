class Question extends Element {
  constructor(ctrl) {
    super(ctrl);
    if(!Element.id) Element.id = 0;
    this.id = ++Element.id;
    this.intitule = null;
    this.question = null;
    this.reponse = null;
    this.setQuestion(this.getRndBias(1,1,0,0));    
  }


  getIntitule() {
    return this.intitule;
  }


  getQuestion() {
    return this.question;
  }


  getReponse() {
    return this.reponse;
  }


  setIntitule(i) {
    this.intitule = i;
  }
  

  setQuestion(typeQ) {
    switch (typeQ) { 
      case 1 :
        this.setIntitule("Combien vaut x ? Ramassez le nombre de pièces correspondant !");      
        this.question = this.createEquation();
        this.setReponse(new Reponse(ctrl, this.solveEquation(this.question)));
        break;

      case 2 :
        this.setIntitule("");      
        this.question = this.createBooleen();
        this.setReponse(new Reponse(ctrl, this.solveBooleen(this.question)));
        break;
      default : break;
    }
  }
  
  
  setReponse(r) {
    this.reponse = r;
  }


  getRndBias(min, max, bias, influence) {
    let rnd = Math.random() * (max - min) + min,   // random in range
        mix = Math.random() * influence;           // random mixer
    return Math.floor(rnd * (1 - mix) + bias * mix);           // mix full range and bias
  }


  isInt(value) {
    return Math.round(value) == value;
  }


  createEquation() {
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
      if (this.solveEquation(eq) > 0 && this.isInt(this.solveEquation(eq))) {
        return eq;
      } else {
        return this.createEquation();
      }
    } catch(EvalError) {
      return this.createEquation();
    }
  }


  solveEquation(e) {
    let Fraction = algebra.Fraction;
    let Expression = algebra.Expression;
    let Equation = algebra.Equation;

    let eq = algebra.parse(e);
    let ans = eq.solveFor("x");
    return ans.toString();
  }

  
  repondre(rep) {
    return rep == this.reponse.getReponse();
  }
}