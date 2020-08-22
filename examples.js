
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
    exactKeyMatch,
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
    selectiveArray,
    resolver,
    onerror,
    stack,
    chunks,
    errorTrace
    /** 
     * `esm` > (default) and node support for with esnext,  // node -r esm examples 
     * `umd` > universal module/es2015 
    */
} from './umd'
    // or {} = require('./umd') 


/** */ log({ objectSize: objectSize({ a: 1, b: 2 }) }) // 2

/** */ log({ last: last([{}, { value: 1 }]) })

/** */ log({ copyBy: copyBy({ a: 1, b: 2, c: 3 }, ['a', 'c']) })

/** */ log({ isFunction1: isFunction(true), isFunction2: isFunction(Promise.resolve) })

/** */ timer(() => log('timer called'), 1000)

/** */ interval(() => log('interval called'), 100, 300)

/** */ log({ validID: validID('sdfkj 45 AMKD') })

/** */ log({ isNumberA: isNumber(-1), isNumberB: isNumber({}), isNumberC: isNumber(NaN) })

/** */ log({ isPromiseA: isPromise(function () { }), isPromiseB: isPromise(Promise), isPromiseC: isPromise(Promise.resolve()) })

/** */ log({ uniq: uniq([1, 1, 3, 'a', 'b', 'a', true, true, false, false, null, null, undefined, undefined]) })

/** */ log({ isObjectA: isObject(Date), isObjectB: isObject({ a: 1 }), isObjectC: isObject(new Error()), isObjectD: isObject((new class { })), isObjectF: isObject((new function () { })) })

/** */ log({ isArrayA: isArray([1, 2, 3]), isArrayB: isArray({ a: 1 }), isArrayC: isArray(new Array()) })

/** */ log({ isStringA: isString({}), isStringB: isString(new String()), isStringC: isString(NaN) })

/** */ log({ isFalsyA: isFalsy({}), isFalsyB: isFalsy(''), isFalsyC: isFalsy([]), isFalsyD: isFalsy([0]), isFalsyE: isFalsy(true), isFalsyF: isFalsy(1), isFalsyG: isFalsy(' '), isFalsyH: isFalsy(NaN) })

/** */ log({ copy1: copy({ a: 1, b:function(){} }), copy2: copy(undefined), copy3: copy(function () { }) })

/** */ async function f() {
    log('delay start')
    await delay(2000)
    log('delay end')
}; f()

/** */ log({ someKeyMatch1: someKeyMatch({ a: 2, b: 1, c: 2 }, { g: 1, e: 1, a: 1 }), someKeyMatch2: someKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, f: 1 }) })

/** */ log({ exactKeyMatch1: exactKeyMatch({ a: 2, b: 1, c: 2 }, { a: 1, b: 1, c: 1 }), exactKeyMatch2: exactKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, f: 1 }) })

/** */ log({ head: head([[{ value: 1 }, { value: 2 }]]), head2: head([[[1], [2]]]) })

/** */ log({ trueVal: trueVal([-1, 0, 1, {}, "hello", [], { name: 'jack' }, false, null, NaN, undefined, true]) })

    // depth is 2 levels [[],{}] > 3 levels not supported >`[[[1]],{a:{}}]`
/** */ log({ trueValDeep: trueValDeep([1, 0, [], {}, "hello", [0, undefined, -1, false, NaN, 1], { name: 'jack' }, false, null, undefined]) })


/** */ log({ trueProp: trueProp({ a: NaN, b: 0, c: false, d: -1, e: NaN, f: [], g: 'hello', h: {}, i: undefined, j: '' }) })

/** */ log({
    typeCheck1: typeCheck(undefined), typeCheck2: typeCheck({ val: 1 }), typeCheck3: typeCheck([1]), typeCheck4: typeCheck(Promise.resolve(null), false), typeCheck5: typeCheck(function () { }), typeCheck6: typeCheck(''),
    typeCheck7: typeCheck(false), typeCheck8: typeCheck(-1), typeCheck9: typeCheck(new Date(), false)
}) // { "type": typeof/promise, value: number }

/** */ log({ isEmpty1: isEmpty(new Error('err')), isEmpty2: isEmpty(-1), isEmpty3: isEmpty([1]), isEmpty4: isEmpty([]), isEmpty5: isEmpty({ v: 1 }), isEmpty6: isEmpty({}) })

/** */ log({ validDate1: validDate(new Date()), validDate2: validDate(Date()) }) // {true, false}

/** */ log({ isInstance1: isInstance([]), isInstance2: isInstance(function () { }), isInstance3: isInstance(new function () { }) }) // {false, false, true}

/** */ log({ hasProto: hasProto(NaN), hasProto2: hasProto(function () { }), hasProto3: hasProto(null) }) // {false, false, true}


/** */ log({ isClass1: isClass(Date), isClass2: isClass(function () { }), isClass3: isClass(new function () { }) }) // {true, true, false}

/** */ log({ hasPrototype1: hasPrototype(Object), hasPrototype2: hasPrototype(function () { }), hasPrototype3: hasPrototype(new function () { }) }) // {false, false, true}

/** */ log({chunks:chunks( [1,2,3,4,5,6] , 2) })

/** */ log({ selectiveArray: selectiveArray(['a.b.c.d'], [{ a: { b: { c: { d: 'hello' } } } }]) }) // ['hello']
/** */ log({ selectiveArray: selectiveArray(['a.b.c.d','a.b.c.e'], [{ a: { b: { c: { d: 'hello',e:'world' } } } }]) } ) // ['hello','world']
/** */log({selectiveArray: selectiveArray(['a.b.c.d','f.g'], [ { a: { b: { c: { d: 'hello' } } } },  { f: { g: 'world'} } ]) })  // ['hello','world']


/** */ log({ isError1: isError(Error()), isError2: isError(new Error('err')) })

/** */ resolver(()=>Promise.resolve({data:'hello resolver'}),5000,50).then(n=>{
    log({resolver:n})
})

resolver(()=>Promise.reject('rejected data'),5000,50).then(n=>{
    log({resolver:n})
})


/** */ onerror("ups")
/** */ warn("attention")

// timer(() =>  
//     /** */ stack('stack trace test')
// ,2000)

timer(() =>  
    /** */ errorTrace('stack trace error test'/**,true */)
,2000)

