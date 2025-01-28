'use strict';

export class Projectile {
  constructor(canvasWidth, canvasHeight) {
    this.fired = false;
    this.impact = false;
    this.projectileSize = 4;

    this.angle = 0; // 90 is north, 0 is east
    this.theta = 0;

    this.xMax = canvasWidth;
    this.yMax = canvasHeight;

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
    this.y0 = this.yMax - this.projectileSize; // y starting position
    this.time = 0;
    this.fired = true;
    this.impact = false;
    this.angle = angle; // implement range 20-80
    this.theta = angle * (Math.PI / 180);
    this.vy = velocity; // implement max 40
    this.vx = velocity * 1 * Math.cos(this.theta);
  }

  update() {
    if (this.y > this.yMax || this.x + this.projectileSize > this.xMax) {
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

  checkCollision(gameObject) {
    if (
      !this.fired ||
      this.x + this.projectileSize < gameObject.x || // projectile does not intersect with left x pos of object
      this.y + this.projectileSize < gameObject.y || // projectile does not intersect with upper y pos of object
      this.x > gameObject.x + gameObject.width // projectile does not intersect with right x pos of object
    )
      return;

    this.impact = true;
    this.fired = false;
    gameObject.setImpact(true);
  }

  drawObject(context) {
    if (this.fired || this.impact) {
      context.fillStyle = this.impact ? 'yellow' : 'black';
      context.fillRect(
        this.x,
        this.y,
        this.projectileSize,
        this.projectileSize
      );
    }
  }
}
