/**
 * store enhencer
 * @param  {[type]} syncReducers [description]
 * @return {[type]}              [description]
 */
const lazyReducerEnhancer = syncReducers => createStore => (reducer, preloadedState, enhancer) => {
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

export default lazyReducerEnhancer;
