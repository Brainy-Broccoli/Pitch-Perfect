// basic deck's cards

// const cardMom = {
//   character: '妈妈',
//   IPA: 'mama',
//   female_pitch_data: '11234',
//   pinyin: 'mama',
//   translation: 'mom',
//   userAccuracy: 85,        
//   female_voice: 'https://s3-us-west-1.amazonaws.com/pitch-perfect-thesis/Female+sound+files/mother-ma-2.wav'
// };

// const cardMom = {
//   character: '妈妈',
//   IPA: 'mama',
//   pinyin: 'mama',
//   translation: 'mom',
//   userAccuracy: 85,        
//   female_voice: 'https://s3-us-west-1.amazonaws.com/pitch-perfect-thesis/Female+sound+files/mother-ma-2.wav'
// };


// const cardDog = {
//   character: '狗',
//   IPA: 'gou',
//   pinyin: 'gou',
//   translation: 'dog',
//   userAccuracy: 49,
//   female_voice: 'https://s3-us-west-1.amazonaws.com/pitch-perfect-thesis/Female+sound+files/dog-gou.wav'
// };

// const cardTall = {
//   character: '高',
//   IPA: 'gao',
//   pinyin: 'gao',
//   translation: 'tall',
//   userAccuracy: 31,
//   female_voice: 'https://s3-us-west-1.amazonaws.com/pitch-perfect-thesis/Female+sound+files/tall-gao.wav'
// };

// // food deck's cards
// const cardApple = {
//   character: '苹果',
//   IPA: 'pingguo',
//   pinyin: 'pingguo',
//   translation: 'apple',
//   userAccuracy: 55,
//   female_voice: 'https://s3-us-west-1.amazonaws.com/pitch-perfect-thesis/Female+sound+files/apple-pingguo.wav'
// };

// const cardBeef = {
//   character: '牛肉',
//   IPA: 'Niúròu',
//   pinyin: 'Niúròu',
//   translation: 'beef',
//   userAccuracy: 67,
//   female_voice: 'https://s3-us-west-1.amazonaws.com/pitch-perfect-thesis/Female+sound+files/beef-niurou.wav'
// };

// const cardEggs = {
//   character: '蛋',
//   IPA: 'Dàn',
//   pinyin: 'Dàn',
//   translation: 'eggs',
//   userAccuracy: 73,
//   female_voice: 'https://s3-us-west-1.amazonaws.com/pitch-perfect-thesis/Female+sound+files/eggs-dan.wav'
// };
// basics card array
// const cards = [cardMom, cardDog, cardTall, cardEggs];
// const basicDeck = {
//   topic: 'Basics',
//   cards,
//   image: 'http://images.twinkl.co.uk/image/private/t_630/image_repo/17/92/T2-G-357-Basic-Chinese-Phrases-PowerPoint.jpg'
// };

// //food card array
// const cardsFood = [cardApple, cardBeef, cardEggs, cardMom];
// const foodDeck = {
//   topic: 'Food',
//   cards: cardsFood,
//   image: 'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg'
// };

// const allDecks = [foodDeck, basicDeck];

// const recentUserDecksInfo = [
//   {
//     topic: 'Food',
//     image: 'http://worldartsme.com/images/chinese-restaurant-clipart-1.jpg',
//     badge: 'https://proprofs-cdn.s3.amazonaws.com/images/games/user_images/misc/5211927825.png',
//     progress: 6,
//     total: 13,
//     accuracy: 89 + '%'
//   },
//   {
//     topic: 'Travel',
//     image: 'https://iabuk.net/sites/default/files/styles/thumbnail/public/shutterstock_58918264.jpg?itok=sYn7AJu0',
//     badge: 'http://www.freeiconspng.com/uploads/travel-3-icon--colorflow-iconset--tribalmarkings-24.png',
//     progress: 8,
//     total: 19,
//     accuracy: 32 + '%'
//   },
//   {
//     topic: 'Weather',
//     image: 'https://icons.wxug.com/i/c/v4/partlycloudy.svg',
//     badge: 'http://icons.iconarchive.com/icons/bokehlicia/pacifica/256/weather-icon.png',
//     progress: 7,
//     total: 18,
//     accuracy: 55 + '%'
//   }
// ];

