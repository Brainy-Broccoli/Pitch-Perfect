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

const cards = [cardMom, cardDog, cardTall];

const initialState = {
  currentDeck: {
    cards,
    topic: 'Basics',
  },
  currentCard: cards[0]
};

const practicePage = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_CARD': 
      return {
        currentDeck: state.currentDeck,
        currentCard: state.currentDeck.cards[action.cardPos]
      }
    default:
      return state;
  }
};

export default practicePage;