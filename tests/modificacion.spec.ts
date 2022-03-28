import 'mocha';
import {expect} from "chai";
import {suma} from "../src/modificacion";

describe('tests', () => {
  it('test', () => {
    expect(suma(4, 5)).to.eql(9);
  });
});
