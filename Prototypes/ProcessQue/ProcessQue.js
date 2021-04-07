/* eslint-disable func-call-spacing */
/* eslint-disable no-return-await */

import { onerror, isFunction, isInstance, warn, isClass, log } from '../../src'
import ProcessModel from './ProcessModel'

/**
 * - Process Que used in combination with other tools
 * - Iterable process tree
 */
class ProcessQue {
    constructor({ inputList = [], ProcessMod = undefined }, debug = false) {
        this.debug = debug
        this.ProcessMod = undefined
        // Allow user to pass their version of extended ProcessModel
        if (isClass(ProcessMod)) {
            if (ProcessMod.name === 'ProcessModel') {
                this.ProcessMod = ProcessMod
                if (this.debug) log('custom ProcessMod provided, and will be used instead')
            }
        }

        this.debug = debug
        this.d = null // last chained update
        this.errors = []
        this.inputListRaw = inputList instanceof Array ? inputList : []
        this.inputList = inputList instanceof Array ? inputList.map((n, inx) => {        
            if (isInstance(n)) {
                if (n instanceof ProcessModel) {
                    if (n.error) {
                        if (this.debug) onerror('[ProcessModel]', n.error)
                    }
                    return n
                } else return null
            } else {
                return !this.ProcessMod ? new ProcessModel(n, this.debug) : new this.ProcessMod(n, this.debug)  
            }
        }).filter(n => !!n) : []

        this.doneList = [] // list of [item,...]
        // add first item 
        this.item = isInstance(this.inputList[0]) ? this.inputList[0] instanceof ProcessModel ? this.inputList[0] : {} : {}

        if (!this.inputList.length) {
            if (this.debug) warn('[inputList][empty]')
        }
    }

    /**
     * Each callback has access to this and latest {item}, that can
     * @param {*} itemCB each item being processed (ammends item)
     * @param {*} onEachDoneCB each item successfully completed
     * @param {*} onEachErrorCB on item failed
     * @param {*} onAllFinishedCB // on all inputList already looped, regardless of failure
     * @returns {*} resolves promise once the process is completed
     */
    processQue(itemCB, onEachDoneCB, onEachErrorCB, onAllFinishedCB) {

        this.d = (async () => {

            for (let inx = 0; inx < this.inputList.length; inx++) {
                this.item = this.inputList[inx]
                if (!isInstance(this.item)) continue
                if (!(this.item instanceof ProcessModel)) continue
                this.item.processIndex = inx // add index to each item for tracking
                
                try {
                    if (!isFunction(itemCB)) {
                        onerror('itemCB is not a function')
                        continue
                    }
                    // each callback for the item has access to this and can update item
                    // or return it if using arrow fn()=>
                    let d = await itemCB.apply(this, [this.item, inx])
                    if (isInstance(d)) {
                        if (d instanceof ProcessModel) {
                            this.item = d
                        }
                    }

                    // access to latest item
                    if (!isFunction(onEachDoneCB)) continue

                    if (!(this.item instanceof ProcessModel)) {
                        onerror('[processQue]', 'item is not instance of ProcessModel, in onEachDoneCB')
                        continue
                    }

                    if (!this.item.error) {
                        this.item.success = true
                        await onEachDoneCB.apply(this, [this.item, inx])
                        // the outcome of item can change if we update it via callback              
                        this.doneList.push(this.item)
                    } else {
                        throw (this.item.error)
                    }

                } catch (err) {
                 
                    if (isInstance(this.item)) {
                        this.item.error = err
                        this.item.success = false
                    } else {
                        this.errors.push(err)
                    }
                
                    if (this.debug) onerror('[processQue]', err)
                    if (!isFunction(onEachErrorCB)) continue

                    if (!isInstance(this.item)) {
                        onerror('[processQue]', 'item !isInstance, in onEachErrorCB')
                        continue
                    }
             
                    if (!(this.item instanceof ProcessModel)) {
                        if (this.debug) onerror('[processQue]', 'item is not instance of ProcessModel, in onEachErrorCB')
                        continue
                    }

                    try {
                        await onEachErrorCB.apply(this, [err, this.item, inx])

                        this.doneList.push(this.item)
                    } catch (err) {
                        if (this.debug) onerror('[processQue]', 'should not return rejection inside onEachErrorCB')
                        continue
                    }

                }
            }

            let validDoneList = this.doneList.filter((item) => (isInstance(item) ? item instanceof ProcessModel : null))
            if (!isFunction(onAllFinishedCB)) return validDoneList

            if (validDoneList.length === this.doneList.length) {
                onAllFinishedCB.apply(this, [this.doneList])
            } else {
                if (this.debug) onerror('[processQue]', 'doneList, not all items were instanceof ProcessModel in onAllFinishedCB')
            }

            // if on inhandled errors lets reject final output
            if (this.errors.length) {
                return Promise.reject(this.errors.toString().replace(/,/g, ' | '))
            }
            return validDoneList
        })()

        return this // this.d << promise
    }

    /**
     * calling reset clears the states except for initial opts and reinitializes inputList models
     */
    reset() {
        this.d = null
        this.inputList = this.inputListRaw.map((n) => new ProcessModel(n))
        this.doneList = [] // list of [item,...]
        this.item = {}
        return this
    }
}

/**
 * @instance `new ProcessQue({...})` 
 */
const processQue = function ({ inputList, ProcessMod = undefined }, debug) {
    return new ProcessQue({ inputList, ProcessMod }, debug)
}
export { ProcessModel }
export { ProcessQue }
export { processQue }

/*
Example use
`

`
* */
