import { INCREMENT, DECREMENT } from './reducerTypes'

const lazyCounterReducer = (state = 0, action) => {
    if (action.type === INCREMENT) {
        return ++state
    } else if (action.type === DECREMENT) {
        return --state
    }
    return state
}

export default lazyCounterReducer
