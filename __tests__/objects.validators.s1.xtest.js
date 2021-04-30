
/* eslint-disable no-array-constructor */
/* eslint-disable no-new-object */
/* eslint-disable no-new-wrappers */
/* eslint-env mocha */

import { objectSize, trueProp, truthFul } from '../src'
import { describe, expect, it, jest } from '@jest/globals'

describe('Evaluate Objects/ segment (1.)', () => {

    it('objectSize()', (done) => {

        expect(objectSize).toBeInstanceOf(Function)
        expect(objectSize()).toBe(0)

        let falsy = [[12, 3], true, false, undefined, null, {}]
        for (let a of falsy) expect(objectSize(a)).toBe(0)

        expect(objectSize((new function () { this.a = 1 }()))).toBe(1)
        expect(objectSize({ a: 1, b: 1 })).toBe(2)
        expect(objectSize(new Object({ a: 1, b: 1 }))).toBe(2)

        let err = new Error()
        err.name = 'XError'
        expect(objectSize(err)).toBe(1)
        done()
    })

    it('trueProp()', (done) => {

        expect(trueProp).toBeInstanceOf(Function)
        expect(trueProp()).toStrictEqual({})
        expect(trueProp(false)).toStrictEqual({})
        expect(trueProp({ a: NaN, b: 0, c: false, d: -1, e: NaN, f: [], g: 'hello', h: {}, i: undefined, j: '' })).toStrictEqual({ g: 'hello' })

        expect(trueProp({ a: undefined, b: 0, c: 1, d: NaN })).toStrictEqual({ c: 1 })
        expect(trueProp(new Object({ a: undefined, b: 1 }))).toStrictEqual({ b: 1 })
        done()
    })

    it('truthFul()', (done) => {
        expect(truthFul).toBeInstanceOf(Function)
        expect(truthFul([])).toStrictEqual({})
        expect(truthFul({})).toStrictEqual({})

        expect(truthFul({ a: undefined, b: 1, c: {}, z: undefined })).toStrictEqual({ b: 1, c: {} })
        done()
    })

})
