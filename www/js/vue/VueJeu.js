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
  }

  draw(){
    this.ctx.fillStyle = "#a35";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  EcranPause(){
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = "hue";
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 360, 640);
    ctx.restore();
  }
}
