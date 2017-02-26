import React from 'react';
import {connect} from 'react-redux'
import {increase, decrease} from './reducers/index'

const SyncCounter = (props) => {
    return (
        <div>
            syncCounter
            result: {props.syncCounter}
            <div onClick={props.increase}>+</div>
            <div onClick={props.decrease}>-</div>
            lazyCounter
            result: {props.lazyCounter}
        </div>
    );
};

const mapStateToProps = (state, ownState) => {
    return {
        syncCounter: state.syncCounter,
        lazyCounter: state.lazyCounter
    }
}

const mapDispathchToProps = (dispatch) => {
    return {
        increase: increase(dispatch),
        decrease: decrease(dispatch)
    }
}

export default connect(mapStateToProps, mapDispathchToProps)(SyncCounter);
