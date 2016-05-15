module.exports = function createTables(knex){
  knex.createTableIfNotExists('users', function(table) {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.string('email').notNullable().unique();
    table.string('verification');
    table.timestamps();
  });
}
