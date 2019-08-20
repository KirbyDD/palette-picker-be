const projectData = require("../../data/projectData.json");
const paletteData = require("../../data/paletteData.json");

const createShows = (knex, show) => {
  return knex("shows").insert(
    {
      title: show.title,
      date: show.date,
      tv_source: show.tv_source,
      cover_image: show.cover_image
    },
    "id"
  )
};

const createCharacters = (knex, char) => {
  return knex("characters").insert({
    char_name: char.char_name,
    ethnicity: char.ethnicity,
    name: char.name
  });
};

exports.seed = knex => {
  return knex("shows")
    .del()
    .then(() => knex("characters").del())
    .then(() => {
      const showsPromises = [];
      projectData.forEach(show => {
        console.log(show);
        showsPromises.push(createShows(knex, show));
      });
      return Promise.all(showsPromises);
    })
    .catch(err => console.log(`Problem seeding data. ${err}`))
    .then(() => {
      const charactersPromises = [];
      paletteData.forEach(char => {
        charactersPromises.push(createCharacters(knex, char));
      });
      return Promise.all(charactersPromises);
    })
    .catch(err => console.log(`Problem seeding data. ${err}`));
};