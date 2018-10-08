import React, { Component, createElement } from 'react'
import storeShape from './storeShape'
import isPlainObject from 'lodash/isPlainObject'
import { combineReducers } from 'redux'
import hoistNonReactStatic from 'hoist-non-react-statics'

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const withLazyReducer = reducers => WrappedComponent => {
    const displayName = `withLazyReducer(${getDisplayName(WrappedComponent)})`

    class ComponentWithLazyReducer extends Component {
        constructor(props, context) {
            super(props)
            const store = context.store
            if (!store) {
                throw new Error(`Could not find "store".`)
            }
            this.store = store

            if (typeof reducers === 'function') {
                this.state = { display: false }
                const getReducers = reducers
                getReducers(reducers => {
                    this.addLazyReducers(reducers)
                    this.setState({
                        display: true
                    })
                })
            } else {
                this.addLazyReducers(reducers)
                this.state = { display: true }
            }
        }
        addLazyReducers(reducers) {
            this.store.addLazyReducers(reducers)
            this.store.replaceReducer(
                combineReducers({
                    ...this.store.getSyncReducers(),
                    ...this.store.getLazyReducers()
                })
            )
        }
        render() {
            return this.state.display ? <WrappedComponent {...this.props} /> : null
        }
    }
    ComponentWithLazyReducer.contextTypes = {
        store: storeShape
    }
    ComponentWithLazyReducer.displayName = displayName
    hoistNonReactStatic(ComponentWithLazyReducer, WrappedComponent)
    return ComponentWithLazyReducer
}

export default withLazyReducer
