import { SELECT_CARD, SELECT_PREVIOUS_CARD, SELECT_NEXT_CARD, SELECT_DECK } from './actionTypes';

export const selectCard = (cardPos) => {
  return {
    type: SELECT_CARD,
    cardPos
  };
};

export const selectDeck = (deckIndex) => {
  return {
    type: SELECT_DECK,
    deckIndex
  };
};

export const selectPreviousCard = () => {
  return {
    type: SELECT_PREVIOUS_CARD,
  };
};

export const selectNextCard = () => {
  return {
    type: SELECT_NEXT_CARD,

  };
};