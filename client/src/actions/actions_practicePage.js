import { SELECT_CARD, SELECT_PREVIOUS_CARD, SELECT_NEXT_CARD } from './actionTypes';

export const selectCard = (cardPos) => {
  return {
    type: SELECT_CARD,
    cardPos
  };
};

export const selectDeck = (deck) => {
  return {
    type: SELECT_DECK,
    deck
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