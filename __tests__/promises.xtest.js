/* eslint-env mocha */

// import assert from 'assert'
import { sq, cancelPromise, delay, resolver } from '../src'
import { describe, expect, it, jest } from '@jest/globals'

describe('Evaluate Promises', () => {
  
    it('delay()', async (done) => {
        jest.setTimeout(300)
        await delay(250)
        expect(true).toBe(true)
        done()
    })

    it('sq()', async (done) => {
        let defer = sq()
        expect(defer instanceof Promise).toBe(true)
        expect(defer.resolve).toBeInstanceOf(Function)
        expect(defer.reject).toBeInstanceOf(Function)
        expect(defer.promise).toBeInstanceOf(Promise)

        defer.resolve(true)
        await defer
        expect(defer).resolves.toBe(true)

        defer = sq()
        defer.reject(true)
            .promise.catch((err) => {
                expect(err).toBe(true)
                expect(defer.entity).toBe('SimpleQ')      
                done()
            })
      
    })

    it('cancelPromise()', (done) => {

        jest.setTimeout(1500)
        let def = sq()
        expect(cancelPromise).toBeInstanceOf(Function)
        let fn1 = () => {
            cancelPromise({ defer: def, // can use standard Promise, sq(), or node.js q.defer
                checkEvery: 200, // << log process on every 
                maxWait: 3000, // expire promise 
                message: 'waited too long', // << use this error message
                logging: true, // display process
                id: new Date().getTime(), // custom id to display or on error
                // @ts-ignore
                cbErr: function({ error, defer, id }) {
                    // we use this.defer / defer / or df2.
                    // update our reject message
                    defer.reject('rejected')
                }
            }) // returns promise
    
            def.catch((err) => {
                expect(err).toBe('rejected')
            })
        }    

        let fn2 = () => {
            cancelPromise({ defer: def, // can use standard Promise, sq(), or node.js q.defer
                checkEvery: 200, // << log process on every 
                maxWait: 1000, // expire promise 
                message: 'waited too long', // << use this error message
                logging: true, // display process
                id: new Date().getTime(), // custom id to display or on error
                // @ts-ignore
                cbErr: function({ error, defer, id }) {
                    // we use this.defer / defer / or df2.
                    // update our reject message
                    defer.reject('rejected')
                }
            }) // returns promise
            def.resolve(true)
            def.then((n) => {
                expect(n).toBe(true)
                done()
            })
        }  

        fn1()
        fn2()
    })

    it('resolve()', async (done) => {
        jest.setTimeout(5000)

        // resolved
        let fn1 = async () => {       
            let defer = sq()
            let o = resolver(() => defer.promise, 700, 100)
            await delay(710)
            defer.resolve(true)
            expect(await o).toBe(true)
        }

        // rejected
        let fn2 = async () => {
            let defer = sq()
            let o = resolver(() => defer.promise, 500, 100)
            await delay(400) // fake wait
            defer.reject(true)
            expect(await o).toStrictEqual({ error: true })
        }

        // not resolved on time
        let fn3 = async () => {
            let defer = sq()
            let o = await resolver(() => defer.promise, 500, 100)
            expect(o).toBe(undefined)           
        }

        await fn1()
        await fn2()
        await fn3()
        done()
    })
      
})
