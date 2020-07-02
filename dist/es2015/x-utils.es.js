"use strict";
/* eslint-disable no-proto */

/**
 * @xutils
 * lodash alternative `x-utils-es`
 */

export var objectSize = obj => obj && Object.prototype === obj.__proto__ ? Object.entries(obj).length : 0;
export var last = arr => arr && Array.prototype === arr.__proto__ ? arr[arr.length - 1] : null;
export var copyBy = (obj, refs) => refs.reduce((n, el, i) => {
  if (obj[el] !== undefined) n[el] = obj[el];
  return n;
}, {});
export var timer = function timer(cb, time) {
  if (time === void 0) {
    time = 0;
  }

  var isFN = typeof cb === 'function';
  if (!isFN) return null;
  var s = setTimeout(() => {
    cb();
    clearTimeout(s);
  }, time);
};
export var interval = function interval(cb, every, endTime) {
  if (every === void 0) {
    every = 0;
  }

  if (endTime === void 0) {
    endTime = 0;
  }

  var isFN = typeof cb === 'function';
  if (!isFN) return null;
  var counter = 0;
  var c = setInterval(() => {
    if (endTime <= counter) {
      cb();
      clearInterval(c);
    }

    counter = counter + every;
  }, every);
};
export var validID = id => !(id || '') ? null : (id || '').toString().toLowerCase();
export var isNumber = n => n !== undefined ? n.__proto__ === Number.prototype : false;
export var isPromise = defer => Promise.prototype === (defer || {}).__proto__;
export var uniq = arr => arr.filter((el, i, all) => all.indexOf(el) === i);
export var isObject = obj => !obj ? false : Object.prototype === obj.__proto__ || obj instanceof Object;
export var isArray = arr => !arr ? false : Array.prototype === arr.__proto__;
export var isString = str => !str ? false : String.prototype === str.__proto__;
export var isFunction = el => typeof el === 'function';
export var isFalsy = el => {
  if (el === undefined) return true;
  if (el === false && typeof el === 'boolean') return true;
  if (el === null) return true;
  if (Array.prototype === el.__proto__) return (el || []).length === 0;
  if (Promise.prototype === (el || {}).__proto__) return false;
  if (typeof el === 'function') return false;
  if (Object.prototype === el.__proto__) return Object.entries(el).length === 0;
  if (el !== undefined && el.__proto__ === Number.prototype) return el <= 0;
  if (el) return false;
  if (+el > 0 === false) return true;else return false;
};
export var copy = data => {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (err) {
    return err.toString();
  }
};
export var delay = function delay(time) {
  if (time === void 0) {
    time = 100;
  }

  return new Promise((resolve, reject) => {
    var t = setTimeout(() => {
      clearTimeout(t);
      resolve(true);
    }, time);
  });
};
/**
 * - match keys object{} > with source{}, order doesnt matter!
 * @returns true/false when at least 1 length matched
*/

export var someKeyMatch = function someKeyMatch(object, source) {
  if (object === void 0) {
    object = {};
  }

  if (source === void 0) {
    source = {};
  }

  // test if its an object
  if (!(!object ? false : Object.prototype === object.__proto__ || object instanceof Object)) {
    return false;
  }

  if (!(!source ? false : Object.prototype === source.__proto__ || source instanceof Object)) {
    return false;
  }

  var a = Object.keys(object);
  var b = Object.keys(source);
  if (a.length > b.length) return Object.keys(a).filter(z => Object.keys(b).filter(zz => zz === z).length).length > 0;else return Object.keys(b).filter(z => Object.keys(a).filter(zz => zz === z).length).length > 0;
};
/** 
 * - match keys object{} > with source{}, order doesnt matter!
 * @returns true/false when all lengths matched
*/

export var exectKeyMatch = function exectKeyMatch(object, source) {
  if (object === void 0) {
    object = {};
  }

  if (source === void 0) {
    source = {};
  }

  // test if its an object
  if (!(!object ? false : Object.prototype === object.__proto__ || object instanceof Object)) {
    return 0;
  }

  if (!(!source ? false : Object.prototype === source.__proto__ || source instanceof Object)) {
    return 0;
  }

  var a = Object.keys(object);
  var b = Object.keys(source);
  if (a.length > b.length) return Object.keys(a).filter(z => Object.keys(b).filter(zz => zz === z).length).length === a.length;else return Object.keys(b).filter(z => Object.keys(a).filter(zz => zz === z).length).length === b.length;
};
/** 
 * - allow 1 level [[1,2]]
 * @returns first array[] item[0] 
*/

export var head = arr => {
  if (Array.prototype !== (arr || null).__proto__) return [];
  return arr.flat().shift();
};
export var log = function log() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args = [].concat('[log]', args);

  try {
    if (window) console.log.apply(null, args);
    return;
  } catch (err) {
    // using node
    var util = require('util');

    args = args.map(z => util.inspect(z, false, 3, true));
  }

  console.log.apply(null, args);
};
export var warn = function warn() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  args = [].concat('[warning]', args);

  try {
    if (window) console.warn.apply(null, args);
    return;
  } catch (err) {
    // using node
    var util = require('util');

    args = args.map(z => util.inspect(z, false, 3, true));
  }

  console.warn.apply(null, args);
};
export var onerror = function onerror() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  args = [].concat('[error]', args);

  try {
    if (window) {
      console.error.apply(null, args);
      console.log('  ');
      return;
    }
  } catch (err) {
    // using node
    var util = require('util');

    args = args.map(z => util.inspect(z, false, 3, true));
  }

  console.log('  ');
};
/**
 * @prop {*} l any data to print
 * @prop {*} err display as error if set to true
 */

export var notify = function notify(logData, err) {
  if (logData === void 0) {
    logData = null;
  }

  if (err === void 0) {
    err = null;
  }

  throw 'no notify support for x-utils-es, use: x-utils';
};