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
