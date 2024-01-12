
import {
    objectSize,
    stringSize,
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
    debug,
    attention,
    alert,
    selectiveArray,
    resolver,
    onerror,
    // @ts-ignore
    stack,
    chunks,
    errorTrace,
    flattenDeep,
    flatten,
    dupes,
    loop,
    // @ts-ignore
    disableLogging,
    // @ts-ignore
    resetLogging,
    error,
    loggerSetting,
    isTrue,
    isFalse,
    isUndefined,
    isNull,
    isBoolean,
    copyDeep,
    sq,
    cancelPromise,
    shuffle, 
    isQPromise,
    uniqBy,
    arrayWith,
    exFromArray,
    pickFromArray,
    dispatcher,
    withHoc
    /** 
     * `esm` > (default) and node support for with esnext,  // node -r esm examples 
     * `umd` > universal module/es2015 
    */
} from 'x-utils-es/umd'
// or {} = require('./umd') 
    
loggerSetting('log', 'off') // disable all log()
loggerSetting('log', 'on') // enable all log() // no effect if off was not set
debug('hello debug in green')
// loggerSetting('attention', 'off')
// disableLogging() // disable all loging below
// resetLogging() // reset previously disabled logging, has no effect if logging is already set or you called it before disableLogging() method

log(undefined)
log()
log('hello world')
warn('warn !')
error('ups i did it again')
attention('attention!')
alert('alert!')

/** simpleQ */ 
let defer = sq()
defer.promise.then(n => {
    log('[sq][resolve]', n)
}).catch(err => {
    onerror('[sq][reject]', err)
})

defer.resolve('it works')
// ----------- defer.reject('bummer') << will not fire after resolution

/** cancelPromise */
let df2 = sq()

cancelPromise({ defer: df2, // can use standard Promise, sq(), or node.js q.defer
    checkEvery: 200, // << log process on every 
    maxWait: 3000, // expire promise 
    message: 'waited too long', // << use this error message
    logging: true, // display process
    id: new Date().getTime(), // custom id to display or on error
    // @ts-ignore
    cbErr: function({ error, defer, id }) {
        // we use this.defer / defer / or df2.
        // update our reject message
        df2.reject(error)
    }
}) // returns promise
// can also do this
// .promise 

// or this
// @ts-ignore

df2.promise.then(n => {
    log('called', n)
}, err => {
    onerror('[cancelPromise]', err)
})      

df2.resolve('hello')
// --------------

/** dispatcher */
const ds = dispatcher(/** uid, debug */)
    .next({ data: 'hello world' })
    .subscribe((data, uid, index) => {
        log('on subscribe', data, uid, index)
    }).onComplete(uid => {
        log('completed', uid)
    })

ds.next({ data: 'hello again' })
ds.delete() 
ds.next({ data: 'never called' })
// -------------

/** withHoc */
function fn(a = 1, b = 2, c = 3) {
    return a + b + c
}

// example 1
let fnHocked = withHoc(fn)
log({ fnHocked: fnHocked() }) // > 6

// example 2
fnHocked = withHoc(fn, 4, 5, 6) // provided fn() arguments from upper caller
log({ fnHocked: fnHocked() }) // > 15

// example 3
fnHocked = withHoc(fn, 4, 5, 6) 
// above arguments  replaced with in final call 
log({ fnHocked: fnHocked(7, 8, 9) }) // > 24  
// -----------------------

// @ts-ignore
/** */ log({ pickFromArray: pickFromArray([NaN, undefined, { a: 1 }, 'hello', ['hello'], {}, 1234567890123456789012345678901234567890n, 'not selected'], [Boolean, 'hello', Object, { a: 1 }, BigInt]) }) // [ false,{ a: 1 },'hello',{},1234567890123456789012345678901234567890n ] 

log({ pickFromArray: pickFromArray([0, () => {}, { a: 1, b: 2 }, true, {}, 'not selected', false], [Function, { a: 1, b: 2 }, Boolean, Number]) }) // [ 0,()=>{}, { [length]: 0, { a: 1, b: 2 },true,false ]

log({ pickFromArray: pickFromArray([[1, 2, 3], [4, 5, 6], { b: 3 }, { a: 3 }, [2, 1, 3]], [[1, 2, 3], { a: 3 } ]) }) // [ [ 1, 2, 3], { a: 3 }, [ 2, 1, 3 ] ]

log({ pickFromArray: pickFromArray([[1], [2], [5], true], [[1], [2], [5], Boolean]) }) // [ [ 1 ],[ 2 ], [ 5 ],true]

log({ pickFromArray: pickFromArray([{ data: ['hello'], b: false }, { data: {} }, { data: 1 }, { data: { d: 2 } }, { data: ['world'] }], [{ data: Array }]) }) 
// >   [{ data: [ 'hello'], b:false },{ data: [ 'world' ] } ]

