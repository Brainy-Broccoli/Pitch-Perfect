import practicePage from './reducer_practicePage';
import profileInfo from './reducer_profile';
import activePage from './reducer_navBar';
import decksInfo from './reducer_allDecks';

import { combineReducers } from 'redux';

// import all the other reducers from all the other files in this directory

// use combineReducers() on the object containing all the other reducers

// export default resultOfCombineReducers

const appReducer = combineReducers({
  practicePage,
  profileInfo,
  decksInfo,
  activePage
});

export default appReducer;
