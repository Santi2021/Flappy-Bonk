// Código del juego Flappy Bonk
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables del juego
const bonk = {
  x: 50,
  y: 150,
  width: 20,
  height: 20,
  gravity: 0.2, // Gravedad moderada
  lift: -5, // Fuerza de salto menor
  velocity: 0
};

const pipes = [];
const pipeWidth = 20;
const pipeGap = 100;
let frameCount = 0;
let score = 0;
let isPlaying = false; // Variable para controlar el estado del juego
let gameStartDelay = 100; // Aumentar el retraso inicial para generar obstáculos

function drawBonk() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bonk.x, bonk.y, bonk.width, bonk.height);
}

function drawPipes() {
  ctx.fillStyle = "green";
  for (let i = 0; i < pipes.length; i++) {
    const pipe = pipes[i];
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap);
    console.log(`Drawing pipe at x=${pipe.x}, top=${pipe.top}`);
  }
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

function updateBonk() {
  bonk.velocity += bonk.gravity;
  bonk.y += bonk.velocity;
  console.log(`Bonk position: y=${bonk.y}, velocity=${bonk.velocity}`);

  if (bonk.y + bonk.height > canvas.height || bonk.y < 0) {
    console.log("Collision with canvas boundaries");
    resetGame();
  }
}

function updatePipes() {
  for (let i = 0; i < pipes.length; i++) {
    const pipe = pipes[i];
    pipe.x -= 2;

    if (pipe.x + pipeWidth < 0) {
      pipes.splice(i, 1);
      score++;
      console.log("Pipe passed, score increased");
    }

    if (
      bonk.x < pipe.x + pipeWidth &&
      bonk.x + bonk.width > pipe.x &&
      (bonk.y < pipe.top || bonk.y + bonk.height > pipe.top + pipeGap)
    ) {
      console.log("Collision with pipe");
      resetGame();
    }
  }

  if (frameCount % 75 === 0 && frameCount > gameStartDelay) {
    const pipeTop = Math.floor(Math.random() * (canvas.height - pipeGap - 50)) + 25;
    pipes.push({
      x: canvas.width,
      top: pipeTop
    });
    console.log("New pipe generated at position:", pipeTop);
  }
}

function resetGame() {
  bonk.y = 150;
  bonk.velocity = 0;
  pipes.length = 0;
  score = 0;
  frameCount = 0;
  isPlaying = false;
  console.log("Juego reiniciado");
}

function startGame() {
  isPlaying = true;
  frameCount = 0; // Asegúrate de que el retraso inicial esté activo
  bonk.y = 150;
  bonk.velocity = 0;
  pipes.length = 0;
  score = 0;
  console.log("Juego iniciado");
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBonk();
  drawPipes();
  drawScore();
}

function update() {
  if (isPlaying) {
    updateBonk();
    updatePipes();
    frameCount++;
    console.log(`Frame count: ${frameCount}`);
  }
}

// Control del bonk
document.addEventListener("keydown", function (event) {
  if (event.code === "Space" && isPlaying) {
    bonk.velocity = bonk.lift;
    console.log("Spacebar pressed, Bonk jumps");
  }
});

// Iniciar el bucle del juego
setInterval(update, 20);
setInterval(draw, 20);

// Funcionalidad del botón "Play"
document.getElementById('play-button').addEventListener('click', function () {
  console.log("Botón Play clickeado");
  startGame(); // Iniciar el juego al hacer clic en "Play"
});

