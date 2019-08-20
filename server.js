const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.get('/', (request, response) => {
  response.status(200).json('Initial Setup Complete');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});