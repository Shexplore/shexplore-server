exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function(table) {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.string('email').notNullable().unique();
      table.string('verification');
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('profile', function(table) {
      table.increments('id').primary();
      table.string('username');
      table.string('favorite_programming_language');
      table.string('about_me')
      table.string('level')
      table.string('projects_completed')
      table.string('location')
      table.string('number_of_badges')
      table.string('how_old')
      table.string('real_name')
      table.string('friends')
      table.string('profile_picture')
      table.string('other_hobbies')
      table.string('company')
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
