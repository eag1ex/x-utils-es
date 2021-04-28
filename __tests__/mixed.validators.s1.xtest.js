// @ts-nocheck
/* eslint-disable no-array-constructor */
/* eslint-disable no-new-object */
/* eslint-disable no-new-wrappers */
/* eslint-env mocha */

// NOTE Provided tests are for arrays and objects, logical operators

/*
timer,interval,copyDeep,someKeyMatch,exactKeyMatch,typeCheck,loggerSetting,hasPrototype,hasProto, validDate,resolver,dupes,loop,dispatcher, withHoc,xrequire,truthFul
* */

// import assert from 'assert'
import { isArray, isObject, isString, isEmpty, isFalse, isFalsy, isTrue, isBoolean, isNull, isUndefined, isClass, isBigInt, isError, isFunction, isInstance, isNumber, sq, isPromise, isQPromise, isSQ, delay, isRegExp,
    last, head, uniq, uniqBy, shuffle, arrayWith, exFromArray, pickFromArray, flatten, flattenDeep, chunks, objectSize, trueProp, copyBy, copy
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
        expect(copy(new Object({ a: 1, b: 1 }))).toStrictEqual({ a: 1, b: 1 })
        expect(copy({ a: 1, b: 1 })).toStrictEqual({ a: 1, b: 1 })
        done()
    })

})