log({ pickFromArray: pickFromArray([{ data: { a: 1 }, a: 1, c: 1 }, { data: 1 }, { data: { d: 2 }, a: 1 }, { data: { b: 2 } }, false, 1, 2, [], {}], [{ data: Object, a: 1 }]) }) 
// > [{ data: { a: 1 }, a: 1, c: 1 }, { data: { d: 2 }, a: 1 }]

/** */ log({ exFromArray: exFromArray([{ a: 1, c: 5 }, { a: 10 }, { b: 2 }, { c: 1, a: 2 }], ['a', 'b']) }) // [ { c: 5 }, undefined, undefined, { c: 1 }]
/** */ log({ arrayWith: arrayWith([[], { a: undefined }, { b: 3 }, { a: 1 }], 'a') }) //  [ { a: undefined }, { a: 1 }] 

/** */ log({ uniqBy: uniqBy([{ a: 1, b: 2 }, 1, { b: 1 }, 5, { a: 1 }, null, { a: 1, b: 2 } ], 'a') }) //  [ { a: 1, b: 2 }, 1, { b: 1 }, 5, null]

/** */ log({ shuffle: shuffle(['1', '2', 3, 4, 5]) }) // random order

/** */ log({ copyDeep: copyDeep({ el: { abc: { test: { abcd: null } } } }), copyDeep2: copyDeep([{ a: (new function() { this.b = 1 }()) } ]) })

/** */ log({ isBoolean: isBoolean(true), isBoolean2: isBoolean(1), isBoolean3: isBoolean(new Boolean(true)) }) // true,false,false   

/** */ log({ isFalse1: isFalse(true), isFalse2: isFalse(false) }) // false,true    

/** */ log({ isTrue1: isTrue(true), isTrue2: isTrue(false), isTrue3: isTrue(1) }) // true,false,true

/** */ log({ isNull: isNull(null), isNull2: isNull(undefined), isNull3: isNull(true) }) // true,false,fale

/** */ log({ isUndefined: isUndefined(undefined), isUndefined2: isUndefined(true), isUndefined3: isUndefined(null) }) // true,false,false  

/** */ log({ loop: loop(5, inx => {
    return 10 + inx
}) }) //  [10, 11, 12, 13, 14]

log({ loop: loop(3, inx => {
    if (inx === 3) return { break: true }
    return { [inx]: inx + 1 }
}) }) //  [ { '0': 1 }, { '1': 2 }, { '2': 3 } ] 

/** */ log({ objectSize: objectSize({ a: 1, b: 2 }), objectSize2: objectSize((new function() {}())) }) // 2

// @ts-ignore
/** */ log({ stringSize1: stringSize(-1), stringSize2: stringSize('abc'), stringSize3: stringSize(new String(' ')) }) // 2

/** */ log({ last: last([{}, { value: 1 }]) })

/** */ log({ copyBy: copyBy({ a: 1, b: 2, c: 3 }, ['a', 'c']) })

/** */ log({ isFunction1: isFunction(true), isFunction2: isFunction(Promise.resolve) })

/** */ timer(() => log('timer called'), 1000)

/** */ interval(() => log('interval called'), 100, 300)

/** */ log({ validID: validID('sdfkj 45 AMKD') })

/** */ log({ isNumberA: isNumber(-1), isNumberB: isNumber({}), isNumberC: isNumber(NaN), isNumberD: isNumber(null) })

/** */ log({ isPromiseA: isPromise(function () { }), isPromiseB: isPromise(Promise), isPromiseC: isPromise(Promise.resolve()), isPromiseD: isPromise(sq()) }) // false,false,true,true

/** */ log({ isQPromise: isQPromise(function () { }), isQPromiseB: isQPromise(Promise), isQPromiseC: isQPromise(Promise.resolve()), isQPromiseD: isQPromise(sq()) }) // false,false,true,true

/** */ log({ uniq: uniq([1, 1, 3, 'a', 'b', 'a', true, true, false, false, null, null, undefined, undefined]) })

/** */ log({ isObjectA: isObject(Date), isObjectB: isObject({ a: 1 }), isObjectC: isObject(new Error()), isObjectD: isObject((new class { }())), isObjectF: isObject((new function () { }())) })

/** */ log({ isArrayA: isArray([1, 2, 3]), isArrayB: isArray({ a: 1 }), isArrayC: isArray(new Array()) })

/** */ log({ isStringA: isString(null), isStringB: isString(new String()), isStringC: isString(NaN), isStringD: isString(false) })

/** */ log({ isFalsyA: isFalsy({}),
    isFalsyB: isFalsy(''),
    isFalsyC: isFalsy([]),
    isFalsyD: isFalsy([0]),
    isFalsyE: isFalsy(true),
    isFalsyF: isFalsy(1),
    isFalsyG: isFalsy(' '),
    isFalsyH: isFalsy(NaN), 
    isFalsyJ: isFalsy((new function() {}())) })

/** */ log({ copy1: copy({ a: 1, b: function() {} }), copy2: copy(undefined), copy3: copy(function () { }) })

