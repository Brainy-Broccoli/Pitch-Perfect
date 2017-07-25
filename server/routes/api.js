'use strict';
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const knex = require('../../db').knex;

router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    const userID = req.user.id;
    const name = `${req.user.first} ${req.user.last}`;
    const badges = [];
    const photo = req.user.photo;
    const profilePageData = {
      name,
      badges,
      photo
    };

    const allDecks = [];

    knex.from('users_decks')
      .innerJoin('profiles', 'users_decks.user_id', '=', 'profiles.id')
      .innerJoin('decks', 'users_decks.deck_id', '=', 'decks.id')
      .where({user_id: userID})  
      .then( data => data.map( deck => ({
        id: deck.id,
        progress: deck.deck_progress,
        accuracy: deck.accuracy,
        topic: deck.topic,
        image: deck.image,
        badge: deck.badge,
        has_badge: deck.has_badge
      })))
      .then( decks => Promise.all(
        decks.map( deck => 
          knex.from('users_cards')
            .innerJoin('decks_cards', 'decks_cards.card_id', '=', 'users_cards.card_id')
            .innerJoin('decks', 'decks_cards.deck_id', '=', 'decks.id')
            .innerJoin('cards', 'decks_cards.card_id', '=', 'cards.id')
            .where({deck_id: deck.id})
            .then( cards => {
              const destructuredCards = cards.map( card => ({
                id: card.card_id,
                character: card.character,
                pinyin: card.pinyin,
                IPA: card.IPA,
                translation: card.translation,
                male_voice: card.male_voice,
                female_voice: card.female_voice,
                tone: card.tone,
                high_score: card.high_score
              }));
              deck.cards = destructuredCards;
              return deck;
            })
        ))
        .then( decksWithCards => {
          res.json({ 
            display: req.user.display,
            photo: req.user.photo,
            decks: decksWithCards
          });
        }))
      .catch(err => res.status(500).send('Something broke: ' + err));
  });

router.route('/card/:id')
  .post(middleware.auth.verify, (req, res) => {
    knex.from('users_cards')
      .innerJoin('cards','users_cards.card_id', '=', 'cards.id')
      .where({ card_id: req.params.id, user_id: req.user.id })
      .then( resp => {
      console.log(req.body)
      console.log(resp)
      res.send('lol')
      }).catch( err=> console.error(err));
  })

module.exports = router;
