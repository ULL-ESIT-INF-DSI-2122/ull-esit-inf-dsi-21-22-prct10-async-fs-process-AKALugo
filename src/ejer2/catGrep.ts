import {spawn} from "child_process";
import * as fs from "fs";
import {EventEmitter} from "stream";

/**
 * @class CatGrep
 */
export class CatGrep extends EventEmitter {
  /**
   * Constructor
   * @param fichero nombre del fichero
   * @param palabra palabra a buscar
   * @param metodo metodo a utilizar
   * @param argumentos cantidad de argumentos
   */
  constructor(private fichero: string, private palabra: string, 
      private metodo: string, private argumentos: number) {
    super();
  }

  /**
   * Método que ejecuta el cat y el grep.
   */
  ejecucion(): void {
    if (this.argumentos !== 5) {
      console.log("Error en los argumentos, debe pasar 5 argumentos");
      process.exit(1);
    }
    
    if (this.metodo != "pipe" && this.metodo != "notPipe") {
      console.log("Seleccione una opción válida: pipe/notPipe");
      process.exit(1);
    }

    fs.access(this.fichero, fs.constants.R_OK, (err) => {
      if (err) {
        console.log("No se puede acceder al fichero");
        process.exit(1);
      }
      if (this.metodo == "pipe") {
        this.pipe();
      } else {
        this.notPipe();
      }
    });
  }

  /**
   * método que utiliza pipe.
   */
  private pipe() {
    let datos: string = "";
    const catCommand = spawn("cat", [this.fichero]);
    const grepCommand = spawn("grep", [this.palabra]);

    catCommand.stdout.pipe(grepCommand.stdin);
    grepCommand.stdout.on("data", (data) => {
      datos += data;
    });
    grepCommand.on("close", () => {
      const cantidad = datos.match(new RegExp(`${this.palabra}`, "g"));
      let resultadoEmitido: string = "";
      if (cantidad !== null) {
        resultadoEmitido = `La palabra ${this.palabra} aparece ${cantidad.length} veces`;
        console.log(resultadoEmitido);
      } else {
        resultadoEmitido = `La palabra ${this.palabra} no aparece`;
        console.log(resultadoEmitido);
      }
      this.emit('resultado', resultadoEmitido);
    });
  }

  /**
   * Método que no utuliza pipe.
   */
  private notPipe() {
    let datos: string = "";
    const catCommand = spawn("cat", [this.fichero]);
    const grepCommand = spawn("grep", [this.palabra]);
      
    catCommand.stdout.on("data", (data) => {
      grepCommand.stdin.write(data);
    });

    catCommand.stdout.on("end", () => {
      grepCommand.stdin.end();
    });
      
    grepCommand.stdout.on("data", (data) => {
      datos += data;
    });

    grepCommand.on("close", () => {
      const cantidad = datos.match(new RegExp(`${this.palabra}`, "g"));
      let resultadoEmitido: string = "";
      if (cantidad !== null) {
        resultadoEmitido = `La palabra ${this.palabra} aparece ${cantidad.length} veces`;
        console.log(resultadoEmitido);
      } else {
        resultadoEmitido = `La palabra ${this.palabra} no aparece`;
        console.log(resultadoEmitido);
      }
      this.emit('resultado', resultadoEmitido);
    });
  }
}
