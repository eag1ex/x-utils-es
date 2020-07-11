
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
```js

import { objectSize,last,copyBy,timer,interval,validID,isNumber,isPromise,uniq,isFunction,isObject,isArray,isString,isFalsy,copy,delay,someKeyMatch,exectKeyMatch,head,trueVal,trueValDeep,trueProp,typeCheck,isEmpty,isError, log,warn,onerror,error, isClass,hasPrototype, isInstance,hasProto } 
from 'x-utils-es' // require(x-utils-es/umd) 


/** */objectSize({ a: 1, b: 2 }) }) // 2

/**
 * - If array, return last index 
 * @param any
 * @returns last index in an array
 * **/
last([{},{},[1], { value: 1 }]) // { value: 1 }

/**
 * Provide data{} with arrayProp[] references to match, returns matched
 * @param any
 * @returns copy of the object
 * **/
copyBy({ a: 1, b: 2, c: 3 }, ['a', 'c']) } // {a: 1, c: 3}


/**
 * - If item is a function, returns true
 * @param any
 * @returns boolean
 * **/
isFunction(true) // false
isFunction(Promise.resolve) // true


/**
 * - Replacement for setTimeOut, same principal, finaly clears setTimeOut 
 * @param function/callback
 * @param time:number
 * **/
timer(() => log('timer called'), 2000)


/**
 * - just like setTinterval, calls `every` time, and clear interval on `endTime` 
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
 * - Check if provided num is type of number
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
 * - Check if provided has object properties, and its not an array
 * @param any
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
 * - Check if provided data is true Array.prototype, not an Object symbling
 * @param any
 * @returns boolean
 * **/
isArray([]) // true
isArray({}) // false
isArray(new Array()) // true


/**
 * - check if provided data is string 
 * @param any
 * @returns boolean
 * **/
isString('') // true
isString(new String()) // true
isString(NaN) // false
isString(new Date()) // false


/**
 * - check if provided identities matched: `['',0 x<1, false, null, undefined,NaN, [],{}]`
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
 * - return copy of provided data. When provided methods/prototypes 
 *   with no return value, primitiveValue will be returned
 * @param any
 * @returns copy of provided data
 * **/
/** */ copy({ a: 1, function(){} }) // {a:1, {}}
/** */ copy([1,2,3]) // [1,2,3]
/** */ copy(null) // null 
/** */ copy(true) // true


/**
 * - returns promise, that is resolved with time provided
 * @param time:number
 * **/
async function f() {
    log('delay start')
    await delay(2000)
    log('delay end')
}; f()




/** */ log({ someKeyMatch1: someKeyMatch({ a: 2, b: 1, c: 2 }, { g: 1, e: 1, a: 1 }), someKeyMatch2: someKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, f: 1 }) }) // {true, false}

/** */ log({ exectKeyMatch1: exectKeyMatch({ a: 2, b: 1, c: 2 }, { a: 1, b: 1, c: 1 }), exectKeyMatc2: exectKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, f: 1 }) }) // {true, false}

/** */ log({ trueVal: trueVal([1, 2, 3, {}, "hello", [], { name: 'jack' }, false, null, NaN, undefined]) })

    // 2 levels deep
/** */ log({ trueValDeep: trueValDeep([1, 0, 2, 3, [], "hello", [0, undefined, -1, false, NaN, 1], { name: 'jack' }, false, null, undefined]) })

/** */ log({ trueProp: trueProp({ a: NaN, b: 0, c: false, d: -1, e: NaN, f: [], g: 'hello', h: {}, i: undefined }) }) // {g: 'hello'}

/** */ log({ head: head([[{ value: 1 }, { value: 2 }]]) })

/** */ log({
    typeCheck1: typeCheck({}), typeCheck2: typeCheck({ val: 1 }), typeCheck3: typeCheck([1]), typeCheck4: typeCheck(Promise.resolve(null)), typeCheck5: typeCheck(function () { }), typeCheck6: typeCheck(''),
    typeCheck7: typeCheck(false), typeCheck8: typeCheck(-1), typeCheck9: typeCheck(Date)
}) // { "type": typeof/promise, value: number }

/** */ log({ isEmpty1: isEmpty(new Error('err')), isEmpty2: isEmpty(-1), isEmpty3: isEmpty([1]), isEmpty4: isEmpty([]), isEmpty5: isEmpty({ v: 1 }), isEmpty6: isEmpty({}) }) // {false,false,false,true,false,true}

/** */ log({ isError1: isError(Error()), isError2: isError(new Error('err')) }) // {true,true}

/** */ log({ isInstance1: isInstance({}), isInstance2: isInstance(function () { }), isInstance3: isInstance(new function () { }) }) // {false, false, true}

/** */ log({ isClass1: isClass(Date), isClas2: isClass(function () { }), isClas3: isClass(new function () { }) }) // {false, false, true}

/** */ error("ups") // '[error]','ups'
/** */ warn("attention") // '[warning]','attention'
```
&nbsp;
&nbsp;



