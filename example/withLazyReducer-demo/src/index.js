import 'babel-polyfill'; // ES6 polyfill
import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import rootReducerObj from './rootReducerObj.js';
import App from './App';
import { Provider } from 'react-redux';
import { lazyReducerEnhancer } from '../../../src';

const store = createStore(combineReducers(rootReducerObj), {}, lazyReducerEnhancer(rootReducerObj));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
