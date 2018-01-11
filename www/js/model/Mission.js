class MissionPiece{
  constructor(nb) {
    this.nbPieceD = nb;
    this.nbPiece = nb;
    this.text = "Récupérer " + nb + " pièces " ;
  }
  getNbPieceD(){return this.nbPieceD;}
  enleverPiece(i){
    this.nbPiece = this.nbPiece -i;
    if(this.nbPiece <0){
      this.nbPiece = 0 ;
    }
  }

  verifierMission(){
    return this.nbPiece == 0 ;
  }

  getMission(){
    return this.text + "<br>Restant : "+ this.nbPieceD;
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
  constructor(nb){
    this.nbQ = nb;
    this.nbQuestion = nb ;
    this.text = "Répondre à " + nb + " question " ;
  }
  getNbQ(){return this.nbQ;}
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
    return this.text + "<br>Restant : "+ this.nbQ;
  }
}
