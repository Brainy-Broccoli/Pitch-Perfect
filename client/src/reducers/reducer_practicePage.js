// basics deck
const cardMom = {
  character: '妈妈',
  IPA: 'mama',
  pinyin: 'mama',
  translation: 'mom',
  userAccuracy: 85,
  positionInDeck: 0 
};

const cardDog = {
  character: '狗',
  IPA: 'gou',
  pinyin: 'gou',
  translation: 'dog',
  userAccuracy: 49,
  positionInDeck: 1
};

const cardTall = {
  character: '高',
  IPA: 'gao',
  pinyin: 'gao',
  translation: 'tall',
  userAccuracy: 31,
  positionInDeck: 2
};

// food deck

const cardApple = {
  character: '苹果',
  IPA: 'pingguo',
  pinyin: 'pingguo',
  translation: 'apple',
  userAccuracy: 55,
  positionInDeck: 0
}

const cardBeef = {
  character: '牛肉',
  IPA: 'Niúròu',
  pinyin: 'Niúròu',
  translation: 'beef',
  userAccuracy: 67,
  positionInDeck: 1
}

const cardEggs = {
  character: '蛋',
  IPA: 'Dàn',
  pinyin: 'Dàn',
  translation: 'eggs',
  userAccuracy: 73,
  positionInDeck: 2
}

const cards = [cardMom, cardDog, cardTall, cardEggs];
const basicDeck = {
  topic: 'Basics',
  cards,
  image: 'http://images.twinkl.co.uk/image/private/t_630/image_repo/17/92/T2-G-357-Basic-Chinese-Phrases-PowerPoint.jpg'
};

const cardsFood = [cardApple, cardBeef, cardEggs, cardMom];
const foodDeck = {
  topic: 'Food',
  cards: cardsFood,
  image: 'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg'
};

const allDecks = [foodDeck, basicDeck];


const initialState = {
  currentDeck: basicDeck,
  currentCard: basicDeck.cards[0],
  allDecks
};

const newState = {
  currentDeck: foodDeck,
  currentCard: foodDeck.cards[0],
  allDecks
};


const practicePage = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_DECK':
      console.log('deck has been selected with', action.deckIndex);
      return {
        currentDeck: state.allDecks[action.deckIndex],
        currentCard: state.allDecks[action.deckIndex].cards[0],
        allDecks: state.allDecks
      };
    case 'SELECT_CARD': 
      return {
        currentDeck: state.currentDeck,
        currentCard: state.currentDeck.cards[action.cardPos],
        allDecks: state.allDecks
      };
    case 'SELECT_PREVIOUS_CARD':
      return {
        currentDeck: state.currentDeck,
        currentCard: state.currentDeck.cards[state.currentCard.positionInDeck - 1] ? state.currentDeck.cards[state.currentCard.positionInDeck - 1] : state.currentCard,
        allDecks: state.allDecks
      };
    case 'SELECT_NEXT_CARD':
      return {
        currentDeck: state.currentDeck,
        currentCard: state.currentDeck.cards[state.currentCard.positionInDeck + 1] ? state.currentDeck.cards[state.currentCard.positionInDeck + 1] : state.currentCard,
        allDecks: state.allDecks
      };
    default:
      return state;
  }
};

export default practicePage;