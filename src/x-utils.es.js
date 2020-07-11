// @ts-nocheck
"use strict"
/* eslint-disable no-proto */

/**
 * @xtils
 * * Simple javascript, lodash alternative library
 * * Developed by Anon
 * * license: CC-BY-SA-4.0
 */




/** 
 * - evaluate type of an element and check if its falsy
 * @returns { "type": typeof/promise, value: true/null/false/number/undefined }
*/
const typeCheck = (el) => {

    if (el === undefined) return { "type": "undefined", value: undefined }
    if (el === false && typeof el === 'boolean') return { "type": "boolean", value: false }
    if (el === null) return { "type": 'object', value: null }
    if (String.prototype === (el).__proto__) return { 'type': 'string', value: el.length }
    if (Array.prototype === (el).__proto__) return { "type": 'array', value: (el || []).length }
    if (Promise.prototype === (el || '').__proto__) return { type: "promise", value: true }
    if (typeof el === 'function') return { type: "function", value: true }
    if ((Object.prototype === (el).__proto__)) return { "type": "object", value: Object.keys(el).length }
    if ((Error.prototype === (el).__proto__)) return { "type": "object", value: Object.keys(el).length }

    if (el !== undefined && (el).__proto__ === Number.prototype) {
        if (isNaN(el)) return { "type": 'number', value: 0 } // so we can evaluate without worry
        else return { "type": 'number', value: el }
    }
    // Unary plus operator
    if ((+(el) >= 0) === false) return { 'type': typeof el, value: +(el) }

    // testing (class{}).prototype
    if ((el).prototype) {
        if ((el).prototype.__proto__ === Object.prototype) return { "type": "object", value: 0 }
    }
    // testing (new class{}).prototype
    if (el.__proto__) {
        if (el.__proto__.__proto__) {
            if (el.__proto__.__proto__ === Object.prototype) return { "type": "object", value: Object.keys(el).length }
        }
    }

    if (el) return { 'type': typeof el, value: false }
    else return { 'type': typeof el, value: undefined }
}

const isError = (el) => {
    return (Error.prototype === (el || '').__proto__)
}


const isFalsy = (el = null) => {
    if (el === undefined) return true
    if (el === false && typeof el === 'boolean') return true
    if (el === null) return true
    if (String.prototype === (el).__proto__) return el.length < 1
    if (Array.prototype === (el).__proto__) return (el || []).length === 0
    if (Promise.prototype === (el || {}).__proto__) return false
    if (typeof el === 'function') return false
    if ((Object.prototype === (el).__proto__)) return Object.keys(el).length === 0
    if ((Error.prototype === (el).__proto__)) return false
    if (el !== undefined && (el).__proto__ === Number.prototype) {
        if (isNaN(el)) return true
        else return el <= 0
    }
    if ((+(el) > 0) === false) return true
    if (el) return false
    else return false
}


/** 
 * - check if given data has value or it is true, >0
 * @param value any
 * @extends typeCheck
*/
export const isEmpty = (value) => {
    if (isError(value)) return false
    return !typeCheck(value).value
}

/** 
 * - allow 1 level [[1,2]]
 * @returns first array[] item[0] 
*/
export const head = (arr = []) => {
    // @ts-ignore
    if (Array.prototype !== (arr || null).__proto__) return []
    // @ts-ignore
    return arr.flat().shift()
}

// @ts-ignore
export const last = (arr = []) => (arr && Array.prototype === (arr).__proto__) ? arr[arr.length - 1] : null

export const copyBy = (obj = {}, refs = []) => {
    // @ts-ignore
    const d = refs.reduce((n, el, i) => {
        if (obj[el] !== undefined) n[el] = obj[el]
        return n
    }, {})

    try {
        return JSON.parse(JSON.stringify(d))
    } catch (err) {
        return d
    }
}

export const timer = (cb, time = 0) => {
    const isFN = typeof cb === 'function'
    if (!isFN) return null
    const s = setTimeout(() => {
        cb()
        clearTimeout(s)
    }, time)
}

export const interval = (cb, every = 0, endTime = 0) => {
    const isFN = typeof cb === 'function'
    if (!isFN) return null

    let counter = 0
    const c = setInterval(() => {
        if (endTime <= counter) {
            clearInterval(c)
        } else cb()
        counter = counter + every
    }, every)
}

export const validID = (id = '') => !(id || '') ? '' : (id || '').toString().toLowerCase().replace(/\s/g, '')
// @ts-ignore
export const isNumber = (n) => n !== undefined ? (n).__proto__ === Number.prototype : false
export const isPromise = (defer) => Promise.prototype === (defer || {}).__proto__
export const uniq = (arr = []) => arr.filter((el, i, all) => all.indexOf(el) === i)

export const objectSize = (obj = {}) => {
    if (!obj || !isNaN(+(obj))) return 0
    return ((Object.prototype === (obj).__proto__) || Error.prototype === (obj).__proto__) ? Object.keys(obj).length : 0
}

export const isObject = (obj) => {

    if (!isNaN((+obj)) || obj === undefined) return false
    if ((obj).__proto__ === ([]).__proto__) return false  // is array 

    // testing standard Object and Error
    const a = (Object.prototype === (obj).__proto__ || Error.prototype === (obj).__proto__)
    const ab = a && (obj instanceof Object)

    if (ab) return true

    // testing (new class{})
    if (obj.__proto__) {
        if (obj.__proto__.__proto__) {
            if (obj.__proto__.__proto__ === Object.prototype) return true
        }
    }
    // testing (class{}).prototype
    if ((obj).prototype) {
        if ((obj).prototype.__proto__ === Object.prototype) return true
    }
    return false
}

