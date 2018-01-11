class Question{
  constructor(ctrl, type = "runner") {
    this.ctrl = ctrl;
    this.typeP = type;
    if(!this.nbType) this.nbType = 4;
    this.intitule = null;
    this.question = null;
    this.reponse = null;
    this.setQuestion();
    //this.setQuestion(i == -1 ? Math.floor(Math.random()*(Question.nbType + 0.99)) : i);

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


  setQuestion() {
    if(this.typeP == "runner") {
      let typeQ = this.getRndBias(0,3,0,0);
      console.log(typeQ);
      switch (typeQ) {
        case 0 :
          this.setIntitule("Combien vaut x ?");
          this.question = this.createEquation();
          this.setReponse(new Reponse(this.ctrl, typeQ, this.solveEquation(this.question)));
          break;

        case 1 :
          this.setIntitule("Quel est le reste de la division ?");
          this.question = this.createDivisionE();
          this.setReponse(new Reponse(this.ctrl, typeQ, this.solveDivisionE(this.question)));
          break;

        case 2 :
          this.setIntitule("Combien vaut la médiane ?");
          this.question = this.createMediane();
          this.setReponse(new Reponse(this.ctrl, typeQ, this.solveMediane(this.question)));
          break;

        case 3 :
          this.setIntitule("Combien de fois rentre-t-on dans la boucle ?");
          this.question = this.createWhile();
          this.setReponse(new Reponse(this.ctrl, typeQ, this.solveWhile(this.question)));
          break;

        default : break;
      }
    } else {
      let typeQ = this.getRndBias(0,5,0,0);
      switch (typeQ) {
        case 0 :
          this.setIntitule("Combien vaut x ?");
          this.question = this.createEquation();
          this.setReponse(new Reponse(this.ctrl, typeQ, this.solveEquation(this.question)));
          break;

        case 1 :
          this.setIntitule("Quel est le reste de la division ?");
          this.question = this.createDivisionE();
          this.setReponse(new Reponse(this.ctrl, typeQ, this.solveDivisionE(this.question)));
          break;

        case 2 :
          this.setIntitule("Combien de fois rentre-t-on dans la boucle ?");
          this.question = this.createWhile();
          this.setReponse(new Reponse(this.ctrl, typeQ, this.solveWhile(this.question)));
          break;

        case 3 :
          this.setIntitule("Quel résultat obtient-on ?");
          this.question = this.createPuissance();
          this.setReponse(new Reponse(this.ctrl, typeQ, this.solvePuissance(this.question)));
          break;

        case 4 :
          this.setIntitule("Ce nombre est-il premier ?");
          this.question = this.createNombrePremier();
          this.setReponse(new Reponse(this.ctrl, typeQ, this.solveNombrePremier(this.question)));
          break;

        default:
          this.setIntitule("Que retourne cette équation logique ?");
          this.question = this.createBooleen();
          this.setReponse(new Reponse(this.ctrl, typeQ, this.solveBooleen(this.question)));
          break;
      }
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

    let expGauche = new Expression("x");
        expGauche = expGauche.multiply(this.getRndBias(1,10,0,0));
        expGauche = expGauche.add(this.getRndBias(-10,10,0,0.5));

    let expDroite = new Expression("x");
        expDroite = expDroite.multiply(this.getRndBias(-10,10,0,0.75));
        expDroite = expDroite.add(this.getRndBias(-10,10,0,0));

    if(expDroite == expGauche) {
      return this.createEquation();
    }

    let eq = expGauche.toString() + " = " + expDroite.toString();

    try {
      if (this.solveEquation(eq) >= -5 && this.solveEquation(eq) <= 5 && this.isInt(this.solveEquation(eq))) {
        return eq;
      } else {
        return this.createEquation();
      }
    } catch(EvalError) {
      return this.createEquation();
    }
  }


  createDivisionE() {
    let dividende = this.getRndBias(10,30,0,0);
    let diviseur = this.getRndBias(1,10,0,0);
    return dividende + " / " + diviseur;
  }


  createPuissance() {
    let n = this.getRndBias(1,10,0,0);
    let puissance;
    if(n == 2) {
      puissance = this.getRndBias(1,5,0,0);
    } else {
      puissance = 2;
    }
    return n + " ** " + puissance;
  }


  createNombrePremier() {
    return this.getRndBias(1,50,0,0);
  }


  createMediane() {
    return new Array(this.getRndBias(0,20,0,0), this.getRndBias(0,20,0,0), this.getRndBias(0,20,0,0), this.getRndBias(0,20,0,0), this.getRndBias(0,20,0,0), this.getRndBias(0,20,0,0), this.getRndBias(0,20,0,0)).join(" - ");
  }


  createBooleen() {
    let b = this.getRndBool() + this.getRndBoolOperator() + this.getRndBool() + this.getRndBoolOperator() + this.getRndBool() + this.getRndBoolOperator() + this.getRndBool();
    return b;
  }


  createWhile() {
    let x = this.getRndBias(10,100,0,0);
    let y = this.getRndBias(1,100,0,0);
    while(x/y > 8) {
      x = this.getRndBias(10,100,0,0);
      y = this.getRndBias(1,100,0,0);
    }

    return "i = 0 - Tant que i <= " + x + ", i = i + " + y;
  }


  solveEquation(e) {
    let Fraction = algebra.Fraction;
    let Expression = algebra.Expression;
    let Equation = algebra.Equation;

    let eq = algebra.parse(e);
    let ans = eq.solveFor("x");
    return ans.toString();
  }


  solveNombrePremier(n) {
    for(var i = 2; i <= Math.sqrt(n); i++) {
        if(n % i === 0) return "Faux";
    }
      if(n !== 1) {
        return "Vrai";
      } else {
        return "Faux"
      }
  }


  solveDivisionE(d) {
    let div = d.split(" / ");
    return div[0] % div[1];
  }


  solvePuissance(p) {
    return eval(p);
  }


  solveMediane(i) {
    let strMed = i.split("-");
    strMed.sort((a, b) => {  return a - b;  });
    return strMed[3];
  }


  solveBooleen(b) {
    if(eval(b)) {
      return "Vrai";
    } else {
      return "Faux";
    }
  }


  solveWhile(w) {
    let nbWhile = w.split(" <= ")[1].split(" + ");
    return Math.floor(nbWhile[0] / nbWhile[2]) + 1;
  }


  repondre(rep) {
    return rep == this.reponse.getBonneRep();
  }
}
