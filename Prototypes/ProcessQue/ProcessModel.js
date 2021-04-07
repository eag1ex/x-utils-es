
import { isBoolean, isString, isError, isNumber, isArray, isObject, isDate, isUndefined, log } from '../../src'

/**
 * Base model for each iten in inputList[] array
 * To add validation, we could extent the Model
 * @param {*} params `{id,list[],data{},date,error,message,success}
 */
export default function ProcessModel(params = {}, debug = false) {
    if (!(params instanceof Object)) throw 'invalid params'

    let setter = (propName) => {

        Object.defineProperty(this, propName, {
            get: function () {
                return this[`_${propName}`]
            },
            set: function (v) {
                if (propName === 'processIndex') {
                    if (isNumber(v)) {
                        this[`_${propName}`] = v
                    } else if (!isUndefined(v)) {
                        if (debug) onerror('[ProcessModel]', `this.${propName} can only be a number`)
                    }
                }

                if (propName === 'list') {
                    if (isArray(v)) {
                        this[`_${propName}`] = v
                    } else if (!isUndefined(v)) {
                        if (debug) onerror('[ProcessModel]', `this.${propName} can only be an array`)
                    }
                }

                if (propName === 'data') {
                    if (isObject(v)) {
                        this[`_${propName}`] = v
                    } else if (!isUndefined(v)) {
                        if (debug) onerror('[ProcessModel]', `this.${propName} can only be an object`)
                    }
                }

                if (propName === 'date') {
                    if (isDate(v)) {
                        this[`_${propName}`] = v
                    } else if (!isUndefined(v)) {
                        if (debug) onerror('[ProcessModel]', `this.${propName} can only be a date`)
                    }
                }

                if (propName === 'success') {
                    if (isBoolean(v)) {
                        this[`_${propName}`] = v
                        if (v) {
                            this.error = undefined
                        }
                    } else if (!isUndefined(v)) {
                        if (debug) onerror('[ProcessModel]', `this.${propName} can only be boolean`)
                    }
                }

                if (propName === 'id') {
                    if (isString(v)) {
                        this[`_${propName}`] = v
                    } else if (!isUndefined(v)) {
                        if (debug) onerror('[ProcessModel]', `this.${propName} can only be a string`)
                    }
                }
                if (propName === 'error') {
                    if (isString(v) || isError(v)) {
                        this[`_${propName}`] = v
                        this.success = false // when we have error we dont have success!
                    } else if (!isUndefined(v)) {
                        if (debug) onerror('[ProcessModel]', `this.${propName} can only be an error or string`)
                    }
                }
                if (propName === 'message') {
                    if (isString(v)) this[`_${propName}`] = v
                    else if (!isUndefined(v)) {
                        if (debug) onerror('[ProcessModel]', `this.${propName} can only be a string`)
                    }
                }
            },
            configurable: true, // strict
            enumerable: true /// make it visible
        })
    }

    let props = ['processIndex', 'id', 'list', 'data', 'date', 'error', 'message', 'success']

    // init setter/getter
    for (let inx = 0; inx < props.length; inx++) {
        setter(props[inx])
    }

    /** (Optional) for determining index status of each item  */
    this.processIndex = isNumber(params.processIndex) ? params.processIndex : undefined

    /* (Required) best valid id to use is uuid (v4()) */
    this.id = params.id instanceof String ? params.id : ''
    this.list = params.list instanceof Array ? params.list : []
    this.data = params.data instanceof Object ? params.data : {}
    this.date = params.date instanceof Date ? params.date : undefined

    /** (optional) */
    this.error = params.error || undefined // any
    /** (optional) */
    this.message = params.message instanceof String ? params.message : undefined
    /** (optional) */
    this.success = params.success instanceof Boolean ? params.success : undefined 
    if (this.success) {
        this.error = undefined
    }
}
