module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost:/kaylas_byob_db",
    migrations: {
      directory: "./migrations"
    },
    useNullAsDefault: true
  },
  seeds: {
    directory: "./seeds/dev"
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: "./migrations"
    },
    useNullAsDefault: true
  },
  seeds: {
    directory: "./seeds/dev"
  }
};
