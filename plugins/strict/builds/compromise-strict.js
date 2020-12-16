/* compromise-strict 0.0.2 GPLv3 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseStrict = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  // needs a separate module as this is required inside chevrotain productive code
  // and also in the entry point for webpack(api.ts).
  // A separate file avoids cyclic dependencies and webpack errors.
  var VERSION = "7.0.3";

  /*
   Utils using lodash style API. (not necessarily 100% compliant) for functional and other utils.
   These utils should replace usage of lodash in the production code base. not because they are any better...
   but for the purpose of being a dependency free library.

   The hotspots in the code are already written in imperative style for performance reasons.
   so writing several dozen utils which may be slower than the original lodash, does not matter as much
   considering they will not be invoked in hotspots...
   */
  function isEmpty(arr) {
    return arr && arr.length === 0;
  }
  function keys(obj) {
    if (obj === undefined || obj === null) {
      return [];
    }

    return Object.keys(obj);
  }
  function values(obj) {
    var vals = [];
    var keys = Object.keys(obj);

    for (var i = 0; i < keys.length; i++) {
      vals.push(obj[keys[i]]);
    }

    return vals;
  }
  function mapValues(obj, callback) {
    var result = [];
    var objKeys = keys(obj);

    for (var idx = 0; idx < objKeys.length; idx++) {
      var currKey = objKeys[idx];
      result.push(callback.call(null, obj[currKey], currKey));
    }

    return result;
  }
  function map(arr, callback) {
    var result = [];

    for (var idx = 0; idx < arr.length; idx++) {
      result.push(callback.call(null, arr[idx], idx));
    }

    return result;
  }
  function flatten(arr) {
    var result = [];

    for (var idx = 0; idx < arr.length; idx++) {
      var currItem = arr[idx];

      if (Array.isArray(currItem)) {
        result = result.concat(flatten(currItem));
      } else {
        result.push(currItem);
      }
    }

    return result;
  }
  function first(arr) {
    return isEmpty(arr) ? undefined : arr[0];
  }
  function last(arr) {
    var len = arr && arr.length;
    return len ? arr[len - 1] : undefined;
  }
  function forEach(collection, iteratorCallback) {
    /* istanbul ignore else */
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iteratorCallback.call(null, collection[i], i);
      }
    } else if (isObject(collection)) {
      var colKeys = keys(collection);

      for (var i = 0; i < colKeys.length; i++) {
        var key = colKeys[i];
        var value = collection[key];
        iteratorCallback.call(null, value, key);
      }
    } else {
      throw Error("non exhaustive match");
    }
  }
  function isString(item) {
    return typeof item === "string";
  }
  function isUndefined(item) {
    return item === undefined;
  }
  function isFunction(item) {
    return item instanceof Function;
  }
  function drop(arr, howMuch) {
    if (howMuch === void 0) {
      howMuch = 1;
    }

    return arr.slice(howMuch, arr.length);
  }
  function dropRight(arr, howMuch) {
    if (howMuch === void 0) {
      howMuch = 1;
    }

    return arr.slice(0, arr.length - howMuch);
  }
  function filter(arr, predicate) {
    var result = [];

    if (Array.isArray(arr)) {
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];

        if (predicate.call(null, item)) {
          result.push(item);
        }
      }
    }

    return result;
  }
  function reject(arr, predicate) {
    return filter(arr, function (item) {
      return !predicate(item);
    });
  }
  function pick(obj, predicate) {
    var keys = Object.keys(obj);
    var result = {};

    for (var i = 0; i < keys.length; i++) {
      var currKey = keys[i];
      var currItem = obj[currKey];

      if (predicate(currItem)) {
        result[currKey] = currItem;
      }
    }

    return result;
  }
  function has(obj, prop) {
    if (isObject(obj)) {
      return obj.hasOwnProperty(prop);
    }

    return false;
  }
  function contains(arr, item) {
    return find(arr, function (currItem) {
      return currItem === item;
    }) !== undefined ? true : false;
  }
  /**
   * shallow clone
   */

  function cloneArr(arr) {
    var newArr = [];

    for (var i = 0; i < arr.length; i++) {
      newArr.push(arr[i]);
    }

    return newArr;
  }
  /**
   * shallow clone
   */

  function cloneObj(obj) {
    var clonedObj = {};

    for (var key in obj) {
      /* istanbul ignore else */
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = obj[key];
      }
    }

    return clonedObj;
  }
  function find(arr, predicate) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];

      if (predicate.call(null, item)) {
        return item;
      }
    }

    return undefined;
  }
  function findAll(arr, predicate) {
    var found = [];

    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];

      if (predicate.call(null, item)) {
        found.push(item);
      }
    }

    return found;
  }
  function reduce(arrOrObj, iterator, initial) {
    var isArr = Array.isArray(arrOrObj);
    var vals = isArr ? arrOrObj : values(arrOrObj);
    var objKeys = isArr ? [] : keys(arrOrObj);
    var accumulator = initial;

    for (var i = 0; i < vals.length; i++) {
      accumulator = iterator.call(null, accumulator, vals[i], isArr ? i : objKeys[i]);
    }

    return accumulator;
  }
  function compact(arr) {
    return reject(arr, function (item) {
      return item === null || item === undefined;
    });
  }
  function uniq(arr, identity) {
    if (identity === void 0) {
      identity = function identity(item) {
        return item;
      };
    }

    var identities = [];
    return reduce(arr, function (result, currItem) {
      var currIdentity = identity(currItem);

      if (contains(identities, currIdentity)) {
        return result;
      } else {
        identities.push(currIdentity);
        return result.concat(currItem);
      }
    }, []);
  }
  function isArray(obj) {
    return Array.isArray(obj);
  }
  function isRegExp(obj) {
    return obj instanceof RegExp;
  }
  function isObject(obj) {
    return obj instanceof Object;
  }
  function every(arr, predicate) {
    for (var i = 0; i < arr.length; i++) {
      if (!predicate(arr[i], i)) {
        return false;
      }
    }

    return true;
  }
  function difference(arr, values) {
    return reject(arr, function (item) {
      return contains(values, item);
    });
  }
  function some(arr, predicate) {
    for (var i = 0; i < arr.length; i++) {
      if (predicate(arr[i])) {
        return true;
      }
    }

    return false;
  }
  function indexOf(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        return i;
      }
    }

    return -1;
  }
  /**
   * mutates! (and returns) target
   */

  function assign(target) {
    var sources = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      sources[_i - 1] = arguments[_i];
    }

    for (var i = 0; i < sources.length; i++) {
      var curSource = sources[i];
      var currSourceKeys = keys(curSource);

      for (var j = 0; j < currSourceKeys.length; j++) {
        var currKey = currSourceKeys[j];
        target[currKey] = curSource[currKey];
      }
    }

    return target;
  }
  /**
   * mutates! (and returns) target
   */

  function assignNoOverwrite(target) {
    var sources = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      sources[_i - 1] = arguments[_i];
    }

    for (var i = 0; i < sources.length; i++) {
      var curSource = sources[i];
      var currSourceKeys = keys(curSource);

      for (var j = 0; j < currSourceKeys.length; j++) {
        var currKey = currSourceKeys[j];

        if (!has(target, currKey)) {
          target[currKey] = curSource[currKey];
        }
      }
    }

    return target;
  }
  function defaults() {
    var sources = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      sources[_i] = arguments[_i];
    }

    return assignNoOverwrite.apply(null, [{}].concat(sources));
  }
  function groupBy(arr, groupKeyFunc) {
    var result = {};
    forEach(arr, function (item) {
      var currGroupKey = groupKeyFunc(item);
      var currGroupArr = result[currGroupKey];

      if (currGroupArr) {
        currGroupArr.push(item);
      } else {
        result[currGroupKey] = [item];
      }
    });
    return result;
  }
  /**
   * Merge obj2 into obj1.
   * Will overwrite existing properties with the same name
   */

  function merge(obj1, obj2) {
    var result = cloneObj(obj1);
    var keys2 = keys(obj2);

    for (var i = 0; i < keys2.length; i++) {
      var key = keys2[i];
      var value = obj2[key];
      result[key] = value;
    }

    return result;
  }
  function NOOP() {}
  function IDENTITY(item) {
    return item;
  }
  /**
   * Will return a new packed array with same values.
   */

  function packArray(holeyArr) {
    var result = [];

    for (var i = 0; i < holeyArr.length; i++) {
      var orgValue = holeyArr[i];
      result.push(orgValue !== undefined ? orgValue : undefined);
    }

    return result;
  }
  function PRINT_ERROR(msg) {
    /* istanbul ignore else - can't override global.console in node.js */
    if (console && console.error) {
      console.error("Error: " + msg);
    }
  }
  function PRINT_WARNING(msg) {
    /* istanbul ignore else - can't override global.console in node.js*/
    if (console && console.warn) {
      // TODO: modify docs accordingly
      console.warn("Warning: " + msg);
    }
  }
  function isES2015MapSupported() {
    return typeof Map === "function";
  }
  function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
      var baseProto = baseCtor.prototype;
      Object.getOwnPropertyNames(baseProto).forEach(function (propName) {
        if (propName === "constructor") {
          return;
        }

        var basePropDescriptor = Object.getOwnPropertyDescriptor(baseProto, propName); // Handle Accessors

        if (basePropDescriptor && (basePropDescriptor.get || basePropDescriptor.set)) {
          Object.defineProperty(derivedCtor.prototype, propName, basePropDescriptor);
        } else {
          derivedCtor.prototype[propName] = baseCtor.prototype[propName];
        }
      });
    });
  } // base on: https://github.com/petkaantonov/bluebird/blob/b97c0d2d487e8c5076e8bd897e0dcd4622d31846/src/util.js#L201-L216

  function toFastProperties(toBecomeFast) {
    function FakeConstructor() {} // If our object is used as a constructor it would receive


    FakeConstructor.prototype = toBecomeFast;
    var fakeInstance = new FakeConstructor();

    function fakeAccess() {
      return _typeof(fakeInstance.bar);
    } // help V8 understand this is a "real" prototype by actually using
    // the fake instance.


    fakeAccess();
    fakeAccess();
    return toBecomeFast; // Eval prevents optimization of this method (even though this is dead code)
  }
  function peek(arr) {
    return arr[arr.length - 1];
  }
  /* istanbul ignore next - for performance tracing*/

  function timer(func) {
    var start = new Date().getTime();
    var val = func();
    var end = new Date().getTime();
    var total = end - start;
    return {
      time: total,
      value: val
    };
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getAugmentedNamespace(n) {
  	if (n.__esModule) return n;
  	var a = Object.defineProperty({}, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
  }

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var regexpToAst = createCommonjsModule(function (module) {

    (function (root, factory) {
      // istanbul ignore next
      if ( module.exports) {
        module.exports = factory();
      } else {
        // istanbul ignore next
        root.regexpToAst = factory();
      }
    })(typeof self !== "undefined" ? // istanbul ignore next
    self : commonjsGlobal, function () {
      // references
      // https://hackernoon.com/the-madness-of-parsing-real-world-javascript-regexps-d9ee336df983
      // https://www.ecma-international.org/ecma-262/8.0/index.html#prod-Pattern
      function RegExpParser() {}

      RegExpParser.prototype.saveState = function () {
        return {
          idx: this.idx,
          input: this.input,
          groupIdx: this.groupIdx
        };
      };

      RegExpParser.prototype.restoreState = function (newState) {
        this.idx = newState.idx;
        this.input = newState.input;
        this.groupIdx = newState.groupIdx;
      };

      RegExpParser.prototype.pattern = function (input) {
        // parser state
        this.idx = 0;
        this.input = input;
        this.groupIdx = 0;
        this.consumeChar("/");
        var value = this.disjunction();
        this.consumeChar("/");
        var flags = {
          type: "Flags",
          loc: {
            begin: this.idx,
            end: input.length
          },
          global: false,
          ignoreCase: false,
          multiLine: false,
          unicode: false,
          sticky: false
        };

        while (this.isRegExpFlag()) {
          switch (this.popChar()) {
            case "g":
              addFlag(flags, "global");
              break;

            case "i":
              addFlag(flags, "ignoreCase");
              break;

            case "m":
              addFlag(flags, "multiLine");
              break;

            case "u":
              addFlag(flags, "unicode");
              break;

            case "y":
              addFlag(flags, "sticky");
              break;
          }
        }

        if (this.idx !== this.input.length) {
          throw Error("Redundant input: " + this.input.substring(this.idx));
        }

        return {
          type: "Pattern",
          flags: flags,
          value: value,
          loc: this.loc(0)
        };
      };

      RegExpParser.prototype.disjunction = function () {
        var alts = [];
        var begin = this.idx;
        alts.push(this.alternative());

        while (this.peekChar() === "|") {
          this.consumeChar("|");
          alts.push(this.alternative());
        }

        return {
          type: "Disjunction",
          value: alts,
          loc: this.loc(begin)
        };
      };

      RegExpParser.prototype.alternative = function () {
        var terms = [];
        var begin = this.idx;

        while (this.isTerm()) {
          terms.push(this.term());
        }

        return {
          type: "Alternative",
          value: terms,
          loc: this.loc(begin)
        };
      };

      RegExpParser.prototype.term = function () {
        if (this.isAssertion()) {
          return this.assertion();
        } else {
          return this.atom();
        }
      };

      RegExpParser.prototype.assertion = function () {
        var begin = this.idx;

        switch (this.popChar()) {
          case "^":
            return {
              type: "StartAnchor",
              loc: this.loc(begin)
            };

          case "$":
            return {
              type: "EndAnchor",
              loc: this.loc(begin)
            };
          // '\b' or '\B'

          case "\\":
            switch (this.popChar()) {
              case "b":
                return {
                  type: "WordBoundary",
                  loc: this.loc(begin)
                };

              case "B":
                return {
                  type: "NonWordBoundary",
                  loc: this.loc(begin)
                };
            } // istanbul ignore next


            throw Error("Invalid Assertion Escape");
          // '(?=' or '(?!'

          case "(":
            this.consumeChar("?");
            var type;

            switch (this.popChar()) {
              case "=":
                type = "Lookahead";
                break;

              case "!":
                type = "NegativeLookahead";
                break;
            }

            ASSERT_EXISTS(type);
            var disjunction = this.disjunction();
            this.consumeChar(")");
            return {
              type: type,
              value: disjunction,
              loc: this.loc(begin)
            };
        } // istanbul ignore next


        ASSERT_NEVER_REACH_HERE();
      };

      RegExpParser.prototype.quantifier = function (isBacktracking) {
        var range;
        var begin = this.idx;

        switch (this.popChar()) {
          case "*":
            range = {
              atLeast: 0,
              atMost: Infinity
            };
            break;

          case "+":
            range = {
              atLeast: 1,
              atMost: Infinity
            };
            break;

          case "?":
            range = {
              atLeast: 0,
              atMost: 1
            };
            break;

          case "{":
            var atLeast = this.integerIncludingZero();

            switch (this.popChar()) {
              case "}":
                range = {
                  atLeast: atLeast,
                  atMost: atLeast
                };
                break;

              case ",":
                var atMost;

                if (this.isDigit()) {
                  atMost = this.integerIncludingZero();
                  range = {
                    atLeast: atLeast,
                    atMost: atMost
                  };
                } else {
                  range = {
                    atLeast: atLeast,
                    atMost: Infinity
                  };
                }

                this.consumeChar("}");
                break;
            } // throwing exceptions from "ASSERT_EXISTS" during backtracking
            // causes severe performance degradations


            if (isBacktracking === true && range === undefined) {
              return undefined;
            }

            ASSERT_EXISTS(range);
            break;
        } // throwing exceptions from "ASSERT_EXISTS" during backtracking
        // causes severe performance degradations


        if (isBacktracking === true && range === undefined) {
          return undefined;
        }

        ASSERT_EXISTS(range);

        if (this.peekChar(0) === "?") {
          this.consumeChar("?");
          range.greedy = false;
        } else {
          range.greedy = true;
        }

        range.type = "Quantifier";
        range.loc = this.loc(begin);
        return range;
      };

      RegExpParser.prototype.atom = function () {
        var atom;
        var begin = this.idx;

        switch (this.peekChar()) {
          case ".":
            atom = this.dotAll();
            break;

          case "\\":
            atom = this.atomEscape();
            break;

          case "[":
            atom = this.characterClass();
            break;

          case "(":
            atom = this.group();
            break;
        }

        if (atom === undefined && this.isPatternCharacter()) {
          atom = this.patternCharacter();
        }

        ASSERT_EXISTS(atom);
        atom.loc = this.loc(begin);

        if (this.isQuantifier()) {
          atom.quantifier = this.quantifier();
        }

        return atom;
      };

      RegExpParser.prototype.dotAll = function () {
        this.consumeChar(".");
        return {
          type: "Set",
          complement: true,
          value: [cc("\n"), cc("\r"), cc("\u2028"), cc("\u2029")]
        };
      };

      RegExpParser.prototype.atomEscape = function () {
        this.consumeChar("\\");

        switch (this.peekChar()) {
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            return this.decimalEscapeAtom();

          case "d":
          case "D":
          case "s":
          case "S":
          case "w":
          case "W":
            return this.characterClassEscape();

          case "f":
          case "n":
          case "r":
          case "t":
          case "v":
            return this.controlEscapeAtom();

          case "c":
            return this.controlLetterEscapeAtom();

          case "0":
            return this.nulCharacterAtom();

          case "x":
            return this.hexEscapeSequenceAtom();

          case "u":
            return this.regExpUnicodeEscapeSequenceAtom();

          default:
            return this.identityEscapeAtom();
        }
      };

      RegExpParser.prototype.decimalEscapeAtom = function () {
        var value = this.positiveInteger();
        return {
          type: "GroupBackReference",
          value: value
        };
      };

      RegExpParser.prototype.characterClassEscape = function () {
        var set;
        var complement = false;

        switch (this.popChar()) {
          case "d":
            set = digitsCharCodes;
            break;

          case "D":
            set = digitsCharCodes;
            complement = true;
            break;

          case "s":
            set = whitespaceCodes;
            break;

          case "S":
            set = whitespaceCodes;
            complement = true;
            break;

          case "w":
            set = wordCharCodes;
            break;

          case "W":
            set = wordCharCodes;
            complement = true;
            break;
        }

        ASSERT_EXISTS(set);
        return {
          type: "Set",
          value: set,
          complement: complement
        };
      };

      RegExpParser.prototype.controlEscapeAtom = function () {
        var escapeCode;

        switch (this.popChar()) {
          case "f":
            escapeCode = cc("\f");
            break;

          case "n":
            escapeCode = cc("\n");
            break;

          case "r":
            escapeCode = cc("\r");
            break;

          case "t":
            escapeCode = cc("\t");
            break;

          case "v":
            escapeCode = cc("\v");
            break;
        }

        ASSERT_EXISTS(escapeCode);
        return {
          type: "Character",
          value: escapeCode
        };
      };

      RegExpParser.prototype.controlLetterEscapeAtom = function () {
        this.consumeChar("c");
        var letter = this.popChar();

        if (/[a-zA-Z]/.test(letter) === false) {
          throw Error("Invalid ");
        }

        var letterCode = letter.toUpperCase().charCodeAt(0) - 64;
        return {
          type: "Character",
          value: letterCode
        };
      };

      RegExpParser.prototype.nulCharacterAtom = function () {
        // TODO implement '[lookahead ∉ DecimalDigit]'
        // TODO: for the deprecated octal escape sequence
        this.consumeChar("0");
        return {
          type: "Character",
          value: cc("\0")
        };
      };

      RegExpParser.prototype.hexEscapeSequenceAtom = function () {
        this.consumeChar("x");
        return this.parseHexDigits(2);
      };

      RegExpParser.prototype.regExpUnicodeEscapeSequenceAtom = function () {
        this.consumeChar("u");
        return this.parseHexDigits(4);
      };

      RegExpParser.prototype.identityEscapeAtom = function () {
        // TODO: implement "SourceCharacter but not UnicodeIDContinue"
        // // http://unicode.org/reports/tr31/#Specific_Character_Adjustments
        var escapedChar = this.popChar();
        return {
          type: "Character",
          value: cc(escapedChar)
        };
      };

      RegExpParser.prototype.classPatternCharacterAtom = function () {
        switch (this.peekChar()) {
          // istanbul ignore next
          case "\n": // istanbul ignore next

          case "\r": // istanbul ignore next

          case "\u2028": // istanbul ignore next

          case "\u2029": // istanbul ignore next

          case "\\": // istanbul ignore next

          case "]":
            throw Error("TBD");

          default:
            var nextChar = this.popChar();
            return {
              type: "Character",
              value: cc(nextChar)
            };
        }
      };

      RegExpParser.prototype.characterClass = function () {
        var set = [];
        var complement = false;
        this.consumeChar("[");

        if (this.peekChar(0) === "^") {
          this.consumeChar("^");
          complement = true;
        }

        while (this.isClassAtom()) {
          var from = this.classAtom();
          var isFromSingleChar = from.type === "Character";

          if (isFromSingleChar && this.isRangeDash()) {
            this.consumeChar("-");
            var to = this.classAtom();
            var isToSingleChar = to.type === "Character"; // a range can only be used when both sides are single characters

            if (isToSingleChar) {
              if (to.value < from.value) {
                throw Error("Range out of order in character class");
              }

              set.push({
                from: from.value,
                to: to.value
              });
            } else {
              // literal dash
              insertToSet(from.value, set);
              set.push(cc("-"));
              insertToSet(to.value, set);
            }
          } else {
            insertToSet(from.value, set);
          }
        }

        this.consumeChar("]");
        return {
          type: "Set",
          complement: complement,
          value: set
        };
      };

      RegExpParser.prototype.classAtom = function () {
        switch (this.peekChar()) {
          // istanbul ignore next
          case "]": // istanbul ignore next

          case "\n": // istanbul ignore next

          case "\r": // istanbul ignore next

          case "\u2028": // istanbul ignore next

          case "\u2029":
            throw Error("TBD");

          case "\\":
            return this.classEscape();

          default:
            return this.classPatternCharacterAtom();
        }
      };

      RegExpParser.prototype.classEscape = function () {
        this.consumeChar("\\");

        switch (this.peekChar()) {
          // Matches a backspace.
          // (Not to be confused with \b word boundary outside characterClass)
          case "b":
            this.consumeChar("b");
            return {
              type: "Character",
              value: cc("\b")
            };

          case "d":
          case "D":
          case "s":
          case "S":
          case "w":
          case "W":
            return this.characterClassEscape();

          case "f":
          case "n":
          case "r":
          case "t":
          case "v":
            return this.controlEscapeAtom();

          case "c":
            return this.controlLetterEscapeAtom();

          case "0":
            return this.nulCharacterAtom();

          case "x":
            return this.hexEscapeSequenceAtom();

          case "u":
            return this.regExpUnicodeEscapeSequenceAtom();

          default:
            return this.identityEscapeAtom();
        }
      };

      RegExpParser.prototype.group = function () {
        var capturing = true;
        this.consumeChar("(");

        switch (this.peekChar(0)) {
          case "?":
            this.consumeChar("?");
            this.consumeChar(":");
            capturing = false;
            break;

          default:
            this.groupIdx++;
            break;
        }

        var value = this.disjunction();
        this.consumeChar(")");
        var groupAst = {
          type: "Group",
          capturing: capturing,
          value: value
        };

        if (capturing) {
          groupAst.idx = this.groupIdx;
        }

        return groupAst;
      };

      RegExpParser.prototype.positiveInteger = function () {
        var number = this.popChar(); // istanbul ignore next - can't ever get here due to previous lookahead checks
        // still implementing this error checking in case this ever changes.

        if (decimalPatternNoZero.test(number) === false) {
          throw Error("Expecting a positive integer");
        }

        while (decimalPattern.test(this.peekChar(0))) {
          number += this.popChar();
        }

        return parseInt(number, 10);
      };

      RegExpParser.prototype.integerIncludingZero = function () {
        var number = this.popChar();

        if (decimalPattern.test(number) === false) {
          throw Error("Expecting an integer");
        }

        while (decimalPattern.test(this.peekChar(0))) {
          number += this.popChar();
        }

        return parseInt(number, 10);
      };

      RegExpParser.prototype.patternCharacter = function () {
        var nextChar = this.popChar();

        switch (nextChar) {
          // istanbul ignore next
          case "\n": // istanbul ignore next

          case "\r": // istanbul ignore next

          case "\u2028": // istanbul ignore next

          case "\u2029": // istanbul ignore next

          case "^": // istanbul ignore next

          case "$": // istanbul ignore next

          case "\\": // istanbul ignore next

          case ".": // istanbul ignore next

          case "*": // istanbul ignore next

          case "+": // istanbul ignore next

          case "?": // istanbul ignore next

          case "(": // istanbul ignore next

          case ")": // istanbul ignore next

          case "[": // istanbul ignore next

          case "|":
            // istanbul ignore next
            throw Error("TBD");

          default:
            return {
              type: "Character",
              value: cc(nextChar)
            };
        }
      };

      RegExpParser.prototype.isRegExpFlag = function () {
        switch (this.peekChar(0)) {
          case "g":
          case "i":
          case "m":
          case "u":
          case "y":
            return true;

          default:
            return false;
        }
      };

      RegExpParser.prototype.isRangeDash = function () {
        return this.peekChar() === "-" && this.isClassAtom(1);
      };

      RegExpParser.prototype.isDigit = function () {
        return decimalPattern.test(this.peekChar(0));
      };

      RegExpParser.prototype.isClassAtom = function (howMuch) {
        if (howMuch === undefined) {
          howMuch = 0;
        }

        switch (this.peekChar(howMuch)) {
          case "]":
          case "\n":
          case "\r":
          case "\u2028":
          case "\u2029":
            return false;

          default:
            return true;
        }
      };

      RegExpParser.prototype.isTerm = function () {
        return this.isAtom() || this.isAssertion();
      };

      RegExpParser.prototype.isAtom = function () {
        if (this.isPatternCharacter()) {
          return true;
        }

        switch (this.peekChar(0)) {
          case ".":
          case "\\": // atomEscape

          case "[": // characterClass
          // TODO: isAtom must be called before isAssertion - disambiguate

          case "(":
            // group
            return true;

          default:
            return false;
        }
      };

      RegExpParser.prototype.isAssertion = function () {
        switch (this.peekChar(0)) {
          case "^":
          case "$":
            return true;
          // '\b' or '\B'

          case "\\":
            switch (this.peekChar(1)) {
              case "b":
              case "B":
                return true;

              default:
                return false;
            }

          // '(?=' or '(?!'

          case "(":
            return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!");

          default:
            return false;
        }
      };

      RegExpParser.prototype.isQuantifier = function () {
        var prevState = this.saveState();

        try {
          return this.quantifier(true) !== undefined;
        } catch (e) {
          return false;
        } finally {
          this.restoreState(prevState);
        }
      };

      RegExpParser.prototype.isPatternCharacter = function () {
        switch (this.peekChar()) {
          case "^":
          case "$":
          case "\\":
          case ".":
          case "*":
          case "+":
          case "?":
          case "(":
          case ")":
          case "[":
          case "|":
          case "/":
          case "\n":
          case "\r":
          case "\u2028":
          case "\u2029":
            return false;

          default:
            return true;
        }
      };

      RegExpParser.prototype.parseHexDigits = function (howMany) {
        var hexString = "";

        for (var i = 0; i < howMany; i++) {
          var hexChar = this.popChar();

          if (hexDigitPattern.test(hexChar) === false) {
            throw Error("Expecting a HexDecimal digits");
          }

          hexString += hexChar;
        }

        var charCode = parseInt(hexString, 16);
        return {
          type: "Character",
          value: charCode
        };
      };

      RegExpParser.prototype.peekChar = function (howMuch) {
        if (howMuch === undefined) {
          howMuch = 0;
        }

        return this.input[this.idx + howMuch];
      };

      RegExpParser.prototype.popChar = function () {
        var nextChar = this.peekChar(0);
        this.consumeChar();
        return nextChar;
      };

      RegExpParser.prototype.consumeChar = function (_char) {
        if (_char !== undefined && this.input[this.idx] !== _char) {
          throw Error("Expected: '" + _char + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
        }

        if (this.idx >= this.input.length) {
          throw Error("Unexpected end of input");
        }

        this.idx++;
      };

      RegExpParser.prototype.loc = function (begin) {
        return {
          begin: begin,
          end: this.idx
        };
      }; // consts and utilities


      var hexDigitPattern = /[0-9a-fA-F]/;
      var decimalPattern = /[0-9]/;
      var decimalPatternNoZero = /[1-9]/;

      function cc(_char2) {
        return _char2.charCodeAt(0);
      }

      function insertToSet(item, set) {
        if (item.length !== undefined) {
          item.forEach(function (subItem) {
            set.push(subItem);
          });
        } else {
          set.push(item);
        }
      }

      function addFlag(flagObj, flagKey) {
        if (flagObj[flagKey] === true) {
          throw "duplicate flag " + flagKey;
        }

        flagObj[flagKey] = true;
      }

      function ASSERT_EXISTS(obj) {
        // istanbul ignore next
        if (obj === undefined) {
          throw Error("Internal Error - Should never get here!");
        }
      } // istanbul ignore next


      function ASSERT_NEVER_REACH_HERE() {
        throw Error("Internal Error - Should never get here!");
      }

      var i;
      var digitsCharCodes = [];

      for (i = cc("0"); i <= cc("9"); i++) {
        digitsCharCodes.push(i);
      }

      var wordCharCodes = [cc("_")].concat(digitsCharCodes);

      for (i = cc("a"); i <= cc("z"); i++) {
        wordCharCodes.push(i);
      }

      for (i = cc("A"); i <= cc("Z"); i++) {
        wordCharCodes.push(i);
      } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#character-classes


      var whitespaceCodes = [cc(" "), cc("\f"), cc("\n"), cc("\r"), cc("\t"), cc("\v"), cc("\t"), cc("\xA0"), cc("\u1680"), cc("\u2000"), cc("\u2001"), cc("\u2002"), cc("\u2003"), cc("\u2004"), cc("\u2005"), cc("\u2006"), cc("\u2007"), cc("\u2008"), cc("\u2009"), cc("\u200A"), cc("\u2028"), cc("\u2029"), cc("\u202F"), cc("\u205F"), cc("\u3000"), cc("\uFEFF")];

      function BaseRegExpVisitor() {}

      BaseRegExpVisitor.prototype.visitChildren = function (node) {
        for (var key in node) {
          var child = node[key];
          /* istanbul ignore else */

          if (node.hasOwnProperty(key)) {
            if (child.type !== undefined) {
              this.visit(child);
            } else if (Array.isArray(child)) {
              child.forEach(function (subChild) {
                this.visit(subChild);
              }, this);
            }
          }
        }
      };

      BaseRegExpVisitor.prototype.visit = function (node) {
        switch (node.type) {
          case "Pattern":
            this.visitPattern(node);
            break;

          case "Flags":
            this.visitFlags(node);
            break;

          case "Disjunction":
            this.visitDisjunction(node);
            break;

          case "Alternative":
            this.visitAlternative(node);
            break;

          case "StartAnchor":
            this.visitStartAnchor(node);
            break;

          case "EndAnchor":
            this.visitEndAnchor(node);
            break;

          case "WordBoundary":
            this.visitWordBoundary(node);
            break;

          case "NonWordBoundary":
            this.visitNonWordBoundary(node);
            break;

          case "Lookahead":
            this.visitLookahead(node);
            break;

          case "NegativeLookahead":
            this.visitNegativeLookahead(node);
            break;

          case "Character":
            this.visitCharacter(node);
            break;

          case "Set":
            this.visitSet(node);
            break;

          case "Group":
            this.visitGroup(node);
            break;

          case "GroupBackReference":
            this.visitGroupBackReference(node);
            break;

          case "Quantifier":
            this.visitQuantifier(node);
            break;
        }

        this.visitChildren(node);
      };

      BaseRegExpVisitor.prototype.visitPattern = function (node) {};

      BaseRegExpVisitor.prototype.visitFlags = function (node) {};

      BaseRegExpVisitor.prototype.visitDisjunction = function (node) {};

      BaseRegExpVisitor.prototype.visitAlternative = function (node) {}; // Assertion


      BaseRegExpVisitor.prototype.visitStartAnchor = function (node) {};

      BaseRegExpVisitor.prototype.visitEndAnchor = function (node) {};

      BaseRegExpVisitor.prototype.visitWordBoundary = function (node) {};

      BaseRegExpVisitor.prototype.visitNonWordBoundary = function (node) {};

      BaseRegExpVisitor.prototype.visitLookahead = function (node) {};

      BaseRegExpVisitor.prototype.visitNegativeLookahead = function (node) {}; // atoms


      BaseRegExpVisitor.prototype.visitCharacter = function (node) {};

      BaseRegExpVisitor.prototype.visitSet = function (node) {};

      BaseRegExpVisitor.prototype.visitGroup = function (node) {};

      BaseRegExpVisitor.prototype.visitGroupBackReference = function (node) {};

      BaseRegExpVisitor.prototype.visitQuantifier = function (node) {};

      return {
        RegExpParser: RegExpParser,
        BaseRegExpVisitor: BaseRegExpVisitor,
        VERSION: "0.5.0"
      };
    });
  });

  var regExpAstCache = {};
  var regExpParser = new regexpToAst.RegExpParser();
  function getRegExpAst(regExp) {
    var regExpStr = regExp.toString();

    if (regExpAstCache.hasOwnProperty(regExpStr)) {
      return regExpAstCache[regExpStr];
    } else {
      var regExpAst = regExpParser.pattern(regExpStr);
      regExpAstCache[regExpStr] = regExpAst;
      return regExpAst;
    }
  }
  function clearRegExpParserCache() {
    regExpAstCache = {};
  }

  var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    return function (d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var complementErrorMessage = "Complement Sets are not supported for first char optimization";
  var failedOptimizationPrefixMsg = 'Unable to use "first char" lexer optimizations:\n';
  function getOptimizedStartCodesIndices(regExp, ensureOptimizations) {
    if (ensureOptimizations === void 0) {
      ensureOptimizations = false;
    }

    try {
      var ast = getRegExpAst(regExp);
      var firstChars = firstCharOptimizedIndices(ast.value, {}, ast.flags.ignoreCase);
      return firstChars;
    } catch (e) {
      /* istanbul ignore next */
      // Testing this relies on the regexp-to-ast library having a bug... */
      // TODO: only the else branch needs to be ignored, try to fix with newer prettier / tsc
      if (e.message === complementErrorMessage) {
        if (ensureOptimizations) {
          PRINT_WARNING("" + failedOptimizationPrefixMsg + ("\tUnable to optimize: < " + regExp.toString() + " >\n") + "\tComplement Sets cannot be automatically optimized.\n" + "\tThis will disable the lexer's first char optimizations.\n" + "\tSee: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.");
        }
      } else {
        var msgSuffix = "";

        if (ensureOptimizations) {
          msgSuffix = "\n\tThis will disable the lexer's first char optimizations.\n" + "\tSee: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.";
        }

        PRINT_ERROR(failedOptimizationPrefixMsg + "\n" + ("\tFailed parsing: < " + regExp.toString() + " >\n") + ("\tUsing the regexp-to-ast library version: " + regexpToAst.VERSION + "\n") + "\tPlease open an issue at: https://github.com/bd82/regexp-to-ast/issues" + msgSuffix);
      }
    }

    return [];
  }
  function firstCharOptimizedIndices(ast, result, ignoreCase) {
    switch (ast.type) {
      case "Disjunction":
        for (var i = 0; i < ast.value.length; i++) {
          firstCharOptimizedIndices(ast.value[i], result, ignoreCase);
        }

        break;

      case "Alternative":
        var terms = ast.value;

        for (var i = 0; i < terms.length; i++) {
          var term = terms[i]; // skip terms that cannot effect the first char results

          switch (term.type) {
            case "EndAnchor": // A group back reference cannot affect potential starting char.
            // because if a back reference is the first production than automatically
            // the group being referenced has had to come BEFORE so its codes have already been added

            case "GroupBackReference": // assertions do not affect potential starting codes

            case "Lookahead":
            case "NegativeLookahead":
            case "StartAnchor":
            case "WordBoundary":
            case "NonWordBoundary":
              continue;
          }

          var atom = term;

          switch (atom.type) {
            case "Character":
              addOptimizedIdxToResult(atom.value, result, ignoreCase);
              break;

            case "Set":
              if (atom.complement === true) {
                throw Error(complementErrorMessage);
              }

              forEach(atom.value, function (code) {
                if (typeof code === "number") {
                  addOptimizedIdxToResult(code, result, ignoreCase);
                } else {
                  // range
                  var range = code; // cannot optimize when ignoreCase is

                  if (ignoreCase === true) {
                    for (var rangeCode = range.from; rangeCode <= range.to; rangeCode++) {
                      addOptimizedIdxToResult(rangeCode, result, ignoreCase);
                    }
                  } // Optimization (2 orders of magnitude less work for very large ranges)
                  else {
                      // handle unoptimized values
                      for (var rangeCode = range.from; rangeCode <= range.to && rangeCode < minOptimizationVal; rangeCode++) {
                        addOptimizedIdxToResult(rangeCode, result, ignoreCase);
                      } // Less common charCode where we optimize for faster init time, by using larger "buckets"


                      if (range.to >= minOptimizationVal) {
                        var minUnOptVal = range.from >= minOptimizationVal ? range.from : minOptimizationVal;
                        var maxUnOptVal = range.to;
                        var minOptIdx = charCodeToOptimizedIndex(minUnOptVal);
                        var maxOptIdx = charCodeToOptimizedIndex(maxUnOptVal);

                        for (var currOptIdx = minOptIdx; currOptIdx <= maxOptIdx; currOptIdx++) {
                          result[currOptIdx] = currOptIdx;
                        }
                      }
                    }
                }
              });
              break;

            case "Group":
              firstCharOptimizedIndices(atom.value, result, ignoreCase);
              break;

            /* istanbul ignore next */

            default:
              throw Error("Non Exhaustive Match");
          } // reached a mandatory production, no more **start** codes can be found on this alternative


          var isOptionalQuantifier = atom.quantifier !== undefined && atom.quantifier.atLeast === 0;

          if ( // A group may be optional due to empty contents /(?:)/
          // or if everything inside it is optional /((a)?)/
          atom.type === "Group" && isWholeOptional(atom) === false || // If this term is not a group it may only be optional if it has an optional quantifier
          atom.type !== "Group" && isOptionalQuantifier === false) {
            break;
          }
        }

        break;

      /* istanbul ignore next */

      default:
        throw Error("non exhaustive match!");
    } // console.log(Object.keys(result).length)


    return values(result);
  }

  function addOptimizedIdxToResult(code, result, ignoreCase) {
    var optimizedCharIdx = charCodeToOptimizedIndex(code);
    result[optimizedCharIdx] = optimizedCharIdx;

    if (ignoreCase === true) {
      handleIgnoreCase(code, result);
    }
  }

  function handleIgnoreCase(code, result) {
    var _char = String.fromCharCode(code);

    var upperChar = _char.toUpperCase();
    /* istanbul ignore else */


    if (upperChar !== _char) {
      var optimizedCharIdx = charCodeToOptimizedIndex(upperChar.charCodeAt(0));
      result[optimizedCharIdx] = optimizedCharIdx;
    } else {
      var lowerChar = _char.toLowerCase();

      if (lowerChar !== _char) {
        var optimizedCharIdx = charCodeToOptimizedIndex(lowerChar.charCodeAt(0));
        result[optimizedCharIdx] = optimizedCharIdx;
      }
    }
  }

  function findCode(setNode, targetCharCodes) {
    return find(setNode.value, function (codeOrRange) {
      if (typeof codeOrRange === "number") {
        return contains(targetCharCodes, codeOrRange);
      } else {
        // range
        var range_1 = codeOrRange;
        return find(targetCharCodes, function (targetCode) {
          return range_1.from <= targetCode && targetCode <= range_1.to;
        }) !== undefined;
      }
    });
  }

  function isWholeOptional(ast) {
    if (ast.quantifier && ast.quantifier.atLeast === 0) {
      return true;
    }

    if (!ast.value) {
      return false;
    }

    return isArray(ast.value) ? every(ast.value, isWholeOptional) : isWholeOptional(ast.value);
  }

  var CharCodeFinder =
  /** @class */
  function (_super) {
    __extends(CharCodeFinder, _super);

    function CharCodeFinder(targetCharCodes) {
      var _this = _super.call(this) || this;

      _this.targetCharCodes = targetCharCodes;
      _this.found = false;
      return _this;
    }

    CharCodeFinder.prototype.visitChildren = function (node) {
      // No need to keep looking...
      if (this.found === true) {
        return;
      } // switch lookaheads as they do not actually consume any characters thus
      // finding a charCode at lookahead context does not mean that regexp can actually contain it in a match.


      switch (node.type) {
        case "Lookahead":
          this.visitLookahead(node);
          return;

        case "NegativeLookahead":
          this.visitNegativeLookahead(node);
          return;
      }

      _super.prototype.visitChildren.call(this, node);
    };

    CharCodeFinder.prototype.visitCharacter = function (node) {
      if (contains(this.targetCharCodes, node.value)) {
        this.found = true;
      }
    };

    CharCodeFinder.prototype.visitSet = function (node) {
      if (node.complement) {
        if (findCode(node, this.targetCharCodes) === undefined) {
          this.found = true;
        }
      } else {
        if (findCode(node, this.targetCharCodes) !== undefined) {
          this.found = true;
        }
      }
    };

    return CharCodeFinder;
  }(regexpToAst.BaseRegExpVisitor);

  function canMatchCharCode(charCodes, pattern) {
    if (pattern instanceof RegExp) {
      var ast = getRegExpAst(pattern);
      var charCodeFinder = new CharCodeFinder(charCodes);
      charCodeFinder.visit(ast);
      return charCodeFinder.found;
    } else {
      return find(pattern, function (_char2) {
        return contains(charCodes, _char2.charCodeAt(0));
      }) !== undefined;
    }
  }

  var __extends$1 = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    return function (d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var PATTERN = "PATTERN";
  var DEFAULT_MODE = "defaultMode";
  var MODES = "modes";
  var SUPPORT_STICKY = typeof new RegExp("(?:)").sticky === "boolean";
  function analyzeTokenTypes(tokenTypes, options) {
    options = defaults(options, {
      useSticky: SUPPORT_STICKY,
      debug: false,
      safeMode: false,
      positionTracking: "full",
      lineTerminatorCharacters: ["\r", "\n"],
      tracer: function tracer(msg, action) {
        return action();
      }
    });
    var tracer = options.tracer;
    tracer("initCharCodeToOptimizedIndexMap", function () {
      initCharCodeToOptimizedIndexMap();
    });
    var onlyRelevantTypes;
    tracer("Reject Lexer.NA", function () {
      onlyRelevantTypes = reject(tokenTypes, function (currType) {
        return currType[PATTERN] === Lexer.NA;
      });
    });
    var hasCustom = false;
    var allTransformedPatterns;
    tracer("Transform Patterns", function () {
      hasCustom = false;
      allTransformedPatterns = map(onlyRelevantTypes, function (currType) {
        var currPattern = currType[PATTERN];
        /* istanbul ignore else */

        if (isRegExp(currPattern)) {
          var regExpSource = currPattern.source;

          if (regExpSource.length === 1 && // only these regExp meta characters which can appear in a length one regExp
          regExpSource !== "^" && regExpSource !== "$" && regExpSource !== "." && !currPattern.ignoreCase) {
            return regExpSource;
          } else if (regExpSource.length === 2 && regExpSource[0] === "\\" && // not a meta character
          !contains(["d", "D", "s", "S", "t", "r", "n", "t", "0", "c", "b", "B", "f", "v", "w", "W"], regExpSource[1])) {
            // escaped meta Characters: /\+/ /\[/
            // or redundant escaping: /\a/
            // without the escaping "\"
            return regExpSource[1];
          } else {
            return options.useSticky ? addStickyFlag(currPattern) : addStartOfInput(currPattern);
          }
        } else if (isFunction(currPattern)) {
          hasCustom = true; // CustomPatternMatcherFunc - custom patterns do not require any transformations, only wrapping in a RegExp Like object

          return {
            exec: currPattern
          };
        } else if (has(currPattern, "exec")) {
          hasCustom = true; // ICustomPattern

          return currPattern;
        } else if (typeof currPattern === "string") {
          if (currPattern.length === 1) {
            return currPattern;
          } else {
            var escapedRegExpString = currPattern.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
            var wrappedRegExp = new RegExp(escapedRegExpString);
            return options.useSticky ? addStickyFlag(wrappedRegExp) : addStartOfInput(wrappedRegExp);
          }
        } else {
          throw Error("non exhaustive match");
        }
      });
    });
    var patternIdxToType;
    var patternIdxToGroup;
    var patternIdxToLongerAltIdx;
    var patternIdxToPushMode;
    var patternIdxToPopMode;
    tracer("misc mapping", function () {
      patternIdxToType = map(onlyRelevantTypes, function (currType) {
        return currType.tokenTypeIdx;
      });
      patternIdxToGroup = map(onlyRelevantTypes, function (clazz) {
        var groupName = clazz.GROUP;
        /* istanbul ignore next */

        if (groupName === Lexer.SKIPPED) {
          return undefined;
        } else if (isString(groupName)) {
          return groupName;
        } else if (isUndefined(groupName)) {
          return false;
        } else {
          throw Error("non exhaustive match");
        }
      });
      patternIdxToLongerAltIdx = map(onlyRelevantTypes, function (clazz) {
        var longerAltType = clazz.LONGER_ALT;

        if (longerAltType) {
          var longerAltIdx = indexOf(onlyRelevantTypes, longerAltType);
          return longerAltIdx;
        }
      });
      patternIdxToPushMode = map(onlyRelevantTypes, function (clazz) {
        return clazz.PUSH_MODE;
      });
      patternIdxToPopMode = map(onlyRelevantTypes, function (clazz) {
        return has(clazz, "POP_MODE");
      });
    });
    var patternIdxToCanLineTerminator;
    tracer("Line Terminator Handling", function () {
      var lineTerminatorCharCodes = getCharCodes(options.lineTerminatorCharacters);
      patternIdxToCanLineTerminator = map(onlyRelevantTypes, function (tokType) {
        return false;
      });

      if (options.positionTracking !== "onlyOffset") {
        patternIdxToCanLineTerminator = map(onlyRelevantTypes, function (tokType) {
          if (has(tokType, "LINE_BREAKS")) {
            return tokType.LINE_BREAKS;
          } else {
            if (checkLineBreaksIssues(tokType, lineTerminatorCharCodes) === false) {
              return canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
            }
          }
        });
      }
    });
    var patternIdxToIsCustom;
    var patternIdxToShort;
    var emptyGroups;
    var patternIdxToConfig;
    tracer("Misc Mapping #2", function () {
      patternIdxToIsCustom = map(onlyRelevantTypes, isCustomPattern);
      patternIdxToShort = map(allTransformedPatterns, isShortPattern);
      emptyGroups = reduce(onlyRelevantTypes, function (acc, clazz) {
        var groupName = clazz.GROUP;

        if (isString(groupName) && !(groupName === Lexer.SKIPPED)) {
          acc[groupName] = [];
        }

        return acc;
      }, {});
      patternIdxToConfig = map(allTransformedPatterns, function (x, idx) {
        return {
          pattern: allTransformedPatterns[idx],
          longerAlt: patternIdxToLongerAltIdx[idx],
          canLineTerminator: patternIdxToCanLineTerminator[idx],
          isCustom: patternIdxToIsCustom[idx],
          "short": patternIdxToShort[idx],
          group: patternIdxToGroup[idx],
          push: patternIdxToPushMode[idx],
          pop: patternIdxToPopMode[idx],
          tokenTypeIdx: patternIdxToType[idx],
          tokenType: onlyRelevantTypes[idx]
        };
      });
    });
    var canBeOptimized = true;
    var charCodeToPatternIdxToConfig = [];

    if (!options.safeMode) {
      tracer("First Char Optimization", function () {
        charCodeToPatternIdxToConfig = reduce(onlyRelevantTypes, function (result, currTokType, idx) {
          if (typeof currTokType.PATTERN === "string") {
            var charCode = currTokType.PATTERN.charCodeAt(0);
            var optimizedIdx = charCodeToOptimizedIndex(charCode);
            addToMapOfArrays(result, optimizedIdx, patternIdxToConfig[idx]);
          } else if (isArray(currTokType.START_CHARS_HINT)) {
            var lastOptimizedIdx_1;
            forEach(currTokType.START_CHARS_HINT, function (charOrInt) {
              var charCode = typeof charOrInt === "string" ? charOrInt.charCodeAt(0) : charOrInt;
              var currOptimizedIdx = charCodeToOptimizedIndex(charCode); // Avoid adding the config multiple times

              /* istanbul ignore else */
              // - Difficult to check this scenario effects as it is only a performance
              //   optimization that does not change correctness

              if (lastOptimizedIdx_1 !== currOptimizedIdx) {
                lastOptimizedIdx_1 = currOptimizedIdx;
                addToMapOfArrays(result, currOptimizedIdx, patternIdxToConfig[idx]);
              }
            });
          } else if (isRegExp(currTokType.PATTERN)) {
            if (currTokType.PATTERN.unicode) {
              canBeOptimized = false;

              if (options.ensureOptimizations) {
                PRINT_ERROR("" + failedOptimizationPrefixMsg + ("\tUnable to analyze < " + currTokType.PATTERN.toString() + " > pattern.\n") + "\tThe regexp unicode flag is not currently supported by the regexp-to-ast library.\n" + "\tThis will disable the lexer's first char optimizations.\n" + "\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE");
              }
            } else {
              var optimizedCodes = getOptimizedStartCodesIndices(currTokType.PATTERN, options.ensureOptimizations);
              /* istanbul ignore if */
              // start code will only be empty given an empty regExp or failure of regexp-to-ast library
              // the first should be a different validation and the second cannot be tested.

              if (isEmpty(optimizedCodes)) {
                // we cannot understand what codes may start possible matches
                // The optimization correctness requires knowing start codes for ALL patterns.
                // Not actually sure this is an error, no debug message
                canBeOptimized = false;
              }

              forEach(optimizedCodes, function (code) {
                addToMapOfArrays(result, code, patternIdxToConfig[idx]);
              });
            }
          } else {
            if (options.ensureOptimizations) {
              PRINT_ERROR("" + failedOptimizationPrefixMsg + ("\tTokenType: <" + currTokType.name + "> is using a custom token pattern without providing <start_chars_hint> parameter.\n") + "\tThis will disable the lexer's first char optimizations.\n" + "\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE");
            }

            canBeOptimized = false;
          }

          return result;
        }, []);
      });
    }

    tracer("ArrayPacking", function () {
      charCodeToPatternIdxToConfig = packArray(charCodeToPatternIdxToConfig);
    });
    return {
      emptyGroups: emptyGroups,
      patternIdxToConfig: patternIdxToConfig,
      charCodeToPatternIdxToConfig: charCodeToPatternIdxToConfig,
      hasCustom: hasCustom,
      canBeOptimized: canBeOptimized
    };
  }
  function validatePatterns(tokenTypes, validModesNames) {
    var errors = [];
    var missingResult = findMissingPatterns(tokenTypes);
    errors = errors.concat(missingResult.errors);
    var invalidResult = findInvalidPatterns(missingResult.valid);
    var validTokenTypes = invalidResult.valid;
    errors = errors.concat(invalidResult.errors);
    errors = errors.concat(validateRegExpPattern(validTokenTypes));
    errors = errors.concat(findInvalidGroupType(validTokenTypes));
    errors = errors.concat(findModesThatDoNotExist(validTokenTypes, validModesNames));
    errors = errors.concat(findUnreachablePatterns(validTokenTypes));
    return errors;
  }

  function validateRegExpPattern(tokenTypes) {
    var errors = [];
    var withRegExpPatterns = filter(tokenTypes, function (currTokType) {
      return isRegExp(currTokType[PATTERN]);
    });
    errors = errors.concat(findEndOfInputAnchor(withRegExpPatterns));
    errors = errors.concat(findStartOfInputAnchor(withRegExpPatterns));
    errors = errors.concat(findUnsupportedFlags(withRegExpPatterns));
    errors = errors.concat(findDuplicatePatterns(withRegExpPatterns));
    errors = errors.concat(findEmptyMatchRegExps(withRegExpPatterns));
    return errors;
  }

  function findMissingPatterns(tokenTypes) {
    var tokenTypesWithMissingPattern = filter(tokenTypes, function (currType) {
      return !has(currType, PATTERN);
    });
    var errors = map(tokenTypesWithMissingPattern, function (currType) {
      return {
        message: "Token Type: ->" + currType.name + "<- missing static 'PATTERN' property",
        type: LexerDefinitionErrorType.MISSING_PATTERN,
        tokenTypes: [currType]
      };
    });
    var valid = difference(tokenTypes, tokenTypesWithMissingPattern);
    return {
      errors: errors,
      valid: valid
    };
  }
  function findInvalidPatterns(tokenTypes) {
    var tokenTypesWithInvalidPattern = filter(tokenTypes, function (currType) {
      var pattern = currType[PATTERN];
      return !isRegExp(pattern) && !isFunction(pattern) && !has(pattern, "exec") && !isString(pattern);
    });
    var errors = map(tokenTypesWithInvalidPattern, function (currType) {
      return {
        message: "Token Type: ->" + currType.name + "<- static 'PATTERN' can only be a RegExp, a" + " Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
        type: LexerDefinitionErrorType.INVALID_PATTERN,
        tokenTypes: [currType]
      };
    });
    var valid = difference(tokenTypes, tokenTypesWithInvalidPattern);
    return {
      errors: errors,
      valid: valid
    };
  }
  var end_of_input = /[^\\][\$]/;
  function findEndOfInputAnchor(tokenTypes) {
    var EndAnchorFinder =
    /** @class */
    function (_super) {
      __extends$1(EndAnchorFinder, _super);

      function EndAnchorFinder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.found = false;
        return _this;
      }

      EndAnchorFinder.prototype.visitEndAnchor = function (node) {
        this.found = true;
      };

      return EndAnchorFinder;
    }(regexpToAst.BaseRegExpVisitor);

    var invalidRegex = filter(tokenTypes, function (currType) {
      var pattern = currType[PATTERN];

      try {
        var regexpAst = getRegExpAst(pattern);
        var endAnchorVisitor = new EndAnchorFinder();
        endAnchorVisitor.visit(regexpAst);
        return endAnchorVisitor.found;
      } catch (e) {
        // old behavior in case of runtime exceptions with regexp-to-ast.

        /* istanbul ignore next - cannot ensure an error in regexp-to-ast*/
        return end_of_input.test(pattern.source);
      }
    });
    var errors = map(invalidRegex, function (currType) {
      return {
        message: "Unexpected RegExp Anchor Error:\n" + "\tToken Type: ->" + currType.name + "<- static 'PATTERN' cannot contain end of input anchor '$'\n" + "\tSee sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS" + "\tfor details.",
        type: LexerDefinitionErrorType.EOI_ANCHOR_FOUND,
        tokenTypes: [currType]
      };
    });
    return errors;
  }
  function findEmptyMatchRegExps(tokenTypes) {
    var matchesEmptyString = filter(tokenTypes, function (currType) {
      var pattern = currType[PATTERN];
      return pattern.test("");
    });
    var errors = map(matchesEmptyString, function (currType) {
      return {
        message: "Token Type: ->" + currType.name + "<- static 'PATTERN' must not match an empty string",
        type: LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,
        tokenTypes: [currType]
      };
    });
    return errors;
  }
  var start_of_input = /[^\\[][\^]|^\^/;
  function findStartOfInputAnchor(tokenTypes) {
    var StartAnchorFinder =
    /** @class */
    function (_super) {
      __extends$1(StartAnchorFinder, _super);

      function StartAnchorFinder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.found = false;
        return _this;
      }

      StartAnchorFinder.prototype.visitStartAnchor = function (node) {
        this.found = true;
      };

      return StartAnchorFinder;
    }(regexpToAst.BaseRegExpVisitor);

    var invalidRegex = filter(tokenTypes, function (currType) {
      var pattern = currType[PATTERN];

      try {
        var regexpAst = getRegExpAst(pattern);
        var startAnchorVisitor = new StartAnchorFinder();
        startAnchorVisitor.visit(regexpAst);
        return startAnchorVisitor.found;
      } catch (e) {
        // old behavior in case of runtime exceptions with regexp-to-ast.

        /* istanbul ignore next - cannot ensure an error in regexp-to-ast*/
        return start_of_input.test(pattern.source);
      }
    });
    var errors = map(invalidRegex, function (currType) {
      return {
        message: "Unexpected RegExp Anchor Error:\n" + "\tToken Type: ->" + currType.name + "<- static 'PATTERN' cannot contain start of input anchor '^'\n" + "\tSee https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS" + "\tfor details.",
        type: LexerDefinitionErrorType.SOI_ANCHOR_FOUND,
        tokenTypes: [currType]
      };
    });
    return errors;
  }
  function findUnsupportedFlags(tokenTypes) {
    var invalidFlags = filter(tokenTypes, function (currType) {
      var pattern = currType[PATTERN];
      return pattern instanceof RegExp && (pattern.multiline || pattern.global);
    });
    var errors = map(invalidFlags, function (currType) {
      return {
        message: "Token Type: ->" + currType.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
        type: LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,
        tokenTypes: [currType]
      };
    });
    return errors;
  } // This can only test for identical duplicate RegExps, not semantically equivalent ones.

  function findDuplicatePatterns(tokenTypes) {
    var found = [];
    var identicalPatterns = map(tokenTypes, function (outerType) {
      return reduce(tokenTypes, function (result, innerType) {
        if (outerType.PATTERN.source === innerType.PATTERN.source && !contains(found, innerType) && innerType.PATTERN !== Lexer.NA) {
          // this avoids duplicates in the result, each Token Type may only appear in one "set"
          // in essence we are creating Equivalence classes on equality relation.
          found.push(innerType);
          result.push(innerType);
          return result;
        }

        return result;
      }, []);
    });
    identicalPatterns = compact(identicalPatterns);
    var duplicatePatterns = filter(identicalPatterns, function (currIdenticalSet) {
      return currIdenticalSet.length > 1;
    });
    var errors = map(duplicatePatterns, function (setOfIdentical) {
      var tokenTypeNames = map(setOfIdentical, function (currType) {
        return currType.name;
      });
      var dupPatternSrc = first(setOfIdentical).PATTERN;
      return {
        message: "The same RegExp pattern ->" + dupPatternSrc + "<-" + ("has been used in all of the following Token Types: " + tokenTypeNames.join(", ") + " <-"),
        type: LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,
        tokenTypes: setOfIdentical
      };
    });
    return errors;
  }
  function findInvalidGroupType(tokenTypes) {
    var invalidTypes = filter(tokenTypes, function (clazz) {
      if (!has(clazz, "GROUP")) {
        return false;
      }

      var group = clazz.GROUP;
      return group !== Lexer.SKIPPED && group !== Lexer.NA && !isString(group);
    });
    var errors = map(invalidTypes, function (currType) {
      return {
        message: "Token Type: ->" + currType.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
        type: LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,
        tokenTypes: [currType]
      };
    });
    return errors;
  }
  function findModesThatDoNotExist(tokenTypes, validModes) {
    var invalidModes = filter(tokenTypes, function (clazz) {
      return clazz.PUSH_MODE !== undefined && !contains(validModes, clazz.PUSH_MODE);
    });
    var errors = map(invalidModes, function (tokType) {
      var msg = "Token Type: ->" + tokType.name + "<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->" + tokType.PUSH_MODE + "<-" + "which does not exist";
      return {
        message: msg,
        type: LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,
        tokenTypes: [tokType]
      };
    });
    return errors;
  }
  function findUnreachablePatterns(tokenTypes) {
    var errors = [];
    var canBeTested = reduce(tokenTypes, function (result, tokType, idx) {
      var pattern = tokType.PATTERN;

      if (pattern === Lexer.NA) {
        return result;
      } // a more comprehensive validation for all forms of regExps would require
      // deeper regExp analysis capabilities


      if (isString(pattern)) {
        result.push({
          str: pattern,
          idx: idx,
          tokenType: tokType
        });
      } else if (isRegExp(pattern) && noMetaChar(pattern)) {
        result.push({
          str: pattern.source,
          idx: idx,
          tokenType: tokType
        });
      }

      return result;
    }, []);
    forEach(tokenTypes, function (tokType, testIdx) {
      forEach(canBeTested, function (_a) {
        var str = _a.str,
            idx = _a.idx,
            tokenType = _a.tokenType;

        if (testIdx < idx && testTokenType(str, tokType.PATTERN)) {
          var msg = "Token: ->" + tokenType.name + "<- can never be matched.\n" + ("Because it appears AFTER the Token Type ->" + tokType.name + "<-") + "in the lexer's definition.\n" + "See https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNREACHABLE";
          errors.push({
            message: msg,
            type: LexerDefinitionErrorType.UNREACHABLE_PATTERN,
            tokenTypes: [tokType, tokenType]
          });
        }
      });
    });
    return errors;
  }

  function testTokenType(str, pattern) {
    /* istanbul ignore else */
    if (isRegExp(pattern)) {
      var regExpArray = pattern.exec(str);
      return regExpArray !== null && regExpArray.index === 0;
    } else if (isFunction(pattern)) {
      // maintain the API of custom patterns
      return pattern(str, 0, [], {});
    } else if (has(pattern, "exec")) {
      // maintain the API of custom patterns
      return pattern.exec(str, 0, [], {});
    } else if (typeof pattern === "string") {
      return pattern === str;
    } else {
      throw Error("non exhaustive match");
    }
  }

  function noMetaChar(regExp) {
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    var metaChars = [".", "\\", "[", "]", "|", "^", "$", "(", ")", "?", "*", "+", "{"];
    return find(metaChars, function (_char) {
      return regExp.source.indexOf(_char) !== -1;
    }) === undefined;
  }

  function addStartOfInput(pattern) {
    var flags = pattern.ignoreCase ? "i" : ""; // always wrapping in a none capturing group preceded by '^' to make sure matching can only work on start of input.
    // duplicate/redundant start of input markers have no meaning (/^^^^A/ === /^A/)

    return new RegExp("^(?:" + pattern.source + ")", flags);
  }
  function addStickyFlag(pattern) {
    var flags = pattern.ignoreCase ? "iy" : "y"; // always wrapping in a none capturing group preceded by '^' to make sure matching can only work on start of input.
    // duplicate/redundant start of input markers have no meaning (/^^^^A/ === /^A/)

    return new RegExp("" + pattern.source, flags);
  }
  function performRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
    var errors = []; // some run time checks to help the end users.

    if (!has(lexerDefinition, DEFAULT_MODE)) {
      errors.push({
        message: "A MultiMode Lexer cannot be initialized without a <" + DEFAULT_MODE + "> property in its definition\n",
        type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
      });
    }

    if (!has(lexerDefinition, MODES)) {
      errors.push({
        message: "A MultiMode Lexer cannot be initialized without a <" + MODES + "> property in its definition\n",
        type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
      });
    }

    if (has(lexerDefinition, MODES) && has(lexerDefinition, DEFAULT_MODE) && !has(lexerDefinition.modes, lexerDefinition.defaultMode)) {
      errors.push({
        message: "A MultiMode Lexer cannot be initialized with a " + DEFAULT_MODE + ": <" + lexerDefinition.defaultMode + ">" + "which does not exist\n",
        type: LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
      });
    }

    if (has(lexerDefinition, MODES)) {
      forEach(lexerDefinition.modes, function (currModeValue, currModeName) {
        forEach(currModeValue, function (currTokType, currIdx) {
          if (isUndefined(currTokType)) {
            errors.push({
              message: "A Lexer cannot be initialized using an undefined Token Type. Mode:" + ("<" + currModeName + "> at index: <" + currIdx + ">\n"),
              type: LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
            });
          }
        });
      });
    }

    return errors;
  }
  function performWarningRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
    var warnings = [];
    var hasAnyLineBreak = false;
    var allTokenTypes = compact(flatten(mapValues(lexerDefinition.modes, function (tokTypes) {
      return tokTypes;
    })));
    var concreteTokenTypes = reject(allTokenTypes, function (currType) {
      return currType[PATTERN] === Lexer.NA;
    });
    var terminatorCharCodes = getCharCodes(lineTerminatorCharacters);

    if (trackLines) {
      forEach(concreteTokenTypes, function (tokType) {
        var currIssue = checkLineBreaksIssues(tokType, terminatorCharCodes);

        if (currIssue !== false) {
          var message = buildLineBreakIssueMessage(tokType, currIssue);
          var warningDescriptor = {
            message: message,
            type: currIssue.issue,
            tokenType: tokType
          };
          warnings.push(warningDescriptor);
        } else {
          // we don't want to attempt to scan if the user explicitly specified the line_breaks option.
          if (has(tokType, "LINE_BREAKS")) {
            if (tokType.LINE_BREAKS === true) {
              hasAnyLineBreak = true;
            }
          } else {
            if (canMatchCharCode(terminatorCharCodes, tokType.PATTERN)) {
              hasAnyLineBreak = true;
            }
          }
        }
      });
    }

    if (trackLines && !hasAnyLineBreak) {
      warnings.push({
        message: "Warning: No LINE_BREAKS Found.\n" + "\tThis Lexer has been defined to track line and column information,\n" + "\tBut none of the Token Types can be identified as matching a line terminator.\n" + "\tSee https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#LINE_BREAKS \n" + "\tfor details.",
        type: LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS
      });
    }

    return warnings;
  }
  function cloneEmptyGroups(emptyGroups) {
    var clonedResult = {};
    var groupKeys = keys(emptyGroups);
    forEach(groupKeys, function (currKey) {
      var currGroupValue = emptyGroups[currKey];
      /* istanbul ignore else */

      if (isArray(currGroupValue)) {
        clonedResult[currKey] = [];
      } else {
        throw Error("non exhaustive match");
      }
    });
    return clonedResult;
  } // TODO: refactor to avoid duplication

  function isCustomPattern(tokenType) {
    var pattern = tokenType.PATTERN;
    /* istanbul ignore else */

    if (isRegExp(pattern)) {
      return false;
    } else if (isFunction(pattern)) {
      // CustomPatternMatcherFunc - custom patterns do not require any transformations, only wrapping in a RegExp Like object
      return true;
    } else if (has(pattern, "exec")) {
      // ICustomPattern
      return true;
    } else if (isString(pattern)) {
      return false;
    } else {
      throw Error("non exhaustive match");
    }
  }
  function isShortPattern(pattern) {
    if (isString(pattern) && pattern.length === 1) {
      return pattern.charCodeAt(0);
    } else {
      return false;
    }
  }
  /**
   * Faster than using a RegExp for default newline detection during lexing.
   */

  var LineTerminatorOptimizedTester = {
    // implements /\n|\r\n?/g.test
    test: function test(text) {
      var len = text.length;

      for (var i = this.lastIndex; i < len; i++) {
        var c = text.charCodeAt(i);

        if (c === 10) {
          this.lastIndex = i + 1;
          return true;
        } else if (c === 13) {
          if (text.charCodeAt(i + 1) === 10) {
            this.lastIndex = i + 2;
          } else {
            this.lastIndex = i + 1;
          }

          return true;
        }
      }

      return false;
    },
    lastIndex: 0
  };

  function checkLineBreaksIssues(tokType, lineTerminatorCharCodes) {
    if (has(tokType, "LINE_BREAKS")) {
      // if the user explicitly declared the line_breaks option we will respect their choice
      // and assume it is correct.
      return false;
    } else {
      /* istanbul ignore else */
      if (isRegExp(tokType.PATTERN)) {
        try {
          canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
        } catch (e) {
          /* istanbul ignore next - to test this we would have to mock <canMatchCharCode> to throw an error */
          return {
            issue: LexerDefinitionErrorType.IDENTIFY_TERMINATOR,
            errMsg: e.message
          };
        }

        return false;
      } else if (isString(tokType.PATTERN)) {
        // string literal patterns can always be analyzed to detect line terminator usage
        return false;
      } else if (isCustomPattern(tokType)) {
        // custom token types
        return {
          issue: LexerDefinitionErrorType.CUSTOM_LINE_BREAK
        };
      } else {
        throw Error("non exhaustive match");
      }
    }
  }

  function buildLineBreakIssueMessage(tokType, details) {
    /* istanbul ignore else */
    if (details.issue === LexerDefinitionErrorType.IDENTIFY_TERMINATOR) {
      return "Warning: unable to identify line terminator usage in pattern.\n" + ("\tThe problem is in the <" + tokType.name + "> Token Type\n") + ("\t Root cause: " + details.errMsg + ".\n") + "\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";
    } else if (details.issue === LexerDefinitionErrorType.CUSTOM_LINE_BREAK) {
      return "Warning: A Custom Token Pattern should specify the <line_breaks> option.\n" + ("\tThe problem is in the <" + tokType.name + "> Token Type\n") + "\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";
    } else {
      throw Error("non exhaustive match");
    }
  }

  function getCharCodes(charsOrCodes) {
    var charCodes = map(charsOrCodes, function (numOrString) {
      if (isString(numOrString) && numOrString.length > 0) {
        return numOrString.charCodeAt(0);
      } else {
        return numOrString;
      }
    });
    return charCodes;
  }

  function addToMapOfArrays(map, key, value) {
    if (map[key] === undefined) {
      map[key] = [value];
    } else {
      map[key].push(value);
    }
  }

  var minOptimizationVal = 256;
  /**
   * We ae mapping charCode above ASCI (256) into buckets each in the size of 256.
   * This is because ASCI are the most common start chars so each one of those will get its own
   * possible token configs vector.
   *
   * Tokens starting with charCodes "above" ASCI are uncommon, so we can "afford"
   * to place these into buckets of possible token configs, What we gain from
   * this is avoiding the case of creating an optimization 'charCodeToPatternIdxToConfig'
   * which would contain 10,000+ arrays of small size (e.g unicode Identifiers scenario).
   * Our 'charCodeToPatternIdxToConfig' max size will now be:
   * 256 + (2^16 / 2^8) - 1 === 511
   *
   * note the hack for fast division integer part extraction
   * See: https://stackoverflow.com/a/4228528
   */

  function charCodeToOptimizedIndex(charCode) {
    return charCode < minOptimizationVal ? charCode : charCodeToOptimizedIdxMap[charCode];
  }
  /**
   * This is a compromise between cold start / hot running performance
   * Creating this array takes ~3ms on a modern machine,
   * But if we perform the computation at runtime as needed the CSS Lexer benchmark
   * performance degrades by ~10%
   *
   * TODO: Perhaps it should be lazy initialized only if a charCode > 255 is used.
   */

  var charCodeToOptimizedIdxMap = [];

  function initCharCodeToOptimizedIndexMap() {
    if (isEmpty(charCodeToOptimizedIdxMap)) {
      charCodeToOptimizedIdxMap = new Array(65536);

      for (var i = 0; i < 65536; i++) {
        /* tslint:disable */
        charCodeToOptimizedIdxMap[i] = i > 255 ? 255 + ~~(i / 255) : i;
        /* tslint:enable */
      }
    }
  }

  function tokenStructuredMatcher(tokInstance, tokConstructor) {
    var instanceType = tokInstance.tokenTypeIdx;

    if (instanceType === tokConstructor.tokenTypeIdx) {
      return true;
    } else {
      return tokConstructor.isParent === true && tokConstructor.categoryMatchesMap[instanceType] === true;
    }
  } // Optimized tokenMatcher in case our grammar does not use token categories
  // Being so tiny it is much more likely to be in-lined and this avoid the function call overhead

  function tokenStructuredMatcherNoCategories(token, tokType) {
    return token.tokenTypeIdx === tokType.tokenTypeIdx;
  }
  var tokenShortNameIdx = 1;
  var tokenIdxToClass = {};
  function augmentTokenTypes(tokenTypes) {
    // collect the parent Token Types as well.
    var tokenTypesAndParents = expandCategories(tokenTypes); // add required tokenType and categoryMatches properties

    assignTokenDefaultProps(tokenTypesAndParents); // fill up the categoryMatches

    assignCategoriesMapProp(tokenTypesAndParents);
    assignCategoriesTokensProp(tokenTypesAndParents);
    forEach(tokenTypesAndParents, function (tokType) {
      tokType.isParent = tokType.categoryMatches.length > 0;
    });
  }
  function expandCategories(tokenTypes) {
    var result = cloneArr(tokenTypes);
    var categories = tokenTypes;
    var searching = true;

    while (searching) {
      categories = compact(flatten(map(categories, function (currTokType) {
        return currTokType.CATEGORIES;
      })));
      var newCategories = difference(categories, result);
      result = result.concat(newCategories);

      if (isEmpty(newCategories)) {
        searching = false;
      } else {
        categories = newCategories;
      }
    }

    return result;
  }
  function assignTokenDefaultProps(tokenTypes) {
    forEach(tokenTypes, function (currTokType) {
      if (!hasShortKeyProperty(currTokType)) {
        tokenIdxToClass[tokenShortNameIdx] = currTokType;
        currTokType.tokenTypeIdx = tokenShortNameIdx++;
      } // CATEGORIES? : TokenType | TokenType[]


      if (hasCategoriesProperty(currTokType) && !isArray(currTokType.CATEGORIES) // &&
      // !isUndefined(currTokType.CATEGORIES.PATTERN)
      ) {
          currTokType.CATEGORIES = [currTokType.CATEGORIES];
        }

      if (!hasCategoriesProperty(currTokType)) {
        currTokType.CATEGORIES = [];
      }

      if (!hasExtendingTokensTypesProperty(currTokType)) {
        currTokType.categoryMatches = [];
      }

      if (!hasExtendingTokensTypesMapProperty(currTokType)) {
        currTokType.categoryMatchesMap = {};
      }
    });
  }
  function assignCategoriesTokensProp(tokenTypes) {
    forEach(tokenTypes, function (currTokType) {
      // avoid duplications
      currTokType.categoryMatches = [];
      forEach(currTokType.categoryMatchesMap, function (val, key) {
        currTokType.categoryMatches.push(tokenIdxToClass[key].tokenTypeIdx);
      });
    });
  }
  function assignCategoriesMapProp(tokenTypes) {
    forEach(tokenTypes, function (currTokType) {
      singleAssignCategoriesToksMap([], currTokType);
    });
  }
  function singleAssignCategoriesToksMap(path, nextNode) {
    forEach(path, function (pathNode) {
      nextNode.categoryMatchesMap[pathNode.tokenTypeIdx] = true;
    });
    forEach(nextNode.CATEGORIES, function (nextCategory) {
      var newPath = path.concat(nextNode); // avoids infinite loops due to cyclic categories.

      if (!contains(newPath, nextCategory)) {
        singleAssignCategoriesToksMap(newPath, nextCategory);
      }
    });
  }
  function hasShortKeyProperty(tokType) {
    return has(tokType, "tokenTypeIdx");
  }
  function hasCategoriesProperty(tokType) {
    return has(tokType, "CATEGORIES");
  }
  function hasExtendingTokensTypesProperty(tokType) {
    return has(tokType, "categoryMatches");
  }
  function hasExtendingTokensTypesMapProperty(tokType) {
    return has(tokType, "categoryMatchesMap");
  }
  function isTokenType(tokType) {
    return has(tokType, "tokenTypeIdx");
  }

  var defaultLexerErrorProvider = {
    buildUnableToPopLexerModeMessage: function buildUnableToPopLexerModeMessage(token) {
      return "Unable to pop Lexer Mode after encountering Token ->" + token.image + "<- The Mode Stack is empty";
    },
    buildUnexpectedCharactersMessage: function buildUnexpectedCharactersMessage(fullText, startOffset, length, line, column) {
      return "unexpected character: ->" + fullText.charAt(startOffset) + "<- at offset: " + startOffset + "," + (" skipped " + length + " characters.");
    }
  };

  var LexerDefinitionErrorType;

  (function (LexerDefinitionErrorType) {
    LexerDefinitionErrorType[LexerDefinitionErrorType["MISSING_PATTERN"] = 0] = "MISSING_PATTERN";
    LexerDefinitionErrorType[LexerDefinitionErrorType["INVALID_PATTERN"] = 1] = "INVALID_PATTERN";
    LexerDefinitionErrorType[LexerDefinitionErrorType["EOI_ANCHOR_FOUND"] = 2] = "EOI_ANCHOR_FOUND";
    LexerDefinitionErrorType[LexerDefinitionErrorType["UNSUPPORTED_FLAGS_FOUND"] = 3] = "UNSUPPORTED_FLAGS_FOUND";
    LexerDefinitionErrorType[LexerDefinitionErrorType["DUPLICATE_PATTERNS_FOUND"] = 4] = "DUPLICATE_PATTERNS_FOUND";
    LexerDefinitionErrorType[LexerDefinitionErrorType["INVALID_GROUP_TYPE_FOUND"] = 5] = "INVALID_GROUP_TYPE_FOUND";
    LexerDefinitionErrorType[LexerDefinitionErrorType["PUSH_MODE_DOES_NOT_EXIST"] = 6] = "PUSH_MODE_DOES_NOT_EXIST";
    LexerDefinitionErrorType[LexerDefinitionErrorType["MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE"] = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE";
    LexerDefinitionErrorType[LexerDefinitionErrorType["MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY"] = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY";
    LexerDefinitionErrorType[LexerDefinitionErrorType["MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST"] = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST";
    LexerDefinitionErrorType[LexerDefinitionErrorType["LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED"] = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED";
    LexerDefinitionErrorType[LexerDefinitionErrorType["SOI_ANCHOR_FOUND"] = 11] = "SOI_ANCHOR_FOUND";
    LexerDefinitionErrorType[LexerDefinitionErrorType["EMPTY_MATCH_PATTERN"] = 12] = "EMPTY_MATCH_PATTERN";
    LexerDefinitionErrorType[LexerDefinitionErrorType["NO_LINE_BREAKS_FLAGS"] = 13] = "NO_LINE_BREAKS_FLAGS";
    LexerDefinitionErrorType[LexerDefinitionErrorType["UNREACHABLE_PATTERN"] = 14] = "UNREACHABLE_PATTERN";
    LexerDefinitionErrorType[LexerDefinitionErrorType["IDENTIFY_TERMINATOR"] = 15] = "IDENTIFY_TERMINATOR";
    LexerDefinitionErrorType[LexerDefinitionErrorType["CUSTOM_LINE_BREAK"] = 16] = "CUSTOM_LINE_BREAK";
  })(LexerDefinitionErrorType || (LexerDefinitionErrorType = {}));

  var DEFAULT_LEXER_CONFIG = {
    deferDefinitionErrorsHandling: false,
    positionTracking: "full",
    lineTerminatorsPattern: /\n|\r\n?/g,
    lineTerminatorCharacters: ["\n", "\r"],
    ensureOptimizations: false,
    safeMode: false,
    errorMessageProvider: defaultLexerErrorProvider,
    traceInitPerf: false,
    skipValidations: false
  };
  Object.freeze(DEFAULT_LEXER_CONFIG);

  var Lexer =
  /** @class */
  function () {
    function Lexer(lexerDefinition, config) {
      var _this = this;

      if (config === void 0) {
        config = DEFAULT_LEXER_CONFIG;
      }

      this.lexerDefinition = lexerDefinition;
      this.lexerDefinitionErrors = [];
      this.lexerDefinitionWarning = [];
      this.patternIdxToConfig = {};
      this.charCodeToPatternIdxToConfig = {};
      this.modes = [];
      this.emptyGroups = {};
      this.config = undefined;
      this.trackStartLines = true;
      this.trackEndLines = true;
      this.hasCustom = false;
      this.canModeBeOptimized = {};

      if (typeof config === "boolean") {
        throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\n" + "a boolean 2nd argument is no longer supported");
      } // todo: defaults func?


      this.config = merge(DEFAULT_LEXER_CONFIG, config);
      var traceInitVal = this.config.traceInitPerf;

      if (traceInitVal === true) {
        this.traceInitMaxIdent = Infinity;
        this.traceInitPerf = true;
      } else if (typeof traceInitVal === "number") {
        this.traceInitMaxIdent = traceInitVal;
        this.traceInitPerf = true;
      }

      this.traceInitIndent = -1;
      this.TRACE_INIT("Lexer Constructor", function () {
        var actualDefinition;
        var hasOnlySingleMode = true;

        _this.TRACE_INIT("Lexer Config handling", function () {
          if (_this.config.lineTerminatorsPattern === DEFAULT_LEXER_CONFIG.lineTerminatorsPattern) {
            // optimized built-in implementation for the defaults definition of lineTerminators
            _this.config.lineTerminatorsPattern = LineTerminatorOptimizedTester;
          } else {
            if (_this.config.lineTerminatorCharacters === DEFAULT_LEXER_CONFIG.lineTerminatorCharacters) {
              throw Error("Error: Missing <lineTerminatorCharacters> property on the Lexer config.\n" + "\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS");
            }
          }

          if (config.safeMode && config.ensureOptimizations) {
            throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
          }

          _this.trackStartLines = /full|onlyStart/i.test(_this.config.positionTracking);
          _this.trackEndLines = /full/i.test(_this.config.positionTracking); // Convert SingleModeLexerDefinition into a IMultiModeLexerDefinition.

          if (isArray(lexerDefinition)) {
            actualDefinition = {
              modes: {}
            };
            actualDefinition.modes[DEFAULT_MODE] = cloneArr(lexerDefinition);
            actualDefinition[DEFAULT_MODE] = DEFAULT_MODE;
          } else {
            // no conversion needed, input should already be a IMultiModeLexerDefinition
            hasOnlySingleMode = false;
            actualDefinition = cloneObj(lexerDefinition);
          }
        });

        if (_this.config.skipValidations === false) {
          _this.TRACE_INIT("performRuntimeChecks", function () {
            _this.lexerDefinitionErrors = _this.lexerDefinitionErrors.concat(performRuntimeChecks(actualDefinition, _this.trackStartLines, _this.config.lineTerminatorCharacters));
          });

          _this.TRACE_INIT("performWarningRuntimeChecks", function () {
            _this.lexerDefinitionWarning = _this.lexerDefinitionWarning.concat(performWarningRuntimeChecks(actualDefinition, _this.trackStartLines, _this.config.lineTerminatorCharacters));
          });
        } // for extra robustness to avoid throwing an none informative error message


        actualDefinition.modes = actualDefinition.modes ? actualDefinition.modes : {}; // an error of undefined TokenTypes will be detected in "performRuntimeChecks" above.
        // this transformation is to increase robustness in the case of partially invalid lexer definition.

        forEach(actualDefinition.modes, function (currModeValue, currModeName) {
          actualDefinition.modes[currModeName] = reject(currModeValue, function (currTokType) {
            return isUndefined(currTokType);
          });
        });
        var allModeNames = keys(actualDefinition.modes);
        forEach(actualDefinition.modes, function (currModDef, currModName) {
          _this.TRACE_INIT("Mode: <" + currModName + "> processing", function () {
            _this.modes.push(currModName);

            if (_this.config.skipValidations === false) {
              _this.TRACE_INIT("validatePatterns", function () {
                _this.lexerDefinitionErrors = _this.lexerDefinitionErrors.concat(validatePatterns(currModDef, allModeNames));
              });
            } // If definition errors were encountered, the analysis phase may fail unexpectedly/
            // Considering a lexer with definition errors may never be used, there is no point
            // to performing the analysis anyhow...


            if (isEmpty(_this.lexerDefinitionErrors)) {
              augmentTokenTypes(currModDef);
              var currAnalyzeResult_1;

              _this.TRACE_INIT("analyzeTokenTypes", function () {
                currAnalyzeResult_1 = analyzeTokenTypes(currModDef, {
                  lineTerminatorCharacters: _this.config.lineTerminatorCharacters,
                  positionTracking: config.positionTracking,
                  ensureOptimizations: config.ensureOptimizations,
                  safeMode: config.safeMode,
                  tracer: _this.TRACE_INIT.bind(_this)
                });
              });

              _this.patternIdxToConfig[currModName] = currAnalyzeResult_1.patternIdxToConfig;
              _this.charCodeToPatternIdxToConfig[currModName] = currAnalyzeResult_1.charCodeToPatternIdxToConfig;
              _this.emptyGroups = merge(_this.emptyGroups, currAnalyzeResult_1.emptyGroups);
              _this.hasCustom = currAnalyzeResult_1.hasCustom || _this.hasCustom;
              _this.canModeBeOptimized[currModName] = currAnalyzeResult_1.canBeOptimized;
            }
          });
        });
        _this.defaultMode = actualDefinition.defaultMode;

        if (!isEmpty(_this.lexerDefinitionErrors) && !_this.config.deferDefinitionErrorsHandling) {
          var allErrMessages = map(_this.lexerDefinitionErrors, function (error) {
            return error.message;
          });
          var allErrMessagesString = allErrMessages.join("-----------------------\n");
          throw new Error("Errors detected in definition of Lexer:\n" + allErrMessagesString);
        } // Only print warning if there are no errors, This will avoid pl


        forEach(_this.lexerDefinitionWarning, function (warningDescriptor) {
          PRINT_WARNING(warningDescriptor.message);
        });

        _this.TRACE_INIT("Choosing sub-methods implementations", function () {
          // Choose the relevant internal implementations for this specific parser.
          // These implementations should be in-lined by the JavaScript engine
          // to provide optimal performance in each scenario.
          if (SUPPORT_STICKY) {
            _this.chopInput = IDENTITY;
            _this.match = _this.matchWithTest;
          } else {
            _this.updateLastIndex = NOOP;
            _this.match = _this.matchWithExec;
          }

          if (hasOnlySingleMode) {
            _this.handleModes = NOOP;
          }

          if (_this.trackStartLines === false) {
            _this.computeNewColumn = IDENTITY;
          }

          if (_this.trackEndLines === false) {
            _this.updateTokenEndLineColumnLocation = NOOP;
          }

          if (/full/i.test(_this.config.positionTracking)) {
            _this.createTokenInstance = _this.createFullToken;
          } else if (/onlyStart/i.test(_this.config.positionTracking)) {
            _this.createTokenInstance = _this.createStartOnlyToken;
          } else if (/onlyOffset/i.test(_this.config.positionTracking)) {
            _this.createTokenInstance = _this.createOffsetOnlyToken;
          } else {
            throw Error("Invalid <positionTracking> config option: \"" + _this.config.positionTracking + "\"");
          }

          if (_this.hasCustom) {
            _this.addToken = _this.addTokenUsingPush;
            _this.handlePayload = _this.handlePayloadWithCustom;
          } else {
            _this.addToken = _this.addTokenUsingMemberAccess;
            _this.handlePayload = _this.handlePayloadNoCustom;
          }
        });

        _this.TRACE_INIT("Failed Optimization Warnings", function () {
          var unOptimizedModes = reduce(_this.canModeBeOptimized, function (cannotBeOptimized, canBeOptimized, modeName) {
            if (canBeOptimized === false) {
              cannotBeOptimized.push(modeName);
            }

            return cannotBeOptimized;
          }, []);

          if (config.ensureOptimizations && !isEmpty(unOptimizedModes)) {
            throw Error("Lexer Modes: < " + unOptimizedModes.join(", ") + " > cannot be optimized.\n" + '\t Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.\n' + "\t Or inspect the console log for details on how to resolve these issues.");
          }
        });

        _this.TRACE_INIT("clearRegExpParserCache", function () {
          clearRegExpParserCache();
        });

        _this.TRACE_INIT("toFastProperties", function () {
          toFastProperties(_this);
        });
      });
    }

    Lexer.prototype.tokenize = function (text, initialMode) {
      if (initialMode === void 0) {
        initialMode = this.defaultMode;
      }

      if (!isEmpty(this.lexerDefinitionErrors)) {
        var allErrMessages = map(this.lexerDefinitionErrors, function (error) {
          return error.message;
        });
        var allErrMessagesString = allErrMessages.join("-----------------------\n");
        throw new Error("Unable to Tokenize because Errors detected in definition of Lexer:\n" + allErrMessagesString);
      }

      var lexResult = this.tokenizeInternal(text, initialMode);
      return lexResult;
    }; // There is quite a bit of duplication between this and "tokenizeInternalLazy"
    // This is intentional due to performance considerations.


    Lexer.prototype.tokenizeInternal = function (text, initialMode) {
      var _this = this;

      var i, j, matchAltImage, longerAltIdx, matchedImage, payload, altPayload, imageLength, group, tokType, newToken, errLength, droppedChar, msg, match;
      var orgText = text;
      var orgLength = orgText.length;
      var offset = 0;
      var matchedTokensIndex = 0; // initializing the tokensArray to the "guessed" size.
      // guessing too little will still reduce the number of array re-sizes on pushes.
      // guessing too large (Tested by guessing x4 too large) may cost a bit more of memory
      // but would still have a faster runtime by avoiding (All but one) array resizing.

      var guessedNumberOfTokens = this.hasCustom ? 0 // will break custom token pattern APIs the matchedTokens array will contain undefined elements.
      : Math.floor(text.length / 10);
      var matchedTokens = new Array(guessedNumberOfTokens);
      var errors = [];
      var line = this.trackStartLines ? 1 : undefined;
      var column = this.trackStartLines ? 1 : undefined;
      var groups = cloneEmptyGroups(this.emptyGroups);
      var trackLines = this.trackStartLines;
      var lineTerminatorPattern = this.config.lineTerminatorsPattern;
      var currModePatternsLength = 0;
      var patternIdxToConfig = [];
      var currCharCodeToPatternIdxToConfig = [];
      var modeStack = [];
      var emptyArray = [];
      Object.freeze(emptyArray);
      var getPossiblePatterns = undefined;

      function getPossiblePatternsSlow() {
        return patternIdxToConfig;
      }

      function getPossiblePatternsOptimized(charCode) {
        var optimizedCharIdx = charCodeToOptimizedIndex(charCode);
        var possiblePatterns = currCharCodeToPatternIdxToConfig[optimizedCharIdx];

        if (possiblePatterns === undefined) {
          return emptyArray;
        } else {
          return possiblePatterns;
        }
      }

      var pop_mode = function pop_mode(popToken) {
        // TODO: perhaps avoid this error in the edge case there is no more input?
        if (modeStack.length === 1 && // if we have both a POP_MODE and a PUSH_MODE this is in-fact a "transition"
        // So no error should occur.
        popToken.tokenType.PUSH_MODE === undefined) {
          // if we try to pop the last mode there lexer will no longer have ANY mode.
          // thus the pop is ignored, an error will be created and the lexer will continue parsing in the previous mode.
          var msg_1 = _this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(popToken);

          errors.push({
            offset: popToken.startOffset,
            line: popToken.startLine !== undefined ? popToken.startLine : undefined,
            column: popToken.startColumn !== undefined ? popToken.startColumn : undefined,
            length: popToken.image.length,
            message: msg_1
          });
        } else {
          modeStack.pop();
          var newMode = last(modeStack);
          patternIdxToConfig = _this.patternIdxToConfig[newMode];
          currCharCodeToPatternIdxToConfig = _this.charCodeToPatternIdxToConfig[newMode];
          currModePatternsLength = patternIdxToConfig.length;
          var modeCanBeOptimized = _this.canModeBeOptimized[newMode] && _this.config.safeMode === false;

          if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) {
            getPossiblePatterns = getPossiblePatternsOptimized;
          } else {
            getPossiblePatterns = getPossiblePatternsSlow;
          }
        }
      };

      function push_mode(newMode) {
        modeStack.push(newMode);
        currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode];
        patternIdxToConfig = this.patternIdxToConfig[newMode];
        currModePatternsLength = patternIdxToConfig.length;
        currModePatternsLength = patternIdxToConfig.length;
        var modeCanBeOptimized = this.canModeBeOptimized[newMode] && this.config.safeMode === false;

        if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) {
          getPossiblePatterns = getPossiblePatternsOptimized;
        } else {
          getPossiblePatterns = getPossiblePatternsSlow;
        }
      } // this pattern seems to avoid a V8 de-optimization, although that de-optimization does not
      // seem to matter performance wise.


      push_mode.call(this, initialMode);
      var currConfig;

      while (offset < orgLength) {
        matchedImage = null;
        var nextCharCode = orgText.charCodeAt(offset);
        var chosenPatternIdxToConfig = getPossiblePatterns(nextCharCode);
        var chosenPatternsLength = chosenPatternIdxToConfig.length;

        for (i = 0; i < chosenPatternsLength; i++) {
          currConfig = chosenPatternIdxToConfig[i];
          var currPattern = currConfig.pattern;
          payload = null; // manually in-lined because > 600 chars won't be in-lined in V8

          var singleCharCode = currConfig["short"];

          if (singleCharCode !== false) {
            if (nextCharCode === singleCharCode) {
              // single character string
              matchedImage = currPattern;
            }
          } else if (currConfig.isCustom === true) {
            match = currPattern.exec(orgText, offset, matchedTokens, groups);

            if (match !== null) {
              matchedImage = match[0];

              if (match.payload !== undefined) {
                payload = match.payload;
              }
            } else {
              matchedImage = null;
            }
          } else {
            this.updateLastIndex(currPattern, offset);
            matchedImage = this.match(currPattern, text, offset);
          }

          if (matchedImage !== null) {
            // even though this pattern matched we must try a another longer alternative.
            // this can be used to prioritize keywords over identifiers
            longerAltIdx = currConfig.longerAlt;

            if (longerAltIdx !== undefined) {
              // TODO: micro optimize, avoid extra prop access
              // by saving/linking longerAlt on the original config?
              var longerAltConfig = patternIdxToConfig[longerAltIdx];
              var longerAltPattern = longerAltConfig.pattern;
              altPayload = null; // single Char can never be a longer alt so no need to test it.
              // manually in-lined because > 600 chars won't be in-lined in V8

              if (longerAltConfig.isCustom === true) {
                match = longerAltPattern.exec(orgText, offset, matchedTokens, groups);

                if (match !== null) {
                  matchAltImage = match[0];

                  if (match.payload !== undefined) {
                    altPayload = match.payload;
                  }
                } else {
                  matchAltImage = null;
                }
              } else {
                this.updateLastIndex(longerAltPattern, offset);
                matchAltImage = this.match(longerAltPattern, text, offset);
              }

              if (matchAltImage && matchAltImage.length > matchedImage.length) {
                matchedImage = matchAltImage;
                payload = altPayload;
                currConfig = longerAltConfig;
              }
            }

            break;
          }
        } // successful match


        if (matchedImage !== null) {
          imageLength = matchedImage.length;
          group = currConfig.group;

          if (group !== undefined) {
            tokType = currConfig.tokenTypeIdx; // TODO: "offset + imageLength" and the new column may be computed twice in case of "full" location information inside
            // createFullToken method

            newToken = this.createTokenInstance(matchedImage, offset, tokType, currConfig.tokenType, line, column, imageLength);
            this.handlePayload(newToken, payload); // TODO: optimize NOOP in case there are no special groups?

            if (group === false) {
              matchedTokensIndex = this.addToken(matchedTokens, matchedTokensIndex, newToken);
            } else {
              groups[group].push(newToken);
            }
          }

          text = this.chopInput(text, imageLength);
          offset = offset + imageLength; // TODO: with newlines the column may be assigned twice

          column = this.computeNewColumn(column, imageLength);

          if (trackLines === true && currConfig.canLineTerminator === true) {
            var numOfLTsInMatch = 0;
            var foundTerminator = void 0;
            var lastLTEndOffset = void 0;
            lineTerminatorPattern.lastIndex = 0;

            do {
              foundTerminator = lineTerminatorPattern.test(matchedImage);

              if (foundTerminator === true) {
                lastLTEndOffset = lineTerminatorPattern.lastIndex - 1;
                numOfLTsInMatch++;
              }
            } while (foundTerminator === true);

            if (numOfLTsInMatch !== 0) {
              line = line + numOfLTsInMatch;
              column = imageLength - lastLTEndOffset;
              this.updateTokenEndLineColumnLocation(newToken, group, lastLTEndOffset, numOfLTsInMatch, line, column, imageLength);
            }
          } // will be NOOP if no modes present


          this.handleModes(currConfig, pop_mode, push_mode, newToken);
        } else {
          // error recovery, drop characters until we identify a valid token's start point
          var errorStartOffset = offset;
          var errorLine = line;
          var errorColumn = column;
          var foundResyncPoint = false;

          while (!foundResyncPoint && offset < orgLength) {
            // drop chars until we succeed in matching something
            droppedChar = orgText.charCodeAt(offset); // Identity Func (when sticky flag is enabled)

            text = this.chopInput(text, 1);
            offset++;

            for (j = 0; j < currModePatternsLength; j++) {
              var currConfig_1 = patternIdxToConfig[j];
              var currPattern = currConfig_1.pattern; // manually in-lined because > 600 chars won't be in-lined in V8

              var singleCharCode = currConfig_1["short"];

              if (singleCharCode !== false) {
                if (orgText.charCodeAt(offset) === singleCharCode) {
                  // single character string
                  foundResyncPoint = true;
                }
              } else if (currConfig_1.isCustom === true) {
                foundResyncPoint = currPattern.exec(orgText, offset, matchedTokens, groups) !== null;
              } else {
                this.updateLastIndex(currPattern, offset);
                foundResyncPoint = currPattern.exec(text) !== null;
              }

              if (foundResyncPoint === true) {
                break;
              }
            }
          }

          errLength = offset - errorStartOffset; // at this point we either re-synced or reached the end of the input text

          msg = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(orgText, errorStartOffset, errLength, errorLine, errorColumn);
          errors.push({
            offset: errorStartOffset,
            line: errorLine,
            column: errorColumn,
            length: errLength,
            message: msg
          });
        }
      } // if we do have custom patterns which push directly into the
      // TODO: custom tokens should not push directly??


      if (!this.hasCustom) {
        // if we guessed a too large size for the tokens array this will shrink it to the right size.
        matchedTokens.length = matchedTokensIndex;
      }

      return {
        tokens: matchedTokens,
        groups: groups,
        errors: errors
      };
    };

    Lexer.prototype.handleModes = function (config, pop_mode, push_mode, newToken) {
      if (config.pop === true) {
        // need to save the PUSH_MODE property as if the mode is popped
        // patternIdxToPopMode is updated to reflect the new mode after popping the stack
        var pushMode = config.push;
        pop_mode(newToken);

        if (pushMode !== undefined) {
          push_mode.call(this, pushMode);
        }
      } else if (config.push !== undefined) {
        push_mode.call(this, config.push);
      }
    };

    Lexer.prototype.chopInput = function (text, length) {
      return text.substring(length);
    };

    Lexer.prototype.updateLastIndex = function (regExp, newLastIndex) {
      regExp.lastIndex = newLastIndex;
    }; // TODO: decrease this under 600 characters? inspect stripping comments option in TSC compiler


    Lexer.prototype.updateTokenEndLineColumnLocation = function (newToken, group, lastLTIdx, numOfLTsInMatch, line, column, imageLength) {
      var lastCharIsLT, fixForEndingInLT;

      if (group !== undefined) {
        // a none skipped multi line Token, need to update endLine/endColumn
        lastCharIsLT = lastLTIdx === imageLength - 1;
        fixForEndingInLT = lastCharIsLT ? -1 : 0;

        if (!(numOfLTsInMatch === 1 && lastCharIsLT === true)) {
          // if a token ends in a LT that last LT only affects the line numbering of following Tokens
          newToken.endLine = line + fixForEndingInLT; // the last LT in a token does not affect the endColumn either as the [columnStart ... columnEnd)
          // inclusive to exclusive range.

          newToken.endColumn = column - 1 + -fixForEndingInLT;
        } // else single LT in the last character of a token, no need to modify the endLine/EndColumn

      }
    };

    Lexer.prototype.computeNewColumn = function (oldColumn, imageLength) {
      return oldColumn + imageLength;
    }; // Place holder, will be replaced by the correct variant according to the locationTracking option at runtime.

    /* istanbul ignore next - place holder */


    Lexer.prototype.createTokenInstance = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return null;
    };

    Lexer.prototype.createOffsetOnlyToken = function (image, startOffset, tokenTypeIdx, tokenType) {
      return {
        image: image,
        startOffset: startOffset,
        tokenTypeIdx: tokenTypeIdx,
        tokenType: tokenType
      };
    };

    Lexer.prototype.createStartOnlyToken = function (image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn) {
      return {
        image: image,
        startOffset: startOffset,
        startLine: startLine,
        startColumn: startColumn,
        tokenTypeIdx: tokenTypeIdx,
        tokenType: tokenType
      };
    };

    Lexer.prototype.createFullToken = function (image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn, imageLength) {
      return {
        image: image,
        startOffset: startOffset,
        endOffset: startOffset + imageLength - 1,
        startLine: startLine,
        endLine: startLine,
        startColumn: startColumn,
        endColumn: startColumn + imageLength - 1,
        tokenTypeIdx: tokenTypeIdx,
        tokenType: tokenType
      };
    }; // Place holder, will be replaced by the correct variant according to the locationTracking option at runtime.

    /* istanbul ignore next - place holder */


    Lexer.prototype.addToken = function (tokenVector, index, tokenToAdd) {
      return 666;
    };

    Lexer.prototype.addTokenUsingPush = function (tokenVector, index, tokenToAdd) {
      tokenVector.push(tokenToAdd);
      return index;
    };

    Lexer.prototype.addTokenUsingMemberAccess = function (tokenVector, index, tokenToAdd) {
      tokenVector[index] = tokenToAdd;
      index++;
      return index;
    }; // Place holder, will be replaced by the correct variant according to the hasCustom flag option at runtime.

    /* istanbul ignore next - place holder */


    Lexer.prototype.handlePayload = function (token, payload) {};

    Lexer.prototype.handlePayloadNoCustom = function (token, payload) {};

    Lexer.prototype.handlePayloadWithCustom = function (token, payload) {
      if (payload !== null) {
        token.payload = payload;
      }
    };
    /* istanbul ignore next - place holder to be replaced with chosen alternative at runtime */


    Lexer.prototype.match = function (pattern, text, offset) {
      return null;
    };

    Lexer.prototype.matchWithTest = function (pattern, text, offset) {
      var found = pattern.test(text);

      if (found === true) {
        return text.substring(offset, pattern.lastIndex);
      }

      return null;
    };

    Lexer.prototype.matchWithExec = function (pattern, text) {
      var regExpArray = pattern.exec(text);
      return regExpArray !== null ? regExpArray[0] : regExpArray;
    }; // Duplicated from the parser's perf trace trait to allow future extraction
    // of the lexer to a separate package.


    Lexer.prototype.TRACE_INIT = function (phaseDesc, phaseImpl) {
      // No need to optimize this using NOOP pattern because
      // It is not called in a hot spot...
      if (this.traceInitPerf === true) {
        this.traceInitIndent++;
        var indent = new Array(this.traceInitIndent + 1).join("\t");

        if (this.traceInitIndent < this.traceInitMaxIdent) {
          console.log(indent + "--> <" + phaseDesc + ">");
        }

        var _a = timer(phaseImpl),
            time = _a.time,
            value = _a.value;
        /* istanbul ignore next - Difficult to reproduce specific performance behavior (>10ms) in tests */


        var traceMethod = time > 10 ? console.warn : console.log;

        if (this.traceInitIndent < this.traceInitMaxIdent) {
          traceMethod(indent + "<-- <" + phaseDesc + "> time: " + time + "ms");
        }

        this.traceInitIndent--;
        return value;
      } else {
        return phaseImpl();
      }
    };

    Lexer.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it will" + "be consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
    Lexer.NA = /NOT_APPLICABLE/;
    return Lexer;
  }();

  function tokenLabel(tokType) {
    if (hasTokenLabel(tokType)) {
      return tokType.LABEL;
    } else {
      return tokType.name;
    }
  }
  function tokenName(tokType) {
    return tokType.name;
  }
  function hasTokenLabel(obj) {
    return isString(obj.LABEL) && obj.LABEL !== "";
  }
  var PARENT = "parent";
  var CATEGORIES = "categories";
  var LABEL = "label";
  var GROUP = "group";
  var PUSH_MODE = "push_mode";
  var POP_MODE = "pop_mode";
  var LONGER_ALT = "longer_alt";
  var LINE_BREAKS = "line_breaks";
  var START_CHARS_HINT = "start_chars_hint";
  function createToken(config) {
    return createTokenInternal(config);
  }

  function createTokenInternal(config) {
    var pattern = config.pattern;
    var tokenType = {};
    tokenType.name = config.name;

    if (!isUndefined(pattern)) {
      tokenType.PATTERN = pattern;
    }

    if (has(config, PARENT)) {
      throw "The parent property is no longer supported.\n" + "See: https://github.com/SAP/chevrotain/issues/564#issuecomment-349062346 for details.";
    }

    if (has(config, CATEGORIES)) {
      // casting to ANY as this will be fixed inside `augmentTokenTypes``
      tokenType.CATEGORIES = config[CATEGORIES];
    }

    augmentTokenTypes([tokenType]);

    if (has(config, LABEL)) {
      tokenType.LABEL = config[LABEL];
    }

    if (has(config, GROUP)) {
      tokenType.GROUP = config[GROUP];
    }

    if (has(config, POP_MODE)) {
      tokenType.POP_MODE = config[POP_MODE];
    }

    if (has(config, PUSH_MODE)) {
      tokenType.PUSH_MODE = config[PUSH_MODE];
    }

    if (has(config, LONGER_ALT)) {
      tokenType.LONGER_ALT = config[LONGER_ALT];
    }

    if (has(config, LINE_BREAKS)) {
      tokenType.LINE_BREAKS = config[LINE_BREAKS];
    }

    if (has(config, START_CHARS_HINT)) {
      tokenType.START_CHARS_HINT = config[START_CHARS_HINT];
    }

    return tokenType;
  }

  var EOF = createToken({
    name: "EOF",
    pattern: Lexer.NA
  });
  augmentTokenTypes([EOF]);
  function createTokenInstance(tokType, image, startOffset, endOffset, startLine, endLine, startColumn, endColumn) {
    return {
      image: image,
      startOffset: startOffset,
      endOffset: endOffset,
      startLine: startLine,
      endLine: endLine,
      startColumn: startColumn,
      endColumn: endColumn,
      tokenTypeIdx: tokType.tokenTypeIdx,
      tokenType: tokType
    };
  }
  function tokenMatcher(token, tokType) {
    return tokenStructuredMatcher(token, tokType);
  }

  var __extends$2 = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    return function (d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();

  var AbstractProduction =
  /** @class */
  function () {
    function AbstractProduction(_definition) {
      this._definition = _definition;
    }

    Object.defineProperty(AbstractProduction.prototype, "definition", {
      get: function get() {
        return this._definition;
      },
      set: function set(value) {
        this._definition = value;
      },
      enumerable: false,
      configurable: true
    });

    AbstractProduction.prototype.accept = function (visitor) {
      visitor.visit(this);
      forEach(this.definition, function (prod) {
        prod.accept(visitor);
      });
    };

    return AbstractProduction;
  }();

  var NonTerminal =
  /** @class */
  function (_super) {
    __extends$2(NonTerminal, _super);

    function NonTerminal(options) {
      var _this = _super.call(this, []) || this;

      _this.idx = 1;
      assign(_this, pick(options, function (v) {
        return v !== undefined;
      }));
      return _this;
    }

    Object.defineProperty(NonTerminal.prototype, "definition", {
      get: function get() {
        if (this.referencedRule !== undefined) {
          return this.referencedRule.definition;
        }

        return [];
      },
      set: function set(definition) {// immutable
      },
      enumerable: false,
      configurable: true
    });

    NonTerminal.prototype.accept = function (visitor) {
      visitor.visit(this); // don't visit children of a reference, we will get cyclic infinite loops if we do so
    };

    return NonTerminal;
  }(AbstractProduction);

  var Rule =
  /** @class */
  function (_super) {
    __extends$2(Rule, _super);

    function Rule(options) {
      var _this = _super.call(this, options.definition) || this;

      _this.orgText = "";
      assign(_this, pick(options, function (v) {
        return v !== undefined;
      }));
      return _this;
    }

    return Rule;
  }(AbstractProduction);

  var Alternative =
  /** @class */
  function (_super) {
    __extends$2(Alternative, _super);

    function Alternative(options) {
      var _this = _super.call(this, options.definition) || this;

      _this.ignoreAmbiguities = false;
      assign(_this, pick(options, function (v) {
        return v !== undefined;
      }));
      return _this;
    }

    return Alternative;
  }(AbstractProduction);

  var Option =
  /** @class */
  function (_super) {
    __extends$2(Option, _super);

    function Option(options) {
      var _this = _super.call(this, options.definition) || this;

      _this.idx = 1;
      assign(_this, pick(options, function (v) {
        return v !== undefined;
      }));
      return _this;
    }

    return Option;
  }(AbstractProduction);

  var RepetitionMandatory =
  /** @class */
  function (_super) {
    __extends$2(RepetitionMandatory, _super);

    function RepetitionMandatory(options) {
      var _this = _super.call(this, options.definition) || this;

      _this.idx = 1;
      assign(_this, pick(options, function (v) {
        return v !== undefined;
      }));
      return _this;
    }

    return RepetitionMandatory;
  }(AbstractProduction);

  var RepetitionMandatoryWithSeparator =
  /** @class */
  function (_super) {
    __extends$2(RepetitionMandatoryWithSeparator, _super);

    function RepetitionMandatoryWithSeparator(options) {
      var _this = _super.call(this, options.definition) || this;

      _this.idx = 1;
      assign(_this, pick(options, function (v) {
        return v !== undefined;
      }));
      return _this;
    }

    return RepetitionMandatoryWithSeparator;
  }(AbstractProduction);

  var Repetition =
  /** @class */
  function (_super) {
    __extends$2(Repetition, _super);

    function Repetition(options) {
      var _this = _super.call(this, options.definition) || this;

      _this.idx = 1;
      assign(_this, pick(options, function (v) {
        return v !== undefined;
      }));
      return _this;
    }

    return Repetition;
  }(AbstractProduction);

  var RepetitionWithSeparator =
  /** @class */
  function (_super) {
    __extends$2(RepetitionWithSeparator, _super);

    function RepetitionWithSeparator(options) {
      var _this = _super.call(this, options.definition) || this;

      _this.idx = 1;
      assign(_this, pick(options, function (v) {
        return v !== undefined;
      }));
      return _this;
    }

    return RepetitionWithSeparator;
  }(AbstractProduction);

  var Alternation =
  /** @class */
  function (_super) {
    __extends$2(Alternation, _super);

    function Alternation(options) {
      var _this = _super.call(this, options.definition) || this;

      _this.idx = 1;
      _this.ignoreAmbiguities = false;
      _this.hasPredicates = false;
      assign(_this, pick(options, function (v) {
        return v !== undefined;
      }));
      return _this;
    }

    Object.defineProperty(Alternation.prototype, "definition", {
      get: function get() {
        return this._definition;
      },
      set: function set(value) {
        this._definition = value;
      },
      enumerable: false,
      configurable: true
    });
    return Alternation;
  }(AbstractProduction);

  var Terminal =
  /** @class */
  function () {
    function Terminal(options) {
      this.idx = 1;
      assign(this, pick(options, function (v) {
        return v !== undefined;
      }));
    }

    Terminal.prototype.accept = function (visitor) {
      visitor.visit(this);
    };

    return Terminal;
  }();
  function serializeGrammar(topRules) {
    return map(topRules, serializeProduction);
  }
  function serializeProduction(node) {
    function convertDefinition(definition) {
      return map(definition, serializeProduction);
    }
    /* istanbul ignore else */


    if (node instanceof NonTerminal) {
      return {
        type: "NonTerminal",
        name: node.nonTerminalName,
        idx: node.idx
      };
    } else if (node instanceof Alternative) {
      return {
        type: "Alternative",
        definition: convertDefinition(node.definition)
      };
    } else if (node instanceof Option) {
      return {
        type: "Option",
        idx: node.idx,
        definition: convertDefinition(node.definition)
      };
    } else if (node instanceof RepetitionMandatory) {
      return {
        type: "RepetitionMandatory",
        idx: node.idx,
        definition: convertDefinition(node.definition)
      };
    } else if (node instanceof RepetitionMandatoryWithSeparator) {
      return {
        type: "RepetitionMandatoryWithSeparator",
        idx: node.idx,
        separator: serializeProduction(new Terminal({
          terminalType: node.separator
        })),
        definition: convertDefinition(node.definition)
      };
    } else if (node instanceof RepetitionWithSeparator) {
      return {
        type: "RepetitionWithSeparator",
        idx: node.idx,
        separator: serializeProduction(new Terminal({
          terminalType: node.separator
        })),
        definition: convertDefinition(node.definition)
      };
    } else if (node instanceof Repetition) {
      return {
        type: "Repetition",
        idx: node.idx,
        definition: convertDefinition(node.definition)
      };
    } else if (node instanceof Alternation) {
      return {
        type: "Alternation",
        idx: node.idx,
        definition: convertDefinition(node.definition)
      };
    } else if (node instanceof Terminal) {
      var serializedTerminal = {
        type: "Terminal",
        name: node.terminalType.name,
        label: tokenLabel(node.terminalType),
        idx: node.idx
      };
      var pattern = node.terminalType.PATTERN;

      if (node.terminalType.PATTERN) {
        serializedTerminal.pattern = isRegExp(pattern) ? pattern.source : pattern;
      }

      return serializedTerminal;
    } else if (node instanceof Rule) {
      return {
        type: "Rule",
        name: node.name,
        orgText: node.orgText,
        definition: convertDefinition(node.definition)
      };
    } else {
      throw Error("non exhaustive match");
    }
  }

  /**
   *  A Grammar Walker that computes the "remaining" grammar "after" a productions in the grammar.
   */

  var RestWalker =
  /** @class */
  function () {
    function RestWalker() {}

    RestWalker.prototype.walk = function (prod, prevRest) {
      var _this = this;

      if (prevRest === void 0) {
        prevRest = [];
      }

      forEach(prod.definition, function (subProd, index) {
        var currRest = drop(prod.definition, index + 1);
        /* istanbul ignore else */

        if (subProd instanceof NonTerminal) {
          _this.walkProdRef(subProd, currRest, prevRest);
        } else if (subProd instanceof Terminal) {
          _this.walkTerminal(subProd, currRest, prevRest);
        } else if (subProd instanceof Alternative) {
          _this.walkFlat(subProd, currRest, prevRest);
        } else if (subProd instanceof Option) {
          _this.walkOption(subProd, currRest, prevRest);
        } else if (subProd instanceof RepetitionMandatory) {
          _this.walkAtLeastOne(subProd, currRest, prevRest);
        } else if (subProd instanceof RepetitionMandatoryWithSeparator) {
          _this.walkAtLeastOneSep(subProd, currRest, prevRest);
        } else if (subProd instanceof RepetitionWithSeparator) {
          _this.walkManySep(subProd, currRest, prevRest);
        } else if (subProd instanceof Repetition) {
          _this.walkMany(subProd, currRest, prevRest);
        } else if (subProd instanceof Alternation) {
          _this.walkOr(subProd, currRest, prevRest);
        } else {
          throw Error("non exhaustive match");
        }
      });
    };

    RestWalker.prototype.walkTerminal = function (terminal, currRest, prevRest) {};

    RestWalker.prototype.walkProdRef = function (refProd, currRest, prevRest) {};

    RestWalker.prototype.walkFlat = function (flatProd, currRest, prevRest) {
      // ABCDEF => after the D the rest is EF
      var fullOrRest = currRest.concat(prevRest);
      this.walk(flatProd, fullOrRest);
    };

    RestWalker.prototype.walkOption = function (optionProd, currRest, prevRest) {
      // ABC(DE)?F => after the (DE)? the rest is F
      var fullOrRest = currRest.concat(prevRest);
      this.walk(optionProd, fullOrRest);
    };

    RestWalker.prototype.walkAtLeastOne = function (atLeastOneProd, currRest, prevRest) {
      // ABC(DE)+F => after the (DE)+ the rest is (DE)?F
      var fullAtLeastOneRest = [new Option({
        definition: atLeastOneProd.definition
      })].concat(currRest, prevRest);
      this.walk(atLeastOneProd, fullAtLeastOneRest);
    };

    RestWalker.prototype.walkAtLeastOneSep = function (atLeastOneSepProd, currRest, prevRest) {
      // ABC DE(,DE)* F => after the (,DE)+ the rest is (,DE)?F
      var fullAtLeastOneSepRest = restForRepetitionWithSeparator(atLeastOneSepProd, currRest, prevRest);
      this.walk(atLeastOneSepProd, fullAtLeastOneSepRest);
    };

    RestWalker.prototype.walkMany = function (manyProd, currRest, prevRest) {
      // ABC(DE)*F => after the (DE)* the rest is (DE)?F
      var fullManyRest = [new Option({
        definition: manyProd.definition
      })].concat(currRest, prevRest);
      this.walk(manyProd, fullManyRest);
    };

    RestWalker.prototype.walkManySep = function (manySepProd, currRest, prevRest) {
      // ABC (DE(,DE)*)? F => after the (,DE)* the rest is (,DE)?F
      var fullManySepRest = restForRepetitionWithSeparator(manySepProd, currRest, prevRest);
      this.walk(manySepProd, fullManySepRest);
    };

    RestWalker.prototype.walkOr = function (orProd, currRest, prevRest) {
      var _this = this; // ABC(D|E|F)G => when finding the (D|E|F) the rest is G


      var fullOrRest = currRest.concat(prevRest); // walk all different alternatives

      forEach(orProd.definition, function (alt) {
        // wrapping each alternative in a single definition wrapper
        // to avoid errors in computing the rest of that alternative in the invocation to computeInProdFollows
        // (otherwise for OR([alt1,alt2]) alt2 will be considered in 'rest' of alt1
        var prodWrapper = new Alternative({
          definition: [alt]
        });

        _this.walk(prodWrapper, fullOrRest);
      });
    };

    return RestWalker;
  }();

  function restForRepetitionWithSeparator(repSepProd, currRest, prevRest) {
    var repSepRest = [new Option({
      definition: [new Terminal({
        terminalType: repSepProd.separator
      })].concat(repSepProd.definition)
    })];
    var fullRepSepRest = repSepRest.concat(currRest, prevRest);
    return fullRepSepRest;
  }

  var GAstVisitor =
  /** @class */
  function () {
    function GAstVisitor() {}

    GAstVisitor.prototype.visit = function (node) {
      var nodeAny = node;

      switch (nodeAny.constructor) {
        case NonTerminal:
          return this.visitNonTerminal(nodeAny);

        case Alternative:
          return this.visitAlternative(nodeAny);

        case Option:
          return this.visitOption(nodeAny);

        case RepetitionMandatory:
          return this.visitRepetitionMandatory(nodeAny);

        case RepetitionMandatoryWithSeparator:
          return this.visitRepetitionMandatoryWithSeparator(nodeAny);

        case RepetitionWithSeparator:
          return this.visitRepetitionWithSeparator(nodeAny);

        case Repetition:
          return this.visitRepetition(nodeAny);

        case Alternation:
          return this.visitAlternation(nodeAny);

        case Terminal:
          return this.visitTerminal(nodeAny);

        case Rule:
          return this.visitRule(nodeAny);

        /* istanbul ignore next */

        default:
          throw Error("non exhaustive match");
      }
    };

    GAstVisitor.prototype.visitNonTerminal = function (node) {};

    GAstVisitor.prototype.visitAlternative = function (node) {};

    GAstVisitor.prototype.visitOption = function (node) {};

    GAstVisitor.prototype.visitRepetition = function (node) {};

    GAstVisitor.prototype.visitRepetitionMandatory = function (node) {};

    GAstVisitor.prototype.visitRepetitionMandatoryWithSeparator = function (node) {};

    GAstVisitor.prototype.visitRepetitionWithSeparator = function (node) {};

    GAstVisitor.prototype.visitAlternation = function (node) {};

    GAstVisitor.prototype.visitTerminal = function (node) {};

    GAstVisitor.prototype.visitRule = function (node) {};

    return GAstVisitor;
  }();

  var __extends$3 = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    return function (d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  function isSequenceProd(prod) {
    return prod instanceof Alternative || prod instanceof Option || prod instanceof Repetition || prod instanceof RepetitionMandatory || prod instanceof RepetitionMandatoryWithSeparator || prod instanceof RepetitionWithSeparator || prod instanceof Terminal || prod instanceof Rule;
  }
  function isOptionalProd(prod, alreadyVisited) {
    if (alreadyVisited === void 0) {
      alreadyVisited = [];
    }

    var isDirectlyOptional = prod instanceof Option || prod instanceof Repetition || prod instanceof RepetitionWithSeparator;

    if (isDirectlyOptional) {
      return true;
    } // note that this can cause infinite loop if one optional empty TOP production has a cyclic dependency with another
    // empty optional top rule
    // may be indirectly optional ((A?B?C?) | (D?E?F?))


    if (prod instanceof Alternation) {
      // for OR its enough for just one of the alternatives to be optional
      return some(prod.definition, function (subProd) {
        return isOptionalProd(subProd, alreadyVisited);
      });
    } else if (prod instanceof NonTerminal && contains(alreadyVisited, prod)) {
      // avoiding stack overflow due to infinite recursion
      return false;
    } else if (prod instanceof AbstractProduction) {
      if (prod instanceof NonTerminal) {
        alreadyVisited.push(prod);
      }

      return every(prod.definition, function (subProd) {
        return isOptionalProd(subProd, alreadyVisited);
      });
    } else {
      return false;
    }
  }
  function isBranchingProd(prod) {
    return prod instanceof Alternation;
  }
  function getProductionDslName(prod) {
    /* istanbul ignore else */
    if (prod instanceof NonTerminal) {
      return "SUBRULE";
    } else if (prod instanceof Option) {
      return "OPTION";
    } else if (prod instanceof Alternation) {
      return "OR";
    } else if (prod instanceof RepetitionMandatory) {
      return "AT_LEAST_ONE";
    } else if (prod instanceof RepetitionMandatoryWithSeparator) {
      return "AT_LEAST_ONE_SEP";
    } else if (prod instanceof RepetitionWithSeparator) {
      return "MANY_SEP";
    } else if (prod instanceof Repetition) {
      return "MANY";
    } else if (prod instanceof Terminal) {
      return "CONSUME";
    } else {
      throw Error("non exhaustive match");
    }
  }

  var DslMethodsCollectorVisitor =
  /** @class */
  function (_super) {
    __extends$3(DslMethodsCollectorVisitor, _super);

    function DslMethodsCollectorVisitor() {
      var _this = _super !== null && _super.apply(this, arguments) || this; // A minus is never valid in an identifier name


      _this.separator = "-";
      _this.dslMethods = {
        option: [],
        alternation: [],
        repetition: [],
        repetitionWithSeparator: [],
        repetitionMandatory: [],
        repetitionMandatoryWithSeparator: []
      };
      return _this;
    }

    DslMethodsCollectorVisitor.prototype.reset = function () {
      this.dslMethods = {
        option: [],
        alternation: [],
        repetition: [],
        repetitionWithSeparator: [],
        repetitionMandatory: [],
        repetitionMandatoryWithSeparator: []
      };
    };

    DslMethodsCollectorVisitor.prototype.visitTerminal = function (terminal) {
      var key = terminal.terminalType.name + this.separator + "Terminal";

      if (!has(this.dslMethods, key)) {
        this.dslMethods[key] = [];
      }

      this.dslMethods[key].push(terminal);
    };

    DslMethodsCollectorVisitor.prototype.visitNonTerminal = function (subrule) {
      var key = subrule.nonTerminalName + this.separator + "Terminal";

      if (!has(this.dslMethods, key)) {
        this.dslMethods[key] = [];
      }

      this.dslMethods[key].push(subrule);
    };

    DslMethodsCollectorVisitor.prototype.visitOption = function (option) {
      this.dslMethods.option.push(option);
    };

    DslMethodsCollectorVisitor.prototype.visitRepetitionWithSeparator = function (manySep) {
      this.dslMethods.repetitionWithSeparator.push(manySep);
    };

    DslMethodsCollectorVisitor.prototype.visitRepetitionMandatory = function (atLeastOne) {
      this.dslMethods.repetitionMandatory.push(atLeastOne);
    };

    DslMethodsCollectorVisitor.prototype.visitRepetitionMandatoryWithSeparator = function (atLeastOneSep) {
      this.dslMethods.repetitionMandatoryWithSeparator.push(atLeastOneSep);
    };

    DslMethodsCollectorVisitor.prototype.visitRepetition = function (many) {
      this.dslMethods.repetition.push(many);
    };

    DslMethodsCollectorVisitor.prototype.visitAlternation = function (or) {
      this.dslMethods.alternation.push(or);
    };

    return DslMethodsCollectorVisitor;
  }(GAstVisitor);
  var collectorVisitor = new DslMethodsCollectorVisitor();
  function collectMethods(rule) {
    collectorVisitor.reset();
    rule.accept(collectorVisitor);
    var dslMethods = collectorVisitor.dslMethods; // avoid uncleaned references

    collectorVisitor.reset();
    return dslMethods;
  }

  function first$1(prod) {
    /* istanbul ignore else */
    if (prod instanceof NonTerminal) {
      // this could in theory cause infinite loops if
      // (1) prod A refs prod B.
      // (2) prod B refs prod A
      // (3) AB can match the empty set
      // in other words a cycle where everything is optional so the first will keep
      // looking ahead for the next optional part and will never exit
      // currently there is no safeguard for this unique edge case because
      // (1) not sure a grammar in which this can happen is useful for anything (productive)
      return first$1(prod.referencedRule);
    } else if (prod instanceof Terminal) {
      return firstForTerminal(prod);
    } else if (isSequenceProd(prod)) {
      return firstForSequence(prod);
    } else if (isBranchingProd(prod)) {
      return firstForBranching(prod);
    } else {
      throw Error("non exhaustive match");
    }
  }
  function firstForSequence(prod) {
    var firstSet = [];
    var seq = prod.definition;
    var nextSubProdIdx = 0;
    var hasInnerProdsRemaining = seq.length > nextSubProdIdx;
    var currSubProd; // so we enter the loop at least once (if the definition is not empty

    var isLastInnerProdOptional = true; // scan a sequence until it's end or until we have found a NONE optional production in it

    while (hasInnerProdsRemaining && isLastInnerProdOptional) {
      currSubProd = seq[nextSubProdIdx];
      isLastInnerProdOptional = isOptionalProd(currSubProd);
      firstSet = firstSet.concat(first$1(currSubProd));
      nextSubProdIdx = nextSubProdIdx + 1;
      hasInnerProdsRemaining = seq.length > nextSubProdIdx;
    }

    return uniq(firstSet);
  }
  function firstForBranching(prod) {
    var allAlternativesFirsts = map(prod.definition, function (innerProd) {
      return first$1(innerProd);
    });
    return uniq(flatten(allAlternativesFirsts));
  }
  function firstForTerminal(terminal) {
    return [terminal.terminalType];
  }

  // TODO: can this be removed? where is it used?
  var IN = "_~IN~_";

  var __extends$4 = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    return function (d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  // (skipping reference production).

  var ResyncFollowsWalker =
  /** @class */
  function (_super) {
    __extends$4(ResyncFollowsWalker, _super);

    function ResyncFollowsWalker(topProd) {
      var _this = _super.call(this) || this;

      _this.topProd = topProd;
      _this.follows = {};
      return _this;
    }

    ResyncFollowsWalker.prototype.startWalking = function () {
      this.walk(this.topProd);
      return this.follows;
    };

    ResyncFollowsWalker.prototype.walkTerminal = function (terminal, currRest, prevRest) {// do nothing! just like in the public sector after 13:00
    };

    ResyncFollowsWalker.prototype.walkProdRef = function (refProd, currRest, prevRest) {
      var followName = buildBetweenProdsFollowPrefix(refProd.referencedRule, refProd.idx) + this.topProd.name;
      var fullRest = currRest.concat(prevRest);
      var restProd = new Alternative({
        definition: fullRest
      });
      var t_in_topProd_follows = first$1(restProd);
      this.follows[followName] = t_in_topProd_follows;
    };

    return ResyncFollowsWalker;
  }(RestWalker);
  function computeAllProdsFollows(topProductions) {
    var reSyncFollows = {};
    forEach(topProductions, function (topProd) {
      var currRefsFollow = new ResyncFollowsWalker(topProd).startWalking();
      assign(reSyncFollows, currRefsFollow);
    });
    return reSyncFollows;
  }
  function buildBetweenProdsFollowPrefix(inner, occurenceInParent) {
    return inner.name + occurenceInParent + IN;
  }

  var defaultParserErrorProvider = {
    buildMismatchTokenMessage: function buildMismatchTokenMessage(_a) {
      var expected = _a.expected,
          actual = _a.actual,
          previous = _a.previous,
          ruleName = _a.ruleName;
      var hasLabel = hasTokenLabel(expected);
      var expectedMsg = hasLabel ? "--> " + tokenLabel(expected) + " <--" : "token of type --> " + expected.name + " <--";
      var msg = "Expecting " + expectedMsg + " but found --> '" + actual.image + "' <--";
      return msg;
    },
    buildNotAllInputParsedMessage: function buildNotAllInputParsedMessage(_a) {
      var firstRedundant = _a.firstRedundant,
          ruleName = _a.ruleName;
      return "Redundant input, expecting EOF but found: " + firstRedundant.image;
    },
    buildNoViableAltMessage: function buildNoViableAltMessage(_a) {
      var expectedPathsPerAlt = _a.expectedPathsPerAlt,
          actual = _a.actual,
          previous = _a.previous,
          customUserDescription = _a.customUserDescription,
          ruleName = _a.ruleName;
      var errPrefix = "Expecting: "; // TODO: issue: No Viable Alternative Error may have incomplete details. #502

      var actualText = first(actual).image;
      var errSuffix = "\nbut found: '" + actualText + "'";

      if (customUserDescription) {
        return errPrefix + customUserDescription + errSuffix;
      } else {
        var allLookAheadPaths = reduce(expectedPathsPerAlt, function (result, currAltPaths) {
          return result.concat(currAltPaths);
        }, []);
        var nextValidTokenSequences = map(allLookAheadPaths, function (currPath) {
          return "[" + map(currPath, function (currTokenType) {
            return tokenLabel(currTokenType);
          }).join(", ") + "]";
        });
        var nextValidSequenceItems = map(nextValidTokenSequences, function (itemMsg, idx) {
          return "  " + (idx + 1) + ". " + itemMsg;
        });
        var calculatedDescription = "one of these possible Token sequences:\n" + nextValidSequenceItems.join("\n");
        return errPrefix + calculatedDescription + errSuffix;
      }
    },
    buildEarlyExitMessage: function buildEarlyExitMessage(_a) {
      var expectedIterationPaths = _a.expectedIterationPaths,
          actual = _a.actual,
          customUserDescription = _a.customUserDescription,
          ruleName = _a.ruleName;
      var errPrefix = "Expecting: "; // TODO: issue: No Viable Alternative Error may have incomplete details. #502

      var actualText = first(actual).image;
      var errSuffix = "\nbut found: '" + actualText + "'";

      if (customUserDescription) {
        return errPrefix + customUserDescription + errSuffix;
      } else {
        var nextValidTokenSequences = map(expectedIterationPaths, function (currPath) {
          return "[" + map(currPath, function (currTokenType) {
            return tokenLabel(currTokenType);
          }).join(",") + "]";
        });
        var calculatedDescription = "expecting at least one iteration which starts with one of these possible Token sequences::\n  " + ("<" + nextValidTokenSequences.join(" ,") + ">");
        return errPrefix + calculatedDescription + errSuffix;
      }
    }
  };
  Object.freeze(defaultParserErrorProvider);
  var defaultGrammarResolverErrorProvider = {
    buildRuleNotFoundError: function buildRuleNotFoundError(topLevelRule, undefinedRule) {
      var msg = "Invalid grammar, reference to a rule which is not defined: ->" + undefinedRule.nonTerminalName + "<-\n" + "inside top level rule: ->" + topLevelRule.name + "<-";
      return msg;
    }
  };
  var defaultGrammarValidatorErrorProvider = {
    buildDuplicateFoundError: function buildDuplicateFoundError(topLevelRule, duplicateProds) {
      function getExtraProductionArgument(prod) {
        if (prod instanceof Terminal) {
          return prod.terminalType.name;
        } else if (prod instanceof NonTerminal) {
          return prod.nonTerminalName;
        } else {
          return "";
        }
      }

      var topLevelName = topLevelRule.name;
      var duplicateProd = first(duplicateProds);
      var index = duplicateProd.idx;
      var dslName = getProductionDslName(duplicateProd);
      var extraArgument = getExtraProductionArgument(duplicateProd);
      var hasExplicitIndex = index > 0;
      var msg = "->" + dslName + (hasExplicitIndex ? index : "") + "<- " + (extraArgument ? "with argument: ->" + extraArgument + "<-" : "") + "\n                  appears more than once (" + duplicateProds.length + " times) in the top level rule: ->" + topLevelName + "<-.                  \n                  For further details see: https://sap.github.io/chevrotain/docs/FAQ.html#NUMERICAL_SUFFIXES \n                  "; // white space trimming time! better to trim afterwards as it allows to use WELL formatted multi line template strings...

      msg = msg.replace(/[ \t]+/g, " ");
      msg = msg.replace(/\s\s+/g, "\n");
      return msg;
    },
    buildNamespaceConflictError: function buildNamespaceConflictError(rule) {
      var errMsg = "Namespace conflict found in grammar.\n" + ("The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <" + rule.name + ">.\n") + "To resolve this make sure each Terminal and Non-Terminal names are unique\n" + "This is easy to accomplish by using the convention that Terminal names start with an uppercase letter\n" + "and Non-Terminal names start with a lower case letter.";
      return errMsg;
    },
    buildAlternationPrefixAmbiguityError: function buildAlternationPrefixAmbiguityError(options) {
      var pathMsg = map(options.prefixPath, function (currTok) {
        return tokenLabel(currTok);
      }).join(", ");
      var occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
      var errMsg = "Ambiguous alternatives: <" + options.ambiguityIndices.join(" ,") + "> due to common lookahead prefix\n" + ("in <OR" + occurrence + "> inside <" + options.topLevelRule.name + "> Rule,\n") + ("<" + pathMsg + "> may appears as a prefix path in all these alternatives.\n") + "See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX\n" + "For Further details.";
      return errMsg;
    },
    buildAlternationAmbiguityError: function buildAlternationAmbiguityError(options) {
      var pathMsg = map(options.prefixPath, function (currtok) {
        return tokenLabel(currtok);
      }).join(", ");
      var occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
      var currMessage = "Ambiguous Alternatives Detected: <" + options.ambiguityIndices.join(" ,") + "> in <OR" + occurrence + ">" + (" inside <" + options.topLevelRule.name + "> Rule,\n") + ("<" + pathMsg + "> may appears as a prefix path in all these alternatives.\n");
      currMessage = currMessage + "See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES\n" + "For Further details.";
      return currMessage;
    },
    buildEmptyRepetitionError: function buildEmptyRepetitionError(options) {
      var dslName = getProductionDslName(options.repetition);

      if (options.repetition.idx !== 0) {
        dslName += options.repetition.idx;
      }

      var errMsg = "The repetition <" + dslName + "> within Rule <" + options.topLevelRule.name + "> can never consume any tokens.\n" + "This could lead to an infinite loop.";
      return errMsg;
    },
    buildTokenNameError: function buildTokenNameError(options) {
      var tokTypeName = options.tokenType.name;
      var errMsg = "Invalid Grammar Token name: ->" + tokTypeName + "<- it must match the pattern: ->" + options.expectedPattern.toString() + "<-";
      return errMsg;
    },
    buildEmptyAlternationError: function buildEmptyAlternationError(options) {
      var errMsg = "Ambiguous empty alternative: <" + (options.emptyChoiceIdx + 1) + ">" + (" in <OR" + options.alternation.idx + "> inside <" + options.topLevelRule.name + "> Rule.\n") + "Only the last alternative may be an empty alternative.";
      return errMsg;
    },
    buildTooManyAlternativesError: function buildTooManyAlternativesError(options) {
      var errMsg = "An Alternation cannot have more than 256 alternatives:\n" + ("<OR" + options.alternation.idx + "> inside <" + options.topLevelRule.name + "> Rule.\n has " + (options.alternation.definition.length + 1) + " alternatives.");
      return errMsg;
    },
    buildLeftRecursionError: function buildLeftRecursionError(options) {
      var ruleName = options.topLevelRule.name;
      var pathNames = map(options.leftRecursionPath, function (currRule) {
        return currRule.name;
      });
      var leftRecursivePath = ruleName + " --> " + pathNames.concat([ruleName]).join(" --> ");
      var errMsg = "Left Recursion found in grammar.\n" + ("rule: <" + ruleName + "> can be invoked from itself (directly or indirectly)\n") + ("without consuming any Tokens. The grammar path that causes this is: \n " + leftRecursivePath + "\n") + " To fix this refactor your grammar to remove the left recursion.\n" + "see: https://en.wikipedia.org/wiki/LL_parser#Left_Factoring.";
      return errMsg;
    },
    buildInvalidRuleNameError: function buildInvalidRuleNameError(options) {
      var ruleName = options.topLevelRule.name;
      var expectedPatternString = options.expectedPattern.toString();
      var errMsg = "Invalid grammar rule name: ->" + ruleName + "<- it must match the pattern: ->" + expectedPatternString + "<-";
      return errMsg;
    },
    buildDuplicateRuleNameError: function buildDuplicateRuleNameError(options) {
      var ruleName;

      if (options.topLevelRule instanceof Rule) {
        ruleName = options.topLevelRule.name;
      } else {
        ruleName = options.topLevelRule;
      }

      var errMsg = "Duplicate definition, rule: ->" + ruleName + "<- is already defined in the grammar: ->" + options.grammarName + "<-";
      return errMsg;
    }
  };

  var __extends$5 = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    return function (d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  function resolveGrammar(topLevels, errMsgProvider) {
    var refResolver = new GastRefResolverVisitor(topLevels, errMsgProvider);
    refResolver.resolveRefs();
    return refResolver.errors;
  }

  var GastRefResolverVisitor =
  /** @class */
  function (_super) {
    __extends$5(GastRefResolverVisitor, _super);

    function GastRefResolverVisitor(nameToTopRule, errMsgProvider) {
      var _this = _super.call(this) || this;

      _this.nameToTopRule = nameToTopRule;
      _this.errMsgProvider = errMsgProvider;
      _this.errors = [];
      return _this;
    }

    GastRefResolverVisitor.prototype.resolveRefs = function () {
      var _this = this;

      forEach(values(this.nameToTopRule), function (prod) {
        _this.currTopLevel = prod;
        prod.accept(_this);
      });
    };

    GastRefResolverVisitor.prototype.visitNonTerminal = function (node) {
      var ref = this.nameToTopRule[node.nonTerminalName];

      if (!ref) {
        var msg = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, node);
        this.errors.push({
          message: msg,
          type: ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,
          ruleName: this.currTopLevel.name,
          unresolvedRefName: node.nonTerminalName
        });
      } else {
        node.referencedRule = ref;
      }
    };

    return GastRefResolverVisitor;
  }(GAstVisitor);

  var __extends$6 = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    return function (d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();

  var AbstractNextPossibleTokensWalker =
  /** @class */
  function (_super) {
    __extends$6(AbstractNextPossibleTokensWalker, _super);

    function AbstractNextPossibleTokensWalker(topProd, path) {
      var _this = _super.call(this) || this;

      _this.topProd = topProd;
      _this.path = path;
      _this.possibleTokTypes = [];
      _this.nextProductionName = "";
      _this.nextProductionOccurrence = 0;
      _this.found = false;
      _this.isAtEndOfPath = false;
      return _this;
    }

    AbstractNextPossibleTokensWalker.prototype.startWalking = function () {
      this.found = false;

      if (this.path.ruleStack[0] !== this.topProd.name) {
        throw Error("The path does not start with the walker's top Rule!");
      } // immutable for the win


      this.ruleStack = cloneArr(this.path.ruleStack).reverse(); // intelij bug requires assertion

      this.occurrenceStack = cloneArr(this.path.occurrenceStack).reverse(); // intelij bug requires assertion
      // already verified that the first production is valid, we now seek the 2nd production

      this.ruleStack.pop();
      this.occurrenceStack.pop();
      this.updateExpectedNext();
      this.walk(this.topProd);
      return this.possibleTokTypes;
    };

    AbstractNextPossibleTokensWalker.prototype.walk = function (prod, prevRest) {
      if (prevRest === void 0) {
        prevRest = [];
      } // stop scanning once we found the path


      if (!this.found) {
        _super.prototype.walk.call(this, prod, prevRest);
      }
    };

    AbstractNextPossibleTokensWalker.prototype.walkProdRef = function (refProd, currRest, prevRest) {
      // found the next production, need to keep walking in it
      if (refProd.referencedRule.name === this.nextProductionName && refProd.idx === this.nextProductionOccurrence) {
        var fullRest = currRest.concat(prevRest);
        this.updateExpectedNext();
        this.walk(refProd.referencedRule, fullRest);
      }
    };

    AbstractNextPossibleTokensWalker.prototype.updateExpectedNext = function () {
      // need to consume the Terminal
      if (isEmpty(this.ruleStack)) {
        // must reset nextProductionXXX to avoid walking down another Top Level production while what we are
        // really seeking is the last Terminal...
        this.nextProductionName = "";
        this.nextProductionOccurrence = 0;
        this.isAtEndOfPath = true;
      } else {
        this.nextProductionName = this.ruleStack.pop();
        this.nextProductionOccurrence = this.occurrenceStack.pop();
      }
    };

    return AbstractNextPossibleTokensWalker;
  }(RestWalker);

  var NextAfterTokenWalker =
  /** @class */
  function (_super) {
    __extends$6(NextAfterTokenWalker, _super);

    function NextAfterTokenWalker(topProd, path) {
      var _this = _super.call(this, topProd, path) || this;

      _this.path = path;
      _this.nextTerminalName = "";
      _this.nextTerminalOccurrence = 0;
      _this.nextTerminalName = _this.path.lastTok.name;
      _this.nextTerminalOccurrence = _this.path.lastTokOccurrence;
      return _this;
    }

    NextAfterTokenWalker.prototype.walkTerminal = function (terminal, currRest, prevRest) {
      if (this.isAtEndOfPath && terminal.terminalType.name === this.nextTerminalName && terminal.idx === this.nextTerminalOccurrence && !this.found) {
        var fullRest = currRest.concat(prevRest);
        var restProd = new Alternative({
          definition: fullRest
        });
        this.possibleTokTypes = first$1(restProd);
        this.found = true;
      }
    };

    return NextAfterTokenWalker;
  }(AbstractNextPossibleTokensWalker);
  /**
   * This walker only "walks" a single "TOP" level in the Grammar Ast, this means
   * it never "follows" production refs
   */

  var AbstractNextTerminalAfterProductionWalker =
  /** @class */
  function (_super) {
    __extends$6(AbstractNextTerminalAfterProductionWalker, _super);

    function AbstractNextTerminalAfterProductionWalker(topRule, occurrence) {
      var _this = _super.call(this) || this;

      _this.topRule = topRule;
      _this.occurrence = occurrence;
      _this.result = {
        token: undefined,
        occurrence: undefined,
        isEndOfRule: undefined
      };
      return _this;
    }

    AbstractNextTerminalAfterProductionWalker.prototype.startWalking = function () {
      this.walk(this.topRule);
      return this.result;
    };

    return AbstractNextTerminalAfterProductionWalker;
  }(RestWalker);

  var NextTerminalAfterManyWalker =
  /** @class */
  function (_super) {
    __extends$6(NextTerminalAfterManyWalker, _super);

    function NextTerminalAfterManyWalker() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    NextTerminalAfterManyWalker.prototype.walkMany = function (manyProd, currRest, prevRest) {
      if (manyProd.idx === this.occurrence) {
        var firstAfterMany = first(currRest.concat(prevRest));

        this.result.isEndOfRule = firstAfterMany === undefined;

        if (firstAfterMany instanceof Terminal) {
          this.result.token = firstAfterMany.terminalType;
          this.result.occurrence = firstAfterMany.idx;
        }
      } else {
        _super.prototype.walkMany.call(this, manyProd, currRest, prevRest);
      }
    };

    return NextTerminalAfterManyWalker;
  }(AbstractNextTerminalAfterProductionWalker);

  var NextTerminalAfterManySepWalker =
  /** @class */
  function (_super) {
    __extends$6(NextTerminalAfterManySepWalker, _super);

    function NextTerminalAfterManySepWalker() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    NextTerminalAfterManySepWalker.prototype.walkManySep = function (manySepProd, currRest, prevRest) {
      if (manySepProd.idx === this.occurrence) {
        var firstAfterManySep = first(currRest.concat(prevRest));

        this.result.isEndOfRule = firstAfterManySep === undefined;

        if (firstAfterManySep instanceof Terminal) {
          this.result.token = firstAfterManySep.terminalType;
          this.result.occurrence = firstAfterManySep.idx;
        }
      } else {
        _super.prototype.walkManySep.call(this, manySepProd, currRest, prevRest);
      }
    };

    return NextTerminalAfterManySepWalker;
  }(AbstractNextTerminalAfterProductionWalker);

  var NextTerminalAfterAtLeastOneWalker =
  /** @class */
  function (_super) {
    __extends$6(NextTerminalAfterAtLeastOneWalker, _super);

    function NextTerminalAfterAtLeastOneWalker() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    NextTerminalAfterAtLeastOneWalker.prototype.walkAtLeastOne = function (atLeastOneProd, currRest, prevRest) {
      if (atLeastOneProd.idx === this.occurrence) {
        var firstAfterAtLeastOne = first(currRest.concat(prevRest));

        this.result.isEndOfRule = firstAfterAtLeastOne === undefined;

        if (firstAfterAtLeastOne instanceof Terminal) {
          this.result.token = firstAfterAtLeastOne.terminalType;
          this.result.occurrence = firstAfterAtLeastOne.idx;
        }
      } else {
        _super.prototype.walkAtLeastOne.call(this, atLeastOneProd, currRest, prevRest);
      }
    };

    return NextTerminalAfterAtLeastOneWalker;
  }(AbstractNextTerminalAfterProductionWalker);

  var NextTerminalAfterAtLeastOneSepWalker =
  /** @class */
  function (_super) {
    __extends$6(NextTerminalAfterAtLeastOneSepWalker, _super);

    function NextTerminalAfterAtLeastOneSepWalker() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    NextTerminalAfterAtLeastOneSepWalker.prototype.walkAtLeastOneSep = function (atleastOneSepProd, currRest, prevRest) {
      if (atleastOneSepProd.idx === this.occurrence) {
        var firstAfterfirstAfterAtLeastOneSep = first(currRest.concat(prevRest));

        this.result.isEndOfRule = firstAfterfirstAfterAtLeastOneSep === undefined;

        if (firstAfterfirstAfterAtLeastOneSep instanceof Terminal) {
          this.result.token = firstAfterfirstAfterAtLeastOneSep.terminalType;
          this.result.occurrence = firstAfterfirstAfterAtLeastOneSep.idx;
        }
      } else {
        _super.prototype.walkAtLeastOneSep.call(this, atleastOneSepProd, currRest, prevRest);
      }
    };

    return NextTerminalAfterAtLeastOneSepWalker;
  }(AbstractNextTerminalAfterProductionWalker);
  function possiblePathsFrom(targetDef, maxLength, currPath) {
    if (currPath === void 0) {
      currPath = [];
    } // avoid side effects


    currPath = cloneArr(currPath);
    var result = [];
    var i = 0; // TODO: avoid inner funcs

    function remainingPathWith(nextDef) {
      return nextDef.concat(drop(targetDef, i + 1));
    } // TODO: avoid inner funcs


    function getAlternativesForProd(definition) {
      var alternatives = possiblePathsFrom(remainingPathWith(definition), maxLength, currPath);
      return result.concat(alternatives);
    }
    /**
     * Mandatory productions will halt the loop as the paths computed from their recursive calls will already contain the
     * following (rest) of the targetDef.
     *
     * For optional productions (Option/Repetition/...) the loop will continue to represent the paths that do not include the
     * the optional production.
     */


    while (currPath.length < maxLength && i < targetDef.length) {
      var prod = targetDef[i];
      /* istanbul ignore else */

      if (prod instanceof Alternative) {
        return getAlternativesForProd(prod.definition);
      } else if (prod instanceof NonTerminal) {
        return getAlternativesForProd(prod.definition);
      } else if (prod instanceof Option) {
        result = getAlternativesForProd(prod.definition);
      } else if (prod instanceof RepetitionMandatory) {
        var newDef = prod.definition.concat([new Repetition({
          definition: prod.definition
        })]);
        return getAlternativesForProd(newDef);
      } else if (prod instanceof RepetitionMandatoryWithSeparator) {
        var newDef = [new Alternative({
          definition: prod.definition
        }), new Repetition({
          definition: [new Terminal({
            terminalType: prod.separator
          })].concat(prod.definition)
        })];
        return getAlternativesForProd(newDef);
      } else if (prod instanceof RepetitionWithSeparator) {
        var newDef = prod.definition.concat([new Repetition({
          definition: [new Terminal({
            terminalType: prod.separator
          })].concat(prod.definition)
        })]);
        result = getAlternativesForProd(newDef);
      } else if (prod instanceof Repetition) {
        var newDef = prod.definition.concat([new Repetition({
          definition: prod.definition
        })]);
        result = getAlternativesForProd(newDef);
      } else if (prod instanceof Alternation) {
        forEach(prod.definition, function (currAlt) {
          // TODO: this is a limited check for empty alternatives
          //   It would prevent a common case of infinite loops during parser initialization.
          //   However **in-directly** empty alternatives may still cause issues.
          if (isEmpty(currAlt.definition) === false) {
            result = getAlternativesForProd(currAlt.definition);
          }
        });
        return result;
      } else if (prod instanceof Terminal) {
        currPath.push(prod.terminalType);
      } else {
        throw Error("non exhaustive match");
      }

      i++;
    }

    result.push({
      partialPath: currPath,
      suffixDef: drop(targetDef, i)
    });
    return result;
  }
  function nextPossibleTokensAfter(initialDef, tokenVector, tokMatcher, maxLookAhead) {
    var EXIT_NON_TERMINAL = "EXIT_NONE_TERMINAL"; // to avoid creating a new Array each time.

    var EXIT_NON_TERMINAL_ARR = [EXIT_NON_TERMINAL];
    var EXIT_ALTERNATIVE = "EXIT_ALTERNATIVE";
    var foundCompletePath = false;
    var tokenVectorLength = tokenVector.length;
    var minimalAlternativesIndex = tokenVectorLength - maxLookAhead - 1;
    var result = [];
    var possiblePaths = [];
    possiblePaths.push({
      idx: -1,
      def: initialDef,
      ruleStack: [],
      occurrenceStack: []
    });

    while (!isEmpty(possiblePaths)) {
      var currPath = possiblePaths.pop(); // skip alternatives if no more results can be found (assuming deterministic grammar with fixed lookahead)

      if (currPath === EXIT_ALTERNATIVE) {
        if (foundCompletePath && last(possiblePaths).idx <= minimalAlternativesIndex) {
          // remove irrelevant alternative
          possiblePaths.pop();
        }

        continue;
      }

      var currDef = currPath.def;
      var currIdx = currPath.idx;
      var currRuleStack = currPath.ruleStack;
      var currOccurrenceStack = currPath.occurrenceStack; // For Example: an empty path could exist in a valid grammar in the case of an EMPTY_ALT

      if (isEmpty(currDef)) {
        continue;
      }

      var prod = currDef[0];
      /* istanbul ignore else */

      if (prod === EXIT_NON_TERMINAL) {
        var nextPath = {
          idx: currIdx,
          def: drop(currDef),
          ruleStack: dropRight(currRuleStack),
          occurrenceStack: dropRight(currOccurrenceStack)
        };
        possiblePaths.push(nextPath);
      } else if (prod instanceof Terminal) {
        /* istanbul ignore else */
        if (currIdx < tokenVectorLength - 1) {
          var nextIdx = currIdx + 1;
          var actualToken = tokenVector[nextIdx];

          if (tokMatcher(actualToken, prod.terminalType)) {
            var nextPath = {
              idx: nextIdx,
              def: drop(currDef),
              ruleStack: currRuleStack,
              occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPath);
          } // end of the line

        } else if (currIdx === tokenVectorLength - 1) {
          // IGNORE ABOVE ELSE
          result.push({
            nextTokenType: prod.terminalType,
            nextTokenOccurrence: prod.idx,
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          });
          foundCompletePath = true;
        } else {
          throw Error("non exhaustive match");
        }
      } else if (prod instanceof NonTerminal) {
        var newRuleStack = cloneArr(currRuleStack);
        newRuleStack.push(prod.nonTerminalName);
        var newOccurrenceStack = cloneArr(currOccurrenceStack);
        newOccurrenceStack.push(prod.idx);
        var nextPath = {
          idx: currIdx,
          def: prod.definition.concat(EXIT_NON_TERMINAL_ARR, drop(currDef)),
          ruleStack: newRuleStack,
          occurrenceStack: newOccurrenceStack
        };
        possiblePaths.push(nextPath);
      } else if (prod instanceof Option) {
        // the order of alternatives is meaningful, FILO (Last path will be traversed first).
        var nextPathWithout = {
          idx: currIdx,
          def: drop(currDef),
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(nextPathWithout); // required marker to avoid backtracking paths whose higher priority alternatives already matched

        possiblePaths.push(EXIT_ALTERNATIVE);
        var nextPathWith = {
          idx: currIdx,
          def: prod.definition.concat(drop(currDef)),
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(nextPathWith);
      } else if (prod instanceof RepetitionMandatory) {
        // TODO:(THE NEW operators here take a while...) (convert once?)
        var secondIteration = new Repetition({
          definition: prod.definition,
          idx: prod.idx
        });
        var nextDef = prod.definition.concat([secondIteration], drop(currDef));
        var nextPath = {
          idx: currIdx,
          def: nextDef,
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(nextPath);
      } else if (prod instanceof RepetitionMandatoryWithSeparator) {
        // TODO:(THE NEW operators here take a while...) (convert once?)
        var separatorGast = new Terminal({
          terminalType: prod.separator
        });
        var secondIteration = new Repetition({
          definition: [separatorGast].concat(prod.definition),
          idx: prod.idx
        });
        var nextDef = prod.definition.concat([secondIteration], drop(currDef));
        var nextPath = {
          idx: currIdx,
          def: nextDef,
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(nextPath);
      } else if (prod instanceof RepetitionWithSeparator) {
        // the order of alternatives is meaningful, FILO (Last path will be traversed first).
        var nextPathWithout = {
          idx: currIdx,
          def: drop(currDef),
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(nextPathWithout); // required marker to avoid backtracking paths whose higher priority alternatives already matched

        possiblePaths.push(EXIT_ALTERNATIVE);
        var separatorGast = new Terminal({
          terminalType: prod.separator
        });
        var nthRepetition = new Repetition({
          definition: [separatorGast].concat(prod.definition),
          idx: prod.idx
        });
        var nextDef = prod.definition.concat([nthRepetition], drop(currDef));
        var nextPathWith = {
          idx: currIdx,
          def: nextDef,
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(nextPathWith);
      } else if (prod instanceof Repetition) {
        // the order of alternatives is meaningful, FILO (Last path will be traversed first).
        var nextPathWithout = {
          idx: currIdx,
          def: drop(currDef),
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(nextPathWithout); // required marker to avoid backtracking paths whose higher priority alternatives already matched

        possiblePaths.push(EXIT_ALTERNATIVE); // TODO: an empty repetition will cause infinite loops here, will the parser detect this in selfAnalysis?

        var nthRepetition = new Repetition({
          definition: prod.definition,
          idx: prod.idx
        });
        var nextDef = prod.definition.concat([nthRepetition], drop(currDef));
        var nextPathWith = {
          idx: currIdx,
          def: nextDef,
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        };
        possiblePaths.push(nextPathWith);
      } else if (prod instanceof Alternation) {
        // the order of alternatives is meaningful, FILO (Last path will be traversed first).
        for (var i = prod.definition.length - 1; i >= 0; i--) {
          var currAlt = prod.definition[i];
          var currAltPath = {
            idx: currIdx,
            def: currAlt.definition.concat(drop(currDef)),
            ruleStack: currRuleStack,
            occurrenceStack: currOccurrenceStack
          };
          possiblePaths.push(currAltPath);
          possiblePaths.push(EXIT_ALTERNATIVE);
        }
      } else if (prod instanceof Alternative) {
        possiblePaths.push({
          idx: currIdx,
          def: prod.definition.concat(drop(currDef)),
          ruleStack: currRuleStack,
          occurrenceStack: currOccurrenceStack
        });
      } else if (prod instanceof Rule) {
        // last because we should only encounter at most a single one of these per invocation.
        possiblePaths.push(expandTopLevelRule(prod, currIdx, currRuleStack, currOccurrenceStack));
      } else {
        throw Error("non exhaustive match");
      }
    }

    return result;
  }

  function expandTopLevelRule(topRule, currIdx, currRuleStack, currOccurrenceStack) {
    var newRuleStack = cloneArr(currRuleStack);
    newRuleStack.push(topRule.name);
    var newCurrOccurrenceStack = cloneArr(currOccurrenceStack); // top rule is always assumed to have been called with occurrence index 1

    newCurrOccurrenceStack.push(1);
    return {
      idx: currIdx,
      def: topRule.definition,
      ruleStack: newRuleStack,
      occurrenceStack: newCurrOccurrenceStack
    };
  }

  var __extends$7 = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    return function (d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var PROD_TYPE;

  (function (PROD_TYPE) {
    PROD_TYPE[PROD_TYPE["OPTION"] = 0] = "OPTION";
    PROD_TYPE[PROD_TYPE["REPETITION"] = 1] = "REPETITION";
    PROD_TYPE[PROD_TYPE["REPETITION_MANDATORY"] = 2] = "REPETITION_MANDATORY";
    PROD_TYPE[PROD_TYPE["REPETITION_MANDATORY_WITH_SEPARATOR"] = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR";
    PROD_TYPE[PROD_TYPE["REPETITION_WITH_SEPARATOR"] = 4] = "REPETITION_WITH_SEPARATOR";
    PROD_TYPE[PROD_TYPE["ALTERNATION"] = 5] = "ALTERNATION";
  })(PROD_TYPE || (PROD_TYPE = {}));

  function getProdType(prod) {
    /* istanbul ignore else */
    if (prod instanceof Option) {
      return PROD_TYPE.OPTION;
    } else if (prod instanceof Repetition) {
      return PROD_TYPE.REPETITION;
    } else if (prod instanceof RepetitionMandatory) {
      return PROD_TYPE.REPETITION_MANDATORY;
    } else if (prod instanceof RepetitionMandatoryWithSeparator) {
      return PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR;
    } else if (prod instanceof RepetitionWithSeparator) {
      return PROD_TYPE.REPETITION_WITH_SEPARATOR;
    } else if (prod instanceof Alternation) {
      return PROD_TYPE.ALTERNATION;
    } else {
      throw Error("non exhaustive match");
    }
  }
  function buildLookaheadFuncForOr(occurrence, ruleGrammar, maxLookahead, hasPredicates, dynamicTokensEnabled, laFuncBuilder) {
    var lookAheadPaths = getLookaheadPathsForOr(occurrence, ruleGrammar, maxLookahead);
    var tokenMatcher = areTokenCategoriesNotUsed(lookAheadPaths) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
    return laFuncBuilder(lookAheadPaths, hasPredicates, tokenMatcher, dynamicTokensEnabled);
  }
  /**
   *  When dealing with an Optional production (OPTION/MANY/2nd iteration of AT_LEAST_ONE/...) we need to compare
   *  the lookahead "inside" the production and the lookahead immediately "after" it in the same top level rule (context free).
   *
   *  Example: given a production:
   *  ABC(DE)?DF
   *
   *  The optional '(DE)?' should only be entered if we see 'DE'. a single Token 'D' is not sufficient to distinguish between the two
   *  alternatives.
   *
   *  @returns A Lookahead function which will return true IFF the parser should parse the Optional production.
   */

  function buildLookaheadFuncForOptionalProd(occurrence, ruleGrammar, k, dynamicTokensEnabled, prodType, lookaheadBuilder) {
    var lookAheadPaths = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k);
    var tokenMatcher = areTokenCategoriesNotUsed(lookAheadPaths) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
    return lookaheadBuilder(lookAheadPaths[0], tokenMatcher, dynamicTokensEnabled);
  }
  function buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher, dynamicTokensEnabled) {
    var numOfAlts = alts.length;
    var areAllOneTokenLookahead = every(alts, function (currAlt) {
      return every(currAlt, function (currPath) {
        return currPath.length === 1;
      });
    }); // This version takes into account the predicates as well.

    if (hasPredicates) {
      /**
       * @returns {number} - The chosen alternative index
       */
      return function (orAlts) {
        // unfortunately the predicates must be extracted every single time
        // as they cannot be cached due to references to parameters(vars) which are no longer valid.
        // note that in the common case of no predicates, no cpu time will be wasted on this (see else block)
        var predicates = map(orAlts, function (currAlt) {
          return currAlt.GATE;
        });

        for (var t = 0; t < numOfAlts; t++) {
          var currAlt = alts[t];
          var currNumOfPaths = currAlt.length;
          var currPredicate = predicates[t];

          if (currPredicate !== undefined && currPredicate.call(this) === false) {
            // if the predicate does not match there is no point in checking the paths
            continue;
          }

          nextPath: for (var j = 0; j < currNumOfPaths; j++) {
            var currPath = currAlt[j];
            var currPathLength = currPath.length;

            for (var i = 0; i < currPathLength; i++) {
              var nextToken = this.LA(i + 1);

              if (tokenMatcher(nextToken, currPath[i]) === false) {
                // mismatch in current path
                // try the next pth
                continue nextPath;
              }
            } // found a full path that matches.
            // this will also work for an empty ALT as the loop will be skipped


            return t;
          } // none of the paths for the current alternative matched
          // try the next alternative

        } // none of the alternatives could be matched


        return undefined;
      };
    } else if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
      // optimized (common) case of all the lookaheads paths requiring only
      // a single token lookahead. These Optimizations cannot work if dynamically defined Tokens are used.
      var singleTokenAlts = map(alts, function (currAlt) {
        return flatten(currAlt);
      });
      var choiceToAlt_1 = reduce(singleTokenAlts, function (result, currAlt, idx) {
        forEach(currAlt, function (currTokType) {
          if (!has(result, currTokType.tokenTypeIdx)) {
            result[currTokType.tokenTypeIdx] = idx;
          }

          forEach(currTokType.categoryMatches, function (currExtendingType) {
            if (!has(result, currExtendingType)) {
              result[currExtendingType] = idx;
            }
          });
        });
        return result;
      }, []);
      /**
       * @returns {number} - The chosen alternative index
       */

      return function () {
        var nextToken = this.LA(1);
        return choiceToAlt_1[nextToken.tokenTypeIdx];
      };
    } else {
      // optimized lookahead without needing to check the predicates at all.
      // this causes code duplication which is intentional to improve performance.

      /**
       * @returns {number} - The chosen alternative index
       */
      return function () {
        for (var t = 0; t < numOfAlts; t++) {
          var currAlt = alts[t];
          var currNumOfPaths = currAlt.length;

          nextPath: for (var j = 0; j < currNumOfPaths; j++) {
            var currPath = currAlt[j];
            var currPathLength = currPath.length;

            for (var i = 0; i < currPathLength; i++) {
              var nextToken = this.LA(i + 1);

              if (tokenMatcher(nextToken, currPath[i]) === false) {
                // mismatch in current path
                // try the next pth
                continue nextPath;
              }
            } // found a full path that matches.
            // this will also work for an empty ALT as the loop will be skipped


            return t;
          } // none of the paths for the current alternative matched
          // try the next alternative

        } // none of the alternatives could be matched


        return undefined;
      };
    }
  }
  function buildSingleAlternativeLookaheadFunction(alt, tokenMatcher, dynamicTokensEnabled) {
    var areAllOneTokenLookahead = every(alt, function (currPath) {
      return currPath.length === 1;
    });
    var numOfPaths = alt.length; // optimized (common) case of all the lookaheads paths requiring only
    // a single token lookahead.

    if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
      var singleTokensTypes = flatten(alt);

      if (singleTokensTypes.length === 1 && isEmpty(singleTokensTypes[0].categoryMatches)) {
        var expectedTokenType = singleTokensTypes[0];
        var expectedTokenUniqueKey_1 = expectedTokenType.tokenTypeIdx;
        return function () {
          return this.LA(1).tokenTypeIdx === expectedTokenUniqueKey_1;
        };
      } else {
        var choiceToAlt_2 = reduce(singleTokensTypes, function (result, currTokType, idx) {
          result[currTokType.tokenTypeIdx] = true;
          forEach(currTokType.categoryMatches, function (currExtendingType) {
            result[currExtendingType] = true;
          });
          return result;
        }, []);
        return function () {
          var nextToken = this.LA(1);
          return choiceToAlt_2[nextToken.tokenTypeIdx] === true;
        };
      }
    } else {
      return function () {
        nextPath: for (var j = 0; j < numOfPaths; j++) {
          var currPath = alt[j];
          var currPathLength = currPath.length;

          for (var i = 0; i < currPathLength; i++) {
            var nextToken = this.LA(i + 1);

            if (tokenMatcher(nextToken, currPath[i]) === false) {
              // mismatch in current path
              // try the next pth
              continue nextPath;
            }
          } // found a full path that matches.


          return true;
        } // none of the paths matched


        return false;
      };
    }
  }

  var RestDefinitionFinderWalker =
  /** @class */
  function (_super) {
    __extends$7(RestDefinitionFinderWalker, _super);

    function RestDefinitionFinderWalker(topProd, targetOccurrence, targetProdType) {
      var _this = _super.call(this) || this;

      _this.topProd = topProd;
      _this.targetOccurrence = targetOccurrence;
      _this.targetProdType = targetProdType;
      return _this;
    }

    RestDefinitionFinderWalker.prototype.startWalking = function () {
      this.walk(this.topProd);
      return this.restDef;
    };

    RestDefinitionFinderWalker.prototype.checkIsTarget = function (node, expectedProdType, currRest, prevRest) {
      if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdType) {
        this.restDef = currRest.concat(prevRest);
        return true;
      } // performance optimization, do not iterate over the entire Grammar ast after we have found the target


      return false;
    };

    RestDefinitionFinderWalker.prototype.walkOption = function (optionProd, currRest, prevRest) {
      if (!this.checkIsTarget(optionProd, PROD_TYPE.OPTION, currRest, prevRest)) {
        _super.prototype.walkOption.call(this, optionProd, currRest, prevRest);
      }
    };

    RestDefinitionFinderWalker.prototype.walkAtLeastOne = function (atLeastOneProd, currRest, prevRest) {
      if (!this.checkIsTarget(atLeastOneProd, PROD_TYPE.REPETITION_MANDATORY, currRest, prevRest)) {
        _super.prototype.walkOption.call(this, atLeastOneProd, currRest, prevRest);
      }
    };

    RestDefinitionFinderWalker.prototype.walkAtLeastOneSep = function (atLeastOneSepProd, currRest, prevRest) {
      if (!this.checkIsTarget(atLeastOneSepProd, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currRest, prevRest)) {
        _super.prototype.walkOption.call(this, atLeastOneSepProd, currRest, prevRest);
      }
    };

    RestDefinitionFinderWalker.prototype.walkMany = function (manyProd, currRest, prevRest) {
      if (!this.checkIsTarget(manyProd, PROD_TYPE.REPETITION, currRest, prevRest)) {
        _super.prototype.walkOption.call(this, manyProd, currRest, prevRest);
      }
    };

    RestDefinitionFinderWalker.prototype.walkManySep = function (manySepProd, currRest, prevRest) {
      if (!this.checkIsTarget(manySepProd, PROD_TYPE.REPETITION_WITH_SEPARATOR, currRest, prevRest)) {
        _super.prototype.walkOption.call(this, manySepProd, currRest, prevRest);
      }
    };

    return RestDefinitionFinderWalker;
  }(RestWalker);
  /**
   * Returns the definition of a target production in a top level level rule.
   */


  var InsideDefinitionFinderVisitor =
  /** @class */
  function (_super) {
    __extends$7(InsideDefinitionFinderVisitor, _super);

    function InsideDefinitionFinderVisitor(targetOccurrence, targetProdType, targetRef) {
      var _this = _super.call(this) || this;

      _this.targetOccurrence = targetOccurrence;
      _this.targetProdType = targetProdType;
      _this.targetRef = targetRef;
      _this.result = [];
      return _this;
    }

    InsideDefinitionFinderVisitor.prototype.checkIsTarget = function (node, expectedProdName) {
      if (node.idx === this.targetOccurrence && this.targetProdType === expectedProdName && (this.targetRef === undefined || node === this.targetRef)) {
        this.result = node.definition;
      }
    };

    InsideDefinitionFinderVisitor.prototype.visitOption = function (node) {
      this.checkIsTarget(node, PROD_TYPE.OPTION);
    };

    InsideDefinitionFinderVisitor.prototype.visitRepetition = function (node) {
      this.checkIsTarget(node, PROD_TYPE.REPETITION);
    };

    InsideDefinitionFinderVisitor.prototype.visitRepetitionMandatory = function (node) {
      this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY);
    };

    InsideDefinitionFinderVisitor.prototype.visitRepetitionMandatoryWithSeparator = function (node) {
      this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR);
    };

    InsideDefinitionFinderVisitor.prototype.visitRepetitionWithSeparator = function (node) {
      this.checkIsTarget(node, PROD_TYPE.REPETITION_WITH_SEPARATOR);
    };

    InsideDefinitionFinderVisitor.prototype.visitAlternation = function (node) {
      this.checkIsTarget(node, PROD_TYPE.ALTERNATION);
    };

    return InsideDefinitionFinderVisitor;
  }(GAstVisitor);

  function initializeArrayOfArrays(size) {
    var result = new Array(size);

    for (var i = 0; i < size; i++) {
      result[i] = [];
    }

    return result;
  }
  /**
   * A sort of hash function between a Path in the grammar and a string.
   * Note that this returns multiple "hashes" to support the scenario of token categories.
   * -  A single path with categories may match multiple **actual** paths.
   */


  function pathToHashKeys(path) {
    var keys = [""];

    for (var i = 0; i < path.length; i++) {
      var tokType = path[i];
      var longerKeys = [];

      for (var j = 0; j < keys.length; j++) {
        var currShorterKey = keys[j];
        longerKeys.push(currShorterKey + "_" + tokType.tokenTypeIdx);

        for (var t = 0; t < tokType.categoryMatches.length; t++) {
          var categoriesKeySuffix = "_" + tokType.categoryMatches[t];
          longerKeys.push(currShorterKey + categoriesKeySuffix);
        }
      }

      keys = longerKeys;
    }

    return keys;
  }
  /**
   * Imperative style due to being called from a hot spot
   */


  function isUniquePrefixHash(altKnownPathsKeys, searchPathKeys, idx) {
    for (var currAltIdx = 0; currAltIdx < altKnownPathsKeys.length; currAltIdx++) {
      // We only want to test vs the other alternatives
      if (currAltIdx === idx) {
        continue;
      }

      var otherAltKnownPathsKeys = altKnownPathsKeys[currAltIdx];

      for (var searchIdx = 0; searchIdx < searchPathKeys.length; searchIdx++) {
        var searchKey = searchPathKeys[searchIdx];

        if (otherAltKnownPathsKeys[searchKey] === true) {
          return false;
        }
      }
    } // None of the SearchPathKeys were found in any of the other alternatives


    return true;
  }

  function lookAheadSequenceFromAlternatives(altsDefs, k) {
    var partialAlts = map(altsDefs, function (currAlt) {
      return possiblePathsFrom([currAlt], 1);
    });
    var finalResult = initializeArrayOfArrays(partialAlts.length);
    var altsHashes = map(partialAlts, function (currAltPaths) {
      var dict = {};
      forEach(currAltPaths, function (item) {
        var keys = pathToHashKeys(item.partialPath);
        forEach(keys, function (currKey) {
          dict[currKey] = true;
        });
      });
      return dict;
    });
    var newData = partialAlts; // maxLookahead loop

    for (var pathLength = 1; pathLength <= k; pathLength++) {
      var currDataset = newData;
      newData = initializeArrayOfArrays(currDataset.length);

      var _loop_1 = function _loop_1(altIdx) {
        var currAltPathsAndSuffixes = currDataset[altIdx]; // paths in current alternative loop

        for (var currPathIdx = 0; currPathIdx < currAltPathsAndSuffixes.length; currPathIdx++) {
          var currPathPrefix = currAltPathsAndSuffixes[currPathIdx].partialPath;
          var suffixDef = currAltPathsAndSuffixes[currPathIdx].suffixDef;
          var prefixKeys = pathToHashKeys(currPathPrefix);
          var isUnique = isUniquePrefixHash(altsHashes, prefixKeys, altIdx); // End of the line for this path.

          if (isUnique || isEmpty(suffixDef) || currPathPrefix.length === k) {
            var currAltResult = finalResult[altIdx]; // TODO: Can we implement a containsPath using Maps/Dictionaries?

            if (containsPath(currAltResult, currPathPrefix) === false) {
              currAltResult.push(currPathPrefix); // Update all new  keys for the current path.

              for (var j = 0; j < prefixKeys.length; j++) {
                var currKey = prefixKeys[j];
                altsHashes[altIdx][currKey] = true;
              }
            }
          } // Expand longer paths
          else {
              var newPartialPathsAndSuffixes = possiblePathsFrom(suffixDef, pathLength + 1, currPathPrefix);
              newData[altIdx] = newData[altIdx].concat(newPartialPathsAndSuffixes); // Update keys for new known paths

              forEach(newPartialPathsAndSuffixes, function (item) {
                var prefixKeys = pathToHashKeys(item.partialPath);
                forEach(prefixKeys, function (key) {
                  altsHashes[altIdx][key] = true;
                });
              });
            }
        }
      }; // alternatives loop


      for (var altIdx = 0; altIdx < currDataset.length; altIdx++) {
        _loop_1(altIdx);
      }
    }

    return finalResult;
  }
  function getLookaheadPathsForOr(occurrence, ruleGrammar, k, orProd) {
    var visitor = new InsideDefinitionFinderVisitor(occurrence, PROD_TYPE.ALTERNATION, orProd);
    ruleGrammar.accept(visitor);
    return lookAheadSequenceFromAlternatives(visitor.result, k);
  }
  function getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k) {
    var insideDefVisitor = new InsideDefinitionFinderVisitor(occurrence, prodType);
    ruleGrammar.accept(insideDefVisitor);
    var insideDef = insideDefVisitor.result;
    var afterDefWalker = new RestDefinitionFinderWalker(ruleGrammar, occurrence, prodType);
    var afterDef = afterDefWalker.startWalking();
    var insideFlat = new Alternative({
      definition: insideDef
    });
    var afterFlat = new Alternative({
      definition: afterDef
    });
    return lookAheadSequenceFromAlternatives([insideFlat, afterFlat], k);
  }
  function containsPath(alternative, searchPath) {
    compareOtherPath: for (var i = 0; i < alternative.length; i++) {
      var otherPath = alternative[i];

      if (otherPath.length !== searchPath.length) {
        continue;
      }

      for (var j = 0; j < otherPath.length; j++) {
        var searchTok = searchPath[j];
        var otherTok = otherPath[j];
        var matchingTokens = searchTok === otherTok || otherTok.categoryMatchesMap[searchTok.tokenTypeIdx] !== undefined;

        if (matchingTokens === false) {
          continue compareOtherPath;
        }
      }

      return true;
    }

    return false;
  }
  function isStrictPrefixOfPath(prefix, other) {
    return prefix.length < other.length && every(prefix, function (tokType, idx) {
      var otherTokType = other[idx];
      return tokType === otherTokType || otherTokType.categoryMatchesMap[tokType.tokenTypeIdx];
    });
  }
  function areTokenCategoriesNotUsed(lookAheadPaths) {
    return every(lookAheadPaths, function (singleAltPaths) {
      return every(singleAltPaths, function (singlePath) {
        return every(singlePath, function (token) {
          return isEmpty(token.categoryMatches);
        });
      });
    });
  }

  var __extends$8 = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    return function (d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  function validateGrammar(topLevels, globalMaxLookahead, tokenTypes, errMsgProvider, grammarName) {
    var duplicateErrors = map(topLevels, function (currTopLevel) {
      return validateDuplicateProductions(currTopLevel, errMsgProvider);
    });
    var leftRecursionErrors = map(topLevels, function (currTopRule) {
      return validateNoLeftRecursion(currTopRule, currTopRule, errMsgProvider);
    });
    var emptyAltErrors = [];
    var ambiguousAltsErrors = [];
    var emptyRepetitionErrors = []; // left recursion could cause infinite loops in the following validations.
    // It is safest to first have the user fix the left recursion errors first and only then examine Further issues.

    if (every(leftRecursionErrors, isEmpty)) {
      emptyAltErrors = map(topLevels, function (currTopRule) {
        return validateEmptyOrAlternative(currTopRule, errMsgProvider);
      });
      ambiguousAltsErrors = map(topLevels, function (currTopRule) {
        return validateAmbiguousAlternationAlternatives(currTopRule, globalMaxLookahead, errMsgProvider);
      });
      emptyRepetitionErrors = validateSomeNonEmptyLookaheadPath(topLevels, globalMaxLookahead, errMsgProvider);
    }

    var termsNamespaceConflictErrors = checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider);
    var tokenNameErrors = map(tokenTypes, function (currTokType) {
      return validateTokenName(currTokType, errMsgProvider);
    });
    var tooManyAltsErrors = map(topLevels, function (curRule) {
      return validateTooManyAlts(curRule, errMsgProvider);
    });
    var ruleNameErrors = map(topLevels, function (curRule) {
      return validateRuleName(curRule, errMsgProvider);
    });
    var duplicateRulesError = map(topLevels, function (curRule) {
      return validateRuleDoesNotAlreadyExist(curRule, topLevels, grammarName, errMsgProvider);
    });
    return flatten(duplicateErrors.concat(tokenNameErrors, emptyRepetitionErrors, leftRecursionErrors, emptyAltErrors, ambiguousAltsErrors, termsNamespaceConflictErrors, tooManyAltsErrors, ruleNameErrors, duplicateRulesError));
  }

  function validateDuplicateProductions(topLevelRule, errMsgProvider) {
    var collectorVisitor = new OccurrenceValidationCollector();
    topLevelRule.accept(collectorVisitor);
    var allRuleProductions = collectorVisitor.allProductions;
    var productionGroups = groupBy(allRuleProductions, identifyProductionForDuplicates);
    var duplicates = pick(productionGroups, function (currGroup) {
      return currGroup.length > 1;
    });
    var errors = map(values(duplicates), function (currDuplicates) {
      var firstProd = first(currDuplicates);
      var msg = errMsgProvider.buildDuplicateFoundError(topLevelRule, currDuplicates);
      var dslName = getProductionDslName(firstProd);
      var defError = {
        message: msg,
        type: ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,
        ruleName: topLevelRule.name,
        dslName: dslName,
        occurrence: firstProd.idx
      };
      var param = getExtraProductionArgument(firstProd);

      if (param) {
        defError.parameter = param;
      }

      return defError;
    });
    return errors;
  }

  function identifyProductionForDuplicates(prod) {
    return getProductionDslName(prod) + "_#_" + prod.idx + "_#_" + getExtraProductionArgument(prod);
  }

  function getExtraProductionArgument(prod) {
    if (prod instanceof Terminal) {
      return prod.terminalType.name;
    } else if (prod instanceof NonTerminal) {
      return prod.nonTerminalName;
    } else {
      return "";
    }
  }

  var OccurrenceValidationCollector =
  /** @class */
  function (_super) {
    __extends$8(OccurrenceValidationCollector, _super);

    function OccurrenceValidationCollector() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.allProductions = [];
      return _this;
    }

    OccurrenceValidationCollector.prototype.visitNonTerminal = function (subrule) {
      this.allProductions.push(subrule);
    };

    OccurrenceValidationCollector.prototype.visitOption = function (option) {
      this.allProductions.push(option);
    };

    OccurrenceValidationCollector.prototype.visitRepetitionWithSeparator = function (manySep) {
      this.allProductions.push(manySep);
    };

    OccurrenceValidationCollector.prototype.visitRepetitionMandatory = function (atLeastOne) {
      this.allProductions.push(atLeastOne);
    };

    OccurrenceValidationCollector.prototype.visitRepetitionMandatoryWithSeparator = function (atLeastOneSep) {
      this.allProductions.push(atLeastOneSep);
    };

    OccurrenceValidationCollector.prototype.visitRepetition = function (many) {
      this.allProductions.push(many);
    };

    OccurrenceValidationCollector.prototype.visitAlternation = function (or) {
      this.allProductions.push(or);
    };

    OccurrenceValidationCollector.prototype.visitTerminal = function (terminal) {
      this.allProductions.push(terminal);
    };

    return OccurrenceValidationCollector;
  }(GAstVisitor);
  var validTermsPattern = /^[a-zA-Z_]\w*$/; // TODO: remove this limitation now that we use recorders

  function validateRuleName(rule, errMsgProvider) {
    var errors = [];
    var ruleName = rule.name;

    if (!ruleName.match(validTermsPattern)) {
      errors.push({
        message: errMsgProvider.buildInvalidRuleNameError({
          topLevelRule: rule,
          expectedPattern: validTermsPattern
        }),
        type: ParserDefinitionErrorType.INVALID_RULE_NAME,
        ruleName: ruleName
      });
    }

    return errors;
  } // TODO: remove this limitation now that we use recorders

  function validateTokenName(tokenType, errMsgProvider) {
    var errors = [];
    var tokTypeName = tokenType.name;

    if (!tokTypeName.match(validTermsPattern)) {
      errors.push({
        message: errMsgProvider.buildTokenNameError({
          tokenType: tokenType,
          expectedPattern: validTermsPattern
        }),
        type: ParserDefinitionErrorType.INVALID_TOKEN_NAME
      });
    }

    return errors;
  }
  function validateRuleDoesNotAlreadyExist(rule, allRules, className, errMsgProvider) {
    var errors = [];
    var occurrences = reduce(allRules, function (result, curRule) {
      if (curRule.name === rule.name) {
        return result + 1;
      }

      return result;
    }, 0);

    if (occurrences > 1) {
      var errMsg = errMsgProvider.buildDuplicateRuleNameError({
        topLevelRule: rule,
        grammarName: className
      });
      errors.push({
        message: errMsg,
        type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
        ruleName: rule.name
      });
    }

    return errors;
  } // TODO: is there anyway to get only the rule names of rules inherited from the super grammars?
  // This is not part of the IGrammarErrorProvider because the validation cannot be performed on
  // The grammar structure, only at runtime.

  function validateRuleIsOverridden(ruleName, definedRulesNames, className) {
    var errors = [];
    var errMsg;

    if (!contains(definedRulesNames, ruleName)) {
      errMsg = "Invalid rule override, rule: ->" + ruleName + "<- cannot be overridden in the grammar: ->" + className + "<-" + "as it is not defined in any of the super grammars ";
      errors.push({
        message: errMsg,
        type: ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,
        ruleName: ruleName
      });
    }

    return errors;
  }
  function validateNoLeftRecursion(topRule, currRule, errMsgProvider, path) {
    if (path === void 0) {
      path = [];
    }

    var errors = [];
    var nextNonTerminals = getFirstNoneTerminal(currRule.definition);

    if (isEmpty(nextNonTerminals)) {
      return [];
    } else {
      var ruleName = topRule.name;
      var foundLeftRecursion = contains(nextNonTerminals, topRule);

      if (foundLeftRecursion) {
        errors.push({
          message: errMsgProvider.buildLeftRecursionError({
            topLevelRule: topRule,
            leftRecursionPath: path
          }),
          type: ParserDefinitionErrorType.LEFT_RECURSION,
          ruleName: ruleName
        });
      } // we are only looking for cyclic paths leading back to the specific topRule
      // other cyclic paths are ignored, we still need this difference to avoid infinite loops...


      var validNextSteps = difference(nextNonTerminals, path.concat([topRule]));
      var errorsFromNextSteps = map(validNextSteps, function (currRefRule) {
        var newPath = cloneArr(path);
        newPath.push(currRefRule);
        return validateNoLeftRecursion(topRule, currRefRule, errMsgProvider, newPath);
      });
      return errors.concat(flatten(errorsFromNextSteps));
    }
  }
  function getFirstNoneTerminal(definition) {
    var result = [];

    if (isEmpty(definition)) {
      return result;
    }

    var firstProd = first(definition);
    /* istanbul ignore else */

    if (firstProd instanceof NonTerminal) {
      result.push(firstProd.referencedRule);
    } else if (firstProd instanceof Alternative || firstProd instanceof Option || firstProd instanceof RepetitionMandatory || firstProd instanceof RepetitionMandatoryWithSeparator || firstProd instanceof RepetitionWithSeparator || firstProd instanceof Repetition) {
      result = result.concat(getFirstNoneTerminal(firstProd.definition));
    } else if (firstProd instanceof Alternation) {
      // each sub definition in alternation is a FLAT
      result = flatten(map(firstProd.definition, function (currSubDef) {
        return getFirstNoneTerminal(currSubDef.definition);
      }));
    } else if (firstProd instanceof Terminal) ; else {
      throw Error("non exhaustive match");
    }

    var isFirstOptional = isOptionalProd(firstProd);
    var hasMore = definition.length > 1;

    if (isFirstOptional && hasMore) {
      var rest = drop(definition);
      return result.concat(getFirstNoneTerminal(rest));
    } else {
      return result;
    }
  }

  var OrCollector =
  /** @class */
  function (_super) {
    __extends$8(OrCollector, _super);

    function OrCollector() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.alternations = [];
      return _this;
    }

    OrCollector.prototype.visitAlternation = function (node) {
      this.alternations.push(node);
    };

    return OrCollector;
  }(GAstVisitor);

  function validateEmptyOrAlternative(topLevelRule, errMsgProvider) {
    var orCollector = new OrCollector();
    topLevelRule.accept(orCollector);
    var ors = orCollector.alternations;
    var errors = reduce(ors, function (errors, currOr) {
      var exceptLast = dropRight(currOr.definition);
      var currErrors = map(exceptLast, function (currAlternative, currAltIdx) {
        var possibleFirstInAlt = nextPossibleTokensAfter([currAlternative], [], null, 1);

        if (isEmpty(possibleFirstInAlt)) {
          return {
            message: errMsgProvider.buildEmptyAlternationError({
              topLevelRule: topLevelRule,
              alternation: currOr,
              emptyChoiceIdx: currAltIdx
            }),
            type: ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,
            ruleName: topLevelRule.name,
            occurrence: currOr.idx,
            alternative: currAltIdx + 1
          };
        } else {
          return null;
        }
      });
      return errors.concat(compact(currErrors));
    }, []);
    return errors;
  }
  function validateAmbiguousAlternationAlternatives(topLevelRule, globalMaxLookahead, errMsgProvider) {
    var orCollector = new OrCollector();
    topLevelRule.accept(orCollector);
    var ors = orCollector.alternations; // New Handling of ignoring ambiguities
    // - https://github.com/SAP/chevrotain/issues/869

    ors = reject(ors, function (currOr) {
      return currOr.ignoreAmbiguities === true;
    });
    var errors = reduce(ors, function (result, currOr) {
      var currOccurrence = currOr.idx;
      var actualMaxLookahead = currOr.maxLookahead || globalMaxLookahead;
      var alternatives = getLookaheadPathsForOr(currOccurrence, topLevelRule, actualMaxLookahead, currOr);
      var altsAmbiguityErrors = checkAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
      var altsPrefixAmbiguityErrors = checkPrefixAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
      return result.concat(altsAmbiguityErrors, altsPrefixAmbiguityErrors);
    }, []);
    return errors;
  }

  var RepetionCollector =
  /** @class */
  function (_super) {
    __extends$8(RepetionCollector, _super);

    function RepetionCollector() {
      var _this = _super !== null && _super.apply(this, arguments) || this;

      _this.allProductions = [];
      return _this;
    }

    RepetionCollector.prototype.visitRepetitionWithSeparator = function (manySep) {
      this.allProductions.push(manySep);
    };

    RepetionCollector.prototype.visitRepetitionMandatory = function (atLeastOne) {
      this.allProductions.push(atLeastOne);
    };

    RepetionCollector.prototype.visitRepetitionMandatoryWithSeparator = function (atLeastOneSep) {
      this.allProductions.push(atLeastOneSep);
    };

    RepetionCollector.prototype.visitRepetition = function (many) {
      this.allProductions.push(many);
    };

    return RepetionCollector;
  }(GAstVisitor);
  function validateTooManyAlts(topLevelRule, errMsgProvider) {
    var orCollector = new OrCollector();
    topLevelRule.accept(orCollector);
    var ors = orCollector.alternations;
    var errors = reduce(ors, function (errors, currOr) {
      if (currOr.definition.length > 255) {
        errors.push({
          message: errMsgProvider.buildTooManyAlternativesError({
            topLevelRule: topLevelRule,
            alternation: currOr
          }),
          type: ParserDefinitionErrorType.TOO_MANY_ALTS,
          ruleName: topLevelRule.name,
          occurrence: currOr.idx
        });
      }

      return errors;
    }, []);
    return errors;
  }
  function validateSomeNonEmptyLookaheadPath(topLevelRules, maxLookahead, errMsgProvider) {
    var errors = [];
    forEach(topLevelRules, function (currTopRule) {
      var collectorVisitor = new RepetionCollector();
      currTopRule.accept(collectorVisitor);
      var allRuleProductions = collectorVisitor.allProductions;
      forEach(allRuleProductions, function (currProd) {
        var prodType = getProdType(currProd);
        var actualMaxLookahead = currProd.maxLookahead || maxLookahead;
        var currOccurrence = currProd.idx;
        var paths = getLookaheadPathsForOptionalProd(currOccurrence, currTopRule, prodType, actualMaxLookahead);
        var pathsInsideProduction = paths[0];

        if (isEmpty(flatten(pathsInsideProduction))) {
          var errMsg = errMsgProvider.buildEmptyRepetitionError({
            topLevelRule: currTopRule,
            repetition: currProd
          });
          errors.push({
            message: errMsg,
            type: ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,
            ruleName: currTopRule.name
          });
        }
      });
    });
    return errors;
  }

  function checkAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
    var foundAmbiguousPaths = [];
    var identicalAmbiguities = reduce(alternatives, function (result, currAlt, currAltIdx) {
      // ignore (skip) ambiguities with this alternative
      if (alternation.definition[currAltIdx].ignoreAmbiguities === true) {
        return result;
      }

      forEach(currAlt, function (currPath) {
        var altsCurrPathAppearsIn = [currAltIdx];
        forEach(alternatives, function (currOtherAlt, currOtherAltIdx) {
          if (currAltIdx !== currOtherAltIdx && containsPath(currOtherAlt, currPath) && // ignore (skip) ambiguities with this "other" alternative
          alternation.definition[currOtherAltIdx].ignoreAmbiguities !== true) {
            altsCurrPathAppearsIn.push(currOtherAltIdx);
          }
        });

        if (altsCurrPathAppearsIn.length > 1 && !containsPath(foundAmbiguousPaths, currPath)) {
          foundAmbiguousPaths.push(currPath);
          result.push({
            alts: altsCurrPathAppearsIn,
            path: currPath
          });
        }
      });
      return result;
    }, []);
    var currErrors = map(identicalAmbiguities, function (currAmbDescriptor) {
      var ambgIndices = map(currAmbDescriptor.alts, function (currAltIdx) {
        return currAltIdx + 1;
      });
      var currMessage = errMsgProvider.buildAlternationAmbiguityError({
        topLevelRule: rule,
        alternation: alternation,
        ambiguityIndices: ambgIndices,
        prefixPath: currAmbDescriptor.path
      });
      return {
        message: currMessage,
        type: ParserDefinitionErrorType.AMBIGUOUS_ALTS,
        ruleName: rule.name,
        occurrence: alternation.idx,
        alternatives: [currAmbDescriptor.alts]
      };
    });
    return currErrors;
  }

  function checkPrefixAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
    var errors = []; // flatten

    var pathsAndIndices = reduce(alternatives, function (result, currAlt, idx) {
      var currPathsAndIdx = map(currAlt, function (currPath) {
        return {
          idx: idx,
          path: currPath
        };
      });
      return result.concat(currPathsAndIdx);
    }, []);
    forEach(pathsAndIndices, function (currPathAndIdx) {
      var alternativeGast = alternation.definition[currPathAndIdx.idx]; // ignore (skip) ambiguities with this alternative

      if (alternativeGast.ignoreAmbiguities === true) {
        return;
      }

      var targetIdx = currPathAndIdx.idx;
      var targetPath = currPathAndIdx.path;
      var prefixAmbiguitiesPathsAndIndices = findAll(pathsAndIndices, function (searchPathAndIdx) {
        // prefix ambiguity can only be created from lower idx (higher priority) path
        return (// ignore (skip) ambiguities with this "other" alternative
          alternation.definition[searchPathAndIdx.idx].ignoreAmbiguities !== true && searchPathAndIdx.idx < targetIdx && // checking for strict prefix because identical lookaheads
          // will be be detected using a different validation.
          isStrictPrefixOfPath(searchPathAndIdx.path, targetPath)
        );
      });
      var currPathPrefixErrors = map(prefixAmbiguitiesPathsAndIndices, function (currAmbPathAndIdx) {
        var ambgIndices = [currAmbPathAndIdx.idx + 1, targetIdx + 1];
        var occurrence = alternation.idx === 0 ? "" : alternation.idx;
        var message = errMsgProvider.buildAlternationPrefixAmbiguityError({
          topLevelRule: rule,
          alternation: alternation,
          ambiguityIndices: ambgIndices,
          prefixPath: currAmbPathAndIdx.path
        });
        return {
          message: message,
          type: ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,
          ruleName: rule.name,
          occurrence: occurrence,
          alternatives: ambgIndices
        };
      });
      errors = errors.concat(currPathPrefixErrors);
    });
    return errors;
  }

  function checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider) {
    var errors = [];
    var tokenNames = map(tokenTypes, function (currToken) {
      return currToken.name;
    });
    forEach(topLevels, function (currRule) {
      var currRuleName = currRule.name;

      if (contains(tokenNames, currRuleName)) {
        var errMsg = errMsgProvider.buildNamespaceConflictError(currRule);
        errors.push({
          message: errMsg,
          type: ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,
          ruleName: currRuleName
        });
      }
    });
    return errors;
  }

  function resolveGrammar$1(options) {
    options = defaults(options, {
      errMsgProvider: defaultGrammarResolverErrorProvider
    });
    var topRulesTable = {};
    forEach(options.rules, function (rule) {
      topRulesTable[rule.name] = rule;
    });
    return resolveGrammar(topRulesTable, options.errMsgProvider);
  }
  function validateGrammar$1(options) {
    options = defaults(options, {
      errMsgProvider: defaultGrammarValidatorErrorProvider
    });
    return validateGrammar(options.rules, options.maxLookahead, options.tokenTypes, options.errMsgProvider, options.grammarName);
  }
  function assignOccurrenceIndices(options) {
    forEach(options.rules, function (currRule) {
      var methodsCollector = new DslMethodsCollectorVisitor();
      currRule.accept(methodsCollector);
      forEach(methodsCollector.dslMethods, function (methods) {
        forEach(methods, function (currMethod, arrIdx) {
          currMethod.idx = arrIdx + 1;
        });
      });
    });
  }

  var MISMATCHED_TOKEN_EXCEPTION = "MismatchedTokenException";
  var NO_VIABLE_ALT_EXCEPTION = "NoViableAltException";
  var EARLY_EXIT_EXCEPTION = "EarlyExitException";
  var NOT_ALL_INPUT_PARSED_EXCEPTION = "NotAllInputParsedException";
  var RECOGNITION_EXCEPTION_NAMES = [MISMATCHED_TOKEN_EXCEPTION, NO_VIABLE_ALT_EXCEPTION, EARLY_EXIT_EXCEPTION, NOT_ALL_INPUT_PARSED_EXCEPTION];
  Object.freeze(RECOGNITION_EXCEPTION_NAMES); // hacks to bypass no support for custom Errors in javascript/typescript

  function isRecognitionException(error) {
    // can't do instanceof on hacked custom js exceptions
    return contains(RECOGNITION_EXCEPTION_NAMES, error.name);
  }
  function MismatchedTokenException(message, token, previousToken) {
    this.name = MISMATCHED_TOKEN_EXCEPTION;
    this.message = message;
    this.token = token;
    this.previousToken = previousToken;
    this.resyncedTokens = [];
  } // must use the "Error.prototype" instead of "new Error"
  // because the stack trace points to where "new Error" was invoked"

  MismatchedTokenException.prototype = Error.prototype;
  function NoViableAltException(message, token, previousToken) {
    this.name = NO_VIABLE_ALT_EXCEPTION;
    this.message = message;
    this.token = token;
    this.previousToken = previousToken;
    this.resyncedTokens = [];
  }
  NoViableAltException.prototype = Error.prototype;
  function NotAllInputParsedException(message, token) {
    this.name = NOT_ALL_INPUT_PARSED_EXCEPTION;
    this.message = message;
    this.token = token;
    this.resyncedTokens = [];
  }
  NotAllInputParsedException.prototype = Error.prototype;
  function EarlyExitException(message, token, previousToken) {
    this.name = EARLY_EXIT_EXCEPTION;
    this.message = message;
    this.token = token;
    this.previousToken = previousToken;
    this.resyncedTokens = [];
  }
  EarlyExitException.prototype = Error.prototype;

  var EOF_FOLLOW_KEY = {};
  var IN_RULE_RECOVERY_EXCEPTION = "InRuleRecoveryException";
  function InRuleRecoveryException(message) {
    this.name = IN_RULE_RECOVERY_EXCEPTION;
    this.message = message;
  }
  InRuleRecoveryException.prototype = Error.prototype;
  /**
   * This trait is responsible for the error recovery and fault tolerant logic
   */

  var Recoverable =
  /** @class */
  function () {
    function Recoverable() {}

    Recoverable.prototype.initRecoverable = function (config) {
      this.firstAfterRepMap = {};
      this.resyncFollows = {};
      this.recoveryEnabled = has(config, "recoveryEnabled") ? config.recoveryEnabled : DEFAULT_PARSER_CONFIG.recoveryEnabled; // performance optimization, NOOP will be inlined which
      // effectively means that this optional feature does not exist
      // when not used.

      if (this.recoveryEnabled) {
        this.attemptInRepetitionRecovery = attemptInRepetitionRecovery;
      }
    };

    Recoverable.prototype.getTokenToInsert = function (tokType) {
      var tokToInsert = createTokenInstance(tokType, "", NaN, NaN, NaN, NaN, NaN, NaN);
      tokToInsert.isInsertedInRecovery = true;
      return tokToInsert;
    };

    Recoverable.prototype.canTokenTypeBeInsertedInRecovery = function (tokType) {
      return true;
    };

    Recoverable.prototype.tryInRepetitionRecovery = function (grammarRule, grammarRuleArgs, lookAheadFunc, expectedTokType) {
      var _this = this; // TODO: can the resyncTokenType be cached?


      var reSyncTokType = this.findReSyncTokenType();
      var savedLexerState = this.exportLexerState();
      var resyncedTokens = [];
      var passedResyncPoint = false;
      var nextTokenWithoutResync = this.LA(1);
      var currToken = this.LA(1);

      var generateErrorMessage = function generateErrorMessage() {
        var previousToken = _this.LA(0); // we are preemptively re-syncing before an error has been detected, therefor we must reproduce
        // the error that would have been thrown


        var msg = _this.errorMessageProvider.buildMismatchTokenMessage({
          expected: expectedTokType,
          actual: nextTokenWithoutResync,
          previous: previousToken,
          ruleName: _this.getCurrRuleFullName()
        });

        var error = new MismatchedTokenException(msg, nextTokenWithoutResync, _this.LA(0)); // the first token here will be the original cause of the error, this is not part of the resyncedTokens property.

        error.resyncedTokens = dropRight(resyncedTokens);

        _this.SAVE_ERROR(error);
      };

      while (!passedResyncPoint) {
        // re-synced to a point where we can safely exit the repetition/
        if (this.tokenMatcher(currToken, expectedTokType)) {
          generateErrorMessage();
          return; // must return here to avoid reverting the inputIdx
        } else if (lookAheadFunc.call(this)) {
          // we skipped enough tokens so we can resync right back into another iteration of the repetition grammar rule
          generateErrorMessage(); // recursive invocation in other to support multiple re-syncs in the same top level repetition grammar rule

          grammarRule.apply(this, grammarRuleArgs);
          return; // must return here to avoid reverting the inputIdx
        } else if (this.tokenMatcher(currToken, reSyncTokType)) {
          passedResyncPoint = true;
        } else {
          currToken = this.SKIP_TOKEN();
          this.addToResyncTokens(currToken, resyncedTokens);
        }
      } // we were unable to find a CLOSER point to resync inside the Repetition, reset the state.
      // The parsing exception we were trying to prevent will happen in the NEXT parsing step. it may be handled by
      // "between rules" resync recovery later in the flow.


      this.importLexerState(savedLexerState);
    };

    Recoverable.prototype.shouldInRepetitionRecoveryBeTried = function (expectTokAfterLastMatch, nextTokIdx, notStuck) {
      // Edge case of arriving from a MANY repetition which is stuck
      // Attempting recovery in this case could cause an infinite loop
      if (notStuck === false) {
        return false;
      } // arguments to try and perform resync into the next iteration of the many are missing


      if (expectTokAfterLastMatch === undefined || nextTokIdx === undefined) {
        return false;
      } // no need to recover, next token is what we expect...


      if (this.tokenMatcher(this.LA(1), expectTokAfterLastMatch)) {
        return false;
      } // error recovery is disabled during backtracking as it can make the parser ignore a valid grammar path
      // and prefer some backtracking path that includes recovered errors.


      if (this.isBackTracking()) {
        return false;
      } // if we can perform inRule recovery (single token insertion or deletion) we always prefer that recovery algorithm
      // because if it works, it makes the least amount of changes to the input stream (greedy algorithm)
      //noinspection RedundantIfStatementJS


      if (this.canPerformInRuleRecovery(expectTokAfterLastMatch, this.getFollowsForInRuleRecovery(expectTokAfterLastMatch, nextTokIdx))) {
        return false;
      }

      return true;
    }; // Error Recovery functionality


    Recoverable.prototype.getFollowsForInRuleRecovery = function (tokType, tokIdxInRule) {
      var grammarPath = this.getCurrentGrammarPath(tokType, tokIdxInRule);
      var follows = this.getNextPossibleTokenTypes(grammarPath);
      return follows;
    };

    Recoverable.prototype.tryInRuleRecovery = function (expectedTokType, follows) {
      if (this.canRecoverWithSingleTokenInsertion(expectedTokType, follows)) {
        var tokToInsert = this.getTokenToInsert(expectedTokType);
        return tokToInsert;
      }

      if (this.canRecoverWithSingleTokenDeletion(expectedTokType)) {
        var nextTok = this.SKIP_TOKEN();
        this.consumeToken();
        return nextTok;
      }

      throw new InRuleRecoveryException("sad sad panda");
    };

    Recoverable.prototype.canPerformInRuleRecovery = function (expectedToken, follows) {
      return this.canRecoverWithSingleTokenInsertion(expectedToken, follows) || this.canRecoverWithSingleTokenDeletion(expectedToken);
    };

    Recoverable.prototype.canRecoverWithSingleTokenInsertion = function (expectedTokType, follows) {
      var _this = this;

      if (!this.canTokenTypeBeInsertedInRecovery(expectedTokType)) {
        return false;
      } // must know the possible following tokens to perform single token insertion


      if (isEmpty(follows)) {
        return false;
      }

      var mismatchedTok = this.LA(1);
      var isMisMatchedTokInFollows = find(follows, function (possibleFollowsTokType) {
        return _this.tokenMatcher(mismatchedTok, possibleFollowsTokType);
      }) !== undefined;
      return isMisMatchedTokInFollows;
    };

    Recoverable.prototype.canRecoverWithSingleTokenDeletion = function (expectedTokType) {
      var isNextTokenWhatIsExpected = this.tokenMatcher(this.LA(2), expectedTokType);
      return isNextTokenWhatIsExpected;
    };

    Recoverable.prototype.isInCurrentRuleReSyncSet = function (tokenTypeIdx) {
      var followKey = this.getCurrFollowKey();
      var currentRuleReSyncSet = this.getFollowSetFromFollowKey(followKey);
      return contains(currentRuleReSyncSet, tokenTypeIdx);
    };

    Recoverable.prototype.findReSyncTokenType = function () {
      var allPossibleReSyncTokTypes = this.flattenFollowSet(); // this loop will always terminate as EOF is always in the follow stack and also always (virtually) in the input

      var nextToken = this.LA(1);
      var k = 2;

      while (true) {
        var nextTokenType = nextToken.tokenType;

        if (contains(allPossibleReSyncTokTypes, nextTokenType)) {
          return nextTokenType;
        }

        nextToken = this.LA(k);
        k++;
      }
    };

    Recoverable.prototype.getCurrFollowKey = function () {
      // the length is at least one as we always add the ruleName to the stack before invoking the rule.
      if (this.RULE_STACK.length === 1) {
        return EOF_FOLLOW_KEY;
      }

      var currRuleShortName = this.getLastExplicitRuleShortName();
      var currRuleIdx = this.getLastExplicitRuleOccurrenceIndex();
      var prevRuleShortName = this.getPreviousExplicitRuleShortName();
      return {
        ruleName: this.shortRuleNameToFullName(currRuleShortName),
        idxInCallingRule: currRuleIdx,
        inRule: this.shortRuleNameToFullName(prevRuleShortName)
      };
    };

    Recoverable.prototype.buildFullFollowKeyStack = function () {
      var _this = this;

      var explicitRuleStack = this.RULE_STACK;
      var explicitOccurrenceStack = this.RULE_OCCURRENCE_STACK;
      return map(explicitRuleStack, function (ruleName, idx) {
        if (idx === 0) {
          return EOF_FOLLOW_KEY;
        }

        return {
          ruleName: _this.shortRuleNameToFullName(ruleName),
          idxInCallingRule: explicitOccurrenceStack[idx],
          inRule: _this.shortRuleNameToFullName(explicitRuleStack[idx - 1])
        };
      });
    };

    Recoverable.prototype.flattenFollowSet = function () {
      var _this = this;

      var followStack = map(this.buildFullFollowKeyStack(), function (currKey) {
        return _this.getFollowSetFromFollowKey(currKey);
      });
      return flatten(followStack);
    };

    Recoverable.prototype.getFollowSetFromFollowKey = function (followKey) {
      if (followKey === EOF_FOLLOW_KEY) {
        return [EOF];
      }

      var followName = followKey.ruleName + followKey.idxInCallingRule + IN + followKey.inRule;
      return this.resyncFollows[followName];
    }; // It does not make any sense to include a virtual EOF token in the list of resynced tokens
    // as EOF does not really exist and thus does not contain any useful information (line/column numbers)


    Recoverable.prototype.addToResyncTokens = function (token, resyncTokens) {
      if (!this.tokenMatcher(token, EOF)) {
        resyncTokens.push(token);
      }

      return resyncTokens;
    };

    Recoverable.prototype.reSyncTo = function (tokType) {
      var resyncedTokens = [];
      var nextTok = this.LA(1);

      while (this.tokenMatcher(nextTok, tokType) === false) {
        nextTok = this.SKIP_TOKEN();
        this.addToResyncTokens(nextTok, resyncedTokens);
      } // the last token is not part of the error.


      return dropRight(resyncedTokens);
    };

    Recoverable.prototype.attemptInRepetitionRecovery = function (prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {// by default this is a NO-OP
      // The actual implementation is with the function(not method) below
    };

    Recoverable.prototype.getCurrentGrammarPath = function (tokType, tokIdxInRule) {
      var pathRuleStack = this.getHumanReadableRuleStack();
      var pathOccurrenceStack = cloneArr(this.RULE_OCCURRENCE_STACK);
      var grammarPath = {
        ruleStack: pathRuleStack,
        occurrenceStack: pathOccurrenceStack,
        lastTok: tokType,
        lastTokOccurrence: tokIdxInRule
      };
      return grammarPath;
    };

    Recoverable.prototype.getHumanReadableRuleStack = function () {
      var _this = this;

      return map(this.RULE_STACK, function (currShortName) {
        return _this.shortRuleNameToFullName(currShortName);
      });
    };

    return Recoverable;
  }();
  function attemptInRepetitionRecovery(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
    var key = this.getKeyForAutomaticLookahead(dslMethodIdx, prodOccurrence);
    var firstAfterRepInfo = this.firstAfterRepMap[key];

    if (firstAfterRepInfo === undefined) {
      var currRuleName = this.getCurrRuleFullName();
      var ruleGrammar = this.getGAstProductions()[currRuleName];
      var walker = new nextToksWalker(ruleGrammar, prodOccurrence);
      firstAfterRepInfo = walker.startWalking();
      this.firstAfterRepMap[key] = firstAfterRepInfo;
    }

    var expectTokAfterLastMatch = firstAfterRepInfo.token;
    var nextTokIdx = firstAfterRepInfo.occurrence;
    var isEndOfRule = firstAfterRepInfo.isEndOfRule; // special edge case of a TOP most repetition after which the input should END.
    // this will force an attempt for inRule recovery in that scenario.

    if (this.RULE_STACK.length === 1 && isEndOfRule && expectTokAfterLastMatch === undefined) {
      expectTokAfterLastMatch = EOF;
      nextTokIdx = 1;
    }

    if (this.shouldInRepetitionRecoveryBeTried(expectTokAfterLastMatch, nextTokIdx, notStuck)) {
      // TODO: performance optimization: instead of passing the original args here, we modify
      // the args param (or create a new one) and make sure the lookahead func is explicitly provided
      // to avoid searching the cache for it once more.
      this.tryInRepetitionRecovery(prodFunc, args, lookaheadFunc, expectTokAfterLastMatch);
    }
  }

  // Lookahead keys are 32Bit integers in the form
  // TTTTTTTT-ZZZZZZZZZZZZ-YYYY-XXXXXXXX
  // XXXX -> Occurrence Index bitmap.
  // YYYY -> DSL Method Type bitmap.
  // ZZZZZZZZZZZZZZZ -> Rule short Index bitmap.
  // TTTTTTTTT -> alternation alternative index bitmap
  var BITS_FOR_METHOD_TYPE = 4;
  var BITS_FOR_OCCURRENCE_IDX = 8;
  // being short improves the performance when composing KEYS for maps out of these
  // The 5 - 8 bits (16 possible values, are reserved for the DSL method indices)

  /* tslint:disable */

  var OR_IDX = 1 << BITS_FOR_OCCURRENCE_IDX;
  var OPTION_IDX = 2 << BITS_FOR_OCCURRENCE_IDX;
  var MANY_IDX = 3 << BITS_FOR_OCCURRENCE_IDX;
  var AT_LEAST_ONE_IDX = 4 << BITS_FOR_OCCURRENCE_IDX;
  var MANY_SEP_IDX = 5 << BITS_FOR_OCCURRENCE_IDX;
  var AT_LEAST_ONE_SEP_IDX = 6 << BITS_FOR_OCCURRENCE_IDX;
  /* tslint:enable */
  // this actually returns a number, but it is always used as a string (object prop key)

  function getKeyForAutomaticLookahead(ruleIdx, dslMethodIdx, occurrence) {
    /* tslint:disable */
    return occurrence | dslMethodIdx | ruleIdx;
    /* tslint:enable */
  }

  /**
   * Trait responsible for the lookahead related utilities and optimizations.
   */

  var LooksAhead =
  /** @class */
  function () {
    function LooksAhead() {}

    LooksAhead.prototype.initLooksAhead = function (config) {
      this.dynamicTokensEnabled = has(config, "dynamicTokensEnabled") ? config.dynamicTokensEnabled : DEFAULT_PARSER_CONFIG.dynamicTokensEnabled;
      this.maxLookahead = has(config, "maxLookahead") ? config.maxLookahead : DEFAULT_PARSER_CONFIG.maxLookahead;
      /* istanbul ignore next - Using plain array as dictionary will be tested on older node.js versions and IE11 */

      this.lookAheadFuncsCache = isES2015MapSupported() ? new Map() : []; // Performance optimization on newer engines that support ES6 Map
      // For larger Maps this is slightly faster than using a plain object (array in our case).

      /* istanbul ignore else - The else branch will be tested on older node.js versions and IE11 */

      if (isES2015MapSupported()) {
        this.getLaFuncFromCache = this.getLaFuncFromMap;
        this.setLaFuncCache = this.setLaFuncCacheUsingMap;
      } else {
        this.getLaFuncFromCache = this.getLaFuncFromObj;
        this.setLaFuncCache = this.setLaFuncUsingObj;
      }
    };

    LooksAhead.prototype.preComputeLookaheadFunctions = function (rules) {
      var _this = this;

      forEach(rules, function (currRule) {
        _this.TRACE_INIT(currRule.name + " Rule Lookahead", function () {
          var _a = collectMethods(currRule),
              alternation = _a.alternation,
              repetition = _a.repetition,
              option = _a.option,
              repetitionMandatory = _a.repetitionMandatory,
              repetitionMandatoryWithSeparator = _a.repetitionMandatoryWithSeparator,
              repetitionWithSeparator = _a.repetitionWithSeparator;

          forEach(alternation, function (currProd) {
            var prodIdx = currProd.idx === 0 ? "" : currProd.idx;

            _this.TRACE_INIT("" + getProductionDslName(currProd) + prodIdx, function () {
              var laFunc = buildLookaheadFuncForOr(currProd.idx, currRule, currProd.maxLookahead || _this.maxLookahead, currProd.hasPredicates, _this.dynamicTokensEnabled, _this.lookAheadBuilderForAlternatives);
              var key = getKeyForAutomaticLookahead(_this.fullRuleNameToShort[currRule.name], OR_IDX, currProd.idx);

              _this.setLaFuncCache(key, laFunc);
            });
          });
          forEach(repetition, function (currProd) {
            _this.computeLookaheadFunc(currRule, currProd.idx, MANY_IDX, PROD_TYPE.REPETITION, currProd.maxLookahead, getProductionDslName(currProd));
          });
          forEach(option, function (currProd) {
            _this.computeLookaheadFunc(currRule, currProd.idx, OPTION_IDX, PROD_TYPE.OPTION, currProd.maxLookahead, getProductionDslName(currProd));
          });
          forEach(repetitionMandatory, function (currProd) {
            _this.computeLookaheadFunc(currRule, currProd.idx, AT_LEAST_ONE_IDX, PROD_TYPE.REPETITION_MANDATORY, currProd.maxLookahead, getProductionDslName(currProd));
          });
          forEach(repetitionMandatoryWithSeparator, function (currProd) {
            _this.computeLookaheadFunc(currRule, currProd.idx, AT_LEAST_ONE_SEP_IDX, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currProd.maxLookahead, getProductionDslName(currProd));
          });
          forEach(repetitionWithSeparator, function (currProd) {
            _this.computeLookaheadFunc(currRule, currProd.idx, MANY_SEP_IDX, PROD_TYPE.REPETITION_WITH_SEPARATOR, currProd.maxLookahead, getProductionDslName(currProd));
          });
        });
      });
    };

    LooksAhead.prototype.computeLookaheadFunc = function (rule, prodOccurrence, prodKey, prodType, prodMaxLookahead, dslMethodName) {
      var _this = this;

      this.TRACE_INIT("" + dslMethodName + (prodOccurrence === 0 ? "" : prodOccurrence), function () {
        var laFunc = buildLookaheadFuncForOptionalProd(prodOccurrence, rule, prodMaxLookahead || _this.maxLookahead, _this.dynamicTokensEnabled, prodType, _this.lookAheadBuilderForOptional);
        var key = getKeyForAutomaticLookahead(_this.fullRuleNameToShort[rule.name], prodKey, prodOccurrence);

        _this.setLaFuncCache(key, laFunc);
      });
    };

    LooksAhead.prototype.lookAheadBuilderForOptional = function (alt, tokenMatcher, dynamicTokensEnabled) {
      return buildSingleAlternativeLookaheadFunction(alt, tokenMatcher, dynamicTokensEnabled);
    };

    LooksAhead.prototype.lookAheadBuilderForAlternatives = function (alts, hasPredicates, tokenMatcher, dynamicTokensEnabled) {
      return buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher, dynamicTokensEnabled);
    }; // this actually returns a number, but it is always used as a string (object prop key)


    LooksAhead.prototype.getKeyForAutomaticLookahead = function (dslMethodIdx, occurrence) {
      var currRuleShortName = this.getLastExplicitRuleShortName();
      return getKeyForAutomaticLookahead(currRuleShortName, dslMethodIdx, occurrence);
    };
    /* istanbul ignore next */


    LooksAhead.prototype.getLaFuncFromCache = function (key) {
      return undefined;
    };

    LooksAhead.prototype.getLaFuncFromMap = function (key) {
      return this.lookAheadFuncsCache.get(key);
    };
    /* istanbul ignore next - Using plain array as dictionary will be tested on older node.js versions and IE11 */


    LooksAhead.prototype.getLaFuncFromObj = function (key) {
      return this.lookAheadFuncsCache[key];
    };
    /* istanbul ignore next */


    LooksAhead.prototype.setLaFuncCache = function (key, value) {};

    LooksAhead.prototype.setLaFuncCacheUsingMap = function (key, value) {
      this.lookAheadFuncsCache.set(key, value);
    };
    /* istanbul ignore next - Using plain array as dictionary will be tested on older node.js versions and IE11 */


    LooksAhead.prototype.setLaFuncUsingObj = function (key, value) {
      this.lookAheadFuncsCache[key] = value;
    };

    return LooksAhead;
  }();

  /**
   * This nodeLocation tracking is not efficient and should only be used
   * when error recovery is enabled or the Token Vector contains virtual Tokens
   * (e.g, Python Indent/Outdent)
   * As it executes the calculation for every single terminal/nonTerminal
   * and does not rely on the fact the token vector is **sorted**
   */
  function setNodeLocationOnlyOffset(currNodeLocation, newLocationInfo) {
    // First (valid) update for this cst node
    if (isNaN(currNodeLocation.startOffset) === true) {
      // assumption1: Token location information is either NaN or a valid number
      // assumption2: Token location information is fully valid if it exist
      // (both start/end offsets exist and are numbers).
      currNodeLocation.startOffset = newLocationInfo.startOffset;
      currNodeLocation.endOffset = newLocationInfo.endOffset;
    } // Once the startOffset has been updated with a valid number it should never receive
    // any farther updates as the Token vector is sorted.
    // We still have to check this this condition for every new possible location info
    // because with error recovery enabled we may encounter invalid tokens (NaN location props)
    else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
        currNodeLocation.endOffset = newLocationInfo.endOffset;
      }
  }
  /**
   * This nodeLocation tracking is not efficient and should only be used
   * when error recovery is enabled or the Token Vector contains virtual Tokens
   * (e.g, Python Indent/Outdent)
   * As it executes the calculation for every single terminal/nonTerminal
   * and does not rely on the fact the token vector is **sorted**
   */

  function setNodeLocationFull(currNodeLocation, newLocationInfo) {
    // First (valid) update for this cst node
    if (isNaN(currNodeLocation.startOffset) === true) {
      // assumption1: Token location information is either NaN or a valid number
      // assumption2: Token location information is fully valid if it exist
      // (all start/end props exist and are numbers).
      currNodeLocation.startOffset = newLocationInfo.startOffset;
      currNodeLocation.startColumn = newLocationInfo.startColumn;
      currNodeLocation.startLine = newLocationInfo.startLine;
      currNodeLocation.endOffset = newLocationInfo.endOffset;
      currNodeLocation.endColumn = newLocationInfo.endColumn;
      currNodeLocation.endLine = newLocationInfo.endLine;
    } // Once the start props has been updated with a valid number it should never receive
    // any farther updates as the Token vector is sorted.
    // We still have to check this this condition for every new possible location info
    // because with error recovery enabled we may encounter invalid tokens (NaN location props)
    else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
        currNodeLocation.endOffset = newLocationInfo.endOffset;
        currNodeLocation.endColumn = newLocationInfo.endColumn;
        currNodeLocation.endLine = newLocationInfo.endLine;
      }
  }
  function addTerminalToCst(node, token, tokenTypeName) {
    if (node.children[tokenTypeName] === undefined) {
      node.children[tokenTypeName] = [token];
    } else {
      node.children[tokenTypeName].push(token);
    }
  }
  function addNoneTerminalToCst(node, ruleName, ruleResult) {
    if (node.children[ruleName] === undefined) {
      node.children[ruleName] = [ruleResult];
    } else {
      node.children[ruleName].push(ruleResult);
    }
  }

  function classNameFromInstance(instance) {
    return functionName(instance.constructor);
  }
  var NAME = "name";
  /**
   * Utility to obtain Function names.
   * Note that there should not be an assumptions on the result of this function.
   * E.g: When running from minified source code the result may be auto generated.
   */

  function functionName(func) {
    // Engines that support Function.prototype.name OR the nth (n>1) time after
    // the name has been computed in the following else block.
    var existingNameProp = func.name;
    /* istanbul ignore else - too many hacks for IE/old versions of node.js here*/

    if (existingNameProp) {
      return existingNameProp;
    } else {
      return "anonymous";
    }
  }
  /**
   * @returns {boolean} - has the property been successfully defined
   */

  function defineNameProp(obj, nameValue) {
    var namePropDescriptor = Object.getOwnPropertyDescriptor(obj, NAME);
    /* istanbul ignore else -> will only run in old versions of node.js */

    if (isUndefined(namePropDescriptor) || namePropDescriptor.configurable) {
      Object.defineProperty(obj, NAME, {
        enumerable: false,
        configurable: true,
        writable: false,
        value: nameValue
      });
      return true;
    }
    /* istanbul ignore next -> will only run in old versions of node.js */


    return false;
  }

  function defaultVisit(ctx, param) {
    var childrenNames = keys(ctx);
    var childrenNamesLength = childrenNames.length;

    for (var i = 0; i < childrenNamesLength; i++) {
      var currChildName = childrenNames[i];
      var currChildArray = ctx[currChildName];
      var currChildArrayLength = currChildArray.length;

      for (var j = 0; j < currChildArrayLength; j++) {
        var currChild = currChildArray[j]; // distinction between Tokens Children and CstNode children

        if (currChild.tokenTypeIdx === undefined) {
          this[currChild.name](currChild.children, param);
        }
      }
    } // defaultVisit does not support generic out param


    return undefined;
  }
  function createBaseSemanticVisitorConstructor(grammarName, ruleNames) {
    var derivedConstructor = function derivedConstructor() {}; // can be overwritten according to:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/
    // name?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FFunction%2Fname


    defineNameProp(derivedConstructor, grammarName + "BaseSemantics");
    var semanticProto = {
      visit: function visit(cstNode, param) {
        // enables writing more concise visitor methods when CstNode has only a single child
        if (isArray(cstNode)) {
          // A CST Node's children dictionary can never have empty arrays as values
          // If a key is defined there will be at least one element in the corresponding value array.
          cstNode = cstNode[0];
        } // enables passing optional CstNodes concisely.


        if (isUndefined(cstNode)) {
          return undefined;
        }

        return this[cstNode.name](cstNode.children, param);
      },
      validateVisitor: function validateVisitor() {
        var semanticDefinitionErrors = _validateVisitor(this, ruleNames);

        if (!isEmpty(semanticDefinitionErrors)) {
          var errorMessages = map(semanticDefinitionErrors, function (currDefError) {
            return currDefError.msg;
          });
          throw Error("Errors Detected in CST Visitor <" + functionName(this.constructor) + ">:\n\t" + ("" + errorMessages.join("\n\n").replace(/\n/g, "\n\t")));
        }
      }
    };
    derivedConstructor.prototype = semanticProto;
    derivedConstructor.prototype.constructor = derivedConstructor;
    derivedConstructor._RULE_NAMES = ruleNames;
    return derivedConstructor;
  }
  function createBaseVisitorConstructorWithDefaults(grammarName, ruleNames, baseConstructor) {
    var derivedConstructor = function derivedConstructor() {}; // can be overwritten according to:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/
    // name?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FFunction%2Fname


    defineNameProp(derivedConstructor, grammarName + "BaseSemanticsWithDefaults");
    var withDefaultsProto = Object.create(baseConstructor.prototype);
    forEach(ruleNames, function (ruleName) {
      withDefaultsProto[ruleName] = defaultVisit;
    });
    derivedConstructor.prototype = withDefaultsProto;
    derivedConstructor.prototype.constructor = derivedConstructor;
    return derivedConstructor;
  }
  var CstVisitorDefinitionError;

  (function (CstVisitorDefinitionError) {
    CstVisitorDefinitionError[CstVisitorDefinitionError["REDUNDANT_METHOD"] = 0] = "REDUNDANT_METHOD";
    CstVisitorDefinitionError[CstVisitorDefinitionError["MISSING_METHOD"] = 1] = "MISSING_METHOD";
  })(CstVisitorDefinitionError || (CstVisitorDefinitionError = {}));

  function _validateVisitor(visitorInstance, ruleNames) {
    var missingErrors = validateMissingCstMethods(visitorInstance, ruleNames);
    var redundantErrors = validateRedundantMethods(visitorInstance, ruleNames);
    return missingErrors.concat(redundantErrors);
  }
  function validateMissingCstMethods(visitorInstance, ruleNames) {
    var errors = map(ruleNames, function (currRuleName) {
      if (!isFunction(visitorInstance[currRuleName])) {
        return {
          msg: "Missing visitor method: <" + currRuleName + "> on " + functionName(visitorInstance.constructor) + " CST Visitor.",
          type: CstVisitorDefinitionError.MISSING_METHOD,
          methodName: currRuleName
        };
      }
    });
    return compact(errors);
  }
  var VALID_PROP_NAMES = ["constructor", "visit", "validateVisitor"];
  function validateRedundantMethods(visitorInstance, ruleNames) {
    var errors = [];

    for (var prop in visitorInstance) {
      if (validTermsPattern.test(prop) && isFunction(visitorInstance[prop]) && !contains(VALID_PROP_NAMES, prop) && !contains(ruleNames, prop)) {
        errors.push({
          msg: "Redundant visitor method: <" + prop + "> on " + functionName(visitorInstance.constructor) + " CST Visitor\n" + "There is no Grammar Rule corresponding to this method's name.\n" + ("For utility methods on visitor classes use methods names that do not match /" + validTermsPattern.source + "/."),
          type: CstVisitorDefinitionError.REDUNDANT_METHOD,
          methodName: prop
        });
      }
    }

    return errors;
  }

  /**
   * This trait is responsible for the CST building logic.
   */

  var TreeBuilder =
  /** @class */
  function () {
    function TreeBuilder() {}

    TreeBuilder.prototype.initTreeBuilder = function (config) {
      this.CST_STACK = []; // outputCst is no longer exposed/defined in the pubic API

      this.outputCst = config.outputCst;
      this.nodeLocationTracking = has(config, "nodeLocationTracking") ? config.nodeLocationTracking : DEFAULT_PARSER_CONFIG.nodeLocationTracking;

      if (!this.outputCst) {
        this.cstInvocationStateUpdate = NOOP;
        this.cstFinallyStateUpdate = NOOP;
        this.cstPostTerminal = NOOP;
        this.cstPostNonTerminal = NOOP;
        this.cstPostRule = NOOP;
      } else {
        if (/full/i.test(this.nodeLocationTracking)) {
          if (this.recoveryEnabled) {
            this.setNodeLocationFromToken = setNodeLocationFull;
            this.setNodeLocationFromNode = setNodeLocationFull;
            this.cstPostRule = NOOP;
            this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery;
          } else {
            this.setNodeLocationFromToken = NOOP;
            this.setNodeLocationFromNode = NOOP;
            this.cstPostRule = this.cstPostRuleFull;
            this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular;
          }
        } else if (/onlyOffset/i.test(this.nodeLocationTracking)) {
          if (this.recoveryEnabled) {
            this.setNodeLocationFromToken = setNodeLocationOnlyOffset;
            this.setNodeLocationFromNode = setNodeLocationOnlyOffset;
            this.cstPostRule = NOOP;
            this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery;
          } else {
            this.setNodeLocationFromToken = NOOP;
            this.setNodeLocationFromNode = NOOP;
            this.cstPostRule = this.cstPostRuleOnlyOffset;
            this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular;
          }
        } else if (/none/i.test(this.nodeLocationTracking)) {
          this.setNodeLocationFromToken = NOOP;
          this.setNodeLocationFromNode = NOOP;
          this.cstPostRule = NOOP;
          this.setInitialNodeLocation = NOOP;
        } else {
          throw Error("Invalid <nodeLocationTracking> config option: \"" + config.nodeLocationTracking + "\"");
        }
      }
    };

    TreeBuilder.prototype.setInitialNodeLocationOnlyOffsetRecovery = function (cstNode) {
      cstNode.location = {
        startOffset: NaN,
        endOffset: NaN
      };
    };

    TreeBuilder.prototype.setInitialNodeLocationOnlyOffsetRegular = function (cstNode) {
      cstNode.location = {
        // without error recovery the starting Location of a new CstNode is guaranteed
        // To be the next Token's startOffset (for valid inputs).
        // For invalid inputs there won't be any CSTOutput so this potential
        // inaccuracy does not matter
        startOffset: this.LA(1).startOffset,
        endOffset: NaN
      };
    };

    TreeBuilder.prototype.setInitialNodeLocationFullRecovery = function (cstNode) {
      cstNode.location = {
        startOffset: NaN,
        startLine: NaN,
        startColumn: NaN,
        endOffset: NaN,
        endLine: NaN,
        endColumn: NaN
      };
    };
    /**
       *  @see setInitialNodeLocationOnlyOffsetRegular for explanation why this work
          * @param cstNode
       */


    TreeBuilder.prototype.setInitialNodeLocationFullRegular = function (cstNode) {
      var nextToken = this.LA(1);
      cstNode.location = {
        startOffset: nextToken.startOffset,
        startLine: nextToken.startLine,
        startColumn: nextToken.startColumn,
        endOffset: NaN,
        endLine: NaN,
        endColumn: NaN
      };
    };

    TreeBuilder.prototype.cstInvocationStateUpdate = function (fullRuleName, shortName) {
      var cstNode = {
        name: fullRuleName,
        children: {}
      };
      this.setInitialNodeLocation(cstNode);
      this.CST_STACK.push(cstNode);
    };

    TreeBuilder.prototype.cstFinallyStateUpdate = function () {
      this.CST_STACK.pop();
    };

    TreeBuilder.prototype.cstPostRuleFull = function (ruleCstNode) {
      var prevToken = this.LA(0);
      var loc = ruleCstNode.location; // If this condition is true it means we consumed at least one Token
      // In this CstNode.

      if (loc.startOffset <= prevToken.startOffset === true) {
        loc.endOffset = prevToken.endOffset;
        loc.endLine = prevToken.endLine;
        loc.endColumn = prevToken.endColumn;
      } // "empty" CstNode edge case
      else {
          loc.startOffset = NaN;
          loc.startLine = NaN;
          loc.startColumn = NaN;
        }
    };

    TreeBuilder.prototype.cstPostRuleOnlyOffset = function (ruleCstNode) {
      var prevToken = this.LA(0);
      var loc = ruleCstNode.location; // If this condition is true it means we consumed at least one Token
      // In this CstNode.

      if (loc.startOffset <= prevToken.startOffset === true) {
        loc.endOffset = prevToken.endOffset;
      } // "empty" CstNode edge case
      else {
          loc.startOffset = NaN;
        }
    };

    TreeBuilder.prototype.cstPostTerminal = function (key, consumedToken) {
      var rootCst = this.CST_STACK[this.CST_STACK.length - 1];
      addTerminalToCst(rootCst, consumedToken, key); // This is only used when **both** error recovery and CST Output are enabled.

      this.setNodeLocationFromToken(rootCst.location, consumedToken);
    };

    TreeBuilder.prototype.cstPostNonTerminal = function (ruleCstResult, ruleName) {
      var preCstNode = this.CST_STACK[this.CST_STACK.length - 1];
      addNoneTerminalToCst(preCstNode, ruleName, ruleCstResult); // This is only used when **both** error recovery and CST Output are enabled.

      this.setNodeLocationFromNode(preCstNode.location, ruleCstResult.location);
    };

    TreeBuilder.prototype.getBaseCstVisitorConstructor = function () {
      if (isUndefined(this.baseCstVisitorConstructor)) {
        var newBaseCstVisitorConstructor = createBaseSemanticVisitorConstructor(this.className, keys(this.gastProductionsCache));
        this.baseCstVisitorConstructor = newBaseCstVisitorConstructor;
        return newBaseCstVisitorConstructor;
      }

      return this.baseCstVisitorConstructor;
    };

    TreeBuilder.prototype.getBaseCstVisitorConstructorWithDefaults = function () {
      if (isUndefined(this.baseCstVisitorWithDefaultsConstructor)) {
        var newConstructor = createBaseVisitorConstructorWithDefaults(this.className, keys(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
        this.baseCstVisitorWithDefaultsConstructor = newConstructor;
        return newConstructor;
      }

      return this.baseCstVisitorWithDefaultsConstructor;
    };

    TreeBuilder.prototype.getLastExplicitRuleShortName = function () {
      var ruleStack = this.RULE_STACK;
      return ruleStack[ruleStack.length - 1];
    };

    TreeBuilder.prototype.getPreviousExplicitRuleShortName = function () {
      var ruleStack = this.RULE_STACK;
      return ruleStack[ruleStack.length - 2];
    };

    TreeBuilder.prototype.getLastExplicitRuleOccurrenceIndex = function () {
      var occurrenceStack = this.RULE_OCCURRENCE_STACK;
      return occurrenceStack[occurrenceStack.length - 1];
    };

    return TreeBuilder;
  }();

  /**
   * Trait responsible abstracting over the interaction with Lexer output (Token vector).
   *
   * This could be generalized to support other kinds of lexers, e.g.
   * - Just in Time Lexing / Lexer-Less parsing.
   * - Streaming Lexer.
   */

  var LexerAdapter =
  /** @class */
  function () {
    function LexerAdapter() {}

    LexerAdapter.prototype.initLexerAdapter = function () {
      this.tokVector = [];
      this.tokVectorLength = 0;
      this.currIdx = -1;
    };

    Object.defineProperty(LexerAdapter.prototype, "input", {
      get: function get() {
        return this.tokVector;
      },
      set: function set(newInput) {
        // @ts-ignore - `this parameter` not supported in setters/getters
        //   - https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters
        if (this.selfAnalysisDone !== true) {
          throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
        } // @ts-ignore - `this parameter` not supported in setters/getters
        //   - https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters


        this.reset();
        this.tokVector = newInput;
        this.tokVectorLength = newInput.length;
      },
      enumerable: false,
      configurable: true
    }); // skips a token and returns the next token

    LexerAdapter.prototype.SKIP_TOKEN = function () {
      if (this.currIdx <= this.tokVector.length - 2) {
        this.consumeToken();
        return this.LA(1);
      } else {
        return END_OF_FILE;
      }
    }; // Lexer (accessing Token vector) related methods which can be overridden to implement lazy lexers
    // or lexers dependent on parser context.


    LexerAdapter.prototype.LA = function (howMuch) {
      var soughtIdx = this.currIdx + howMuch;

      if (soughtIdx < 0 || this.tokVectorLength <= soughtIdx) {
        return END_OF_FILE;
      } else {
        return this.tokVector[soughtIdx];
      }
    };

    LexerAdapter.prototype.consumeToken = function () {
      this.currIdx++;
    };

    LexerAdapter.prototype.exportLexerState = function () {
      return this.currIdx;
    };

    LexerAdapter.prototype.importLexerState = function (newState) {
      this.currIdx = newState;
    };

    LexerAdapter.prototype.resetLexerState = function () {
      this.currIdx = -1;
    };

    LexerAdapter.prototype.moveToTerminatedState = function () {
      this.currIdx = this.tokVector.length - 1;
    };

    LexerAdapter.prototype.getLexerPosition = function () {
      return this.exportLexerState();
    };

    return LexerAdapter;
  }();

  /**
   * This trait is responsible for implementing the public API
   * for defining Chevrotain parsers, i.e:
   * - CONSUME
   * - RULE
   * - OPTION
   * - ...
   */

  var RecognizerApi =
  /** @class */
  function () {
    function RecognizerApi() {}

    RecognizerApi.prototype.ACTION = function (impl) {
      return impl.call(this);
    };

    RecognizerApi.prototype.consume = function (idx, tokType, options) {
      return this.consumeInternal(tokType, idx, options);
    };

    RecognizerApi.prototype.subrule = function (idx, ruleToCall, options) {
      return this.subruleInternal(ruleToCall, idx, options);
    };

    RecognizerApi.prototype.option = function (idx, actionORMethodDef) {
      return this.optionInternal(actionORMethodDef, idx);
    };

    RecognizerApi.prototype.or = function (idx, altsOrOpts) {
      return this.orInternal(altsOrOpts, idx);
    };

    RecognizerApi.prototype.many = function (idx, actionORMethodDef) {
      return this.manyInternal(idx, actionORMethodDef);
    };

    RecognizerApi.prototype.atLeastOne = function (idx, actionORMethodDef) {
      return this.atLeastOneInternal(idx, actionORMethodDef);
    };

    RecognizerApi.prototype.CONSUME = function (tokType, options) {
      return this.consumeInternal(tokType, 0, options);
    };

    RecognizerApi.prototype.CONSUME1 = function (tokType, options) {
      return this.consumeInternal(tokType, 1, options);
    };

    RecognizerApi.prototype.CONSUME2 = function (tokType, options) {
      return this.consumeInternal(tokType, 2, options);
    };

    RecognizerApi.prototype.CONSUME3 = function (tokType, options) {
      return this.consumeInternal(tokType, 3, options);
    };

    RecognizerApi.prototype.CONSUME4 = function (tokType, options) {
      return this.consumeInternal(tokType, 4, options);
    };

    RecognizerApi.prototype.CONSUME5 = function (tokType, options) {
      return this.consumeInternal(tokType, 5, options);
    };

    RecognizerApi.prototype.CONSUME6 = function (tokType, options) {
      return this.consumeInternal(tokType, 6, options);
    };

    RecognizerApi.prototype.CONSUME7 = function (tokType, options) {
      return this.consumeInternal(tokType, 7, options);
    };

    RecognizerApi.prototype.CONSUME8 = function (tokType, options) {
      return this.consumeInternal(tokType, 8, options);
    };

    RecognizerApi.prototype.CONSUME9 = function (tokType, options) {
      return this.consumeInternal(tokType, 9, options);
    };

    RecognizerApi.prototype.SUBRULE = function (ruleToCall, options) {
      return this.subruleInternal(ruleToCall, 0, options);
    };

    RecognizerApi.prototype.SUBRULE1 = function (ruleToCall, options) {
      return this.subruleInternal(ruleToCall, 1, options);
    };

    RecognizerApi.prototype.SUBRULE2 = function (ruleToCall, options) {
      return this.subruleInternal(ruleToCall, 2, options);
    };

    RecognizerApi.prototype.SUBRULE3 = function (ruleToCall, options) {
      return this.subruleInternal(ruleToCall, 3, options);
    };

    RecognizerApi.prototype.SUBRULE4 = function (ruleToCall, options) {
      return this.subruleInternal(ruleToCall, 4, options);
    };

    RecognizerApi.prototype.SUBRULE5 = function (ruleToCall, options) {
      return this.subruleInternal(ruleToCall, 5, options);
    };

    RecognizerApi.prototype.SUBRULE6 = function (ruleToCall, options) {
      return this.subruleInternal(ruleToCall, 6, options);
    };

    RecognizerApi.prototype.SUBRULE7 = function (ruleToCall, options) {
      return this.subruleInternal(ruleToCall, 7, options);
    };

    RecognizerApi.prototype.SUBRULE8 = function (ruleToCall, options) {
      return this.subruleInternal(ruleToCall, 8, options);
    };

    RecognizerApi.prototype.SUBRULE9 = function (ruleToCall, options) {
      return this.subruleInternal(ruleToCall, 9, options);
    };

    RecognizerApi.prototype.OPTION = function (actionORMethodDef) {
      return this.optionInternal(actionORMethodDef, 0);
    };

    RecognizerApi.prototype.OPTION1 = function (actionORMethodDef) {
      return this.optionInternal(actionORMethodDef, 1);
    };

    RecognizerApi.prototype.OPTION2 = function (actionORMethodDef) {
      return this.optionInternal(actionORMethodDef, 2);
    };

    RecognizerApi.prototype.OPTION3 = function (actionORMethodDef) {
      return this.optionInternal(actionORMethodDef, 3);
    };

    RecognizerApi.prototype.OPTION4 = function (actionORMethodDef) {
      return this.optionInternal(actionORMethodDef, 4);
    };

    RecognizerApi.prototype.OPTION5 = function (actionORMethodDef) {
      return this.optionInternal(actionORMethodDef, 5);
    };

    RecognizerApi.prototype.OPTION6 = function (actionORMethodDef) {
      return this.optionInternal(actionORMethodDef, 6);
    };

    RecognizerApi.prototype.OPTION7 = function (actionORMethodDef) {
      return this.optionInternal(actionORMethodDef, 7);
    };

    RecognizerApi.prototype.OPTION8 = function (actionORMethodDef) {
      return this.optionInternal(actionORMethodDef, 8);
    };

    RecognizerApi.prototype.OPTION9 = function (actionORMethodDef) {
      return this.optionInternal(actionORMethodDef, 9);
    };

    RecognizerApi.prototype.OR = function (altsOrOpts) {
      return this.orInternal(altsOrOpts, 0);
    };

    RecognizerApi.prototype.OR1 = function (altsOrOpts) {
      return this.orInternal(altsOrOpts, 1);
    };

    RecognizerApi.prototype.OR2 = function (altsOrOpts) {
      return this.orInternal(altsOrOpts, 2);
    };

    RecognizerApi.prototype.OR3 = function (altsOrOpts) {
      return this.orInternal(altsOrOpts, 3);
    };

    RecognizerApi.prototype.OR4 = function (altsOrOpts) {
      return this.orInternal(altsOrOpts, 4);
    };

    RecognizerApi.prototype.OR5 = function (altsOrOpts) {
      return this.orInternal(altsOrOpts, 5);
    };

    RecognizerApi.prototype.OR6 = function (altsOrOpts) {
      return this.orInternal(altsOrOpts, 6);
    };

    RecognizerApi.prototype.OR7 = function (altsOrOpts) {
      return this.orInternal(altsOrOpts, 7);
    };

    RecognizerApi.prototype.OR8 = function (altsOrOpts) {
      return this.orInternal(altsOrOpts, 8);
    };

    RecognizerApi.prototype.OR9 = function (altsOrOpts) {
      return this.orInternal(altsOrOpts, 9);
    };

    RecognizerApi.prototype.MANY = function (actionORMethodDef) {
      this.manyInternal(0, actionORMethodDef);
    };

    RecognizerApi.prototype.MANY1 = function (actionORMethodDef) {
      this.manyInternal(1, actionORMethodDef);
    };

    RecognizerApi.prototype.MANY2 = function (actionORMethodDef) {
      this.manyInternal(2, actionORMethodDef);
    };

    RecognizerApi.prototype.MANY3 = function (actionORMethodDef) {
      this.manyInternal(3, actionORMethodDef);
    };

    RecognizerApi.prototype.MANY4 = function (actionORMethodDef) {
      this.manyInternal(4, actionORMethodDef);
    };

    RecognizerApi.prototype.MANY5 = function (actionORMethodDef) {
      this.manyInternal(5, actionORMethodDef);
    };

    RecognizerApi.prototype.MANY6 = function (actionORMethodDef) {
      this.manyInternal(6, actionORMethodDef);
    };

    RecognizerApi.prototype.MANY7 = function (actionORMethodDef) {
      this.manyInternal(7, actionORMethodDef);
    };

    RecognizerApi.prototype.MANY8 = function (actionORMethodDef) {
      this.manyInternal(8, actionORMethodDef);
    };

    RecognizerApi.prototype.MANY9 = function (actionORMethodDef) {
      this.manyInternal(9, actionORMethodDef);
    };

    RecognizerApi.prototype.MANY_SEP = function (options) {
      this.manySepFirstInternal(0, options);
    };

    RecognizerApi.prototype.MANY_SEP1 = function (options) {
      this.manySepFirstInternal(1, options);
    };

    RecognizerApi.prototype.MANY_SEP2 = function (options) {
      this.manySepFirstInternal(2, options);
    };

    RecognizerApi.prototype.MANY_SEP3 = function (options) {
      this.manySepFirstInternal(3, options);
    };

    RecognizerApi.prototype.MANY_SEP4 = function (options) {
      this.manySepFirstInternal(4, options);
    };

    RecognizerApi.prototype.MANY_SEP5 = function (options) {
      this.manySepFirstInternal(5, options);
    };

    RecognizerApi.prototype.MANY_SEP6 = function (options) {
      this.manySepFirstInternal(6, options);
    };

    RecognizerApi.prototype.MANY_SEP7 = function (options) {
      this.manySepFirstInternal(7, options);
    };

    RecognizerApi.prototype.MANY_SEP8 = function (options) {
      this.manySepFirstInternal(8, options);
    };

    RecognizerApi.prototype.MANY_SEP9 = function (options) {
      this.manySepFirstInternal(9, options);
    };

    RecognizerApi.prototype.AT_LEAST_ONE = function (actionORMethodDef) {
      this.atLeastOneInternal(0, actionORMethodDef);
    };

    RecognizerApi.prototype.AT_LEAST_ONE1 = function (actionORMethodDef) {
      return this.atLeastOneInternal(1, actionORMethodDef);
    };

    RecognizerApi.prototype.AT_LEAST_ONE2 = function (actionORMethodDef) {
      this.atLeastOneInternal(2, actionORMethodDef);
    };

    RecognizerApi.prototype.AT_LEAST_ONE3 = function (actionORMethodDef) {
      this.atLeastOneInternal(3, actionORMethodDef);
    };

    RecognizerApi.prototype.AT_LEAST_ONE4 = function (actionORMethodDef) {
      this.atLeastOneInternal(4, actionORMethodDef);
    };

    RecognizerApi.prototype.AT_LEAST_ONE5 = function (actionORMethodDef) {
      this.atLeastOneInternal(5, actionORMethodDef);
    };

    RecognizerApi.prototype.AT_LEAST_ONE6 = function (actionORMethodDef) {
      this.atLeastOneInternal(6, actionORMethodDef);
    };

    RecognizerApi.prototype.AT_LEAST_ONE7 = function (actionORMethodDef) {
      this.atLeastOneInternal(7, actionORMethodDef);
    };

    RecognizerApi.prototype.AT_LEAST_ONE8 = function (actionORMethodDef) {
      this.atLeastOneInternal(8, actionORMethodDef);
    };

    RecognizerApi.prototype.AT_LEAST_ONE9 = function (actionORMethodDef) {
      this.atLeastOneInternal(9, actionORMethodDef);
    };

    RecognizerApi.prototype.AT_LEAST_ONE_SEP = function (options) {
      this.atLeastOneSepFirstInternal(0, options);
    };

    RecognizerApi.prototype.AT_LEAST_ONE_SEP1 = function (options) {
      this.atLeastOneSepFirstInternal(1, options);
    };

    RecognizerApi.prototype.AT_LEAST_ONE_SEP2 = function (options) {
      this.atLeastOneSepFirstInternal(2, options);
    };

    RecognizerApi.prototype.AT_LEAST_ONE_SEP3 = function (options) {
      this.atLeastOneSepFirstInternal(3, options);
    };

    RecognizerApi.prototype.AT_LEAST_ONE_SEP4 = function (options) {
      this.atLeastOneSepFirstInternal(4, options);
    };

    RecognizerApi.prototype.AT_LEAST_ONE_SEP5 = function (options) {
      this.atLeastOneSepFirstInternal(5, options);
    };

    RecognizerApi.prototype.AT_LEAST_ONE_SEP6 = function (options) {
      this.atLeastOneSepFirstInternal(6, options);
    };

    RecognizerApi.prototype.AT_LEAST_ONE_SEP7 = function (options) {
      this.atLeastOneSepFirstInternal(7, options);
    };

    RecognizerApi.prototype.AT_LEAST_ONE_SEP8 = function (options) {
      this.atLeastOneSepFirstInternal(8, options);
    };

    RecognizerApi.prototype.AT_LEAST_ONE_SEP9 = function (options) {
      this.atLeastOneSepFirstInternal(9, options);
    };

    RecognizerApi.prototype.RULE = function (name, implementation, config) {
      if (config === void 0) {
        config = DEFAULT_RULE_CONFIG;
      }

      if (contains(this.definedRulesNames, name)) {
        var errMsg = defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({
          topLevelRule: name,
          grammarName: this.className
        });
        var error = {
          message: errMsg,
          type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
          ruleName: name
        };
        this.definitionErrors.push(error);
      }

      this.definedRulesNames.push(name);
      var ruleImplementation = this.defineRule(name, implementation, config);
      this[name] = ruleImplementation;
      return ruleImplementation;
    };

    RecognizerApi.prototype.OVERRIDE_RULE = function (name, impl, config) {
      if (config === void 0) {
        config = DEFAULT_RULE_CONFIG;
      }

      var ruleErrors = [];
      ruleErrors = ruleErrors.concat(validateRuleIsOverridden(name, this.definedRulesNames, this.className));
      this.definitionErrors.push.apply(this.definitionErrors, ruleErrors); // mutability for the win

      var ruleImplementation = this.defineRule(name, impl, config);
      this[name] = ruleImplementation;
      return ruleImplementation;
    };

    RecognizerApi.prototype.BACKTRACK = function (grammarRule, args) {
      return function () {
        // save org state
        this.isBackTrackingStack.push(1);
        var orgState = this.saveRecogState();

        try {
          grammarRule.apply(this, args); // if no exception was thrown we have succeed parsing the rule.

          return true;
        } catch (e) {
          if (isRecognitionException(e)) {
            return false;
          } else {
            throw e;
          }
        } finally {
          this.reloadRecogState(orgState);
          this.isBackTrackingStack.pop();
        }
      };
    }; // GAST export APIs


    RecognizerApi.prototype.getGAstProductions = function () {
      return this.gastProductionsCache;
    };

    RecognizerApi.prototype.getSerializedGastProductions = function () {
      return serializeGrammar(values(this.gastProductionsCache));
    };

    return RecognizerApi;
  }();

  /**
   * This trait is responsible for the runtime parsing engine
   * Used by the official API (recognizer_api.ts)
   */

  var RecognizerEngine =
  /** @class */
  function () {
    function RecognizerEngine() {}

    RecognizerEngine.prototype.initRecognizerEngine = function (tokenVocabulary, config) {
      this.className = classNameFromInstance(this); // TODO: would using an ES6 Map or plain object be faster (CST building scenario)

      this.shortRuleNameToFull = {};
      this.fullRuleNameToShort = {};
      this.ruleShortNameIdx = 256;
      this.tokenMatcher = tokenStructuredMatcherNoCategories;
      this.definedRulesNames = [];
      this.tokensMap = {};
      this.isBackTrackingStack = [];
      this.RULE_STACK = [];
      this.RULE_OCCURRENCE_STACK = [];
      this.gastProductionsCache = {};

      if (has(config, "serializedGrammar")) {
        throw Error("The Parser's configuration can no longer contain a <serializedGrammar> property.\n" + "\tSee: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_6-0-0\n" + "\tFor Further details.");
      }

      if (isArray(tokenVocabulary)) {
        // This only checks for Token vocabularies provided as arrays.
        // That is good enough because the main objective is to detect users of pre-V4.0 APIs
        // rather than all edge cases of empty Token vocabularies.
        if (isEmpty(tokenVocabulary)) {
          throw Error("A Token Vocabulary cannot be empty.\n" + "\tNote that the first argument for the parser constructor\n" + "\tis no longer a Token vector (since v4.0).");
        }

        if (typeof tokenVocabulary[0].startOffset === "number") {
          throw Error("The Parser constructor no longer accepts a token vector as the first argument.\n" + "\tSee: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_4-0-0\n" + "\tFor Further details.");
        }
      }

      if (isArray(tokenVocabulary)) {
        this.tokensMap = reduce(tokenVocabulary, function (acc, tokType) {
          acc[tokType.name] = tokType;
          return acc;
        }, {});
      } else if (has(tokenVocabulary, "modes") && every(flatten(values(tokenVocabulary.modes)), isTokenType)) {
        var allTokenTypes = flatten(values(tokenVocabulary.modes));
        var uniqueTokens = uniq(allTokenTypes);
        this.tokensMap = reduce(uniqueTokens, function (acc, tokType) {
          acc[tokType.name] = tokType;
          return acc;
        }, {});
      } else if (isObject(tokenVocabulary)) {
        this.tokensMap = cloneObj(tokenVocabulary);
      } else {
        throw new Error("<tokensDictionary> argument must be An Array of Token constructors," + " A dictionary of Token constructors or an IMultiModeLexerDefinition");
      } // always add EOF to the tokenNames -> constructors map. it is useful to assure all the input has been
      // parsed with a clear error message ("expecting EOF but found ...")

      /* tslint:disable */


      this.tokensMap["EOF"] = EOF; // TODO: This check may not be accurate for multi mode lexers

      var noTokenCategoriesUsed = every(values(tokenVocabulary), function (tokenConstructor) {
        return isEmpty(tokenConstructor.categoryMatches);
      });
      this.tokenMatcher = noTokenCategoriesUsed ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher; // Because ES2015+ syntax should be supported for creating Token classes
      // We cannot assume that the Token classes were created using the "extendToken" utilities
      // Therefore we must augment the Token classes both on Lexer initialization and on Parser initialization

      augmentTokenTypes(values(this.tokensMap));
    };

    RecognizerEngine.prototype.defineRule = function (ruleName, impl, config) {
      if (this.selfAnalysisDone) {
        throw Error("Grammar rule <" + ruleName + "> may not be defined after the 'performSelfAnalysis' method has been called'\n" + "Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");
      }

      var resyncEnabled = has(config, "resyncEnabled") ? config.resyncEnabled : DEFAULT_RULE_CONFIG.resyncEnabled;
      var recoveryValueFunc = has(config, "recoveryValueFunc") ? config.recoveryValueFunc : DEFAULT_RULE_CONFIG.recoveryValueFunc; // performance optimization: Use small integers as keys for the longer human readable "full" rule names.
      // this greatly improves Map access time (as much as 8% for some performance benchmarks).

      /* tslint:disable */

      var shortName = this.ruleShortNameIdx << BITS_FOR_METHOD_TYPE + BITS_FOR_OCCURRENCE_IDX;
      /* tslint:enable */

      this.ruleShortNameIdx++;
      this.shortRuleNameToFull[shortName] = ruleName;
      this.fullRuleNameToShort[ruleName] = shortName;

      function invokeRuleWithTry(args) {
        try {
          if (this.outputCst === true) {
            impl.apply(this, args);
            var cst = this.CST_STACK[this.CST_STACK.length - 1];
            this.cstPostRule(cst);
            return cst;
          } else {
            return impl.apply(this, args);
          }
        } catch (e) {
          return this.invokeRuleCatch(e, resyncEnabled, recoveryValueFunc);
        } finally {
          this.ruleFinallyStateUpdate();
        }
      }

      var wrappedGrammarRule;

      wrappedGrammarRule = function wrappedGrammarRule(idxInCallingRule, args) {
        if (idxInCallingRule === void 0) {
          idxInCallingRule = 0;
        }

        this.ruleInvocationStateUpdate(shortName, ruleName, idxInCallingRule);
        return invokeRuleWithTry.call(this, args);
      };

      var ruleNamePropName = "ruleName";
      wrappedGrammarRule[ruleNamePropName] = ruleName;
      wrappedGrammarRule["originalGrammarAction"] = impl;
      return wrappedGrammarRule;
    };

    RecognizerEngine.prototype.invokeRuleCatch = function (e, resyncEnabledConfig, recoveryValueFunc) {
      var isFirstInvokedRule = this.RULE_STACK.length === 1; // note the reSync is always enabled for the first rule invocation, because we must always be able to
      // reSync with EOF and just output some INVALID ParseTree
      // during backtracking reSync recovery is disabled, otherwise we can't be certain the backtracking
      // path is really the most valid one

      var reSyncEnabled = resyncEnabledConfig && !this.isBackTracking() && this.recoveryEnabled;

      if (isRecognitionException(e)) {
        var recogError = e;

        if (reSyncEnabled) {
          var reSyncTokType = this.findReSyncTokenType();

          if (this.isInCurrentRuleReSyncSet(reSyncTokType)) {
            recogError.resyncedTokens = this.reSyncTo(reSyncTokType);

            if (this.outputCst) {
              var partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
              partialCstResult.recoveredNode = true;
              return partialCstResult;
            } else {
              return recoveryValueFunc();
            }
          } else {
            if (this.outputCst) {
              var partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
              partialCstResult.recoveredNode = true;
              recogError.partialCstResult = partialCstResult;
            } // to be handled Further up the call stack


            throw recogError;
          }
        } else if (isFirstInvokedRule) {
          // otherwise a Redundant input error will be created as well and we cannot guarantee that this is indeed the case
          this.moveToTerminatedState(); // the parser should never throw one of its own errors outside its flow.
          // even if error recovery is disabled

          return recoveryValueFunc();
        } else {
          // to be recovered Further up the call stack
          throw recogError;
        }
      } else {
        // some other Error type which we don't know how to handle (for example a built in JavaScript Error)
        throw e;
      }
    }; // Implementation of parsing DSL


    RecognizerEngine.prototype.optionInternal = function (actionORMethodDef, occurrence) {
      var key = this.getKeyForAutomaticLookahead(OPTION_IDX, occurrence);
      return this.optionInternalLogic(actionORMethodDef, occurrence, key);
    };

    RecognizerEngine.prototype.optionInternalLogic = function (actionORMethodDef, occurrence, key) {
      var _this = this;

      var lookAheadFunc = this.getLaFuncFromCache(key);
      var action;
      var predicate;

      if (actionORMethodDef.DEF !== undefined) {
        action = actionORMethodDef.DEF;
        predicate = actionORMethodDef.GATE; // predicate present

        if (predicate !== undefined) {
          var orgLookaheadFunction_1 = lookAheadFunc;

          lookAheadFunc = function lookAheadFunc() {
            return predicate.call(_this) && orgLookaheadFunction_1.call(_this);
          };
        }
      } else {
        action = actionORMethodDef;
      }

      if (lookAheadFunc.call(this) === true) {
        return action.call(this);
      }

      return undefined;
    };

    RecognizerEngine.prototype.atLeastOneInternal = function (prodOccurrence, actionORMethodDef) {
      var laKey = this.getKeyForAutomaticLookahead(AT_LEAST_ONE_IDX, prodOccurrence);
      return this.atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, laKey);
    };

    RecognizerEngine.prototype.atLeastOneInternalLogic = function (prodOccurrence, actionORMethodDef, key) {
      var _this = this;

      var lookAheadFunc = this.getLaFuncFromCache(key);
      var action;
      var predicate;

      if (actionORMethodDef.DEF !== undefined) {
        action = actionORMethodDef.DEF;
        predicate = actionORMethodDef.GATE; // predicate present

        if (predicate !== undefined) {
          var orgLookaheadFunction_2 = lookAheadFunc;

          lookAheadFunc = function lookAheadFunc() {
            return predicate.call(_this) && orgLookaheadFunction_2.call(_this);
          };
        }
      } else {
        action = actionORMethodDef;
      }

      if (lookAheadFunc.call(this) === true) {
        var notStuck = this.doSingleRepetition(action);

        while (lookAheadFunc.call(this) === true && notStuck === true) {
          notStuck = this.doSingleRepetition(action);
        }
      } else {
        throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY, actionORMethodDef.ERR_MSG);
      } // note that while it may seem that this can cause an error because by using a recursive call to
      // AT_LEAST_ONE we change the grammar to AT_LEAST_TWO, AT_LEAST_THREE ... , the possible recursive call
      // from the tryInRepetitionRecovery(...) will only happen IFF there really are TWO/THREE/.... items.
      // Performance optimization: "attemptInRepetitionRecovery" will be defined as NOOP unless recovery is enabled


      this.attemptInRepetitionRecovery(this.atLeastOneInternal, [prodOccurrence, actionORMethodDef], lookAheadFunc, AT_LEAST_ONE_IDX, prodOccurrence, NextTerminalAfterAtLeastOneWalker);
    };

    RecognizerEngine.prototype.atLeastOneSepFirstInternal = function (prodOccurrence, options) {
      var laKey = this.getKeyForAutomaticLookahead(AT_LEAST_ONE_SEP_IDX, prodOccurrence);
      this.atLeastOneSepFirstInternalLogic(prodOccurrence, options, laKey);
    };

    RecognizerEngine.prototype.atLeastOneSepFirstInternalLogic = function (prodOccurrence, options, key) {
      var _this = this;

      var action = options.DEF;
      var separator = options.SEP;
      var firstIterationLookaheadFunc = this.getLaFuncFromCache(key); // 1st iteration

      if (firstIterationLookaheadFunc.call(this) === true) {
        action.call(this); //  TODO: Optimization can move this function construction into "attemptInRepetitionRecovery"
        //  because it is only needed in error recovery scenarios.

        var separatorLookAheadFunc = function separatorLookAheadFunc() {
          return _this.tokenMatcher(_this.LA(1), separator);
        }; // 2nd..nth iterations


        while (this.tokenMatcher(this.LA(1), separator) === true) {
          // note that this CONSUME will never enter recovery because
          // the separatorLookAheadFunc checks that the separator really does exist.
          this.CONSUME(separator);
          action.call(this);
        } // Performance optimization: "attemptInRepetitionRecovery" will be defined as NOOP unless recovery is enabled


        this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [prodOccurrence, separator, separatorLookAheadFunc, action, NextTerminalAfterAtLeastOneSepWalker], separatorLookAheadFunc, AT_LEAST_ONE_SEP_IDX, prodOccurrence, NextTerminalAfterAtLeastOneSepWalker);
      } else {
        throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, options.ERR_MSG);
      }
    };

    RecognizerEngine.prototype.manyInternal = function (prodOccurrence, actionORMethodDef) {
      var laKey = this.getKeyForAutomaticLookahead(MANY_IDX, prodOccurrence);
      return this.manyInternalLogic(prodOccurrence, actionORMethodDef, laKey);
    };

    RecognizerEngine.prototype.manyInternalLogic = function (prodOccurrence, actionORMethodDef, key) {
      var _this = this;

      var lookaheadFunction = this.getLaFuncFromCache(key);
      var action;
      var predicate;

      if (actionORMethodDef.DEF !== undefined) {
        action = actionORMethodDef.DEF;
        predicate = actionORMethodDef.GATE; // predicate present

        if (predicate !== undefined) {
          var orgLookaheadFunction_3 = lookaheadFunction;

          lookaheadFunction = function lookaheadFunction() {
            return predicate.call(_this) && orgLookaheadFunction_3.call(_this);
          };
        }
      } else {
        action = actionORMethodDef;
      }

      var notStuck = true;

      while (lookaheadFunction.call(this) === true && notStuck === true) {
        notStuck = this.doSingleRepetition(action);
      } // Performance optimization: "attemptInRepetitionRecovery" will be defined as NOOP unless recovery is enabled


      this.attemptInRepetitionRecovery(this.manyInternal, [prodOccurrence, actionORMethodDef], lookaheadFunction, MANY_IDX, prodOccurrence, NextTerminalAfterManyWalker, // The notStuck parameter is only relevant when "attemptInRepetitionRecovery"
      // is invoked from manyInternal, in the MANY_SEP case and AT_LEAST_ONE[_SEP]
      // An infinite loop cannot occur as:
      // - Either the lookahead is guaranteed to consume something (Single Token Separator)
      // - AT_LEAST_ONE by definition is guaranteed to consume something (or error out).
      notStuck);
    };

    RecognizerEngine.prototype.manySepFirstInternal = function (prodOccurrence, options) {
      var laKey = this.getKeyForAutomaticLookahead(MANY_SEP_IDX, prodOccurrence);
      this.manySepFirstInternalLogic(prodOccurrence, options, laKey);
    };

    RecognizerEngine.prototype.manySepFirstInternalLogic = function (prodOccurrence, options, key) {
      var _this = this;

      var action = options.DEF;
      var separator = options.SEP;
      var firstIterationLaFunc = this.getLaFuncFromCache(key); // 1st iteration

      if (firstIterationLaFunc.call(this) === true) {
        action.call(this);

        var separatorLookAheadFunc = function separatorLookAheadFunc() {
          return _this.tokenMatcher(_this.LA(1), separator);
        }; // 2nd..nth iterations


        while (this.tokenMatcher(this.LA(1), separator) === true) {
          // note that this CONSUME will never enter recovery because
          // the separatorLookAheadFunc checks that the separator really does exist.
          this.CONSUME(separator); // No need for checking infinite loop here due to consuming the separator.

          action.call(this);
        } // Performance optimization: "attemptInRepetitionRecovery" will be defined as NOOP unless recovery is enabled


        this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [prodOccurrence, separator, separatorLookAheadFunc, action, NextTerminalAfterManySepWalker], separatorLookAheadFunc, MANY_SEP_IDX, prodOccurrence, NextTerminalAfterManySepWalker);
      }
    };

    RecognizerEngine.prototype.repetitionSepSecondInternal = function (prodOccurrence, separator, separatorLookAheadFunc, action, nextTerminalAfterWalker) {
      while (separatorLookAheadFunc()) {
        // note that this CONSUME will never enter recovery because
        // the separatorLookAheadFunc checks that the separator really does exist.
        this.CONSUME(separator);
        action.call(this);
      } // we can only arrive to this function after an error
      // has occurred (hence the name 'second') so the following
      // IF will always be entered, its possible to remove it...
      // however it is kept to avoid confusion and be consistent.
      // Performance optimization: "attemptInRepetitionRecovery" will be defined as NOOP unless recovery is enabled

      /* istanbul ignore else */


      this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [prodOccurrence, separator, separatorLookAheadFunc, action, nextTerminalAfterWalker], separatorLookAheadFunc, AT_LEAST_ONE_SEP_IDX, prodOccurrence, nextTerminalAfterWalker);
    };

    RecognizerEngine.prototype.doSingleRepetition = function (action) {
      var beforeIteration = this.getLexerPosition();
      action.call(this);
      var afterIteration = this.getLexerPosition(); // This boolean will indicate if this repetition progressed
      // or if we are "stuck" (potential infinite loop in the repetition).

      return afterIteration > beforeIteration;
    };

    RecognizerEngine.prototype.orInternal = function (altsOrOpts, occurrence) {
      var laKey = this.getKeyForAutomaticLookahead(OR_IDX, occurrence);
      var alts = isArray(altsOrOpts) ? altsOrOpts : altsOrOpts.DEF;
      var laFunc = this.getLaFuncFromCache(laKey);
      var altIdxToTake = laFunc.call(this, alts);

      if (altIdxToTake !== undefined) {
        var chosenAlternative = alts[altIdxToTake];
        return chosenAlternative.ALT.call(this);
      }

      this.raiseNoAltException(occurrence, altsOrOpts.ERR_MSG);
    };

    RecognizerEngine.prototype.ruleFinallyStateUpdate = function () {
      this.RULE_STACK.pop();
      this.RULE_OCCURRENCE_STACK.pop(); // NOOP when cst is disabled

      this.cstFinallyStateUpdate();

      if (this.RULE_STACK.length === 0 && this.isAtEndOfInput() === false) {
        var firstRedundantTok = this.LA(1);
        var errMsg = this.errorMessageProvider.buildNotAllInputParsedMessage({
          firstRedundant: firstRedundantTok,
          ruleName: this.getCurrRuleFullName()
        });
        this.SAVE_ERROR(new NotAllInputParsedException(errMsg, firstRedundantTok));
      }
    };

    RecognizerEngine.prototype.subruleInternal = function (ruleToCall, idx, options) {
      var ruleResult;

      try {
        var args = options !== undefined ? options.ARGS : undefined;
        ruleResult = ruleToCall.call(this, idx, args);
        this.cstPostNonTerminal(ruleResult, options !== undefined && options.LABEL !== undefined ? options.LABEL : ruleToCall.ruleName);
        return ruleResult;
      } catch (e) {
        this.subruleInternalError(e, options, ruleToCall.ruleName);
      }
    };

    RecognizerEngine.prototype.subruleInternalError = function (e, options, ruleName) {
      if (isRecognitionException(e) && e.partialCstResult !== undefined) {
        this.cstPostNonTerminal(e.partialCstResult, options !== undefined && options.LABEL !== undefined ? options.LABEL : ruleName);
        delete e.partialCstResult;
      }

      throw e;
    };

    RecognizerEngine.prototype.consumeInternal = function (tokType, idx, options) {
      var consumedToken;

      try {
        var nextToken = this.LA(1);

        if (this.tokenMatcher(nextToken, tokType) === true) {
          this.consumeToken();
          consumedToken = nextToken;
        } else {
          this.consumeInternalError(tokType, nextToken, options);
        }
      } catch (eFromConsumption) {
        consumedToken = this.consumeInternalRecovery(tokType, idx, eFromConsumption);
      }

      this.cstPostTerminal(options !== undefined && options.LABEL !== undefined ? options.LABEL : tokType.name, consumedToken);
      return consumedToken;
    };

    RecognizerEngine.prototype.consumeInternalError = function (tokType, nextToken, options) {
      var msg;
      var previousToken = this.LA(0);

      if (options !== undefined && options.ERR_MSG) {
        msg = options.ERR_MSG;
      } else {
        msg = this.errorMessageProvider.buildMismatchTokenMessage({
          expected: tokType,
          actual: nextToken,
          previous: previousToken,
          ruleName: this.getCurrRuleFullName()
        });
      }

      throw this.SAVE_ERROR(new MismatchedTokenException(msg, nextToken, previousToken));
    };

    RecognizerEngine.prototype.consumeInternalRecovery = function (tokType, idx, eFromConsumption) {
      // no recovery allowed during backtracking, otherwise backtracking may recover invalid syntax and accept it
      // but the original syntax could have been parsed successfully without any backtracking + recovery
      if (this.recoveryEnabled && // TODO: more robust checking of the exception type. Perhaps Typescript extending expressions?
      eFromConsumption.name === "MismatchedTokenException" && !this.isBackTracking()) {
        var follows = this.getFollowsForInRuleRecovery(tokType, idx);

        try {
          return this.tryInRuleRecovery(tokType, follows);
        } catch (eFromInRuleRecovery) {
          if (eFromInRuleRecovery.name === IN_RULE_RECOVERY_EXCEPTION) {
            // failed in RuleRecovery.
            // throw the original error in order to trigger reSync error recovery
            throw eFromConsumption;
          } else {
            throw eFromInRuleRecovery;
          }
        }
      } else {
        throw eFromConsumption;
      }
    };

    RecognizerEngine.prototype.saveRecogState = function () {
      // errors is a getter which will clone the errors array
      var savedErrors = this.errors;
      var savedRuleStack = cloneArr(this.RULE_STACK);
      return {
        errors: savedErrors,
        lexerState: this.exportLexerState(),
        RULE_STACK: savedRuleStack,
        CST_STACK: this.CST_STACK
      };
    };

    RecognizerEngine.prototype.reloadRecogState = function (newState) {
      this.errors = newState.errors;
      this.importLexerState(newState.lexerState);
      this.RULE_STACK = newState.RULE_STACK;
    };

    RecognizerEngine.prototype.ruleInvocationStateUpdate = function (shortName, fullName, idxInCallingRule) {
      this.RULE_OCCURRENCE_STACK.push(idxInCallingRule);
      this.RULE_STACK.push(shortName); // NOOP when cst is disabled

      this.cstInvocationStateUpdate(fullName, shortName);
    };

    RecognizerEngine.prototype.isBackTracking = function () {
      return this.isBackTrackingStack.length !== 0;
    };

    RecognizerEngine.prototype.getCurrRuleFullName = function () {
      var shortName = this.getLastExplicitRuleShortName();
      return this.shortRuleNameToFull[shortName];
    };

    RecognizerEngine.prototype.shortRuleNameToFullName = function (shortName) {
      return this.shortRuleNameToFull[shortName];
    };

    RecognizerEngine.prototype.isAtEndOfInput = function () {
      return this.tokenMatcher(this.LA(1), EOF);
    };

    RecognizerEngine.prototype.reset = function () {
      this.resetLexerState();
      this.isBackTrackingStack = [];
      this.errors = [];
      this.RULE_STACK = []; // TODO: extract a specific reset for TreeBuilder trait

      this.CST_STACK = [];
      this.RULE_OCCURRENCE_STACK = [];
    };

    return RecognizerEngine;
  }();

  /**
   * Trait responsible for runtime parsing errors.
   */

  var ErrorHandler =
  /** @class */
  function () {
    function ErrorHandler() {}

    ErrorHandler.prototype.initErrorHandler = function (config) {
      this._errors = [];
      this.errorMessageProvider = has(config, "errorMessageProvider") ? config.errorMessageProvider : DEFAULT_PARSER_CONFIG.errorMessageProvider;
    };

    ErrorHandler.prototype.SAVE_ERROR = function (error) {
      if (isRecognitionException(error)) {
        error.context = {
          ruleStack: this.getHumanReadableRuleStack(),
          ruleOccurrenceStack: cloneArr(this.RULE_OCCURRENCE_STACK)
        };

        this._errors.push(error);

        return error;
      } else {
        throw Error("Trying to save an Error which is not a RecognitionException");
      }
    };

    Object.defineProperty(ErrorHandler.prototype, "errors", {
      get: function get() {
        return cloneArr(this._errors);
      },
      set: function set(newErrors) {
        this._errors = newErrors;
      },
      enumerable: false,
      configurable: true
    }); // TODO: consider caching the error message computed information

    ErrorHandler.prototype.raiseEarlyExitException = function (occurrence, prodType, userDefinedErrMsg) {
      var ruleName = this.getCurrRuleFullName();
      var ruleGrammar = this.getGAstProductions()[ruleName];
      var lookAheadPathsPerAlternative = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, this.maxLookahead);
      var insideProdPaths = lookAheadPathsPerAlternative[0];
      var actualTokens = [];

      for (var i = 1; i <= this.maxLookahead; i++) {
        actualTokens.push(this.LA(i));
      }

      var msg = this.errorMessageProvider.buildEarlyExitMessage({
        expectedIterationPaths: insideProdPaths,
        actual: actualTokens,
        previous: this.LA(0),
        customUserDescription: userDefinedErrMsg,
        ruleName: ruleName
      });
      throw this.SAVE_ERROR(new EarlyExitException(msg, this.LA(1), this.LA(0)));
    }; // TODO: consider caching the error message computed information


    ErrorHandler.prototype.raiseNoAltException = function (occurrence, errMsgTypes) {
      var ruleName = this.getCurrRuleFullName();
      var ruleGrammar = this.getGAstProductions()[ruleName]; // TODO: getLookaheadPathsForOr can be slow for large enough maxLookahead and certain grammars, consider caching ?

      var lookAheadPathsPerAlternative = getLookaheadPathsForOr(occurrence, ruleGrammar, this.maxLookahead);
      var actualTokens = [];

      for (var i = 1; i <= this.maxLookahead; i++) {
        actualTokens.push(this.LA(i));
      }

      var previousToken = this.LA(0);
      var errMsg = this.errorMessageProvider.buildNoViableAltMessage({
        expectedPathsPerAlt: lookAheadPathsPerAlternative,
        actual: actualTokens,
        previous: previousToken,
        customUserDescription: errMsgTypes,
        ruleName: this.getCurrRuleFullName()
      });
      throw this.SAVE_ERROR(new NoViableAltException(errMsg, this.LA(1), previousToken));
    };

    return ErrorHandler;
  }();

  var ContentAssist =
  /** @class */
  function () {
    function ContentAssist() {}

    ContentAssist.prototype.initContentAssist = function () {};

    ContentAssist.prototype.computeContentAssist = function (startRuleName, precedingInput) {
      var startRuleGast = this.gastProductionsCache[startRuleName];

      if (isUndefined(startRuleGast)) {
        throw Error("Rule ->" + startRuleName + "<- does not exist in this grammar.");
      }

      return nextPossibleTokensAfter([startRuleGast], precedingInput, this.tokenMatcher, this.maxLookahead);
    }; // TODO: should this be a member method or a utility? it does not have any state or usage of 'this'...
    // TODO: should this be more explicitly part of the public API?


    ContentAssist.prototype.getNextPossibleTokenTypes = function (grammarPath) {
      var topRuleName = first(grammarPath.ruleStack);
      var gastProductions = this.getGAstProductions();
      var topProduction = gastProductions[topRuleName];
      var nextPossibleTokenTypes = new NextAfterTokenWalker(topProduction, grammarPath).startWalking();
      return nextPossibleTokenTypes;
    };

    return ContentAssist;
  }();

  var RECORDING_NULL_OBJECT = {
    description: "This Object indicates the Parser is during Recording Phase"
  };
  Object.freeze(RECORDING_NULL_OBJECT);
  var HANDLE_SEPARATOR = true;
  var MAX_METHOD_IDX = Math.pow(2, BITS_FOR_OCCURRENCE_IDX) - 1;
  var RFT = createToken({
    name: "RECORDING_PHASE_TOKEN",
    pattern: Lexer.NA
  });
  augmentTokenTypes([RFT]);
  var RECORDING_PHASE_TOKEN = createTokenInstance(RFT, "This IToken indicates the Parser is in Recording Phase\n\t" + "" + "See: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details", // Using "-1" instead of NaN (as in EOF) because an actual number is less likely to
  // cause errors if the output of LA or CONSUME would be (incorrectly) used during the recording phase.
  -1, -1, -1, -1, -1, -1);
  Object.freeze(RECORDING_PHASE_TOKEN);
  var RECORDING_PHASE_CSTNODE = {
    name: "This CSTNode indicates the Parser is in Recording Phase\n\t" + "See: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details",
    children: {}
  };
  /**
   * This trait handles the creation of the GAST structure for Chevrotain Grammars
   */

  var GastRecorder =
  /** @class */
  function () {
    function GastRecorder() {}

    GastRecorder.prototype.initGastRecorder = function (config) {
      this.recordingProdStack = [];
      this.RECORDING_PHASE = false;
    };

    GastRecorder.prototype.enableRecording = function () {
      var _this = this;

      this.RECORDING_PHASE = true;
      this.TRACE_INIT("Enable Recording", function () {
        var _loop_1 = function _loop_1(i) {
          var idx = i > 0 ? i : "";

          _this["CONSUME" + idx] = function (arg1, arg2) {
            return this.consumeInternalRecord(arg1, i, arg2);
          };

          _this["SUBRULE" + idx] = function (arg1, arg2) {
            return this.subruleInternalRecord(arg1, i, arg2);
          };

          _this["OPTION" + idx] = function (arg1) {
            return this.optionInternalRecord(arg1, i);
          };

          _this["OR" + idx] = function (arg1) {
            return this.orInternalRecord(arg1, i);
          };

          _this["MANY" + idx] = function (arg1) {
            this.manyInternalRecord(i, arg1);
          };

          _this["MANY_SEP" + idx] = function (arg1) {
            this.manySepFirstInternalRecord(i, arg1);
          };

          _this["AT_LEAST_ONE" + idx] = function (arg1) {
            this.atLeastOneInternalRecord(i, arg1);
          };

          _this["AT_LEAST_ONE_SEP" + idx] = function (arg1) {
            this.atLeastOneSepFirstInternalRecord(i, arg1);
          };
        };
        /**
         * Warning Dark Voodoo Magic upcoming!
         * We are "replacing" the public parsing DSL methods API
         * With **new** alternative implementations on the Parser **instance**
         *
         * So far this is the only way I've found to avoid performance regressions during parsing time.
         * - Approx 30% performance regression was measured on Chrome 75 Canary when attempting to replace the "internal"
         *   implementations directly instead.
         */


        for (var i = 0; i < 10; i++) {
          _loop_1(i);
        } // DSL methods with the idx(suffix) as an argument


        _this["consume"] = function (idx, arg1, arg2) {
          return this.consumeInternalRecord(arg1, idx, arg2);
        };

        _this["subrule"] = function (idx, arg1, arg2) {
          return this.subruleInternalRecord(arg1, idx, arg2);
        };

        _this["option"] = function (idx, arg1) {
          return this.optionInternalRecord(arg1, idx);
        };

        _this["or"] = function (idx, arg1) {
          return this.orInternalRecord(arg1, idx);
        };

        _this["many"] = function (idx, arg1) {
          this.manyInternalRecord(idx, arg1);
        };

        _this["atLeastOne"] = function (idx, arg1) {
          this.atLeastOneInternalRecord(idx, arg1);
        };

        _this.ACTION = _this.ACTION_RECORD;
        _this.BACKTRACK = _this.BACKTRACK_RECORD;
        _this.LA = _this.LA_RECORD;
      });
    };

    GastRecorder.prototype.disableRecording = function () {
      var _this = this;

      this.RECORDING_PHASE = false; // By deleting these **instance** properties, any future invocation
      // will be deferred to the original methods on the **prototype** object
      // This seems to get rid of any incorrect optimizations that V8 may
      // do during the recording phase.

      this.TRACE_INIT("Deleting Recording methods", function () {
        for (var i = 0; i < 10; i++) {
          var idx = i > 0 ? i : "";
          delete _this["CONSUME" + idx];
          delete _this["SUBRULE" + idx];
          delete _this["OPTION" + idx];
          delete _this["OR" + idx];
          delete _this["MANY" + idx];
          delete _this["MANY_SEP" + idx];
          delete _this["AT_LEAST_ONE" + idx];
          delete _this["AT_LEAST_ONE_SEP" + idx];
        }

        delete _this["consume"];
        delete _this["subrule"];
        delete _this["option"];
        delete _this["or"];
        delete _this["many"];
        delete _this["atLeastOne"];
        delete _this.ACTION;
        delete _this.BACKTRACK;
        delete _this.LA;
      });
    }; // TODO: is there any way to use this method to check no
    //   Parser methods are called inside an ACTION?
    //   Maybe try/catch/finally on ACTIONS while disabling the recorders state changes?


    GastRecorder.prototype.ACTION_RECORD = function (impl) {
      // NO-OP during recording
      return;
    }; // Executing backtracking logic will break our recording logic assumptions


    GastRecorder.prototype.BACKTRACK_RECORD = function (grammarRule, args) {
      return function () {
        return true;
      };
    }; // LA is part of the official API and may be used for custom lookahead logic
    // by end users who may forget to wrap it in ACTION or inside a GATE


    GastRecorder.prototype.LA_RECORD = function (howMuch) {
      // We cannot use the RECORD_PHASE_TOKEN here because someone may depend
      // On LA return EOF at the end of the input so an infinite loop may occur.
      return END_OF_FILE;
    };

    GastRecorder.prototype.topLevelRuleRecord = function (name, def) {
      try {
        var newTopLevelRule = new Rule({
          definition: [],
          name: name
        });
        newTopLevelRule.name = name;
        this.recordingProdStack.push(newTopLevelRule);
        def.call(this);
        this.recordingProdStack.pop();
        return newTopLevelRule;
      } catch (originalError) {
        if (originalError.KNOWN_RECORDER_ERROR !== true) {
          try {
            originalError.message = originalError.message + '\n\t This error was thrown during the "grammar recording phase" For more info see:\n\t' + "https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording";
          } catch (mutabilityError) {
            // We may not be able to modify the original error object
            throw originalError;
          }
        }

        throw originalError;
      }
    }; // Implementation of parsing DSL


    GastRecorder.prototype.optionInternalRecord = function (actionORMethodDef, occurrence) {
      return recordProd.call(this, Option, actionORMethodDef, occurrence);
    };

    GastRecorder.prototype.atLeastOneInternalRecord = function (occurrence, actionORMethodDef) {
      recordProd.call(this, RepetitionMandatory, actionORMethodDef, occurrence);
    };

    GastRecorder.prototype.atLeastOneSepFirstInternalRecord = function (occurrence, options) {
      recordProd.call(this, RepetitionMandatoryWithSeparator, options, occurrence, HANDLE_SEPARATOR);
    };

    GastRecorder.prototype.manyInternalRecord = function (occurrence, actionORMethodDef) {
      recordProd.call(this, Repetition, actionORMethodDef, occurrence);
    };

    GastRecorder.prototype.manySepFirstInternalRecord = function (occurrence, options) {
      recordProd.call(this, RepetitionWithSeparator, options, occurrence, HANDLE_SEPARATOR);
    };

    GastRecorder.prototype.orInternalRecord = function (altsOrOpts, occurrence) {
      return recordOrProd.call(this, altsOrOpts, occurrence);
    };

    GastRecorder.prototype.subruleInternalRecord = function (ruleToCall, occurrence, options) {
      assertMethodIdxIsValid(occurrence);

      if (!ruleToCall || has(ruleToCall, "ruleName") === false) {
        var error = new Error("<SUBRULE" + getIdxSuffix(occurrence) + "> argument is invalid" + (" expecting a Parser method reference but got: <" + JSON.stringify(ruleToCall) + ">") + ("\n inside top level rule: <" + this.recordingProdStack[0].name + ">"));
        error.KNOWN_RECORDER_ERROR = true;
        throw error;
      }

      var prevProd = peek(this.recordingProdStack);
      var ruleName = ruleToCall["ruleName"];
      var newNoneTerminal = new NonTerminal({
        idx: occurrence,
        nonTerminalName: ruleName,
        // The resolving of the `referencedRule` property will be done once all the Rule's GASTs have been created
        referencedRule: undefined
      });
      prevProd.definition.push(newNoneTerminal);
      return this.outputCst ? RECORDING_PHASE_CSTNODE : RECORDING_NULL_OBJECT;
    };

    GastRecorder.prototype.consumeInternalRecord = function (tokType, occurrence, options) {
      assertMethodIdxIsValid(occurrence);

      if (!hasShortKeyProperty(tokType)) {
        var error = new Error("<CONSUME" + getIdxSuffix(occurrence) + "> argument is invalid" + (" expecting a TokenType reference but got: <" + JSON.stringify(tokType) + ">") + ("\n inside top level rule: <" + this.recordingProdStack[0].name + ">"));
        error.KNOWN_RECORDER_ERROR = true;
        throw error;
      }

      var prevProd = peek(this.recordingProdStack);
      var newNoneTerminal = new Terminal({
        idx: occurrence,
        terminalType: tokType
      });
      prevProd.definition.push(newNoneTerminal);
      return RECORDING_PHASE_TOKEN;
    };

    return GastRecorder;
  }();

  function recordProd(prodConstructor, mainProdArg, occurrence, handleSep) {
    if (handleSep === void 0) {
      handleSep = false;
    }

    assertMethodIdxIsValid(occurrence);
    var prevProd = peek(this.recordingProdStack);
    var grammarAction = isFunction(mainProdArg) ? mainProdArg : mainProdArg.DEF;
    var newProd = new prodConstructor({
      definition: [],
      idx: occurrence
    });

    if (handleSep) {
      newProd.separator = mainProdArg.SEP;
    }

    if (has(mainProdArg, "MAX_LOOKAHEAD")) {
      newProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
    }

    this.recordingProdStack.push(newProd);
    grammarAction.call(this);
    prevProd.definition.push(newProd);
    this.recordingProdStack.pop();
    return RECORDING_NULL_OBJECT;
  }

  function recordOrProd(mainProdArg, occurrence) {
    var _this = this;

    assertMethodIdxIsValid(occurrence);
    var prevProd = peek(this.recordingProdStack); // Only an array of alternatives

    var hasOptions = isArray(mainProdArg) === false;
    var alts = hasOptions === false ? mainProdArg : mainProdArg.DEF;
    var newOrProd = new Alternation({
      definition: [],
      idx: occurrence,
      ignoreAmbiguities: hasOptions && mainProdArg.IGNORE_AMBIGUITIES === true
    });

    if (has(mainProdArg, "MAX_LOOKAHEAD")) {
      newOrProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
    }

    var hasPredicates = some(alts, function (currAlt) {
      return isFunction(currAlt.GATE);
    });
    newOrProd.hasPredicates = hasPredicates;
    prevProd.definition.push(newOrProd);
    forEach(alts, function (currAlt) {
      var currAltFlat = new Alternative({
        definition: []
      });
      newOrProd.definition.push(currAltFlat);

      if (has(currAlt, "IGNORE_AMBIGUITIES")) {
        currAltFlat.ignoreAmbiguities = currAlt.IGNORE_AMBIGUITIES;
      } // **implicit** ignoreAmbiguities due to usage of gate
      else if (has(currAlt, "GATE")) {
          currAltFlat.ignoreAmbiguities = true;
        }

      _this.recordingProdStack.push(currAltFlat);

      currAlt.ALT.call(_this);

      _this.recordingProdStack.pop();
    });
    return RECORDING_NULL_OBJECT;
  }

  function getIdxSuffix(idx) {
    return idx === 0 ? "" : "" + idx;
  }

  function assertMethodIdxIsValid(idx) {
    if (idx < 0 || idx > MAX_METHOD_IDX) {
      var error = new Error( // The stack trace will contain all the needed details
      "Invalid DSL Method idx value: <" + idx + ">\n\t" + ("Idx value must be a none negative value smaller than " + (MAX_METHOD_IDX + 1)));
      error.KNOWN_RECORDER_ERROR = true;
      throw error;
    }
  }

  /**
   * Trait responsible for runtime parsing errors.
   */

  var PerformanceTracer =
  /** @class */
  function () {
    function PerformanceTracer() {}

    PerformanceTracer.prototype.initPerformanceTracer = function (config) {
      if (has(config, "traceInitPerf")) {
        var userTraceInitPerf = config.traceInitPerf;
        var traceIsNumber = typeof userTraceInitPerf === "number";
        this.traceInitMaxIdent = traceIsNumber ? userTraceInitPerf : Infinity;
        this.traceInitPerf = traceIsNumber ? userTraceInitPerf > 0 : userTraceInitPerf;
      } else {
        this.traceInitMaxIdent = 0;
        this.traceInitPerf = DEFAULT_PARSER_CONFIG.traceInitPerf;
      }

      this.traceInitIndent = -1;
    };

    PerformanceTracer.prototype.TRACE_INIT = function (phaseDesc, phaseImpl) {
      // No need to optimize this using NOOP pattern because
      // It is not called in a hot spot...
      if (this.traceInitPerf === true) {
        this.traceInitIndent++;
        var indent = new Array(this.traceInitIndent + 1).join("\t");

        if (this.traceInitIndent < this.traceInitMaxIdent) {
          console.log(indent + "--> <" + phaseDesc + ">");
        }

        var _a = timer(phaseImpl),
            time = _a.time,
            value = _a.value;
        /* istanbul ignore next - Difficult to reproduce specific performance behavior (>10ms) in tests */


        var traceMethod = time > 10 ? console.warn : console.log;

        if (this.traceInitIndent < this.traceInitMaxIdent) {
          traceMethod(indent + "<-- <" + phaseDesc + "> time: " + time + "ms");
        }

        this.traceInitIndent--;
        return value;
      } else {
        return phaseImpl();
      }
    };

    return PerformanceTracer;
  }();

  var __extends$9 = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    return function (d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var END_OF_FILE = createTokenInstance(EOF, "", NaN, NaN, NaN, NaN, NaN, NaN);
  Object.freeze(END_OF_FILE);
  var DEFAULT_PARSER_CONFIG = Object.freeze({
    recoveryEnabled: false,
    maxLookahead: 3,
    dynamicTokensEnabled: false,
    outputCst: true,
    errorMessageProvider: defaultParserErrorProvider,
    nodeLocationTracking: "none",
    traceInitPerf: false,
    skipValidations: false
  });
  var DEFAULT_RULE_CONFIG = Object.freeze({
    recoveryValueFunc: function recoveryValueFunc() {
      return undefined;
    },
    resyncEnabled: true
  });
  var ParserDefinitionErrorType;

  (function (ParserDefinitionErrorType) {
    ParserDefinitionErrorType[ParserDefinitionErrorType["INVALID_RULE_NAME"] = 0] = "INVALID_RULE_NAME";
    ParserDefinitionErrorType[ParserDefinitionErrorType["DUPLICATE_RULE_NAME"] = 1] = "DUPLICATE_RULE_NAME";
    ParserDefinitionErrorType[ParserDefinitionErrorType["INVALID_RULE_OVERRIDE"] = 2] = "INVALID_RULE_OVERRIDE";
    ParserDefinitionErrorType[ParserDefinitionErrorType["DUPLICATE_PRODUCTIONS"] = 3] = "DUPLICATE_PRODUCTIONS";
    ParserDefinitionErrorType[ParserDefinitionErrorType["UNRESOLVED_SUBRULE_REF"] = 4] = "UNRESOLVED_SUBRULE_REF";
    ParserDefinitionErrorType[ParserDefinitionErrorType["LEFT_RECURSION"] = 5] = "LEFT_RECURSION";
    ParserDefinitionErrorType[ParserDefinitionErrorType["NONE_LAST_EMPTY_ALT"] = 6] = "NONE_LAST_EMPTY_ALT";
    ParserDefinitionErrorType[ParserDefinitionErrorType["AMBIGUOUS_ALTS"] = 7] = "AMBIGUOUS_ALTS";
    ParserDefinitionErrorType[ParserDefinitionErrorType["CONFLICT_TOKENS_RULES_NAMESPACE"] = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE";
    ParserDefinitionErrorType[ParserDefinitionErrorType["INVALID_TOKEN_NAME"] = 9] = "INVALID_TOKEN_NAME";
    ParserDefinitionErrorType[ParserDefinitionErrorType["NO_NON_EMPTY_LOOKAHEAD"] = 10] = "NO_NON_EMPTY_LOOKAHEAD";
    ParserDefinitionErrorType[ParserDefinitionErrorType["AMBIGUOUS_PREFIX_ALTS"] = 11] = "AMBIGUOUS_PREFIX_ALTS";
    ParserDefinitionErrorType[ParserDefinitionErrorType["TOO_MANY_ALTS"] = 12] = "TOO_MANY_ALTS";
  })(ParserDefinitionErrorType || (ParserDefinitionErrorType = {}));

  function EMPTY_ALT(value) {
    if (value === void 0) {
      value = undefined;
    }

    return function () {
      return value;
    };
  }

  var Parser =
  /** @class */
  function () {
    function Parser(tokenVocabulary, config) {
      this.definitionErrors = [];
      this.selfAnalysisDone = false;
      var that = this;
      that.initErrorHandler(config);
      that.initLexerAdapter();
      that.initLooksAhead(config);
      that.initRecognizerEngine(tokenVocabulary, config);
      that.initRecoverable(config);
      that.initTreeBuilder(config);
      that.initContentAssist();
      that.initGastRecorder(config);
      that.initPerformanceTracer(config);

      if (has(config, "ignoredIssues")) {
        throw new Error("The <ignoredIssues> IParserConfig property has been deprecated.\n\t" + "Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.\n\t" + "See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES\n\t" + "For further details.");
      }

      this.skipValidations = has(config, "skipValidations") ? config.skipValidations : DEFAULT_PARSER_CONFIG.skipValidations;
    }
    /**
     *  @deprecated use the **instance** method with the same name instead
     */


    Parser.performSelfAnalysis = function (parserInstance) {
      throw Error("The **static** `performSelfAnalysis` method has been deprecated." + "\t\nUse the **instance** method with the same name instead.");
    };

    Parser.prototype.performSelfAnalysis = function () {
      var _this = this;

      this.TRACE_INIT("performSelfAnalysis", function () {
        var defErrorsMsgs;
        _this.selfAnalysisDone = true;
        var className = _this.className;

        _this.TRACE_INIT("toFastProps", function () {
          // Without this voodoo magic the parser would be x3-x4 slower
          // It seems it is better to invoke `toFastProperties` **before**
          // Any manipulations of the `this` object done during the recording phase.
          toFastProperties(_this);
        });

        _this.TRACE_INIT("Grammar Recording", function () {
          try {
            _this.enableRecording(); // Building the GAST


            forEach(_this.definedRulesNames, function (currRuleName) {
              var wrappedRule = _this[currRuleName];
              var originalGrammarAction = wrappedRule["originalGrammarAction"];
              var recordedRuleGast = undefined;

              _this.TRACE_INIT(currRuleName + " Rule", function () {
                recordedRuleGast = _this.topLevelRuleRecord(currRuleName, originalGrammarAction);
              });

              _this.gastProductionsCache[currRuleName] = recordedRuleGast;
            });
          } finally {
            _this.disableRecording();
          }
        });

        var resolverErrors = [];

        _this.TRACE_INIT("Grammar Resolving", function () {
          resolverErrors = resolveGrammar$1({
            rules: values(_this.gastProductionsCache)
          });

          _this.definitionErrors.push.apply(_this.definitionErrors, resolverErrors); // mutability for the win?

        });

        _this.TRACE_INIT("Grammar Validations", function () {
          // only perform additional grammar validations IFF no resolving errors have occurred.
          // as unresolved grammar may lead to unhandled runtime exceptions in the follow up validations.
          if (isEmpty(resolverErrors) && _this.skipValidations === false) {
            var validationErrors = validateGrammar$1({
              rules: values(_this.gastProductionsCache),
              maxLookahead: _this.maxLookahead,
              tokenTypes: values(_this.tokensMap),
              errMsgProvider: defaultGrammarValidatorErrorProvider,
              grammarName: className
            });

            _this.definitionErrors.push.apply(_this.definitionErrors, validationErrors); // mutability for the win?

          }
        }); // this analysis may fail if the grammar is not perfectly valid


        if (isEmpty(_this.definitionErrors)) {
          // The results of these computations are not needed unless error recovery is enabled.
          if (_this.recoveryEnabled) {
            _this.TRACE_INIT("computeAllProdsFollows", function () {
              var allFollows = computeAllProdsFollows(values(_this.gastProductionsCache));
              _this.resyncFollows = allFollows;
            });
          }

          _this.TRACE_INIT("ComputeLookaheadFunctions", function () {
            _this.preComputeLookaheadFunctions(values(_this.gastProductionsCache));
          });
        }

        if (!Parser.DEFER_DEFINITION_ERRORS_HANDLING && !isEmpty(_this.definitionErrors)) {
          defErrorsMsgs = map(_this.definitionErrors, function (defError) {
            return defError.message;
          });
          throw new Error("Parser Definition Errors detected:\n " + defErrorsMsgs.join("\n-------------------------------\n"));
        }
      });
    }; // Set this flag to true if you don't want the Parser to throw error when problems in it's definition are detected.
    // (normally during the parser's constructor).
    // This is a design time flag, it will not affect the runtime error handling of the parser, just design time errors,
    // for example: duplicate rule names, referencing an unresolved subrule, ect...
    // This flag should not be enabled during normal usage, it is used in special situations, for example when
    // needing to display the parser definition errors in some GUI(online playground).


    Parser.DEFER_DEFINITION_ERRORS_HANDLING = false;
    return Parser;
  }();
  applyMixins(Parser, [Recoverable, LooksAhead, TreeBuilder, LexerAdapter, RecognizerEngine, RecognizerApi, ErrorHandler, ContentAssist, GastRecorder, PerformanceTracer]);

  var CstParser =
  /** @class */
  function (_super) {
    __extends$9(CstParser, _super);

    function CstParser(tokenVocabulary, config) {
      if (config === void 0) {
        config = DEFAULT_PARSER_CONFIG;
      }

      var _this = this;

      var configClone = cloneObj(config);
      configClone.outputCst = true;
      _this = _super.call(this, tokenVocabulary, configClone) || this;
      return _this;
    }

    return CstParser;
  }(Parser);

  var EmbeddedActionsParser =
  /** @class */
  function (_super) {
    __extends$9(EmbeddedActionsParser, _super);

    function EmbeddedActionsParser(tokenVocabulary, config) {
      if (config === void 0) {
        config = DEFAULT_PARSER_CONFIG;
      }

      var _this = this;

      var configClone = cloneObj(config);
      configClone.outputCst = false;
      _this = _super.call(this, tokenVocabulary, configClone) || this;
      return _this;
    }

    return EmbeddedActionsParser;
  }(Parser);

  function createSyntaxDiagramsCode(grammar, _a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.resourceBase,
        resourceBase = _c === void 0 ? "https://unpkg.com/chevrotain@" + VERSION + "/diagrams/" : _c,
        _d = _b.css,
        css = _d === void 0 ? "https://unpkg.com/chevrotain@" + VERSION + "/diagrams/diagrams.css" : _d;

    var header = "\n<!-- This is a generated file -->\n<!DOCTYPE html>\n<meta charset=\"utf-8\">\n<style>\n  body {\n    background-color: hsl(30, 20%, 95%)\n  }\n</style>\n\n";
    var cssHtml = "\n<link rel='stylesheet' href='" + css + "'>\n";
    var scripts = "\n<script src='" + resourceBase + "vendor/railroad-diagrams.js'></script>\n<script src='" + resourceBase + "src/diagrams_builder.js'></script>\n<script src='" + resourceBase + "src/diagrams_behavior.js'></script>\n<script src='" + resourceBase + "src/main.js'></script>\n";
    var diagramsDiv = "\n<div id=\"diagrams\" align=\"center\"></div>    \n";
    var serializedGrammar = "\n<script>\n    window.serializedGrammar = " + JSON.stringify(grammar, null, "  ") + ";\n</script>\n";
    var initLogic = "\n<script>\n    var diagramsDiv = document.getElementById(\"diagrams\");\n    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);\n</script>\n";
    return header + cssHtml + scripts + diagramsDiv + serializedGrammar + initLogic;
  }

  /**
   * Missing features
   * 1. Rule arguments
   * 2. Gates
   * 3. embedded actions
   */

  var NL = "\n";
  function genUmdModule(options) {
    return "\n(function (root, factory) {\n    if (typeof define === 'function' && define.amd) {\n        // AMD. Register as an anonymous module.\n        define(['chevrotain'], factory);\n    } else if (typeof module === 'object' && module.exports) {\n        // Node. Does not work with strict CommonJS, but\n        // only CommonJS-like environments that support module.exports,\n        // like Node.\n        module.exports = factory(require('chevrotain'));\n    } else {\n        // Browser globals (root is window)\n        root.returnExports = factory(root.b);\n    }\n}(typeof self !== 'undefined' ? self : this, function (chevrotain) {\n\n" + genClass(options) + "\n    \nreturn {\n    " + options.name + ": " + options.name + " \n}\n}));\n";
  }
  function genWrapperFunction(options) {
    return "    \n" + genClass(options) + "\nreturn new " + options.name + "(tokenVocabulary, config)    \n";
  }
  function genClass(options) {
    // TODO: how to pass the token vocabulary? Constructor? other?
    var result = "\nfunction " + options.name + "(tokenVocabulary, config) {\n    // invoke super constructor\n    // No support for embedded actions currently, so we can 'hardcode'\n    // The use of CstParser.\n    chevrotain.CstParser.call(this, tokenVocabulary, config)\n\n    const $ = this\n\n    " + genAllRules(options.rules) + "\n\n    // very important to call this after all the rules have been defined.\n    // otherwise the parser may not work correctly as it will lack information\n    // derived during the self analysis phase.\n    this.performSelfAnalysis(this)\n}\n\n// inheritance as implemented in javascript in the previous decade... :(\n" + options.name + ".prototype = Object.create(chevrotain.CstParser.prototype)\n" + options.name + ".prototype.constructor = " + options.name + "    \n    ";
    return result;
  }
  function genAllRules(rules) {
    var rulesText = map(rules, function (currRule) {
      return genRule(currRule, 1);
    });
    return rulesText.join("\n");
  }
  function genRule(prod, n) {
    var result = indent(n, "$.RULE(\"" + prod.name + "\", function() {") + NL;
    result += genDefinition(prod.definition, n + 1);
    result += indent(n + 1, "})") + NL;
    return result;
  }
  function genTerminal(prod, n) {
    var name = prod.terminalType.name; // TODO: potential performance optimization, avoid tokenMap Dictionary access

    return indent(n, "$.CONSUME" + prod.idx + "(this.tokensMap." + name + ")" + NL);
  }
  function genNonTerminal(prod, n) {
    return indent(n, "$.SUBRULE" + prod.idx + "($." + prod.nonTerminalName + ")" + NL);
  }
  function genAlternation(prod, n) {
    var result = indent(n, "$.OR" + prod.idx + "([") + NL;
    var alts = map(prod.definition, function (altDef) {
      return genSingleAlt(altDef, n + 1);
    });
    result += alts.join("," + NL);
    result += NL + indent(n, "])" + NL);
    return result;
  }
  function genSingleAlt(prod, n) {
    var result = indent(n, "{") + NL;
    result += indent(n + 1, "ALT: function() {") + NL;
    result += genDefinition(prod.definition, n + 1);
    result += indent(n + 1, "}") + NL;
    result += indent(n, "}");
    return result;
  }

  function genProd(prod, n) {
    /* istanbul ignore else */
    if (prod instanceof NonTerminal) {
      return genNonTerminal(prod, n);
    } else if (prod instanceof Option) {
      return genDSLRule("OPTION", prod, n);
    } else if (prod instanceof RepetitionMandatory) {
      return genDSLRule("AT_LEAST_ONE", prod, n);
    } else if (prod instanceof RepetitionMandatoryWithSeparator) {
      return genDSLRule("AT_LEAST_ONE_SEP", prod, n);
    } else if (prod instanceof RepetitionWithSeparator) {
      return genDSLRule("MANY_SEP", prod, n);
    } else if (prod instanceof Repetition) {
      return genDSLRule("MANY", prod, n);
    } else if (prod instanceof Alternation) {
      return genAlternation(prod, n);
    } else if (prod instanceof Terminal) {
      return genTerminal(prod, n);
    } else if (prod instanceof Alternative) {
      return genDefinition(prod.definition, n);
    } else {
      throw Error("non exhaustive match");
    }
  }

  function genDSLRule(dslName, prod, n) {
    var result = indent(n, "$." + (dslName + prod.idx) + "(");

    if (prod.separator) {
      result += "{" + NL;
      result += indent(n + 1, "SEP: this.tokensMap." + prod.separator.name) + "," + NL;
      result += "DEF: " + genDefFunction(prod.definition, n + 2) + NL;
      result += indent(n, "}") + NL;
    } else {
      result += genDefFunction(prod.definition, n + 1);
    }

    result += indent(n, ")") + NL;
    return result;
  }

  function genDefFunction(definition, n) {
    var def = "function() {" + NL;
    def += genDefinition(definition, n);
    def += indent(n, "}") + NL;
    return def;
  }

  function genDefinition(def, n) {
    var result = "";
    forEach(def, function (prod) {
      result += genProd(prod, n + 1);
    });
    return result;
  }

  function indent(howMuch, text) {
    var spaces = Array(howMuch * 4 + 1).join(" ");
    return spaces + text;
  }

  function generateParserFactory(options) {
    var wrapperText = genWrapperFunction({
      name: options.name,
      rules: options.rules
    });
    var constructorWrapper = new Function("tokenVocabulary", "config", "chevrotain", wrapperText);
    return function (config) {
      return constructorWrapper(options.tokenVocabulary, config, // TODO: check how the require is transpiled/webpacked
      require("../api"));
    };
  }
  function generateParserModule(options) {
    return genUmdModule({
      name: options.name,
      rules: options.rules
    });
  }

  /* istanbul ignore file - tricky to import some things from this module during testing */
  /* istanbul ignore next */

  function clearCache() {
    console.warn("The clearCache function was 'soft' removed from the Chevrotain API." + "\n\t It performs no action other than printing this message." + "\n\t Please avoid using it as it will be completely removed in the future");
  }

  var Parser$1 =
  /** @class */
  function () {
    function Parser() {
      throw new Error("The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.\t\n" + "See: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_7-0-0");
    }

    return Parser;
  }();

  var api = /*#__PURE__*/Object.freeze({
    __proto__: null,
    clearCache: clearCache,
    Parser: Parser$1,
    VERSION: VERSION,
    CstParser: CstParser,
    EmbeddedActionsParser: EmbeddedActionsParser,
    get ParserDefinitionErrorType () { return ParserDefinitionErrorType; },
    EMPTY_ALT: EMPTY_ALT,
    Lexer: Lexer,
    get LexerDefinitionErrorType () { return LexerDefinitionErrorType; },
    createToken: createToken,
    createTokenInstance: createTokenInstance,
    EOF: EOF,
    tokenLabel: tokenLabel,
    tokenMatcher: tokenMatcher,
    tokenName: tokenName,
    defaultGrammarResolverErrorProvider: defaultGrammarResolverErrorProvider,
    defaultGrammarValidatorErrorProvider: defaultGrammarValidatorErrorProvider,
    defaultParserErrorProvider: defaultParserErrorProvider,
    EarlyExitException: EarlyExitException,
    isRecognitionException: isRecognitionException,
    MismatchedTokenException: MismatchedTokenException,
    NotAllInputParsedException: NotAllInputParsedException,
    NoViableAltException: NoViableAltException,
    defaultLexerErrorProvider: defaultLexerErrorProvider,
    Alternation: Alternation,
    Alternative: Alternative,
    NonTerminal: NonTerminal,
    Option: Option,
    Repetition: Repetition,
    RepetitionMandatory: RepetitionMandatory,
    RepetitionMandatoryWithSeparator: RepetitionMandatoryWithSeparator,
    RepetitionWithSeparator: RepetitionWithSeparator,
    Rule: Rule,
    Terminal: Terminal,
    serializeGrammar: serializeGrammar,
    serializeProduction: serializeProduction,
    GAstVisitor: GAstVisitor,
    assignOccurrenceIndices: assignOccurrenceIndices,
    resolveGrammar: resolveGrammar$1,
    validateGrammar: validateGrammar$1,
    createSyntaxDiagramsCode: createSyntaxDiagramsCode,
    generateParserFactory: generateParserFactory,
    generateParserModule: generateParserModule
  });

  var NOOP$1 = Symbol("NOOP"); // basically continue

  var MATCH_ANY = Symbol("MATCH_ANY");
  var MATCH_WORD = Symbol("MATCH_WORD");
  var MATCH_TAG = Symbol("MATCH_TAG");
  var MATCH_METHOD = Symbol("MATCH_METHOD");
  var MATCH_END = Symbol("MATCH_END");
  var JMP = Symbol("JMP");
  var SPLIT = Symbol("SPLIT");
  var GLOBAL_SAVE = Symbol("GLOBAL_SAVE"); // Set global save value, if true saves results.

  var MATCH = Symbol("MATCH");
  var OGROUP = Symbol("OGROUP"); // open group

  var CGROUP = Symbol("CGROUP"); // close group

  var INCV = Symbol("INCV"); // increment a value, set to 0 by default

  var JMP_LT = Symbol("JMP_LT"); // jmp if a variable is less than value else continue

  var SPLIT_LT = Symbol("SPLIT_LT"); // split if a variable is less than value else continue

  var LOOKAHEAD = Symbol("LOOKAHEAD");
  var NEGATIVE_LOOKAHEAD = Symbol("NEGATIVE_LOOKAHEAD");
  var constants = {
    NOOP: NOOP$1,
    MATCH_ANY: MATCH_ANY,
    MATCH_WORD: MATCH_WORD,
    MATCH_TAG: MATCH_TAG,
    MATCH_METHOD: MATCH_METHOD,
    MATCH_END: MATCH_END,
    JMP: JMP,
    SPLIT: SPLIT,
    GLOBAL_SAVE: GLOBAL_SAVE,
    MATCH: MATCH,
    OGROUP: OGROUP,
    CGROUP: CGROUP,
    INCV: INCV,
    JMP_LT: JMP_LT,
    SPLIT_LT: SPLIT_LT,
    LOOKAHEAD: LOOKAHEAD,
    NEGATIVE_LOOKAHEAD: NEGATIVE_LOOKAHEAD
  };

  var require$$0 = /*@__PURE__*/getAugmentedNamespace(api);

  var EmbeddedActionsParser$1 = require$$0.EmbeddedActionsParser,
      Lexer$1 = require$$0.Lexer,
      createToken$1 = require$$0.createToken;
  var NOOP$2 = constants.NOOP,
      MATCH_ANY$1 = constants.MATCH_ANY,
      MATCH_TAG$1 = constants.MATCH_TAG,
      MATCH_WORD$1 = constants.MATCH_WORD,
      MATCH_METHOD$1 = constants.MATCH_METHOD,
      MATCH_END$1 = constants.MATCH_END,
      JMP$1 = constants.JMP,
      SPLIT$1 = constants.SPLIT,
      GLOBAL_SAVE$1 = constants.GLOBAL_SAVE,
      MATCH$1 = constants.MATCH,
      OGROUP$1 = constants.OGROUP,
      CGROUP$1 = constants.CGROUP,
      INCV$1 = constants.INCV,
      JMP_LT$1 = constants.JMP_LT,
      SPLIT_LT$1 = constants.SPLIT_LT,
      LOOKAHEAD$1 = constants.LOOKAHEAD,
      NEGATIVE_LOOKAHEAD$1 = constants.NEGATIVE_LOOKAHEAD;
  var StartOf = createToken$1({
    name: 'StartOf',
    pattern: /\^/
  });
  var EndOf = createToken$1({
    name: 'EndOf',
    pattern: /\$/
  });
  var Tag = createToken$1({
    name: 'Tag',
    pattern: /#([_-\w]|\\.)+/
  });
  var EscapedWord = createToken$1({
    name: 'EscapedWord',
    pattern: /\\[#@]([_-\w]|\\.)+/
  });
  var Word = createToken$1({
    name: 'Word',
    pattern: /([_-\w]|\\.)+/
  });
  var Method = createToken$1({
    name: 'Method',
    pattern: /@[_-\w]+/
  });
  var Question = createToken$1({
    name: 'Question',
    pattern: /\?/,
    longer_alt: Word
  });
  var Exclamation = createToken$1({
    name: 'Exclamation',
    pattern: /!/,
    longer_alt: Word
  });
  var Equals = createToken$1({
    name: 'Equals',
    pattern: /=/,
    longer_alt: Word
  });
  var Pound = createToken$1({
    name: 'Pound',
    pattern: /#/,
    longer_alt: Tag
  });
  var Dot = createToken$1({
    name: 'Dot',
    pattern: /\./,
    longer_alt: Word
  });
  var Pipe = createToken$1({
    name: 'Pipe',
    pattern: /\|/
  });
  var Comma = createToken$1({
    name: 'Comma',
    pattern: /,/,
    longer_alt: Word
  });
  var Colon = createToken$1({
    name: 'Colon',
    pattern: /:/,
    longer_alt: Word
  });
  var Plus = createToken$1({
    name: 'Plus',
    pattern: /\+/
  });
  var Star = createToken$1({
    name: 'Star',
    pattern: /\*/
  });
  var Zero = createToken$1({
    name: 'Zero',
    pattern: /0/,
    longer_alt: Word
  });
  var PositiveInt = createToken$1({
    name: 'PositiveInt',
    pattern: /[1-9]\d*/,
    longer_alt: Word
  });
  var LParenthesis = createToken$1({
    name: 'LParenthesis',
    pattern: /\(/
  });
  var RParenthesis = createToken$1({
    name: 'RParenthesis',
    pattern: /\)/
  });
  var LCurly = createToken$1({
    name: 'LCurly',
    pattern: /\{/
  });
  var RCurly = createToken$1({
    name: 'RCurly',
    pattern: /\}/
  });
  var NamedGroupBegin = createToken$1({
    name: 'NamedGroupBegin',
    pattern: /P</
  });
  var NamedGroupEnd = createToken$1({
    name: 'NamedGroupEnd',
    pattern: />/,
    longer_alt: Word
  });
  var WhiteSpace = createToken$1({
    name: 'WhiteSpace',
    pattern: /\s+/,
    group: Lexer$1.SKIPPED
  });
  var allTokens = [NamedGroupBegin, NamedGroupEnd, WhiteSpace, StartOf, EndOf, Zero, PositiveInt, Dot, EscapedWord, Word, Method, Tag, Exclamation, Equals, Pound, Colon, Question, Plus, Star, Comma, Pipe, LParenthesis, RParenthesis, LCurly, RCurly]; // Notes or something like it, may not be accurate.
  // (a|b)
  // 0. split 1, 3
  // 1. char a
  // 2. jmp 4
  // 3. char b
  // 4. match
  //
  // (a|b|c)
  // 0. split 1, 3, 5
  // 1. char a
  // 2. jmp 7
  // 3. char b
  // 4. jmp 7
  // 5. char c
  // 6. match
  //
  // ((a|b)|c)
  // 0. split 1, 6
  // 1. split 2, 4
  // 2. char a
  // 3. jmp 7
  // 4. char b
  // 5. jmp 7
  // 6. char c
  // 7. match
  //
  // a{2}
  // 0. noop
  // 1. char a
  // 2. incv i 1, def=0
  // 3. jmp_lt i 2 [0]
  //
  // a{2, 3}
  // 0. noop
  // 1. char a
  // 2. incv i 1, def=0
  // 3. jmp_lt 0 i [2]
  // 4. split_lt i 3 [0, 6]
  //
  // a{,3}
  // 0. noop
  // 1. char a
  // 2. incv i 1, def=0
  // 3. split_lt i 3 [0, 5]
  //
  // a{3,}
  // 0. noop
  // 1. char a
  // 2. incv i 1, def=0
  // 3. jmp_lt i 3
  // 4. split [0, 6]
  //
  // a(!b)
  // 0. noop
  // 1. char a
  // 2. nlookahead prog  // negative lookahead is a sub program
  //   1. match b
  //   2. match
  // 2.1. if found stop, else continue at current sp
  //

  var MatchParser = /*#__PURE__*/function (_EmbeddedActionsParse) {
    _inherits(MatchParser, _EmbeddedActionsParse);

    var _super = _createSuper(MatchParser);

    function MatchParser() {
      var _this;

      _classCallCheck(this, MatchParser);

      _this = _super.call(this, allTokens);
      /*
       * '.'
       * '^remind #Noun$'
       * '\#Noun' -- escaped word containing #
       * '(remind|#Noun)'
       * '(remind+|#Noun)'
       * '(remind|#Noun)+'
       * '#Noun{2}'
       * '#Noun?'
       * '#Noun*'
       * '(?:remind #Noun)' -- non capturing group
       * '(?P<name>#Noun)'
       * '(?P<name>#Noun)+'
       *
       * matchStatement ([startOf] valueStatement [endOf])
       * valueStatement (value [...value])
       * rangeModifier (LCurly, ((PositiveInt|Zero) [, PositiveInt]) RCurly)
       * oneOrMore (Plus)
       * zeroOrMore (Star)
       * zeroOrOne (Question)
       * valueModifier (oneOrMore, rangeModifier, zeroOrMore, zeroOrOne)
       * value (dot, word, escapedWord, tag, Zero, PositiveInt, group)[valueModifier]
       * namedGroupBegin: token pattern /\?P</
       * namedGroupEnd: token pattern />/
       * namedGroup (namedGroupBegin, Word, namedGroupEnd)
       * nonCapturingGroup token pattern /\?:/ -- TODO: figure out how to escape these
       * negativeGroup token patter /\?!/
       * groupModifier [namedGroup|nonCapturingGroup]
       * group (LParent, [groupModifier], valueStatement|...), RParen)
       *
       */

      var $ = _assertThisInitialized(_this);

      $.RULE('matchStatement', function () {
        var matches = {
          startOf: false,
          prog: [],
          endOf: false
        };
        $.OPTION(function () {
          $.CONSUME(StartOf);
          matches.startOf = true;
        }); // handle ^ startOf

        if (!matches.startOf) {
          // .*? at the start when not ^ / startOf, don't save the matched
          // values.
          matches.prog.push({
            code: GLOBAL_SAVE$1,
            value: false
          });
          matches.prog.push({
            code: SPLIT$1,
            locs: [4, 2]
          });
          matches.prog.push({
            code: MATCH_ANY$1
          });
          matches.prog.push({
            code: JMP$1,
            loc: 1
          });
          matches.prog.push({
            code: GLOBAL_SAVE$1,
            value: true
          });
        }

        matches.groups = [];
        $.SUBRULE($.valueStatement, {
          ARGS: [matches.prog, matches.groups]
        });
        $.OPTION1(function () {
          $.CONSUME(EndOf);
          matches.endOf = true;
        }); // handle $ endOf

        $.ACTION(function () {
          if (matches.endOf) {
            matches.prog.push({
              code: MATCH_END$1
            });
          }

          matches.prog.push({
            code: MATCH$1
          });
        });
        return matches;
      });
      $.RULE('valueStatement', function () {
        var prog = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var groups = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var vars = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var inst = [];
        $.AT_LEAST_ONE({
          DEF: function DEF() {
            $.SUBRULE($.value, {
              ARGS: [prog, groups, vars]
            });
          }
        });
        return inst;
      });
      $.RULE('value', function () {
        var prog = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var groups = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var vars = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var split = {
          code: NOOP$2
        }; // save split for modifiers

        prog.push(split);
        var start = prog.length; // save start for split jmp later

        $.OR([{
          ALT: function ALT() {
            $.CONSUME(Dot);
            prog.push({
              code: MATCH_ANY$1
            });
          }
        }, {
          ALT: function ALT() {
            prog.push({
              code: MATCH_WORD$1,
              value: $.CONSUME(Word).image
            });
          }
        }, {
          ALT: function ALT() {
            prog.push({
              code: MATCH_WORD$1,
              value: $.CONSUME(EscapedWord).image.substr(1)
            });
          }
        }, {
          ALT: function ALT() {
            prog.push({
              code: MATCH_TAG$1,
              value: $.CONSUME(Tag).image.substr(1)
            });
          }
        }, {
          ALT: function ALT() {
            prog.push({
              code: MATCH_WORD$1,
              value: $.CONSUME(Zero).image
            });
          }
        }, {
          ALT: function ALT() {
            prog.push({
              code: MATCH_WORD$1,
              value: $.CONSUME(PositiveInt).image
            });
          }
        }, {
          ALT: function ALT() {
            prog.push({
              code: MATCH_METHOD$1,
              value: $.CONSUME(Method).image.substr(1)
            });
          }
        }, {
          ALT: function ALT() {
            $.SUBRULE($.group, {
              ARGS: [prog, groups, vars]
            });
          }
        }]);
        $.OPTION(function () {
          // TODO: could probably allow relative jmps to get rid of noop
          var _$$SUBRULE = $.SUBRULE($.valueModifier),
              type = _$$SUBRULE.type,
              greedy = _$$SUBRULE.greedy,
              min = _$$SUBRULE.min,
              max = _$$SUBRULE.max;

          switch (type) {
            case 'ZERO_OR_ONE':
              split.code = SPLIT$1;
              split.locs = [start, prog.length];
              break;

            case 'ZERO_OR_MORE':
              prog.push({
                code: JMP$1,
                loc: start - 1
              });
              split.code = SPLIT$1;
              split.locs = [start, prog.length];
              break;

            case 'ONE_OR_MORE':
              prog.push({
                code: SPLIT$1,
                locs: [start, prog.length + 1]
              });

              if (!greedy) {
                prog[prog.length - 1].locs.reverse();
              }

              break;

            case 'RANGE':
              var varId = vars.length;
              vars.push(varId);
              prog.push({
                code: INCV$1,
                varId: varId
              }); // increment first

              var minInst = {
                code: JMP_LT$1,
                varId: varId,
                value: min || 0,
                loc: start
              };
              var maxInst = null;

              if (min === max) {
                // a{x}
                if (min === 0) {
                  // a{0} skip matching, causes token to be ignored
                  split.code = JMP$1;
                  split.loc = prog.length; // next instruction
                } else {
                  // a{x}
                  prog.push(minInst);
                }
              } else if ((min || 0) === 0 && max !== null) {
                // a{,y} a{0,y}
                split.code = SPLIT$1;
                split.locs = [start, prog.length + 1];
                maxInst = {
                  code: SPLIT_LT$1,
                  varId: varId,
                  value: max,
                  locs: [start, prog.length + 1]
                };
                prog.push(maxInst);
              } else if (min !== null && max === null) {
                // a{x,}
                prog.push(minInst);
                maxInst = {
                  code: SPLIT$1,
                  locs: [start, prog.length + 1]
                };
                prog.push(maxInst);
              } else {
                // if (min !== null && max !== null) {
                // a{x,y}
                prog.push(minInst);
                maxInst = {
                  code: SPLIT_LT$1,
                  varId: varId,
                  value: max,
                  locs: [start, prog.length + 1]
                };
                prog.push(maxInst);
              }

              if (!greedy && maxInst && maxInst.locs) {
                maxInst.locs.reverse(); // reverse thread priority for greedy / non-greedy
              } //{ code: SPLIT, locs: [ ] }
              //prog.push({ code: SETV_ONCE, id: rid, value: 0 });
              //prog.push({ code: INCREMENT, id: rid, value: 1 });
              //prog.push({ code: JMP_IF_GTE, id: rid, value: 0 });


              break;
          }

          if (!greedy && split.locs) {
            split.locs.reverse();
          }
        });
      });
      $.RULE('valueModifier', function () {
        var result = {
          type: null,
          greedy: true
        };
        $.OR([{
          ALT: function ALT() {
            $.CONSUME(Question);
            result.type = 'ZERO_OR_ONE';
          }
        }, {
          ALT: function ALT() {
            $.CONSUME(Star);
            result.type = 'ZERO_OR_MORE';
          }
        }, {
          ALT: function ALT() {
            $.CONSUME(Plus);
            result.type = 'ONE_OR_MORE';
          }
        }, {
          ALT: function ALT() {
            var _$$SUBRULE2 = $.SUBRULE($.rangeModifier),
                min = _$$SUBRULE2.min,
                max = _$$SUBRULE2.max;

            $.ACTION(function () {
              result.type = 'RANGE';
              result.min = min;
              result.max = max;
            });
          }
        }]);
        $.OPTION(function () {
          $.CONSUME1(Question);
          $.ACTION(function () {
            result.greedy = false;
          });
        });
        return result;
      });
      $.RULE('rangeModifier', function () {
        var range = {
          min: null,
          max: null
        };
        $.CONSUME(LCurly); // {x}

        $.OPTION(function () {
          $.OR([{
            ALT: function ALT() {
              range.min = $.CONSUME(Zero).image;
            }
          }, {
            ALT: function ALT() {
              range.min = $.CONSUME(PositiveInt).image;
            }
          }]);
        }); // {x}

        range.max = range.min;
        $.OPTION1(function () {
          $.CONSUME(Comma); // {x,}

          range.max = null; // {,x} {x,}, {x,y}

          $.OPTION2(function () {
            range.max = $.CONSUME1(PositiveInt).image;
          });
        });
        $.ACTION(function () {
          if (range.min) {
            range.min = parseInt(range.min, 10);
          }

          if (range.max) {
            range.max = parseInt(range.max, 10);
          }

          var min = range.min,
              max = range.max;

          if (min && max && min > max) {
            throw new Error("Range min(".concat(min, ") must be greater than max(").concat(max, ")."));
          }

          if (min === null && max === null) {
            throw new Error("Range min or max must be defined.");
          }
        });
        $.CONSUME(RCurly);
        return range;
      });
      $.RULE('group', function () {
        var prog = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var groups = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var vars = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var modifiers = {
          capture: true,
          name: null,
          lookahead: false,
          negative: false
        };
        $.CONSUME(LParenthesis);
        $.OPTION(function () {
          modifiers = $.SUBRULE($.groupModifier);
        });
        var oProg = null;

        if (modifiers.lookahead) {
          // part 1, see finish at end
          modifiers.capture = false;
          oProg = prog;
          prog = [];
        }

        var gId = groups.length;

        if (modifiers.capture) {
          groups.push(modifiers);
          prog.push({
            code: OGROUP$1,
            id: gId,
            name: modifiers.name
          });
        }

        var split = {
          code: SPLIT$1,
          locs: []
        };
        prog.push(split);
        var jmps = [];
        $.AT_LEAST_ONE_SEP({
          SEP: Pipe,
          DEF: function DEF() {
            split.locs.push(prog.length);
            $.SUBRULE($.valueStatement, {
              ARGS: [prog, groups, vars]
            });
            var jmp = {
              code: JMP$1,
              loc: null
            };
            jmps.push(jmp);
            prog.push(jmp);
          }
        }); // make split noop when just one in group

        if (split.locs.length === 1) {
          split.code = NOOP$2;
          delete split.locs;
        } // remove last jmp so it continues


        prog.pop(); // set jmps to end

        for (var _i = 0, _jmps = jmps; _i < _jmps.length; _i++) {
          var jmp = _jmps[_i];
          jmp.loc = prog.length;
        } // close the group if necessary as the last step


        if (modifiers.capture) {
          prog.push({
            code: CGROUP$1,
            id: gId,
            name: modifiers.name
          });
        }

        if (modifiers.lookahead) {
          prog.push({
            code: MATCH$1
          });
          oProg.push({
            code: modifiers.negative ? NEGATIVE_LOOKAHEAD$1 : LOOKAHEAD$1,
            prog: prog
          });
        }

        $.CONSUME(RParenthesis);
      });
      $.RULE('namedGroup', function () {
        $.CONSUME(Question);
        $.CONSUME(NamedGroupBegin);
        var name = $.CONSUME(Word).image;
        $.CONSUME(NamedGroupEnd);
        return name;
      });
      $.RULE('nonCapturingGroup', function () {
        $.CONSUME(Question);
        $.CONSUME(Colon);
      });
      $.RULE('negativeLookaheadGroup', function () {
        $.CONSUME(Question);
        $.CONSUME(Exclamation);
      });
      $.RULE('positiveLookaheadGroup', function () {
        $.CONSUME(Question);
        $.CONSUME(Equals);
      });
      $.RULE('commentGroup', function () {
        $.CONSUME(Question);
        $.CONSUME(Pound);
      });
      $.RULE('groupModifier', function () {
        var result = {
          capture: true,
          name: null,
          lookahead: false,
          negative: false,
          comment: false
        };
        $.OR([{
          ALT: function ALT() {
            $.SUBRULE($.nonCapturingGroup);
            result.capture = false;
          }
        }, {
          ALT: function ALT() {
            result.name = $.SUBRULE($.namedGroup);
          }
        }, {
          ALT: function ALT() {
            $.SUBRULE($.negativeLookaheadGroup);
            result.capture = false;
            result.lookahead = true;
            result.negative = true;
          }
        }, {
          ALT: function ALT() {
            $.SUBRULE($.positiveLookaheadGroup);
            result.capture = false;
            result.lookahead = true;
            result.negative = false;
          }
        }
        /*
        { ALT: () => {
          $.SUBRULE($.commentGroup);
          result.capture = false;
          result.comment = true;
        }}
        */
        ]);
        return result;
      });

      _this.performSelfAnalysis();

      return _this;
    }

    return MatchParser;
  }(EmbeddedActionsParser$1);

  var parser = {
    allTokens: allTokens,
    MatchParser: MatchParser
  };

  var NOOP$3 = constants.NOOP,
      MATCH_ANY$2 = constants.MATCH_ANY,
      MATCH_TAG$2 = constants.MATCH_TAG,
      MATCH_WORD$2 = constants.MATCH_WORD,
      MATCH_METHOD$2 = constants.MATCH_METHOD,
      MATCH_END$2 = constants.MATCH_END,
      JMP$2 = constants.JMP,
      SPLIT$2 = constants.SPLIT,
      GLOBAL_SAVE$2 = constants.GLOBAL_SAVE,
      MATCH$2 = constants.MATCH,
      OGROUP$2 = constants.OGROUP,
      CGROUP$2 = constants.CGROUP,
      INCV$2 = constants.INCV,
      JMP_LT$2 = constants.JMP_LT,
      SPLIT_LT$2 = constants.SPLIT_LT,
      LOOKAHEAD$2 = constants.LOOKAHEAD,
      NEGATIVE_LOOKAHEAD$2 = constants.NEGATIVE_LOOKAHEAD;

  var termContainsTag = function termContainsTag(term, name) {
    return Object.entries(term.tags || {}).filter(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          _k = _ref2[0],
          v = _ref2[1];

      return v;
    }) //eslint-disable-line
    .map(function (entry) {
      return entry[0].toLowerCase();
    }).includes(name.toLowerCase());
  };
  /**
   * Helper function, create a thread
   * Copies saved and groups.saved so that each thread contains its own
   * independent saved values.
   *
   * Note: Using the { saved, groups } allows passing a thread which will cause
   * its saved to be cloned.
   *
   * @param {int} pc - position of instance code to execute
   * @param {*[]} saved - matched objects that were saved
   * @param {object} groups - capture groups key of group id
   * @returns {object} thread
   */


  var thread = function thread(pc) {
    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref3$save = _ref3.save,
        save = _ref3$save === void 0 ? true : _ref3$save,
        _ref3$saved = _ref3.saved,
        saved = _ref3$saved === void 0 ? [] : _ref3$saved,
        _ref3$groups = _ref3.groups,
        groups = _ref3$groups === void 0 ? {} : _ref3$groups,
        _ref3$vars = _ref3.vars,
        vars = _ref3$vars === void 0 ? {} : _ref3$vars;

    var ngroups = Object.values(groups).reduce(function (ng, g) {
      ng[g.id] = Object.assign({}, g);
      ng[g.id].saved = g.saved.slice();
      return ng;
    }, {});
    return {
      pc: pc,
      save: save,
      saved: _toConsumableArray(saved),
      // clone groups.saved
      groups: ngroups,
      vars: Object.assign({}, vars)
    };
  };

  var addthread = function addthread(prog, list, th) {
    var inst = prog[th.pc]; //console.log("addthread:", th.pc);
    //console.log("  inst:", inst);

    switch (inst.code) {
      case GLOBAL_SAVE$2:
        th.save = inst.value;
        addthread(prog, list, thread(th.pc + 1, th));
        break;

      case NOOP$3:
        addthread(prog, list, thread(th.pc + 1, th));
        break;

      case JMP$2:
        addthread(prog, list, thread(inst.loc, th));
        break;

      case SPLIT$2:
        var _iterator = _createForOfIteratorHelper(inst.locs),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var loc = _step.value;
            addthread(prog, list, thread(loc, th));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        break;

      case OGROUP$2:
        // again (see below comment in pikevm match), can modify thread
        // because it ends here
        th.groups[inst.id] = {
          id: inst.id,
          name: inst.name,
          saved: [],
          open: true
        };
        addthread(prog, list, thread(th.pc + 1, th));
        break;

      case CGROUP$2:
        th.groups[inst.id].open = false;
        addthread(prog, list, thread(th.pc + 1, th));
        break;

      case INCV$2:
        th.vars[inst.varId] = (th.vars[inst.varId] || 0) + 1;
        addthread(prog, list, thread(th.pc + 1, th));
        break;

      case JMP_LT$2:
        if (th.vars[inst.varId] < inst.value) {
          // jump!
          addthread(prog, list, thread(inst.loc, th));
        } else {
          // continue
          addthread(prog, list, thread(th.pc + 1, th));
        }

        break;

      case SPLIT_LT$2:
        if (th.vars[inst.varId] < inst.value) {
          // split!
          var _iterator2 = _createForOfIteratorHelper(inst.locs),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _loc = _step2.value;
              addthread(prog, list, thread(_loc, th));
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        } else {
          // continue
          addthread(prog, list, thread(th.pc + 1, th));
        }

        break;

      default:
        list.push(th);
        break;
    }
  };
  /**
   * Save a match to a thread.
   * Handles saving to open groups too
   * @param {object} th - the thread
   * @param {*] sp - the matched value to add
   * @return {object} the thread th
   */


  var saveMatch = function saveMatch(th, sp) {
    if (!th.save) {
      return th;
    } // get the `saved` from the open buckets


    var tmp = Object.values(th.groups).filter(function (g) {
      return g.open;
    }).map(function (g) {
      return g.saved;
    });
    var buckets = [th.saved].concat(tmp);

    var _iterator3 = _createForOfIteratorHelper(buckets),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var saved = _step3.value;
        saved.push(sp);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    return th;
  };
  /**
   * Simulate pike's vm, see https://swtch.com/~rsc/regexp/regexp2.html
   * @param {object[]} inst - instructions to execute
   * @param {object[]} input - input word w/ terms
   * @returns true or false for match and saved matches
   */


  var pikevm = function pikevm(prog, input) {
    var clist = [];
    var nlist = [];
    var found = false;
    var groups = {};
    var saved = []; // helps with match end and also matches that end at exactly the end so that
    // the match function gets a chance to run.

    var END = Symbol('END');
    input = input.concat(END);
    addthread(prog, clist, thread(0)); // and so we begin...

    for (var i = 0; i < input.length; i++) {
      if (clist.length === 0) {
        break;
      }

      var sp = input[i];

      for (var j = 0; j < clist.length; j++) {
        // can probably convert to clist.shift as optimization
        var th = clist[j];
        var inst = prog[th.pc]; //console.log("exec:", inst);
        //console.log(`  stack(${i}):`, clist);

        var gotoNextWord = false;

        switch (inst.code) {
          case MATCH_ANY$2:
            // Note: can call save match like this without worrying about other
            // threads because this thread ends here and another will be created
            // in its place
            if (sp !== END) {
              addthread(prog, nlist, thread(th.pc + 1, saveMatch(th, sp)));
            }

            break;

          case MATCH_WORD$2:
            if (sp.text && sp.text.toLowerCase() === inst.value.toLowerCase()) {
              // continue on next word
              addthread(prog, nlist, thread(th.pc + 1, saveMatch(th, sp)));
            }

            break;

          case MATCH_TAG$2:
            if (termContainsTag(sp, inst.value)) {
              addthread(prog, nlist, thread(th.pc + 1, saveMatch(th, sp)));
            }

            break;

          case MATCH_METHOD$2:
            // call method using null coalescing on term, if it returns true continue
            if (sp[inst.value]()) {
              addthread(prog, nlist, thread(th.pc + 1, saveMatch(th, sp)));
            }

            break;

          case MATCH_END$2:
            if (sp === END) {
              // continue
              addthread(prog, clist, thread(th.pc + 1, th));
            }

            break;

          case LOOKAHEAD$2:
            var mla = pikevm(inst.prog, input.slice(i));

            if (mla.found) {
              addthread(prog, clist, thread(th.pc + 1, th));
            }

            break;

          case NEGATIVE_LOOKAHEAD$2:
            var mnla = pikevm(inst.prog, input.slice(i));

            if (!mnla.found) {
              // continue at current position
              // NOTE: this would be in addthread but we require access to input
              addthread(prog, clist, thread(th.pc + 1, th));
            }

            break;

          case MATCH$2:
            saved = th.saved;
            groups = th.groups;
            found = true; // Go to the next word which causes all pending threads in the
            // current list (stack) to be cleared so we don't go down those
            // paths. This allows for greedy and non-greedy matches to work.

            gotoNextWord = true;
            break;

          default:
            throw new Error("Unsuppored Op code: ".concat(inst.code));
        }

        if (gotoNextWord) {
          break; // continue next iteration
        }
      }

      clist = nlist;
      nlist = [];
    }

    if (found) {
      return {
        found: found,
        saved: saved,
        groups: groups
      };
    }

    return {
      found: found
    };
  };

  var pikevm_1 = {
    termContainsTag: termContainsTag,
    pikevm: pikevm
  };

  var Lexer$2 = require$$0.Lexer;
  var MatchParser$1 = parser.MatchParser,
      allTokens$1 = parser.allTokens;
  var pikevm$1 = pikevm_1.pikevm;
  var NLPMatchLexer = new Lexer$2(allTokens$1);
  var parserInstance = new MatchParser$1();

  var NLPRegexParseError = /*#__PURE__*/function () {
    function NLPRegexParseError(errors) {
      _classCallCheck(this, NLPRegexParseError);

      this.errors = errors;
    }

    _createClass(NLPRegexParseError, [{
      key: "toString",
      value: function toString() {
        return "NLP RegexP Parsing error: ".concat(this.message);
      }
    }, {
      key: "message",
      get: function get() {
        return this.errors[0].message;
      }
    }]);

    return NLPRegexParseError;
  }();
  /**
   * Custom NLPRegexP class for regexp compile / cache.
   */


  var NLPRegexP = /*#__PURE__*/function () {
    /**
     * @param {string} regex - regular expression like string for matching nlp
     * terms.
     */
    function NLPRegexP(regex) {
      _classCallCheck(this, NLPRegexP);

      if (regex.prog) {
        // take another NLPRegexP
        this.regex = regex.regex;
        this.prog = regex.prog.slice();
        return;
      }

      var _NLPMatchLexer$tokeni = NLPMatchLexer.tokenize(regex),
          tokens = _NLPMatchLexer$tokeni.tokens;

      parserInstance.input = tokens;
      var parsed = null;

      try {
        parsed = parserInstance.matchStatement();
      } catch (e) {
        // catch thrown error
        throw new NLPRegexParseError([e]);
      }

      if (parserInstance.errors.length > 0) {
        throw new NLPRegexParseError(parserInstance.errors);
      }

      this.regex = regex;
      this.prog = parsed.prog;
    }

    _createClass(NLPRegexP, [{
      key: "exec",
      value: function exec(docOrPhrase) {
        switch (docOrPhrase.isA.toLowerCase()) {
          case 'doc':
            return this.execDoc(docOrPhrase);

          case 'phrase':
            return this.execPhrase(docOrPhrase);

          default:
            throw new Error('Invalid type, must be Document or Phrase');
        }
      }
    }, {
      key: "execDoc",
      value: function execDoc(doc) {
        var _this = this;

        return doc.buildFrom(doc.list.map(function (phrase) {
          return _this.execPhrase(phrase);
        }).filter(function (p) {
          return p !== null;
        }));
      }
    }, {
      key: "execPhrase",
      value: function execPhrase(phrase) {
        var _pikevm = pikevm$1(this.prog, phrase.terms()),
            found = _pikevm.found,
            _pikevm$saved = _pikevm.saved,
            saved = _pikevm$saved === void 0 ? [] : _pikevm$saved,
            _pikevm$groups = _pikevm.groups,
            groups = _pikevm$groups === void 0 ? {} : _pikevm$groups;

        var namedGroups = Object.values(groups).reduce(function (arr, g) {
          var obj = Object.assign({}, arr);
          var num = parseInt(g.id, 10);
          obj[num] = {
            group: g.name || "".concat(g.id),
            start: g.saved[0] ? g.saved[0].id || 0 : 0,
            length: g.saved.length
          };
          return obj;
        }, {});
        return found && saved[0] && saved[0].id ? phrase.buildFrom(saved[0].id, saved.length, namedGroups) : null;
      }
    }]);

    return NLPRegexP;
  }();

  var regex = {
    NLPMatchLexer: NLPMatchLexer,
    parserInstance: parserInstance,
    NLPRegexParseError: NLPRegexParseError,
    NLPRegexP: NLPRegexP
  };

  var NLPRegexP$1 = regex.NLPRegexP; // nlp compromise plugin

  var plugin = function plugin(Doc, _world, nlp, Phrase) {
    var preCompile = function preCompile(regex) {
      return new NLPRegexP$1(regex);
    };

    nlp.preCompile = preCompile;

    var strictMatch = function strictMatch(regex) {
      // function, non arrow, need bind for this which is doc/phrase
      regex = new NLPRegexP$1(regex); // coerce the value

      return regex.exec(this);
    };

    Doc.prototype.strictMatch = strictMatch;
    Phrase.prototype.strictMatch = strictMatch; // Doc.prototype.match = strictMatch
    // Phrase.prototype.match = strictMatch
  };

  var src = plugin;

  return src;

})));
//# sourceMappingURL=compromise-strict.js.map
