exports.up = function(knex) {
    return Promise.all([
      knex.schema.createTable("projects", function(table) {
        table.increments("id").primary();
        table.string("project_name");
  
        table.timestamps(true, true);
      }),
  
      knex.schema.createTable("palettes", function(table) {
        table.increments("id").primary();
        table.string("palette_name");
        table.string("c1");
        table.string("c2");
        table.string("c3");
        table.string("c4");
        table.string("c5");
        table.integer("project_id").unsigned();
        table.foreign("project_id").references("projects.id");
  
        table.timestamps(true, true);
      })
    ]);
  };
  
  exports.down = function(knex) {
    return Promise.all([
      knex.schema.dropTable("palettes"),
      knex.schema.dropTable("projects")
    ]);
  };
  