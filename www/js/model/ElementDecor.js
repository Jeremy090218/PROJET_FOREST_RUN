class ElementDecor extends ElementPartie {
  constructor(ctrl,xx, vitesse) {
    if(xx > 180){
      //super(ctrl, "Tree_0_1.png",[{x: xx, y: 300, z: 1}, {x: xx+250, y: 640, z: 10}], vitesse);
      super(ctrl, "Tree_0_1.png",[{x: xx, y: 300, z: 1}, {x: xx+400, y: 800, z: 10}], vitesse);
    }else{
      //super(ctrl, "Tree_0_1.png",[{x: xx, y: 300, z: 1}, {x: xx-250, y: 640, z: 10}], vitesse);
      super(ctrl, "Tree_0_1.png",[{x: xx, y: 300, z: 1}, {x: xx-400, y: 800, z: 10}], vitesse);
    }
  }

  update(){
    super.update();
  }
}


class ElementCiel extends ElementPartie {
  constructor(ctrl,xx,vitesse){
    if(xx > 180){
      super(ctrl, "Nuage_0_1.png",[{x: xx, y: 300, z: 1}, {x: xx+50, y: 0, z: 2}], vitesse);
    }else{
      super(ctrl, "Nuage_0_1.png",[{x: xx, y: 300, z: 1}, {x: xx-50, y: 0, z: 2}], vitesse);
    }

  }

  update(){
    super.update();
  }
}
