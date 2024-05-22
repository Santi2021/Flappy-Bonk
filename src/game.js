const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 480;

let bonk = {
  x: 50,
  y: 150,
  width: 20,
  height: 20,
  gravity: 0.6,
  lift: -15,
  velocity: 0
};

function drawBonk() {
  ctx.fillStyle = '#ff0';
  ctx.fillRect(bonk.x, bonk.y, bonk.width, bonk.height);
}

function update() {
  bonk.velocity += bonk.gravity;
  bonk.y += bonk.velocity;

  if (bonk.y + bonk.height > canvas.height || bonk.y < 0) {
    bonk.y = 150;
    bonk.velocity = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBonk();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', () => {
  bonk.velocity = bonk.lift;
});

gameLoop();

