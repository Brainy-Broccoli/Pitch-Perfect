// basics deck
const cardMom = {
  character: '妈妈',
  IPA: 'mama',
  pinyin: 'mama',
  translation: 'mom',
  userAccuracy: 85 
};

const cardDog = {
  character: '狗',
  IPA: 'gou',
  pinyin: 'gou',
  translation: 'dog',
  userAccuracy: 49
};

const cardTall = {
  character: '高',
  IPA: 'gao',
  pinyin: 'gao',
  translation: 'tall',
  userAccuracy: 31
};

// food deck

const cardApple = {
  character: '苹果',
  IPA: 'pingguo',
  pinyin: 'pingguo',
  translation: 'apple',
  userAccuracy: 55
};

const cardBeef = {
  character: '牛肉',
  IPA: 'Niúròu',
  pinyin: 'Niúròu',
  translation: 'beef',
  userAccuracy: 67
};

const cardEggs = {
  character: '蛋',
  IPA: 'Dàn',
  pinyin: 'Dàn',
  translation: 'eggs',
  userAccuracy: 73
};

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
  currentCardIndex: 0,
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
      return {
        currentDeck: state.allDecks[action.deckIndex],
        currentCard: state.allDecks[action.deckIndex].cards[0],
        currentCardIndex: 0,
        allDecks: state.allDecks
      };
    case 'SELECT_CARD':
      console.log('a card has been selected');
      return {
        currentDeck: state.currentDeck,
        currentCard: state.currentDeck.cards[action.cardPos],
        currentCardIndex: action.cardPos,
        allDecks: state.allDecks
      };
    case 'SELECT_PREVIOUS_CARD':
      return {
        currentDeck: state.currentDeck,
        currentCard: state.currentDeck.cards[state.currentCardIndex - 1] ? state.currentDeck.cards[state.currentCardIndex - 1] : state.currentCard,
        currentCardIndex: state.currentCardIndex > 0 ? state.currentCardIndex - 1 : state.currentCardIndex,
        allDecks: state.allDecks
      };
    case 'SELECT_NEXT_CARD':
      return {
        currentDeck: state.currentDeck,
        currentCard: state.currentDeck.cards[state.currentCardIndex + 1] ? state.currentDeck.cards[state.currentCardIndex + 1] : state.currentCard,
        currentCardIndex: state.currentCardIndex < state.currentDeck.cards.length - 1 ? state.currentCardIndex + 1 : state.currentCardIndex,
        allDecks: state.allDecks
      };
    default:
      return state;
  }
};

export default practicePage;