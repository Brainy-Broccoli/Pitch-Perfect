const cardMom = {
  character: '妈妈',
  IPA: 'mama',
  pinyin: 'mama',
  soundUrl: 'soundcloud.com',
  translation: 'mom',
  userAccuracy: 85,
  positionInDeck: 0 
};

const initialState = cardMom;

const currentCard = (state = initialState, action) => {
  // action -- updating the card info
  switch (action.type) {
    case 'SELECT_CARD':
      return action.newCard;
    default:
      return state;
  }
};

export default currentCard;