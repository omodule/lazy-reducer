import { Component, createElement } from 'react'
import storeShape from './storeShape'
import isPlainObject from 'lodash/isPlainObject'
import { combineReducers } from 'redux'
import React from 'react'

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

/**
 * lazyReducer structure:
 * {
 *    'myNamespace': function(state, action) {
 *          return state
 *    }
 * }
 *
 * @param  {String} lazyReducer     [description]
 * @param  {String} [storeKey='store'] [description]
 * @return {[type]}                    [description]
 */
const withLazyReducer = (lazyReducer, storeKey = 'store') => WrappedComponent => {
    const displayName = `withLazyReducer(${getDisplayName(WrappedComponent)})`

    class ComponentWithLazyReducer extends Component {
        constructor(props, context) {
            super(props)
            const store = context[storeKey]
            if (!store) {
                throw new Error(
                    `Could not find "${storeKey}" in either the context or props of ` +
                        `"${displayName}". Either wrap the root component in a <Provider>, ` +
                        `or explicitly pass "${storeKey}" as a prop to "${displayName}".`
                )
            }
            if (isPlainObject(lazyReducer)) {
                store.addLazyReducers(lazyReducer)
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
        [storeKey]: storeShape
    }
    ComponentWithLazyReducer.displayName = displayName
    return ComponentWithLazyReducer
}

export default withLazyReducer
