import { Grapher } from './grapher.js';

const canvas   = document.getElementById('graphCanvas') as HTMLCanvasElement;
const ctx      = canvas.getContext('2d') as CanvasRenderingContext2D;
const grapher  = new Grapher(ctx, canvas);

const funcInput  = document.getElementById('funcInput')  as HTMLInputElement;
const errorMsg   = document.getElementById('errorMsg')   as HTMLDivElement;
const zoomLabel  = document.getElementById('zoomLabel')  as HTMLSpanElement;
const funcColor  = document.getElementById('funcColor')  as HTMLInputElement;
const presets    = document.getElementById('presets')    as HTMLSelectElement;

let zoomFactor = 1;

function redraw(): void {
  grapher.setZoom(zoomFactor);
  grapher.paint();
  zoomLabel.textContent = (1 / zoomFactor).toFixed(2) + 'x';

  const expr = funcInput.value.trim();
  if (!expr) return;

  try {
    grapher.plotFunction(expr, funcColor.value);
    errorMsg.style.display = 'none';
  } catch {
    errorMsg.style.display = 'block';
  }
}

// Botones
document.getElementById('btnPlot').addEventListener('click', redraw);

document.getElementById('btnZoomIn').addEventListener('click', () => {
  zoomFactor *= 0.65;
  redraw();
});

document.getElementById('btnZoomOut').addEventListener('click', () => {
  zoomFactor /= 0.65;
  redraw();
});

document.getElementById('btnReset').addEventListener('click', () => {
  zoomFactor = 1;
  redraw();
});

// Enter en el input
funcInput.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter') redraw();
});

// Zoom con la rueda del mouse
canvas.addEventListener('wheel', (e: WheelEvent) => {
  e.preventDefault();
  zoomFactor = e.deltaY < 0 ? zoomFactor * 0.85 : zoomFactor / 0.85;
  redraw();
}, { passive: false });

// Presets
presets.addEventListener('change', () => {
  if (presets.value) {
    funcInput.value = presets.value;
    redraw();
    presets.value = '';
  }
});

// Dibujo inicial
redraw();
