import deck from './deck';
import card from './card';
import { combineReducers } from 'redux';

// import all the other reducers from all the other files in this directory

// use combineReducers() on the object containing all the other reducers

// export default resultOfCombineReducers

const appReducer = combineReducers({deck, card});
console.log(typeof appReducer);
export default appReducer;