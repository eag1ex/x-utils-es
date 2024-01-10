
/* eslint-env mocha */

import { log, onerror, warn, alert, attention, debug, stack, errorTrace, loggerSetting, resetLogging, checkLoggerSetting, disableLogging } from '../src'
import { describe, expect, it, jest } from '@jest/globals'

// log testing 
// https://stackoverflow.com/questions/49096093/how-do-i-test-a-jest-console-log

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

        stack('on stack', true)
        stack('on stack')
        expect(console.log).toHaveBeenCalled()

        errorTrace({ data: 'some data' })
        errorTrace({ data: 'some data' }, true)
        expect(console.error).toHaveBeenCalled()
        done()
    })

    it('test logger option settings', (done) => {
        expect(loggerSetting).toBeInstanceOf(Function)
        resetLogging()
        expect(disableLogging()).toBe(true)

        // test invalid setting
        expect(loggerSetting('blah', 'off')).toBe(false)
        expect(loggerSetting('log', 'blah')).toBe(false)

        // no executed
        log()
        warn()
        onerror()
        alert()
        debug()
        attention()
        stack()
        errorTrace()
        // -----------
        expect(checkLoggerSetting('log')).toBe('off')
        expect(checkLoggerSetting('warn')).toBe('off')
        expect(checkLoggerSetting('warn')).toBe('off')
        expect(checkLoggerSetting('debug')).toBe('off')
        resetLogging()

        expect(loggerSetting('log', 'off')).toBe(true)
        expect(checkLoggerSetting('log')).toBe('off')
        expect(loggerSetting('log', 'on')).toBe(true)
        expect(checkLoggerSetting('log')).toBe('on')

        expect(resetLogging()).toBe(true)

        done()
    })

})
