import 'mocha';
import {expect} from "chai";
import {GestionNota} from "../../src/ejer3/notas/gestionNota";


const gestion = new GestionNota();

describe ("Pruebas clase GestionNota", () => {
    it('Crear una instancia de la clase', () => {
        expect(gestion).instanceOf(GestionNota);
    })
    it('Añadir una nota', () => {
        expect(gestion.añadirNota("ale", "lista verde", "soy una lista verde", "green")).to.eql(true)
    });
    it('Añadir una nota', () => {
        expect(gestion.añadirNota("ale", "lista verde", "soy una lista verde", "green")).to.eql(false)
    });
    it('Modificar una nota', () => {
        expect(gestion.modificarNota("ale", "lista verde", "ahora soy una lista amarilla", "yellow")).to.eql(true)
    });
    it('Modificar una nota que no existe', () => {
        expect(gestion.modificarNota("pedro", "lista verde", "ahora soy una lista amarilla", "yellow")).to.eql(false)
    });
    it('Listar Notas', () => {
        expect(gestion.listarNotas("ale")).to.eql(true)
    });
    it('Listar Notas de un usuario que no existe', () => {
        expect(gestion.listarNotas("pedro")).to.eql(false)
    });
    it('Leer una Nota', () => {
        expect(gestion.leerNota("ale", "lista verde")).to.eql(true)
    });
    it('Leer una Nota no existente', () => {
        expect(gestion.leerNota("ale", "lista negra")).to.eql(false)
    });
    it('Eliminar una Nota', () => {
        expect(gestion.eliminarNota("ale", "lista verde")).to.eql(true)
    });
    it('Eliminar una Nota que no existe', () => {
        expect(gestion.eliminarNota("ale", "lista verde")).to.eql(false)
    });
})