import deck from './deck';
import card from './card';
import profileInfo from './reducer_profile';
import activePage from './reducer_page';

import { combineReducers } from 'redux';

// import all the other reducers from all the other files in this directory

// use combineReducers() on the object containing all the other reducers

// export default resultOfCombineReducers

const appReducer = combineReducers({
  deck, 
  card,
  profileInfo,
  activePage
});

export default appReducer;