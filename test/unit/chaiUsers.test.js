import chai from "chai";
import mongoose, { mongo } from "mongoose";
import { config } from "../../src/config.js";
import Users from "../../src/dao/Users.dao.js";
import UserDTO from "../../src/dto/User.dto.js";

const expect = chai.expect;

describe("Set de pruebas del modulo de usuarios con Chai", () => {
  before(function () {
    mongoose.connect(config.dbUrl);
    this.usersDao = new Users();
  });

  beforeEach(function () {
    mongoose.connection.collections.users.drop();
  });

  it("El Dao debe retornar los usuarios en un array", async function () {
    const result = await this.usersDao.get();
    expect(result).to.be.a("array");
  });
});

describe("Set de pruebas para el UserDTO", function () {
  let mockUser = {
    first_name: "Coder",
    last_name: "House",
    email: "prueba@correo.com",
    password: "123",
  };

  it("El UserDTO debe unificar el nombre y el apellido del usuario en una sola propiedad", function () {
    const user = UserDTO.getUserTokenFrom(mockUser);
    expect(user.name).to.include(mockUser.first_name);
    expect(user.name).to.include(mockUser.last_name);
  });

  it("El UserDTO debe eliminar las propiedades innecesarias como password, first_name y last_name", function () {
    const user = UserDTO.getUserTokenFrom(mockUser);
    expect(user).to.not.have.property("first_name");
    expect(user).to.not.have.property("last_name");
    expect(user).to.not.have.property("password");
  });
});
