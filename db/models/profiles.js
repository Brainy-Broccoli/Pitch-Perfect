const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  decks: function() {
    return this.belongsToMany('Deck').withPivot(['deck_progress', 'accuracy', 'has_badge']);
  },
  cards: function() {
    return this.belongsToMany('Card').withPivot(['high_score']);
  }
});

module.exports = db.model('Profile', Profile);