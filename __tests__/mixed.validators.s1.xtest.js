// @ts-nocheck
/* eslint-disable no-array-constructor */
/* eslint-disable no-new-object */
/* eslint-disable no-new-wrappers */
/* eslint-env mocha */

// NOTE Provided tests are for arrays and objects, logical operators

/*
someKeyMatch,exactKeyMatch,typeCheck,loggerSetting,hasPrototype,hasProto, validDate, withHoc,xrequire,truthFul
* */

// import assert from 'assert'
import { isArray, isObject, isString, isEmpty, isFalse, isFalsy, isTrue, isBoolean, isNull, isUndefined, isClass, isBigInt, isError, isFunction, isInstance, isNumber, sq, isPromise, isQPromise, isSQ, delay, isRegExp,
    last, head, uniq, uniqBy, shuffle, arrayWith, exFromArray, pickFromArray, flatten, flattenDeep, chunks, objectSize, trueProp, copyBy, copy, timer, interval, copyDeep, loop, dupes
} from '../src'
import { describe, expect, it, jest } from '@jest/globals'

describe('Evaluate Mixed/ segment (1.)', () => {
  
    it('copyBy()', (done) => {
        expect(copyBy).toBeInstanceOf(Function)
        expect(copyBy()).toStrictEqual({})

        expect(copyBy({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toStrictEqual({ a: 1, c: 3 })
        expect(copyBy(new Object({ a: 1, b: 2, c: 3 }), ['a', 'c'])).toStrictEqual({ a: 1, c: 3 })
        expect(copyBy((new function() { this.a = 1; this.b = 2; this.c = 3 }()), ['a', 'c'])).toStrictEqual({ a: 1, c: 3 })
        expect(copyBy({ a: 1, b: 2, c: 3 })).toStrictEqual({})
        done()
    })

    it('copy()', (done) => {
        expect(copy).toBeInstanceOf(Function)
        expect(copy()).toBe(undefined)

        class FN {
            constructor() {
                this.a = 1
                this.b = 2
            }
        }

        expect(copy(new FN())).not.toBeInstanceOf(FN)
        expect(copy(new Object({ a: 1, b: 1 }))).toStrictEqual({ a: 1, b: 1 })
        expect(copy({ a: 1, b: 1 })).toStrictEqual({ a: 1, b: 1 })
        done()
    })

    it('copyDeep()', (done) => {

        expect(copyDeep).toBeInstanceOf(Function)
        expect(copyDeep()).toBe(undefined)

        class FN {
            constructor() {
                this.a = 1
                this.b = 2
            }
        }

        expect(copyDeep(new FN())).not.toBeInstanceOf(FN)
        expect(copyDeep(new FN())).toStrictEqual({ a: 1, b: 2 })

        done()
    })

    it('timer()', async(done) => {
        expect(timer).toBeInstanceOf(Function)
        expect(timer(1)).toBe(null)
        let num = 0
        timer(() => num++, 500)
        await delay(550)
        expect(num).toBe(1)
        done()
    })

    it('interval()', async(done) => {

        expect(interval).toBeInstanceOf(Function)
        expect(interval(1)).toBe(null)

        // not incremented since interval and max vait are 0 by default
        let fn1 = async() => {
            let num = 0
            interval(() => num++)
            await delay(100)
            expect(num).toBe(1)
        }

        let fn2 = async() => {
            let num = 0
            interval(() => num++, 100, 200)
            await delay(210)
            expect(num).toBe(2)
        }

        await fn1()
        await fn2()
        done()
    })

    it('dupes()', (done) => {
        expect(dupes).toBeInstanceOf(Function)
        expect(dupes()).toStrictEqual([])
        expect(dupes({ a: 1 }, 2)).toStrictEqual([{ a: 1 }, { a: 1 }])
        
        expect(dupes('hello', 2)).toStrictEqual(['hello', 'hello'])
        done()
    })

    it('loop()', (done) => {
        expect(loop).toBeInstanceOf(Function)
        expect(loop(2, true)).toStrictEqual([])

        expect(loop(2, (inx) => inx)).toStrictEqual([0, 1])
        let val = 0
        loop(3, (inx) => val = inx)
        expect(val).toBe(2)

        let data = loop(3, (inx) => {
            if (inx === 2) return { break: true }
            else return inx
        })
        expect(data).toStrictEqual([0, 1])

        done()
    })

})
