import { PAGE_SELECTED } from './actionTypes';

export const selectPage = (pageName) => {
  return {
    type: PAGE_SELECTED,
    pageName: pageName
  };
};