/* eslint-disable no-new */

import { isBoolean, exactKeyMatch, copy, onerror, isFunction, warn, arrayWith, exFromArray, shuffle, head, flatten, uniqBy, log, isPromise, chunks, loop, someKeyMatch, objectSize, dupes, selectiveArray, sq, withHoc } from '../src/x-utils.es'

function fn(a = 1, b = 2, c = 3) {
    return a + b + c
}

// example 1
let fnHocked = withHoc(fn)
log(fnHocked()) // > 6

// example 2
fnHocked = withHoc(fn, 4, 5, 6) // provided fn() arguments from upper caller
log(fnHocked()) // > 15

// example 3
fnHocked = withHoc(fn, 4, 5, 6) 
// above arguments  replaced with in final call 
log(fnHocked(7, 8, 9)) // > 24  

// example 4
fnHocked = withHoc(Promise.resolve(fn), 4, 5, 6) 
// above arguments  replaced with in final call 
fnHocked(7, 8, 9).then(log) // > 24  

// example 5
fnHocked = withHoc(Promise.reject(fn), 4, 5, 6) 
// above arguments  replaced with in final call 
fnHocked(7, 8, 9).catch(onerror) // > 24  

// example 6 not a deferred caller: 
fnHocked = withHoc(Promise.reject('fn'), 4, 5, 6) 
// above arguments  replaced with in final call 
fnHocked(7, 8, 9).catch(onerror) // > DEFERRED_NOT_CALLABLE  

/**
 * - Method bonding and execution collee
 * - Call all x-utils methods in the order they appear, pass data @output to next method @input  
 * - Only supports x-utils methods, as they are identified by Function.name, and annotation defaults
 * - Each/and final output depends on the next/ and last bonding method output
 * - Each bond must be an executable method, or it is skipped
 * - defered data not yet supported
 * @param {*} data any adata input that can handle bonds[]
 * @param {*} bonds array list of bonds, each bond provide callable method from x-utils with any available arguments that method supports, if ommited, defaults to primitive settings
 * @param {*} cb (optional) update the output via return after each bonded method is called: `((output, methodName)=>newInput)`
 * @param {*} opts{} optional settings `{debug}` 
 */
function Bond(data, bonds = [], cb, opts = {}) {

    const config = Object.assign({}, {
        debug: opts.debug
        // TODO in future version
        //  assembly: opts.assembly || 'full'// provide Bond assembly type, default is full 
    })

    // if (['full', 'slim'].indexOf(config.assembly) === -1) {
    //     config.assembly = 'full'
    // }

    // initial data input
    this.data = copy(data) // REVIEW or should we use copyDeep ?
    const supportedBonds = ['isArray', 'isClass', 'isInstance', 'validDate', 'typeCheck', 'isError', 'isFalsy', 'isObject', 'isQPromise', 'isPromise', 'uniq', 'dupes', 'flattenDeep', 'trueProp', 'trueValDeep', 'trueVal', 'exactKeyMatch', 'someKeyMatch', 'isFunction', 'isString', 'objectSize', 'hasProto', 'hasPrototype', 'selectiveArray', 'stringSize', 'isNumber', 'validID', 'last', 'isTrue', 'chunks', 'uniqBy', 'flatten', 'head', 'shuffle', 'exFromArray', 'arrayWith', 'isFalse']

    bonds = [].concat(bonds)
    let executeMethod = (m, _args, _input, name) => {
        try {
            const defaults = m.defaults || []
            // prep insertion
            let compareTwoInputs = false
            let ordered = [].concat(defaults.map(({ input, args }, inx, all) => {
                if (input && _input) {
                    compareTwoInputs = true
                    return [this.data, _input]
                }
                if (input && _input === undefined && inx === 0 && !all.filter(n => n.args).length) return this.data
                if (input && _input === undefined && all.filter(n => n.args).length) return this.data
                if (args) return _args
            })).filter(n => !!n)

            if (compareTwoInputs) ordered = flatten(ordered)

            // our method executed with @input data and any supported args
            if (isFunction(cb)) {
                // oportunity support to update each output via callback
                let d = m(...ordered)
                let updatedD = cb.apply(this, [d, name])
                if (updatedD !== undefined) return updatedD
                else return d
            } else return m(...ordered)

        } catch (err) {
            if (config.debug) onerror('[bond]', err)
            return { execute_error: true }
        }
    }

    for (let inx = 0; inx < bonds.length; inx++) {
        if (!bonds[inx].args) bonds[inx].args = undefined
        if (!bonds[inx].input) bonds[inx].input = undefined

        const { method, args, input } = Object.entries(bonds[inx]).reduce((n, [k, val]) => {
            if (k === 'input') n.input = val
            if (k === 'args') n.args = val
            if (val instanceof Function) n.method = val
            return n
        }, {})

        // each method must be annotated with defaults, or it wont be supported
        if (method instanceof Function && method.defaults) {
            if (supportedBonds.indexOf(method.name) !== -1) {

                // NOTE data input updated for every iteration
                let d = executeMethod(method, args, input, method.name)
                if ((d || {}).execute_error) continue
                else this.data = d
            } else {
                if (config.debug) warn('[Bond]', `provided method.name:${method.name} not supported`)
            }
        } else {
            if (config.debug) warn('[Bond]', `provided method.name:${method.name} not a function`)
            continue
        }
    }
}

/**
 * - Order matters, its up to you what you want to execute first
 * - Provide x-utils supported method and any args, except for data @input
 * - when methods doesnt support args,  will be ignored regardless
 */
// const input = [{ a: 1, b: { c: ['hello'] } }, { c: 1, b: 2 }, { a: 3, d: 5 }, { a: 7, d: 10 }] // anything , output type depends on the last bond method 

const input = { a: 1, b: { c: ['hello'] } } // anything , output type depends on the last bond method

// const input = { a: 1, b: 2 }
//  { arrayWith, args: 'a' }, { exFromArray, args: ['c', 'b'] }, { shuffle }, { head }
let bonding = [{ exactKeyMatch, input: { o: true } }]
// let bonding = [{ arrayWith, args: 'a' }, { selectiveArray, args: ['b.c'] }, { exFromArray, args: ['c', 'b'] }, { shuffle }, { head }, { objectSize }, { dupes, args: 3 }]

// let bonding = [{ arrayWith, args: 'a' }, { selectiveArray, args: ['b.c'] }]

console.log(new Bond(input, bonding, function (data, methodName) {
    console.log(methodName, data)
}, { debug: true }).data)
