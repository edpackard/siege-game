'use strict';

export class Castle {
  constructor() {
    this.width = 100;
    this.height = 80;
    this.x = 800;
    this.y = 768 - this.height;

    this.impact = false;
  }

  setImpact(boolean) {
    this.impact = !!boolean;
  }

  drawObject(context) {
    context.fillStyle = this.impact ? 'red' : 'darkgrey';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
