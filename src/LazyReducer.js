import React, { Component } from 'react'
import storeShape from './storeShape'
import PropTypes from 'prop-types'
import { combineReducers } from 'redux'

class LazyReducer extends Component {
    constructor(props, context) {
        super(props, context)
        const store = context.store
        if (!store) {
            throw new Error(`Could not find "store".`)
        }
        store.addLazyReducers(this.props.reducers)
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
        delete passthrough.reducers
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
    reducers: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
}

export default LazyReducer
