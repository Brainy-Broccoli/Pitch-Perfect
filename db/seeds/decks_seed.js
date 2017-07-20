
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('decks').del()
    .then(function () {
      // Inserts seed entries
      return knex('decks').insert({
        topic: 'Food',
        image: 'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg'
      });
    }).then(function () {
      return knex('decks').insert({
        topic: 'Basic',
        image: 'http://images.twinkl.co.uk/image/private/t_630/image_repo/17/92/T2-G-357-Basic-Chinese-Phrases-PowerPoint.jpg'
      });
    })
};
