import { CanvasLocal } from './canvasLocal.js';
export class Grapher extends CanvasLocal {
    constructor(g, canvas) {
        super(g, canvas);
        this.zoomFactor = 1;
    }
    // Actualiza el zoom recalculando pixelSize
    setZoom(factor) {
        this.zoomFactor = factor;
        this.rWidth = 6 * factor;
        this.rHeight = 4 * factor;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    }
    getZoom() { return this.zoomFactor; }
    clear() {
        this.graphics.clearRect(0, 0, this.maxX + 1, this.maxY + 1);
    }
    // Dibuja la cuadricula
    drawGrid() {
        this.graphics.strokeStyle = 'rgba(180,180,200,0.35)';
        this.graphics.lineWidth = 0.8;
        const xRange = Math.ceil(this.rWidth / 2);
        for (let x = -xRange; x <= xRange; x++) {
            this.drawLine(this.iX(x), 0, this.iX(x), this.maxY);
        }
        const yRange = Math.ceil(this.rHeight / 2);
        for (let y = -yRange; y <= yRange; y++) {
            this.drawLine(0, this.iY(y), this.maxX, this.iY(y));
        }
    }
    // Dibuja los ejes X e Y con marcas y etiquetas
    drawAxes() {
        // Ejes principales
        this.graphics.strokeStyle = '#c8d0e0';
        this.graphics.lineWidth = 1.8;
        this.drawLine(0, this.iY(0), this.maxX, this.iY(0));
        this.drawLine(this.iX(0), 0, this.iX(0), this.maxY);
        // Marcas y numeros en X
        this.graphics.font = '11px monospace';
        this.graphics.fillStyle = '#aab0c0';
        const xRange = Math.ceil(this.rWidth / 2);
        for (let x = -xRange; x <= xRange; x++) {
            if (x === 0)
                continue;
            this.graphics.lineWidth = 1;
            this.graphics.strokeStyle = '#c8d0e0';
            this.drawLine(this.iX(x), this.iY(0) - 5, this.iX(x), this.iY(0) + 5);
            this.graphics.fillText(Number.isInteger(x) ? x.toFixed(0) : x.toFixed(1), this.iX(x) - 6, this.iY(0) + 18);
        }
        // Marcas y numeros en Y
        const yRange = Math.ceil(this.rHeight / 2);
        for (let y = -yRange; y <= yRange; y++) {
            if (y === 0)
                continue;
            this.graphics.lineWidth = 1;
            this.graphics.strokeStyle = '#c8d0e0';
            this.drawLine(this.iX(0) - 5, this.iY(y), this.iX(0) + 5, this.iY(y));
            this.graphics.fillText(Number.isInteger(y) ? y.toFixed(0) : y.toFixed(1), this.iX(0) + 8, this.iY(y) + 4);
        }
        // Flechas y etiquetas de ejes
        this.graphics.fillStyle = '#8890a8';
        this.graphics.font = 'bold 13px monospace';
        this.graphics.fillText('x', this.maxX - 14, this.iY(0) - 8);
        this.graphics.fillText('y', this.iX(0) + 8, 14);
    }
    // Grafica una expresion matematica
    // Usa las constantes de Math disponibles sin prefijo
    plotFunction(expr, color = '#f87171') {
        let fn;
        try {
            fn = new Function('x', `const {sin,cos,tan,asin,acos,atan,atan2,sinh,cosh,tanh,
                sqrt,cbrt,abs,log,log2,log10,exp,pow,sign,floor,ceil,round,
                PI,E,LN2,LN10,SQRT2} = Math;
         return ${expr};`);
        }
        catch (_a) {
            throw new Error('Sintaxis invalida');
        }
        this.graphics.strokeStyle = color;
        this.graphics.lineWidth = 2.2;
        this.graphics.beginPath();
        const xStart = -this.rWidth / 2;
        const xEnd = this.rWidth / 2;
        const step = this.rWidth / (this.maxX * 1.5);
        let started = false;
        for (let x = xStart; x <= xEnd; x += step) {
            let y;
            try {
                y = fn(x);
            }
            catch (_b) {
                started = false;
                continue;
            }
            if (!isFinite(y) || isNaN(y)) {
                started = false;
                continue;
            }
            // Clamp verticalmente para no dibujar fuera del canvas
            const py = Math.max(-10, Math.min(this.maxY + 10, this.iY(y)));
            const px = this.iX(x);
            if (!started) {
                this.graphics.moveTo(px, py);
                started = true;
            }
            else {
                this.graphics.lineTo(px, py);
            }
        }
        this.graphics.stroke();
    }
    // Dibuja fondo + cuadricula + ejes
    paint() {
        // Fondo oscuro
        this.graphics.fillStyle = '#12131f';
        this.graphics.fillRect(0, 0, this.maxX + 1, this.maxY + 1);
        this.drawGrid();
        this.drawAxes();
    }
}
