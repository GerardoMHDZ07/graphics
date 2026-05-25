import { BarChart } from './barChart.js';
const canvas = document.getElementById('barCanvas');
const ctx = canvas.getContext('2d');
const chart = new BarChart(ctx, canvas);
const tbody = document.getElementById('tablaBody');
// Agrega una fila nueva al formulario
function agregarFila(etiqueta = '', valor = '') {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td><input type="text"   class="form-control form-control-sm" placeholder="Etiqueta" value="${etiqueta}"></td>
    <td><input type="number" class="form-control form-control-sm" placeholder="Valor"    value="${valor}" min="0"></td>
    <td><button class="btn btn-sm btn-outline-danger" onclick="this.closest('tr').remove()">✕</button></td>
  `;
    tbody.appendChild(tr);
}
// Lee las filas del formulario y genera el grafico
function graficar() {
    const filas = tbody.querySelectorAll('tr');
    const datos = [];
    filas.forEach(fila => {
        const inputs = fila.querySelectorAll('input');
        const etiq = inputs[0].value.trim();
        const val = parseFloat(inputs[1].value);
        if (etiq && !isNaN(val) && val > 0) {
            datos.push({ etiqueta: etiq, valor: val });
        }
    });
    if (datos.length === 0) {
        alert('Agrega al menos un dato con etiqueta y valor.');
        return;
    }
    chart.draw(datos);
}
// Botones
document.getElementById('btnAgregar').addEventListener('click', () => agregarFila());
document.getElementById('btnGraficar').addEventListener('click', graficar);
// Datos de ejemplo al cargar
agregarFila('Matemáticas', '85');
agregarFila('Física', '72');
agregarFila('Química', '90');
agregarFila('Historia', '60');
agregarFila('Inglés', '78');
// Dibujar con los datos de ejemplo
graficar();
