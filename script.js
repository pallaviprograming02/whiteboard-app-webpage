const canvas = document.getElementById('whiteboard');
const context = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const lineWidth = document.getElementById('lineWidth');
const clearButton = document.getElementById('clearButton');

let drawing = false;
let lastX = 0;
let lastY = 0;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  canvas.width = rect.width;
  canvas.height = rect.height;
  context.putImageData(imageData, 0, 0);
}

function startDrawing(event) {
  drawing = true;
  const { x, y } = getPointerPosition(event);
  lastX = x;
  lastY = y;
}

function stopDrawing() {
  drawing = false;
}

function getPointerPosition(event) {
  const rect = canvas.getBoundingClientRect();
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  const clientY = event.touches ? event.touches[0].clientY : event.clientY;
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}

function draw(event) {
  if (!drawing) return;
  const { x, y } = getPointerPosition(event);

  context.strokeStyle = colorPicker.value;
  context.lineWidth = lineWidth.value;
  context.lineCap = 'round';
  context.lineJoin = 'round';

  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(x, y);
  context.stroke();

  lastX = x;
  lastY = y;
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', resizeCanvas);
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('touchstart', startDrawing, { passive: true });
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw, { passive: true });
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);
canvas.addEventListener('touchend', stopDrawing);

clearButton.addEventListener('click', clearCanvas);

resizeCanvas();
