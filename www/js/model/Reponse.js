class Reponse {
  constructor(ctrl, typeP, typeQ, rep) {
    this.ctrl = ctrl;
    this.typeP = typeP;
    this.bonneRep = null;   // Réponse à la question associée
    this.typeQ = null;    // Type de la question associée
    this.reponses = new Array();    // Liste de réponses, incluant la bonne et des fausses, pour le shooter
    this.setBonneRep(rep);
    this.setTypeQ(typeQ);
    if(this.typeP == "shooter") { this.setReponses() };   // Met en place de fausses réponses et l'ajoute à la bonne
  }

//////////////////////// GETTERS ////////////////////////

  getRndBias(min, max, biais, influence) {            // Génère un nombre aléatoire entre min et max, et influencé par un biais plus ou moins fort
    let nb = Math.random() * (max - min) + min;       // nombre entre min et max
    let alter = Math.random() * influence;    // influenceur
    return Math.round(nb * (1 - alter) + biais * alter);      // altération du résultat
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

////////////////////////////////////////////////////////

//////////////////////// SETTERS ///////////////////////

  setBonneRep(rep) {
    this.bonneRep = rep;
  }


  setTypeQ(typeQ) {
    this.typeQ = typeQ;
  }


  setReponses() {
    this.reponses.push(this.bonneRep);    // Ajout de la bonne réponse

    if(this.typeQ == 0 || this.typeQ == 1 || this.typeQ == 2 || this.typeQ == 3) {    // Ces types de questions ont pour réponse un nombre
      for(let i = 0; i < 5; i ++) {   // On génère 5 fausses réponses pour les cibles du shooter
        let fRep = this.getRndBias(parseInt(this.bonneRep)-10,parseInt(this.bonneRep)+10,parseInt(this.bonneRep)+3,0.3);    // Valeur autour de la réponse
        while(this.reponses.includes(fRep) || fRep == this.reponse) {   // Si le résultat est déjà dans reponses on recommence
          fRep = this.getRndBias(parseInt(this.bonneRep)-10,parseInt(this.bonneRep)+10,parseInt(this.bonneRep)+3,0.3);
        }
        this.reponses.push(fRep);
      }

    } else {    // Ces types de question ont pour réponse Vrai ou Faux
                // On fait juste en sorte d'avoir 3 cibles Vrai et trois cibles Faux
      if(this.bonneRep == "Vrai") {
        this.reponses.push("Faux");
      } else {
        this.reponses.push("Vrai");
      }
      this.reponses.push("Vrai");
      this.reponses.push("Vrai");
      this.reponses.push("Faux");
      this.reponses.push("Faux");
    }
  }
}
