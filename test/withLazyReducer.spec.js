import { withLazyReducer, lazyReducerEnhancer } from '../lib'
import { createStore, combineReducers } from 'redux'
import renderer from 'react-test-renderer'
import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'

@connect(state => {
    return {
        store: state
    }
})
@withLazyReducer({
    nameX: function(state = null, action) {
        return state
    }
})
class InnerComponent extends Component {
    render() {
        return <div>InnerComponent {JSON.stringify(this.props)}</div>
    }
}

@connect(state => {
    return {
        store: state
    }
})
@withLazyReducer(done => {
    setTimeout(() => {
        done({
            reducerWithFun: (state = 'reducerWithFun', action) => {
                return state
            }
        })
    }, 300)
})
class InnerComponentWithFunc extends Component {
    render() {
        return <div>InnerComponent {JSON.stringify(this.props)}</div>
    }
}

@connect(state => {
    return {
        store: state
    }
})
class DelayContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        setTimeout(() => {
            this.setState({
                show: true
            })
        }, 100)
    }

    render() {
        if (this.state.show) {
            return <InnerComponent />
        } else {
            return <div>DelayContainer {JSON.stringify(this.props)}</div>
        }
    }
}

function waitFor(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

test('withLazyReducer', async () => {
    const syncReducers = {
        a: (state = 'a', action) => {
            return state
        },
        b: (state = 'x', action) => {
            return state
        }
    }
    const store = createStore(combineReducers(syncReducers), {}, lazyReducerEnhancer(syncReducers))
    const App = (
        <Provider store={store}>
            <div>
                <DelayContainer />
                <InnerComponentWithFunc />
            </div>
        </Provider>
    )
    const app = renderer.create(App)
    expect(app.toJSON()).toMatchSnapshot()
    await waitFor(200)
    expect(app.toJSON()).toMatchSnapshot()
    await waitFor(400)
    expect(app.toJSON()).toMatchSnapshot()
    
})
