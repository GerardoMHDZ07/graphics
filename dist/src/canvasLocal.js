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
    // Convierte coordenadas lógicas a coordenadas de pantalla
    iX(x) {
        return Math.round(this.centerX + x / this.pixelSize);
    }
    iY(y) {
        return Math.round(this.centerY - y / this.pixelSize);
    }
    // Dibuja una línea entre dos puntos en coordenadas de pantalla
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    /**
     * Dibuja cuadrados concéntricos con rotación progresiva.
     * Técnica: interpolación entre vértices para generar espirales de cuadrados.
     *
     * Partimos de un cuadrado y en cada iteración desplazamos cada vértice
     * un porcentaje q hacia el siguiente vértice, creando un efecto de
     * rotación y reducción escalonada.
     */
    drawSpiralingSquares(cx, cy, halfSide, iterations, q, color) {
        const p = 1 - q;
        // Vértices iniciales del cuadrado (en coordenadas lógicas)
        let xA = cx - halfSide;
        let yA = cy + halfSide; // Top-left
        let xB = cx + halfSide;
        let yB = cy + halfSide; // Top-right
        let xC = cx + halfSide;
        let yC = cy - halfSide; // Bottom-right
        let xD = cx - halfSide;
        let yD = cy - halfSide; // Bottom-left
        this.graphics.strokeStyle = color;
        for (let i = 0; i < iterations; i++) {
            // Calcula el grosor de línea decreciente para efecto visual
            const lineWidth = Math.max(0.5, 2.5 - i * (2.0 / iterations));
            this.graphics.lineWidth = lineWidth;
            // Dibuja el cuadrado actual
            this.drawLine(this.iX(xA), this.iY(yA), this.iX(xB), this.iY(yB));
            this.drawLine(this.iX(xB), this.iY(yB), this.iX(xC), this.iY(yC));
            this.drawLine(this.iX(xC), this.iY(yC), this.iX(xD), this.iY(yD));
            this.drawLine(this.iX(xD), this.iY(yD), this.iX(xA), this.iY(yA));
            // Interpola para obtener el siguiente cuadrado (rotado y reducido)
            const xA1 = p * xA + q * xB;
            const yA1 = p * yA + q * yB;
            const xB1 = p * xB + q * xC;
            const yB1 = p * yB + q * yC;
            const xC1 = p * xC + q * xD;
            const yC1 = p * yC + q * yD;
            const xD1 = p * xD + q * xA;
            const yD1 = p * yD + q * yA;
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
    paint() {
        // --- Fondo degradado ---
        const grad = this.graphics.createLinearGradient(0, 0, this.maxX, this.maxY);
        grad.addColorStop(0, '#0f0c29');
        grad.addColorStop(0.5, '#302b63');
        grad.addColorStop(1, '#24243e');
        this.graphics.fillStyle = grad;
        this.graphics.fillRect(0, 0, this.maxX + 1, this.maxY + 1);
        // --- Cuadrado central grande: espiral azul-cyan ---
        this.drawSpiralingSquares(0, 0, 2.8, 40, 0.08, '#00d4ff');
        // --- Cuadrado superior izquierdo: espiral dorada ---
        this.drawSpiralingSquares(-1.8, 1.2, 0.9, 30, 0.1, '#ffd700');
        // --- Cuadrado superior derecho: espiral magenta ---
        this.drawSpiralingSquares(1.8, 1.2, 0.9, 30, 0.1, '#ff6ec7');
        // --- Cuadrado inferior izquierdo: espiral verde ---
        this.drawSpiralingSquares(-1.8, -1.2, 0.9, 30, 0.1, '#39ff14');
        // --- Cuadrado inferior derecho: espiral naranja ---
        this.drawSpiralingSquares(1.8, -1.2, 0.9, 30, 0.1, '#ff7c00');
        // --- Texto decorativo ---
        this.graphics.font = '14px monospace';
        this.graphics.fillStyle = 'rgba(255,255,255,0.5)';
        this.graphics.fillText('Ejercicio 1 – Cuadrados en espiral (interpolación)', 10, this.maxY - 10);
    }
}
