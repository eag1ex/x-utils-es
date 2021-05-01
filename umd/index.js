
// @ts-nocheck
/* tslint:disable */
/* eslint-disable */
/* eslint-disable no-proto */

/**
 * @x-utils
 * * Simple javascript, lodash alternative library
 * * Developed by Anon
 * * License: CC-BY-SA-4.0
 * * For projects contact me at: eaglex.net
 */


(function(global,factory){if("function"===typeof define&&define.amd)define("xutils",["module","exports"],factory);else if("undefined"!==typeof exports)factory(module,exports);else{var mod={exports:{}};factory(mod,mod.exports),global.xutils=mod.exports}})(void 0,function(module,exports){"use strict";var _Numberprototype=Number.prototype,_Stringprototype=String.prototype;function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}var gen=fn.apply(self,args);_next(void 0)})}}Object.defineProperty(exports,"__esModule",{value:!0});var isWindow=()=>{try{if("test"===(process.env||{}).NODE_ENV)return!1;if(window)return!0}catch(err){return!1}},checkLoggerSetting=function checkLoggerSetting(logType){void 0===logType&&(logType="");try{if(isWindow())return window.xUtilsConfig||(window.xUtilsConfig={}),window.xUtilsConfig?"off"===window.xUtilsConfig.logging?"off":(window.xUtilsConfig[logType]?window.xUtilsConfig[logType]:"on").toString():"on"}catch(err){}try{return global.xUtilsConfig||(global.xUtilsConfig={}),global.xUtilsConfig?"off"===global.xUtilsConfig.logging?"off":(global.xUtilsConfig[logType]?global.xUtilsConfig[logType]:"on").toString():"on"}catch(err){}return"on"},loggingON=()=>{try{if(isWindow())return"on"===(window.xUtilsConfig||{}).logging||(window.xUtilsConfig||{}).logging===void 0}catch(err){}try{return"on"===(global.xUtilsConfig||{}).logging||(global.xUtilsConfig||{}).logging===void 0}catch(err){}return!0},callFN=function callFN(cb){if(void 0===cb&&(cb=void 0),"function"!==typeof cb)return!1;try{var d=cb();return!0===d||0<d}catch(err){return!1}},logConstract=function logConstract(type,args){void 0===type&&(type=""),args.length||(args[0]="");var allData=0===args.filter(n=>"string"===typeof n||n===void 0).length,format=allData?"%o":"";"log"===type&&(args=[].concat("\x1B[90m[log]\x1B[0m\x1B[2m"+format+" ",args,"\x1B[0m")),"debug"===type&&(args=[].concat("\x1B[90m[debug]\x1B[0m\x1B[32m"+format+" ",args,"\x1B[0m")),"warn"===type&&(args=[].concat("\x1B[90m[warning]\x1B[0m\x1B[1m"+format+" ",args,"\x1B[0m")),"alert"===type&&(args=[].concat("\x1B[90m[alert]\x1B[0m\x1B[33m"+format+" ",args,"\x1B[0m")),"attention"===type&&(args=[].concat("\x1B[90m[attention]\x1B[0m\x1B[36m"+format+" ",args,"\x1B[0m"));try{return void(window&&console.log.apply(null,args))}catch(err){}console.log.apply(null,args)},log=function log(){if(loggingON()&&"off"!==checkLoggerSetting("log")){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];return logConstract("log",args)}},warn=function warn(){if(loggingON()&&"off"!==checkLoggerSetting("warn")){for(var _len3=arguments.length,args=Array(_len3),_key3=0;_key3<_len3;_key3++)args[_key3]=arguments[_key3];return logConstract("warn",args)}},alert=function alert(){if(loggingON()&&"off"!==checkLoggerSetting("alert")){for(var _len4=arguments.length,args=Array(_len4),_key4=0;_key4<_len4;_key4++)args[_key4]=arguments[_key4];return logConstract("alert",args)}},onerror=function onerror(){for(var _len6=arguments.length,args=Array(_len6),_key6=0;_key6<_len6;_key6++)args[_key6]=arguments[_key6];if(loggingON()&&"off"!==checkLoggerSetting("error")&&"off"!==checkLoggerSetting("onerror")){args.length||(args[0]="");var allData=0===args.filter(n=>"string"===typeof n||void 0===n).length,format=allData?"%o":"";try{if(isWindow())return args=[].concat("\x1B[31m[error]\x1B[0m\x1B[31m"+format+" ",args,"\x1B[0m"),void console.error.apply(null,args)}catch(err){}args=[].concat("\x1B[41m[error]\x1B[0m\x1B[31m"+format+" ",args,"\x1B[0m"),console.error.apply(null,args)}},error=onerror,isFunction=function isFunction(el){return void 0===el&&(el=void 0),"function"===typeof el},isBigInt=n=>"bigint"===typeof n,isArray=function isArray(arr,cbEval){return void 0===arr&&(arr=void 0),void 0===cbEval&&(cbEval=void 0),(!isFunction(cbEval)||callFN(cbEval))&&!isBigInt(arr)&&!!arr&&Array.prototype===arr.__proto__},typeCheck=function typeCheck(el,standard){void 0===standard&&(standard=!0);var ofType=type=>standard?typeof el:type||typeof el,asPrototype=Type=>Type.prototype===el.prototype;try{return"symbol"===typeof el?{type:ofType(),value:0,primitiveValue:Symbol("")}:void 0===el?{type:ofType(),value:0,primitiveValue:void 0}:"boolean"===typeof el?{type:ofType(),value:+el,primitiveValue:Boolean()}:"bigint"===typeof el&&"object"===typeof Object(el)?{type:ofType(),value:1,primitiveValue:BigInt("")}:null===el?{type:ofType("null"),value:0,primitiveValue:{}}:el.__proto__===Date.prototype||asPrototype(Date)?{type:ofType("date"),value:1,primitiveValue:new Date}:_Stringprototype===el.__proto__?{type:ofType(),value:el.length,primitiveValue:String()}:Array.prototype===el.__proto__||asPrototype(Array)?{type:ofType("array"),value:(el||[]).length,primitiveValue:[]}:Promise.prototype===(el||"").__proto__||asPrototype(Promise)?{type:ofType("promise"),value:1,primitiveValue:Function}:Function.prototype===el.__proto__||asPrototype(Function)?{type:ofType(),value:1,primitiveValue:Function}:Object.prototype===el.__proto__||asPrototype(Object)?{type:ofType(),value:Object.keys(el).length,primitiveValue:{}}:Error.prototype===el.__proto__||asPrototype(Error)?{type:ofType("error"),value:Object.keys(el).length,primitiveValue:Error()}:el.__proto__===_Numberprototype||asPrototype(Number)?isNaN(el)?{type:ofType("NaN"),value:0,primitiveValue:Number()}:{type:ofType(),value:el,primitiveValue:Number()}:!1===0<=+el?{type:typeof el,value:+el,primitiveValue:void 0}:{type:typeof el,value:0,primitiveValue:void 0}}catch(err){return error(err),{}}},isError=el=>Error.prototype===(el||"").__proto__,isBoolean=el=>{if(el===void 0)return!1;if(null===el)return!1;if(!0===el||!1===el)return!0;try{if(el instanceof Boolean)return!0}catch(err){}return!1},isNull=el=>null===el,isUndefined=el=>"undefined"===typeof el,isNumber=n=>{if(isBigInt(n))return!1;try{if(n instanceof Number)return!0}catch(err){}return!(n===void 0||null===n||""===n)&&n.__proto__===_Numberprototype},isQPromise=function isQPromise(defer){void 0===defer&&(defer=void 0);try{if(!0===(defer.promise!==void 0&&"function"===typeof defer.resolve&&"function"===typeof defer.reject&&"function"===typeof defer.fulfill&&"function"===typeof defer.notify))return!0}catch(err){}return!1},isSQ=defer=>{try{return"SimpleQ"===defer.entity}catch(err){return!1}},isPromise=defer=>{if(isQPromise(defer))return!0;try{if(defer instanceof Promise)return!0}catch(err){}return!1},isObject=function isObject(obj,cbEval){if(void 0===obj&&(obj=void 0),void 0===cbEval&&(cbEval=void 0),isFunction(cbEval)&&!callFN(cbEval))return!1;if(isBigInt(obj))return!1;if(isNaN(obj)&&"number"===typeof obj)return!1;if("function"===typeof obj)return!1;if(!isNaN(+obj)||void 0===obj)return!1;if(obj.__proto__===[].__proto__)return!1;var a=Object.prototype===obj.__proto__||Error.prototype===obj.__proto__,ab=a&&obj instanceof Object;if(ab)return!0;if(void 0!==obj.__proto__)try{return obj instanceof Object}catch(err){return!1}return!!obj.prototype},uniq=function uniq(arr){void 0===arr&&(arr=[]);var o=[];return o=arr.filter((el,i,all)=>all.indexOf(el)===i),o instanceof Array?o:[]},isClass=function isClass(obj,cbEval){return void 0===obj&&(obj={}),void 0===cbEval&&(cbEval=void 0),(!isFunction(cbEval)||callFN(cbEval))&&!!obj&&void 0!==obj.prototype},isRegExp=function isRegExp(expression){void 0===expression&&(expression=/\\/);try{return expression instanceof RegExp}catch(err){return!1}},isInstance=function isInstance(obj,cbEval){if(void 0===obj&&(obj={}),void 0===cbEval&&(cbEval=void 0),isFunction(cbEval)&&!callFN(cbEval))return!1;if(!obj)return!1;if(isArray(obj))return!1;if(obj.__proto__&&!isClass(obj))try{return obj.__proto__ instanceof Object}catch(err){return!1}return!1},objectSize=function objectSize(obj){return void 0===obj&&(obj={}),obj&&isNaN(+obj)?isInstance(obj)?Object.keys(obj).length:Object.prototype===obj.__proto__||Error.prototype===obj.__proto__?Object.keys(obj).length:0:0},isFalsy=function isFalsy(el){return void 0===el&&(el=void 0),void 0===el||null===el||!1===el&&"boolean"===typeof el||(!0!==el||"boolean"!==typeof el)&&!("number"===typeof el&&0<el)&&(_Stringprototype===el.__proto__?1>el.length:Array.prototype===el.__proto__?0===(el||[]).length:Promise.prototype!==(el||{}).__proto__&&"function"!==typeof el&&(Object.prototype===el.__proto__||isInstance(el)?0===Object.keys(el).length:Error.prototype!==el.__proto__&&(void 0!==el&&el.__proto__===_Numberprototype?!!isNaN(el)||0>=el:!1===0<+el||!el&&!1)))},isString=function isString(str,cbEval){return void 0===str&&(str=void 0),void 0===cbEval&&(cbEval=void 0),(!isFunction(cbEval)||callFN(cbEval))&&void 0!==str&&null!==str&&"boolean"!==typeof str&&(""===str||_Stringprototype===str.__proto__)},copy=data=>{try{return JSON.parse(JSON.stringify(data))}catch(err){return typeCheck(data).primitiveValue}};exports.disableLogging=()=>{try{if(isWindow())return window.xUtilsConfig?window.xUtilsConfig.logging="off":window.xUtilsConfig={logging:"off"},!0}catch(err){}try{return global.xUtilsConfig?global.xUtilsConfig.logging="off":global.xUtilsConfig={logging:"off"},!0}catch(err){return!1}},exports.resetLogging=()=>{try{if(isWindow())return window.xUtilsConfig?window.xUtilsConfig.logging="on":window.xUtilsConfig={logging:"on"},!0}catch(err){}try{return global.xUtilsConfig?global.xUtilsConfig.logging="on":global.xUtilsConfig={logging:"on"},!0}catch(err){return!1}},exports.loggerSetting=function loggerSetting(logType,logMode){void 0===logType&&(logType="log"),void 0===logMode&&(logMode="off");if(!["log","warn","onerror","error","alert","attention","debug","stack","errorTrace"].includes(logType)||!logType)return!1;if(!["on","off"].includes(logMode)||!logMode)return!1;"onerror"===logType&&(logType="error");try{if(isWindow())return window.xUtilsConfig?window.xUtilsConfig[logType]=logMode:window.xUtilsConfig={[logType]:logMode},!0}catch(err){}try{return global.xUtilsConfig?global.xUtilsConfig[logType]=logMode:global.xUtilsConfig={[logType]:logMode},!0}catch(err){return!1}},exports.checkLoggerSetting=checkLoggerSetting,exports.stack=function stack(data,asArray){if((void 0===asArray&&(asArray=!1),!!loggingON())&&"off"!==checkLoggerSetting("stack")){var stackList=new Error(JSON.stringify(data)).stack.split("(");stackList.splice(1,1);var stackHead=stackList[0].split(/\n/)[0].replace("Error","[STACK TRACE]");return stackList.splice(0,1),stackList.unshift(stackHead),void(asArray?console.log(stackList):console.log.apply(null,stackList))}},exports.errorTrace=function errorTrace(data,asArray){if((void 0===asArray&&(asArray=!1),!!loggingON())&&"off"!==checkLoggerSetting("errorTrace")){var stackList=new Error(JSON.stringify(data)).stack.split("(");stackList.splice(1,1);var errHead=stackList[0].split(/\n/)[0].replace("Error","[ERROR]");return stackList.splice(0,1),stackList.unshift(errHead),void(asArray?console.error(stackList):console.error.apply(null,stackList))}},exports.loop=function loop(size,cb){void 0===size&&(size=0),void 0===cb&&(cb=function cb(index){void 0===index&&(index=0)});var isFN="function"===typeof cb,isNum="number"===typeof size;if(!isFN||!isNum)return[];for(var r,d=[],inx=0;inx<Array(size).length;inx++){r=cb.apply(this,[inx]);try{if(r&&Object.entries(r).length&&r.break)break}catch(err){}d.push(r)}return d},exports.isFalse=el=>{if(null===el)return!0;if("undefined"===typeof el)return!0;if("number"===typeof el&&1>el)return!0;if("boolean"===typeof el&&!1===el)return!0;try{if(el instanceof Boolean)return!1===el.valueOf()}catch(err){}return!1},exports.isTrue=el=>{if(null===el)return!1;if("undefined"===typeof el)return!1;if("number"===typeof el&&0<el)return!0;if("boolean"===typeof el&&!0===el)return!0;try{if(el instanceof Boolean)return!0===el.valueOf()}catch(err){}return!1},exports.isBoolean=isBoolean,exports.isNull=isNull,exports.isUndefined=isUndefined,exports.isEmpty=value=>!isError(value)&&!typeCheck(value).value,exports.head=function head(arr){return void 0===arr&&(arr=[]),Array.prototype===(arr||null).__proto__?arr.flat().shift():void 0},exports.last=function last(arr){return void 0===arr&&(arr=[]),arr&&Array.prototype===arr.__proto__?arr[arr.length-1]:void 0},exports.timer=function timer(cb,time){void 0===cb&&(cb=()=>{}),void 0===time&&(time=0);var isFN="function"===typeof cb;if(isFN){time="number"===typeof time&&0<=time?time:0;var s=setTimeout(()=>{cb(),clearTimeout(s)},time)}},exports.interval=function interval(cb,every,endTime){void 0===cb&&(cb=()=>{}),void 0===every&&(every=0),void 0===endTime&&(endTime=0);var isFN="function"===typeof cb;if(!isFN)return null;every="number"===typeof every&&0<=every?every:0,endTime="number"===typeof endTime&&0<=endTime?endTime:0;var counter=0,c=setInterval(()=>(cb(),endTime<=counter?clearInterval(c):void(counter+=every)),every)},exports.sq=()=>{class SimpleQ extends Promise{constructor(deferrerCallback){void 0===deferrerCallback&&(deferrerCallback=function deferrerCallback(resolve,reject){void 0===resolve&&(resolve=()=>{}),void 0===reject&&(reject=()=>{})}),SimpleQ._promise=super(deferrerCallback)}resolve(data){var res=SimpleQ._resolve;return res instanceof Function?res(data):onerror("[SimpleQ][resolve]","not callable"),this}reject(data){var rej=SimpleQ._reject;return rej instanceof Function?rej(data):onerror("[SimpleQ][reject]","not callable"),this}get promise(){var promise=SimpleQ._promise;return promise instanceof Promise?promise:void 0}}var deferred=new SimpleQ((resolve,reject)=>{SimpleQ._resolve=resolve,SimpleQ._reject=reject});if(deferred.__proto__.entity="SimpleQ",deferred instanceof Promise&&deferred instanceof SimpleQ)return deferred;throw"sq() not a valid Promise ?"},exports.validID=function validID(id){return void 0===id&&(id=""),id||""?(id||"").toString().toLowerCase().replace(/\s/g,""):""},exports.isBigInt=isBigInt,exports.isNumber=isNumber,exports.stringSize=function stringSize(str){return void 0===str&&(str=""),void 0!==str&&null!==str?str.__proto__===_Stringprototype?str.length:0:0},exports.cancelPromise=_ref=>{var{defer={},checkEvery=500,maxWait=9500,cbErr=_ref2=>{var{error,defer,id}=_ref2},message="taken too long to respond",logging=!1,id=void 0}=_ref,validPromise=isPromise(defer)||isQPromise(defer);if(!validPromise||!(el=>"function"===typeof el)(cbErr)||!maxWait)return onerror("[cancelPromise]","{defer,maxWait,cbErr} must be provided"),Promise.reject("{defer,maxWait,cbErr} must be provided");var exit_interval,every=checkEvery||500;maxWait=maxWait||1;var inx=0,t=setInterval(()=>{if(exit_interval)return clearInterval(t);if(inx>maxWait){var args={error:message+", time: "+inx,defer,id};try{cbErr.apply(args,[args]),defer.reject(message+", time: "+inx)}catch(err){onerror("[cancelPromise]",err)}return clearInterval(t)}logging&&(id?log("-- processing: ",id):alert("-- processing "));inx=every+inx},every),deffer=def=>def.then(n=>(exit_interval=!0,n),err=>(exit_interval=!0,Promise.reject(err)));return isSQ(defer)||isPromise(defer)&&!isQPromise(defer)?deffer(defer):isQPromise(defer)?deffer(defer.promise):Promise.reject("[cancelPromise], Supplied {defer} is not a promise")},exports.shuffle=function shuffle(arr){var _Mathfloor=Math.floor;if(void 0===arr&&(arr=[]),!isArray(arr))return[];for(var i=arr.length-1;0<i;i--){var j=_Mathfloor(Math.random()*i),k=arr[i];arr[i]=arr[j],arr[j]=k}return arr},exports.selectiveArray=function selectiveArray(selectBy,data){if(void 0===selectBy&&(selectBy=[]),void 0===data&&(data=[]),!isArray(data))return[];if(!data.length)return[];if(!isArray(selectBy))return data;if(!selectBy.length)return data;selectBy=uniq(selectBy);for(var item,nData=[],findNest=function findNest(s,item,inx){void 0===inx&&(inx=0);var found,lastItem=null;if(s&&isArray(s)&&s.length){try{if(void 0!==item[s[inx]])return lastItem=item[s[inx]],found=lastItem,++inx,s[inx]?findNest(s,found,inx):found}catch(err){console.log(err.toString())}return found}},i=0;i<data.length;i++){if(item=data[i],!isObject(item)){nData.push([item]);continue}for(var sArr,found=void 0,collective=[],o=0;o<selectBy.length;o++){sArr=(selectBy[o]||"").split(".");try{found=findNest(sArr,item,0),collective.push(found)}catch(err){}}if(selectBy.length===collective.length){var allUndef=collective.filter(n=>void 0===n);allUndef.length===selectBy.length&&(collective=collective.filter(n=>!!n))}collective.length?nData.push([].concat(collective)):void 0!==found&&nData.push(found)}return nData},exports.hasPrototype=isClass,exports.hasProto=function hasProto(el,cbEval){if(void 0===cbEval&&(cbEval=void 0),isFunction(cbEval)&&!callFN(cbEval))return!1;try{return void 0!==el.__proto__}catch(err){return!1}},exports.objectSize=objectSize,exports.isString=isString,exports.isFunction=isFunction,exports.copyBy=function copyBy(obj,refs){if(void 0===obj&&(obj={}),void 0===refs&&(refs=[]),!isObject(obj))return{};var d=[].concat(refs).reduce((n,el)=>(void 0!==obj[el]&&(n[el]=obj[el]),n),{});try{return JSON.parse(JSON.stringify(d))}catch(err){return{}}},exports.copyDeep=data=>{if(isArray(data))return data.map(n=>copy(n));if(isObject(data))return Object.entries(data).reduce((n,_ref3)=>{var[k,val]=_ref3;return n[k]=isObject(val)?Object.assign({},copy(val)):val,n},{});try{return JSON.parse(JSON.stringify(data))}catch(err){return typeCheck(data).primitiveValue}},exports.delay=function delay(time){void 0===time&&(time=100);var isNum="number"===typeof time&&0<=time;return isNum?new Promise(resolve=>{var t=setTimeout(()=>{clearTimeout(t),resolve(!0)},time)}):Promise.resolve(!0)},exports.someKeyMatch=function someKeyMatch(object,source,cbEval){if(void 0===object&&(object={}),void 0===source&&(source={}),void 0===cbEval&&(cbEval=void 0),isFunction(cbEval)&&!callFN(cbEval))return!1;if(!object||Object.prototype!==object.__proto__)return!1;if(!source||Object.prototype!==source.__proto__)return!1;var a=Object.keys(object),b=Object.keys(source);return a.length>=b.length?0<a.filter(z=>b.filter(zz=>zz===z).length).length:0<b.filter(z=>a.filter(zz=>zz===z).length).length},exports.exactKeyMatch=function exactKeyMatch(object,source,cbEval){if(void 0===object&&(object={}),void 0===source&&(source={}),void 0===cbEval&&(cbEval=void 0),isFunction(cbEval)&&!callFN(cbEval))return!1;if(!object||Object.prototype!==object.__proto__)return!1;if(!source||Object.prototype!==source.__proto__)return!1;var a=Object.keys(object),b=Object.keys(source);return a.length>=b.length?a.filter(z=>b.filter(zz=>zz===z).length).length===a.length:b.filter(z=>a.filter(zz=>zz===z).length).length===b.length},exports.trueVal=function trueVal(arr){return void 0===arr&&(arr=[]),arr&&Array.prototype===arr.__proto__?[].concat(arr).filter(itm=>!0!==isFalsy(itm)):[]},exports.trueValDeep=function trueValDeep(arr){return void 0===arr&&(arr=[]),arr&&Array.prototype===arr.__proto__?arr.length?[].concat(arr).map(itm=>{var typeIs=typeCheck(itm,!1);return"array"===typeIs.type&&0<typeIs.value?itm.map(child=>0<typeCheck(child,!1).value?child:null).filter(n=>!!n):"object"===typeIs.type&&typeIs.value?Object.entries(itm).reduce((n,_ref4)=>{var[k,v]=_ref4;return 0<typeCheck(k,!1).value&&(n[k]=v),n},{}):0<typeIs.value?itm:null}).filter(n=>!!n):[]:[]},exports.trueProp=function trueProp(obj){return void 0===obj&&(obj={}),obj&&Object.prototype===obj.__proto__?Object.entries(obj).reduce((n,_ref5)=>{var[key,val]=_ref5;return isFalsy(val)||(n[key]=val),n},{}):{}},exports.resolver=function resolver(fn,timeout,testEvery){void 0===fn&&(fn=()=>{}),void 0===timeout&&(timeout=5e3),void 0===testEvery&&(testEvery=50);var isFunction="function"===typeof fn;return isFunction?new Promise(resolve=>{var every=testEvery||50,max=timeout,inx=0,test=function(){var _ref6=_asyncToGenerator(function*(){try{return yield fn()}catch(error){return isError(error)?{error}:isObject(error)?error.error?error:{error:error}:{error}}});return function test(){return _ref6.apply(this,arguments)}}(),t=setInterval(_asyncToGenerator(function*(){var anon=test();if(anon.catch(err=>err),inx>=max)return(anon||{}).resolve&&anon.resolve(void 0),resolve(void 0),clearInterval(t);inx+=every;try{inx+=every;var d=yield anon;if(d)return resolve(d),clearInterval(t)}catch(error){return isError(error)&&resolve(error),isObject(error)?error.error?resolve(error):resolve({error}):resolve({error}),clearInterval(t)}}),every)}):Promise.reject("fn() must be callable")},exports.flatten=function flatten(arr){return void 0===arr&&(arr=[]),isArray(arr)?[].concat(...arr):[]},exports.flattenDeep=function flattenDeep(arr){function test(arr,d){return void 0===d&&(d=1),0<d?arr.reduce((acc,val)=>acc.concat(Array.isArray(val)?test(val,d-1):val),[]):arr.slice()}void 0===arr&&(arr=[]);var o=[];if(!isArray(arr))return o;try{return o=test(arr,1/0)||[],o instanceof Array?o:[]}catch(err){return[]}},exports.chunks=function chunks(arr,size){var _Mathceil=Math.ceil;return void 0===arr&&(arr=[]),void 0===size&&(size=0),Array.from({length:_Mathceil(arr.length/size)},(v,i)=>arr.slice(i*size,i*size+size))},exports.dupes=function dupes(item,index){void 0===index&&(index=0);for(var dups=[],n=parseInt(index);0<n;)n--,dups.push(item);return dups},exports.uniqBy=function uniqBy(arr,propName){void 0===arr&&(arr=[]),void 0===propName&&(propName="");var stored={},n=[];if(!propName)return[];if(!(arr||[]).length)return[];for(var _ret,_loop=function _loop(inx){var item=arr[inx];if(isUndefined(item)||isNull(item))return n.push(item),"continue";if(!isObject(item))return n.push(item),"continue";if(!item[propName])return n.push(item),"continue";var exists=Object.entries(stored).filter(_ref8=>{var[k]=_ref8;return item[propName]===stored[k]}).length;return exists?"continue":void(item[propName]!==stored[propName+(":"+inx)]&&(stored[propName+(":"+inx)]=item[propName],n.push(item)))},inx=0;inx<arr.length;inx++)_ret=_loop(inx),"continue"===_ret;return n},exports.arrayWith=function arrayWith(arr,prop){if(void 0===arr&&(arr=[]),void 0===prop&&(prop=""),!isArray(arr))return[];var objWith=o=>isObject(o)?-1===Object.keys(o).indexOf(prop)?void 0:o:void 0;try{var o=arr.map(n=>objWith(n)).filter(n=>!!n);return o instanceof Array?o:[]}catch(err){return[]}},exports.exFromArray=function exFromArray(arr,excludes){void 0===arr&&(arr=[]),void 0===excludes&&(excludes=[]);try{if(!(arr instanceof Array))return[]}catch(err){return[]}if(excludes=[].concat(excludes),!excludes.length)return arr;var excludeFrom=function excludeFrom(obj,excludes){if(void 0===obj&&(obj={}),void 0===excludes&&(excludes=[]),!isObject(obj))return obj;var d=Object.entries(obj).reduce((n,_ref9)=>{var[k,val]=_ref9;return-1===excludes.indexOf(k)&&(n[k]=val),n},{});return isFalsy(d)?void 0:d};try{var _o=arr.map(n=>excludeFrom(n,excludes));return _o instanceof Array?_o:[]}catch(err){return[]}},exports.copy=copy,exports.uniq=uniq,exports.isPromise=isPromise,exports.isQPromise=isQPromise,exports.debug=function debug(){if(loggingON()&&"off"!==checkLoggerSetting("debug")){for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++)args[_key2]=arguments[_key2];return logConstract("debug",args)}},exports.log=log,exports.warn=warn,exports.onerror=onerror,exports.error=error,exports.alert=alert,exports.attention=function attention(){if(loggingON()&&"off"!==checkLoggerSetting("attention")){for(var _len5=arguments.length,args=Array(_len5),_key5=0;_key5<_len5;_key5++)args[_key5]=arguments[_key5];return logConstract("attention",args)}},exports.isObject=isObject,exports.isFalsy=isFalsy,exports.isError=isError,exports.typeCheck=typeCheck,exports.validDate=function validDate(dt,cbEval){if(void 0===cbEval&&(cbEval=void 0),isFunction(cbEval)&&!callFN(cbEval))return!1;try{return dt.__proto__===Date.prototype&&"Invalid Date"!==dt.toString()}catch(err){return!1}},exports.isInstance=isInstance,exports.isClass=isClass,exports.isArray=isArray,exports.pickFromArray=function pickFromArray(arr,picks){void 0===arr&&(arr=[]),void 0===picks&&(picks=[]);var o=[];try{if(!(arr instanceof Array))return o}catch(err){return[]}if(isArray(picks)||(picks=[].concat(picks)),!picks.length)return arr;var allowedPicks=[void 0,null,!1];if(picks=picks.filter(n=>!isFalsy(n)||allowedPicks.filter(nn=>nn===n||(isNumber(n)&&!isNaN(n)).length)),!picks.length)return arr;var isInstanceByName=(item,pick)=>{if(isArray(item)&&isFunction(pick)){if("object"===pick.name.toLowerCase())return!1;if("array"===pick.name.toLowerCase())return!0}if(isObject(item)&&isFunction(pick)){if("array"===pick.name.toLowerCase())return!1;if("object"===pick.name.toLowerCase())return!0}try{return(pick.name||"").toLowerCase()===typeof item}catch(err){}},evalItem=item=>{for(var selected,pick,inx=0;inx<picks.length;inx++){if(pick=picks[inx],isObject(pick)&&isObject(item)){var pEntries=Object.entries(pick),pass=pEntries.filter(_ref10=>{var[k,val]=_ref10,ok=item[k]===val;return!!ok||(void 0===item[k]?void 0:isInstanceByName(item[k],val))});if(pass=pass.length===pEntries.length&&Object.entries(item).length>=pass.length,pass&&objectSize(item)>=objectSize(pick)){selected=!0;break}}if(isArray(pick)&&isArray(item)){var _pass=pick.filter(n=>item.filter(nn=>nn===n||isInstanceByName(nn,n)).length);if(_pass=_pass.length===pick.length&&item.length>=_pass.length,_pass){selected=!0;break}}else if(pick===item){selected=!0;break}else if(isNumber(item)||isBoolean(item)||isString(item)||isArray(item)||isObject(item)||isFunction(item)){if(isInstanceByName(item,pick)){selected=!0;break}}else if(isInstanceByName(item,pick)){selected=!0;break}}return selected};try{return o=arr.reduce((n,el)=>(evalItem(el)&&n.push(el),n),[]),o instanceof Array?o:[]}catch(err){return[]}},exports.dispatcher=function dispatcher(uid,debug){function Dispatcher(uid,debug){var _this=this,plugin="[dispatcher]";this.uid=((uid||"").toString()||new Date().getTime()).toString(),this.debug=debug,this.cbQueue={},this.dispatchInstance={},this._isActive=null,this._onComplete_cb=null,this.index=0,this.data=null,this.onComplete=cb=>(this._onComplete_cb=cb,this),this.initListener=()=>(this.Dispatch(),this._isActive=!0,this),this.next=function(data){return void 0===data&&(data=null),!1!==_this._isActive&&_this.initListener(),_this.dispatchInstance[_this.uid]?_this.dispatchInstance[_this.uid].next(data):_this.debug&&log({message:plugin+" for uid not available",uid:_this.uid}),_this},this.Dispatch=()=>{if(this.dispatchInstance[this.uid])return this;var self=this;return this.dispatchInstance[this.uid]||(this.dispatchInstance[this.uid]=new function D(){this.uid=self.uid,this.data=null,this.next=data=>("cb"!==(data||{}).type&&(this.data=data),"cb"===(data||{}).type?void("function"===typeof data.cb&&(!self.cbQueue[self.uid]&&(self.cbQueue[self.uid]=data.cb),this.data&&(self.index++,self.data=this.data,data.cb.call(self,this.data,self.uid,self.index)))):void(this.data?"function"===typeof self.cbQueue[self.uid]&&(self.index++,self.data=this.data,self.cbQueue[self.uid].call(self,this.data,self.uid,self.index)):self.debug&&warn(plugin+" no callback data")))}),this},this.isActive=()=>this._isActive,this.del=()=>(delete this.cbQueue[this.uid],delete this.dispatchInstance[this.uid],this._isActive=!1,"function"===typeof this._onComplete_cb&&this._onComplete_cb(this.uid),this),this.subscribe=cb=>{return"function"===typeof cb?(this.dispatchInstance[this.uid]||this.Dispatch(),this.dispatchInstance[this.uid]&&this.dispatchInstance[this.uid].next({type:"cb",cb}),this):(this.debug&&warn(plugin+"[subscribe] cb must be set"),this)},this.init=this.initListener,this.sub=this.subscribe,this.emit=this.next,this.delete=this.del,this.unsubscribe=this.del}return void 0===uid&&(uid=void 0),void 0===debug&&(debug=!1),new Dispatcher(uid,debug)},exports.isSQ=isSQ,exports.withHoc=function withHoc(item){void 0===item&&(item=()=>{});for(var _len7=arguments.length,args=Array(1<_len7?_len7-1:0),_key7=1;_key7<_len7;_key7++)args[_key7-1]=arguments[_key7];var extraArgs=args,hoc=function hoc(){for(var _len8=arguments.length,args=Array(_len8),_key8=0;_key8<_len8;_key8++)args[_key8]=arguments[_key8];var argsFN=()=>{var _args;return _args=extraArgs?[].concat(args,extraArgs):args,_args};if(item instanceof Function)try{return item(...argsFN())}catch(err){onerror("[HOC]",err)}else{if(isPromise(item)){return(()=>{var asPromise=()=>item.promise?item.promise:item;return asPromise().then(defItem=>isFunction(defItem)?defItem(...argsFN()):Promise.reject("DEFERRED_NOT_CALLABLE"),err=>isFunction(err)?Promise.reject(err(...argsFN())):Promise.reject("DEFERRED_NOT_CALLABLE"))})()}onerror("[HOC]","item() must be callable function")}};return hoc},exports.isDate=d=>{try{return d instanceof Date}catch(err){return!1}},exports.xrequire=function xrequire(path,ref){if(void 0===path&&(path=""),void 0===ref&&(ref=""),!isWindow()){var Mod=function Mod(){};return Mod.prototype=Object.create(module.constructor.prototype),Mod.prototype.constructor=module.constructor,Mod.prototype.require=function(_path,ref){var self=this;try{return self.constructor._load(_path,self)}catch(err){if("ERR_NO_THROW"===ref)return;if("MODULE_NOT_FOUND"===err.code)throw err}},Mod.prototype instanceof module.constructor?Mod.prototype.require(path,ref):void 0}},exports.asJson=data=>{try{return JSON.stringify(data,null,2)}catch(err){return"[asJson], "+err.toString()}},exports.truthFul=function truthFul(obj){return void 0===obj&&(obj={}),isObject(obj)?Object.entries(obj).reduce((n,_ref11)=>{var[k,v]=_ref11;return void 0!==v&&(n[k]=v),n},{}):{}},exports.inIndex=function inIndex(str,patterns){void 0===str&&(str=""),void 0===patterns&&(patterns=[]);var o=0;if(!isArray(patterns))return o;if(!patterns.length)return o;if("string"!==typeof str)return o;if(!str)return o;var regx=(patt,s,inx)=>{try{return new RegExp(patt).test(s)}catch(err){return onerror("[inIndex]","wrong pattern/expression at index:"+inx),!1}};return o=patterns.filter((n,inx)=>regx(n,str,inx)).length,o},exports.isRegExp=isRegExp,exports.matched=function matched(str,expression){void 0===str&&(str=""),void 0===expression&&(expression=/\\/);var o=!1;if(!isString(str))return o;if(!isRegExp(expression))return o;if("string"!==typeof str)return o;if(!str)return o;return o=((patt,s)=>{try{return new RegExp(patt).test(s)}catch(err){return onerror("[matched]",err.toString()),!1}})(expression,str),o}});
