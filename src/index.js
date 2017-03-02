import { combineReducers } from 'redux';

const makeRootReducer = (syncReducers, lazyReducers) => {
    return combineReducers({
        ...syncReducers,
        ...lazyReducers
    });
};

export const lazyReducerEnhencer = syncReducers => createStore => (
    reducer,
    preloadedState,
    enhancer
) => {
    const store = createStore(reducer, preloadedState, enhancer);
    let lazyReducersMap = {};
    store.getSyncReducers = () => syncReducers;
    store.getLazyReducers = () => lazyReducersMap;
    store.addLazyReducers = lazyReducers => {
        lazyReducersMap = { ...lazyReducersMap, ...lazyReducers };
    };
    const dispatch = store.dispatch;

    return {
        ...store,
        dispatch
    };
};

export const attach = (route, store, getLazyReducer) => {
    route = {
        ...route
    };

    if (typeof route.onEnter === 'function') {
        const realOnEnter = route.onEnter;
        const isSync = realOnEnter.length < 3;
        let counter = 0;
        route.onEnter = (nextState, replace, callback) => {
            const cb = (error, lazyReducers) => {
                if (error) {
                    console.error(error);
                }
                store.addLazyReducers(lazyReducers);
                store.replaceReducer(
                    makeRootReducer(store.getSyncReducers(), store.getLazyReducers())
                );
                counter++;

                if (isSync) {
                    realOnEnter(nextState, replace);
                    callback();
                } else {
                    realOnEnter(nextState, replace, callback);
                }
            };

            if (counter === 0) {
                getLazyReducer(cb);
            } else {
                if (isSync) {
                    realOnEnter(nextState, replace);
                    callback();
                } else {
                    realOnEnter(nextState, replace, callback);
                }
            }
        };
    } else {
        let counter = 0;
        route.onEnter = (nextState, replace, callback) => {
            const cb = (error, lazyReducers) => {
                if (error) {
                    console.error(error);
                }
                store.addLazyReducers(lazyReducers);
                store.replaceReducer(
                    makeRootReducer(store.getSyncReducers(), store.getLazyReducers())
                );
                counter++;
                callback();
            };
            if (counter === 0) {
                getLazyReducer(cb);
            } else {
                callback();
            }
        };
    }

    return route;
};
