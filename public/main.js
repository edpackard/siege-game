'use strict';

import { Game } from './Game.js';

const gameCanvas = document.getElementById('canvas');
const gameCanvasContext = gameCanvas.getContext('2d');
const game = new Game(gameCanvas.width, gameCanvas.height);
let secondsPassedSinceLastLoop = 0;
let oldTimestamp = 0;

const gameLoop = (timestamp) => {
  secondsPassedSinceLastLoop = (timestamp - oldTimestamp) / 1000;
  oldTimestamp = timestamp;

  game.handleInputs();
  game.updateObjects(secondsPassedSinceLastLoop);
  game.draw(gameCanvasContext);

  window.requestAnimationFrame(gameLoop);
};

window.onload = window.requestAnimationFrame(gameLoop);
