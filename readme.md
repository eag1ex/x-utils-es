
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
* UMD/esm support so you can use in most environments: *(AMD, Node, or browser)*
&nbsp;
&nbsp;


### Version support
For production with gulp/webpack ..etc, use source (1) version, otherwise use any other.

```js
import {} from 'x-utils-es' // src esm module  (1)
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


### Prototypes
Ideas and upcoming features, take a look in:
```js
import {} from 'x-utils-es/Prototypes' // 
// You will find any new and still intesting that maybe added to future releases
// ps: no umd support 
```


### Example
`./examples` _check repo_

```js

import { objectSize,stringSize(-1),last,copyBy,timer,interval,validID,isNumber,isPromise,isQpromise,sq,cancelPromise, uniq,isFunction,isObject,isArray,isString,isFalsy,isTrue,isFalse,isNull,isBoolean,isUndefined,copy,copyDeep,delay,someKeyMatch,exactKeyMatch,head,flatten,flattenDeep,trueVal,trueValDeep,trueProp,typeCheck,isEmpty,isError, log,warn,onerror,error,debug,loggerSetting,isClass,hasPrototype, isInstance,hasProto, chunks, validDate,stack,errorTrace,resolver,dupes,loop,shuffle,uniqBy,arrayWith,exFromArray,pickFromArray,isBigInt,dispatcher, withHoc } 
from 'x-utils-es' // require(x-utils-es/umd) 



/**
 * - If item is an object with properties, returns key size
 * @param data:any
 * @returns number , amount of keys in the object
 * **/
objectSize({ a: 1, b: 2 }) }) // 2
objectSize([1,2]) // 0
objectSize( (new function(){this.a=1}()) ) // 1
objectSize( (new function(){}()) ) // 0

/**
 * - Check is item is a type of string, then check its length
 * @param anyDataType
 * @returns length
 * **/
stringSize('abc') // 3 
stringSize(-1) // 0
stringSize('-1') // 2
stringSize(undefined) // 0
stringSize([123]) // 0



/**
 * - Return first index from up to 2 level array: [[1,2]]
 * @param arr:array
 * @returns top first index
 * **/
head([[{ value: 1 }, { value: 2 }]]) // { value: 1 }
head([[ [1], {value:1} ]]) // [1]
head([1,2]) // 1



/** 
 * provide an array to shuffle
 * @param {Array} arr array required
 * @returns {Array} always returns an array
*/

shuffle(['1',2,3,'4']) // returns random order
shuffle() // [] 



/**
 * -Flattens array by one level [[]] > [], [[[]]]> [[]]
 * @param arr:array
 * @returns array
 * **/
flatten([['hello world']]) // ['hello world']


/**
 * -Flattens all array levels to 1 level
 * @param arr:array
 * @returns array
 * **/
flattenDeep([[[['hello world']]]) // ['hello world']



/**
 * - If array, return last index 
 * @param any
 * @returns last index in an array
 * **/
last([{},{},[1], { value: 1 }]) // { value: 1 }


/**
 * - Provide data{} with arrayProp[] references to match
 * @param data:object
 * @param refs:array string array of keys to reference
 * @returns matched copy of the object
 * **/
copyBy({ a: 1, b: 2, c: 3 }, ['a', 'c']) } // {a: 1, c: 3}
copyBy({ a: 1, b: 2, c: 3 }) } // {}
copyBy({}) } // {}



/**
 * - Return copy of provided data. 
 * - Methods will not be copied, only its primitiveValue, based of `typeCheck` evaluation
 * @param any
 * @returns copy of provided data
 * **/
copy({ a: 1, b:function(){} }) //=>  {a:1}
copy([1,2,3]) //=> / [1,2,3]
copy( function(){}) //=>  Function: anonymous
copy(null) //=>  null 
copy(true) //=>  true


/**
 *  good for circular data, or nested class objects
 * @param any
 * @returns deep copy of provided data
 * **/
copyDeep({ a: {b:{c:{}}} }) //=>  { a: {b:{c:{}}} })
copyDeep([{ a: (new function(){this.b=1}()) }]) //=>  [ { a: {b:1} } ]
copyDeep({ a: (new function(){this.b=1}()) }) //=>  { a: { b:1 } }


