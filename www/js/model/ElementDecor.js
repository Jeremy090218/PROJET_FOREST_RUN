class ElementDecor extends ElementPartie {
  constructor(ctrl,xx,decalage, vitesse) {
    super(ctrl, "Tree_0_1.png",[{x: xx, y: 300, z: 1}, {x: xx-decalage, y: 640, z: 10}], vitesse);
  }

  update(){
    super.update();
  }
}
