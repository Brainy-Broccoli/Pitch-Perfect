exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('decks_cards').del()
    .then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 1, card_id: 4},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 1, card_id: 5},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 2, card_id: 1},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 2, card_id: 2},
      ]);
    })
};
