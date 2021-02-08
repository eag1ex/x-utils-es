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
 * - if you used logging in your application from the moment this method was called allloggind will be disabled
 * - on node `globa.xUtilsConfig` is set, in `window.xUtilsConfig` is set
 * @effects `log, warn,error, onerror, errorTrace, stack`
 * @returns boolean
*/
export const disableLogging = () => {
    try {
        if (window) {
            //  on browser
            if (window.xUtilsConfig) {
                window.xUtilsConfig.logging = 'off'
            } else {
                window.xUtilsConfig = {
                    logging: 'off'
                }
            }
          
            return true
        }
    } catch (err) {
        //
    }

    try {
        // in node
        if (global.xUtilsConfig) {
            global.xUtilsConfig.logging = 'off'
        } else {
            global.xUtilsConfig = {
                logging: 'off'
            }
        }

        return true
    } catch (err) {
        //
    }
    return false
}

/** 
 * if you used logging in your application from the moment this method was called all loging will be enabled
 * - on node `globa.xUtilsConfig` is rest, in `window.xUtilsConfig` is rest
 * @effects `log, warn,error, onerror, errorTrace, stack`
 * @returns boolean
*/
export const resetLogging = () => {
    try {
        if (window) {
            if (window.xUtilsConfig) {
                window.xUtilsConfig.logging = 'on'
            } else {
                window.xUtilsConfig = {
                    logging: 'on'
                }
            }

            return true
        }
       
    } catch (err) {
        //
    }

    try {
        if (global.xUtilsConfig) {
            global.xUtilsConfig.logging = 'on'
        } else {
            global.xUtilsConfig = {
                logging: 'on'
            }
        }

        return true
    } catch (err) {
        //
    }

    return false
}

/** 
 * @loggerSetting
 * - allow enabling and disabling log/warn/error/onerror logging consoles
 * @param {String} logType available types: log,warn,error,onerror
 * @param {String} logMode off/on
 * @returns boolean true/false if it was sucessfull
*/
export const loggerSetting = (logType = 'log', logMode = 'off') => {

    let availTypes = ['log', 'warn', 'onerror', 'error', 'alert', 'attention', 'debug']
    let availModes = ['on', 'off']

    if (!availTypes.includes(logType) || !logType) return false
    if (!availModes.includes(logMode) || !logMode) return false
    if (logType === 'onerror') logType = 'error'
    
    try {
        if (window) {
            //  on browser
            if (window.xUtilsConfig) {
                window.xUtilsConfig[logType] = logMode
            } else {
                window.xUtilsConfig = {
                    [logType]: logMode
                }
            }

            return true
        }
    } catch (err) {
        //
    }

    try {
        // in node
        if (global.xUtilsConfig) {
            global.xUtilsConfig[logType] = logMode
        } else {
            global.xUtilsConfig = {
                [logType]: logMode
            }
        }
        return true
    } catch (err) {
        //
    }
    return false
}

/** 
 * @checkLoggerSetting
 * - internal method
 * check if any log,warn,error,onerror are currently disabled
 * @param {String} logType
 * @return {String} on/off
*/
const checkLoggerSetting = (logType) => {
    try {
        if (window) {
            //  on browser
            if (window.xUtilsConfig) {
                return window.xUtilsConfig[logType] ? window.xUtilsConfig[logType] : 'on'
            } else {
                return 'on'
            }
        }
    } catch (err) {
        //
    }

    try {
        // in node
        if (global.xUtilsConfig) {
            return global.xUtilsConfig[logType] ? global.xUtilsConfig[logType] : 'on'
        } else {
            return 'on'
        }

    } catch (err) {
        //
    }
    return 'on'
}

/** 
 * - when xUtilsConfig wasnt set, then we are on, else if ..xUtilsConfig==='off', do not print logs
 * @effects `log, warn,error, onerror, errorTrace, stack, debug, alert, attention`
 */
const loggingON = () => {
    try {
        if (window) return (window.xUtilsConfig || {}).logging === 'on' || (window.xUtilsConfig || {}).logging === undefined
    } catch (err) {
        //
    }
    try {
        return (global.xUtilsConfig || {}).logging === 'on' || (global.xUtilsConfig || {}).logging === undefined
    } catch (err) {
        //
    }
    return true
}

