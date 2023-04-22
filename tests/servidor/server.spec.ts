import { describe } from "node:test";
import request from "request";
import { funkoServer } from "../../src/servidor/server.js";
import { expect } from "chai";
import "mocha";

describe("pruebas basicas de la práctica", () => {

  it("añadir funko", (done) => {
    const url =
      "http://localhost:3000/funkos?cmd=mostrar&user=user1&id=4&name=ramon&tipo=Pop!&genero=Animación&descripcion=cambio de funko&precio=50000&franquicia=canarias&numero=1&exclusivo=true&caracteristicasEspeciales=brilla por su ausencia";

    request({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(200);
      done();
    });
  });
  it("error al añadir funko", (done) => {
    const url =
      "http://localhost:3000/funkos?cmd=mostrar&user=user1&id=4&name=ramon&tipo=Pop!&genero=Animación&descripcion=cambio de funko&precio=50000&franquicia=canarias&numero=1&exclusivo=true&caracteristicasEspeciales=brilla por su ausencia";

    request({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(400);
      done();
    });
  });

  it("eliminar un funko", (done) => {
    const url =
      "http://localhost:3000/funkos?cmd=mostrar&user=user1&id=4&name=ramon&tipo=Pop!&genero=Animación&descripcion=cambio de funko&precio=50000&franquicia=canarias&numero=1&exclusivo=true&caracteristicasEspeciales=brilla por su ausencia";

    request({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(200);
      done();
    });
  });

  it("error al eliminar un funko", (done) => {
    const url =
      "http://localhost:3000/funkos?cmd=mostrar&user=user1&id=4&name=ramon&tipo=Pop!&genero=Animación&descripcion=cambio de funko&precio=50000&franquicia=canarias&numero=1&exclusivo=true&caracteristicasEspeciales=brilla por su ausencia";

    request({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(400);
      done();
    });
  });

  it("modificar un funko", (done) => {
    const url =
      "http://localhost:3000/funkos?cmd=mostrar&user=user1&id=4&name=ramon&tipo=Pop!&genero=Animación&descripcion=cambio de funko&precio=50000&franquicia=canarias&numero=1&exclusivo=true&caracteristicasEspeciales=brilla por su ausencia";

    request({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(200);
      done();
    });
  });

  it("error al modificar un funko", (done) => {
    const url =
      "http://localhost:3000/funkos?cmd=mostrar&user=user1&id=4&name=ramon&tipo=Pop!&genero=Animación&descripcion=cambio de funko&precio=50000&franquicia=canarias&numero=1&exclusivo=true&caracteristicasEspeciales=brilla por su ausencia";

    request({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(400);
      done();
    });
  });

  it("mostrar un funko", (done) => {
    const url =
      "http://localhost:3000/funkos?cmd=mostrar&user=user1&id=4&name=ramon&tipo=Pop!&genero=Animación&descripcion=cambio de funko&precio=50000&franquicia=canarias&numero=1&exclusivo=true&caracteristicasEspeciales=brilla por su ausencia";

    request({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(200);
      done();
    });
  });

  it("error al mostrar un funko", (done) => {
    const url =
      "http://localhost:3000/funkos?cmd=mostrar&id=4&name=ramon&tipo=Pop!&genero=Animación&descripcion=cambio de funko&precio=50000&franquicia=canarias&numero=1&exclusivo=true&caracteristicasEspeciales=brilla por su ausencia";

    request({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(400);
      done();
    });
  });

  it("listar los funkos de un usuario", (done) => {
    const url =
      "http://localhost:3000/funkos?cmd=listar&user=user1&id=4&name=ramon&tipo=Pop!&genero=Animación&descripcion=cambio de funko&precio=50000&franquicia=canarias&numero=1&exclusivo=true&caracteristicasEspeciales=brilla por su ausencia";

    request({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(200);
      done();
    });
  });

  it("error al listar los funkos de un usuario", (done) => {
    const url =
      "http://localhost:3000/funkos?cmd=listar&id=4&name=ramon&tipo=Pop!&genero=Animación&descripcion=cambio de funko&precio=50000&franquicia=canarias&numero=1&exclusivo=true&caracteristicasEspeciales=brilla por su ausencia";

    request({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(400);
      done();
    });
  });
});
