class Partie {
  constructor(ctrl, perso) {
    if (!Partie.virtualW || !Partie.virtualH) {
      Partie.virtualW = 360;
      Partie.virtualH = 640;
    }

    this.controleur = ctrl;
    this.personnage = perso;
    this.questions = new Array();
    this.elementsDecors = new Array();

    this.fileRendu = new Array();

    this.controleur.play();
  }



////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GETTERS /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  getPersonnage(){return this.personnage;}
  getControleur(){return this.controleur;}
  getQuestions(){return this.questions;}
  getElementsDecors(){return this.elementsDecors;}
  getFileRendu(){return this.fileRendu}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SETTERS /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  setPersonnage(i){this.personnage = i;}
  setConstroleur(i){this.controleur = i;}
  //setQuestions(i){this.questions = i;}
  //setElementsDecors(i){this.elementsDecors = i;}
  //dQuestion(q){this.questions.unshift(q);}
  //addElementDecor(e){this.elementsDecors.unshift(e);}
  setFileRendu(i){this.fileRendu=i;}

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
