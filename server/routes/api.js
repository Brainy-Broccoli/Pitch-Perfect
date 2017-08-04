'use strict';
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
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

router.route('/create-card')
  .post((req, res) => {
    console.log('REQUEST BODY', typeof req.body.female_pitch_data);
    knex('cards').insert({
      translation: req.body.translation,
      character: req.body.character,
      pinyin: req.body.pinyin,
      IPA: req.body.IPA,
      female_voice: req.body.female_voice,
      tone: req.body.tone,
      female_pitch_data: JSON.stringify(req.body.female_pitch_data),
      regression: JSON.stringify(req.body.regression),
    })
    .returning('id')
    .then(function(id) {
      console.log('first id', id);
      knex('users_cards').insert({
        user_id: req.user.id,
        card_id: id[0]
      })
      .then(
        res.status(201).send('Got it')
      );
    });
  });

router.route('/card/:id/soundData')
  .put((req, res) => {
    console.log('put request received');
    const { soundData, regression } = req.body;
    console.log(soundData, regression);
    knex('cards')
      .where({id: req.params.id})
      .update({
        female_pitch_data: JSON.stringify(soundData),
        regression: JSON.stringify(regression)
      })
      .then(insertionResults => {
        console.log('successful insertion', insertionResults);
        res.sendStatus(201);
      })
      .catch(err => {
        console.log('err updating cards table', err);
        res.sendStatus(500);
      });
  })
  .get((req, res) => {
    knex('cards').select('female_pitch_data', 'regression').where({id: req.params.id})
      .then(pitchData => {
        res.json(pitchData);
      })
      .catch(err => {
        console.log('err retrieving pitch data for the card', err);
        res.sendStatus(500);
      });
  });

router.route('/create-custom-deck')
  .post((req, res) => {
    knex('decks').insert({
      topic: req.body.topic,
      image: req.body.image,
      badge: req.body.badge,
      default: false
    })
    .returning('id')
    .then(function(id) {
      console.log('first id', id);
      knex('users_decks').insert({
        user_id:req.user.id,
        deck_id:id[0],
        has_badge: false,
        deck_progress: 0,
        total_cards: req.body.total
      })
      .returning('deck_id')
      .then(function(deckId) {
        console.log('second id', deckId);
        Promise.all(req.body.cards.map((card) => {
          return knex('decks_cards').insert({
            deck_id:deckId[0],
            card_id:card.card_id
          })
        }))
        return deckId;
      })
        // .returning('deck_id')
        .then(function(deckId) {
          console.log('third id', deckId);
          // knex.from('decks')
          //   .where({id: deckId[0]})
          //   .then(data => {
          //     console.log('SERVER DATA', data);
          //     res.json(data)
          //   })
          knex.from('users_decks')
            // .innerJoin('profiles', 'users_decks.user_id', '=', 'profiles.id')
            .innerJoin('decks', 'users_decks.deck_id', '=', 'decks.id')
            .where({deck_id: deckId[0]})
            .then( data => {
              console.log('FINAL DATA', data);
              return data.map( deck => ({
                id: deck.id,
                progress: deck.deck_progress,
                accuracy: deck.accuracy,
                topic: deck.topic,
                image: deck.image,
                badge: deck.badge,
                has_badge: deck.has_badge
              }))
            })
            .then(deck => {
              res.json(deck);
            })
        })
      })
    })
  // })
    // .catch(err => res.status(500).send('New Deck not retrieved' + err));

  // .catch(err => res.status(500).send('Deck was not updated' + err));

// router.route('/decks')
//   .get((req, res) => {
//     knex.from('users_decks')
//       .innerJoin('decks', 'users_decks.deck_id', '=', 'decks.id')
//       .where({user_id: req.user.id})
//       .then(data => {

//         console.log('DATAAAAAAAAAA', data);
//         res.json(data);
//       //   ({
//       //   id: deck.deck_id,
//       //   progress: deck.deck_progress,
//       //   accuracy: deck.accuracy,
//       //   topic: deck.topic,
//       //   image: deck.image,
//       //   badge: deck.badge,
//       //   has_badge: deck.has_badge
//       // })
//       })
//   })




