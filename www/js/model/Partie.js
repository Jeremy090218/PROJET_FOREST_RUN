class Partie {
  constructor(ctrl, perso) {
    if (Partie.VirtualW || Partie.virtualH) {
      Partie.VirtualW = 360;
      Partie.virtualH = 640;
    }

    this.controleur = ctrl;
    this.personnage = perso;
    this.questions = new Array();
    this.elementsDecors = new Array();
  }



////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GETTERS /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  getPersonnage(){return this.personnage;}
  getControleur(){return this.controleur;}
  getQuestions(){return this.questions;}
  getElementsDecors(){return this.elementsDecors;}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SETTERS /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  setPersonnage(i){this.personnage = i;}
  setConstroleur(i){this.controleur = i;}
  //setQuestions(i){this.questions = i;}
  //setElementsDecors(i){this.elementsDecors = i;}
  addQuestion(q){this.questions.unshift(q);}
  addElementDecor(e){this.elementsDecors.unshift(e);}

  initElement(){

  }

  updateArray(a){
    for (let i = 0; i < a.length; ++i) {
      if(!a[i].estDetruit()) a[i].update();
      else a.splice(i--, 1);
    }
  }

  update(){
    //console.log("erreur");
  }
}
