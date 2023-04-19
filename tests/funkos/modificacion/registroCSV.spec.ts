import { RegistroCSV } from "../../../src/funkos/modificacion/RegistroCSV.js";
// import { Bolsa } from "../../src/funkos/modificacion/bolsa.js";
import { Bolsa } from "../../../src/funkos/modificacion/bolsa.js";

import { expect } from "chai";

describe("RegistroCSV", () => {
  let registro: RegistroCSV;
  let bolsa: Bolsa;

  it("deberia procesar JSON de forma correcta", () => {
    const bolsa: Bolsa = { capacidad: 0, n_elementos: 0, elementos: [] };
    registro = new RegistroCSV(bolsa);
    registro.run();
  });
});
