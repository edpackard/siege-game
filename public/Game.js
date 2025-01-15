'use strict';

export class Game {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = canvas.getContext('2d');
  }

  init() {
    window.requestAnimationFrame(() => {
      this.gameLoop();
    });
  }

  gameLoop() {
    this.draw();
    window.requestAnimationFrame(() => {
      this.gameLoop();
    });
  }

  draw() {
    this.context.fillStyle = '#0000ff';
    this.context.fillRect(0, 0, 1024, 768);
  }
}
