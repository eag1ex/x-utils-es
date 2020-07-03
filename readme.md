
#### About
- Simple javascript, lodash alternative library, to help with type validation, includes no external plugins
- esmodule supports `esnext` and `es2015`.
- Lightweight, minified


#### Installation
- `npm i x-utils-es`
- For Node.js users, and `esm/esnext` version, you need `"node": ">=11.0.0", "npm": ">=6.4.1"` installed 



#### Compatibility
Files compiled and minified in `./dist`
- **node.js** > esm/esnext  > support with es6+ functionality
- **browser/node.js** > es2015 
- For browser with `esm/esnext` refer to `https://jakearchibald.com/2017/es-modules-in-browsers/#nomodule-for-backwards-compatibility` 



#### Documentation

|METHODS                |RETURN                          |DESCRIPTION                         |
|----------------|-------------------------------|-----------------------------|
|**objectSize({})** | `Number` |Checks if provided item is an object, with properties |
|**last([])** | `last index` |provide array and return last from index |
|**isFunction(data)** | `boolean` |check if its a function |
|**copyBy(data{},refs[])** | `Object copy` |provide data{} with array[] of property references to match by |
|**timer(cb=>,time=0)** | `-` |you can replace setTimeOut with this method, the same principal applies, but additionally timer is cleared after callback |
|**interval(cb=>,every=0, endTime=0)** |`-` |just like setTinterval, it will call `every` time, and clear interval timer on `endTime`|
|**validID(id)** |`string` |provided id will return string without space to lowerCase|
|**isNumber(id=null)** |`boolean` |check if provided id is type of number|
|**isPromise(defer)** |`boolean` |check if provided data is a Promise|
|**uniq(arr)** |`array` |provide array[2,2,3,3,'b','b'], and returns uniq array: [2,3,'b']|
|**isObject(data)** |`boolean` |check if provided data is a true Object.prototype, and not Array.prototype|
|**isArray(data)** |`boolean` |check if provided data is a true Array.prototype |
|**isString(data**) |`boolean` |check if provided data is a string |
|**isFalsy(data)** |`boolean` |check if any data provided is: '', false, null, =<0, undefined, or empty data type |
|**copy(data)** |`copy of data` |return copy of provided data, or return error.toString() if undefined|
|**delay(time=0)** | `Promise` |resolve promise by specified time in ms|
|**someKeyMatch( object = {}, source = {})** | `boolean` |provide 2 objects and check if any key names match, object and source order placement doesn't matter :)|
|**exectKeyMatch( object = {}, source = {})** | `boolean` |provide 2 objects and check if ALL keys names match, object and source order placement doesn't matter :)|
|**head( arr)** | `first index` |return first index from 2 level array: [[1,2]]|
|**log(,,,)** | `-` |console.log, with prefix `[log]` |
|**warn(,,,)** | `-` |console.warn, with prefix `[warning]` |
|**onerror(,,,), error(,,,)** | `-` |console.error, with prefix `[error]` |



#### Examples
Location: `./examples.js` `/$ node -r esm ./examples.js`
- esnext/esm: `import {} from ./index` (minified), or `/src/x-utils.es` (un-minified)
- es2015: `import {} from ./dist/es2015` (minified) or  `/dist/es2015/x-utils.es` (un-minified)

```

import { log, objectSize, isObject, isPromise, last, head, isNumber, isArray, timer, isFalsy, someKeyMatch } from './index'

/** */ log({ objectSize: objectSize({ a: 1, b: 2 }) })
/** */ log({ isObjectA: isObject([1, 2, 3]), isObjectB: isObject({ a: 1 }) })
/** */ log({ last: last([{}, { value: 1 }]) })
/** */ log({ head: head([[{ value: 1 }, { value: 2 }]]) })
log({ isPromiseA: isPromise(function () { }), isPromiseC: isPromise(Promise.resolve()) })
/** */ timer(() => log('timer called'), 2000)
/** */ log({ isFalsyA: isFalsy({}), isFalsyB: isFalsy(''), isFalsyC: isFalsy([]), isFalsyD: isFalsy([0]), isFalsyE: isFalsy(true), isFalsyF: isFalsy(1), isFalsyG: isFalsy(' ') })
/** */ log({ isArrayA: isArray([1, 2, 3]), isArrayB: isArray({ a: 1 }) })
/** */ log({ someKeyMatch1: someKeyMatch({ a: 2, b: 1, c: 2 }, { g: 1, e: 1, a: 1 }), someKeyMatch2: someKeyMatch({ a: 2, b: 1, c: 2 }, { d: 1, e: 1, f: 1 }) })
```


##### LICENSE
* LICENCE: CC BY-SA
* SOURCE: https://creativecommons.org/licenses/by-sa/4.0/



##### Contact
* Have questions, or would like to submit feedback, [contact eaglex.net](https://eaglex.net/app/contact?product=x-utils)
