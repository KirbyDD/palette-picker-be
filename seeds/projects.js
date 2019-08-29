const projectData = require("../projects");

const createProject = (knex, project) => {
  return knex("projects")
    .insert(
      {
        project_name: project.project_name
      },
      "id"
    )
    .then(projectId => {
      let projectsPromises = [];

      project.palettes.forEach(palette => {
        projectsPromises.push(
          createPalette(knex, {
            palette_name: palette.palette_name,
            c1: palette.c1,
            c2: palette.c2,
            c3: palette.c3,
            c4: palette.c4,
            c5: palette.c5,
            project_id: projectId[0]
          })
        );
      });

      return Promise.all(projectsPromises);
    });
};

const createPalette = (knex, palette) => {
  return knex("palettes").insert(palette);
};

exports.seed = knex => {
  return knex("palettes")
    .del()
    .then(() => knex("projects").del())
    .then(() => {
      let projectsPromises = [];

      projectData.forEach(project => {
        projectsPromises.push(createProject(knex, project));
      });

      return Promise.all(projectsPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
