/* eslint-env mocha */

// import assert from 'assert'
import { sq } from '../src'
import { describe, expect, it } from '@jest/globals'

describe('Evaluate sq()', () => {
  
    it('Pass all criteria', async (done) => {
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
})