/** 
 * @param {string} type log,error,warn,debug
*/
const logConstract = function (type = '', args) {
  
    if (!args.length) args[0] = ''
    let allData = args.filter(n => typeof n === 'string' || n === undefined).length === 0
    let format = allData ? '\%o' : ''

    if (type === 'log') args = [].concat(`\x1b[90m[log]\x1b[0m\x1b[2m${format} `, args, '\x1b[0m')
    if (type === 'debug') args = [].concat(`\x1b[90m[debug]\x1b[0m\x1b[32m${format} `, args, '\x1b[0m')
    if (type === 'warn') args = [].concat(`\x1b[90m[warning]\x1b[0m\x1b[1m${format} `, args, '\x1b[0m')
    if (type === 'alert') args = [].concat(`\x1b[90m[alert]\x1b[0m\x1b[33m${format} `, args, '\x1b[0m')
    if (type === 'attention') args = [].concat(`\x1b[90m[attention]\x1b[0m\x1b[36m${format} `, args, '\x1b[0m')

    try {
        if (window) console.log.apply(null, args)
        return
    } catch (err) {
        // using node     
    }
    console.log.apply(null, args)
}

const log = function (...args) {
    if (!loggingON()) return
    if (checkLoggerSetting('log') === 'off') return 

    return logConstract('log', args)
}

/** 
 * - this is not a console.debug 
 * - just like console.log but in green color output and [debug]
*/
const debug = function (...args) {
    if (!loggingON()) return
    if (checkLoggerSetting('debug') === 'off') return 

    return logConstract('debug', args)
}

const warn = function (...args) {
    if (!loggingON()) return
    if (checkLoggerSetting('warn') === 'off') return 
    
    return logConstract('warn', args)
}

const alert = function (...args) {
    if (!loggingON()) return
    if (checkLoggerSetting('alert') === 'off') return 
    
    return logConstract('alert', args)
}

const attention = function (...args) {
    if (!loggingON()) return
    if (checkLoggerSetting('attention') === 'off') return 
    
    return logConstract('attention', args)
}

const error = function (...args) {
    if (!loggingON()) return
    if (checkLoggerSetting('error') === 'off' || checkLoggerSetting('onerror') === 'off') return 

    if (!args.length) args[0] = ''
    let allData = args.filter(n => typeof n === 'string' || n === undefined).length === 0
    let format = allData ? '\%o' : ''

    try {
        if (window) {
            args = [].concat(`\x1b[31m[error]\x1b[0m\x1b[31m${format} `, args, '\x1b[0m')
            console.error.apply(null, args)
            return
        }
    } catch (err) {
        // using node
    }

    args = [].concat(`\x1b[41m[error]\x1b[0m\x1b[31m${format} `, args, '\x1b[0m')
    
    console.log.apply(null, args)
}

/** 
 * - good for stack tracing
 * @param {*} data optional any
 * @param {boolean} asArray if set true, will output stack trace as array, otherwise a string
 * @returns console.log `[STACK TRACE]`: xxx
*/
export const stack = (data, asArray = false) => {
    if (!loggingON()) return
    let stackList = new Error(JSON.stringify(data)).stack.split('(')
    stackList.splice(1, 1)
    let stackHead = stackList[0].split(/\n/)[0].replace('Error', '[STACK TRACE]')
    stackList.splice(0, 1)
    stackList.unshift(stackHead)
    if (asArray) console.log(stackList)
    else console.log.apply(null, stackList)
    return undefined
}

/**
 * - console.error stack trace
 * @param {*} data optional any
 * @param {boolean} asArray if set true, will output stack trace as array, otherwise a string
 * @returns console.error `[ERROR]`: xxx
 */
export const errorTrace = (data, asArray = false) => {
    if (!loggingON()) return
    let stackList = new Error(JSON.stringify(data)).stack.split('(')
    stackList.splice(1, 1)
    let errHead = stackList[0].split(/\n/)[0].replace('Error', '[ERROR]')
    stackList.splice(0, 1)
    stackList.unshift(errHead)
    if (asArray) console.error(stackList)
    else console.error.apply(null, stackList)
    return undefined
}

const onerror = error

