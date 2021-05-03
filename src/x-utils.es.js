/**
 * @module x-utils
 * @license CC-BY-SA-4.0
 * {@link https://eaglex.net Eaglex}
 * @description Simple javascript, lodash alternative library, for support contact me at eaglex.net
 * @author Developed by Anon
 * @version ^2.x.x
 */
/* eslint-disable no-proto */
// eslint-disable-next-line semi
"use strict";

/* istanbul ignore next */ 
const isWindow = () => {
    try {
        if ((process.env || {}).NODE_ENV === 'test') return false

        /* istanbul ignore next */ 
        if (window) return true
    } catch (err) {
        return false
    }   
}

/** 
 * 
 * If you used logging in your application from the moment this method was called all logging will be disabled
 * - it affects: log, warn,error, onerror, errorTrace, stack, attention, alert, debug
 * @returns {true|false} 
*/
const disableLogging = () => {
    try {
        /* istanbul ignore next */ 
        if (isWindow()) {
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
        /* istanbul ignore next */ 
        return false
    }
   
}

/** 
 * If you used logging in your application from the moment this method was called all logging will be enabled
 * - it affects: log, warn,error, onerror, errorTrace, stack, attention, alert, debug
 * @returns {true|false} 
 * 
 * @example
 * resetLogging() // will reset any previously set loggerSetting(...) options
*/
const resetLogging = () => {
    try {
        /* istanbul ignore next */ 
        if (isWindow()) {
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
        /* istanbul ignore next */ 
        return false
    }
}

/** 
 * Allow enabling and disabling: log/warn/error/onerror/attention/debug/alert consoles
 * @param {string} logType logger name
 * @param {string} logMode off/on
 * @returns {true|false} 
 * 
 * @example
 * loggerSetting('log','off') // future calls to log() will be disabled
 * // this applies to all logger methods: 
*/
const loggerSetting = (logType = 'log', logMode = 'off') => {

    let availTypes = ['log', 'warn', 'onerror', 'error', 'alert', 'attention', 'debug', 'stack', 'errorTrace']
    let availModes = ['on', 'off']

    if (!availTypes.includes(logType) || !logType) return false
    if (!availModes.includes(logMode) || !logMode) return false
    if (logType === 'onerror') logType = 'error'

    try {
        /* istanbul ignore next */ 
        if (isWindow()) {
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
        /* istanbul ignore next */ 
        return false
    }
   
}

/** 
 * 
 * Internal method
 * check if any log,warn,error,onerror are currently disabled
 * @param logType
*/
const checkLoggerSetting = (logType = '') => {
   
    try {
        /* istanbul ignore next */ 
        if (isWindow()) {
            if (!window.xUtilsConfig) window.xUtilsConfig = {}
            //  on browser
            if (window.xUtilsConfig) {
                if (window.xUtilsConfig.logging === 'off') return 'off'
                else return (window.xUtilsConfig[logType] ? window.xUtilsConfig[logType] : 'on').toString()
            } else {
                return 'on'
            }
          
        }
    } catch (err) {
        //
    }

    try {
        if (!global.xUtilsConfig) global.xUtilsConfig = {}
        // in node
        if (global.xUtilsConfig) {
            if (global.xUtilsConfig.logging === 'off') return 'off'
            else return (global.xUtilsConfig[logType] ? global.xUtilsConfig[logType] : 'on').toString()
        } else {
            return 'on'
        }

    } catch (err) {
        //
    }
    return 'on'
}

/** 
 * When xUtilsConfig wasn't set, then we are on, else if ..xUtilsConfig==='off', do not print logs
 * @effects `log, warn,error, onerror, errorTrace, stack, debug, alert, attention`
 * @returns {true|false}
 */
const loggingON = () => {
    try {
        /* istanbul ignore next */ 
        if (isWindow()) return (window.xUtilsConfig || {}).logging === 'on' || (window.xUtilsConfig || {}).logging === undefined
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
 * @ignore
 * @param {string} type log,error,warn,debug
*/
/* istanbul ignore next */ 
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

/**
 * Implements console.log with [log] prefix
 * @borrows console.log
 * @param  {...any} args 
 */
const log = function (...args) {
    if (!loggingON()) return
    if (checkLoggerSetting('log') === 'off') return

    return logConstract('log', args)
}

/** 
 * 
 * Implements console.log with [debug] prefix
 * - produces green color output
 * @param  {...any} args 
*/
const debug = function (...args) {
    if (!loggingON()) return
    if (checkLoggerSetting('debug') === 'off') return

    return logConstract('debug', args)
}

/** 
 * Implements console.log with [warn] prefix
 * - produces bright color output
 * @param  {...any} args 
*/
const warn = function (...args) {
    if (!loggingON()) return
    if (checkLoggerSetting('warn') === 'off') return

    return logConstract('warn', args)
}

/** 
 * Implements console.log with [alert] prefix
 * - produces yellow color output
 * @param  {...any} args 
*/
const alert = function (...args) {
    if (!loggingON()) return
    if (checkLoggerSetting('alert') === 'off') return

    return logConstract('alert', args)
}

/** 
 * Implements console.log with [attention] prefix
 * - produces blue color output
 * @param  {...any} args 
*/
const attention = function (...args) {
    if (!loggingON()) return
    if (checkLoggerSetting('attention') === 'off') return

    return logConstract('attention', args)
}

/** 
 * Implements console.log with [error] prefix
 * - produces red color output
 * @param  {...any} args 
*/
const onerror = function (...args) {
    if (!loggingON()) return
    if (checkLoggerSetting('error') === 'off' || checkLoggerSetting('onerror') === 'off') return

    if (!args.length) args[0] = ''
    let allData = args.filter(n => typeof n === 'string' || n === undefined).length === 0
    let format = allData ? '\%o' : ''

    try {
        /* istanbul ignore next */ 
        if (isWindow()) {
            args = [].concat(`\x1b[31m[error]\x1b[0m\x1b[31m${format} `, args, '\x1b[0m')
            console.error.apply(null, args)
            return
        }
    } catch (err) {
        // using node
    }
    
    args = [].concat(`\x1b[41m[error]\x1b[0m\x1b[31m${format} `, args, '\x1b[0m')
    console.error.apply(null, args)
}

/** 
 * Good for stack tracing
 * - produces [STACK TRACE]: ...
 * @param {any} data 
 * @param {boolean} asArray if set, will output stack trace as array, otherwise a string
*/
const stack = (data, asArray = false) => {
    if (!loggingON()) return
    if (checkLoggerSetting('stack') === 'off') return
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
 *  Console.error stack trace
 * - produces [ERROR]: ...
 * @param {any} data optional
 * @param {boolean} asArray if set, will output stack trace as array, otherwise a string
 * 
 * @example
 * errorTrace('error data', true) // returns [[ERROR],... including full stack trace
 */
const errorTrace = (data, asArray = false) => {
    if (!loggingON()) return
    if (checkLoggerSetting('errorTrace') === 'off') return
    let stackList = new Error(JSON.stringify(data)).stack.split('(')
    stackList.splice(1, 1)
    let errHead = stackList[0].split(/\n/)[0].replace('Error', '[ERROR]')
    stackList.splice(0, 1)
    stackList.unshift(errHead)
    if (asArray) console.error(stackList)
    else console.error.apply(null, stackList)
    return undefined
}

/**
 * @alias onerror
 * 
 */
const error = onerror

/**
 * Test provided item is a function
 * @param {any} el 
 * @returns {true|false}
 * 
 * @example
 * isFunction(()=>{}) // true 
 * isFunction(Function) // true 
 */
const isFunction = (el = undefined) => typeof el === 'function'

/**
 * Test provided item is BigInt 
 * @param {any} n 
 * @returns {true|false}
 * 
 * @example 
 * isBigInt( BigInt(Number.MAX_SAFE_INTEGER) ) // true
 * isBigInt( 1n ) // true
 * isBigInt( (2n ** 54n) ) // true
 * 
 */
const isBigInt = (n) => typeof (n) === 'bigint'

/** 
 * For loop initiating callback on each iteration
 * - When cb is returned this data is pushed to array
 * - break loop when returning {break:true} inside callback
 * @param {number} size
 * @param {(index:number)=>any} cb((inx)=>) callback issued at end of each loop que
 * @returns {array} whatever was returned inside the loop
 * 
 * @example
 * loop(5,inx=>10+inx) // [10, 11, 12, 13, 14]
 * loop(3,inx=>{
 *   if(inx===3) return {break:true}
 *   return {[inx]:inx+1}
 * }) //  [ { '0': 1 }, { '1': 2 }, { '2': 3 } ]
*/
const loop = function (size = 0, cb = (index = 0) => {}) {
    let isFN = typeof cb === 'function'
    let isNum = typeof size === 'number'
    if (!isFN || !isNum) return []
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

        d.push(r) // always grub any data       
    }

    return d
}

/** 
 * Evaluate provided data is an actual Date
 * @param {Date} dt 
 * @param {function|undefined} cbEval (optional) callback operator, continue checking when callback returns !!true
 * @returns {true|false}
 * 
 * @example
 * validDate(new Date('')) // false
 * validDate(new Date()) // true
 * validDate( new Date(), ()=>false ) // false callback !!false
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

/**
 * Check item is an array
 * @param {any} arr
 * @param {function | undefined} cbEval (optional) callback operator, continue checking when callback returns !!true
 * @returns {true|false}
 * 
 * @example
 * isArray([]) // true
 * isArray({}) // false
 * isArray(new Array()) // true
 * isArray(new Array(), ()=>[1,2].length===1) // false, because callback return !!false
 * isArray({}, ()=>true) // false // not array
 */
const isArray = (arr = undefined, cbEval = undefined) => {
    if (isFunction(cbEval) && !callFN(cbEval)) return false
    if (isBigInt(arr)) return false
    else return !arr ? false : Array.prototype === (arr).__proto__
}

/**
 * Test if an item is an Array and check the size
 * @param {array} arr 
 * @returns {number}
 * 
 * @example
 * arraySize([1,2,3]) // 3
 * arraySize({a:1}) // 0
 */
const arraySize = (arr = undefined) => {
    let inx = 0
    if (!isArray(arr)) return inx
    inx = arr.length
    return inx
}

/**
 * Evaluate type of element and check if its falsy
 * @param {any} el
 * @param {boolean} standard `standard==true` > return javascript standard types, `standard==false` > return user friendly definition types:`[date,NaN,promise,array,...typeof]`
 * @returns {object} `{ "type":date,NaN,promise,instance,prototype,array,...typeof, value: number, primitiveValue }`
 * 
 * @example
 * typeCheck({}) // {type:'object', value:0, primitiveValue: Object() }
 * typeCheck({a:1,b:2}) // {type:'object', value:2, primitiveValue: Object() }
 * typeCheck([2,3],false) // {type:'array', value:2, primitiveValue: Array() }
 * typeCheck(Date,false) // {type:'date', value:1, primitiveValue: Date() }
 * typeCheck(2) // {type:'number', value:2, primitiveValue: Number() }
 * typeCheck(false) // {type:'boolean', value:0, primitiveValue: Boolean() }
 * typeCheck(true) // {type:'boolean', value:1, primitiveValue: Boolean() }
 * typeCheck(null,false) // {type:'null', value:0, primitiveValue: Object() }
 * typeCheck(null) // {type:'object', value:0, primitiveValue: Object() }
 * typeCheck(undefined) // {type:'undefined', value:0, primitiveValue: undefined }
 * typeCheck(function () { }) // {type:'function', value:1, primitiveValue: Function }
 * typeCheck(Promise.resolve(),false) // {type:'promise', value:1, primitiveValue: Function }
 * typeCheck(Promise.resolve()) // {type:'object', value:1, primitiveValue: Function }
 * typeCheck(BigInt(1)) // { type: 'bigint', value: 1, primitiveValue: 0n }
 * typeCheck( new Error()) // { type: 'object', value: 0, primitiveValue: Error() }
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
        /* istanbul ignore next */ 
        if (typeof el === 'symbol') return { "type": ofType(), value: 0, primitiveValue: Symbol('') }

        if (el === undefined) return { "type": ofType(), value: 0, primitiveValue: undefined }

        if (typeof el === 'boolean') return { "type": ofType(), value: +(el), primitiveValue: Boolean() }
        
        /* istanbul ignore next */ 
        if (typeof el === 'bigint' && typeof Object(el) === 'object') return { "type": ofType(), value: 1, primitiveValue: BigInt('') } // eslint-disable-line no-undef

        if (el === null) return { "type": ofType('null'), value: 0, primitiveValue: Object() }
        /* istanbul ignore next */ 
        if (el.__proto__ === Date.prototype || asPrototype(Date)) return { "type": ofType('date'), value: 1, primitiveValue: new Date() }

        if (String.prototype === (el).__proto__) return { 'type': ofType(), value: el.length, primitiveValue: String() }

        if (Array.prototype === (el).__proto__ || asPrototype(Array)) return { "type": ofType('array'), value: (el || []).length, primitiveValue: Array() } // eslint-disable-line no-array-constructor

        if (Promise.prototype === (el || '').__proto__ || asPrototype(Promise)) return { type: ofType('promise'), value: 1, primitiveValue: Function }

        if (Function.prototype === (el).__proto__ || asPrototype(Function)) return { type: ofType(), value: 1, primitiveValue: Function }

        if ((Object.prototype === (el).__proto__) || asPrototype(Object)) return { "type": ofType(), value: Object.keys(el).length, primitiveValue: Object() }

        if ((Error.prototype === (el).__proto__) || asPrototype(Error)) return { "type": ofType('error'), value: Object.keys(el).length, primitiveValue: Error() }

        /* istanbul ignore next */ 
        if ((el).__proto__ === Number.prototype || asPrototype(Number)) {
            if (isNaN(el)) return { "type": ofType('NaN'), value: 0, primitiveValue: Number() }
            else return { "type": ofType(), value: el, primitiveValue: Number() }

            // Unary plus operator
            /* istanbul ignore next */ 
        } else if ((+(el) >= 0) === false) return { 'type': typeof el, value: +(el), primitiveValue: undefined }
        else return { 'type': typeof el, value: 0, primitiveValue: undefined }
    } catch (err) {
        /* istanbul ignore next */ 
        error(err)
        return {}
    }
}

/**
 * Check item is an error object
 * @param {any} el 
 * @returns {true|false}
 * 
 * @example
 * isError(Error()) // true
 * isError(new Error()) // true
 * isError(true) // false
 */
const isError = (el) => {
    return (Error.prototype === (el || '').__proto__)
}

/** 
 * Check if an item is less then 1, false, null or undefined
 * @param {any} el number/boolean
 * @returns {true|false}
 * 
 * @example
 * isFalse(undefined) // false
 * isFalse(5) // false
 * isFalse(0) // true
 * isFalse(-1) // true
 * isFalse(true) // false
 * isFalse(false) // true
 * isFalse({}) // false
 * isFalse( new Boolean(false) ) // true
 * 
*/
const isFalse = (el) => {
    if (el === null) return true
    if (typeof el === 'undefined') return true
    if (typeof el === 'number' && el < 1) return true
    if (typeof el === 'boolean' && el === false) return true
    try {
        if (el instanceof Boolean) {
            return el.valueOf() === false
        }
    } catch (err) {
        //
    }

    return false
}

/** 
 * Check if an item is gth>0, true, basically the opposite of isFalse()
 * @param {any} el number/boolean
 * @returns {true|false}
 * 
 * @example
 * isTrue(undefined) // false
 * isTrue(5) // true
 * isTrue(0) // false
 * isTrue(-1) // false
 * isTrue(true) // true
 * isTrue(false) // false
 * isTrue([]) // false
 * isTrue( new Boolean(true) ) // true
 * 
*/
const isTrue = (el) => {
    if (el === null) return false
    if (typeof el === 'undefined') return false
    if (typeof el === 'number' && el > 0) return true
    if (typeof el === 'boolean' && el === true) return true
    
    try {
        if (el instanceof Boolean) {
            return el.valueOf() === true
        }
    } catch (err) {
        //
    }
    return false
}

/** 
 * Check if an item is a boolean
 * @param {any} el
 * @returns {true|false}
 * 
 * @example
 * isBoolean(null) // false
 * isBoolean(undefined) // false
 * isBoolean(false) // true
 * isBoolean(new Boolean(false)) // true 
 * 
*/
const isBoolean = (el) => {
    if (el === undefined) return false
    if (el === null) return false
    if (el === true || el === false) return true
    try {
        if (el instanceof Boolean) {
            return true
        }
    } catch (err) {
        //
    }
    return false
}

/** 
 * Check if an item is ===null
 * @param {any} el
 * @returns {true|false}
 * 
 * @example
 * isNull(null) // true
 * isNull(undefined) // false
*/
const isNull = (el) => {
    if (el === null) return true
    else return false
}

/** 
 * Check if an item is ===undefined
 * @param {any} el
 * @returns {true|false}
 * 
 * @example
 * isUndefined(undefined) // true
 * isUndefined(null) // false
 * 
*/
const isUndefined = (el) => {
    if (typeof el === 'undefined') return true
    else return false
}

/** 
 * Check if given item has some value, set of props, or length
 * @param {any} value any
 * @borrows typeCheck
 * @returns {boolean}
 * 
 * @example 
 * isEmpty({}) // true
 * isEmpty({a:1}) // false
 * isEmpty([]) // true
 * isEmpty([0]) // false
 * isEmpty(1) // false
 * isEmpty(false) // true
*/
const isEmpty = (value) => {
    if (isError(value)) return false
    return !typeCheck(value).value
}

/** 
 * Get first item from an array 
 * - Allow 1 level [[1,2]]
 * @param {array} arr
 * @returns {any} first array[] item[0] 
 * 
 * @example
 * head([[{ value: 1 }, { value: 2 }]]) // { value: 1 }
 * head([[ [1], {value:1} ]]) // [1]
 * head([1,2]) // 1
 * 
*/
const head = (arr = []) => {
    if (Array.prototype !== (arr || null).__proto__) return undefined
    return arr.flat().shift()
}

/**
 * Get last item from an array 
 * @param {array} arr 
 * @returns {any}
 * 
 * @example 
 * last([{},{},[1], { value: 1 }]) // { value: 1 }
 */
const last = (arr = []) => {
    return (arr && Array.prototype === (arr).__proto__) ? arr[arr.length - 1] : undefined
}

/**
 * Timer callback is executed in timeout
 * @param {()=>any} cb 
 * @param {number} time 
 * 
 * @example
 * timer(() => log('timer called'), 2000) // executed after time expired
 * 
 */
const timer = (cb = () => {}, time = 0) => {
    const isFN = typeof cb === 'function'
    if (!isFN) return undefined
    time = (typeof time === 'number' && time >= 0) ? time : 0 // must provide number
    const s = setTimeout(() => {
        cb()
        clearTimeout(s)
    }, time)
}

/**
  * Execute callback on every interval, and exit on endTime
  * @param {()=>any} cb 
  * @param {number} every 
  * @param {number} endTime 
  * 
  * @example
  * interval(() => log('interval called'), 100, 300) 
  * 
  **/
const interval = (cb = () => {}, every = 0, endTime = 0) => {
    const isFN = typeof cb === 'function'
    if (!isFN) return null
    every = (typeof every === 'number' && every >= 0) ? every : 0 // must provide number
    endTime = (typeof endTime === 'number' && endTime >= 0) ? endTime : 0 // must provide number  

    let counter = 0
    const c = setInterval(() => {
        cb()
        if (endTime <= counter) return clearInterval(c)      
        counter = counter + every
    }, every)

}

/** 
 * SimpleQ / instanceof Promise & SimpleQ
 * - Deferred simplified promise 
 * @borrows Promise
 * @returns {SimpleQ} SimpleQ/Promise 
 * 
 * @example 
 * let defer = sq()
 * // with/without .promise
 * defer.promise.then(n=>{
 *     log('[sq][resolve]',n)
 * }).catch(err=>{
 *    onerror('[sq][reject]',err)
 * })
 *
 * defer.resolve('hello world')
 * // defer.reject('kill it')
 *
 * // or
 * defer.resolve('hello world')
 * .then(log)
 *
 * // or
 * defer.then(log)
 * .resolve('hello world')
 *
 * // or 
 * defer.reject('ups')
 * .catch(onerror)
 *
**/
const sq = () => {
    
    class SimpleQ extends Promise {
        /* istanbul ignore next */ 
        /**
         * 
         * @param {(resolve:(data)=>{},reject:(data)=>{})=>any} deferrerCallback 
         */
        // @ts-ignore
        constructor(deferrerCallback = (resolve = (data) => { }, reject = (data) => { }) => { }) {
            // @ts-ignore
            SimpleQ._promise = super(deferrerCallback)
        }
 
        /**
         *
         * Resolve your promise outside of callback
         * @param {*} data
         * @memberof SimpleQ
         */
        resolve(data) {
            // @ts-ignore
            let res = SimpleQ._resolve
            if (res instanceof Function) res(data) 
            /* istanbul ignore next */ 
            else onerror('[SimpleQ][resolve]', 'not callable')

            return this
        }

        /**
         * Reject your promise outside of callback
         * @memberof SimpleQ
         * @param {*} data 
         */
        reject(data) {
            // @ts-ignore
            let rej = SimpleQ._reject
            if (rej instanceof Function) rej(data) 
           
            else {
                /* istanbul ignore next */ 
                onerror('[SimpleQ][reject]', 'not callable')
            }

            return this
        }

        /**
         * - Returns promise, and instanceof Promise
         * @memberof Promise
         * @readonly
         * @memberof SimpleQ
         */
        get promise() {
            let promise = SimpleQ._promise
            return promise instanceof Promise ? promise : undefined
        }
    }

    let deferred = new SimpleQ((resolve, reject) => {
        SimpleQ._resolve = resolve
        SimpleQ._reject = reject
    })

    // for recongnition
    deferred.__proto__.entity = 'SimpleQ'

    if (deferred instanceof Promise && 
        deferred instanceof SimpleQ) {
        return deferred
       
    } else {
        /* istanbul ignore next */ 
        throw ('sq() not a valid Promise ?')   
    } 
}

/** 
 * How long to wait before we exit synchronous process
 * - If the promise never resolves or takes too long, we can cancel when maxWait expires
 * @param {object} config `{defer,checkEvery,maxWait,cbErr,message,logging,id}`
 * @param {Promise<any>} config.defer resolved when process complete or called from callback on timeout
 * @param {number} config.checkEvery how frequently to check if promise is resolved
 * @param {number} config.maxWait how long to wait before exciting with cbErr
 * @param {(o:{error:string,defer:Promise<any>,id:string})=>any} config.cbErr called on timeout cbErr(({error,defer,id})) here you can either resolve or reject the pending promise
 * @param {string} config.message (optional) defaults: **taken too long to respond**, or provide your own
 * @param {boolean} config.logging (optional) will prompt waiting process
 * @param {string|number} config.id (optional) added to error callback, and to logging
 * @returns {Promise} the promise provided in config.defer, dont need to use it
 * 
 * @example 
 * let dfr = sq()
 * cancelPromise({ defer:dfr, // can use standard Promise, sq(), or node.js q.defer
 *   checkEvery: 200, // << log process on every 
 *   maxWait: 3000, // expire promise 
 *   message: 'waited too long', // << use this error message
 *   logging: true, // display process
 *   id: new Date().getTime(), // custom id to display or on error
 *   cbErr: function({ error, defer, id }) {
 *       // update our reject message
 *       defer.reject(error)
 *   }
 * }) // returns promise
 * 
 * // will catch the timeout rejection
 * df2.promise.catch(onerror)
 *   
 * // or would exist waiting process and resolve
 * // dfr.resolve('success')
 * // dfr.promise.then(log)
 * 
**/
const cancelPromise = ({ defer = undefined, checkEvery = 500, maxWait = 9500, cbErr = ({ error, defer, id }) => {}, message = 'taken too long to respond', logging = false, id = undefined }) => {
   
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
            /* istanbul ignore next */ 
            return clearInterval(t)
        }

        if (inx > maxWait) {
            let args = { error: `${message}, time: ${inx}`, defer, id }

            try {             
                cbErr.apply(args, [args])   
                defer.reject(`${message}, time: ${inx}`) 
            } catch (err) {
                // ups
                /* istanbul ignore next */ 
                onerror('[cancelPromise]', err)
            }

            return clearInterval(t)
        } else {
            if (logging) {
                if (id) log('-- processing: ', id)
                /* istanbul ignore next */ 
                else alert('-- processing ')
            }
        }
        inx = every + inx
    }, every)

    const deffer = (def) => {
        return def.then(n => {
            // will exit the interval
            exit_interval = true
            return n
        }, err => {
            exit_interval = true
            return Promise.reject(err)
        })      
    }
 
    if (isSQ(defer) || (isPromise(defer) && !isQPromise(defer))) return deffer(defer)
    if (isQPromise(defer)) return deffer(defer.promise)
    /* istanbul ignore next */ 
    else return Promise.reject('[cancelPromise], Supplied {defer} is not a promise')
   
}

