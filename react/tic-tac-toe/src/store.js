import { createStore } from 'redux';
import game from './reducers';

var store = createStore(game);

export default store;
