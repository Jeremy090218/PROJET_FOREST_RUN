class ElementDecor extends ElementPartie {
  constructor(ctrl,xx, vitesse,monde) {
    if(monde == 0){
      if(xx > 180){
        super(ctrl, "Tree_0_1.png",[{x: xx, y: 300, z: 1}, {x: xx+400, y: 800, z: 10}], vitesse);
      }else{
        super(ctrl, "Tree_0_1.png",[{x: xx, y: 300, z: 1}, {x: xx-400, y: 800, z: 10}], vitesse);
      }
    }else if(monde == 1){
      if(xx > 180){
        super(ctrl, "Bonsai_droit.png",[{x: xx, y: 300, z: 1}, {x: xx+500, y: 800, z: 8}], vitesse);
      }else{
        super(ctrl, "Bonsai_gauche.png",[{x: xx, y: 300, z: 1}, {x: xx-500, y: 800, z: 8}], vitesse);
      }
    }else if(monde ==2){
      if(xx > 180){
        if(Math.random()>0.5){
          super(ctrl, "Palmier_gauche.png",[{x: xx, y: 300, z: 1}, {x: xx+400, y: 800, z: 10}], vitesse);
        }else{
          super(ctrl, "Tree_1_2.png",[{x: xx, y: 300, z: 1}, {x: xx+400, y: 800, z: 10}], vitesse);
        }

      }else{
        if(Math.random()>0.5){
          super(ctrl, "Palmier_droit.png",[{x: xx, y: 300, z: 1}, {x: xx-400, y: 800, z: 10}], vitesse);
        }else{
          super(ctrl, "Tree_1_2.png",[{x: xx, y: 300, z: 1}, {x: xx-400, y: 800, z: 10}], vitesse);
        }
      }
    } else if (monde == 3) {
      if(xx > 180){
        super(ctrl, "Tree_1_1.png",[{x: xx, y: 300, z: 1}, {x: xx+400, y: 800, z: 10}], vitesse);
      }else{
        super(ctrl, "Tree_1_1.png",[{x: xx, y: 300, z: 1}, {x: xx-400, y: 800, z: 10}], vitesse);
      }
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

class ElementRoute extends ElementPartie {
  constructor(ctrl,vitesse, monde){
      super(ctrl, "Ground_0_1_3D.png",[{x: 180, y: 300, z: 0.1}, {x: 180, y: 900, z: 10}], vitesse);
  }

  update(){
    super.update();
  }
}
