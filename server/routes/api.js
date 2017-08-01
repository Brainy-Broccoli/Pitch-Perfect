'use strict';
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const knex = require('../../db').knex;

router.route('/profile')
  .get(middleware.auth.verify, (req, res) => {
    const userID = req.user.id;
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
            .where({deck_id: deck.id, user_id: userID})
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
              deck.total = destructuredCards.length;
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
    const userID = req.user.id;
    const cardID = req.params.id;
    knex.select('high_score').from('users_cards')
      .where({ card_id: cardID, user_id: userID })
      .then( hs => knex.from('users_cards')
        .where({ card_id: cardID, user_id: userID })
        // Plz don't hack
        .update({high_score: Math.min(Math.max(Number(hs[0]['high_score']), req.body.score, 0), 100)})
      ).then( () => knex.from('users_decks')
        .where({user_id: userID})
      ).then( usersDecks => Promise.all(
        usersDecks.map(deck => 
          knex.count('users_cards.card_id')
            .from('users_decks')
            .innerJoin('decks_cards', 'users_decks.deck_id', '=', 'decks_cards.deck_id')
            .innerJoin('users_cards', 'decks_cards.card_id', '=', 'users_cards.card_id')
            .where('high_score', '>=', '80')
            .andWhere({ 
              'users_decks.user_id': userID,
              'users_cards.user_id': userID,
              'users_decks.deck_id': deck.deck_id 
            }).then( cardsAboveEighty =>({
              deckID: deck.deck_id,
              completeCount: parseInt(cardsAboveEighty[0].count)
            })).then( deckCompletion => knex.avg('high_score')
              .from('users_cards')
              .innerJoin('decks_cards', 'users_cards.card_id', '=', 'decks_cards.card_id')
              .innerJoin('users_decks', 'users_decks.deck_id', '=', 'decks_cards.deck_id')
              .where({
                'users_cards.user_id': userID,
                'users_decks.user_id': userID,
                'users_decks.deck_id': deckCompletion.deckID
              })
              .then( average => Object.assign(deckCompletion, { average: average[0].avg }))
            )
        ))).then( deckCompletions => Promise.all(deckCompletions.map( deck => 
          knex.from('users_decks')
            .where({
              user_id: userID,
              deck_id: deck.deckID
            })
            .update({
              deck_progress: deck.completeCount,
              accuracy: deck.average
            }).then( () => 
              knex.from('users_decks')
                .where({user_id: userID})
                .then( decks => Promise.all(decks.map( deck => knex.from('users_cards'))))
            )
        )))
      .then(()=>res.send('ok')).catch( err=> console.error(err) || res.status(500).send(err));
  })

module.exports = router;
