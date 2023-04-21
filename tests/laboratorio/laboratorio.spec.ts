import { describe } from "node:test";
import request from "request";
import { servidor } from "../../src/laboratorio/laboratorio.js";
import { expect } from "chai";
import "mocha";


describe("pruebas basicas", () => {
  it("deberia devolver un 500", (done) => {
    const url = "http://localhost:3000/execmd?cmd=ls&args=error";

    request({ url: url, json: true }, (_, response) => {
      expect(response.statusCode).to.be.equal(500);
      expect(response.body).to.eql({error: "ls: cannot access 'error': No such file or directory\n"})
      done()
    });
  });
});
