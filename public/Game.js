'use strict';

import { Projectile } from './Projectile.js';

export class Game {
  constructor(canvasWidth, canvasHeight) {
    this.x = canvasWidth;
    this.y = canvasHeight;
    this.projectile = new Projectile();
  }

  handleInputs() {
    document.onclick = () => {
      this.projectile.fire();
    };
  }
  updateObjects(secondsPassedSinceLastLoop) {
    this.projectile.update(secondsPassedSinceLastLoop);
  }

  draw(gameCanvasContext) {
    //background
    gameCanvasContext.fillStyle = 'skyBlue';
    gameCanvasContext.fillRect(0, 0, this.x, this.y);

    this.projectile.drawObject(gameCanvasContext);
  }
}
