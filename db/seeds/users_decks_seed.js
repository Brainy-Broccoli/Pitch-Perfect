
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_decks').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_decks').insert([
        {user_id: 1, deck_id: 1, deck_progress: 80, accuracy: 95, has_badge:true}
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('users_decks').insert([
        {user_id: 1, deck_id: 2, deck_progress: 55, accuracy: 55, has_badge:false}
      ]);
    })
};
