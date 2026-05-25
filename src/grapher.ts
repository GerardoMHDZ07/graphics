import { CanvasLocal } from './canvasLocal.js';

export class Grapher extends CanvasLocal {

  constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    super(g, canvas);
  }

  // Rango visible del canvas
  private xMin(): number { return -this.rWidth  / 2; }
  private xMax(): number { return  this.rWidth  / 2; }
  private yMin(): number { return -this.rHeight / 2; }
  private yMax(): number { return  this.rHeight / 2; }

  // Acercar / alejar
  zoomIn():  void { this.rWidth *= 0.7; this.rHeight *= 0.7; this.recalc(); }
  zoomOut(): void { this.rWidth /= 0.7; this.rHeight /= 0.7; this.recalc(); }
  resetZoom(): void { this.rWidth = 6; this.rHeight = 4; this.recalc(); }

  private recalc(): void {
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
  }

  // Fondo blanco
  private clear(): void {
    this.graphics.fillStyle = 'white';
    this.graphics.fillRect(0, 0, this.maxX + 1, this.maxY + 1);
  }

  // Ejes X e Y con marcas
  private drawAxes(): void {
    this.graphics.strokeStyle = '#333333';
    this.graphics.lineWidth = 1.5;

    // Eje X
    this.drawLine(0, this.iY(0), this.maxX, this.iY(0));
    // Eje Y
    this.drawLine(this.iX(0), 0, this.iX(0), this.maxY);

    // Marcas en X
    this.graphics.fillStyle = '#333333';
    this.graphics.font = '11px sans-serif';
    for (let x = Math.ceil(this.xMin()); x <= Math.floor(this.xMax()); x++) {
      this.drawLine(this.iX(x), this.iY(0) - 5, this.iX(x), this.iY(0) + 5);
      if (x !== 0) {
        this.graphics.fillText(String(x), this.iX(x) - 5, this.iY(0) + 18);
      }
    }

    // Marcas en Y
    for (let y = Math.ceil(this.yMin()); y <= Math.floor(this.yMax()); y++) {
      this.drawLine(this.iX(0) - 5, this.iY(y), this.iX(0) + 5, this.iY(y));
      if (y !== 0) {
        this.graphics.fillText(String(y), this.iX(0) + 8, this.iY(y) + 4);
      }
    }

    // Letras de ejes
    this.graphics.fillStyle = '#333333';
    this.graphics.fillText('x', this.maxX - 12, this.iY(0) - 8);
    this.graphics.fillText('y', this.iX(0) + 8, 12);
  }

  // Evalua la funcion en x segun el tipo
  private fx(x: number, tipo: string): number {
    if (tipo === 'sin')  return Math.sin(x);
    if (tipo === 'cos')  return Math.cos(x);
    if (tipo === 'cuad') return x * x;
    if (tipo === 'cub')  return x * x * x;
    if (tipo === 'lin')  return x;
    return 0;
  }

  // Traza la funcion
  private trazarFuncion(tipo: string): void {
    this.graphics.strokeStyle = 'red';
    this.graphics.lineWidth = 2;

    const paso = (this.xMax() - this.xMin()) / 500; // 500 segmentos

    this.graphics.beginPath();
    let primero = true;

    for (let x = this.xMin(); x <= this.xMax(); x += paso) {
      const y = this.fx(x, tipo);
      if (!isFinite(y) || isNaN(y)) { primero = true; continue; }

      const px = this.iX(x);
      const py = this.iY(y);

      if (primero) { this.graphics.moveTo(px, py); primero = false; }
      else         { this.graphics.lineTo(px, py); }
    }

    this.graphics.stroke();
  }

  // Punto de entrada: limpia y dibuja todo
  draw(tipo: string): void {
    this.clear();
    this.drawAxes();
    this.trazarFuncion(tipo);
  }
}
