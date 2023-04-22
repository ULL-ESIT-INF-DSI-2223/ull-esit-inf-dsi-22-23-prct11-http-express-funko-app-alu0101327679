import { Funko } from "./funco.js";
import { FuncosCollection } from "./funkoCollection.js";
import { Tipo } from "./tipo.js";
import { Genero } from "./genero.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

/**
 * Se utiliza el paquete yargs para definir comandos y opciones y que permite
 * interactuar con una coleccion de Funkos de un usuario
 */
yargs(hideBin(process.argv))
  /**
   * Comando para almacenar un Funko en la coleccion de un usuario
   */
  .command(
    "mostrar",
    "Mostrar información de un Funko concreto",
    {
      usuario: {
        description: "Propietario del Funko",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID del Funko",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      // let collectionPrueba = new FuncosCollection([], argv.);
      new FuncosCollection().mostrarFunkoUsuario(argv.id, argv.usuario);
    }
  )
  /**
   * Comando para listar los Funkos de un usuario
   */
  .command(
    "listar",
    "Mostrar información de un Funko concreto",
    {
      usuario: {
        description: "Propietario del Funko",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
      // let collectionPrueba = new FuncosCollection([], argv.);
      new FuncosCollection().listarFunkosUsuario(argv.usuario);
    }
  )
  /**
   * Comando para modificar un Funko de un usuario
   */
  .command(
    "modificar",
    "Mostrar información de un Funko concreto",
    {
      usuario: {
        description: "Propietario del Funko",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID del Funko",
        type: "number",
        demand: true,
      },
      nombre: {
        description: "Nombre del Funko",
        type: "string",
        demandOption: true,
      },
      descripcion: {
        description: "Descripción del Funko",
        type: "string",
        demandOption: true,
      },
      tipo: {
        description: "Tipo del Funko",
        type: "string",
        choices: Object.values(Tipo),
        demandOption: true,
      },
      genero: {
        description: "Género del Funko",
        type: "string",
        choices: Object.values(Genero),
        demandOption: true,
      },
      franquicia: {
        description: "Franquicia del Funko",
        type: "string",
        demandOption: true,
      },
      numero: {
        description: "Número del Funko",
        type: "number",
        demandOption: true,
      },
      exclusivo: {
        description: "¿Es exclusivo?",
        type: "boolean",
        default: false,
      },
      caracteristicasEspeciales: {
        description: "Características especiales del Funko",
        type: "string",
        demandOption: true,
      },
      valorDeMercado: {
        description: "Valor de mercado del Funko",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      // let collectionPrueba = new FuncosCollection([], argv.);
      new FuncosCollection().modificarFunkoUsuario(
        argv.id,
        new Funko(
          argv.id,
          argv.nombre,
          argv.descripcion,
          argv.tipo,
          argv.genero,
          argv.franquicia,
          argv.numero,
          argv.exclusivo,
          argv.caracteristicasEspeciales,
          argv.valorDeMercado
        ),
        argv.usuario
      );
    }
  )
  /**
   * Comando para eliminar un Funko de un usuario
   */
  .command(
    "eliminar",
    "Mostrar información de un Funko concreto",
    {
      usuario: {
        description: "Propietario del Funko",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID del Funko",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      new FuncosCollection().eliminarFunkoUsuario(argv.id, argv.usuario);
    }
  )
  /**
   * Comando para añadir un Funko a la coleccion de un usuario
   */
  .command(
    "add",
    "Añadir un nuevo Funko a la lista",
    {
      usuario: {
        description: "Propietario del Funko",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "ID del Funko",
        type: "number",
        demand: true,
      },
      nombre: {
        description: "Nombre del Funko",
        type: "string",
        demandOption: true,
      },
      descripcion: {
        description: "Descripción del Funko",
        type: "string",
        demandOption: true,
      },
      tipo: {
        description: "Tipo del Funko",
        type: "string",
        choices: Object.values(Tipo),
        demandOption: true,
      },
      genero: {
        description: "Género del Funko",
        type: "string",
        choices: Object.values(Genero),
        demandOption: true,
      },
      franquicia: {
        description: "Franquicia del Funko",
        type: "string",
        demandOption: true,
      },
      numero: {
        description: "Número del Funko",
        type: "number",
        demandOption: true,
      },
      exclusivo: {
        description: "¿Es exclusivo?",
        type: "boolean",
        default: false,
      },
      caracteristicasEspeciales: {
        description: "Características especiales del Funko",
        type: "string",
        demandOption: true,
      },
      valorDeMercado: {
        description: "Valor de mercado del Funko",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      const nuevoFunko = new Funko(
        argv.id,
        argv.nombre,
        argv.descripcion,
        argv.tipo,
        argv.genero,
        argv.franquicia,
        argv.numero,
        argv.exclusivo,
        argv.caracteristicasEspeciales,
        argv.valorDeMercado
      );
      new FuncosCollection().almacenarFunkoUsuario(nuevoFunko, argv.usuario);
    }
  )
  .help().argv;

// node dist/funkos/comand.js add --id 4 --usuario "User1" --nombre "paco" --descripcion "funko de paco" --tipo "Pop!" --genero "Animación" --franquicia "Disney" --numero 3 --exclusivo false --caracteristicasEspeciales "funko de paco" --valorDeMercado 300
