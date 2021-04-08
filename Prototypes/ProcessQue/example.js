// require = require("esm")(module/*, options */)

import { log, delay, onerror } from '../../src'
import { processQue, ProcessModel } from '.'

/** Provide an array of items, where each item will become a ProcessModel */
let inputList = [
    { id: '123abc', data: { v: 1 }, list: [1, 2, 3] }, // new ProcessModel({...}) // (item)
    { id: '123efg', data: { v: 3 }, list: [1, 2, 3] } // new ProcessModel({...}) // (item)
]

/*
Optional extention of ProcessModel
The idea here is to process items in a tree like order while implementing own logic to outcome of each step
**/

// Extend your model and access it at each process step
class ProcessX extends ProcessModel {
    constructor(params, debug) {
        super(params, debug)
        this.update()
    }

    update() {
        if ((this.data || {}).v === 1) {
            this.data.name = 'john doe'
        }

    }
}

// NOTE is not providing ProcessMod{}, then ProcessModel{} with be the instance
processQue({ inputList, /** Optional */ ProcessMod: ProcessX }, false)
    .que(

        // NOTE each // STEP 1
        async function(item, inx) {
            const self = this.item

            // if (!(self instanceof ProcessX)) return 

            // this.item instanceof ProcessX
            // item instanceof ProcessX

            await delay(1000)

            // this.item.error = 'ups'
        },

        // NOTE each done // STEP 2
        function(item, index) {
        // this.item // or item
            const self = this.item
            //   if (!(self instanceof ProcessX)) return 

        },

        // NOTE each error // STEP 2
        function(error, item, index) {
        // this.item // or item
            onerror(error)
        },

        // NOTE all done // STEP 3 (final step)
        function(doneList) {
            const oks = doneList.filter(n => !n.error).length
            const errs = doneList.filter(n => !!n.error).length
            log({ oks, errs })

            // find out 

        }
    ).d.then(n => {
        log('all done')
        // process que resolved 
    }) 
