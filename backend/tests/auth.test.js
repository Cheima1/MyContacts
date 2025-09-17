const request = require("supertest");
const { connect, closeDatabase, clearDatabase } = require("./utils/mongo");

// on fixe le secret utilisé par login + middleware
process.env.JWTSECRET = "test_secret";

const app = require("../app");

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe("Auth routes", () => {
  test("POST /api/auth/signup -> crée un utilisateur", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ email: "toto@ex.com", password: "Super1234" })
      .expect(201);

    expect(res.body).toHaveProperty("message", "Utilisateur créé !");
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email", "toto@ex.com");
  });

  test("POST /api/auth/signup -> 409 si email déjà utilisé", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({ email: "dup@ex.com", password: "Super1234" })
      .expect(201);

    const res = await request(app)
      .post("/api/auth/signup")
      .send({ email: "dup@ex.com", password: "Autre1234" })
      .expect(409);

    expect(res.body).toHaveProperty("error", "Email déjà utilisé");
  });

  test("POST /api/auth/login -> renvoie un token", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({ email: "login@ex.com", password: "Super1234" })
      .expect(201);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "login@ex.com", password: "Super1234" })
      .expect(200);

    expect(res.body).toHaveProperty("userId");
    expect(typeof res.body.token).toBe("string");
  });

  test("POST /api/auth/login -> 401 si mauvais mot de passe", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({ email: "bad@ex.com", password: "Super1234" })
      .expect(201);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "bad@ex.com", password: "mauvais" })
      .expect(401);

    expect(res.body).toHaveProperty("message");
  });

  test("POST /api/auth/login -> 400 si email ou password manquant", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "" })
      .expect(400);

    expect(res.body).toHaveProperty("message", "Email et mot de passe requis");
  });
});