/**
 * Convert to string, remove spaces, and toLowerCase
 * @param {string|number} id 
 * @returns {string} 
 * 
 * @example 
 * validID('sdfkj 45 AMKD') // sdfkj45amkd
 **/
const validID = (id = '') => !(id || '') ? '' : (id || '').toString().toLowerCase().replace(/\s/g, '')

/**
 * Check item is a number
 * @param {any} n 
 * @returns {true|false}
 * 
 * @example
 * isNumber(-1) // true
 * isNumber( new Number(-1) ) // true
 * isNumber(NaN) // true
 * isNumber(true) // false
 * isNumber([]) // false
 **/
const isNumber = (n) => {
    if (isBigInt(n)) return false
    try {
        if (n instanceof Number) return true
    } catch (err) {
        //
    }
    return n !== undefined && n !== null && n !== '' ? (n).__proto__ === Number.prototype : false
}

/**
 * @deprecated in favour of validDate()
 * Check item is a date, example: new Date()
 * @param {any} d 
 * @returns {true|false}
 **/
/* istanbul ignore next */ 
const isDate = (d) => {
    try {
        return (d) instanceof Date
    } catch (err) {
        return false
    }
}

/**
 * Test the length of provided string
 * @param {string} str 
 * @returns {number} length of string
 * 
 * @example
 * stringSize('abc') // 3 
 * stringSize(-1) // 0
 * stringSize('-1') // 2
 * stringSize(undefined) // 0
 * stringSize([123]) // 0
 */
