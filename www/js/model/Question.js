class Question /*extends Element */{
  constructor(ctrl,i) {
    //super(ctrl);
    if(!Question.nbType) Question.nbType = 1;
    this.intitule = null;
    this.question = null;
    this.reponse = null;
    this.setQuestion(i);
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
      case 0 :
        this.setIntitule("Combien vaut x ? Ramassez le nombre de fioles correspondant !");
        this.question = this.createEquation();
        this.setReponse(new Reponse(ctrl, typeQ, this.solveEquation(this.question)));
        break;

      case 1 :
        this.setIntitule("Obtient-on Vrai ou Faux ?");
        this.question = this.createBooleen();
        this.setReponse(new Reponse(ctrl, typeQ, this.solveBooleen(this.question)));
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
    return Math.round(rnd * (1 - mix) + bias * mix);           // mix full range and bias
  }


  getRndBoolOperator() {
    switch (this.getRndBias(0,1,0,0)) {
        case 0 : return "&&";
        case 1 : return "||";
    }
  }


  getRndBool() {
    let bool = this.getRndBias(0,1,0,0);
    switch (this.getRndBias(0,10,0,0)) {
        case 5 : return "!" + bool;
        default : return bool;
    }
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
        //expGauche = expGauche.divide(div);

    let expDroite = new Expression("x");
        expDroite = expDroite.multiply(this.getRndBias(-10,10,0,0.75));
        expDroite = expDroite.add(this.getRndBias(-10,10,0,0));
        //expDroite = expDroite.divide(div);

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


  createBooleen() {
    let b = this.getRndBool() + this.getRndBoolOperator() + this.getRndBool() + this.getRndBoolOperator() + this.getRndBool() + this.getRndBoolOperator() + this.getRndBool();
    return b;
  }


  createNombrePremier() {
    return getRndBias(1,50,0,0);
  }

  createDivisionE() {
    let dividende = getRndBias(10,30,0,0);
    let diviseur = getRndBias(1,10,0,0);
    return dividende + "/" + diviseur;
  }


  solveEquation(e) {
    let Fraction = algebra.Fraction;
    let Expression = algebra.Expression;
    let Equation = algebra.Equation;

    let eq = algebra.parse(e);
    let ans = eq.solveFor("x");
    return ans.toString();
  }


  solveBooleen(b) {
    return eval(b);
  }

  solveNombrePremier(n) {
    for(var i = 2; i <= Math.sqrt(n); i++)
        if(num % i === 0) return false;
      return num !== 1;
    }
  }


  repondre(rep) {
    return rep == this.reponse.getReponse();
  }
}
