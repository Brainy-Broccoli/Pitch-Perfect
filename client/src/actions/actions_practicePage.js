import { SELECT_CARD, SELECT_PREVIOUS_CARD, SELECT_NEXT_CARD, SELECT_DECK, SELECT_RECENT_ACTIVITY_DECK, LOAD_PRACTICE_PAGE } from './actionTypes';

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

export const selectRecentActivityDeck = (topic) => {
  return {
    type: SELECT_RECENT_ACTIVITY_DECK,
    topic
  };
};

export const loadPracticePage = (practicePageState) => ({
  type: LOAD_PRACTICE_PAGE,
  practicePageState,
});
