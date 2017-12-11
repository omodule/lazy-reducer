# lazy-reducer
[![Build Status](https://travis-ci.org/omodule/lazy-reducer.svg?branch=master)](https://travis-ci.org/omodule/lazy-reducer)
[![npm version](https://img.shields.io/npm/v/lazy-reducer.svg?style=flat-square)](https://www.npmjs.com/package/lazy-reducer)  
Dynamically load reducer.

## Install
```
npm install --save-dev lazy-reducer
```
## API

### Setup
#### `lazyReducerEnhancer`
redux enhancer
```javascript
import { lazyReducerEnhancer } from 'lazy-reducer';

const rootReducerObj = {
    nameA: reducerA,
    nameB: reducerB
};
const store = createStore(combineReducers(rootReducerObj), {}, lazyReducerEnhancer(rootReducerObj));
```

### Usage
#### `<LazyReducer reducers/>`
```javascript
import { LazyReducer } from 'lazy-reducer';

<LazyReducer
    reducers={{
        nameA: someReducer1,
        nameB: someReducer2
    }}
>
    <AnyComponent />
</LazyReducer>
```

```javascript
<LazyReducer
    reducers={done => {
        setTimeout(() => {
            done({
                nameA: someReducer1,
                nameB: someReducer2
            })
        }, 1000)
    }}
>
    <AnyComponent />
</LazyReducer>


```

#### `withLazyReducer(reducers)`
###### HOC
```javascript
import { withLazyReducer } from 'lazy-reducer'

class Comp extends Component {
    render() {
        <div>i am a Component wrapped by lazy reducer !</div>
    }
}

export default withLazyReducer({
    nameA: someReducer1,
    nameB: someReducer2
})(Comp)
```

```javascript
export default withLazyReducer(done => {
    setTimeout(() => {
        done({
            nameA: someReducer1,
            nameB: someReducer2
        })
    }, 1000)
})(Comp)
```

###### @Decorator
```javascript
import { withLazyReducer } from 'lazy-reducer';

@withLazyReducer({
    nameA: someReducer1,
    nameB: someReducer2
})
class Comp extends Component {
    render() {
        <div>i am a Component wrapped by lazy reducer !</div>;
    }
}
```

```javascript
@withLazyReducer(done => {
    setTimeout(() => {
        done({
            nameA: someReducer1,
            nameB: someReducer2
        })
    }, 1000)
})
class Comp extends Component {
    render() {
        <div>i am a Component wrapped by lazy reducer !</div>
    }
}

```



## example
[examples](./examples)