/**
 * - If item is a function, return true
 * @param any
 * @returns boolean
 * **/
isFunction(true) // false
isFunction(Promise.resolve) // true


/**
 * - Replacement for setTimeout, same principal, on `time` clears setTimeout 
 * @param function/callback
 * @param time:number
 * **/
timer(() => log('timer called'), 2000)


/**
 * - just like setInterval, calls `every` time/until, and clears interval on `endTime` 
 * @param callback=>
 * @param every:number 
 * @param endTime:number
 * **/
interval(() => log('interval called'), 100, 300)


/**
 * - Return string without space to lowerCase
 * @param string
 * **/
validID('sdfkj 45 AMKD') // sdfkj45amkd



/**
 * - Check if is type of number
 * @param any
 * @returns boolean
 * **/
isNumber(-1) // true
isNumber(NaN) // true
isNumber(true) // false
isNumber([]) // false



/** 
 * @sq() / simpleQ / new Promsie / defer 
 * simplified `new Promise()`
 * access to {resolve,reject, promise}
 * @returns {Object} `{resolve,reject, promise}`
**/

let defer = sq()
defer instanceof Promise === true

defer.promise.then(n=>{
    log('[sq][resolve]',n)
}).catch(err=>{
    onerror('[sq][reject]',err)
})

defer.resolve('hello world')
// defer.reject('kill it')



/**
 * - Check if provided item is a Promise
 * - checks if its a resolvable promise
 * - checks for node.js/q.defer() / as well as `sq()`
 * @param any
 * @returns boolean
 * **/
isPromise(function () { }) // false
isPromise(Promise.resolve()) ) // true
isPromise( sq() ) // true


/**
 * checks for q.defer/node.js promise, along with sq() promise 
 * - checks if its a resolvable promise
 * @param any
 * @returns boolean
 * **/

isQPromise(Promise.resolve()) }) // false 
isQPromise( sq() ) // true
isQPromise( q.defer() ) // true (refering to node.js q )



/**
 * @cancelPromise 
 * - how long to wait before we exit process
 * - why use this ? If the promise never resolves or takes too long, so we can cancel it when `{maxWait}` time expires
 * @param {Promise} `{defer}` (required)  resolved when process complete or called from callback on timeout
 * @param {Number} `{maxWait}` (required)  long to wait before execiting with cbErr
 * @param {Number} `{checkEvery}` (required) how frequently to check if promise is resolved
 * @param {Function} `{cbErr}` (required) called on timeout `cbErr(({error,defer,id}))` > here you can either resolve or reject the pending promise
 * @param {boolean} `{logging}`(optional)  when true will pront waiting process
 * @param {String} `{message}` (optional)  defaults: `taken too long to respond` of provide your own
 * @param {String} `{id}` (optional) added to error callback, and to logging when enabled
 * @returns {Promise} the same promise provided in {defer}, but dont need to use it, directly
 **/

let def = sq()
cancelPromise({ defer:def, // can use standard Promise, sq(), or node.js q.defer
                checkEvery:200,  // log process on every 
                maxWait:3000,  // expire promise 
                message:'waited too long',  // use this error message
                logging:true, // display process
                id:new Date().getTime(), // custom id to display or on error
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



/**
 * - Provide array and return no repeats, (doesnt work with NaN)
 * @param array[]
 * @returns array with uniq values
 * **/
uniq([1, 1, 3, 'a', 'b', 'a', null, null, true, true]) // [1,3,'a','b',null,true]



/**
 * - Provide mixed array 
 * - simple and lightweight
 * @param array[] array of mixed items including objects to target property for exclusion
 * @param prop:string
 * @returns mixed array with non repeated object (prop[val]!=prop[val]) pairs in the same order
 * **/
uniqBy([{ a: 1, b: 2 }, 1, { b: 1 }, 5, { a: 1 }, null, { a: 1, b: 2 } ], 'a') // [ { a: 1, b: 2 }, 1, { b: 1 }, 5, null ]
uniqBy([1,2,3,{a:1,c:null},{a:1,b:1}],'a') // [1,2,3,{a:1,c:null}]
uniqBy([1,{1:1},{1:1,2:1}],1) 
uniqBy([1, { 1: 1 }, { 1: 1, 2: 1 }, { 2: 2 }, { 2: 2 }],1) //  [ 1, { '1': 1 }, { '2': 2 }, { '2': 2 } ]



/**
 * - Check if provided has object properties, and is not an array
 * @param data:any
 * @param cbEval (optional) callback operator, continue checking when callback returns !!true
 * @returns boolean
 * **/
isObject({}) // true
isObject([]) // false
isObject( (new function(){}) ) // true
isObject((function () { })) }) // false
isObject((new class { })) // true
isObject(new Error()) // true
isObject(null) // false

