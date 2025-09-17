const request = require("supertest");
const { connect, closeDatabase, clearDatabase } = require("./utils/mongo");

process.env.JWTSECRET = "test_secret";
const app = require("../app");

let token;

async function signupAndLogin() {
  await request(app)
    .post("/api/auth/signup")
    .send({ email: "user@ex.com", password: "Super1234" })
    .expect(201);

  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "user@ex.com", password: "Super1234" })
    .expect(200);

  return res.body.token;
}

beforeAll(async () => {
  await connect();
  token = await signupAndLogin();
});

afterEach(async () => {
  await clearDatabase();
  token = await signupAndLogin();
});

afterAll(async () => {
  await closeDatabase();
});

describe("Contacts (JWT protected)", () => {
  test("POST /api/contact -> 401 sans token", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ first_name: "Jean", last_name: "Dupont", phone_number: "0612345678" })
      .expect(401);

    expect(res.body).toHaveProperty("error");
  });

  test("POST /api/contact -> 400 si numéro invalide", async () => {
    const res = await request(app)
      .post("/api/contact")
      .set("Authorization", `Bearer ${token}`)
      .send({ first_name: "Jean", last_name: "Dupont", phone_number: "123" })
      .expect(400);

    expect(res.body).toHaveProperty("error");
  });

  test("POST /api/contact -> 201 si contact valide", async () => {
    const res = await request(app)
      .post("/api/contact")
      .set("Authorization", `Bearer ${token}`)
      .send({ first_name: "Alice", last_name: "Martin", phone_number: "0611122233" })
      .expect(201);

    expect(res.body).toHaveProperty("message");
  });

  test("GET /api/contact -> retourne la liste après création", async () => {
    await request(app)
      .post("/api/contact")
      .set("Authorization", `Bearer ${token}`)
      .send({ first_name: "Alice", last_name: "Martin", phone_number: "0611122233" })
      .expect(201);

    const res = await request(app)
      .get("/api/contact")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toMatchObject({
      first_name: "Alice",
      last_name: "Martin",
      phone_number: "0611122233"
    });
  });
});
