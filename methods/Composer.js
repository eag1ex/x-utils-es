// @ts-nocheck
/* eslint-disable no-new */

import { copy, onerror, isFunction, warn, flatten } from '../src/x-utils.es'


// TODO update input and conds
/**
 * - Method bonding and callee execution
 * - Call all x-utils methods in the order they appear, pass data to next method @input  
 * - Only supports x-utils methods, as they are identified by Function.name, and annotation defaults
 * - Each/and final output depends on the next/ and last bonding method output
 * - Each bond must be executable method, or it is skipped
 * - defered data not yet supported
 * @param {*} data any data expected to be handled by the method
 * @param {*} bonds array list of bonds, each bond provide callable method from x-utils with any available arguments that method supports, if ommited, defaults to primitive settings
 * @param {*} cb (optional) update the output via return after each bonded method is called: `((output, methodName)=>newInput)`
 * @param {*} opts{} optional settings `{debug}` 
 */
function Composer(data, bonds = [], cb, opts = {}) {

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

export { Bond }
