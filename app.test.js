const request = require("supertest");
const app = require("./app.js");
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

describe("Server", () => {
  describe("init", () => {
    it("should return a 200 status", async () => {
      const res = await request(app).get("/");
      expect(res.status).toBe(200);
    });
  });
});

describe("API", () => {
  beforeEach(async () => {
    await database.seed.run();
  });

  describe("GET /api/v1/projects", () => {
    // it should return all of the projects
    it("should return a status of 200 and all of the projects", async () => {
      // setup
      // pull back expected projects from the test database
      const expectedProjects = await database("projects").select();
      // execution
      // make the request to get(//api/v1/projects)
      const response = await request(app).get("/api/v1/projects");
      const projects = response.body;
      // expectation
      // get all of the students back
      expect(response.status).toBe(200);
      expect(projects).toEqual(expectedProjects);
    });
  });
});
