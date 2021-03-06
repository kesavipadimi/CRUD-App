import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootreducer from '../Redux/Reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootreducer, {}, composeEnhancers(applyMiddleware(thunk)))

export default store;