const stringSize = (str = '') => str !== undefined && str !== null ? (str).__proto__ === String.prototype ? str.length : 0 : 0

/** 
 * There are 2 types of promises available javascript standard Promise and the node.js `q.defer()` promise
 * - this method tests for the q.defer node.js promise version
 * @param {any} defer q.defer() promise to check against
 * @returns {true|false}
 * 
 * @example
 * isQPromise(Promise.resolve()) }) // false 
 * isQPromise( sq() ) // false
 * isQPromise( q.defer() ) // true (referring to node.js q )
 * 
**/
const isQPromise = (defer = undefined) => {

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
 * Test if item is our SimpleQ promise
 * @param {any} defer 
 * @returns {true|false}
 * 
 * @example
 * isSQ( sq() ) // true
 * isSQ( Promise.resolve() ) // false 
 * isSQ( q.defer() ) // false
 */
const isSQ = (defer) => {
    try {
        return defer.entity === 'SimpleQ'
    } catch (err) {
        return false
    }
}

/** 
 * Check for Promise / q.defer / and xutils promise ( sq() ),
 * - test if its a resolvable promise
 * @param {any} defer
 * @returns {true|false}
 * 
 * @example
 * isPromise( function () { } ) // false
 * isPromise( Promise.resolve()) ) // true
 * isPromise( sq() ) // true
 * isPromise( q.defer() ) // true
 * 
*/
const isPromise = (defer) => {
    if (isQPromise(defer)) return true
    else {
        try {
            if (defer instanceof Promise) return true
            // if (isSQ(defer)) return true
        } catch (err) {
            // onerror('err', err)
        }
        return false
    }
}

/**
 * Test provided item is an Object,
 * - Should not be a function/primitive, or class (except for instance)
 * @param {any} obj
 * @param {function|undefined} cbEval (optional) callback operator, continue checking when callback returns !!true
 * @returns {true|false}
 * 
 * @example 
 * isObject({}) // true
 * isObject([]) // false
 * isObject( (new function(){}) ) // true
 * isObject((function () { })) }) // false
 * isObject((new class { })) // true
 * isObject( (class{}) ) // false
 * isObject(new Error()) // true
 * isObject(null) // false 
 * isObject( {}, ()=>false ) // false, due to callback !!false
 * isObject( [], ()=>Object.keys({1:1}).length ) // false, not an object
 *
 */
const isObject = (obj = undefined, cbEval = undefined) => {
    if (isFunction(cbEval) && !callFN(cbEval)) return false
    if (isBigInt(obj)) return false
    if (isNaN(obj) && typeof obj === 'number') return false
    if (typeof obj === 'function') return false
    if (!isNaN((+obj)) || obj === undefined) return false
    if ((obj).__proto__ === ([]).__proto__) return false // is array 
    // testing standard Object and Error
    const a = (Object.prototype === (obj).__proto__ || Error.prototype === (obj).__proto__)
    const ab = a && (obj instanceof Object)
    if (ab) return true

    if (obj.__proto__ !== undefined) {
        try {
            return obj instanceof Object
        } catch (err) {
            /* istanbul ignore next */ 
            return false
        }
    }
    /* istanbul ignore next */ 
    if (obj.prototype) return true
    return false
}

/**
 * Item to return new array of unique values
 * @param {array} arr 
 * @returns {array}
 *
 * @example 
 * uniq([1, 1, 3, 'a', 'b', 'a', null, null, true, true]) 
 * // [1,3,'a','b',null,true]
 */
const uniq = (arr = []) => {
    let o = []
    o = arr.filter((el, i, all) => all.indexOf(el) === i)
    return o instanceof Array ? o : []
}

/** 
 * Provided item returns values in random order
 * @param {array} arr
 * @returns {array} 
 *
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
 * Select data from array of objects by reference, and go down recursively in order of selectBy references
 * @param {Array<string>} selectBy list of uniq references, example ['a.b.c.d.e','e.f.g'], each selectBy/item targets nested object props
 * @param {Array<any>} data list of objects to target by select ref
 * @returns {array} by selected order in same pair index
 *
 * @example 
 * // select b from both arrays, return same index order
 * selectiveArray(['a.b'], [ { a: { b:'hello' }, b:{c:'hello'} },{ a: { b:'world' },b:{c:'world'} } ]) 
 * //=>  [ [ 'hello'], [ 'world'] ] 
 *
 * //select b, and select c from both arrays, return same index order
 * selectiveArray(['a.b','b.c'], [ { a: { b:'hello' }, b:{c:'hello'} },{ a: { b:'world' },b:{c:'world'} } ]) 
 * //=> [ ['hello','hello'], ['world','world'] ]
 * 
 * // destructuring example : 
 * let [b,c]=Array.from( flatten(selectiveArray(['a.b','b.c'], [ { a: { b:'hello' }, b:{c:'world'} }]) ) ).values()
 *  // b==="hello", c ==="world"
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
            /* istanbul ignore next */ 
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
        // valid example:[ [ 'abc', undefined ], 'efg', undefined  ] << pairs should be consistent, when selectBy has more then 1
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

/**
 * Test if item is a class{} that can be initiated
 * @param {any} obj
 * @param {*} cbEval (optional) callback operator, continue checking when callback returns !!true
 * @returns {true|false}
 * 
 * @example
 * isClass(Array) // true
 * isClass(Object) //true
 * isClass((class {}) ) //true
 * 
 * // instance of a class
 * isClass( (new function() {}()) ) // false
 * isClass( new Object() ) // false
 */
const isClass = (obj = {}, cbEval = undefined) => {
    if (isFunction(cbEval) && !callFN(cbEval)) return false
    if (!obj) return false
    if ((obj).prototype !== undefined) return true
    return false
}

/** 
 * Same as isClass() method
 * @method hasPrototype(obj)
 * @alias isClass 
 *
*/
const hasPrototype = isClass

/**
 * Check if item has access to __proto__
 * @param {any} el 
 * @param {function|undefined} cbEval  optional callback, continue checking when callback returns !!true
 * @returns {boolean}
 *
 * @example
 * hasProto({}) // true
 * hasProto('') // true
 * hasProto(-1) // true
 * hasProto(false) // true
 * hasProto(undefined) // false
 * hasProto(null) // false
 * hasProto(NaN) // true
 * hasProto({}, ()=> Object.keys({}).length ) // false because object has no keys
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
 * @param {RegExp} expression
 * @returns {boolean}
 *
 * @example
 * isRegExp('abc') // false
 * isRegExp(/abc/) // true
 */
const isRegExp = (expression = (/\\/)) => {
    try {
        return expression instanceof RegExp
    } catch (err) {
        /* istanbul ignore next */ 
        return false
    }
}

/**
 * Testing if item is (new class{})
 * @param {any} obj
 * @param {function|undefined} cbEval (optional) continue checking when callback returns !!true
 * @returns {boolean}
 *
 * @example 
 * isInstance({}) // false
 * isInstance(new function(){}) // true 
 * isInstance(new class(){} ) // true 
 * isInstance(function () { }) // false
 * isInstance([]) // false
 */
const isInstance = (obj = {}, cbEval = undefined) => {
    if (isFunction(cbEval) && !callFN(cbEval)) return false
    if (!obj) return false
    if (isArray(obj)) return false
    if (obj.__proto__ && !isClass(obj)) {
        try {
            return obj.__proto__ instanceof Object
        } catch (err) {
            /* istanbul ignore next */ 
            return false
        }
    }
    return false
}

/** 
 * Check size object, we want to know how many keys are set
 * @param {object} obj
 * @returns {number} number of keys on the object
 *  
 * @example 
 * objectSize({ a: 1, b: 2 }) }) // 2
 * objectSize([1,2]) // 0
 * objectSize( (new function(){this.a=1}()) ) // 1
 * objectSize( (new function(){}()) ) // 0
 */
const objectSize = (obj = {}) => {
    if (!obj || !isNaN(+(obj))) return 0
    if (isInstance(obj)) return Object.keys(obj).length
    return ((Object.prototype === (obj).__proto__) || Error.prototype === (obj).__proto__) ? Object.keys(obj).length : 0
}

/**
 * Check if any item type is falsy, an object, array, class/instance having no props set
 * @param {any} el 
 * @returns {boolean}
 *
 * @example
 * isFalsy({}) // true
 * isFalsy({a:1}) // false
 * isFalsy([]) // true
 * isFalsy([1]) // false
 * isFalsy(true) // false
 * isFalsy(false) // true
 * isFalsy(0) // true
 * isFalsy( (new function(){}()) ) // true
 * isFalsy( (new function(){this.a=false}()) ) // false
 */
const isFalsy = (el = undefined) => {
    if (el === undefined || 
        el === null) return true     
    if (el === false && typeof el === 'boolean') return true
    if (el === true && typeof el === 'boolean') return false
    if (typeof el === 'number' && el > 0) return false

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
    /* istanbul ignore next */ 
    if ((+(el) > 0) === false) return true
    if (el) return false
    else return false
}

/**
 * Test if an item is a string, or new String()
 * @param {any} str 
 * @param {function|undefined} cbEval (optional) operator, continue checking when callback returns !!true
 * @returns {boolean}
 *
 * @example 
 * isString('') // true
 * isString(new String()) // true
 * isString(NaN) // false
 * isString(new Date()) // false
 * isString('123', ()=>'123'.length>5) // false, callback return !!false
 * isString('123', ()=>'123'.length>2) // true
 */
const isString = (str = undefined, cbEval = undefined) => {
    if (isFunction(cbEval) && !callFN(cbEval)) return false
    if (str === undefined) return false
    if (str === null) return false
    if (typeof str === 'boolean') return false
    return str === '' ? true : String.prototype === (str).__proto__
}

/**
 * Copy object by property name
 * @param {object} obj 
 * @param {array} refs supply list of keys  
 * @returns {object} new object of copied values
 * 
 * @example
 * copyBy({ a: 1, b: 2, c: 3 }, ['a', 'c'])  // {a: 1, c: 3}
 * copyBy({ a: 1, b: 2, c: 3 })  // {}
 * copyBy({}) } // {}
 */
const copyBy = (obj = {}, refs = []) => {
    if (!isObject(obj)) return {}
    const d = [].concat(refs).reduce((n, el, i) => {
        if (obj[el] !== undefined) n[el] = obj[el]
        return n
    }, {})

    try {
        return JSON.parse(JSON.stringify(d))
    } catch (err) {
        /* istanbul ignore next */ 
        return {}
    }
}

/**
 * Produce copy of any item
 * @param {any} data
 * @returns {any} copy of the same input type, or primitiveValue type if class or method supplied
 *
 * @example
 * copy({ a: 1, b:function(){} }) //=>  {a:1}
 * copy([1,2,3]) //=> / [1,2,3]
 * copy( function(){}) //=>  Function: anonymous
 * copy(null) //=>  null 
 * copy(true) //=>  true
 */
const copy = (data) => {
    try {
        return JSON.parse(JSON.stringify(data))
    } catch (err) {
        return typeCheck(data).primitiveValue
    }
}

/**
 * 
 * Provided data is returned in pretty json
 * @param {any} data array/object
 * @returns {string} JSON.stringify(o , null, 2)
 *
 * @example  
 * asJson( { a:{ b: { c:'hello world' } } } )
 * // returns:
 * {
 *  "a": {
 *    "b": {
 *      "c": "hello world"
 *    }
 *  }
 * }
 */
const asJson = (data) => {
    try {
        return JSON.stringify(data, null, 2)
    } catch (err) {
        /* istanbul ignore next */ 
        return `[asJson], ` + err.toString()
    }
}

/** 
 * For complex arrays of objects: `[{...},{...}]`
 * - will copy each array item separately and check for Object>object then make copy
 * @param {any} data object or array
 * @return {any} copy of the same input type, or primitiveValue type where method supplied
 * 
 * @example
 * copyDeep({ a: {b:{c:{}}} }) //=>  { a: {b:{c:{}}} })
 * copyDeep([{ a: (new function(){this.b=1}()) }]) //=>  [ { a: {b:1} } ]
 * copyDeep({ a: (new function(){this.b=1}()) }) //=>  { a: { b:1 } }
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

/**
 * Delay sync/async process to be executed after delay is resolved
 * @param {number} time in ms
 * @returns {Promise} always resolves
 * 
 * @example 
 *  // async 
 *  log('delay start')
 *  await delay(2000)
 *  // continue with process
 *  // sync
 *  delay(2000).then(()=>{...})
 */
const delay = (time = 100) => {
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
 *  
 * Test if ANY keys match between object{} and source{} 
 * @param {object} object 
 * @param {object} source 
 * @param {function|undefined} cbEval (optional) operator, continue checking when callback returns !!true
 * @returns {boolean} when at least 1 key is found between 2 objects, return true
 *
 * @example 
 * someKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, a: 1 }) 
 * //=>  true , {a} was found
 * someKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, a: 1 }, ()=>1-1===1) 
 * //=>  false, because callback return !!false
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
 * Test if ALL keys match between object{} and source{} 
 * @param {object} object 
 * @param {object} source 
 * @param {function|undefined} cbEval (optional) operator, continue checking when callback returns !!true
 * @returns {boolean} when ALL keys found between 2 objects, return true
 * 
 * @example
 * exactKeyMatch({ a: 2, b: 1, c: 2 }, { c: 1, a: 1, b: 1 }) //=>  true
 * exactKeyMatch({ a: 2, b: 1 }, { c: 1, a: 1, b: 1 }) //=> false
 * exactKeyMatch({}, { c: 1, d: 1}) //=>  false
 * exactKeyMatch({ a: 2, b: 1, c: 2 }, { c: 1, a: 1, b: 1 }, ()=> 1+1===3) 
 * //=> false, because callback return !!false
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
 * Excludes/omits any falsy values from array: `[0,null,false,{},undefined, -1,'',[]]`
 * @param {array} arr mixed
 * @returns {array} only non falsy items are returned 
 * 
 * @example 
 * trueVal([-1, 0,1, {}, "hello", [], { name: 'jack' }, false, null, NaN, undefined,true]) 
 * //=> [1,'hello',{ name: 'jack' },true]
 **/
