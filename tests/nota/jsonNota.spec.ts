import 'mocha';
import {expect} from "chai";
import {JSONNota} from "../../src/ejer3/notas/jsonNota";
import {Nota} from "../../src/ejer3/notas/nota";

const impNota = new JSONNota(new Nota("Invitados", "ale, sergio, juan", "red"));
describe("Pruebas de la clase JSONNota", () => {
  it('Se puede instanciar un objeto', () => {
      expect(impNota).instanceOf(JSONNota);
  });
  it('Metodo para imprimir una nota', () => {
      expect(impNota.json()).to.eql("{\"titulo\": \"Invitados\", \"cuerpo\": \"ale, sergio, juan\", \"color\": \"red\"}")
  });
})