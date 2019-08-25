By: [DeMarcus Kirby](https://github.com/KirbyDD) and [Kayla Larson](https://github.com/kaylalarson1990)

# Description

Palette Picker was a two week long paired project. On the backend side, we created our own data set using a one-to-many relationship. We have our "one" being the projects and our "many" being the palettes saved to each project. Learning goals were to create a RESTful api using NodeJS Express, PostgreSQL, and Knex. [Heroku Deployed Database](https://palette-picker-dk.herokuapp.com/)

## Technologies

- Express
- Knex
- PostgreSQL
- Travis CI

## Learning Objectives

- build RESTful API for a large dataset
- one-to-many relational database schema design
- deploy API to Heroku using TravisCI

## Installation
### (If you do not have PostgreSQL, please see instructions at the bottom for installation)
Clone down the repo - https://github.com/kaylalarson1990/byob-final

Run ```npm install``` from the root directory

Run ```npm start``` - visit localhost:3000/api/v1/shows - you should see a json response with all shows.

## Endpoints

| url | verb | options | sample response |
| ----|------|---------|---------------- |
| `http://localhost:3000/api/v1/projects` | GET | not needed | Array of all projects: `[{ id: 12, project_name: 'Living Room Colors', palettes: [{}] }, { id: 13, project_name: 'Master Bedroom Colors', palettes: [{}] }, { id: 14, project_name: 'Guest Bedroom Colors', palettes: [{}] }]` |
| `http://localhost:3001/api/v1/projects/:id` | GET | not needed | Array of one specific project: `[{ id: 12, project_name: 'Living Room Colors', palettes: [{}] }]` |
| `http://localhost:3001/api/v1/palettes` | GET | not needed | Array of all palettes: `[{ id: 12, palette_name: 'Inviting colors', c1: 'Blue', c2: 'Purple', c3: 'White', c4: 'Teal', c5: 'Light Yellow', proj_name: 'Living Room Colors', project_id: 12 }, { id: 13, palette_name: 'Cool colors', c1: 'Blue', c2: 'Grey', c3: 'White', c4: 'Teal', c5: 'Light Grey', proj_name: 'Master bedroom Colors', project_id: 13 }]` |
| `http://localhost:3001/api/v1/projects/:id/palettes` | GET | not needed | Array of palettes for one specific project: `[{ id: 12, palette_name: 'Inviting colors', c1: 'Blue', c2: 'Purple', c3: 'White', c4: 'Teal', c5: 'Light Yellow', proj_name: 'Living Room Colors', project_id: 12 }]` |
| `http://localhost:3001/api/v1/projects` | POST | `{ project_name: <String>, palettes: <String> }` | New project: `{ id: 15, project_name: 'Bathroom Colors', palettes: [{}] }` |
| `http://localhost:3001/api/v1/palettes` | POST | `{ palette_name: <String>, c1: <String>, c2: <String>, c3: <String>, c4: <String>, c5: <String>, proj_name: <String>, project_id: <Integer> }` | New palette: `{ id: 15, palette_name: 'Dark Colors', c1: 'Black', c2: 'Navy Blue', c3: 'Grey', c4: 'Maroon', c5: 'White', proj_name: 'Bathroom Colors', project_id: 15 }` |
| `http://localhost:3001/api/v1/projects/:id` | PATCH | not needed | Update project: `{ project_name: 'Bathroom Colors', palettes: [{}] }` |
| `http://localhost:3001/api/v1/palettes/:id` | PATCH | not needed | Update palette: `{ palette_name: 'Dark Colors', c1: 'Black', c2: 'Navy Blue', c3: 'Grey', c4: 'Maroon', c5: 'White', proj_name: 'Bathroom Colors', project_id: 15 }` |
| `http://localhost:3001/api/v1/projects/:id` | DELETE | not needed | `{ success: 'You have successfully deleted the projects and palettes associated with the id of 1' }` |
| `http://localhost:3001/api/v1/palettes/:id` | DELETE | not needed | `success: 'You have successfully deleted the palette associated with the id of 1' }` |


Note: All of these endpoints will return semantic errors if something is wrong with the request.


## Setup Postgresql

#### Installation:
* Head over to [Postgres.app](http://postgresapp.com/) to download and install PostgreSQL
* When you click `initialize`, you should now be able to see that postgreSQL is running
* To be able to use the command line tools, you will need to run the following commannd in your terminal to configure your $PATH `sudo mkdir -p /etc/paths.d && echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp`
* You will need to close your terminal window and re-open it for the changes to take effect