const trueVal = (arr = []) => {
    // provided must be array
    if (!(!arr ? false : Array.prototype === (arr).__proto__)) return []
    return [].concat(arr).filter((itm, inx) => isFalsy(itm) !== true)
}

/**
 * Excludes/omits any falsy values from array: `[0,null,false,{},undefined, -1,'',[]]`, testing 1 level deeper as compared to trueVal()
 * @param {array} arr mixed
 * @returns {array} only non falsy items are returned 
 * 
 * @example
 * trueValDeep([1, 0, [], {}, "hello", [0, undefined, -1, false, NaN, 1], { name: 'jack' }, false, null, undefined])
 * //=> [ 1, 'hello', [ 1 ], { name: 'jack' } ] 
 */
const trueValDeep = (arr = []) => {
    // provided must be array
    if (!(!arr ? false : Array.prototype === (arr).__proto__)) return []
    if (!arr.length) return []
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
 * Object with true entities will be returned 
 * @param {object} obj required
 * @returns {object} 
 * 
 * @example  
 * trueProp({ a: NaN, b: 0, c: false, d: -1, e: NaN, f: [], g: 'hello', h: {}, i: undefined, j:'' })
 * //=> {g: 'hello'}
 */
const trueProp = (obj = {}) => {
    if (!(!obj ? false : Object.prototype === (obj).__proto__)) return {}

    return Object.entries(obj).reduce((n, [key, val], inx) => {
        if (!isFalsy(val)) n[key] = val
        return n
    }, {})
}

/** 
 * Run some method that returns a value, check for updated conditions until timeout or when data becomes available
 * @param {()=>any} fn callable method that returns some value
 * @param {number} timeout (ms) specify max time to wait for data before timeout
 * @param {number} testEvery how ofter to test data availability
 * @returns {Promise} always resolves, when return is empty it will be wrapped in an {error}
 * 
 * @example 
 * resolver(()=>Promise.resolve({data:'hello world'}),5000,50).then(n=>{
 *   log({resolver:n})
 * })
 * 
 * resolver(()=>Promise.reject('some error'),5000,50).then(n=>{
 *   log({resolver:n}) // {error: 'some error'}
 * })
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

        let test = async () => {
            try {
                return await fn()
            } catch (error) {
                if (isError(error)) return { error }
                if (isObject(error)) {
                    if (error.error) return error
                    else return { error: error }
                } else return { error }
            }
        }

        let t = setInterval(async () => {
            let anon = test() 

            // lets catch any errors      
            anon.catch(err => {
                return err
            })

            if (inx >= max) {
                if ((anon || {}).resolve) anon.resolve(undefined)   
                resolve(undefined)
                return clearInterval(t)
            }

            inx = inx + every
            try {
                // NOTE for promise with asyn we need the counter above,
                inx = inx + every

                let d = await anon
                if (d) {
                    resolve(d)
                    return clearInterval(t)
                }
                /* istanbul ignore next */ 
            } catch (error) {

                if (isError(error)) resolve(error)
                if (isObject(error)) {
                    if (error.error) resolve(error)
                    else resolve({ error })
                } else resolve({ error })
                return clearInterval(t)
            }
           
        }, every)
    })
}

