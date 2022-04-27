import 'mocha';
import {expect} from "chai";
import {Nota} from "../../../src/ejer3/notas/nota";

const nota= new Nota("Invitados", "ale, sergio, juan", "red");
describe("Pruebas clase Nota", () => {
    it('Se puede instanciar un objeto', () => {
      expect(nota).instanceOf(Nota);
    });
  describe('Getters', () => {
      it('La nota tiene un titulo', () => {
        expect(nota.getTitulo()).to.eql("Invitados");
      });
      it('La nota tiene un cuerpo', () => {
        expect(nota.getCuerpo()).to.eql("ale, sergio, juan");
      });
      it('La nota tiene un color', () => {
        expect(nota.getColor()).to.eql("red");
      });
  });
    describe('Setters', () => {
      it('Se puede cambiar el titulo a la nota', () => {
        nota.setTitulo("No invitados");
        expect(nota.getTitulo()).to.eql("No invitados");
      });
      it('Se puede cambiar el cuerpo a la nota', () => {
        nota.setCuerpo("ale, sergio, juan, jose");
        expect(nota.getCuerpo()).to.eql("ale, sergio, juan, jose");
      });
      it('Se puede cambiar el color a la nota', () => {
        nota.setColor("blue");
        expect(nota.getColor()).to.eql("blue");
      });
    });
});
