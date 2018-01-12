class Obstacle extends ElementPartie {
  constructor(ctrl, points, vitesse,monde) {
    if(monde == 0){
      super(ctrl, "Obstacle_1.png", points, vitesse);
    }else if(monde ==1){
      if(Math.random() >0.5){
        super(ctrl, "Rock_1.png", points, vitesse);
      }else{
        super(ctrl, "Rock_2.png", points, vitesse);
      }
    }else if(monde == 2) {
      super(ctrl, "Coco_0.png", points, vitesse);
    } else if (monde == 3) {
      super(ctrl, "Snowman_0.png", points, vitesse);
    }

  }

  update(){
    super.update();
  }
}
