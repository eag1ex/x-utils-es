// @ts-nocheck
"use strict"
/* eslint-disable no-proto */

/**
 * @xtils
 * * Simple javascript, lodash alternative library
 * * Developed by Anon
 * * License: CC-BY-SA-4.0
 * * For projects contact me at: eaglex.net
 */

/** 
 * - if you used logging in your application from the moment this method was called allloggind will be disabled
 * - on node `globa.xUtilsConfig` is set, in `window.xUtilsConfig` is set
 * @effects `log, warn,error, onerror, errorTrace, stack`
 * @returns boolean
*/
const disableLogging = () => {
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

const isWindow = () => {
    try {
        if (window) return true
    } catch (err) {
        return false
    }   
}

/** 
 * if you used logging in your application from the moment this method was called all loging will be enabled
 * - on node `globa.xUtilsConfig` is rest, in `window.xUtilsConfig` is rest
 * @effects `log, warn,error, onerror, errorTrace, stack`
 * @returns boolean
*/
const resetLogging = () => {
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
const loggerSetting = (logType = 'log', logMode = 'off') => {

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
*/
const checkLoggerSetting = (logType = '') => {

    try {
        if (window) {
            //  on browser
            if (window.xUtilsConfig) {
                return (window.xUtilsConfig[logType] ? window.xUtilsConfig[logType] : 'on').toString()
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
            return (global.xUtilsConfig[logType] ? global.xUtilsConfig[logType] : 'on').toString()
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
 * Designed for executing callback functions
*/
const callFN = (cb = undefined) => {
    if (typeof cb !== 'function') return false
    try {
        let d = cb()
        return d === true || d > 0
    } catch (err) {
        return false
    }
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
 * @property {*} data optional any
 * @property {*} asArray if set true, will output stack trace as array, otherwise a string
 * @returns console.log `[STACK TRACE]`: xxx
*/
const stack = (data, asArray = false) => {
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
 * @property {*} data optional any
 * @property {*} asArray if set true, will output stack trace as array, otherwise a string
 * @returns console.error `[ERROR]`: xxx
 */
const errorTrace = (data, asArray = false) => {
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

const isFunction = (el = undefined) => typeof el === 'function'

const isBigInt = (n) => {
    try {
        return typeof (n) === 'bigint'
    } catch (err) {
        return false
    }
}

/** 
 * - for loop initiating callback on each iteration
 * - when `cb` is returned this data is pushed to array
 * - break support when returning {break:true} inside callback method
 * @property {*} size:number`
 * @property {*} cb((inx)=>)` callback issed at end of each loop que
 * @returns always an array[], per length specified
*/
const loop = function (size = 0, cb = (index = 0) => {}) {
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
 * @param cbEval (optional) callback operator, continue checking when callback returns !!true
*/
const validDate = (dt, cbEval = undefined) => {
    if (isFunction(cbEval) && !callFN(cbEval)) return false
    try {
        if (dt.__proto__ === Date.prototype && (dt).toString() !== 'Invalid Date') return true
        else return false
    } catch (err) {
        return false
    }
}

// @ts-ignore
/**
 * 
 * @property {*} arr
 * @property {*} cbEval (optional) callback operator, continue checking when callback returns !!true
 */
const isArray = (arr = [], cbEval = undefined) => {
    if (isFunction(cbEval) && !callFN(cbEval)) return false
    if (isBigInt(arr)) return false
    else return !arr ? false : Array.prototype === (arr).__proto__
}

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

/** 
 * matching number <1
 * matching boolean ===false
 * all else return isFalse()===true
 * @param {*} el number/boolean
*/
const isFalse = (el) => {
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
const isTrue = (el) => {
    if (el === null) return false
    if (typeof el === 'undefined') return false
    if (typeof el === 'number' && el > 0) return true
    if (typeof el === 'boolean' && el === true) return true
    else return false
}

/** 
 * check if an item is a boolean
*/
const isBoolean = (el) => {
    if (el === undefined) return false
    if (el === null) return false
    return typeof el === 'boolean' ? true : Boolean.prototype === (el).__proto__
}
const isNull = (el) => {
    if (el === null) return true
    else return false
}

const isUndefined = (el) => {
    if (typeof el === 'undefined') return true
    else return false
}

/** 
 * - check if given data has value or it is true, >0
 * @param value any
 * @extends typeCheck
*/
const isEmpty = (value) => {
    if (isError(value)) return false
    return !typeCheck(value).value
}

/** 
 * - allow 1 level [[1,2]]
 * @returns first array[] item[0] 
*/
const head = (arr = []) => {
    // @ts-ignore
    if (Array.prototype !== (arr || null).__proto__) return []
    // @ts-ignore
    return arr.flat().shift()
}

// @ts-ignore

const last = (arr = []) => {
    return (arr && Array.prototype === (arr).__proto__) ? arr[arr.length - 1] : null
}

/**
 * Timer callback is executed in timeout
 */
const timer = (cb = () => {}, time = 0) => {
    const isFN = typeof cb === 'function'
    if (!isFN) return null
    time = (typeof time === 'number' && time >= 0) ? time : 0 // must provide number
    const s = setTimeout(() => {
        cb()
        clearTimeout(s)
    }, time)
}

/**
 * Execute callback on `every` interval, and exit `endTime` 
 */
const interval = (cb = () => {}, every = 0, endTime = 0) => {
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

/** 
 * @sq / SimpleQ / new Promsie / instanceOf Promise
 * simplified `new Promise()`
 * - `returns{resolve,reject,promise}`
*/
const sq = () => {
    return (new function SimpleQ() {
        let res
        let rej

        this.promise = new Promise((resolve, reject) => {
            res = resolve
            rej = reject
        })

        this.resolve = res
        this.reject = rej
    }())
}

const validID = (id = '') => !(id || '') ? '' : (id || '').toString().toLowerCase().replace(/\s/g, '')

// @ts-ignore
const isNumber = (n) => {
    if (isBigInt(n)) return false
    else return n !== undefined && n !== null && n !== '' ? (n).__proto__ === Number.prototype : false
}

/**
 * Test provided value is a date, example: new Date()
 * @param {*} d 
 */
const isDate = (d) => {
    try {
        return (d) instanceof Date
    } catch (err) {
        return false
    }
}

const stringSize = (str = '') => str !== undefined && str !== null ? (str).__proto__ === String.prototype ? str.length : 0 : 0

/** 
 * there are 2 types of promises available javascript standard Promise
 * and the node.js `q.defer()` promise
 * - this method tests for the q.defer node.js promise version, along with sq() promise
 * - checks if its a resolvable promise
*/
const isQPromise = (defer) => {

    try {
        if (
            (defer.promise !== undefined &&
                typeof defer.resolve === 'function' &&
                typeof defer.reject === 'function' &&
                typeof defer.fulfill === 'function' &&
                typeof defer.notify === 'function'
            ) === true
        ) {
            return true
        }
    } catch (err) {
        // 
    }
    return false
}

/**
 * test is sq() is our SimpleQ promise
 * @property {*} defer 
 */
const isSQ = (defer) => {
    try {
        return defer.__proto__.constructor.name === 'SimpleQ'
    } catch (err) {
        return false
    }
}
/** 
 * check for Promise/ q.defer / and xutils promise ( sq() )
 * - checks if its a resolvable promise
*/
const isPromise = (defer) => {
    if (isQPromise(defer)) return true
    else {
        try {
            if (defer instanceof Promise) return true
            if (isSQ(defer)) return true
        } catch (err) {
            console.log('err', err)
        }
        return false
    }
}

/** 
 * - how long to wait before we exit process
 * - why use this ? If the promise never resolves or takes too long, so we can cancel it when `{maxWait}` time expires
 * @property {*} param0{defer} (required)`  resolved when process complete or called from callback on timeout
 * @property {*} param1{checkEvery}` (required) how frequently to check if promise is resolved
 * @property {*} param2{maxWait}` (required)  long to wait before execiting with cbErr
 * @property {*} param3{cbErr}` (required) called on timeout `cbErr(({error,defer,id}))` > here you can either resolve or reject the pending promise
 * @property {*} param4{message}` (optional)  defaults: `taken too long to respond` of provide your own
 * @property {*} param5{logging}` (optional)  when true will pront waiting process
 * @property {*} param6{id}` (optional) added to error callback, and to logging when enabled
 * - `returns {*} same promise provided in {defer}`,  dont need to use it, directly
*/

const cancelPromise = ({ defer = {}, checkEvery = 500, maxWait = 9500, cbErr = ({ error, defer, id }) => {}, message = 'taken too long to respond', logging = false, id }) => {

    let isFN = (el) => typeof el === 'function'
    let validPromise = isPromise(defer) || isQPromise(defer)

    if (!validPromise || !isFN(cbErr) || !maxWait) {
        onerror('[cancelPromise]', '{defer,maxWait,cbErr} must be provided')
        return Promise.reject('{defer,maxWait,cbErr} must be provided')
    }

    let exit_interval
    let every = checkEvery || 500
    maxWait = maxWait || 1

    let inx = 0
    const t = setInterval(() => {
        if (exit_interval) {
            //  if (logging) log('[cancelPromise]', 'cleared')
            return clearInterval(t)
        }

        if (inx > maxWait) {
            let args = { error: `${message}, time: ${inx}`, defer, id }

            try {
                cbErr.apply(args, [args])
            } catch (err) {
                // ups
                onerror('[cancelPromise]', err)
            }

            return clearInterval(t)
        } else {
            if (logging) {
                if (id) log('-- processing: ', id)
                else alert('-- processing ')
            }
        }
        inx = every + inx
    }, every)

    let def
    try {
        if (defer instanceof Promise) def = defer
    } catch (err) {
        // ups
    }

    try {
        let _def = (defer || {}).promise
        if (_def instanceof Promise) def = _def
    } catch (err) {
        // ups
    }

    if (def) {
        return def.then(n => {
            // will exit the interval
            exit_interval = true
            return n
        }).catch(err => {
            return err
        })
    } else {
        return Promise.reject('Supplied {defer} is not a promise')
    }
    
}

/**
 * 
 * @property {*} cbEval (optional) callback operator, continue checking when callback returns !!true
 */
const isObject = (obj, cbEval = undefined) => {
    if (isFunction(cbEval) && !callFN(cbEval)) return false
    if (typeof obj === 'function') return false
    if (isBigInt(obj)) return false
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

const uniq = (arr = []) => {
    let o = []
    o = arr.filter((el, i, all) => all.indexOf(el) === i)
    return o instanceof Array ? o : []
}

/** 
 * provide an array to shuffle
 * - `returns {Array} always returns an array`
*/
const shuffle = (arr = []) => {
    if (!isArray(arr)) return []
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const k = arr[i]
        arr[i] = arr[j]
        arr[j] = k
    }
    return arr
}

/** 
 * @selectiveArray
 * - select data from array of objects by reference
 * - go down recursively, in order of selectBy references
 * @property {*} selectBy:required`, list of uniq references, example ['a.b.c.d.e','e.f.g'], each selectBy/item targets nested object props
 * @property {*} data:required` list of objects, to target by select ref
*/
const selectiveArray = (selectBy = [], data = []) => {
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

/**
 * 
 * @property {*} cbEval (optional) callback operator, continue checking when callback returns !!true
 */
const isClass = (obj = {}, cbEval = undefined) => {
    if (isFunction(cbEval) && !callFN(cbEval)) return false
    if (!obj) return false
    if ((obj).prototype !== undefined) return true
    return false
}

/** 
 * @alias isClass
*/
const hasPrototype = isClass

/**
 * 
 * @property {*} el 
 * @property {*} cbEval (optional) callback operator, continue checking when callback returns !!true
 */
const hasProto = (el, cbEval = undefined) => {
    if (isFunction(cbEval) && !callFN(cbEval)) return false
    try {
        return el.__proto__ !== undefined
    } catch (err) {
        return false
    }
}

/**
 * Check is pattern is an expression of RegExp
 */
const isRegExp = (expression = (/\\/)) => {
    try {
        return expression instanceof RegExp
    } catch (err) {
        return false
    }
}

/**
 *  testing (new class{})
 * @property {*} cbEval (optional) callback operator, continue checking when callback returns !!true
 */
const isInstance = (obj = {}, cbEval = undefined) => {
    if (isFunction(cbEval) && !callFN(cbEval)) return false
    if (!obj) return false
    if (isArray(obj)) return false
    if (obj.__proto__ && !isClass(obj)) {
        try {
            return obj.__proto__ instanceof Object
        } catch (err) {
            return false
        }
    }
    return false
}

const objectSize = (obj = {}) => {
    if (!obj || !isNaN(+(obj))) return 0
    if (isInstance(obj)) return Object.keys(obj).length
    return ((Object.prototype === (obj).__proto__) || Error.prototype === (obj).__proto__) ? Object.keys(obj).length : 0
}

const isFalsy = (el = null) => {
    if (el === undefined) return true
    if (el === false && typeof el === 'boolean') return true
    if (el === null) return true
    if (String.prototype === (el).__proto__) return el.length < 1
    if (Array.prototype === (el).__proto__) return (el || []).length === 0
    if (Promise.prototype === (el || {}).__proto__) return false
    if (typeof el === 'function') return false
    if ((Object.prototype === (el).__proto__) || isInstance(el)) return Object.keys(el).length === 0
    if ((Error.prototype === (el).__proto__)) return false
    if (el !== undefined && (el).__proto__ === Number.prototype) {
        if (isNaN(el)) return true
        else return el <= 0
    }

    if ((+(el) > 0) === false) return true
    if (el) return false
    else return false
}

// @ts-ignore

/**
 * 
 * @property {*} str 
 * @property cbEval (optional) callback operator, continue checking when callback returns !!true
 */
const isString = (str = '', cbEval = undefined) => {
    if (isFunction(cbEval) && !callFN(cbEval)) return false
    if (str === undefined) return false
    if (str === null) return false
    if (typeof str === 'boolean') return false
    return str === '' ? true : String.prototype === (str).__proto__
}

const copyBy = (obj = {}, refs = []) => {
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
 * Return data in pretty json format 
 * - `returns JSON.stringify(o , null, 2)`
 */
const asJson = (o) => {
    try {
        return JSON.stringify(o, null, 2)
    } catch (err) {
        return `[asJson], ` + err.toString()
    }
}

/** 
 * - for complex arrays of objects: [{...},{...}] we can use copy deep
 * - will copy each item in array seperatly
 * - will check for Object>object and make copy
 * @return same type copy  
*/
const copyDeep = (data) => {

    if (isArray(data)) {
        return data.map(n => copy(n))
    }

    if (isObject(data)) {
        return Object.entries(data).reduce((n, [k, val]) => {
            if (isObject(val)) n[k] = { ...copy(val) }
            else n[k] = val
            return n
        }, {})
    } else {
        try {
            return JSON.parse(JSON.stringify(data))
        } catch (err) {
            return typeCheck(data).primitiveValue
        }
    }
}

const delay = (time = 100) => {
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
 * @property cbEval (optional) callback operator, continue checking when callback returns !!true
 * - `returns true/false` when at least 1 length matched
*/
const someKeyMatch = (object = {}, source = {}, cbEval = undefined) => {
    if (isFunction(cbEval) && !callFN(cbEval)) return false
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
 * @property cbEval (optional) callback operator, continue checking when callback returns !!true
 * - `returns true/false` when all lengths matched
*/
const exactKeyMatch = (object = {}, source = {}, cbEval = undefined) => {
    if (isFunction(cbEval) && !callFN(cbEval)) return false
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
 * @property {*} arr array required
 * - `returns new array with only [<true?>] values`
 */
const trueVal = (arr = []) => {
    // provided must be array
    if (!(!arr ? false : Array.prototype === (arr).__proto__)) return []
    return [].concat(arr).filter((itm, inx) => isFalsy(itm) !== true)
}

/**
 * @trueValDeep
 * - you have an array with false values: [0,null,false,[{}],undefined, -1,'',true,1, 'hello',[[]]], will only return any that are true entities, keeping same order: [true,1,'hello'], empty entities are omitted.
 * - similar to `withVal`, except it checks 1 depth> if entities them self are empty: [[]],[{}]
 * @property {*} arr array required
 * - `returns new array with only [<true?>] values`
 */
const trueValDeep = (arr = []) => {
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
 * @property {*} obj required
 * - `returns object with props {}` 
 */
const trueProp = (obj = {}) => {
    if (!(!obj ? false : Object.prototype === (obj).__proto__)) return 0

    return Object.assign({}, Object.entries(obj).reduce((n, [key, val], inx) => {
        if (!isFalsy(val)) n[key] = val
        return n
    }, {}))
}

/** 
 * @resolver 
 * - this method will test `fn()` until timeout or when data/ not  undefined becomes available
 * @property {*} fn:function, callable method with data to return
 * @property {*} timeout:Number, specify max time to wait for data
 * @property {*} testEvery:Number, how ofter to check for data availability
 * - `returns Promise/always` resolves, and error, it will wrap it in {error} , if no data returns Promise.resolve(undefined), 
*/
const resolver = (fn = () => {}, timeout = 5000, testEvery = 50) => {
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
const flatten = (arr = []) => {
    if (!isArray(arr)) return []
    return [].concat(...arr)
}

/** 
 * flatten all array levels, example :[[['hello']]] > ['hello']
*/
const flattenDeep = (arr = []) => {
    let o = []
    if (!isArray(arr)) return o
    function test(arr, d = 1) {
        return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? test(val, d - 1) : val), [])
            : arr.slice()
    }
    try {
        o = test(arr, Infinity) || []
        if (o instanceof Array) return o
        else return []
    } catch (err) {
        return []
    }
    
}

/** 
  * @chunks
  * - return array in batch specified by size
  * @property {*} arr required
  * @property {*} size required larger then 0
  * - `returns arr[]`
 */
const chunks = (arr = [], size = 0) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    )

/** 
 * - duplicate original item x/times
 * @property {*} item any value
 * @property {number} index how many times to duplicate, when 0 then empty array is returned
 * - `returns {array} [...]`
*/
const dupes = (item, index = 0) => {
    const dups = []
    let n = parseInt(index)
    while (n > 0) {
        n--
        dups.push(item)
    }
    return dups
}

/**
 * Return array with uniq objects prop[val]!=prop[val] in the order provided
 * Returns all other objects, and items not by propName
 * Returns all other items that are not an object 
 * @property {*} arr 
 * @property {*} propName 
 * - `returns {*} [{},...]`
 */
const uniqBy = (arr = [], propName = '') => {
    const stored = {}
    const n = []
    if (!propName) return []
    if (!(arr || []).length) return []

    for (let inx = 0; inx < arr.length; inx++) {
        let item = arr[inx]

        if (!isObject(item)) {
            n.push(item)

            continue
        }

        if (!item[propName]) {
            n.push(item)
            continue
        }

        let exists = Object.entries(stored).filter(([k], i) => item[propName] === stored[k]).length
        if (exists) continue

        if (item[propName] !== stored[propName + `:${inx}`]) {
            stored[propName + `:${inx}`] = item[propName]
            n.push(item)
        }

    }

    return n
}

/**
 * Provide mix array of objects and values
 * grab array items that include specific propName 
 * @property {*} arr[] mixed array: [{a:true},...]
 * @property {*} withProp example: withProp:"a"
 * - `returns []` only array items that include specific prop 
* **/
const arrayWith = (arr = [], withProp = '') => {
    if (isArray(arr)) return []
    let objWith = (o) => {
        if (isObject(o)) {
            if (Object.keys(o).indexOf(withProp) !== -1) return o
            else return undefined
        } else return undefined
    }

    try {
        let o = arr.map(n => objWith(n)).filter(n => !!n)
        return o instanceof Array ? o : []
    } catch (err) {
        return []
    }

}

/**
 * Provide mixed array including any objects and values
 * Exclude all prop/values from object that matches 
 * @property {*} arr[] mixed array with objects to exclude by propName
 * @property {*} excludes[] property names to match each object by
 * - `returns {}`  mixed array with any other types as per input, in same order
 **/
const exFromArray = (arr = [], excludes = []) => {
    let o = []
    try {
        if (!(arr instanceof Array)) return o
    } catch (err) {
        return []
    }
    excludes = [].concat(excludes)

    if (!excludes.length) return arr

    const excludeFrom = (obj = {}, excludes = []) => {
        if (!isObject(obj)) return obj

        const d = Object.entries(obj).reduce((n, [k, val]) => {
            if (excludes.indexOf(k) === -1) n[k] = val
            return n
        }, {})
        if (isFalsy(d)) return undefined
        else return d
    }

    try {
        let o = arr.map(n => excludeFrom(n, excludes)) // .filter(n => n !== undefined)
        return o instanceof Array ? o : []
    } catch (err) {
        return []
    }

}

/**
 * - Filter items from array by picks[] conditions 
 * @property {*} arr array of any 
 * @property {*} picks[] each item in picks tests item in the array for all passing conditions, example `[{a:1,b:2},{g:5,o:0},Number,Boolean, true,1, Array, [1,2,3],Object, Function, Error],'hello world']` and returns those that match by type, or eaqul value! Empty types and strings, are excluded, example : `[{},[],'',NaN]` (in picks[] only)
 * 
 * - does not support deep selections from picks, only 1 level deep, but you can use object types, example: picks:[{data:Array},{data:Object}]
 * - `returns [...]` only items that passed each pick condition in same order
 */
const pickFromArray = (arr = [], picks = []) => {
    let o = []
    try {
        if (!(arr instanceof Array)) return o
    } catch (err) {
        return []
    }

    if (!isArray(picks)) picks = [].concat(picks)
    if (!picks.length) return arr
    let allowedPicks = [undefined, null, false]
    picks = picks.filter(n => !isFalsy(n) || allowedPicks.filter(nn => nn === n || (isNumber(n) && !isNaN(n)).length))

    if (!picks.length) return arr

    /**
     * when checking primitives we test by name and to lowercase
     * @param {*} item 
     * @param {*} pick 
     */
    let isInstanceByName = (item, pick) => {

        // do exect array and Object checks

        if (isArray(item)) {
            if (isFunction(pick)) {
                if (pick.name.toLowerCase() === 'object') return false
                if (pick.name.toLowerCase() === 'array') return true
            }
        }

        if (isObject(item)) {

            if (isFunction(pick)) {
                if (pick.name.toLowerCase() === 'array') return false
                if (pick.name.toLowerCase() === 'object') return true
            }
        }

        try {
            // eslint-disable-next-line valid-typeof
            return (pick.name || '').toLowerCase() === typeof item

        } catch (err) {
            return undefined
        }
    }

    /**
     * evaluate each item on all picks 
     * 
     * @param {*} item 
     */
    let evalItem = (item) => {

        let selected

        for (let inx = 0; inx < picks.length; inx++) {
            let pick = picks[inx]

            if (isObject(pick) && isObject(item)) {
                // all entries on pick must match that on each item
                let pEntries = Object.entries(pick)
                let pass = pEntries.filter(([k, val]) => {

                    let ok = item[k] === val
                    if (ok) return true
                    else if (item[k] !== undefined) {
                        return isInstanceByName(item[k], val)
                    }
                })
                // all picks must match the requirement and object can have more props then pic has
                pass = pass.length === pEntries.length && Object.entries(item).length >= pass.length

                if (pass && objectSize(item) >= objectSize(pick)) {
                    selected = true
                    break
                }
            }

            // array === array (also matching contents of each pick)
            // each pick contents that can be matched =[number, boolean,string, primitiveValue]
            if (isArray(pick) && isArray(item)) {
                let pass = pick.filter(n => item.filter(nn => nn === n || isInstanceByName(nn, n)).length)

                // all picks must match the requirement and array can have more items then pick has
                pass = pass.length === pick.length && item.length >= pass.length

                if (pass) {
                    selected = true
                    break
                }

            } else if (pick === item) {
                selected = true
                break
            } else if (
                isNumber(item) ||
                isBoolean(item) ||
                isString(item) ||
                isArray(item) ||
                isObject(item) ||
                isFunction(item)
            ) {

                if (isInstanceByName(item, pick)) {
                    selected = true
                    break
                }

            } else if (isInstanceByName(item, pick)) {
                selected = true
                break
            }
        }

        return selected
    }
    try {
        o = arr.reduce((n, el) => {
            if (evalItem(el)) n.push(el)
            return n
        }, [])
        if (o instanceof Array) return o
        else return []
    } catch (err) {
        return []
    }
  
}

/**
 * @dispatcher
 * Lightweight Event Dispatcher, allowing you dispatch anywhere in the code, very handy in callback hell situations, deep promises, or any other complicated computations. Integrated with callback memory so you dont have to subscribe first to get your data.
 *
 * @Why 
 * - Call next before subscribe
 * - Avoid ugly callback > callback > callback hell!
 * - Avoid messy Promises
 * - Prefer clean, readable code hierarchy
 * - Easy to implement

 * example : 
 `  
    const ds = dispatcher()

    ds.next({data:'hello world'})
 
    ds.subscribe((data, uid, index) => {
        console.log('on subscribe', data, uid, index)
        ds.delete() // delete self
    }).onComplete(uid=>{

    })
     ds.next({data:'hello again'})
 `
 * @property {*} uid (optional) will be generated if not supplied
 * @property {*} debug (optional) for extra debug messages
 */
const dispatcher = (uid, debug = false) => {
    return (new function dispatcher(uid, debug) {

        const plugin = `[dispatcher]`
        this.uid = ((uid || '').toString() || new Date().getTime()).toString() // id generated if not provided
        this.debug = debug
        this.cbQueue = {}
        this.dispatchInstance = {}
        this._isActive = null
        this._onComplete_cb = null
        this.index = 0 // count callbacks
        this.data = null // dynamic next data becomes available when subscribe event is received
        // shorthand aliases

        /** 
         * @onComplete
         * when subscribe event is deleted complete even callback can be called
        */
        this.onComplete = (cb) => {
            this._onComplete_cb = cb
            return this
        }

        /** 
         * @Dispatch
         * initialize the dispatcher
        */
        this.initListener = () => {
            this.Dispatch()
            this._isActive = true
            return this
        }

        /**
         * @next
         * send data to `subscribe` callback
         * @param {*} data any
         */
        this.next = (data = null) => {
            if (this._isActive !== false) this.initListener() // in case next is called above subscribe, we need to make sure it is initiated
            if (this.dispatchInstance[this.uid]) this.dispatchInstance[this.uid].next(data)
            else {
                if (this.debug) log({ message: `${plugin} for uid not available`, uid: this.uid })
            }
            return this
        }

        /**
         * @Dispatch
         * master listener, sends all event callbacks to `subscribe`
         */
        this.Dispatch = () => {
            if (this.dispatchInstance[this.uid]) return this
            const self = this
            const D = function () {
                this.uid = self.uid
                this.data = null

                this.next = (data) => {
                    if ((data || {}).type !== 'cb') this.data = data
                    /**
                         * @next
                         * acts as a reverse callback, it sends back the `cb` from `subscribe`
                         */
                    if ((data || {}).type === 'cb') {
                        if (typeof data.cb === 'function') {
                            // when calling next before subscribe is initiated
                            // collect cb from .next
                            if (!self.cbQueue[self.uid]) self.cbQueue[self.uid] = data.cb
                            if (this.data) {
                                self.index++
                                self.data = this.data
                                data.cb.call(self, this.data, self.uid, self.index)

                            }
                        }

                        return
                    }

                    if (this.data) {
                        if (typeof self.cbQueue[self.uid] === 'function') {
                            self.index++
                            self.data = this.data
                            self.cbQueue[self.uid].call(self, this.data, self.uid, self.index)

                        }
                    } else {
                        if (self.debug) warn(`${plugin} no callback data`)
                    }
                }
            }

            if (!this.dispatchInstance[this.uid]) this.dispatchInstance[this.uid] = new D()
            return this
        }

        /** 
         * @isActive
         * check if current Dispatcher is still valid and active
        */
        this.isActive = () => {
            return this._isActive
        }

        /** 
         * @del
         * delete dispatcher
        */
        this.del = () => {
            delete this.cbQueue[this.uid]
            delete this.dispatchInstance[this.uid]
            this._isActive = false
            if (typeof this._onComplete_cb === 'function') this._onComplete_cb(this.uid)
            return this
        }

        /**
         * @subscribe
         * wait for callbacks forwarded from Dispatch and returned in callback of this method
         * - Dispatch must be set initially before you call `subscribe`
         * @param {*} cb required
         */
        this.subscribe = (cb) => {
            const isFN = typeof cb === 'function'
            if (!isFN) {
                if (this.debug) warn(`${plugin}[subscribe] cb must be set`)
                return this
            }
            if (!this.dispatchInstance[this.uid]) {
                // this means subscribe was executed prior to `Dispatch`, because it has forward with next
                // it will get executed anyway
                this.Dispatch()
            }
            if (this.dispatchInstance[this.uid]) this.dispatchInstance[this.uid].next({ type: 'cb', cb })
            return this
        }

        /** 
        * @alias initListener
        */
        this.init = this.initListener

        /** 
         * @alias subscribe
        */
        this.sub = this.subscribe

        /** 
        * @alias next
        */
        this.emit = this.next

        /** 
        * @alias del
        */
        this.delete = this.del

        /** 
         * @alias del
        */
        this.unsubscribe = this.del

        // end

    }(uid, debug))
}

/**
 * @withHoc
 * - High order caller, concept taken from react HOC.
 * - Promise support, we can provide deferred callback, example: `Promise.resolve(()=>{}) OR Promise.reject(()=>{}) `
 *  * if rejectable error is not callable, message is: `DEFERRED_NOT_CALLABLE`
 * @property {*} item callable function
 * @property {*} args (optional) any number of arguments (,,,,) after the callable item()
 * - `returns callable function withHoc(...args)` OR deferred if a promise
 */
const withHoc = (item = () => { }, ...args) => {
    let extraArgs = args
    const hoc = (...args) => {

        let argsFN = () => {
            let _args
            if (extraArgs) _args = [].concat(args, extraArgs)
            else _args = args
            return _args
        }

        if (item instanceof Function) {

            try {

                return item(...argsFN())
            } catch (err) {
                onerror('[HOC]', err)
            }

        } else if (isPromise(item)) {

            // if provided a defered callable item we can wait and then call if
            // example expecting Promise.resolve(()=>{}) OR  Promise.reject(()=>{})
            let fn = () => {

                let asPromise = () => {
                    if (item.promise) return item.promise
                    else return item
                }

                return asPromise().then(defItem => {
                    if (isFunction(defItem)) return defItem(...argsFN())
                    else return Promise.reject('DEFERRED_NOT_CALLABLE')
                }, err => {
                    // should alwasy return a function of constant message
                    if (isFunction(err)) return Promise.reject(err(...argsFN()))
                    else return Promise.reject('DEFERRED_NOT_CALLABLE')
                })

            }
            // rejectable call
            return fn()

        } else {
            onerror('[HOC]', 'item() must be callable function')
        }

    }
    return hoc
}

/**
 *  NOTE: THIS METHOD ONLY WORK FOR COMMON.JS modules, and not for browser
 * - Modified require does not throw when second arg ref >ERR_NO_THROW is provided
 * - It does not modify the global require 
 * - Doesnt provide Intellisense :((
 * @memberof module.require
 * @param {*} path require(>path<)
 * @param {*} ref // ERR_NO_THROW and it wond throw an error
 * - `returns desirec output`
 */
function xrequire(path = '', ref = 'ERR_NO_THROW') {
    if (isWindow()) return undefined
    const Mod = function () {}

    Mod.prototype = Object.create(module.constructor.prototype)
    Mod.prototype.constructor = module.constructor

    Mod.prototype.require = function (path, ref) {
        const self = this
        try {
            return self.constructor._load(path, self)
        } catch (err) {
            // NOTE magic if the ref has match instead of throw we return undefined
            if (ref === 'ERR_NO_THROW') return undefined
            // if module not found, we have nothing to do, simply throw it back.
            if (err.code === 'MODULE_NOT_FOUND') {
                throw err
            }
        }
    }

    if (!(Mod.prototype.require instanceof require.constructor)) return undefined
    else return Mod.prototype.require(path, ref)
}

/**
 * - Returns Object with truethFull values
 * - Supports only 1 level nesting
 */
const truthFul = (obj = {}) => {
    if (!isObject(obj)) return {}
    return Object.entries(obj).reduce((n, [k, v]) => {
        if (v !== undefined) n[k] = v
        return n
    }, {})
}

/**
 * Test accurance of match[] items in a string
 * @property {*} str string to match against
 * @property {*} patterns[] can provide array of RegExp patterns to test against
 * - `returns total by index of patterns[] array`
 */
const inIndex = (str = '', patterns = []) => {

    let o = 0
    if (!isArray(patterns)) return o
    if (!patterns.length) return o
    if (typeof str !== 'string') return o
    if (!str) return o

    let regx = (patt, s, inx) => {
        try {
            return new RegExp(patt).test(s)
        } catch (err) {
            onerror('[inIndex]', `wrong pattern/expression at index:${inx}`)
            return false
        }
    }
    o = patterns.filter((n, inx) => regx(n, str, inx)).length 
    return o
}

/**
 * Match string value by expression
 * @property {*} str string to match
 * @property {*} expression valid expression /xyz/
 */
const matched = (str = '', expression = /\\/) => {

    let o = false
    if (!isString(str)) return o

    if (!isRegExp(expression)) return o
    if (typeof str !== 'string') return o
    if (!str) return o

    let regx = (patt, s) => {
        try {
            return new RegExp(patt).test(s)
        } catch (err) {
            onerror('[matched]', err.toString())
            return false
        }
    }
    o = regx(expression, str)
    return o
}

export { disableLogging }
export { resetLogging }
export { loggerSetting }
export { stack }
export { errorTrace }
export { loop }
export { isFalse }
export { isTrue }
export { isBoolean }
export { isNull }
export { isUndefined }
export { isEmpty }
export { head }
export { last }
export { timer }
export { interval }
export { sq }
export { validID }
export { isBigInt }
export { isNumber }
export { stringSize }
export { cancelPromise }
export { shuffle }
export { selectiveArray }
export { hasPrototype }
export { hasProto }
export { objectSize }
export { isString }
export { isFunction }
export { copyBy }
export { copyDeep }
export { delay }
export { someKeyMatch }
export { exactKeyMatch }
export { trueVal }
export { trueValDeep }
export { trueProp }
export { resolver }
export { flatten }
export { flattenDeep }
export { chunks }
export { dupes }
export { uniqBy }
export { arrayWith }
export { exFromArray }
export { copy }
export { uniq }
export { isPromise }
export { isQPromise }
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
export { pickFromArray }
export { dispatcher }
export { isSQ }
export { withHoc }
export { isDate }
export { xrequire }
export { asJson }
export { truthFul }
export { inIndex }
export { isRegExp }
export { matched }
/**
 * @prop {*} l any data to print
 * @prop {*} err display as error if set to true
 */
// @ts-ignore
export const notify = function (logData = null, err = null) {
    throw ('no notify support for x-utils-es, use: x-utils')
}
