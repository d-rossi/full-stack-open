import { describe, test, expect } from 'vitest'
import reducer from './reducer'

describe('unicafe reducer', () => {
    const initialState = {
      good: 0,
      ok: 0,
      bad: 0
    }
  
    test('should return a proper initial state when called with undefined state', () => {
      const newState = reducer(undefined, {type: 'DO_NOTHING'})
      expect(newState).toEqual(initialState)
    })
  
    test('good is incremented', () => {
      expect(reducer(initialState, {type: 'GOOD'})).toEqual({
        good: 1,
        ok: 0,
        bad: 0
      })
    })

    test('ok is incremented', () => {
      expect(reducer(initialState, {type: 'OK'})).toEqual({
        good: 0,
        ok: 1,
        bad: 0
      })
    })

    test('bad is incremented', () => {
      expect(reducer(initialState, {type: 'BAD'})).toEqual({
        good: 0,
        ok: 0,
        bad: 1
      })
    })

    test('zero returns initial state', () => {
      const newState = reducer(initialState, {type: 'BAD'})
      expect(reducer(newState, {type: 'ZERO'})).toEqual(initialState)
    })
  })