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
      // console.log(response.body , response.statusCode);
      done();
    });
  });
  // it("error al añadir funko", (done) => {
  //   const url =
  //     "http://localhost:3000/funkos?cmd=mostrar&user=user1&id=4&name=ramon&tipo=Pop!&genero=Animación&descripcion=cambio de funko&precio=50000&franquicia=canarias&numero=1&exclusivo=true&caracteristicasEspeciales=brilla por su ausencia";

  //   request.post({ url: url, json: true }, (error, response) => {
  //     expect(response.statusCode).to.be.equal(400);
  //     done();
  //   });
  // });
});
