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
      table.string('username').notNullable().unique();
      table.string('favorite_programming_language');
      table.string('about_me')
      table.integer('level')
      table.string('projects_completed')
      table.string('location')
      table.integer('age')
      table.string('real_name')
      table.string('friends')
      table.string('profile_picture')
      table.string('hobbies')
      table.string('company')
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('profile')
  ]);
};
