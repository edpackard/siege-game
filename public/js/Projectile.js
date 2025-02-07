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
    this.vyDeceleration = 0.25;
    this.vxModifier = 1;

    this.x = 0;
    this.y = 0;
    this.y0 = 0;

    this.gravity = 9.8;
    this.gravityModifier = 0.5;

    this.time = 0;
    this.timeIncrement = 1;
  }

  fire(angle, velocity) {
    this.x = 0;
    this.y = 0;
    this.y0 = this.yMax - this.projectileSize; // y starting position
    this.time = 0;
    this.fired = true;
    this.impact = false;
    this.angle = angle;
    this.theta = angle * (Math.PI / 180);
    this.vy = velocity;
    this.vx = velocity * this.vxModifier * Math.cos(this.theta);
  }

  isFired() {
    return this.fired;
  }

  update() {
    if (this.y > this.yMax || this.x + this.projectileSize > this.xMax) {
      this.fired = false;
    }
    if (this.fired) {
      this.time += this.timeIncrement;
      this.vy -= this.vyDeceleration;
      this.y = this.y0 - this.vy * this.time * Math.sin(this.theta);
      this.y += this.time + this.gravityModifier * this.gravity * this.time; //gravity
      this.x += this.vx;
    }
  }

  checkCollision(gameObject) {
    if (
      !this.fired ||
      this.x + this.projectileSize < gameObject.x || // projectile does not intersect with left x pos of object
      this.y + this.projectileSize < gameObject.y || // projectile does not intersect with upper y pos of object
      this.x > gameObject.x + gameObject.width || // projectile does not intersect with right x pos of object
      this.y > gameObject.y + gameObject.height // projectile does not intersect with lower y post of object
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

  setTuningValues(values) {
    this.vxModifier = values.vxModifier;
    this.timeIncrement = values.timeIncrement;
    this.gravityModifier = values.gravityModifier;
    this.vyDeceleration = values.vyDeceleration;
  }
}
