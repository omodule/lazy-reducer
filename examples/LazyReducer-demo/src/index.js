// import 'babel-polyfill'; // ES6 polyfill
import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import rootReducers from './rootReducers'
import App from './App'
import { Provider } from 'react-redux'
import { lazyReducerEnhancer } from 'lazy-reducer'

const store = createStore(combineReducers(rootReducers), {}, lazyReducerEnhancer(rootReducers))

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
