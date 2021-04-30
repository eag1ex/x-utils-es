// @ts-nocheck
/* eslint-disable no-array-constructor */
/* eslint-disable no-new-object */
/* eslint-disable no-new-wrappers */
/* eslint-env mocha */

// NOTE Provided tests are for arrays and objects, logical operators

import { someKeyMatch, exactKeyMatch, withHoc, typeCheck, xrequire } from '../src'
import { describe, expect, it } from '@jest/globals'

describe('Evaluate Mixed/ segment (2.)', () => {

    it('someKeyMatch()', (done) => {

        expect(someKeyMatch).toBeInstanceOf(Function)
        expect(someKeyMatch([], {})).toBe(false)
        expect(someKeyMatch(false, {})).toBe(false)
        expect(someKeyMatch({}, false)).toBe(false)
        expect(someKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, a: 1 })).toBe(true)
        expect(someKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, a: 1 }, () => 1 - 1 === 1)).toBe(false)
        expect(someKeyMatch({ a: 2, b: 1, c: 2, m: 1, f: 3 }, { d: 1, e: 1, z: 1 })).toBe(false)

        done()
    })

    it('exactKeyMatch()', (done) => {
        expect(exactKeyMatch).toBeInstanceOf(Function)
        expect(exactKeyMatch([], {})).toBe(false)
        expect(exactKeyMatch(true, {})).toBe(false)
        expect(exactKeyMatch({ a: 2, b: 1, c: 2 }, { c: 1, a: 1, b: 1 })).toBe(true)
        expect(exactKeyMatch({ a: 2, b: 1, c: 2, g: 1, h: 1 }, { c: 1, a: 1, b: 1 })).toBe(false)
        expect(exactKeyMatch({ a: 2, b: 1 }, { c: 1, a: 1, b: 1 })).toBe(false)
        expect(exactKeyMatch({}, { c: 1, d: 1 })).toBe(false)

        expect(exactKeyMatch({ a: 2, b: 1, c: 2 }, { c: 1, a: 1, b: 1 }, () => 1 + 1 === 3)).toBe(false)
        done()
    })

    it('withHoc()', async (done) => {

        expect(withHoc).toBeInstanceOf(Function)

        function fn(a = 1, b = 2, c = 3) {
            return a + b + c
        }

        let fnHocked = withHoc(fn)
        expect(fnHocked()).toBe(6)

        fnHocked = withHoc(fn, 4, 5, 6)
        expect(fnHocked()).toBe(15)

        fnHocked = withHoc(fn, 4, 5, 6)
        expect(fnHocked(7, 8, 9)).toBe(24)

        fnHocked = withHoc(Promise.resolve(fn), 4, 5, 6)
        expect(await fnHocked(7, 8, 9)).toBe(24)

        try {
            fnHocked = withHoc(Promise.reject(fn), 4, 5, 6)
            await fnHocked(7, 8, 9)
        } catch (err) {
            expect(err).toBe(24)
        }

        try {
            fnHocked = withHoc(Promise.reject('fn'), 4, 5, 6)
            await fnHocked(7, 8, 9)
        } catch (err) {
            expect(err).toBe('DEFERRED_NOT_CALLABLE')
        }

        done()
    })

    it('typeCheck()', (done) => {

        expect(typeCheck).toBeInstanceOf(Function)
        expect(typeCheck({})).toStrictEqual({ type: 'object', value: 0, primitiveValue: Object() })
        // expect(typeCheck(Symbol())).toStrictEqual({ type: 'symbol', value: 0, primitiveValue: Symbol() })

        expect(typeCheck(new Error())).toStrictEqual({ type: 'object', value: 0, primitiveValue: Error() })
        
        expect(typeCheck({ a: 1, b: 2 })).toStrictEqual({ type: 'object', value: 2, primitiveValue: Object() })
        expect(typeCheck([2, 3], false)).toStrictEqual({ type: 'array', value: 2, primitiveValue: Array() })
        // NOTE due to new date new cannot evaluate exect match
        // expect(typeCheck(Date, false)).toStrictEqual({ type: 'date', value: 1, primitiveValue: Date() }) 
        expect(typeCheck(2)).toStrictEqual({ type: 'number', value: 2, primitiveValue: Number() })
        expect(typeCheck(NaN)).toStrictEqual({ type: 'number', value: 0, primitiveValue: Number() })
        expect(typeCheck(false)).toStrictEqual({ type: 'boolean', value: 0, primitiveValue: Boolean() })
        expect(typeCheck(true)).toStrictEqual({ type: 'boolean', value: 1, primitiveValue: Boolean() })
        expect(typeCheck(null, false)).toStrictEqual({ type: 'null', value: 0, primitiveValue: Object() })
        expect(typeCheck(null)).toStrictEqual({ type: 'object', value: 0, primitiveValue: Object() })
        expect(typeCheck(undefined)).toStrictEqual({ type: 'undefined', value: 0, primitiveValue: undefined })
        expect(typeCheck(function () { })).toStrictEqual({ type: 'function', value: 1, primitiveValue: Function })
        expect(typeCheck(BigInt(1))).toStrictEqual({ type: 'bigint', value: 1, primitiveValue: 0n })
        expect(typeCheck(Promise.resolve(), false)).toStrictEqual({ type: 'promise', value: 1, primitiveValue: Function })
        expect(typeCheck(Promise.resolve())).toStrictEqual({ type: 'object', value: 1, primitiveValue: Function })
        done()
    })
    
    // NOTE no support for mixing commonjs and esm modules while running tests
    // only decleared it to get code coverege
    it('xrequire()', (done) => {

        expect(xrequire).toBeInstanceOf(Function)
        // NOTE it actually works in commonjs
        expect(xrequire('./example.data')).toBe(undefined)

        let errSet = false
        try {
            // NOTE it actually works in commonjs, should throw
            xrequire('/a/b/a').toBe(undefined)
            errSet = true  
        } catch (err) {
            // in commonjs this this hit!
            errSet = true      
        }

        expect(errSet).toBe(true)
        done()
    })

})
