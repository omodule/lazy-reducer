import { Component, createElement } from 'react'
import storeShape from './storeShape'
import isPlainObject from 'lodash/isPlainObject'
import { combineReducers } from 'redux'
import React from 'react'

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

/**
 * reducers structure:
 * {
 *    'myNamespace': function(state, action) {
 *          return state
 *    }
 * }
 *
 * @param  {String} reducers     [description]
 * @return {[type]}                    [description]
 */
const withLazyReducer = reducers => WrappedComponent => {
    const displayName = `withLazyReducer(${getDisplayName(WrappedComponent)})`

    class ComponentWithLazyReducer extends Component {
        constructor(props, context) {
            super(props)
            const store = context.store
            if (!store) {
                throw new Error(`Could not find "store".`)
            }
            if (isPlainObject(reducers)) {
                store.addLazyReducers(reducers)
                store.replaceReducer(
                    combineReducers({
                        ...store.getSyncReducers(),
                        ...store.getLazyReducers()
                    })
                )
            } else {
                throw new Error('You must pass a `planObject` to the function `withLazyReducer`')
            }
        }
        render() {
            return <WrappedComponent {...this.props} />
        }
    }
    ComponentWithLazyReducer.contextTypes = {
        store: storeShape
    }
    ComponentWithLazyReducer.displayName = displayName
    return ComponentWithLazyReducer
}

export default withLazyReducer
