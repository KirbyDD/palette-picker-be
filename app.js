const express = require('express');
const app = express();
const cors = require('cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(cors());
app.use(express.json())
app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

/* GET REQUESTS */
app.get('/', (request, response) => {
  response.status(200).json('Initial Setup Complete');
});

app.get('/api/v1/projects', (request, response) => {
  database('projects').select('*')
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

app.get('/api/v1/projects/:id', (request, response) => {
  database('projects').where('id', request.params.id).select()
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

app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select('*')
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

app.get('/api/v1/projects/:id/palettes', (request, response) => {
  database("projects")
    .where("id", request.params.id)
    .select()
    .then(palettes => {
      if (palettes.length) {
        response.status(200).json(palettes);
      } else {
        response.status(404).json("No palettes found for this project");
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

/* POST REQUESTS */

app.post('/api/v1/projects', (request, response) => {
  response.status(201).json('Initial Setup Complete for Adding Project');
})

app.post('/api/v1/palettes', (request, response) => {
  response.status(201).json('Initial Setup Complete for Adding Palette')
})

/* PATCH REQUESTS */

app.patch('/api/v1/projects/:id', (request, response) => {
  response.status(202).json('Initial Setup Complete for Updating Project');
})

app.patch('/api/v1/palettes/:id', (request, response) => {
  response.status(202).json('Initial Setup Complete for Updating Palette')
})

/* DELETE REQUESTS */

app.delete('/api/v1/projects/:id', (request, response) => {
  response.status(204).json('Initial Setup Complete for Updating Project');
})

app.delete('/api/v1/palettes/:id', (request, response) => {
  response.status(204).json('Initial Setup Complete for Updating Palette')
})

module.exports = app;