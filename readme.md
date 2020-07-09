
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

import { objectSize,last,copyBy,timer,interval,validID,isNumber,isPromise,uniq,isFunction,isObject,isArray,isString,isFalsy,copy,delay,someKeyMatch,exectKeyMatch,head,trueVal,trueValDeep,trueProp, log,warn,onerror,error } 
from 'x-utils-es' // require(x-utils-es/umd) 


/** */ log({ objectSize: objectSize({ a: 1, b: 2 }) }) // 2
/** */ log({ last: last([{}, { value: 1 }]) })
/** */ log({ copyBy: copyBy({ a: 1, b: 2, c: 3 }, ['a', 'c']) })
/** */ log({ isFunction1: isFunction(true), isFunction2: isFunction(function () { }) }) // {false, true}
/** */ timer(() => log('timer called'), 2000)
/** */ interval(() => log('interval called'), 100, 300)
/** */ log({ validID: validID('sdfkj 45 AMKD') })
/** */ log({ isNumberA: isNumber(-1), isNumberB: isNumber({}) }) // {true, false}
/** */ log({ isPromiseA: isPromise(function () { }), isPromiseC: isPromise(Promise.resolve()) }) // {false, true}
/** */ log({ uniq: uniq([1, 1, 3, 'a', 'b', 'a']) })
/** */ log({ isObjectA: isObject([1, 2, 3]), isObjectB: isObject({ a: 1 }) }) // {false, true}
/** */ log({ isArrayA: isArray([1, 2, 3]), isArrayB: isArray({ a: 1 }) }) // {true, false}
/** */ log({ isStringA: isString({}), isStringB: isString('') }) // {false, true}
/** */ log({ isFalsyA: isFalsy({}), isFalsyB: isFalsy(''), isFalsyC: isFalsy([]), isFalsyD: isFalsy([0]), isFalsyE: isFalsy(true), isFalsyF: isFalsy(1), isFalsyG: isFalsy(' ') }) // {true,true,true,false,false,false,false }
/** */ log({ copy1: copy({ a: 1 }), copy2: copy(undefined) })

/** */ async function f() {
    log('delay start')
    await delay(2000)
    log('delay end')
}; f()

/** */ log({ someKeyMatch1: someKeyMatch({ a: 2, b: 1, c: 2 }, { g: 1, e: 1, a: 1 }), someKeyMatch2: someKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, f: 1 }) }) // {true, false}
/** */ log({ exectKeyMatch1: exectKeyMatch({ a: 2, b: 1, c: 2 }, { a: 1, b: 1, c: 1 }), exectKeyMatc2: exectKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, f: 1 }) }) // {true, false}

/** */ log({ trueVal: trueVal([1, 2, 3, {}, "hello", [], { name: 'jack' }, false, null, NaN, undefined]) })

    // 2 levels deep
/** */ log({ trueValDeep: trueValDeep([1, 0, 2, 3, [], "hello", [0, undefined, -1, false, NaN, 1], { name: 'jack' }, false, null, undefined]) })

/** */ log({ trueProp: trueProp({ a: NaN, b: 0, c: false, d: -1, e: NaN, f: [], g: 'hello', h: {}, i: undefined }) })


/** */ log({ head: head([[{ value: 1 }, { value: 2 }]]) })
/** */ error("ups") // '[error]','ups'
/** */ warn("attention") // '[warning]','attention'
```
&nbsp;
&nbsp;



### Documentation

|METHODS                |RETURN                          |DESCRIPTION                         |
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
|trueVal( arr) | `return true entity value array` |provided mixed array with true/falsy entities, return only positive, excluding :`[0,null,false,{},undefined, -1,'',[],NaN]`. Does not change structure of valid data. _(Uses `isFalsy` to eval conditions)_ |
|trueValDeep( arr) | `return true entity value array` | Same as `trueVal` except it goes 1 level deeper: [[1,[]]], so nested empty arrays and objects, will also be filtered out. Does not change structure of valid data  _(Uses `isFalsy` to eval conditions)_ |
|trueProp( obj )  | `return object with true prop values` | return new object with only true entities `{prop:values,...}`, ignoring top level: `{a:NaN,b:0,c:false,d:-1,e:NaN,f:[],g:{},h:undefined}`. Does not change structure of valid data.  _(Uses `isFalsy` to eval conditions)_ |
|log(,,,) | `-` |console.log, with prefix `[log]` |
|warn(,,,) | `-` |console.warn, with prefix `[warning]` |
|onerror(,,,), error(,,,) | `-` |console.error, with prefix `[error]` |
&nbsp;
&nbsp;



### Contact
Have questions, or would like to submit feedback, [contact eaglex.net](https://eaglex.net/app/contact?product=x-utils)
