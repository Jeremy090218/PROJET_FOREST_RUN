class Trajectoire {
  constructor(cible, points = [{x: 180, y: 0, z: 0}, {x: Math.random()*360, y: Math.random()*640, z: Math.random()*640}], vitesse =  Math.random(), acc = 1) {
    this.points = points;
    this.vitesse = vitesse/300;
    this.t = 0;
    this.acc = acc/40000;
    this.cible = cible;
  }

////////////////////////////////////////////////////////////////////////////////
/////////////////////// GETTERS ////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
  getPoints(){return this.points;}
  getVitesse(){return this.vitesse;}
/////////////////////////////////////////////////////////////////////////////////
/////////////////////// SETTERS ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  setPoints(i){this.points = i;}
  setVitesse(i){this.vitesse = i;}

  setActionFin(cb){this.cbDestruction = cb;}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  update(){
    this.cible.setX(((1 - this.t) * this.points[0].x) + (this.t * this.points[1].x));
    this.cible.setY(((1 - this.t) * this.points[0].y) + (this.t * this.points[1].y));
    this.cible.setZ(((1 - this.t) * this.points[0].z) + (this.t * this.points[1].z));
    if(this.t < 1) this.t += this.vitesse + this.acc;
    else if(this.cbDestruction) this.cbDestruction();
    this.vitesse += this.acc;
  }
}
