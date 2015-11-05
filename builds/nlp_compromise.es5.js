"use strict";var _get=function get(_x,_x2,_x3){var _again=true;_function: while(_again) {var object=_x,property=_x2,receiver=_x3;desc = parent = getter = undefined;_again = false;if(object === null)object = Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc === undefined){var parent=Object.getPrototypeOf(object);if(parent === null){return undefined;}else {_x = parent;_x2 = property;_x3 = receiver;_again = true;continue _function;}}else if("value" in desc){return desc.value;}else {var getter=desc.get;if(getter === undefined){return undefined;}return getter.call(receiver);}}};var _createClass=(function(){function defineProperties(target,props){for(var i=0;i < props.length;i++) {var descriptor=props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if("value" in descriptor)descriptor.writable = true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};})();function _inherits(subClass,superClass){if(typeof superClass !== "function" && superClass !== null){throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require == "function" && require;if(!u && a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '" + o + "'");throw (f.code = "MODULE_NOT_FOUND",f);}var l=n[o] = {exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof require == "function" && require;for(var o=0;o < r.length;o++) s(r[o]);return s;})({1:[function(require,module,exports){ // shim for using process in browser
var process=module.exports = {};var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){draining = false;if(currentQueue.length){queue = currentQueue.concat(queue);}else {queueIndex = -1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=setTimeout(cleanUpNextTick);draining = true;var len=queue.length;while(len) {currentQueue = queue;queue = [];while(++queueIndex < len) {currentQueue[queueIndex].run();}queueIndex = -1;len = queue.length;}currentQueue = null;draining = false;clearTimeout(timeout);}process.nextTick = function(fun){var args=new Array(arguments.length - 1);if(arguments.length > 1){for(var i=1;i < arguments.length;i++) {args[i - 1] = arguments[i];}}queue.push(new Item(fun,args));if(queue.length === 1 && !draining){setTimeout(drainQueue,0);}}; // v8 likes predictible objects
function Item(fun,array){this.fun = fun;this.array = array;}Item.prototype.run = function(){this.fun.apply(null,this.array);};process.title = 'browser';process.browser = true;process.env = {};process.argv = [];process.version = ''; // empty string to avoid regexp issues
process.versions = {};function noop(){}process.on = noop;process.addListener = noop;process.once = noop;process.off = noop;process.removeListener = noop;process.removeAllListeners = noop;process.emit = noop;process.binding = function(name){throw new Error('process.binding is not supported');}; // TODO(shtylman)
process.cwd = function(){return '/';};process.chdir = function(dir){throw new Error('process.chdir is not supported');};process.umask = function(){return 0;};},{}],2:[function(require,module,exports){(function(process,global){ /*
 *  Sugar Library date
 *
 *  Freely distributable and licensed under the MIT-style license.
 *  Copyright (c) 2013 Andrew Plummer
 *  http://sugarjs.com/
 *
 * ---------------------------- */(function(){'use strict'; /***
   * @package Core
   * @description Core method extension and restoration.
   ***/ // The global to export.
var Sugar={}; // An optimization for GCC.
var object=Object; // The global context
var globalContext=typeof global !== 'undefined'?global:window; // Is the environment node?
var hasExports=typeof module !== 'undefined' && module.exports; // No conflict mode
var noConflict=hasExports && typeof process !== 'undefined'?process.env['SUGAR_NO_CONFLICT']:false; // Internal hasOwnProperty
var internalHasOwnProperty=object.prototype.hasOwnProperty; // Property descriptors exist in IE8 but will error when trying to define a property on
// native objects. IE8 does not have defineProperies, however, so this check saves a try/catch block.
var propertyDescriptorSupport=!!(object.defineProperty && object.defineProperties); // Natives by name.
var natives='Boolean,Number,String,Array,Date,RegExp,Function'.split(','); // Proxy objects by class.
var proxies={};function initializeGlobal(){Sugar = { /***
       * @method Sugar.extend(<target>, <methods>, [instance] = true)
       * @short This method exposes Sugar's core ability to extend Javascript natives, and is useful for creating custom plugins.
       * @extra <target> should be the Javascript native function such as %String%, %Number%, etc. <methods> is an object containing the methods to extend. When [instance] is true the methods will be mapped to <target>'s prototype, if false they will be mapped onto <target> itself. For more see @global.
       ***/'extend':extend, /***
       * @method Sugar.restore(<target>, ...)
       * @short Restores Sugar methods that may have been overwritten by other scripts.
       * @extra <target> should be the Javascript native function such as %String%, %Number%, etc. Arguments after this may be an enumerated list of method names to restore or can be omitted to restore all.
       ***/'restore':restore, /***
       * @method Sugar.revert(<target>, ...)
       * @short Reverts Sugar methods to what the were before they were added.
       * @extra This method can be useful if Sugar methods are causing conflicts with other scripts. <target> should be the Javascript native function such as %String%, %Number%, etc. Arguments after this may be an enumerated list of method names to revert or can be omitted to revert all.
       * @short Reverts stuff.
       ***/'revert':revert,'noConflict':noConflict};if(hasExports){module.exports = Sugar;}else {globalContext['Sugar'] = Sugar;}}function initializeNatives(){iterateOverObject(natives.concat('Object'),function(i,name){proxies[globalContext[name]] = name;Sugar[name] = {};});} // Class extending methods
function extend(klass,methods,instance,polyfill,override){var extendee;instance = instance !== false;extendee = instance?klass.prototype:klass;iterateOverObject(methods,function(name,prop){var existing=checkGlobal('method',klass,name,extendee),original=checkGlobal('original',klass,name,extendee),existed=(name in extendee);if(typeof polyfill === 'function' && existing){prop = wrapExisting(existing,prop,polyfill);}defineOnGlobal(klass,name,instance,original,prop,existed);if(canDefineOnNative(klass,polyfill,existing,override)){setProperty(extendee,name,prop);}});}function alias(klass,target,source){var method=getProxy(klass)[source];var obj={};obj[target] = method['method'];extend(klass,obj,method['instance']);}function restore(klass,methods){if(noConflict)return;return batchMethodExecute(klass,methods,function(target,name,m){setProperty(target,name,m.method);});}function revert(klass,methods){return batchMethodExecute(klass,methods,function(target,name,m){if(m['existed']){setProperty(target,name,m['original']);}else {delete target[name];}});}function batchMethodExecute(klass,methods,fn){var all=!methods,changed=false;if(typeof methods === 'string')methods = [methods];iterateOverObject(getProxy(klass),function(name,m){if(all || methods.indexOf(name) !== -1){changed = true;fn(m['instance']?klass.prototype:klass,name,m);}});return changed;}function checkGlobal(type,klass,name,extendee){var proxy=getProxy(klass),methodExists;methodExists = proxy && hasOwnProperty(proxy,name);if(methodExists){return proxy[name][type];}else {return extendee[name];}}function canDefineOnNative(klass,polyfill,existing,override){if(override){return true;}else if(polyfill === true){return !existing;}return !noConflict || !proxies[klass];}function wrapExisting(originalFn,extendedFn,condition){return function(a){return condition.apply(this,arguments)?extendedFn.apply(this,arguments):originalFn.apply(this,arguments);};}function wrapInstanceAsClass(fn){return function(obj){var args=arguments,newArgs=[],i;for(i = 1;i < args.length;i++) {newArgs.push(args[i]);}return fn.apply(obj,newArgs);};}function defineOnGlobal(klass,name,instance,original,prop,existed){var proxy=getProxy(klass),result;if(!proxy)return;result = instance?wrapInstanceAsClass(prop):prop;setProperty(proxy,name,result,true);if(typeof prop === 'function'){setProperty(result,'original',original);setProperty(result,'method',prop);setProperty(result,'existed',existed);setProperty(result,'instance',instance);}}function getProxy(klass){return Sugar[proxies[klass]];}function setProperty(target,name,property,enumerable){if(propertyDescriptorSupport){object.defineProperty(target,name,{'value':property,'enumerable':!!enumerable,'configurable':true,'writable':true});}else {target[name] = property;}}function iterateOverObject(obj,fn){var key;for(key in obj) {if(!hasOwnProperty(obj,key))continue;if(fn.call(obj,key,obj[key],obj) === false)break;}}function hasOwnProperty(obj,prop){return !!obj && internalHasOwnProperty.call(obj,prop);}initializeGlobal();initializeNatives(); /***
   * @package Common
   * @description Internal utility and common methods.
   ***/ // A few optimizations for Google Closure Compiler will save us a couple kb in the release script.
var object=Object,array=Array,regexp=RegExp,date=Date,string=String,number=Number,func=Function,math=Math,Undefined;var sugarObject=Sugar.Object,sugarArray=Sugar.Array,sugarDate=Sugar.Date,sugarString=Sugar.String,sugarNumber=Sugar.Number; // Internal toString
var internalToString=object.prototype.toString; // Are regexes type function?
var regexIsFunction=typeof regexp() === 'function'; // Do strings have no keys?
var noKeysInStringObjects=!('0' in new string('a')); // Type check methods need a way to be accessed dynamically.
var typeChecks={}; // Classes that can be matched by value
var matchedByValueReg=/^\[object Date|Array|String|Number|RegExp|Boolean|Arguments\]$/;var isBoolean=buildPrimitiveClassCheck('boolean',natives[0]);var isNumber=buildPrimitiveClassCheck('number',natives[1]);var isString=buildPrimitiveClassCheck('string',natives[2]);var isArray=buildClassCheck(natives[3]);var isDate=buildClassCheck(natives[4]);var isRegExp=buildClassCheck(natives[5]); // Wanted to enhance performance here by using simply "typeof"
// but Firefox has two major issues that make this impossible,
// one fixed, the other not. Despite being typeof "function"
// the objects below still report in as [object Function], so
// we need to perform a full class check here.
//
// 1. Regexes can be typeof "function" in FF < 3
//    https://bugzilla.mozilla.org/show_bug.cgi?id=61911 (fixed)
//
// 2. HTMLEmbedElement and HTMLObjectElement are be typeof "function"
//    https://bugzilla.mozilla.org/show_bug.cgi?id=268945 (won't fix)
//
var isFunction=buildClassCheck(natives[6]);function isClass(obj,klass,cached){var k=cached || className(obj);return k === '[object ' + klass + ']';}function buildClassCheck(klass){var fn=klass === 'Array' && array.isArray || function(obj,cached){return isClass(obj,klass,cached);};typeChecks[klass] = fn;return fn;}function buildPrimitiveClassCheck(type,klass){var fn=function fn(obj){if(isObjectType(obj)){return isClass(obj,klass);}return typeof obj === type;};typeChecks[klass] = fn;return fn;}function className(obj){return internalToString.call(obj);}function extendSimilar(klass,set,fn,instance,polyfill,override){var methods={};set = isString(set)?set.split(','):set;set.forEach(function(name,i){fn(methods,name,i);});extend(klass,methods,instance,polyfill,override);} // Argument helpers
function isArgumentsObject(obj){ // .callee exists on Arguments objects in < IE8
return hasProperty(obj,'length') && (className(obj) === '[object Arguments]' || !!obj.callee);}function multiArgs(args,fn,from){var result=[],i=from || 0,len;for(len = args.length;i < len;i++) {result.push(args[i]);if(fn)fn.call(args,args[i],i);}return result;}function flattenedArgs(args,fn,from){var arg=args[from || 0];if(isArray(arg)){args = arg;from = 0;}return multiArgs(args,fn,from);}function checkCallback(fn){if(!fn || !fn.call){throw new TypeError('Callback is not callable');}} // General helpers
function isDefined(o){return o !== Undefined;}function isUndefined(o){return o === Undefined;} // Object helpers
function hasProperty(obj,prop){return !isPrimitiveType(obj) && prop in obj;}function isObjectType(obj){ // 1. Check for null
// 2. Check for regexes in environments where they are "functions".
return !!obj && (typeof obj === 'object' || regexIsFunction && isRegExp(obj));}function isPrimitiveType(obj){var type=typeof obj;return obj == null || type === 'string' || type === 'number' || type === 'boolean';}function isPlainObject(obj,klass){klass = klass || className(obj);try{ // Not own constructor property must be Object
// This code was borrowed from jQuery.isPlainObject
if(obj && obj.constructor && !hasOwnProperty(obj,'constructor') && !hasOwnProperty(obj.constructor.prototype,'isPrototypeOf')){return false;}}catch(e) { // IE8,9 Will throw exceptions on certain host objects.
return false;} // === on the constructor is not safe across iframes
// 'hasOwnProperty' ensures that the object also inherits
// from Object, which is false for DOMElements in IE.
return !!obj && klass === '[object Object]' && 'hasOwnProperty' in obj;}function simpleRepeat(n,fn){for(var i=0;i < n;i++) {fn(i);}}function simpleMerge(target,source){iterateOverObject(source,function(key){target[key] = source[key];});return target;} // Make primtives types like strings into objects.
function coercePrimitiveToObject(obj){if(isPrimitiveType(obj)){obj = object(obj);}if(noKeysInStringObjects && isString(obj)){forceStringCoercion(obj);}return obj;} // Force strings to have their indexes set in
// environments that don't do this automatically.
function forceStringCoercion(obj){var i=0,chr;while(chr = obj.charAt(i)) {obj[i++] = chr;}} // Hash definition
function Hash(obj){simpleMerge(this,coercePrimitiveToObject(obj));};Hash.prototype.constructor = object; // Math helpers
var abs=math.abs;var pow=math.pow;var ceil=math.ceil;var floor=math.floor;var round=math.round;var min=math.min;var max=math.max;function withPrecision(val,precision,fn){var multiplier=pow(10,abs(precision || 0));fn = fn || round;if(precision < 0)multiplier = 1 / multiplier;return fn(val * multiplier) / multiplier;} // Full width number helpers
var HalfWidthZeroCode=0x30;var HalfWidthNineCode=0x39;var FullWidthZeroCode=0xff10;var FullWidthNineCode=0xff19;var HalfWidthPeriod='.';var FullWidthPeriod='．';var HalfWidthComma=','; // Used here and later in the Date package.
var FullWidthDigits='';var NumberNormalizeMap={};var NumberNormalizeReg;function codeIsNumeral(code){return code >= HalfWidthZeroCode && code <= HalfWidthNineCode || code >= FullWidthZeroCode && code <= FullWidthNineCode;}function buildNumberHelpers(){var digit,i;for(i = 0;i <= 9;i++) {digit = chr(i + FullWidthZeroCode);FullWidthDigits += digit;NumberNormalizeMap[digit] = chr(i + HalfWidthZeroCode);}NumberNormalizeMap[HalfWidthComma] = '';NumberNormalizeMap[FullWidthPeriod] = HalfWidthPeriod; // Mapping this to itself to easily be able to easily
// capture it in stringToNumber to detect decimals later.
NumberNormalizeMap[HalfWidthPeriod] = HalfWidthPeriod;NumberNormalizeReg = regexp('[' + FullWidthDigits + FullWidthPeriod + HalfWidthComma + HalfWidthPeriod + ']','g');} // String helpers
function chr(num){return string.fromCharCode(num);} // WhiteSpace/LineTerminator as defined in ES5.1 plus Unicode characters in the Space, Separator category.
function getTrimmableCharacters(){return "\t\n\u000b\f\r   ᠎             \u2028\u2029　﻿";}function repeatString(str,num){var result='';str = str.toString();while(num > 0) {if(num & 1){result += str;}if(num >>= 1){str += str;}}return result;} // Returns taking into account full-width characters, commas, and decimals.
function stringToNumber(str,base){var sanitized,isDecimal;sanitized = str.replace(NumberNormalizeReg,function(chr){var replacement=NumberNormalizeMap[chr];if(replacement === HalfWidthPeriod){isDecimal = true;}return replacement;});return isDecimal?parseFloat(sanitized):parseInt(sanitized,base || 10);} // Used by Number and Date
function padNumber(num,place,sign,base){var str=abs(num).toString(base || 10);str = repeatString('0',place - str.replace(/\.\d+/,'').length) + str;if(sign || num < 0){str = (num < 0?'-':'+') + str;}return str;}function getOrdinalizedSuffix(num){if(num >= 11 && num <= 13){return 'th';}else {switch(num % 10){case 1:return 'st';case 2:return 'nd';case 3:return 'rd';default:return 'th';}}} // RegExp helpers
function getRegExpFlags(reg,add){var flags='';add = add || '';function checkFlag(prop,flag){if(prop || add.indexOf(flag) > -1){flags += flag;}}checkFlag(reg.multiline,'m');checkFlag(reg.ignoreCase,'i');checkFlag(reg.global,'g');checkFlag(reg.sticky,'y');return flags;}function escapeRegExp(str){if(!isString(str))str = string(str);return str.replace(/([\\\/\'*+?|()\[\]{}.^$-])/g,'\\$1');} // Date helpers
function callDateGet(d,method){return d['get' + (d._utc?'UTC':'') + method]();}function callDateSet(d,method,value){return d['set' + (d._utc?'UTC':'') + method](value);} // Used by Array#unique and Object.equal
function stringify(thing,stack){var type=typeof thing,thingIsObject,thingIsArray,klass,value,arr,key,i,len; // Return quickly if string to save cycles
if(type === 'string')return thing;klass = internalToString.call(thing);thingIsObject = isPlainObject(thing,klass);thingIsArray = isArray(thing,klass);if(thing != null && thingIsObject || thingIsArray){ // This method for checking for cyclic structures was egregiously stolen from
// the ingenious method by @kitcambridge from the Underscore script:
// https://github.com/documentcloud/underscore/issues/240
if(!stack)stack = []; // Allowing a step into the structure before triggering this
// script to save cycles on standard JSON structures and also to
// try as hard as possible to catch basic properties that may have
// been modified.
if(stack.length > 1){i = stack.length;while(i--) {if(stack[i] === thing){return 'CYC';}}}stack.push(thing);value = thing.valueOf() + string(thing.constructor);arr = thingIsArray?thing:object.keys(thing).sort();for(i = 0,len = arr.length;i < len;i++) {key = thingIsArray?i:arr[i];value += key + stringify(thing[key],stack);}stack.pop();}else if(1 / thing === -Infinity){value = '-0';}else {value = string(thing && thing.valueOf?thing.valueOf():thing);}return type + klass + value;}function isEqual(a,b){if(a === b){ // Return quickly up front when matching by reference,
// but be careful about 0 !== -0.
return a !== 0 || 1 / a === 1 / b;}else if(objectIsMatchedByValue(a) && objectIsMatchedByValue(b)){return stringify(a) === stringify(b);}return false;}function objectIsMatchedByValue(obj){ // Only known objects are matched by value. This is notably excluding functions, DOM Elements, and instances of
// user-created classes. The latter can arguably be matched by value, but distinguishing between these and
// host objects -- which should never be compared by value -- is very tricky so not dealing with it here.
var klass=className(obj);return matchedByValueReg.test(klass) || isPlainObject(obj,klass);} // Used by Array#at and String#at
function getEntriesForIndexes(obj,args,isString){var result,length=obj.length,argsLen=args.length,overshoot=args[argsLen - 1] !== false,multiple=argsLen > (overshoot?1:2);if(!multiple){return entryAtIndex(obj,length,args[0],overshoot,isString);}result = [];multiArgs(args,function(index){if(isBoolean(index))return false;result.push(entryAtIndex(obj,length,index,overshoot,isString));});return result;}function entryAtIndex(obj,length,index,overshoot,isString){if(overshoot){index = index % length;if(index < 0)index = length + index;}return isString?obj.charAt(index):obj[index];} // Used by the Array and Object packages.
function transformArgument(el,map,context,mapArgs){if(!map){return el;}else if(map.apply){return map.apply(context,mapArgs || []);}else if(isFunction(el[map])){return el[map].call(el);}else {return el[map];}}function keysWithObjectCoercion(obj){return object.keys(coercePrimitiveToObject(obj));} // Object class methods implemented as instance methods. This method
// is being called only on Hash and Object itself, so we don't want
// to go through extend() here as it will create proxies that already
// exist, which we want to avoid.
function buildObjectInstanceMethods(set,target){set.forEach(function(name){var classFn=sugarObject[name === 'equals'?'equal':name];var fn=function fn(){var args=arguments,newArgs=[this],i;for(i = 0;i < args.length;i++) {newArgs.push(args[i]);}return classFn.apply(null,newArgs);};setProperty(target.prototype,name,fn);});}buildNumberHelpers(); /***
   * @package Date
   * @dependency core
   * @description Date parsing and formatting, relative formats like "1 minute ago", Number methods like "daysAgo", localization support with default English locale definition.
   *
   ***/var English;var CurrentLocalization;var TimeFormat=['ampm','hour','minute','second','ampm','utc','offset_sign','offset_hours','offset_minutes','ampm'];var DecimalReg='(?:[,.]\\d+)?';var HoursReg='\\d{1,2}' + DecimalReg;var SixtyReg='[0-5]\\d' + DecimalReg;var RequiredTime='({t})?\\s*(' + HoursReg + ')(?:{h}(' + SixtyReg + ')?{m}(?::?(' + SixtyReg + '){s})?\\s*(?:({t})|(Z)|(?:([+-])(\\d{2,2})(?::?(\\d{2,2}))?)?)?|\\s*({t}))';var KanjiDigits='〇一二三四五六七八九十百千万';var AsianDigitMap={};var AsianDigitReg;var DateArgumentUnits;var DateUnitsReversed;var CoreDateFormats=[];var CompiledOutputFormats={};var DateFormatTokens={'yyyy':function yyyy(d){return callDateGet(d,'FullYear');},'yy':function yy(d){return callDateGet(d,'FullYear') % 100;},'ord':function ord(d){var date=callDateGet(d,'Date');return date + getOrdinalizedSuffix(date);},'tz':function tz(d){return _getUTCOffset(d);},'isotz':function isotz(d){return _getUTCOffset(d,true);},'Z':function Z(d){return _getUTCOffset(d);},'ZZ':function ZZ(d){return _getUTCOffset(d).replace(/(\d{2})$/,':$1');}};var DateUnits=[{name:'year',method:'FullYear',ambiguous:true,multiplier:365.25 * 24 * 60 * 60 * 1000},{name:'month',method:'Month',ambiguous:true,multiplier:30.4375 * 24 * 60 * 60 * 1000},{name:'week',method:'ISOWeek',multiplier:7 * 24 * 60 * 60 * 1000},{name:'day',method:'Date',ambiguous:true,multiplier:24 * 60 * 60 * 1000},{name:'hour',method:'Hours',multiplier:60 * 60 * 1000},{name:'minute',method:'Minutes',multiplier:60 * 1000},{name:'second',method:'Seconds',multiplier:1000},{name:'millisecond',method:'Milliseconds',multiplier:1}]; // Date Localization
var Localizations={}; // Localization object
function Localization(l){simpleMerge(this,l);this.compiledFormats = CoreDateFormats.concat();}Localization.prototype = {get:function get(prop){return this[prop] || '';},getMonth:function getMonth(n){if(isNumber(n)){return n - 1;}else {return this['months'].indexOf(n) % 12;}},getWeekday:function getWeekday(n){return this['weekdays'].indexOf(n) % 7;},getNumber:function getNumber(n,digit){var mapped=this.ordinalNumberMap[n];if(mapped){if(digit){mapped = mapped % 10;}return mapped;}return isNumber(n)?n:1;},getNumericDate:function getNumericDate(n){var self=this;return n.replace(regexp(this['num'],'g'),function(d){var num=self.getNumber(d,true);return num || '';});},getUnitIndex:function getUnitIndex(n){return this['units'].indexOf(n) % 8;},getRelativeFormat:function getRelativeFormat(adu){return this.convertAdjustedToFormat(adu,adu[2] > 0?'future':'past');},getDuration:function getDuration(ms){return this.convertAdjustedToFormat(getAdjustedUnitForNumber(ms),'duration');},hasVariant:function hasVariant(code){code = code || this.code;return code === 'en' || code === 'en-US'?true:this['variant'];},matchAM:function matchAM(str){return str === this.get('ampm')[0];},matchPM:function matchPM(str){return str && str === this.get('ampm')[1];},convertAdjustedToFormat:function convertAdjustedToFormat(adu,mode){var sign,unit,mult,num=adu[0],u=adu[1],ms=adu[2],format=this[mode] || this['relative'];if(isFunction(format)){return format.call(this,num,u,ms,mode);}mult = !this['plural'] || num === 1?0:1;unit = this['units'][mult * 8 + u] || this['units'][u];if(this['capitalizeUnit'])unit = simpleCapitalize(unit);sign = this['modifiers'].filter(function(m){return m.name == 'sign' && m.value == (ms > 0?1:-1);})[0];return format.replace(/\{(.*?)\}/g,function(full,match){switch(match){case 'num':return num;case 'unit':return unit;case 'sign':return sign.src;}});},getFormats:function getFormats(){return this.cachedFormat?[this.cachedFormat].concat(this.compiledFormats):this.compiledFormats;},addFormat:function addFormat(src,allowsTime,match,variant,iso){var to=match || [],loc=this,time,timeMarkers,lastIsNumeral;src = src.replace(/\s+/g,'[,. ]*');src = src.replace(/\{([^,]+?)\}/g,function(all,k){var value,arr,result,opt=k.match(/\?$/),nc=k.match(/^(\d+)\??$/),slice=k.match(/(\d)(?:-(\d))?/),key=k.replace(/[^a-z]+$/,'');if(nc){value = loc.get('tokens')[nc[1]];}else if(loc[key]){value = loc[key];}else if(loc[key + 's']){value = loc[key + 's'];if(slice){ // Can't use filter here as Prototype hijacks the method and doesn't
// pass an index, so use a simple loop instead!
arr = [];value.forEach(function(m,i){var mod=i % (loc['units']?8:value.length);if(mod >= slice[1] && mod <= (slice[2] || slice[1])){arr.push(m);}});value = arr;}value = arrayToAlternates(value);}if(!value){return '';}if(nc){result = '(?:' + value + ')';}else {if(!match){to.push(key);}result = '(' + value + ')';}if(opt){result += '?';}return result;});if(allowsTime){time = prepareTime(RequiredTime,loc,iso);timeMarkers = ['t',"[\\s\\u3000]"].concat(loc.get('timeMarker'));lastIsNumeral = src.match(/\\d\{\d,\d\}\)+\??$/);addDateInputFormat(loc,'(?:' + time + ")[,\\s\\u3000]+?" + src,TimeFormat.concat(to),variant);addDateInputFormat(loc,src + '(?:[,\\s]*(?:' + timeMarkers.join('|') + (lastIsNumeral?'+':'*') + ')' + time + ')?',to.concat(TimeFormat),variant);}else {addDateInputFormat(loc,src,to,variant);}}}; // Localization helpers
function getLocalization(localeCode,fallback){var loc;if(!isString(localeCode))localeCode = '';loc = Localizations[localeCode] || Localizations[localeCode.slice(0,2)];if(fallback === false && !loc){throw new TypeError('Invalid locale.');}return loc || CurrentLocalization;}function setLocalization(localeCode,set){var loc;function initializeField(name){var val=loc[name];if(isString(val)){loc[name] = val.split(',');}else if(!val){loc[name] = [];}}function eachAlternate(str,fn){str = str.split('+').map(function(split){return split.replace(/(.+):(.+)$/,function(full,base,suffixes){return suffixes.split('|').map(function(suffix){return base + suffix;}).join('|');});}).join('|');return str.split('|').forEach(fn);}function setArray(name,abbreviationSize,multiple){var arr=[];loc[name].forEach(function(full,i){if(abbreviationSize){full += '+' + full.slice(0,abbreviationSize);}eachAlternate(full,function(alt,j){arr[j * multiple + i] = alt.toLowerCase();});});loc[name] = arr;}function getDigit(start,stop,allowNumbers){var str='\\d{' + start + ',' + stop + '}';if(allowNumbers)str += '|(?:' + arrayToAlternates(loc.get('numbers')) + ')+';return str;}function getNum(){var numbers=loc.get('numbers');var arr=['-?\\d+'].concat(loc.get('articles'));if(numbers){arr = arr.concat(numbers);}return arrayToAlternates(arr);}function getAbbreviationSize(type){ // Month suffixes like those found in Asian languages
// serve as a good proxy to detect month/weekday abbreviations.
var hasMonthSuffix=!!loc['monthSuffix'];return loc[type + 'Abbreviate'] || (hasMonthSuffix?null:3);}function setDefault(name,value){loc[name] = loc[name] || value;}function buildNumbers(){var map=loc.ordinalNumberMap = {},all=[];loc['numbers'].forEach(function(full,i){eachAlternate(full,function(alt){all.push(alt);map[alt] = i + 1;});});loc['numbers'] = all;}function buildModifiers(){var arr=[];loc.modifiersByName = {};loc['modifiers'].push({'name':'day','src':'yesterday','value':-1});loc['modifiers'].push({'name':'day','src':'today','value':0});loc['modifiers'].push({'name':'day','src':'tomorrow','value':1});loc['modifiers'].forEach(function(modifier){var name=modifier.name;eachAlternate(modifier.src,function(t){var locEntry=loc[name];loc.modifiersByName[t] = modifier;arr.push({name:name,src:t,value:modifier.value});loc[name] = locEntry?locEntry + '|' + t:t;});});loc['day'] += '|' + arrayToAlternates(loc['weekdays']);loc['modifiers'] = arr;} // Initialize the locale
loc = new Localization(set);initializeField('modifiers');'months,weekdays,units,numbers,articles,tokens,timeMarker,ampm,timeSuffixes,dateParse,timeParse'.split(',').forEach(initializeField);buildNumbers();setArray('months',getAbbreviationSize('month'),12);setArray('weekdays',getAbbreviationSize('weekday'),7);setArray('units',false,8);setDefault('code',localeCode);setDefault('date',getDigit(1,2,loc['digitDate']));setDefault('year',"'\\d{2}|" + getDigit(4,4));setDefault('num',getNum());buildModifiers();if(loc['monthSuffix']){loc['month'] = getDigit(1,2);loc['months'] = '1,2,3,4,5,6,7,8,9,10,11,12'.split(',').map(function(n){return n + loc['monthSuffix'];});}loc['full_month'] = getDigit(1,2) + '|' + arrayToAlternates(loc['months']); // The order of these formats is very important. Order is reversed so formats that come
// later will take precedence over formats that come before. This generally means that
// more specific formats should come later, however, the {year} format should come before
// {day}, as 2011 needs to be parsed as a year (2011) and not date (20) + hours (11)
// If the locale has time suffixes then add a time only format for that locale
// that is separate from the core English-based one.
if(loc['timeSuffixes'].length > 0){loc.addFormat(prepareTime(RequiredTime,loc),false,TimeFormat);}loc.addFormat('{day}',true);loc.addFormat('{month}' + (loc['monthSuffix'] || ''));loc.addFormat('{year}' + (loc['yearSuffix'] || ''));loc['timeParse'].forEach(function(src){loc.addFormat(src,true);});loc['dateParse'].forEach(function(src){loc.addFormat(src);});return Localizations[localeCode] = loc;} // General helpers
function addDateInputFormat(locale,format,match,variant){locale.compiledFormats.unshift({variant:!!variant,locale:locale,reg:regexp('^' + format + '$','i'),to:match});}function simpleCapitalize(str){return str.slice(0,1).toUpperCase() + str.slice(1);}function arrayToAlternates(arr){return arr.filter(function(el){return !!el;}).join('|');}function getNewDate(){var fn=sugarDate['newDateInternal'];return fn?fn():new date();}function cloneDate(d){var cloned=new date(d.getTime());_setUTC(cloned,!!d._utc);return cloned;} // Normal callDateSet method with ability
// to handle ISOWeek setting as well.
function callDateSetWithWeek(d,method,value){if(method === 'ISOWeek'){return setWeekNumber(d,value);}else {return callDateSet(d,method,value);}}function _isValid(d){return !isNaN(d.getTime());}function _isLeapYear(d){var year=callDateGet(d,'FullYear');return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;} // UTC helpers
function _setUTC(d,force){setProperty(d,'_utc',!!force);return d;}function _isUTC(d){return !!d._utc || d.getTimezoneOffset() === 0;}function _getUTCOffset(d,iso){var offset=d._utc?0:d.getTimezoneOffset();var colon=iso === true?':':'';if(!offset && iso)return 'Z';return padNumber(floor(-offset / 60),2,true) + colon + padNumber(abs(offset % 60),2);} // Date argument helpers
function collectDateArguments(args,allowDuration){var obj;if(isObjectType(args[0])){return args;}else if(isNumber(args[0]) && !isNumber(args[1])){return [args[0]];}else if(isString(args[0]) && allowDuration){return [getDateParamsFromString(args[0]),args[1]];}obj = {};DateArgumentUnits.forEach(function(u,i){obj[u.name] = args[i];});return [obj];}function getDateParamsFromString(str,num){var match,num,params={};match = str.match(/^(-?\d+)?\s?(\w+?)s?$/i);if(match){if(isUndefined(num)){num = parseInt(match[1]);if(isNaN(num)){num = 1;}}params[match[2].toLowerCase()] = num;}return params;} // Date iteration helpers
function iterateOverDateUnits(fn,from,to){var i,unit;if(isUndefined(to))to = DateUnitsReversed.length;for(i = from || 0;i < to;i++) {unit = DateUnitsReversed[i];if(fn(unit.name,unit,i) === false){break;}}} // Date shifting helpers
function advanceDate(d,args){var args=collectDateArguments(args,true);return updateDate(d,args[0],args[1],1);}function setDate(d,args){var args=collectDateArguments(args);return updateDate(d,args[0],args[1]);}function resetDate(d,unit){var params={},recognized;unit = unit || 'hours';if(unit === 'date')unit = 'days';recognized = DateUnits.some(function(u){return unit === u.name || unit === u.name + 's';});params[unit] = unit.match(/^days?/)?1:0;return recognized?setDate(d,[params,true]):d;}function _setWeekday(d,dow,forward){if(isUndefined(dow))return; // Dates like "the 2nd Tuesday of June" need to be set forward
// so make sure that the day of the week reflects that here.
if(forward && dow % 7 < d.getDay()){dow += 7;}return callDateSet(d,'Date',callDateGet(d,'Date') + dow - callDateGet(d,'Day'));}function moveToBeginningOfUnit(d,unit){var set={};switch(unit){case 'year':set['year'] = callDateGet(d,'FullYear');break;case 'month':set['month'] = callDateGet(d,'Month');break;case 'day':set['day'] = callDateGet(d,'Date');break;case 'week':set['weekday'] = 0;break;}return setDate(d,[set,true]);}function moveToEndOfUnit(d,unit){var set={'hours':23,'minutes':59,'seconds':59,'milliseconds':999};switch(unit){case 'year':set['month'] = 11;set['day'] = 31;break;case 'month':set['day'] = getDaysInMonth(d);break;case 'week':set['weekday'] = 6;break;}return setDate(d,[set,true]);} // Date parsing helpers
function getFormatMatch(match,arr){var obj={},value,num;arr.forEach(function(key,i){value = match[i + 1];if(isUndefined(value) || value === '')return;if(key === 'year'){obj.yearAsString = value.replace(/'/,'');}num = parseFloat(value.replace(/'/,'').replace(/,/,'.'));obj[key] = !isNaN(num)?num:value.toLowerCase();});return obj;}function cleanDateInput(str){str = str.trim().replace(/^just (?=now)|\.+$/i,'');return convertAsianDigits(str);}function convertAsianDigits(str){return str.replace(AsianDigitReg,function(full,disallowed,match){var sum=0,place=1,lastWasHolder,lastHolder;if(disallowed)return full;match.split('').reverse().forEach(function(letter){var value=AsianDigitMap[letter],holder=value > 9;if(holder){if(lastWasHolder)sum += place;place *= value / (lastHolder || 1);lastHolder = value;}else {if(lastWasHolder === false){place *= 10;}sum += place * value;}lastWasHolder = holder;});if(lastWasHolder)sum += place;return sum;});}function getExtendedDate(contextDate,f,localeCode,prefer,forceUTC){ // TODO can we split this up into smaller methods?
var d,relative,baseLocalization,afterCallbacks,loc,set,unit,unitIndex,weekday,num,tmp,weekdayForward;d = getNewDate();afterCallbacks = [];function afterDateSet(fn){afterCallbacks.push(fn);}function fireCallbacks(){afterCallbacks.forEach(function(fn){fn.call();});}function getWeekdayWithMultiplier(w){var num=set['num'] && !set['unit']?set['num']:1;return 7 * (num - 1) + w;}function setWeekdayOfMonth(){_setWeekday(d,set['weekday'],true);}function setUnitEdge(){var modifier=loc.modifiersByName[set['edge']];iterateOverDateUnits(function(name){if(isDefined(set[name])){unit = name;return false;}},4);if(unit === 'year'){set.specificity = 'month';}else if(unit === 'month' || unit === 'week'){set.specificity = 'day';}if(modifier.value < 0){moveToEndOfUnit(d,unit);}else {moveToBeginningOfUnit(d,unit);} // This value of -2 is arbitrary but it's a nice clean way to hook into this system.
if(modifier.value === -2)resetDate(d);}function separateAbsoluteUnits(){var params;iterateOverDateUnits(function(name,u,i){if(name === 'day')name = 'date';if(isDefined(set[name])){ // If there is a time unit set that is more specific than
// the matched unit we have a string like "5:30am in 2 minutes",
// which is meaningless, so invalidate the date...
if(i >= unitIndex){invalidateDate(d);return false;} // ...otherwise set the params to set the absolute date
// as a callback after the relative date has been set.
params = params || {};params[name] = set[name];delete set[name];}});if(params){afterDateSet(function(){setDate(d,[params,true]);});}}_setUTC(d,forceUTC);if(isDate(f)){ // If the source here is already a date object, then the operation
// is the same as cloning the date, which preserves the UTC flag.
_setUTC(d,_isUTC(f)).setTime(f.getTime());}else if(isNumber(f) || f === null){d.setTime(f);}else if(isObjectType(f)){setDate(d,[f,true]);set = f;}else if(isString(f)){ // The act of getting the localization will pre-initialize
// if it is missing and add the required formats.
baseLocalization = getLocalization(localeCode); // Clean the input and convert Kanji based numerals if they exist.
f = cleanDateInput(f);if(baseLocalization){iterateOverObject(baseLocalization.getFormats(),function(i,dif){var match=f.match(dif.reg);if(match){loc = dif.locale;set = getFormatMatch(match,dif.to,loc);loc.cachedFormat = dif;if(set['utc']){_setUTC(d,true);}if(set.timestamp){set = set.timestamp;return false;}if(dif.variant && !isString(set['month']) && (isString(set['date']) || baseLocalization.hasVariant(localeCode))){ // If there's a variant (crazy Endian American format), swap the month and day.
tmp = set['month'];set['month'] = set['date'];set['date'] = tmp;}if(hasAbbreviatedYear(set)){ // If the year is 2 digits then get the implied century.
set['year'] = getYearFromAbbreviation(set['year']);}if(set['month']){ // Set the month which may be localized.
set['month'] = loc.getMonth(set['month']);if(set['shift'] && !set['unit'])set['unit'] = loc['units'][7];}if(set['weekday'] && set['date']){ // If there is both a weekday and a date, the date takes precedence.
delete set['weekday'];}else if(set['weekday']){ // Otherwise set a localized weekday.
set['weekday'] = loc.getWeekday(set['weekday']);if(set['shift'] && !set['unit']){set['unit'] = loc['units'][5];}}if(set['day'] && (tmp = loc.modifiersByName[set['day']])){ // Relative day localizations such as "today" and "tomorrow".
set['day'] = tmp.value;resetDate(d);relative = true;}else if(set['day'] && (weekday = loc.getWeekday(set['day'])) > -1){ // If the day is a weekday, then set that instead.
delete set['day'];set['weekday'] = getWeekdayWithMultiplier(weekday);if(set['num'] && set['month']){ // If we have "the 2nd Tuesday of June", then pass the "weekdayForward" flag
// along to updateDate so that the date does not accidentally traverse into
// the previous month. This needs to be independent of the "prefer" flag because
// we are only ensuring that the weekday is in the future, not the entire date.
weekdayForward = true;}}if(set['date'] && !isNumber(set['date'])){set['date'] = loc.getNumericDate(set['date']);}if(loc.matchPM(set['ampm']) && set['hour'] < 12){ // If the time is 1pm-11pm advance the time by 12 hours.
set['hour'] += 12;}else if(loc.matchAM(set['ampm']) && set['hour'] === 12){ // If it is 12:00am then set the hour to 0.
set['hour'] = 0;}if('offset_hours' in set || 'offset_minutes' in set){ // Adjust for timezone offset
_setUTC(d,true);set['offset_minutes'] = set['offset_minutes'] || 0;set['offset_minutes'] += set['offset_hours'] * 60;if(set['offset_sign'] === '-'){set['offset_minutes'] *= -1;}set['minute'] -= set['offset_minutes'];}if(set['unit']){ // Date has a unit like "days", "months", etc. are all relative to the current date.
relative = true;num = loc.getNumber(set['num']);unitIndex = loc.getUnitIndex(set['unit']);unit = English['units'][unitIndex]; // Formats like "the 15th of last month" or "6:30pm of next week"
// contain absolute units in addition to relative ones, so separate
// them here, remove them from the params, and set up a callback to
// set them after the relative ones have been set.
separateAbsoluteUnits();if(set['shift']){ // Shift and unit, ie "next month", "last week", etc.
num *= (tmp = loc.modifiersByName[set['shift']])?tmp.value:0;}if(set['sign'] && (tmp = loc.modifiersByName[set['sign']])){ // Unit and sign, ie "months ago", "weeks from now", etc.
num *= tmp.value;}if(isDefined(set['weekday'])){ // Units can be with non-relative dates, set here. ie "the day after monday"
setDate(d,[{'weekday':set['weekday']},true]);delete set['weekday'];} // Finally shift the unit.
set[unit] = (set[unit] || 0) + num;}if(set['edge']){ // If there is an "edge" it needs to be set after the
// other fields are set. ie "the end of February"
afterDateSet(setUnitEdge);}if(set['year_sign'] === '-'){set['year'] *= -1;}iterateOverDateUnits(function(name,unit,i){var value=set[name],fraction=value % 1;if(fraction){set[DateUnitsReversed[i - 1].name] = round(fraction * (name === 'second'?1000:60));set[name] = floor(value);}},1,4);return false;}});}if(!set){ // The Date constructor does something tricky like checking the number
// of arguments so simply passing in undefined won't work.
if(!/^now$/i.test(f)){d = new date(f);}if(forceUTC){ // Falling back to system date here which cannot be parsed as UTC,
// so if we're forcing UTC then simply add the offset.
d.addMinutes(-d.getTimezoneOffset());}}else if(relative){if(contextDate){ // If this is a relative date and is being created via an instance
// method (usually "[unit]FromNow", etc), then use the original date
// (that the instance method was called on) as the starting point
// rather than the freshly created date above to avoid subtle
// discrepancies due to the fact that the fresh date was created
// slightly later.
d = cloneDate(contextDate);}advanceDate(d,[set]);}else {if(d._utc){ // UTC times can traverse into other days or even months,
// so preemtively reset the time here to prevent this.
resetDate(d);}updateDate(d,set,true,false,prefer,weekdayForward);}fireCallbacks(); // A date created by parsing a string presumes that the format *itself* is UTC, but
// not that the date, once created, should be manipulated as such. In other words,
// if you are creating a date object from a server time "2012-11-15T12:00:00Z",
// in the majority of cases you are using it to create a date that will, after creation,
// be manipulated as local, so reset the utc flag here.
_setUTC(d,false);}return {date:d,set:set};}function hasAbbreviatedYear(obj){return obj.yearAsString && obj.yearAsString.length === 2;} // If the year is two digits, add the most appropriate century prefix.
function getYearFromAbbreviation(year){return round(callDateGet(getNewDate(),'FullYear') / 100) * 100 - round(year / 100) * 100 + year;}function getShortHour(d){var hours=callDateGet(d,'Hours');return hours === 0?12:hours - floor(hours / 13) * 12;} // weeksSince won't work here as the result needs to be floored, not rounded.
function getWeekNumber(date){date = cloneDate(date);var dow=callDateGet(date,'Day') || 7;resetDate(advanceDate(date,[4 - dow + ' days']));return 1 + floor(sugarDate.daysSince(date,moveToBeginningOfUnit(cloneDate(date),'year')) / 7);}function setWeekNumber(date,num){var weekday=callDateGet(date,'Day') || 7;if(isUndefined(num))return;setDate(date,[{'month':0,'date':4}]);setDate(date,[{'weekday':1}]);if(num > 1){advanceDate(date,[{'weeks':num - 1}]);}if(weekday !== 1){advanceDate(date,[{'days':weekday - 1}]);}return date.getTime();}function getDaysInMonth(d){return 32 - callDateGet(new date(callDateGet(d,'FullYear'),callDateGet(d,'Month'),32),'Date');} // Gets an "adjusted date unit" which is a way of representing
// the largest possible meaningful unit. In other words, if passed
// 3600000, this will return an array which represents "1 hour".
function getAdjustedUnit(ms,fn){var unitIndex=0,value=0;iterateOverObject(DateUnits,function(i,unit){value = abs(fn(unit));if(value >= 1){unitIndex = 7 - i;return false;}});return [value,unitIndex,ms];} // Gets the adjusted unit based on simple division by
// date unit multiplier.
function getAdjustedUnitForNumber(ms){return getAdjustedUnit(ms,function(unit){return floor(withPrecision(ms / unit.multiplier,1));});} // Gets the adjusted unit using the [unit]FromNow methods,
// which use internal date methods that neatly avoid vaguely
// defined units of time (days in month, leap years, etc).
function getAdjustedUnitForDate(d){var ms=sugarDate.millisecondsFromNow(d);if(d.getTime() > date.now()){ // This adjustment is solely to allow
// Date.create('1 year from now').relative() to remain
// "1 year from now" instead of "11 months from now",
// as it would be due to the fact that the internal
// "now" date in "relative" is created slightly after
// that in "create".
d = new date(d.getTime() + 10);}return getAdjustedUnit(ms,function(unit){return abs(sugarDate[unit.name + 'sFromNow'](d));});} // Date format token helpers
function createMeridianTokens(slice,caps){var fn=function fn(d,localeCode){var hours=callDateGet(d,'Hours');return getLocalization(localeCode).get('ampm')[floor(hours / 12)] || '';};createFormatToken('t',fn,1);createFormatToken('tt',fn);createFormatToken('T',fn,1,1);createFormatToken('TT',fn,null,2);}function createWeekdayTokens(slice,caps){var fn=function fn(d,localeCode){var dow=callDateGet(d,'Day');return getLocalization(localeCode)['weekdays'][dow];};createFormatToken('do',fn,2);createFormatToken('Do',fn,2,1);createFormatToken('dow',fn,3);createFormatToken('Dow',fn,3,1);createFormatToken('weekday',fn);createFormatToken('Weekday',fn,null,1);}function createMonthTokens(slice,caps){createMonthToken('mon',0,3);createMonthToken('month',0); // For inflected month forms, namely Russian.
createMonthToken('month2',1);createMonthToken('month3',2);}function createMonthToken(token,multiplier,slice){var fn=function fn(d,localeCode){var month=callDateGet(d,'Month');return getLocalization(localeCode)['months'][month + multiplier * 12];};createFormatToken(token,fn,slice);createFormatToken(simpleCapitalize(token),fn,slice,1);}function createFormatToken(t,fn,slice,caps){DateFormatTokens[t] = function(d,localeCode){var str=fn(d,localeCode);if(slice)str = str.slice(0,slice);if(caps)str = str.slice(0,caps).toUpperCase() + str.slice(caps);return str;};}function createPaddedToken(t,fn,ms){DateFormatTokens[t] = fn;DateFormatTokens[t + t] = function(d,localeCode){return padNumber(fn(d,localeCode),2);};if(ms){DateFormatTokens[t + t + t] = function(d,localeCode){return padNumber(fn(d,localeCode),3);};DateFormatTokens[t + t + t + t] = function(d,localeCode){return padNumber(fn(d,localeCode),4);};}} // Date formatting helpers
function buildCompiledOutputFormat(format){var match=format.match(/(\{\w+\})|[^{}]+/g);CompiledOutputFormats[format] = match.map(function(p){p.replace(/\{(\w+)\}/,function(full,token){p = DateFormatTokens[token] || token;return token;});return p;});}function executeCompiledOutputFormat(date,format,localeCode){var compiledFormat,length,i,t,result='';compiledFormat = CompiledOutputFormats[format];for(i = 0,length = compiledFormat.length;i < length;i++) {t = compiledFormat[i];result += isFunction(t)?t(date,localeCode):t;}return result;}function formatDate(date,format,relative,localeCode){var adu;if(!_isValid(date)){return 'Invalid Date';}else if(isString(sugarDate[format])){format = sugarDate[format];}else if(isFunction(format)){adu = getAdjustedUnitForDate(date);format = format.apply(date,adu.concat(getLocalization(localeCode)));}if(!format && relative){adu = adu || getAdjustedUnitForDate(date); // Adjust up if time is in ms, as this doesn't
// look very good for a standard relative date.
if(adu[1] === 0){adu[1] = 1;adu[0] = 1;}return getLocalization(localeCode).getRelativeFormat(adu);}format = format || 'long';if(format === 'short' || format === 'long' || format === 'full'){format = getLocalization(localeCode)[format];}if(!CompiledOutputFormats[format]){buildCompiledOutputFormat(format);}return executeCompiledOutputFormat(date,format,localeCode);} // Date comparison helpers
function fullCompareDate(d,f,margin,utc){var tmp,comp;if(!_isValid(d))return;if(isString(f)){f = f.trim().toLowerCase();comp = _setUTC(cloneDate(d),utc);switch(true){case f === 'future':return d.getTime() > getNewDate().getTime();case f === 'past':return d.getTime() < getNewDate().getTime();case f === 'weekday':return callDateGet(comp,'Day') > 0 && callDateGet(comp,'Day') < 6;case f === 'weekend':return callDateGet(comp,'Day') === 0 || callDateGet(comp,'Day') === 6;case (tmp = English['weekdays'].indexOf(f) % 7) > -1:return callDateGet(comp,'Day') === tmp;case (tmp = English['months'].indexOf(f) % 12) > -1:return callDateGet(comp,'Month') === tmp;}}return compareDate(d,f,null,margin,utc);}function compareDate(d,find,localeCode,buffer,forceUTC){var p,t,min,max,override,accuracy=0,loBuffer=0,hiBuffer=0;p = getExtendedDate(null,find,localeCode,null,forceUTC);if(buffer > 0){loBuffer = hiBuffer = buffer;override = true;}if(!_isValid(p.date))return false;if(p.set && p.set.specificity){if(p.set['edge'] || p.set['shift']){moveToBeginningOfUnit(p.date,p.set.specificity);}if(p.set.specificity === 'month'){max = moveToEndOfUnit(cloneDate(p.date),p.set.specificity).getTime();}else {max = advanceDate(cloneDate(p.date),['1 ' + p.set.specificity]).getTime() - 1;}if(!override && p.set['sign'] && p.set.specificity !== 'millisecond'){ // If the time is relative, there can occasionally be an disparity between the relative date
// and "now", which it is being compared to, so set an extra buffer to account for this.
loBuffer = 50;hiBuffer = -50;}}t = d.getTime();min = p.date.getTime();max = max || min + accuracy;max = compensateForTimezoneTraversal(d,min,max);return t >= min - loBuffer && t <= max + hiBuffer;}function compensateForTimezoneTraversal(d,min,max){var dMin,dMax,minOffset,maxOffset;dMin = new date(min);dMax = _setUTC(new date(max),_isUTC(d));if(callDateGet(dMax,'Hours') !== 23){minOffset = dMin.getTimezoneOffset();maxOffset = dMax.getTimezoneOffset();if(minOffset !== maxOffset){max += (maxOffset - minOffset).minutes();}}return max;}function updateDate(d,params,reset,advance,prefer,weekdayForward){var specificityIndex;function getParam(key){return isDefined(params[key])?params[key]:params[key + 's'];}function paramExists(key){return isDefined(getParam(key));}function uniqueParamExists(key,isDay){return paramExists(key) || isDay && paramExists('weekday') && !paramExists('month');}function canDisambiguate(){switch(prefer){case -1:return d > getNewDate();case 1:return d < getNewDate();}}if(isNumber(params) && advance){ // If param is a number and we're advancing, the number is presumed to be milliseconds.
params = {'milliseconds':params};}else if(isNumber(params)){ // Otherwise just set the timestamp and return.
d.setTime(params);return d;} // "date" can also be passed for the day
if(isDefined(params['date'])){params['day'] = params['date'];} // Reset any unit lower than the least specific unit set. Do not do this for weeks
// or for years. This needs to be performed before the acutal setting of the date
// because the order needs to be reversed in order to get the lowest specificity,
// also because higher order units can be overwritten by lower order units, such
// as setting hour: 3, minute: 345, etc.
iterateOverDateUnits(function(name,unit,i){var isDay=name === 'day';if(uniqueParamExists(name,isDay)){params.specificity = name;specificityIndex = +i;return false;}else if(reset && name !== 'week' && (!isDay || !paramExists('week'))){ // Days are relative to months, not weeks, so don't reset if a week exists.
callDateSet(d,unit.method,isDay?1:0);}}); // Now actually set or advance the date in order, higher units first.
DateUnits.forEach(function(u,i){var name=u.name,method=u.method,higherUnit=DateUnits[i - 1],value;value = getParam(name);if(isUndefined(value))return;if(advance){if(name === 'week'){value *= 7;method = 'Date';}value = value * advance + callDateGet(d,method);}else if(name === 'month' && paramExists('day')){ // When setting the month, there is a chance that we will traverse into a new month.
// This happens in DST shifts, for example June 1st DST jumping to January 1st
// (non-DST) will have a shift of -1:00 which will traverse into the previous year.
// Prevent this by proactively setting the day when we know it will be set again anyway.
// It can also happen when there are not enough days in the target month. This second
// situation is identical to checkMonthTraversal below, however when we are advancing
// we want to reset the date to "the last date in the target month". In the case of
// DST shifts, however, we want to avoid the "edges" of months as that is where this
// unintended traversal can happen. This is the reason for the different handling of
// two similar but slightly different situations.
//
// TL;DR This method avoids the edges of a month IF not advancing and the date is going
// to be set anyway, while checkMonthTraversal resets the date to the last day if advancing.
//
callDateSet(d,'Date',15);}callDateSetWithWeek(d,method,value);if(advance && name === 'month'){checkMonthTraversal(d,value);}}); // If a weekday is included in the params and no 'date' parameter
// is overriding, set it here after all other units have been set.
// Note that the date has to be perfectly set before disambiguation
// so that a proper comparison can be made.
if(!advance && !paramExists('day') && paramExists('weekday')){_setWeekday(d,getParam('weekday'),weekdayForward);} // If past or future is preferred, then the process of "disambiguation" will ensure that an
// ambiguous time/date ("4pm", "thursday", "June", etc.) will be in the past or future.
if(canDisambiguate()){iterateOverDateUnits(function(name,u){var ambiguous=u.ambiguous || name === 'week' && paramExists('weekday');if(ambiguous && !uniqueParamExists(name,name === 'day')){sugarDate[u.addMethod](d,prefer);return false;}else if(name === 'year' && hasAbbreviatedYear(params)){advanceDate(d,[{'years':100 * prefer}]);}},specificityIndex + 1);}return d;} // The ISO format allows times strung together without a demarcating ":", so make sure
// that these markers are now optional.
function prepareTime(format,loc,iso){var timeSuffixMapping={'h':0,'m':1,'s':2},add;loc = loc || English;return format.replace(/{([a-z])}/g,function(full,token){var separators=[],isHours=token === 'h',tokenIsRequired=isHours && !iso;if(token === 't'){return loc.get('ampm').join('|');}else {if(isHours){separators.push(':');}if(add = loc['timeSuffixes'][timeSuffixMapping[token]]){separators.push(add + '\\s*');}return separators.length === 0?'':'(?:' + separators.join('|') + ')' + (tokenIsRequired?'':'?');}});} // If the month is being set, then we don't want to accidentally
// traverse into a new month just because the target month doesn't have enough
// days. In other words, "5 months ago" from July 30th is still February, even
// though there is no February 30th, so it will of necessity be February 28th
// (or 29th in the case of a leap year).
function checkMonthTraversal(date,targetMonth){if(targetMonth < 0){targetMonth = targetMonth % 12 + 12;}if(targetMonth % 12 !== callDateGet(date,'Month')){callDateSet(date,'Date',0);}}function createDateFromArgs(contextDate,args,prefer,forceUTC){var f,localeCode;if(isNumber(args[1])){ // If the second argument is a number, then we have an
// enumerated constructor type as in "new Date(2003, 2, 12);"
f = collectDateArguments(args)[0];}else {f = args[0];localeCode = args[1];}return createDate(contextDate,f,localeCode,prefer,forceUTC);}function createDate(contextDate,f,localeCode,prefer,forceUTC){return getExtendedDate(contextDate,f,localeCode,prefer,forceUTC).date;}function invalidateDate(d){d.setTime(NaN);}function buildDateUnits(){DateUnitsReversed = DateUnits.concat().reverse();DateArgumentUnits = DateUnits.concat();DateArgumentUnits.splice(2,1);} /***
   * @method [units]Since([d], [locale] = currentLocale)
   * @returns Number
   * @short Returns the time since [d] in the appropriate unit.
   * @extra [d] will accept a date object, timestamp, or text format. If not specified, [d] is assumed to be now. [locale] can be passed to specify the locale that the date is in. %[unit]Ago% is provided as an alias to make this more readable when [d] is assumed to be the current date. For more see @date_format.
   *
   * @set
   *   millisecondsSince
   *   secondsSince
   *   minutesSince
   *   hoursSince
   *   daysSince
   *   weeksSince
   *   monthsSince
   *   yearsSince
   *
   * @example
   *
   *   Date.create().millisecondsSince('1 hour ago') -> 3,600,000
   *   Date.create().daysSince('1 week ago')         -> 7
   *   Date.create().yearsSince('15 years ago')      -> 15
   *   Date.create('15 years ago').yearsAgo()        -> 15
   *
   ***
   * @method [units]Ago()
   * @returns Number
   * @short Returns the time ago in the appropriate unit.
   *
   * @set
   *   millisecondsAgo
   *   secondsAgo
   *   minutesAgo
   *   hoursAgo
   *   daysAgo
   *   weeksAgo
   *   monthsAgo
   *   yearsAgo
   *
   * @example
   *
   *   Date.create('last year').millisecondsAgo() -> 3,600,000
   *   Date.create('last year').daysAgo()         -> 7
   *   Date.create('last year').yearsAgo()        -> 15
   *
   ***
   * @method [units]Until([d], [locale] = currentLocale)
   * @returns Number
   * @short Returns the time until [d] in the appropriate unit.
   * @extra [d] will accept a date object, timestamp, or text format. If not specified, [d] is assumed to be now. [locale] can be passed to specify the locale that the date is in. %[unit]FromNow% is provided as an alias to make this more readable when [d] is assumed to be the current date. For more see @date_format.
   *
   * @set
   *   millisecondsUntil
   *   secondsUntil
   *   minutesUntil
   *   hoursUntil
   *   daysUntil
   *   weeksUntil
   *   monthsUntil
   *   yearsUntil
   *
   * @example
   *
   *   Date.create().millisecondsUntil('1 hour from now') -> 3,600,000
   *   Date.create().daysUntil('1 week from now')         -> 7
   *   Date.create().yearsUntil('15 years from now')      -> 15
   *   Date.create('15 years from now').yearsFromNow()    -> 15
   *
   ***
   * @method [units]FromNow()
   * @returns Number
   * @short Returns the time from now in the appropriate unit.
   *
   * @set
   *   millisecondsFromNow
   *   secondsFromNow
   *   minutesFromNow
   *   hoursFromNow
   *   daysFromNow
   *   weeksFromNow
   *   monthsFromNow
   *   yearsFromNow
   *
   * @example
   *
   *   Date.create('next year').millisecondsFromNow() -> 3,600,000
   *   Date.create('next year').daysFromNow()         -> 7
   *   Date.create('next year').yearsFromNow()        -> 15
   *
   ***
   * @method add[Units](<num>, [reset] = false)
   * @returns Date
   * @short Adds <num> of the unit to the date. If [reset] is true, all lower units will be reset.
   * @extra Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Don't use %addMonths% if you need precision.
   *
   * @set
   *   addMilliseconds
   *   addSeconds
   *   addMinutes
   *   addHours
   *   addDays
   *   addWeeks
   *   addMonths
   *   addYears
   *
   * @example
   *
   *   Date.create().addMilliseconds(5) -> current time + 5 milliseconds
   *   Date.create().addDays(5)         -> current time + 5 days
   *   Date.create().addYears(5)        -> current time + 5 years
   *
   ***
   * @method isLast[Unit]()
   * @returns Boolean
   * @short Returns true if the date is last week/month/year.
   *
   * @set
   *   isLastWeek
   *   isLastMonth
   *   isLastYear
   *
   * @example
   *
   *   Date.create('yesterday').isLastWeek()  -> true or false?
   *   Date.create('yesterday').isLastMonth() -> probably not...
   *   Date.create('yesterday').isLastYear()  -> even less likely...
   *
   ***
   * @method isThis[Unit]()
   * @returns Boolean
   * @short Returns true if the date is this week/month/year.
   *
   * @set
   *   isThisWeek
   *   isThisMonth
   *   isThisYear
   *
   * @example
   *
   *   Date.create('tomorrow').isThisWeek()  -> true or false?
   *   Date.create('tomorrow').isThisMonth() -> probably...
   *   Date.create('tomorrow').isThisYear()  -> signs point to yes...
   *
   ***
   * @method isNext[Unit]()
   * @returns Boolean
   * @short Returns true if the date is next week/month/year.
   *
   * @set
   *   isNextWeek
   *   isNextMonth
   *   isNextYear
   *
   * @example
   *
   *   Date.create('tomorrow').isNextWeek()  -> true or false?
   *   Date.create('tomorrow').isNextMonth() -> probably not...
   *   Date.create('tomorrow').isNextYear()  -> even less likely...
   *
   ***
   * @method beginningOf[Unit]()
   * @returns Date
   * @short Sets the date to the beginning of the appropriate unit.
   *
   * @set
   *   beginningOfDay
   *   beginningOfWeek
   *   beginningOfMonth
   *   beginningOfYear
   *
   * @example
   *
   *   Date.create().beginningOfDay()   -> the beginning of today (resets the time)
   *   Date.create().beginningOfWeek()  -> the beginning of the week
   *   Date.create().beginningOfMonth() -> the beginning of the month
   *   Date.create().beginningOfYear()  -> the beginning of the year
   *
   ***
   * @method endOf[Unit]()
   * @returns Date
   * @short Sets the date to the end of the appropriate unit.
   *
   * @set
   *   endOfDay
   *   endOfWeek
   *   endOfMonth
   *   endOfYear
   *
   * @example
   *
   *   Date.create().endOfDay()   -> the end of today (sets the time to 23:59:59.999)
   *   Date.create().endOfWeek()  -> the end of the week
   *   Date.create().endOfMonth() -> the end of the month
   *   Date.create().endOfYear()  -> the end of the year
   *
   ***/function buildDateMethods(){extendSimilar(date,DateUnits,function(methods,u,i){var name=u.name,caps=simpleCapitalize(name),since,until;u.addMethod = 'add' + caps + 's';function add(num,reset){var set={};set[name] = num;return advanceDate(this,[set,reset]);}function timeDistanceNumeric(d1,d2){var n=(d1.getTime() - d2.getTime()) / u.multiplier;return n < 0?ceil(n):floor(n);}function addUnit(d,n,dsc){var d2;add.call(d,n); // "dsc" = "date shift compensation"
// This number should only be passed when traversing months to
// compensate for date shifting. For example, calling "1 month ago"
// on March 30th will result in February 28th, as there are not enough
// days. This is not an issue when creating new dates, as "2 months ago"
// gives an exact target to set, and the date shift is expected. However,
// when counting months using unit traversal, the date needs to stay the
// same if possible. To compensate for this, we need to try to reset the
// date after every iteration, and use the result if possible.
if(dsc && callDateGet(d,'Date') !== dsc){d2 = cloneDate(d);callDateSet(d2,'Date',dsc);if(callDateGet(d2,'Date') === dsc){return d2;}}return d;}function timeDistanceTraversal(d1,d2){var d,inc,n,dsc,count=0;d = cloneDate(d1);inc = d1 < d2;n = inc?1:-1;dsc = name === 'month' && callDateGet(d,'Date');d = addUnit(d,n,dsc);while(inc?d <= d2:d >= d2) {count += -n;d = addUnit(d,n,dsc);}return count;}function compareSince(fn,d,args){return fn(d,createDateFromArgs(d,args,0,false));}function compareUntil(fn,d,args){return fn(createDateFromArgs(d,args,0,false),d);}if(i < 3){['Last','This','Next'].forEach(function(shift){methods['is' + shift + caps] = function(){return compareDate(this,shift + ' ' + name,'en');};});}if(i < 4){methods['beginningOf' + caps] = function(){return moveToBeginningOfUnit(this,name);};methods['endOf' + caps] = function(){return moveToEndOfUnit(this,name);};since = function(){return compareSince(timeDistanceTraversal,this,arguments);};until = function(){return compareUntil(timeDistanceTraversal,this,arguments);};}else {since = function(){return compareSince(timeDistanceNumeric,this,arguments);};until = function(){return compareUntil(timeDistanceNumeric,this,arguments);};}methods[name + 'sAgo'] = until;methods[name + 'sUntil'] = until;methods[name + 'sSince'] = since;methods[name + 'sFromNow'] = since;methods[u.addMethod] = add;buildNumberToDateAlias(u,u.multiplier);});}function buildCoreInputFormats(){English.addFormat('([+-])?(\\d{4,4})[-.\\/]?{full_month}[-.]?(\\d{1,2})?',true,['year_sign','year','month','date'],false,true);English.addFormat('(\\d{1,2})[-.\\/]{full_month}(?:[-.\\/](\\d{2,4}))?',true,['date','month','year'],true);English.addFormat('{full_month}[-.](\\d{4,4})',false,['month','year']);English.addFormat('\\/Date\\((\\d+(?:[+-]\\d{4,4})?)\\)\\/',false,['timestamp']);English.addFormat(prepareTime(RequiredTime,English),false,TimeFormat); // When a new locale is initialized it will have the CoreDateFormats initialized by default.
// From there, adding new formats will push them in front of the previous ones, so the core
// formats will be the last to be reached. However, the core formats themselves have English
// months in them, which means that English needs to first be initialized and creates a race
// condition. I'm getting around this here by adding these generalized formats in the order
// specific -> general, which will mean they will be added to the English localization in
// general -> specific order, then chopping them off the front and reversing to get the correct
// order. Note that there are 7 formats as 2 have times which adds a front and a back format.
CoreDateFormats = English.compiledFormats.slice(0,7).reverse();English.compiledFormats = English.compiledFormats.slice(7).concat(CoreDateFormats);}function buildFormatTokens(){createPaddedToken('f',function(d){return callDateGet(d,'Milliseconds');},true);createPaddedToken('s',function(d){return callDateGet(d,'Seconds');});createPaddedToken('m',function(d){return callDateGet(d,'Minutes');});createPaddedToken('h',function(d){return callDateGet(d,'Hours') % 12 || 12;});createPaddedToken('H',function(d){return callDateGet(d,'Hours');});createPaddedToken('d',function(d){return callDateGet(d,'Date');});createPaddedToken('M',function(d){return callDateGet(d,'Month') + 1;});createMeridianTokens();createWeekdayTokens();createMonthTokens(); // Aliases
DateFormatTokens['ms'] = DateFormatTokens['f'];DateFormatTokens['milliseconds'] = DateFormatTokens['f'];DateFormatTokens['seconds'] = DateFormatTokens['s'];DateFormatTokens['minutes'] = DateFormatTokens['m'];DateFormatTokens['hours'] = DateFormatTokens['h'];DateFormatTokens['24hr'] = DateFormatTokens['H'];DateFormatTokens['12hr'] = DateFormatTokens['h'];DateFormatTokens['date'] = DateFormatTokens['d'];DateFormatTokens['day'] = DateFormatTokens['d'];DateFormatTokens['year'] = DateFormatTokens['yyyy'];}function buildFormatShortcuts(){extendSimilar(date,'short,long,full',function(methods,name){methods[name] = function(localeCode){return formatDate(this,name,false,localeCode);};});}function buildAsianDigits(){KanjiDigits.split('').forEach(function(digit,value){var holder;if(value > 9){value = pow(10,value - 9);}AsianDigitMap[digit] = value;});simpleMerge(AsianDigitMap,NumberNormalizeMap); // Kanji numerals may also be included in phrases which are text-based rather
// than actual numbers such as Chinese weekdays (上周三), and "the day before
// yesterday" (一昨日) in Japanese, so don't match these.
AsianDigitReg = regexp('([期週周])?([' + KanjiDigits + FullWidthDigits + ']+)(?!昨)','g');} /***
   * @method is[Day]()
   * @returns Boolean
   * @short Returns true if the date falls on that day.
   * @extra Also available: %isYesterday%, %isToday%, %isTomorrow%, %isWeekday%, and %isWeekend%.
   *
   * @set
   *   isToday
   *   isYesterday
   *   isTomorrow
   *   isWeekday
   *   isWeekend
   *   isSunday
   *   isMonday
   *   isTuesday
   *   isWednesday
   *   isThursday
   *   isFriday
   *   isSaturday
   *
   * @example
   *
   *   Date.create('tomorrow').isToday() -> false
   *   Date.create('thursday').isTomorrow() -> ?
   *   Date.create('yesterday').isWednesday() -> ?
   *   Date.create('today').isWeekend() -> ?
   *
   ***
   * @method isFuture()
   * @returns Boolean
   * @short Returns true if the date is in the future.
   * @example
   *
   *   Date.create('next week').isFuture() -> true
   *   Date.create('last week').isFuture() -> false
   *
   ***
   * @method isPast()
   * @returns Boolean
   * @short Returns true if the date is in the past.
   * @example
   *
   *   Date.create('last week').isPast() -> true
   *   Date.create('next week').isPast() -> false
   *
   ***/function buildRelativeAliases(){var special='today,yesterday,tomorrow,weekday,weekend,future,past'.split(',');var weekdays=English['weekdays'].slice(0,7);var months=English['months'].slice(0,12);extendSimilar(date,special.concat(weekdays).concat(months),function(methods,name){methods['is' + simpleCapitalize(name)] = function(utc){return fullCompareDate(this,name,0,utc);};});}function buildUTCAliases(){extend(date,{'utc':{'create':function create(){return createDateFromArgs(null,arguments,0,true);},'past':function past(){return createDateFromArgs(null,arguments,-1,true);},'future':function future(){return createDateFromArgs(null,arguments,1,true);}}},false);}function setDateProperties(){extend(date,{'RFC1123':'{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {tz}','RFC1036':'{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {tz}','ISO8601_DATE':'{yyyy}-{MM}-{dd}','ISO8601_DATETIME':'{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{fff}{isotz}'},false);}extend(date,{ /***
     * @method Date.create(<d>, [locale] = currentLocale)
     * @returns Date
     * @short Alternate Date constructor which understands many different text formats, a timestamp, or another date.
     * @extra If no argument is given, date is assumed to be now. %Date.create% additionally can accept enumerated parameters as with the standard date constructor. [locale] can be passed to specify the locale that the date is in. When unspecified, the current locale (default is English) is assumed. UTC-based dates can be created through the %utc% object. For more see @date_format.
     * @set
     *   Date.utc.create
     *
     * @example
     *
     *   Date.create('July')          -> July of this year
     *   Date.create('1776')          -> 1776
     *   Date.create('today')         -> today
     *   Date.create('wednesday')     -> This wednesday
     *   Date.create('next friday')   -> Next friday
     *   Date.create('July 4, 1776')  -> July 4, 1776
     *   Date.create(-446806800000)   -> November 5, 1955
     *   Date.create(1776, 6, 4)      -> July 4, 1776
     *   Date.create('1776年07月04日', 'ja') -> July 4, 1776
     *   Date.utc.create('July 4, 1776', 'en')  -> July 4, 1776
     *
     ***/'create':function create(){return createDateFromArgs(null,arguments);}, /***
     * @method Date.past(<d>, [locale] = currentLocale)
     * @returns Date
     * @short Alternate form of %Date.create% with any ambiguity assumed to be the past.
     * @extra For example %"Sunday"% can be either "the Sunday coming up" or "the Sunday last" depending on context. Note that dates explicitly in the future ("next Sunday") will remain in the future. This method simply provides a hint when ambiguity exists. UTC-based dates can be created through the %utc% object. For more, see @date_format.
     * @set
     *   Date.utc.past
     *
     * @example
     *
     *   Date.past('July')          -> July of this year or last depending on the current month
     *   Date.past('Wednesday')     -> This wednesday or last depending on the current weekday
     *
     ***/'past':function past(){return createDateFromArgs(null,arguments,-1);}, /***
     * @method Date.future(<d>, [locale] = currentLocale)
     * @returns Date
     * @short Alternate form of %Date.create% with any ambiguity assumed to be the future.
     * @extra For example %"Sunday"% can be either "the Sunday coming up" or "the Sunday last" depending on context. Note that dates explicitly in the past ("last Sunday") will remain in the past. This method simply provides a hint when ambiguity exists. UTC-based dates can be created through the %utc% object. For more, see @date_format.
     * @set
     *   Date.utc.future
     *
     * @example
     *
     *   Date.future('July')          -> July of this year or next depending on the current month
     *   Date.future('Wednesday')     -> This wednesday or next depending on the current weekday
     *
     ***/'future':function future(){return createDateFromArgs(null,arguments,1);}, /***
     * @method Date.addLocale(<code>, <set>)
     * @returns Locale
     * @short Adds a locale <set> to the locales understood by Sugar.
     * @extra For more see @date_format.
     *
     ***/'addLocale':function addLocale(localeCode,set){return setLocalization(localeCode,set);}, /***
     * @method Date.setLocale(<code>)
     * @returns Locale
     * @short Sets the current locale to be used with dates.
     * @extra Sugar has support for 13 locales that are available through the "Date Locales" package. In addition you can define a new locale with %Date.addLocale%. For more see @date_format.
     *
     ***/'setLocale':function setLocale(localeCode,set){var loc=getLocalization(localeCode,false);CurrentLocalization = loc; // The code is allowed to be more specific than the codes which are required:
// i.e. zh-CN or en-US. Currently this only affects US date variants such as 8/10/2000.
if(localeCode && localeCode !== loc['code']){loc['code'] = localeCode;}return loc;}, /***
     * @method Date.getLocale([code] = current)
     * @returns Locale
     * @short Gets the locale for the given code, or the current locale.
     * @extra The resulting locale object can be manipulated to provide more control over date localizations. For more about locales, see @date_format.
     *
     ***/'getLocale':function getLocale(localeCode){return !localeCode?CurrentLocalization:getLocalization(localeCode,false);}, /**
     * @method Date.addFormat(<format>, <match>, [code] = null)
     * @returns Nothing
     * @short Manually adds a new date input format.
     * @extra This method allows fine grained control for alternate formats. <format> is a string that can have regex tokens inside. <match> is an array of the tokens that each regex capturing group will map to, for example %year%, %date%, etc. For more, see @date_format.
     *
     **/'addFormat':function addFormat(format,match,localeCode){addDateInputFormat(getLocalization(localeCode),format,match);}},false);extend(date,{ /***
     * @method set(<set>, [reset] = false)
     * @returns Date
     * @short Sets the date object.
     * @extra This method can accept multiple formats including a single number as a timestamp, an object, or enumerated parameters (as with the Date constructor). If [reset] is %true%, any units more specific than those passed will be reset.
     *
     * @example
     *
     *   new Date().set({ year: 2011, month: 11, day: 31 }) -> December 31, 2011
     *   new Date().set(2011, 11, 31)                       -> December 31, 2011
     *   new Date().set(86400000)                           -> 1 day after Jan 1, 1970
     *   new Date().set({ year: 2004, month: 6 }, true)     -> June 1, 2004, 00:00:00.000
     *
     ***/'set':function set(){return setDate(this,arguments);}, /***
     * @method setWeekday()
     * @returns Nothing
     * @short Sets the weekday of the date.
     * @extra In order to maintain a parallel with %getWeekday% (which itself is an alias for Javascript native %getDay%), Sunday is considered day %0%. This contrasts with ISO-8601 standard (used in %getISOWeek% and %setISOWeek%) which places Sunday at the end of the week (day 7). This effectively means that passing %0% to this method while in the middle of a week will rewind the date, where passing %7% will advance it.
     *
     * @example
     *
     *   d = new Date(); d.setWeekday(1); d; -> Monday of this week
     *   d = new Date(); d.setWeekday(6); d; -> Saturday of this week
     *
     ***/'setWeekday':function setWeekday(dow){return _setWeekday(this,dow);}, /***
     * @method setISOWeek(<num>)
     * @returns Nothing
     * @short Sets the week (of the year) as defined by the ISO-8601 standard.
     * @extra Note that this standard places Sunday at the end of the week (day 7).
     *
     * @example
     *
     *   d = new Date(); d.setISOWeek(15); d; -> 15th week of the year
     *
     ***/'setISOWeek':function setISOWeek(num){return setWeekNumber(this,num);}, /***
     * @method getISOWeek()
     * @returns Number
     * @short Gets the date's week (of the year) as defined by the ISO-8601 standard.
     * @extra Note that this standard places Sunday at the end of the week (day 7). If %utc% is set on the date, the week will be according to UTC time.
     *
     * @example
     *
     *   new Date().getISOWeek()    -> today's week of the year
     *
     ***/'getISOWeek':function getISOWeek(){return getWeekNumber(this);}, /***
     * @method beginningOfISOWeek()
     * @returns Date
     * @short Set the date to the beginning of week as defined by this ISO-8601 standard.
     * @extra Note that this standard places Monday at the start of the week.
     * @example
     *
     *   Date.create().beginningOfISOWeek() -> Monday
     *
     ***/'beginningOfISOWeek':function beginningOfISOWeek(){var day=this.getDay();if(day === 0){day = -6;}else if(day !== 1){day = 1;}_setWeekday(this,day);return resetDate(this);}, /***
     * @method endOfISOWeek()
     * @returns Date
     * @short Set the date to the end of week as defined by this ISO-8601 standard.
     * @extra Note that this standard places Sunday at the end of the week.
     * @example
     *
     *   Date.create().endOfISOWeek() -> Sunday
     *
     ***/'endOfISOWeek':function endOfISOWeek(){if(this.getDay() !== 0){_setWeekday(this,7);}return moveToEndOfUnit(this,'day');}, /***
     * @method getUTCOffset([iso])
     * @returns String
     * @short Returns a string representation of the offset from UTC time. If [iso] is true the offset will be in ISO8601 format.
     * @example
     *
     *   new Date().getUTCOffset()     -> "+0900"
     *   new Date().getUTCOffset(true) -> "+09:00"
     *
     ***/'getUTCOffset':function getUTCOffset(iso){return _getUTCOffset(this,iso);}, /***
     * @method setUTC([on] = false)
     * @returns Date
     * @short Sets the internal utc flag for the date. When on, UTC-based methods will be called internally.
     * @extra For more see @date_format.
     * @example
     *
     *   new Date().setUTC(true)
     *   new Date().setUTC(false)
     *
     ***/'setUTC':function setUTC(set){return _setUTC(this,set);}, /***
     * @method isUTC()
     * @returns Boolean
     * @short Returns true if the date has no timezone offset.
     * @extra This will also return true for utc-based dates (dates that have the %utc% method set true). Note that even if the utc flag is set, %getTimezoneOffset% will always report the same thing as Javascript always reports that based on the environment's locale.
     * @example
     *
     *   new Date().isUTC()           -> true or false?
     *   new Date().utc(true).isUTC() -> true
     *
     ***/'isUTC':function isUTC(){return _isUTC(this);}, /***
     * @method advance(<set>, [reset] = false)
     * @returns Date
     * @short Sets the date forward.
     * @extra This method can accept multiple formats including an object, a string in the format %3 days%, a single number as milliseconds, or enumerated parameters (as with the Date constructor). If [reset] is %true%, any units more specific than those passed will be reset. For more see @date_format.
     * @example
     *
     *   new Date().advance({ year: 2 }) -> 2 years in the future
     *   new Date().advance('2 days')    -> 2 days in the future
     *   new Date().advance(0, 2, 3)     -> 2 months 3 days in the future
     *   new Date().advance(86400000)    -> 1 day in the future
     *
     ***/'advance':function advance(){return advanceDate(this,arguments);}, /***
     * @method rewind(<set>, [reset] = false)
     * @returns Date
     * @short Sets the date back.
     * @extra This method can accept multiple formats including a single number as a timestamp, an object, or enumerated parameters (as with the Date constructor). If [reset] is %true%, any units more specific than those passed will be reset. For more see @date_format.
     * @example
     *
     *   new Date().rewind({ year: 2 }) -> 2 years in the past
     *   new Date().rewind(0, 2, 3)     -> 2 months 3 days in the past
     *   new Date().rewind(86400000)    -> 1 day in the past
     *
     ***/'rewind':function rewind(){var args=collectDateArguments(arguments,true);return updateDate(this,args[0],args[1],-1);}, /***
     * @method isValid()
     * @returns Boolean
     * @short Returns true if the date is valid.
     * @example
     *
     *   new Date().isValid()         -> true
     *   new Date('flexor').isValid() -> false
     *
     ***/'isValid':function isValid(){return _isValid(this);}, /***
     * @method isAfter(<d>, [margin] = 0)
     * @returns Boolean
     * @short Returns true if the date is after the <d>.
     * @extra [margin] is to allow extra margin of error (in ms). <d> will accept a date object, timestamp, or text format. If not specified, <d> is assumed to be now. See @date_format for more.
     * @example
     *
     *   new Date().isAfter('tomorrow')  -> false
     *   new Date().isAfter('yesterday') -> true
     *
     ***/'isAfter':function isAfter(d,margin,utc){return this.getTime() > createDate(null,d).getTime() - (margin || 0);}, /***
     * @method isBefore(<d>, [margin] = 0)
     * @returns Boolean
     * @short Returns true if the date is before <d>.
     * @extra [margin] is to allow extra margin of error (in ms). <d> will accept a date object, timestamp, or text format. If not specified, <d> is assumed to be now. See @date_format for more.
     * @example
     *
     *   new Date().isBefore('tomorrow')  -> true
     *   new Date().isBefore('yesterday') -> false
     *
     ***/'isBefore':function isBefore(d,margin){return this.getTime() < createDate(null,d).getTime() + (margin || 0);}, /***
     * @method isBetween(<d1>, <d2>, [margin] = 0)
     * @returns Boolean
     * @short Returns true if the date falls between <d1> and <d2>.
     * @extra [margin] is to allow extra margin of error (in ms). <d1> and <d2> will accept a date object, timestamp, or text format. If not specified, they are assumed to be now. See @date_format for more.
     * @example
     *
     *   new Date().isBetween('yesterday', 'tomorrow')    -> true
     *   new Date().isBetween('last year', '2 years ago') -> false
     *
     ***/'isBetween':function isBetween(d1,d2,margin){var t=this.getTime();var t1=createDate(null,d1).getTime();var t2=createDate(null,d2).getTime();var lo=min(t1,t2);var hi=max(t1,t2);margin = margin || 0;return lo - margin < t && hi + margin > t;}, /***
     * @method isLeapYear()
     * @returns Boolean
     * @short Returns true if the date is a leap year.
     * @example
     *
     *   Date.create('2000').isLeapYear() -> true
     *
     ***/'isLeapYear':function isLeapYear(){return _isLeapYear(this);}, /***
     * @method daysInMonth()
     * @returns Number
     * @short Returns the number of days in the date's month.
     * @example
     *
     *   Date.create('May').daysInMonth()            -> 31
     *   Date.create('February, 2000').daysInMonth() -> 29
     *
     ***/'daysInMonth':function daysInMonth(){return getDaysInMonth(this);}, /***
     * @method format(<format>, [locale] = currentLocale)
     * @returns String
     * @short Formats and outputs the date.
     * @extra <format> can be a number of pre-determined formats or a string of tokens. Locale-specific formats are %short%, %long%, and %full% which have their own aliases and can be called with %date.short()%, etc. If <format> is not specified the %long% format is assumed. [locale] specifies a locale code to use (if not specified the current locale is used). See @date_format for more details.
     *
     * @set
     *   short
     *   long
     *   full
     *
     * @example
     *
     *   Date.create().format()                                   -> ex. July 4, 2003
     *   Date.create().format('{Weekday} {d} {Month}, {yyyy}')    -> ex. Monday July 4, 2003
     *   Date.create().format('{hh}:{mm}')                        -> ex. 15:57
     *   Date.create().format('{12hr}:{mm}{tt}')                  -> ex. 3:57pm
     *   Date.create().format(Date.ISO8601_DATETIME)              -> ex. 2011-07-05 12:24:55.528Z
     *   Date.create('last week').format('short', 'ja')                -> ex. 先週
     *   Date.create('yesterday').format(function(value,unit,ms,loc) {
     *     // value = 1, unit = 3, ms = -86400000, loc = [current locale object]
     *   });                                                      -> ex. 1 day ago
     *
     ***/'format':function format(f,localeCode){return formatDate(this,f,false,localeCode);}, /***
     * @method relative([fn], [locale] = currentLocale)
     * @returns String
     * @short Returns a relative date string offset to the current time.
     * @extra [fn] can be passed to provide for more granular control over the resulting string. [fn] is passed 4 arguments: the adjusted value, unit, offset in milliseconds, and a localization object. As an alternate syntax, [locale] can also be passed as the first (and only) parameter. For more, see @date_format.
     * @example
     *
     *   Date.create('90 seconds ago').relative() -> 1 minute ago
     *   Date.create('January').relative()        -> ex. 5 months ago
     *   Date.create('January').relative('ja')    -> 3ヶ月前
     *   Date.create('120 minutes ago').relative(function(val,unit,ms,loc) {
     *     // value = 2, unit = 3, ms = -7200, loc = [current locale object]
     *   });                                      -> ex. 5 months ago
     *
     ***/'relative':function relative(fn,localeCode){if(isString(fn)){localeCode = fn;fn = null;}return formatDate(this,fn,true,localeCode);}, /***
     * @method is(<f>, [margin] = 0, [utc] = false)
     * @returns Boolean
     * @short Returns true if the date is <f>.
     * @extra <f> will accept a date object, timestamp, or text format. %is% additionally understands more generalized expressions like month/weekday names, 'today', etc, and compares to the precision implied in <f>. [margin] allows an extra margin of error in milliseconds. [utc] will treat the compared date as UTC. For more, see @date_format.
     * @example
     *
     *   Date.create().is('July')               -> true or false?
     *   Date.create().is('1776')               -> false
     *   Date.create().is('today')              -> true
     *   Date.create().is('weekday')            -> true or false?
     *   Date.create().is('July 4, 1776')       -> false
     *   Date.create().is(-6106093200000)       -> false
     *   Date.create().is(new Date(1776, 6, 4)) -> false
     *
     ***/'is':function is(f,margin,utc){return fullCompareDate(this,f,margin,utc);}, /***
     * @method reset([unit] = 'hours')
     * @returns Date
     * @short Resets the unit passed and all smaller units. Default is "hours", effectively resetting the time.
     * @example
     *
     *   Date.create().reset('day')   -> Beginning of today
     *   Date.create().reset('month') -> 1st of the month
     *
     ***/'reset':function reset(unit){return resetDate(this,unit);}, /***
     * @method clone()
     * @returns Date
     * @short Clones the date.
     * @example
     *
     *   Date.create().clone() -> Copy of now
     *
     ***/'clone':function clone(){return cloneDate(this);}, /***
     * @method iso()
     * @alias toISOString
     *
     ***/'iso':function iso(){return this.toISOString();}, /***
     * @method getWeekday()
     * @returns Number
     * @short Alias for %getDay%.
     * @set
     *   getUTCWeekday
     *
     * @example
     *
     +   Date.create().getWeekday();    -> (ex.) 3
     +   Date.create().getUTCWeekday();    -> (ex.) 3
     *
     ***/'getWeekday':function getWeekday(){return this.getDay();},'getUTCWeekday':function getUTCWeekday(){return this.getUTCDay();}}); /***
   * Number module
   *
   ***/ /***
   * @method [unit]()
   * @returns Number
   * @short Takes the number as a corresponding unit of time and converts to milliseconds.
   * @extra Method names can be singular or plural.  Note that as "a month" is ambiguous as a unit of time, %months% will be equivalent to 30.4375 days, the average number in a month. Be careful using %months% if you need exact precision.
   *
   * @set
   *   millisecond
   *   milliseconds
   *   second
   *   seconds
   *   minute
   *   minutes
   *   hour
   *   hours
   *   day
   *   days
   *   week
   *   weeks
   *   month
   *   months
   *   year
   *   years
   *
   * @example
   *
   *   (5).milliseconds() -> 5
   *   (10).hours()       -> 36000000
   *   (1).day()          -> 86400000
   *
   ***
   * @method [unit]Before([d], [locale] = currentLocale)
   * @returns Date
   * @short Returns a date that is <n> units before [d], where <n> is the number.
   * @extra [d] will accept a date object, timestamp, or text format. Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Be careful using %monthsBefore% if you need exact precision. See @date_format for more.
   *
   * @set
   *   millisecondBefore
   *   millisecondsBefore
   *   secondBefore
   *   secondsBefore
   *   minuteBefore
   *   minutesBefore
   *   hourBefore
   *   hoursBefore
   *   dayBefore
   *   daysBefore
   *   weekBefore
   *   weeksBefore
   *   monthBefore
   *   monthsBefore
   *   yearBefore
   *   yearsBefore
   *
   * @example
   *
   *   (5).daysBefore('tuesday')          -> 5 days before tuesday of this week
   *   (1).yearBefore('January 23, 1997') -> January 23, 1996
   *
   ***
   * @method [unit]Ago()
   * @returns Date
   * @short Returns a date that is <n> units ago.
   * @extra Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Be careful using %monthsAgo% if you need exact precision.
   *
   * @set
   *   millisecondAgo
   *   millisecondsAgo
   *   secondAgo
   *   secondsAgo
   *   minuteAgo
   *   minutesAgo
   *   hourAgo
   *   hoursAgo
   *   dayAgo
   *   daysAgo
   *   weekAgo
   *   weeksAgo
   *   monthAgo
   *   monthsAgo
   *   yearAgo
   *   yearsAgo
   *
   * @example
   *
   *   (5).weeksAgo() -> 5 weeks ago
   *   (1).yearAgo()  -> January 23, 1996
   *
   ***
   * @method [unit]After([d], [locale] = currentLocale)
   * @returns Date
   * @short Returns a date <n> units after [d], where <n> is the number.
   * @extra [d] will accept a date object, timestamp, or text format. Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Be careful using %monthsAfter% if you need exact precision. See @date_format for more.
   *
   * @set
   *   millisecondAfter
   *   millisecondsAfter
   *   secondAfter
   *   secondsAfter
   *   minuteAfter
   *   minutesAfter
   *   hourAfter
   *   hoursAfter
   *   dayAfter
   *   daysAfter
   *   weekAfter
   *   weeksAfter
   *   monthAfter
   *   monthsAfter
   *   yearAfter
   *   yearsAfter
   *
   * @example
   *
   *   (5).daysAfter('tuesday')          -> 5 days after tuesday of this week
   *   (1).yearAfter('January 23, 1997') -> January 23, 1998
   *
   ***
   * @method [unit]FromNow()
   * @returns Date
   * @short Returns a date <n> units from now.
   * @extra Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Be careful using %monthsFromNow% if you need exact precision.
   *
   * @set
   *   millisecondFromNow
   *   millisecondsFromNow
   *   secondFromNow
   *   secondsFromNow
   *   minuteFromNow
   *   minutesFromNow
   *   hourFromNow
   *   hoursFromNow
   *   dayFromNow
   *   daysFromNow
   *   weekFromNow
   *   weeksFromNow
   *   monthFromNow
   *   monthsFromNow
   *   yearFromNow
   *   yearsFromNow
   *
   * @example
   *
   *   (5).weeksFromNow() -> 5 weeks ago
   *   (1).yearFromNow()  -> January 23, 1998
   *
   ***/function buildNumberToDateAlias(u,multiplier){var name=u.name,methods={};function base(){return round(this * multiplier);}function after(){return sugarDate[u.addMethod](createDateFromArgs(null,arguments),this);}function before(){return sugarDate[u.addMethod](createDateFromArgs(null,arguments),-this);}methods[name] = base;methods[name + 's'] = base;methods[name + 'Before'] = before;methods[name + 'sBefore'] = before;methods[name + 'Ago'] = before;methods[name + 'sAgo'] = before;methods[name + 'After'] = after;methods[name + 'sAfter'] = after;methods[name + 'FromNow'] = after;methods[name + 'sFromNow'] = after;extend(number,methods);}extend(number,{ /***
     * @method duration([locale] = currentLocale)
     * @returns String
     * @short Takes the number as milliseconds and returns a unit-adjusted localized string.
     * @extra This method is the same as %Date#relative% without the localized equivalent of "from now" or "ago". [locale] can be passed as the first (and only) parameter. Note that this method is only available when the dates package is included.
     * @example
     *
     *   (500).duration() -> '500 milliseconds'
     *   (1200).duration() -> '1 second'
     *   (75).minutes().duration() -> '1 hour'
     *   (75).minutes().duration('es') -> '1 hora'
     *
     ***/'duration':function duration(localeCode){return getLocalization(localeCode).getDuration(this);}});English = CurrentLocalization = sugarDate.addLocale('en',{'plural':true,'timeMarker':'at','ampm':'am,pm','months':'January,February,March,April,May,June,July,August,September,October,November,December','weekdays':'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday','units':'millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s','numbers':'one,two,three,four,five,six,seven,eight,nine,ten','articles':'a,an,the','tokens':'the,st|nd|rd|th,of','short':'{Month} {d}, {yyyy}','long':'{Month} {d}, {yyyy} {h}:{mm}{tt}','full':'{Weekday} {Month} {d}, {yyyy} {h}:{mm}:{ss}{tt}','past':'{num} {unit} {sign}','future':'{num} {unit} {sign}','duration':'{num} {unit}','modifiers':[{'name':'sign','src':'ago|before','value':-1},{'name':'sign','src':'from now|after|from|in|later','value':1},{'name':'edge','src':'last day','value':-2},{'name':'edge','src':'end','value':-1},{'name':'edge','src':'first day|beginning','value':1},{'name':'shift','src':'last','value':-1},{'name':'shift','src':'the|this','value':0},{'name':'shift','src':'next','value':1}],'dateParse':['{month} {year}','{shift} {unit=5-7}','{0?} {date}{1}','{0?} {edge} of {shift?} {unit=4-7?} {month?} {year?}'],'timeParse':['{num} {unit} {sign}','{sign} {num} {unit}','{0} {num}{1} {day} of {month} {year?}','{weekday?} {month} {date}{1?} {year?}','{date} {month} {year}','{date} {month}','{shift} {weekday}','{shift} week {weekday}','{weekday} {2?} {shift} week','{num} {unit=4-5} {sign} {day}','{0?} {date}{1} of {month}','{0?}{month?} {date?}{1?} of {shift} {unit=6-7}','{edge} of {day}']});buildDateUnits();buildDateMethods();buildCoreInputFormats();buildFormatTokens();buildFormatShortcuts();buildAsianDigits();buildRelativeAliases();buildUTCAliases();setDateProperties();})();}).call(this,require('_process'),typeof global !== "undefined"?global:typeof self !== "undefined"?self:typeof window !== "undefined"?window:{});},{"_process":1}],3:[function(require,module,exports){ //these are common word shortenings used in the lexicon and sentence segmentation methods
//there are all nouns, or at the least, belong beside one.
'use strict';var honourifics=require('./honourifics'); //stored seperately, for 'noun.is_person()'
var main=[ //common abbreviations
'arc','al','ave','blvd','cl','ct','cres','exp','rd','st','dist','mt','fy','hwy','pd','pl','plz','tce','llb','md','bl','ma','ba','lit', //place main
'ala','ariz','ark','cal','calif','col','colo','conn','del','fed','fla','fl','ga','ida','ind','ia','la','kan','kans','ken','ky','la','md','mich','minn','mont','neb','nebr','nev','okla','penna','penn','pa','dak','tenn','tex','ut','vt','va','wash','wis','wisc','wy','wyo','usafa','alta','ont','que','sask','yuk', //org main
'dept','univ','assn','bros','inc','ltd','co','corp', //proper nouns with exclamation marks
'yahoo','joomla','jeopardy']; //person titles like 'jr', (stored seperately)
main = main.concat(honourifics);module.exports = main;},{"./honourifics":8}],4:[function(require,module,exports){ //adjectives that either aren't covered by rules, or have superlative/comparative forms
//this list is the seed, from which various forms are conjugated
module.exports = ['colonial','moody','literal','actual','probable','apparent','usual','aberrant','ablaze','able','absolute','aboard','abrupt','absent','absorbing','abundant','accurate','adult','afraid','agonizing','ahead','aloof','amazing','arbitrary','arrogant','asleep','astonishing','average','awake','aware','awkward','back','bad','bankrupt','bawdy','beneficial','bent','best','better','bizarre','bloody','bouncy','brilliant','broken','burly','busy','cagey','careful','caring','certain','chief','chilly','civil','clever','closed','cloudy','colossal','commercial','common','complete','complex','concerned','concrete','congruent','constant','cooing','correct','cowardly','craven','cuddly','daily','damaged','damaging','dapper','dashing','deadpan','deeply','defiant','degenerate','delicate','delightful','desperate','determined','didactic','difficult','discreet','done','double','doubtful','downtown','dreary','east','eastern','elderly','elegant','elfin','elite','eminent','encouraging','entire','erect','ethereal','exact','expert','extra','exuberant','exultant','false','fancy','faulty','female','fertile','fierce ','financial','first','fit','fixed','flagrant','foamy','foolish','foregoing','foreign','former','fortunate','frantic','freezing','frequent','fretful','friendly','fun','furry','future','gainful','gaudy','giant','giddy','gigantic','gleaming','global','gold','gone','good','goofy','graceful','grateful','gratis','gray','grey','groovy','gross','guarded','half','handy','hanging','hateful','heady','heavenly','hellish','helpful','hesitant','highfalutin','homely','honest','huge','humdrum','hurried','hurt','icy','ignorant','ill','illegal','immediate','immense','imminent','impartial','imperfect','imported','initial','innate','inner','inside','irate','jolly','juicy','junior','juvenile','kaput','kindly','knowing','labored','languid','latter','learned','left','legal','lethal','level','lewd','likely','literate','lively','living','lonely','longing','loutish','lovely','loving','lowly','luxuriant','lying','macabre','madly','magenta','main','major','makeshift','male','mammoth','measly','meaty','medium','mere','middle','miniature','minor','miscreant','mobile','moldy','mute','naive','nearby','necessary','neighborly','next','nimble','nonchalant','nondescript','nonstop','north','nosy','obeisant','obese','obscene','observant','obsolete','offbeat','official','ok','open','opposite','organic','outdoor','outer','outgoing','oval','over','overall','overt','overweight','overwrought','painful','past','peaceful','perfect','petite','picayune','placid','plant','pleasant','polite','potential','pregnant','premium','present','pricey','prickly','primary','prior','private','profuse','proper','public','pumped','puny','quack','quaint','quickest','rabid','racial','ready','real','rebel','recondite','redundant','relevant','remote','resolute','resonant','right','rightful','ritzy','robust','romantic','roomy','rough','royal','salty','same','scary','scientific','screeching','second','secret','secure','sedate','seemly','selfish','senior','separate','severe','shiny','shocking','shut','shy','sick','significant','silly','sincere','single','skinny','slight','slimy','smelly','snobbish','social','somber','sordid','sorry','southern','spare','special','specific','spicy','splendid','squeamish','standard','standing','steadfast','steady','stereotyped','still','striped','stupid','sturdy','subdued','subsequent','substantial','sudden','super','superb','superficial','supreme','sure','taboo','tan','tasteful','tawdry','telling','temporary','terrific','tested','thoughtful','tidy','tiny','top','torpid','tranquil','trite','ugly','ultra','unbecoming','understood','uneven','unfair','unlikely','unruly','unsightly','untidy','unwritten','upbeat','upper','uppity','upset','upstairs','uptight','used','useful','utter','uttermost','vagabond','vanilla','various','vengeful','verdant','violet','volatile','wanting','wary','wasteful','weary','weekly','welcome','western','whole','wholesale','wiry','wistful','womanly','wooden','woozy','wound','wrong','wry','zany','sacred','unknown','detailed','ongoing','prominent','permanent','diverse','partial','moderate','contemporary','intense','widespread','ultimate','ideal','adequate','sophisticated','naked','dominant','precise','intact','adverse','genuine','subtle','universal','resistant','routine','distant','unexpected','soviet','blind','artificial','mild','legitimate','unpublished','superior','intermediate','everyday','dumb','excess','sexy','fake','monthly','premature','sheer','generic','insane','contrary','twin','upcoming','bottom','costly','indirect','sole','unrelated','hispanic','improper','underground','legendary','reluctant','beloved','inappropriate','corrupt','irrelevant','justified','obscure','profound','hostile','influential','inadequate','abstract','timely','authentic','bold','intimate','straightforward','rival','right-wing','racist','symbolic','unprecedented','loyal','talented','troubled','noble','instant','incorrect','dense','blond','deliberate','blank','rear','feminine','apt','stark','alcoholic','teenage','vibrant','humble','vain','covert','bland','trendy','foul','populist','alarming','hooked','wicked','deaf','left-wing','lousy','malignant','stylish','upscale','hourly','refreshing','cozy','slick','dire','yearly','inbred','part-time','finite','backwards','nightly','unauthorized','cheesy','indoor','surreal','bald','masculine','shady','spirited','eerie','horrific','smug','stern','hefty','savvy','bogus','elaborate','gloomy','pristine','extravagant','serene','advanced','perverse','devout','crisp','rosy','slender','melancholy','faux','phony','danish','lofty','nuanced','lax','adept','barren','shameful','sleek','solemn','vacant','dishonest','brisk','fluent','insecure','humid','menacing','moot','soothing','self-loathing','far-reaching','harrowing','scathing','perplexing','calming','unconvincing','unsuspecting','unassuming','surprising','unappealing','vexing','unending','easygoing','appetizing','disgruntled','retarded','undecided','unregulated','unsupervised','unrecognized','crazed','distressed','jagged','paralleled','cramped','warped','antiquated','fabled','deranged','diseased','ragged','intoxicated','hallowed','crowded','ghastly','disorderly','saintly','wily','sly','sprightly','ghostly','oily','hilly','grisly','earthly','friendly','unwieldy','many','most','last','expected','far','due','divine','all','together','only','outside','multiple','appropriate','evil','favorite','limited','random','republican','okay','essential','secondary','gay','south','pro','northern','urban','acute','prime','arab','overnight','mixed','crucial','behind','above','beyond','against','under','other','less'];},{}],5:[function(require,module,exports){ //terms that are "CD", a 'value' term
module.exports = [ //months
'january','february', // "march",
'april', // "may",
'june','july','august','september','october','november','december','jan','feb','mar','apr','jun','jul','aug','sep','oct','nov','dec','sept','sep', //days
'monday','tuesday','wednesday','thursday','friday','saturday','sunday'];},{}],6:[function(require,module,exports){ //adjectival forms of place names, as adjectives.
module.exports = ['afghan','albanian','algerian','argentine','armenian','australian','aussie','austrian','bangladeshi','belgian','bolivian','bosnian','brazilian','bulgarian','cambodian','canadian','chilean','chinese','colombian','croat','cuban','czech','dominican','egyptian','british','estonian','ethiopian','finnish','french','gambian','georgian','german','greek','haitian','hungarian','indian','indonesian','iranian','iraqi','irish','israeli','italian','jamaican','japanese','jordanian','kenyan','korean','kuwaiti','latvian','lebanese','liberian','libyan','lithuanian','macedonian','malaysian','mexican','mongolian','moroccan','dutch','nicaraguan','nigerian','norwegian','omani','pakistani','palestinian','filipino','polish','portuguese','qatari','romanian','russian','rwandan','samoan','saudi','scottish','senegalese','serbian','singaporean','slovak','somali','sudanese','swedish','swiss','syrian','taiwanese','thai','tunisian','ugandan','ukrainian','american','hindi','spanish','venezuelan','vietnamese','welsh','african','european','asian','californian'];},{}],7:[function(require,module,exports){ // common first-names in compressed form.
//from http://www.ssa.gov/oact/babynames/limits.html  and http://www.servicealberta.gov.ab.ca/pdf/vs/2001_Boys.pdf
//not sure what regional/cultural/demographic bias this has. Probably a lot.
// 73% of people are represented in the top 1000 names
//used to reduce redundant named-entities in longer text. (don't spot the same person twice.)
//used to identify gender for coreference resolution
'use strict';var main=[]; //an ad-hoc prefix encoding for names. 2ms decompression of names
var male_names={'will':'iam,ie,ard,is,iams','fred':',erick,die,rick,dy','marc':'us,,o,os,el','darr':'ell,yl,en,el,in','fran':'k,cis,cisco,klin,kie','terr':'y,ance,ence,ell','rand':'y,all,olph,al','brad':'ley,,ford,y','jeff':'rey,,ery,ry','john':',ny,nie,athan','greg':'ory,,g,orio','mar':'k,tin,vin,io,shall,ty,lon,lin','car':'l,los,lton,roll,y,ey','ken':'neth,,t,ny,dall,drick','har':'old,ry,vey,ley,lan,rison','ste':'ven,phen,ve,wart,phan,rling','jer':'ry,emy,ome,emiah,maine,ald','mic':'hael,heal,ah,key,hel','dar':'yl,in,nell,win,ius','dan':'iel,ny,,e','wil':'bur,son,bert,fred,fredo','ric':'hard,ky,ardo,k,key','cli':'fford,nton,fton,nt,ff','cla':'rence,ude,yton,rk,y','ben':'jamin,,nie,ny,ito','rod':'ney,erick,olfo,ger,','rob':'ert,erto,bie,','gar':'y,ry,rett,land','sam':'uel,,my,mie','and':'rew,re,y,res','jos':'eph,e,hua,h','joe':',l,y,sph','leo':'nard,n,,nardo','tom':',my,as,mie','bry':'an,ant,ce,on','ant':'hony,onio,oine,on','jac':'k,ob,kson','cha':'rles,d,rlie,se','sha':'wn,ne,un','bre':'nt,tt,ndan,t','jes':'se,us,s','al':'bert,an,len,fred,exander,ex,vin,lan,fredo,berto,ejandro,fonso,ton,,onzo,i,varo','ro':'nald,ger,y,nnie,land,n,ss,osevelt,gelio,lando,man,cky,yce,scoe,ry','de':'nnis,rek,an,rrick,lbert,vin,wey,xter,wayne,metrius,nis,smond','ja':'mes,son,y,red,vier,ke,sper,mal,rrod','el':'mer,lis,bert,ias,ijah,don,i,ton,liot,liott,vin,wood','ma':'tthew,nuel,urice,thew,x,tt,lcolm,ck,son','do':'nald,uglas,n,nnie,ug,minic,yle,mingo,minick','er':'ic,nest,ik,nesto,ick,vin,nie,win','ra':'ymond,lph,y,mon,fael,ul,miro,phael','ed':'ward,win,die,gar,uardo,,mund,mond','co':'rey,ry,dy,lin,nrad,rnelius','le':'roy,wis,ster,land,vi','lo':'uis,nnie,renzo,ren,well,uie,u,gan','da':'vid,le,ve,mon,llas,mian,mien','jo':'nathan,n,rge,rdan,nathon,aquin','ru':'ssell,ben,dolph,dy,fus,ssel,sty','ke':'vin,ith,lvin,rmit','ar':'thur,nold,mando,turo,chie,mand','re':'ginald,x,ynaldo,uben,ggie','ge':'orge,rald,ne,rard,offrey,rardo','la':'rry,wrence,nce,urence,mar,mont','mo':'rris,ses,nte,ises,nty','ju':'an,stin,lio,lian,lius,nior','pe':'ter,dro,rry,te,rcy','tr':'avis,oy,evor,ent','he':'nry,rbert,rman,ctor,ath','no':'rman,el,ah,lan,rbert','em':'anuel,il,ilio,mett,manuel','wa':'lter,yne,rren,llace,de','mi':'ke,guel,lton,tchell,les','sa':'lvador,lvatore,ntiago,ul,ntos','ch':'ristopher,ris,ester,ristian,uck','pa':'ul,trick,blo,t','st':'anley,uart,an','hu':'gh,bert,go,mberto','br':'ian,uce,andon,ain','vi':'ctor,ncent,rgil,cente','ca':'lvin,meron,leb','gu':'y,illermo,stavo','lu':'is,ther,ke,cas','gr':'ant,ady,over,aham','ne':'il,lson,al,d','t':'homas,imothy,odd,ony,heodore,im,yler,ed,yrone,aylor,erence,immy,oby,eddy,yson','s':'cott,ean,idney,ergio,eth,pencer,herman,ylvester,imon,heldon,cotty,olomon','r':'yan','n':'icholas,athan,athaniel,ick,icolas','a':'dam,aron,drian,ustin,ngelo,braham,mos,bel,gustin,ugust,dolfo','b':'illy,obby,arry,ernard,ill,ob,yron,lake,ert,oyd,illie,laine,art,uddy,urton','e':'ugene,arl,verett,nrique,van,arnest,frain,than,steban','h':'oward,omer,orace,ans,al','p':'hillip,hilip,reston,hil,ierre','c':'raig,urtis,lyde,ecil,esar,edric,leveland,urt','j':'immy,im,immie','g':'lenn,ordon,len,ilbert,abriel,ilberto','m':'elvin,yron,erle,urray','k':'yle,arl,urt,irk,ristopher','o':'scar,tis,liver,rlando,mar,wen,rville,tto','l':'loyd,yle,ionel','f':'loyd,ernando,elix,elipe,orrest,abian,idel','w':'esley,endell,m,oodrow,inston','d':'ustin,uane,wayne,wight,rew,ylan','z':'achary','v':'ernon,an,ance','i':'an,van,saac,ra,rving,smael,gnacio,rvin','q':'uentin,uinton','x':'avier'};var female_names={'mari':'a,e,lyn,an,anne,na,ssa,bel,sa,sol,tza','kris':'ten,tin,tina,ti,tine,ty,ta,tie','jean':'ette,ne,nette,nie,ine,nine','chri':'stine,stina,sty,stie,sta,sti','marg':'aret,ie,arita,uerite,ret,o','ange':'la,lica,lina,lia,line','fran':'ces,cine,cisca','kath':'leen,erine,y,ryn,arine','sher':'ry,ri,yl,i,rie','caro':'l,lyn,line,le,lina','dian':'e,a,ne,na','jenn':'ifer,ie,y,a','luci':'lle,a,nda,le','kell':'y,i,ey,ie','rosa':',lie,lind','jani':'ce,e,s,ne','stac':'y,ey,ie,i','shel':'ly,ley,ia','laur':'a,en,ie,el','trac':'y,ey,i,ie','jane':'t,,lle,tte','bett':'y,ie,e,ye','rose':'mary,marie,tta','joan':',ne,n,na','mar':'y,tha,jorie,cia,lene,sha,yann,cella,ta,la,cy,tina','lor':'i,raine,etta,a,ena,ene,na,ie','sha':'ron,nnon,ri,wna,nna,na,una','dor':'othy,is,a,een,thy,othea','cla':'ra,udia,ire,rice,udette','eli':'zabeth,sa,sabeth,se,za','kar':'en,la,a,i,in','tam':'my,ara,i,mie,ika','ann':'a,,e,ie,ette','car':'men,rie,la,a,mela','mel':'issa,anie,inda','ali':'ce,cia,son,sha,sa','bri':'ttany,dget,ttney,dgette','lyn':'n,da,ne,ette','del':'ores,la,ia,oris','ter':'esa,ri,i','son':'ia,ya,ja,dra','deb':'orah,ra,bie,ora','jac':'queline,kie,quelyn,lyn','lat':'oya,asha,onya,isha','che':'ryl,lsea,ri,rie','vic':'toria,ki,kie,ky','sus':'an,ie,anne,ana','rob':'erta,yn','est':'her,elle,ella,er','lea':'h,,nne,nn','lil':'lian,lie,a,y','ma':'ureen,ttie,xine,bel,e,deline,ggie,mie,ble,ndy,ude,yra,nuela,vis,gdalena,tilda','jo':'yce,sephine,,di,dy,hanna,sefina,sie,celyn,lene,ni,die','be':'verly,rtha,atrice,rnice,th,ssie,cky,linda,ulah,rnadette,thany,tsy,atriz','ca':'therine,thy,ssandra,ndace,ndice,mille,itlin,ssie,thleen,llie','le':'slie,na,ona,ticia,igh,la,nora,ola,sley,ila','el':'aine,len,eanor,sie,la,ena,oise,vira,sa,va,ma','sa':'ndra,rah,ra,lly,mantha,brina,ndy,die,llie','mi':'chelle,ldred,chele,nnie,riam,sty,ndy,randa,llie','co':'nnie,lleen,nstance,urtney,ra,rinne,nsuelo,rnelia','ju':'lie,dith,dy,lia,anita,ana,stine','da':'wn,nielle,rlene,na,isy,rla,phne','re':'becca,nee,na,bekah,ba','al':'ma,lison,berta,exandra,yssa,ta','ra':'chel,mona,chael,quel,chelle','an':'drea,ita,a,gie,toinette,tonia','ge':'raldine,rtrude,orgia,nevieve,orgina','de':'nise,anna,siree,na,ana,e','ja':'smine,na,yne','lu':'cy,z,la,pe,ella,isa','je':'ssica,nifer,well,ri','ad':'a,rienne,die,ele,riana,eline','pa':'tricia,mela,ula,uline,tsy,m,tty,ulette,tti,trice,trica,ige','ke':'ndra,rri,isha,ri','mo':'nica,lly,nique,na,llie','lo':'uise,is,la','he':'len,ather,idi,nrietta,lene,lena','me':'gan,rcedes,redith,ghan,agan','wi':'lma,lla,nnie','ga':'il,yle,briela,brielle,le','er':'in,ica,ika,ma,nestine','ce':'cilia,lia,celia,leste,cile','ka':'tie,y,trina,yla,te','ol':'ga,ivia,lie,a','li':'nda,sa,ndsay,ndsey,zzie','na':'ncy,talie,omi,tasha,dine','la':'verne,na,donna,ra','vi':'rginia,vian,ola','ha':'rriet,nnah','pe':'ggy,arl,nny,tra','br':'enda,andi,ooke','ki':'mberly,m,mberley,rsten','au':'drey,tumn,dra','bo':'nnie,bbie,nita,bbi','do':'nna,lores,lly,minique','gl':'oria,adys,enda,enna','tr':'icia,ina,isha,udy','ta':'ra,nya,sha,bitha','ro':'sie,xanne,chelle,nda','am':'y,anda,ber,elia','fa':'ye,nnie,y','ni':'cole,na,chole,kki','ve':'ronica,ra,lma,rna','gr':'ace,etchen,aciela,acie','b':'arbara,lanca,arbra,ianca','r':'uth,ita,honda','s':'hirley,tephanie,ylvia,heila,uzanne,ue,tella,ophia,ilvia,ophie,tefanie,heena,ummer,elma,ocorro,ybil,imone','c':'ynthia,rystal,indy,harlene,ristina,leo','e':'velyn,mily,dna,dith,thel,mma,va,ileen,unice,ula,ssie,ffie,tta,ugenia','a':'shley,pril,gnes,rlene,imee,bigail,ida,bby,ileen','t':'heresa,ina,iffany,helma,onya,oni,herese,onia','i':'rene,da,rma,sabel,nez,ngrid,va,mogene,sabelle','w':'anda,endy,hitney','p':'hyllis,riscilla,olly','n':'orma,ellie,ora,ettie,ell','f':'lorence,elicia,lora,reda,ern,rieda','v':'alerie,anessa','j':'ill,illian','y':'vonne,olanda,vette','g':'ina,wendolyn,wen,oldie','l':'ydia','m':'yrtle,yra,uriel,yrna','h':'ilda','o':'pal,ra,felia','k':'rystal','d':'ixie,ina','u':'rsula'};var ambiguous=['casey','jamie','lee','jaime','jessie','morgan','rene','robin','devon','kerry','alexis','guadalupe','blair','kasey','jean','marion','aubrey','shelby','jan','shea','jade','kenyatta','kelsey','shay','lashawn','trinity','regan','jammie','cassidy','cheyenne','reagan','shiloh','marlo','andra','devan','rosario','lee']; //add data into the main obj
//males
var keys=Object.keys(male_names);var l=keys.length;for(var _i=0;_i < l;_i++) {var arr=male_names[keys[_i]].split(',');for(var i2=0;i2 < arr.length;i2++) {main[keys[_i] + arr[i2]] = 'm';}} //females
keys = Object.keys(female_names);l = keys.length;for(var _i2=0;_i2 < l;_i2++) {var arr=female_names[keys[_i2]].split(',');for(var i2=0;i2 < arr.length;i2++) {main[keys[_i2] + arr[i2]] = 'f';}} //unisex names
l = ambiguous.length;for(var _i3=0;_i3 < l;_i3 += 1) {main[ambiguous[_i3]] = 'a';} // console.log(firstnames['spencer'])
// console.log(firstnames['jill'])
// console.log(firstnames['sue'])
// console.log(firstnames['jan'])
// console.log(JSON.stringify(Object.keys(firstnames).length, null, 2));
module.exports = main;},{}],8:[function(require,module,exports){ //these are common person titles used in the lexicon and sentence segmentation methods
//they are also used to identify that a noun is a person
module.exports = [ //honourifics
'jr','mr','mrs','ms','dr','prof','sr','sen','corp','rep','gov','atty','supt','det','rev','col','gen','lt','cmdr','adm','capt','sgt','cpl','maj','miss','misses','mister','sir','esq','mstr','phd','adj','adv','asst','bldg','brig','comdr','hon','messrs','mlle','mme','op','ord','pvt','reps','res','sens','sfc','surg'];},{}],9:[function(require,module,exports){ //nouns with irregular plural/singular forms
//used in noun.inflect, and also in the lexicon.
//compressed with '_' to reduce some redundancy.
'use strict';var main=[['child','_ren'],['person','people'],['leaf','leaves'],['database','_s'],['quiz','_zes'],['child','_ren'],['stomach','_s'],['sex','_es'],['move','_s'],['shoe','_s'],['goose','geese'],['phenomenon','phenomena'],['barracks','_'],['deer','_'],['syllabus','syllabi'],['index','indices'],['appendix','appendices'],['criterion','criteria'],['man','men'],['sex','_es'],['rodeo','_s'],['epoch','_s'],['zero','_s'],['avocado','_s'],['halo','_s'],['tornado','_s'],['tuxedo','_s'],['sombrero','_s'],['addendum','addenda'],['alga','_e'],['alumna','_e'],['alumnus','alumni'],['bacillus','bacilli'],['cactus','cacti'],['beau','_x'],['château','_x'],['chateau','_x'],['tableau','_x'],['corpus','corpora'],['curriculum','curricula'],['echo','_es'],['embargo','_es'],['foot','feet'],['genus','genera'],['hippopotamus','hippopotami'],['larva','_e'],['libretto','libretti'],['loaf','loaves'],['matrix','matrices'],['memorandum','memoranda'],['mosquito','_es'],['opus','opera'],['ovum','ova'],['ox','_en'],['radius','radii'],['referendum','referenda'],['thief','thieves'],['tooth','teeth']];main = main.map(function(a){a[1] = a[1].replace('_',a[0]);return a;});module.exports = main;},{}],10:[function(require,module,exports){'use strict';var misc={'etc':'FW', //foreign words
'ie':'FW','there':'EX','better':'JJR','earlier':'JJR','has':'VB','more':'RBR','sounds':'VBZ'};var compact={ //conjunctions
'CC':['yet','therefore','or','while','nor','whether','though','because','but','for','and','if','however','before','although','how','plus','versus','not'],'VBD':['where\'d','when\'d','how\'d','what\'d','said','had','been','began','came','did','meant','went'],'VBN':['given','known','shown','seen','born'],'VBG':['going','being','according','resulting','developing','staining'], //copula
'CP':['is','will be','are','was','were','am','isn\'t','ain\'t','aren\'t'], //determiners
'DT':['this','any','enough','each','whatever','every','which','these','another','plenty','whichever','neither','an','a','least','own','few','both','those','the','that','various','what','either','much','some','else','no', //some other languages (what could go wrong?)
'la','le','les','des','de','du','el'], //prepositions
'IN':['until','onto','of','into','out','except','across','by','between','at','down','as','from','around','with','among','upon','amid','to','along','since','about','off','on','within','in','during','per','without','throughout','through','than','via','up','unlike','despite','below','unless','towards','besides','after','whereas','\'o','amidst','amongst','apropos','atop','barring','chez','circa','mid','midst','notwithstanding','qua','sans','vis-a-vis','thru','till','versus','without','w/o','o\'','a\''], //modal verbs
'MD':['can','may','could','might','will','ought to','would','must','shall','should','ought','shouldn\'t','wouldn\'t','couldn\'t','mustn\'t','shan\'t','shant','lets', //arguable
'who\'d','let\'s'], //posessive pronouns
'PP':['mine','something','none','anything','anyone','theirs','himself','ours','his','my','their','yours','your','our','its','nothing','herself','hers','themselves','everything','myself','itself','her', //this one is pretty ambiguous
'who','whom','whose'], //personal pronouns (nouns)
'PRP':['it','they','i','them','you','she','me','he','him','ourselves','us','we','thou','il','elle','yourself','\'em'], //some manual adverbs (the rest are generated)
'RB':['now','again','already','soon','directly','toward','forever','apart','instead','yes','alone','ago','indeed','ever','quite','perhaps','where','then','here','thus','very','often','once','never','why','when','away','always','sometimes','also','maybe','so','just','well','several','such','randomly','too','rather','abroad','almost','anyway','twice','aside','moreover','anymore','newly','damn','somewhat','somehow','meanwhile','hence','further','furthermore'], //interjections
'UH':['uhh','uh-oh','ugh','sheesh','eww','pff','voila','oy','eep','hurrah','yuck','ow','duh','oh','hmm','yeah','whoa','ooh','whee','ah','bah','gah','yaa','phew','gee','ahem','eek','meh','yahoo','oops','d\'oh','psst','argh','grr','nah','shhh','whew','mmm','yay','uh-huh','boo','wow','nope'], //nouns that shouldnt be seen as a verb
'NN':['president','dollar','student','patent','funding','morning','banking','ceiling','energy','secretary','purpose','friends','event']}; //unpack the compact terms into the misc lexicon..
var keys=Object.keys(compact);for(var _i4=0;_i4 < keys.length;_i4++) {var arr=compact[keys[_i4]];for(var i2=0;i2 < arr.length;i2++) {misc[arr[i2]] = keys[_i4];}}module.exports = misc;},{}],11:[function(require,module,exports){ //common terms that are multi-word, but one part-of-speech
//these should not include phrasal verbs, like 'looked out'. These are handled elsewhere.
module.exports = {'of course':'RB','at least':'RB','no longer':'RB','sort of':'RB','at first':'RB','once again':'RB','once more':'RB','up to':'RB','by now':'RB','all but':'RB','just about':'RB','on board':'JJ','a lot':'RB','by far':'RB','at best':'RB','at large':'RB','for good':'RB','vice versa':'JJ','en route':'JJ','for sure':'RB','upside down':'JJ','at most':'RB','per se':'RB','at worst':'RB','upwards of':'RB','en masse':'RB','point blank':'RB','up front':'JJ','in situ':'JJ','in vitro':'JJ','ad hoc':'JJ','de facto':'JJ','ad infinitum':'JJ','ad nauseam':'RB','for keeps':'JJ','a priori':'FW','et cetera':'FW','off guard':'JJ','spot on':'JJ','ipso facto':'JJ','not withstanding':'RB','de jure':'RB','a la':'IN','ad hominem':'NN','par excellence':'RB','de trop':'RB','a posteriori':'RB','fed up':'JJ','brand new':'JJ','old fashioned':'JJ','bona fide':'JJ','well off':'JJ','far off':'JJ','straight forward':'JJ','hard up':'JJ','sui generis':'JJ','en suite':'JJ','avant garde':'JJ','sans serif':'JJ','gung ho':'JJ','super duper':'JJ','new york':'NN','new england':'NN','new hampshire':'NN','new delhi':'NN','new jersey':'NN','new mexico':'NN','united states':'NN','united kingdom':'NN','great britain':'NN','head start':'NN'};},{}],12:[function(require,module,exports){module.exports = [ //numbers
'minus','zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety','hundred','thousand','million','billion','trillion','quadrillion','quintillion','sextillion','septillion','octillion','nonillion','decillion'];},{}],13:[function(require,module,exports){ //phrasal verbs are two words that really mean one verb.
//'beef up' is one verb, and not some direction of beefing.
//by @spencermountain, 2015 mit
//many credits to http://www.allmyphrasalverbs.com/
'use strict';var verb_conjugate=require('../term/verb/conjugate/conjugate.js'); //start the list with some randoms
var main=['be onto','fall behind','fall through','fool with','get across','get along','get at','give way','hear from','hear of','lash into','make do','run across','set upon','take aback','keep from']; //if there's a phrasal verb "keep on", there's often a "keep off"
var opposites={'away':'back','in':'out','on':'off','over':'under','together':'apart','up':'down'}; //forms that have in/out symmetry
var symmetric={'away':'blow,bounce,bring,call,come,cut,drop,fire,get,give,go,keep,pass,put,run,send,shoot,switch,take,tie,throw','in':'bang,barge,bash,beat,block,book,box,break,bring,burn,butt,carve,cash,check,come,cross,drop,fall,fence,fill,give,grow,hand,hang,head,jack,keep,leave,let,lock,log,move,opt,pack,peel,pull,put,rain,reach,ring,rub,send,set,settle,shut,sign,smash,snow,strike,take,try,turn,type,warm,wave,wean,wear,wheel','on':'add,call,carry,catch,count,feed,get,give,go,grind,head,hold,keep,lay,log,pass,pop,power,put,send,show,snap,switch,take,tell,try,turn,wait','over':'come,go,look,read,run,talk','together':'come,pull,put','up':'add,back,beat,bend,blow,boil,bottle,break,bring,buckle,bundle,call,carve,clean,cut,dress,fill,flag,fold,get,give,grind,grow,hang,hold,keep,let,load,lock,look,man,mark,melt,move,pack,pin,pipe,plump,pop,power,pull,put,rub,scale,scrape,send,set,settle,shake,show,sit,slow,smash,square,stand,strike,take,tear,tie,turn,use,wash,wind'};Object.keys(symmetric).forEach(function(k){symmetric[k].split(',').forEach(function(s){ //add the given form
main.push(s + ' ' + k); //add its opposite form
main.push(s + ' ' + opposites[k]);});}); //forms that don't have in/out symmetry
var asymmetric={'about':'bring,fool,gad,go,root','after':'go,look,take','ahead':'get,go,press','along':'bring,move','apart':'fall,take','around':'ask,boss,bring,call,come,fool,get,horse,joke,lie,mess,play','away':'back,carry,file,frighten,hide,wash','back':'fall,fight,hit,hold,look,pay,stand,think','by':'drop,get,go,stop,swear,swing,tick,zip','down':'bog,calm,fall,hand,hunker,jot,knock,lie,narrow,note,pat,pour,run,tone,trickle,wear','for':'fend,file,gun,hanker,root,shoot','forth':'bring,come','forward':'come,look','in':'cave,chip,hone,jump,key,pencil,plug,rein,shade,sleep,stop,suck,tie,trade,tuck,usher,weigh,zero','into':'look,run','it':'go,have','off':'auction,be,beat,blast,block,brush,burn,buzz,cast,cool,drop,end,face,fall,fend,frighten,goof,jack,kick,knock,laugh,level,live,make,mouth,nod,pair,pay,peel,read,reel,ring,rip,round,sail,shave,shoot,sleep,slice,split,square,stave,stop,storm,strike,tear,tee,tick,tip,top,walk,work,write','on':'bank,bargain,egg,frown,hit,latch,pile,prattle,press,spring,spur,tack,urge,yammer','out':'act,ask,back,bail,bear,black,blank,bleed,blow,blurt,branch,buy,cancel,cut,eat,edge,farm,figure,find,fill,find,fish,fizzle,flake,flame,flare,flesh,flip,geek,get,help,hide,hold,iron,knock,lash,level,listen,lose,luck,make,max,miss,nerd,pan,pass,pick,pig,point,print,psych,rat,read,rent,root,rule,run,scout,see,sell,shout,single,sit,smoke,sort,spell,splash,stamp,start,storm,straighten,suss,time,tire,top,trip,trot,wash,watch,weird,whip,wimp,wipe,work,zone,zonk','over':'bend,bubble,do,fall,get,gloss,hold,keel,mull,pore,sleep,spill,think,tide,tip','round':'get,go','through':'go,run','to':'keep,see','up':'act,beef,board,bone,boot,brighten,build,buy,catch,cheer,cook,end,eye,face,fatten,feel,fess,finish,fire,firm,flame,flare,free,freeze,freshen,fry,fuel,gang,gear,goof,hack,ham,heat,hit,hole,hush,jazz,juice,lap,light,lighten,line,link,listen,live,loosen,make,mash,measure,mess,mix,mock,mop,muddle,open,own,pair,patch,pick,prop,psych,read,rough,rustle,save,shack,sign,size,slice,slip,snap,sober,spark,split,spruce,stack,start,stay,stir,stitch,straighten,string,suck,suit,sum,team,tee,think,tidy,tighten,toss,trade,trip,type,vacuum,wait,wake,warm,weigh,whip,wire,wise,word,write,zip'};Object.keys(asymmetric).forEach(function(k){asymmetric[k].split(',').forEach(function(s){main.push(s + ' ' + k);});}); //at his point all verbs are infinitive. lets make this explicit.
main = main.reduce(function(h,s){h[s] = 'VBP';return h;},{}); //conjugate every phrasal verb. takes ~30ms
var tags={present:'VB',past:'VBD',future:'VBF',gerund:'VBG',infinitive:'VBP'};var cache={}; //cache individual verbs to speed it up
var split=undefined,verb=undefined,particle=undefined,phrasal=undefined;Object.keys(main).forEach(function(s){split = s.split(' ');verb = split[0];particle = split[1];if(cache[verb] === undefined){cache[verb] = verb_conjugate(verb);}Object.keys(cache[verb]).forEach(function(k){phrasal = cache[verb][k] + ' ' + particle;if(tags[k]){main[phrasal] = tags[k];}});}); // console.log(main["wiring up"] === "VBG")
module.exports = main;},{"../term/verb/conjugate/conjugate.js":52}],14:[function(require,module,exports){ //common nouns that have no plural form. These are suprisingly rare
//used in noun.inflect(), and added as nouns in lexicon
module.exports = ['aircraft','bass','bison','fowl','halibut','moose','salmon','spacecraft','tuna','trout','advice','information','knowledge','trouble','enjoyment','fun','recreation','relaxation','meat','rice','bread','cake','coffee','ice','water','oil','grass','hair','fruit','wildlife','equipment','machinery','furniture','mail','luggage','jewelry','clothing','money','mathematics','economics','physics','civics','ethics','gymnastics','mumps','measles','news','tennis','baggage','currency','soap','toothpaste','food','sugar','butter','flour','research','leather','wool','wood','coal','weather','homework','cotton','silk','patience','impatience','vinegar','art','beef','blood','cash','chaos','cheese','chewing','conduct','confusion','education','electricity','entertainment','fiction','forgiveness','gold','gossip','ground','happiness','history','honey','hospitality','importance','justice','laughter','leisure','lightning','literature','luck','melancholy','milk','mist','music','noise','oxygen','paper','pay','peace','peanut','pepper','petrol','plastic','pork','power','pressure','rain','recognition','sadness','safety','salt','sand','scenery','shopping','silver','snow','softness','space','speed','steam','sunshine','tea','thunder','time','traffic','trousers','violence','warmth','wine','steel','soccer','hockey','golf','fish','gum','liquid','series','sheep','species','fahrenheit','celcius','kelvin','hertz'];},{}],15:[function(require,module,exports){ //most-frequent non-irregular verbs, to be conjugated for the lexicon
//this list is the seed, from which various forms are conjugated
module.exports = ['collapse','stake','forsee','suck','answer','argue','tend','examine','depend','form','figure','mind','surround','suspect','reflect','wonder','hope','end','thank','file','regard','report','imagine','consider','ensure','cause','work','enter','stop','defeat','surge','launch','turn','like','control','relate','remember','join','listen','train','spring','enjoy','fail','recognize','obtain','learn','fill','announce','prevent','achieve','realize','involve','remove','aid','visit','test','prepare','ask','carry','suppose','determine','raise','love','use','pull','improve','contain','offer','talk','pick','care','express','remain','operate','close','add','mention','support','decide','walk','vary','demand','describe','agree','happen','allow','suffer','study','press','watch','seem','occur','contribute','claim','compare','apply','direct','discuss','indicate','require','change','fix','reach','prove','expect','exist','play','permit','kill','charge','increase','believe','create','continue','live','help','represent','edit','serve','appear','cover','maintain','start','stay','move','extend','design','supply','suggest','want','approach','call','include','try','receive','save','discover','marry','need','establish','keep','assume','attend','unite','explain','publish','accept','settle','reduce','do','look','interact','concern','labor','return','select','die','provide','seek','wish','finish','follow','disagree','produce','attack','attempt','brake','brush','burn','bang','bomb','budget','comfort','cook','copy','cough','crush','cry','check','claw','clip','combine','damage','desire','doubt','drain','dance','decrease','defect','deposit','drift','dip','dive','divorce','dream','exchange','envy','exert','exercise','export','fold','flood','focus','forecast','fracture','grip','guide','guard','guarantee','guess','hate','heat','handle','hire','host','hunt','hurry','import','judge','jump','jam','kick','kiss','knock','laugh','lift','lock','lecture','link','load','loan','lump','melt','message','murder','neglect','overlap','overtake','overuse','print','protest','pump','push','post','progress','promise','purchase','regret','request','reward','roll','rub','rent','repair','sail','scale','screw','shock','sleep','slip','smash','smell','smoke','sneeze','snow','surprise','scratch','search','share','shave','spit','splash','stain','stress','switch','taste','touch','trade','trick','twist','trap','travel','tune','undergo','undo','uplift','vote','wash','wave','whistle','wreck','yawn','betray','restrict','perform','worry','point','activate','fear','plan','note','face','predict','differ','deserve','torture','recall','count','admit','insist','lack','pass','belong','complain','constitute','rely','refuse','range','cite','flash','arrive','reveal','consist','observe','notice','trust','display','view','stare','acknowledge','owe','gaze','treat','account','gather','address','confirm','estimate','manage','participate','sneak','drop','mirror','experience','strive','arch','dislike','favor','earn','emphasize','match','question','emerge','encourage','matter','name','head','line','slam','list','warn','ignore','resemble','feature','place','reverse','accuse','spoil','retain','survive','praise','function','please','date','remind','deliver','echo','engage','deny','yield','center','gain','anticipate','reason','side','thrive','defy','dodge','enable','applaud','bear','persist','pose','reject','attract','await','inhibit','declare','process','risk','urge','value','block','confront','credit','cross','amuse','dare','resent','smile','gloss','threaten','collect','depict','dismiss','submit','benefit','step','deem','limit','sense','issue','embody','force','govern','replace','bother','cater','adopt','empower','outweigh','alter','enrich','influence','prohibit','pursue','warrant','convey','approve','reserve','rest','strain','wander','adjust','dress','market','mingle','disapprove','evaluate','flow','inhabit','pop','rule','depart','roam','assert','disappear','envision','pause','afford','challenge','grab','grumble','house','portray','revel','base','conduct','review','stem','crave','mark','store','target','unlock','weigh','resist','drag','pour','reckon','assign','cling','rank','attach','decline','destroy','interfere','paint','skip','sprinkle','wither','allege','retire','score','monitor','expand','honor','pack','assist','float','appeal','stretch','undermine','assemble','boast','bounce','grasp','install','borrow','crack','elect','shout','contrast','overcome','relax','relent','strengthen','conform','dump','pile','scare','relive','resort','rush','boost','cease','command','excel','plug','plunge','proclaim','discourage','endure','ruin','stumble','abandon','cheat','convince','merge','convert','harm','multiply','overwhelm','chew','invent','bury','wipe','added','took','define','goes','measure','enhance','distinguish','avoid', //contractions
'don\'t','won\'t','what\'s' //somewhat ambiguous (what does|what are)
];},{}],16:[function(require,module,exports){'use strict';exports.pluck = function(arr,str){arr = arr || [];return arr.map(function(o){return o[str];});};exports.flatten = function(arr){var all=[];arr.forEach(function(a){all = all.concat(a);});return all;};exports.sameArr = function(arr,arrB){if(typeof arr !== typeof arrB || arr.length !== arrB.length){return null;}for(var _i5=0;_i5 < arr.length;_i5++) {if(arr[_i5] !== arrB[_i5]){return false;}}return true;};exports.compact = function(arr){return arr.filter(function(a){if(a === undefined || a === null){return false;}return true;});}; //string utilities
exports.endsWith = function(str,suffix){return str.indexOf(suffix,str.length - suffix.length) !== -1;};exports.titlecase = function(str){if(!str){return '';}return str.charAt(0).toUpperCase() + str.slice(1);};},{}],17:[function(require,module,exports){'use strict';var Text=require('./text/text.js');var Term=require('./term/term.js');var Verb=require('./term/verb/verb.js');var Noun=require('./term/noun/noun.js');var Value=require('./term/noun/value/value.js');var DateClass=require('./term/noun/date/date.js');var Adjective=require('./term/adjective/adjective.js');var Adverb=require('./term/adverb/adverb.js');var Person=require('./term/noun/person/person.js'); //function returns a text object if there's a param, otherwise
var API=function API(str){this.Term = function(s){return new Term(s);};this.Verb = function(s){return new Verb(s);};this.Adverb = function(s){return new Adverb(s);};this.Noun = function(s){return new Noun(s);};this.Person = function(s){return new Person(s);};this.Date = function(s){return new DateClass(s);};this.Value = function(s){return new Value(s);};this.Adjective = function(s){return new Adjective(s);};this.Text = function(s){return new Text(s);};if(str){return new Text(str);}};var nlp=new API();if(typeof window === 'object'){window.nlp = nlp;}module.exports = nlp; // let n = nlp.Value('five hundred feet');
// console.log(p instanceof Noun);
// console.log(n);
},{"./term/adjective/adjective.js":26,"./term/adverb/adverb.js":32,"./term/noun/date/date.js":37,"./term/noun/noun.js":42,"./term/noun/person/person.js":43,"./term/noun/value/value.js":49,"./term/term.js":51,"./term/verb/verb.js":59,"./text/text.js":62}],18:[function(require,module,exports){ //the lexicon is a big hash of words to pos tags
//it's built by conjugating and inflecting a small seed of terms
'use strict';var fns=require('./fns.js');var verb_conjugate=require('./term/verb/conjugate/conjugate.js');var lexicon={};var addObj=function addObj(obj){var keys=Object.keys(obj);var l=keys.length;for(var _i6=0;_i6 < l;_i6++) {lexicon[keys[_i6]] = obj[keys[_i6]];}};var addArr=function addArr(arr,tag){var l=arr.length;for(var _i7=0;_i7 < l;_i7++) {lexicon[arr[_i7]] = tag;}}; //conjugate all verbs.
var verbs=require('./data/verbs.js');for(var _i8=0;_i8 < verbs.length;_i8++) {var c=verb_conjugate(verbs[_i8]);lexicon[c.infinitive] = 'VBP';lexicon[c.past] = 'VBD';lexicon[c.gerund] = 'VBG';lexicon[c.present] = 'VBZ';if(c.doer){lexicon[c.doer] = 'NNA';}if(c.participle){lexicon[c.participle] = 'VBN';}}addArr(require('./data/abbreviations.js'),'NNAB');addArr(require('./data/adjectives.js'),'JJ');addArr(require('./data/demonyms.js'),'JJ');addArr(require('./data/honourifics.js'),'NNAB');addArr(require('./data/uncountables.js'),'NN');addArr(require('./data/dates.js'),'CD');addArr(require('./data/numbers.js'),'CD'); //a little fancy
addArr(Object.keys(require('./data/firstnames.js')),'NN'); //add irregular nouns
var irregNouns=require('./data/irregular_nouns.js');addArr(fns.pluck(irregNouns,0),'NN');addArr(fns.pluck(irregNouns,1),'NNS');addObj(require('./data/misc.js'));addObj(require('./data/multiples.js'));addObj(require('./data/phrasal_verbs.js')); // console.log(Object.keys(lexicon).length)
// console.log(lexicon)
// console.log(lexicon['once again'] === "RB")
// console.log(lexicon['seven'] === "CD")
// console.log(lexicon['sleep'] === "VBP")
// console.log(lexicon['slept'] === "VBD")
// console.log(lexicon['sleeping'] === "VBG")
// console.log(lexicon['canadian'] === "JJ")
// console.log(lexicon['july'] === "CD")
// console.log(lexicon[null] === undefined)
// console.log(lexicon["dr"] === "NNAB")
// console.log(lexicon["sounds"] === "VBZ")
// console.log(lexicon["look after"] === "VBP")
// console.log(lexicon['tony'] === "NN")
// console.log(lexicon['loaf'] === "NN")
// console.log(lexicon['loaves'] === "NNS")
// console.log(lexicon['he'] === "PRP")
// console.log(lexicon['the']);
module.exports = lexicon;},{"./data/abbreviations.js":3,"./data/adjectives.js":4,"./data/dates.js":5,"./data/demonyms.js":6,"./data/firstnames.js":7,"./data/honourifics.js":8,"./data/irregular_nouns.js":9,"./data/misc.js":10,"./data/multiples.js":11,"./data/numbers.js":12,"./data/phrasal_verbs.js":13,"./data/uncountables.js":14,"./data/verbs.js":15,"./fns.js":16,"./term/verb/conjugate/conjugate.js":52}],19:[function(require,module,exports){'use strict';var Term=require('../../term/term.js');var Verb=require('../../term/verb/verb.js');var Noun=require('../../term/noun/noun.js');var Value=require('../../term/noun/value/value.js');var Adverb=require('../../term/adverb/adverb.js');var Adjective=require('../../term/adjective/adjective.js');var mapping={'NN':Noun,'NNA':Noun,'NNP':Noun,'NNO':Noun,'NNPA':Noun,'NNAB':Noun,'NNPS':Noun,'NNS':Noun,'NNG':Noun,'PP':Noun,'PRP':Noun,'VB':Verb,'VBD':Verb,'VBP':Verb,'VBG':Verb,'VBF':Verb,'VBN':Verb,'VBZ':Verb,'CP':Verb,'JJ':Adjective,'JJR':Adjective,'JJS':Adjective,'RB':Adverb,'RBR':Adverb,'RBS':Adverb,'CD':Value,'NU':Value,'DA':Value,'MD':Verb,'DT':Term,'IN':Term,'CC':Term,'Term':Term,'Noun':Noun,'Adjective':Adjective,'Verb':Verb,'Adverb':Adverb,'Value':Value}; //swap the Term object with a proper Pos class
var assign=function assign(t,pos,reason){if(mapping[pos] !== undefined){t = new mapping[pos](t.text,pos);t.reason = reason;}return t;};module.exports = assign;},{"../../term/adjective/adjective.js":26,"../../term/adverb/adverb.js":32,"../../term/noun/noun.js":42,"../../term/noun/value/value.js":49,"../../term/term.js":51,"../../term/verb/verb.js":59}],20:[function(require,module,exports){ //add a 'quiet' token for contractions so we can represent their grammar
'use strict';var Term=require('../../term/term.js');var contractions={'i\'d':['i','would'],'she\'d':['she','would'],'he\'d':['he','would'],'they\'d':['they','would'],'we\'d':['we','would'],'i\'ll':['i','will'],'she\'ll':['she','will'],'he\'ll':['he','will'],'they\'ll':['they','will'],'we\'ll':['we','will'],'i\'ve':['i','have'],'they\'ve':['they','have'],'we\'ve':['we','have'],'should\'ve':['should','have'],'would\'ve':['would','have'],'could\'ve':['could','have'],'must\'ve':['must','have'],'i\'m':['i','am'],'we\'re':['we','are'],'they\'re':['they','are'],'cannot':['can','not']};var handle_contractions=function handle_contractions(_x4){var _again2=true;_function2: while(_again2) {var terms=_x4;_i9 = t = split = fixup = undefined;_again2 = false;for(var _i9=0;_i9 < terms.length;_i9++) {var t=terms[_i9];if(contractions[t.normal] !== undefined){var split=contractions[t.normal];var fixup=[].concat(terms.slice(0,_i9),[new Term(split[0])],[new Term(split[1])],terms.slice(_i9 + 1,terms.length));_x4 = fixup;_again2 = true;continue _function2; //recursive
}}return terms;}};module.exports = handle_contractions;},{"../../term/term.js":51}],21:[function(require,module,exports){module.exports = [{'before':['Determiner','?'],'after':['Determiner','Noun']},{'before':['Determiner','Adjective','Verb'],'after':['Noun','Noun','Noun']},{'before':['Determiner','Adverb','Adjective','?'],'after':['Determiner','Adverb','Adjective','Noun']},{'before':['Unknown','Determiner','Noun'],'after':['Verb','Determiner','Noun']}, //posessive hints
{'before':['Posessive','Unknown'],'after':['Posessive','Noun']},{'before':['Posessive','Verb'],'after':['Posessive','Noun']},{'before':['Unknown','Posessive','Noun'],'after':['Verb','Posessive','Noun']}, //copula hints
{'before':['Copula','Unknown'],'after':['Copula','Adjective']}, // not sure
{'before':['Copula','Adverb','?'],'after':['Copula','Adverb','Adjective']}, // not sure
//preposition hints
{'before':['Unknown','Preposition'],'after':['Verb','Preposition']}, //conjunction hints, like lists (a little sloppy)
{'before':['Adverb','Conjunction','Adverb'],'after':['Adverb','Adverb','Adverb']},{'before':['Verb','Conjunction','Verb'],'after':['Verb','Verb','Verb']},{'before':['Noun','Conjunction','Noun'],'after':['Noun','Noun','Noun']},{'before':['Adjective','Conjunction','Adjective'],'after':['Adjective','Adjective','Adjective']},{'before':['Unknown','Conjunction','Verb'],'after':['Verb','Conjunction','Verb']},{'before':['Verb','Conjunction','Unknown'],'after':['Verb','Conjunction','Verb']}, //adverb hints
{'before':['Noun','Adverb','Noun'],'after':['Noun','Adverb','Verb']}, //pronoun hints
{'before':['Unknown','Pronoun'],'after':['Verb','Pronoun']}, //modal hints
{'before':['Modal','Unknown'],'after':['Modal','Verb']},{'before':['Modal','Adverb','?'],'after':['Modal','Adverb','Verb']}, //ambiguous dates (march/may)
{'before':['Modal','Value'],'after':['Modal','Verb']},{'before':['Adverb','Value'],'after':['Adverb','Verb']}];},{}],22:[function(require,module,exports){'use strict';var assign=require('./assign');var lexicon=require('../../lexicon.js'); //consult lexicon for this known-word
var lexicon_pass=function lexicon_pass(terms){return terms.map(function(t){ //check lexicon straight-up
if(lexicon[t.normal] !== undefined){return assign(t,lexicon[t.normal],'lexicon_pass');} //try to match it without a prefix - eg. outworked -> worked
if(t.normal.match(/^(over|under|out|-|un|re|en).{4}/)){var attempt=t.normal.replace(/^(over|under|out|.*?-|un|re|en)/,'');return assign(t,lexicon[attempt],'lexicon_prefix');}return t;});};module.exports = lexicon_pass;},{"../../lexicon.js":18,"./assign":19}],23:[function(require,module,exports){ //part-of-speech tagging
'use strict';var lexicon_pass=require('./lexicon_pass');var contractions=require('./contractions');var assign=require('./assign');var word_rules=require('./word_rules');var grammar_rules=require('./grammar_rules');var fns=require('../../fns'); //set POS for capitalised words
var capital_signals=function capital_signals(terms){ //first words need careful rules
if(terms[0].is_acronym()){terms[0] = assign(terms[0],'NN','acronym');} //non-first-word capitals are nouns
for(var _i10=1;_i10 < terms.length;_i10++) {if(terms[_i10].is_capital() || terms[_i10].is_acronym()){terms[_i10] = assign(terms[_i10],'NN','capital_signal');}}return terms;}; //regex hints for words/suffixes
var word_rules_pass=function word_rules_pass(terms){for(var _i11=0;_i11 < terms.length;_i11++) {for(var o=0;o < word_rules.length;o++) {if(terms[_i11].normal.length > 4 && terms[_i11].normal.match(word_rules[o].reg)){terms[_i11] = assign(terms[_i11],word_rules[o].pos,'rules_pass');break;}}}return terms;}; //turn [noun, noun..] into [noun..]
var chunk_neighbours=function chunk_neighbours(terms){var new_terms=[];var last=null;for(var _i12=0;_i12 < terms.length;_i12++) {var t=terms[_i12];if(last !== null && t.parent === last){new_terms[new_terms.length - 1].text += ' ' + t.text;new_terms[new_terms.length - 1].normalize();}else {new_terms.push(t);}last = t.parent;}return new_terms;}; //hints from the sentence grammar
var grammar_rules_pass=function grammar_rules_pass(s){var tags=s.tags();for(var _i13=0;_i13 < s.terms.length;_i13++) {var t=s.terms[_i13];for(var o=0;o < grammar_rules.length;o++) {var rule=grammar_rules[o]; //does this rule match
if(fns.sameArr(rule.before,tags.slice(_i13,_i13 + rule.before.length))){ //change before/after for each term
for(var c=0;c < rule.before.length;c++) {s.terms[_i13 + c] = assign(s.terms[_i13 + c],rule.after[c],'grammar_rule ' + c);}}}}return s.terms;};var noun_fallback=function noun_fallback(terms){for(var _i14=0;_i14 < terms.length;_i14++) {if(terms[_i14].parent === '?'){terms[_i14] = assign(terms[_i14],'NN','fallback');}}return terms;};var tagger=function tagger(s){s.terms = capital_signals(s.terms);s.terms = contractions(s.terms);s.terms = lexicon_pass(s.terms);s.terms = word_rules_pass(s.terms); //repeat these two
s.terms = grammar_rules_pass(s);s.terms = chunk_neighbours(s.terms);s.terms = noun_fallback(s.terms);return s.terms;};module.exports = tagger;},{"../../fns":16,"./assign":19,"./contractions":20,"./grammar_rules":21,"./lexicon_pass":22,"./word_rules":24}],24:[function(require,module,exports){ //regex patterns and parts of speech],
module.exports = [['.[cts]hy$','JJ'],['.[st]ty$','JJ'],['.[lnr]ize$','VB'],['.[gk]y$','JJ'],['.fies$','VB'],['.some$','JJ'],['.[nrtumcd]al$','JJ'],['.que$','JJ'],['.[tnl]ary$','JJ'],['.[di]est$','JJS'],['^(un|de|re)\\-[a-z]..','VB'],['.lar$','JJ'],['[bszmp]{2}y','JJ'],['.zes$','VB'],['.[icldtgrv]ent$','JJ'],['.[rln]ates$','VBZ'],['.[oe]ry$','JJ'],['[rdntkdhs]ly$','RB'],['.[lsrnpb]ian$','JJ'],['.[^aeiou]ial$','JJ'],['.[^aeiou]eal$','JJ'],['.[vrl]id$','JJ'],['.[ilk]er$','JJR'],['.ike$','JJ'],['.ends$','VB'],['.wards$','RB'],['.rmy$','JJ'],['.rol$','NN'],['.tors$','NN'],['.azy$','JJ'],['.where$','RB'],['.ify$','VB'],['.bound$','JJ'],['.ens$','VB'],['.oid$','JJ'],['.vice$','NN'],['.rough$','JJ'],['.mum$','JJ'],['.teen(th)?$','CD'],['.oses$','VB'],['.ishes$','VB'],['.ects$','VB'],['.tieth$','CD'],['.ices$','NN'],['.bles$','VB'],['.pose$','VB'],['.ions$','NN'],['.ean$','JJ'],['.[ia]sed$','JJ'],['.tized$','VB'],['.llen$','JJ'],['.fore$','RB'],['.ances$','NN'],['.gate$','VB'],['.nes$','VB'],['.less$','RB'],['.ried$','JJ'],['.gone$','JJ'],['.made$','JJ'],['.[pdltrkvyns]ing$','JJ'],['.tions$','NN'],['.tures$','NN'],['.ous$','JJ'],['.ports$','NN'],['. so$','RB'],['.ints$','NN'],['.[gt]led$','JJ'],['[aeiou].*ist$','JJ'],['.lked$','VB'],['.fully$','RB'],['.*ould$','MD'],['^-?[0-9]+(.[0-9]+)?$','CD'],['[a-z]*\\-[a-z]*\\-','JJ'],['[a-z]\'s$','NNO'],['.\'n$','VB'],['.\'re$','CP'],['.\'ll$','MD'],['.\'t$','VB'],['.tches$','VB'],['^https?\:?\/\/[a-z0-9]','CD'], //the colon is removed in normalisation
['^www\.[a-z0-9]','CD'],['.ize$','VB'],['.[^aeiou]ise$','VB'],['.[aeiou]te$','VB'],['.ea$','NN'],['[aeiou][pns]er$','NN'],['.ia$','NN'],['.sis$','NN'],['.[aeiou]na$','NN'],['.[^aeiou]ity$','NN'],['.[^aeiou]ium$','NN'],['.[^aeiou][ei]al$','JJ'],['.ffy$','JJ'],['.[^aeiou]ic$','JJ'],['.(gg|bb|zz)ly$','JJ'],['.[aeiou]my$','JJ'],['.[aeiou]ble$','JJ'],['.[^aeiou]ful$','JJ'],['.[^aeiou]ish$','JJ'],['.[^aeiou]ica$','NN'],['[aeiou][^aeiou]is$','NN'],['[^aeiou]ard$','NN'],['[^aeiou]ism$','NN'],['.[^aeiou]ity$','NN'],['.[^aeiou]ium$','NN'],['.[lstrn]us$','NN'],['..ic$','JJ'],['[aeiou][^aeiou]id$','JJ'],['.[^aeiou]ish$','JJ'],['.[^aeiou]ive$','JJ'],['[ea]{2}zy$','JJ']].map(function(a){return {reg:new RegExp(a[0],'i'),pos:a[1]};});},{}],25:[function(require,module,exports){'use strict';var Term=require('../term/term.js');var fns=require('../fns.js');var tagger=require('./pos/tagger.js'); //a sentence is an array of Term objects, along with their various methods
var Sentence=(function(){function Sentence(str){_classCallCheck(this,Sentence);this.str = str || '';var terms=str.split(' ');this.terms = terms.map(function(s,i){var info={index:i};return new Term(s,info);});this.terms = tagger(this);} //Sentence methods:
//the ending punctuation
_createClass(Sentence,[{key:"terminator",value:function terminator(){var allowed=['.','?','!'];var punct=this.str.slice(-1) || '';if(allowed.indexOf(punct) !== -1){return punct;}return '.';} //part-of-speech assign each term
},{key:"tag",value:function tag(){this.terms = tagger(this);return this.terms;} //is it a question/statement
},{key:"sentence_type",value:function sentence_type(){var char=this.terminator();var types={'?':'interrogative','!':'exclamative','.':'declarative'};return types[char] || 'declarative';}},{key:"to_past",value:function to_past(){this.terms.forEach(function(t){if(t.parent === 'verb'){t.to_past();}});}},{key:"to_present",value:function to_present(){this.terms.forEach(function(t){if(t.parent === 'verb'){t.to_present();}});}},{key:"to_future",value:function to_future(){this.terms.forEach(function(t){if(t.parent === 'verb'){t.to_future();}});} //map over Term methods
},{key:"normalized",value:function normalized(){return fns.pluck(this.terms,'normal').join(' ');}},{key:"text",value:function text(){return fns.pluck(this.terms,'text').join(' ');}},{key:"tags",value:function tags(){return fns.pluck(this.terms,'parent');}}]);return Sentence;})();module.exports = Sentence;},{"../fns.js":16,"../term/term.js":51,"./pos/tagger.js":23}],26:[function(require,module,exports){'use strict';var Term=require('../term.js');var to_comparative=require('./to_comparative');var to_superlative=require('./to_superlative');var adj_to_adv=require('./to_adverb');var adj_to_noun=require('./to_noun');var Adjective=(function(_Term){_inherits(Adjective,_Term);function Adjective(str){_classCallCheck(this,Adjective);_get(Object.getPrototypeOf(Adjective.prototype),"constructor",this).call(this,str);this.parent = 'adjective';} // let t = new Adjective("quick")
// console.log(t.conjugate())
_createClass(Adjective,[{key:"conjugate",value:function conjugate(){return {comparative:to_comparative(this.normal),superlative:to_superlative(this.normal),adverb:adj_to_adv(this.normal),noun:adj_to_noun(this.normal)};}}]);return Adjective;})(Term);module.exports = Adjective;},{"../term.js":51,"./to_adverb":28,"./to_comparative":29,"./to_noun":30,"./to_superlative":31}],27:[function(require,module,exports){ //these are adjectives that can become comparative + superlative with out "most/more"
//its a whitelist for conjugation
//this data is shared between comparative/superlative methods
module.exports = ['absurd','aggressive','alert','alive','awesome','beautiful','big','bitter','black','blue','bored','boring','brash','brave','brief','bright','broad','brown','calm','charming','cheap','clean','cold','cool','cruel','cute','damp','deep','dear','dead','dark','dirty','drunk','dull','eager','efficient','even','faint','fair','fanc','fast','fat','feeble','few','fierce','fine','flat','forgetful','frail','full','gentle','glib','great','green','gruesome','handsome','hard','harsh','high','hollow','hot','impolite','innocent','keen','kind','lame','lean','light','little','loose','long','loud','low','lush','macho','mean','meek','mellow','mundane','near','neat','new','nice','normal','odd','old','pale','pink','plain','poor','proud','purple','quick','rare','rapid','red','rich','ripe','rotten','round','rude','sad','safe','scarce','scared','shallow','sharp','short','shrill','simple','slim','slow','small','smart','smooth','soft','sore','sour','square','stale','steep','stiff','straight','strange','strong','sweet','swift','tall','tame','tart','tender','tense','thick','thin','tight','tough','vague','vast','vulgar','warm','weak','wet','white','wide','wild','wise','young','yellow','easy','narrow','late','early','soon','close','empty','dry','windy','noisy','thirsty','hungry','fresh','quiet','clear','heavy','happy','funny','lucky','pretty','important','interesting','attractive','dangerous','intellegent','pure','orange','large','firm','grand','formal','raw','weird','glad','mad','strict','tired','solid','extreme','mature','true','free','curly','angry'].reduce(function(h,s){h[s] = true;return h;},{});},{}],28:[function(require,module,exports){ //turn 'quick' into 'quickly'
'use strict';var adj_to_adv=function adj_to_adv(str){var irregulars={'idle':'idly','public':'publicly','vague':'vaguely','day':'daily','icy':'icily','single':'singly','female':'womanly','male':'manly','simple':'simply','whole':'wholly','special':'especially','straight':'straight','wrong':'wrong','fast':'fast','hard':'hard','late':'late','early':'early','well':'well','best':'best','latter':'latter','bad':'badly'};var dont={'foreign':1,'black':1,'modern':1,'next':1,'difficult':1,'degenerate':1,'young':1,'awake':1,'back':1,'blue':1,'brown':1,'orange':1,'complex':1,'cool':1,'dirty':1,'done':1,'empty':1,'fat':1,'fertile':1,'frozen':1,'gold':1,'grey':1,'gray':1,'green':1,'medium':1,'parallel':1,'outdoor':1,'unknown':1,'undersized':1,'used':1,'welcome':1,'yellow':1,'white':1,'fixed':1,'mixed':1,'super':1,'guilty':1,'tiny':1,'able':1,'unable':1,'same':1,'adult':1};var transforms=[{reg:/al$/i,repl:'ally'},{reg:/ly$/i,repl:'ly'},{reg:/(.{3})y$/i,repl:'$1ily'},{reg:/que$/i,repl:'quely'},{reg:/ue$/i,repl:'uly'},{reg:/ic$/i,repl:'ically'},{reg:/ble$/i,repl:'bly'},{reg:/l$/i,repl:'ly'}];var not_matches=[/airs$/,/ll$/,/ee.$/,/ile$/];if(dont[str]){return null;}if(irregulars[str]){return irregulars[str];}if(str.length <= 3){return null;}for(var _i15=0;_i15 < not_matches.length;_i15++) {if(str.match(not_matches[_i15])){return null;}}for(var _i16=0;_i16 < transforms.length;_i16++) {if(str.match(transforms[_i16].reg)){return str.replace(transforms[_i16].reg,transforms[_i16].repl);}}return str + 'ly';}; // console.log(adj_to_adv('direct'))
module.exports = adj_to_adv;},{}],29:[function(require,module,exports){ //turn 'quick' into 'quickly'
'use strict';var convertables=require('./convertables');var to_comparative=function to_comparative(str){var irregulars={'grey':'greyer','gray':'grayer','green':'greener','yellow':'yellower','red':'redder','good':'better','well':'better','bad':'worse','sad':'sadder'};var dont={'overweight':1,'main':1,'nearby':1,'asleep':1,'weekly':1,'secret':1,'certain':1};var transforms=[{reg:/y$/i,repl:'ier'},{reg:/([aeiou])t$/i,repl:'$1tter'},{reg:/([aeou])de$/i,repl:'$1der'},{reg:/nge$/i,repl:'nger'}];var matches=[/ght$/,/nge$/,/ough$/,/ain$/,/uel$/,/[au]ll$/,/ow$/,/old$/,/oud$/,/e[ae]p$/];var not_matches=[/ary$/,/ous$/];if(dont.hasOwnProperty(str)){return null;}for(var _i17=0;_i17 < transforms.length;_i17++) {if(str.match(transforms[_i17].reg)){return str.replace(transforms[_i17].reg,transforms[_i17].repl);}}if(convertables.hasOwnProperty(str)){if(str.match(/e$/)){return str + 'r';}return str + 'er';}if(irregulars.hasOwnProperty(str)){return irregulars[str];}for(var _i18=0;_i18 < not_matches.length;_i18++) {if(str.match(not_matches[_i18])){return 'more ' + str;}}for(var _i19=0;_i19 < matches.length;_i19++) {if(str.match(matches[_i19])){return str + 'er';}}return 'more ' + str;}; // console.log(to_comparative("great"))
module.exports = to_comparative;},{"./convertables":27}],30:[function(require,module,exports){ //convert cute to cuteness
'use strict';var to_noun=function to_noun(w){var irregulars={'clean':'cleanliness','naivety':'naivety'};if(!w){return '';}if(irregulars.hasOwnProperty(w)){return irregulars[w];}if(w.match(' ')){return w;}if(w.match(/w$/)){return w;}var transforms=[{'reg':/y$/,'repl':'iness'},{'reg':/le$/,'repl':'ility'},{'reg':/ial$/,'repl':'y'},{'reg':/al$/,'repl':'ality'},{'reg':/ting$/,'repl':'ting'},{'reg':/ring$/,'repl':'ring'},{'reg':/bing$/,'repl':'bingness'},{'reg':/sing$/,'repl':'se'},{'reg':/ing$/,'repl':'ment'},{'reg':/ess$/,'repl':'essness'},{'reg':/ous$/,'repl':'ousness'}];for(var _i20=0;_i20 < transforms.length;_i20++) {if(w.match(transforms[_i20].reg)){return w.replace(transforms[_i20].reg,transforms[_i20].repl);}}if(w.match(/s$/)){return w;}return w + 'ness';}; // console.log(to_noun("great"))
module.exports = to_noun;},{}],31:[function(require,module,exports){ //turn 'quick' into 'quickest'
'use strict';var convertables=require('./convertables');var to_superlative=function to_superlative(str){var irregulars={'nice':'nicest','late':'latest','hard':'hardest','inner':'innermost','outer':'outermost','far':'furthest','worse':'worst','bad':'worst','good':'best'};var dont={'overweight':1,'ready':1};var transforms=[{'reg':/y$/i,'repl':'iest'},{'reg':/([aeiou])t$/i,'repl':'$1ttest'},{'reg':/([aeou])de$/i,'repl':'$1dest'},{'reg':/nge$/i,'repl':'ngest'}];var matches=[/ght$/,/nge$/,/ough$/,/ain$/,/uel$/,/[au]ll$/,/ow$/,/oud$/,/...p$/];var not_matches=[/ary$/];var generic_transformation=function generic_transformation(s){if(s.match(/e$/)){return s + 'st';}return s + 'est';};for(var _i21=0;_i21 < transforms.length;_i21++) {if(str.match(transforms[_i21].reg)){return str.replace(transforms[_i21].reg,transforms[_i21].repl);}}if(convertables.hasOwnProperty(str)){return generic_transformation(str);}if(dont.hasOwnProperty(str)){return 'most ' + str;}if(irregulars.hasOwnProperty(str)){return irregulars[str];}for(var _i22=0;_i22 < not_matches.length;_i22++) {if(str.match(not_matches[_i22])){return 'most ' + str;}}for(var _i23=0;_i23 < matches.length;_i23++) {if(str.match(matches[_i23])){return generic_transformation(str);}}return 'most ' + str;}; // console.log(to_superlative("great"))
module.exports = to_superlative;},{"./convertables":27}],32:[function(require,module,exports){'use strict';var Term=require('../term.js');var _to_adjective=require('./to_adjective.js');var Adverb=(function(_Term2){_inherits(Adverb,_Term2);function Adverb(str){_classCallCheck(this,Adverb);_get(Object.getPrototypeOf(Adverb.prototype),"constructor",this).call(this,str);this.parent = 'adverb';} // let t = new Adverb("quickly")
// console.log(t.to_adjective())
_createClass(Adverb,[{key:"to_adjective",value:function to_adjective(){return _to_adjective(this.normal);}}]);return Adverb;})(Term);module.exports = Adverb;},{"../term.js":51,"./to_adjective.js":33}],33:[function(require,module,exports){ //turns 'quickly' into 'quick'
'use strict';var to_adjective=function to_adjective(str){var irregulars={'idly':'idle','sporadically':'sporadic','basically':'basic','grammatically':'grammatical','alphabetically':'alphabetical','economically':'economical','conically':'conical','politically':'political','vertically':'vertical','practically':'practical','theoretically':'theoretical','critically':'critical','fantastically':'fantastic','mystically':'mystical','pornographically':'pornographic','fully':'full','jolly':'jolly','wholly':'whole'};var transforms=[{'reg':/bly$/i,'repl':'ble'},{'reg':/gically$/i,'repl':'gical'},{'reg':/([rsdh])ically$/i,'repl':'$1ical'},{'reg':/ically$/i,'repl':'ic'},{'reg':/uly$/i,'repl':'ue'},{'reg':/ily$/i,'repl':'y'},{'reg':/(.{3})ly$/i,'repl':'$1'}];if(irregulars.hasOwnProperty(str)){return irregulars[str];}for(var _i24=0;_i24 < transforms.length;_i24++) {if(str.match(transforms[_i24].reg)){return str.replace(transforms[_i24].reg,transforms[_i24].repl);}}return str;}; // console.log(to_adjective('quickly') === 'quick')
// console.log(to_adjective('marvelously') === 'marvelous')
module.exports = to_adjective;},{}],34:[function(require,module,exports){ // convert british spellings into american ones
// built with patterns+exceptions from https://en.wikipedia.org/wiki/British_spelling
'use strict';var patterns=[ // ise -> ize
{reg:/([^aeiou][iy])s(e|ed|es|ing)?$/,repl:'$1z$2'}, // our -> or
{reg:/(..)our(ly|y|ite)?$/,repl:'$1or$2'}, // re -> er
{reg:/([^cdnv])re(s)?$/,repl:'$1er$2'}, // xion -> tion
{reg:/([aeiou])xion([ed])?$/,repl:'$1tion$2'}, //logue -> log
{reg:/logue/,repl:'log'}, // ae -> e
{reg:/([o|a])e/,repl:'e'}, //eing -> ing
{reg:/e(ing|able)$/,repl:'$1'}, // illful -> ilful
{reg:/([aeiou]+[^aeiou]+[aeiou]+)ll(ful|ment|est|ing|or|er|ed)$/, //must be second-syllable
repl:'$1l$2'},{reg:/sation$/,repl:'zation'},{reg:/isable$/,repl:'izable'},{reg:/iliser$/,repl:'ilizer'},{reg:/singly$/,repl:'zingly'},{reg:/iniser$/,repl:'inizer'},{reg:/uring$/,repl:'oring'},{reg:/niser$/,repl:'nizer'},{reg:/ising$/,repl:'izer'},{reg:/fence/,repl:'fense'},{reg:/(l|t|d)iser/,repl:'$1izer'},{reg:/euvre/,repl:'euver'},{reg:/gramme/,repl:'gram'},{reg:/outre/,repl:'outer'},{reg:/isement/,repl:'izement'},{reg:/anaes/,repl:'anes'},{reg:/armour/,repl:'armor'},{reg:/honour/,repl:'honor'},{reg:/baulk/,repl:'balk'},{reg:/behaviour/,repl:'behavior'},{reg:/behove/,repl:'behoove'},{reg:/labour/,repl:'labor'},{reg:/biass/,repl:'bias'},{reg:/alyser$/,repl:'alyzer'},{reg:/centre/,repl:'center'},{reg:/cheque/,repl:'check'},{reg:/colour/,repl:'color'},{reg:/^cosi/,repl:'cozi'},{reg:/defence/,repl:'defense'},{reg:/draught/,repl:'draft'},{reg:/duell/,repl:'duel'},{reg:/vour/,repl:'vor'},{reg:/fibre/,repl:'fiber'},{reg:/fillet/,repl:'filet'},{reg:/fulfil/,repl:'fulfill'},{reg:/gaol/,repl:'jail'},{reg:/gauge/,repl:'gage'},{reg:/grey/,repl:'gray'},{reg:/licence/,repl:'license'},{reg:/manoeuvre/,repl:'maneuver'},{reg:/marvellous/,repl:'marvelous'},{reg:/mould/,repl:'mold'},{reg:/neighbour/,repl:'neighbor'},{reg:/plough/,repl:'plow'},{reg:/practise/,repl:'practice'},{reg:/rumour/,repl:'rumor'},{reg:/savour/,repl:'savor'},{reg:/tranquill/,repl:'tranquil'},{reg:/triall/,repl:'trial'},{reg:/sceptic/,repl:'skeptic'},{reg:/sulph/,repl:'sulf'},{reg:/syphon/,repl:'siphon'},{reg:/tonne/,repl:'ton'},{reg:/anaesthetis/,repl:'anesthetiz'}];var americanize=function americanize(str){for(var _i25=0;_i25 < patterns.length;_i25++) {if(str.match(patterns[_i25].reg)){return str.replace(patterns[_i25].reg,patterns[_i25].repl);}}return str;}; // console.log(americanize("synthesise") === "synthesize")
// console.log(americanize("synthesised") === "synthesized")
module.exports = americanize;},{}],35:[function(require,module,exports){ // convert american spellings into british ones
// built with patterns+exceptions from https://en.wikipedia.org/wiki/British_spelling
// (some patterns are only safe to do in one direction)
'use strict';var patterns=[ // ise -> ize
{reg:/([^aeiou][iy])z(e|ed|es|ing|er)?$/,repl:'$1s$2'}, // our -> or
{reg:/(..)our(ly|y|ite)?$/,repl:'$1or$2'}, // re -> er
{reg:/([^cdnv])re(s)?$/,repl:'$1er$2'}, // xion -> tion
{reg:/([aeiou])xion([ed])?$/,repl:'$1tion$2'}, //logue -> log
{reg:/logue$/,repl:'log'}, // ae -> e
{reg:/([o|a])e/,repl:'e'}, //eing -> ing
{reg:/e(ing|able)$/,repl:'$1'}, // illful -> ilful
{reg:/([aeiou]+[^aeiou]+[aeiou]+)ll(ful|ment|est|ing|or|er|ed)$/, //must be second-syllable
repl:'$1l$2'},{reg:/ization/,repl:'isation'},{reg:/izable/,repl:'isable'},{reg:/orabl/,repl:'ourabl'},{reg:/zingly/,repl:'singly'},{reg:/ilizer/,repl:'iliser'},{reg:/pedic/,repl:'paedic'},{reg:/anesthes/,repl:'anaesthes'},{reg:/ar(b|m|d)or/,repl:'ar$1our'},{reg:/balk/,repl:'baulk'},{reg:/behavior/,repl:'behaviour'},{reg:/behove/,repl:'behoove'},{reg:/canceled/,repl:'cancelled'},{reg:/catalog/,repl:'catalogue'},{reg:/meter/,repl:'metre'},{reg:/center/,repl:'centre'},{reg:/clamor/,repl:'clamour'},{reg:/color/,repl:'colour'},{reg:/defense/,repl:'defence'},{reg:/endeavor/,repl:'endeavour'},{reg:/favor/,repl:'favour'},{reg:/flavor/,repl:'flavour'},{reg:/filet/,repl:'fillet'},{reg:/jail/,repl:'gaol'},{reg:/gray/,repl:'grey'},{reg:/^hematol/,repl:'haematol'},{reg:/^hemo/,repl:'haemo'},{reg:/^install/,repl:'instal'},{reg:/mold/,repl:'mould'},{reg:/neighbor/,repl:'neighbour'},{reg:/odor/,repl:'odour'},{reg:/^pedo/,repl:'paedo'},{reg:/^pedia/,repl:'paedia'},{reg:/^parlor/,repl:'parlour'},{reg:/plow/,repl:'plough'},{reg:/skeptic/,repl:'sceptic'},{reg:/rumor/,repl:'rumour'},{reg:/practice/,repl:'practise'},{reg:/maneuver/,repl:'manoeuvre'},{reg:/level(ed|er|ing)?$/,repl:'levell$1'},{reg:/travel(ed|er|ing)?$/,repl:'travell$1'},{reg:/tranquil/,repl:'tranquill'},{reg:/tranquilize/,repl:'tranquillise'},{reg:/vigor/,repl:'vigour'},{reg:/fiber/,repl:'fibre'},{reg:/drafts/,repl:'draughts'},{reg:/disk/,repl:'disc'},{reg:/uel(er|est|ed)/,repl:'uell$1'},{reg:/cozi(er|est|es|ly)/,repl:'cosi$1'},{reg:/colorize/,repl:'colourise'},{reg:/honor/,repl:'honour'},{reg:/abor(ed|ing)/,repl:'abour$1'},{reg:/pedal(ed|ing)/,repl:'pedall$1'},{reg:/shovel(ed|ing|er)/,repl:'shovell$1'},{reg:/al(ed|ing|er)/,repl:'all$1'},{reg:/el(ed|ing|er)/,repl:'ell$1'},{reg:/ol(ed|ing|er)/,repl:'oll$1'},{reg:/avor(ed|ing|er)/,repl:'avour$1'},{reg:/anesth/,repl:'anaesth'},{reg:/behoove/,repl:'behove'},{reg:/sulfur/,repl:'sulphur'}];var britishize=function britishize(str){for(var _i26=0;_i26 < patterns.length;_i26++) {if(str.match(patterns[_i26].reg)){return str.replace(patterns[_i26].reg,patterns[_i26].repl);}}return str;}; // console.log(britishize("synthesize") === "synthesise")
// console.log(britishize("synthesized") === "synthesised")
module.exports = britishize;},{}],36:[function(require,module,exports){'use strict'; //chooses an indefinite aricle 'a/an' for a word
var irregulars={'hour':'an','heir':'an','heirloom':'an','honest':'an','honour':'an','honor':'an','uber':'an' //german u
};var is_acronym=function is_acronym(s){ //no periods
if(s.length <= 5 && s.match(/^[A-Z]*$/)){return true;} //with periods
if(s.length >= 4 && s.match(/^([A-Z]\.)*$/)){return true;}return false;};var indefinite_article=function indefinite_article(str){if(!str){return null;} //pronounced letters of acronyms that get a 'an'
var an_acronyms={A:true,E:true,F:true,H:true,I:true,L:true,M:true,N:true,O:true,R:true,S:true,X:true}; //'a' regexes
var a_regexs=[/^onc?e/i, //'wu' sound of 'o'
/^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
/^eul/i]; //begin business time
////////////////////
//explicit irregular forms
if(irregulars.hasOwnProperty(str)){return irregulars[str];} //spelled-out acronyms
if(is_acronym(str) && an_acronyms.hasOwnProperty(str.substr(0,1))){return 'an';} //'a' regexes
for(var _i27=0;_i27 < a_regexs.length;_i27++) {if(str.match(a_regexs[_i27])){return 'a';}} //basic vowel-startings
if(str.match(/^[aeiou]/i)){return 'an';}return 'a';}; // console.log(indefinite_article("wolf") === "a")
module.exports = indefinite_article;},{}],37:[function(require,module,exports){'use strict';var Noun=require('../noun.js');var _parse=require('./parse.js');var Date=(function(_Noun){_inherits(Date,_Noun);function Date(str){_classCallCheck(this,Date);_get(Object.getPrototypeOf(Date.prototype),"constructor",this).call(this,str);this.parent = 'date';this.date = null;this.parse();}_createClass(Date,[{key:"parse",value:function parse(){var dates=_parse(this.text) || [];if(dates.length){this.date = dates[0].Date;}}}]);return Date;})(Noun);module.exports = Date;},{"../noun.js":42,"./parse.js":38}],38:[function(require,module,exports){require('sugar-date'); // var data = require("./old/lexdates").dates;
// console.log("Dates", data);
var rules={ // http://rubular.com/r/VUd4LJzIG4
range:/(?:\b|^)(?:between|from)(.*)(?:\sand(?= ) |or\s)(.*)|(?:\b|^)(?:between|from)?(.*)(?:(?:\sto\s)|(?:\-\s))(.+)/i,multi:/(?: |^)(?:and(?= ) |or(?= ) )|(?: ?\& ?)|(?: ?, ?)(?=\d)/i,multiburst:{at:/(.+)\sat\s(.+)/, // {location} at {time}
at2:/(.+)?\s?((tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun)\sat\s.+)|at\s(.+)/i,on:/(.+)\son\s(.+)/, // {event} on {date} or {action} on {date} at {time}
days:/(tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun)/i},months:/(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec),?/ig,short:[{ // [ 'month', 'day', 'year' ]
matches:/(?:([1-9]|0[1-9]|1[0-2])\s?(?:\-|\/)+\s?(3[0-1]|[12][0-9]|0?[1-9])\s?(?:\-|\/)+\s?(?:([0-9]{1,4})+)?)/},{ // [ 'day', 'month', 'year' ]
matches:/(?:(3[0-1]|[12][0-9]|0?[1-9])\s?(?:\.|\/)+\s?([1-9]|0[1-9]|1[0-2])\s?(?:\.|\/)+\s?(?:([0-9]{1,4})+)?)/}]}; // Shorthand for date functions
var _methods={day:'UTCDate',month:'UTCMonth',year:'UTCFullYear',weekDay:'UTCDay', // Time
hours:'UTCHours',minutes:'UTCMinutes',seconds:'UTCSeconds'}; // Helpers
var stringCheck=function stringCheck(input){return typeof input === 'string' && input.trim() !== '';};var hyphenatedDates=function hyphenatedDates(str,recover){var i;for(i = 0;i < 2;i++) {var rule=rules.short[i].matches;var r=recover?new RegExp(rule.source.replace(/\D\-/g,'/'),'g'):new RegExp(rule.source,'g');var find=recover?/\//g:/\-/g;var repl=recover?'-':'/',a;while((a = r.exec(str)) !== null) {str = str.replace(a[0],a[0].replace(find,repl));}}return str;};function get(D,t){var method=['get',_methods[t]].join('');return D && method?D[method]() + (t === 'month'?1:0):false;}function blank(nowD,text){if(!nowD){return {text:text.trim(),day:false,month:false,year:false,weekDay:false,hours:false,minutes:false,seconds:false};}if(!nowD.isValid()){return null;}return {text:text.trim(),day:get(nowD,'day'),month:get(nowD,'month'),year:get(nowD,'year'),weekDay:get(nowD,'weekDay'),hours:get(nowD,'hours'),minutes:get(nowD,'minutes'),seconds:get(nowD,'seconds'),Date:nowD || {},to:false};}var parseInput=function parseInput(input){var ranges=input.split(rules.range).filter(stringCheck);var dates=[];if(ranges.length === 1){ // One big chunk with a date
var part=ranges[0];var parts=part.split(rules.multi).filter(stringCheck); // Map parts
dates = parts.map(function(item){var innerpart1=item.split(rules.multiburst.on).filter(stringCheck);var innerpart2=item.split(rules.multiburst.at2).filter(stringCheck);if(innerpart1.length === 2){ // first with on
item = innerpart1[1];}else if(innerpart2.length >= 2){ // Try at expression
if(innerpart2.length === 3){ // lets meet sunday at 3pm
// lobby at 3pm
item = innerpart2[1];}else if(innerpart2.length === 2){if(rules.multiburst.days.test(innerpart2[1])){ // We just use item...
// ie: today at TIME
}else { // In this case, we just want the part after 'at' which should be a time component
// lobby at 3pm
item = innerpart2[1];}}else {console.log('We need to test this...',innerpart2);}}var td=Date.create(item);if(td.isValid()){return blank(Date.future(item),item);}else { // Last attempt, lets peel it back one token at a time.
var tok=item.split(' ');for(var i=0;i < tok.length;i++) {var na=tok.slice(i);var revisedInput=na.join(' ');var td=Date.create(revisedInput);if(td.isValid()){return blank(Date.future(revisedInput),revisedInput);}}}});}else if(ranges.length === 2){ // Range date
var d1=Date.create(ranges[0]);var d2=Date.create(ranges[1]);if(d1.isValid() && d2.isValid()){dates[0] = blank(d1,ranges[0]);dates[0].to = blank(d2,ranges[1]);}}return dates;};var extractDates=function extractDates(input){input = stripCommas(hyphenatedDates(input));var results=parseInput(input);return cleanArray(results);};var stripCommas=function stripCommas(str){return str.replace(/,/g,'');};var cleanArray=function cleanArray(actual){var newArray=new Array();for(var i=0;i < actual.length;i++) {if(actual[i]){newArray.push(actual[i]);}}return newArray;}; // console.log(extractDates("i will get the tagger in tip-top shape this week"));
module.exports = extractDates;},{"sugar-date":2}],39:[function(require,module,exports){'use strict';var firstnames=require('../../data/firstnames');var honourifics=require('../../data/honourifics');honourifics = honourifics.reduce(function(h,s){h[s] = true;return h;},{});var is_person=function is_person(str){var words=str.split(' ');var first=words[0];if(honourifics[first] || firstnames[first]){return true;}return false;};module.exports = is_person;},{"../../data/firstnames":7,"../../data/honourifics":8}],40:[function(require,module,exports){'use strict';var irregulars=require('../../data/irregular_nouns'); //similar to plural/singularize rules, but not the same
var plural_indicators=[/(^v)ies$/i,/ises$/i,/ives$/i,/(antenn|formul|nebul|vertebr|vit)ae$/i,/(octop|vir|radi|nucle|fung|cact|stimul)i$/i,/(buffal|tomat|tornad)oes$/i,/(analy|ba|diagno|parenthe|progno|synop|the)ses$/i,/(vert|ind|cort)ices$/i,/(matr|append)ices$/i,/(x|ch|ss|sh|s|z|o)es$/i,/men$/i,/news$/i,/.tia$/i,/(^f)ves$/i,/(lr)ves$/i,/(^aeiouy|qu)ies$/i,/(m|l)ice$/i,/(cris|ax|test)es$/i,/(alias|status)es$/i,/ics$/i]; //similar to plural/singularize rules, but not the same
var singular_indicators=[/(ax|test)is$/i,/(octop|vir|radi|nucle|fung|cact|stimul)us$/i,/(octop|vir)i$/i,/(rl)f$/i,/(alias|status)$/i,/(bu)s$/i,/(al|ad|at|er|et|ed|ad)o$/i,/(ti)um$/i,/(ti)a$/i,/sis$/i,/(?:(^f)fe|(lr)f)$/i,/hive$/i,/(^aeiouy|qu)y$/i,/(x|ch|ss|sh|z)$/i,/(matr|vert|ind|cort)(ix|ex)$/i,/(m|l)ouse$/i,/(m|l)ice$/i,/(antenn|formul|nebul|vertebr|vit)a$/i,/.sis$/i,/^(?!talis|.*hu)(.*)man$/i];var is_plural=function is_plural(str){str = (str || '').toLowerCase(); //handle 'mayors of chicago'
var preposition=str.match(/([a-z]*) (of|in|by|for) [a-z]/);if(preposition && preposition[1]){str = preposition[1];} // if it's a known irregular case
for(var _i28=0;_i28 < irregulars.length;_i28++) {if(irregulars[_i28][1] === str){return true;}if(irregulars[_i28][0] === str){return false;}}for(var _i29=0;_i29 < plural_indicators.length;_i29++) {if(str.match(plural_indicators[_i29])){return true;}}for(var _i30=0;_i30 < singular_indicators.length;_i30++) {if(str.match(singular_indicators[_i30])){return false;}} // some 'looks pretty plural' rules
if(str.match(/s$/) && !str.match(/ss$/) && str.length > 3){ //needs some lovin'
return true;}return false;}; // console.log(is_plural('octopus') === false)
// console.log(is_plural('octopi') === true)
// console.log(is_plural('eyebrow') === false)
// console.log(is_plural('eyebrows') === true)
// console.log(is_plural('child') === false)
// console.log(is_plural('children') === true)
module.exports = is_plural;},{"../../data/irregular_nouns":9}],41:[function(require,module,exports){ //uncountables are words that shouldn't ever inflect, for metaphysical reasons, like 'peace'
'use strict';var uncountable_arr=require('../../data/uncountables.js');var uncountable=uncountable_arr.reduce(function(h,a){h[a] = true;return h;},{});var is_uncountable=function is_uncountable(str){if(uncountable[str]){return true;}return false;}; // console.log(is_uncountable("peace") === true)
// console.log(is_uncountable("dog") === false)
module.exports = is_uncountable;},{"../../data/uncountables.js":14}],42:[function(require,module,exports){'use strict';var Term=require('../term.js');var _article=require('./article.js');var _is_plural=require('./is_plural.js');var _is_person=require('./is_person.js');var _singularize=require('./singularize.js');var _pluralize=require('./pluralize.js');var _is_uncountable=require('./is_uncountable.js');var Noun=(function(_Term3){_inherits(Noun,_Term3);function Noun(str){_classCallCheck(this,Noun);_get(Object.getPrototypeOf(Noun.prototype),"constructor",this).call(this,str);this.parent = 'noun';} // let t = new Noun("forks")
// console.log(t.singularize())
//noun methods
_createClass(Noun,[{key:"article",value:function article(){return _article(this.normal);}},{key:"is_plural",value:function is_plural(){return _is_plural(this.normal);}},{key:"is_uncountable",value:function is_uncountable(){return _is_uncountable(this.normal);}},{key:"pluralize",value:function pluralize(){return _pluralize(this.normal);}},{key:"singularize",value:function singularize(){return _singularize(this.normal);} //mining
},{key:"is_person",value:function is_person(){return _is_person(this.normal);}},{key:"is_date",value:function is_date(){var months=/(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|aug|sept|oct|nov|dec)/i;var times=/1?[0-9]:[0-9]{2}/;var days=/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tues|wed|thurs|fri|sat|sun)\b/i;if(this.normal.match(months) || this.normal.match(times) || this.normal.match(days)){return true;}return false;}}]);return Noun;})(Term);module.exports = Noun;},{"../term.js":51,"./article.js":36,"./is_person.js":39,"./is_plural.js":40,"./is_uncountable.js":41,"./pluralize.js":44,"./singularize.js":45}],43:[function(require,module,exports){ // not all cultures use the firstname-lastname practice. this does make some assumptions.
'use strict';var Noun=require('../noun.js');var firstnames=require('../../../data/firstnames');var honourifics=require('../../../data/honourifics');honourifics = honourifics.reduce(function(h,s){h[s] = true;return h;},{});var Person=(function(_Noun2){_inherits(Person,_Noun2);function Person(str){_classCallCheck(this,Person);_get(Object.getPrototypeOf(Person.prototype),"constructor",this).call(this,str);this.pos = 'Person';this.honourific = null;this.firstName = null;this.middleName = null;this.lastName = null;this.parse();} //turn a multi-word string into [first, middle, last, honourific]
_createClass(Person,[{key:"parse",value:function parse(){var words=this.normal.split(' '); //first-word honourific
if(honourifics[words[0]]){this.honourific = words[0];words = words.slice(1,words.length);} //last-word honourific
if(honourifics[words[words.length - 1]]){this.honourific = words[words.length - 1];words = words.slice(0,words.length - 1);} //see if the first word is now a known first-name
if(firstnames[words[0]]){this.firstName = words[0];words = words.slice(1,words.length);}else { //ambiguous one-word name
if(words.length === 1){return;} //looks like an unknown first-name
this.firstName = words[0];words = words.slice(1,words.length);} //assume the remaining is '[middle..] [last]'
if(words[words.length - 1]){this.lastName = words[words.length - 1];words = words.slice(0,words.length - 1);}this.middleName = words.join(' ');}},{key:"gender",value:function gender(){if(!this.firstName){return null;}if(firstnames[this.firstName] === 'm'){return 'Male';}if(firstnames[this.firstName] === 'f'){return 'Female';}if(this.firstName.match(/.(i|ee|[a|e]y|a)$/)){ //this is almost-always true
return 'Female';}return null;}},{key:"pronoun",value:function pronoun(){var gender=this.gender();if(gender === 'Male'){return 'he';}if(gender === 'Female'){return 'she';}return 'they'; //singular 'they'
}}]);return Person;})(Noun);module.exports = Person;},{"../../../data/firstnames":7,"../../../data/honourifics":8,"../noun.js":42}],44:[function(require,module,exports){'use strict';var is_uncountable=require('./is_uncountable.js');var irregulars=require('../../data/irregular_nouns.js');var is_plural=require('./is_plural.js');var fns=require('../../fns.js');var pluralize_rules=[[/(ax|test)is$/i,'$1es'],[/(octop|vir|radi|nucle|fung|cact|stimul)us$/i,'$1i'],[/(octop|vir)i$/i,'$1i'],[/([rl])f$/i,'$1ves'],[/(alias|status)$/i,'$1es'],[/(bu)s$/i,'$1ses'],[/(al|ad|at|er|et|ed|ad)o$/i,'$1oes'],[/([ti])um$/i,'$1a'],[/([ti])a$/i,'$1a'],[/sis$/i,'ses'],[/(?:([^f])fe|([lr])f)$/i,'$1ves'],[/(hive)$/i,'$1s'],[/([^aeiouy]|qu)y$/i,'$1ies'],[/(x|ch|ss|sh|s|z)$/i,'$1es'],[/(matr|vert|ind|cort)(ix|ex)$/i,'$1ices'],[/([m|l])ouse$/i,'$1ice'],[/([m|l])ice$/i,'$1ice'],[/^(ox)$/i,'$1en'],[/^(oxen)$/i,'$1'],[/(quiz)$/i,'$1zes'],[/(antenn|formul|nebul|vertebr|vit)a$/i,'$1ae'],[/(sis)$/i,'ses'],[/^(?!talis|.*hu)(.*)man$/i,'$1men'],[/(.*)/i,'$1s']].map(function(a){return {reg:a[0],repl:a[1]};});var pluralize=function pluralize(str){var low=str.toLowerCase(); //uncountable
if(is_uncountable(low)){ //uncountables shouldn't ever inflect
return str;} //is it already plural?
if(is_plural(low) === true){return str;} //irregular
var found=irregulars.filter(function(r){return r[0] === low;});if(found[0]){if(fns.titlecase(low) === str){ //handle capitalisation properly
return fns.titlecase(found[0][1]);}return found[0][1];} //inflect first word of preposition-phrase
if(str.match(/([a-z]*) (of|in|by|for) [a-z]/)){var first=(str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];if(first){var better_first=pluralize(first);return better_first + str.replace(first,'');}} //regular
for(var _i31=0;_i31 < pluralize_rules.length;_i31++) {if(str.match(pluralize_rules[_i31].reg)){return str.replace(pluralize_rules[_i31].reg,pluralize_rules[_i31].repl);}}}; // console.log(pluralize('gas') === "gases")
// console.log(pluralize('narrative') === "narratives")
// console.log(pluralize('video') === "videos")
// console.log(pluralize('photo') === "photos")
// console.log(pluralize('stomach') === "stomachs")
// console.log(pluralize('database') === "databases")
// console.log(pluralize('kiss') === "kisses")
// console.log(pluralize('towns') === "towns")
// console.log(pluralize('peace') === "peace")
// console.log(pluralize('mayor of chicago') === "mayors of chicago")
module.exports = pluralize;},{"../../data/irregular_nouns.js":9,"../../fns.js":16,"./is_plural.js":40,"./is_uncountable.js":41}],45:[function(require,module,exports){'use strict';var is_uncountable=require('./is_uncountable.js');var irregulars=require('../../data/irregular_nouns.js');var is_plural=require('./is_plural.js');var fns=require('../../fns.js');var singularize_rules=[[/([^v])ies$/i,'$1y'],[/ises$/i,'isis'],[/ives$/i,'ife'],[/(antenn|formul|nebul|vertebr|vit)ae$/i,'$1a'],[/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i,'$1us'],[/(buffal|tomat|tornad)(oes)$/i,'$1o'],[/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i,'$1sis'],[/(vert|ind|cort)(ices)$/i,'$1ex'],[/(matr|append)(ices)$/i,'$1ix'],[/(x|ch|ss|sh|s|z|o)es$/i,'$1'],[/men$/i,'man'],[/(n)ews$/i,'$1ews'],[/([ti])a$/i,'$1um'],[/([^f])ves$/i,'$1fe'],[/([lr])ves$/i,'$1f'],[/([^aeiouy]|qu)ies$/i,'$1y'],[/(s)eries$/i,'$1eries'],[/(m)ovies$/i,'$1ovie'],[/([m|l])ice$/i,'$1ouse'],[/(cris|ax|test)es$/i,'$1is'],[/(alias|status)es$/i,'$1'],[/(ss)$/i,'$1'],[/(ics)$/i,'$1'],[/s$/i,'']].map(function(a){return {reg:a[0],repl:a[1]};});var singularize=function singularize(str){var low=str.toLowerCase(); //uncountable
if(is_uncountable(low)){return str;} //is it already singular?
if(is_plural(low) === false){return str;} //irregular
var found=irregulars.filter(function(r){return r[1] === low;});if(found[0]){if(fns.titlecase(low) === str){ //handle capitalisation properly
return fns.titlecase(found[0][0]);}return found[0][0];} //inflect first word of preposition-phrase
if(str.match(/([a-z]*) (of|in|by|for) [a-z]/)){var first=str.match(/^([a-z]*) (of|in|by|for) [a-z]/);if(first && first[1]){var better_first=singularize(first[1]);return better_first + str.replace(first[1],'');}} //regular
for(var _i32=0;_i32 < singularize_rules.length;_i32++) {if(str.match(singularize_rules[_i32].reg)){return str.replace(singularize_rules[_i32].reg,singularize_rules[_i32].repl);}}return str;}; // console.log(singularize('gases') === "gas")
// console.log(singularize('kisses') === "kiss")
// console.log(singularize('kiss') === "kiss")
// console.log(singularize('children') === "child")
// console.log(singularize('peace') === "peace")
// console.log(singularize('child') === "child")
// console.log(singularize('mayors of chicago') === "mayor of chicago")
module.exports = singularize;},{"../../data/irregular_nouns.js":9,"../../fns.js":16,"./is_plural.js":40,"./is_uncountable.js":41}],46:[function(require,module,exports){var ones={'a':1,'zero':0,'one':1,'two':2,'three':3,'four':4,'five':5,'six':6,'seven':7,'eight':8,'nine':9,'first':1,'second':2,'third':3,'fourth':4,'fifth':5,'sixth':6,'seventh':7,'eighth':8,'ninth':9};var teens={'ten':10,'eleven':11,'twelve':12,'thirteen':13,'fourteen':14,'fifteen':15,'sixteen':16,'seventeen':17,'eighteen':18,'nineteen':19,'eleventh':11,'twelfth':12,'thirteenth':13,'fourteenth':14,'fifteenth':15,'sixteenth':16,'seventeenth':17,'eighteenth':18,'nineteenth':19};var tens={'twenty':20,'thirty':30,'forty':40,'fifty':50,'sixty':60,'seventy':70,'eighty':80,'ninety':90,'twentieth':20,'thirtieth':30,'fourtieth':40,'fiftieth':50,'sixtieth':60,'seventieth':70,'eightieth':80,'ninetieth':90};var multiples={'hundred':100,'grand':1000,'thousand':1000,'million':1000000,'billion':1000000000,'trillion':1000000000000,'quadrillion':1000000000000000,'quintillion':1000000000000000000,'sextillion':1000000000000000000000,'septillion':1000000000000000000000000,'octillion':1000000000000000000000000000,'nonillion':1000000000000000000000000000000,'decillion':1000000000000000000000000000000000}; //used for the units
var prefixes={'yotta':1,'zeta':1,'peta':1,'tera':1,'giga':1,'mega':1,'kilo':1,'hecto':1,'deca':1,'centi':1,'centa':1,'milli':1,'micro':1,'nano':1,'pico':1,'femto':1,'atto':1,'zepto':1,'yokto':1,'square':1,'cubic':1,'quartic':1};module.exports = {ones:ones,teens:teens,tens:tens,multiples:multiples,prefixes:prefixes};},{}],47:[function(require,module,exports){ // converts spoken numbers into integers  "fifty seven point eight" -> 57.8
//
// Spoken numbers take the following format
// [sixty five] (thousand) [sixty five] (hundred) [sixty five]
// aka: [one/teen/ten] (multiple) [one/teen/ten] (multiple) ...
// combile the [one/teen/ten]s as 'current_sum', then multiply it by its following multiple
// multiple not repeat
'use strict';var nums=require('./numbers.js');var units=require('./units.js'); //these sets of numbers each have different rules
//[tenth, hundreth, thousandth..] are ambiguous because they could be ordinal like fifth, or decimal like one-one-hundredth, so are ignored
// let decimal_multiple={'tenth':0.1, 'hundredth':0.01, 'thousandth':0.001, 'millionth':0.000001,'billionth':0.000000001};
var to_number=function to_number(s){if(s === null){return null;}s = s.trim(); //remember these concerns for possible errors
var ones_done=false;var teens_done=false;var tens_done=false;var multiple_done={};var total=0;var global_multiplier=1; //pretty-printed numbers
s = s.replace(/, ?/g,''); //parse-out currency
s = s.replace(/[$£€]/,''); //try to finish-fast
if(s.match(/[0-9]\.[0-9]/) && parseFloat(s) === s){return parseFloat(s);}if(parseInt(s,10) === s){return parseInt(s,10);} //try to die fast. (phone numbers or times)
if(s.match(/[0-9][\-:][0-9]/)){return null;} //support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
var mults=[{reg:/^(minus|negative)[\s\-]/i,mult:-1},{reg:/^(a\s)?half[\s\-](of\s)?/i,mult:0.5},{reg:/^(a\s)?quarter[\s\-]/i,mult:0.25}];for(var _i33=0;_i33 < mults.length;_i33++) {if(s.match(mults[_i33].reg)){global_multiplier = mults[_i33].mult;s = s.replace(mults[_i33].reg,'');break;}} //do each word in turn..
var words=s.toString().split(/[\s\-]+/);var w=undefined,x=undefined;var current_sum=0;var local_multiplier=1;var decimal_mode=false;for(var _i34=0;_i34 < words.length;_i34++) {w = words[_i34]; //skip 'and' eg. five hundred and twelve
if(w === 'and'){continue;} //..we're doing decimals now
if(w === 'point' || w === 'decimal'){if(decimal_mode){return null;} //two point one point six
decimal_mode = true;total += current_sum;current_sum = 0;ones_done = false;local_multiplier = 0.1;continue;} //handle special rules following a decimal
if(decimal_mode){x = null; //allow consecutive ones in decimals eg. 'two point zero five nine'
if(nums.ones[w] !== undefined){x = nums.ones[w];}if(nums.teens[w] !== undefined){x = nums.teens[w];}if(parseInt(w,10) === w){x = parseInt(w,10);}if(!x){return null;}if(x < 10){total += x * local_multiplier;local_multiplier = local_multiplier * 0.1; // next number is next decimal place
current_sum = 0;continue;} //two-digit decimals eg. 'two point sixteen'
if(x < 100){total += x * (local_multiplier * 0.1);local_multiplier = local_multiplier * 0.01; // next number is next decimal place
current_sum = 0;continue;}} //if it's already an actual number
if(w.match(/^[0-9]\.[0-9]$/)){current_sum += parseFloat(w);continue;}if(parseInt(w,10) === w){current_sum += parseInt(w,10);continue;} //ones rules
if(nums.ones[w] !== undefined){if(ones_done){return null;} // eg. five seven
if(teens_done){return null;} // eg. five seventeen
ones_done = true;current_sum += nums.ones[w];continue;} //teens rules
if(nums.teens[w]){if(ones_done){return null;} // eg. five seventeen
if(teens_done){return null;} // eg. fifteen seventeen
if(tens_done){return null;} // eg. sixty fifteen
teens_done = true;current_sum += nums.teens[w];continue;} //tens rules
if(nums.tens[w]){if(ones_done){return null;} // eg. five seventy
if(teens_done){return null;} // eg. fiveteen seventy
if(tens_done){return null;} // eg. twenty seventy
tens_done = true;current_sum += nums.tens[w];continue;} //multiple rules
if(nums.multiples[w]){if(multiple_done[w]){return null;} // eg. five hundred six hundred
multiple_done[w] = true; //reset our concerns. allow 'five hundred five'
ones_done = false;teens_done = false;tens_done = false; //case of 'hundred million', (2 consecutive multipliers)
if(current_sum === 0){total = total || 1; //dont ever multiply by 0
total *= nums.multiples[w];}else {current_sum *= nums.multiples[w];total += current_sum;}current_sum = 0;continue;} //if word is not a known thing now, die
return null;}if(current_sum){total += (current_sum || 1) * local_multiplier;} //combine with global multiplier, like 'minus' or 'half'
total = total * global_multiplier;return total;}; // console.log(to_number('five hundred'));
// console.log(to_number("a hundred"))
// console.log(to_number("four point seven seven"))
//kick it into module
module.exports = to_number;},{"./numbers.js":46,"./units.js":48}],48:[function(require,module,exports){var units={'Temperature':{'°C':'Celsius','°F':'Fahrenheit','K':'Kelvin','°Ré':'Reaumur','°N':'Newton','°Ra':'Rankine'},'Volume':{'m³':'cubic meter','dm³':'cubic decimeter','cm³':'cubic centimeter','l':'liter','dl':'deciliter','cl':'centiliter','ml':'milliliter','in³':'cubic inch','ft³':'cubic foot','yd³':'cubic yard','gal':'gallon','bbl':'petroleum barrel','pt':'pint'},'Distance':{'km':'kilometer','m':'meter','dm':'decimeter','cm':'centimeter','mm':'millimeter','mi':'mile','in':'inch','ft':'foot','feet':'foot','yd':'yard'},'Weight':{'t':'tonne','kg':'kilogram','hg':'hectogram','g':'gram','dg':'decigram','cg':'centigram','mg':'milligram','µg':'microgram','carat':'carat','grain':'grain','oz':'ounce','lb':'pound','ton':'tonne','st':'stone'},'Area':{'km²':'square kilometer','m²':'square meter','dm²':'square decimeter','cm²':'square centimeter','mm²':'square millimeter','ha':'hectare','ca':'centiare','mile²':'square mile','in²':'square inch','yd²':'square yard','ft²':'square foot','acre':'acre'},'Frequency':{'Hz':'hertz'},'Speed':{'km/h':'kilometer per hour','kmph':'kilometer per hour','mps':'meter per second','m/s':'meter per second','mph':'mile per hour','mi/h':'mile per hour','knot':'knot'},'Data':{'b':'bit','B':'byte','KB':'kilobyte','Kb':'kilobyte','MB':'megabyte','Mb':'megabyte','GB':'gigabyte','Gb':'gigabyte','TB':'terabyte','Tb':'terabyte','PB':'petabyte','Pb':'petabyte','EB':'exabyte','Eb':'exabyte','ZB':'zettabyte','Zb':'zettabyte','YB':'yottabyte','Yb':'yottabyte'},'Energy':{'J':'joule','Pa':'pascal','bar':'bar','W':'watt','N':'newton','Wb':'weber','T':'tesla','H':'henry','C':'coulomb','V':'volt','F':'farad','S':'siemens','O':'ohm','lx':'lux','lm':'lumen'},'Time':{'year':'year','week':'week','day':'day','h':'hour','min':'minute','s':'second','ms':'millisecond','µs':'microsecond','nanosecond':'nanosecond','picosecond':'picosecond','femtosecond':'femtosecond','attosecond':'attosecond'},'Money':{'dollar':'currency','cent':'currency','penny':'currency','dime':'currency','dinar':'currency','euro':'currency','EU':'currency','lira':'currency','pound':'currency','GBP':'currency','pence':'currency','peso':'currency','sterling':'currency','rand':'currency','rouble':'currency','shekel':'currency','yen':'currency','yuan':'currency','franc':'currency','rupee':'currency','shilling':'currency','won':'currency','krona':'currency','dirham':'currency','€':'currency','$':'currency','¥':'currency','£':'currency','real':'currency','USD':'currency','AUD':'currency','CAD':'currency','BRL':'currency','EUR':'currency','CNY':'currency','EGP':'currency','MXN':'currency'}};module.exports = Object.keys(units).reduce(function(h,k){Object.keys(units[k]).forEach(function(u){h[u] = {name:units[k][u],category:k};h[units[k][u]] = {name:units[k][u],category:k};});return h;},{});},{}],49:[function(require,module,exports){'use strict';var Noun=require('../noun.js');var to_number=require('./to_number.js');var units=require('./units.js');var nums=require('./numbers.js');var Value=(function(_Noun3){_inherits(Value,_Noun3);function Value(str){_classCallCheck(this,Value);_get(Object.getPrototypeOf(Value.prototype),"constructor",this).call(this,str);this.parent = 'noun';this.number = null;this.unit = null;this.unit_name = null;this.measurement = null;this.parse();}_createClass(Value,[{key:"is_unit",value:function is_unit(s){if(units[s]){return true;}s = s.toLowerCase();if(nums.prefixes[s]){return true;} //try singular version
s = s.replace(/s$/); //ew
if(units[s]){return true;}return false;}},{key:"parse",value:function parse(){var words=this.normal.split(' ');var numbers='';var unit='';for(var _i35=0;_i35 < words.length;_i35++) {var w=words[_i35];if(nums.ones[w] || nums.teens[w] || nums.tens[w] || nums.multiples[w]){numbers += ' ' + w;}else if(this.is_unit(w)){ //optional units come after the number
this.unit = w;if(units[w]){this.measurement = units[w].category;this.unit_name = units[w].name;}}}this.number = to_number(numbers);}}]);return Value;})(Noun);module.exports = Value;},{"../noun.js":42,"./numbers.js":46,"./to_number.js":47,"./units.js":48}],50:[function(require,module,exports){ //chop a string into pronounced syllables
'use strict'; //suffix fixes
function postprocess(arr){ //trim whitespace
arr = arr.map(function(w){return w.trim();});if(arr.length > 2){return arr;}var ones=[/^[^aeiou]?ion/,/^[^aeiou]?ised/,/^[^aeiou]?iled/];var l=arr.length;if(l > 1){var suffix=arr[l - 2] + arr[l - 1];for(var _i36=0;_i36 < ones.length;_i36++) {if(suffix.match(ones[_i36])){arr[l - 2] = arr[l - 2] + arr[l - 1];arr.pop();}}}return arr;}var syllables=function syllables(str){var all=[]; //method is nested because it's called recursively
var doer=function doer(_x5){var _again3=true;_function3: while(_again3) {var w=_x5;vow = chars = before = after = current = _i37 = candidate = undefined;_again3 = false;var vow=/[aeiouy]$/;var chars=w.split('');var before='';var after='';var current='';for(var _i37=0;_i37 < chars.length;_i37++) {before = chars.slice(0,_i37).join('');current = chars[_i37];after = chars.slice(_i37 + 1,chars.length).join('');var candidate=before + chars[_i37]; //it's a consonant that comes after a vowel
if(before.match(vow) && !current.match(vow)){if(after.match(/^e[sm]/)){candidate += 'e';after = after.replace(/^e/,'');}all.push(candidate);_x5 = after;_again3 = true;continue _function3;} //unblended vowels ('noisy' vowel combinations)
if(candidate.match(/(eo|eu|ia|oa|ua|ui)$/i)){ //'io' is noisy, not in 'ion'
all.push(before);all.push(current);_x5 = after;_again3 = true;continue _function3; //recursion
}} //if still running, end last syllable
if(str.match(/[aiouy]/) || str.match(/ee$/)){ //allow silent trailing e
all.push(w);}else {all[all.length - 1] = (all[all.length - 1] || '') + str; //append it to the last one
}}};str.split(/\s\-/).forEach(function(s){doer(s);});all = postprocess(all); //for words like 'tree' and 'free'
if(all.length === 0){all = [str];} //filter blanks
all = all.filter(function(s){return s !== '' && s !== null && s !== undefined;});return all;}; // console.log(syllables("suddenly"))
module.exports = syllables;},{}],51:[function(require,module,exports){'use strict';var _syllables=require('./syllables');var _americanize=require('./americanize');var _britishize=require('./britishize');var Term=(function(){function Term(str,tag){_classCallCheck(this,Term);this.changeTo(str);this.reason = '';var types={DT:'Determiner',CC:'Conjunction',IN:'Preposition'};this.parent = types[tag] || '?';} // let t = new Term("synthesise")
// console.log(t.isVerb())
_createClass(Term,[{key:"changeTo",value:function changeTo(str){str = str || '';this.text = str.trim();this.normal = '';this.normalize();} //Term methods..
},{key:"is_capital",value:function is_capital(){if(this.text.match(/[A-Z][a-z]/)){ //tranditional capital
return true;}return false;}},{key:"is_acronym",value:function is_acronym(){if(this.text.match(/([A-Z]\.)+[A-Z]?$/)){return true;}return false;}},{key:"normalize",value:function normalize(){var str=this.text || '';str = str.toLowerCase();str = str.replace(/[,\.!:;\?\(\)]/,'');str = str.replace(/’/g,'\'');str = str.replace(/"/g,''); // coerce single curly quotes
str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g,'\''); // coerce double curly quotes
str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g,'"');if(!str.match(/[a-z0-9]/i)){return '';}this.normal = str;return this.normal;}},{key:"americanize",value:function americanize(){return _americanize(this.normal);}},{key:"britishize",value:function britishize(){return _britishize(this.normal);}},{key:"syllables",value:function syllables(){return _syllables(this.normal);}}]);return Term;})();module.exports = Term;},{"./americanize":34,"./britishize":35,"./syllables":50}],52:[function(require,module,exports){ //turn a verb into its other grammatical forms.
'use strict';var verb_to_doer=require('./to_doer');var verb_irregulars=require('./verb_irregulars');var verb_rules=require('./verb_rules');var predict=require('./predict_form.js'); //fallback to this transformation if it has an unknown prefix
var fallback=function fallback(w){var infinitive=undefined;if(w.length > 4){infinitive = w.replace(/ed$/,'');}else {infinitive = w.replace(/d$/,'');}var present=undefined,past=undefined,gerund=undefined,doer=undefined;if(w.match(/[^aeiou]$/)){gerund = w + 'ing';past = w + 'ed';if(w.match(/ss$/)){present = w + 'es'; //'passes'
}else {present = w + 's';}doer = verb_to_doer(infinitive);}else {gerund = w.replace(/[aeiou]$/,'ing');past = w.replace(/[aeiou]$/,'ed');present = w.replace(/[aeiou]$/,'es');doer = verb_to_doer(infinitive);}return {infinitive:infinitive,present:present,past:past,gerund:gerund,doer:doer,future:'will ' + infinitive};}; //make sure object has all forms
var fufill=function fufill(obj,prefix){if(!obj.infinitive){return obj;}if(!obj.gerund){obj.gerund = obj.infinitive + 'ing';}if(!obj.doer){obj.doer = verb_to_doer(obj.infinitive);}if(!obj.present){obj.present = obj.infinitive + 's';}if(!obj.past){obj.past = obj.infinitive + 'ed';} //add the prefix to all forms, if it exists
if(prefix){Object.keys(obj).forEach(function(k){obj[k] = prefix + obj[k];});} //future is 'will'+infinitive
if(!obj.future){obj.future = 'will ' + obj.infinitive;} //perfect is 'have'+past-tense
if(!obj.perfect){obj.perfect = 'have ' + obj.past;} //pluperfect is 'had'+past-tense
if(!obj.pluperfect){obj.pluperfect = 'had ' + obj.past;} //future perfect is 'will have'+past-tense
if(!obj.future_perfect){obj.future_perfect = 'will have ' + obj.past;}return obj;};var conjugate=function conjugate(w){if(w === undefined){return {};} //for phrasal verbs ('look out'), conjugate look, then append 'out'
var phrasal_reg=new RegExp('^(.*?) (in|out|on|off|behind|way|with|of|do|away|across|ahead|back|over|under|together|apart|up|upon|aback|down|about|before|after|around|to|forth|round|through|along|onto)$','i');if(w.match(' ') && w.match(phrasal_reg)){var _ret=(function(){var split=w.match(phrasal_reg,'');var phrasal_verb=split[1];var particle=split[2];var result=conjugate(phrasal_verb); //recursive
delete result['doer'];Object.keys(result).forEach(function(k){if(result[k]){result[k] += ' ' + particle;}});return {v:result};})();if(typeof _ret === "object")return _ret.v;} //for pluperfect ('had tried') remove 'had' and call it past-tense
if(w.match(/^had [a-z]/i)){w = w.replace(/^had /i,'');} //for perfect ('have tried') remove 'have' and call it past-tense
if(w.match(/^have [a-z]/i)){w = w.replace(/^have /i,'');} //for future perfect ('will have tried') remove 'will have' and call it past-tense
if(w.match(/^will have [a-z]/i)){w = w.replace(/^will have /i,'');} //chop it if it's future-tense
w = w.replace(/^will /i,''); //un-prefix the verb, and add it in later
var prefix=(w.match(/^(over|under|re|anti|full)\-?/i) || [])[0];var verb=w.replace(/^(over|under|re|anti|full)\-?/i,''); //check irregulars
var obj={};var l=verb_irregulars.length;for(var _i38=0;_i38 < l;_i38++) {var x=verb_irregulars[_i38];if(verb === x.present || verb === x.gerund || verb === x.past || verb === x.infinitive){obj = JSON.parse(JSON.stringify(verb_irregulars[_i38])); // object 'clone' hack, to avoid mem leak
return fufill(obj,prefix);}} //guess the tense, so we know which transormation to make
var predicted=predict(w) || 'infinitive'; //check against suffix rules
l = verb_rules[predicted].length;for(var _i39=0;_i39 < l;_i39++) {var r=verb_rules[predicted][_i39];if(w.match(r.reg)){obj[predicted] = w;var keys=Object.keys(r.repl);for(var o=0;o < keys.length;o++) {if(keys[o] === predicted){obj[keys[o]] = w;}else {obj[keys[o]] = w.replace(r.reg,r.repl[keys[o]]);}}return fufill(obj);}} //produce a generic transformation
return fallback(w);};module.exports = conjugate; // console.log(conjugate("walking"))
// console.log(conjugate("overtook"))
// console.log(conjugate("watch out"))
// console.log(conjugate("watch"))
// console.log(conjugate("smash"))
// console.log(conjugate("word"))
// // broken
// console.log(conjugate("read"))
// console.log(conjugate("free"))
// console.log(conjugate("flesh"))
// console.log(conjugate("branch"))
// console.log(conjugate("spred"))
// console.log(conjugate("bog"))
// console.log(conjugate("nod"))
// console.log(conjugate("had tried"))
// console.log(conjugate("have tried"))
},{"./predict_form.js":53,"./to_doer":55,"./verb_irregulars":56,"./verb_rules":57}],53:[function(require,module,exports){'use strict'; //this method is used to predict which current conjugation a verb is
//this method is the slowest in the whole library, basically TODO:whaaa
var suffix_rules=require('./suffix_rules');var fns=require('../../../fns.js'); //todo: support will/have/haven't etc
var predict=function predict(w){var arr=Object.keys(suffix_rules);for(var _i40=0;_i40 < arr.length;_i40++) {if(fns.endsWith(w,arr[_i40])){return suffix_rules[arr[_i40]];}}return 'infinitive';};module.exports = predict;},{"../../../fns.js":16,"./suffix_rules":54}],54:[function(require,module,exports){'use strict'; //generated from test data
var compact={'gerund':['ing'],'infinitive':['ate','ize','tion','rify','ress','ify','age','nce','ect','ise','ine','ish','ace','ash','ure','tch','end','ack','and','ute','ade','ock','ite','ase','ose','use','ive','int','nge','lay','est','ain','ant','eed','er','le'],'past':['ed','lt','nt','pt','ew','ld'],'present':['rks','cks','nks','ngs','mps','tes','zes','ers','les','acks','ends','ands','ocks','lays','eads','lls','els','ils','ows','nds','ays','ams','ars','ops','ffs','als','urs','lds','ews','ips','es','ts','ns','s']};var suffix_rules={};var keys=Object.keys(compact);var l=keys.length;var l2=undefined;for(var _i41=0;_i41 < l;_i41++) {l2 = compact[keys[_i41]].length;for(var o=0;o < l2;o++) {suffix_rules[compact[keys[_i41]][o]] = keys[_i41];}}module.exports = suffix_rules;},{}],55:[function(require,module,exports){ //somone who does this present-tense verb
//turn 'walk' into 'walker'
'use strict';var doer=function doer(str){str = str || '';var irregulars={'tie':'tier','dream':'dreamer','sail':'sailer','run':'runner','rub':'rubber','begin':'beginner','win':'winner','claim':'claimant','deal':'dealer','spin':'spinner'};var dont={'aid':1,'fail':1,'appear':1,'happen':1,'seem':1,'try':1,'say':1,'marry':1,'be':1,'forbid':1,'understand':1,'bet':1};var transforms=[{'reg':/e$/i,'repl':'er'},{'reg':/([aeiou])([mlgp])$/i,'repl':'$1$2$2er'},{'reg':/([rlf])y$/i,'repl':'$1ier'},{'reg':/^(.?.[aeiou])t$/i,'repl':'$1tter'}];if(dont.hasOwnProperty(str)){return null;}if(irregulars.hasOwnProperty(str)){return irregulars[str];}for(var _i42=0;_i42 < transforms.length;_i42++) {if(str.match(transforms[_i42].reg)){return str.replace(transforms[_i42].reg,transforms[_i42].repl);}}return str + 'er';}; // console.log(verb_to_doer('set'))
// console.log(verb_to_doer('sweep'))
// console.log(verb_to_doer('watch'))
module.exports = doer;},{}],56:[function(require,module,exports){'use strict';var types=['infinitive','gerund','past','present','doer','future']; //list of verb irregular verb forms, compacted to save space. ('_' -> infinitive )
var compact=[['arise','arising','arose','_s','_r'],['babysit','_ting','babysat','_s','_ter'],['be','_ing','was','is',''],['beat','_ing','_','_s','_er'],['become','becoming','became','_s','_r'],['bend','_ing','bent','_s','_er'],['begin','_ning','began','_s','_ner'],['bet','_ting','_','_s','_ter'],['bind','_ing','bound','_s','_er'],['bite','biting','bit','_s','_r'],['bleed','_ing','bled','_s','_er'],['blow','_ing','blew','_s','_er'],['break','_ing','broke','_s','_er'],['breed','_ing','bred','_s','_er'],['bring','_ing','brought','_s','_er'],['broadcast','_ing','_','_s','_er'],['build','_ing','built','_s','_er'],['buy','_ing','bought','_s','_er'],['catch','_ing','caught','_es','_er'],['choose','choosing','chose','_s','_r'],['come','coming','came','_s','_r'],['cost','_ing','_','_s','_er'],['cut','_ting','_','_s','_ter'],['deal','_ing','_t','_s','_er'],['dig','_ging','dug','_s','_ger'],['do','_ing','did','_es','_er'],['draw','_ing','drew','_s','_er'],['drink','_ing','drank','_s','_er'],['drive','driving','drove','_s','_r'],['eat','_ing','ate','_s','_er'],['fall','_ing','fell','_s','_er'],['feed','_ing','fed','_s','_er'],['feel','_ing','felt','_s','_er'],['fight','_ing','fought','_s','_er'],['find','_ing','found','_s','_er'],['fly','_ing','flew','_s','flier'],['forbid','_ing','forbade','_s'],['forget','_ing','forgot','_s','_er'],['forgive','forgiving','forgave','_s','_r'],['freeze','freezing','froze','_s','_r'],['get','_ting','got','_s','_ter'],['give','giving','gave','_s','_r'],['go','_ing','went','_es','_er'],['grow','_ing','grew','_s','_er'],['hang','_ing','hung','_s','_er'],['have','having','had','has'],['hear','_ing','_d','_s','_er'],['hide','hiding','hid','_s','_r'],['hit','_ting','_','_s','_ter'],['hold','_ing','held','_s','_er'],['hurt','_ing','_','_s','_er'],['know','_ing','knew','_s','_er'],['relay','_ing','_ed','_s','_er'],['lay','_ing','laid','_s','_er'],['lead','_ing','led','_s','_er'],['leave','leaving','left','_s','_r'],['lend','_ing','lent','_s','_er'],['let','_ting','_','_s','_ter'],['lie','lying','lay','_s','_r'],['light','_ing','lit','_s','_er'],['lose','losing','lost','_s','_r'],['make','making','made','_s','_r'],['mean','_ing','_t','_s','_er'],['meet','_ing','met','_s','_er'],['pay','_ing','paid','_s','_er'],['put','_ting','_','_s','_ter'],['quit','_ting','_','_s','_ter'],['read','_ing','_','_s','_er'],['ride','riding','rode','_s','_r'],['ring','_ing','rang','_s','_er'],['rise','rising','rose','_s','_r'],['run','_ning','ran','_s','_ner'],['say','_ing','said','_s'],['see','_ing','saw','_s','_r'],['sell','_ing','sold','_s','_er'],['send','_ing','sent','_s','_er'],['set','_ting','_','_s','_ter'],['shake','shaking','shook','_s','_r'],['shine','shining','shone','_s','_r'],['shoot','_ing','shot','_s','_er'],['show','_ing','_ed','_s','_er'],['shut','_ting','_','_s','_ter'],['sing','_ing','sang','_s','_er'],['sink','_ing','sank','_s','_er'],['sit','_ting','sat','_s','_ter'],['slide','sliding','slid','_s','_r'],['speak','_ing','spoke','_s','_er'],['spend','_ing','spent','_s','_er'],['spin','_ning','spun','_s','_ner'],['spread','_ing','_','_s','_er'],['stand','_ing','stood','_s','_er'],['steal','_ing','stole','_s','_er'],['stick','_ing','stuck','_s','_er'],['sting','_ing','stung','_s','_er'],['strike','striking','struck','_s','_r'],['swear','_ing','swore','_s','_er'],['swim','_ing','swam','_s','_mer'],['swing','_ing','swung','_s','_er'],['take','taking','took','_s','_r'],['teach','_ing','taught','_s','_er'],['tear','_ing','tore','_s','_er'],['tell','_ing','told','_s','_er'],['think','_ing','thought','_s','_er'],['throw','_ing','threw','_s','_er'],['understand','_ing','understood','_s'],['wake','waking','woke','_s','_r'],['wear','_ing','wore','_s','_er'],['win','_ning','won','_s','_ner'],['withdraw','_ing','withdrew','_s','_er'],['write','writing','wrote','_s','_r'],['tie','tying','_d','_s','_r'],['obey','_ing','_ed','_s','_er'],['ski','_ing','_ied','_s','_er'],['boil','_ing','_ed','_s','_er'],['miss','_ing','_ed','_','_er'],['act','_ing','_ed','_s','_or'],['compete','competing','_d','_s','competitor'],['being','are','were','are'],['imply','_ing','implied','implies','implier'],['ice','icing','_d','_s','_r'],['develop','_ing','_','_s','_er'],['wait','_ing','_ed','_s','_er'],['aim','_ing','_ed','_s','_er'],['spill','_ing','spilt','_s','_er'],['drop','_ping','_ped','_s','_per'],['head','_ing','_ed','_s','_er'],['log','_ging','_ged','_s','_ger'],['rub','_bing','_bed','_s','_ber'],['smash','_ing','_ed','_es','_er'],['add','_ing','_ed','_s','_er'],['word','_ing','_ed','_s','_er'],['suit','_ing','_ed','_s','_er'],['be','am','was','am',''],['load','_ing','_ed','_s','_er']]; //expand compact version out
module.exports = compact.map(function(arr){var obj={};for(var _i43=0;_i43 < arr.length;_i43++) {obj[types[_i43]] = arr[_i43].replace(/_/,arr[0]);}return obj;}); // console.log(JSON.stringify(verb_irregulars, null, 2));
},{}],57:[function(require,module,exports){ // regex rules for each part of speech that convert it to all other parts of speech.
// used in combination with the generic 'fallback' method
'use strict';var verb_rules={'infinitive':[['(eed)$',{'pr':'$1s','g':'$1ing','pa':'$1ed','do':'$1er'}],['(e)(ep)$',{'pr':'$1$2s','g':'$1$2ing','pa':'$1pt','do':'$1$2er'}],['(a[tg]|i[zn]|ur|nc|gl|is)e$',{'pr':'$1es','g':'$1ing','pa':'$1ed'}],['([i|f|rr])y$',{'pr':'$1ies','g':'$1ying','pa':'$1ied'}],['([td]er)$',{'pr':'$1s','g':'$1ing','pa':'$1ed'}],['([bd]l)e$',{'pr':'$1es','g':'$1ing','pa':'$1ed'}],['(ish|tch|ess)$',{'pr':'$1es','g':'$1ing','pa':'$1ed'}],['(ion|end|e[nc]t)$',{'pr':'$1s','g':'$1ing','pa':'$1ed'}],['(om)e$',{'pr':'$1es','g':'$1ing','pa':'ame'}],['([aeiu])([pt])$',{'pr':'$1$2s','g':'$1$2$2ing','pa':'$1$2'}],['(er)$',{'pr':'$1s','g':'$1ing','pa':'$1ed'}],['(en)$',{'pr':'$1s','g':'$1ing','pa':'$1ed'}]],'present':[['(ies)$',{'in':'y','g':'ying','pa':'ied'}],['(tch|sh)es$',{'in':'$1','g':'$1ing','pa':'$1ed'}],['(ss)es$',{'in':'$1','g':'$1ing','pa':'$1ed'}],['([tzlshicgrvdnkmu])es$',{'in':'$1e','g':'$1ing','pa':'$1ed'}],['(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$',{'in':'$1','g':'$1ing','pa':'$1ed'}],['(ow)s$',{'in':'$1','g':'$1ing','pa':'ew'}],['(op)s$',{'in':'$1','g':'$1ping','pa':'$1ped'}],['([eirs])ts$',{'in':'$1t','g':'$1tting','pa':'$1tted'}],['(ll)s$',{'in':'$1','g':'$1ing','pa':'$1ed'}],['(el)s$',{'in':'$1','g':'$1ling','pa':'$1led'}],['(ip)es$',{'in':'$1e','g':'$1ing','pa':'$1ed'}],['ss$',{'in':'ss','g':'ssing','pa':'ssed'}],['s$',{'in':'','g':'ing','pa':'ed'}]],'gerund':[['pping$',{'in':'p','pr':'ps','pa':'pped'}],['lling$',{'in':'ll','pr':'lls','pa':'lled'}],['tting$',{'in':'t','pr':'ts','pa':'t'}],['ssing$',{'in':'ss','pr':'sses','pa':'ssed'}],['gging$',{'in':'g','pr':'gs','pa':'gged'}],['([^aeiou])ying$',{'in':'$1y','pr':'$1ies','pa':'$1ied','do':'$1ier'}],['(i.)ing$',{'in':'$1e','pr':'$1es','pa':'$1ed'}],['(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$',{'in':'$1e','pr':'$1es','pa':'$1ed'}],['(ch|sh)ing$',{'in':'$1','pr':'$1es','pa':'$1ed'}],['(..)ing$',{'in':'$1','pr':'$1s','pa':'$1ed'}]],'past':[['(ued)$',{'pr':'ues','g':'uing','pa':'ued','do':'uer'}],['(e|i)lled$',{'pr':'$1lls','g':'$1lling','pa':'$1lled','do':'$1ller'}],['(sh|ch)ed$',{'in':'$1','pr':'$1es','g':'$1ing','do':'$1er'}],['(tl|gl)ed$',{'in':'$1e','pr':'$1es','g':'$1ing','do':'$1er'}],['(ss)ed$',{'in':'$1','pr':'$1es','g':'$1ing','do':'$1er'}],['pped$',{'in':'p','pr':'ps','g':'pping','do':'pper'}],['tted$',{'in':'t','pr':'ts','g':'tting','do':'tter'}],['gged$',{'in':'g','pr':'gs','g':'gging','do':'gger'}],['(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$',{'in':'$1','pr':'$1s','g':'$1ing','do':'$1er'}],['(..[^aeiou])ed$',{'in':'$1e','pr':'$1es','g':'$1ing','do':'$1er'}],['ied$',{'in':'y','pr':'ies','g':'ying','do':'ier'}],['(.o)ed$',{'in':'$1o','pr':'$1os','g':'$1oing','do':'$1oer'}],['(.i)ed$',{'in':'$1','pr':'$1s','g':'$1ing','do':'$1er'}],['([rl])ew$',{'in':'$1ow','pr':'$1ows','g':'$1owing'}],['([pl])t$',{'in':'$1t','pr':'$1ts','g':'$1ting'}]]}; //unpack compressed form
verb_rules = Object.keys(verb_rules).reduce(function(h,k){h[k] = verb_rules[k].map(function(a){var obj={reg:new RegExp(a[0],'i'),repl:{infinitive:a[1]['in'],present:a[1]['pr'],past:a[1]['pa'],gerund:a[1]['g']}};if(a[1]['do']){obj.repl.doer = a[1]['do'];}return obj;});return h;},{});module.exports = verb_rules; // console.log(JSON.stringify(verb_rules, null, 2));
},{}],58:[function(require,module,exports){'use strict'; //recieves a verb object, and returns a negated string
//sort out don't/didn't/doesn't/won't
var negate=function negate(v){var exceptions={'is':'isn\'t','are':'aren\'t','was':'wasn\'t','will':'won\'t', //modals
'did':'didn\'t','would':'wouldn\'t','could':'couldn\'t','should':'shouldn\'t','can':'can\'t','must':'mustn\'t','have':'hasn\'t','does':'doesn\'t', //un-negate?
'didn\'t':'did','doesn\'t':'does','wouldn\'t':'would','couldn\'t':'could','shouldn\'t':'should','can\'t':'can','won\'t':'will','mustn\'t':'must','shan\'t':'shall','shant':'shall','not':'','don\'t':''}; //hard-coded exceptions
if(exceptions[v.normal]){return exceptions[v.normal];} //multiple-word verbs, like 'have walked'
var words=v.normal.split(' ');if(words.length > 1 && exceptions[words[0]]){return exceptions[words[0]] + words.slice(1,words.length).join(' ');} //walked -> didn't walk
if(v.form() === 'past'){return 'didn\'t ' + v.conjugate()['infinitive'];} //walks -> doesn't walk
if(v.form() === 'present'){return 'doesn\'t ' + v.conjugate()['infinitive'];} //walking -> not walking
if(v.form() === 'gerund'){return 'not ' + v.text;} //walker -> non-walker ?
if(v.form() === 'doer'){return 'non-' + v.text;} //walk -> not walk ?
if(v.form() === 'infinitive'){return 'not ' + v.text;}return v.text;};module.exports = negate;},{}],59:[function(require,module,exports){'use strict';var Term=require('../term.js');var _conjugate=require('./conjugate/conjugate.js');var predict_form=require('./conjugate/predict_form.js');var _negate=require('./negate.js');var allowed_forms={infinitive:1,present:1,past:1,gerund:1,doer:1,future:1};var Verb=(function(_Term4){_inherits(Verb,_Term4);function Verb(str,form){_classCallCheck(this,Verb);_get(Object.getPrototypeOf(Verb.prototype),"constructor",this).call(this,str);this.parent = 'verb';this.conjugations = {}; //cached conjugations
//if we've been told which
if(form && allowed_forms[form]){this._form = form;this.conjugations[form] = this.normal;}else {this.form();}} // let v = new Verb("walk", "asdf")
// console.log(v.form())
//which current conjugation form it is
_createClass(Verb,[{key:"form",value:function form(){ //if we haven't been told
if(!this._form){this._form = predict_form(this.normal);} //else, predict it
return this._form;} //retrieve a specific form
},{key:"conjugation",value:function conjugation(type){type = type || 'infinitive'; //check cached conjugations
if(this.conjugations[type] === undefined){this.conjugate();}}},{key:"conjugate",value:function conjugate(){this.conjugations = _conjugate(this.normal);return this.conjugations;}},{key:"to_past",value:function to_past(){var tense='past';if(!this.conjugations[tense]){this.conjugate(this.normal);}this._form = tense;this.changeTo(this.conjugations[tense]);return this.conjugations[tense];}},{key:"to_present",value:function to_present(){var tense='present';if(!this.conjugations[tense]){this.conjugate(this.normal);}this._form = tense;this.changeTo(this.conjugations[tense]);return this.conjugations[tense];}},{key:"to_future",value:function to_future(){var tense='future';if(!this.conjugations[tense]){this.conjugate(this.normal);}this._form = tense;this.changeTo(this.conjugations[tense]);return this.conjugations[tense];} //is this verb negative already?
},{key:"isNegative",value:function isNegative(){var str=this.normal;if(str.match(/(n't|\bnot\b)/)){return true;}return false;}},{key:"negate",value:function negate(){if(this.isNegative()){return this.text;}this.changeTo(_negate(this));return this.text;}}]);return Verb;})(Term);module.exports = Verb;},{"../term.js":51,"./conjugate/conjugate.js":52,"./conjugate/predict_form.js":53,"./negate.js":58}],60:[function(require,module,exports){'use strict'; //split a string into all possible parts
var fns=require('../fns.js'); //n-gram takes a list of pre-cleaned terms, and makes no assumptions
var ngram=function ngram(terms,options){options = options || {};var min_count=options.min_count || 1; // minimum hit-count
var max_size=options.max_size || 5; // maximum gram count
var keys=[null];var results=[]; //prepare the keys object
for(var _i44=1;_i44 <= max_size;_i44++) {keys.push({});} // Create a hash for counting..
var textlen=terms.length;for(var _i45=0;_i45 < textlen;_i45++) {var s=terms[_i45];keys[1][s] = (keys[1][s] || 0) + 1;for(var j=2;j <= max_size;j++) {if(_i45 + j <= textlen){s += ' ' + terms[_i45 + j - 1];keys[j][s] = (keys[j][s] || 0) + 1;}else {break;}}} // map the hash to an array for sorting
for(var k=1;k < max_size;k++) {results[k] = [];var key=keys[k];var words=Object.keys(keys[k]);for(var _i46=0;_i46 < words.length;_i46++) {var word=words[_i46];if(key[word] >= min_count){results[k].push({'word':word,'count':key[word],'size':k});}}} //post-process + sort
results = fns.compact(results);results = results.map(function(r){r = r.sort(function(a,b){return b.count - a.count;});return r;});return results;}; // console.log(ngram("hi dr nick! dr nick!".split(" ")))
module.exports = ngram;},{"../fns.js":16}],61:[function(require,module,exports){ //(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2015 MIT
'use strict';var abbreviations=require('../data/abbreviations');var sentence_parser=function sentence_parser(text){var sentences=[]; //first do a greedy-split..
var chunks=text.split(/(\S.+?[.\?!])(?=\s+|$|")/g); //date abbrevs.
//these are added seperately because they are not nouns
abbreviations = abbreviations.concat(['jan','feb','mar','apr','jun','jul','aug','sep','oct','nov','dec','sept','sep']); //misc non-noun abbreviations
abbreviations = abbreviations.concat(['ex','eg','ie','circa','ca','cca','vs','etc','esp','ft','bc','ad']); //detection of non-sentence chunks
var abbrev_reg=new RegExp('\\b(' + abbreviations.join('|') + ')[.!?] ?$','i');var acronym_reg=new RegExp('[ |\.][A-Z]\.?$','i');var elipses_reg=new RegExp('\\.\\.\\.*$'); //loop through these chunks, and join the non-sentence chunks back together..
var chunks_length=chunks.length;for(var _i47=0;_i47 < chunks_length;_i47++) {if(chunks[_i47]){ //trim whitespace
chunks[_i47] = chunks[_i47].replace(/^\s+|\s+$/g,''); //should this chunk be combined with the next one?
if(chunks[_i47 + 1] && chunks[_i47].match(abbrev_reg) || chunks[_i47].match(acronym_reg) || chunks[_i47].match(elipses_reg)){chunks[_i47 + 1] = ((chunks[_i47] || '') + ' ' + (chunks[_i47 + 1] || '')).replace(/ +/g,' ');}else if(chunks[_i47] && chunks[_i47].length > 0){ //this chunk is a proper sentence..
sentences.push(chunks[_i47]);chunks[_i47] = '';}}} //if we never got a sentence, return the given text
if(sentences.length === 0){return [text];}return sentences;};module.exports = sentence_parser;},{"../data/abbreviations":3}],62:[function(require,module,exports){'use strict';var sentence_parser=require('./sentence_parser.js');var Sentence=require('../sentence/sentence.js');var _ngram=require('./ngram.js');var fns=require('../fns.js'); //a text object is a series of sentences, along with the generic methods for transforming them
var Text=(function(){function Text(str){_classCallCheck(this,Text);this.str = str || '';this.sentences = sentence_parser(str).map(function(s){return new Sentence(s);});} //Text methods
_createClass(Text,[{key:"ngram",value:function ngram(){var terms=this.terms();terms = terms.map(function(t){return t.normal;});return _ngram(terms);} //map over sentence methods
},{key:"text",value:function text(){var arr=this.sentences.map(function(s){return s.text();});return fns.flatten(arr).join(' ');}},{key:"terms",value:function terms(){var arr=this.sentences.map(function(s){return s.terms;});return fns.flatten(arr);}},{key:"normalised",value:function normalised(){var arr=this.sentences.map(function(s){return s.normalized();});return fns.flatten(arr).join(' ');}},{key:"tags",value:function tags(){return this.sentences.map(function(s){return s.tags();});}},{key:"to_past",value:function to_past(){return this.sentences.map(function(s){return s.to_past();});}},{key:"to_present",value:function to_present(){return this.sentences.map(function(s){return s.to_present();});}},{key:"to_future",value:function to_future(){return this.sentences.map(function(s){return s.to_future();});}}]);return Text;})();module.exports = Text;},{"../fns.js":16,"../sentence/sentence.js":25,"./ngram.js":60,"./sentence_parser.js":61}]},{},[17]);
//# sourceMappingURL=nlp_compromise.es5.js.map