isObject( {}, ()=>false ) // false, due to callback !!false
isObject( [], ()=>Object.keys({1:1}).length ) // false, not an object

/**
 * - Check if provided is Array.prototype, not an Object.prototype
 * @param data:any
 * @param cbEval (optional) callback operator, continue checking when callback returns !!true
 * @returns boolean
 * **/
isArray([]) // true
isArray({}) // false
isArray(new Array()) // true

isArray(new Array(), ()=>[1,2].length===1) // false, because callback return !!false
isArray({}, ()=>true) // false // not array

/** 
  * - return array in batch specified by size
  * @param {array} arr required
  * @param {number} size required larger then 0
  * @returns arr[]
 */
chunks( [1,2,3,4,5,6] , 2) // [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]




/**
 * - Check if provided data is a string 
 * @param any
 * @param cbEval (optional) callback operator, continue checking when callback returns !!true
 * @returns boolean
 * **/
isString('') // true
isString(new String()) // true
isString(NaN) // false
isString(new Date()) // false

isString('123', ()=>'123'.length>5) // false, callback return !!false
isString('123', ()=>'123'.length>2) // true


/**
 * - Check if provided identities match: `['',0 x<1, false, null, undefined,NaN, [],{}]`
 * @param {*} el any
 * @returns boolean 
 * **/
isFalsy({}) // true
isFalsy({a:1}) // false
isFalsy([]) // true
isFalsy([1]) // false
isFalsy(true) // false
isFalsy(false) // true
isFalsy(0) // true

isFalsy( (new function(){}()) ) // true
isFalsy( (new function(){this.a=false}()) ) // false

/**
 * - number or boolean will be evaluated, all else `return false`
 * @param {*} el any
 * @returns boolean 
 * **/

isTrue(undefined) // false
isTrue(5) // true
isTrue(0) // false
isTrue(-1) // false
isTrue(true) // true
isTrue(false) // false
isTrue([]) // false




/**
 * - number or boolean will be evaluated, all else `return false`
 * @param {*} el any
 * @returns boolean 
 * **/

isFalse(undefined) // false
isFalse(5) // false
isFalse(0) // true
isFalse(-1) // true
isFalse(true) // false
isFalse(false) // true
isFalse({}) // false


/**
 * - check if value is a boolean
 * @param {*} el any
 * @returns boolean 
 * **/

isBoolean(null) // false
isBoolean(undefined) // false
isBoolean(false) // true
isBoolean(new Boolean(false)) // true 



/**
 * - test if value is of null
 * @param {*} el any
 * @returns boolean 
 * **/

isNull(null) // true
isNull(undefined) // false



/**
 * - test if value is of undefined
 * @param {*} el any
 * @returns boolean 
 * **/

isUndefined(undefined) // true
isUndefined(null) // false





/**
 * - Returns promise and resolved with time provided
 * @param time:number
 * **/
async function f() {
    log('delay start')
    await delay(2000)
    log('delay end')
}; f()



/**
 * - Provide object/source, check if ANY key names match, object/source order placement doesn't matter :)
 * @param obj:object
 * @param source:object
 * @param cbEval (optional) callback operator, continue checking when callback returns !!true
 * @returns boolean  true=> when at least 1 key name belongs to either obj/source
 * **/
someKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, a: 1 }) //=>  true

someKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, a: 1 }, ()=>1-1===1) //=>  false, because callback return !!false


/**
 * - Provide object/source, check if ALL key names match, object/source order placement doesn't matter :)
 * @param obj:object
 * @param source:object
 * @param cbEval (optional) callback operator, continue checking when callback returns !!true
 * @returns boolean  true=> when ALL key names match each other
 * **/
exactKeyMatch({ a: 2, b: 1, c: 2 }, { c: 1, a: 1, b: 1 }) //=>  true
exactKeyMatch({ a: 2, b: 1 }, { c: 1, a: 1, b: 1 }) //=> false
exactKeyMatch({ a: 2, b: 1 }, { c: 1, d: 1}) //=>  false
exactKeyMatch({}, { c: 1, d: 1}) //=>  false
exactKeyMatch(['a','b','c'], { c: 1, d: 1}) //=> false

exactKeyMatch({ a: 2, b: 1, c: 2 }, { c: 1, a: 1, b: 1 }, ()=> 1+1===3) // false, because callback return !!false



/**
 * - Provide mixed array, returns only positives entities, 
 *   excluding :`[0, -1, x<1, null,false,{},undefined,'',[],NaN]`.
 *   Does not change structure of data, uses `isFalsy()` to eval conditions.
 * @param arr:array must provide array
 * @returns mixed array with positive entities in same order 
 * **/
trueVal([-1, 0,1 {}, "hello", [], { name: 'jack' }, false, null, NaN, undefined,true]) 
//=> [1,'hello',{ name: 'jack' },true]


/**
 * - Same as `trueVal` except, it goes 2 levels deep: [[1,[]]], 
 *   nested empty arrays and objects will also be filtered out. Does not change structure of valid data, 
 *   Uses `isFalsy` to eval conditions.
 * @param arr:array must provide array
 * @returns mixed array with positive entities in same index order, 2 levels deep
 * **/
trueValDeep([1, 0, [], {}, "hello", [0, undefined, -1, false, NaN, 1], { name: 'jack' }, false, null, undefined])
//=> [ 1, 'hello', [ 1 ], { name: 'jack' } ] }



/**
 * - Return new object with only true entities `{prop:values,...}`, 
 *   ignoring top level: `{a:NaN,b:0,c:false,d:-1,e:NaN,f:[],g:{},h:undefined,j:''}`. 
 *   Does not change structure of valid data. Uses `isFalsy` to eval conditions
 * @param obj:object
 * @returns new object with positive entities
 * **/
trueProp({ a: NaN, b: 0, c: false, d: -1, e: NaN, f: [], g: 'hello', h: {}, i: undefined, j:'' })
//=> {g: 'hello'}


/**
 * - Evaluate given data and return type/value object. 
 *   `value` is not the actual data, but an index from `-<+`. 
 *   If array (index is incremented), if object (keys are incremented). You get the idea!
 * @param data:anyType
 * @param standard:boolean:true by default evaluation is using standard javascript return typeof , 
 *        when standard=false, will use user friendly mixed/types: `date,NaN,promise,array,typeof/s`
 * @returns { "type": date,NaN,promise,array,typeof/s, value: number, primitiveValue }
 * **/
typeCheck({}) // {type:object, value:0, primitiveValue: Object() }
typeCheck({a:1,b:2}) // {type:'object', value:2, primitiveValue: Object() }
typeCheck([2,3],false) // {type:'array', value:2, primitiveValue: Object() }
typeCheck(Date,false) // {type:'date', value:1, primitiveValue: Date() }
typeCheck(2) // {type:'number', value:2, primitiveValue: Number() }
typeCheck(false) // {type:'boolean', value:0, primitiveValue: Boolean() }
typeCheck(true) // {type:'boolean', value:1, primitiveValue: Boolean() }
typeCheck(null,false) // {type:'null', value:0, primitiveValue: Object() }
typeCheck(null) // {type:'object', value:0, primitiveValue: Object() }
typeCheck(undefined) // {type:'undefined', value:0, primitiveValue: undefined }
typeCheck(function () { }) // {type:'function', value:1, primitiveValue: Function() }
typeCheck(Promise.resolve(),false) // {type:'promise', value:1, primitiveValue: Function() }
typeCheck(Promise.resolve()) // {type:'function', value:1, primitiveValue: Function() }



