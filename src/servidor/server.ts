import { spawn } from "child_process";
import express from "express";
import { Server } from "http";
import { Tipo } from "./funkos/tipo.js";
import { Genero } from "./funkos/genero.js";
import { FuncosCollection } from "./funkos/funkoCollection.js";
import { Funko } from "./funkos/funco.js";

export type ResponseType = {
  success: boolean;
  funkoPops?: Funko[];
};

export class funkoServer {
  private servidor: Server = new Server();
  private aplicacion: express.Application = express();

  constructor() {
    this.aplicacion.get("/funkos", this.mostrarListar);
    this.aplicacion.post("/funkos", this.add);
    this.aplicacion.delete("/funkos", this.eliminar);
    this.aplicacion.patch("/funkos", this.modificar);

    this.aplicacion.get("*", this.error);
    this.aplicacion.post("*", this.error);
    this.aplicacion.patch("*", this.error);
    this.aplicacion.delete("*", this.error);
  }

  public encender(port: number) {
    this.servidor = this.aplicacion.listen(port, () => {
      console.log(`Servidor Web escuchando puerto ${port}`);
    });
  }

  public apagar() {
    this.servidor.close();
  }

  private mostrarListar = (
    requerimiento: express.Request,
    respuesta: express.Response
  ) => {
    if (requerimiento.query.cmd == undefined) {
      respuesta.status(400).send({ error: "No se ha introducido el comando" });
    } else if (requerimiento.query.cmd == "mostrar") {
      if (requerimiento.query.user == undefined) {
        respuesta
          .status(400)
          .send({ error: "No se ha introducido el usuario" });
      } else if (requerimiento.query.id == undefined) {
        respuesta.status(400).send({ error: "No se ha introducido el id" });
      }
      let funkoPops: Funko[] = [];
      funkoPops = new FuncosCollection().cargarFunkosUsuario(
        requerimiento.query.user as string
      );

      let funko: Funko | undefined = funkoPops.find(
        (funko) => funko.id.toString() == requerimiento.query.id
      );

      if (funko == undefined) {
        respuesta.status(404).send({ error: "No se ha encontrado el recurso" });
      } else {
        respuesta.send({ funko });
      }

      let funkos = new FuncosCollection().guardarFunkosUsuario(
        funkoPops,
        requerimiento.query.user as string,
      );
      
    } else if (requerimiento.query.cmd == "listar") {
      if (requerimiento.query.user == undefined) {
        respuesta
          .status(400)
          .send({ error: "No se ha introducido el usuario" });
      }

      let funkoPops: Funko[] = [];
      funkoPops = new FuncosCollection().cargarFunkosUsuario(
        requerimiento.query.user as string
      );

      if (funkoPops == undefined) {
        respuesta.status(404).send({ error: "No se ha encontrado el recurso" });
      } else {
        respuesta.send({ funkoPops });
      }

      let funkos = new FuncosCollection().guardarFunkosUsuario(
        funkoPops,
        requerimiento.query.user as string,
      );
    }


  };

  private add = (
    requerimiento: express.Request,
    respuesta: express.Response
  ) => {};

  private eliminar = (
    requerimiento: express.Request,
    respuesta: express.Response
  ) => {};

  private modificar = (
    requerimiento: express.Request,
    respuesta: express.Response
  ) => {};

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
