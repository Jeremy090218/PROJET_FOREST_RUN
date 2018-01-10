class EmetteurParticules extends Element {
  constructor(ctrl, nb, temps, texture, x, y, z) {
    super(ctrl, texture, x, y, z);

    this.particules = new Array();
    this.dt = temps / nb;
    this.nb = nb;
    this.tempsActuel = 0;
  }

  getParticules(){
    return this.particules;
  }

  update(){
    if(this.tempsActuel%this.dt == 0 && this.nb-- > 0) {
      this.particules.push({x: this.getX(), y: this.getY(), z: this.getZ(), lifespan: 10 + Math.floor(Math.random()*20), opacite: 1});
    }

    for (let i = 0; i < this.particules.length; ++i) {
      const p = this.particules[i];
      if(p.lifespan){
        p.lifespan--;
        p.x += (Math.random()*2 - 1)*(p.lifespan/2);
        p.y += (Math.random()*2 - 1)*(p.lifespan/2);

        if(p.lifespan < 10) p.opacite -= 0.1;
      } else {
        this.particules.splice(i--, 1);
      }
    }

    if(this.particules.length == 0){
      this.detruire();
    }
  }
}
