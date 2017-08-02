import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';
import appReducer from './reducers';
import App from './components/App';
// import { autoRehydrate, persistStore } from 'redux-persist';

// let store = compose(autoRehydrate())(createStore)(appReducer);
// persistStore(store);

// fetch request here


let store = createStore(appReducer);


render(
  <Provider store={store}>
    <App style={{background: 'green'}}/>
  </Provider>,
  document.getElementById('root')
);