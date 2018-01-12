// Dans cette classe nous utilisons le script Algebra.js
// Celui-ci permet la création d'expression, d'équation et de fraction mathématiques
// Nous nous en servons pour nos questions sur nos équations et pour le solver inclus


class Question{
  constructor(ctrl, typeP = "runner") {
    this.ctrl = ctrl;
    this.typeP = typeP;      // Runner ou Shooter - Sert dans le choix des questions
    this.intitule = null;   // Intitulé de la question
    this.question = null;   // Enoncé de la question
    this.reponse = null;    // Objet Réponse associé à la question
    this.setQuestion();     // Met en place une question et sa réponse pour la partie
  }

//////////////////////// GETTERS ////////////////////////

  getIntitule() {
    return this.intitule;
  }


  getQuestion() {
    return this.question;
  }


  getReponse() {
    return this.reponse;
  }


  getRndBias(min, max, biais, influence) {            // Génère un nombre aléatoire entre min et max, et influencé par un biais plus ou moins fort
    let nb = Math.random() * (max - min) + min;       // nombre entre min et max
    let alter = Math.random() * influence;    // influenceur
    return Math.round(nb * (1 - alter) + biais * alter);      // altération du résultat
  }


  getRndBoolOperator() {      // Renvoie un opérateur booléen aléatoire
    switch (this.getRndBias(0,1,0,0)) {
        case 0 : return "&&";
        case 1 : return "||";
    }
  }


  getRndBool() {      // Renvoie un booléen et son opposé aléatoirement
    let bool = this.getRndBias(0,1,0,0);
    switch (this.getRndBias(0,10,5,0.1)) {
        case 5 : return "!" + bool;
        default : return bool;
    }
    return "!" + bool;
  }

////////////////////////////////////////////////////////

//////////////////////// SETTERS ///////////////////////

  setIntitule(i) {
    this.intitule = i;
  }


  setQuestion() {
    if(this.typeP == "runner") {    // Choix d'un type de question aléatoire adapté au Runner
      let typeQ = this.getRndBias(0,3,0,0);
      switch (typeQ) {
        case 0 :    // Question sur les équations
          this.setIntitule("Combien vaut x ?");
          this.question = this.createEquation();
          this.setReponse(new Reponse(this.ctrl, this.typeP, typeQ, this.solveEquation(this.question)));
          break;

        case 1 :    // Question sur les restes de division
          this.setIntitule("Quel est le reste de la division ?");
          this.question = this.createDivisionE();
          this.setReponse(new Reponse(this.ctrl, this.typeP, typeQ, this.solveDivisionE(this.question)));
          break;

        case 2 :    // Questions sur les médianes
          this.setIntitule("Combien vaut la médiane ?");
          this.question = this.createMediane();
          this.setReponse(new Reponse(this.ctrl, this.typeP, typeQ, this.solveMediane(this.question)));
          break;

        case 3 :    // Questions sur les boucles
          this.setIntitule("Combien de fois rentre-t-on dans la boucle ?");
          this.question = this.createWhile();
          this.setReponse(new Reponse(this.ctrl, this.typeP, typeQ, this.solveWhile(this.question)));
          break;

        default : break;
      }
    } else {    // Choix d'un type de question aléatoire adapté au Shooter
      let typeQ = this.getRndBias(0,5,0,0);
      switch (typeQ) {
        case 0 :    // Question sur les équations
          this.setIntitule("Combien vaut x ?");
          this.question = this.createEquation();
          this.setReponse(new Reponse(this.ctrl, this.typeP, typeQ, this.solveEquation(this.question)));
          break;

        case 1 :    // Question sur les restes de division
          this.setIntitule("Quel est le reste de la division ?");
          this.question = this.createDivisionE();
          this.setReponse(new Reponse(this.ctrl, this.typeP, typeQ, this.solveDivisionE(this.question)));
          break;

        case 2 :    // Question sur les boucles
          this.setIntitule("Combien de fois rentre-t-on dans la boucle ?");
          this.question = this.createWhile();
          this.setReponse(new Reponse(this.ctrl, this.typeP, typeQ, this.solveWhile(this.question)));
          break;

        case 3 :    // Question sur les puissances
          this.setIntitule("Quel résultat obtient-on ?");
          this.question = this.createPuissance();
          this.setReponse(new Reponse(this.ctrl, this.typeP, typeQ, this.solvePuissance(this.question)));
          break;

        case 4 :    // Question sur les nombres premiers
          this.setIntitule("Ce nombre est-il premier ?");
          this.question = this.createNombrePremier();
          this.setReponse(new Reponse(this.ctrl, this.typeP, typeQ, this.solveNombrePremier(this.question)));
          break;

        case 5 :    // Question sur les équations logiques
          this.setIntitule("Que retourne cette équation logique ?");
          this.question = this.createBooleen();
          this.setReponse(new Reponse(this.ctrl, this.typeP, typeQ, this.solveBooleen(this.question)));
          break;

        default : break;
      }
    }
  }


  setReponse(r) {
    this.reponse = r;
  }

////////////////////////////////////////////////////////

//////////////////////// CREATORS //////////////////////

