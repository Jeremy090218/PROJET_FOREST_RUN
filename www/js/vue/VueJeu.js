class VueJeu extends Vue{
  constructor(ctrl, type) {
    super(ctrl);

    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.controleur.setVueRendu(this);
  }

  draw(){
    this.ctx.fillStyle = "#a35";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
