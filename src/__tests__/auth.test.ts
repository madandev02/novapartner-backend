import request from "supertest";
import app from "../app";
import { connectDB } from "../config/db";
import mongoose from "mongoose";

describe("Auth API", () => {

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const user = {
    email: "test@example.com",
    name: "Test User",
    password: "123456",
    role: "ADMIN"
  };

  let accessToken = "";

  it("Debe registrar un usuario nuevo", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send(user);

    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe(user.email);
  });

  it("Debe hacer login exitoso", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: user.email,
        password: user.password
      });

    expect(res.status).toBe(200);
    accessToken = res.body.accessToken;
    expect(accessToken).toBeDefined();
  });

  it("Debe permitir acceder a /me con token válido", async () => {
    const res = await request(app)
      .get("/api/v1/auth/me")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(user.email);
  });
});