/**
 * - Evaluate data contains true identities, and return true when: [NaN,'',x<1 , false, null, undefined,NaN,{},[]]
 * @param data:any
 * @returns boolean
 * **/
isEmpty({}) // true
isEmpty({a:1}) // false
isEmpty([]) // true
isEmpty([0]) // false
isEmpty(1) // false
isEmpty(false) // true



/**
 * - Check is provided data is an Error.prototype
 * @param data:any
 * @returns boolean
 * **/
isError(Error()) // true
isError(new Error()) // true
isError(true) // false



/**
 * - Check if item is already an instance of an object, and not an array!
 * @param data:any
 * @returns boolean
 * **/
isInstance({}) // false
isInstance(new function(){}) // true 
isInstance(new class(){} ) // true 
isInstance(function () { }) // false
isInstance([]) // false


/**
 * - Check if provided data has .prototype, means it can be called as new. `hasPrototype` is an alias of `isClass`
 * @param data:any
 * @param cbEval (optional) callback operator, continue checking when callback returns !!true
 * @returns boolean
 * **/
hasPrototype(function(){})/**isClass()**/ // true 
hasPrototype(new function(){}) // false
hasPrototype(Date) // true
hasPrototype(Object) // true

hasPrototype( Object, ()=>false) // false callback !!false


/**
 * - Will check if item has __proto__ example: `(new function(){}), {}, [],''` 
 * - return false for: `null, undefined`
 * @param data:any
 * @param cbEval (optional) callback operator, continue checking when callback returns !!true
 * @returns boolean
 * **/
hasProto({}) // true
hasProto('') // true
hasProto(-1) // true
hasProto(false) // true
hasProto(undefined) // false
hasProto(null) // false
hasProto(NaN) // true

hasProto({}, ()=> Object.keys({}).length ) // false because object has no keys


/**
 * - Check data is a valid Date
 * @param data:any 
 * @param cbEval (optional) callback, continue checking when callback returns !!true
 * @returns boolean
 * **/
validDate(new Date('')) // false
validDate(new Date()) // true
validDate(new Date(1)) // true
validDate(Date()) // false because its a string haha
validDate( new Date(), ()=>false ) // false callback !!false
validDate( '', ()=>true ) // false // not a date


/**
 * @selectiveArray
 * - recursive selection of array objects by reference
 * @param selectBy:Array required, uniq properties to target selectively from left/up to right/down, (repeated props will be ignored)
 * @param data:Array[{},{}] required, array of Objects with properties to target 
 * @returns always returns array []
 * **/

// select >b from both arrays, and return same order
selectiveArray(['a.b'], [ { a: { b:'hello' }, b:{c:'hello'} },{ a: { b:'world' },b:{c:'world'} } ]) 
//  [ [ 'hello'], [ 'world'] ] 

// select >b, and select >c from both arrays, and return same format
selectiveArray(['a.b','b.c'], [ { a: { b:'hello' }, b:{c:'hello'} },{ a: { b:'world' },b:{c:'world'} } ]) 
// [ ['hello','hello'], ['world','world'] ]

/* head(..) */ selectiveArray(['a.b','b.c'], [ { a: { b:'hello' }, b:{c:'world'} }]) 
//  [ [ 'hello', 'world'] ] << one pair from data array
// example : 
let [b,c]=Array.from( flatten(selectiveArray(['a.b','b.c'], [ { a: { b:'hello' }, b:{c:'world'} }]) ) ).values()





/**
 * @arrayWith 
 * Grab array items that include specific propName, non object items are not evaluated and pass thru 
 * @param {*} array[] mixed: [{a:true},...]
 * @param {*} withProp example: withProp:"a"
 * @returns [] only array items that include specific prop 
* **/