router.route('/profileInfo')
  .get((req, res) => {
    const userID = req.user.id;
    const name = `${req.user.first} ${req.user.last}`;
    const badges = [];
    const photo = req.user.photo;
    const isMentor = req.user.mentor || false;
    const profilePageData = {
      name,
      badges,
      photo,
      isMentor
    };

    const allDecks = [];
    knex.from('users_decks')
      .innerJoin('profiles', 'users_decks.user_id', '=', 'profiles.id')
      .innerJoin('decks', 'users_decks.deck_id', '=', 'decks.id')
      .where({user_id: userID})  
      .then( data => data.map( deck => ({
        id: deck.deck_id,
        progress: deck.deck_progress,
        accuracy: deck.accuracy,
        topic: deck.topic,
        image: deck.image,
        badge: deck.badge,
        has_badge: deck.has_badge,
        default: deck.default
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
                female_pitch_data: card.female_pitch_data,
                regression: card.regression,
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
router.route('/recentDecks')
  .get((req, res) => {
    /* THE OLD WAY OF TRYING TO DO IT */
    // knex.from('users_recent_decks')
    //   .innerJoin('profiles', 'profiles.id', 'users_recent_decks.user_id')
    //   .innerJoin('decks', 'decks.id', 'users_recent_decks.deck_id')
    //   .select('deck_id', 'topic', 'image', 'badge')
    //   .then(joinTable => {
    //     console.log('the join table', joinTable);
    //     res.json(joinTable);
    //   })
    //   .catch(err => {
    //     console.log('error occurred retrieving decks for user', userID, 'err:', err);
    //     res.sendStatus(500);
    //   });

    // having some real trouble here trying to get the deck info for all decks for the user in the users_recent_decks table
    // take user ID and get all all decksIDs from the from the users_recent_decks table
    // then select the progress and accuracy from the users_decks table where userID = req.user.id and deck_id in (deckIDs gotten above)
    // then select * from decks where id in (deckID's gotten from above)
    // then using a for loop you should be able to iterate through both those arrays and produce an array of objects with all the
    // properties you'd need 

    /* THE NEW WAY OUTLINED ABOVE */
    const userID = req.user.id;
    const recentDecks = [];
    let recentDeckIDs, userSpecificDeckInfo, timestampInfo, deckMetaInfoRows;
    knex.select('deck_id', 'time_stamp').from('users_recent_decks').where({'user_id': userID})
      .then(deckIDRows => {
        console.log('deckIDRows', deckIDRows);
        recentDeckIDs = deckIDRows.map(deckIDRow => deckIDRow.deck_id);
        deckIDRows.sort((a, b) => a.deck_id - b.deck_id);
        timestampInfo = deckIDRows;
        console.log('recent Deck IDs', recentDeckIDs);
        return knex.select('deck_id', 'deck_progress', 'accuracy').from('users_decks')
          .where({user_id: userID})
          .andWhere('deck_id', 'in', recentDeckIDs);
      })
      .then(userSpecificRows => {
        //now need to sort it by id so I can use one for loop to iterate through all 
        userSpecificRows.sort((a, b) => a.deck_id - b.deck_id);
        userSpecificDeckInfo = userSpecificRows;
        console.log('user specific rows', userSpecificRows);

        // now time to get the info that is general for each of those decks
        return knex.select().from('decks').where('id', 'in', recentDeckIDs);
      })
      .then(deckMetaInfo => {
        deckMetaInfo.sort((a, b) => a.id - b.id);
        console.log('deck meta info', deckMetaInfo);
        deckMetaInfoRows = deckMetaInfo;
        //need to grab the total number of cards for each deck
        //return another knex statement for selection, then do the for loop in the subsequent then
        return knex.select().from('decks_cards').whereIn('deck_id', recentDeckIDs);
      })
      .then(cardsInRecentDecks => {
        const cardCounts = {}; // id: count
        //count the total number of cards for every deck id in recent deck IDS
        recentDeckIDs.forEach(deckID => {
          for (let i = 0; i < cardsInRecentDecks.length; i++) {
            if (cardsInRecentDecks[i].deck_id === deckID) {
              if (cardCounts[deckID]) {
                cardCounts[deckID]++;
              } else {
                cardCounts[deckID] = 1;
              }
            }
          }
        });
        //now push all those key value pairs into an array and sort by id so the below for loop works correctly
        const cardCountsTuples = [];
        for (let deckID in cardCounts) {
          cardCountsTuples.push([deckID, cardCounts[deckID]]);
        }
        cardCountsTuples.sort((a, b) => a[0] - b[0]);
        console.log('card counts tuples (deck, # cards)', cardCountsTuples);
        //now to combine the user specific information with the meta info to create the exact objects we'll need
        for (let i = 0; i < deckMetaInfoRows.length; i++) {
          //create the deck object with the combination of info and then push it into the recentDecks array
          //make sure to have key names be exactly as they are referenced in the components that make use of this data
          //additionally, will be adding on the actual id as it appears in the db so that the on-click for recent activity won't send a topic
          recentDecks.push({
            progress: userSpecificDeckInfo[i].deck_progress,
            accuracy: userSpecificDeckInfo[i].accuracy,
            topic: deckMetaInfoRows[i].topic,
            image: deckMetaInfoRows[i].image,
            badge: deckMetaInfoRows[i].badge,
            timestamp: timestampInfo[i].time_stamp,
            total: cardCountsTuples[i][1],
            dbID: deckMetaInfoRows[i].id
          });
        }
        recentDecks.sort((a, b) => b.timestamp - a.timestamp);
        console.log('all recent deck objects', recentDecks);
        res.json(recentDecks);
      })
      .catch(err => {
        console.log('err', err);
        res.sendStatus(500);
      });


  })
  .post((req, res) => {
    const userID = req.user.id;
    const { deckDbID, timestamp } = req.body;
    knex.select().from('users_recent_decks').where({deck_id: deckDbID, user_id: userID})
      .then(existingDeckInfo => {
        // console.log('existingDeckInfo', existingDeckInfo);
        // console.log('deckDbID inside existingDeckInfo block', deckDbID);
        // if that deck isn't already there, then make an insertion
        if (!existingDeckInfo.length) {
          // console.log('deck not found -- inserting into users_recent_decks');
          knex('users_recent_decks').insert({user_id: userID, deck_id: deckDbID, time_stamp: timestamp})
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
          knex('users_recent_decks').where({deck_id: deckDbID, user_id: userID}).update({time_stamp: timestamp})
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

router.route('/card/:id')
  .post(middleware.auth.verify, (req, res) => {
    console.log(req.body);
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
        ))).then( deckCompletions => 
        Promise.all( deckCompletions.map( deck => 
          knex.from('users_decks')
            .where({
              user_id: userID,
              deck_id: deck.deckID
            })
            .update({
              deck_progress: deck.completeCount,
              accuracy: deck.average
            })
            .returning('deck_id')
            .then( (deckIDs) => {
              console.log('deckIDs', deckIDs);
              return Promise.all(deckIDs.map(deckID => 
                console.log('typeof deckID', typeof deckID) || 
                knex.select('deck_id', 'user_id', 'deck_progress', 'total_cards').from('users_decks')
                  .where({deck_id: deckID, user_id: userID})
                  .then(progressAndTotal => {
                    console.log('progressAndTotal', progressAndTotal);
                    Promise.all(progressAndTotal.map(progressAndTotalRow => {
                      if (progressAndTotalRow.deck_progress === progressAndTotalRow.total_cards) {
                        return knex('users_decks')
                          .where({deck_id: progressAndTotalRow.deck_id, user_id: progressAndTotalRow.user_id})
                          .update({has_badge: true});
                      }
                    })
                    );
                  })
              ));
            })
            .then(successfulUpdateResult => console.log('success', successfulUpdateResult))
            .catch(err => console.log('error updating has_badge', err))
            
        ))).then(()=>res.send('ok')).catch( err=> console.error(err) || res.status(500).send(err));
  });

module.exports = router;
