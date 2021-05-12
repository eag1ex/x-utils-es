/* eslint-env mocha */

import { sq, cancelPromise, delay, resolver, disableLogging, loggerSetting, asJson } from '../src'
import { describe, expect, it, jest } from '@jest/globals'
import q from 'q'

disableLogging()
loggerSetting('error', 'off')

describe('Evaluate Promises', () => {

    it('delay()', async (done) => {
        jest.setTimeout(300)
        expect(await delay(false)).toBe(true)
        expect(await delay(250)).toBe(true)
        done()
    })

    it('sq()', async (done) => {
        let defer = sq()
        expect(defer instanceof Promise).toBe(true)
        expect(defer.resolve).toBeInstanceOf(Function)
        expect(defer.reject).toBeInstanceOf(Function)
        expect(defer.promise).toBeInstanceOf(Promise)

        defer.resolve(1)
        await defer
        expect(defer).resolves.toBe(1)

        defer = sq()
        defer.resolve(3)    
        await defer
        expect(defer).resolves.toBe(3)   

        defer = sq()
        defer.reject(2)
            .catch((err) => {
                expect(err).toBe(2)
                expect(defer.entity).toBe('SimpleQ')
                done()
            })
         
    })

    it('resolver()', async (done) => {

        jest.setTimeout(5000)

        // resolved
        let defer = sq()
        let o = resolver(() => defer.promise, 700, 100)
        await delay(500)
        defer.resolve(true)
        expect(await o).toBe(true)

        // rejected
        defer = sq()
        o = resolver(() => defer.promise, 500, 100)
        await delay(300) // fake wait
        defer.reject(new Error('my error'))
            .catch(err => {})
        let oo = await o    
        expect(oo).toHaveProperty('error')
        expect(oo.error.toString()).toBe('Error: my error')

        // rejected
        defer = sq()
        o = resolver(() => defer.promise, 500, 100)
        await delay(300) // fake wait
        defer.reject({ error: 'upsy' })
            .catch(err => {})
        oo = await o    
        expect(oo).toHaveProperty('error')
        expect(oo.error).toBe('upsy')

        defer = sq()
        o = resolver(() => defer.promise, 500, 100) 
        await delay(300) // fake wait
        // defer.reject(true)
        //     .catch(err => {})

        expect(await o).toBe(undefined)

        // not resolved on time
        defer = sq()
        o = await resolver(() => defer.promise, 500, 100)
        await delay(700) 
        defer.resolve(true)
        expect(o).toBe(undefined)

        try {
            o = await resolver(null, 500, 100)
        } catch (err) {
            expect(err).toBe('fn() must be callable')
        }

        done()
    })

    it('cancelPromise()', async (done) => {

        jest.setTimeout(3000)
       
        expect(cancelPromise).toBeInstanceOf(Function)

        let fn1 = async () => {
            let def = sq()
            cancelPromise({
                defer: def, // can use standard Promise, sq(), or node.js q.defer
                checkEvery: 200, // << log process on every 
                maxWait: 500, // expire promise 
                message: 'waited too long', // << use this error message
                logging: true, // display process
                id: new Date().getTime(), // custom id to display or on error
                // @ts-ignore
                cbErr: function ({ error, defer, id }) {
                    // we use this.defer / defer / or df2.
                    // update our reject message
                    defer.reject('rejected')
                }
            }) // returns promise
            try {
                await def
            } catch (err) {
                expect(err).toBe('rejected')
            }

        }

        let fn2 = async () => {
            let def = sq()
            cancelPromise({
                defer: def, // can use standard Promise, sq(), or node.js q.defer
                checkEvery: 200, // << log process on every 
                maxWait: 1000, // expire promise 
                message: 'waited too long', // << use this error message
                logging: true, // display process
                id: new Date().getTime(), // custom id to display or on error
                // @ts-ignore
                cbErr: function ({ error, defer, id }) {
                    // we use this.defer / defer / or df2.
                    // update our reject message
                    defer.reject('rejected')
                }
            }) // returns promise
            def.resolve(true)
            await def
            expect(await def).toBe(true)
        }

        let fn3 = async () => {
            let d = cancelPromise({
                defer: () => { }, // can use standard Promise, sq(), or node.js q.defer
                checkEvery: 200, // << log process on every 
                maxWait: 1000, // expire promise 
                message: 'waited too long', // << use this error message
                logging: true, // display process
                id: new Date().getTime(), // custom id to display or on error
                // @ts-ignore
                cbErr: function ({ error, defer, id }) {
                    // we use this.defer / defer / or df2.
                    // update our reject message
                    defer.reject('rejected')
                }
            })

            try {
                await d
            } catch (err) {
                expect(err).toBe('{defer,maxWait,cbErr} must be provided')
            }
        }

        let fn4 = async () => {
            
            let def = q.defer()
            cancelPromise({
                defer: def, // can use standard Promise, sq(), or node.js q.defer
                checkEvery: 200, // << log process on every 
                maxWait: 1000, // expire promise 
                message: 'waited too long', // << use this error message
                logging: true, // display process
                id: new Date().getTime(), // custom id to display or on error
                // @ts-ignore
                cbErr: function ({ error, defer, id }) {
                    // we use this.defer / defer / or df2.
                    // update our reject message
                    defer.reject('rejected')
                }
            }) // returns promise
            def.resolve(true) 
            expect(await def.promise).toBe(true)
        }

        await fn1()
        await fn2()
        await fn3()
        await fn4()
        done()
    })

})
