import { faker } from "@faker-js/faker";
import request from "supertest";
import app from "../src/app";
import { createFakeUser, deleteFakeUser } from "./helpers/fakeuser";

let fakeUser: Awaited<ReturnType<typeof createFakeUser>>;
beforeAll(async () => (fakeUser = await createFakeUser()));
afterAll(async () => await deleteFakeUser(fakeUser.id));

describe("Resources check", () => {
  it("should return status 401 by missing bearer token", async () => {
    const response = await request(app).get("/resources");

    expect(response.status).toBe(401);
  });

  it("should return status 401 for invalid bearer token", async () => {
    const response = await request(app)
      .get("/resources")
      .set("Authorization", `Bearer ${"invalid.token.here"}`);

    expect(response.status).toBe(401);
  });

  it("should return status 200 and resources data", async () => {
    const response = await request(app)
      .get("/resources")
      .set("Authorization", `Bearer ${fakeUser.jwtToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      type: "FeatureCollection",
      features: expect.any(Array),
    });
  });
});