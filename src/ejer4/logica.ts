import {spawn} from "child_process";
import * as fs from "fs";

/**
 * @class Logica
 */
export class Logica {
  /**
   * Método que mira si un archivo es un directorio o un fichero.
   * @param ruta ruta del fichero o directorio
   */
  directorioFichero(ruta: string) {
    fs.access(ruta, fs.constants.R_OK, (err) => {
      if (err) {
        console.log("Ha ocurrido algún error con la ruta");
        process.exit(1);
      }
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
    });
  }

  /**
   * Método que crea un nuevo directorio.
   * @param ruta ruta del directorio
   */
  nuevoDirectorio(ruta: string) {
    const mkdirCommand = spawn("mkdir", [ruta]);

    mkdirCommand.stderr.on("data", (data) => {
      console.error(`Ocrrió el siguiente error: ${data}`);
      process.exit(1);
    });
  
    mkdirCommand.on("close", () => {
      console.log(`Se ha creado el directorio ${ruta}`);
    });
  }

  /**
   * Método que lista los ficheros de un directorio.
   * @param ruta ruta del directorio
   */
  listarFicheros(ruta: string) {
    fs.access(ruta, fs.constants.R_OK, (err) => {
      if (err) {
        console.log("Ha ocurrido algún error con la ruta");
        process.exit(1);
      }

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
    });
  }

  /**
   * Método que muestra el contenido de un fichero.
   * @param ruta ruta del fichero
   */
  infoFichero(ruta: string) {
    fs.access(ruta, fs.constants.R_OK, (err) => {
      if (err) {
        console.log("Ha ocurrido algún error con la ruta");
        process.exit(1);
      }

      const catCommand = spawn("cat", [ruta]);
      let datos: string = "";
  
      catCommand.stderr.on("data", (data) => {
        console.error(`Ocrrió el siguiente error: ${data}`);
        process.exit(1);
      });
      
      catCommand.stdout.on("data", (data) => {
        datos += data;
      });
  
      catCommand.on("close", () => {
        console.log(datos);
      });
    });
  }

  /**
   * Método que elimina un fichero o directorio.
   * @param ruta ruta del fichero
   */
  borrarElemento(ruta: string) {
    fs.access(ruta, fs.constants.W_OK, (err) => {
      if (err) {
        console.log("Ha ocurrido algún error con la ruta");
        process.exit(1);
      }
      const rmCommand = spawn("rm", ["-rf", ruta]);

      rmCommand.stderr.on("data", (data) => {
        console.error(`Ocrrió el siguiente error: ${data}`);
        process.exit(1);
      });
  
      rmCommand.on("close", () => {
        console.log(`Se ha borrado el elemento ${ruta}`);
      });
    });
  }

  /**
   * Método que copia un fichero o directorio.
   * @param rutaOrigen ruta del fichero origen
   * @param rutaDestino ruta del fichero destino
   */
  copiarRuta(rutaOrigen: string, rutaDestino: string) {
    fs.access(rutaOrigen, fs.constants.R_OK, (err) => {
      if (err) {
        console.log("Ha ocurrido algún error con la ruta");
        process.exit(1);
      }
      const cpCommand = spawn("cp", ["-r", rutaOrigen, rutaDestino]);

      cpCommand.stderr.on("data", (data) => {
        console.error(`Ocrrió el siguiente error: ${data}`);
        process.exit(1);
      });
  
      cpCommand.on("close", () => {
        console.log(`Se ha copiado el fichero ${rutaOrigen} a ${rutaDestino}`);
      });
    });
  }
}