/** 
 * - for loop initiating callback on each iteration
 * - when `cb` is returned this data is pushed to array
 * - break support when returning {break:true} inside callback method
 * @param size:number
 * @param cb((inx)=>) callback issed at end of each loop que
 * @returns always an array[], per length specified
*/
export const loop = function(size = 0, cb) {
    let isFN = typeof cb === 'function'
    let isNum = typeof size === 'number'
    if (!isFN || !isNum) return []
    if (!size) return []
    let d = []
    for (let inx = 0; inx < Array(size).length; inx++) {

        let r = cb.apply(this, [inx])

        // add support for break from the loop inside callback function
        try {
            if (r && Object.entries(r).length) {
                if (r.break) break
            }
        } catch (err) {
            // 
        }
        d.push(r) // always grun any data       
    }
    return d
}

/** 
 * - evaluate provided DATA is an actual `date` and its valid
 * @param date 
 * @returns true or false
*/
const validDate = (dt) => {
    try {
        if (dt.__proto__ === Date.prototype && (dt).toString() !== 'Invalid Date') return true
        else return false
    } catch (err) {
        return false
    }
}

// @ts-ignore
const isArray = (arr) => !arr ? false : Array.prototype === (arr).__proto__

/**
 * - evaluate type of an element and check if its falsy
 * @param el any data
 * @param standard:boolean `standard==true` > return javascript standard types, `standard==false` > return user friendly definition types:`[date,NaN,promise,array,...typeof]`
 * @returns { "type": date,NaN,promise,instance,prototype,array,...typeof, value: number, primitiveValue }
*/
const typeCheck = (el, standard = true) => {

    const ofType = (type) => {
        if (standard) return typeof el
        else return type || typeof el
    }

    const asPrototype = (Type) => {
        return Type.prototype === el.prototype
    }

    try {
        if (typeof el === 'symbol') return { "type": ofType(), value: 0, primitiveValue: Symbol('') }

        if (el === undefined) return { "type": ofType(), value: 0, primitiveValue: undefined }

        if (typeof el === 'boolean') return { "type": ofType(), value: +(el), primitiveValue: Boolean() }

        if (typeof el === 'bigint' && typeof Object(el) === 'object') return { "type": ofType(), value: 1, primitiveValue: BigInt('') } // eslint-disable-line no-undef
        if (el === null) return { "type": ofType('null'), value: 0, primitiveValue: Object() }

        if (el.__proto__ === Date.prototype || asPrototype(Date)) return { "type": ofType('date'), value: 1, primitiveValue: new Date() }

        if (String.prototype === (el).__proto__) return { 'type': ofType(), value: el.length, primitiveValue: String() }

        if (Array.prototype === (el).__proto__ || asPrototype(Array)) return { "type": ofType('array'), value: (el || []).length, primitiveValue: Array() } // eslint-disable-line no-array-constructor

        if (Promise.prototype === (el || '').__proto__ || asPrototype(Promise)) return { type: ofType('promise'), value: 1, primitiveValue: Function() }

        if (Function.prototype === (el).__proto__ || asPrototype(Function)) return { type: ofType(), value: 1, primitiveValue: Function() }

        if ((Object.prototype === (el).__proto__) || asPrototype(Object)) return { "type": ofType(), value: Object.keys(el).length, primitiveValue: Object() }

        if ((Error.prototype === (el).__proto__) || asPrototype(Error)) return { "type": ofType('error'), value: Object.keys(el).length, primitiveValue: Error() }

        if ((el).__proto__ === Number.prototype || asPrototype(Number)) {
            if (isNaN(el)) return { "type": ofType('NaN'), value: 0, primitiveValue: Number() }
            else return { "type": ofType(), value: el, primitiveValue: Number() }

            // Unary plus operator
        } else if ((+(el) >= 0) === false) return { 'type': typeof el, value: +(el), primitiveValue: undefined }
        else return { 'type': typeof el, value: 0, primitiveValue: undefined }
    } catch (err) {
        error(err)
        return {}
    }
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
 * matching number <1
 * matching boolean ===false
 * all else return isFalse()===true
 * @param {*} el number/boolean
*/
export const isFalse = (el) => {
    if (el === null) return true
    if (typeof el === 'undefined') return true
    if (typeof el === 'number' && el < 1) return true
    if (typeof el === 'boolean' && el === false) return true
    else return false
}

/** 
 * matching number >0
 * matching boolean ===true
 * all else return isTrue()===false
 * @param {*} el number/boolean
*/
export const isTrue = (el) => {
    if (el === null) return false
    if (typeof el === 'undefined') return false
    if (typeof el === 'number' && el > 0) return true
    if (typeof el === 'boolean' && el === true) return true
    else return false
}

/** 
 * check if an item is a boolean
*/
export const isBoolean = (el) => {
    if (el === undefined) return false
    if (el === null) return false
    return typeof el === 'boolean' ? true : Boolean.prototype === (el).__proto__
}

export const isNull = (el) => {
    if (el === null) return true
    else return false
}

export const isUndefined = (el) => {
    if (typeof el === 'undefined') return true
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

export const timer = (cb, time = 0) => {
    const isFN = typeof cb === 'function'
    if (!isFN) return null
    time = (typeof time === 'number' && time >= 0) ? time : 0 // must provide number
    const s = setTimeout(() => {
        cb()
        clearTimeout(s)
    }, time)
}

export const interval = (cb, every = 0, endTime = 0) => {
    const isFN = typeof cb === 'function'
    if (!isFN) return null
    every = (typeof every === 'number' && every >= 0) ? every : 0 // must provide number
    endTime = (typeof endTime === 'number' && endTime >= 0) ? endTime : 0 // must provide number  

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
export const isNumber = (n) => n !== undefined && n !== null && n !== '' ? (n).__proto__ === Number.prototype : false

export const objectSize = (obj = {}) => {
    if (!obj || !isNaN(+(obj))) return 0
    return ((Object.prototype === (obj).__proto__) || Error.prototype === (obj).__proto__) ? Object.keys(obj).length : 0
}

export const stringSize = (str = '') => str !== undefined && str !== null ? (str).__proto__ === String.prototype ? str.length : 0 : 0

const isPromise = (defer) => Promise.prototype === (defer || {}).__proto__

const isObject = (obj) => {
    if (typeof obj === 'function') return false
    if (!isNaN((+obj)) || obj === undefined) return false
    if ((obj).__proto__ === ([]).__proto__) return false // is array 
    // testing standard Object and Error
    const a = (Object.prototype === (obj).__proto__ || Error.prototype === (obj).__proto__)
    const ab = a && (obj instanceof Object)

    if (ab) return true

    // testing (new class{})
    if (obj.__proto__ !== undefined) {
        if (obj.__proto__.__proto__ !== undefined) {
            if (obj.__proto__.__proto__ === Object.prototype && obj instanceof Object) return true
        }
    }
    // testing (class{}).prototype
    if ((obj).prototype) return true
    return false
}

const uniq = (arr = []) => arr.filter((el, i, all) => all.indexOf(el) === i)

/** 
 * @selectiveArray
 * - select data from array of objects by reference
 * - go down recursively, in order of selectBy references
 * @param {array} selectBy:required, list of uniq references, example ['a.b.c.d.e','e.f.g'], each selectBy/item targets nested object props
 * @param {array} data:required list of objects, to target by select ref
*/
export const selectiveArray = (selectBy = [], data = [{}]) => {
    if (!isArray(data)) return []
    if (!data.length) return []
    // NOTE if selectBy is empty or invalid will return same data
    if (!isArray(selectBy)) return data
    if (!selectBy.length) return data
    selectBy = uniq(selectBy)

    let nData = []

    // go down recursively
    let findNest = (s, item, inx = 0) => {
        let lastItem = null
        let found
        if (!s) return undefined
        if (!isArray(s)) return undefined
        if (!s.length) return undefined

        try {
            if (item[s[inx]] !== undefined) {
                lastItem = item[s[inx]]
                found = lastItem
                inx = inx + 1

                if (s[inx]) return findNest(s, found, inx)
                else return found
            }

        } catch (err) {
            console.log(err.toString())
        }
        
        return found
    }

    for (let i = 0; i < data.length; i++) {
        let item = data[i]

        if (!isObject(item)) {
            // each item in an array must be an object to be able to selectBy nested prop 
            nData.push([item])
            continue
        }

        let found
        let collective = [] // insert collective 
        for (let o = 0; o < selectBy.length; o++) {
            let sArr = (selectBy[o] || "").split('.')
            try {
                found = findNest(sArr, item, 0)
                collective.push(found)
            } catch (err) {
                //
            }                     
        }

        // if all items are undef and selectBy/size matches collective/size
        // if all collective are undef filter them out
        // this helps with positioning of uneven results, and 1 side has match and the other does not, 
        // valid exmaple:[ [ 'abc', undefined ], 'efg', undefined  ] << pairs should be consistent, when selectBy has more then 1
        if (selectBy.length === collective.length) {
            let allUndef = collective.filter(n => n === undefined)
            if (allUndef.length === selectBy.length) collective = collective.filter(n => !!n)
        }

        if (collective.length) {
            nData.push([].concat(collective))
        } else if (found !== undefined) nData.push(found)
    }

    return nData
}

// testing (class{}).prototype
const isClass = (obj) => {
    if (!obj) return false
    if ((obj).prototype !== undefined) return true
    return false
}

/** 
 * @alias isClass
*/
export const hasPrototype = isClass

export const hasProto = (el) => {
    try {
        return el.__proto__ !== undefined
    } catch (err) {
        return false
    }
}

// testing (new class{})
const isInstance = (obj) => {
    if (!obj) return false
    if (isArray(obj)) return false
    if (obj.__proto__ && !isClass(obj)) {
        if (obj.__proto__.__proto__) {
            if (obj.__proto__.__proto__ === Object.prototype && obj instanceof Object) return true
        }
    }
    return false
}

// @ts-ignore
export const isString = (str) => {
    if (str === undefined) return false
    if (str === null) return false
    if (typeof str === 'boolean') return false
    return str === '' ? true : String.prototype === (str).__proto__
}
export const isFunction = (el) => typeof el === 'function'

export const copyBy = (obj = {}, refs = []) => {
    if (!isObject(obj)) return {}
    // @ts-ignore
    const d = [].concat(refs).reduce((n, el, i) => {
        if (obj[el] !== undefined) n[el] = obj[el]
        return n
    }, {})

    try {
        return JSON.parse(JSON.stringify(d))
    } catch (err) {
        return {}
    }
}

const copy = (data) => {
    try {
        return JSON.parse(JSON.stringify(data))
    } catch (err) {
        return typeCheck(data).primitiveValue
    }
}

/** 
 * - for complex arrays of objects: [{...},{...}] we can use copy deep
 * - will copy each item in array seperatly
 * - will check for Object>object and make copy
 * @return same type copy  
*/
export const copyDeep = (data) => {

    if (isArray(data)) {
        return data.map(n => copy(n))
    }

    if (isObject(data)) {
        return Object.entries(data).reduce((n, [k, val]) => {
            if (isObject(val)) n[k] = { ...copy(val) }
            else n[k] = val
            return n
        }, {})
    }

    else {
        try {
            return JSON.parse(JSON.stringify(data))
        } catch (err) {
            return typeCheck(data).primitiveValue
        }
    }
}





export const delay = (time = 100) => {
    // @ts-ignore
    const isNum = typeof time === 'number' && time >= 0 // must provide number
    if (!isNum) return Promise.resolve(true) // or resolve 
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
export const exactKeyMatch = (object = {}, source = {}) => {
    // test if its an object
    if (!(!object ? false : Object.prototype === (object).__proto__)) return false
    if (!(!source ? false : Object.prototype === (source).__proto__)) return false

    const a = Object.keys(object)
    const b = Object.keys(source)
    if (a.length >= b.length) return a.filter(z => b.filter(zz => zz === z).length).length === a.length
    else return b.filter(z => a.filter(zz => zz === z).length).length === b.length
}

/**
 * @withTrueVal
 * - you have an array with false values: [0,null,false,{},undefined, -1,'',true,1, 'hello',[]], will only return any that are true, keeping same order: [true,1,'hello'], empty entities are also omitted
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
 * - you have an array with false values: [0,null,false,[{}],undefined, -1,'',true,1, 'hello',[[]]], will only return any that are true entities, keeping same order: [true,1,'hello'], empty entities are omitted.
 * - similar to `withVal`, except it checks 1 depth> if entities them self are empty: [[]],[{}]
 * @param {*} arr array required
 * @returns returns new array with only [<true?>] values
 */
export const trueValDeep = (arr = []) => {
    // provided must be array
    if (!(!arr ? false : Array.prototype === (arr).__proto__)) return []

    return [].concat(arr).map((itm, inx) => {
        const typeIs = typeCheck(itm, false)
        // this item has child, check for false entities
        if (typeIs.type === 'array' && typeIs.value > 0) {
            return itm.map(child => {
                // return only true entities, from 1 depth
                if (typeCheck(child, false).value > 0) return child
                else return null
            }).filter(n => !!n)
        }
        if (typeIs.type === 'object' && typeIs.value) {
            return Object.entries(itm).reduce((n, [k, v], i) => {
                if (typeCheck(k, false).value > 0) n[k] = v
                return n
            }, {})
        } else if (typeIs.value > 0) return itm
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

    return Object.assign({}, Object.entries(obj).reduce((n, [key, val], inx) => {
        if (!isFalsy(val)) n[key] = val
        return n
    }, {}))
}

/** 
 * @resolver 
 * - this method will test `fn()` until timeout or when data/ not  undefined becomes available
 * @param fn:function, callable method with data to return
 * @param timeout:Number, specify max time to wait for data
 * @param testEvery:Number, how ofter to check for data availability
 * @returns Promise/always resolves, and error, it will wrap it in {error} , if no data returns Promise.resolve(undefined), 
*/
export const resolver = (fn, timeout = 5000, testEvery = 50) => {
    let isFunction = typeof fn === 'function'
    if (!isFunction) {
        return Promise.reject('fn() must be callable')
    }
    return new Promise((resolve, reject) => {
        let every = testEvery || 50
        let max = timeout
        let inx = 0
        // in case fn throws we return as {error}
        let called = null
        
        /** 
         * - call only once if its a promise
        */
        let test = () => {
            try {
                if (!called) called = fn()
                if (isPromise(called)) return called
                else return fn()
            } catch (error) {
                if (isError(error)) return { error }
                if (isObject(error)) {
                    if (error.error) return error
                    else return { error: error }
                } else return { error: error.toString() }
            }
        }

        let t = setInterval(async () => {
            if (inx >= max) {
                resolve(undefined)
                return clearInterval(t)
            }

            let anon = test() // internaly execute only once if a promise
            if (isPromise(anon)) {
                try {
                  
                    let d = await anon
                    resolve(d)
                    return clearInterval(t)
                } catch (error) {
                 
                    if (isError(error)) resolve({ error })
                    if (isObject(error)) {
                        if (error.error) resolve(error)
                        else resolve({ error })
                    } else resolve({ error: error.toString() })
                    return clearInterval(t)
                }
            }

            if (anon !== undefined) {
                resolve(anon)
                return clearInterval(t)
            }
            inx = inx + every
        }, every)
    })
}

/** 
 * @flatten
 * - flattens 2 level array to 1 level, [[]] > [], [[[]]] > [[]]
*/
export const flatten = (arr = []) => {
    if (!isArray(arr)) return []
    return [].concat(...arr)
}

/** 
 * flatten all array levels, example :[[['hello']]] > ['hello']
*/
export const flattenDeep = (arr = []) => {
    if (!isArray(arr)) return []
    function test(arr, d = 1) {
        return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? test(val, d - 1) : val), [])
            : arr.slice()
    }
    return test(arr, Infinity)
}

/** 
  * @chunks
  * - return array in batch specified by size
  * @param {array} arr required
  * @param {number} size required larger then 0
  * @returns arr[]
 */
export const chunks = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    )

/** 
 * - duplicate original item x/times
 * @param {*} item any value
 * @param {number} index how many times to duplicate, when 0 then empty array is returned
 * @returns {array} [...]
*/
const dupes = (item, index) => {
    const dups = []
    let n = parseInt(index)
    while (n > 0) {
        n--
        dups.push(item)
    }
    return dups
}
export { copy }
export { uniq }
export { isPromise }
export { debug }
export { log }
export { warn }
export { onerror }
export { error }
export { alert }
export { attention }
export { isObject }
export { isFalsy }
export { isError }
export { typeCheck }
export { validDate }
export { isInstance }
export { isClass }
export { isArray }
export { dupes }

/**
 * @prop {*} l any data to print
 * @prop {*} err display as error if set to true
 */
// @ts-ignore
export const notify = function (logData = null, err = null) {
    throw ('no notify support for x-utils-es, use: x-utils')
}
