import { CanvasLocal } from './canvasLocal.js';

export class Grapher extends CanvasLocal {

  constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    super(g, canvas);
  }

  // Zoom: cambia el rango y recalcula pixelSize
  setZoom(factor: number): void {
    this.rWidth  = 6 * factor;
    this.rHeight = 4 * factor;
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
  }

  // Dibuja los ejes con marcas y etiquetas
  drawAxes(): void {
    this.graphics.strokeStyle = 'black';
    this.graphics.lineWidth = 1;

    // Eje X
    this.drawLine(this.iX(-3), this.iY(0), this.iX(3), this.iY(0));
    // Eje Y
    this.drawLine(this.iX(0), this.iY(2), this.iX(0), this.iY(-2));

    // Marcas y numeros en X
    for (let x = -3; x <= 3; x++) {
      this.drawLine(this.iX(x), this.iY(-0.1), this.iX(x), this.iY(0.1));
      this.graphics.strokeText(x + '', this.iX(x) - 4, this.iY(-0.3));
    }
    // Marcas en Y
    for (let y = -2; y <= 2; y++) {
      this.drawLine(this.iX(-0.1), this.iY(y), this.iX(0.1), this.iY(y));
    }

    // Etiquetas de ejes
    this.graphics.strokeText('X', this.iX(2.9), this.iY(0.2));
    this.graphics.strokeText('Y', this.iX(0.15), this.iY(1.9));
  }

  // La funcion matematica segun el tipo seleccionado
  fx(x: number, tipo: string): number {
    if (tipo === 'sin')  return Math.sin(x);
    if (tipo === 'cos')  return Math.cos(x);
    if (tipo === 'cuad') return x * x;
    if (tipo === 'cub')  return x * x * x;
    if (tipo === 'lin')  return x;
    return 0;
  }

  // Traza la funcion en rojo
  plotFunction(tipo: string): void {
    this.graphics.strokeStyle = 'red';
    this.graphics.lineWidth = 2;
    const paso = 0.05;
    for (let x = -3; x <= 3 - paso; x += paso) {
      const y1 = this.fx(x, tipo);
      const y2 = this.fx(x + paso, tipo);
      if (isFinite(y1) && isFinite(y2)) {
        this.drawLine(this.iX(x), this.iY(y1), this.iX(x + paso), this.iY(y2));
      }
    }
  }

  // Dibuja todo: limpia, ejes y funcion
  draw(tipo: string): void {
    this.graphics.clearRect(0, 0, this.maxX + 1, this.maxY + 1);
    this.drawAxes();
    this.plotFunction(tipo);
  }
}
