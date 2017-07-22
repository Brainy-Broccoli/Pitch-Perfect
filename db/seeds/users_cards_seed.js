
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_cards').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_cards').insert([
        {user_id: 1, card_id: 1, high_score:100}
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('users_cards').insert([
        {user_id: 1, card_id: 2, high_score:90}
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('users_cards').insert([
        {user_id: 1, card_id: 4, high_score:80}
      ]);
    }).then(function () {
      // Inserts seed entries
      return knex('users_cards').insert([
        {user_id: 1, card_id: 5, high_score:70}
      ]);
    })
};
