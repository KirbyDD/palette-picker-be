exports.up = function(knex) {
    return knex.schema.table('palettes', function(table) {
      table.string('proj_name');
    })  
  };
  
  exports.down = function(knex) {
    return knex.schema.table('palettes', function(table) {
      table.dropColumn('proj_name');
    })
  };