const initialState = {
  currentDeck: {},
  currentCard: {},
  currentCardIndex: 0,
  allDecks: [],
  recentUserDecksInfo: []
};

// TODO: refactor to use Object.assign() or the object spread operator
// TODO: remove the conditionals from the card selection cases -- perform the check for currentCardIndex on the client side. as of now, same input (action.type) produces different outputs. 
const practicePage = (state = initialState, action) => {
  //console.log('state in practice page', state);
  switch (action.type) {
    case 'RECEIVE_UPDATED_RECENT_DECKS':
      console.log('receiving new deck information');
      return Object.assign({}, state, action.payload);
    case 'LOAD_PRACTICE_PAGE':
      return action.practicePageState;
    case 'SELECT_DECK':
      console.log('deck has been selected with index', action.deckIndex);
      let newState = {
        currentDeck: state.allDecks[action.deckIndex],
        currentCard: state.allDecks[action.deckIndex].cards[0],
        currentCardIndex: 0,
        allDecks: state.allDecks,
        recentUserDecksInfo: state.recentUserDecksInfo
      };
      newState.deckIndex = action.deckIndex;
      return newState;
      // return {
      //   currentDeck: state.allDecks[action.deckIndex],
      //   currentCard: state.allDecks[action.deckIndex].cards[0],
      //   currentCardIndex: 0,
      //   allDecks: state.allDecks,
      //   recentUserDecksInfo: state.recentUserDecksInfo
      // };
    case 'SELECT_RECENT_ACTIVITY_DECK':
      //console.log('a recent activity deck has been selected with topic', action.topic);
      const selectedDeckID = action.dbID;
      let newDeck;
      state.allDecks.forEach(deck => {
        if (deck.id === selectedDeckID) {
          newDeck = deck;
        }
      });
      return {
        currentDeck: newDeck || state.currentDeck,
        currentCard: newDeck ? newDeck.cards[0] : state.currentCard,
        currentCardIndex: 0,
        allDecks: state.allDecks,
        recentUserDecksInfo: state.recentUserDecksInfo
      };
    case 'SELECT_CARD':
      console.log('a card has been selected');
      return {
        currentDeck: state.currentDeck,
        currentCard: state.currentDeck.cards[action.cardPos],
        currentCardIndex: action.cardPos,
        allDecks: state.allDecks,
        recentUserDecksInfo: state.recentUserDecksInfo
      };
    case 'SELECT_PREVIOUS_CARD':
      return {
        currentDeck: state.currentDeck,
        currentCard: state.currentDeck.cards[state.currentCardIndex - 1] ? state.currentDeck.cards[state.currentCardIndex - 1] : state.currentCard,
        currentCardIndex: state.currentCardIndex > 0 ? state.currentCardIndex - 1 : state.currentCardIndex,
        allDecks: state.allDecks,
        recentUserDecksInfo: state.recentUserDecksInfo
      };
    case 'SELECT_NEXT_CARD':
      return {
        currentDeck: state.currentDeck,
        currentCard: state.currentDeck.cards[state.currentCardIndex + 1] ? state.currentDeck.cards[state.currentCardIndex + 1] : state.currentCard,
        currentCardIndex: state.currentCardIndex < state.currentDeck.cards.length - 1 ? state.currentCardIndex + 1 : state.currentCardIndex,
        allDecks: state.allDecks,
        recentUserDecksInfo: state.recentUserDecksInfo
      };
    case 'ADD_DECK':
      state.allDecks.push(action.newDeck);
      console.log('state.allDecks', state.allDecks)
      return state;
    default:
      return state;
  }
};

export default practicePage;