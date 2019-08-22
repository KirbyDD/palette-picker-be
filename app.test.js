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
      // get all of the projects back
      expect(response.status).toBe(200);
      expect(projects[0].project_name).toEqual(expectedProjects[0].project_name);
    });

    // it('should return a 404 and the message "No projects found for this project"', async () => {
    //   const mockProj = "No projects found for this project";
    //   const response = await request(app).get('/api/v1/projects')

    //   expect(response.status).toBe(404);
    //   expect(response.body).toEqual("No projects found for this project");
    // });
  });

  describe("GET /api/v1/palettes", () => {
    // it should return all of the palettes
    it("should return a status of 200 and all of the palettes", async () => {
      // setup
      // pull back expected palettes from the test database
      const expectedPalettes = await database("palettes").select();
      // execution
      // make the request to get(//api/v1/palettes)
      const response = await request(app).get("/api/v1/palettes");
      const palettes = response.body;
      // expectation
      // get all of the palettes back
      expect(response.status).toBe(200);
      expect(palettes[0].palette_name).toEqual(expectedPalettes[0].palette_name);
    });
  });

  describe("GET /projects/:id", () => {
    it("should return a project based on id", async () => {
      const mockId = await database("projects")
        .first("id")
        .then(id => id.id);
      const expectedProject = await database("projects")
        .select()
        .where({ id: mockId });

      const response = await request(app).get(`/api/v1/projects/${mockId}`);
      const project = response.body;

      expect(response.status).toBe(200);
      expect(project[0].project_name).toEqual(expectedProject[0].project_name);
    });

    it('should return a 404 and the message "Project not found"', async () => {
      const invalidID = -1;

      const response = await request(app).get(`/api/v1/projects/${invalidID}`)

      expect(response.status).toBe(404);
      expect(response.body).toEqual('No project found');
    });
  });

  describe("GET /projects/:id/palettes", () => {
    it("should return a palette based on specific project from given id", async () => {
      const mockId = await database("projects")
        .first("id")
        .then(id => id.id);
      const expectedPalette = await database("projects")
        .where({ id: mockId })
        .select();

      const response = await request(app).get(
        `/api/v1/projects/${mockId}/palettes`
      );
      const palette = response.body;

      expect(response.status).toBe(200);
      expect(palette[0].palette_name).toEqual(expectedPalette[0].palette_name);
    });
  });

  it('should return a 404 and the message "No palettes found for this project"', async () => {
    const invalidID = -1;

    const response = await request(app).get(`/api/v1/projects/${invalidID}/palettes`)

    expect(response.status).toBe(404);
    expect(response.body).toEqual("No palettes found for this project");
  });
});
