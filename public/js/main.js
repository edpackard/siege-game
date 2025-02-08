'use strict';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants.js';
import { Game } from './Game.js';

let requiredFPS = 30;
const interval = 1000 / requiredFPS;
const tolerance = 0.1;
let oldTimeStamp = window.performance.now();
let isTuning = false;
const canvasHTML = `<canvas id="gameCanvas" \
  width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}" \ 
  style="border: 1px solid black"> HTML5 not supported on this browser. \
  </canvas>`;
const tuningHTML =
  '<input type="checkbox" id="setBackground" checked/> \
  <label for="setBackground">Background redraw</label><br />\
  vx modifier <input type="number" id="vxmod" value="1" /> \
  time increment <input type="number" id="timeincrement" value="1" /><br /> \
  gravity modifier <input type="number" id="gravitymod" value="0.5" /> \
  vy deceleration <input type="number" id="vydecel" value="0.25" /><br /> \
  <input type="button" id="setTuningButton" value="Set" /><br />';

document.getElementById('canvas').innerHTML = canvasHTML;
const gameCanvasContext = document
  .getElementById('gameCanvas')
  .getContext('2d');
const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);

document.getElementById('tuningButton').addEventListener('click', () => {
  isTuning = !isTuning;
  document.getElementById('tuning').innerHTML = isTuning ? tuningHTML : '';
  if (isTuning) {
    document.getElementById('setTuningButton').addEventListener('click', () => {
      game.setTuningValues({
        background: document.getElementById('setBackground').checked,
        projectile: {
          vxModifier: Number(document.getElementById('vxmod').value),
          timeIncrement: Number(document.getElementById('timeincrement').value),
          gravityModifier: Number(document.getElementById('gravitymod').value),
          vyDeceleration: Number(document.getElementById('vydecel').value),
        },
      });
    });
  }
});

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
