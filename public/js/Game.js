'use strict';

import { Projectile } from './Projectile.js';
import { Castle } from './Castle.js';

export class Game {
  constructor(canvasWidth, canvasHeight) {
    this.x = canvasWidth;
    this.y = canvasHeight;
    this.projectile = new Projectile(canvasWidth, canvasHeight);
    this.castle = new Castle(this.x, this.y);
    this.drawBackground = true;
  }

  handleInputs() {
    document.getElementById('fire').onclick = () => {
      const angle = Number(document.getElementById('angle').value);
      const velocity = Number(document.getElementById('velocity').value);
      this.projectile.fire(angle, velocity);
      this.castle.setImpact(false);
    };
  }
  updateObjects() {
    this.projectile.update();
  }

  collisionDetection() {
    this.projectile.checkCollision(this.castle);
  }

  draw(gameCanvasContext) {
    if (this.drawBackground) {
      gameCanvasContext.fillStyle = 'skyBlue';
      gameCanvasContext.fillRect(0, 0, this.x, this.y);
    }

    this.castle.drawObject(gameCanvasContext);
    this.projectile.drawObject(gameCanvasContext);
  }

  setTuningValues(values) {
    this.drawBackground = values.background;
    this.projectile.setTuningValues(values.projectile);
  }
}