arrayWith([ [], { a: undefined }, { b: 3 }, { a: 1 } ], 'a') //  [ { a: undefined }, { a: 1 }] 
arrayWith([ { a: 1 } , 1,[], undefined, { b: 3 } ], 'b') //  [ { b: 3 }] 




/**
 * @exFromArray
 * Only exclude items from the array that match
 * @param {*} array[] mixed with objects to exclude by propName
 * @param {*} excludes[] property names to match each object by
 * @returns {} mixed array with any other types as per input, in same order
 * 
* **/

exFromArray([{ a: 1, c: 5 }, { a: 10 }, { b: 2 }, { c: 1, a: 2 }], ['a', 'b']) 
 // [ { c: 5 }, undefined, undefined, { c: 1 }] // for consistency the index/positions are kept :)

exFromArray([ null,1,{ a: 1, c: 5 }, { a: 10 }, { b: 2 }, { c: 1, a: 2 },'2'], ['a', 'c']) 
// [null,1, undefined,undefined,{ b: 2 },undefined,'2']





/**
 * @pickFromArray
 * Very powerfull array selection tool. 
 * Filter items from array by picks[] conditions 
 * @param {*} array[] of any 
 * @param {*} picks[] each pick tests item in the array[] for all passing conditions, example `[{a:1,b:2},{g:5,o:0},Number,Boolean, true,1, Array, [1,2,3],Object, Function, Error],'hello world']` and returns those that match by type, or eaqul value! Empty types and strings, are excluded, example : `[{},[],'',NaN]` (in picks[] only)
 * @returns [...] only items passed by pick condition in same order
 * **/

let picks = [Boolean, 'hello', Object, { a: 1 }, BigInt] // only these types or/and values will be tested
pickFromArray([false, undefined, { a: 1 }, 'hello', ['hello'], {}, 1234567890123456789012345678901234567890n, 'not selected'], picks )
//>  [ false,{ a: 1 },'hello',{},1234567890123456789012345678901234567890n ] 


let picks = [Number, Boolean] // select only numbers and booleans from array
pickFromArray([undefined, 1, {}, 2, null, [], 'hello world', 3, true, 4, null, 5], picks) 
//> [ 1, 2, 3, true, 4, 5 ]


let picks = [undefined, [undefined] ] // select all undefined from array
pickFromArray([undefined, false, 1, true, {}, [1], [undefined, 'this one'], null], picks)
// [undefined, [undefined,'this one']]


let picks = [Function, { a: 1, b: 2 }, Boolean, Number] // we can also use primitive types
pickFromArray( [0, () => { }, { a: 1, b: 2 }, true, {}, 'not selected', false], picks ) 
//> [ 0,()=>{}, { [length]: 0, { a: 1, b: 2 },true,false ]


let picks =  [[1, 2, 3], { a: 3 }] // we can match by array[...] values (picks testing order is disregarded), excluding deep nested arrays and objects 
// NOTE [2,3,1] would also match as all values are available
pickFromArray( [ [1, 2, 3] , [4, 5, 6], { b: 3 }, { a: 3 }, [2, 1, 3] ], picks ) 
//> [ [ 1, 2, 3], { a: 3 }, [ 2, 1, 3 ] ]


let picks =  [[1], [2], [5], Boolean]
pickFromArray( [ [2] ,[1], [5], true], picks ) // [ [ 2 ],[ 1 ], [ 5 ],true]


let picks = [{ data: Array }] // we only want to pick items that are {data} objects containing array
pickFromArray([{ data: ['hello'] }, { data: {} }, { data: 1 }, { data: { d: 2 } }, { data: ['world'] }], picks)
//>   [{ data: [ 'hello'] },{ data: [ 'world' ] } ]


let picks = [{ data: Object }] // we only want to pick items that are {data} objects containing inner objects
pickFromArray([{ data: { a: 1 } }, { data: 1 },false, ['hello'], { data: { d: 2 } }, { data: { b: 2 } }, 1, 2, [], {}], picks)
 // [{ data: { a: 1 } },{ data: { d: 2 } },{ data: { b: 2 } } ]


