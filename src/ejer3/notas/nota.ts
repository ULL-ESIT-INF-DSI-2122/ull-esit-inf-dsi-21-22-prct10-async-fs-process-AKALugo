
/**
 * @type colorType: string
 */
export type colorType = 'red' | 'green' | 'blue' | 'yellow';

/**
 * @class Nota
 */
export class Nota {
  /**
   * Constructor
   * @param titulo titulo de la nota
   * @param cuerpo cuerpo de la nota
   * @param color color de la nota
   */
  constructor(private titulo: string, private cuerpo: string, private color: colorType) {}

  /**
   * Getter
   * @returns el titulo de la nota
   */
  getTitulo(): string {
    return this.titulo;
  }

  /**
   * Getter
   * @returns el cuerpo de la nota
   */
  getCuerpo(): string {
    return this.cuerpo;
  }

  /**
   * Getter
   * @returns el color de la nota
   */
  getColor(): colorType {
    return this.color;
  }

  /**
   * Setter
   * @param titulo nuevo titulo de la nota
   */
  setTitulo(titulo: string): void {
    this.titulo = titulo;
  }

  /**
   * Setter
   * @param cuerpo nuevo cuerpo de la nota
   */
  setCuerpo(cuerpo: string): void {
    this.cuerpo = cuerpo;
  }

  /**
   * Setter
   * @param color nuevo color de la nota
   */
  setColor(color: colorType): void {
    this.color = color;
  }
}
