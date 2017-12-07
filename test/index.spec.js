import { LazyReducer, withLazyReducer, lazyReducerEnhancer } from '../lib'
test('API', () => {
    expect(typeof LazyReducer).toBe('function')
    expect(typeof withLazyReducer).toBe('function')
    expect(typeof lazyReducerEnhancer).toBe('function')
})
