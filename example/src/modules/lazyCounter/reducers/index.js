const INCREMENT = 'lazyCounter/INCREAMENT'
const DECREMENT = 'lazyCounter/DECREMENT'


const lazyCounter = (state = 0, action) => {
    if (action.type === INCREMENT) {
        return ++state
    } else if (action.type === DECREMENT) {
        return --state
    }
    return state
}
export default lazyCounter
