
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('profiles', function (table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('email', 150).nullable().unique();
      table.string('phone', 100).nullable();
      table.string('photo', 150).nullable();
      table.string('gender', 20).nullable();
      table.timestamps(true, true);
    }),
    // knex.schema.createTableIfNotExists('users', function (table) {
    //   table.increments('id').unsigned().primary();
    //   table.string('user_name', 100).nullable();
    //   table.integer('user_id').references('profiles.id').onDelete('CASCADE');
    //   table.string('photo', 150).nullable();
    //   table.string('gender', 20).nullable();
    // }),
    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();  
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('decks', function(table) {
      table.increments('id').unsigned().primary();
      table.string('topic', 50).nullable();
      table.string('image', 500).nullable();
      table.string('badge', 500).nullable();
    }),
    knex.schema.createTableIfNotExists('cards', function(table) {
      table.increments('id').unsigned().primary();
      table.string('translation', 100).nullable();
      table.string('character', 100).nullable();
      table.string('pinyin', 50).nullable();
      table.string('IPA', 50).nullable();
      table.string('male_voice', 500).nullable();
      table.string('female_voice', 500).nullable();
      table.integer('tone');
    }),
    knex.schema.createTableIfNotExists('decks_cards', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('deck_id').references('decks.id').onDelete('CASCADE');
      table.integer('card_id').references('cards.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('users_decks', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('deck_id').references('decks.id').onDelete('CASCADE');
      table.integer('user_id').references('profiles.id').onDelete('CASCADE');
      table.integer('deck_progress');
      table.float('accuracy');
      table.boolean('has_badge');
    }),
    knex.schema.createTableIfNotExists('users_cards', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('user_id').references('profiles.id').onDelete('CASCADE');
      table.integer('card_id').references('cards.id').onDelete('CASCADE');
      table.integer('high_score').nullable();
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('decks_cards'),
    knex.schema.dropTableIfExists('users_decks'),
    knex.schema.dropTableIfExists('users_cards'),
    knex.schema.dropTableIfExists('auths'),
    knex.schema.dropTableIfExists('decks'),
    knex.schema.dropTableIfExists('cards'),
    knex.schema.dropTableIfExists('profiles'),
  ]);
};