### Documentation

|METHODS                |RETURN                           |DESCRIPTION                         |
|----------------|-------------------------------|-----------------------------|
|objectSize({}) | `Number` |Checks provided item is an object with properties |
|head( arr) | `first index` |return first index from up to 2 level array: [[1,2]]|
|last([]) | `last index` |provide array and return last index _(only first level)_ |
|isFunction(data) | `boolean` |check if a function |
|copyBy(data{},refs[]) | `Object copy` |provide data{} with array[] of property references to match |
|timer(cb=>,time=0) | `-` |you can replace setTimeOut with this method, same principal applies, additionally timer is cleared after callback |
|interval(cb=>,every=0, endTime=0) |`-` |just like setTinterval, will call `every` time, and clear interval on `endTime`|
|validID(id) |`string` |return string without space to lowerCase|
|isNumber(num=null) |`boolean` |check if provided num is type of number|
|isPromise(defer) |`boolean` |check if provided data is a Promise|
|uniq(arr) |`array` |provide array[2,2,3,3,'b','b'], and returns uniq array: [2,3,'b']|
|isObject(data) |`boolean` |check if provided data is true Object.prototype not Array.prototype|
|isArray(data) |`boolean` |check if provided data is true Array.prototype |
|isString(data) |`boolean` |check if provided data is string |
|isFalsy(data) |`boolean` |check if data provided matched any:`[NaN,'',0 /** x<1 */, false, null, undefined,NaN]` |
|copy(data) |`copy of data` |return copy of data, or return error.toString() if undefined|
|delay(time=0) | `Promise` |resolve promise by specified time in ms|
|someKeyMatch( object = {}, source = {}) | `boolean` |provide 2 objects and check if any key names match, object and source order placement doesn't matter :)|
|exectKeyMatch( object = {}, source = {}) | `boolean` |provide 2 objects and check if ALL keys names match, object and source order placement doesn't matter :)|
|trueVal( arr) | `true identity array` |provided mixed array with true/falsy entities, return only positive, excluding :`[0,null,false,{},undefined, -1,'',[],NaN]`. Does not change structure of valid data. _(Uses `isFalsy` to eval conditions)_ |
|trueValDeep( arr) | `true identity array` | Same as `trueVal` except it goes 1 level deeper: [[1,[]]], so nested empty arrays and objects, will also be filtered out. Does not change structure of valid data  _(Uses `isFalsy` to eval conditions)_ |
|trueProp( obj )  | `object with identity props` | return new object with only true entities `{prop:values,...}`, ignoring top level: `{a:NaN,b:0,c:false,d:-1,e:NaN,f:[],g:{},h:undefined}`. Does not change structure of valid data.  _(Uses `isFalsy` to eval conditions)_ |
|isEmpty( data )  | `boolean` |evaluate type contains any true identity values, or return false: `NaN,'',x<1 , false, null, undefined,NaN` |
|isError( data )  | `boolean` |check is provided data is an _Error.prototype_|
|typeCheck( data )  | `{ "type": typeof/ or promise, value: number }` | evaluate given data and return type/value object. `value` is not actual data, but an index from `-<+`. If array _(index is counted)_, if object _(keys are counted)_, you get the idea |
|isClass/hasPrototype( item )  | `boolean` | will check if provided `item` has _(item).prototype_, which means it can be called as new. `hasPrototype` is an alias of `isClass`|
|isInstance( item )  | `boolean` | will check if item(__proto__)  parent.parent is an instance of Object |
|hasProto( item )  | `boolean` | will check if item has __proto__ example: `(new function(){}), {}, []` |
|log(,,,) | `-` |console.log, with prefix `[log]` |
|warn(,,,) | `-` |console.warn, with prefix `[warning]` |
|onerror(,,,), error(,,,) | `-` |console.error, with prefix `[error]` |
&nbsp;
&nbsp;



### Contact
Have questions, or would like to submit feedback, [contact eaglex.net](https://eaglex.net/app/contact?product=x-utils)
