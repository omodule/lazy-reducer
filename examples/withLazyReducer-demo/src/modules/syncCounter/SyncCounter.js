import React from 'react';
import { connect } from 'react-redux';
import { increase, decrease } from './reducer';

const SyncCounter = props => {
    return (
        <div style={{ margin: '12px' }}>
            syncCounter result: <span style={{ fontWeight: 'bold' }}>{props.syncCounter}</span>
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
    );
};

const mapStateToProps = (state, ownState) => {
    return {
        syncCounter: state.syncCounter,
        lazyCounter: state.lazyCounter
    };
};

const mapDispathchToProps = dispatch => {
    return {
        increase: increase(dispatch),
        decrease: decrease(dispatch)
    };
};

export default connect(mapStateToProps, mapDispathchToProps)(SyncCounter);