/**
 * Flattens 2 level array to 1 level: `[[]] > [], [[[]]] > [[]]`
 * @param {array} arr 
 * @returns {array}
 * 
 * @example
 * flatten([['hello world']]) // ['hello world']
 */
const flatten = (arr = []) => {
    if (!isArray(arr)) return []
    return [].concat(...arr)
}

/** 
 * Flattens all array levels, example: `[[['hello']]] > ['hello']`
 * @param {array} arr
 * @returns {array}
 * 
 * @example 
 * flattenDeep([[[['hello world']]]) // ['hello world']
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
        /* istanbul ignore next */ 
        else return []
    } catch (err) {
        /* istanbul ignore next */ 
        return []
    }
    
}

/** 
  * Split an array to chunks by providing size number
  * @param {array} arr required
  * @param {number} size how many chunks per batch
  * @returns {array} chunked array by size
  * 
  * @example 
  * chunks( [1,2,3,4,5,6] , 2) // [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]
 */
const chunks = (arr = [], size = 0) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    )

/** 
 * Duplicate item x:number of times
 * @param {any} item
 * @param {number} index times to duplicate the item
 * @returns {array} same item duplicated
 * 
 * @example
 * dupes('any', 2) 
 * // ['any','any']
 * 
 * dupes([{a:1},{b:1}], 2) 
 * // [ [{a:1},{b:1}], [{a:1},{b:1}] ]
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
 * New array with uniq object property values
 * - selects the first match ignoring others, those which prop values are repeated
 * - non matching objects, preserved as usual
 * @param {array} arr mixed array of items and objects
 * @param {string} propName select key and test values, are repeated
 * @returns {array} [{},...] items with object items whos values are uniq
 * 
 * @example
 * uniqBy([{ a: 1, b: 2 }, 1, { b: 1 }, 5, { a: 1 }, null, { a: 1, b: 2 }], 'a')
 * //=> [ { a: 1, b: 2 }, 1, { b: 1 }, 5, null ]
 * 
 * uniqBy([{ c: 1, b: 2 }, { c: 1 }, { c: 1 }, { c: 1, b: 2 }], 'c')
 * //=> [ { c: 1, b: 2 } ]
 * 
 * uniqBy([{ a: 1, b: 2 }, null, undefined, true, 1, { a: 1 }, { a: 3 }, false], 'a')
 * //=> [ { a: 1, b: 2 }, null, undefined, true, 1, { a: 3 }, false ] prop[values] are not uniq
 */
