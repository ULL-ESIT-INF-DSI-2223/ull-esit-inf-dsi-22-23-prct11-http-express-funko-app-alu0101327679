import { Registro } from "./registro.js";
import { Bolsa } from "./bolsa.js";
import {readFile} from 'fs';


/**
 * clase REgistro de fichero CSV
 */
export class RegistroCSV extends Registro {

  /**
   * constructor de la clase RegistroCSV
   * @param Bolsa   bolsa de la que se va a leer el fichero
   */
  constructor(Bolsa: Bolsa){
    super(Bolsa)
  }

  /**
   * funcion que procesa el fichero CSV
   */
  protected pocesar(): void {
    readFile('formato_csv.csv', (err, data) => {
      if (err) {
        console.log('There must be a problem with the file you are trying to read');
      } else {
        this.datos = data.toString()  
        let datos = this.datos.split("\n")
        let capacidad = datos[0].split(" ")
        this.bolsa.capacidad = parseInt(capacidad[0])
        this.bolsa.n_elementos = parseInt(datos[1])
        for (let i = 2; i < datos.length; i++) {
          let elemento = datos[i].split(" ")
          let peso = parseInt(elemento[0])
          let valor = parseInt(elemento[1])
          this.bolsa.elementos.push({peso, valor})
        }
        // console.log(this.bolsa)
      }
    });
  }
}