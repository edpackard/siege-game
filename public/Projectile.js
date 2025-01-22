'use strict';

export class Projectile {
  constructor() {
    this.fired = false;
    this.projectileSize = 7;

    this.angle = 0; // 90 is north, 0 is east
    this.theta = 0;

    this.vy = 0;
    this.vx = 0;

    this.x = 0;
    this.y = 0;
    this.y0 = 0;

    this.gravity = 9.8;

    this.time = 0;
  }

  fire(angle, velocity) {
    this.x = 0;
    this.y = 0;
    this.y0 = 768 - this.projectileSize; // y starting position
    this.time = 0;
    this.fired = true;
    this.angle = angle;
    this.theta = angle * (Math.PI / 180);
    this.vy = velocity;
    this.vx = velocity * 1 * Math.cos(this.theta);
  }

  update() {
    if (this.y > 768) {
      this.fired = false;
    }
    if (this.fired) {
      this.time += 1;
      this.vy -= 0.25;
      this.y = this.y0 - this.vy * this.time * Math.sin(this.theta);
      this.y += this.time + 0.5 * this.gravity * this.time;
      this.x += this.vx;
    }
  }

  drawObject(context) {
    if (this.fired) {
      context.fillStyle = 'black';
      context.fillRect(
        this.x,
        this.y,
        this.projectileSize,
        this.projectileSize
      );
    }
  }
}
