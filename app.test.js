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
    it("should return a status of 200 and all of the projects", async () => {
      const expectedProjects = await database("projects").select();

      const response = await request(app).get("/api/v1/projects");
      const projects = response.body;

      expect(response.status).toBe(200);
      expect(projects[0].project_name).toEqual(
        expectedProjects[0].project_name
      );
    });
  });

  describe("GET /api/v1/palettes", () => {
    it("should return a status of 200 and all of the palettes", async () => {
      const expectedPalettes = await database("palettes").select();
      const response = await request(app).get("/api/v1/palettes");
      const palettes = response.body;

      expect(response.status).toBe(200);
      expect(palettes[0].palette_name).toEqual(
        expectedPalettes[0].palette_name
      );
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

      const response = await request(app).get(`/api/v1/projects/${invalidID}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual("No project found");
    });
  });

  describe("GET /projects/:id/palettes", () => {
    it("should return a palette based on specific project from given id", async () => {
      const mockId = await database("projects")
        .first("id")
        .then(id => id.id);
      const expectedProject = await database("palettes")
        .select()
        .where("project_id", mockId);
      const response = await request(app).get(
        `/api/v1/projects/${mockId}/palettes`
      );
      const palletes = response.body;
      expect(palletes[0].id).toEqual(expectedProject[0].id);
      expect(palletes[0].project_name).toEqual(expectedProject[0].project_name);
    });
  });

  it('should return a 404 and the message "No palettes found for this project"', async () => {
    const invalidID = -1;

    const response = await request(app).get(
      `/api/v1/projects/${invalidID}/palettes`
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: `Palettes with project id:${invalidID} do not exsist`
    });
  });

  describe("POST /api/v1/projects", () => {
    it("should be able to add a new project", async () => {
      const addProj = {
        project_name: "new project",
        palettes: [
          {
            palette_name: "Test palette one",
            proj_name: "Project 1",
            c1: "#CD5C5C",
            c2: "#F08080",
            c3: "#FA8072",
            c4: "#E9967A",
            c5: "#FFA07A"
          }
        ]
      };

      let response = await request(app)
        .post("/api/v1/projects")
        .send(addProj);
      const origProj = await database("projects")
        .where("id", response.body.id)
        .select();

      expect(origProj[0].project_name).toEqual(addProj.project_name);
    });
  });

  describe("PATCH /projects/:id", () => {
    it("should return 201 status and provide an updated project", async () => {
      const mockProject = {
        project_name: "Test project update"
      };
      const mockId = await database("projects")
        .first("id")
        .then(id => id.id);
      const response = await request(app)
        .patch(`/api/v1/projects/${mockId}`)
        .send(mockProject);
      const updatedProject = await database("projects").where({ id: mockId });
      expect(response.status).toBe(201);
      expect(updatedProject[0].project_name).toEqual(mockProject.project_name);
    });

    it("should return a 422 error if no request has no body", async () => {
      const mockProject = {};
      const mockId = await database("projects")
        .first("id")
        .then(id => id.id);
      const response = await request(app)
        .patch(`/api/v1/projects/${mockId}`)
        .send(mockProject);
      expect(response.status).toBe(422);
    });
  });

  describe("PATCH /palettes/:id", () => {
    it("should return 201 status and provide an updated project", async () => {
      const mockProject = {
        palette_name: "Test palette update"
      };
      const mockId = await database("palettes")
        .first("id")
        .then(id => id.id);
      const response = await request(app)
        .patch(`/api/v1/palettes/${mockId}`)
        .send(mockProject);
      const updatedProject = await database("palettes").where({ id: mockId });
      expect(response.status).toBe(201);
      expect(updatedProject[0].project_name).toEqual(mockProject.project_name);
    });

    it("should return a 422 error if no request has no name", async () => {
      const mockProject = {};
      const mockId = await database("palettes")
        .first("id")
        .then(id => id.id);
      const response = await request(app)
        .patch(`/api/v1/palettes/${mockId}`)
        .send(mockProject);
      expect(response.status).toBe(422);
    });
  });

  describe("DELETE /api/v1/projects/:id", () => {
    it("should be able to delete a project given an id", async () => {
      const mockId = await database("projects")
        .first("id")
        .then(id => id.id);
      const response = await request(app).delete(`/api/v1/projects/${mockId}`);

      const deletedProj = await database("projects")
        .where("id", mockId)
        .select();
      expect(response.body).toEqual({
        success: `You have successfully deleted the projects and palettes associated with the id of ${mockId}`
      });
      expect(deletedProj.length).toEqual(0);
    });
  });

  describe("DELETE /api/v1/palettes/:id", () => {
    it("should be able to delete a project given an id", async () => {
      const mockId = await database("palettes")
        .first("id")
        .then(id => id.id);
      const response = await request(app).delete(`/api/v1/palettes/${mockId}`);

      const deletedProj = await database("palettes")
        .where("id", mockId)
        .select();
      expect(response.body).toEqual({
        success: `You have successfully deleted the palette associated with the id of ${mockId}`
      });
      expect(deletedProj.length).toEqual(0);
    });
  });
});
