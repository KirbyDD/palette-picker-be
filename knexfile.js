
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/palettepicker',
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds/dev'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: 'process.env.DATABASE_URL'
  }
};