import { faker } from "@faker-js/faker";
import request from "supertest";
import app from "../src/app";
import { createFakeUser, deleteFakeUser } from "./helpers/fakeuser";

let fakeUser: Awaited<ReturnType<typeof createFakeUser>>;
beforeAll(async () => (fakeUser = await createFakeUser()));
afterAll(async () => await deleteFakeUser(fakeUser.id));

describe("Markers check", () => {
  it("should return status 401 by missing bearer token", async () => {
    const response = await request(app).get("/markers");

    expect(response.status).toBe(401);
  });

  it("should return status 401 for invalid bearer token", async () => {
    const response = await request(app)
      .get("/markers")
      .set("Authorization", `Bearer ${"invalid.token.here"}`);

    expect(response.status).toBe(401);
  });

  it("should return status 200 and markers data", async () => {
    const response = await request(app)
      .get("/markers")
      .set("Authorization", `Bearer ${fakeUser.jwtToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  const fakeMarker = {
    place_id: faker.random.word().length,
    lat: faker.address.latitude(),
    lon: faker.address.longitude(),
    display_name: faker.name.fullName(),
    address: {
      building: faker.name.firstName(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
      postcode: faker.address.zipCode(),
    },
  };

  it("should return status 201 and new marker data", async () => {
    const response = await request(app)
      .post("/markers")
      .send(fakeMarker)
      .set("Authorization", `Bearer ${fakeUser.jwtToken}`);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("should return status 400 by sending wrong marker id to delete", async () => {
    const response = await request(app)
      .delete(`/markers/${faker.random.word().length}`)
      .set("Authorization", `Bearer ${fakeUser.jwtToken}`);

    expect(response.status).toBe(400);
  });

  it("should return status 200 by sending marker id to delete", async () => {
    const { body: { marker } } = await request(app)
      .post("/markers")
      .send(fakeMarker)
      .set("Authorization", `Bearer ${fakeUser.jwtToken}`);

    const response = await request(app)
      .delete(`/markers/${marker.id}`)
      .set("Authorization", `Bearer ${fakeUser.jwtToken}`);

    expect(response.status).toBe(200);
  });
});