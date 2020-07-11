
import {
    objectSize,
    last,
    copyBy,
    timer,
    interval,
    validID,
    isNumber,
    isPromise,
    uniq,
    isFunction,
    isObject,
    isArray,
    isString,
    isFalsy,
    copy,
    delay,
    someKeyMatch,
    exectKeyMatch,
    head,
    trueVal,
    trueValDeep,
    trueProp,
    typeCheck,
    isEmpty,
    isError,
    validDate,
    isClass,
    hasPrototype,
    isInstance,
    hasProto,
    log,
    warn,
    onerror,
    error
    /** 
     * `esm` > (default) and node support for with esnext,  // node -r esm examples 
     * `umd` > univarsal module/es2015 
    */
} from './src/x-utils.es'
    // or {} = require('./umd') 


/** */ log({ objectSize: objectSize({ a: 1, b: 2 }) }) // 2

/** */ log({ last: last([{}, { value: 1 }]) })

/** */ log({ copyBy: copyBy({ a: 1, b: 2, c: 3 }, ['a', 'c']) })

/** */ log({ isFunction1: isFunction(true), isFunction2: isFunction(function () { }) })

/** */ timer(() => log('timer called'), 2000)

/** */ interval(() => log('interval called'), 100, 300)

/** */ log({ validID: validID('sdfkj 45 AMKD') })

/** */ log({ isNumberA: isNumber(-1), isNumberB: isNumber({}), isNumberC: isNumber(NaN) })

/** */ log({ isPromiseA: isPromise(function () { }), isPromiseB: isPromise(Promise), isPromiseC: isPromise(Promise.resolve()) })

/** */ log({ uniq: uniq([1, 1, 3, 'a', 'b', 'a']) })

/** */ log({ isObjectA: isObject(Date), isObjectB: isObject({ a: 1 }), isObjectC: isObject(new Error('ups')), isObjectD: isObject((new class { })), isObjectF: isObject((new function () { })) })

/** */ log({ isArrayA: isArray([1, 2, 3]), isArrayB: isArray({ a: 1 }) })

/** */ log({ isStringA: isString({}), isStringB: isString('') })

/** */ log({ isFalsyA: isFalsy({}), isFalsyB: isFalsy(''), isFalsyC: isFalsy([]), isFalsyD: isFalsy([0]), isFalsyE: isFalsy(true), isFalsyF: isFalsy(1), isFalsyG: isFalsy(' '), isFalsyH: isFalsy(NaN) })

/** */ log({ copy1: copy({ a: 1 }), copy2: copy(undefined) })

/** */ async function f() {
    log('delay start')
    await delay(2000)
    log('delay end')
}; f()

/** */ log({ someKeyMatch1: someKeyMatch({ a: 2, b: 1, c: 2 }, { g: 1, e: 1, a: 1 }), someKeyMatch2: someKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, f: 1 }) })

/** */ log({ exectKeyMatch1: exectKeyMatch({ a: 2, b: 1, c: 2 }, { a: 1, b: 1, c: 1 }), exectKeyMatc2: exectKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, f: 1 }) })

/** */ log({ head: head([[{ value: 1 }, { value: 2 }]]) })

/** */ log({ trueVal: trueVal([1, 2, 3, {}, "hello", [], { name: 'jack' }, false, null, NaN, undefined]) })

    // depth is 2 leves [[],{}] > 3 levels not suported >`[[[1]],{a:{}}]`
/** */ log({ trueValDeep: trueValDeep([1, 0, 2, 3, [], "hello", [0, undefined, -1, false, NaN, 1], { name: 'jack' }, false, null, undefined]) })


/** */ log({ trueProp: trueProp({ a: NaN, b: 0, c: false, d: -1, e: NaN, f: [], g: 'hello', h: {}, i: undefined }) })

/** */ log({
    typeCheck1: typeCheck({}), typeCheck2: typeCheck({ val: 1 }), typeCheck3: typeCheck([1]), typeCheck4: typeCheck(Promise.resolve(null)), typeCheck5: typeCheck(function () { }), typeCheck6: typeCheck(''),
    typeCheck7: typeCheck(false), typeCheck8: typeCheck(-1), typeCheck9: typeCheck(Date)
}) // { "type": typeof/promise, value: number }

/** */ log({ isEmpty1: isEmpty(new Error('err')), isEmpty2: isEmpty(-1), isEmpty3: isEmpty([1]), isEmpty4: isEmpty([]), isEmpty5: isEmpty({ v: 1 }), isEmpty6: isEmpty({})})

/** */ log({ validDate1: validDate(new Date()), validDate2: validDate(new Date('')) }) // {true, false}

/** */ log({ isInstance1: isInstance({}), isInstance2: isInstance(function () { }), isInstance3: isInstance(new function () { }) }) // {false, false, true}

/** */ log({ hasProto: hasProto({}), hasProto2: hasProto(function () { }), hasProto3: hasProto(new function () { }) }) // {false, false, true}


/** */ log({ isClass1: isClass(Date), isClas2: isClass(function () { }), isClas3: isClass(new function () { }) }) // {false, false, true}

/** */ log({ hasPrototype1: hasPrototype(Date), hasPrototyp2: hasPrototype(function () { }), hasPrototyp3: hasPrototype(new function () { }) }) // {false, false, true}

/** */ log({ isError1: isError(Error()), isError2: isError(new Error('err')) })

/** */ error("ups")
/** */ warn("attention")

