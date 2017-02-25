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
        route.onEnter = (nextState, replace, callback) => {
            const cb = lazyReducers => {
                store.addLazyReducers(lazyReducers);
                store.replaceReducer(
                    makeRootReducer(
                        store.getSyncReducers(),
                        store.getLazyReducers()
                    )
                );

                if (isSync) {
                    realOnEnter(nextState, replace);
                    callback();
                } else {
                    realOnEnter(nextState, replace, callback);
                }
            };
            getLazyReducer(cb);
        };
    } else {
        route.onEnter = (nextState, replace, callback) => {
            const cb = lazyReducers => {
                store.addLazyReducers(lazyReducers);
                store.replaceReducer(
                    makeRootReducer(
                        store.getSyncReducers(),
                        store.getLazyReducers()
                    )
                );
                callback();
            };
            getLazyReducer(cb);
        };
    }

    return route;
};
