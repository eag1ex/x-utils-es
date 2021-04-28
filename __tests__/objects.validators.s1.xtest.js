// @ts-nocheck
/* eslint-disable no-array-constructor */
/* eslint-disable no-new-object */
/* eslint-disable no-new-wrappers */
/* eslint-env mocha */

/*
stringSize,copyBy,timer,interval,validID,cancelPromise,copy,copyDeep,delay,someKeyMatch,exactKeyMatch,typeCheck,loggerSetting,hasPrototype,hasProto, validDate,resolver,dupes,loop,dispatcher, withHoc,xrequire,asJson,truthFul,inIndex,matched,isRegExp 
* */

// import assert from 'assert'
import { isArray, isObject, isString, isEmpty, isFalse, isFalsy, isTrue, isBoolean, isNull, isUndefined, isClass, isBigInt, isError, isFunction, isInstance, isNumber, sq, isPromise, isQPromise, isSQ, delay, isRegExp,
    last, head, uniq, uniqBy, shuffle, arrayWith, exFromArray, pickFromArray, flatten, flattenDeep, chunks, objectSize, trueProp
} from '../src'
import { describe, expect, it, jest } from '@jest/globals'

describe('Evaluate Objects/ segment (1.)', () => {
  
    it('objectSize()', (done) => {
 
        expect(objectSize).toBeInstanceOf(Function)
        expect(objectSize()).toBe(0)
       
        let falsy = [[], true, false, undefined, null, {}]
        for (let a of falsy) expect(objectSize(a)).toBe(0)

        expect(objectSize((new function() { this.a = 1 }()))).toBe(1)
        expect(objectSize({ a: 1, b: 1 })).toBe(2)
        expect(objectSize(new Object({ a: 1, b: 1 }))).toBe(2)
        done()
    })

    it('trueProp()', (done) => {
 
        expect(trueProp).toBeInstanceOf(Function)
        expect(trueProp()).toStrictEqual({})

        expect(trueProp({ a: NaN, b: 0, c: false, d: -1, e: NaN, f: [], g: 'hello', h: {}, i: undefined, j: '' })).toStrictEqual({ g: 'hello' })

        expect(trueProp({ a: undefined, b: 0, c: 1, d: NaN })).toStrictEqual({ c: 1 })
        expect(trueProp(new Object({ a: undefined, b: 1 }))).toStrictEqual({ b: 1 })
        done()
    })

})