let picks = [{ data: Object, a: 1 }]  // narrowing down the results
pickFromArray([{ data: { a: 1 }, a: 1 }, { data: 1 }, { data: { d: 2 } }, { data: { b: 2 } }, false, 1, 2, [], {}], [{ data: Object, a: 1 }]) // [{ data: { a: 1 }, a:1 }]


let picks = [{ a: Object, b: 1 }]  // narrowing down the results, should select all array objects that at least contain all the above
pickFromArray([{ a: { a: 1 }, b: 1, c:1  }, { data: 1 }, { a: { a: 1 }, b: 1 }, { data: null }, false, 1, 2, [], {}], [{ a: Object, b: 1 }] )
// >  [ { a: { a: 1 }, b: 1, c: 1 }, { a: { a: 1 }, b: 1 }]






/**
 * @dispatcher
 * Lightweight Event Dispatcher allowing you dispatch anywhere in code, very handy in callback hell situations, deep promises, or any other complicated computations. Integrated with callback memory so you dont have to subscribe first to get your data.
 *
 * @Why 
 * - Call next before subscribe
 * - Avoid ugly callback > callback > callback hell!
 * - Avoid messy Promises
 * - Prefer clean, readable code hierarchy
 * - Easy to implement
 * @param {*} uid (optional) will be generated if not supplied
 * @param {*} debug (optional) for extra debug messages
 */

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




/**
 * @withHoc
 * - High order caller, concept taken from react HOC.
 * - Promise support, we can provide deferred callback, example: `Promise.resolve(()=>{}) OR Promise.reject(()=>{}) `
 *  * if rejectable error is not callable, message is: `DEFERRED_NOT_CALLABLE`
 * @param {*} item callable function
 * @param {*} args (optional) any number of arguments (,,,,) after the callable item()
 * @returns {*} callable function withHoc(...args) OR deferred if a promise
 */


function fn(a = 1, b = 2, c = 3) {
    return a + b + c
}

// example 1
let fnHocked = withHoc(fn)
fnHocked() // > 6

// example 2
fnHocked = withHoc(fn, 4, 5, 6) // provided fn() arguments from upper caller
fnHocked() // > 15

// example 3
fnHocked = withHoc(fn, 4, 5, 6) 
// above arguments  replaced with in final call 
fnHocked(7, 8, 9) // > 24  

// example 4
fnHocked = withHoc(Promise.resolve(fn), 4, 5, 6) 
// above arguments  replaced with in final call 
fnHocked(7, 8, 9).then(log) // > 24  

// example 5
fnHocked = withHoc(Promise.reject(fn), 4, 5, 6) 
// above arguments  replaced with in final call 
fnHocked(7, 8, 9).catch(onerror) // > 24  

// example 6 not a deferred caller: 
fnHocked = withHoc(Promise.reject('fn'), 4, 5, 6) 
// above arguments  replaced with in final call 
fnHocked(7, 8, 9).catch(onerror) // > DEFERRED_NOT_CALLABLE  




/** 
 * @resolver
 * - will test `fn()` until timeout or data becomes available, or finaly return undefined
 * @param fn:function, method with something to return, returns value to access when ready
 * @param timeout:Number, specify max time to wait for data
 * @param testEvery:Numner, how ofter to check for data availability
 * @returns Promise/always resolves, and error, it will wrap it in {error} , if no data returns Promise.resolve(undefined), 
* **/
resolver(()=>Promise.resolve({data:'hello world'}),5000,50).then(n=>{
    log({resolver:n})
})
resolver(()=>Promise.reject('some error'),5000,50).then(n=>{
    log({resolver:n}) // {error: 'some error'}
})



let d = undefined
setTimeout(()=>{
    d = 'hello world'
},3000) // if we change it to more then 10000m resolver would return undefined, since its after timeout (timeout is never guaranteed,)

let fn=()=> d
// iterate every 50m and with max wait 5000m 
resolver(fn,5000,50).then(n=>{
    console.log(n) // hello world
})



/** 
 * @dupes
 * - duplicate original item x/times
 * @param {*} item any value
 * @param {number} index how many times to duplicate, when 0 then empty array is returned
 * @returns {array} [...]
 * **/
