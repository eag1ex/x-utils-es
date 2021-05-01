"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.xrequire=xrequire,exports.matched=exports.isRegExp=exports.inIndex=exports.truthFul=exports.asJson=exports.isDate=exports.withHoc=exports.isSQ=exports.dispatcher=exports.pickFromArray=exports.isArray=exports.isClass=exports.isInstance=exports.validDate=exports.typeCheck=exports.isError=exports.isFalsy=exports.isObject=exports.attention=exports.alert=exports.error=exports.onerror=exports.warn=exports.log=exports.debug=exports.isQPromise=exports.isPromise=exports.uniq=exports.copy=exports.exFromArray=exports.arrayWith=exports.uniqBy=exports.dupes=exports.chunks=exports.flattenDeep=exports.flatten=exports.resolver=exports.trueProp=exports.trueValDeep=exports.trueVal=exports.exactKeyMatch=exports.someKeyMatch=exports.delay=exports.copyDeep=exports.copyBy=exports.isFunction=exports.isString=exports.objectSize=exports.hasProto=exports.hasPrototype=exports.selectiveArray=exports.shuffle=exports.cancelPromise=exports.stringSize=exports.isNumber=exports.isBigInt=exports.validID=exports.sq=exports.interval=exports.timer=exports.last=exports.head=exports.isEmpty=exports.isUndefined=exports.isNull=exports.isBoolean=exports.isTrue=exports.isFalse=exports.loop=exports.errorTrace=exports.stack=exports.checkLoggerSetting=exports.loggerSetting=exports.resetLogging=exports.disableLogging=void 0;const isWindow=()=>{try{if("test"===(process.env||{}).NODE_ENV)return!1;if(window)return!0}catch(err){return!1}},disableLogging=()=>{try{if(isWindow())return window.xUtilsConfig?window.xUtilsConfig.logging="off":window.xUtilsConfig={logging:"off"},!0}catch(err){}try{return global.xUtilsConfig?global.xUtilsConfig.logging="off":global.xUtilsConfig={logging:"off"},!0}catch(err){return!1}};exports.disableLogging=disableLogging;const resetLogging=()=>{try{if(isWindow())return window.xUtilsConfig?window.xUtilsConfig.logging="on":window.xUtilsConfig={logging:"on"},!0}catch(err){}try{return global.xUtilsConfig?global.xUtilsConfig.logging="on":global.xUtilsConfig={logging:"on"},!0}catch(err){return!1}};exports.resetLogging=resetLogging;const loggerSetting=(logType="log",logMode="off")=>{if(!["log","warn","onerror","error","alert","attention","debug","stack","errorTrace"].includes(logType)||!logType)return!1;if(!["on","off"].includes(logMode)||!logMode)return!1;"onerror"===logType&&(logType="error");try{if(isWindow())return window.xUtilsConfig?window.xUtilsConfig[logType]=logMode:window.xUtilsConfig={[logType]:logMode},!0}catch(err){}try{return global.xUtilsConfig?global.xUtilsConfig[logType]=logMode:global.xUtilsConfig={[logType]:logMode},!0}catch(err){return!1}};exports.loggerSetting=loggerSetting;const checkLoggerSetting=(logType="")=>{try{if(isWindow())return window.xUtilsConfig||(window.xUtilsConfig={}),window.xUtilsConfig?"off"===window.xUtilsConfig.logging?"off":(window.xUtilsConfig[logType]?window.xUtilsConfig[logType]:"on").toString():"on"}catch(err){}try{return global.xUtilsConfig||(global.xUtilsConfig={}),global.xUtilsConfig?"off"===global.xUtilsConfig.logging?"off":(global.xUtilsConfig[logType]?global.xUtilsConfig[logType]:"on").toString():"on"}catch(err){}return"on"};exports.checkLoggerSetting=checkLoggerSetting;const loggingON=()=>{try{if(isWindow())return"on"===(window.xUtilsConfig||{}).logging||(window.xUtilsConfig||{}).logging===void 0}catch(err){}try{return"on"===(global.xUtilsConfig||{}).logging||(global.xUtilsConfig||{}).logging===void 0}catch(err){}return!0},callFN=(cb=void 0)=>{if("function"!==typeof cb)return!1;try{let d=cb();return!0===d||0<d}catch(err){return!1}},logConstract=function(type="",args){args.length||(args[0]="");let allData=0===args.filter(n=>"string"===typeof n||n===void 0).length,format=allData?"%o":"";"log"===type&&(args=[].concat(`\x1b[90m[log]\x1b[0m\x1b[2m${format} `,args,"\x1B[0m")),"debug"===type&&(args=[].concat(`\x1b[90m[debug]\x1b[0m\x1b[32m${format} `,args,"\x1B[0m")),"warn"===type&&(args=[].concat(`\x1b[90m[warning]\x1b[0m\x1b[1m${format} `,args,"\x1B[0m")),"alert"===type&&(args=[].concat(`\x1b[90m[alert]\x1b[0m\x1b[33m${format} `,args,"\x1B[0m")),"attention"===type&&(args=[].concat(`\x1b[90m[attention]\x1b[0m\x1b[36m${format} `,args,"\x1B[0m"));try{return void(window&&console.log.apply(null,args))}catch(err){}console.log.apply(null,args)},log=function(...args){return loggingON()?"off"===checkLoggerSetting("log")?void 0:logConstract("log",args):void 0};exports.log=log;const debug=function(...args){return loggingON()?"off"===checkLoggerSetting("debug")?void 0:logConstract("debug",args):void 0};exports.debug=debug;const warn=function(...args){return loggingON()?"off"===checkLoggerSetting("warn")?void 0:logConstract("warn",args):void 0};exports.warn=warn;const alert=function(...args){return loggingON()?"off"===checkLoggerSetting("alert")?void 0:logConstract("alert",args):void 0};exports.alert=alert;const attention=function(...args){return loggingON()?"off"===checkLoggerSetting("attention")?void 0:logConstract("attention",args):void 0};exports.attention=attention;const onerror=function(...args){if(!loggingON())return;if("off"===checkLoggerSetting("error")||"off"===checkLoggerSetting("onerror"))return;args.length||(args[0]="");let allData=0===args.filter(n=>"string"===typeof n||n===void 0).length,format=allData?"%o":"";try{if(isWindow())return args=[].concat(`\x1b[31m[error]\x1b[0m\x1b[31m${format} `,args,"\x1B[0m"),void console.error.apply(null,args)}catch(err){}args=[].concat(`\x1b[41m[error]\x1b[0m\x1b[31m${format} `,args,"\x1B[0m"),console.error.apply(null,args)};exports.onerror=onerror;const stack=(data,asArray=!1)=>{if(loggingON()&&"off"!==checkLoggerSetting("stack")){let stackList=new Error(JSON.stringify(data)).stack.split("(");stackList.splice(1,1);let stackHead=stackList[0].split(/\n/)[0].replace("Error","[STACK TRACE]");return stackList.splice(0,1),stackList.unshift(stackHead),void(asArray?console.log(stackList):console.log.apply(null,stackList))}};exports.stack=stack;const errorTrace=(data,asArray=!1)=>{if(loggingON()&&"off"!==checkLoggerSetting("errorTrace")){let stackList=new Error(JSON.stringify(data)).stack.split("(");stackList.splice(1,1);let errHead=stackList[0].split(/\n/)[0].replace("Error","[ERROR]");return stackList.splice(0,1),stackList.unshift(errHead),void(asArray?console.error(stackList):console.error.apply(null,stackList))}};exports.errorTrace=errorTrace;const error=onerror;exports.error=error;const isFunction=(el=void 0)=>"function"===typeof el;exports.isFunction=isFunction;const isBigInt=n=>"bigint"===typeof n;exports.isBigInt=isBigInt;const loop=function(size=0,cb=(index=0)=>{}){if(!("function"===typeof cb)||!("number"===typeof size))return[];let d=[];for(let r,inx=0;inx<Array(size).length;inx++){r=cb.apply(this,[inx]);try{if(r&&Object.entries(r).length&&r.break)break}catch(err){}d.push(r)}return d};exports.loop=loop;const validDate=(dt,cbEval=void 0)=>{if(isFunction(cbEval)&&!callFN(cbEval))return!1;try{return!(dt.__proto__!==Date.prototype||"Invalid Date"===dt.toString())}catch(err){return!1}};exports.validDate=validDate;const isArray=(arr=void 0,cbEval=void 0)=>(!isFunction(cbEval)||callFN(cbEval))&&!isBigInt(arr)&&!!arr&&Array.prototype===arr.__proto__;exports.isArray=isArray;const typeCheck=(el,standard=!0)=>{var _Numberprototype=Number.prototype,_Stringprototype=String.prototype;const ofType=type=>standard?typeof el:type||typeof el,asPrototype=Type=>Type.prototype===el.prototype;try{return"symbol"===typeof el?{type:ofType(),value:0,primitiveValue:Symbol("")}:void 0===el?{type:ofType(),value:0,primitiveValue:void 0}:"boolean"===typeof el?{type:ofType(),value:+el,primitiveValue:Boolean()}:"bigint"===typeof el&&"object"===typeof Object(el)?{type:ofType(),value:1,primitiveValue:BigInt("")}:null===el?{type:ofType("null"),value:0,primitiveValue:{}}:el.__proto__===Date.prototype||asPrototype(Date)?{type:ofType("date"),value:1,primitiveValue:new Date}:_Stringprototype===el.__proto__?{type:ofType(),value:el.length,primitiveValue:String()}:Array.prototype===el.__proto__||asPrototype(Array)?{type:ofType("array"),value:(el||[]).length,primitiveValue:[]}:Promise.prototype===(el||"").__proto__||asPrototype(Promise)?{type:ofType("promise"),value:1,primitiveValue:Function}:Function.prototype===el.__proto__||asPrototype(Function)?{type:ofType(),value:1,primitiveValue:Function}:Object.prototype===el.__proto__||asPrototype(Object)?{type:ofType(),value:Object.keys(el).length,primitiveValue:{}}:Error.prototype===el.__proto__||asPrototype(Error)?{type:ofType("error"),value:Object.keys(el).length,primitiveValue:Error()}:el.__proto__===_Numberprototype||asPrototype(Number)?isNaN(el)?{type:ofType("NaN"),value:0,primitiveValue:Number()}:{type:ofType(),value:el,primitiveValue:Number()}:!1===0<=+el?{type:typeof el,value:+el,primitiveValue:void 0}:{type:typeof el,value:0,primitiveValue:void 0}}catch(err){return error(err),{}}};exports.typeCheck=typeCheck;const isError=el=>Error.prototype===(el||"").__proto__;exports.isError=isError;const isFalse=el=>{if(null===el)return!0;if("undefined"===typeof el)return!0;if("number"===typeof el&&1>el)return!0;if("boolean"===typeof el&&!1===el)return!0;try{if(el instanceof Boolean)return!1===el.valueOf()}catch(err){}return!1};exports.isFalse=isFalse;const isTrue=el=>{if(null===el)return!1;if("undefined"===typeof el)return!1;if("number"===typeof el&&0<el)return!0;if("boolean"===typeof el&&!0===el)return!0;try{if(el instanceof Boolean)return!0===el.valueOf()}catch(err){}return!1};exports.isTrue=isTrue;const isBoolean=el=>{if(el===void 0)return!1;if(null===el)return!1;if(!0===el||!1===el)return!0;try{if(el instanceof Boolean)return!0}catch(err){}return!1};exports.isBoolean=isBoolean;const isNull=el=>null===el;exports.isNull=isNull;const isUndefined=el=>"undefined"===typeof el;exports.isUndefined=isUndefined;const isEmpty=value=>!isError(value)&&!typeCheck(value).value;exports.isEmpty=isEmpty;const head=(arr=[])=>Array.prototype===(arr||null).__proto__?arr.flat().shift():void 0;exports.head=head;const last=(arr=[])=>arr&&Array.prototype===arr.__proto__?arr[arr.length-1]:void 0;exports.last=last;const timer=(cb=()=>{},time=0)=>{if(!("function"===typeof cb))return;time="number"===typeof time&&0<=time?time:0;const s=setTimeout(()=>{cb(),clearTimeout(s)},time)};exports.timer=timer;const interval=(cb=()=>{},every=0,endTime=0)=>{if(!("function"===typeof cb))return null;every="number"===typeof every&&0<=every?every:0,endTime="number"===typeof endTime&&0<=endTime?endTime:0;let counter=0;const c=setInterval(()=>(cb(),endTime<=counter?clearInterval(c):void(counter+=every)),every)};exports.interval=interval;const sq=()=>{class SimpleQ extends Promise{constructor(deferrerCallback=(resolve=()=>{},reject=()=>{})=>{}){SimpleQ._promise=super(deferrerCallback)}resolve(data){let res=SimpleQ._resolve;return res instanceof Function?res(data):onerror("[SimpleQ][resolve]","not callable"),this}reject(data){let rej=SimpleQ._reject;return rej instanceof Function?rej(data):onerror("[SimpleQ][reject]","not callable"),this}get promise(){let promise=SimpleQ._promise;return promise instanceof Promise?promise:void 0}}let deferred=new SimpleQ((resolve,reject)=>{SimpleQ._resolve=resolve,SimpleQ._reject=reject});if(deferred.__proto__.entity="SimpleQ",deferred instanceof Promise&&deferred instanceof SimpleQ)return deferred;throw"sq() not a valid Promise ?"};exports.sq=sq;const cancelPromise=({defer={},checkEvery=500,maxWait=9500,cbErr=({error,defer,id})=>{},message="taken too long to respond",logging=!1,id=void 0})=>{let validPromise=isPromise(defer)||isQPromise(defer);if(!validPromise||!(el=>"function"===typeof el)(cbErr)||!maxWait)return onerror("[cancelPromise]","{defer,maxWait,cbErr} must be provided"),Promise.reject("{defer,maxWait,cbErr} must be provided");let exit_interval,every=checkEvery||500;maxWait=maxWait||1;let inx=0;const t=setInterval(()=>{if(exit_interval)return clearInterval(t);if(inx>maxWait){let args={error:`${message}, time: ${inx}`,defer,id};try{cbErr.apply(args,[args]),defer.reject(`${message}, time: ${inx}`)}catch(err){onerror("[cancelPromise]",err)}return clearInterval(t)}logging&&(id?log("-- processing: ",id):alert("-- processing "));inx=every+inx},every),deffer=def=>def.then(n=>(exit_interval=!0,n),err=>(exit_interval=!0,Promise.reject(err)));return isSQ(defer)||isPromise(defer)&&!isQPromise(defer)?deffer(defer):isQPromise(defer)?deffer(defer.promise):Promise.reject("[cancelPromise], Supplied {defer} is not a promise")};exports.cancelPromise=cancelPromise;const validID=(id="")=>id||""?(id||"").toString().toLowerCase().replace(/\s/g,""):"";exports.validID=validID;const isNumber=n=>{if(isBigInt(n))return!1;try{if(n instanceof Number)return!0}catch(err){}return!(n===void 0||null===n||""===n)&&n.__proto__===Number.prototype};exports.isNumber=isNumber;const isDate=d=>{try{return d instanceof Date}catch(err){return!1}};exports.isDate=isDate;const stringSize=(str="")=>str!==void 0&&null!==str?str.__proto__===String.prototype?str.length:0:0;exports.stringSize=stringSize;const isQPromise=(defer=void 0)=>{try{if(!0===(defer.promise!==void 0&&"function"===typeof defer.resolve&&"function"===typeof defer.reject&&"function"===typeof defer.fulfill&&"function"===typeof defer.notify))return!0}catch(err){}return!1};exports.isQPromise=isQPromise;const isSQ=defer=>{try{return"SimpleQ"===defer.entity}catch(err){return!1}};exports.isSQ=isSQ;const isPromise=defer=>{if(isQPromise(defer))return!0;try{if(defer instanceof Promise)return!0}catch(err){}return!1};exports.isPromise=isPromise;const isObject=(obj=void 0,cbEval=void 0)=>{if(isFunction(cbEval)&&!callFN(cbEval))return!1;if(isBigInt(obj))return!1;if(isNaN(obj)&&"number"===typeof obj)return!1;if("function"===typeof obj)return!1;if(!isNaN(+obj)||void 0===obj)return!1;if(obj.__proto__===[].__proto__)return!1;const a=Object.prototype===obj.__proto__||Error.prototype===obj.__proto__,ab=a&&obj instanceof Object;if(ab)return!0;if(void 0!==obj.__proto__)try{return obj instanceof Object}catch(err){return!1}return!!obj.prototype};exports.isObject=isObject;const uniq=(arr=[])=>{let o=[];return o=arr.filter((el,i,all)=>all.indexOf(el)===i),o instanceof Array?o:[]};exports.uniq=uniq;const shuffle=(arr=[])=>{if(!isArray(arr))return[];for(let i=arr.length-1;0<i;i--){const j=Math.floor(Math.random()*i),k=arr[i];arr[i]=arr[j],arr[j]=k}return arr};exports.shuffle=shuffle;const selectiveArray=(selectBy=[],data=[])=>{if(!isArray(data))return[];if(!data.length)return[];if(!isArray(selectBy))return data;if(!selectBy.length)return data;selectBy=uniq(selectBy);let nData=[],findNest=(s,item,inx=0)=>{let found,lastItem=null;if(s&&isArray(s)&&s.length){try{if(void 0!==item[s[inx]])return lastItem=item[s[inx]],found=lastItem,++inx,s[inx]?findNest(s,found,inx):found}catch(err){console.log(err.toString())}return found}};for(let item,i=0;i<data.length;i++){if(item=data[i],!isObject(item)){nData.push([item]);continue}let found,collective=[];for(let sArr,o=0;o<selectBy.length;o++){sArr=(selectBy[o]||"").split(".");try{found=findNest(sArr,item,0),collective.push(found)}catch(err){}}if(selectBy.length===collective.length){let allUndef=collective.filter(n=>void 0===n);allUndef.length===selectBy.length&&(collective=collective.filter(n=>!!n))}collective.length?nData.push([].concat(collective)):void 0!==found&&nData.push(found)}return nData};exports.selectiveArray=selectiveArray;const isClass=(obj={},cbEval=void 0)=>(!isFunction(cbEval)||callFN(cbEval))&&!!obj&&void 0!==obj.prototype;exports.isClass=isClass;const hasPrototype=isClass;exports.hasPrototype=hasPrototype;const hasProto=(el,cbEval=void 0)=>{if(isFunction(cbEval)&&!callFN(cbEval))return!1;try{return el.__proto__!==void 0}catch(err){return!1}};exports.hasProto=hasProto;const isRegExp=(expression=/\\/)=>{try{return expression instanceof RegExp}catch(err){return!1}};exports.isRegExp=isRegExp;const isInstance=(obj={},cbEval=void 0)=>{if(isFunction(cbEval)&&!callFN(cbEval))return!1;if(!obj)return!1;if(isArray(obj))return!1;if(obj.__proto__&&!isClass(obj))try{return obj.__proto__ instanceof Object}catch(err){return!1}return!1};exports.isInstance=isInstance;const objectSize=(obj={})=>obj&&isNaN(+obj)?isInstance(obj)?Object.keys(obj).length:Object.prototype===obj.__proto__||Error.prototype===obj.__proto__?Object.keys(obj).length:0:0;exports.objectSize=objectSize;const isFalsy=(el=void 0)=>void 0===el||null===el||!1===el&&"boolean"===typeof el||(!0!==el||"boolean"!==typeof el)&&!("number"===typeof el&&0<el)&&(String.prototype===el.__proto__?1>el.length:Array.prototype===el.__proto__?0===(el||[]).length:Promise.prototype!==(el||{}).__proto__&&"function"!==typeof el&&(Object.prototype===el.__proto__||isInstance(el)?0===Object.keys(el).length:Error.prototype!==el.__proto__&&(void 0!==el&&el.__proto__===Number.prototype?!!isNaN(el)||0>=el:!1===0<+el||!el&&!1)));exports.isFalsy=isFalsy;const isString=(str=void 0,cbEval=void 0)=>(!isFunction(cbEval)||callFN(cbEval))&&void 0!==str&&null!==str&&"boolean"!==typeof str&&(""===str||String.prototype===str.__proto__);exports.isString=isString;const copyBy=(obj={},refs=[])=>{if(!isObject(obj))return{};const d=[].concat(refs).reduce((n,el)=>(void 0!==obj[el]&&(n[el]=obj[el]),n),{});try{return JSON.parse(JSON.stringify(d))}catch(err){return{}}};exports.copyBy=copyBy;const copy=data=>{try{return JSON.parse(JSON.stringify(data))}catch(err){return typeCheck(data).primitiveValue}};exports.copy=copy;const asJson=data=>{try{return JSON.stringify(data,null,2)}catch(err){return`[asJson], `+err.toString()}};exports.asJson=asJson;const copyDeep=data=>{if(isArray(data))return data.map(n=>copy(n));if(isObject(data))return Object.entries(data).reduce((n,[k,val])=>(n[k]=isObject(val)?{...copy(val)}:val,n),{});try{return JSON.parse(JSON.stringify(data))}catch(err){return typeCheck(data).primitiveValue}};exports.copyDeep=copyDeep;const delay=(time=100)=>{return"number"===typeof time&&0<=time?new Promise(resolve=>{const t=setTimeout(()=>{clearTimeout(t),resolve(!0)},time)}):Promise.resolve(!0)};exports.delay=delay;const someKeyMatch=(object={},source={},cbEval=void 0)=>{if(isFunction(cbEval)&&!callFN(cbEval))return!1;if(!object||Object.prototype!==object.__proto__)return!1;if(!source||Object.prototype!==source.__proto__)return!1;const a=Object.keys(object),b=Object.keys(source);return a.length>=b.length?0<a.filter(z=>b.filter(zz=>zz===z).length).length:0<b.filter(z=>a.filter(zz=>zz===z).length).length};exports.someKeyMatch=someKeyMatch;const exactKeyMatch=(object={},source={},cbEval=void 0)=>{if(isFunction(cbEval)&&!callFN(cbEval))return!1;if(!object||Object.prototype!==object.__proto__)return!1;if(!source||Object.prototype!==source.__proto__)return!1;const a=Object.keys(object),b=Object.keys(source);return a.length>=b.length?a.filter(z=>b.filter(zz=>zz===z).length).length===a.length:b.filter(z=>a.filter(zz=>zz===z).length).length===b.length};exports.exactKeyMatch=exactKeyMatch;const trueVal=(arr=[])=>arr&&Array.prototype===arr.__proto__?[].concat(arr).filter(itm=>!0!==isFalsy(itm)):[];exports.trueVal=trueVal;const trueValDeep=(arr=[])=>arr&&Array.prototype===arr.__proto__?arr.length?[].concat(arr).map(itm=>{const typeIs=typeCheck(itm,!1);return"array"===typeIs.type&&0<typeIs.value?itm.map(child=>0<typeCheck(child,!1).value?child:null).filter(n=>!!n):"object"===typeIs.type&&typeIs.value?Object.entries(itm).reduce((n,[k,v])=>(0<typeCheck(k,!1).value&&(n[k]=v),n),{}):0<typeIs.value?itm:null}).filter(n=>!!n):[]:[];exports.trueValDeep=trueValDeep;const trueProp=(obj={})=>obj&&Object.prototype===obj.__proto__?Object.entries(obj).reduce((n,[key,val])=>(isFalsy(val)||(n[key]=val),n),{}):{};exports.trueProp=trueProp;const resolver=(fn=()=>{},timeout=5e3,testEvery=50)=>{return"function"===typeof fn?new Promise(resolve=>{let every=testEvery||50,inx=0,test=async()=>{try{return await fn()}catch(error){return isError(error)?{error}:isObject(error)?error.error?error:{error:error}:{error}}},t=setInterval(async()=>{let anon=test();if(anon.catch(err=>err),inx>=timeout)return(anon||{}).resolve&&anon.resolve(void 0),resolve(void 0),clearInterval(t);inx+=every;try{inx+=every;let d=await anon;if(d)return resolve(d),clearInterval(t)}catch(error){return isError(error)&&resolve(error),isObject(error)?error.error?resolve(error):resolve({error}):resolve({error}),clearInterval(t)}},every)}):Promise.reject("fn() must be callable")};exports.resolver=resolver;const flatten=(arr=[])=>isArray(arr)?[].concat(...arr):[];exports.flatten=flatten;const flattenDeep=(arr=[])=>{function test(arr,d=1){return 0<d?arr.reduce((acc,val)=>acc.concat(Array.isArray(val)?test(val,d-1):val),[]):arr.slice()}let o=[];if(!isArray(arr))return o;try{return o=test(arr,1/0)||[],o instanceof Array?o:[]}catch(err){return[]}};exports.flattenDeep=flattenDeep;const chunks=(arr=[],size=0)=>Array.from({length:Math.ceil(arr.length/size)},(v,i)=>arr.slice(i*size,i*size+size));exports.chunks=chunks;const dupes=(item,index=0)=>{const dups=[];for(let n=parseInt(index);0<n;)n--,dups.push(item);return dups};exports.dupes=dupes;const uniqBy=(arr=[],propName="")=>{const stored={},n=[];if(!propName)return[];if(!(arr||[]).length)return[];for(let item,inx=0;inx<arr.length;inx++){if(item=arr[inx],isUndefined(item)||isNull(item)){n.push(item);continue}if(!isObject(item)){n.push(item);continue}if(!item[propName]){n.push(item);continue}let exists=Object.entries(stored).filter(([k])=>item[propName]===stored[k]).length;exists||item[propName]!==stored[propName+`:${inx}`]&&(stored[propName+`:${inx}`]=item[propName],n.push(item))}return n};exports.uniqBy=uniqBy;const arrayWith=(arr=[],prop="")=>{if(!isArray(arr))return[];let objWith=o=>isObject(o)?-1===Object.keys(o).indexOf(prop)?void 0:o:void 0;try{let o=arr.map(n=>objWith(n)).filter(n=>!!n);return o instanceof Array?o:[]}catch(err){return[]}};exports.arrayWith=arrayWith;const exFromArray=(arr=[],excludes=[])=>{try{if(!(arr instanceof Array))return[]}catch(err){return[]}if(excludes=[].concat(excludes),!excludes.length)return arr;const excludeFrom=(obj={},excludes=[])=>{if(!isObject(obj))return obj;const d=Object.entries(obj).reduce((n,[k,val])=>(-1===excludes.indexOf(k)&&(n[k]=val),n),{});return isFalsy(d)?void 0:d};try{let o=arr.map(n=>excludeFrom(n,excludes));return o instanceof Array?o:[]}catch(err){return[]}};exports.exFromArray=exFromArray;const pickFromArray=(arr=[],picks=[])=>{let o=[];try{if(!(arr instanceof Array))return o}catch(err){return[]}if(isArray(picks)||(picks=[].concat(picks)),!picks.length)return arr;let allowedPicks=[void 0,null,!1];if(picks=picks.filter(n=>!isFalsy(n)||allowedPicks.filter(nn=>nn===n||(isNumber(n)&&!isNaN(n)).length)),!picks.length)return arr;let isInstanceByName=(item,pick)=>{if(isArray(item)&&isFunction(pick)){if("object"===pick.name.toLowerCase())return!1;if("array"===pick.name.toLowerCase())return!0}if(isObject(item)&&isFunction(pick)){if("array"===pick.name.toLowerCase())return!1;if("object"===pick.name.toLowerCase())return!0}try{return(pick.name||"").toLowerCase()===typeof item}catch(err){}},evalItem=item=>{let selected;for(let pick,inx=0;inx<picks.length;inx++){if(pick=picks[inx],isObject(pick)&&isObject(item)){let pEntries=Object.entries(pick),pass=pEntries.filter(([k,val])=>{let ok=item[k]===val;return!!ok||(void 0===item[k]?void 0:isInstanceByName(item[k],val))});if(pass=pass.length===pEntries.length&&Object.entries(item).length>=pass.length,pass&&objectSize(item)>=objectSize(pick)){selected=!0;break}}if(isArray(pick)&&isArray(item)){let pass=pick.filter(n=>item.filter(nn=>nn===n||isInstanceByName(nn,n)).length);if(pass=pass.length===pick.length&&item.length>=pass.length,pass){selected=!0;break}}else if(pick===item){selected=!0;break}else if(isNumber(item)||isBoolean(item)||isString(item)||isArray(item)||isObject(item)||isFunction(item)){if(isInstanceByName(item,pick)){selected=!0;break}}else if(isInstanceByName(item,pick)){selected=!0;break}}return selected};try{return o=arr.reduce((n,el)=>(evalItem(el)&&n.push(el),n),[]),o instanceof Array?o:[]}catch(err){return[]}};exports.pickFromArray=pickFromArray;const dispatcher=(uid=void 0,debug=!1)=>{return new function Dispatcher(uid,debug){const plugin=`[dispatcher]`;this.uid=((uid||"").toString()||new Date().getTime()).toString(),this.debug=debug,this.cbQueue={},this.dispatchInstance={},this._isActive=null,this._onComplete_cb=null,this.index=0,this.data=null,this.onComplete=cb=>(this._onComplete_cb=cb,this),this.initListener=()=>(this.Dispatch(),this._isActive=!0,this),this.next=(data=null)=>(!1!==this._isActive&&this.initListener(),this.dispatchInstance[this.uid]?this.dispatchInstance[this.uid].next(data):this.debug&&log({message:`${plugin} for uid not available`,uid:this.uid}),this),this.Dispatch=()=>{if(this.dispatchInstance[this.uid])return this;const self=this;return this.dispatchInstance[this.uid]||(this.dispatchInstance[this.uid]=new function(){this.uid=self.uid,this.data=null,this.next=data=>("cb"!==(data||{}).type&&(this.data=data),"cb"===(data||{}).type?void("function"===typeof data.cb&&(!self.cbQueue[self.uid]&&(self.cbQueue[self.uid]=data.cb),this.data&&(self.index++,self.data=this.data,data.cb.call(self,this.data,self.uid,self.index)))):void(this.data?"function"===typeof self.cbQueue[self.uid]&&(self.index++,self.data=this.data,self.cbQueue[self.uid].call(self,this.data,self.uid,self.index)):self.debug&&warn(`${plugin} no callback data`)))}),this},this.isActive=()=>this._isActive,this.del=()=>(delete this.cbQueue[this.uid],delete this.dispatchInstance[this.uid],this._isActive=!1,"function"===typeof this._onComplete_cb&&this._onComplete_cb(this.uid),this),this.subscribe=cb=>{return"function"===typeof cb?(this.dispatchInstance[this.uid]||this.Dispatch(),this.dispatchInstance[this.uid]&&this.dispatchInstance[this.uid].next({type:"cb",cb}),this):(this.debug&&warn(`${plugin}[subscribe] cb must be set`),this)},this.init=this.initListener,this.sub=this.subscribe,this.emit=this.next,this.delete=this.del,this.unsubscribe=this.del}(uid,debug)};exports.dispatcher=dispatcher;const withHoc=(item=()=>{},...args)=>{let extraArgs=args;return(...args)=>{let argsFN=()=>{let _args;return _args=extraArgs?[].concat(args,extraArgs):args,_args};if(item instanceof Function)try{return item(...argsFN())}catch(err){onerror("[HOC]",err)}else{if(isPromise(item)){return(()=>{return(()=>item.promise?item.promise:item)().then(defItem=>isFunction(defItem)?defItem(...argsFN()):Promise.reject("DEFERRED_NOT_CALLABLE"),err=>isFunction(err)?Promise.reject(err(...argsFN())):Promise.reject("DEFERRED_NOT_CALLABLE"))})()}onerror("[HOC]","item() must be callable function")}}};exports.withHoc=withHoc;function xrequire(path="",ref=""){if(!isWindow()){const Mod=function(){};return Mod.prototype=Object.create(module.constructor.prototype),Mod.prototype.constructor=module.constructor,Mod.prototype.require=function(_path,ref){const self=this;try{return self.constructor._load(_path,self)}catch(err){if("ERR_NO_THROW"===ref)return;if("MODULE_NOT_FOUND"===err.code)throw err}},Mod.prototype instanceof module.constructor?Mod.prototype.require(path,ref):void 0}}const truthFul=(obj={})=>isObject(obj)?Object.entries(obj).reduce((n,[k,v])=>(void 0!==v&&(n[k]=v),n),{}):{};exports.truthFul=truthFul;const inIndex=(str="",patterns=[])=>{let o=0;if(!isArray(patterns))return o;if(!patterns.length)return o;if("string"!==typeof str)return o;if(!str)return o;let regx=(patt,s,inx)=>{try{return new RegExp(patt).test(s)}catch(err){return onerror("[inIndex]",`wrong pattern/expression at index:${inx}`),!1}};return o=patterns.filter((n,inx)=>regx(n,str,inx)).length,o};exports.inIndex=inIndex;const matched=(str="",expression=/\\/)=>{let o=!1;if(!isString(str))return o;if(!isRegExp(expression))return o;if("string"!==typeof str)return o;if(!str)return o;return o=((patt,s)=>{try{return new RegExp(patt).test(s)}catch(err){return onerror("[matched]",err.toString()),!1}})(expression,str),o};exports.matched=matched;
