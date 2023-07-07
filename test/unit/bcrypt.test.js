import chai from "chai";
import { createHash, passwordValidation } from "../src/utils/index.js";

const expect = chai.expect;

describe("Set de pruebas unitarias bcrypt", function () {
  it("bcrypt debe poder hacer un hasheo efectivo de la contraseña", async function () {
    let mockUser = {
      first_name: "Coder",
      last_name: "House",
      email: "prueba@correo.com",
      password: "123",
    };

    const result = await createHash(mockUser.password);
    expect(result).to.match(
      /(?=[A-Za-z0-9@#$%/^.,{}&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g
    );
  });

  it("una contraseña hasheada debe poder compararse con la contraseña original", async function () {
    let mockUser = {
      first_name: "Coder",
      last_name: "House",
      email: "prueba@correo.com",
      password: "123",
    };

    const hashedPassword = await createHash(mockUser.password);
    mockUser.password = hashedPassword;
    const isValidPassword = await passwordValidation(mockUser, "123");
    expect(isValidPassword).to.be.true;
  });

  it("sí la contraseña hasheada es alterada, la comparación debe fallar", async function () {
    let mockUser = {
      first_name: "Coder",
      last_name: "House",
      email: "prueba@correo.com",
      password: "123",
    };

    const hashedPassword = await createHash(mockUser.password);
    mockUser.password = hashedPassword + 10;

    const isValidPassword = await passwordValidation(mockUser, "123");
    expect(isValidPassword).to.be.false;
  });
});
