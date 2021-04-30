/* eslint-disable no-array-constructor */
/* eslint-disable no-new-object */
/* eslint-disable no-new-wrappers */
/* eslint-env mocha */

import { isArray, isObject, isString, isEmpty, isFalse, isFalsy, isTrue, isBoolean, isNull, isUndefined } from '../src'
import { describe, expect, it } from '@jest/globals'

describe('Evaluate Validators/ segment (1.)', () => {

    it('isArray()', (done) => {
        expect(isArray).toBeInstanceOf(Function)
        let invalids = [null, undefined, false, 0, '', {}, Function, true, NaN]
        let valids = [[],
            new Array()
        ]

        for (let a of invalids) expect(isArray(a)).toBe(false)
        for (let b of valids) expect(isArray(b)).toBe(true)

        expect(isArray([], () => [].length > 0)).toBe(false)
        done()
    })

    it('isObject()', (done) => {
        expect(isObject).toBeInstanceOf(Function)
        let invalids = [[], undefined, new Array(), false, 0, '', Function, true, NaN, (class { }), Object]
        let valids = [{},
            new Object(),
            (new function () { }()),
            (new class { }())
        ]

        for (let a of invalids) expect(isObject(a)).toBe(false)
        for (let b of valids) expect(isObject(b)).toBe(true)

        expect(isObject({}, () => Object.keys({}).length > 0)).toBe(false)
        done()
    })

    it('isString()', (done) => {
        expect(isString).toBeInstanceOf(Function)
        let invalids = [[], undefined, new Array(), false, 0, Function, true, NaN, (class { }), Object, String]
        let valids = ['',
            new String()
        ]

        for (let a of invalids) expect(isString(a)).toBe(false)
        for (let b of valids) expect(isString(b)).toBe(true)

        expect(isString('a', () => 'a'.length > 1)).toBe(false)
        done()
    })

    it('isEmpty()', (done) => {
        expect(isEmpty).toBeInstanceOf(Function)
        let invalids = [[0], new Array(1), 'hello', new String('hello'), 1, { a: 1 }, Function, true, (class { }), Object, String, new Error()]

        let valids = ['', new String(), undefined, false, null, {}, [], NaN]

        for (let a of invalids) expect(isEmpty(a)).toBe(false)
        for (let b of valids) expect(isEmpty(b)).toBe(true)
        done()
    })

    it('isFalse()', (done) => {
        expect(isFalse).toBeInstanceOf(Function)
        let invalids = [1, true, 'a', new Boolean(true), {}]
        let valids = [false, new Boolean(false), undefined, null, 0, -1]

        for (let a of invalids) expect(isFalse(a)).toBe(false)
        for (let b of valids) expect(isFalse(b)).toBe(true)
        done()
    })

    it('isTrue()', (done) => {
        expect(isTrue).toBeInstanceOf(Function)
        let invalids = [-1, 0, false, 'a', new Boolean(false), null, undefined, {}]
        let valids = [true, new Boolean(true), 5]

        for (let a of invalids) expect(isTrue(a)).toBe(false)
        for (let b of valids) expect(isTrue(b)).toBe(true)
        done()
    })

    it('isFalsy()', (done) => {
        expect(isFalsy).toBeInstanceOf(Function)

        let err = new Error()
        err.name = 'my error'

        let invalids = [[0], true, new Array(1), new Object({ a: 1 }), 'hello', new String('hello'), 1, { a: 1 }, Function, (class { }), Object, String, (new function () { this.a = 1 }()), Promise.resolve('hello'), err]

        let valids = [{}, [], false, null, -1, 0, undefined, new Array(), new Object(), (new (class { })()), (new function () { }()), new Error(), new Number()]

        for (let a of invalids) expect(isFalsy(a)).toBe(false)
        for (let b of valids) expect(isFalsy(b)).toBe(true)
        done()
    })

    it('isBoolean()', (done) => {
        expect(isBoolean).toBeInstanceOf(Function)
        let invalids = [{}, [], undefined, null, 1, NaN]

        let valids = [true, false, new Boolean()]

        for (let a of invalids) expect(isBoolean(a)).toBe(false)
        for (let b of valids) expect(isBoolean(b)).toBe(true)
        done()
    })

    it('isNull()', (done) => {
        expect(isNull).toBeInstanceOf(Function)
        let invalids = [{}, [], undefined, true, 1, false, NaN, new Boolean()]
        let valids = [null]

        for (let a of invalids) expect(isNull(a)).toBe(false)
        for (let b of valids) expect(isNull(b)).toBe(true)
        done()
    })

    it('isUndefined()', (done) => {
        expect(isUndefined).toBeInstanceOf(Function)
        let invalids = [{}, [], true, 1, false, NaN, new Boolean()]
        let valids = [undefined]

        for (let a of invalids) expect(isUndefined(a)).toBe(false)
        for (let b of valids) expect(isUndefined(b)).toBe(true)
        done()
    })
})
