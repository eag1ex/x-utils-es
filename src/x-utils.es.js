// @ts-nocheck
"use strict"
/* eslint-disable no-proto */

/**
 * @xtils
 * * Simple javascript, lodash alternative library
 * * Developed by Anon
 * * license: CC-BY-SA-4.0
 */

export const objectSize = (obj = {}) => (obj && (Object.prototype === (obj).__proto__)) ? Object.entries(obj).length : 0

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
export const isObject = (obj) => {
    const a = !obj ? false : (Object.prototype === (obj).__proto__)
    const b = a && (obj instanceof Object && (obj).__proto__ !== ([]).__proto__)
    return b

}
// @ts-ignore
export const isArray = (arr) => !arr ? false : Array.prototype === (arr).__proto__
// @ts-ignore
export const isString = (str) => str === '' ? true : String.prototype === (str).__proto__
export const isFunction = (el) => typeof el === 'function'
export const isFalsy = (el = null) => {
    if (el === undefined) return true
    if (el === false && typeof el === 'boolean') return true
    if (el === null) return true
    if (String.prototype === (el).__proto__) return el.length < 1
    if (Array.prototype === (el).__proto__) return (el || []).length === 0
    if (Promise.prototype === (el || {}).__proto__) return false
    if (typeof el === 'function') return false
    if ((Object.prototype === (el).__proto__)) return Object.entries(el).length === 0
    if (el !== undefined && (el).__proto__ === Number.prototype) return el <= 0
    if ((+(el) > 0) === false) return true
    if (el) return false
    else return false
}

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
    if (!(!object ? false : Object.prototype === (object).__proto__)) {
        return false
    }
    if (!(!source ? false : Object.prototype === (source).__proto__)) {
        return false
    }
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
    if (!(!object ? false : Object.prototype === (object).__proto__)) {
        return 0
    }
    if (!(!source ? false : Object.prototype === (source).__proto__)) {
        return 0
    }
    const a = Object.keys(object)
    const b = Object.keys(source)
    if (a.length >= b.length) return a.filter(z => b.filter(zz => zz === z).length).length === a.length
    else return b.filter(z => a.filter(zz => zz === z).length).length === b.length
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

/**
 * @prop {*} l any data to print
 * @prop {*} err display as error if set to true
 */

// @ts-ignore
export const notify = function (logData = null, err = null) {
    throw ('no notify support for x-utils-es, use: x-utils')
}
