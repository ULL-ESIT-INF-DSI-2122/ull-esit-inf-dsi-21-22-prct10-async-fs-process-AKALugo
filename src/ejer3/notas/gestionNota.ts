import {Nota, colorType} from "./nota";
import {JSONNota} from "./jsonNota";
import * as fs from "fs";

const chalk = require("chalk");

/**
 * @class Gestion Nota
 */
export class GestionNota {
  /**
   * Método que crea una nota.
   * @param usuario nombre del usuario
   * @param titulo titulo de la nota
   * @param cuerpo cuerpo de la nota
   * @param color color de la nota
   * @returns true si se pudo añadir la nota, false si no.
   */
  añadirNota(usuario: string, titulo: string, cuerpo: string, color: colorType): boolean {
    if (!fs.existsSync(`database/${usuario}`)) {
      console.log(`Creando database para el usuario: ${usuario}`);
      
      fs.mkdirSync(`database/${usuario}`, {
        recursive: true,
      });
    }

    if (!fs.existsSync(`database/${usuario}/${titulo}.json`)) {
      const impNota = new JSONNota(new Nota(titulo, cuerpo, color));
      fs.writeFileSync(`database/${usuario}/${titulo}.json`, impNota.json());

      console.log(chalk.green("¡Nueva nota añadida!"));
      return true;
    } else {
      console.log(chalk.red("¡ERROR, ya existe una nota con ese título!"));
      return false;
    }
  }

  /**
   * Método que elimina la nota de un usuario.
   * @param usuario nombre del usuario
   * @param titulo titulo de la nota
   * @returns true si se eliminó la nota, false si no.
   */
  eliminarNota(usuario: string, titulo: string): boolean {
    if (fs.existsSync(`database/${usuario}/${titulo}.json`)) {
      fs.rmSync(`database/${usuario}/${titulo}.json`);
      console.log(chalk.green("¡Nota eliminada!"));

      return true;
    } else {
      console.log(chalk.red(`¡ERROR, no se ha encontrado la nota ${titulo} para el usuario ${usuario}!`));

      return false;
    }
  }

  /**
   * Método que modifica una nota.
   * @param usuario nombre del usuario
   * @param titulo titulo de la nota
   * @param cuerpo cuerpo de la nota
   * @param color color de la nota
   * @returns true si la nota fue modificada, false si no.
   */
  modificarNota(usuario: string, titulo: string, cuerpo: string, color: colorType): boolean {
    if (fs.existsSync(`database/${usuario}/${titulo}.json`)) {
      const impNota = new JSONNota(new Nota(titulo, cuerpo, color));

      fs.writeFileSync(`database/${usuario}/${titulo}.json`, impNota.json());
      console.log(chalk.green("¡Nota modificada!"));

      return true;
    } else {
      console.log(chalk.red(`¡ERROR, no se ha encontrado la nota ${titulo} para el usuario ${usuario}!`));
      return false;
    }
  }

  /**
   * Méto que lista las notas de un usuario.
   * @param usuario nombre del usuario
   * @returns true si el usuario tiene alguna nota, false si no.
   */
  listarNotas(usuario: string) {
    if (fs.existsSync(`database/${usuario}`) && fs.readdirSync(`database/${usuario}`).length > 0 ) {
      fs.readdirSync(`database/${usuario}`).forEach((notas) => {
        const informacionNota = fs.readFileSync(`database/${usuario}/${notas}`);
        const jsonNota = JSON.parse(informacionNota.toString());
        const nota = new Nota(jsonNota.titulo, jsonNota.cuerpo, jsonNota.color);

        console.log(chalk.keyword(nota.getColor())(nota.getTitulo()));
      });

      return true;
    } else {
      console.log(chalk.red("¡ERROR, hubo un problema con el nombre del usuario o el usuario no tiene notas!"));
      return false;
    }
  }

  /**
   * Método que muestra la nota del usuario.
   * @param usuario nombre del usuario
   * @param titulo titulo de la nota
   * @returns true si se pudo encontrar la nota, false si no.
   */
  leerNota(usuario: string, titulo: string) {
    if (fs.existsSync(`database/${usuario}/${titulo}.json`)) {
      const informacionNota = fs.readFileSync(`database/${usuario}/${titulo}.json`);
      const jsonNota = JSON.parse(informacionNota.toString());
      const nota = new Nota(jsonNota.titulo, jsonNota.cuerpo, jsonNota.color);
      
      console.log(chalk.keyword(nota.getColor())(nota.getTitulo()));
      console.log(chalk.keyword(nota.getColor())(nota.getCuerpo()));

      return true;
    } else {
      console.log(chalk.red("¡ERROR, no se ha encontrado la nota!"));
      return false;
    }
  }
}
