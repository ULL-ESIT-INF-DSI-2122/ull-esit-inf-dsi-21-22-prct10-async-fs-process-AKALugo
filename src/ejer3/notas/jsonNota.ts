import {Nota} from "./nota";

/**
 * @class JSON Nota
 */
export class JSONNota {
  /**
   * Coonstructor
   * @param nota objeto de la clase Nota
   */
  constructor(private nota: Nota) {}
  
  /**
  * Metodo que convierte el objeto nota a un string JSON
  * @returns Una cadena de texto con el formato JSON
  */
  json(): string {
    return `{\"titulo\": \"${this.nota.getTitulo()}\", \"cuerpo\": \"${this.nota.getCuerpo()}\", \"color\": \"${this.nota.getColor()}\"}`;
  }
}
