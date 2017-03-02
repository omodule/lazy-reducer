import 'babel-polyfill'; // ES6 polyfill
import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import syncReducer from './modules/syncCounter/reducers/index';
import { attach, lazyReducerEnhencer } from 'lazy-reducer';
import AppLayout from './AppLayout';
import syncCounterRoute from './modules/syncCounter/route';
import lazyCounterRoute from './modules/lazyCounter/route';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import createLogger from 'redux-logger';

const syncReducers = {
    syncCounter: syncReducer
};

const store = createStore(
    combineReducers(syncReducers),
    {},
    compose(applyMiddleware(createLogger()), lazyReducerEnhencer(syncReducers))
);

window.store = store;

const routeAttachReducer = attach(lazyCounterRoute, store, cb => {
    import('./modules/lazyCounter/reducers/index').then(reducer => {
        console.log(reducer);
        cb(null, {
            lazyCounter: reducer.default
        });
    });
});

const rootRoute = {
    path: '/',
    component: AppLayout,
    childRoutes: [syncCounterRoute, routeAttachReducer]
};

const App = ({ store, routes, history }) => {
    return (
        <Provider store={store}>
            <Router history={history} routes={routes} />
        </Provider>
    );
};

render(
    <App store={store} routes={rootRoute} history={hashHistory} />,
    document.getElementById('root')
);
