import React, { Component, createElement, isValidElement } from 'react'
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
        this.store = store

        if (typeof props.reducers === 'function') {
            this.state = { display: false }
            const getReducers = props.reducers
            getReducers(reducers => {
                this.addLazyReducers(reducers)
                this.setState({
                    display: true
                })
            })
        } else {
            this.addLazyReducers(props.reducers)
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
        const { children } = this.props
        const { display } = this.state
        // return React.cloneElement(children);
        const passthrough = { ...this.props }
        delete passthrough.reducers
        delete passthrough.children

        if (children && display) {
            if (typeof children.type === 'function') {
                // react component
                return <children.type {...children.props} {...passthrough} />
            } else {
                return <children.type {...children.props} />
            }
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
