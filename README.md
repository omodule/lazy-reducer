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
