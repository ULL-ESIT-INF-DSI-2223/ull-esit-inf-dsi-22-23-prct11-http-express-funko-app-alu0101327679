import { Registro } from "./registro.js";
import { Bolsa } from "./bolsa.js";
import { readFile } from "fs";

/**
 * clase registro de fichero JSON, no funciona
 */
export class RegistroJSON extends Registro {
  /**
   * constructor de la clase RegistroJSON
   * @param Bolsa  bolsa de la que se va a leer el fichero
   */
  constructor(Bolsa: Bolsa) {
    super(Bolsa);
  }

  /**
   * metodo que procesa el fichero JSON
   */
  protected pocesar(): void {
    readFile("formato_JSON.json", (err, data) => {
      if (err) {
        console.log(
          "There must be a problem with the file you are trying to read"
        );
      } else {
        this.datos = data.toString();
        this.bolsa = JSON.parse(this.datos);
        // console.log(this.bolsa)
      }
    });
  }
}