/** */ async function f() {
    log('delay start')
    await delay(2000)
    log('delay end')
} f()

/** */ log({ someKeyMatch1: someKeyMatch({ a: 2, b: 1, c: 2 }, { g: 1, e: 1, a: 1 }), someKeyMatch2: someKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, f: 1 }) })

/** */ log({ exactKeyMatch1: exactKeyMatch({ a: 2, b: 1, c: 2 }, { b: undefined, a: 1, c: 1 }), exactKeyMatch2: exactKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, f: 1 }) })

/** */ log({ head: head([[{ value: 1 }, { value: 2 }]]), head2: head([[[1], [2]]]) })

/** */ log({ trueVal: trueVal([-1, 0, 1, {}, "hello", [], { name: 'jack' }, false, null, NaN, undefined, true]) })

// depth is 2 levels [[],{}] > 3 levels not supported >`[[[1]],{a:{}}]`
/** */ log({ trueValDeep: trueValDeep([1, 0, [], {}, "hello", [0, undefined, -1, false, NaN, 1], { name: 'jack' }, false, null, undefined]) })

/** */ log({ trueProp: trueProp({ a: NaN, b: 0, c: false, d: -1, e: NaN, f: [], g: 'hello', h: {}, i: undefined, j: '' }) })

/** */ log({
    typeCheck1: typeCheck(undefined),
    typeCheck2: typeCheck({ val: 1 }),
    typeCheck3: typeCheck([1]),
    typeCheck4: typeCheck(Promise.resolve(null), false),
    typeCheck5: typeCheck(function () { }),
    typeCheck6: typeCheck(''),
    typeCheck7: typeCheck(false),
    typeCheck8: typeCheck(-1),
    typeCheck9: typeCheck(new Date(), false)
}) // { "type": typeof/promise, value: number }

/** */ log({ isEmpty1: isEmpty(new Error('err')), isEmpty2: isEmpty(-1), isEmpty3: isEmpty([1]), isEmpty4: isEmpty([]), isEmpty5: isEmpty({ v: 1 }), isEmpty6: isEmpty({}) })

/** */ log({ validDate1: validDate(new Date()), validDate2: validDate(Date()) }) // {true, false}

/** */ log({ isInstance1: isInstance([]), isInstance2: isInstance(function () { }), isInstance3: isInstance(new function () { }()) }) // {false, false, true}

/** */ log({ hasProto: hasProto(NaN), hasProto2: hasProto(function () { }), hasProto3: hasProto(null) }) // {false, false, true}

/** */ log({ isClass1: isClass(Date), isClass2: isClass(function () { }), isClass3: isClass(new function () { }()) }) // {true, true, false}

/** */ log({ hasPrototype1: hasPrototype(Object), hasPrototype2: hasPrototype(function () { }), hasPrototype3: hasPrototype(new function () { }()) }) // {false, false, true}

/** */ log({ chunks: chunks([1, 2, 3, 4, 5, 6], 2) })

/** */ log({ selectiveArray: selectiveArray(['a.b', 'b.c'], [ { a: { b: 'hello' }, b: { c: 'hello' } }, { a: { b: 'world' }, b: { c: 'world' } } ]) })

/** */ log({ selectiveArray: selectiveArray(['a.b', 'a.b'], [ { a: { b: 'hello' }, b: { c: 'hello' } }, { a: { b: 'world' }, b: { c: 'world' } } ]) 
})
/** */ log({ selectiveArray: selectiveArray(['a.b', 'b.c'], [ { a: { b: 'hello' }, b: { c: 'world' } }]) }) 
let [b, c] = Array.from(flatten(selectiveArray(['a.b', 'b.c'], [{ a: { b: 'hello' }, b: { c: 'world' } }]))).values()
console.log('b/c example', b, c)

/** */ log({ flattenDeep: flattenDeep([[[['hello']]]]) }) // ['hello']
/** */ log({ flatten: flatten([[['hello']]]) }) // [['hello']]

/** */ log({ isError1: isError(Error()), isError2: isError(new Error('err')) })

/** */ resolver(() => Promise.resolve({ data: 'hello resolver' }), 5000, 50).then(n => {
    log({ resolver: n })
})

/** */ resolver(() => Promise.reject('rejected data'), 5000, 50).then(n => {
    log({ resolver1: n })
})
/** */
// let tempData = undefined

// let fn=()=> tempData

// resolver(fn,4000,20).then(n=>{
//     log({resolver2:n})
// })
// setTimeout(function(){
//     console.log('setTimeout called')
//     tempData = 'hello world'
// },10000)
/** */

/** */ onerror("ups")
/** */ warn("attention")

// timer(() =>  
//     /** */ stack('stack trace test')
// ,2000)

timer(() =>  
    /** */ errorTrace('stack trace error test'/** ,true */)
, 2000)

log({ dupes: dupes('hello world', 3) }) // ['hello world','hello world','hello world']
