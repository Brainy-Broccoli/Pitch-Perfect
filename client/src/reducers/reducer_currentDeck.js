// a reducer is a pure function that takes initial state and an action object

// building up a reducer is like teaching it to understand different actions 

// it must return a whole new version of the original state that reflects the modifications entailed by the action type

// don't forget the default case for when the action type doesn't apply for this particular reducer

// import action types

// teach the reducer to handle different action types

// export default reducerFunctionReference

// a deck will be an array of card objects

const cardMom = {
  character: '妈妈',
  IPA: 'mama',
  pinyin: 'mama',
  translation: 'mom',
  userAccuracy: 85,
  positionInDeck: 1 
};

const cardDog = {
  character: '狗',
  IPA: 'gou',
  pinyin: 'gou',
  translation: 'dog',
  userAccuracy: 49,
  positionInDeck: 2 
};

const cardTall = {
  character: '高',
  IPA: 'gao',
  pinyin: 'gao',
  translation: 'tall',
  userAccuracy: 131,
  positionInDeck: 3 
};

const initialState = [cardMom, cardDog, cardTall];

const currentDeck = (state = initialState, action) => {
  // actions -- changing the deck
  switch (action.type) {
    default:
      return state;
  }
};

export default currentDeck;