dupes('any', 2) // ['any','any']
dupes([{a:1},{b:1}], 2) // [ [{a:1},{b:1}], [{a:1},{b:1}] ]




/** 
 * @loop
 * - for loop with a callback, similar to times() from lodash, except you can access returned data,
 * - when no data is return undefined is passed 
 * - added loop iteration break support, when returning {break:true}
 * @param {*} size:number
 * @param {*} cb((inx)=>) add some data within callback, and munipulations
 * @returns {array} [...] always returns an array depending on `size`
 * **/

loop(5,inx=>10+inx) // [10, 11, 12, 13, 14]

loop(2,inx=>{
    console.log('hello world', inx)
}) // [undefined, undefined]


loop(3,inx=>{
    if(inx===3) return {break:true}
    return {[inx]:inx+1}
}) //  [ { '0': 1 }, { '1': 2 }, { '2': 3 } ] // dont be fooled, 0 is also an index ;))




/**SECTION: LOGGING **/

/**
 * - disable/enable individual log types
 * @affects `log, warn,error, onerror, attention, alert,  errorTrace, debug, stack`
 * @param logType:string can specify switch logtype to enable or disable,:log,warm,error,onerror
 * @param logMode:string on/off, what to do for each logType
 * @returns boolean:true/false 
 * **/

loggerSetting('log', 'off') // disables all future calls to any log() method
loggerSetting('warn', 'off')// disables all future calls to any warn() method
loggerSetting('error', 'off') // disables all future calls to any error/onerror() methods
loggerSetting('debug', 'off')
loggerSetting('attention', 'off')
// if disabled before will be enabled again
loggerSetting('log', 'on')
loggerSetting('warn', 'on')
loggerSetting('error', 'on')
loggerSetting('debug', 'on')
loggerSetting('attention', 'on')

/**
 * - disable all future logs from showing
 * - loggerSetting(...) need to be handled individually 
 * @affects `log, warn,error,attention, debug, onerror, errorTrace, stack`
 * **/
disableLogging()

/**
 * - restore all logs when previously disabled, has no affect if disableLogging was never called
 * @affects `log,attention, debug warn,error, onerror, errorTrace, stack`
 * **/
resetLogging()



/**
 * - pretty console.log, with prefix [debug] and green color
 * @param ...data:any
 * returns console.log
 * **/
debug('my data',[1,2]) //  [debug] my data [1,2]



/**
 * - pretty console.log, with prefix [log]
 * @param ...data:any
 * returns console.log
 * **/
log('my data',[1,2]) //  [log] my data [1,2]


/**
 * - pretty console.error, with prefix [error]
 * @param ...data:any
 * returns console.error
 * **/
error('ups','1') //  [error] ups 1
onerror('ups','1') // [error] ups 1



/**
 * - pretty console.warn, with prefix [warning]
 * @param ...data:any
 * returns console.warn
 * **/
warn('warn','1') //  [warning] warn 1



/**
 * - pretty console.log, with prefix [attention]
 * @param ...data:any
 * returns console.log
 * **/
attention('attention','1') //  [attention] attention 1

/**
 * - pretty console.log, with prefix [alert]
 * - this is NOT console.alert() as it works on windows
 * @param ...data:any
 * returns console.log
 * **/
alert('alert','1') //  [alert] alert


/**
 * - console.log() stack stack to where stack() was called
 * @param data:any optional
 * @param {boolean} asArray if set true, will output stack stack as an array, otherwise a string
 * @returns console.log `[STACK TRACE]`: xxxx
 * **/
stack('some data'/**, true*/)


/**
 * - console.error() stack trace to where trace() was called
 * @param data:any optional
 * @param {boolean} asArray if set true, will output error stack trace as an array, otherwise a string
 * @returns console.error [ERROR]: xxxx
 * **/
errorTrace('error data', true) // returns [[ERROR],... ]

/**!SECTION END**/

```
&nbsp;
&nbsp;



### Contact
Have questions, or would like to submit feedback, [contact eaglex.net](https://eaglex.net/app/contact?product=x-utils)
