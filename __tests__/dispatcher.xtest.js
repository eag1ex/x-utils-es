/* eslint-env mocha */

import { dispatcher } from '../src'
import { describe, expect, it } from '@jest/globals'

describe('Evaluate dispatcher()', () => {

    it('Pass all criteria', (done) => {
        let uid = 'id_test'
        let ds = dispatcher(uid)

        expect(ds.delete).toBeInstanceOf(Function)
        expect(ds.subscribe).toBeInstanceOf(Function)
        expect(ds.next).toBeInstanceOf(Function)
        expect(ds.delete).toBeInstanceOf(Function)
        expect(ds.init).toBeInstanceOf(Function)
        expect(ds.isActive).toBeInstanceOf(Function)

        ds.next({ data: 'hello world' })
        ds.subscribe(function (data, _uid) {
            expect(data.data).toBe('hello world')
            expect(_uid).toBe(uid)
            // REVIEW  this.delete()  not calling onComplete
        }).onComplete((_uid) => {
            expect(_uid).toBe(uid)
            done()
        })
        expect(ds.isActive()).toBe(true)

        ds.delete()
        ds.next({})// never called          
    })
})
