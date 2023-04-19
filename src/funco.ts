import { Tipo } from "./tipo.js";
import { Genero } from "./genero.js";

/**
 * clase para definir el objeto funco, el cual es la unidad básica de nuestro sistema
 */
export class Funko {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: Tipo;
  genero: Genero;
  franquicia: string;
  numero: number;
  exclusivo: boolean;
  caracteristicasEspeciales: string;
  valorDeMercado: number;

  /**
   * constructor de la clase funko
   * @param id id del funko
   * @param nombre nombre del funko
   * @param descripcion descripcion del funko
   * @param tipo tipo del funko
   * @param genero genero del funko
   * @param franquicia franquicia del funko
   * @param numero numero del funko
   * @param exclusivo si el funko es exclusivo o no
   * @param caracteristicasEspeciales las caracteristicas especiales del funko
   * @param valorDeMercado el valor de mercado del funko
   */
  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    tipo: Tipo,
    genero: Genero,
    franquicia: string,
    numero: number,
    exclusivo: boolean,
    caracteristicasEspeciales: string,
    valorDeMercado: number
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.tipo = tipo;
    this.genero = genero;
    this.franquicia = franquicia;
    this.numero = numero;
    this.exclusivo = exclusivo;
    this.caracteristicasEspeciales = caracteristicasEspeciales;
    this.valorDeMercado = valorDeMercado;
  }

  /**
   * metodo para obtener la informacion del funko
   */
  get id_() {
    return this.id;
  }
  /**
   * metodo para modificar la informacion del funko
   * @param id id del funko
   */
  set id_(id: number) {
    this.id = id;
  }
  /**
   * metodo para obtener la informacion del funko
   */
  get nombre_() {
    return this.nombre;
  }
  /**
   * metodo para modificar la informacion del funko
   * @param nombre nombre del funko
   */
  set nombre_(nombre: string) {
    this.nombre = nombre;
  }
  /**
   * metodo para obtener la informacion del funko
   */
  get descripcion_() {
    return this.descripcion;
  }
  /**
   * metodo para modificar la informacion del funko
   * @param descripcion descripcion del funko
   */
  set descripcion_(descripcion: string) {
    this.descripcion = descripcion;
  }
  /**
   * metodo para obtener la informacion del funko
   */
  get tipo_() {
    return this.tipo;
  }
  /**
   * metodo para modificar la informacion del funko
   * @param tipo tipo del funko
   */
  set tipo_(tipo: Tipo) {
    this.tipo = tipo;
  }
  /**
   * metodo para obtener la informacion del funko
   */
  get genero_() {
    return this.genero;
  }
  /**
   * metodo para modificar la informacion del funko
   * @param genero genero del funko
   */
  set genero_(genero: Genero) {
    this.genero = genero;
  }
  /**
   * metodo para obtener la informacion del funko
   */
  get franquicia_() {
    return this.franquicia;
  }
  /**
   * metodo para modificar la informacion del funko
   * @param franquicia franquicia del funko
   */
  set franquicia_(franquicia: string) {
    this.franquicia = franquicia;
  }
  /**
   * metodo para obtener la informacion del funko
   */
  get numero_() {
    return this.numero;
  }
  /**
   * metodo para modificar la informacion del funko
   * @param numero numero del funko
   */
  set numero_(numero: number) {
    this.numero = numero;
  }
  /**
   * metodo para obtener la informacion del funko
   */
  get exclusivo_() {
    return this.exclusivo;
  }
  /**
   * metodo para modificar la informacion del funko
   * @param exclusivo si el funko es exclusivo o no
   */
  set exclusivo_(exclusivo: boolean) {
    this.exclusivo = exclusivo;
  }
  /**
   * metodo para obtener la informacion del funko
   */
  get caracteristicasEspeciales_() {
    return this.caracteristicasEspeciales;
  }
  /**
   * metodo para modificar la informacion del funko
   * @param caracteristicasEspeciales las caracteristicas especiales del funko
   */
  set caracteristicasEspeciales_(caracteristicasEspeciales: string) {
    this.caracteristicasEspeciales = caracteristicasEspeciales;
  }

  /**
   * metodo para obtener la informacion del funko
   */
  get valorDeMercado_() {
    return this.valorDeMercado;
  }

  /**
   * metodo para modificar el valor de mercado del funko
   */
  set valorDeMercado_(valorDeMercado: number) {
    this.valorDeMercado = valorDeMercado;
  }
}
