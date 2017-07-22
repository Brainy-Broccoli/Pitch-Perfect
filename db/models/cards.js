const db = require('../');

const Card = db.Model.extend({
  tableName: 'cards',
  decks: function() {
    return this.belongsToMany('Deck');
  },
  profiles: function() {
    return this.belongsToMany('Profile').withPivot(['high_score']);
  }
});

module.exports = db.model('Card', Card);