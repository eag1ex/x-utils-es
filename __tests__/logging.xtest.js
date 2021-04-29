
/* eslint-env mocha */

// import assert from 'assert'
import { log, onerror, warn, alert, attention, debug, stack, errorTrace, loggerSetting, resetLogging, checkLoggerSetting } from '../src'
import { describe, expect, it, jest } from '@jest/globals'

describe('Evaluate logging methods', () => {
  
    it('Pass all criteria', (done) => {

        console.log = jest.fn()
        log('hello')
        expect(console.log).toHaveBeenCalled()

        console.error = jest.fn()
        onerror('ups')
        expect(console.error).toHaveBeenCalled()

        warn('warning')
        expect(console.log).toHaveBeenCalled()

        alert('on alert')
        expect(console.log).toHaveBeenCalled()

        attention('on attention')
        expect(console.log).toHaveBeenCalled()

        debug('on debug')
        expect(console.log).toHaveBeenCalled()
        
        stack('on stack')
        expect(console.log).toHaveBeenCalled()

        errorTrace({ data: 'some data' }, true)
        expect(console.error).toHaveBeenCalled()
        done()
    })

    it('loggerSetting()/resetLogging()', (done) => {
        expect(loggerSetting).toBeInstanceOf(Function)
        
        expect(loggerSetting('log', 'off')).toBe(true)
        expect(checkLoggerSetting('log')).toBe('off') 
        expect(loggerSetting('log', 'on')).toBe(true)
        expect(checkLoggerSetting('log')).toBe('on')
        
        expect(resetLogging()).toBe(true)

        done()
    })

})

// log testing 
// https://stackoverflow.com/questions/49096093/how-do-i-test-a-jest-console-log