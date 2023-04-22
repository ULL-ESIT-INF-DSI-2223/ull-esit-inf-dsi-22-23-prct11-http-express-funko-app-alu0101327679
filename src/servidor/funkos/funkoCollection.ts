import fs from "fs";
import path from "path";
import chalk, { ChalkInstance } from "chalk";

import { Funko } from "./funco.js";

/**
 * clase para definir la coleccion de funkos que tenemos en el sistema
 */
export class FuncosCollection {
  /**
   * constructor de la clase funko
   */
  constructor() {}

  /**
   * metodo para almacenar un funko en el fichero
   * @param funko funko a almacenar
   */
  public almacenarFunkoUsuario(funko: Funko, usuario: string) {
    const fileName = funko.id + ".json";
    const dirName = usuario.toLowerCase().replace(/\s+/g, "-");
    const filePath = `./funkos/${dirName}/${fileName}`;

    // Comprobamos si el fichero ya existe en el directorio
    if (fs.existsSync(filePath)) {
      console.log(
        chalk.bold.red(
          `Ya existe un Funko con el nombre ${funko.nombre} en el directorio ${dirName}`
        )
      );
      return;
    }

    fs.mkdirSync(`./funkos/${dirName}`, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(funko));
    console.log(
      chalk.green.bold(
        `El Funko "${funko.nombre}" fue almacenado correctamente.`
      )
    );
  }

  /**
   * metodo para eliminar un funko del fichero
   * @param id id del funko a eliminar
   */
  public eliminarFunkoUsuario(id: number, usuario: string) {
    const fileName = id.toString() + ".json";
    const dirName = usuario.toLowerCase().replace(/\s+/g, "-");
    const filePath = `./funkos/${dirName}/${fileName}`;

    try {
      fs.unlinkSync(filePath);
      console.log(
        chalk.green.bold(`El Funko "${id}" fue eliminado correctamente.`)
      );
      return true;
    } catch (error) {
      console.error(
        chalk.red.bold(`Error al intentar eliminar el Funko "${id}"`)
      );
      return false;
    }
  }
  /**
   * metodo para cargar los funkos del usuario
   * @returns array de funkos del usuario
   */
  public cargarFunkosUsuario(usuario: string) {
    const dirName = usuario.toLowerCase().replace(/\s+/g, "-");
    const dirPath = `./funkos/${dirName}`;

    if (fs.existsSync(dirPath)) {
      const fileNames = fs.readdirSync(dirPath);
      const funkos: Funko[] = [];

      fileNames.forEach((fileName: string) => {
        const filePath = `${dirPath}/${fileName}`;
        const fileContent = fs.readFileSync(filePath, "utf8");
        const funko = JSON.parse(fileContent);
        funkos.push(funko);
      });

      return funkos;
    } else {
      return [];
    }
  }

  /**
   * metodo para guardar los funkos del usuario
   */
  public guardarFunkosUsuario(funkos: Funko[], usuario: string) {
    const dirName = usuario.toLowerCase().replace(/\s+/g, "-");
    const dirPath = `./funkos/${dirName}`;

    if (fs.existsSync(dirPath)) {
      const fileNames = fs.readdirSync(dirPath);

      fileNames.forEach((fileName: string) => {
        const filePath = `${dirPath}/${fileName}`;
        fs.unlinkSync(filePath);
      });

      funkos.forEach((funko: Funko) => {
        const fileName = funko.id + ".json";
        const filePath = `./funkos/${dirName}/${fileName}`;
        fs.writeFileSync(filePath, JSON.stringify(funko));
      });
    }
  }

  /**
   * metodo para modificar un funko del fichero
   * @param id id del funko a modificar
   * @param nuevoFunko nuevo funko a almacenar
   */
  public modificarFunkoUsuario(id: number, nuevoFunko: Funko, usuario: string) {
    const dirName = usuario.toLowerCase().replace(/\s+/g, "-");
    const filePath = `./funkos/${dirName}/${id.toString()}.json`;

    if (fs.existsSync(filePath)) {
      const nuevoContenido = JSON.stringify(nuevoFunko);
      fs.writeFileSync(filePath, nuevoContenido, "utf8");
      console.log(
        chalk.bold.green(
          `El Funko "${id.toString()}" ha sido modificado exitosamente.`
        )
      );
    } else {
      console.log(
        chalk.bold.red(
          `No se encontró el archivo del Funko "${id.toString()}".`
        )
      );
    }
  }

  /**
   * metodo para listar los funkos del usuario
   */
  public listarFunkosUsuario(usuario: string) {
    const valorMinimo = 0;
    const valorBajo = 50;
    const valorMedio = 100;
    const valorAlto = 500;

    console.log(chalk.bold("Funkos existentes:"));
    // console.log('');
    let funkos = this.cargarFunkosUsuario(usuario);

    if (funkos.length === 0) {
      console.log(
        chalk.bold.red("No se encontraron funkos para el usuario: " + usuario)
      );
      return false;
    }

    for (const funko of funkos) {
      const valor = funko.valorDeMercado;

      let valorColoreado: string;

      if (valor >= 200) {
        valorColoreado = chalk.green.bold(valor.toFixed(2));
      } else if (valor >= 150) {
        valorColoreado = chalk.yellow.bold(valor.toFixed(2));
      } else if (valor >= 100) {
        valorColoreado = chalk.blue.bold(valor.toFixed(2));
      } else {
        valorColoreado = chalk.red.bold(valor.toFixed(2));
      }

      console.log(
        chalk.bold.magenta(funko.nombre) +
          " - Valor de mercado: " +
          valorColoreado
      );
    }
    return true;
  }

  /**
   * metodo para mostrar un funko del usuario
   * @param id id del funko a mostrar
   */
  public mostrarFunkoUsuario(id: number, usuario: string): boolean {
    const fileName = `${id}.json`;
    const dirName = usuario.toLowerCase().replace(/\s+/g, "-");
    const filePath = `./funkos/${dirName}/${fileName}`;

    try {
      const data = fs.readFileSync(filePath, "utf8");
      const foundFunko = JSON.parse(data);
      console.log(chalk.magenta.bold(`Información del Funko con ID ${id}:`));
      console.log(`Nombre: ${foundFunko.nombre}`);
      console.log(`Descripción: ${foundFunko.descripcion}`);
      console.log(`Tipo: ${foundFunko.tipo}`);
      console.log(`Género: ${foundFunko.genero}`);
      console.log(`Franquicia: ${foundFunko.franquicia}`);
      console.log(`Número: ${foundFunko.numero}`);
      console.log(`Exclusivo: ${foundFunko.exclusivo ? "Sí" : "No"}`);
      console.log(
        `Características especiales: ${foundFunko.caracteristicasEspeciales}`
      );

      const valor = foundFunko.valorDeMercado;
      let color: ChalkInstance;
      if (valor > 200) {
        color = chalk.green;
      } else if (valor >= 150) {
        color = chalk.yellow;
      } else if (valor >= 100) {
        color = chalk.blue;
      } else {
        color = chalk.red;
      }
      console.log(`Valor de mercado: ${color.bold(`$${valor.toFixed(2)}`)}`);
      return true;
    } catch (err) {
      console.log(chalk.red(`No existe un Funko con ID ${id} en la lista.`));
      return false;
    }
  }
}
