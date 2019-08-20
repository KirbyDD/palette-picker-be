import request from "supertest";
import server from "./server.js";
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

describe("Server", () => {
  describe("init", () => {
    it("should return a 200 status", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
  });
});
