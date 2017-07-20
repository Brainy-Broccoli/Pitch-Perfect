
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('decks', function(table) {
      table.increments('id').unsigned().primary();
      table.string('topic', 50).nullable();
      table.string('image', 150).nullable();
    }),
    knex.schema.createTableIfNotExists('cards', function(table) {
      table.increments('id').unsigned().primary();
      table.string('pinyin', 30).nullable();
      table.string('IPA', 30).nullable();
      table.string('male_voice', 150).nullable();
      table.string('female_voice', 150).nullable();
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
      table.integer('accuracy');
    }),
    knex.schema.createTableIfNotExists('users_cards', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('user_id').references('profiles.id').onDelete('CASCADE');
      table.integer('card_id').references('cards.id').onDelete('CASCADE');
      table.integer('high_score');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('decks'),
    knex.schema.dropTable('cards'),
    knex.schema.dropTable('decks_cards'),
    knex.schema.dropTable('users_decks'),
    knex.schema.dropTable('users_cards')
  ]);
};

