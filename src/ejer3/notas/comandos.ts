import {GestionNota} from './gestionNota';
import * as yargs from 'yargs';

const chalk = require("chalk");


const gestion = new GestionNota();

/**
 * Comando que permite añadir una nota
 */
yargs.command({
  command: 'add',
  describe: 'Añade una nueva nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
        typeof argv.body === 'string' && typeof argv.color === 'string' && 
        (argv.color === 'red' || argv.color === 'green' || argv.color === 'blue'||
        argv.color === 'yellow')) {
      gestion.añadirNota(argv.user, argv.title, argv.body, argv.color);
    } else {
      console.log(chalk.red('Argumentos invalidos, reviselos y vuelva a intentarlo'));
    }
  },
});

/**
 * Comando que permite modificar una nota.
 */
yargs.command({
  command: 'modify',
  describe: 'Modifica una nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' &&
        typeof argv.body === 'string' && typeof argv.color === 'string' && 
        (argv.color === 'red' || argv.color === 'green' || argv.color === 'blue'||
        argv.color === 'yellow')) {
      gestion.modificarNota(argv.user, argv.title, argv.body, argv.color);
    } else {
      console.log(chalk.red('Argumentos invalidos, reviselos y vuelva a intentarlo'));
    }
  },
});

/**
 * Comando que permite leer una nota
 */
yargs.command({
  command: 'read',
  describe: 'Lee una nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      gestion.leerNota(argv.user, argv.title);
    } else {
      console.log(chalk.red('Argumentos invalidos, reviselos y vuelva a intentarlo'));
    }
  },
});

/**
 * Comando que permite listarlas notas
 */
yargs.command({
  command: 'list',
  describe: 'Lista todas las notas',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      console.log(chalk.underline('El usuario ' + argv.user + ' tiene las siguientes notas:'));
      gestion.listarNotas(argv.user);
    } else {
      console.log(chalk.red('Argumentos invalidos, reviselos y vuelva a intentarlo'));
    }
  },
});

/**
 * Comando que permite borrar una nota.
 */
yargs.command({
  command: 'remove',
  describe: 'Elimina una nota',
  builder: {
    user: {
      describe: 'Nombre de usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      gestion.eliminarNota(argv.user, argv.title);
    } else {
      console.log(chalk.red('Argumentos invalidos, reviselos y vuelva a intentarlo'));
    }
  },
});

yargs.parse();
