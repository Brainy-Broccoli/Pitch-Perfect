
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('decks').del()
    .then(function () {
      // Inserts seed entries
      return knex('decks').insert({
        topic: 'Food',
        image: 'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg',
        badge: 'https://proprofs-cdn.s3.amazonaws.com/images/games/user_images/misc/5211927825.png'
      });
    }).then(function () {
      return knex('decks').insert({
        topic: 'Basic',
        image: 'http://images.twinkl.co.uk/image/private/t_630/image_repo/17/92/T2-G-357-Basic-Chinese-Phrases-PowerPoint.jpg',
        badge: 'https://lh3.googleusercontent.com/HaOfS78u7D6IXtxFQ4ylrBRuLgyLIB0Bh8G6pw5eOLK73NbEY5nsGBJl1gM2KbHInq4=w300'
      });
    }).then(function () {
      return knex('decks').insert({
        topic: 'Weather',
        image: 'https://icons.wxug.com/i/c/v4/partlycloudy.svg',
        badge: 'http://icons.iconarchive.com/icons/bokehlicia/pacifica/256/weather-icon.png'
      });
    }).then(function () {
      return knex('decks').insert({
        topic: 'Travel',
        image: 'https://iabuk.net/sites/default/files/styles/thumbnail/public/shutterstock_58918264.jpg?itok=sYn7AJu0',
        badge: 'http://www.freeiconspng.com/uploads/travel-3-icon--colorflow-iconset--tribalmarkings-24.png'
      });
    })
};
