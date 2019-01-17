//redux-thunk middleware to deal with AJAX/network request through redux
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const inititalState = {};

const store = createStore(
        rootReducer, 
        inititalState, 
        //compose function used chrom extension to display sore data
        compose(applyMiddleware(thunk), 
                window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;