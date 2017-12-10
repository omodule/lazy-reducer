import { LazyReducer, lazyReducerEnhancer } from '../lib'
import { createStore, combineReducers } from 'redux'
import renderer from 'react-test-renderer'
import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'

@connect(state => {
    return {
        store: state
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
            return (
                <LazyReducer
                    reducers={{
                        nameX: function(state = null, action) {
                            return state
                        }
                    }}
                    x="xxx"
                >
                    <InnerComponent />
                </LazyReducer>
            )
        } else {
            return <div>DelayContainer {JSON.stringify(this.props)}</div>
        }
    }
}

@connect(state => {
    return {
        store: state
    }
})
class DelayContainerWithFunc extends Component {
    render() {
        return (
            <LazyReducer
                reducers={done => {
                    setTimeout(() => {
                        done({
                            reducerWithFun: function(state = 'reducerWithFun', action) {
                                return state
                            }
                        })
                    }, 400)
                }}
                x="xxx"
            >
                <div>DelayContainerWithFunc {JSON.stringify(this.props)}</div>
            </LazyReducer>
        )
    }
}

function waitFor(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

test('LazyReducer', async () => {
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
                <DelayContainerWithFunc />
            </div>
        </Provider>
    )
    const app = renderer.create(App)
    expect(app.toJSON()).toMatchSnapshot()
    await waitFor(200)
    expect(app.toJSON()).toMatchSnapshot()
    await waitFor(500)
    expect(app.toJSON()).toMatchSnapshot()
})
