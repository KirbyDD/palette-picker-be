module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost:/palettepicker",
    migrations: {
      directory: "./migrations"
    },
    useNullAsDefault: true
  },
  seeds: {
    directory: "./seeds"
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
    directory: "./seeds"
  },
  test: {
    client: "pg",
    connection: "postgres://localhost/project_test",
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds/test"
    },
    useNullAsDefault: true
  }
};
