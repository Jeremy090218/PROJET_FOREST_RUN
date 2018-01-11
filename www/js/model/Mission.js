class MissionPiece{
  constructor(nb, nbCourant) {
    this.nbPieceD = nb;
    this.nbPiece = nbCourant;
    this.text = "Récupérer " + nb + " pièces " ;
  }
  getNbPieceD(){return this.nbPieceD;}
  getNbPiece(){return this.nbPiece;}
  enleverPiece(i){
    console.log(this.nbPiece, i);
    this.nbPiece = this.nbPiece -i;
    if(this.nbPiece <0){
      this.nbPiece = 0 ;
    }
  }

  verifierMission(){
    return this.nbPiece == 0 ;
  }

  getMission(){
    return this.text + "<br>Restant : "+ this.nbPiece;
  }
}

class MissionScore {
  constructor(nb) {
    this.score = nb ;
  }
  getScore(){return this.score;}
  verifierMission(i){
    return this.score <= i ;
  }

  getMission(){
    return "Atteindre "+ this.score;
  }
}

class MissionQuestion{
  constructor(nb, nbCourant){
    this.nbQ = nb;
    this.nbQuestion = nbCourant;
    this.text = "Répondre à " + nb + " question(s) " ;
  }
  getNbQ(){return this.nbQ;}
  getNbQuestion(){return this.nbQuestion}
  enleverQuestion(i){
    this.nbQuestion = this.nbQuestion -i;
    if(this.nbQuestion <0){
      this.nbQuestion = 0 ;
    }
  }

  verifierMission(){
    return this.nbQuestion == 0 ;
  }

  getMission(){
    return this.text + "<br>Restant : "+ this.nbQuestion;
  }
}
