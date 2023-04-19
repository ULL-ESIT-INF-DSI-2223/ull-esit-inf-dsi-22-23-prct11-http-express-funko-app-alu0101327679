import { Bolsa } from "./bolsa.js";

/**
 * calse plantilla
 */
export abstract class Registro {
  protected bolsa: Bolsa;
  protected datos: string;

  constructor(Bag: Bolsa) {
    this.bolsa = Bag;
    this.datos = "";
  }

  public run() {
    this.hook();
    this.pocesar();
    this.hook2();
  }

  protected pocesar() {
    console.log("Procesando...");
  }
  protected hook() {
    console.log("no ha sido procesado");
  }
  protected hook2() {
    console.log("Archivo procesado");
  }
}
