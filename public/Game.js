'use strict';

import { Projectile } from './Projectile.js';

export class Game {
  constructor(canvasWidth, canvasHeight) {
    this.x = canvasWidth;
    this.y = canvasHeight;
    this.projectile = new Projectile();
  }

  handleInputs() {
    document.getElementById('fire').onclick = () => {
      const angle = Number(document.getElementById('angle').value);
      const velocity = Number(document.getElementById('velocity').value);
      this.projectile.fire(angle, velocity);
    };
  }
  updateObjects() {
    this.projectile.update();
  }

  draw(gameCanvasContext) {
    // background
    gameCanvasContext.fillStyle = 'skyBlue';
    gameCanvasContext.fillRect(0, 0, this.x, this.y);

    this.projectile.drawObject(gameCanvasContext);
  }
}
