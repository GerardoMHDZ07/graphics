import { Grapher } from './grapher.js';
// Obtener el canvas y crear el graficador
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
const grapher = new Grapher(ctx, canvas);
let funcType = 'sin';
function redraw() {
    grapher.draw(funcType);
}
// Botones de funciones
document.getElementById('btnSin').addEventListener('click', () => { funcType = 'sin'; redraw(); });
document.getElementById('btnCos').addEventListener('click', () => { funcType = 'cos'; redraw(); });
document.getElementById('btnLin').addEventListener('click', () => { funcType = 'lin'; redraw(); });
document.getElementById('btnCuad').addEventListener('click', () => { funcType = 'cuad'; redraw(); });
document.getElementById('btnCub').addEventListener('click', () => { funcType = 'cub'; redraw(); });
// Botones de zoom
document.getElementById('btnZoomIn').addEventListener('click', () => { grapher.zoomIn(); redraw(); });
document.getElementById('btnZoomOut').addEventListener('click', () => { grapher.zoomOut(); redraw(); });
document.getElementById('btnReset').addEventListener('click', () => { grapher.resetZoom(); redraw(); });
// Dibujo inicial
redraw();
