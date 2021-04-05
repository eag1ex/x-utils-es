
import { log, delay, onerror } from '../src'
import { processQue, ProcessModel } from '../methods/ProcessQue'

let inputList = [
    { id: '123abc', data: { v: 1 }, list: [1, 2, 3] },
    { id: '123efg', data: { v: 3 }, list: [1, 2, 3] }
]

processQue({ inputList }, true)
    .processQue(
        // each
        async function(item, inx) {

            await delay(1000)
            this.item.error = 'ups'
            // log('this.item', this.item)
        },
        // each done
        function(item, index) {
            // this.item // or item
        },
        // each error
        function(error, item, index) {
            // this.item // or item
            onerror(error)
        },
        // all done
        function(doneList) {
           
        }
    ).d.then(n => {
        log('all done')
    })
