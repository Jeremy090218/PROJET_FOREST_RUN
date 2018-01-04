class PartieShoot extends Partie {
  constructor(ctrl, personnage) {
    super(ctrl, personnage);

    this.personnage.stop();
    this.personnage.setX(Partie.virtualW/2);
    this.personnage.setY(Partie.virtualH);
    this.personnage.setZ(2);
  }
}
