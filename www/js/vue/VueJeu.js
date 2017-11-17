class VueJeu extends Vue{
  constructor(ctrl, type) {
    super(ctrl);

    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
  }
}
