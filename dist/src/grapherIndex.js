import { Grapher } from './grapher.js';
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
const grapher = new Grapher(ctx, canvas);
let funcType = 'sin';
let zoomLevel = 1;
function redraw() {
    grapher.setZoom(zoomLevel);
    grapher.draw(funcType);
}
// Botones de funciones
document.getElementById('btnSin').addEventListener('click', () => { funcType = 'sin'; redraw(); });
document.getElementById('btnCos').addEventListener('click', () => { funcType = 'cos'; redraw(); });
document.getElementById('btnCuad').addEventListener('click', () => { funcType = 'cuad'; redraw(); });
document.getElementById('btnCub').addEventListener('click', () => { funcType = 'cub'; redraw(); });
document.getElementById('btnLin').addEventListener('click', () => { funcType = 'lin'; redraw(); });
// Zoom
document.getElementById('btnZoomIn').addEventListener('click', () => { zoomLevel *= 0.7; redraw(); });
document.getElementById('btnZoomOut').addEventListener('click', () => { zoomLevel /= 0.7; redraw(); });
document.getElementById('btnReset').addEventListener('click', () => { zoomLevel = 1; redraw(); });
// Dibujo inicial
redraw();
