
/* eslint-env mocha */

// import assert from 'assert'
import { isArray, isObject, isString, isEmpty, isFalse, isFalsy, isTrue, isBoolean, isNull, isUndefined } from '../src'
import { describe, expect, it, jest } from '@jest/globals'

describe('Evaluate Validators/ segment (1.)', () => {
  
    it('isArray()', (done) => {
        expect(isArray).toBeInstanceOf(Function)
        let invalids = [null, false, 0, '', {}, Function, true, NaN]
        let valids = [[], 
            new Array(), 
            undefined // reffers to unset property of isArray which defaults to []
        ]

        for (let a of invalids) expect(isArray(a)).toBe(false)
        for (let b of valids) expect(isArray(b)).toBe(true)

        done()
    })

    it('isObject()', (done) => {
        expect(isObject).toBeInstanceOf(Function)
        let invalids = [[], new Array(), false, 0, '', Function, true, NaN, (class {}), Object]
        let valids = [{}, 
            new Object(),
            (new function() {}()), 
            undefined, // reffers to unset property of isArray which defaults to {}
            (new class {}())
        ]

        for (let a of invalids) expect(isObject(a)).toBe(false)
        for (let b of valids) expect(isObject(b)).toBe(true)
        done()
    })

    it('isString()', (done) => {
        expect(isString).toBeInstanceOf(Function)
        let invalids = [[], new Array(), false, 0, Function, true, NaN, (class {}), Object, String]
        let valids = ['', 
            new String(),
            undefined // reffers to unset property of isArray which defaults to ''
        ]

        for (let a of invalids) expect(isString(a)).toBe(false)
        for (let b of valids) expect(isString(b)).toBe(true)
        done()
    })

    it('isEmpty()', (done) => {
        let invalids = [[0], new Array(1), 'hello', new String('hello'), 1, { a: 1 }, Function, true, (class {}), Object, String]

        let valids = ['', new String(), undefined, false, null, {}, [], NaN]

        for (let a of invalids) expect(isEmpty(a)).toBe(false)
        for (let b of valids) expect(isEmpty(b)).toBe(true)
        done()
    })

    it('isFalse()', (done) => {
        let invalids = [1, true, 'a', new Boolean(true), {}]
        let valids = [false, new Boolean(false), undefined, null, 0, -1]

        for (let a of invalids) expect(isFalse(a)).toBe(false)
        for (let b of valids) expect(isFalse(b)).toBe(true)
        done()
    })

    it('isTrue()', (done) => {
        let invalids = [-1, 0, false, 'a', new Boolean(false), null, undefined, {}]
        let valids = [true, new Boolean(true), 5 ]

        for (let a of invalids) expect(isTrue(a)).toBe(false)
        for (let b of valids) expect(isTrue(b)).toBe(true)
        done()
    })
    
    it('isFalsy()', (done) => {

        let invalids = [[0], true, new Array(1), new Object({ a: 1 }), 'hello', new String('hello'), 1, { a: 1 }, Function, (class {}), Object, String, (new function() { this.a = 1 }())]

        let valids = [{}, [], false, null, -1, 0, undefined, new Array(), new Object(), (new (class {})()), (new function() {}())]

        for (let a of invalids) expect(isFalsy(a)).toBe(false)
        for (let b of valids) expect(isFalsy(b)).toBe(true)
        done()
    })

})
