'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../../db').knex;

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/cards')
  .get((req, res) => {
    const userID = req.user.id;

    knex.from('users_cards')
      .innerJoin('cards', 'users_cards.card_id', '=', 'cards.id')
      .where({user_id: userID})
      .then( data => {
        res.json({
          allCards: data
        })
      })
      .catch(err => res.status(500).send('All Cards not retrieved' + err))
  })

router.route('/profileInfo')
  .get((req, res) => {
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
            .where({deck_id: deck.id, user_id: userID})
            .then( cards => {
              console.log(cards.length)
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
          //console.log(decksWithCards.map(deck=>`${deck.id}: ${JSON.stringify(deck.cards)}`));
          res.json({ 
            display: req.user.display,
            photo: req.user.photo,
            decks: decksWithCards
          });
        }))
      .catch(err => res.status(500).send('Something broke: ' + err));
    //take id, go into users_decks table
    //build up array of objects (that will ultimately become the fleshed out deck objects) and grab the user specific info
    /*
      [
        {
          id: 1
          progress, accuracy, has badge
        }
      ]
    */
    //then iterate through the collection of objects, plucking the id for each one
    //at this point, create the empty array for card objects
    //using the id, find all the card objects associated with each deck, taking the meta information and adding it to the card obj
    // similar structure to above
    /*
      [
        {
          id: 1
          cards: [
            {
              id: 1
              highscore: 
            }
          ]
          progress, accuracy, has badge
        }
      ]
    */
    //then iterate through each of the objects inside the cards array, looking it up in the cards table to get the static
    //information for each one like the character, translation, and ipa
    /*
      [
        {
          id: 1
          cards: [
            {
              id: 1
              character:
              translation:
              ...
              highscore: 
            }
          ]
          progress, 
          accuracy, 
          has_badge,
          topic
        }
      ]
    */
    // then create the object that will reference the allDecks array and create all the keys seen in the practicePage reducer's initial state
    const practicePageState = {
      currentDeck: null,
      currentCard: null,
      currentCardIndex: 0,
      allDecks: null,
      recentUserDecksInfo: null
    };
    //add on the currentDeck -- (iterate through and find the basic Deck), set that to the current
    //currentCard will be currentDeck will be currentDeck.cards[0]
    //currentCardIndex will be 0
    //allDecks will be set to the massive array created up top
    //recentUserDecksInfo will be created by taking the first 2 things in the allDecks array minus the cards array

    // then create a massive object (call it state tree)
    const stateTree = {};
    //add in both the practicePageState and the profileInfo as keys on it
    //res.json the state tree


    // grab the 
    //inside the decks table
    // all Decks that the user is associated with
    //inside the users_decks table
      // the accuracy and deck progress added onto each deck object
      // then take a look at the has_badge to add to the badges array
    // all the cards for each deck 
    // highscore information for each card added to each card
    // recent Decks (determined by timestamp) -- but for now will be the first 3 decks in the all decks array
  });
router.route('/recentDecks')
  .get((req, res) => {
    const userID = req.user.id;
    // having some real trouble here trying to get the deck info for all decks for the user in the users_recent_decks table
    // take user ID and get all all decksIDs from the from the users_recent_decks table
    // then select the progress and accuracy from the users_decks table where userID = req.user.id and deck_id in (deckIDs gotten above)
    // then select * from decks where id in (deckID's gotten from above)
    // then using a for loop you should be able to iterate through both those arrays and produce an array of objects with all the
    // properties you'd need ∏
    knex.from('users_recent_decks')
      .innerJoin('profiles', 'profiles.id', 'users_recent_decks.user_id')
      .innerJoin('decks', 'decks.id', 'users_recent_decks.deck_id')
      .select('deck_id', 'topic', 'image', 'badge')
      .then(joinTable => {
        console.log('the join table', joinTable);
        res.json(joinTable);
      })
      .catch(err => {
        console.log('error occurred retrieving decks for user', userID, 'err:', err);
        res.sendStatus(500);
      });
  })
  .post((req, res) => {
    const userID = req.user.id;
    const { topic, timestamp } = req.body;
    let deckID;
    // find the id of the deck associated with that topic
    knex.select('id').from('decks').where({topic})
      .then(deckRow => {
        deckID = deckRow[0].id;
        // check to see if that deck is already there -- if so we'll just update the timestamp
        return knex.select().from('users_recent_decks').where({deck_id: deckID});
      })
      .then(existingDeckInfo => {
        console.log('existingDeckInfo', existingDeckInfo);
        console.log('deckID inside existingDeckInfo block', deckID);
        // if that deck isn't already there, then make an insertion
        if (!existingDeckInfo.length) {
          console.log('deck not found -- inserting into users_recent_decks');
          knex('users_recent_decks').insert({user_id: userID, deck_id: deckID, time_stamp: timestamp})
            .then(insertionInfo => {
              // now we need to take a look at how many rows are there -- if > 3, we need to delete the oldest
              return knex.select().from('users_recent_decks').where({user_id: userID});
            })
            .then(recentDecksForUser => {
              if (recentDecksForUser.length > 3) {
                // time to delete the oldest one
                console.log('more than 3 recent decks -- deleting');
                // sort the recentDeck rows by the timestamp
                recentDecksForUser.sort((a, b) => a - b);
                //then grab the timestamp of the first row - the lowest time stamp = least recently inserted
                const oldestTimeStamp = recentDecksForUser[0].time_stamp;
                knex('users_recent_decks').where({'time_stamp': oldestTimeStamp}).del()
                  .then(deletionInfo => {
                    res.sendStatus(201);
                  })
                  .catch(err => {
                    console.log('failure to delete oldest timestamp');
                    res.sendStatus(500);
                  });
              } else {
                console.log('recent decks number less than 3 -- nothing to delete');
                // nothing to do, simply send back a successful response
                res.sendStatus(201);
              } 
            })
            .catch(err => {
              console.log(err);
              res.sendStatus(500);
            });
        } else {
          // the deck was already there -- just update the timestamp
          knex('users_recent_decks').where({deck_id: deckID}).update({time_stamp: timestamp})
            .then(successfulUpdateResult => {
              console.log('successful update');
              res.sendStatus(201);
            })
            .catch(err => {
              console.log('error updating deck timestamp');
              res.sendStatus(500);
            });
        }
      })
      .catch(err => {
        console.log('something went wrong', err);
        res.sendStatus(500);
      });
    //on the client side, once the status code has been received (hopefully 201)
    // send a get request for recentDecks and then update the state accordingly -- the end
  }); 

module.exports = router;
