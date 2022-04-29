import * as fs from "fs";

/**
 * @class Watcher
 */
export class Watcher {
  /**
   * Constructor
   * @param usuario nombre del usuario
   * @param ruta ruta del usuario
   * @param argumentos cantidad de argumentos pasados por teclado
   */
  constructor(private usuario: string, private ruta: string,
    private argumentos: number) {}

  /**
   * Método que vigila los cambios en el direcotrio especcificado.
   */
  watch() {
    if (this.argumentos !== 4) {
      console.log("Error en los argumentos, debe pasar 4 argumentos");
      process.exit(1);
    }

    // Miramos que podamos leer del fichero.
    fs.access(this.ruta, fs.constants.F_OK, (error) => {
      if (error) {
        console.log("No se puede acceder al fichero");
        process.exit(1);
      }
      // Si no hay errores, creamos el watcher.
      fs.watch(this.ruta, (evento, archivo) => {
        console.log(`${this.usuario} ha ${evento} el fichero ${archivo}`);
      });
    });
  }
}

const aux = new Watcher(process.argv[2], process.argv[3], process.argv.length);
aux.watch();
