const db = require('../');

const Deck = db.Model.extend({
  tableName: 'decks',
  cards: function() {
    return this.belongsToMany('Card');
  },
  profiles: function() {
    return this.belongsToMany('Profile').withPivot(['deck_progress', 'accuracy', 'has_badge']);
  }
});

module.exports = db.model('Deck', Deck);