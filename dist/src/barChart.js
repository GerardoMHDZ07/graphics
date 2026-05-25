import { CanvasLocal } from './canvasLocal.js';
export class BarChart extends CanvasLocal {
    constructor(g, canvas) {
        super(g, canvas);
    }
    // Dibuja el grafico de barras horizontal con los datos recibidos
    draw(datos) {
        if (datos.length === 0)
            return;
        const ancho = this.maxX + 1;
        const alto = this.maxY + 1;
        // --- Fondo blanco ---
        this.graphics.fillStyle = 'white';
        this.graphics.fillRect(0, 0, ancho, alto);
        // --- Margenes ---
        const mIzq = 130; // espacio para etiquetas
        const mDer = 60; // espacio para el valor numerico
        const mTop = 45;
        const mBot = 20;
        const anchoGraf = ancho - mIzq - mDer;
        const altoGraf = alto - mTop - mBot;
        // Valor maximo para escalar
        const maxVal = Math.max(...datos.map(d => d.valor));
        // Altura de cada barra y su separacion
        const espacio = altoGraf / datos.length;
        const altoBarra = espacio * 0.55;
        const offsetBarra = (espacio - altoBarra) / 2;
        // Colores
        const colores = [
            '#4e79a7', '#f28e2b', '#e15759', '#76b7b2',
            '#59a14f', '#edc948', '#b07aa1', '#ff9da7'
        ];
        // --- Linea de base (eje Y izquierdo) ---
        this.graphics.strokeStyle = '#999999';
        this.graphics.lineWidth = 1;
        this.drawLine(mIzq, mTop, mIzq, mTop + altoGraf);
        // --- Barras ---
        datos.forEach((d, i) => {
            const yBarra = mTop + i * espacio + offsetBarra;
            const anchoBarra = (d.valor / maxVal) * anchoGraf;
            const color = colores[i % colores.length];
            // Barra rellena
            this.graphics.fillStyle = color;
            this.graphics.fillRect(mIzq, yBarra, anchoBarra, altoBarra);
            // Etiqueta a la izquierda
            this.graphics.fillStyle = '#222222';
            this.graphics.font = '13px sans-serif';
            this.graphics.textAlign = 'right';
            this.graphics.fillText(d.etiqueta, mIzq - 8, yBarra + altoBarra / 2 + 5);
            // Valor numerico al final de la barra
            this.graphics.fillStyle = '#333333';
            this.graphics.textAlign = 'left';
            this.graphics.fillText(String(d.valor), mIzq + anchoBarra + 6, yBarra + altoBarra / 2 + 5);
        });
        // --- Titulo ---
        this.graphics.fillStyle = '#111111';
        this.graphics.font = 'bold 15px sans-serif';
        this.graphics.textAlign = 'center';
        this.graphics.fillText('Gráfico de Barras Horizontal', ancho / 2, 25);
    }
}
