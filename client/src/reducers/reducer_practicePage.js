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

const cards = [cardMom, cardDog, cardTall];
const cardsFood = [cardApple, cardBeef, cardEggs];

const newState = {
  currentDeck: {
    cardsFood,
    topic: 'Food',
  },
  currentCard: cardsFood[0]
};

const initialState = {
  currentDeck: {
    cards,
    topic: 'Basics',
  },
  currentCard: cards[0]
};

const practicePage = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_DECK': 
      return {
        currentDeck: action.selectedDeck,
        currentCard: action.selectedDeck[0]
      }
    case 'SELECT_CARD': 
      return {
        currentDeck: state.currentDeck,
        currentCard: state.currentDeck.cards[action.cardPos]
      };
    case 'SELECT_PREVIOUS_CARD':
      return {
        currentDeck: state.currentDeck,
        currentCard: state.currentDeck.cards[state.currentCard.positionInDeck - 1] ? state.currentDeck.cards[state.currentCard.positionInDeck - 1] : state.currentCard
      };
    case 'SELECT_NEXT_CARD':
      return {
        currentDeck: state.currentDeck,
        currentCard: state.currentDeck.cards[state.currentCard.positionInDeck + 1] ? state.currentDeck.cards[state.currentCard.positionInDeck + 1] : state.currentCard
      };
    default:
      return state;
  }
};

export default practicePage;