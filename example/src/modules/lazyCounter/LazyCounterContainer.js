import React from 'react';
import {connect} from 'react-redux'
import {increase, decrease} from './reducers/index'

const LazyCounter = (props) => {
    return (
        <div>
            LazyCounter
            result: {props.syncCounter}
            <div onClick={props.increase}>+</div>
            <div onClick={props.decrease}>-</div>
        </div>
    );
};

const mapStateToProps = (state, ownState) => {
    return {
        syncCounter: state.lazyCounter
    }
}

const mapDispathchToProps = (dispatch) => {
    return {
        increase: increase(dispatch),
        decrease: decrease(dispatch)
    }
}

export default connect(mapStateToProps, mapDispathchToProps)(LazyCounter);
