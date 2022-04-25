import * as fs from "fs";

export class Watcher {
  constructor(private usuario: string, private ruta: string,
    private argumentos: number) {}

  watch() {
    if (this.argumentos !== 4) {
      console.log("Error en los argumentos, debe pasar 4 argumentos");
      process.exit(1);
    }

    // Miramos que podamos leer del fichero.
    try {
      fs.accessSync(this.ruta, fs.constants.F_OK);
    } catch (err) {
      console.log("Ha ocurrido algñun problema con la ruta");
      process.exit(1);
    }

    fs.watch(this.ruta, (evento, archivo) => {
      console.log(`${this.usuario} ha ${evento} el fichero ${archivo}`);
    });
  }
}

const aux = new Watcher(process.argv[2], process.argv[3], process.argv.length);
aux.watch();
