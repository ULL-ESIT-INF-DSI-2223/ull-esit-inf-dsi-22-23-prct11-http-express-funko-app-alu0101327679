import { describe } from "node:test";
import request from "request";
import { funkoServer } from "../../src/servidor/server.js";
import { expect } from "chai";
import "mocha";

describe("pruebas basicas de la práctica", () => {

  it("añadir funko", (done) => {
    let url = "http://localhost:3000/funkos?cmd=mostrar&user=user1&id=3&name=ramon&tipo=Pop!&genero=Animación&descripcion=cambio de funko&precio=50000&franquicia=canarias&numero=1&exclusivo=true&caracteristicasEspeciales=brilla por su ausencia"
    request.post({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(200);
      done();
    });
  });


  it("modificar funkos", (done) => {
    let url = "http://localhost:3000/funkos?cmd=modificar&user=user1&id=3&name=ramon&tipo=Pop!&genero=Animación&descripcion=cambiooooooo&precio=50000&franquicia=canarias&numero=1&exclusivo=true&caracteristicasEspeciales=brilla por su ausencia"
    request.patch({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(200);
      done();
    });
  })

  it("eliminar funkos", (done) => {
    let url = "http://localhost:3000/funkos?cmd=eliminar&user=user1&id=3"
    request.delete({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(200);
      done();
    });
  })

    it("eliminar funkos incorrecto", (done) => {
    let url = "http://localhost:3000/funkos?cmd=eliminar&user=user1&id=3"
    request.delete({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(400);
      done();
    });
  })

  it("mostrar funkos", (done) => {
    let url = "http://localhost:3000/funkos?cmd=mostrar&user=user1&id=4"
    request.get({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(200);
      done();
    });
  })

  it("mostrar funkos incorrecto", (done) => {
    let url = "http://localhost:3000/funkos?cmd=mostrar&user=user2"
    request.get({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(400);
      done();
    });
  })

  it("listar funkos", (done) => {
    let url = "http://localhost:3000/funkos?cmd=listar&user=user1"
    request.get({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(200);
      done();
    });
  })


  
  
  
  
});
