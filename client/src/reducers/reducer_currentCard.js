const cardMom = {
  character: '妈妈',
  IPA: 'mama',
  pinyin: 'mama',
  soundUrl: 'soundcloud.com',
  translation: 'mom',
  userAccuracy: 85,
  positionInDeck: 1 
};

const initialState = cardMom;

const currentCard = (state = initialState, action) => {
  // action -- updating the card info
  switch (action.type) {
    case 'DROPDOWN_CARD_SELECTED':
      return action.newCard;
    default:
      return state;
  }
};

export default currentCard;