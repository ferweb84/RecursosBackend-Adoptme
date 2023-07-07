import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Set de pruebas de integración para modulo de mascotas", function () {
  describe("Set de pruebas para POST /api/pets", function () {
    const petMock = {
      name: "Patitas",
      specie: "Pez",
      birthDate: "10-10-2022",
    };

    it("POST /api/pets: Debe crear una mascota correctamente", async function () {
      const { _body } = await requester.post("/api/pets").send(petMock);
      expect(_body.payload).to.have.property("_id");
    });

    it("POST /api/pets: Debe crear una mascota con la ruta de una imagen", async function () {
      const result = await requester
        .post("/api/pets/withimage")
        .field("name", petMock.name)
        .field("specie", petMock.specie)
        .field("birthDate", petMock.birthDate)
        .attach("image", "./test/integration/assets/dog.jpg");

      expect(result.status).to.be.eql(200);
      expect(result._body.payload).to.have.property("_id");
      expect(result._body.payload.image).to.be.ok;
    });
  });
});
