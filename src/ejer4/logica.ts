import {spawn} from "child_process";
import * as fs from "fs";

export class Logica {
  directorioFichero(ruta: string) {
    const lsCommand = spawn("ls", ["-ld", ruta]);
    let datos: string = "";

    lsCommand.stdout.on("data", (data) => {
      datos += data;
    });

    lsCommand.on("close", () => {
      if (datos[0] === "d") {
        console.log(`El fichero ${ruta} es un directorio`);
      } else {
        console.log(`El fichero ${ruta} es un fichero`);
      }
    });
  }


  nuevoDirectorio(ruta: string) {
    const mkdirCommand = spawn("mkdir", [ruta]);

    mkdirCommand.on("close", () => {
      console.log(`Se ha creado el directorio ${ruta}`);
    });
  }


  listarFicheros(ruta: string) {
    const lsCommand = spawn("ls", [ruta]);
    let datos: string = "";

    lsCommand.stdout.on("data", (data) => {
      datos += data;
    });

    lsCommand.on("close", () => {
      const ficheros: string[] = datos.split(" ");
      ficheros.forEach((fichero) => {
        console.log("- " + fichero);
      });
    });
  }


  infoFichero(ruta: string) {
    const catCommand = spawn("cat", [ruta]);
    let datos: string = "";

    catCommand.stdout.on("data", (data) => {
      datos += data;
    });

    catCommand.stderr.on("data", (data) => {
      console.error(`Ocrrió el siguiente error: ${data}`);
      process.exit(1);
    });

    catCommand.on("close", () => {
      console.log(datos);
    });
  }


  borrarElemento(ruta: string) {
    const rmCommand = spawn("rm", ["-rf", ruta]);

    rmCommand.on("close", () => {
      console.log(`Se ha borrado el elemento ${ruta}`);
    });
  }


  copiarRuta(rutaOrigen: string, rutaDestino: string) {
    const cpCommand = spawn("cp", ["-r", rutaOrigen, rutaDestino]);

    cpCommand.stderr.on("data", (data) => {
      console.error(`Ocrrió el siguiente error: ${data}`);
      process.exit(1);
    });

    cpCommand.on("close", () => {
      console.log(`Se ha copiado el fichero ${rutaOrigen} a ${rutaDestino}`);
    });
  }
}
