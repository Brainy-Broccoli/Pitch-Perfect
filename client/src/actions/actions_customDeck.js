import { PAGE_SELECTED } from './actionTypes';

export const addDeck = (newDeck) => {
  return {
    type: 'ADD_DECK',
    newDeck
  };
};