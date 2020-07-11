
Simple javascript, lodash alternative library, to help with type validation, includes no external plugins.
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
```js
import {} from 'x-utils-es' // (defaults to esm)
import {} from 'x-utils-es/umd' // for browser and commonjs support
const {} require('x-utils-es/umd') // with node support

// browser
<script src="..path/x-dispatcher/umd"></script>
<script>
    const {...} = window.xutils // get access to all utils
</script>
```
&nbsp;
&nbsp;




### Example
- examples available in `./examples.js`
```js

import { objectSize,last,copyBy,timer,interval,validID,isNumber,isPromise,uniq,isFunction,isObject,isArray,isString,isFalsy,copy,delay,someKeyMatch,exactKeyMatch,head,trueVal,trueValDeep,trueProp,typeCheck,isEmpty,isError, log,warn,onerror,error, isClass,hasPrototype, isInstance,hasProto, validDate } 
from 'x-utils-es' // require(x-utils-es/umd) 



/**
 * - If item is an object with properties, returns key size
 * @param data:any
 * @returns number , amount of keys in the object
 * **/
objectSize({ a: 1, b: 2 }) }) // 2
objectSize([1,2]) // 0



/**
 * - Return first index from up to 2 level array: [[1,2]]
 * @param arr:array
 * @returns top first index
 * **/
head([[{ value: 1 }, { value: 2 }]]) // { value: 1 }
head([[ [1], {value:1} ]]) // [1]
head([1,2]) // 1



/**
 * - If array, return last index 
 * @param any
 * @returns last index in an array
 * **/
last([{},{},[1], { value: 1 }]) // { value: 1 }


/**
 * - Provide data{} with arrayProp[] references to match
 * @param any
 * @returns matched copy of the object
 * **/
copyBy({ a: 1, b: 2, c: 3 }, ['a', 'c']) } // {a: 1, c: 3}
copyBy({ a: 1, b: 2, c: 3 }) } // {}
copyBy({}) } // {}


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
 * - Check if provided item is a Promise
 * @param any
 * @returns boolean
 * **/
isPromise(function () { }) // false
isPromise(Promise.resolve()) }) // true



/**
 * - Provide array and return no repeats, (doesnt work with NaN)
 * @param array[]
 * @returns array with uniq values
 * **/
uniq([1, 1, 3, 'a', 'b', 'a', null, null, true, true]) // [1,3,'a','b',null,true]



/**
 * - Check if provided has object properties, and is not an array
 * @param data:any
 * @returns boolean
 * **/
isObject({}) // true
isObject([]) // false
isObject( (new function(){}) ) // true
isObject((function () { })) }) // false
isObject((new class { })) // true
isObject(new Error()) // true
isObject(null) // false


/**
 * - Check if provided is Array.prototype, not an Object.prototype
 * @param data:any
 * @returns boolean
 * **/
isArray([]) // true
isArray({}) // false
isArray(new Array()) // true


/**
 * - Check if provided data is a string 
 * @param any
 * @returns boolean
 * **/
isString('') // true
isString(new String()) // true
isString(NaN) // false
isString(new Date()) // false


/**
 * - Check if provided identities match: `['',0 x<1, false, null, undefined,NaN, [],{}]`
 * @param any
 * @returns boolean 
 * **/
isFalsy({}) // true
isFalsy({a:1}) // false
isFalsy([]) // true
isFalsy([1]) // false
isFalsy(true) // false
isFalsy(false) // true
isFalsy(0) // true



/**
 * - Return copy of provided data. 
 * - Methods will not be copied, only its primitiveValue 
 * @param any
 * @returns copy of provided data
 * **/
copy({ a: 1, function(){} }) //=>  {a:1, {}}
copy([1,2,3]) //=> / [1,2,3]
copy(null) //=>  null 
copy(true) //=>  true



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
 * @returns boolean  true=> when at least 1 key name belongs to either obj/source
 * **/
someKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, a: 1 }) //=>  true



/**
 * - Provide object/source, check if ALL key names match, object/source order placement doesn't matter :)
 * @param obj:object
 * @param source:object
 * @returns boolean  true=> when ALL key names match each other
 * **/
exactKeyMatch({ a: 2, b: 1, c: 2 }, { c: 1, a: 1, b: 1 }) //=>  true
exactKeyMatch({ a: 2, b: 1 }, { c: 1, a: 1, b: 1 }) //=> false
exactKeyMatch({ a: 2, b: 1 }, { c: 1, d: 1}) //=>  false
exactKeyMatch({}, { c: 1, d: 1}) //=>  false
exactKeyMatch(['a','b','c'], { c: 1, d: 1}) //=> false



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
 * @returns boolean
 * **/
hasPrototype(function(){})/**isClass()**/ // true 
hasPrototype(new function(){}) // false
hasPrototype(Date) // true
hasPrototype(Object) // true


/**
 * - Will check if item has __proto__ example: `(new function(){}), {}, [],''` 
 * - return false for: `null, undefined`
 * @param data:any
 * @returns boolean
 * **/
hasProto({}) // true
hasProto('') // true
hasProto(-1) // true
hasProto(false) // true
hasProto(undefined) // false
hasProto(null) // false
hasProto(NaN) // true



/**
 * - Check data is a valid Date
 * @param data:any 
 * @returns boolean
 * **/
validDate(new Date('')) // false
validDate(new Date()) // true
validDate(new Date(1)) // true
validDate(Date()) // false because its a string haha



/**
 * - console.log, with prefix `[log]`
 * @param data:any
 * returns console.log
 * **/
log('my data',[1,2],...) //  '[log]','my data',[1,2]



/**
 * - console.error, with prefix `[error]`
 * @param data:any
 * returns console.error
 * **/
error('ups','1',...) //  '[error]','ups','1'
onerror('ups','1',...) // '[error]','ups','1'



/**
 * - console.warn, with prefix `[warning]`
 * @param data:any
 * returns console.warn
 * **/
error('attention','1',...) //  '[warning]','attention','1'
onerror('attention','1',...) // '[warning]','attention','1'




```
&nbsp;
&nbsp;



### Contact
Have questions, or would like to submit feedback, [contact eaglex.net](https://eaglex.net/app/contact?product=x-utils)
