// @ts-nocheck
/* eslint-disable no-array-constructor */
/* eslint-disable no-new-object */
/* eslint-disable no-new-wrappers */
/* eslint-env mocha */

import {
    last, head, uniq, uniqBy, shuffle, arrayWith, exFromArray, pickFromArray, flatten, flattenDeep, chunks, trueVal, trueValDeep
} from '../src'
import { describe, expect, it } from '@jest/globals'

describe('Evaluate Arrays/ segment (1.)', () => {

    it('last()', (done) => {

        expect(last).toBeInstanceOf(Function)
        expect(last(false)).toBe(undefined)
        expect(last([1, 2, 3])).toBe(3)
        expect(last([{}, [], "3"])).toBe("3")
        done()
    })

    it('head()', (done) => {

        expect(head).toBeInstanceOf(Function)
        expect(head([1, 2, 3])).toBe(1)
        expect(head(true)).toBe(undefined)
        expect(head([[2], [], "3"])).toBe(2)
        done()

    })

    it('uniq()', (done) => {

        expect(uniq).toBeInstanceOf(Function)
        expect(uniq([1, 2, 3, 1, 2, 5, 5, 6, 6, false, false, undefined, undefined])).toEqual([1, 2, 3, 5, 6, false, undefined])
        done()

    })

    it('uniqBy()', (done) => {

        expect(uniqBy).toBeInstanceOf(Function)
        expect(uniqBy([], 'a'))
            .toEqual([])

        expect(uniqBy())
            .toEqual([])

        expect(uniqBy([{ a: 1, b: 2 }, 1, { b: 1 }, 5, { a: 1 }, null, { a: 1, b: 2 }], 'a'))
            .toEqual([{ a: 1, b: 2 }, 1, { b: 1 }, 5, null])

        expect(uniqBy([{ c: 1, b: 2 }, { c: 1 }, { c: 1 }, { c: 1, b: 2 }], 'c'))
            .toEqual([{ c: 1, b: 2 }])

        expect(uniqBy([{ a: undefined, b: undefined }, { a: undefined, b: undefined }, { c: undefined, a: undefined }], 'a')).toEqual([{ a: undefined, b: undefined }, { b: undefined }, { c: undefined }])

        expect(uniqBy([{ a: 1, b: 2 }, null, undefined, true, 1, { a: 1 }, { a: 1 }, false], 'a'))
            .toEqual([{ a: 1, b: 2 }, null, undefined, true, 1, false])

        expect(uniqBy([{ a: 1, b: 2 }, null, undefined, true, 1, { a: 1 }, { a: 3 }, false], 'a'))
            .toEqual([{ a: 1, b: 2 }, null, undefined, true, 1, { a: 3 }, false])

        done()

    })

    it('shuffle()', (done) => {

        expect(shuffle).toBeInstanceOf(Function)
        expect(shuffle({})).toStrictEqual([])
        expect(shuffle([1, 2, 3])).not.toEqual([1, 2, 3])
        expect(shuffle([1, 2, 3])).toHaveLength(3)
        done()

    })

    it('arrayWith()', (done) => {

        expect(arrayWith).toBeInstanceOf(Function)
        expect(arrayWith(undefined)).toEqual([])
        expect(arrayWith({})).toEqual([])
        expect(arrayWith([], '')).toEqual([])

        expect(arrayWith([[], { a: undefined }, { b: 3 }, { a: 1 }], 'a')).toEqual([{ a: undefined }, { a: 1 }])
        expect(arrayWith([{ a: 1 }, 1, [], undefined, { b: 3 }], 'b')).toEqual([{ b: 3 }])
        done()

    })

    it('exFromArray()', (done) => {

        expect(exFromArray).toBeInstanceOf(Function)
        expect(exFromArray(undefined)).toEqual([])
        expect(exFromArray([1, {}])).toEqual([1, {}])

        expect(exFromArray([{ a: 1, c: 5 }, { a: 10 }, { b: 2 }, { c: 1, a: 2 }], ['a', 'b']))
            .toEqual([{ c: 5 }, undefined, undefined, { c: 1 }])
        expect(exFromArray([null, 1, { a: 1, c: 5 }, { a: 10 }, { b: 2 }, { c: 1, a: 2 }, '2'], ['a', 'c']))
            .toEqual([null, 1, undefined, undefined, { b: 2 }, undefined, '2'])

        done()

    })

    it('pickFromArray()', (done) => {

        expect(pickFromArray).toBeInstanceOf(Function)
        expect(pickFromArray(undefined)).toEqual([])
        expect(pickFromArray([1, 2], [])).toEqual([1, 2])
        expect(pickFromArray([1, 2, false], false)).toEqual([false])

        let picks = [Boolean, 'hello', Object, { a: 1 }, BigInt]
        let data = [false, undefined, { a: 1 }, 'hello', ['hello'], {}, 1234567890123456789012345678901234567890n, 'not selected']

        expect(pickFromArray(data, picks)).toEqual([false, { a: 1 }, 'hello', {}, 1234567890123456789012345678901234567890n])

        // -----------
        picks = [Number, Boolean]
        data = [undefined, 1, {}, 2, null, [], 'hello world', 3, true, 4, null, 5]

        expect(pickFromArray(data, picks)).toEqual([1, 2, 3, true, 4, 5])
        // -----------

        picks = [undefined, [undefined]]
        data = [undefined, false, 1, true, {}, [1], [undefined, 'this one'], null]

        expect(pickFromArray(data, picks)).toEqual([undefined, [undefined, 'this one']])
        // -----------

        picks = [{ data: Object }]
        data = [{ data: { a: 1 } }, { data: 1 }, false, ['hello'], { data: { d: 2 } }, { data: { b: 2 } }, 1, 2, [], {}]

        expect(pickFromArray(data, picks)).toEqual([{ data: { a: 1 } }, { data: { d: 2 } }, { data: { b: 2 } }])
        // -----------

        picks = [{ a: Object, b: 1 }]
        data = [{ a: { a: 1 }, b: 1, c: 1 }, { data: 1 }, { a: { a: 1 }, b: 1 }, { data: null }, false, 1, 2, [], {}]

        expect(pickFromArray(data, picks)).toEqual([{ a: { a: 1 }, b: 1, c: 1 }, { a: { a: 1 }, b: 1 }])

        done()

    })

    it('flatten()', (done) => {

        expect(flatten).toBeInstanceOf(Function)
        expect(flatten(undefined)).toEqual([])
        expect(flatten([[1]])).toEqual([1])
        done()
    })
    it('flattenDeep()', (done) => {

        expect(flattenDeep).toBeInstanceOf(Function)
        expect(flattenDeep(undefined)).toEqual([])
        expect(flattenDeep([[[1]]])).toEqual([1])
        expect(flattenDeep([[[[1]]]])).toEqual([1])
        done()
    })

    it('chunks()', (done) => {

        expect(chunks).toBeInstanceOf(Function)
        expect(chunks(undefined)).toEqual([])

        expect(chunks([1, 2, 3, 4, 5, 6], 2)).toEqual([[1, 2], [3, 4], [5, 6]])
        expect(chunks([1, 2, 3, 4, 5, 6, 7, 8], 2)).toEqual([[1, 2], [3, 4], [5, 6], [7, 8]])

        done()
    })

    it('trueVal()', (done) => {

        expect(trueVal).toBeInstanceOf(Function)
        expect(trueVal(undefined)).toEqual([])
        expect(trueVal({})).toEqual([])
        expect(trueVal([-1, 0, 1, {}, "hello", [], { name: 'jack' }, false, null, NaN, undefined, true, NaN])).toEqual([1, 'hello', { name: 'jack' }, true])

        done()
    })

    it('trueValDeep()', (done) => {

        expect(trueValDeep).toBeInstanceOf(Function)
        expect(trueValDeep(undefined)).toEqual([])
        expect(trueValDeep({})).toEqual([])
        expect(trueValDeep([1, 0, [], {}, "hello", [0, undefined, -1, false, NaN, 1], { name: 'jack' }, false, null, undefined])).toEqual([1, 'hello', [1], { name: 'jack' }])

        done()
    })

})
