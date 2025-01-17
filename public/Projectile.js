'use strict';

export class Projectile {
  constructor() {
    this.x = 510;
    this.y = 761;
    this.vx = 0;
    this.vy = 0;
    this.momentum = 0;
    this.fired = false;
  }

  fire() {
    if (!this.fired) {
      this.fired = true;
      this.momentum = 200;
      this.vy = 1;
    }
  }

  update(secondsPassedSinceLastLoop) {
    this.y =
      this.momentum > 0
        ? (this.y -= this.vy + secondsPassedSinceLastLoop)
        : (this.y += this.vy + secondsPassedSinceLastLoop);

    this.momentum -= 1;

    if (this.y > 761) {
      this.vy = 0;
      this.y = 761;
      this.fired = false;
    }
  }

  drawObject(context) {
    context.fillStyle = 'black';
    context.fillRect(this.x, this.y, 7, 7);
  }
}
