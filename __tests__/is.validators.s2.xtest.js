/* eslint-disable no-array-constructor */
/* eslint-disable no-new-object */
/* eslint-disable no-new-wrappers */
/* eslint-env mocha */

import { isClass, isBigInt, isError, isFunction, isInstance, isNumber, sq, isPromise, isQPromise, isSQ, delay, isRegExp, hasProto, validDate } from '../src'
import { describe, expect, it } from '@jest/globals'
import q from 'q'

describe('Evaluate Validators/ segment (2.)', () => {
  
    it('isClass()', (done) => {
        
        expect(isClass).toBeInstanceOf(Function)
        let invalids = [{}, [], (new function() {}()), new Object(), new Array()]
        let valids = [Array, Object, (class {}) ]

        for (let a of invalids) expect(isClass(a)).toBe(false)
        for (let b of valids) expect(isClass(b)).toBe(true)

        expect(isClass(Object, () => false)).toBe(false)
        
        done()
    })

    it('hasProto()', (done) => {
        
        expect(hasProto).toBeInstanceOf(Function)
        let valids = [NaN, false, {}, [], '', -1, (new function() {}()), new Object(), new Array(), (new (class {})())]
        let invalids = [null, undefined ]

        for (let a of valids) expect(hasProto(a)).toBe(true)
        for (let b of invalids) expect(hasProto(b)).toBe(false)

        expect(hasProto({}, () => false)).toBe(false)
        
        done()
    })

    it('isBigInt()', (done) => {

        expect(isBigInt).toBeInstanceOf(Function)
        let invalids = [Number.MAX_SAFE_INTEGER, -1, false, '']
        // @ts-ignore
        // eslint-disable-next-line no-undef
        let valids = [1n, BigInt(Number.MAX_SAFE_INTEGER), (2n ** 54n)]

        for (let a of invalids) expect(isBigInt(a)).toBe(false)
        for (let b of valids) expect(isBigInt(b)).toBe(true)

        done()
    })

    it('isError()', (done) => {

        expect(isError).toBeInstanceOf(Function)
        let invalids = ['error', new Object(), {}, [], false, null, undefined]
        let valids = [Error(), new Error()]

        for (let a of invalids) expect(isError(a)).toBe(false)
        for (let b of valids) expect(isError(b)).toBe(true)

        done()
    })

    it('isFunction()', (done) => {

        expect(isFunction).toBeInstanceOf(Function)
        let invalids = [[], {}, Object(), Array() ]
        let valids = [Object, Array, () => {}, Function]

        for (let a of invalids) expect(isFunction(a)).toBe(false)
        for (let b of valids) expect(isFunction(b)).toBe(true)

        done()
    })

    it('isInstance()', (done) => {

        expect(isInstance).toBeInstanceOf(Function)
        let invalids = [null, '', false, undefined, Object(), Array(), (class {}), 
            new Object(), // literial shorthand for {}
            new Array(), // literial shorthand for []
            [],
            {}
        ]
        let valids = [(new function() {}()), (new (class {})()), new Number()]

        for (let a of invalids) expect(isInstance(a)).toBe(false)
        for (let b of valids) expect(isInstance(b)).toBe(true)

        expect(isInstance((new function() {}()), () => false)).toBe(false)

        done()
    })

    it('isNumber()', (done) => {

        expect(isNumber).toBeInstanceOf(Function)
        let invalids = [null, '', false, undefined]
        let valids = [1, new Number(1), NaN]

        for (let a of invalids) expect(isNumber(a)).toBe(false)
        for (let b of valids) expect(isNumber(b)).toBe(true)

        done()
    })

    it('isPromise()', async (done) => {

        expect(isPromise).toBeInstanceOf(Function)
        let invalids = [Function, Promise, Promise.all, () => {}, null, undefined, true, false, {}, []]
        let valids = [Promise.resolve(), sq(), q.defer()]

        for (let a of invalids) expect(isPromise(a)).toBe(false)
        await delay(200)
        for (let b of valids) expect(isPromise(b)).toBe(true)
        done()
    })
    
    it('isQPromise()', (done) => {

        expect(isQPromise).toBeInstanceOf(Function)
        let invalids = [sq(), Promise.resolve(), Function, Promise, Promise.all, () => {}, null, undefined, true, false, {}, []]
        let valids = [q.defer()]

        for (let a of invalids) expect(isQPromise(a)).toBe(false)
        for (let b of valids) expect(isQPromise(b)).toBe(true)

        done()
    })

    it('isSQ()', (done) => {
        expect(isSQ).toBeInstanceOf(Function)
        let invalids = [ Promise.resolve(), Function, Promise, Promise.all, () => {}, null, undefined, true, false, {}, []]
        let valids = [sq()]

        for (let a of invalids) expect(isSQ(a)).toBe(false)
        for (let b of valids) expect(isSQ(b)).toBe(true)

        done()
    })

    it('isRegExp()', (done) => {
        expect(isRegExp).toBeInstanceOf(Function)
        let invalids = [ '', false, true]
        let valids = [undefined, /\\/]

        for (let a of invalids) expect(isRegExp(a)).toBe(false)
        for (let b of valids) expect(isRegExp(b)).toBe(true)

        done()
    })

    it('validDate()', (done) => {
        expect(validDate).toBeInstanceOf(Function)
        let invalids = [undefined, null, false, 1]
        let valids = [new Date()]

        for (let a of invalids) expect(validDate(a)).toBe(false)
        for (let b of valids) expect(validDate(b)).toBe(true)

        // false because object has no keys
        expect(validDate(new Date(), () => false)).toBe(false)
        done()
    })
    
})
