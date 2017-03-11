# lazy-reducer
Attach redux `reducer` to react-route `onEnter` hook.

## Install
```
npm install --save lazy-reducer
```
## API

#### `attach(route, store, callback)`
Attach the reducer to the route.

```js
callback(err, {
    [key]: asyncReducer
});
```

#### `lazyReducerEnhancer(syncReducer)`
redux enhancer


## example
[example](./example)

## Setup
```js
import syncReducers from './reducer';
import routeForReducerAttach from './routeForReducerAttach';
import { routeAttachReducer,  attach } from 'lazy-reducer';

const store = createStore(
    combineReducers(syncReducers),
    {},
    lazyReducerEnhancer(syncReducers)
);

const routeAttachReducer = attach(routeForReducerAttach, store, cb => {
    import('./lazyReducer').then(reducer => {
        cb(null, {
            lazyReducer: reducer.default
        });
    });
});

const rootRoute = {
    path: '/',
    component: AppLayout,
    childRoutes: [otherRoute, routeAttachReducer]
};

const App = () => {
    return (
        <Provider store={store}>
            <Router history={history} routes={rootRoute} />
        </Provider>
    );
};

render(<App />, document.getElementById('root'));

```
