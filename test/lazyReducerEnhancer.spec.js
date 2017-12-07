import { lazyReducerEnhancer } from '../lib'
import { createStore, combineReducers } from 'redux'

test('lazyReducerEnhancer', () => {
    const syncReducers = {
        first: (state = null, action) => {
            return state
        },
        second: (state = null, action) => {
            return state
        }
    }

    const lazyReducers1 = {
        a: (state = null, action) => {
            return state
        },
        b: (state = null, action) => {
            return state
        }
    }
    const lazyReducers2 = {
        c: (state = null, action) => {
            return state
        },
        d: (state = null, action) => {
            return state
        }
    }
    const lazyReducers3 = {
        d: (state = null, action) => {
            return state
        },
        e: (state = null, action) => {
            return state
        }
    }

    const store = createStore(combineReducers(syncReducers), {}, lazyReducerEnhancer(syncReducers))
    expect(store.getSyncReducers()).toBe(syncReducers)

    store.addLazyReducers(lazyReducers1)
    const l1 = store.getLazyReducers()
    expect(
        ['a', 'b'].reduce((acc, cur) => {
            return acc && Object.keys(l1).indexOf(cur) > -1
        }, true)
    ).toBe(true)
    expect(Object.keys(l1).length).toBe(2)

    store.addLazyReducers(lazyReducers2)
    const l2 = store.getLazyReducers()
    expect(
        ['a', 'b', 'c', 'd'].reduce((acc, cur) => {
            return acc && Object.keys(l2).indexOf(cur) > -1
        }, true)
    ).toBe(true)
    expect(Object.keys(l2).length).toBe(4)

    store.addLazyReducers(lazyReducers3)
    const l3 = store.getLazyReducers()
    expect(
        ['a', 'b', 'c', 'd', 'e'].reduce((acc, cur) => {
            return acc && Object.keys(l3).indexOf(cur) > -1
        }, true)
    ).toBe(true)
    expect(Object.keys(l3).length).toBe(5)
})
