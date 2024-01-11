## x-utils-es

| Statements                                                                    | Branches                                                               | Functions                                                                    | Lines                                                                    |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| ![Statements](https://img.shields.io/badge/Coverage-93.43%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-83.58%25-yellow.svg) | ![Functions](https://img.shields.io/badge/Coverage-94.57%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-95.75%25-brightgreen.svg) |

&nbsp;
Simple javascript utility, lodash alternative, to help with type validation, with no dependencies.

- esmodule supports `esnext`, `es2015` and `umd`
- Lightweight, minified
  &nbsp;\
  &nbsp;

### Documentation & Demo

Website docs at: [x-utils-es at github pages](https://eag1ex.github.io/x-utils-es/)
&nbsp;\
&nbsp;

### Install

```shell
$/ npm i x-utils-es
```

&nbsp;

### Why use it

- Validate data
- Good with naming conventions
- Similar to lodash
- No dependencies
- UMD support so you can use in most environments: _(AMD, common.js/Node, or browser)_
- @types supported, can be used with typescript
  &nbsp;\
  &nbsp;

#### @types

Definitly typed (DT) support on all version
&nbsp;\
&nbsp;

#### Version support

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

&nbsp;\
&nbsp;

### Example overview

&nbsp;

---

```js
import { ... } from 'x-utils-es'
```

##### [#][id:1] **objectSize()**

> [id:1]: https://utils.eaglex.net/module-x-utils.html#~objectSize "Detailed in docs"
>
> Check item is an array

##### [#][id:2] **stringSize()**

> [id:2]: https://utils.eaglex.net/module-x-utils.html#~stringSize "Detailed in docs"
>
> Test the length of string

##### [#][id:3] **head()**

> [id:3]: https://utils.eaglex.net/module-x-utils.html#~head "Detailed in docs"
>
> Get first item from array

##### [#][id:4] **shuffle()**

> [id:4]: https://utils.eaglex.net/module-x-utils.html#~shuffle "Detailed in docs"
>
> Randomise items in array

##### [#][id:5] **flatten()**

> [id:5]: https://utils.eaglex.net/module-x-utils.html#~flatten "Detailed in docs"
>
> Flatten 2 level array to 1 level

##### [#][id:6] **flattenDeep()**

> [id:6]: https://utils.eaglex.net/module-x-utils.html#~flattenDeep "Detailed in docs"
>
> Flatten all array levels to 1

##### [#][id:7] **last()**

> [id:7]: https://utils.eaglex.net/module-x-utils.html#~last "Detailed in docs"
>
> Gets last item from array

##### [#][id:8] **copy()**

> [id:8]: https://utils.eaglex.net/module-x-utils.html#~copy "Detailed in docs"
>
> Makes item copy

##### [#][id:9] **copyBy()**

> [id:9]: https://utils.eaglex.net/module-x-utils.html#~copyBy "Detailed in docs"
>
> Copy object by property name

##### [#][id:10] **copyDeep()**

> [id:10]: https://utils.eaglex.net/module-x-utils.html#~copyDeep "Detailed in docs"
>
> Makes deep copy including nested items

##### [#][id:11] **asJson()**

> [id:11]: https://utils.eaglex.net/module-x-utils.html#~asJson "Detailed in docs"
>
> Returns in pretty json fromat

##### [#][id:12] **isFunction()**

> [id:12]: https://utils.eaglex.net/module-x-utils.html#~isFunction "Detailed in docs"
>
> Check if item is a function

##### [#][id:13] **timer()**

> [id:13]: https://utils.eaglex.net/module-x-utils.html#~timer "Detailed in docs"
>
> Timer callback executes on timeout

##### [#][id:14] **interval()**

> [id:14]: https://utils.eaglex.net/module-x-utils.html#~interval "Detailed in docs"
>
> Execute callback every interval, then exit on endTime

##### [#][id:15] **validID()**

> [id:15]: https://utils.eaglex.net/module-x-utils.html#~validID "Detailed in docs"
>
> Convert to string, remove spaces, toLowerCase

##### [#][id:16] **isNumber()**

> [id:16]: https://utils.eaglex.net/module-x-utils.html#~isNumber "Detailed in docs"
>
> Check item is a number

##### [#][id:17] **sq()**

> [id:17]: https://utils.eaglex.net/module-x-utils.html#~sq "Detailed in docs"
>
> SimpleQ / instanceof Promise, deferred simplified promise

##### [#][id:18] **isPromise()**

> [id:18]: https://utils.eaglex.net/module-x-utils.html#~isPromise "Detailed in docs"
>
> Check for `Promise` / `q.defer` / and xutils promise `sq()`

##### [#][id:19] **isQPromise()**

> [id:19]: https://utils.eaglex.net/module-x-utils.html#~isQPromise "Detailed in docs"
>
> Tests for the `q.defer()` node.js promise version

##### [#][id:20] **cancelPromise()**

> [id:20]: https://utils.eaglex.net/module-x-utils.html#~cancelPromise "Detailed in docs"
>
> Cancelable synchronous process, determines how long to wait before we exit

##### [#][id:21] **uniq()**

> [id:21]: https://utils.eaglex.net/module-x-utils.html#~uniq "Detailed in docs"
>
> Returns new array of unique values

##### [#][id:22] **uniqBy()**

> [id:22]: https://utils.eaglex.net/module-x-utils.html#~uniqBy "Detailed in docs"
>
> Selects first match ignoring others of those which prop values are repeated

##### [#][id:23] **isObject()**

> [id:23]: https://utils.eaglex.net/module-x-utils.html#~isObject "Detailed in docs"
>
> Test item is a true object, and not array

##### [#][id:24] **isArray()**

> [id:24]: https://utils.eaglex.net/module-x-utils.html#~isArray "Detailed in docs"
>
> Test item is a true array, and not object

##### [#][id:25] **arraySize()**

> [id:25]: https://utils.eaglex.net/module-x-utils.html#~arraySize "Detailed in docs"
>
> Test item is an array, and check the size

##### [#][id:26] **chunks()**

> [id:26]: https://utils.eaglex.net/module-x-utils.html#~chunks "Detailed in docs"
>
> Split array to chunks by providing size number

##### [#][id:27] **isString()**

> [id:27]: https://utils.eaglex.net/module-x-utils.html#~isString "Detailed in docs"
>
> Test item is a string type

##### [#][id:27a] **isRegExp()**

> [id:27a]: https://utils.eaglex.net/module-x-utils.html#~isRegExp "Detailed in docs"
>
> Check pattern is an expression of RegExp

##### [#][id:28] **isFalsy()**

> [id:28]: https://utils.eaglex.net/module-x-utils.html#~isFalsy "Detailed in docs"
>
> Check if any item type is falsy, object, array, class/instance,
> having no props set

##### [#][id:29] **isTrue()**

> [id:29]: https://utils.eaglex.net/module-x-utils.html#~isTrue "Detailed in docs"
>
> Check if item is `gth > 0`, `true`, basically opposite of `isFalse()`

##### [#][id:30] **isFalse()**

> [id:30]: https://utils.eaglex.net/module-x-utils.html#~isFalse "Detailed in docs"
>
> Check if item is `lt < 1`, `false`, `null` or `undefined`

##### [#][id:31] **isBoolean()**

> [id:31]: https://utils.eaglex.net/module-x-utils.html#~isBoolean "Detailed in docs"
>
> Check if item is a boolean

##### [#][id:32] **isNull()**

> [id:32]: https://utils.eaglex.net/module-x-utils.html#~isNull "Detailed in docs"
>
> Check if item is `===null`

##### [#][id:33] **isUndefined()**

> [id:33]: https://utils.eaglex.net/module-x-utils.html#~isUndefined "Detailed in docs"
>
> Check if item is `===undefined`

##### [#][id:34] **delay()**

> [id:34]: https://utils.eaglex.net/module-x-utils.html#~delay "Detailed in docs"
>
> Delay a sync/async process, to be executed after `delay` is resolved

##### [#][id:35] **truthFul()**

> [id:35]: https://utils.eaglex.net/module-x-utils.html#~truthFul "Detailed in docs"
>
> Return new object excluding all undefined values in top level

##### [#][id:36] **inIndex()**

> [id:36]: https://utils.eaglex.net/module-x-utils.html#~inIndex "Detailed in docs"
>
> Test accuracy of a `match[x]` in a string

##### [#][id:37] **matched()**

> [id:37]: https://utils.eaglex.net/module-x-utils.html#~matched "Detailed in docs"
>
> Match string value by expression

##### [#][id:38] **someKeyMatch()**

> [id:38]: https://utils.eaglex.net/module-x-utils.html#~someKeyMatch "Detailed in docs"
>
> Test if ANY keys match between `object{}` and `source{}`

##### [#][id:39] **exactKeyMatch()**

> [id:39]: https://utils.eaglex.net/module-x-utils.html#~exactKeyMatch "Detailed in docs"
>
> Test if ALL keys match between `object{}` and `source{}`

##### [#][id:40] **trueVal()**

> [id:40]: https://utils.eaglex.net/module-x-utils.html#~trueVal "Detailed in docs"
>
> Exclude any falsy values from array, such as: `[0,null,false,{},undefined, -1,'',[]]`

##### [#][id:41] **trueValDeep()**

> [id:41]: https://utils.eaglex.net/module-x-utils.html#~trueValDeep "Detailed in docs"
>
> Exclude any falsy values from array: `[0,null,false,{},undefined, -1,'',[]]`,
> but testing 1 level deeper, compared to `trueVal()`

##### [#][id:42] **trueProp()**

> [id:42]: https://utils.eaglex.net/module-x-utils.html#~trueProp "Detailed in docs"
>
> Object with true entities will be returned

##### [#][id:43] **typeCheck()**

> [id:43]: https://utils.eaglex.net/module-x-utils.html#~typeCheck "Detailed in docs"
>
> Examines element for its `type`, provided `value`, and `primitive value`

##### [#][id:44] **isEmpty()**

> [id:44]: https://utils.eaglex.net/module-x-utils.html#~isEmpty "Detailed in docs"
>
> Check item has some `value`, set of `props`, or `length`

##### [#][id:45] **isError()**

> [id:45]: https://utils.eaglex.net/module-x-utils.html#~isError "Detailed in docs"
>
> Check item is of Error object family

##### [#][id:46] **isInstance()**

> [id:46]: https://utils.eaglex.net/module-x-utils.html#~isInstance "Detailed in docs"
>
> Testing if item{} is a `new Item{}`, instance of a class

##### [#][id:47] **isClass()**

> [id:47]: https://utils.eaglex.net/module-x-utils.html#~isClass "Detailed in docs"
>
> Test item is a class{} constractor, that can be initiated

##### [#][id:48] **hasPrototype()**

> [id:48]: https://utils.eaglex.net/module-x-utils.html#~hasPrototype "Detailed in docs"
>
> Test item is a class{} constractor, that can be initiated, _( alias of isClass() )_

##### [#][id:50] **hasProto()**

> [id:50]: https://utils.eaglex.net/module-x-utils.html#~hasProto "Detailed in docs"
>
> Check if item has access to `__proto__`

##### [#][id:51] **validDate()**

> [id:51]: https://utils.eaglex.net/module-x-utils.html#~validDate "Detailed in docs"
>
> Evaluate if data is an actual `Date`

##### [#][id:52] **selectiveArray()**

> [id:52]: https://utils.eaglex.net/module-x-utils.html#~selectiveArray "Detailed in docs"
>
> Select data from array of objects by reference, and go down recursively
> in order of selectBy `['a.b']` ref

##### [#][id:53] **arrayWith()**

> [id:53]: https://utils.eaglex.net/module-x-utils.html#~arrayWith "Detailed in docs"
>
> Mixed array of objects and values, grab `items[]` that include specific prop.

##### [#][id:54] **exFromArray()**

> [id:54]: https://utils.eaglex.net/module-x-utils.html#~exFromArray "Detailed in docs"
>
> Exclude items from array matchd by `excludes[]`,
> and replace with `undefined` keeping index position

##### [#][id:55] **pickFromArray()**

> [id:55]: https://utils.eaglex.net/module-x-utils.html#~pickFromArray "Detailed in docs"
>
> Array selection tool. Filter items in `array[item,item]`
> by `picks[Types|primitives,values]` conditions

##### [#][id:56] **dispatcher()**

> [id:56]: https://utils.eaglex.net/module-x-utils.html#~dispatcher "Detailed in docs"
>
> Lightweight Event Dispatcher, allowing dispatch anywhere in code,
> very handy in `callback/hell` situations, deep promises, or other computations.

##### [#][id:57] **withHoc()**

> [id:57]: https://utils.eaglex.net/module-x-utils.html#~withHoc "Detailed in docs"
>
> High order caller, concept taken from React HOC. Supports promises

##### [#][id:58] **resolver()**

> [id:58]: https://utils.eaglex.net/module-x-utils.html#~resolver "Detailed in docs"
>
> Run some method that returns value in future, checking updates until timeout,
> or exit when data becomes available.

##### [#][id:59] **dupes()**

> [id:59]: https://utils.eaglex.net/module-x-utils.html#~dupes "Detailed in docs"
>
> Duplicate item x:number of times

##### [#][id:60] **loop()**

> [id:60]: https://utils.eaglex.net/module-x-utils.html#~loop "Detailed in docs"
>
> Looping each item inside of callback

##### [#][id:60a] **noop()**

> [id:60a]: https://utils.eaglex.net/module-x-utils.html#~noop "Detailed in docs"
>
> No operation function

##### [#][id:60b] **trim()**

> [id:60b]: https://utils.eaglex.net/module-x-utils.html#~trim "Detailed in docs"
>
> Trim boths sides of string, including new lines, and multiple spaces to single space

##### [#][id:61] **xError()**

> [id:61]: https://utils.eaglex.net/module-x-utils.html#~xError "Detailed in docs"
>
> Extended Error(...) with extra `{id,name,fileName,lineNumber}` used to throw exception.

##### [#][id:62] **referenceError()**

> [id:62]: https://utils.eaglex.net/module-x-utils.html#~referenceError "Detailed in docs"
>
> Extended ReferenceError(...) with extra `{name,fileName,lineNumber,columnNumber}`,
> used to throw exception.

##### [#][id:63] **xrequire()**

> [id:63]: https://utils.eaglex.net/module-x-utils.html#~xrequire "Detailed in docs"
>
> Extended NodeRequire, does not throw when argument `ref=ERR_NO_THROW` is provided.
> THIS METHOD ONLY WORK FOR COMMON.JS modules, and not for browser

##### [#][id:64] **loggerSetting()**

> [id:64]: https://utils.eaglex.net/module-x-utils.html#~loggerSetting "Detailed in docs"
>
> Allow enabling and disabling of loggers:
> `log/warn/error/onerror/attention/debug/alert`

##### [#][id:65] **resetLogging()**

> [id:65]: https://utils.eaglex.net/module-x-utils.html#~resetLogging "Detailed in docs"
>
> Change state of xutils loggers when calling at top of hoist level.
> Effects: `log/warn/error/onerror/attention/debug/alert`

##### [#][id:66] **log()**

> [id:66]: https://utils.eaglex.net/module-x-utils.html#~log "Detailed in docs"
>
> Extends console.log with `[log]` prefix

##### [#][id:67] **debug()**

> [id:67]: https://utils.eaglex.net/module-x-utils.html#~debug "Detailed in docs"
>
> Extends console.log with `[debug]` prefix,
> produces `green` color output

##### [#][id:68] **onerror()**

> [id:68]: https://utils.eaglex.net/module-x-utils.html#~onerror "Detailed in docs"
>
> Extends console.error with `[error]` prefix,
> produces `red` color output

##### [#][id:69] **warn()**

> [id:69]: https://utils.eaglex.net/module-x-utils.html#~warn "Detailed in docs"
>
> Extends console.log with `[warn]` prefix,
> produces bright `white` color output

##### [#][id:70] **attention()**

> [id:70]: https://utils.eaglex.net/module-x-utils.html#~attention "Detailed in docs"
>
> Extends console.log with `[attention]` prefix,
> produces `blue` color output

##### [#][id:71] **alert()**

> [id:71]: https://utils.eaglex.net/module-x-utils.html#~alert "Detailed in docs"
>
> Extends console.log with `[alert]` prefix,
> produces `yellow` color output.
> Does not work on window object _( for obvious reasons! )_

##### [#][id:72] **stack()**

> [id:72]: https://utils.eaglex.net/module-x-utils.html#~stack "Detailed in docs"
>
> For stack tracing, prefixed with `[STACK TRACE]`

##### [#][id:73] **errorTrace()**

> [id:73]: https://utils.eaglex.net/module-x-utils.html#~errorTrace "Detailed in docs"
>
> For stack tracing, prefixed with `[ERROR]`

##### [#][id:74] **unsubscribe()**

> [id:74]: https://utils.eaglex.net/module-x-utils.html#~unsubscribe "Detailed in docs"
>
> Unsubscribe from an RX/subscription, by providing array of active subs

##### [#][id:75] **includes()**

> [id:75]: https://utils.eaglex.net/module-x-utils.html#~includes "Detailed in docs"
>
> Compare match array items with the id, if any were found return true

##### [#][id:76] **spread()**

> [id:76]: https://utils.eaglex.net/module-x-utils.html#~spread "Detailed in docs"
>
> Spread data of an object as you would ...data, but with selected prop names that match the object

##### [#][id:77] **spreadWith()**

> [id:76]: https://utils.eaglex.net/module-x-utils.html#~spreadWith "Detailed in docs"
>
> Spread only selected array items matching index number

&nbsp;

## Contact

Have questions, or would like to submit feedback [contact eaglex.net](https://eaglex.net/app/contact?product=x-utils)