// @ts-ignore
export const isArray = (arr) => !arr ? false : Array.prototype === (arr).__proto__
// @ts-ignore
export const isString = (str) => str === '' ? true : String.prototype === (str).__proto__
export const isFunction = (el) => typeof el === 'function'

export const copy = (data) => {
    if (data === undefined) return data
    try {
        return JSON.parse(JSON.stringify(data))
    } catch (err) {
        return err.toString()
    }
}

export const delay = (time = 100) => {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        const t = setTimeout(() => {
            clearTimeout(t)
            resolve(true)
        }, time)
    })
}

/**
 * - match keys object{} > with source{}, order doesnt matter!
 * @returns true/false when at least 1 length matched
*/
export const someKeyMatch = (object = {}, source = {}) => {
    // test if its an object
    if (!(!object ? false : Object.prototype === (object).__proto__)) return false
    if (!(!source ? false : Object.prototype === (source).__proto__)) return false

    const a = Object.keys(object)
    const b = Object.keys(source)
    if (a.length >= b.length) return a.filter(z => b.filter(zz => zz === z).length).length > 0
    else return b.filter(z => a.filter(zz => zz === z).length).length > 0
}

/** 
 * - match keys object{} > with source{}, order doesnt matter!
 * @returns true/false when all lengths matched
*/
export const exectKeyMatch = (object = {}, source = {}) => {
    // test if its an object
    if (!(!object ? false : Object.prototype === (object).__proto__)) return 0
    if (!(!source ? false : Object.prototype === (source).__proto__)) return 0

    const a = Object.keys(object)
    const b = Object.keys(source)
    if (a.length >= b.length) return a.filter(z => b.filter(zz => zz === z).length).length === a.length
    else return b.filter(z => a.filter(zz => zz === z).length).length === b.length
}

/**
 * @withTrueVal
 * - you have an array with false values: [0,null,false,{},undefined, -1,'',true,1, 'hello',[]], will only return any that are true, keeping same order: [true,1,'hello'], empty entities are also omited
 * @param {*} arr array required
 * @returns returns new array with only [<true?>] values
 */
export const trueVal = (arr = []) => {
    // provided must be array
    if (!(!arr ? false : Array.prototype === (arr).__proto__)) return []
    return [].concat(arr).filter((itm, inx) => isFalsy(itm) !== true)
}

/**
 * @trueValDeep
 * - you have an array with false values: [0,null,false,[{}],undefined, -1,'',true,1, 'hello',[[]]], will only return any that are true entities, keeping same order: [true,1,'hello'], empty entities are omited.
 * - similar to `withVal`, except it checks 1 depth> if entities them self are empty: [[]],[{}]
 * @param {*} arr array required
 * @returns returns new array with only [<true?>] values
 */
export const trueValDeep = (arr = []) => {
    // provided must be array
    if (!(!arr ? false : Array.prototype === (arr).__proto__)) return []

    return [].concat(arr).map((itm, inx) => {
        const typeIs = typeCheck(itm)
        // this item has child, check for false entities
        if (typeIs.type === 'array' && !isFalsy(typeIs.value)) {
            return itm.map(child => {
                // return only true entities, from 1 depth
                if (!isFalsy(typeCheck(child).value)) return child
                else return null
            }).filter(n => !!n)
        }
        if (typeIs.type === 'object' && !isFalsy(typeIs.value)) {
            return Object.entries(itm).reduce((n, [k, v], i) => {
                if (!isFalsy(typeCheck(k).value)) n[k] = v
                return n
            }, {})
        } else if (!isFalsy(typeIs.value)) return itm
        else return null
    }).filter(n => !!n)
}

/**
 * @trueProp
 * - pass an object and only return object with true entities: `{a:1,b:2,c:null,d:-1}`, => `{a:1,b:2}`
 * @param {*} obj required
 * @returns object with props {} 
 */
export const trueProp = (obj = {}) => {
    if (!(!obj ? false : Object.prototype === (obj).__proto__)) return 0

    return Object.entries(obj).reduce((n, [key, val], inx) => {
        if (!isFalsy(val)) n[key] = val
        return n
    }, {})
}

export const log = function (...args) {
    args = [].concat('[log]', args)

    try {
        if (window) console.log.apply(null, args)
        return
    } catch (err) {
        // using node     
    }
    const util1 = require('util')
    args = args.map(z => util1.inspect(z, false, 3, true))
    console.log.apply(null, args)
}

export const warn = function (...args) {
    args = [].concat('[warning]', args)
    try {
        if (window) console.warn.apply(null, args)
        return
    } catch (err) {
        // using node     
    }
    const util2 = require('util')
    args = args.map(z => util2.inspect(z, false, 3, true))
    console.warn.apply(null, args)
}

export const onerror = function (...args) {
    args = [].concat('[error]', args)
    try {
        if (window) {
            console.error.apply(null, args)
            console.log('  ')
            return
        }
    } catch (err) {
        // using node
    }
    const util3 = require('util')
    args = args.map(z => util3.inspect(z, false, 3, true))
    console.error.apply(null, args)
    console.log('  ')
}

export const error = function (...args) {
    args = [].concat('[error]', args)
    try {
        if (window) {
            console.error.apply(null, args)
            console.log('  ')
            return
        }
    } catch (err) {
        // using node
    }
    const util4 = require('util')
    args = args.map(z => util4.inspect(z, false, 3, true))
    console.error.apply(null, args)
    console.log('  ')
}


export { isFalsy }
export { isError }
export { typeCheck }

/**
 * @prop {*} l any data to print
 * @prop {*} err display as error if set to true
 */
// @ts-ignore
export const notify = function (logData = null, err = null) {
    throw ('no notify support for x-utils-es, use: x-utils')
}
