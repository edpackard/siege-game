'use strict';

import { Game } from './Game.js';

const gameCanvas = document.getElementById('canvas');
const gameCanvasContext = gameCanvas.getContext('2d');
const game = new Game(gameCanvas.width, gameCanvas.height);

let deltaTime = 0;
let oldTimeStamp = 0;
//let timeElapsed = 0;
let fps = 0;

const gameLoop = (timeStamp) => {
  deltaTime = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;
  //timeElapsed += deltaTime;

  fps = Math.round(1 / deltaTime);
  console.log('FPS:', fps);

  game.handleInputs();
  game.updateObjects();
  game.collisionDetection();
  game.draw(gameCanvasContext);

  window.requestAnimationFrame(gameLoop);
};

window.onload = window.requestAnimationFrame(gameLoop);
