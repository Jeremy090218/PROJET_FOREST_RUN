class VueJeu extends Vue{
  constructor(ctrl, type) {
    super(ctrl, type);

    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    const w = window.innerWidth;
    const h = window.innerHeight;

    const ew = w / Partie.virtualW;
    const eh = h / Partie.virtualH;

    console.log("Echelle:", ew, eh);

    this.canvas.width = w;
    this.canvas.height = h;

    this.ctx.imageSmoothingEnabled = false;

    this.ctx.scale(ew, eh);

    this.controleur.setVueRendu(this);

    //////////////////////////////////////

    this.buttonPause = this.create('button');
    this.add(this.buttonPause);
    this.buttonPause.innerHTML = "";
    this.buttonPause.id= "pauseRunner";
    this.buttonPause.onclick = () => {
      this.controleur.changerVue(new VuePause(this.controleur, this));
      this.controleur.pause();
      this.buttonPause.className= "btnInactif";
      //imagePierre.id = "scorePause"; // <-- c'est quoi ?
    }

  }

  draw(){
    /*this.ctx.fillStyle = "#a35";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);*/

    //this.iterDrawPercpec(this.controleur.partieRendu.getFileRendu());
  }

  EcranPause(){
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "hue";
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 360, 640);
    ctx.restore();
  }

  iterDrawPercpec(arr){
    let affUnique = true;
    const p = this.controleur.partieRendu.getPersonnage();
    for (let i = 0; i < arr.length; ++i) {
      const o = arr[i];
      if(!o.estDetruit()) {
        if(affUnique && o.getY() > p.getY() && !p.mouvementY){
          this.iterDrawPercpecAnim([p]);
          affUnique = false;
        }

        this.ctx.save();
        this.ctx.translate(o.getX(), o.getY());
        this.ctx.scale(o.getZ(), o.getZ());
        this.ctx.translate(-o.getWidth()/2, -o.getHeight());
        this.ctx.drawImage(o.getTexture(), 0, 0);
        this.ctx.restore();
      } else {
        arr.splice(i--, 1);
      }
    }

    if(affUnique) this.iterDrawPercpecAnim([p]);
  }

  iterDrawPercpecAnim(arr){
    for (let i = 0; i < arr.length; ++i) {
      const o = arr[i];
      if(!o.estDetruit()) {
        this.ctx.save();
        this.ctx.translate(o.getX(), o.getY());
        this.ctx.scale(o.getZ(), o.getZ());
        this.ctx.translate(-25, -50);
        this.ctx.drawImage(o.getTexture(), (o.getFrame()*50), 0, 50, 50, 0, 0, 50, 50);
        this.ctx.restore();
      } else {
        arr.splice(i--, 1);
      }
    }
  }

  affBtn(){
    this.buttonPause.className= "";
  }
}
