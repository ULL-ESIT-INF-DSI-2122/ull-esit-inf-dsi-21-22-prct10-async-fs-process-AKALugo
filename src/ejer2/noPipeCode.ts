import {spawn} from "child_process";
import * as fs from "fs";

export default class CatGrepNotPipe {
  constructor(private fichero: string, private palabra: string, 
        private argumentos: number) {}

  ejecucion(): void {
    if (this.argumentos !== 4) {
      console.log("Error en los argumentos, debe pasar 4 argumentos");
      process.exit(1);
    }
      
    // Miramos que podamos leer del fichero.
    try {
      fs.accessSync(this.fichero, fs.constants.R_OK);
    } catch (err) {
      console.log("No se puede acceder al fichero");
      process.exit(1);
    }
      
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
      if (cantidad !== null) {
        console.log(`La palabra ${this.palabra} aparece ${cantidad.length} veces`);
      } else {
        console.log(`La palabra ${this.palabra} no aparece`);
      }
    });
  }
}

const aux = new CatGrepNotPipe(process.argv[2], process.argv[3], process.argv.length);
aux.ejecucion();
