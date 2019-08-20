const projectData = require("../../data/projectData.json");
const paletteData = require("../../data/paletteData.json");

const createProjects = (knex, project) => {
  return knex("projects").insert(
    {
      project_name: project.name
    },
    "id"
  )
};

const createPalettes = (knex, palette) => {
  return knex("palettes").insert({
    palette_name: palette.palette_name,
    c1: palette.c1,
    c2: palette.c2,
    c3: palette.c3,
    c4: palette.c4,
    c5: palette.c5
  });
};

exports.seed = knex => {
  return knex("projects")
    .del()
    .then(() => knex("palettes").del())
    .then(() => {
      const projectsPromises = [];
      projectData.forEach(project => {
        console.log(project);
        projectsPromises.push(createProjects(knex, project));
      });
      return Promise.all(projectsPromises);
    })
    .catch(err => console.log(`Problem seeding data. ${err}`))
    .then(() => {
      const palettesPromises = [];
      paletteData.forEach(palette => {
        palettesPromises.push(createPalettes(knex, palette));
      });
      return Promise.all(palettesPromises);
    })
    .catch(err => console.log(`Problem seeding data. ${err}`));
};