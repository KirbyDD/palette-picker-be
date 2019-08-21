exports.up = function(knex) {
    return Promise.all([
      knex.schema.table("projects", table => table.string("palettes"))
    ]);
  };
  
  exports.down = function(knex) {
    return Promise.all([
      knex.schema.table("projects", table => table.dropColumn("palettes"))
    ]);
  };