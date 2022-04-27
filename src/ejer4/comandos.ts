import * as yargs from 'yargs';
import {Logica} from './logica';
const chalk = require("chalk");

const gestion = new Logica();

/**
 * COmando que permite hacer un ls -ld
 */
yargs.command({
  command: 'directorio-fichero',
  describe: 'Mira si una ruta concreta es un archivo o un directorio',
  builder: {
    ruta: {
      describe: 'Ruta a analizar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.ruta === 'string') {
      gestion.directorioFichero(argv.ruta);
    } else {
      console.log(chalk.red('Argumentos invalidos, reviselos y vuelva a intentarlo'));
    }
  },
});

/**
 * COmando que permite ejecutar un mkdir
 */
yargs.command({
  command: 'nuevo-directorio',
  describe: 'Crea un nuevo direcotrio',
  builder: {
    ruta: {
      describe: 'Ruta del directorio',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.ruta === 'string') {
      gestion.nuevoDirectorio(argv.ruta);
    } else {
      console.log(chalk.red('Argumentos invalidos, reviselos y vuelva a intentarlo'));
    }
  },
});

/**
 * Comando que permite ejecutar un ls
 */
yargs.command({
  command: 'listar-ficheros',
  describe: 'Lista una serie de ficheros',
  builder: {
    ruta: {
      describe: 'Ruta a analizar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.ruta === 'string') {
      gestion.listarFicheros(argv.ruta);
    } else {
      console.log(chalk.red('Argumentos invalidos, reviselos y vuelva a intentarlo'));
    }
  },
});

/**
 * Comando que permite ejecutar un cat de un fichero.
 */
yargs.command({
  command: 'info-fichero',
  describe: 'Muestra la información de un fichero',
  builder: {
    ruta: {
      describe: 'Ruta del fichero',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.ruta === 'string') {
      gestion.infoFichero(argv.ruta);
    } else {
      console.log(chalk.red('Argumentos invalidos, reviselos y vuelva a intentarlo'));
    }
  },
});

/**
 * Comando que permite ejecutar un rm -rf
 */
yargs.command({
  command: 'borrar-elemento',
  describe: 'Borra un fichero o un directorio',
  builder: {
    ruta: {
      describe: 'Ruta del archivo',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.ruta === 'string') {
      gestion.borrarElemento(argv.ruta);
    } else {
      console.log(chalk.red('Argumentos invalidos, reviselos y vuelva a intentarlo'));
    }
  },
});

/**
 * Comando que permite ejecutar un mv
 */
yargs.command({
  command: 'copiar-ruta',
  describe: 'Copia el contenido de una ruta a otra',
  builder: {
    ruta: {
      describe: 'Ruta del archivo',
      demandOption: true,
      type: 'string',
    },
    nuevaRuta: {
      describe: 'Nueva ruta del archivo',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.ruta === 'string' && typeof argv.nuevaRuta === 'string') {
      gestion.copiarRuta(argv.ruta, argv.nuevaRuta);
    } else {
      console.log(chalk.red('Argumentos invalidos, reviselos y vuelva a intentarlo'));
    }
  },
});

yargs.parse();
