import { Elemento } from './elemento.js'

/**
 * datos de la bolsa
 */
export type Bolsa = {
  capacidad: number
  n_elementos: number,
  elementos: Elemento[]
}
