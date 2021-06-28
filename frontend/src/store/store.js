import { createStore } from 'redux';
import mainReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  mainReducer,
  // composeWithDevTools()
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;