'use strict';

import { Projectile } from './Projectile.js';
import { Castle } from './Castle.js';

export class Game {
  constructor(canvasWidth, canvasHeight) {
    this.x = canvasWidth;
    this.y = canvasHeight;
    //todo player class
    this.player1 = {
      projectile: new Projectile(canvasWidth, canvasHeight),
    };
    this.castle = new Castle(this.x, this.y);
    this.drawBackground = true;
  }

  handleInputs() {
    document.getElementById('fire').onclick = () => {
      if (!this.player1.projectile.isFired()) {
        const angle = Number(document.getElementById('angle').value);
        const velocity = Number(document.getElementById('velocity').value);
        this.player1.projectile.fire(angle, velocity);
        this.castle.setImpact(false);
      }
    };
  }
  updateObjects() {
    if (this.player1.projectile.isFired()) this.player1.projectile.update();
  }

  collisionDetection() {
    if (this.player1.projectile.isFired())
      this.player1.projectile.checkCollision(this.castle);
  }

  draw(gameCanvasContext) {
    if (this.drawBackground) {
      gameCanvasContext.fillStyle = 'skyBlue';
      gameCanvasContext.fillRect(0, 0, this.x, this.y);
    }

    this.castle.drawObject(gameCanvasContext);

    if (this.player1.projectile.isFired())
      this.player1.projectile.drawObject(gameCanvasContext);
  }

  setTuningValues(values) {
    this.drawBackground = values.background;
    this.player1.projectile.setTuningValues(values.projectile);
  }
}
