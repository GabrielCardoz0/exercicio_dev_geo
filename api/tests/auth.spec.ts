import { faker } from "@faker-js/faker";
import request from "supertest";
import app from "../src/app";
import { createFakeUser, deleteFakeUser } from "./helpers/fakeuser";

let fakeUser: Awaited<ReturnType<typeof createFakeUser>>;
beforeAll(async () => (fakeUser = await createFakeUser()));
afterAll(async () => await deleteFakeUser(fakeUser.id));

describe("Auth check", () => {
  it("should return status 401", async () => {
    const response = await request(app).get("/resources");

    expect(response.status).toBe(401);
  });

  it("should return status 400 by sending wrong email or password", async () => {
    const response = await request(app).post("/auth/login").send({
      email: faker.internet.exampleEmail(),
      password: faker.internet.password(),
    });

    expect(response.status).toBe(400);
  });

  it("should return status 200 and jwt token", async () => {
    const response = await request(app).post("/auth/login").send({
      email: fakeUser.email,
      password: fakeUser.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });
});