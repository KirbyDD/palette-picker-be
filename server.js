const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

/* GET REQUESTS */
app.get('/', (request, response) => {
  response.status(200).json('Initial Setup Complete');
});

app.get('/api/v1/projects', (request, response) => {
  response.status(200).json('Initial Setup Complete for Projects');
});

app.get('/api/v1/projects/:id', (request, response) => {
  response.status(200).json('Initial Setup Complete for Individual Project');
});

app.get('/api/v1/palettes', (request, response) => {
  response.status(200).json('Initial Setup Complete for Palettes');
});

app.get('/api/v1/palettes/:id', (request, response) => {
  response.status(200).json('Initial Setup Complete for Individual Palette');
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

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});