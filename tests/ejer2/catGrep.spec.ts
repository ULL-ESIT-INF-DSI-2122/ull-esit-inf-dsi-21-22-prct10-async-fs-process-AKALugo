import 'mocha';
import {expect} from 'chai';
import {CatGrep} from '../../src/ejer2/catGrep';


describe('CatGrep', () => {
  it('Debería emitir un resultado final, con el metodo pipe', (done) => {
    const auxPipe = new CatGrep("tests/ejer2/prueba.txt", "@types", "pipe", 5);
    auxPipe.ejecucion();

    auxPipe.on('resultado', (message) => {
      expect(message).to.be.eql("La palabra @types aparece 6 veces");
      done();
    });
  });
  it('Debería emitir un resultado final, con el metodo notPipe', (done) => {
    const auxNotPipe = new CatGrep("tests/ejer2/prueba.txt", "@types", "notPipe", 5);
    auxNotPipe.ejecucion();

    auxNotPipe.on('resultado', (message) => {
      expect(message).to.be.eql("La palabra @types aparece 6 veces");
      done();
    });
  });
  it('Debería emitir un error, número incorrecto de elementos', (done) => {
    const auxErrorNumeroElementos = new CatGrep("tests/ejer2/prueba.txt", "@types", "notPipe", 2);
    auxErrorNumeroElementos.ejecucion();

    auxErrorNumeroElementos.on('error', (message) => {
      expect(message).to.be.eql("Error en los argumentos, debe pasar 5 argumentos");
      done();
    });
  });
  it('Debería emitir un error, metodo incorrecto', (done) => {
    const auxErrorMetodo = new CatGrep("tests/ejer2/prueba.txt", "@types", "Metodo", 5);
    auxErrorMetodo.ejecucion();

    auxErrorMetodo.on('error', (message) => {
      expect(message).to.be.eql("Seleccione una opción válida: pipe/notPipe");
      done();
    });
  });
  it('Debería emitir un error, no se puede acceder al fichero', (done) => {
    const auxErrorRuta = new CatGrep("tests/ejer2/prueba.", "@types", "pipe", 5);
    auxErrorRuta.ejecucion();

    auxErrorRuta.on('error', (message) => {
      expect(message).to.be.eql("No se puede acceder al fichero");
      done();
    });
  });
});