const uniqBy = (arr = [], propName = '') => {
    const stored = {}
    const n = []
    if (!propName) return []
    if (!(arr || []).length) return []

    for (let inx = 0; inx < arr.length; inx++) {
        let item = arr[inx]

        if (isUndefined(item) || isNull(item)) {
            n.push(item)
            continue
        }
        
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
 * Mix array of objects and values, grabs items[] that include specific prop 
 * @param {array} arr mixed [{a:true},...]
 * @param {string} prop
 * @returns {array} items that include specific prop 
 * 
 * @example
 * arrayWith([ [], { a: undefined }, { b: 3 }, { a: 1 } ], 'a') 
 * //  [ { a: undefined }, { a: 1 }] 
 * 
 * arrayWith([ { a: 1 } , 1,[], undefined, { b: 3 } ], 'b') 
 * //  [ { b: 3 }] 
**/
const arrayWith = (arr = [], prop = '') => {
    if (!isArray(arr)) return []
    let objWith = (o) => {
        // if()
        if (isObject(o)) {
            if (Object.keys(o).indexOf(prop) !== -1) return o
            else return undefined
        } else return undefined
    }

    try {
        let o = arr.map(n => objWith(n)).filter(n => !!n)
        return o instanceof Array ? o : []
    } catch (err) {
        /* istanbul ignore next */ 
        return []
    }

}

/**
 * Array including any objects and values
 * - Exclude items from array that match by excludes, and replace with undefined keeping same index position
 * @param {array} arr mixed with objects to exclude by propName
 * @param {Array<string>} excludes propNames to match each object in arr[x]
 * @returns {array} mixed with any other types as per input, in same index position
 * 
 * @example
 * exFromArray([{ a: 1, c: 5 }, { a: 10 }, { b: 2 }, { c: 1, a: 2 }], ['a', 'b']) 
 * // [ { c: 5 }, undefined, undefined, { c: 1 }] 
 *
 * exFromArray([ null,1,{ a: 1, c: 5 }, { a: 10 }, { b: 2 }, { c: 1, a: 2 },'2'], ['a', 'c']) 
 * // [null,1, undefined,undefined,{ b: 2 },undefined,'2']
 **/
const exFromArray = (arr = [], excludes = [/** propName,propName */]) => {
    let o = []
    try {
        if (!(arr instanceof Array)) return o
    } catch (err) {
        /* istanbul ignore next */ 
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
        /* istanbul ignore next */ 
        return []
    }

}

/**
 * Array selection tool
 * - Filter items from array by picks[] conditions 
 * - Does not support deep selections from picks[], only 1 level deep, but you can use object types,
 * @param {array} arr array of any 
 * @param {Array<any>} picks item in picks tests for all passing conditions, like object types, primitive type, and matching values
 * - Empty types and strings, are excluded [{},[],'',NaN]
 * @returns {array} items that passed each pick condition, keeping the same index order
 * 
 * @example
 * let picks = [Boolean, 'hello', Object, { a: 1 }, BigInt] // only these types/values will be tested 
 * pickFromArray([false, undefined, { a: 1 }, 'hello', ['hello'], {}, 1234567890123456789012345678901234567890n, 'not selected'], picks )
 * //>  [ false,{ a: 1 },'hello',{},1234567890123456789012345678901234567890n ] 
 * 
 * let picks = [Number, Boolean] // select only numbers and booleans from array
 * pickFromArray([undefined, 1, {}, 2, null, [], 'hello world', 3, true, 4, null, 5], picks) 
 * //> [ 1, 2, 3, true, 4, 5 ]
 * 
 * let picks = [undefined, [undefined] ] // select all undefined from array
 * pickFromArray([undefined, false, 1, true, {}, [1], [undefined], null], picks)
 * // [undefined, [undefined]]
 * 
 * // we only want to pick items that are {data} objects containing inner objects
 * let picks = [{ data: Object }] 
 * pickFromArray([{ data: { a: 1 } }, { data: 1 },false, ['hello'], { data: { d: 2 } }, { data: { b: 2 } }, 1, 2, [], {}], picks)
  * //=> [{ data: { a: 1 } },{ data: { d: 2 } },{ data: { b: 2 } } ]
  * 
  * let picks = [{ a: Object, b: 1 }]  // narrowing down the results, should select all array objects that at least contain all the above
  * pickFromArray([{ a: { a: 1 }, b: 1, c:1  }, { data: 1 }, { a: { a: 1 }, b: 1 }, { data: null }, false, 1, 2, [], {}], picks)
  * //=>  [ { a: { a: 1 }, b: 1, c: 1 }, { a: { a: 1 }, b: 1 }]
 */
const pickFromArray = (arr = [], picks = []) => {
    let o = []
    try {
        if (!(arr instanceof Array)) return o
    } catch (err) {
        /* istanbul ignore next */ 
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
        /* istanbul ignore next */ 
        else return []
    } catch (err) {
        /* istanbul ignore next */ 
        return []
    }
  
}

function Dispatcher(uid, debug) {

    const plugin = `[dispatcher]`
    /* istanbul ignore next */ 
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
     * @ignore
     * @onComplete
     * when subscribe event is deleted complete even callback can be called
    */
    this.onComplete = (cb) => {
        this._onComplete_cb = cb
        return this
    }

    /** 
     * @ignore
     * @Dispatch
     * initialize the dispatcher
    */
    this.initListener = () => {
        this.Dispatch()
        this._isActive = true
        return this
    }

    /**
     * @ignore
     * @next
     * send data to `subscribe` callback
     * @param {*} data any
     */
    this.next = (data = null) => {
        if (this._isActive !== false) this.initListener() // in case next is called above subscribe, we need to make sure it is initiated
        if (this.dispatchInstance[this.uid]) this.dispatchInstance[this.uid].next(data)
        else {
            /* istanbul ignore next */ 
            if (this.debug) log({ message: `${plugin} for uid not available`, uid: this.uid })
        }
        return this
    }

    /**
     * @ignore
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
                    /* istanbul ignore next */ 
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
     * @ignore
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
     * @ignore
     * @subscribe
     * wait for callbacks forwarded from Dispatch and returned in callback of this method
     * - Dispatch must be set initially before you call `subscribe`
     * @param {*} cb required
     */
    this.subscribe = (cb) => {
        const isFN = typeof cb === 'function'
        if (!isFN) {
            /* istanbul ignore next */ 
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
     * @ignore
    * @alias initListener
    */
    this.init = this.initListener

    /** 
     * @ignore
     * @alias subscribe
    */
    this.sub = this.subscribe

    /** 
     * @ignore
    * @alias next
    */
    this.emit = this.next

    /** 
     * @ignore
    * @alias del
    */
    this.delete = this.del

    /** 
     * @ignore
     * @alias del
    */
    this.unsubscribe = this.del

    // end
}

/**
 * Lightweight Event Dispatcher, allowing you dispatch anywhere in the code, very handy in callback hell situations, deep promises, or any other complicated computations. Integrated with callback memory so you dont have to subscribe first to get your data.
 * - Call next before subscribe
 * - Avoid ugly callback > callback > callback hell!
 * - Avoid messy Promises
 * - Prefer clean, readable code hierarchy
 * @param {string|number} uid (optional) or generated
 * @param {boolean} debug for extra debug messages
 * @returns {Dispatcher}
 * 
 * @example
 * const ds = dispatcher()
 * ds.next({ data: 'hello world' })
 * ds.subscribe(function (data, uid, index) {
 *    log('on subscribe', data, uid, index)
 *    // this.delete() // delete dispatcher
 * }).onComplete(uid => {
 * // last call on deletion
 * })
 * ds.next({ data: 'hello again' })
 * ds.delete() // delete dispatcher
 * ds.next({ data: 'another' }) // never called
 */
const dispatcher = (uid = undefined, debug = false) => {
    // @ts-ignore
    return new Dispatcher(uid, debug)
}

/**
 * High order caller, concept taken from React HOC.
 * - Promise support, we can provide deferred callback
 * - if rejectable error is not callable, message is: `DEFERRED_NOT_CALLABLE`
 * @param {(...args)=>any} item callable function
 * @param {*} args (optional) any number of arguments (,,,,) that callable function has available
 * @returns {function} callable function withHoc(...args) OR deferred if a promise
 * 
 * @example
 * function fn(a = 1, b = 2, c = 3) {
 *     return a + b + c
 * }
 * 
 * // example 1
 * let fnHocked = withHoc(fn)
 * fnHocked() // > 6
 * 
 * // example 2
 * fnHocked = withHoc(fn, 4, 5, 6) // provided fn() arguments from upper caller
 * fnHocked() // > 15
 *
 * // example 3
 * fnHocked = withHoc(fn, 4, 5, 6) 
 * // above arguments  replaced with in final call 
 * fnHocked(7, 8, 9) // > 24  
 * 
 * // example 4
 * fnHocked = withHoc(Promise.resolve(fn), 4, 5, 6) 
 * // above arguments  replaced with in final call 
 * fnHocked(7, 8, 9).then(log) // > 24  
 *
 * // example 5
 * fnHocked = withHoc(Promise.reject(fn), 4, 5, 6) 
 * // above arguments  replaced with in final call 
 * fnHocked(7, 8, 9).catch(onerror) // > 24  
 *
 * // example 6 not a deferred caller: 
 * fnHocked = withHoc(Promise.reject('fn'), 4, 5, 6) 
 * // above arguments  replaced with in final call 
 * fnHocked(7, 8, 9).catch(onerror) // > DEFERRED_NOT_CALLABLE  
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
                /* istanbul ignore next */ 
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
                    // should always return a function of constant message
                    if (isFunction(err)) return Promise.reject(err(...argsFN()))
                    else return Promise.reject('DEFERRED_NOT_CALLABLE')
                })

            }
            // rejectable call
            return fn()

        } else {
            /* istanbul ignore next */ 
            onerror('[HOC]', 'item() must be callable function')
        }

    }
    return hoc
}

