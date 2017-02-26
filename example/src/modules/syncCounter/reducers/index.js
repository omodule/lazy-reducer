const INCREMENT = 'syncCounter/INCREAMENT'
const DECREMENT = 'syncCounter/DECREMENT'


const syncCounter = (state = 0, action) => {
    if (action.type === INCREMENT) {
        return ++state
    } else if (action.type === DECREMENT) {
        return --state
    }
    return state
}
export default syncCounter
