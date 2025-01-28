'use strict';

import { getRandomIntegerFromRange } from './utils/get-random-integer-from-range.js';

export class Castle {
  constructor(canvasWidth, canvasHeight) {
    this.width = 50;
    this.height = 40;
    this.x = getRandomIntegerFromRange(
      canvasWidth / 2,
      canvasWidth - this.width
    );
    this.y = canvasHeight - this.height;

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
