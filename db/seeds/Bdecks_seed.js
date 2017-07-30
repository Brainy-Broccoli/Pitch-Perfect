
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('decks').del()
    .then(function () {
      // Inserts seed entries
      return knex('decks').insert({
        topic: 'Food',
        image: 'https://s3-us-west-1.amazonaws.com/pitch-perfect-thesis/Food+Topic.jpeg',
        badge: 'https://s3-us-west-1.amazonaws.com/pitch-perfect-thesis/Food+Badge.png',
        default: true
      });
    }).then(function () {
      return knex('decks').insert({
        topic: 'Basic',
        image: 'https://s3-us-west-1.amazonaws.com/pitch-perfect-thesis/Basic+Topic.jpg',
        badge: 'https://s3-us-west-1.amazonaws.com/pitch-perfect-thesis/Basic+Badge.png',
        default: true
      });
    }).then(function () {
      return knex('decks').insert({
        topic: 'Weather',
        image: 'https://s3-us-west-1.amazonaws.com/pitch-perfect-thesis/Weather+Topic.svg',
        badge: 'https://s3-us-west-1.amazonaws.com/pitch-perfect-thesis/Weather+Badge.png',
        default: true
      });
    }).then(function () {
      return knex('decks').insert({
        topic: 'Travel',
        image: 'https://s3-us-west-1.amazonaws.com/pitch-perfect-thesis/Travel+Topic.jpg',
        badge: 'https://s3-us-west-1.amazonaws.com/pitch-perfect-thesis/Travel+Badge.png',
        default: true
      });
    })
};
