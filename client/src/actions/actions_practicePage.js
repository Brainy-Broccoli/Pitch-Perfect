import { SELECT_CARD, SELECT_DECK } from './actionTypes';

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