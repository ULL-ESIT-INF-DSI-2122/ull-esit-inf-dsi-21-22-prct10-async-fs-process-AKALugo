import {watchFile, constants, accessSync} from "fs";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {EventEmitter} from 'events';

/**
 * @class Clase Modificacion
 */
export class ModificacionEmitter extends EventEmitter {
  /**
   * COnstructor
   * @param fichero nombre del fichero
   * @param columna numero de la columna
   * @param tamaño cantidad de valores pasados por parametro
   */
  constructor(private fichero: string, private columna: string, private tamaño: number) {
    super();
  }

  /**
   * Método que escucha.
   */
  escuchar() {
    // Miramos la cantidad de argumentos.
    if (this.tamaño != 4) {
      console.log("Uso: node modificacion.js <fichero> <columna>");
      process.exit(1);
    }
    const expre = new RegExp(".\\n+.");
    
    // Miramos que podamos leer del fichero.
    try {
      accessSync(this.fichero, constants.R_OK);
    } catch (err) {
      console.log("No se puede acceder al fichero");
      process.exit(1);
    }
    
    // Observamos el fichero para detectar cambios.
    watchFile(this.fichero, (curr, prev) => {
      console.log("El tamaño del fichero ha cambiado, antes era " + prev.size + " y ahora es " + curr.size);
    
      // Sacamos el comando cut.
      const comandoCut: ChildProcessWithoutNullStreams = spawn("cut", ["-d", ',', "-f", this.columna, this.fichero]);
      let informacionCut: string = "";
    
      // Se produce un evento data sobre el cut.
      comandoCut.stdout.on("data", (data) => informacionCut += data);
      
      // Miramos que el fichero no se haya borrado.
      try {
        accessSync(this.fichero, constants.R_OK);
      } catch (err) {
        console.log("No se puede acceder al fichero");
        process.exit(1);
      }
      
      // Cuando el comando cut haya terminado emite un evento de tipo close.
      comandoCut.on("close", () => {
        if (expre.test(informacionCut)) {
          const array: string[] = informacionCut.split(`\n`);
          array.pop();
          console.log(array);
        } else {
          console.log("No hay nada en la columna seleccionada");
        }
      });
    });
  }
}

const mod = new ModificacionEmitter(process.argv[2], process.argv[3], process.argv.length);
mod.escuchar();
