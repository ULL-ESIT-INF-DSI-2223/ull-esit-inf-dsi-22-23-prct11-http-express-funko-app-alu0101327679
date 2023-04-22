import { spawn } from "child_process";
import express from "express";
import { Server } from "http";
import { Tipo } from "./funkos/tipo.js";
import { Genero } from "./funkos/genero.js";
import { isNumberObject } from "util/types";

export type FunkoPop = {
  id: number;
  name: string;
  description: string;
  tipo: Tipo;
  genero: Genero;
  franquicia: string;
  numero: number;
  exclusivo: boolean;
  caracteristicasEspeciales: string;
  valorDeMercado: number;
};

export type ResponseType = {
  success: boolean;
  funkoPops?: FunkoPop[];
};

export class funkoServer {
  private servidor: Server = new Server();
  private aplicacion: express.Application = express();

  constructor() {
    this.aplicacion.get("/funko", this.ejecutar);
    this.aplicacion.get("*", this.error);
  }

  public encender(port: number) {
    this.servidor = this.aplicacion.listen(port, () => {
      console.log(`Servidor Web escuchando puerto ${port}`);
    });
  }

  public apagar() {
    this.servidor.close();
  }

  private ejecutar = (
    requerimiento: express.Request,
    respuesta: express.Response
  ) => {
    const cmd = requerimiento.query.cmd as string;
    let args: string[] = [];
    if (requerimiento.query.args != undefined) {
      args = (requerimiento.query.args as string).split(/\s+/); //exp reg para separar por 1 o más espacios
    }
    console.log(`comando: ${cmd} ${args}`);
    let linea: string = "";
    let output: string = "";

    if (cmd == "listar") {
      linea = `node dist/funkos/comand.js listar --usuario \"${args[0]}\"`;
     //else if (cmd == "add") {
    //   if (args.length == 0) {
    //     respuesta.send({
    //       error: `No se han introducido los datos\n 
    //     Ejemplo de uso: node dist/funkos/comand.js add --id 1 --name "Funko Pop" --description "Funko Pop de prueba" --tipo "Pop" --genero "Animación" --franquicia "Marvel" --numero 1 --exclusivo true --caracteristicasEspeciales "Ninguna" --valorDeMercado 100 --usuario "User1"`,
    //     });
    //   } else {
    //     if (typeof args[0] != typeof 2) {
    //       respuesta.send({
    //         error: `No se ha introducido el id de forma correcta`,
    //       });
    //     }
    //     if (typeof args[1] != typeof "a") {
    //       respuesta.send({
    //         error: `No se ha introducido el nombre de forma correcta`,
    //       });
    //     }
    //     if (typeof args[2] != typeof "a") {
    //       respuesta.send({
    //         error: `No se ha introducido la descripción de forma correcta`,
    //       });
    //     }
    //     if (typeof args[3] != typeof Tipo) {
    //       respuesta.send({
    //         error: `No se ha introducido el tipo de forma correcta`,
    //       });
    //     }
    //     if (typeof args[4] != typeof Genero) {
    //       respuesta.send({
    //         error: `No se ha introducido el género de forma correcta`,
    //       });
    //     }
    //     if (typeof args[5] != typeof "a") {
    //       respuesta.send({
    //         error: `No se ha introducido la franquicia de forma correcta`,
    //       });
    //     }
    //     if (typeof args[6] != typeof 2) {
    //       respuesta.send({
    //         error: `No se ha introducido el número de forma correcta`,
    //       });
    //     }
    //     if (typeof args[7] != typeof true) {
    //       respuesta.send({
    //         error: `No se ha introducido el exclusivo de forma correcta`,
    //       });
    //     }
    //     if (typeof args[8] != typeof "a") {
    //       respuesta.send({
    //         error: `No se ha introducido las características especiales de forma correcta`,
    //       });
    //     }
    //     if (typeof args[9] != typeof 2) {
    //       respuesta.send({
    //         error: `No se ha introducido el valor de mercado de forma correcta`,
    //       });
    //     }
    //     if (typeof args[10] != typeof "a") {
    //       respuesta.send({
    //         error: `No se ha introducido el usuario de forma correcta`,
    //       });
    //     }
    //   }
    } else {
      linea = cmd
    }

    const comando = spawn(linea ); // ejecuta el comando

    comando.on("error", (salida) => {
      // error por defecto, el comando no se ejecuta
      output += salida;
      // respuesta.status(500).send()
    });

    comando.stderr.on("data", (salida) => {
      // error secundario, error en caso de ejecutar pero no ser capaz de manejar los argumentos
      output += salida;
      // respuesta.status(500).send()
    });

    comando.stdout.on("data", (salida) => {
      // se ejecuta de forma correcta
      output += salida;
      // type = 'output'
    });

    comando.on("close", (code) => {
      // se cierra la llamada
      console.log(`Codigo de salida: ${code}`);

      if (code != 0) {
        respuesta.status(500).send({ error: output });
      } else {
        respuesta.send({ output: output });
      }
    });
  };

  private error = (
    requerimiento: express.Request,
    respuesta: express.Response
  ) => {
    respuesta
      .status(404)
      .send({ error: "No se ha encontrado el recurso solicitado" });
  };
}
new funkoServer().encender(3000);
