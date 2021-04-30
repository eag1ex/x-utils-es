## x-utils-es

| Statements                  | Branches                | Functions                 | Lines                |
| --------------------------- | ----------------------- | ------------------------- | -------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-93.15%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-82.84%25-yellow.svg) | ![Functions](https://img.shields.io/badge/Coverage-94.48%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-95.63%25-brightgreen.svg)    |


Simple javascript, lodash alternative library, to help with type validation, with no dependencies.
* esmodule supports `esnext`, `es2015` and `umd`
* Lightweight, minified
&nbsp;
&nbsp;


### Install
```shell
$/ npm i x-utils-es
```
&nbsp;
&nbsp;


### Why use it ?
* Validate data
* Good naming conventions
* Similar to lodash
* No dependencies
* UMD support so you can use in most environments: *(AMD, common.js/Node, or browser)*
&nbsp;
&nbsp;


### Version support
For production with gulp/webpack ..etc, use source (1) version, otherwise use any other.

```js
import {} from 'x-utils-es' // src e-module  (1)
import {} from 'x-utils-es/esm' // (minified) (2)
import {} from 'x-utils-es/umd' // for browser and commonjs support (minified) (3)
const {} require('x-utils-es/umd') // with node/commonjs support 

// browser
<script src="..path/umd"></script>
<script>
    const {...} = window.xutils // get access to all utils
</script>
```
&nbsp;
&nbsp;


### Usage and Examples
For full detail refer to **website docs**: [utils.eaglex.net](https://utils.eaglex.net)

```js

// All available methods
import { ... } from 'x-utils-es' 

objectSize({ a: 1, b: 2 }) }) // 2
stringSize('abc') // 3 
head([[{ value: 1 }, { value: 2 }]]) // { value: 1 }
shuffle(['1',2,3,'4']) // returns random order
flatten([['hello world']]) // ['hello world']
flattenDeep([[[['hello world']]]) // ['hello world']
last([{},{},[1], { value: 1 }]) // { value: 1 }
copyBy({ a: 1, b: 2, c: 3, d: 1 ,e: 1 }, ['a', 'c']) } // {a: 1, c: 3}
copy(new Array(1,2,3)) //=> / [1,2,3]
copyDeep([{ a: (new function(){this.b=1}()) }]) //=>  [ { a: {b:1} } ]
asJson( { a:{ b: { c:'hello world' } } } )
/**
 {
  "a": {
    "b": {
      "c": "hello world"
    }
  }
}
 **/
isFunction(()=>{}) // true
timer(() => log('timer called'), 2000) // called time expiry

// just like setInterval, calls `every` time, and clears interval on `endTime` 
interval(() => log('interval called'), 100, 300) 
validID('sdfkj 45 AMKD') // sdfkj45amkd
isNumber(-1) // true

// SimpleQ / instanceOf Promise & SimpleQ
sq().resolve().then(log) 
sq() instanceof Promise === true

isPromise( Promise.resolve()) ) // true
isQPromise( q.defer() ) // true (refering to node.js q )

// How long to wait before we exit synchronous process
let def = sq()
cancelPromise({ defer:def, // can use standard Promise, sq(), or node.js q.defer
                checkEvery:200,  // log process on every 
                maxWait:3000,  // expire promise 
                message:'waited too long',  // use this error message
                logging:true, // display process
                id: new Date().getTime(), // custom id to display or on error
                cbErr:function({error,defer,id}){
                    // update our reject message
                    def.reject(error) 
                    // defer.reject(error)  // same
                    // this.defer.reject(error)  // same
                }
             })//.promise // returns promise

             // def.resolve()
             // or this
             def.promise.then(n=>{
                 log('not called')
             },err=>{
                onerror('[cancelPromise]',err)
             })   

uniq([1, 1, 3, 'a', 'b', 'a', null, null, true, true]) // [1,3,'a','b',null,true]
uniqBy([{ a: 1, b: 2 }, 1, { b: 1 }, 5, { a: 1 }, null, { a: 1, b: 2 } ], 'a') 
// [ { a: 1, b: 2 }, 1, { b: 1 }, 5, null ]

isObject({}) // true
isArray([]) // true
chunks( [1,2,3,4,5,6] , 2) // [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]
isString('') // true
isRegExp(/abc/) // true

isFalsy({}) // true
isFalsy({a:1}) // false

isTrue(undefined) // false
isTrue(5) // true
isTrue(true) // true

isFalse(false) // true
isFalse(-1) // true
isFalse(true) // false

isBoolean(undefined) // false
isBoolean(false) // true
isBoolean(new Boolean(false)) // true 

isNull(null) // true
isNull(undefined) // false

isUndefined(undefined) // true
isUndefined(null) // false

await delay(2000)
// continue

truthFul({ a: undefined, b: 1, c: {}, d:undefined }) // { b: 1, c: {} }

inIndex('ab cd eFG', [/fg/i, /\sCD\s/i, /ab/]) // 3 < found in three pattern arrays
inIndex('abcdeFG', [/%fg/i, /1CD/i, /ab/]) // 1 (last)

matched('aabc', /^abc/)) // false
matched('aaBC', /abc/i) // true

someKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, a: 1 })  //=>  true , {a} was found
someKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, a: 1 }, ()=>1-1===1) 
//=>  false, because callback return !!false

exactKeyMatch({ a: 2, b: 1, c: 2 }, { c: 1, a: 1, b: 1 }) //=>  true
exactKeyMatch({ a: 2, b: 1 }, { c: 1, a: 1, b: 1 }) //=> false

trueVal([-1, 0,1 {}, "hello", [], { name: 'jack' }, false, null, NaN, undefined,true]) 
//=> [1,'hello',{ name: 'jack' },true]

trueValDeep([1, 0, [], {}, "hello", [0, undefined, -1, false, NaN, 1], { name: 'jack' }, false, null, undefined])
//=> [ 1, 'hello', [ 1 ], { name: 'jack' } ] }


// New object with only true entities `{prop:values,...}`,
trueProp({ a: NaN, b: 0, c: false, d: -1, e: NaN, f: [], g: 'hello', h: {}, i: undefined, j:'' })
//=> {g: 'hello'}


// Evaluate given data and return type/value object
typeCheck({a:1,b:2}) // {type:'object', value:2, primitiveValue: Object() }
typeCheck([2,3],false) // {type:'array', value:2, primitiveValue: Object() }
typeCheck(Date,false) // {type:'date', value:1, primitiveValue: Date() }
typeCheck(2) // {type:'number', value:2, primitiveValue: Number() }
typeCheck(true) // {type:'boolean', value:1, primitiveValue: Boolean() }
typeCheck(null) // {type:'object', value:0, primitiveValue: Object() }
typeCheck(undefined) // {type:'undefined', value:0, primitiveValue: undefined }
typeCheck(function () { }) // {type:'function', value:1, primitiveValue: Function }
typeCheck(Promise.resolve(),false) // {type:'promise', value:1, primitiveValue: Function }
// .. full list refer to docs

// Check if given item has some value, set of props, or length
isEmpty({}) // true
isEmpty({a:1}) // false
isEmpty([]) // true
isEmpty([0]) // false
isEmpty(true) // false

isError(Error()) // true
isError(new Error()) // true

// Testing if item is new (instance)
isInstance({}) // false
isInstance(new function(){}) // true 
isInstance(new class(){} ) // true 
isInstance(function () { }) // false
isInstance([]) // false

// alias of isClass() method, 
isClass/hasPrototype(function(){}) // true 
hasPrototype(new function(){}) // false
hasPrototype(Date) // true
hasPrototype(Object) // true

// Check if item has __proto__
hasProto({}) // true
hasProto('') // true
hasProto(-1) // true
hasProto(undefined) // false
hasProto(null) // false
hasProto(NaN) // true

validDate(new Date()) // true


// Select data from array of objects by reference, and go down recursively in order of selectBy references
selectiveArray(['a.b'], [ { a: { b:'hello' }, b:{c:'hello'} },{ a: { b:'world' },b:{c:'world'} } ]) 
//=>  [ [ 'hello'], [ 'world'] ] 

// Mix array of objects and values, grabs items[] that include specific prop 
arrayWith([ [], { a: undefined }, { b: 3 }, { a: 1 } ], 'a') //  [ { a: undefined }, { a: 1 }] 


// Exclude items from array that match by excludes, keeping relative index
exFromArray([{ a: 1, c: 5 }, { a: 10 }, { b: 2 }, { c: 1, a: 2 }], ['a', 'b']) 
 // [ { c: 5 }, undefined, undefined, { c: 1 }] 
exFromArray([ null,1,{ a: 1, c: 5 }, { a: 10 }, { b: 2 }, { c: 1, a: 2 },'2'], ['a', 'c']) 
// [null,1, undefined,undefined,{ b: 2 },undefined,'2']


// Filter items from array by picks[] conditions
let picks = [Number, Boolean] // select only numbers and booleans from array  
pickFromArray([undefined, 1, {}, 2, null, [], 'hello world', 3, true, 4, null, 5], picks) 
//> [ 1, 2, 3, true, 4, 5 ]


let picks = [undefined, [undefined] ] // select all undefined from array
pickFromArray([undefined, false, 1, true, {}, [1], [undefined, 'this one'], null], picks)
// [undefined, [undefined,'this one']]

let picks = [{ data: Array }] // we only want to pick items that are {data} objects containing array
pickFromArray([{ data: ['hello'] }, { data: {} }, { data: 1 }, { data: { d: 2 } }, { data: ['world'] }], picks)
//>   [{ data: [ 'hello'] },{ data: [ 'world' ] } ]
// for more examples refer to docs


// Lightweight Event Dispatcher, allowing you dispatch anywhere in the code
const ds = dispatcher(/** uid, debug */)
    .next({ data: 'hello world' }) // will wait and call first once subscribed
    .subscribe((data, uid, index) => {
         log('on subscribe', data, uid, index)
    }).onComplete(uid => {
        log('completed', uid)
    })
ds.next({ data: 'hello again' })
ds.delete() // delete self, onComplete will also be called
ds.next({ data: 'never called' })



// High order caller, concept taken from react HOC

function fn(a = 1, b = 2, c = 3) {
    return a + b + c
}

fnHocked = withHoc(fn, 4, 5, 6) 
// above arguments  replaced with in final call 
fnHocked(7, 8, 9) // > 24  

fnHocked = withHoc(Promise.resolve(fn), 4, 5, 6) 
// above arguments  replaced with in final call 
fnHocked(7, 8, 9).then(log) // > 24  


// Run some method that returns a value, check for updated conditions until timeout or when data becomes available
resolver(()=>Promise.resolve({data:'hello world'}),5000,50).then(n=>{
    log({resolver:n})
})

dupes('any', 2) // ['any','any']

loop(5,inx=>10+inx) // [10, 11, 12, 13, 14]
loop(2,inx=>{
    console.log('hello world', inx)
}) // [undefined, undefined]


// LIMITED FUNCTIONALITY
// THIS METHOD ONLY WORK FOR COMMON.JS modules, and not for browser
// Modified require() does not throw when second arg ref >ERR_NO_THROW is provided
xrequire('./path/to/mod') // as usual
xrequire('sdf56yfd','ERR_NO_THROW') // returns undefined

// LOGGING
log('my data',[1,2]) //  [log] my data [1,2]
debug('my data',[1,2]) //  [debug] my data [1,2]
onerror('ups','1') // [error] ups 1
warn('warn','1') //  [warning] warn 1
attention('attention','1') //  [attention] attention 1
alert('alert','1') //  [alert] alert (node.js only)
stack('some data'/**, true*/) // [STACK TRACE]: xxxx
errorTrace('error data', true) //  [[ERROR],... ]

disableLogging() // disable all loging features for above methods
resetLogging() //  clear disabled loggin 
loggerSetting('log', 'off') // disable logging for log()
loggerSetting('log', 'on ') // re-enable logging for log()


```
&nbsp;
&nbsp;



### Contact
Have questions, or would like to submit feedback, [contact eaglex.net](https://eaglex.net/app/contact?product=x-utils)
