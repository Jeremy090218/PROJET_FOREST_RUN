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
    this.emetteurParticules = new Array();

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
  getFileRendu(){return this.fileRendu;}
  getEmetteurParticules(){return this.emetteurParticules;}

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

  addEmetteurParticules(nb, temps, texture, x, y, z){
    this.emetteurParticules.unshift(new EmetteurParticules(this.controleur, nb, temps, texture, x, y, z));
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
