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
        requerimiento.query.user as string
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
        requerimiento.query.user as string
      );
    }
  };

  private add = (
    requerimiento: express.Request,
    respuesta: express.Response
  ) => {
    if(requerimiento.query.user == undefined){
      respuesta.status(400).send({error: "No se ha introducido el usuario"})
    }else if(requerimiento.query.id == undefined){
      respuesta.status(400).send({error: "No se ha introducido el id"})
    }else if(requerimiento.query.name == undefined){
      respuesta.status(400).send({error: "No se ha introducido el nombre"})
    }else if(requerimiento.query.tipo == undefined){
      respuesta.status(400).send({error: "No se ha introducido el tipo"})
    }else if(requerimiento.query.genero == undefined){
      respuesta.status(400).send({error: "No se ha introducido el genero"})
    }else if(requerimiento.query.descripcion == undefined){
      respuesta.status(400).send({error: "No se ha introducido la descripcion"})
    }else if(requerimiento.query.precio == undefined){
      respuesta.status(400).send({error: "No se ha introducido el precio"})
    }else if(requerimiento.query.franquicia == undefined){
      respuesta.status(400).send({error: "No se ha introducido la franquicia"})
    }else if(requerimiento.query.numero == undefined){
      respuesta.status(400).send({error: "No se ha introducido el numero"})
    }else if(requerimiento.query.exclusivo == undefined){
      respuesta.status(400).send({error: "No se ha introducido si es exclusivo"})
    }else if(requerimiento.query.caracteristicasEspeciales == undefined){
      respuesta.status(400).send({error: "No se ha introducido las caracteristicas especiales"})
    }

    let funkoPops: Funko[] = [];
    funkoPops = new FuncosCollection().cargarFunkosUsuario(
      requerimiento.query.user as string
    );

    let existente: Funko | undefined = funkoPops.find(
      (funko) => funko.id.toString() == requerimiento.query.id
    );

    if(existente != undefined){
      respuesta.status(400).send({error: "Ya existe un funko con ese id"})
    }

    let funko: Funko = new Funko(
      parseInt(requerimiento.query.id as string),
      requerimiento.query.name as string,
      requerimiento.query.descripcion as string,
      requerimiento.query.tipo as Tipo,
      requerimiento.query.genero as Genero,
      requerimiento.query.franquicia as string,
      parseInt(requerimiento.query.numero as string),
      requerimiento.query.exclusivo as string == "true" ? true : false,
      requerimiento.query.caracteristicasEspeciales as string,
      parseFloat(requerimiento.query.precio as string)
    );

    funkoPops.push(funko);

    let funkos = new FuncosCollection().guardarFunkosUsuario(
      funkoPops,
      requerimiento.query.user as string
    );
      respuesta.status(200).send({funko})
  };

  private eliminar = (
    requerimiento: express.Request,
    respuesta: express.Response
  ) => {
    if(requerimiento.query.user == undefined){
      respuesta.status(400).send({error: "No se ha introducido el usuario"})
    }else if(requerimiento.query.id == undefined){
      respuesta.status(400).send({error: "No se ha introducido el id"})
    }

    let funkoPops: Funko[] = [];
    funkoPops = new FuncosCollection().cargarFunkosUsuario(
      requerimiento.query.user as string
    );

    let funko: Funko | undefined = funkoPops.find(
      (funko) => funko.id.toString() == requerimiento.query.id
    );

    if(funko == undefined){
      respuesta.status(400).send({error: "No se ha encontrado el recurso"})
    }else{
      funkoPops = funkoPops.filter((funko) => funko.id.toString() != requerimiento.query.id)
      let funkos = new FuncosCollection().guardarFunkosUsuario(
        funkoPops,
        requerimiento.query.user as string
      );
      respuesta.send({message : "Funko eliminado"})
    }


  };

  private modificar = (
    requerimiento: express.Request,
    respuesta: express.Response
  ) => {
    if(requerimiento.query.user == undefined){
      respuesta.status(400).send({error: "No se ha introducido el usuario"})
    }else if(requerimiento.query.id == undefined){
      respuesta.status(400).send({error: "No se ha introducido el id"})
    }else if(requerimiento.query.name == undefined){
      respuesta.status(400).send({error: "No se ha introducido el nombre"})
    }else if(requerimiento.query.tipo == undefined){
      respuesta.status(400).send({error: "No se ha introducido el tipo"})
    }else if(requerimiento.query.genero == undefined){
      respuesta.status(400).send({error: "No se ha introducido el genero"})
    }else if(requerimiento.query.descripcion == undefined){
      respuesta.status(400).send({error: "No se ha introducido la descripcion"})
    }else if(requerimiento.query.precio == undefined){
      respuesta.status(400).send({error: "No se ha introducido el precio"})
    }else if(requerimiento.query.franquicia == undefined){
      respuesta.status(400).send({error: "No se ha introducido la franquicia"})
    }else if(requerimiento.query.numero == undefined){
      respuesta.status(400).send({error: "No se ha introducido el numero"})
    }else if(requerimiento.query.exclusivo == undefined){
      respuesta.status(400).send({error: "No se ha introducido si es exclusivo"})
    }else if(requerimiento.query.caracteristicasEspeciales == undefined){
      respuesta.status(400).send({error: "No se ha introducido las caracteristicas especiales"})
    }

    let funkoPops: Funko[] = [];
    funkoPops = new FuncosCollection().cargarFunkosUsuario(
      requerimiento.query.user as string
    );

    let funko: Funko | undefined = funkoPops.find(
      (funko) => funko.id.toString() == requerimiento.query.id
    );

    if(funko == undefined){
      respuesta.status(400).send({error: "No se ha encontrado el recurso"})
    }else{
      funkoPops = funkoPops.filter((funko) => funko.id.toString() != requerimiento.query.id)
      let funkoModificado: Funko = new Funko(
        parseInt(requerimiento.query.id as string),
        requerimiento.query.name as string,
        requerimiento.query.descripcion as string,
        requerimiento.query.tipo as Tipo,
        requerimiento.query.genero as Genero,
        requerimiento.query.franquicia as string,
        parseInt(requerimiento.query.numero as string),
        requerimiento.query.exclusivo as string == "true" ? true : false,
        requerimiento.query.caracteristicasEspeciales as string,
        parseFloat(requerimiento.query.precio as string)
      );
      funkoPops.push(funkoModificado)
      let funkos = new FuncosCollection().guardarFunkosUsuario(
        funkoPops,
        requerimiento.query.user as string
      );
      respuesta.send({message : "Funko modificado"})
    }
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