/**
 * @class module.constructor
 * @memberof module.constructor
 * THIS METHOD ONLY WORK FOR COMMON.JS modules, and not for browser
 * - Modified require does not throw when second arg ref >`ERR_NO_THROW` is provided
 * - It does not modify the global require() method 
 * - Doesn't provide Intellisense, unfortunately
 * @param {string} path require(>path<)
 * @param {string} ref // ERR_NO_THROW and it wont throw an error
 * @returns {any} require module output or undefined
 * 
 * @example 
 * xrequire('./path/to/mod') // as usual
 * xrequire('sdf56yfd','ERR_NO_THROW') // returns undefined
 *
 */
function xrequire(path = '', ref = '') {
    /* istanbul ignore next */ 
    if (isWindow()) return undefined

    const Mod = function () {}

    Mod.prototype = Object.create(module.constructor.prototype)
    Mod.prototype.constructor = module.constructor

    Mod.prototype.require = function (_path, ref) {
        const self = this
        try {
            return self.constructor._load(_path, self)
        } catch (err) {
            // NOTE magic if the ref has match instead of throw we return undefined
            /* istanbul ignore next */ 
            if (ref === 'ERR_NO_THROW') return undefined
            // if module not found, we have nothing to do, simply throw it back.
            /* istanbul ignore next */ 
            if (err.code === 'MODULE_NOT_FOUND') {
                throw err
            }
        }
    }

    /* istanbul ignore next */ 
    if (!(Mod.prototype instanceof module.constructor)) return undefined

    // @ts-ignore
    else return Mod.prototype.require(path, ref)
}

