// ----------- CONFETTI CELEBRATION -----------
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pieces = [];
const numberOfPieces = 200;

for (let i = 0; i < numberOfPieces; i++) {
  pieces.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 8 + 4,
    speed: Math.random() * 3 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 10 - 5
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of pieces) {
    p.y += p.speed;
    p.rotation += p.rotationSpeed;

    if (p.y > canvas.height) {
      p.y = -p.size;
      p.x = Math.random() * canvas.width;
    }
  }
}

function draw() {
  for (const p of pieces) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation * Math.PI / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
