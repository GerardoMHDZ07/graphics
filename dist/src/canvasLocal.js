export class CanvasLocal {
    constructor(g, canvas) {
        this.graphics = g;
        this.rWidth = 6;
        this.rHeight = 4;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = this.maxX / 2;
        this.centerY = this.maxY / 2;
    }
    iX(x) { return Math.round(this.centerX + x / this.pixelSize); }
    iY(y) { return Math.round(this.centerY - y / this.pixelSize); }
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    paint() {
        // Parametros del cuadrado inicial
        let lado = 1;
        let side = 0.95 * lado;
        let sideHalf = 0.5 * side;
        let q = 0.05;
        let p = 1 - q;
        // Dibujar cuadrados en espiral para cada celda de la cuadricula 4x4
        for (let m = 0; m < 4; m++) {
            for (let n = 0; n < 4; n++) {
                // Vertices del cuadrado en coordenadas logicas
                let xA = 1 + n * lado - sideHalf;
                let yA = 1 + m * lado - sideHalf;
                let xB = 1 + n * lado + sideHalf;
                let yB = 1 + m * lado - sideHalf;
                let xC = 1 + n * lado + sideHalf;
                let yC = 1 + m * lado + sideHalf;
                let xD = 1 + n * lado - sideHalf;
                let yD = 1 + m * lado + sideHalf;
                // Centrar la cuadricula en el canvas
                xA -= 2.5;
                xB -= 2.5;
                xC -= 2.5;
                xD -= 2.5;
                yA -= 2.5;
                yB -= 2.5;
                yC -= 2.5;
                yD -= 2.5;
                for (let i = 0; i < 20; i++) {
                    // Dibuja el cuadrado actual
                    this.drawLine(this.iX(xA), this.iY(yA), this.iX(xB), this.iY(yB));
                    this.drawLine(this.iX(xB), this.iY(yB), this.iX(xC), this.iY(yC));
                    this.drawLine(this.iX(xC), this.iY(yC), this.iX(xD), this.iY(yD));
                    this.drawLine(this.iX(xD), this.iY(yD), this.iX(xA), this.iY(yA));
                    // Interpolacion: cada vertice avanza q% hacia el siguiente
                    let xA1 = p * xA + q * xB;
                    let yA1 = p * yA + q * yB;
                    let xB1 = p * xB + q * xC;
                    let yB1 = p * yB + q * yC;
                    let xC1 = p * xC + q * xD;
                    let yC1 = p * yC + q * yD;
                    let xD1 = p * xD + q * xA;
                    let yD1 = p * yD + q * yA;
                    xA = xA1;
                    yA = yA1;
                    xB = xB1;
                    yB = yB1;
                    xC = xC1;
                    yC = yC1;
                    xD = xD1;
                    yD = yD1;
                }
            }
        }
    }
}
