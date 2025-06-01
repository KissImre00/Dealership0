const canvas = document.getElementById('dotCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const spacing = 40;
const dotRadius = 3;
const dots = [];
const strength = 100;
let mouse = { x: -9999, y: -9999 };
let lastMouseMoveTime = Date.now();

function createDots() {
  dots.length = 0;
  for (let y = 0; y < height + spacing; y += spacing) {
    for (let x = 0; x < width + spacing; x += spacing) {
      dots.push({ x, y, baseX: x, baseY: y });
    }
  }
}

createDots();

function drawDots() {
  ctx.clearRect(0, 0, width, height);

  const now = Date.now();
  const mouseIsActive = (now - lastMouseMoveTime < 100);

  dots.forEach(dot => {
    const dx = dot.x - mouse.x;
    const dy = dot.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (mouseIsActive && dist < strength) {
      const angle = Math.atan2(dy, dx);
      const move = (strength - dist) / 10;
      dot.x += Math.cos(angle) * move;
      dot.y += Math.sin(angle) * move;
    } else {
      dot.x += (dot.baseX - dot.x) * 0.035;
      dot.y += (dot.baseY - dot.y) * 0.035;
    }

    // Apply neon glow

    ctx.shadowBlur = 20;
ctx.shadowColor = '#99ff99';
ctx.fillStyle = '#99ff99';


    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
    ctx.fill();

    // Optional: Draw an inner sharper core by disabling the glow
    /*
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dotRadius - 1, 0, Math.PI * 2);
    ctx.fill();
    */
  });

  requestAnimationFrame(drawDots);
}

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  lastMouseMoveTime = Date.now();
});

window.addEventListener('mouseout', () => {
  mouse.x = -9999;
  mouse.y = -9999;
});

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  createDots();
});

drawDots();
