import { PAGE_SELECTED } from './actionTypes';

export const selectPage = (pageName) => {
  console.log('clicked');
  return {
    type: PAGE_SELECTED,
    pageName: pageName
  };
};