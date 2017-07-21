const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  decks: function() {
    return this.belongsToMany(Deck).withPivot(['deck progress', 'accuracy', 'has_badge']);
  }
});

module.exports = db.model('User', User);