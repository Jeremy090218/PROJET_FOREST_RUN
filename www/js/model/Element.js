class Element {

  /////// Constructeur D'element avec x y et z par default a 0 ///////////
  constructor(ctrl, texture = null, x = 0 ,y = 0 ,z = 0) {
                                    // Pour donner un id différent à chaques éléments
    if(!Element.id) Element.id = 0;
    this.id = ++Element.id;
    this.setX(x);
    this.setY(y);
    this.setZ(z);

    this.detruit = false;
    this.controleur = ctrl;

    this.setTexture(texture);
  }

////////////////////////////////////////////////////////////////////////////////
////////////////////////  GETTERS  /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  getId(){return this.id;}
  getX(){return this.x;}
  getY(){return this.y;}
  getZ(){return this.z;}
  getTexture(){return this.texture}
////////////////////////////////////////////////////////////////////////////////
////////////////////////  SETTERS  /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
  setId(i){this.id = i;}
  setX(i){this.x = i;}
  setY(i){this.y = i;}
  setZ(i){this.z = i;}
  setTexture(t){this.texture = this.controleur.textures.getObjet(t);}

  update(){}

  detruire(){
    this.detruit = true;
  }

  estDetruit(){
    return this.detruit;
  }
}
