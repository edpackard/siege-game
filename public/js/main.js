'use strict';

import { Game } from './Game.js';

const gameCanvas = document.getElementById('canvas');
const gameCanvasContext = gameCanvas.getContext('2d');
const game = new Game(gameCanvas.width, gameCanvas.height);

let requiredFPS = 30;
const interval = 1000 / requiredFPS;
const tolerance = 0.1;
let oldTimeStamp = window.performance.now();

const gameLoop = (timeStamp) => {
  const deltaTime = timeStamp - oldTimeStamp;

  if (deltaTime >= interval - tolerance) {
    oldTimeStamp = timeStamp;
    game.handleInputs();
    game.updateObjects();
    game.collisionDetection();
    game.draw(gameCanvasContext);

    // const fps = Math.round(1000 / deltaTime);
    // console.log('FPS:', fps);
  }

  window.requestAnimationFrame(gameLoop);
};

window.onload = window.requestAnimationFrame(gameLoop);
