import React from 'react'
import { connect } from 'react-redux'
import { withLazyReducer } from 'lazy-reducer'
import lazyCounterReducer, { increase, decrease } from './reducer'

const LazyCounter = props => {
    return (
        <div style={{ margin: '12px' }}>
            LazyCounter result: <span style={{ fontWeight: 'bold' }}>{props.lazyCounter}</span>
            <div>
                <input
                    style={{
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }}
                    type="button"
                    onClick={props.increase}
                    value="+"
                />
                <input
                    style={{
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }}
                    type="button"
                    onClick={props.decrease}
                    value="-"
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownState) => {
    return {
        lazyCounter: state.lazyCounter
    }
}

const mapDispathchToProps = dispatch => {
    return {
        increase: increase(dispatch),
        decrease: decrease(dispatch)
    }
}

const LazyCounterWithConnect = connect(mapStateToProps, mapDispathchToProps)(LazyCounter)

// use Lazy Reducer
export default withLazyReducer(done => {
    setTimeout(() => {
        done({
            lazyCounter: lazyCounterReducer
        })
    }, 1000)
})(LazyCounterWithConnect)
