import React, { Component } from 'react'
import storeShape from './storeShape'
import PropTypes from 'prop-types'
import { combineReducers } from 'redux'

class LazyReducer extends Component {
    constructor(props, context) {
        super(props, context)
        const store = context.store
        if (!store) {
            throw new Error(
                `Could not find "${storeKey}" in either the context or props of ` +
                    `"${displayName}". Either wrap the root component in a <Provider>, ` +
                    `or explicitly pass "${storeKey}" as a prop to "${displayName}".`
            )
        }
        store.addLazyReducers(this.props.reducer)
        store.replaceReducer(
            combineReducers({
                ...store.getSyncReducers(),
                ...store.getLazyReducers()
            })
        )
    }

    render() {
        const { children } = this.props
        // return React.cloneElement(children);
        const passthrough = { ...this.props }
        delete passthrough.reducer
        delete passthrough.children

        if (children) {
            return <children.type {...passthrough} />
        } else {
            return null
        }
    }
}
LazyReducer.contextTypes = {
    store: storeShape
}
LazyReducer.propTypes = {
    reducer: PropTypes.object.isRequired
}

export default LazyReducer
