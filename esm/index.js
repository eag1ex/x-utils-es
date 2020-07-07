"use strict";export const objectSize=(obj={})=>obj&&Object.prototype===obj.__proto__?Object.entries(obj).length:0;export const last=(arr=[])=>arr&&Array.prototype===arr.__proto__?arr[arr.length-1]:null;export const copyBy=(obj={},refs=[])=>{const d=refs.reduce((n,el)=>(void 0!==obj[el]&&(n[el]=obj[el]),n),{});try{return JSON.parse(JSON.stringify(d))}catch(err){return d}};export const timer=(cb,time=0)=>{if(!("function"===typeof cb))return null;const s=setTimeout(()=>{cb(),clearTimeout(s)},time)};export const interval=(cb,every=0,endTime=0)=>{if(!("function"===typeof cb))return null;let counter=0;const c=setInterval(()=>{endTime<=counter?clearInterval(c):cb(),counter+=every},every)};export const validID=(id="")=>id||""?(id||"").toString().toLowerCase().replace(/\s/g,""):"";export const isNumber=n=>n!==void 0&&n.__proto__===Number.prototype;export const isPromise=defer=>Promise.prototype===(defer||{}).__proto__;export const uniq=(arr=[])=>arr.filter((el,i,all)=>all.indexOf(el)===i);export const isObject=obj=>{const a=!!obj&&Object.prototype===obj.__proto__,b=a&&obj instanceof Object&&obj.__proto__!==[].__proto__;return b};export const isArray=arr=>!!arr&&Array.prototype===arr.__proto__;export const isString=str=>!(""!==str)||String.prototype===str.__proto__;export const isFunction=el=>"function"===typeof el;export const isFalsy=(el=null)=>void 0===el||!1===el&&"boolean"===typeof el||null===el||(String.prototype===el.__proto__?1>el.length:Array.prototype===el.__proto__?0===(el||[]).length:Promise.prototype!==(el||{}).__proto__&&"function"!==typeof el&&(Object.prototype===el.__proto__?0===Object.entries(el).length:void 0!==el&&el.__proto__===Number.prototype?0>=el:!1===0<+el||!el&&!1));export const copy=data=>{if(data===void 0)return data;try{return JSON.parse(JSON.stringify(data))}catch(err){return err.toString()}};export const delay=(time=100)=>new Promise(resolve=>{const t=setTimeout(()=>{clearTimeout(t),resolve(!0)},time)});export const someKeyMatch=(object={},source={})=>{if(!object||Object.prototype!==object.__proto__)return!1;if(!source||Object.prototype!==source.__proto__)return!1;const a=Object.keys(object),b=Object.keys(source);return a.length>=b.length?0<a.filter(z=>b.filter(zz=>zz===z).length).length:0<b.filter(z=>a.filter(zz=>zz===z).length).length};export const exectKeyMatch=(object={},source={})=>{if(!object||Object.prototype!==object.__proto__)return 0;if(!source||Object.prototype!==source.__proto__)return 0;const a=Object.keys(object),b=Object.keys(source);return a.length>=b.length?a.filter(z=>b.filter(zz=>zz===z).length).length===a.length:b.filter(z=>a.filter(zz=>zz===z).length).length===b.length};export const head=(arr=[])=>Array.prototype===(arr||null).__proto__?arr.flat().shift():[];export const log=function(...args){args=[].concat("[log]",args);try{return void(window&&console.log.apply(null,args))}catch(err){}const util1=require("util");args=args.map(z=>util1.inspect(z,!1,3,!0)),console.log.apply(null,args)};export const warn=function(...args){args=[].concat("[warning]",args);try{return void(window&&console.warn.apply(null,args))}catch(err){}const util2=require("util");args=args.map(z=>util2.inspect(z,!1,3,!0)),console.warn.apply(null,args)};export const onerror=function(...args){args=[].concat("[error]",args);try{if(window)return console.error.apply(null,args),void console.log("  ")}catch(err){}const util3=require("util");args=args.map(z=>util3.inspect(z,!1,3,!0)),console.error.apply(null,args),console.log("  ")};export const error=function(...args){args=[].concat("[error]",args);try{if(window)return console.error.apply(null,args),void console.log("  ")}catch(err){}const util4=require("util");args=args.map(z=>util4.inspect(z,!1,3,!0)),console.error.apply(null,args),console.log("  ")};export const notify=function(logData=null,err=null){throw"no notify support for x-utils-es, use: x-utils"};
