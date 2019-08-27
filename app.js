const express = require("express");
const app = express();
const cors = require("cors");
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set("port", process.env.PORT || 3000);
app.locals.title = "Palette Picker";

/* GET REQUESTS */
app.get("/", (request, response) => {
  response.status(200).json("Initial Setup Complete");
});

app.get("/api/v1/projects", (request, response) => {
  database("projects")
    .select("*")
    .then(projects => {
      if (projects.length) {
        response.status(200).json(projects);
      } else {
        response.status(404).json("No projects found for this project");
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/projects/:id", (request, response) => {
  database("projects")
    .where("id", request.params.id)
    .select()
    .then(projects => {
      if (projects.length) {
        response.status(200).json(projects);
      } else {
        response.status(404).json("No project found");
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/palettes", (request, response) => {
  database("palettes")
    .select("*")
    .then(palettes => {
      if (palettes.length) {
        response.status(200).json(palettes);
      } else {
        response.status(404).json("No palettes found");
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/projects/:id/palettes", (request, response) => {
  const { id } = request.params;
  database("palettes")
    .where({ project_id: id })
    .select()
    .then(palettes => {
      palettes.length
        ? response.status(200).json(palettes)
        : response
            .status(404)
            .json({ error: `Palettes with project id:${id} do not exsist` });
    })
    .catch(error =>
      response.status(500).json({ error: "No palettes available" })
    );
});

/* POST REQUESTS */

app.post("/api/v1/projects", async (request, response) => {
  let newProj = request.body;
  for (let requiredParameter of ["project_name", "palettes"]) {
    if (!newProj[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { project_name: <String>, palettes: <String>. You're missing a "${requiredParameter}" property.`
      });
    }
  }
  database("projects")
    .insert(newProj, "id")
    .then(id => {
      response.status(201).json({ id: id[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post("/api/v1/palettes", (request, response) => {
  let newPalette = request.body;
  for (let requiredParameter of [
    "palette_name",
    "c1",
    "c2",
    "c3",
    "c4",
    "c5",
    "project_id"
  ]) {
    if (!newPalette[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { palette_name: <String>, c1: <String>, c2: <String>, c3: <String>, c4: <String>, c5: <String>, project_id: <Integer>. You're missing a "${requiredParameter}" property.`
      });
    }
  }
  database("palettes")
    .insert(newPalette, "id")
    .then(id => {
      response.status(201).json({ id: id[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

/* PATCH REQUESTS */

app.patch("/api/v1/projects/:id", (request, response) => {
  if (!request.body.project_name) {
    response.status(422).json("A name is required to change this project");
  } else {
    database("projects")
      .where("id", request.params.id)
      .update(request.body)
      .then(projectId => {
        response.status(201).json({ id: projectId });
      })
      .catch(error => {
        response.status(500).json({ error });
      });
  }
});

app.patch("/api/v1/palettes/:id", (request, response) => {
  if (!request.body.palette_name) {
    response.status(422).json("A name is required to change this palette");
  } else {
    database("palettes")
      .where("id", request.params.id)
      .update(request.body)
      .then(paletteId => {
        response.status(201).json({ id: paletteId });
      })
      .catch(error => {
        response.status(500).json({ error });
      });
  }
});

/* DELETE REQUESTS */

app.delete("/api/v1/projects/:id", (request, response) => {
  const { id } = request.params;
  const deleteProject = [
    database("palettes")
      .where("project_id", id)
      .del(),
    database("projects")
      .where("id", id)
      .del()
  ];
  Promise.all(deleteProject)
    .then(() => {
      response.json({
        success: `You have successfully deleted the projects and palettes associated with the id of ${id}`
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.delete("/api/v1/palettes/:id", (request, response) => {
  const { id } = request.params;
  const deletePalette = [
    database("palettes")
      .where("id", id)
      .del()
  ];
  Promise.all(deletePalette)
    .then(() => {
      response.json({
        success: `You have successfully deleted the palette associated with the id of ${id}`
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

module.exports = app;