  createEquation() {    // Crée les questions portant sur les équations
    let Expression = algebra.Expression;

    //// Création des deux expressions pour l'équation (expGauche = expDroite) ////
    let expGauche = new Expression("x");
        expGauche = expGauche.multiply(this.getRndBias(1,10,0,0));
        expGauche = expGauche.add(this.getRndBias(-10,10,0,0.5));

    let expDroite = new Expression("x");
        expDroite = expDroite.multiply(this.getRndBias(-10,10,0,0.75));
        expDroite = expDroite.add(this.getRndBias(-10,10,0,0));

    if(expDroite == expGauche) {    // On ne veut pas de question de type "0 = 0"
      return this.createEquation();
    }

    let eq = expGauche.toString() + " = " + expDroite.toString();

    //// Vérification de la solution, pour obtenir des question simples ////
    try {
      if (this.solveEquation(eq) >= -5 && this.solveEquation(eq) <= 5 && this.isInt(this.solveEquation(eq))) {
        return eq;
      } else {
        return this.createEquation();
      }
    } catch(EvalError) {    // Cas où il n'y a pas de solution
      return this.createEquation();
    }
  }


  createDivisionE() {   // Crée les questions portant sur les restes de division
    let dividende = this.getRndBias(10,30,0,0);
    let diviseur = this.getRndBias(1,10,0,0);
    return dividende + " / " + diviseur;
  }


  createMediane() {   // Crée les questions portant sur les médianes
    return new Array(this.getRndBias(0,10,5,0.5), this.getRndBias(0,10,5,0.5), this.getRndBias(0,10,5,0.5), this.getRndBias(0,10,5,0.5), this.getRndBias(0,10,5,0.5), this.getRndBias(0,10,5,0.5), this.getRndBias(0,10,5,0.5)).join(" - ");
  }


  createWhile() {   // Crée les questions portant sur les boucles
    let i = this.getRndBias(0,10,0,0.5);
    let x = this.getRndBias(1,10,0,0);

    return "i = " + i +", Tant que i <= 10, i = i + " + x;
  }


  createPuissance() {   // Crée les questions portant sur les puissances
    let n = this.getRndBias(1,10,0,0);
    let puissance;
    if(n == 2) {
      puissance = this.getRndBias(0,5,0,0);
    } else {
      puissance = 2;
    }
    return n + " ** " + puissance;
  }


  createNombrePremier() {   // Crée les questions portant sur les équations
    return this.getRndBias(1,50,17,0.5);
  }


  createBooleen() {   // Crée les questions portant sur les équations logiques
    let b = this.getRndBool() + this.getRndBoolOperator() + this.getRndBool() + this.getRndBoolOperator() + this.getRndBool() + this.getRndBoolOperator() + this.getRndBool();    // Ex : 1 && 0 || 0 && !1

    //// PARSER ////
    b = b.replace(/[1]/g,"Vrai");
    b = b.replace(/[0]/g,"Faux");
    b = b.replace(/[&]{2}/g, " ET ");
    b = b.replace(/[|]{2}/g, " OU ");
    b = b.replace(/[!]/g, "non ");

    return b;
  }

////////////////////////////////////////////////////////

//////////////////////// SOLVERS ///////////////////////

  solveEquation(e) {    // Résout les questions portant sur les équations
    let eq = algebra.parse(e);
    let ans = eq.solveFor("x");
    return ans.toString();
  }


  solveDivisionE(d) {   // Résout les questions portant sur les restes de divisions
    let div = d.split(" / ");
    return div[0] % div[1];
  }


  solveMediane(i) {   // Résout les questions portant sur les médianes
    let strMed = i.split("-");
    strMed.sort((a, b) => {  return a - b;  });
    return parseInt(strMed[3]);
  }


  solveWhile(w) {   // Résout les questions portant sur les boucles
    let nbWhile = w.split(/i = (.+)/)[1].split(", Tant que i <= 10, i = i + ");
    return 1 + Math.floor((10-nbWhile[0])/nbWhile[1]);
  }


  solvePuissance(p) {   // Résout les questions portant sur les puissances
    return eval(p);
  }


  solveNombrePremier(n) {   // Résout les questions portant sur les nombres premiers
    for(var i = 2; i <= Math.sqrt(n); i++) {
        if(n % i === 0) return "Faux";
    }
      if(n !== 1) {
        return "Vrai";
      } else {
        return "Faux"
      }
  }


  solveBooleen(b) {   // Résout les questions portant sur les équations logiques
    //// PARSER ////
    b = b.replace(/Vrai/g,"1");
    b = b.replace(/Faux/g,"0");
    b = b.replace(/ET/g, "&&");
    b = b.replace(/OU/g, "||");
    b = b.replace(/non/g, "!");

    if(eval(b)) {
      return "Vrai";
    } else {
      return "Faux";
    }
  }

////////////////////////////////////////////////////////

//////////////////////// AUTRES ////////////////////////

  isInt(value) {    // Vérifie qu'une valeur est bien entière
    return Math.round(value) == value;
  }


  repondre(rep) {   // Vérifie que la réponse de l'utilisateur est la bonne
    return rep == this.reponse.getBonneRep();
  }
}
