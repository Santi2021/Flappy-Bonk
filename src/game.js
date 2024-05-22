import { Connection, clusterApiUrl } from '@solana/web3.js';

// Configuración de la conexión a Solana
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

async function connectWallet() {
  if ('solana' in window) {
    const provider = window.solana;
    if (provider.isPhantom) {
      try {
        const resp = await provider.connect();
        console.log('Connected to wallet:', resp.publicKey.toString());
      } catch (err) {
        console.error('Wallet connection failed:', err);
      }
    }
  } else {
    alert('Solana wallet not found. Please install Phantom Wallet.');
  }
}

document.getElementById('connect-wallet-button').addEventListener('click', connectWallet);

// Código del juego Flappy Bonk
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables del juego
const bonk = {
  x: 50,
  y: 150,
  width: 20,
  height: 20,
  gravity: 0.6,
  lift: -15,
  velocity: 0
};

const pipes = [];
const pipeWidth = 20;
const pipeGap = 100;
let frameCount = 0;
let score = 0;

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

  if (bonk.y + bonk.height > canvas.height || bonk.y < 0) {
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
    }

    if (
      bonk.x < pipe.x + pipeWidth &&
      bonk.x + bonk.width > pipe.x &&
      (bonk.y < pipe.top || bonk.y + bonk.height > pipe.top + pipeGap)
    ) {
      resetGame();
    }
  }

  if (frameCount % 75 === 0) {
    const pipeTop = Math.floor(Math.random() * (canvas.height - pipeGap));
    pipes.push({
      x: canvas.width,
      top: pipeTop
    });
  }
}

function resetGame() {
  bonk.y = 150;
  bonk.velocity = 0;
  pipes.length = 0;
  score = 0;
  frameCount = 0;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBonk();
  drawPipes();
  drawScore();
}

function update() {
  updateBonk();
  updatePipes();
  frameCount++;
}

// Control del bonk
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    bonk.velocity = bonk.lift;
  }
});

// Iniciar el bucle del juego
setInterval(update, 20);
setInterval(draw, 20);