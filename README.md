# lazy-reducer
[![Build Status](https://travis-ci.org/omodule/lazy-reducer.svg?branch=master)](https://travis-ci.org/omodule/lazy-reducer)
[![npm version](https://img.shields.io/npm/v/lazy-reducer.svg?style=flat-square)](https://www.npmjs.com/package/lazy-reducer)  
## 为什么使用 lazy-reducer ?
>  
在使用了 redux 的项目，普遍存在同样的问题：随着项目规模的增长， reducer 数量和代码量也相应增加。本身 redux 并未提供完善的 reducer 代码分块方案。`lazy-reducer` 通过提供 Container (容器组件) 和 HOC (高级组件) 两种方式简化 reducer 的代码分块问题。

## Install
```
npm install --save-dev lazy-reducer
```
## API

#### `lazyReducerEnhancer`
>  
使用 `lazy-reducer` 你**唯一**需要做的：添加一个 store enhencer 。  
** 注：lazyReducerEnhancer 接受的参数是一个reducers的对象，不是 combineReducers(reducers) 后的 reducer 方法。**

```javascript
import { lazyReducerEnhancer } from 'lazy-reducer';

const rootReducerObj = {
    nameA: reducerA,
    nameB: reducerB
};
const store = createStore(combineReducers(rootReducerObj), {}, lazyReducerEnhancer(rootReducerObj));
```

#### 容器组件方式 `<LazyReducer reducers/>`
>  
内联在 `LazyReducer` 中的子组件，只有当 `reducers` 被注册到 redux 中才会被渲染。

```javascript
import { LazyReducer } from 'lazy-reducer';

<LazyReducer
    reducers={done => {
        import('./someReducer').then((reducer) => {
            done({
                nameA: someReducer
            })
        })
    }}
>
    <AnyComponent />
</LazyReducer>
```

#### 高级组件方式 `withLazyReducer(reducers)`
>  
被 `withLazyReducer` 高阶组件嵌套的组件，只有当 `reducers` 被注册到 redux 中才会被渲染。

```javascript
import { withLazyReducer } from 'lazy-reducer'

class Comp extends Component {
    render() {
        <div>i am a Component wrapped by lazy reducer !</div>
    }
}

export default withLazyReducer(done => {
    import('./someReducer').then((reducer) => {
        done({
            nameA: someReducer
        })
    })
})(Comp)
```
#### 高级组件的@注解方式 `withLazyReducer(reducers)`

```javascript
@withLazyReducer(done => {
    import('./someReducer').then((reducer) => {
        done({
            nameA: someReducer
        })
    })
})
class Comp extends Component {
    render() {
        <div>i am a Component wrapped by lazy reducer !</div>
    }
}
```

### 其他使用场景

#### 结合 react-router

```javascript
import { LazyReducer } from 'lazy-reducer'
import Homepage from './Homepage'

const route = {
    path: '/homepage',
    component: (
        <LazyReducer
            reducers={done => {
                import('./homepageReducer').then(reducer => {
                    done({
                        homepage: reducer.default
                    })
                })
            }}
        >
            <Homepage />
        </LazyReducer>
    )
}
```

## example
[examples](./examples)
