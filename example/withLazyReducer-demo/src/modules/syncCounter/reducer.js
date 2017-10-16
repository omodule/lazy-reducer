const INCREMENT = 'syncCounter/INCREAMENT'
const DECREMENT = 'syncCounter/DECREMENT'


const syncCounterReducer = (state = 0, action) => {
    if (action.type === INCREMENT) {
        return ++state
    } else if (action.type === DECREMENT) {
        return --state
    }
    return state
}

export const increase = dispatch => () => dispatch({type: INCREMENT})
export const decrease = dispatch => () => dispatch({type: DECREMENT})

export default syncCounterReducer
