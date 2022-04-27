import 'mocha';
import {expect} from 'chai';
import {CatGrep} from '../../src/ejer2/catGrep';

const auxPipe = new CatGrep("prueba.txt", "@types", "pipe", 5);
const auxNotPipe = new CatGrep("prueba.txt", "@types", "notPipe", 5);

describe('CatGrep', () => {
  it('Debería emitir un resultado final, con el metodo pipe', (done) => {
    auxPipe.ejecucion();

    auxPipe.on('resultado', (message) => {
      expect(message).to.be.eql("La palabra @types aparece 6 veces");
      done();
    });
  });
  it('Debería emitir un resultado final, con el metodo notPipe', (done) => {
    auxNotPipe.ejecucion();

    auxNotPipe.on('resultado', (message) => {
      expect(message).to.be.eql("La palabra @types aparece 6 veces");
      done();
    });
  });
});