/**
 * New object that excludes all undefined values, in top level
 * @param {object} obj
 * @returns {object}
 * 
 * @example
 * truthFul({ a: undefined, b: 1, c: {} }) // { b: 1, c: {} }
 */
const truthFul = (obj = {}) => {
    if (!isObject(obj)) return {}
    return Object.entries(obj).reduce((n, [k, v]) => {
        if (v !== undefined) n[k] = v
        return n
    }, {})
}

/**
 * Test accuracy of a match[x] in a string
 * @param {string} str to match against
 * @param {Array<RegExp>} patterns RegExp patterns to test against
 * @returns {number} size of index patterns that matched in the string
 * 
 * @example
 * inIndex('ab cd eFG', [/fg/i, /\sCD\s/i, /ab/]) // 3 < found in three pattern arrays
 * inIndex('abcdeFG', [/%fg/i, /1CD/i, /ab/]) // 1 (last)
 * 
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
            /* istanbul ignore next */ 
            onerror('[inIndex]', `wrong pattern/expression at index:${inx}`)
            return false
        }
    }
    o = patterns.filter((n, inx) => regx(n, str, inx)).length 
    return o
}

/**
 * Match string value by expression
 * @param {string} str to match against expression
 * @param {RegExp} expression valid expression /xyz/
 * @returns {boolean}
 * 
 * @example 
 * matched('aabc', /^abc/)) // false
 * matched('aaBC', /abc/i) // true
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
            /* istanbul ignore next */ 
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
export { checkLoggerSetting }
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
export { arraySize }
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
