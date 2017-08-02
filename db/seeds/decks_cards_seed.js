exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('decks_cards').del()
    .then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 3, card_id: 4},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 3, card_id: 5},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 3, card_id: 6},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 4, card_id: 14},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 5, card_id: 23},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 1, card_id: 1},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 1, card_id: 2},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 1, card_id: 3},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 1, card_id: 7},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 1, card_id: 8},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 1, card_id: 9},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 2, card_id: 10},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 1, card_id: 11},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 2, card_id: 12},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 1, card_id: 13},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 1, card_id: 14},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 1, card_id: 15},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 2, card_id: 16},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 2, card_id: 17},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 2, card_id: 18},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 1, card_id: 19},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 1, card_id: 20},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 1, card_id: 21},
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('decks_cards').insert([
        {deck_id: 1, card_id: 22},
      ]);
    });
};
