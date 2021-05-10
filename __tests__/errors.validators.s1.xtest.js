// @ts-nocheck
/* eslint-disable no-array-constructor */
/* eslint-disable no-new-object */
/* eslint-disable no-new-wrappers */
/* eslint-env mocha */

// import assert from 'assert'
import { xError, referenceError } from '../src/x-utils.es'
import { describe, expect, it } from '@jest/globals'

describe('Evaluate Errors/ segment (1.)', () => {

    it('xError()', (done) => {

        expect(xError).toBeInstanceOf(Function)

        try {
            throw xError({ id: 123, name: 'MyError', message: 'my message', fileName: 'example.js', lineNumber: 20 })
        } catch (e) {
            expect(e).toBeInstanceOf(Error)
            expect(e.id).toBe('123')
            expect(e.name).toBe('MyError')
            expect(e.message).toBe('my message')
            expect(e.fileName).toBe('example.js')
            expect(e.lineNumber).toBe(20)
            expect(e.stack.toString()).toMatch(/MyError/gi)
            done()
        }

        try {
            throw xError()
        } catch (e) {
            expect(e).toBeInstanceOf(Error)
            expect(e.id).toBeUndefined()
            expect(e.name).toBe('XError')
            expect(e.message).toBe("")
            expect(e.fileName).toBeUndefined()
            expect(e.lineNumber).toBeUndefined()
            expect(e.stack.toString()).toMatch(/XError/gi)
            done()
        }

    })

    it('referenceError()', (done) => {
        expect(referenceError).toBeInstanceOf(Function)
        try {

            throw referenceError({ name: 'MyRefError', message: 'my message', fileName: 'example.js', lineNumber: 20, columnNumber: 50 })
        } catch (e) {

            expect(e).toBeInstanceOf(ReferenceError)
            expect(e.name).toBe('MyRefError')
            expect(e.message).toBe('my message')
            expect(e.fileName).toBe('example.js')
            expect(e.lineNumber).toBe(20)
            expect(e.columnNumber).toBe(50)
            expect(e.stack.toString()).toMatch(/MyRefError/gi)
            done()
        }

        try {
            throw referenceError()
        } catch (e) {
            expect(e).toBeInstanceOf(ReferenceError)
            expect(e.name).toBe('ReferenceError')
            expect(e.message).toBe("")
            expect(e.fileName).toBeUndefined()
            expect(e.lineNumber).toBeUndefined()
            expect(e.columnNumber).toBeUndefined()
            expect(e.stack.toString()).toMatch(/ReferenceError/gi)
            done()
        }
    })

})
