// @ts-nocheck
/* eslint-disable no-array-constructor */
/* eslint-disable no-new-object */
/* eslint-disable no-new-wrappers */
/* eslint-env mocha */

/*
timer,interval,copyDeep,someKeyMatch,exactKeyMatch,typeCheck,loggerSetting,hasPrototype,hasProto, validDate,dupes,loop,dispatcher, withHoc,xrequire,truthFul,inIndex,matched 
* */

// import assert from 'assert'
import { isArray, isObject, isString, isEmpty, isFalse, isFalsy, isTrue, isBoolean, isNull, isUndefined, isClass, isBigInt, isError, isFunction, isInstance, isNumber, sq, isPromise, isQPromise, isSQ, delay, isRegExp,
    last, head, uniq, uniqBy, shuffle, arrayWith, exFromArray, pickFromArray, flatten, flattenDeep, chunks, objectSize, trueProp, copyBy, copy, stringSize, validID, asJson, inIndex, matched 
} from '../src'
import { describe, expect, it, jest } from '@jest/globals'

describe('Evaluate Strings/ segment (1.)', () => {
  
    it('stringSize()', (done) => {

        expect(stringSize).toBeInstanceOf(Function)
        expect(stringSize()).toBe(0)
  
        expect(stringSize).toBeInstanceOf(Function)
        expect(stringSize()).toStrictEqual(0)
        expect(stringSize('abc')).toBe(3)
        expect(stringSize(-1)).toBe(0)
        expect(stringSize('-1')).toBe(2)
        expect(stringSize({})).toBe(0)
        expect(stringSize([])).toBe(0)
        done()
    })

    it('validID()', (done) => {
        expect(validID).toBeInstanceOf(Function)
        expect(validID()).toBe('')
        let id = ('1 sdf3546AB' + 124) + ' 34'
        expect(validID(id)).toBe('1sdf3546ab12434')

        done()
    })
    
    it('asJson()', (done) => {
        expect(asJson).toBeInstanceOf(Function)
        expect(asJson()).toBe(undefined)

        expect(asJson({ a: 1, b: 1 })).toHaveLength(22)
        done()
    })

    it('inIndex()', (done) => {
        expect(inIndex).toBeInstanceOf(Function)
        expect(inIndex()).toBe(0)
        expect(inIndex('', [/\\/])).toBe(0)

        expect(inIndex('ab cd eFG', [/fg/i, /\sCD\s/i, /ab/])).toBe(3)
        expect(inIndex('abcdeFG', [/%fg/i, /1CD/i, /ab/])).toBe(1)
        done()
    })

    it('matched()', (done) => {
        expect(matched).toBeInstanceOf(Function)
        expect(matched()).toBe(false)
        expect(matched('', /\\/)).toBe(false)

        expect(matched('aabc', /^abc/)).toBe(false)
        expect(matched('aaBC', /abc/i)).toBe(true)
        done()
    })

})
