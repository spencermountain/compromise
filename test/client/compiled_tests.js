(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
};

},{}],2:[function(require,module,exports){
'use strict';

function assembleStyles () {
	var styles = {
		modifiers: {
			reset: [0, 0],
			bold: [1, 22], // 21 isn't widely supported and 22 does the same thing
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		colors: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39]
		},
		bgColors: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49]
		}
	};

	// fix humans
	styles.colors.grey = styles.colors.gray;

	Object.keys(styles).forEach(function (groupName) {
		var group = styles[groupName];

		Object.keys(group).forEach(function (styleName) {
			var style = group[styleName];

			styles[styleName] = group[styleName] = {
				open: '\u001b[' + style[0] + 'm',
				close: '\u001b[' + style[1] + 'm'
			};
		});

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});
	});

	return styles;
}

Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});

},{}],3:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],4:[function(require,module,exports){

},{}],5:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],6:[function(require,module,exports){
(function (global){
'use strict';

var buffer = require('buffer');
var Buffer = buffer.Buffer;
var SlowBuffer = buffer.SlowBuffer;
var MAX_LEN = buffer.kMaxLength || 2147483647;
exports.alloc = function alloc(size, fill, encoding) {
  if (typeof Buffer.alloc === 'function') {
    return Buffer.alloc(size, fill, encoding);
  }
  if (typeof encoding === 'number') {
    throw new TypeError('encoding must not be number');
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  var enc = encoding;
  var _fill = fill;
  if (_fill === undefined) {
    enc = undefined;
    _fill = 0;
  }
  var buf = new Buffer(size);
  if (typeof _fill === 'string') {
    var fillBuf = new Buffer(_fill, enc);
    var flen = fillBuf.length;
    var i = -1;
    while (++i < size) {
      buf[i] = fillBuf[i % flen];
    }
  } else {
    buf.fill(_fill);
  }
  return buf;
}
exports.allocUnsafe = function allocUnsafe(size) {
  if (typeof Buffer.allocUnsafe === 'function') {
    return Buffer.allocUnsafe(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new Buffer(size);
}
exports.from = function from(value, encodingOrOffset, length) {
  if (typeof Buffer.from === 'function' && (!global.Uint8Array || Uint8Array.from !== Buffer.from)) {
    return Buffer.from(value, encodingOrOffset, length);
  }
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof value === 'string') {
    return new Buffer(value, encodingOrOffset);
  }
  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    var offset = encodingOrOffset;
    if (arguments.length === 1) {
      return new Buffer(value);
    }
    if (typeof offset === 'undefined') {
      offset = 0;
    }
    var len = length;
    if (typeof len === 'undefined') {
      len = value.byteLength - offset;
    }
    if (offset >= value.byteLength) {
      throw new RangeError('\'offset\' is out of bounds');
    }
    if (len > value.byteLength - offset) {
      throw new RangeError('\'length\' is out of bounds');
    }
    return new Buffer(value.slice(offset, offset + len));
  }
  if (Buffer.isBuffer(value)) {
    var out = new Buffer(value.length);
    value.copy(out, 0, 0, value.length);
    return out;
  }
  if (value) {
    if (Array.isArray(value) || (typeof ArrayBuffer !== 'undefined' && value.buffer instanceof ArrayBuffer) || 'length' in value) {
      return new Buffer(value);
    }
    if (value.type === 'Buffer' && Array.isArray(value.data)) {
      return new Buffer(value.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ' + 'ArrayBuffer, Array, or array-like object.');
}
exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
  if (typeof Buffer.allocUnsafeSlow === 'function') {
    return Buffer.allocUnsafeSlow(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size >= MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new SlowBuffer(size);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"buffer":7}],7:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"base64-js":3,"ieee754":29,"isarray":33}],8:[function(require,module,exports){
(function (process){
'use strict';
var escapeStringRegexp = require('escape-string-regexp');
var ansiStyles = require('ansi-styles');
var stripAnsi = require('strip-ansi');
var hasAnsi = require('has-ansi');
var supportsColor = require('supports-color');
var defineProps = Object.defineProperties;
var isSimpleWindowsTerm = process.platform === 'win32' && !/^xterm/i.test(process.env.TERM);

function Chalk(options) {
	// detect mode if not set manually
	this.enabled = !options || options.enabled === undefined ? supportsColor : options.enabled;
}

// use bright blue on Windows as the normal blue color is illegible
if (isSimpleWindowsTerm) {
	ansiStyles.blue.open = '\u001b[94m';
}

var styles = (function () {
	var ret = {};

	Object.keys(ansiStyles).forEach(function (key) {
		ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

		ret[key] = {
			get: function () {
				return build.call(this, this._styles.concat(key));
			}
		};
	});

	return ret;
})();

var proto = defineProps(function chalk() {}, styles);

function build(_styles) {
	var builder = function () {
		return applyStyle.apply(builder, arguments);
	};

	builder._styles = _styles;
	builder.enabled = this.enabled;
	// __proto__ is used because we must return a function, but there is
	// no way to create a function with a different prototype.
	/* eslint-disable no-proto */
	builder.__proto__ = proto;

	return builder;
}

function applyStyle() {
	// support varags, but simply cast to string in case there's only one arg
	var args = arguments;
	var argsLen = args.length;
	var str = argsLen !== 0 && String(arguments[0]);

	if (argsLen > 1) {
		// don't slice `arguments`, it prevents v8 optimizations
		for (var a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!this.enabled || !str) {
		return str;
	}

	var nestedStyles = this._styles;
	var i = nestedStyles.length;

	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	// see https://github.com/chalk/chalk/issues/58
	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
	var originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && (nestedStyles.indexOf('gray') !== -1 || nestedStyles.indexOf('grey') !== -1)) {
		ansiStyles.dim.open = '';
	}

	while (i--) {
		var code = ansiStyles[nestedStyles[i]];

		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;
	}

	// Reset the original 'dim' if we changed it to work around the Windows dimmed gray issue.
	ansiStyles.dim.open = originalDim;

	return str;
}

function init() {
	var ret = {};

	Object.keys(styles).forEach(function (name) {
		ret[name] = {
			get: function () {
				return build.call(this, [name]);
			}
		};
	});

	return ret;
}

defineProps(Chalk.prototype, init());

module.exports = new Chalk();
module.exports.styles = ansiStyles;
module.exports.hasColor = hasAnsi;
module.exports.stripColor = stripAnsi;
module.exports.supportsColor = supportsColor;

}).call(this,require('_process'))
},{"_process":39,"ansi-styles":2,"escape-string-regexp":22,"has-ansi":27,"strip-ansi":58,"supports-color":59}],9:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
},{"../../is-buffer/index.js":31}],10:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":11,"./lib/keys.js":12}],11:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],12:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],13:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var foreach = require('foreach');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"foreach":24,"object-keys":35}],14:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],15:[function(require,module,exports){
'use strict';

var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');

var sign = require('./helpers/sign');
var mod = require('./helpers/mod');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return Boolean(value);
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// http://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	}
};

module.exports = ES5;

},{"./helpers/isFinite":16,"./helpers/isNaN":17,"./helpers/mod":18,"./helpers/sign":19,"es-to-primitive/es5":20,"is-callable":32}],16:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],17:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],18:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],19:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],20:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};

},{"./helpers/isPrimitive":21,"is-callable":32}],21:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],22:[function(require,module,exports){
'use strict';

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};

},{}],23:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],24:[function(require,module,exports){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


},{}],25:[function(require,module,exports){
var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],26:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":25}],27:[function(require,module,exports){
'use strict';
var ansiRegex = require('ansi-regex');
var re = new RegExp(ansiRegex().source); // remove the `g` flag
module.exports = re.test.bind(re);

},{"ansi-regex":1}],28:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":26}],29:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],30:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],31:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],32:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],33:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],34:[function(require,module,exports){
var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var booleanValueOf = Boolean.prototype.valueOf;

module.exports = function inspect_ (obj, opts, depth, seen) {
    if (!opts) opts = {};
    
    var maxDepth = opts.depth === undefined ? 5 : opts.depth;
    if (depth === undefined) depth = 0;
    if (depth >= maxDepth && maxDepth > 0 && obj && typeof obj === 'object') {
        return '[Object]';
    }
    
    if (seen === undefined) seen = [];
    else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }
    
    function inspect (value, from) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        return inspect_(value, opts, depth + 1, seen);
    }
    
    if (typeof obj === 'string') {
        return inspectString(obj);
    }
    else if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : '') + ']';
    }
    else if (obj === null) {
        return 'null';
    }
    else if (isSymbol(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? 'Object(' + symString + ')' : symString;
    }
    else if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '="' + quote(attrs[i].value) + '"';
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) s += '...';
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    else if (isArray(obj)) {
        if (obj.length === 0) return '[]';
        var xs = Array(obj.length);
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    else if (isError(obj)) {
        var parts = [];
        for (var key in obj) {
            if (!has(obj, key)) continue;
            
            if (/[^\w$]/.test(key)) {
                parts.push(inspect(key) + ': ' + inspect(obj[key]));
            }
            else {
                parts.push(key + ': ' + inspect(obj[key]));
            }
        }
        if (parts.length === 0) return '[' + obj + ']';
        return '{ [' + obj + '] ' + parts.join(', ') + ' }';
    }
    else if (typeof obj === 'object' && typeof obj.inspect === 'function') {
        return obj.inspect();
    }
    else if (isMap(obj)) {
        var parts = [];
        mapForEach.call(obj, function (value, key) {
            parts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
        });
        return 'Map (' + mapSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (isSet(obj)) {
        var parts = [];
        setForEach.call(obj, function (value ) {
            parts.push(inspect(value, obj));
        });
        return 'Set (' + setSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (typeof obj !== 'object') {
        return String(obj);
    }
    else if (isNumber(obj)) {
        return 'Object(' + Number(obj) + ')';
    }
    else if (isBoolean(obj)) {
        return 'Object(' + booleanValueOf.call(obj) + ')';
    }
    else if (isString(obj)) {
        return 'Object(' + inspect(String(obj)) + ')';
    }
    else if (!isDate(obj) && !isRegExp(obj)) {
        var xs = [], keys = [];
        for (var key in obj) {
            if (has(obj, key)) keys.push(key);
        }
        keys.sort();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (/[^\w$]/.test(key)) {
                xs.push(inspect(key) + ': ' + inspect(obj[key], obj));
            }
            else xs.push(key + ': ' + inspect(obj[key], obj));
        }
        if (xs.length === 0) return '{}';
        return '{ ' + xs.join(', ') + ' }';
    }
    else return String(obj);
};

function quote (s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray (obj) { return toStr(obj) === '[object Array]' }
function isDate (obj) { return toStr(obj) === '[object Date]' }
function isRegExp (obj) { return toStr(obj) === '[object RegExp]' }
function isError (obj) { return toStr(obj) === '[object Error]' }
function isSymbol (obj) { return toStr(obj) === '[object Symbol]' }
function isString (obj) { return toStr(obj) === '[object String]' }
function isNumber (obj) { return toStr(obj) === '[object Number]' }
function isBoolean (obj) { return toStr(obj) === '[object Boolean]' }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has (obj, key) {
    return hasOwn.call(obj, key);
}

function toStr (obj) {
    return Object.prototype.toString.call(obj);
}

function nameOf (f) {
    if (f.name) return f.name;
    var m = f.toString().match(/^function\s*([\w$]+)/);
    if (m) return m[1];
}

function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
    }
    return -1;
}

function isMap (x) {
    if (!mapSize) {
        return false;
    }
    try {
        mapSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet (x) {
    if (!setSize) {
        return false;
    }
    try {
        setSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isElement (x) {
    if (!x || typeof x !== 'object') return false;
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string'
        && typeof x.getAttribute === 'function'
    ;
}

function inspectString (str) {
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return "'" + s + "'";
    
    function lowbyte (c) {
        var n = c.charCodeAt(0);
        var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
        if (x) return '\\' + x;
        return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
    }
}

},{}],35:[function(require,module,exports){
'use strict';

// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = require('./isArguments');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./isArguments":36}],36:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],37:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":39}],38:[function(require,module,exports){
(function (process){
'use strict';

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

}).call(this,require('_process'))
},{"_process":39}],39:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],40:[function(require,module,exports){
module.exports = require("./lib/_stream_duplex.js")

},{"./lib/_stream_duplex.js":41}],41:[function(require,module,exports){
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}
},{"./_stream_readable":43,"./_stream_writable":45,"core-util-is":9,"inherits":30,"process-nextick-args":38}],42:[function(require,module,exports){
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":44,"core-util-is":9,"inherits":30}],43:[function(require,module,exports){
(function (process){
'use strict';

module.exports = Readable;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream;
(function () {
  try {
    Stream = require('st' + 'ream');
  } catch (_) {} finally {
    if (!Stream) Stream = require('events').EventEmitter;
  }
})();
/*</replacement>*/

var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var StringDecoder;

util.inherits(Readable, Stream);

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options && typeof options.read === 'function') this._read = options.read;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;

  if (!state.objectMode && typeof chunk === 'string') {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = bufferShim.from(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error('stream.unshift() after end event');
      stream.emit('error', _e);
    } else {
      var skipAdd;
      if (state.decoder && !addToFront && !encoding) {
        chunk = state.decoder.write(chunk);
        skipAdd = !state.objectMode && chunk.length === 0;
      }

      if (!addToFront) state.reading = false;

      // Don't add to the buffer if we've decoded to an empty string chunk and
      // we're not in object mode
      if (!skipAdd) {
        // if we want the data now, just emit it.
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit('data', chunk);
          stream.read(0);
        } else {
          // update the buffer info.
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

          if (state.needReadable) emitReadable(stream);
        }
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function (ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = bufferShim.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
}).call(this,require('_process'))
},{"./_stream_duplex":41,"./internal/streams/BufferList":46,"_process":39,"buffer":7,"buffer-shims":6,"core-util-is":9,"events":23,"inherits":30,"isarray":33,"process-nextick-args":38,"string_decoder/":57,"util":4}],44:[function(require,module,exports){
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":41,"core-util-is":9,"inherits":30}],45:[function(require,module,exports){
(function (process){
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

module.exports = Writable;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream;
(function () {
  try {
    Stream = require('st' + 'ream');
  } catch (_) {} finally {
    if (!Stream) Stream = require('events').EventEmitter;
  }
})();
/*</replacement>*/

var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

util.inherits(Writable, Stream);

function nop() {}

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;
  // Always throw error if a null is written
  // if we are not in object mode then throw
  // if it is not a buffer, string, or undefined.
  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = bufferShim.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);

  if (Buffer.isBuffer(chunk)) encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) processNextTick(cb, er);else cb(er);

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
        afterWrite(stream, state, finished, cb);
      }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function (err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = _this;
    } else {
      state.corkedRequestsFree = _this;
    }
  };
}
}).call(this,require('_process'))
},{"./_stream_duplex":41,"_process":39,"buffer":7,"buffer-shims":6,"core-util-is":9,"events":23,"inherits":30,"process-nextick-args":38,"util-deprecate":65}],46:[function(require,module,exports){
'use strict';

var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

module.exports = BufferList;

function BufferList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

BufferList.prototype.push = function (v) {
  var entry = { data: v, next: null };
  if (this.length > 0) this.tail.next = entry;else this.head = entry;
  this.tail = entry;
  ++this.length;
};

BufferList.prototype.unshift = function (v) {
  var entry = { data: v, next: this.head };
  if (this.length === 0) this.tail = entry;
  this.head = entry;
  ++this.length;
};

BufferList.prototype.shift = function () {
  if (this.length === 0) return;
  var ret = this.head.data;
  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
  --this.length;
  return ret;
};

BufferList.prototype.clear = function () {
  this.head = this.tail = null;
  this.length = 0;
};

BufferList.prototype.join = function (s) {
  if (this.length === 0) return '';
  var p = this.head;
  var ret = '' + p.data;
  while (p = p.next) {
    ret += s + p.data;
  }return ret;
};

BufferList.prototype.concat = function (n) {
  if (this.length === 0) return bufferShim.alloc(0);
  if (this.length === 1) return this.head.data;
  var ret = bufferShim.allocUnsafe(n >>> 0);
  var p = this.head;
  var i = 0;
  while (p) {
    p.data.copy(ret, i);
    i += p.data.length;
    p = p.next;
  }
  return ret;
};
},{"buffer":7,"buffer-shims":6}],47:[function(require,module,exports){
module.exports = require("./lib/_stream_passthrough.js")

},{"./lib/_stream_passthrough.js":42}],48:[function(require,module,exports){
(function (process){
var Stream = (function (){
  try {
    return require('st' + 'ream'); // hack to fix a circular dependency issue when used with browserify
  } catch(_){}
}());
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = Stream || exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

if (!process.browser && process.env.READABLE_STREAM === 'disable' && Stream) {
  module.exports = Stream;
}

}).call(this,require('_process'))
},{"./lib/_stream_duplex.js":41,"./lib/_stream_passthrough.js":42,"./lib/_stream_readable.js":43,"./lib/_stream_transform.js":44,"./lib/_stream_writable.js":45,"_process":39}],49:[function(require,module,exports){
module.exports = require("./lib/_stream_transform.js")

},{"./lib/_stream_transform.js":44}],50:[function(require,module,exports){
module.exports = require("./lib/_stream_writable.js")

},{"./lib/_stream_writable.js":45}],51:[function(require,module,exports){
(function (process){
var through = require('through');
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = function (write, end) {
    var tr = through(write, end);
    tr.pause();
    var resume = tr.resume;
    var pause = tr.pause;
    var paused = false;
    
    tr.pause = function () {
        paused = true;
        return pause.apply(this, arguments);
    };
    
    tr.resume = function () {
        paused = false;
        return resume.apply(this, arguments);
    };
    
    nextTick(function () {
        if (!paused) tr.resume();
    });
    
    return tr;
};

}).call(this,require('_process'))
},{"_process":39,"through":64}],52:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":23,"inherits":30,"readable-stream/duplex.js":40,"readable-stream/passthrough.js":47,"readable-stream/readable.js":48,"readable-stream/transform.js":49,"readable-stream/writable.js":50}],53:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var ES = require('es-abstract/es5');
var replace = bind.call(Function.call, String.prototype.replace);

var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;

module.exports = function trim() {
	var S = ES.ToString(ES.CheckObjectCoercible(this));
	return replace(replace(S, leftWhitespace, ''), rightWhitespace, '');
};

},{"es-abstract/es5":15,"function-bind":26}],54:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var boundTrim = bind.call(Function.call, getPolyfill());

define(boundTrim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundTrim;

},{"./implementation":53,"./polyfill":55,"./shim":56,"define-properties":13,"function-bind":26}],55:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":53}],56:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":55,"define-properties":13}],57:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = require('buffer').Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}

},{"buffer":7}],58:[function(require,module,exports){
'use strict';
var ansiRegex = require('ansi-regex')();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};

},{"ansi-regex":1}],59:[function(require,module,exports){
(function (process){
'use strict';
var argv = process.argv;

var terminator = argv.indexOf('--');
var hasFlag = function (flag) {
	flag = '--' + flag;
	var pos = argv.indexOf(flag);
	return pos !== -1 && (terminator !== -1 ? pos < terminator : true);
};

module.exports = (function () {
	if ('FORCE_COLOR' in process.env) {
		return true;
	}

	if (hasFlag('no-color') ||
		hasFlag('no-colors') ||
		hasFlag('color=false')) {
		return false;
	}

	if (hasFlag('color') ||
		hasFlag('colors') ||
		hasFlag('color=true') ||
		hasFlag('color=always')) {
		return true;
	}

	if (process.stdout && !process.stdout.isTTY) {
		return false;
	}

	if (process.platform === 'win32') {
		return true;
	}

	if ('COLORTERM' in process.env) {
		return true;
	}

	if (process.env.TERM === 'dumb') {
		return false;
	}

	if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
		return true;
	}

	return false;
})();

}).call(this,require('_process'))
},{"_process":39}],60:[function(require,module,exports){
(function (process){
var defined = require('defined');
var createDefaultStream = require('./lib/default_stream');
var Test = require('./lib/test');
var createResult = require('./lib/results');
var through = require('through');

var canEmitExit = typeof process !== 'undefined' && process
    && typeof process.on === 'function' && process.browser !== true
;
var canExit = typeof process !== 'undefined' && process
    && typeof process.exit === 'function'
;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

exports = module.exports = (function () {
    var harness;
    var lazyLoad = function () {
        return getHarness().apply(this, arguments);
    };
    
    lazyLoad.only = function () {
        return getHarness().only.apply(this, arguments);
    };
    
    lazyLoad.createStream = function (opts) {
        if (!opts) opts = {};
        if (!harness) {
            var output = through();
            getHarness({ stream: output, objectMode: opts.objectMode });
            return output;
        }
        return harness.createStream(opts);
    };
    
    lazyLoad.onFinish = function () {
        return getHarness().onFinish.apply(this, arguments);
    };

    lazyLoad.getHarness = getHarness

    return lazyLoad

    function getHarness (opts) {
        if (!opts) opts = {};
        opts.autoclose = !canEmitExit;
        if (!harness) harness = createExitHarness(opts);
        return harness;
    }
})();

function createExitHarness (conf) {
    if (!conf) conf = {};
    var harness = createHarness({
        autoclose: defined(conf.autoclose, false)
    });
    
    var stream = harness.createStream({ objectMode: conf.objectMode });
    var es = stream.pipe(conf.stream || createDefaultStream());
    if (canEmitExit) {
        es.on('error', function (err) { harness._exitCode = 1 });
    }
    
    var ended = false;
    stream.on('end', function () { ended = true });
    
    if (conf.exit === false) return harness;
    if (!canEmitExit || !canExit) return harness;

    var inErrorState = false;

    process.on('exit', function (code) {
        // let the process exit cleanly.
        if (code !== 0) {
            return
        }

        if (!ended) {
            var only = harness._results._only;
            for (var i = 0; i < harness._tests.length; i++) {
                var t = harness._tests[i];
                if (only && t.name !== only) continue;
                t._exit();
            }
        }
        harness.close();
        process.exit(code || harness._exitCode);
    });
    
    return harness;
}

exports.createHarness = createHarness;
exports.Test = Test;
exports.test = exports; // tap compat
exports.test.skip = Test.skip;

var exitInterval;

function createHarness (conf_) {
    if (!conf_) conf_ = {};
    var results = createResult();
    if (conf_.autoclose !== false) {
        results.once('done', function () { results.close() });
    }
    
    var test = function (name, conf, cb) {
        var t = new Test(name, conf, cb);
        test._tests.push(t);
        
        (function inspectCode (st) {
            st.on('test', function sub (st_) {
                inspectCode(st_);
            });
            st.on('result', function (r) {
                if (!r.ok && typeof r !== 'string') test._exitCode = 1
            });
        })(t);
        
        results.push(t);
        return t;
    };
    test._results = results;
    
    test._tests = [];
    
    test.createStream = function (opts) {
        return results.createStream(opts);
    };

    test.onFinish = function (cb) {
        results.on('done', cb);
    };
    
    var only = false;
    test.only = function (name) {
        if (only) throw new Error('there can only be one only test');
        results.only(name);
        only = true;
        return test.apply(null, arguments);
    };
    test._exitCode = 0;
    
    test.close = function () { results.close() };
    
    return test;
}

}).call(this,require('_process'))
},{"./lib/default_stream":61,"./lib/results":62,"./lib/test":63,"_process":39,"defined":14,"through":64}],61:[function(require,module,exports){
(function (process){
var through = require('through');
var fs = require('fs');

module.exports = function () {
    var line = '';
    var stream = through(write, flush);
    return stream;
    
    function write (buf) {
        for (var i = 0; i < buf.length; i++) {
            var c = typeof buf === 'string'
                ? buf.charAt(i)
                : String.fromCharCode(buf[i])
            ;
            if (c === '\n') flush();
            else line += c;
        }
    }
    
    function flush () {
        if (fs.writeSync && /^win/.test(process.platform)) {
            try { fs.writeSync(1, line + '\n'); }
            catch (e) { stream.emit('error', e) }
        }
        else {
            try { console.log(line) }
            catch (e) { stream.emit('error', e) }
        }
        line = '';
    }
};

}).call(this,require('_process'))
},{"_process":39,"fs":5,"through":64}],62:[function(require,module,exports){
(function (process){
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
var through = require('through');
var resumer = require('resumer');
var inspect = require('object-inspect');
var bind = require('function-bind');
var has = require('has');
var regexpTest = bind.call(Function.call, RegExp.prototype.test);
var yamlIndicators = /\:|\-|\?/;
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = Results;
inherits(Results, EventEmitter);

function Results () {
    if (!(this instanceof Results)) return new Results;
    this.count = 0;
    this.fail = 0;
    this.pass = 0;
    this._stream = through();
    this.tests = [];
}

Results.prototype.createStream = function (opts) {
    if (!opts) opts = {};
    var self = this;
    var output, testId = 0;
    if (opts.objectMode) {
        output = through();
        self.on('_push', function ontest (t, extra) {
            if (!extra) extra = {};
            var id = testId++;
            t.once('prerun', function () {
                var row = {
                    type: 'test',
                    name: t.name,
                    id: id
                };
                if (has(extra, 'parent')) {
                    row.parent = extra.parent;
                }
                output.queue(row);
            });
            t.on('test', function (st) {
                ontest(st, { parent: id });
            });
            t.on('result', function (res) {
                res.test = id;
                res.type = 'assert';
                output.queue(res);
            });
            t.on('end', function () {
                output.queue({ type: 'end', test: id });
            });
        });
        self.on('done', function () { output.queue(null) });
    }
    else {
        output = resumer();
        output.queue('TAP version 13\n');
        self._stream.pipe(output);
    }
    
    nextTick(function next() {
        var t;
        while (t = getNextTest(self)) {
            t.run();
            if (!t.ended) return t.once('end', function(){ nextTick(next); });
        }
        self.emit('done');
    });
    
    return output;
};

Results.prototype.push = function (t) {
    var self = this;
    self.tests.push(t);
    self._watch(t);
    self.emit('_push', t);
};

Results.prototype.only = function (name) {
    this._only = name;
};

Results.prototype._watch = function (t) {
    var self = this;
    var write = function (s) { self._stream.queue(s) };
    t.once('prerun', function () {
        write('# ' + t.name + '\n');
    });
    
    t.on('result', function (res) {
        if (typeof res === 'string') {
            write('# ' + res + '\n');
            return;
        }
        write(encodeResult(res, self.count + 1));
        self.count ++;

        if (res.ok) self.pass ++
        else self.fail ++
    });
    
    t.on('test', function (st) { self._watch(st) });
};

Results.prototype.close = function () {
    var self = this;
    if (self.closed) self._stream.emit('error', new Error('ALREADY CLOSED'));
    self.closed = true;
    var write = function (s) { self._stream.queue(s) };
    
    write('\n1..' + self.count + '\n');
    write('# tests ' + self.count + '\n');
    write('# pass  ' + self.pass + '\n');
    if (self.fail) write('# fail  ' + self.fail + '\n')
    else write('\n# ok\n')

    self._stream.queue(null);
};

function encodeResult (res, count) {
    var output = '';
    output += (res.ok ? 'ok ' : 'not ok ') + count;
    output += res.name ? ' ' + res.name.toString().replace(/\s+/g, ' ') : '';
    
    if (res.skip) output += ' # SKIP';
    else if (res.todo) output += ' # TODO';
    
    output += '\n';
    if (res.ok) return output;
    
    var outer = '  ';
    var inner = outer + '  ';
    output += outer + '---\n';
    output += inner + 'operator: ' + res.operator + '\n';
    
    if (has(res, 'expected') || has(res, 'actual')) {
        var ex = inspect(res.expected, {depth: res.objectPrintDepth});
        var ac = inspect(res.actual, {depth: res.objectPrintDepth});
        
        if (Math.max(ex.length, ac.length) > 65 || invalidYaml(ex) || invalidYaml(ac)) {
            output += inner + 'expected: |-\n' + inner + '  ' + ex + '\n';
            output += inner + 'actual: |-\n' + inner + '  ' + ac + '\n';
        }
        else {
            output += inner + 'expected: ' + ex + '\n';
            output += inner + 'actual:   ' + ac + '\n';
        }
    }
    if (res.at) {
        output += inner + 'at: ' + res.at + '\n';
    }
    if (res.operator === 'error' && res.actual && res.actual.stack) {
        var lines = String(res.actual.stack).split('\n');
        output += inner + 'stack: |-\n';
        for (var i = 0; i < lines.length; i++) {
            output += inner + '  ' + lines[i] + '\n';
        }
    }
    
    output += outer + '...\n';
    return output;
}

function getNextTest (results) {
    if (!results._only) {
        return results.tests.shift();
    }
    
    do {
        var t = results.tests.shift();
        if (!t) continue;
        if (results._only === t.name) {
            return t;
        }
    } while (results.tests.length !== 0)
}

function invalidYaml (str) {
    return regexpTest(yamlIndicators, str);
}

}).call(this,require('_process'))
},{"_process":39,"events":23,"function-bind":26,"has":28,"inherits":30,"object-inspect":34,"resumer":51,"through":64}],63:[function(require,module,exports){
(function (process,__dirname){
var deepEqual = require('deep-equal');
var defined = require('defined');
var path = require('path');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var has = require('has');
var trim = require('string.prototype.trim');

module.exports = Test;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;
var safeSetTimeout = setTimeout;

inherits(Test, EventEmitter);

var getTestArgs = function (name_, opts_, cb_) {
    var name = '(anonymous)';
    var opts = {};
    var cb;

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var t = typeof arg;
        if (t === 'string') {
            name = arg;
        }
        else if (t === 'object') {
            opts = arg || opts;
        }
        else if (t === 'function') {
            cb = arg;
        }
    }
    return { name: name, opts: opts, cb: cb };
};

function Test (name_, opts_, cb_) {
    if (! (this instanceof Test)) {
        return new Test(name_, opts_, cb_);
    }

    var args = getTestArgs(name_, opts_, cb_);

    this.readable = true;
    this.name = args.name || '(anonymous)';
    this.assertCount = 0;
    this.pendingCount = 0;
    this._skip = args.opts.skip || false;
    this._timeout = args.opts.timeout;
    this._objectPrintDepth = args.opts.objectPrintDepth || 5;
    this._plan = undefined;
    this._cb = args.cb;
    this._progeny = [];
    this._ok = true;

    for (var prop in this) {
        this[prop] = (function bind(self, val) {
            if (typeof val === 'function') {
                return function bound() {
                    return val.apply(self, arguments);
                };
            }
            else return val;
        })(this, this[prop]);
    }
}

Test.prototype.run = function () {
    if (this._skip) {
        this.comment('SKIP ' + this.name);
    }
    if (!this._cb || this._skip) {
        return this._end();
    }
    if (this._timeout != null) {
        this.timeoutAfter(this._timeout);
    }
    this.emit('prerun');
    this._cb(this);
    this.emit('run');
};

Test.prototype.test = function (name, opts, cb) {
    var self = this;
    var t = new Test(name, opts, cb);
    this._progeny.push(t);
    this.pendingCount++;
    this.emit('test', t);
    t.on('prerun', function () {
        self.assertCount++;
    })
    
    if (!self._pendingAsserts()) {
        nextTick(function () {
            self._end();
        });
    }
    
    nextTick(function() {
        if (!self._plan && self.pendingCount == self._progeny.length) {
            self._end();
        }
    });
};

Test.prototype.comment = function (msg) {
    var that = this;
    trim(msg).split('\n').forEach(function (aMsg) {
        that.emit('result', trim(aMsg).replace(/^#\s*/, ''));
    });
};

Test.prototype.plan = function (n) {
    this._plan = n;
    this.emit('plan', n);
};

Test.prototype.timeoutAfter = function(ms) {
    if (!ms) throw new Error('timeoutAfter requires a timespan');
    var self = this;
    var timeout = safeSetTimeout(function() {
        self.fail('test timed out after ' + ms + 'ms');
        self.end();
    }, ms);
    this.once('end', function() {
        clearTimeout(timeout);
    });
}

Test.prototype.end = function (err) { 
    var self = this;
    if (arguments.length >= 1 && !!err) {
        this.ifError(err);
    }
    
    if (this.calledEnd) {
        this.fail('.end() called twice');
    }
    this.calledEnd = true;
    this._end();
};

Test.prototype._end = function (err) {
    var self = this;
    if (this._progeny.length) {
        var t = this._progeny.shift();
        t.on('end', function () { self._end() });
        t.run();
        return;
    }
    
    if (!this.ended) this.emit('end');
    var pendingAsserts = this._pendingAsserts();
    if (!this._planError && this._plan !== undefined && pendingAsserts) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount
        });
    }
    this.ended = true;
};

Test.prototype._exit = function () {
    if (this._plan !== undefined &&
        !this._planError && this.assertCount !== this._plan) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount,
            exiting : true
        });
    }
    else if (!this.ended) {
        this.fail('test exited without ending', {
            exiting: true
        });
    }
};

Test.prototype._pendingAsserts = function () {
    if (this._plan === undefined) {
        return 1;
    }
    else {
        return this._plan - (this._progeny.length + this.assertCount);
    }
};

Test.prototype._assert = function assert (ok, opts) {
    var self = this;
    var extra = opts.extra || {};
    
    var res = {
        id : self.assertCount ++,
        ok : Boolean(ok),
        skip : defined(extra.skip, opts.skip),
        name : defined(extra.message, opts.message, '(unnamed assert)'),
        operator : defined(extra.operator, opts.operator),
        objectPrintDepth : self._objectPrintDepth
    };
    if (has(opts, 'actual') || has(extra, 'actual')) {
        res.actual = defined(extra.actual, opts.actual);
    }
    if (has(opts, 'expected') || has(extra, 'expected')) {
        res.expected = defined(extra.expected, opts.expected);
    }
    this._ok = Boolean(this._ok && ok);
    
    if (!ok) {
        res.error = defined(extra.error, opts.error, new Error(res.name));
    }
    
    if (!ok) {
        var e = new Error('exception');
        var err = (e.stack || '').split('\n');
        var dir = path.dirname(__dirname) + '/';
        
        for (var i = 0; i < err.length; i++) {
            var m = /^[^\s]*\s*\bat\s+(.+)/.exec(err[i]);
            if (!m) {
                continue;
            }
            
            var s = m[1].split(/\s+/);
            var filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[1]);
            if (!filem) {
                filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[2]);
                
                if (!filem) {
                    filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[3]);

                    if (!filem) {
                        continue;
                    }
                }
            }
            
            if (filem[1].slice(0, dir.length) === dir) {
                continue;
            }
            
            res.functionName = s[0];
            res.file = filem[1];
            res.line = Number(filem[2]);
            if (filem[3]) res.column = filem[3];
            
            res.at = m[1];
            break;
        }
    }

    self.emit('result', res);
    
    var pendingAsserts = self._pendingAsserts();
    if (!pendingAsserts) {
        if (extra.exiting) {
            self._end();
        } else {
            nextTick(function () {
                self._end();
            });
        }
    }
    
    if (!self._planError && pendingAsserts < 0) {
        self._planError = true;
        self.fail('plan != count', {
            expected : self._plan,
            actual : self._plan - pendingAsserts
        });
    }
};

Test.prototype.fail = function (msg, extra) {
    this._assert(false, {
        message : msg,
        operator : 'fail',
        extra : extra
    });
};

Test.prototype.pass = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'pass',
        extra : extra
    });
};

Test.prototype.skip = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'skip',
        skip : true,
        extra : extra
    });
};

Test.prototype.ok
= Test.prototype['true']
= Test.prototype.assert
= function (value, msg, extra) {
    this._assert(value, {
        message : defined(msg, 'should be truthy'),
        operator : 'ok',
        expected : true,
        actual : value,
        extra : extra
    });
};

Test.prototype.notOk
= Test.prototype['false']
= Test.prototype.notok
= function (value, msg, extra) {
    this._assert(!value, {
        message : defined(msg, 'should be falsy'),
        operator : 'notOk',
        expected : false,
        actual : value,
        extra : extra
    });
};

Test.prototype.error
= Test.prototype.ifError
= Test.prototype.ifErr
= Test.prototype.iferror
= function (err, msg, extra) {
    this._assert(!err, {
        message : defined(msg, String(err)),
        operator : 'error',
        actual : err,
        extra : extra
    });
};

Test.prototype.equal
= Test.prototype.equals
= Test.prototype.isEqual
= Test.prototype.is
= Test.prototype.strictEqual
= Test.prototype.strictEquals
= function (a, b, msg, extra) {
    this._assert(a === b, {
        message : defined(msg, 'should be equal'),
        operator : 'equal',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notEqual
= Test.prototype.notEquals
= Test.prototype.notStrictEqual
= Test.prototype.notStrictEquals
= Test.prototype.isNotEqual
= Test.prototype.isNot
= Test.prototype.not
= Test.prototype.doesNotEqual
= Test.prototype.isInequal
= function (a, b, msg, extra) {
    this._assert(a !== b, {
        message : defined(msg, 'should not be equal'),
        operator : 'notEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.deepEqual
= Test.prototype.deepEquals
= Test.prototype.isEquivalent
= Test.prototype.same
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.deepLooseEqual
= Test.prototype.looseEqual
= Test.prototype.looseEquals
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notDeepEqual
= Test.prototype.notEquivalent
= Test.prototype.notDeeply
= Test.prototype.notSame
= Test.prototype.isNotDeepEqual
= Test.prototype.isNotDeeply
= Test.prototype.isNotEquivalent
= Test.prototype.isInequivalent
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should not be equivalent'),
        operator : 'notDeepEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.notDeepLooseEqual
= Test.prototype.notLooseEqual
= Test.prototype.notLooseEquals
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'notDeepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype['throws'] = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }

    var caught = undefined;

    try {
        fn();
    } catch (err) {
        caught = { error : err };
        var message = err.message;
        delete err.message;
        err.message = message;
    }

    var passed = caught;

    if (expected instanceof RegExp) {
        passed = expected.test(caught && caught.error);
        expected = String(expected);
    }

    if (typeof expected === 'function' && caught) {
        passed = caught.error instanceof expected;
        caught.error = caught.error.constructor;
    }

    this._assert(typeof fn === 'function' && passed, {
        message : defined(msg, 'should throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error: !passed && caught && caught.error,
        extra : extra
    });
};

Test.prototype.doesNotThrow = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }
    var caught = undefined;
    try {
        fn();
    }
    catch (err) {
        caught = { error : err };
    }
    this._assert(!caught, {
        message : defined(msg, 'should not throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error : caught && caught.error,
        extra : extra
    });
};

Test.skip = function (name_, _opts, _cb) {
    var args = getTestArgs.apply(null, arguments);
    args.opts.skip = true;
    return Test(args.name, args.opts, args.cb);
};

// vim: set softtabstop=4 shiftwidth=4:


}).call(this,require('_process'),"/node_modules/tape/lib")
},{"_process":39,"deep-equal":10,"defined":14,"events":23,"has":28,"inherits":30,"path":37,"string.prototype.trim":54}],64:[function(require,module,exports){
(function (process){
var Stream = require('stream')

// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through
through.through = through

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }

  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false)

  stream.write = function (data) {
    write.call(this, data)
    return !stream.paused
  }

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift()
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data)
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data === null) _ended = true
    buffer.push(data)
    drain()
    return stream
  }

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy()
      })
  })

  function _end () {
    stream.writable = false
    end.call(stream)
    if(!stream.readable && stream.autoDestroy)
      stream.destroy()
  }

  stream.end = function (data) {
    if(ended) return
    ended = true
    if(arguments.length) stream.write(data)
    _end() // will emit or queue
    return stream
  }

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true
    ended = true
    buffer.length = 0
    stream.writable = stream.readable = false
    stream.emit('close')
    return stream
  }

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true
    return stream
  }

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false
      stream.emit('resume')
    }
    drain()
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain')
    return stream
  }
  return stream
}


}).call(this,require('_process'))
},{"_process":39,"stream":52}],65:[function(require,module,exports){
(function (global){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],66:[function(require,module,exports){
module.exports={
  "author": "Spencer Kelly <spencermountain@gmail.com> (http://spencermounta.in)",
  "name": "nlp_compromise",
  "description": "natural language processing in the browser",
  "version": "7.0.0-alpha5",
  "main": "./builds/nlp_compromise.js",
  "repository": {
    "type": "git",
    "url": "git://github.com/nlp-compromise/nlp_compromise.git"
  },
  "scripts": {
    "test": "node ./scripts/test.js",
    "build": "node ./scripts/build.js",
    "demo": "node ./scripts/demo.js",
    "watch": "node ./scripts/watch.js",
    "filesize": "node ./scripts/filesize.js",
    "coverage": "node ./scripts/coverage.js"
  },
  "files": [
    "builds/",
    "src/"
  ],
  "dependencies": {
    "chalk": "^1.1.3"
  },
  "devDependencies": {
    "babel-preset-es2015": "6.9.0",
    "babel-preset-stage-2": "^6.11.0",
    "babelify": "7.3.0",
    "browserify": "13.0.1",
    "derequire": "^2.0.3",
    "eslint": "^3.1.1",
    "gaze": "^1.1.1",
    "http-server": "0.9.0",
    "jsdoc-parse": "^1.2.7",
    "nlp-corpus": "latest",
    "nyc": "^8.4.0",
    "shelljs": "^0.7.2",
    "tap-spec": "4.1.1",
    "tape": "4.6.0",
    "uglify-js": "2.7.0",
    "uglifyify": "^3.0.3"
  },
  "license": "MIT"
}

},{}],67:[function(require,module,exports){
//adjectives that either aren't covered by rules, or have superlative/comparative forms
//this list is the seed, from which various forms are conjugated
'use strict';
const fns = require('../fns');

//suffix-index adjectives
//  {cial:'cru,spe'} -> 'crucial', 'special'
let compressed = {
  going: 'easy,fore,on,out',
  ight: 'overn,overwe,r,sl,upt',
  ated: 'antiqu,intoxic,sophistic,unregul,unrel',
  rant: 'aber,exube,flag,igno,vib',
  wing: 'harro,kno,left-,right-',
  ted: 'expec,impor,limi,spiri,talen,tes,unexpec,unpreceden',
  ish: 'dan,fool,hell,lout,self,snobb,squeam,styl',
  ary: 'dre,legend,necess,prim,sc,second,w,we',
  ite: 'el,favor,fin,oppos,pet,pol,recond,tr',
  ely: 'hom,lik,liv,lon,lov,tim,unlik',
  tly: 'cos,ghas,ghos,nigh,sain,sprigh,unsigh',
  dly: 'cowar,cud,frien,frien,kin,ma',
  ble: 'a,dou,hum,nim,no,proba',
  rly: 'bu,disorde,elde,hou,neighbo,yea',
  ped: 'cram,pum,stereoty,stri,war',
  sed: 'clo,disea,distres,unsupervi,u',
  lly: 'chi,hi,jo,si,sme',
  per: 'dap,impro,pro,su,up',
  ile: 'fert,host,juven,mob,volat',
  led: 'detai,disgrunt,fab,paralle,troub',
  ast: 'e,l,p,steadf',
  ent: 'abs,appar,b,pres',
  ged: 'dama,deran,jag,rag',
  ded: 'crow,guar,retar,undeci',
  est: 'b,dishon,hon,quick',
  ial: 'colon,impart,init,part',
  ter: 'bet,lat,ou,ut',
  ond: 'bey,bl,vagab',
  ady: 'he,re,sh,ste',
  eal: 'ether,id,r,surr',
  ard: 'abo,awkw,stand,straightforw',
  ior: 'jun,pr,sen,super',
  ale: 'fem,m,upsc,wholes',
  ed: 'advanc,belov,craz,determin,hallow,hook,inbr,justifi,nak,nuanc,sacr,subdu,unauthoriz,unrecogniz,wick',
  ly: 'dai,deep,earth,gris,heaven,low,meas,melancho,month,oi,prick,seem,s,ug,unru,week,wi,woman',
  al: 'actu,coloss,glob,illeg,leg,leth,liter,loy,ov,riv,roy,univers,usu',
  dy: 'baw,bloo,clou,gau,gid,han,mol,moo,stur,ti,tren,unti,unwiel',
  se: 'adver,den,diver,fal,immen,inten,obe,perver,preci,profu',
  er: 'clev,form,inn,oth,ov,she,slend,somb,togeth,und',
  id: 'afra,hum,langu,plac,rab,sord,splend,stup,torp',
  re: 'awa,bizar,di,enti,macab,me,seve,since,spa',
  en: 'barr,brok,crav,op,sudd,unev,unwritt,wood',
  ic: 'alcohol,didact,gener,hispan,organ,publ,symbol',
  ny: 'ma,pho,pu,shi,skin,ti,za',
  st: 'again,mo,populi,raci,robu,uttermo',
  ne: 'do,go,insa,obsce,picayu,sere',
  nd: 'behi,bla,bli,profou,undergrou,wou',
  le: 'midd,multip,sing,so,subt,who',
  pt: 'abru,ade,a,bankru,corru,nondescri',
  ty: 'faul,hef,lof,mea,sal,uppi',
  sy: 'bu,chee,lou,no,ro',
  ct: 'abstra,exa,imperfe,inta,perfe',
  in: 'certa,highfalut,ma,tw,va',
  et: 'discre,secr,sovi,ups,viol',
  me: 'part-ti,pri,sa,supre,welco',
  cy: 'boun,fan,i,jui,spi',
  ry: 'fur,sor,tawd,wi,w',
  te: 'comple,concre,obsole,remo',
  ld: 'ba,bo,go,mi',
  an: 'deadp,republic,t,urb',
  ll: 'a,i,overa,sti',
  ay: 'everyd,g,gr,ok',
  or: 'indo,maj,min,outdo',
  my: 'foa,gloo,roo,sli',
  ck: 'ba,qua,si,sli',
  rt: 'cove,expe,hu,ove',
  ul: 'fo,gainf,helpf,painf'
};

let arr = [
  'ablaze',
  'above',
  'adult',
  'ahead',
  'aloof',
  'arab',
  'asleep',
  'average',
  'awake',
  'backwards',
  'bad',
  'blank',
  'bogus',
  'bottom',
  'brisk',
  'cagey',
  'chief',
  'civil',
  'common',
  'complex',
  'cozy',
  'crisp',
  'deaf',
  'devout',
  'difficult',
  'downtown',
  'due',
  'dumb',
  'eerie',
  'evil',
  'excess',
  'extra',
  'fake',
  'far',
  'faux',
  'fierce ',
  'final',
  'fit',
  'foreign',
  'fun',
  'good',
  'goofy',
  'gratis',
  'grey',
  'groovy',
  'gross',
  'half',
  'huge',
  'humdrum',
  'inside',
  'kaput',
  'left',
  'less',
  'level',
  'lewd',
  'magenta',
  'makeshift',
  'mammoth',
  'medium',
  'modern',
  'moot',
  'naive',
  'nearby',
  'next',
  'nonstop',
  'north',
  'notable',
  'offbeat',
  'ok',
  'outside',
  'overwrought',
  'premium',
  'pricey',
  'pro',
  'quaint',
  'random',
  'rear',
  'rebel',
  'ritzy',
  'rough',
  'savvy',
  'sexy',
  'shut',
  'shy',
  'sleek',
  'smug',
  'solemn',
  'south',
  'stark',
  'superb',
  'taboo',
  'teenage',
  'top',
  'tranquil',
  'true',
  'ultra',
  'understood',
  'unfair',
  'unknown',
  'upbeat',
  'upstairs',
  'vanilla',
  'various',
  'widespread',
  'woozy',
  'wrong'
];

module.exports = fns.uncompress_suffixes(arr, compressed);

},{"../fns":71}],68:[function(require,module,exports){
'use strict';
const fns = require('../fns');
//these are adjectives that can become comparative + superlative with out "most/more"
//its a whitelist for conjugation
//this data is shared between comparative/superlative methods

let compressed = {
  erate: 'degen,delib,desp,lit,mod',
  icial: 'artif,benef,off,superf',
  ntial: 'esse,influe,pote,substa',
  teful: 'gra,ha,tas,was',
  stant: 'con,di,in,resi',
  hing: 'astonis,das,far-reac,refres,scat,screec,self-loat,soot',
  eful: 'car,grac,peac,sham,us,veng',
  ming: 'alar,cal,glea,unassu,unbeco,upco',
  cial: 'commer,cru,finan,ra,so,spe',
  ure: 'insec,miniat,obsc,premat,sec,s',
  uent: 'congr,fl,freq,subseq',
  rate: 'accu,elabo,i,sepa',
  ific: 'horr,scient,spec,terr',
  rary: 'arbit,contempo,cont,tempo',
  ntic: 'authe,fra,giga,roma',
  nant: 'domi,malig,preg,reso',
  nent: 'emi,immi,perma,promi',
  iant: 'brill,def,g,luxur',
  ging: 'dama,encoura,han,lon',
  iate: 'appropr,immed,inappropr,intermed',
  rect: 'cor,e,incor,indi',
  zing: 'agoni,ama,appeti,free',
  ine: 'div,femin,genu,mascul,prist,rout',
  ute: 'absol,ac,c,m,resol',
  ern: 'east,north,south,st,west',
  tful: 'deligh,doub,fre,righ,though,wis',
  ant: 'abund,arrog,eleg,extravag,exult,hesit,irrelev,miscre,nonchal,obeis,observ,pl,pleas,redund,relev,reluct,signific,vac,verd',
  ing: 'absorb,car,coo,liv,lov,ly,menac,perplex,shock,stand,surpris,tell,unappeal,unconvinc,unend,unsuspect,vex,want',
  ate: 'adequ,delic,fortun,inadequ,inn,intim,legitim,priv,sed,ultim',
};
let arr = [
  'absurd',
  'aggressive',
  'alert',
  'alive',
  'angry',
  'attractive',
  'awesome',
  'beautiful',
  'big',
  'bitter',
  'black',
  'blue',
  'bored',
  'boring',
  'brash',
  'brave',
  'brief',
  'bright',
  'broad',
  'brown',
  'calm',
  'charming',
  'cheap',
  'check',
  'clean',
  'clear',
  'close',
  'cold',
  'cool',
  'cruel',
  'curly',
  'cute',
  'damp',
  'dangerous',
  'dark',
  'dead',
  'dear',
  'deep',
  'dirty',
  'drunk',
  'dry',
  'dull',
  'eager',
  'early',
  'easy',
  'efficient',
  'empty',
  'even',
  'extreme',
  'faint',
  'fair',
  'fanc',
  'fast',
  'fat',
  'feeble',
  'few',
  'fierce',
  'fine',
  'firm',
  'flat',
  'forgetful',
  'formal',
  'frail',
  'free',
  'fresh',
  'full',
  'funny',
  'gentle',
  'glad',
  'glib',
  'grand',
  'great',
  'green',
  'gruesome',
  'handsome',
  'happy',
  'hard',
  'harsh',
  'heavy',
  'high',
  'hollow',
  'hot',
  'hungry',
  'impolite',
  'important',
  'innocent',
  'intellegent',
  'interesting',
  'keen',
  'kind',
  'lame',
  'large',
  'late',
  'lean',
  'light',
  'little',
  'long',
  'loose',
  'loud',
  'low',
  'lucky',
  'lush',
  'macho',
  'mad',
  'mature',
  'mean',
  'meek',
  'mellow',
  'mundane',
  'narrow',
  'near',
  'neat',
  'new',
  'nice',
  'noisy',
  'normal',
  'odd',
  'old',
  'orange',
  'pale',
  'pink',
  'plain',
  'poor',
  'proud',
  'pure',
  'purple',
  'quick',
  'quiet',
  'rapid',
  'rare',
  'raw',
  'red',
  'rich',
  'ripe',
  'rotten',
  'round',
  'rude',
  'sad',
  'safe',
  'scarce',
  'scared',
  'shallow',
  'sharp',
  'short',
  'shrill',
  'simple',
  'slim',
  'slow',
  'small',
  'smart',
  'smooth',
  'soft',
  'solid',
  'soon',
  'sore',
  'sour',
  'square',
  'stale',
  'steep',
  'stiff',
  'straight',
  'strange',
  'strict',
  'strong',
  'sweet',
  'swift',
  'tall',
  'tame',
  'tart',
  'tender',
  'tense',
  'thick',
  'thin',
  'thirsty',
  'tight',
  'tired',
  'tough',
  'true',
  'vague',
  'vast',
  'vulgar',
  'warm',
  'weak',
  'weird',
  'wet',
  'white',
  'wide',
  'wild',
  'windy',
  'wise',
  'yellow',
  'young'
];

module.exports = fns.uncompress_suffixes(arr, compressed);

},{"../fns":71}],69:[function(require,module,exports){
'use strict';
//terms that are 'Date' term
let months = [
  'january',
  'february',
  // "march",  //ambig
  'april',
  // "may",   //ambig
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
  'jan',
  'feb',
  'mar',
  'apr',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
  'sept',
  'sep'
];

let days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
  'mon',
  'tues',
  'wed',
  'thurs',
  'fri',
  'sat',
  'sun'
];
//add plural eg.'mondays'
for (let i = 0; i <= 6; i++) {
  days.push(days[i] + 's');
}

let durations = [
  'millisecond',
  // 'second',
  'minute',
  'hour',
  'day',
  'week',
  'month',
  'year',
  'decade'
];
//add their plurals
let len = durations.length;
for (let i = 0; i < len; i++) {
  durations.push(durations[i]);
  durations.push(durations[i] + 's');
}
durations.push('century');
durations.push('centuries');
durations.push('seconds');

let relative = [
  'yesterday',
  'today',
  'tomorrow',
  // 'week',
  'weekend',
  'tonight'
];

module.exports = {
  days: days,
  months: months,
  durations: durations,
  relative: relative
};

},{}],70:[function(require,module,exports){
module.exports = [
  'all hallows eve',
  'all saints day',
  'all sts day',
  'april fools',
  'armistice day',
  'australia day',
  'bastille day',
  'boxing day',
  'canada day',
  'christmas',
  'christmas eve',
  'cinco de mayo',
  'emancipation day',
  'groundhog day',
  'halloween',
  '16 de septiembre',
  'dieciseis de septiembre',
  'grito de dolores',
  'all hallows eve',
  'day of the dead',
  'dia de muertos',
  'harvey milk day',
  'inauguration day',
  'independence day',
  'independents day',
  'juneteenth',
  'labour day',
  'national freedom day',
  'national nurses day',
  'new years',
  'new years eve',
  'purple heart day',
  'rememberance day',
  'rosa parks day',
  'saint andrews day',
  'saint patricks day',
  'saint stephens day',
  'saint valentines day',
  'st andrews day',
  'st patricks day',
  'st stephens day',
  'st valentines day ',
  'valentines day',
  'veterans day',
  'victoria day',
  'womens equality day',
  'xmas',
  // Fixed religious and cultural holidays
  // Catholic + Christian
  'epiphany',
  'orthodox christmas day',
  'orthodox new year',
  'assumption of mary',
  'all saints day',
  'all souls day',
  'feast of the immaculate conception',
  'feast of our lady of guadalupe',

  // Kwanzaa
  'kwanzaa',

  // Pagan / metal 🤘
  'imbolc',
  'beltaine',
  'lughnassadh',
  'samhain',
  'martin luther king day',
  'mlk day',
  'presidents day',
  'mardi gras',
  'tax day',
  'commonwealth day',
  'mothers day',
  'memorial day',
  'fathers day',
  'columbus day',
  'indigenous peoples day',
  'canadian thanksgiving',
  'election day',
  'thanksgiving',
  't-day',
  'turkey day',
  'black friday',
  'cyber monday',

  // Astronomical religious and cultural holidays
  // Catholic + Christian
  'ash wednesday',
  'palm sunday',
  'maundy thursday',
  'good friday',
  'holy saturday',
  'easter',
  'easter sunday',
  'easter monday',
  'orthodox good friday',
  'orthodox holy saturday',
  'orthodox easter',
  'orthodox easter monday',
  'ascension day',
  'pentecost',
  'whitsunday',
  'whit sunday',
  'whit monday',
  'trinity sunday',
  'corpus christi',
  'advent',

  // Jewish
  'tu bishvat',
  'tu bshevat',
  'purim',
  'passover',
  'yom hashoah',
  'lag baomer',
  'shavuot',
  'tisha bav',
  'rosh hashana',
  'yom kippur',
  'sukkot',
  'shmini atzeret',
  'simchat torah',
  'chanukah',
  'hanukkah',

  // Muslim
  'isra and miraj',
  'lailat al-qadr',
  'eid al-fitr',
  'id al-Fitr',
  'eid ul-Fitr',
  'ramadan',
  'eid al-adha',
  'muharram',
  'the prophets birthday',

  // Pagan / metal 🤘
  'ostara',
  'march equinox',
  'vernal equinox',
  'litha',
  'june solistice',
  'summer solistice',
  'mabon',
  'september equinox',
  'autumnal equinox',
  'yule',
  'december solstice',
  'winter solstice',

  // Additional important holidays
  'chinese new year',
  'diwali',
];

},{}],71:[function(require,module,exports){
'use strict';


//shallow-merge an object
exports.extendObj = (o, o2) => {
  Object.keys(o2).forEach((k) => {
    o[k] = o2[k];
  });
  return o;
};


//uncompress data in the adhoc compressed form {'ly':'kind,quick'}
exports.uncompress_suffixes = function(list, obj) {
  let keys = Object.keys(obj);
  let l = keys.length;
  for (let i = 0; i < l; i++) {
    const arr = obj[keys[i]].split(',');
    for (let i2 = 0; i2 < arr.length; i2++) {
      list.push(arr[i2] + keys[i]);
    }
  }
  return list;
};
//uncompress data in the adhoc compressed form {'over':'blown,kill'}
exports.uncompress_prefixes = function(list, obj) {
  let keys = Object.keys(obj);
  let l = keys.length;
  for (let i = 0; i < l; i++) {
    const arr = obj[keys[i]].split(',');
    for (let i2 = 0; i2 < arr.length; i2++) {
      list.push(keys[i] + arr[i2]);
    }
  }
  return list;
};

},{}],72:[function(require,module,exports){
'use strict';
//the data is all variously compressed and sorted
//this is just a helper file for the main file paths..
module.exports = {
  'firstnames': require('./people/firstnames'),
  'lastnames': require('./people/lastnames'),

  'currencies': require('./values/currencies'),
  'numbers': require('./values/numbers'),
  'ordinalMap': require('./values/ordinalMap'),
  'units': require('./values/units'),

  'dates': require('./dates/dates'),
  'holidays': require('./dates/holidays'),

  'professions': require('./nouns/professions'),
  'abbreviations': require('./nouns/abbreviations'),
  'demonyms': require('./nouns/demonyms'),
  'irregular_plurals': require('./nouns/irregular_plurals'),
  'places': require('./nouns/places'),
  'uncountables': require('./nouns/uncountables'),
  'nouns': require('./nouns/nouns'),

  'organizations': require('./organizations/organizations'),
  'sportsTeams': require('./organizations/sportsTeams'),
  'bands': require('./organizations/bands'),
  'orgWords': require('./organizations/orgWords'),

  'adjectives': require('./adjectives/adjectives'),
  'superlatives': require('./adjectives/convertable'),

  'irregular_verbs': require('./verbs/irregular_verbs'),
  'verbs': require('./verbs/verbs'),

  'misc': require('./misc/misc'),
};

},{"./adjectives/adjectives":67,"./adjectives/convertable":68,"./dates/dates":69,"./dates/holidays":70,"./misc/misc":77,"./nouns/abbreviations":79,"./nouns/demonyms":80,"./nouns/irregular_plurals":81,"./nouns/nouns":82,"./nouns/places":83,"./nouns/professions":84,"./nouns/uncountables":85,"./organizations/bands":86,"./organizations/orgWords":87,"./organizations/organizations":88,"./organizations/sportsTeams":89,"./people/firstnames":92,"./people/lastnames":93,"./values/currencies":95,"./values/numbers":96,"./values/ordinalMap":97,"./values/units":98,"./verbs/irregular_verbs":99,"./verbs/verbs":101}],73:[function(require,module,exports){
'use strict';
//a lexicon is a giant object of known words
const data = require('./index');
const fns = require('./fns');
const fastConjugate = require('../term/verb/conjugate/faster');
const toPlural = require('../term/noun/inflect/toPlural');
const adj = {
  toNoun: require('../term/adjective/toNoun'),
  toSuperlative: require('../term/adjective/toSuperlative'),
  toComparative: require('../term/adjective/toComparative'),
  toAdverb: require('../term/adjective/toAdverb')
};

// console.time('lexicon');
let lexicon = {};

const addObj = (o) => {
  fns.extendObj(lexicon, o);
};
const addArr = (arr, tag) => {
  const l = arr.length;
  for (let i = 0; i < l; i++) {
    lexicon[arr[i]] = tag;
  }
};

//let a rip
let units = data.units.words.filter((s) => s.length > 1);
addArr(units, 'Unit');
addArr(data.dates.durations, 'Duration');

addObj(data.abbreviations);
//number-words are well-structured
let obj = data.numbers.ordinal;
addArr(Object.keys(obj.ones), 'Ordinal');
addArr(Object.keys(obj.teens), 'Ordinal');
addArr(Object.keys(obj.tens), 'Ordinal');
addArr(Object.keys(obj.multiples), 'Ordinal');
obj = data.numbers.cardinal;
addArr(Object.keys(obj.ones), 'Cardinal');
addArr(Object.keys(obj.teens), 'Cardinal');
addArr(Object.keys(obj.tens), 'Cardinal');
addArr(Object.keys(obj.multiples), 'Cardinal');
addArr(Object.keys(data.numbers.prefixes), 'Cardinal');
//singular/plural
addArr(Object.keys(data.irregular_plurals.toPlural), 'Singular');
addArr(Object.keys(data.irregular_plurals.toSingle), 'Plural');

//dates are well-structured
addArr(data.dates.days, 'WeekDay');
addArr(data.dates.months, 'Month');
addArr(data.dates.relative, 'RelativeDay');
addArr(data.holidays, 'Holiday');

addArr(data.professions, 'Actor'); //?
addArr(data.demonyms, 'Demonym');
addArr(data.sportsTeams, 'SportsTeam');
addArr(data.bands, 'Organization');
addArr(data.orgWords, 'Noun');

//irregular verbs
Object.keys(data.irregular_verbs).forEach((k) => {
  lexicon[k] = 'Infinitive';
  let conj = data.irregular_verbs[k];
  Object.keys(conj).forEach((k2) => {
    if (conj[k2]) {
      lexicon[conj[k2]] = k2;
    }
  });
});

//conjugate verblist
const wantVerbs = [
  'PastTense',
  'PresentTense',
  'Infinitive',
  'Gerund',
  'Actor',
  'Adjective'
];
data.verbs.forEach((v) => {
  let o = fastConjugate(v);
  wantVerbs.forEach((k) => {
    if (o[k] && !lexicon[o[k]]) {
      lexicon[o[k]] = k;
    }
  });
});

//conjugate adjectives
data.superlatives.forEach((a) => {
  lexicon[adj.toNoun(a)] = 'Noun';
  lexicon[adj.toAdverb(a)] = 'Adverb';
  lexicon[adj.toSuperlative(a)] = 'Superlative';
  lexicon[adj.toComparative(a)] = 'Comparative';
});

//inflect nouns
data.nouns.forEach((n) => {
  lexicon[n] = 'Singular';
  let plural = toPlural(n);
  lexicon[plural] = 'Plural';
});

//let a rip.
addArr(data.verbs, 'Verb');
addObj(data.firstnames);
addArr(data.lastnames, 'LastName');
addArr(data.places.airports, 'Place');
addArr(data.places.cities, 'City');
addArr(data.places.countries, 'Country');
addArr(data.uncountables, 'Noun');
addArr(data.organizations, 'Organization');
addArr(data.adjectives, 'Adjective');
addArr(data.superlatives, 'Adjective');
addArr(data.currencies, 'Currency');
//these ad-hoc manual ones have priority
addObj(data.misc);


//for safety (these are sneaky)
delete lexicon[''];
delete lexicon[' '];
delete lexicon[null];
module.exports = lexicon;

// console.log(lexicon['muller']);
// let t = new Term('shake');
// t.tag.Verb = true;
// console.log(t.verb.conjugate())
// console.timeEnd('lexicon');

},{"../term/adjective/toAdverb":181,"../term/adjective/toComparative":182,"../term/adjective/toNoun":183,"../term/adjective/toSuperlative":184,"../term/noun/inflect/toPlural":201,"../term/verb/conjugate/faster":214,"./fns":71,"./index":72}],74:[function(require,module,exports){
module.exports = [
  // 'now',
  'a lot',
  'a posteriori',
  'abroad',
  'ad nauseam',
  'again',
  'all but',
  'all that',
  'almost',
  'alone',
  'already',
  'also',
  'always',
  'anymore',
  'anyway',
  'apart',
  'aside',
  'at best',
  'at large',
  'at least',
  'at most',
  'at worst',
  'away',
  'by far',
  'by now',
  'damn',
  'de jure',
  'de trop',
  'directly',
  'en masse',
  'ever',
  'for example',
  'for good',
  'for sure',
  'forever',
  'further',
  'furthermore',
  'hence',
  'indeed',
  'instead',
  'just',
  'just about',
  'kinda',
  'maybe',
  'meanwhile',
  'more',
  'moreover',
  'newly',
  'no longer',
  'not withstanding',
  'of course',
  'often',
  'once',
  'once again',
  'once more',
  'only',
  'par excellence',
  'per se',
  'perhaps',
  'point blank',
  'quite',
  'randomly',
  'rather',
  'really',
  'several',
  'so',
  'somehow',
  'sometimes',
  'somewhat',
  'soon',
  'sort of',
  'such',
  'then',
  'thus',
  'too',
  'totally',
  'toward',
  'twice',
  'up to',
  'upwards of',
  'very',
  'way',
  'well',
  'yes'
];

},{}],75:[function(require,module,exports){
module.exports = [
  'this',
  'any',
  'enough',
  'each',
  'whatever',
  'every',
  'these',
  'another',
  'plenty',
  'whichever',
  'neither',
  'an',
  'a',
  'least',
  'own',
  'few',
  'both',
  'those',
  'the',
  'that',
  'various',
  'either',
  'much',
  'some',
  'else',
  //some other languages (what could go wrong?)
  'la',
  'le',
  'les',
  'des',
  'de',
  'du',
  'el'
];

},{}],76:[function(require,module,exports){
module.exports = [
  'uh',
  'uhh',
  'uh huh',
  'uh-oh',
  'please',
  'ugh',
  'sheesh',
  'eww',
  'pff',
  'voila',
  'oy',
  'hi',
  'hello',
  'bye',
  'goodbye',
  'hey',
  'hai',
  'eep',
  'hurrah',
  'yuck',
  'ow',
  'duh',
  'oh',
  'hmm',
  'yeah',
  'whoa',
  'ooh',
  'whee',
  'ah',
  'bah',
  'gah',
  'yaa',
  'phew',
  'gee',
  'ahem',
  'eek',
  'meh',
  'yahoo',
  'oops',
  'd\'oh',
  'psst',
  'argh',
  'grr',
  'nah',
  'shhh',
  'whew',
  'mmm',
  'ooo',
  'yay',
  'uh-huh',
  'boo',
  'wow',
  'nope',
  'haha',
  'hahaha',
  'lol',
  'lols',
  'ya',
  'hee',
  'ohh',
  'eh',
  'yup',
  'et cetera',
  'a la'
];

},{}],77:[function(require,module,exports){
'use strict';

const misc = {
  'here': 'Noun',
  'better': 'Comparative',
  'earlier': 'Superlative',
  'make sure': 'Verb',
  'keep tabs': 'Verb',
  'has': 'Verb',
  'sounds': 'PresentTense',
  //special case for took/taken
  'taken': 'PastTense',
  'msg': 'Verb', //slang
  'a few': 'Value', //different than 'few people'
  'years old': 'Unit', //special case
  'not': 'Negative',
  'never': 'Negative',
  'no': 'Negative',
  'no doubt': 'Noun',
  'not only': 'Adverb'
};

const compact = {
  Adjective: [
    'so called', //?
    'on board',
    'vice versa',
    'en route',
    'upside down',
    'up front',
    'in front',
    'in situ',
    'in vitro',
    'ad hoc',
    'de facto',
    'ad infinitum',
    'for keeps',
    'a priori',
    'off guard',
    'spot on',
    'ipso facto',
    'fed up',
    'brand new',
    'old fashioned',
    'bona fide',
    'well off',
    'far off',
    'straight forward',
    'hard up',
    'sui generis',
    'en suite',
    'avant garde',
    'sans serif',
    'gung ho',
    'super duper'
  ],

  Place: [
    'new england',
    'new hampshire',
    'new jersey',
    'new mexico',
    'united states',
    'united kingdom',
    'great britain',
    'great lakes',
    'pacific ocean',
    'atlantic ocean',
    'indian ocean',
    'arctic ocean',
    'antarctic ocean',
    'everglades',
  ],
  //conjunctions
  'Conjunction': [
    'yet',
    'therefore',
    'or',
    'while',
    'nor',
    'whether',
    'though',
    'because',
    'cuz',
    'but',
    'for',
    'and',
    'however',
    'before',
    'although',
    'how',
    'plus',
    'versus',
    'otherwise',
  // 'not'
  ],
  Time: [
    //date
    'noon',
    'midnight',
    'now',
    'morning',
    'evening',
    'afternoon',
    'night',
    'breakfast time',
    'lunchtime',
    'dinnertime',
    'ago',
    'sometime',
    'eod',
    'oclock',
  ],
  Date: [
    //end of day, end of month
    'eom',
    'standard time',
    'daylight time',
  ],
  'Condition': [
    'if',
    'unless',
    'notwithstanding'
  ],

  'PastTense': [
    'said',
    'had',
    'been',
    'began',
    'came',
    'did',
    'meant',
    'went'
  ],

  'Verb': [
    'given',
    'known',
    'shown',
    'seen',
    'born'
  ],

  'Gerund': [
    'going',
    'being',
    'according',
    'resulting',
    'developing',
    'staining'
  ],

  'Copula': [
    'is',
    'are',
    'was',
    'were',
    'am'
  ],

  //determiners
  'Determiner': require('./determiners'),

  //prepositions
  'Preposition': require('./prepositions'),

  //modal verbs
  'Modal': [
    'can',
    'may',
    'could',
    'might',
    'will',
    'ought to',
    'would',
    'must',
    'shall',
    'should',
    'ought',
    'shant',
    'lets', //arguable
  ],

  //Possessive pronouns
  'Possessive': [
    'mine',
    'something',
    'none',
    'anything',
    'anyone',
    'theirs',
    'himself',
    'ours',
    'his',
    'my',
    'their',
    'yours',
    'your',
    'our',
    'its',
    'herself',
    'hers',
    'themselves',
    'myself',
    'her', //this one is check ambiguous
  ],

  //personal pronouns (nouns)
  'Pronoun': [
    'it',
    'they',
    'i',
    'them',
    'you',
    'she',
    'me',
    'he',
    'him',
    'ourselves',
    'us',
    'we',
    'thou',
    'il',
    'elle',
    'yourself',
    '\'em',
    'he\'s',
    'she\'s'
  ],
  //questions are awkward pos. are clarified in question_pass
  'QuestionWord': [
    'where',
    'why',
    'when',
    'who',
    'whom',
    'whose',
    'what',
    'which'
  ],
  //some manual adverbs (the rest are generated)
  'Adverb': require('./adverbs'),

  //interjections, expressions
  'Expression': require('./expressions'),

  //family-terms are people
  Person: [
    'father',
    'mother',
    'mom',
    'dad',
    'mommy',
    'daddy',
    'sister',
    'brother',
    'aunt',
    'uncle',
    'grandfather',
    'grandmother',
    'cousin',
    'stepfather',
    'stepmother',
    'boy',
    'girl',
    'man',
    'woman',
    'guy',
    'dude',
    'bro',
    'gentleman',
    'someone'
  ]
};
//unpack the compact terms into the misc lexicon..
const keys = Object.keys(compact);
for (let i = 0; i < keys.length; i++) {
  const arr = compact[keys[i]];
  for (let i2 = 0; i2 < arr.length; i2++) {
    misc[arr[i2]] = keys[i];
  }
}
module.exports = misc;

},{"./adverbs":74,"./determiners":75,"./expressions":76,"./prepositions":78}],78:[function(require,module,exports){
module.exports = [
  '\'o',
  'a\'',
  'about',
  'across',
  'after',
  'along',
  'amid',
  'amidst',
  'among',
  'amongst',
  'apropos',
  'around',
  'as',
  'as long as',
  'at',
  'atop',
  'barring',
  'below',
  'besides',
  'between',
  'by',
  'chez',
  'circa',
  'despite',
  'down',
  'during',
  'except',
  'from',
  'in',
  'into',
  'just like',
  'mid',
  'midst',
  'notwithstanding',
  'o\'',
  'of',
  'off',
  'on',
  'onto',
  'out',
  'per',
  'qua',
  'sans',
  'since',
  'so that',
  'than',
  'through',
  'throughout',
  'thru',
  'till',
  'to',
  'towards',
  'unlike',
  'until',
  'up',
  'upon',
  'versus',
  'via',
  'vis-a-vis',
  'w/o',
  'whereas',
  'with',
  'within',
  'without',
  '-' //june - july
];

},{}],79:[function(require,module,exports){
//these are common word shortenings used in the lexicon and sentence segmentation methods
//there are all nouns,or at the least, belong beside one.
'use strict';

//common abbreviations
let compact = {
  Noun: [
    'arc',
    'al',
    'exp',
    'fy',
    'pd',
    'pl',
    'plz',
    'tce',
    'bl',
    'ma',
    'ba',
    'lit',
    'ex',
    'eg',
    'ie',
    'ca',
    'cca',
    'vs',
    'etc',
    'esp',
    'ft',
    //these are too ambiguous
    'bc',
    'ad',
    'md',
    'corp',
    'col'
  ],
  Organization: [
    'dept',
    'univ',
    'assn',
    'bros',
    'inc',
    'ltd',
    'co',
    //proper nouns with exclamation marks
    'yahoo',
    'joomla',
    'jeopardy'
  ],

  Place: [
    'rd',
    'st',
    'dist',
    'mt',
    'ave',
    'blvd',
    'cl',
    'ct',
    'cres',
    'hwy',
    //states
    'ariz',
    'cal',
    'calif',
    'colo',
    'conn',
    'fla',
    'fl',
    'ga',
    'ida',
    'ia',
    'kan',
    'kans',

    'minn',
    'neb',
    'nebr',
    'okla',
    'penna',
    'penn',
    'pa',
    'dak',
    'tenn',
    'tex',
    'ut',
    'vt',
    'va',
    'wis',
    'wisc',
    'wy',
    'wyo',
    'usafa',
    'alta',
    'ont',
    'que',
    'sask'
  ],

  Date: [
    'jan',
    'feb',
    'mar',
    'apr',
    'jun',
    'jul',
    'aug',
    'sep',
    'sept',
    'oct',
    'nov',
    'dec',
    'circa'
  ],

  //Honorifics
  Honorific: [
    'adj',
    'adm',
    'adv',
    'asst',
    'atty',
    'bldg',
    'brig',
    'capt',
    'cmdr',
    'comdr',
    'cpl',
    'det',
    'dr',
    'esq',
    'gen',
    'gov',
    'hon',
    'jr',
    'llb',
    'lt',
    'maj',
    'messrs',
    'mister',
    'mlle',
    'mme',
    'mr',
    'mrs',
    'ms',
    'mstr',
    'op',
    'ord',
    'phd',
    'prof',
    'pvt',
    'rep',
    'reps',
    'res',
    'rev',
    'sen',
    'sens',
    'sfc',
    'sgt',
    'sir',
    'sr',
    'supt',
    'surg'
  //miss
  //misses
  ]

};

//unpack the compact terms into the misc lexicon..
let abbreviations = {};
const keys = Object.keys(compact);
for (let i = 0; i < keys.length; i++) {
  const arr = compact[keys[i]];
  for (let i2 = 0; i2 < arr.length; i2++) {
    abbreviations[arr[i2]] = keys[i];
  }
}
module.exports = abbreviations;

},{}],80:[function(require,module,exports){
//adjectival forms of place names, as adjectives.
module.exports = [
  'afghan',
  'albanian',
  'algerian',
  'angolan',
  'argentine',
  'armenian',
  'australian',
  'aussie',
  'austrian',
  'bangladeshi',
  'basque', // of Basque Country
  'belarusian',
  'belgian',
  'bolivian',
  'bosnian',
  'brazilian',
  'bulgarian',
  'cambodian',
  'cameroonian',
  'canadian',
  'chadian',
  'chilean',
  'chinese',
  'colombian',
  'congolese',
  'croatian',
  'cuban',
  'czech',
  'dominican',
  'danish',
  'egyptian',
  'british',
  'estonian',
  'ethiopian',
  'ecuadorian',
  'finnish',
  'french',
  'gambian',
  'georgian',
  'german',
  'greek',
  'ghanaian',
  'guatemalan',
  'haitian',
  'hungarian',
  'honduran',
  'icelandic',
  'indian',
  'indonesian',
  'iranian',
  'iraqi',
  'irish',
  'israeli',
  'italian',
  'ivorian',  // of Ivory Coast
  'jamaican',
  'japanese',
  'jordanian',
  'kazakh',
  'kenyan',
  'korean',
  'kuwaiti',
  'lao',    // of Laos
  'latvian',
  'lebanese',
  'liberian',
  'libyan',
  'lithuanian',
  'namibian',
  'malagasy', // of Madagascar
  'macedonian',
  'malaysian',
  'mexican',
  'mongolian',
  'moroccan',
  'dutch',
  'nicaraguan',
  'nigerian', // of Nigeria
  'nigerien', // of Niger
  'norwegian',
  'omani',
  'panamanian',
  'paraguayan',
  'pakistani',
  'palestinian',
  'peruvian',
  'philippine',
  'filipino',
  'polish',
  'portuguese',
  'qatari',
  'romanian',
  'russian',
  'rwandan',
  'samoan',
  'saudi',
  'scottish',
  'senegalese',
  'serbian',
  'singaporean',
  'slovak',
  'somalian',
  'sudanese',
  'swedish',
  'swiss',
  'syrian',
  'taiwanese',
  'trinidadian',
  'thai',
  'tunisian',
  'turkmen',
  'ugandan',
  'ukrainian',
  'american',
  'hindi',
  'spanish',
  'venezuelan',
  'vietnamese',
  'welsh',
  'zambian',
  'zimbabwean',
  'english',
  'african',
  'european',
  'asian',
  'californian',
];

},{}],81:[function(require,module,exports){
//nouns with irregular plural/singular forms
//used in noun.inflect, and also in the lexicon.
//compressed with '_' to reduce some redundancy.
'use strict';
let main = [
  ['child', '_ren'],
  ['person', 'people'],
  ['leaf', 'leaves'],
  ['database', '_s'],
  ['quiz', '_zes'],
  ['stomach', '_s'],
  ['sex', '_es'],
  ['move', '_s'],
  ['shoe', '_s'],
  ['goose', 'geese'],
  ['phenomenon', 'phenomena'],
  ['barracks', '_'],
  ['deer', '_'],
  ['syllabus', 'syllabi'],
  ['index', 'indices'],
  ['appendix', 'appendices'],
  ['criterion', 'criteria'],
  ['man', 'men'],
  ['rodeo', '_s'],
  ['epoch', '_s'],
  ['zero', '_s'],
  ['avocado', '_s'],
  ['halo', '_s'],
  ['tornado', '_s'],
  ['tuxedo', '_s'],
  ['sombrero', '_s'],
  ['addendum', 'addenda'],
  ['alga', '_e'],
  ['alumna', '_e'],
  ['alumnus', 'alumni'],
  ['bacillus', 'bacilli'],
  ['cactus', 'cacti'],
  ['beau', '_x'],
  ['château', '_x'],
  ['chateau', '_x'],
  ['tableau', '_x'],
  ['corpus', 'corpora'],
  ['curriculum', 'curricula'],
  ['echo', '_es'],
  ['embargo', '_es'],
  ['foot', 'feet'],
  ['genus', 'genera'],
  ['hippopotamus', 'hippopotami'],
  ['larva', '_e'],
  ['libretto', 'libretti'],
  ['loaf', 'loaves'],
  ['matrix', 'matrices'],
  ['memorandum', 'memoranda'],
  ['mosquito', '_es'],
  ['opus', 'opera'],
  ['ovum', 'ova'],
  ['ox', '_en'],
  ['radius', 'radii'],
  ['referendum', 'referenda'],
  ['thief', 'thieves'],
  ['tooth', 'teeth']
];
//decompress it
main = main.map(function(a) {
  a[1] = a[1].replace('_', a[0]);
  return a;
});
//build-out two mappings
const toSingle = main.reduce((h, a) => {
  h[a[1]] = a[0];
  return h;
}, {});
const toPlural = main.reduce((h, a) => {
  h[a[0]] = a[1];
  return h;
}, {});

module.exports = {
  toSingle: toSingle,
  toPlural: toPlural
};

},{}],82:[function(require,module,exports){
//most nouns do not nead to be listed
//for whatever reasons, these look like not-nouns
//so make sure they become nouns
module.exports = [
  //double-consonant rule
  'egg',
  'bottle',
  'cottage',
  'kitty',
  'doggy',

  'ad hominem',
  'banking',
  'body',
  'breakfast',
  'ceiling',
  'city',
  'credit card',
  'death',
  'dinner',
  'door',
  'economy',
  'energy',
  'event',
  'everything',
  'example',
  'fl oz',
  'friend',
  'funding',
  'god',
  'grand slam',
  'head start',
  'home',
  'house',
  'lunch',
  'nothing',
  'number',
  'others',
  'part',
  'patent',
  'problem',
  'purpose',
  'room',
  'student',
  'stuff',
  'super bowl',
  'system',
  'there',
  'thing',
  'things',
  'tragedy',
  'us dollar',
  'world',
  'world series'
];

},{}],83:[function(require,module,exports){
'use strict';
const fns = require('../fns');

//uncompressed country names
let countries = [
  'bahamas',
  'bangladesh',
  'belgium',
  'brazil',
  'burkina faso',
  'burundi',
  'cape verde',
  'chile',
  'comoros',
  'congo-brazzaville',
  'cuba',
  'cote d\'ivoire',
  'denmark',
  'djibouti',
  'ecuador',
  'egypt',
  'el salvador',
  'fiji',
  'france',
  'germany',
  'greece',
  'guinea-bissau',
  'haiti',
  'honduras',
  'hungary',
  'iraq',
  'israel',
  'italy',
  'jamaica',
  'kenya',
  'kuwait',
  'laos',
  'lesotho',
  'libya',
  'luxembourg',
  'malawi',
  'mali',
  'malta',
  'mexico',
  'moldova',
  'morocco',
  'mozambique',
  'netherlands',
  'nicaragua',
  'niger',
  'panama',
  'peru',
  'solomon islands',
  'sri lanka',
  'suriname',
  'sweden',
  'timor-leste',
  'turkey',
  'u.s.a.',
  'united kingdom',
  'usa',
  'ussr',
  'vietnam',
  'yemen',
  'zimbabwe'
];
let compressed_countries = {
  istan: 'pak,uzbek,afghan,tajik,turkmen',
  ublic: 'czech rep,dominican rep,central african rep',
  uinea: 'g,papua new g,equatorial g',
  land: 'thai,po,switzer,fin,republic of ire,new zea,swazi,ice',
  ania: 'tanz,rom,maurit,lithu,alb',
  rica: 'ame,united states of ame,south af,costa ',
  mbia: 'colo,za,ga',
  eria: 'nig,alg,lib',
  nia: 'arme,macedo,slove,esto',
  sia: 'indone,rus,malay,tuni',
  ina: 'ch,argent,bosnia and herzegov',
  tan: 'kazakhs,kyrgyzs,bhu',
  ana: 'gh,botsw,guy',
  bia: 'saudi ara,ser,nami',
  lia: 'austra,soma,mongo',
  rea: 'south ko,north ko,erit',
  dan: 'su,south su,jor',
  ria: 'sy,aust,bulga',
  ia: 'ind,ethiop,cambod,boliv,slovak,georg,croat,latv',
  an: 'jap,ir,taiw,azerbaij,om',
  da: 'ugan,cana,rwan',
  us: 'belar,mauriti,cypr',
  al: 'nep,seneg,portug',
  in: 'spa,ben,bahra',
  go: 'dr con,to,trinidad-toba',
  la: 'venezue,ango,guatema',
  es: 'united stat,philippin,united arab emirat',
  on: 'camero,leban,gab',
  ar: 'myanm,madagasc,qat',
  ay: 'paragu,norw,urugu',
  ne: 'ukrai,sierra leo,palesti'
};
countries = fns.uncompress_suffixes(countries, compressed_countries);

/////uncomressed cities
let cities = [
  'aalborg',
  'abu dhabi',
  'ahmedabad',
  'almaty',
  'antwerp',
  'aqaba',
  'ashdod',
  'ashgabat',
  'athens',
  'auckland',
  'bogota',
  'brno',
  'brussels',
  'calgary',
  'cape town',
  'cebu',
  'cluj-napoca',
  'curitiba',
  'doha',
  'dushanbe',
  'espoo',
  'frankfurt',
  'genoa',
  'ghent',
  'giza',
  'graz',
  'guangzhou',
  'haifa',
  'hanoi',
  'helsinki',
  'ho chi minh',
  'homs',
  'iasi',
  'innsbruck',
  'i̇zmir',
  'jakarta',
  'kiev',
  'kingston',
  'klaipėda',
  'kobe',
  'kosice',
  'krakow',
  'la plata',
  'luxembourg',
  'medellín',
  'mexico',
  'miskolc',
  'montevideo',
  'montreal',
  'moscow',
  'nagoya',
  'nis',
  'odessa',
  'oslo',
  'ottawa',
  'palermo',
  'paris',
  'perth',
  'phnom penh',
  'phoenix',
  'port elizabeth',
  'poznan',
  'prague',
  'reykjavik',
  'riga',
  'rome',
  'rosario',
  'seville',
  'skopje',
  'stockholm',
  'stuttgart',
  'sydney',
  'tbilisi',
  'tegucigalpa',
  'the hague',
  'thessaloniki',
  'tokyo',
  'toulouse',
  'trondheim',
  'tunis',
  'turku',
  'utrecht',
  'vantaa',
  'vasteras',
  'warsaw',
  'winnipeg',
  'wroclaw',
  'zagreb',
  'zaragoza',
];

let suffix_compressed_cities = {
  burg: 'saint peters,yekaterin,ham,til,gothen,salz',
  ton: 'hous,edmon,welling,hamil',
  ion: 'hauts-bassins reg,nord reg,herakl',
  ana: 'hav,tir,ljublj',
  ara: 'guadalaj,ank,timișo',
  an: 'tehr,mil,durb,bus,tain,abidj,amm,yerev',
  ia: 'philadelph,brasíl,alexandr,pretor,valenc,sof,nicos',
  on: 'ly,lond,yang,inche,daeje,lisb',
  en: 'shenzh,eindhov,pils,copenhag,berg',
  ng: 'beiji,chittago,pyongya,kaohsiu,taichu',
  in: 'tianj,berl,tur,dubl,duned',
  es: 'los angel,nant,napl,buenos air,f',
  la: 'pueb,mani,barranquil,kampa,guatema',
  or: 'salvad,san salvad,ulan bat,marib',
  us: 'damasc,pirae,aarh,vilni',
  as: 'carac,patr,burg,kaun',
  va: 'craio,petah tik,gene,bratisla',
  ai: 'shangh,mumb,chenn,chiang m',
  ne: 'colog,melbour,brisba,lausan',
  er: 'manchest,vancouv,tangi',
  ka: 'dha,osa,banja lu',
  ro: 'rio de janei,sappo,cai',
  am: 'birmingh,amsterd,rotterd',
  ur: 'kuala lump,winterth,kopavog',
  ch: 'muni,zuri,christchur',
  na: 'barcelo,vien,var',
  ma: 'yokoha,li',
  ul: 'istanb,seo,kab',
  to: 'toron,qui,por',
  iv: 'khark,lv,tel av',
  sk: 'dnipropetrov,gdan,min'
};

cities = fns.uncompress_suffixes(cities, suffix_compressed_cities);

let prefix_compressed_cities = {
  'new ': 'delhi,york,taipei',
  san: 'a\'a,tiago, josé',
  ta: 'ipei,mpere,llinn,rtu',
  ba: 'ngalore,ngkok,ku,sel',
  li: 'verpool,ège,nz,massol',
  ma: 'rseille,ndalay,drid,lmo',
  be: 'rn,lgrade,irut',
  ka: 'rachi,raj,ndy',
  da: 'egu,kar,ugavpils',
  ch: 'icago,arleroi,ișinau',
  co: 'lombo,nstanta,rk',
  bu: 'rsa,charest,dapest'
};
cities = fns.uncompress_prefixes(cities, prefix_compressed_cities);

//some of the busiest airports in the world from
//https://www.world-airport-codes.com/world-top-30-airports.html
let airports = [
  'atl',
  'pek',
  'lhr',
  'hnd',
  'ord',
  'lax',
  'cdg',
  'dfw',
  'cgk',
  'dxb',
  'fra',
  'hkg',
  'den',
  'bkk',
  'ams',
  'jfk',
  'ist',
  'sfo',
  'clt',
  'las',
  'phx',
  'iax',
  'kul',
  'mia',
  'icn',
  'muc',
  'syd',
  'fco',
  'mco',
  'bcn',
  'yyz',
  'lgw',
  'phl',
];

module.exports = {
  countries: countries,
  cities: cities,
  airports: airports
};

},{"../fns":71}],84:[function(require,module,exports){
//professions 'lawyer' that aren't covered by verb.to_actor()

module.exports = [
  'accountant',
  'administrator',
  'advisor',
  'agent',
  'architect',
  'artist',
  'assistant',
  'attendant',
  'bricklayer',
  'butcher',
  'carpenter',
  'clerk',
  'deputy',
  'dietician',
  'engineer',
  'farmer',
  'firefighter',
  'fireman',
  'gardener',
  'getor',
  'hairdresser',
  'housekeeper',
  'instructor',
  'journalist',
  'lawyer',
  'mechanic',
  'minister',
  'musician',
  'nurse',
  'officer',
  'operator',
  'photographer',
  'plumber',
  'policeman',
  'politician',
  'practitioner',
  'president',
  'programmer',
  'psychologist',
  'receptionist',
  'researcher',
  'roofer',
  'sailor',
  'scientist',
  'secretary',
  'security guard',
  'soldier',
  'supervisor',
  'surgeon',
  'technician',
  'therapist'
];

},{}],85:[function(require,module,exports){
//common nouns that have no plural form. These are suprisingly rare
//used in noun.inflect(), and added as nouns in lexicon
module.exports = [
  'advice',
  'aircraft',
  'art',
  'baggage',
  'bass',
  'beef',
  'bison',
  'blood',
  'bread',
  'butter',
  'cake',
  'cash',
  'celcius',
  'chaos',
  'cheese',
  'chewing',
  'civics',
  'clothing',
  'coal',
  'coffee',
  'conduct',
  'confusion',
  'cotton',
  'currency',
  'economics',
  'education',
  'electricity',
  'enjoyment',
  'entertainment',
  'equipment',
  'ethics',
  'everybody',
  'everyone',
  'fahrenheit',
  'fiction',
  'fish',
  'flour',
  'food',
  'forgiveness',
  'fowl',
  'fruit',
  'fun',
  'furniture',
  'gold',
  'golf',
  'gossip',
  'grass',
  'ground',
  'gum',
  'gymnastics',
  'hair',
  'halibut',
  'happiness',
  'hertz',
  'history',
  'hockey',
  'homework',
  'honey',
  'hospitality',
  'ice',
  'impatience',
  'importance',
  'information',
  'itself',
  'jewelry',
  'justice',
  'kelvin',
  'knowledge',
  'laughter',
  'leather',
  'leisure',
  'lightning',
  'liquid',
  'literature',
  'luck',
  'luggage',
  'machinery',
  'mail',
  'mathematics',
  'measles',
  'meat',
  'milk',
  'mist',
  'money',
  'moose',
  'mumps',
  'music',
  'news',
  'noise',
  'oil',
  'oxygen',
  'paper',
  'patience',
  'peace',
  'peanut',
  'pepper',
  'petrol',
  'physics',
  'plastic',
  'pork',
  'power',
  'pressure',
  'progress',
  'rain',
  'recognition',
  'recreation',
  'relaxation',
  'research',
  'rice',
  'sadness',
  'safety',
  'salmon',
  'salt',
  'sand',
  'scenery',
  'series',
  'sheep',
  'shopping',
  'silk',
  'silver',
  'snow',
  'soap',
  'soccer',
  'softness',
  'space',
  'spacecraft',
  'species',
  'speed',
  'steam',
  'steel',
  'sugar',
  'sunshine',
  'tea',
  'tennis',
  'thunder',
  'time',
  'toothpaste',
  'traffic',
  'trouble',
  'trousers',
  'trout',
  'tuna',
  'vinegar',
  'violence',
  'warmth',
  'water',
  'weather',
  'wildlife',
  'wine',
  'wood',
  'wool'
];

},{}],86:[function(require,module,exports){
module.exports = [
  'abba',
  'ac/dc',
  'aerosmith',
  'bee gees',
  'coldplay',
  'creedence clearwater revival',
  'def leppard',
  'depeche mode',
  'destiny\'s child',
  'duran duran',
  'fleetwood mac',
  'green day',
  'guns n roses',
  'joy division',
  'metallica',
  'moody blues',
  'motley crue',
  'new kids on the block',
  'pink floyd',
  'r.e.m.',
  'radiohead',
  'red hot chili peppers',
  'sex pistols',
  'soundgarden',
  'spice girls',
  'the beach boys',
  'the beatles',
  'the black eyed peas',
  'the byrds',
  'the carpenters',
  'the guess who',
  'the hollies',
  'the rolling stones',
  'the smashing pumpkins',
  'the supremes',
  'the who',
  'thin lizzy',
  'u2',
  'van halen'
];

},{}],87:[function(require,module,exports){
//nouns that also signal the title of an unknown organization
//todo remove/normalize plural forms
module.exports = [
  'administration',
  'agence',
  'agences',
  'agencies',
  'agency',
  'aircraft',
  'airlines',
  'airways',
  'army',
  'assoc',
  'associates',
  'association',
  'assurance',
  'authority',
  'autorite',
  'aviation',
  'bank',
  'banque',
  'board',
  'boys',
  'brands',
  'brewery',
  'brotherhood',
  'brothers',
  'building society',
  'bureau',
  'cafe',
  'caisse',
  'capital',
  'care',
  'cathedral',
  'center',
  'central bank',
  'centre',
  'chemicals',
  'choir',
  'chronicle',
  'church',
  'circus',
  'clinic',
  'clinique',
  'club',
  'co',
  'coalition',
  'coffee',
  'collective',
  'college',
  'commission',
  'committee',
  'communications',
  'community',
  'company',
  'comprehensive',
  'computers',
  'confederation',
  'conference',
  'conseil',
  'consulting',
  'containers',
  'corporation',
  'corps',
  'council',
  'crew',
  'daily news',
  'data',
  'departement',
  'department',
  'department store',
  'departments',
  'design',
  'development',
  'directorate',
  'division',
  'drilling',
  'education',
  'eglise',
  'electric',
  'electricity',
  'energy',
  'ensemble',
  'enterprise',
  'enterprises',
  'entertainment',
  'estate',
  'etat',
  'evening news',
  'faculty',
  'federation',
  'financial',
  'fm',
  'foundation',
  'fund',
  'gas',
  'gazette',
  'general',
  'girls',
  'government',
  'group',
  'guild',
  'health authority',
  'herald',
  'holdings',
  'hospital',
  'hotel',
  'hotels',
  'inc',
  'industries',
  'institut',
  'institute',
  'institute of technology',
  'institutes',
  'insurance',
  'international',
  'interstate',
  'investment',
  'investments',
  'investors',
  'journal',
  'laboratory',
  'labs',
  'law',
  'liberation army',
  'limited',
  'local authority',
  'local health authority',
  'machines',
  'magazine',
  'management',
  'marine',
  'marketing',
  'markets',
  'media',
  'memorial',
  'mercantile exchange',
  'ministere',
  'ministry',
  'mobile',
  'motor',
  'motors',
  'musee',
  'museum',
  // 'network',
  'news',
  'news service',
  'observatory',
  'office',
  'oil',
  'optical',
  'orchestra',
  'organization',
  'partners',
  'partnership',
  // 'party',
  'people\'s party',
  'petrol',
  'petroleum',
  'pharmacare',
  'pharmaceutical',
  'pharmaceuticals',
  'pizza',
  'plc',
  'police',
  'polytechnic',
  'post',
  'power',
  'press',
  'productions',
  'quartet',
  'radio',
  'records',
  'regional authority',
  'regional health authority',
  'reserve',
  'resources',
  'restaurant',
  'restaurants',
  'savings',
  'school',
  'securities',
  'service',
  'services',
  'social club',
  'societe',
  'society',
  'sons',
  'standard',
  'state police',
  'state university',
  'stock exchange',
  'subcommittee',
  'syndicat',
  'systems',
  'technologies',
  'technology',
  'telecommunications',
  'telegraph',
  'television',
  'times',
  'tribunal',
  'tv',
  'union',
  'university',
  'utilities',
  'workers'
];

},{}],88:[function(require,module,exports){
'use strict';
//just a few named-organizations
//no acronyms needed. no product/brand pollution.
module.exports = [
  '20th century fox',
  '3m',
  '7-eleven',
  'abc',
  'academy of sciences',
  'acer',
  'activision',
  'adidas',
  'aig',
  'al qaeda',
  'al jazeera',
  'alcatel',
  'alcatel-lucent',
  'altair',
  'amc',
  'amd',
  'american express',
  'amt',
  'amtrak',
  'anheuser-busch',
  'aol',
  'apple computers',
  'applebee\'s',
  'arby\'s',
  'argos',
  'armco',
  'ashland oil',
  'associated press',
  'at&t',
  'avis',
  'avon',
  'ayer',
  'banana republic',
  'basf',
  'baskin robbins',
  'baxter',
  'bayer',
  'bbc',
  'bechtel',
  'ben & jerry\'s',
  'berkshire hathaway',
  'bf goodrich',
  'bfgoodrich',
  'black & decker',
  'blockbuster video',
  'bloomingdale',
  'blue cross',
  'bmw',
  'bni',
  'boeing',
  'bombardier',
  'boston globe',
  'boston pizza',
  'bp',
  'cadbury',
  'carl\'s jr',
  'cbc',
  'chevron',
  'chevy',
  'chick fil-a',
  'china daily',
  'cisco',
  'cisco systems',
  'citigroup',
  'cnn',
  'coca cola',
  'colgate',
  'comcast',
  'compaq',
  'coors',
  'costco',
  'craigslist',
  'daimler',
  'dell',
  'der spiegel',
  'disney',
  'dow jones',
  'dunkin donuts',
  'dupont',
  'ebay',
  'esa',
  'eu',
  'exxon mobil',
  'exxonmobil',
  'facebook',
  'fannie mae',
  'fedex',
  'fiat',
  'financial times',
  'firestone',
  'ford',
  'frito-lay',
  'g8',
  'general electric',
  'general motors',
  'glaxo smith kline',
  'glencore',
  'goldman sachs',
  'goodyear',
  'google',
  'gucci',
  'h & m',
  'hasbro',
  'hewlett-packard',
  'hitachi',
  'hizbollah',
  'home depot',
  'honda',
  'hsbc',
  'hyundai',
  'ibm',
  'ihop',
  'ing',
  'intel',
  'interpol',
  'itv',
  'jiffy lube',
  'johnson & johnson',
  'jpmorgan',
  'jpmorgan chase',
  'jsa',
  'katv',
  'kfc',
  'kkk',
  'kmart',
  'kodak',
  'l\'oreal',
  'la presse',
  'la-z-boy',
  'lenovo',
  'lexis',
  'lexmark',
  'lg',
  'little caesars',
  'mac\'s milk',
  'mattel',
  'mazda',
  'mcdonald\'s',
  'mcdonalds',
  'mercedes',
  'mercedes-benz',
  'microsoft',
  'mitas',
  'mitsubishi',
  'mlb',
  'mobil',
  'monsanto',
  'motel 6',
  'motorola',
  'mtv',
  'myspace',
  'nandos',
  'nascar',
  'nasdaq',
  'national academy of sciences',
  'nato',
  'natwest',
  'nba',
  'nbc',
  'nestle',
  'nestlé',
  'netflix',
  'new york times',
  'newsweek',
  'nfl',
  'nhl',
  'nhs',
  'nike',
  'nintendo',
  'nissan',
  'nokia',
  'notre dame',
  'novartis',
  'nwa',
  'old navy',
  'opec',
  'orange julius',
  'oxfam',
  'pan am',
  'panasonic',
  'panda express',
  'pbs',
  'pepsico',
  'petrobras',
  'petrochina',
  'petronas',
  'peugeot',
  'pfizer',
  'philip morris',
  'pizza hut',
  'premier oil',
  'procter & gamble',
  'prudential',
  'quantas',
  'quizno\'s',
  'rbc',
  'rbs',
  're/max',
  'readers digest',
  'red bull',
  'red cross',
  'red lobster',
  'revlon',
  'royal bank',
  'royal dutch shell',
  'ryanair',
  'safeway',
  'sainsbury\'s',
  'samsung',
  'sears',
  'siemens',
  'sony',
  'starbucks',
  'statoil',
  'subaru',
  't mobile',
  'taco bell',
  'td bank',
  'telefonica',
  'telus',
  'tesco',
  'tesla motors',
  'tgi fridays',
  'the daily mail',
  'tim hortons',
  'tmz',
  'toshiba',
  'toyota',
  'toys r us',
  'twitter',
  'ubs',
  'unesco',
  'unilever',
  'united nations',
  'ups',
  'usa today',
  'usps',
  'verizon',
  'vh1',
  'visa',
  'vodafone',
  'volkswagen',
  'volvo',
  'wal-mart',
  'walgreens',
  'wall street journal',
  'walmart',
  'warner bros',
  'wells fargo',
  'westfield',
  'westinghouse',
  'world trade organization',
  'yahoo!',
  'yamaha',
  'ymca',
  'youtube',
  'ywca'
];

},{}],89:[function(require,module,exports){
module.exports = [
  //mlb
  'washington nationals',
  'toronto blue jays',
  'texas rangers',
  'tampa bay rays',
  'st. louis cardinals',
  'seattle mariners',
  'san francisco giants',
  'san diego padres',
  'pittsburgh pirates',
  'philadelphia phillies',
  'oakland athletics',
  'new york yankees',
  'new york mets',
  'minnesota twins',
  'milwaukee brewers',
  'miami marlins',
  'los angeles dodgers',
  'kansas city royals',
  'houston astros',
  'detroit tigers',
  'colorado rockies',
  'cleveland indians',
  'cincinnati reds',
  'chicago white sox',
  'chicago cubs',
  'boston red sox',
  'baltimore orioles',
  'atlanta braves',
  'arizona diamondbacks',
  'diamondbacks',
  'braves',
  'orioles',
  'white sox',
  'astros',
  'royals',
  'dodgers',
  'marlins',
  'brewers',
  'mets',
  'yankees',
  'phillies',
  'padres',
  'giants',
  'mariners',
  'cardinals',
  'blue jays',

  //nba
  'boston celtics',
  'brooklyn nets',
  'new york knicks',
  'philadelphia 76ers',
  'toronto raptors',
  'chicago bulls',
  'cleveland cavaliers',
  'detroit pistons',
  'indiana pacers',
  'milwaukee bucks',
  'atlanta hawks',
  'charlotte hornets',
  'miami heat',
  'orlando magic',
  'washington wizards',
  'dallas mavericks',
  'houston rockets',
  'memphis grizzlies',
  'new orleans pelicans',
  'san antonio spurs',
  'denver nuggets',
  'minnesota timberwolves',
  'portland trail blazers',
  'oklahoma city thunder',
  'utah jazz',
  'golden state warriors',
  'los angeles clippers',
  'los angeles lakers',
  'phoenix suns',
  'sacramento kings',
  '76ers',
  'knicks',
  'mavericks',
  'lakers',
  'celtics',

  //nfl
  'buffalo bills',
  'miami dolphins',
  'new england patriots',
  'new york jets',
  'baltimore ravens',
  'cincinnati bengals',
  'cleveland browns',
  'pittsburgh steelers',
  'houston texans',
  'indianapolis colts',
  'jacksonville jaguars',
  'tennessee titans',
  'denver broncos',
  'kansas city chiefs',
  'oakland raiders',
  'san diego chargers',
  'dallas cowboys',
  'new york giants',
  'philadelphia eagles',
  'washington redskins',
  'chicago bears',
  'detroit lions',
  'green bay packers',
  'minnesota vikings',
  'atlanta falcons',
  'carolina panthers',
  'new orleans saints',
  'tampa bay buccaneers',
  'arizona cardinals',
  'st. louis rams',
  'san francisco 49ers',
  'seattle seahawks',

  //mls
  'chicago fire',
  'columbus crew sc',
  'd.c. united',
  'montreal impact',
  'new england revolution',
  'new york city fc',
  'new york red bulls',
  'philadelphia union',
  'colorado rapids',
  'fc dallas',
  'houston dynamo',
  'la galaxy',
  'portland timbers',
  'real salt lake',
  'san jose earthquakes',
  'seattle sounders',
  'sporting kansas city',
  'vancouver whitecaps',
  'atlanta united',
  'minnesota united',
  //premier league soccer (mostly city+fc)
  'blackburn rovers',
  'leicester city',
  'manchester city',
  'manchester united',
  'aston villa',
  'cardiff city',
  'newcastle united',
  'queens park rangers',
  'sheffield united',
  'stoke city',
  'tottenham hotspur',
  'west ham united',
];

},{}],90:[function(require,module,exports){

//names commonly used in either gender
module.exports = [
  'casey',
  'jamie',
  'lee',
  'jaime',
  'jessie',
  'morgan',
  'rene',
  'robin',
  'devon',
  'kerry',
  'alexis',
  'guadalupe',
  'blair',
  'kasey',
  'jean',
  'marion',
  'aubrey',
  'shelby',
  'jan',
  'shea',
  'jade',
  'kenyatta',
  'kelsey',
  'shay',
  'lashawn',
  'trinity',
  'regan',
  'jammie',
  'cassidy',
  'cheyenne',
  'reagan',
  'shiloh',
  'marlo',
  'andra',
  'devan',
  'rosario',
  'lee'
];

},{}],91:[function(require,module,exports){
'use strict';
const fns = require('../fns');
//names with a distinctive signal that they identify as a female, internationally

//compressed by frequent suffixes
//comprssed with
//https://github.com/nlp-compromise/thumb/blob/master/src/compress/compress.js
const compressed = {
  stine: 'chri,erne,ju,kri',
  rlene: 'a,cha,da,ma',
  eline: 'ad,ang,jacqu,mad',
  nette: 'an,antoi,jean,ly',
  elia: 'ad,am,ang,cec,c,corn,d,of,sh',
  anne: ',di,je,jo,le,mari,rox,sus,suz',
  elle: 'dani,est,gabri,isab,jan,mich,rach,roch',
  ella: 'd,est,isab,lu,marc,st',
  rina: 'kata,kat,ma,sab,t',
  icia: 'al,fel,let,patr,tr',
  ette: 'bernad,b,claud,paul,yv',
  leen: 'ai,cath,col,ei,kath',
  ndra: 'alexa,cassa,ke,sa,so',
  elma: ',s,th,v',
  anda: 'am,mir,w,yol',
  etta: ',henri,lor,ros',
  isha: 'al,ke,lat,tr',
  tina: 'cris,mar,,valen',
  inda: 'bel,l,luc,mel',
  arla: 'c,d,k,m',
  lena: 'e,je,,magda',
  ine: 'carol,cather,cel,ela,franc,gerald,jan,jasm,jeann,joseph,kathar,kather,lorra,max,nad,paul',
  ice: 'al,beatr,bern,cand,clar,eun,jan,patr',
  ela: 'andj,ang,carm,gabri,graci,l,manu,pam',
  ara: 'barb,c,cl,k,l,tam,t,z',
  ora: 'c,d,fl,isid,len,l,n,teod',
  ina: 'am,catal,d,georg,g,josef,n',
  ita: 'an,arp,bon,juan,kav,margar,r',
  nna: 'dea,do,gle,je,joha,lado,sha',
  lyn: 'caro,eve,gwendo,jac,jacque,joce,mari',
  ica: 'angel,er,jess,mil,mon,patr,veron',
  ene: 'adri,hel,imog,ir,jol,lor',
  ana: 'adri,d,jov,ju,l,sus',
  nda: 'bre,gle,ly,rho,ro',
  nia: 'anto,euge,so,to,virgi',
  ley: 'ash,kel,kimber,les,shir',
  sha: 'lata,mar,nata,ta',
  ian: 'jill,lill,mar,viv',
  isa: 'al,el,l,lu',
  ann: ',jo,le,mary',
  ise: 'den,el,elo,lou',
  ida: 'a,,rach,sa',
  nya: 'lato,so,ta,to',
  ssa: 'aly,mari,meli,vane',
  tha: 'ber,mar,saman,tabi',
  ia: 'cecil,claud,cynth,dam,georg,glor,jul,luc,lyd,marc,mar,nad,oliv,silv,sof,soph,sylv,victor',
  la: 'eu,kay,lei,leo,li,lo,pau,priscil,shei,ursu,vio,wil',
  na: 'de,ed,leo,lor,mo,myr,ramo,re,shau,shaw,shee,ver',
  le: 'ade,camil,caro,ceci,ga,gay,lucil,mab,myrt,nicho,nico',
  en: 'carm,dore,ell,gretch,gw,hel,kar,kirst,krist,laur,maure',
  ra: 'aud,barb,deb,elvi,javie,lau,may,my,pet,ve',
  ma: 'al,em,er,fati,ir,kari,nai,nor,wil',
  el: 'eth,isab,laur,mab,marib,muri,racha,rach,raqu',
  ta: 'alber,al,chris,ek,kris,mandakran,mar,rober',
  ey: 'audr,brittn,courtn,linds,stac,trac,whitn',
  ri: 'je,kanyakuma,ka,ker,sha,she,ter',
  ne: 'corin,daph,ja,laver,lyn,simo,yvon',
  th: 'be,edi,elisabe,elizabe,judi,meredi,ru',
  ah: 'aish,beul,debor,hann,le,rebek,sar',
  is: 'delor,dor,jan,lo,mav,phyll',
  da: 'a,fre,frie,hil,matil,priyamva',
  ce: 'canda,constan,floren,gra,joy',
  es: 'agn,delor,dolor,franc,merced',
  er: 'amb,est,esth,heath,jennif',
  et: 'bridg,harri,jan,margar,margr',
  ca: 'bian,blan,francis,rebec',
  ja: 'an,khadi,mari,son',
  sa: 'el,ro,tere,there',
  ee: 'aim,d,desir,ren',
  va: 'a,el,e,i',
  in: 'caitl,er,kar,krist',
  on: 'alis,man,shann,shar',
  an: 'meag,meg,megh,sus'
};

let list = [
  'abigail',
  'aicha',
  'alya',
  'andrea',
  'beatriz',
  'bettye',
  'brandi',
  'brooke',
  'carol',
  'celeste',
  'chelsea',
  'cheryl',
  'chloe',
  'claire',
  'cleo',
  'constanza',
  'consuelo',
  'crystal',
  'dominique',
  'dorothea',
  'eleanor',
  'eliza',
  'erika',
  'fay',
  'faye',
  'fern',
  'gail',
  'genevieve',
  'gertrude',
  'gladys',
  'heidi',
  'ingrid',
  'jade',
  'jill',
  'jo',
  'joni',
  'kate',
  'katie',
  'kathryn',
  'kay',
  'kim',
  'krystal',
  'latoya',
  'laxmi',
  'leigh',
  'lindsay',
  'lupe',
  'lynn',
  'mae',
  'malika',
  'margo',
  'marguerite',
  'marisol',
  'maritza',
  'maude',
  'maya',
  'mildred',
  'miriam',
  'monique',
  'mrignayani',
  'naomi',
  'nell',
  'nikki',
  'olga',
  'paige',
  'pam',
  'parvati',
  'pearl',
  'reba',
  'robyn',
  'rosalind',
  'sheryl',
  'sue',
  'sybil',
  'tami',
  'tamika',
  'therese',
  'toni',
  'gisele'
];
list = fns.uncompress_suffixes(list, compressed);

for (let i = 0; i < list.length; i++) {
  let str = list[i];
  if (str.match(/[^ea]y$/)) {
    list.push(str.replace(/y$/, 'i'));
  }
  if (str.match(/ll/)) {
    list.push(str.replace(/ll/, 'l'));
  }
  if (str.match(/nn/)) {
    list.push(str.replace(/nn/, 'n'));
  }
  if (str.match(/ah/)) {
    list.push(str.replace(/ah/, 'a'));
  }
  if (str.match(/t$/)) {
    list.push(str.replace(/t$/, 'tte'));
  }
  if (str.match(/ey$/)) {
    list.push(str.replace(/ey$/, 'y'));
  }
  if (str.match(/ie$/)) {
    list.push(str.replace(/ie$/, 'y'));
  }
  if (str.match(/ne$/)) {
    list.push(str.replace(/ne$/, 'na'));
  }
  if (str.match(/ss/)) {
    list.push(str.replace(/ss/, 's'));
  }
  if (str.match(/rr/)) {
    list.push(str.replace(/rr/, 'r'));
  }
}
const no_change = [
  'amy',
  'becky',
  'betty',
  'beverly',
  'cathy',
  'dolly',
  'dorothy',
  'hilary',
  'hillary',
  'kimberly',
  'rosemary',
  'sally',
  'shelly',
  'trudy',
  'tammy',
  'wendy',
  'ruby',
  'susi'
];
list = list.concat(no_change);
module.exports = list;
// console.log(list.indexOf('kelley'));

},{"../fns":71}],92:[function(require,module,exports){
// common first-names in compressed form.
// from http://www.ssa.gov/oact/babynames/limits.html  and http://www.servicealberta.gov.ab.ca/pdf/vs/2001_Boys.pdf
// not sure what regional/cultural/demographic bias this has. Probably a lot.
// 73% of people are represented in the top 1000 names

// used to reduce redundant named-entities in longer text. (don't spot the same person twice.)
// used to identify gender for coreference resolution
'use strict';
let male = require('./male');
let female = require('./female');
let ambiguous = require('./ambiguous');
const names = {};

for (let i = 0; i < male.length; i++) {
  names[male[i]] = 'MaleName';
}
for (let i = 0; i < female.length; i++) {
  names[female[i]] = 'FemaleName';
}
//ambiguous/unisex names
for (let i = 0; i < ambiguous.length; i += 1) {
  names[ambiguous[i]] = 'Person';
}
// console.log(names['spencer']);
module.exports = names;

},{"./ambiguous":90,"./female":91,"./male":94}],93:[function(require,module,exports){
//a random copy+paste job from around the internet
//(dont mean to step on any toes)
//some countries have a higher lastname-signal than others
//this list is further augmented by some regexps, over in ./data/punct_rules.js
// https://en.wikipedia.org/wiki/List_of_most_common_surnames_in_Europe
module.exports = [
  'lee',
  'li',
  'zhang',
  'wang',
  'nguyen',
  'garcia',
  'gonzalez',
  'hernandez',
  'smirnov',
  'muller',
  'wong',
  'cheung',
  'liu',
  'lau',
  'chen',
  'chan',
  'yang',
  'yeung',
  'huang',
  'zhao',
  'chiu',
  'wu',
  'zhou',
  'chow',
  'xu',
  'tsui',
  'zhu',
  'hu',
  'guo',
  'gao',
  'kwok',
  'luo',
  'devi',
  'singh',
  'kumar',
  'das',
  'kaur',
  'sato',
  'suzuki',
  'takahashi',
  'tanaka',
  'watanabe',
  'ito',
  'yamamoto',
  'nakamura',
  'kobayashi',
  'kato',
  'yoshida',
  'yamada',
  'sasaki',
  'yamaguchi',
  'saito',
  'matsumoto',
  'inoue',
  'kimura',
  'hayashi',
  'shimizu',
  'yamazaki',
  'ikeda',
  'hashimoto',
  'yamashita',
  'ishikawa',
  'nakajima',
  'maeda',
  'fujita',
  'ogawa',
  'harris',
  'thompson',
  'martinez',
  'robinson',
  'rodriguez',
  'walker',
  'wright',
  'lopez',
  'carter',
  'perez',
  'roberts',
  'turner',
  'phillips',
  'parker',
  'evans',
  'edwards',
  'collins',
  'sanchez',
  'morris',
  'rogers',
  'bailey',
  'rivera',
  'cooper',
  'richardson',
  'cox',
  'torres',
  'peterson',
  'ramirez',
  'brooks',
  'sanders',
  'bennett',
  'barnes',
  'henderson',
  'coleman',
  'jenkins',
  'perry',
  'powell',
  'patterson',
  'hughes',
  'flores',
  'simmons',
  'foster',
  'bryant',
  'hayes',
  'smith',
  'jones',
  'williams',
  'miller',
  'taylor',
  'wilson',
  'davis',
  'clark',
  'hall',
  'thomas',
  'moore',
  'anderson',
  'allen',
  'lewis',
  'jackson',
  'adams',
  'tryniski',
  'campbell',
  'gruber',
  'huber',
  'bauer',
  'wagner',
  'pichler',
  'steiner',
  'mammadov',
  'aliyev',
  'hasanov',
  'ivanou',
  'ivanov',
  'kazlov',
  'peeters',
  'janssens',
  'dimitrov',
  'horvat',
  'neilson',
  'jensen',
  'hansen',
  'pedersen',
  'andersen',
  'christensen',
  'larsen',
  'vassiljev',
  'petrov',
  'kuznetsov',
  'mihhailov',
  'pavlov',
  'semjonov',
  'andrejev',
  'aleksejev',
  'johansson',
  'nyman',
  'lindholm',
  'karlsson',
  'andersson',
  'dubois',
  'durand',
  'leroy',
  'moreau',
  'lefebvre',
  'lefevre',
  'roux',
  'fournier',
  'mercier',
  'schmidt',
  'schneider',
  'fischer',
  'meyer',
  'weber',
  'schulz',
  'becker',
  'hoffmann',
  'kovacs',
  'szabo',
  'toth',
  'nagy',
  'byrne',
  'murray',
  'sullivan',
  'rossi',
  'russo',
  'esposito',
  'ricci',
  'marino',
  'klein',
  'nowak',
  'silva',
  'santos',
  'fernandez',
  'ruiz',
  'jimenez',
  'alvarez',
  'moreno',
  'muñoz',
  'alonso',
  'gutierrez',
  'romero',
  'navarro',
  'dominguez',
  'gil',
  'vazquez',
  'serrano',
  'ramos',
  'blanco',
  'sanz',
  'castro',
  'suarez',
  'ortega',
  'rubio',
  'molina',
  'delgado',
  'morales',
  'ortiz',
  'marin',
  'iglesias',
  'boyko',
  'davies',
  'clarke',
  'johnson',
  'oliveira',
  'sosa',
  'rojas',
  'munoz',
  'diaz',
  'gomez',
  'xiao',
  'tian',
  'bahk',
  'pahk',
  'chung',
  'jung',
  'joung',
  'chong',
  'cheong',
  'choung',
  'choi',
  'che',
  'choy',
  'chwe',
  'yeun',
  'yun',
  'jhang',
  'chang',
  'cheon',
  'kwon',
  'soung',
  'bhang',
  'bahng',
  'pahng',
  'phang',
  'kahn',
  'tran',
  'pham',
  'huynh',
  'hoang',
  'phan',
  'patel',
  //these are famous ones
  'mozart',
  'bach',
  'beethoven',
  'nixon',
  'vivaldi',
  'obama',
  'reagan',
  'lenin',
  'stalin',
  'hitler',
  'mussolini',
  'kennedy',
  'lincoln',
  'gandhi',
  'thatcher',
  'orwell',
  'darwin',
  'einstein',
  'picasso',
  'edison',
  'roosevelt',
  'tolstoy',
  'hemingway',
  'hitchcock',
  'messi',
  'beckham',
  'cohen',
]

// let obj = {}
// module.exports.forEach((str) => {
//   if (obj[str]) {
//     console.log(str)
//   }
//   obj[str] = true
// })

},{}],94:[function(require,module,exports){
'use strict';
const fns = require('../fns');
//names with a distinctive signal that they identify as a male, internationally

//the unique/uncompressed names..
let arr = [
  "abu",
  "adolfo",
  "anthony",
  "arthur",
  "billy",
  "bobby",
  "bradford",
  "bret",
  "caleb",
  "clifford",
  "craig",
  "derek",
  "doug",
  "dwight",
  "eli",
  "elliot",
  "enrique",
  "felipe",
  "felix",
  "francisco",
  "frank",
  "george",
  "glenn",
  "greg",
  "gregg",
  "hans",
  "hugh",
  "ira",
  "isaac",
  "kermit",
  "leo",
  "levi",
  "lorenzo",
  "percy",
  "philip",
  "phillip",
  "rex",
  "ricky",
  "shaun",
  "shawn",
  "steve",
  "timothy",
  "wilbur",
  "williams",
  "woodrow",
  "youssef",
  "mahmoud",
  "mustafa",
  "hamza",
  "tareq",
  "ali",
  "beshoi",
  "mark",
  "habib",
  "moussa",
  "adama",
  "abdoulaye",
  "modibo",
  "mustapha",
  "aziz",
  "mateo",
  "santino",
  "davi",
  "jacob",
  "vicente",
  "alonso",
  "maximiliano",
  "jose",
  "jeronimo",
  "joshua",
  "ajani",
  "amir",
  "arnav",
  "suraj",
  "bruno",
  "yousouf",
  "wei",
  "hao",
  "yi",
  "jun",
  "lei",
  "aarav",
  "reyansh",
  "arjun",
  "abulfazl",
  "reza",
  "kathem",
  "ori",
  "yosef",
  "itai",
  "moshe",
  "ichika",
  "itsuki",
  "tatsuki",
  "asahi",
  "haruki",
  "tomoharu",
  "yuuma",
  "taichi",
  "saqib",
  "abubakr",
  "ergi",
  "marc",
  "eric",
  "enzo",
  "pol",
  "alex",
  "marti",
  "jakob",
  "paul",
  "leevi",
  "aputsiaq",
  "inunnguaq",
  "inuk",
  "francesco",
  "andrea",
  "mattia",
  "matteo",
  "tommaso",
  "nikola",
  "ilija",
  "marko",
  "luka",
  "antoni",
  "jakub",
  "franciszek",
  "filip",
  "stanislaw",
  "mikolaj",
  "yusuf",
  "berat",
  "emir",
  "ahmet",
  "mehmet",
  "leroy",
  "roy",
  "troy",
  "floyd",
  "lloyd",
  "carl",
  "earl",
  "karl",
  "raul",
  "saul",
  "earnest",
  "ernest",
  "forrest",
  "arnold",
  "harold",
  "andrew",
  "mathew",
  "matthew",
  "elliott",
  "matt",
  "scott",
  "marty",
  "monty",
  "scotty",
  "clay",
  "jay",
  "murray",
  "monte",
  "pete",
  "elwood",
  "jarrod",
  "claude",
  "clyde",
  "wade",
  "alfredo",
  "reynaldo",
  "wilfredo",
  "clark",
  "kirk",
  "chase",
  "jesse",
  "cedric",
  "dominic",
  "josh",
  "rocky",
  "rodolfo",
  "roosevelt",
  "roscoe",
  "ross",
  "jeff",
  "jeremy",
  "jerome",
  "jess",
  "toby",
  "todd",
  "tom",
  "tony",
  "darryl",
  "daryl",
  "dave",
  "joe",
  "john",
  "jorge",
  "malcolm",
  "marco",
  "max",
  "alfonso",
  "alonzo",
  "guillermo",
  "gustavo"
]



//compressed by frequent suffixes
//comprssed with
//https://github.com/nlp-compromise/thumb/blob/master/src/compress/compress.js
let suffix_compressed = {
  "rence": "cla,lau,law,te,ter",
  "lbert": "a,de,e,gi,wi",
  "berto": "al,gil,hum,ro",
  "ustin": "ag,j,a,d",
  "rick": "e,frede,rode,der,fred,kend,pat,",
  "ardo": "bern,leon,ricc,edu,ger,ric",
  "lvin": "e,ke,me,a,ca",
  "nnie": "do,lo,ro,be,joh",
  "bert": ",her,hu,nor,ro",
  "than": "e,na,johna,jona",
  "ando": "arm,fern,orl,rol",
  "land": "cleve,gar,le,ro",
  "arry": "b,g,h,l",
  "lton": "a,car,e,mi",
  "ian": "sebast,j,,maximil,krist,adr,br,christ,dam,fab,jul",
  "ton": "an,clin,quin,bur,clay,clif,pres,wins",
  "ter": "car,pe,ches,les,sylves,dex,wal",
  "ard": "bern,edw,ger,how,leon,rich,will",
  "ell": "darn,darr,low,mitch,russ,terr,wend",
  "son": "jack,ma,harri,ja,nel,ty,wil",
  "aan": "ish,arm,viv,ay,vih,nom",
  "ron": "a,aa,by,came,my,",
  "lan": "mi,a,al,dy,har,no",
  "man": "abdulrah,us,her,nor,sher,ro",
  "mon": "ra,szy,da,si,solo",
  "uel": "mig,sam,eman,emman,man",
  "don": "bran,,el,gor,shel",
  "med": "moha,muha,ah,moham,muham",
  "ald": "don,regin,ron,ger,jer",
  "vin": "er,ir,mar,de,ke",
  "rey": "ca,co,geoff,jeff",
  "ett": "br,ever,garr,emm",
  "ael": "raf,ism,mich,raph",
  "mmy": "ji,sa,ti,to",
  "las": "nico,dal,doug,nicho",
  "red": "alf,f,wilf,ja",
  "nny": "be,da,joh,ke",
  "ius": "cornel,dar,demetr,jul",
  "ley": "brad,har,stan,wes",
  "mar": "o,ou,am,la",
  "iel": "gabr,dan,ar,nathan",
  "ane": "souleym,d,du,sh",
  "ent": "br,k,tr,vinc",
  "an": "hass,ju,log,ary,roh,has,eit,yonat,ro,zor,drag,dej,stef,iv,emirh,ev,brend,d,jord,bry,de,esteb,ry,se,st,steph",
  "er": "ik,javi,alexand,oliv,aleksand,om,christoph,kristoph,luth,elm,grov,hom,jasp,rodg,rog,spenc,tyl,xavi",
  "en": "jayd,jad,aid,dev,eym,b,reub,rub,darr,lor,warr,all,dami,gl,k,ow,steph,stev",
  "in": "yass,husse,benjam,mart,joaqu,hosse,col,frankl,marl,darw,edw,erw,dar,darr,efra,quent",
  "ie": "j,jimm,samm,tomm,bill,charl,will,ern,arch,edd,frank,fredd,lou,regg,robb",
  "is": "alex,lu,lou,math,chr,curt,den,denn,ell,franc,lew,morr,ot,trav,will",
  "el": "abd,ang,no,jo,ro,ab,darr,fid,lion,marc,mich,russ",
  "ry": "jer,per,ter,co,grego,ro,ga,zacha,hen,jeffe,jeff",
  "ce": "lan,terran,van,bru,bry,hora,mauri,roy,walla",
  "ne": "deway,dway,way,antoi,blai,jermai,euge,ge,tyro",
  "to": "mina,yuu,haru,haruhi,haya,beni,ernes,ot",
  "or": "heit,vict,ig,hect,juni,salvad,tayl,trev",
  "as": "mati,tom,luc,thom,luk,tobi,jon,eli",
  "io": "anton,emil,jul,rogel,gregor,ignac,mar,serg",
  "le": "gabrie,doy,ky,ly,da,mer,orvil",
  "al": "bil,,h,jam,miche,ne,rand",
  "dy": "fred,ted,an,bra,co,gra,ru",
  "ad": "muhamm,mohamm,moham,mur,br,ch,conr",
  "ey": "dew,harv,jo,mick,rick,rodn,sidn",
  "am": "li,willi,no,ad,abrah,grah,s",
  "ah": "abdall,no,elij,jeremi,abdull,mic",
  "on": "bry,j,jonath,le,marl,vern",
  "il": "ne,nikh,cec,em,ph,virg",
  "im": "j,t,ibrah,kar,hal,sel",
  "go": "santia,thia,die,rodri,domin,hu",
  "ar": "ces,hyd,aleksand,pet,edg,osc",
  "os": "kiroll,carl,mil,am,marc,sant",
  "ro": "ped,alejand,alessand,alva,artu,rami",
  "nd": "arma,edmu,desmo,edmo,raymo",
  "ck": "ja,chu,domini,ma,ni",
  "ta": "hina,haru,sou,ara,kana",
  "ou": "l,mamad,mahamad,sek,ry",
  "ph": "ral,randol,rudol,jose,joes",
  "ik": "er,adv,mal,min,sal",
  "rt": "cu,ku,ba,stewa,stua",
  "us": "mathe,jes,marc,ruf",
  "lo": "ange,pab,abdul,nii",
  "es": "jam,andr,charl,mos",
  "id": "rach,dav,zah,shah",
  "nt": "brya,cli,gra,lamo",
  "re": "and,pier,salvato,theodo",
  "ng": "irvi,sterli,fe,yo",
  "ed": "khal,,n,t",
  "ke": "bla,ja,lu,mi",
  "th": "hea,kei,kenne,se",
  "ll": "carro,kenda,marsha,randa",
  "di": "fa,meh,mah,jor"
}
arr = fns.uncompress_suffixes(arr, suffix_compressed);

module.exports = arr;

// console.log(JSON.stringify(arr, null, 2))

},{"../fns":71}],95:[function(require,module,exports){
'use strict';
//some most-common iso-codes (most are too ambiguous)
const shortForms = [
  'usd',
  'cad',
  'aud',
  'gbp',
  'krw',
  'inr',
  'hkd',
  'dkk',
  'cny',
  'xaf',
  'xof',
  'eur',
  'jpy',
  //currency symbols
  '€',
  '$',
  '¥',
  '£',
  'лв',
  '₡',
  'kn',
  'kr',
  '¢',
  'Ft',
  'Rp',
  '﷼',
  '₭',
  'ден',
  '₨',
  'zł',
  'lei',
  'руб',
  '฿',
];

//some common, unambiguous currency names
let longForms = [
  'denar',
  'dobra',
  'forint',
  'kwanza',
  'kyat',
  'lempira',
  'pound sterling',
  'riel',
  'yen',
  'zloty',
  //colloquial currency names
  'dollar',
  'cent',
  'penny',
  'dime',
  'dinar',
  'euro',
  'lira',
  'pound',
  'pence',
  'peso',
  'baht',
  'sterling',
  'rouble',
  'shekel',
  'sheqel',
  'yuan',
  'franc',
  'rupee',
  'shilling',
  'krona',
  'dirham',
  'bitcoin'
];
const irregularPlurals = {
  yen: 'yen',
  baht: 'baht',
  riel: 'riel',
  penny: 'pennies',
};

//add plural forms - 'euros'
let l = longForms.length;
for(let i = 0; i < l; i++) {
  if (irregularPlurals[longForms[i]]) {
    longForms.push(irregularPlurals[longForms[i]]);
  } else {
    longForms.push(longForms[i] + 's');
  }
}

module.exports = shortForms.concat(longForms);

},{}],96:[function(require,module,exports){
const cardinal = {
  ones: {
    // 'a': 1,
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
  },
  teens: {
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19
  },
  tens: {
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90
  },
  multiples: {
    'hundred': 1e2,
    'thousand': 1e3,
    'grand': 1e3,
    'million': 1e6,
    'billion': 1e9,
    'trillion': 1e12,
    'quadrillion': 1e15,
    'quintillion': 1e18,
    'sextillion': 1e21,
    'septillion': 1e24
  }
};

const ordinal = {
  ones: {
    'zeroth': 0,
    'first': 1,
    'second': 2,
    'third': 3,
    'fourth': 4,
    'fifth': 5,
    'sixth': 6,
    'seventh': 7,
    'eighth': 8,
    'ninth': 9
  },
  teens: {
    'tenth': 10,
    'eleventh': 11,
    'twelfth': 12,
    'thirteenth': 13,
    'fourteenth': 14,
    'fifteenth': 15,
    'sixteenth': 16,
    'seventeenth': 17,
    'eighteenth': 18,
    'nineteenth': 19
  },
  tens: {
    'twentieth': 20,
    'thirtieth': 30,
    'fourtieth': 40,
    'fiftieth': 50,
    'sixtieth': 60,
    'seventieth': 70,
    'eightieth': 80,
    'ninetieth': 90
  },
  multiples: {
    'hundredth': 1e2,
    'thousandth': 1e3,
    'millionth': 1e6,
    'billionth': 1e9,
    'trillionth': 1e12,
    'quadrillionth': 1e15,
    'quintillionth': 1e18,
    'sextillionth': 1e21,
    'septillionth': 1e24
  }
};


//used for the units
const prefixes = {
  'yotta': 1,
  'zetta': 1,
  'exa': 1,
  'peta': 1,
  'tera': 1,
  'giga': 1,
  'mega': 1,
  'kilo': 1,
  'hecto': 1,
  'deka': 1,
  'deci': 1,
  'centi': 1,
  'milli': 1,
  'micro': 1,
  'nano': 1,
  'pico': 1,
  'femto': 1,
  'atto': 1,
  'zepto': 1,
  'yocto': 1,

  'square': 1,
  'cubic': 1,
  'quartic': 1
};

module.exports = {
  cardinal: cardinal,
  ordinal: ordinal,
  prefixes: prefixes
};

},{}],97:[function(require,module,exports){
'use strict';
//create an easy mapping between ordinal-cardinal
const numbers = require('./numbers');
let toOrdinal = {};
let toCardinal = {};
Object.keys(numbers.ordinal).forEach((k) => {
  let ordinal = Object.keys(numbers.ordinal[k]);
  let cardinal = Object.keys(numbers.cardinal[k]);
  for (let i = 0; i < ordinal.length; i++) {
    toOrdinal[cardinal[i]] = ordinal[i];
    toCardinal[ordinal[i]] = cardinal[i];
  }
});
module.exports = {
  toOrdinal: toOrdinal,
  toCardinal: toCardinal
};

},{"./numbers":96}],98:[function(require,module,exports){
'use strict';

const units = {
  'Temperature': {
    '°c': 'Celsius',
    '°f': 'Fahrenheit',
    'k': 'Kelvin',
    '°re': 'Reaumur',
    '°n': 'Newton',
    '°ra': 'Rankine'
  },
  'Volume': {
    'm³': 'cubic meter',
    'm3': 'cubic meter',
    'dm³': 'cubic decimeter',
    'dm3': 'cubic decimeter',
    'cm³': 'cubic centimeter',
    'cm3': 'cubic centimeter',
    'l': 'liter',
    'dl': 'deciliter',
    'cl': 'centiliter',
    'ml': 'milliliter',
    'in³': 'cubic inch',
    'in3': 'cubic inch',
    'ft³': 'cubic foot',
    'ft3': 'cubic foot',
    'yd³': 'cubic yard',
    'yd3': 'cubic yard',
    'gal': 'gallon',
    'bbl': 'petroleum barrel',
    'pt': 'pint',
    'qt': 'quart',
    'tbl': 'tablespoon',
    'tsp': 'teaspoon',
    'tbsp': 'tablespoon',
    'cup': 'cup',
    'fl oz': 'fluid ounce'
  },
  'Distance': {
    'km': 'kilometer',
    'm': 'meter',
    'dm': 'decimeter',
    'cm': 'centimeter',
    'mm': 'millimeter',
    'mi': 'mile',
    'in': 'inch',
    'ft': 'foot',
    'feet': 'foot',
    'yd': 'yard'
  },
  'Weight': {
    't': 'tonne',
    'kg': 'kilogram',
    'hg': 'hectogram',
    'g': 'gram',
    'dg': 'decigram',
    'cg': 'centigram',
    'mg': 'milligram',
    'µg': 'microgram',
    'carat': 'carat',
    'grain': 'grain',
    'oz': 'ounce',
    'lb': 'pound',
    'ton': 'tonne'
  },
  'Area': {
    'km²': 'square kilometer',
    'km2': 'square kilometer',
    'm²': 'square meter',
    'm2': 'square meter',
    'dm²': 'square decimeter',
    'dm2': 'square decimeter',
    'cm²': 'square centimeter',
    'cm2': 'square centimeter',
    'mm²': 'square millimeter',
    'mm2': 'square millimeter',
    'ha': 'hectare',
    'mile²': 'square mile',
    'mile2': 'square mile',
    'in²': 'square inch',
    'in2': 'square inch',
    'yd²': 'square yard',
    'yd2': 'square yard',
    'ft²': 'square foot',
    'ft2': 'square foot',
    'acre': 'acre'
  },
  'Frequency': {
    'hz': 'hertz'
  },
  'Speed': {
    'km/h': 'kilometer per hour',
    'kmph': 'kilometer per hour',
    'mps': 'meter per second',
    'm/s': 'meter per second',
    'mph': 'mile per hour',
    'mi/h': 'mile per hour',
    'knot': 'knot'
  },
  'Data': {
    'b': 'byte',
    'kb': 'kilobyte',
    'mb': 'megabyte',
    'gb': 'gigabyte',
    'tb': 'terabyte',
    'pt': 'petabyte',
    'eb': 'exabyte',
    'zb': 'zettabyte',
    'yb': 'yottabyte'
  },
  'Energy': {
    'j': 'joule',
    'pa': 'pascal',
    'w': 'watt',
    'n': 'newton',
    'wb': 'weber',
    'h': 'henry',
    'c': 'coulomb',
    'v': 'volt',
    'f': 'farad',
    's': 'siemens',
    'o': 'ohm',
    'lx': 'lux',
    'lm': 'lumen'
  },
  'Time': {
    'year': 'year',
    'week': 'week',
    'day': 'day',
    'h': 'hour',
    'min': 'minute',
    's': 'second',
    'ms': 'millisecond',
    'µs': 'microsecond',
    'nanosecond': 'nanosecond',
    'picosecond': 'picosecond',
    'femtosecond': 'femtosecond',
    'attosecond': 'attosecond'
  }
};

//prepare a list of them, for the lexicon
let words = {}
Object.keys(units).forEach((k) => {
  Object.keys(units[k]).forEach((shorter) => {
    if (shorter.length > 1) {
      words[shorter] = true
    }
    words[units[k][shorter]] = true
    words[units[k][shorter] + 's'] = true
  })
})
words = Object.keys(words)

module.exports = {
  words: words,
  units: units
}

},{}],99:[function(require,module,exports){
//a list of exceptions to the verb rules
'use strict';
const participles = require('./participles');

const irregular = {
  take: {
    PerfectTense: 'have taken',
    pluPerfectTense: 'had taken',
    FuturePerfect: 'will have taken'
  },
  can: {
    Gerund: '',
    PresentTense: 'can',
    PastTense: 'could',
    FutureTense: 'can',
    PerfectTense: 'could',
    pluPerfectTense: 'could',
    FuturePerfect: 'can',
    Actor: ''
  },
  free: {
    Gerund: 'freeing',
    Actor: ''
  },
  arise: {
    PastTense: 'arose',
    Participle: 'arisen'
  },
  babysit: {
    PastTense: 'babysat',
    Actor: 'babysitter'
  },
  be: { // this is crazy-hard and shouldn't be here
    PastTense: 'was',
    Participle: 'been',
    PresentTense: 'is',
    // FutureTense: 'will be',
    Actor: '',
    Gerund: 'am'
  },
  // will: {
  //   PastTense: 'will',
  // },
  is: {
    PastTense: 'was',
    PresentTense: 'is',
    // FutureTense: 'will be',
    // PerfectTense: 'have been',
    // pluPerfectTense: 'had been',
    // FuturePerfect: 'will have been',
    Actor: '',
    Gerund: 'being'
  },
  beat: {
    Gerund: 'beating',
    Actor: 'beater',
    Participle: 'beaten'

  },
  begin: {
    Gerund: 'beginning',
    PastTense: 'began'
  },
  bet: {
    Actor: 'better'
  },
  bind: {
    PastTense: 'bound'
  },
  bite: {
    Gerund: 'biting',
    PastTense: 'bit'
  },
  bleed: {
    PastTense: 'bled'
  },
  break: {
    PastTense: 'broke'
  },
  breed: {
    PastTense: 'bred'
  },
  bring: {
    PastTense: 'brought'
  },
  broadcast: {
    PastTense: 'broadcast'
  },
  build: {
    PastTense: 'built'
  },
  buy: {
    PastTense: 'bought'
  },
  catch: {
    PastTense: 'caught'
  },
  choose: {
    Gerund: 'choosing',
    PastTense: 'chose'
  },
  cost: {
    PastTense: 'cost'
  },
  deal: {
    PastTense: 'dealt'
  },
  die: {
    PastTense: 'died',
    Gerund: 'dying',
  },
  dig: {
    Gerund: 'digging',
    PastTense: 'dug'
  },
  do: {
    PastTense: 'did',
    PresentTense: 'does'
  },
  draw: {
    PastTense: 'drew'
  },
  drink: {
    PastTense: 'drank',
    Participle: 'drunk'
  },
  drive: {
    Gerund: 'driving',
    PastTense: 'drove'
  },
  eat: {
    Gerund: 'eating',
    PastTense: 'ate',
    Actor: 'eater',
    Participle: 'eaten'
  },
  fall: {
    PastTense: 'fell'
  },
  feed: {
    PastTense: 'fed'
  },
  feel: {
    PastTense: 'felt',
    Actor: 'feeler'
  },
  fight: {
    PastTense: 'fought'
  },
  find: {
    PastTense: 'found'
  },
  fly: {
    PastTense: 'flew',
    Participle: 'flown'
  },
  blow: {
    PastTense: 'blew',
    Participle: 'blown'
  },
  forbid: {
    PastTense: 'forbade'
  },
  forget: {
    Gerund: 'forgeting',
    PastTense: 'forgot'
  },
  forgive: {
    Gerund: 'forgiving',
    PastTense: 'forgave'
  },
  freeze: {
    Gerund: 'freezing',
    PastTense: 'froze'
  },
  get: {
    PastTense: 'got'
  },
  give: {
    Gerund: 'giving',
    PastTense: 'gave'
  },
  go: {
    PastTense: 'went',
    PresentTense: 'goes'
  },
  hang: {
    PastTense: 'hung'
  },
  have: {
    Gerund: 'having',
    PastTense: 'had',
    PresentTense: 'has'
  },
  hear: {
    PastTense: 'heard'
  },
  hide: {
    PastTense: 'hid'
  },
  hold: {
    PastTense: 'held'
  },
  hurt: {
    PastTense: 'hurt'
  },
  lay: {
    PastTense: 'laid'
  },
  lead: {
    PastTense: 'led'
  },
  leave: {
    PastTense: 'left'
  },
  lie: {
    Gerund: 'lying',
    PastTense: 'lay'
  },
  light: {
    PastTense: 'lit'
  },
  lose: {
    Gerund: 'losing',
    PastTense: 'lost'
  },
  make: {
    PastTense: 'made'
  },
  mean: {
    PastTense: 'meant'
  },
  meet: {
    Gerund: 'meeting',
    PastTense: 'met',
    Actor: 'meeter'
  },
  pay: {
    PastTense: 'paid'
  },
  read: {
    PastTense: 'read'
  },
  ring: {
    PastTense: 'rang'
  },
  rise: {
    PastTense: 'rose',
    Gerund: 'rising',
    pluPerfectTense: 'had risen',
    FuturePerfect: 'will have risen'
  },
  run: {
    Gerund: 'running',
    PastTense: 'ran'
  },
  say: {
    PastTense: 'said'
  },
  see: {
    PastTense: 'saw'
  },
  sell: {
    PastTense: 'sold'
  },
  shine: {
    PastTense: 'shone'
  },
  shoot: {
    PastTense: 'shot'
  },
  show: {
    PastTense: 'showed'
  },
  sing: {
    PastTense: 'sang',
    Participle: 'sung'
  },
  sink: {
    PastTense: 'sank',
    pluPerfectTense: 'had sunk'
  },
  sit: {
    PastTense: 'sat'
  },
  slide: {
    PastTense: 'slid'
  },
  speak: {
    PastTense: 'spoke',
    PerfectTense: 'have spoken',
    pluPerfectTense: 'had spoken',
    FuturePerfect: 'will have spoken'
  },
  spin: {
    Gerund: 'spinning',
    PastTense: 'spun'
  },
  spread: {
    PastTense: 'spread'
  },
  stand: {
    PastTense: 'stood'
  },
  steal: {
    PastTense: 'stole',
    Actor: 'stealer'
  },
  stick: {
    PastTense: 'stuck'
  },
  sting: {
    PastTense: 'stung'
  },
  stream: {
    Actor: 'streamer'
  },
  strike: {
    Gerund: 'striking',
    PastTense: 'struck'
  },
  swear: {
    PastTense: 'swore'
  },
  swim: {
    PastTense: 'swam'
  },
  swing: {
    PastTense: 'swung'
  },
  teach: {
    PastTense: 'taught',
    PresentTense: 'teaches'
  },
  tear: {
    PastTense: 'tore'
  },
  tell: {
    PastTense: 'told'
  },
  think: {
    PastTense: 'thought'
  },
  understand: {
    PastTense: 'understood'
  },
  wake: {
    PastTense: 'woke'
  },
  wear: {
    PastTense: 'wore'
  },
  win: {
    Gerund: 'winning',
    PastTense: 'won'
  },
  withdraw: {
    PastTense: 'withdrew'
  },
  write: {
    Gerund: 'writing',
    PastTense: 'wrote',
    Participle: 'written'
  },
  tie: {
    Gerund: 'tying',
    PastTense: 'tied'
  },
  ski: {
    PastTense: 'skiied'
  },
  boil: {
    Actor: 'boiler'
  },
  miss: {
    PresentTense: 'miss'
  },
  act: {
    Actor: 'actor'
  },
  compete: {
    Gerund: 'competing',
    PastTense: 'competed',
    Actor: 'competitor'
  },
  being: {
    Gerund: 'are',
    PastTense: 'were',
    PresentTense: 'are'
  },
  imply: {
    PastTense: 'implied',
    PresentTense: 'implies'
  },
  ice: {
    Gerund: 'icing',
    PastTense: 'iced'
  },
  develop: {
    PastTense: 'developed',
    Actor: 'developer',
    Gerund: 'developing'
  },
  wait: {
    Gerund: 'waiting',
    PastTense: 'waited',
    Actor: 'waiter'
  },
  aim: {
    Actor: 'aimer'
  },
  spill: {
    PastTense: 'spilt'
  },
  drop: {
    Gerund: 'dropping',
    PastTense: 'dropped'
  },
  log: {
    Gerund: 'logging',
    PastTense: 'logged'
  },
  rub: {
    Gerund: 'rubbing',
    PastTense: 'rubbed'
  },
  smash: {
    PresentTense: 'smashes'
  },
  suit: {
    Gerund: 'suiting',
    PastTense: 'suited',
    Actor: 'suiter'
  }
};

Object.keys(participles).forEach((inf) => {
  irregular[inf] = irregular[inf] || {};
  irregular[inf].Participle = participles[inf];
});

module.exports = irregular;

},{"./participles":100}],100:[function(require,module,exports){
//particples are a bit like past-tense, but used differently
//map the infinitive to its irregular-participle
module.exports = {
  'become': 'become',
  'begin': 'begun',
  'bend': 'bent',
  'bet': 'bet',
  'bite': 'bitten',
  'bleed': 'bled',
  'brake': 'broken',
  'bring': 'brought',
  'build': 'built',
  'burn': 'burned',
  'burst': 'burst',
  'buy': 'bought',
  'catch': 'caught',
  'choose': 'chosen',
  'cling': 'clung',
  'come': 'come',
  'creep': 'crept',
  'cut': 'cut',
  'deal': 'dealt',
  'dig': 'dug',
  'dive': 'dived',
  'do': 'done',
  'draw': 'drawn',
  'dream': 'dreamt',
  'drive': 'driven',
  'eat': 'eaten',
  'fall': 'fallen',
  'feed': 'fed',
  'fight': 'fought',
  'flee': 'fled',
  'fling': 'flung',
  'forget': 'forgotten',
  'forgive': 'forgiven',
  'freeze': 'frozen',
  'got': 'gotten',
  'give': 'given',
  'go': 'gone',
  'grow': 'grown',
  'hang': 'hung',
  'have': 'had',
  'hear': 'heard',
  'hide': 'hidden',
  'hit': 'hit',
  'hold': 'held',
  'hurt': 'hurt',
  'keep': 'kept',
  'kneel': 'knelt',
  'know': 'known',
  'lay': 'laid',
  'lead': 'led',
  'leap': 'leapt',
  'leave': 'left',
  'lend': 'lent',
  'light': 'lit',
  'loose': 'lost',
  'make': 'made',
  'mean': 'meant',
  'meet': 'met',
  'pay': 'paid',
  'prove': 'proven',
  'put': 'put',
  'quit': 'quit',
  'read': 'read',
  'ride': 'ridden',
  'ring': 'rung',
  'rise': 'risen',
  'run': 'run',
  'say': 'said',
  'see': 'seen',
  'seek': 'sought',
  'sell': 'sold',
  'send': 'sent',
  'set': 'set',
  'sew': 'sewn',
  'shake': 'shaken',
  'shave': 'shaved',
  'shine': 'shone',
  'shoot': 'shot',
  'shut': 'shut',
  'seat': 'sat',
  'slay': 'slain',
  'sleep': 'slept',
  'slide': 'slid',
  'sneak': 'snuck',
  'speak': 'spoken',
  'speed': 'sped',
  'spend': 'spent',
  'spill': 'spilled',
  'spin': 'spun',
  'spit': 'spat',
  'split': 'split',
  'spring': 'sprung',
  'stink': 'stunk',
  'strew': 'strewn',
  'sware': 'sworn',
  'sweep': 'swept',
  'thrive': 'thrived',
  'throw': 'thrown',
  'undergo': 'undergone',
  'upset': 'upset',
  'weave': 'woven',
  'weep': 'wept',
  'wind': 'wound',
  'wring': 'wrung'
};

},{}],101:[function(require,module,exports){
//most-frequent non-irregular verbs, in infinitive form, to be conjugated for the lexicon
//this list is the seed, from which various forms are conjugated
'use strict';
const fns = require('../fns');

//suffix-index adjectives
//  {cial:'cru,spe'} -> 'crucial', 'special'

//suffix-index adjectives
//  {cial:'cru,spe'} -> 'crucial', 'special'
let compressed = {
  prove: ',im,ap,disap',
  serve: ',de,ob,re',
  ress: 'exp,p,prog,st,add,d',
  lect: 'ref,se,neg,col,e',
  sist: 'in,con,per,re,as',
  tain: 'ob,con,main,s,re',
  mble: 'rese,gru,asse,stu',
  ture: 'frac,lec,tor,fea',
  port: 're,sup,ex,im',
  ate: 'rel,oper,indic,cre,h,activ,estim,particip,d,anticip,evalu',
  use: ',ca,over,ref,acc,am,pa',
  ive: 'l,rece,d,arr,str,surv,thr,rel',
  are: 'prep,c,comp,sh,st,decl,d,sc',
  ine: 'exam,imag,determ,comb,l,decl,underm,def',
  nce: 'annou,da,experie,influe,bou,convi,enha',
  ain: 'tr,rem,expl,dr,compl,g,str',
  ent: 'prev,repres,r,res,rel,inv',
  age: 'dam,mess,man,encour,eng,discour',
  rge: 'su,cha,eme,u,me',
  ise: 'ra,exerc,prom,surpr,pra',
  ect: 'susp,dir,exp,def,rej',
  ter: 'en,mat,cen,ca,al',
  end: ',t,dep,ext,att',
  est: 't,sugg,prot,requ,r',
  ock: 'kn,l,sh,bl,unl',
  nge: 'cha,excha,ra,challe,plu',
  ase: 'incre,decre,purch,b,ce',
  ish: 'establ,publ,w,fin,distingu',
  mit: 'per,ad,sub,li',
  ure: 'fig,ens,end,meas',
  der: 'won,consi,mur,wan',
  ave: 's,sh,w,cr',
  ire: 'requ,des,h,ret',
  tch: 'scra,swi,ma,stre',
  ack: 'att,l,p,cr',
  ion: 'ment,quest,funct,envis',
  ump: 'j,l,p,d',
  ide: 'dec,prov,gu,s',
  ush: 'br,cr,p,r',
  eat: 'def,h,tr,ch',
  ash: 'sm,spl,w,fl',
  rry: 'ca,ma,hu,wo',
  ear: 'app,f,b,disapp',
  er: 'answ,rememb,off,suff,cov,discov,diff,gath,deliv,both,empow,with',
  le: 'fi,sett,hand,sca,whist,enab,smi,ming,ru,sprink,pi',
  st: 'exi,foreca,ho,po,twi,tru,li,adju,boa,contra,boo',
  it: 'vis,ed,depos,sp,awa,inhib,cred,benef,prohib,inhab',
  nt: 'wa,hu,pri,poi,cou,accou,confro,warra,pai',
  ch: 'laun,rea,approa,sear,tou,ar,enri,atta',
  ss: 'discu,gue,ki,pa,proce,cro,glo,dismi',
  ll: 'fi,pu,ki,ca,ro,sme,reca,insta',
  rn: 'tu,lea,conce,retu,bu,ea,wa,gove',
  ce: 'redu,produ,divor,noti,for,repla',
  te: 'contribu,uni,tas,vo,no,constitu,ci',
  rt: 'sta,comfo,exe,depa,asse,reso,conve',
  ck: 'su,pi,che,ki,tri,wre',
  ct: 'intera,restri,predi,attra,depi,condu',
  ke: 'sta,li,bra,overta,smo,disli',
  se: 'collap,suppo,clo,rever,po,sen',
  nd: 'mi,surrou,dema,remi,expa,comma',
  ve: 'achie,invol,remo,lo,belie,mo',
  rm: 'fo,perfo,confi,confo,ha',
  or: 'lab,mirr,fav,monit,hon',
  ue: 'arg,contin,val,iss,purs',
  ow: 'all,foll,sn,fl,borr',
  ay: 'pl,st,betr,displ,portr',
  ze: 'recogni,reali,snee,ga,emphasi',
  ip: 'cl,d,gr,sl,sk',
  re: 'igno,sto,interfe,sco',
  ng: 'spri,ba,belo,cli',
  ew: 'scr,vi,revi,ch',
  gh: 'cou,lau,outwei,wei',
  ly: 'app,supp,re,multip',
  ge: 'jud,acknowled,dod,alle',
  en: 'list,happ,threat,strength',
  ee: 'fors,agr,disagr,guarant',
  et: 'budg,regr,mark,targ',
  rd: 'rega,gua,rewa,affo',
  am: 'dre,j,sl,ro',
  ry: 'va,t,c,bu'
};
let arr = [
  'abandon',
  'accept',
  'add',
  'added',
  'adopt',
  'aid',
  'appeal',
  'applaud',
  'archive',
  'ask',
  'assign',
  'associate',
  'assume',
  'attempt',
  'avoid',
  'become',
  'bomb',
  'cancel',
  'claim',
  'claw',
  'come',
  'control',
  'convey',
  'cook',
  'copy',
  'cut',
  'deem',
  'defy',
  'deny',
  'describe',
  'design',
  'destroy',
  'die',
  'divide',
  'do',
  'doubt',
  'drag',
  'drift',
  'drop',
  'echo',
  'embody',
  'enjoy',
  'envy',
  'excel',
  'fail',
  'fix',
  'float',
  'flood',
  'focus',
  'fold',
  'get',
  'goes',
  'grab',
  'grasp',
  'grow',
  'happen',
  'head',
  'help',
  'hold fast',
  'hope',
  'include',
  'instruct',
  'invest',
  'join',
  'keep',
  'know',
  'learn',
  'let',
  'lift',
  'link',
  'load',
  'loan',
  'look',
  'make due',
  'mark',
  'melt',
  'minus',
  'multiply',
  'name',
  'need',
  'occur',
  'overcome',
  'overlap',
  'overwhelm',
  'owe',
  'pay',
  'plan',
  'plug',
  'plus',
  'pop',
  'pour',
  'proclaim',
  'put',
  'rank',
  'reason',
  'reckon',
  'relax',
  'repair',
  'reply',
  'reveal',
  'revel',
  'risk',
  'rub',
  'ruin',
  'sail',
  'seek',
  'seem',
  'send',
  'set',
  'shout',
  'sleep',
  'sneak',
  'sort',
  'spoil',
  'stem',
  'step',
  'stop',
  'study',
  'take',
  'talk',
  'thank',
  'took',
  'trade',
  'transfer',
  'trap',
  'travel',
  'tune',
  'undergo',
  'undo',
  'uplift',
  'walk',
  'watch',
  'win',
  'wipe',
  'work',
  'yawn',
  'yield'
];

module.exports = fns.uncompress_suffixes(arr, compressed);

},{"../fns":71}],102:[function(require,module,exports){
'use strict';
// typeof obj == "function" also works
// but not in older browsers. :-/
exports.isFunction = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
};

//coerce any input into a string
exports.ensureString = (input) => {
  if (typeof input === 'string') {
    return input;
  } else if (typeof input === 'number') {
    return '' + input;
  }
  return '';
};
//coerce any input into a string
exports.ensureObject = (input) => {
  if (typeof input !== 'object') {
    return {};
  }
  if (input === null || input instanceof Array) {
    return {};
  }
  return input;
};

//string utilities
exports.endsWith = function (str, suffix) {
  if (str && str.substr(-suffix.length) === suffix) {
    return true;
  }
  return false;
};

exports.startsWith = function (str, prefix) {
  if (str && prefix) {
    if (str.substr(0, prefix.length) === prefix) {
      return true;
    }
  }
  return false;
};


exports.titleCase = (str) => {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

//turn a nested array into one array
exports.flatten = function (arr) {
  let all = [];
  arr.forEach(function (a) {
    all = all.concat(a);
  });
  return all;
};

//shallow-clone an object
exports.copy = (o) => {
  let o2 = {};
  o = exports.ensureObject(o);
  Object.keys(o).forEach((k) => {
    o2[k] = o[k];
  });
  return o2;
};

//shallow-merge an object
exports.extend = (o, o2) => {
  if (!o) {
    return o2;
  }
  if (!o2) {
    return o;
  }
  Object.keys(o2).forEach((k) => {
    o[k] = o2[k];
  });
  return o;
};

//a very naaive inflector for
//our public-facing one is in ./terms/noun/info
exports.toPlural = (str) => {
  const irregular = {
    Glue: 'Glue'
  };
  if (irregular[str]) {
    return irregular[str];
  }
  if (str.match(/y$/i)) {
    return str.replace(/y$/i, 'ies');
  }
  if (str.match(/person$/i)) {
    return str.replace(/person$$/i, 'people');
  }
  if (str.match(/s$/i)) {
    return str;
  }
  return str + 's';
};

exports.values = (obj) => {
  return Object.keys(obj).map((k) => {
    return obj[k];
  });
};

// exports.toObj = (arr) => {
//   let obj = {}
//   for (let i = 0; i < arr.length; i++) {
//     obj[arr[i]] = true
//   }
//   return obj
// }

exports.sum = (arr) => {
  return arr.reduce((sum, i) => {
    return sum + i;
  }, 0);
};


exports.rightPad = function (str, width, char) {
  char = char || ' ';
  str = str.toString();
  while (str.length < width) {
    str += char;
  }
  return str;
};

exports.leftPad = function (str, width, char) {
  char = char || ' ';
  str = str.toString();
  while (str.length < width) {
    str += char;
  }
  return str;
};

},{}],103:[function(require,module,exports){
'use strict';

const buildResult = require('./result/build');
const pkg = require('../package.json');

const nlp = function (str, context) {
  return buildResult(str, context);
};
nlp.version = pkg.version;

module.exports = nlp;

},{"../package.json":66,"./result/build":105}],104:[function(require,module,exports){
'use strict';
const chalk = require('chalk');
const fns = require('../fns');

let enable = false;

module.exports = {
  enable: (str) => {
    enable = str || true;
  },
  here: (path) => {
    if (enable === true || enable === path) {
      // console.log('  ' + chalk.yellow(chalk.underline(path)));
    }
  },
  tell: (str, path) => {
    if (enable === true || enable === path) {
      if (typeof str === 'object') {
        str = JSON.stringify(str);
      }
      str = '    ' + chalk.magenta(str);
      console.log(str);
    }
  },
  tagAs: (t, pos, reason) => {
    if (enable === true || enable === 'tagger') {
      let title = t.normal || '[' + t.silent_term + ']';
      title = chalk.green(title);
      title = fns.leftPad('\'' + title + '\'', 20);
      title += '  ->   ' + chalk.red(pos);
      title = fns.leftPad(title, 54);
      console.log('       ' + title + '(' + (reason || '') + ')');
    }
  },
  match: (t, reason) => {
    console.log('       ' + chalk.green('-match-') + '  \'' + chalk.red(t.normal) + '\'  -  ' + reason);
  },
  noMatch(t) {
    console.log('               ' + chalk.magenta('-die \'' + t.normal + '\''));
  }
};

},{"../fns":102,"chalk":8}],105:[function(require,module,exports){
'use strict';
const Text = require('./index');
const tokenize = require('./tokenize');
const corrections = require('./tag/corrections');
const tagPhrase = require('./tag/phrase');
const Terms = require('./paths').Terms

//build a new pos-tagged Result obj from a string
const fromString = (str, lexicon) => {
  let sentences = tokenize(str)
  let list = sentences.map((s) => Terms.fromString(s, lexicon))
  let r = new Text(list, lexicon)
    //give each ts a ref to the result
  r.list.forEach((ts) => {
    ts.parent = r;
  });
  r = corrections(r)
  r = tagPhrase(r)
  return r
}
module.exports = fromString

},{"./index":106,"./paths":122,"./tag/corrections":168,"./tag/phrase":174,"./tokenize":175}],106:[function(require,module,exports){
'use strict';
//a Text is an array of termLists
class Text {
  constructor(arr, lexicon, parent) {
    this.list = arr || [];
    this._parent = parent;
  }
  //getter/setters
  /** did it find anything? */
  get found() {
    return this.list.length > 0;
  }
  /** how many Texts are there?*/
  get length() {
    return this.list.length;
  }
  get isA() {
    return 'Text';
  }
  get parent() {
    return this._parent || this;
  }
  set parent(r) {
    this._parent = r;
    return this;
  }
  all() {
    return this.parent;
  }
  get whitespace() {
    return {
      before: (str) => {
        this.list.forEach((ts) => {
          ts.whitespace.before(str);
        });
        return this;
      },
      after: (str) => {
        this.list.forEach((ts) => {
          ts.whitespace.after(str);
        });
        return this;
      }
    };
  }
}

module.exports = Text;
Text = require('./methods/array')(Text);
Text = require('./methods/termFns')(Text);
Text = require('./methods/tag')(Text);
Text = require('./methods/sort')(Text);
Text = require('./methods/case')(Text);
Text = require('./methods/match/match')(Text);
Text = require('./methods/delete')(Text);
Text = require('./methods/replace')(Text);
Text = require('./methods/render/render')(Text);
Text = require('./methods/split')(Text);
Text = require('./methods/hyphens')(Text);
Text = require('./methods/insert')(Text);
Text.prototype.topk = require('./methods/render/topk');
Text.prototype.ngram = require('./methods/render/ngram');
Text.prototype.normalize = require('./methods/normalize');

const subset = {
  acronyms: require('./subset/acronyms'),
  adjectives: require('./subset/adjectives'),
  adverbs: require('./subset/adverbs'),
  contractions: require('./subset/contractions'),
  dates: require('./subset/dates'),
  hashTags: require('./subset/hashTags'),
  organizations: require('./subset/organizations'),
  people: require('./subset/people'),
  phoneNumbers: require('./subset/phoneNumbers'),
  places: require('./subset/places'),
  sentences: require('./subset/sentences'),
  questions: require('./subset/sentences/questions'),
  statements: require('./subset/sentences/statements'),
  nouns: require('./subset/nouns'),
  urls: require('./subset/urls'),
  values: require('./subset/values'),
  verbs: require('./subset/verbs'),
  things: require('./subset/things'),
};
//term subsets
Object.keys(subset).forEach((k) => {
  Text.prototype[k] = function () {
    let sub = subset[k];
    let m = sub.find(this);
    return new subset[k](m.list, this.lexicon, this.parent);
  };
});

},{"./methods/array":107,"./methods/case":108,"./methods/delete":109,"./methods/hyphens":110,"./methods/insert":111,"./methods/match/match":112,"./methods/normalize":113,"./methods/render/ngram":114,"./methods/render/render":115,"./methods/render/topk":116,"./methods/replace":117,"./methods/sort":118,"./methods/split":119,"./methods/tag":120,"./methods/termFns":121,"./subset/acronyms":123,"./subset/adjectives":124,"./subset/adverbs":125,"./subset/contractions":127,"./subset/dates":129,"./subset/hashTags":135,"./subset/nouns":136,"./subset/organizations":140,"./subset/people":142,"./subset/phoneNumbers":144,"./subset/places":145,"./subset/sentences":147,"./subset/sentences/questions":148,"./subset/sentences/statements":150,"./subset/things":151,"./subset/urls":152,"./subset/values":153,"./subset/verbs":166}],107:[function(require,module,exports){
'use strict';
const Terms = require('../../terms');

const genericMethods = (Text) => {

  const methods = {

    /**copy data properly so later transformations will have no effect*/
    clone: function () {
      let list = this.list.map((ts) => {
        return ts.clone();
      });
      // return this;
      return new Text(list, this.lexicon, this.parent);
    },

    /**turn all sentences into one, for example*/
    terms: function () {
      // let list = this.list.reduce((all, ts) => {
      //   all = all.concat(ts.terms);
      //   return all;
      // }, []);
      // let terms = new Terms(list);
      // return new Text([terms], this.lexicon, this.parent);
      return this.match('.');
    },


    /** get the nth term of each result*/
    term: function (n) {
      let list = this.list.map((ts) => {
        let arr = [];
        let el = ts.terms[n];
        if (el) {
          arr = [el];
        }
        return new Terms(arr, this.lexicon, this.parent);
      });
      return new Text(list, this.lexicon, this.parent);
    },

    firstTerm: function () {
      return this.match('^.');
    },
    lastTerm: function () {
      return this.match('.$');
    },

    /**use only the first result */
    first: function (n) {
      if (!n && n !== 0) {
        return this.get(0);
      }
      return new Text(this.list.slice(0, n), this.lexicon, this.parent);
    },

    /**use only the last result */
    last: function (n) {
      if (!n && n !== 0) {
        return this.get(this.list.length - 1);
      }
      let end = this.list.length;
      let start = end - n;
      return new Text(this.list.slice(start, end), this.lexicon, this.parent);
    },

    /** use only the nth result*/
    get: function (n) {
      //return an empty result
      if ((!n && n !== 0) || !this.list[n]) {
        return new Text([], this.lexicon, this.parent);
      }
      let ts = this.list[n];
      return new Text([ts], this.lexicon, this.parent);
    },

    filter: function (fn) {
      //treat it as a termlist filter
      if (typeof fn === 'string') {
        let list = this.list.filter((ts) => {
          return ts.has(fn);
        });
        return new Text(list, this.lexicon, this.parent);
      }
      //ad-hoc filter-method
      let list = this.list.filter(fn);
      return new Text(list, this.lexicon, this.parent);
    },
    forEach: function (fn) {
      this.list.forEach(fn);
      return this;
    },
    map: function (fn) {
      //treat it as a termlist filter
      if (typeof fn === 'string') {
        let list = this.list.map((ts) => {
          return ts[fn]();
        });
        return new Text(list, this.lexicon, this.parent);
      }
      let list = this.list.map(fn);
      return new Text(list, this.lexicon, this.parent);
    },
    //turn two result objects into one
    // combine: function (r) {
    //   let list = this.list.concat(r.list);
    //   return new Text(list, this.lexicon, this.parent);
    // },
    concat: function() {
      //any number of params
      for(let i = 0; i < arguments.length; i++) {
        for(let o = 0; o < arguments[i].list.length; o++) {
          this.list.push(arguments[i].list[o]);
        }
      }
      return this;
    },
    /** make it into one sentence/termlist */
    flatten: function () {
      let terms = [];
      this.list.forEach((ts) => {
        terms = terms.concat(ts.terms);
      });
      //dont create an empty ts
      if (!terms.length) {
        return new Text(null, this.lexicon, this.parent);
      }
      let ts = new Terms(terms, this.lexicon, this.parent);
      return new Text([ts], this.lexicon, this.parent);
    },

  };

  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = genericMethods;

},{"../../terms":234}],108:[function(require,module,exports){
'use strict';
// const Terms = require('../index');
// console.log(Terms.build)

const caseMethods = (Text) => {

  const methods = {

    /**He is nice -> He Is Nice */
    toTitleCase: function () {
      this.list.forEach((ts) => {
        ts.toTitleCase();
      });
      return this;
    },
    /**He is nice -> HE IS NICE */
    toUpperCase: function () {
      this.list.forEach((ts) => {
        ts.toUpperCase();
      });
      return this;
    },
    /**He is nice -> he is nice */
    toLowerCase: function () {
      this.list.forEach((ts) => {
        ts.toLowerCase();
      });
      return this;
    },
    /**He is nice -> HeIsNice */
    toCamelCase: function () {
      this.list.forEach((ts) => {
        ts.toCamelCase();
      });
      return this;
    },

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = caseMethods;

},{}],109:[function(require,module,exports){
'use strict';

const deleteMethods = (Text) => {

  const methods = {

    /** destructive, mutating delete*/
    delete: function (reg) {
      //remove all of this, return parent
      if (!reg) {
        this.list.forEach((ts) => {
          ts.delete(reg);
        });
        return this.parent;
      }
      //return subset
      this.list.forEach((ts) => {
        ts.delete(reg);
      });
      return this;
    },

    // //like match, but removes matching terms from original
    // pluck: function (reg) {
    //   let list = [];
    //   this.forEach((ts) => {
    //     list = list.concat(ts.pluck(reg).list);
    //   });
    //   return new Text(list, this);
    // }

  };
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};
module.exports = deleteMethods;

},{}],110:[function(require,module,exports){
'use strict';

const hyphenMethods = (Text) => {

  const methods = {

    /** replace whitespace with hyphens*/
    hyphenate: function () {
      this.forEach((ts) => {
        ts.hyphenate();
      });
      return this;
    },

    /** replace hyphens with whitespace*/
    deHyphenate: function () {
      this.forEach((ts) => {
        ts.deHyphenate();
      });
      return this;
    },


  };
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};
module.exports = hyphenMethods;

},{}],111:[function(require,module,exports){
'use strict';
// const Terms = require('../index');
// console.log(Terms.build)

const insertMethod = (Text) => {

  const methods = {

    /**append/prepend */
    insertBefore: function (str) {
      this.list.forEach((ts) => {
        ts.insertBefore(str)
      })
      return this.parent
    },
    insertAfter: function (str) {
      this.list.forEach((ts) => {
        ts.insertAfter(str)
      })
      return this.parent
    },

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = insertMethod;

},{}],112:[function(require,module,exports){
'use strict';
const splitMethods = (Text) => {

  const methods = {

    /** do a regex-like search through terms and return a subset */
    match: function (reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        //an array of arrays
        let matches = ts.match(reg, verbose);
        matches.list.forEach((ms) => {
          list.push(ms);
        });
      });
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

    not: function(reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        let found = ts.not(reg, verbose);
        list = list.concat(found.list);
      });
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

    /** find the first result */
    matchOne: function (reg, verbose) {
      for (let i = 0; i < this.list.length; i++) {
        let ms = this.list[i].match(reg, verbose);
        if (ms && ms.length) {
          let parent = this.parent || this;
          return new Text(ms, parent);
        }
      }
      return null;
    },

    /** true/false if it countains atleast one match*/
    has: function (reg, verbose) {
      for (let i = 0; i < this.list.length; i++) {
        let ms = this.list[i].match(reg, verbose);
        if (ms && ms.length) {
          return true;
        }
      }
      return false;
    },

    if: function (reg, verbose) {
      let list = [];
      for(let i = 0; i < this.list.length; i++) {
        let m = this.list[i].match(reg, verbose);
        if (m.found) {
          list.push(this.list[i]);
        }
      }
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

    ifNo: function (reg, verbose) {
      let list = [];
      for(let i = 0; i < this.list.length; i++) {
        let m = this.list[i].match(reg, verbose);
        if (!m.found) {
          list.push(this.list[i]);
        }
      }
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

    /** return terms after this match */
    after: function (reg) {
      let after = reg + ' *';
      return this.match(after).not(reg);
    },

    /** return terms before this match */
    before: function (reg) {
      let before = '* ' + reg;
      return this.match(before).not(reg);
    },

  };
  //alias 'and'
  methods.and = methods.match;

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = splitMethods;

},{}],113:[function(require,module,exports){
'use strict';
//
const defaultMethods = {
  whitespace: true,
  case: true,
  numbers: true,
  punctuation: true,
  unicode: true,
  contractions: true
};

const methods = {

  /** make only one space between each word */
  whitespace: (r) => {
    r.forEachTerms((t) => {
      if (i > 0) {
        t.whitespace.before = ' ';
      }
      t.whitespace.after = '';
    });
    return r;
  },

  /** make first-word titlecase, and people, places titlecase */
  case: (r) => {
    r.forEachTerms((t) => {
      if (i === 0 || t.tag.Person || t.tag.Place || t.tag.Organization) {
        t.text = t.term.titlecase();
      } else {
        t.text = t.text.toLowerCase();
      }
    });
    return r;
  },

  /** turn 'five' to 5, and 'fifth' to 5th*/
  numbers: (r) => {
    return r.values().toNumber();
  },

  /** remove commas, semicolons - but keep sentence-ending punctuation*/
  punctuation: (r) => {
    r.forEachTerms((t) => {
      if (i < ts.terms.length - 1) {
        t.text = t.term.noPunctuation();
      }
    });
    return r;
  },

  contractions: (r) => {
    return r.contractions().expand();
  }
};

const normalize = function(obj) {
  obj = obj || defaultMethods;
  Object.keys(obj).forEach((k) => {
    if (obj[k] && methods[k]) {
      result = methods[k](Text);
    }
  });
  return Text;
};

module.exports = normalize;

},{}],114:[function(require,module,exports){
'use strict';
//ngrams are consecutive terms of a specific size
const ngram = function(options) {
  options = options || {};
  options.size = options.size || [1, 2, 3];
  if (typeof options.size === 'number') {
    options.size = [options.size];
  }
  //flatten terms
  let terms = this.list.map((ts) => {
    return ts.mapTerms((t) => t.normal);
  });

  //count freq
  let obj = {};
  //each gram-size
  options.size.forEach((size) => {
    obj[size] = {};
    //each sentence/match
    for(let s = 0; s < terms.length; s++) {
      //start slice at each term
      for(let o = 0; o < terms[s].length - size + 1; o++) {
        let str = terms[s].slice(o, o + size).join(' ');
        obj[size][str] = obj[size][str] || 0;
        obj[size][str] += 1;
      }
    }
  });

  //flatten to an array
  let arr = [];
  Object.keys(obj).forEach((size) => {
    Object.keys(obj[size]).forEach((k) => {
      arr.push({
        text: k,
        count: obj[size][k],
        size: parseInt(size, 10)
      });
    });
  });
  //sort the array
  arr = arr.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    }
    //(the tie-braker)
    if (a.count === b.count && a.size > b.size) {
      return -1;
    }
    return 1;
  });
  return arr;
};

module.exports = ngram;

},{}],115:[function(require,module,exports){
'use strict';
const chalk = require('chalk');

const prettyPrint = (Text) => {

  const methods = {

    check: function () {
      console.log('====');
      this.list.forEach((ts) => {
        console.log('   --');
        ts.check();
      });
      return this;
    },

    /** a character-perfect form*/
    plaintext: function () {
      return this.list.reduce((str, ts) => {
        str += ts.plaintext();
        return str;
      }, '');
    },

    /** a human-readable form*/
    normal: function () {
      return this.list.map((ts) => {
        let str = ts.normal();
        let last = ts.last();
        if (last) {
          let punct = last.endPunctuation();
          if (punct === '.' || punct === '!' || punct === '?') {
            str += punct;
          }
        }
        return str;
      }).join(' ');
    },
    /** a computer-focused, more aggressive normalization than normal()*/
    root: function () {
      return this.list.map((ts) => {
        return ts.root();
      }).join(' ');
    },

    phrases: function () {
      this.list.forEach((ts) => {
        let str = '';
        ts.terms.forEach((t) => {
          let text = t.plaintext();
          if (t.tag.ConditionPhrase) {
            str += chalk.magenta(text);
            return;
          }
          if (t.tag.NounPhrase) {
            str += chalk.cyan(text);
            return;
          }
          if (t.tag.VerbPhrase) {
            str += chalk.red(text);
            return;
          }
          if (t.tag.AdjectivePhrase) {
            str += chalk.green(text);
            return;
          }
          str += text;
        });
        console.log('\n' + str);
      });
    },

    asArray: function () {
      return this.list.map((ts) => ts.normal());
    },

    asHtml: function () {
      let html = this.terms.reduce((str, t) => {
        str += t.render.html();
        return str;
      }, '');
      return '<span>' + html + '</span>';
    },

  };
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = prettyPrint;

},{"chalk":8}],116:[function(require,module,exports){
'use strict';
//
const topk = function (n) {
  //count occurance
  let count = {};
  this.list.forEach((ts) => {
    let str = ts.normal()
    count[str] = count[str] || 0;
    count[str] += 1;
  });
  //turn into an array
  let all = [];
  Object.keys(count).forEach((k) => {
    all.push({
      normal: k,
      count: count[k],
    });
  });
  //add percentage
  all.forEach((o) => {
    o.percent = ((o.count / all.length) * 100).toFixed(2);
  });
  //sort by freq
  all = all.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    }
    return 1;
  });
  if (n) {
    all = all.splice(0, n);
  }
  return all;
};

module.exports = topk;

},{}],117:[function(require,module,exports){
'use strict';

const replaceMethods = (Text) => {

  const methods = {
    /** remove this subset, and insert this new thing in there */
    replace: function (reg, str) {
      this.list.forEach((ts) => {
        ts.replace(reg, str);
      });
      return this.parent;
    },
    replaceWith: function (str) {
      this.list.forEach((ts) => {
        ts.replaceWith(str);
      });
      return this.parent;
    },
  };
  //put them on Result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};
module.exports = replaceMethods;

},{}],118:[function(require,module,exports){
'use strict';
const Terms = require('../../terms');

const sortMethod = (Text) => {

  const methods = {

    /**reorder result.list alphabetically */
    sortAlpha: function () {
      this.list = this.list.sort((a, b) => {
        if (a.plaintext() > b.plaintext()) {
          return 1;
        }
        return -1;
      });
      return this;
    },

    /**reverse the order of result.list */
    reverse: function () {
      this.list = this.list.reverse();
      return this;
    },


    unique: function () {
      let obj = {};
      this.list = this.list.filter((ts) => {
        let str = ts.root();
        if (obj[str]) {
          return false;
        }
        obj[str] = true;
        return true;
      });
      return this;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = sortMethod;

},{"../../terms":234}],119:[function(require,module,exports){
'use strict';

const splitMethods = (Text) => {

  const methods = {
    /** turn result into two seperate results */
    splitAfter: function(reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        ts.splitAfter(reg, verbose).forEach((mts) => {
          list.push(mts);
        });
      });
      this.list = list;
      return this;
    },
    /** turn result into two seperate results */
    splitBefore: function(reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        ts.splitBefore(reg, verbose).forEach((mts) => {
          list.push(mts);
        });
      });
      this.list = list;
      return this;
    },
    /** turn result into two seperate results */
    splitOn: function(reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        ts.splitOn(reg, verbose).forEach((mts) => {
          list.push(mts);
        });
      });
      this.list = list;
      return this;
    },
  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = splitMethods;

},{}],120:[function(require,module,exports){
'use strict';
const Terms = require('../../terms');

const splitMethods = (Text) => {

  const methods = {

    /**tag all the terms in this result as something */
    tag: function (tag, reason) {
      this.list.forEach((ts) => {
        ts.tagAs(tag, reason);
      });
      return this;
    },
    /**remove a tag in all the terms in this result (that had it) */
    unTag: function (tag, reason) {
      this.list.forEach((ts) => {
        ts.unTag(tag, reason);
      });
      return this;
    },

    /** see if these terms can become this tag*/
    canBe: function (tag) {
      this.list.forEach((ts) => {
        ts.terms = ts.terms.filter((t) => {
          return t.term.canBe(tag)
        })
      })
      return this
    },

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = splitMethods;

},{"../../terms":234}],121:[function(require,module,exports){
'use strict';
const Terms = require('../../terms');

const termLoops = (Text) => {

  const methods = {

    mapTerms: function (fn) {
      return this.terms().list.map((ts) => {
        return fn(ts.terms[0]);
      });
    },
    forEachTerms: function(fn) {
      this.terms().list.forEach((ts) => {
        return fn(ts.terms[0]);
      });
      return this;
    },
    filterTerms: function (fn) {
      let list = [];
      this.list.forEach((ts) => {
        let terms = ts.terms.filter(fn);
        if (terms.length) {
          list.push(new Terms(terms, this.parent));
        }
      });
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

  };

  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = termLoops;

},{"../../terms":234}],122:[function(require,module,exports){
module.exports = {
  fns: require('../fns'),
  log: require('../logger'),
  data: require('../data'),
  Terms: require('../terms'),
};

},{"../data":72,"../fns":102,"../logger":104,"../terms":234}],123:[function(require,module,exports){
'use strict';
const Text = require('../../index');

class Acronyms extends Text {
  parse() {
    return this.mapTerms((t) => {
      let parsed = t.text.toUpperCase().replace(/\./g).split('');
      return {
        periods: parsed.join('.'),
        normal: parsed.join(''),
        text: t.text
      };
    });
  }
  static find(r) {
    return r.match('#Acronym');
  }
}

module.exports = Acronyms;

},{"../../index":106}],124:[function(require,module,exports){
'use strict';
const Text = require('../../index');

class Adjectives extends Text {
  parse() {
    return this.mapTerms((t) => {
      return {
        comparative: t.adjective.comparative(),
        superlative: t.adjective.superlative(),
        adverbForm: t.adjective.adverbForm(),
        nounForm: t.adjective.nounForm(),
      };
    });
  }
  static find(r) {
    return r.match('#Adjective');
  }
}

module.exports = Adjectives;

},{"../../index":106}],125:[function(require,module,exports){
'use strict';
const Text = require('../../index');

class Adverbs extends Text {
  parse() {
    return this.mapTerms((t) => {
      return {
        adjectiveForm: t.adverb.adjectiveForm(),
      };
    });
  }
  static find(r){
    return r.match('#Adverb+');
  }
}

module.exports = Adverbs;

},{"../../index":106}],126:[function(require,module,exports){
'use strict';

//the plumbing to turn two words into a contraction
const combine = (a, b) => {
  b.whitespace.after = a.whitespace.after;
  a.whitespace.after = '';
  b.whitespace.before = '';
  a.silent_term = a.text;
  b.silent_term = b.text;
  b.text = '';
  a.tagAs('Contraction', 'new-contraction');
  b.tagAs('Contraction', 'new-contraction');
};

const contract = function(r) {
  //he is -> he's
  r.match('#Noun is').list.forEach((ts) => {
    combine(ts.terms[0], ts.terms[1]);
    ts.terms[0].text += '\'s';
  });
  //he would -> he'd
  r.match('#Noun would').list.forEach((ts) => {
    combine(ts.terms[0], ts.terms[1]);
    ts.terms[0].text += '\'d';
  });
  //they are -> they're
  r.match('(they|we) are').list.forEach((ts) => {
    combine(ts.terms[0], ts.terms[1]);
    ts.terms[0].text += '\'re';
  });
  //they will -> they'll
  r.match('(they|we) will').list.forEach((ts) => {
    combine(ts.terms[0], ts.terms[1]);
    ts.terms[0].text += '\'ll';
  });
  //they have -> they've
  r.match('(they|we) have').list.forEach((ts) => {
    combine(ts.terms[0], ts.terms[1]);
    ts.terms[0].text += '\'ve';
  });
  //i am -> i'm
  r.match('i am').list.forEach((ts) => {
    combine(ts.terms[0], ts.terms[1]);
    ts.terms[0].text += '\'m';
  });
  //is not -> isn't
  r.match('(is|are|#Modal) not').list.forEach((ts) => {
    combine(ts.terms[0], ts.terms[1]);
    ts.terms[0].text += 'n\'t';
  });
  return r;
};

module.exports = contract;

},{}],127:[function(require,module,exports){
'use strict';
const Text = require('../../index');
const contract = require('./contract');

class Contractions extends Text {
  parse() {
    return this.mapTerms((t) => {
      return {
        text: t.text
      };
    });
  }
  expand() {
    this.forEachTerms((t) => {
      if (t.silent_term) {
        if (!t.text) {
          t.whitespace.before = ' ';
        }
        t.text = t.silent_term;
        t.unTag('Contraction', 'expanded');
      }
    });
    return this.all();
  }
  contract() {
    return contract(this.all());
  }
  static find(r) {
    return r.match('#Contraction+');
  }
}

module.exports = Contractions;

},{"../../index":106,"./contract":126}],128:[function(require,module,exports){
'use strict';
const Terms = require('../../paths').Terms;
const parsePunt = require('./parsePunt');
const parseSection = require('./parseSection');
const parseRelative = require('./parseRelative');
const parseDate = require('./parseDate');

class Date extends Terms {
  constructor(terms, context) {
    super(terms, context);
    this.month = this.match('#Month')
  }

  parse() {
    let obj = {}
      //parsing order matters..
      //[two days before] [the start of] [this] [thursday]
    obj.punt = parsePunt(this) //two days before
    obj.section = parseSection(this) //the start of
    obj.relative = parseRelative(this) //this
    obj.relative = parseDate(this) //thursday
    return obj
  }
}
module.exports = Date

},{"../../paths":122,"./parseDate":130,"./parsePunt":131,"./parseRelative":132,"./parseSection":133}],129:[function(require,module,exports){
'use strict';
const Text = require('../../index');
const Date = require('./date');

class Dates extends Text {
  toShortForm() {
    this.match('#Month').forEachTerms((t) => {
      t = t.month.toShortForm();
    });
    this.match('#WeekDay').forEachTerms((t) => {
      t = t.weekday.toShortForm();
    });
    return this;
  }
  toLongForm() {
    this.match('#Month').forEachTerms((t) => {
      t = t.month.toLongForm();
    });
    this.match('#WeekDay').forEachTerms((t) => {
      t = t.weekday.toLongForm();
    });
    return this;
  }
  parse() {
    return this.list.map((ts) => ts.parse());
  }
  static find(r) {
    let dates = r.match('#Date+');
    dates.list = dates.list.map((ts) => {
      return new Date(ts.terms, ts.lexicon, ts.parent, ts.parentTerms);
    });
    return dates;
  }
}

module.exports = Dates;

},{"../../index":106,"./date":128}],130:[function(require,module,exports){
'use strict';
const parseTime = require('./parseTime');
//
const isDate = (num) => {
  if (num && num < 31 && num > 0) {
    return true;
  }
  return false;
};

//please change in one thousand years
const isYear = (num) => {
  if (num && num > 1000 && num < 3000) {
    return true;
  }
  return false;
};

//
const parseDate = (r) => {
  let result = {
    month: null,
    date: null,
    weekday: null,
    year: null,
    knownDate: null,
    timeOfDay: null,
  };
  let m = r.match('(#Holiday|today|tomorrow|yesterday)');
  if (m.found) {
    result.knownDate = m.normal();
  }
  m = r.match('#Month');
  if (m.found) {
    result.month = m.list[0].terms[0].month.index();
  }
  m = r.match('#WeekDay');
  if (m.found) {
    result.weekday = m.list[0].terms[0].weekday.index();
  }
  m = r.match('#Time');
  if (m.found) {
    result.timeOfDay = parseTime(r);
    r.not('#Time'); //unsure
  }

  //january fifth 1992
  m = r.match('#Month #Value #Year');
  if (m.found) {
    let numbers = m.values().numbers();
    if (isDate(numbers[0])) {
      result.date = numbers[0];
    }
    let year = parseInt(r.match('#Year').normal(), 10);
    if (isYear(year)) {
      result.year = year;
    }
  }
  if (!m.found) {
    //january fifth,  january 1992
    m = r.match('#Month #Value');
    if (m.found) {
      let numbers = m.values().numbers();
      let num = numbers[0];
      if (isDate(num)) {
        result.date = num;
      }
    }
    //january 1992
    m = r.match('#Month #Year');
    if (m.found) {
      let num = parseInt(r.match('#Year').normal(), 10);
      if (isYear(num)) {
        result.year = num;
      }
    }
  }

  //fifth of january
  m = r.match('#Value of #Month');
  if (m.found) {
    let num = m.values().numbers()[0];
    if (isDate(num)) {
      result.date = num;
    }
  }
  return result;
};
module.exports = parseDate;

},{"./parseTime":134}],131:[function(require,module,exports){
'use strict';
//parse '5 days before', 'three weeks after'..
const durations = {
  year: true,
  quarter: true,
  month: true,
  week: true,
  weekend: true,
  day: true,
  hour: true,
};

const parsePunt = (r) => {
  let direction = null;
  let duration = {};
  //two days after
  let m = r.match('#Value #Duration (from|after|following)');
  if (m.found) {
    direction = 'forward';
  } else {
    //two days before
    m = r.match('#Value #Duration (before)');
    if (m.found) {
      direction = 'backward';
    }
  }
  //interpret 'value + duration'
  if (m.found) {
    r.match('#Value #Duration').forEach((ts) => {
      // console.log(ts.match('#Value').values().toNumber().plaintext());
      let num = ts.match('#Value').values().toNumber().numbers()[0];
      if (num || num === 0) {
        let str = ts.match('#Duration').nouns().toSingular().normal();
        if (durations[str]) {
          duration[str] = num;
        }
      }
    });
  }
  return {
    direction: direction,
    duration: duration
  };
};
module.exports = parsePunt;

},{}],132:[function(require,module,exports){
'use strict';
//
const relatives = {
  this: 'this',
  next: 'next',
  last: 'last',
  upcoming: 'next',
};
const parseRelative = (r) => {
  let known = '(' + Object.keys(relatives).join('|') + ')';
  let m = r.match(`${known}+`).lastTerm();
  if (m.found) {
    let str = m.match(known).normal();
    return relatives[str];
  }
};
module.exports = parseRelative;

},{}],133:[function(require,module,exports){
'use strict';
//
const sections = {
  start: 'start',
  end: 'end',
  middle: 'middle',
  beginning: 'start',
  ending: 'end',
  midpoint: 'middle',
  midst: 'middle',
}
const parseSection = (r) => {
  let known = '(' + Object.keys(sections).join('|') + ')'
  let m = r.match(`the? ${known} of`)
  if (m.found) {
    let str = m.match(known).normal()
    return sections[str]
  }
}
module.exports = parseSection

},{}],134:[function(require,module,exports){
'use strict';
//
const isHour = (num) => {
  if (num && num > 0 && num < 25) {
    return true;
  }
  return false;
};
const isMinute = (num) => {
  if (num && num > 0 && num < 60) {
    return true;
  }
  return false;
};


const parseTime = (r) => {
  let result = {
    logic: null,
    hour: null,
    minute: null,
    second: null,
    timezone: null
  };

  let logic = r.match('(by|before|for|during|at|until|after) #Time').firstTerm();
  if (logic.found) {
    result.logic = logic.normal();
  }

  let time = r.match('#Time');
  time.forEachTerms((t) => {
    //3pm
    let m = t.text.match(/([12]?[0-9]) ?(am|pm)/i);
    if (m) {
      result.hour = parseInt(m[1], 10);
      if (m[2] === 'pm') {
        result.hour += 12;
      }
      if (!isHour(result.hour)) {
        result.hour = null;
      }
    }
    //3:15
    m = t.text.match(/([12]?[0-9]):([0-9][0-9]) ?(am|pm)?/i);
    if (m) {
      result.hour = parseInt(m[1], 10);
      result.minute = parseInt(m[2], 10);
      if (!isMinute(result.minute)) {
        result.minute = null;
      }
      if (m[3] === 'pm') {
        result.hour += 12;
      }
      if (!isHour(result.hour)) {
        result.hour = null;
      }
    }
  });
  return result;
};
module.exports = parseTime;

},{}],135:[function(require,module,exports){
'use strict';
const Text = require('../../index');

class HashTags extends Text {
  parse() {
    return this.mapTerms((t) => {
      return {
        text: t.text
      };
    });
  }
  static find(r){
    return r.match('#HashTag')
  }
}

module.exports = HashTags;

},{"../../index":106}],136:[function(require,module,exports){
'use strict';
const Text = require('../../index');
// const Noun = require('./noun');

class Nouns extends Text {
  toSingular() {}
  toPlural() {}
  parse() {
    return this.mapTerms((t) => {
      return {
        article: t.noun.makeArticle(),
        singular: t.noun.singular(),
        plural: t.noun.plural(),
      };
    });
  }
  static find(r) {
    r = r.splitAfter('#Comma');
    r = r.match('#Noun+');
    r = r.not('#Pronoun');
    // r = r.not('#Date');
    return r;
  }
}
Nouns.prototype.toPlural = require('./toPlural');
Nouns.prototype.toSingular = require('./toSingular');

module.exports = Nouns;

},{"../../index":106,"./toPlural":137,"./toSingular":138}],137:[function(require,module,exports){
'use strict';
const twistArticle = require('./twistArticle');

//inflect a term or termlist
const toPlural = function(options) {
  options = options || {};
  this.list = this.list.map((ts) => {
    for(let i = 0; i < ts.terms.length; i++) {
      let t = ts.terms[i];
      if (t.tag.Noun && t.noun.hasPlural()) {
        t.text = t.noun.plural();
        t.unTag('Singular', 'toPlural()');
        t.tagAs('Plural', 'toPlural()');
        //also twist the determiner, eg -'a' to 'the'
        if (!options.leave_article) {
          ts = twistArticle.plural(ts, i);
        }
      }
    }
    return ts;
  });
  return this
};

module.exports = toPlural;

},{"./twistArticle":139}],138:[function(require,module,exports){
'use strict';
const twistArticle = require('./twistArticle');

//inflect a term or termlist
const toSingular = function (options) {
  options = options || {};
  this.list = this.list.map((ts) => {
    let len = ts.terms.length;
    for (let i = 0; i < len; i++) {
      let t = ts.terms[i];
      if (t.tag.Noun && t.noun.hasPlural()) {
        t.text = t.noun.singular() || t.text;
        t.unTag('Plural', 'toSingular()');
        t.tagAs('Singular', 'toSingular()');
        //also twist the determiner, eg -'a' to 'the'
        if (!options.leave_article) {
          ts = twistArticle.singular(ts, i);
        }
      }
    }
    return ts;
  });
  return this
};

module.exports = toSingular;

},{"./twistArticle":139}],139:[function(require,module,exports){
'use strict';

//articles that are sensitive to singular/plural
const pluralMap = {
  a: 'the',
  an: 'the',
  the: 'the',
  this: 'those',
};
const singularMap = {
  these: 'this',
  those: 'that',
};

//the article comes before this noun
const findArticle = function (ts, i) {
  //look backward a couple terms for the article
  for (let o = i; o >= 0; o -= 1) {
    let t = ts.terms[o];
    //smells like an article
    if (t && pluralMap[t.normal] || singularMap[t.normal]) {
      return t;
    }
    //a verb ends the search, i think.
    if (t.tag.Verb) {
      return null;
    }
    //don't go too far back..
    if (i - o > 4) {
      return null;
    }
  }
  return null;
};

const plural = (ts, i) => {
  let article = findArticle(ts, i);
  if (article && pluralMap[article.normal]) {
    article.text = pluralMap[article.normal];
  }
  return ts;
};

const singular = (ts, i) => {
  let article = findArticle(ts, i);
  if (article) {
    if (singularMap[article.normal]) {
      article.text = singularMap[article.normal];
    } else {
      // article.text = ts.terms[i].noun.makeArticle(); // (a/an)
    }
  } else {
    // let art = ts.terms[i].noun.makeArticle();
    // ts.insertAt(art, i - 1);
  }
  return ts;
};

module.exports = {
  plural: plural,
  singular: singular,
};

},{}],140:[function(require,module,exports){
'use strict';
const Text = require('../../index');

class Organizations extends Text {
  parse() {
    return this.mapTerms((t) => {
      return {
        text: t.text
      };
    });
  }
  static find(r) {
    r = r.splitAfter('#Comma');
    return r.match('#Organization');
  }
}

module.exports = Organizations;

},{"../../index":106}],141:[function(require,module,exports){
'use strict';
const log = require('../../paths').log
  // make a statistical assumption about the gender of the person based on their given name
  // used for pronoun resolution only.
  // not intended for classification, or discrimination of people.
const gender = function (firstName) {
  if (!firstName) {
    return null;
  }
  //statistical guesses
  if (firstName.match(/.(i|ee|[a|e]y|a)$/i)) { //this is almost-always true
    log.tell('Female-name suffix')
    return 'Female';
  }
  if (firstName.match(/[ou]$/i)) { //if it ends in a 'oh or uh', male
    log.tell('Male-name suffix')
    return 'Male';
  }
  if (firstName.match(/(nn|ll|tt)/i)) { //if it has double-consonants, female
    log.tell('Female-name consonant-doubling')
    return 'Female';
  }
  // name not recognized, or recognized as of indeterminate gender
  return null;
};
module.exports = gender;

},{"../../paths":122}],142:[function(require,module,exports){
'use strict';
const Text = require('../../index');
const Person = require('./person');
//this is used for pronoun and honorifics, and not intented for more-than grammatical use (see #117)

class People extends Text {
  parse() {
    return this.list.map((ts) => ts.parse());
  }
  static find(r) {
    let people = r.splitAfter('#Comma');
    people = people.match('#Person+');
    people.list = people.list.map((ts) => {
      return new Person(ts.terms, ts.lexicon, ts.parent, ts.parentTerms);
    });
    return people;
  }
}

module.exports = People;

},{"../../index":106,"./person":143}],143:[function(require,module,exports){
'use strict';
const Terms = require('../../paths').Terms;
const guessGender = require('./guessGender');
const log = require('../../paths').log;

class Person extends Terms {
  constructor(arr, lexicon, parent) {
    super(arr, lexicon, parent);
    this.firstName = this.match('#FirstName+');
    this.middleName = this.match('#Acronym+');
    this.honorifics = this.match('#Honorific');
    this.lastName = this.match('#LastName+');
    //assume first-last
    if (!this.firstName && this.length === 2) {
      let m = this.not('(#Acronym|#Honorific)');
      this.firstName = m.first();
      this.lastName = m.last();
    } else {
      // this.lastName = this.match('#Person').list[0];
    }
    return this;
  }
  guessGender() {
    //try known honorifics
    if (this.honorifics.match('(mr|mister|sr|sir|jr)').found) {
      log.tell('known male honorific');
      return 'Male';
    }
    if (this.honorifics.match('(mrs|miss|ms|misses|mme|mlle)').found) {
      log.tell('known female honorific');
      return 'Female';
    }
    //try known first-names
    if (this.firstName.match('#MalePerson').found) {
      log.tell('known male name');
      return 'Male';
    }
    if (this.firstName.match('#FemalePerson').found) {
      log.tell('known female name');
      return 'Female';
    }
    //look-for regex clues
    return guessGender(this.firstName.normal());
  }
  parse() {
    return {
      firstName: this.firstName.normal(),
      middleName: this.middleName.normal(),
      lastName: this.lastName.normal(),
      genderGuess: this.guessGender(),
      honorifics: this.honorifics.asArray()
    };
  }
  root() {
    let first = this.firstName.root();
    let last = this.lastName.root();
    if (first && last) {
      return first + ' ' + last;
    }
    return last || first || this.root();
  }
}
module.exports = Person;

},{"../../paths":122,"./guessGender":141}],144:[function(require,module,exports){
'use strict';
const Text = require('../../index');

class PhoneNumbers extends Text {
  parse() {
    return this.mapTerms((t) => {
      return {
        text: t.text
      };
    });
  }
  static find(r) {
    r = r.splitAfter('#Comma');
    return r.match('#PhoneNumber+');
  }
}

module.exports = PhoneNumbers;

},{"../../index":106}],145:[function(require,module,exports){
'use strict';
const Text = require('../../index');
const Place = require('./place');

class Places extends Text {
  parse() {
    return this.mapTerms((t) => {
      return {
        text: t.text
      };
    });
  }
  static find(r) {
    r = r.splitAfter('#Comma');
    r = r.match('#Place+');
    r.list = r.list.map((ts) => {
      return new Place(ts.terms, ts.lexicon, ts.parent, ts.parentTerms);
    });
    return r;
  }
}

module.exports = Places;

},{"../../index":106,"./place":146}],146:[function(require,module,exports){
'use strict';
const Terms = require('../../paths').Terms;

class Place extends Terms {
  constructor(arr, lexicon, parent) {
    super(arr, lexicon, parent);
    this.city = this.match('#City');
    this.country = this.match('#Country');
  }
  get isA() {
    return 'Place';
  }
  root() {
    return this.city.root();
  }
}
module.exports = Place;

},{"../../paths":122}],147:[function(require,module,exports){
'use strict';
const Text = require('../../index');
const Sentence = require('./sentence');


class Sentences extends Text {

  parse() {
    return this.list.map((ts) => {
      return {
        text: ts.plaintext(),
        normal: ts.normal()
      };
    });
  }

  /** inflect the main/first noun*/
  toSingular() {
    let nouns = this.match('#Noun').match('!#Pronoun').firstTerm();
    nouns.things().toSingular();
    return this;
  }
  toPlural() {
    let nouns = this.match('#Noun').match('!#Pronoun').firstTerm();
    nouns.things().toPlural();
    return this;
  }

  /** negate the main/first copula*/
  toNegative() {
    let cp = this.match('#Copula');
    if (cp.found) {
      cp.firstTerm().verbs().toNegative();
    } else {
      this.match('#Verb').firstTerm().verbs().toNegative();
    }
    return this;
  }
  toPositive() {
    this.match('#Negative').delete();
    return this;
  }

  /** conjugate the main/first verb*/
  toPast() {
    return this;
  }
  toPresent() {
    return this;
  }
  toFuture() {
    return this;
  }

  /** look for 'was _ by' patterns */
  isPassive() {
    //haha
    return this.match('was #Adverb? #PastTense #Adverb? by').found;
  }
  static find(r) {
    r = r.all();
    r.list = r.list.map((ts) => {
      return new Sentence(ts.terms, ts.lexicon, ts.parent, ts.parentTerms);
    });
    return r;
  }
}

module.exports = Sentences;

},{"../../index":106,"./sentence":149}],148:[function(require,module,exports){
'use strict';
const Text = require('../index');

class Questions extends Text {
  parse() {
    return this.list.map((ts) => {
      return {
        text: ts.plaintext(),
        normal: ts.normal()
      };
    });
  }
  static find(r) {
    r = r.all();
    return r.filter((ts) => {
      return ts.last().endPunctuation() === '?';
    });
  }
}

module.exports = Questions;

},{"../index":147}],149:[function(require,module,exports){
'use strict';
const Terms = require('../../paths').Terms;
class Sentence extends Terms {

}
module.exports = Sentence;

},{"../../paths":122}],150:[function(require,module,exports){
'use strict';
const Text = require('../index');

class Statements extends Text {
  parse() {
    return this.mapTerms((t) => {
      return {};
    });
  }
  static find(r) {
    return r.filter((ts) => {
      return ts.last().endPunctuation() !== '?';
    });
  }
}

module.exports = Statements;

},{"../index":147}],151:[function(require,module,exports){
'use strict';
const Text = require('../../index');
// const Noun = require('./noun');

class Things extends Text {
  parse() {
    return this.mapTerms((t) => {
      return {
        text: t.text
      };
    });
  }
  static find(r) {
    r = r.splitAfter('#Comma');
    let yup = r.people();
    yup.concat(r.places());
    yup.concat(r.organizations());
    yup = yup.clone();
    // yup.toUpperCase();
    return yup;
  }
}

module.exports = Things;

},{"../../index":106}],152:[function(require,module,exports){
'use strict';
const Text = require('../../index');

class Urls extends Text {
  parse() {
    return this.mapTerms((t) => {
      return {
        text: t.text
      };
    });
  }
  static find(r) {
    return r.match('#Url');
  }
}

module.exports = Urls;

},{"../../index":106}],153:[function(require,module,exports){
'use strict';
const Text = require('../../index');
const Value = require('./value');

class Values extends Text {
  parse() {
    return this.list.map((ts) => {
      return ts.parse();
    });
  }
  /** five -> 5 */
  numbers() {
    return this.list.map((ts) => {
      return ts.number();
    });
  }
  /** five -> '5' */
  toNumber() {
    this.forEach((ts) => {
      ts.toNumber();
    });
    return this;
  }
  /**5 -> 'five' */
  toTextValue() {
    this.forEach((ts) => {
      ts.toTextValue();
    });
    return this;
  }
  /**5th -> 5 */
  toCardinal() {
    this.forEach((ts) => {
      ts.toCardinal();
    });
    return this;
  }
  /**5 -> 5th */
  toOrdinal() {
    this.forEach((ts) => {
      ts.toOrdinal();
    });
    return this;
  }
  /**5900 -> 5,900 */
  toNiceNumber() {
    this.forEach((ts) => {
      ts.toNiceNumber();
    });
    return this;
  }
  static find(r) {
    r = r.match('#Value+');
    if (r.has('. (a|an)')) {
      r = r.not('(a|an)$');
    }
    r.list = r.list.map((ts) => {
      return new Value(ts.terms, ts.lexicon, ts.parent, ts.parentTerms);
    });
    return r;
  }
}
// Values.prototype.clone = function() {
//   console.log('=-');
//   let r = this.clone();
//   return Values.find(r);
// };
module.exports = Values;

},{"../../index":106,"./value":165}],154:[function(require,module,exports){
'use strict';
const toNumber = require('../toNumber');

//turn a number like 5 into an ordinal like 5th
const numOrdinal = function(ts) {
  let num = toNumber(ts);
  if (!num && num !== 0) {
    return null;
  }
  //the teens are all 'th'
  let tens = num % 100;
  if (tens > 10 && tens < 20) {
    return '' + num + 'th';
  }
  //the rest of 'em
  const mapping = {
    0: 'th',
    1: 'st',
    2: 'nd',
    3: 'rd'
  };
  let str = '' + num;
  let last = str.slice(str.length - 1, str.length);
  if (mapping[last]) {
    str += mapping[last];
  } else {
    str += 'th';
  }
  return str;
};

module.exports = numOrdinal;

},{"../toNumber":160}],155:[function(require,module,exports){
module.exports = require('../../paths');

},{"../../paths":122}],156:[function(require,module,exports){
'use strict';
const toNumber = require('../toNumber');
const toText = require('../toText');
const ordinalWord = require('../../../paths').data.ordinalMap.toOrdinal;
//
const textOrdinal = (ts) => {
  let num = toNumber(ts);
  let words = toText(num);
  //convert the last number to an ordinal
  let last = words[words.length - 1];
  words[words.length - 1] = ordinalWord[last] || last;
  return words.join(' ');
};

module.exports = textOrdinal;

},{"../../../paths":122,"../toNumber":160,"../toText":164}],157:[function(require,module,exports){
'use strict';

const niceNumber = function (num) {
  if (!num && num !== 0) {
    return null;
  }
  num = '' + num;
  let x = num.split('.');
  let x1 = x[0];
  let x2 = x.length > 1 ? '.' + x[1] : '';
  let rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
};
module.exports = niceNumber;

},{}],158:[function(require,module,exports){
const p = require('../paths');
const numbers = p.data.numbers;

//setup number-word data
const ones = Object.assign({}, numbers.ordinal.ones, numbers.cardinal.ones);
const teens = Object.assign({}, numbers.ordinal.teens, numbers.cardinal.teens);
const tens = Object.assign({}, numbers.ordinal.tens, numbers.cardinal.tens);
const multiples = Object.assign({}, numbers.ordinal.multiples, numbers.cardinal.multiples);

module.exports = {
  ones: ones,
  teens: teens,
  tens: tens,
  multiples: multiples
};

},{"../paths":155}],159:[function(require,module,exports){
'use strict';

//support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
const findModifiers = (str) => {
  const mults = [{
      reg: /^(minus|negative)[\s\-]/i,
      mult: -1
    }, {
      reg: /^(a\s)?half[\s\-](of\s)?/i,
      mult: 0.5
    },
    //  {
    //   reg: /^(a\s)?quarter[\s\-]/i,
    //   mult: 0.25
    // }
  ];
  for (let i = 0; i < mults.length; i++) {
    if (str.match(mults[i].reg)) {
      return {
        amount: mults[i].mult,
        str: str.replace(mults[i].reg, '')
      };
    }
  }
  return {
    amount: 1,
    str: str
  };
};

module.exports = findModifiers;

},{}],160:[function(require,module,exports){
'use strict';
const parseNumeric = require('./parseNumeric');
const findModifiers = require('./findModifiers');
const words = require('./data');
const isValid = require('./validate');
const parseDecimals = require('./parseDecimals');
const log = require('../paths').log;
const path = 'parseNumber';

//some numbers we know
const casualForms = {
  // 'a few': 3,
  'a couple': 2,
  'a dozen': 12,
  'two dozen': 24,
  'zero': 0,
};

// a 'section' is something like 'fifty-nine thousand'
// turn a section into something we can add to - like 59000
const section_sum = (obj) => {
  // console.log(obj);
  return Object.keys(obj).reduce((sum, k) => {
    sum += obj[k];
    return sum;
  }, 0);
};

const alreadyNumber = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    if (!ts.terms[i].tag.NumericValue) {
      return false;
    }
  }
  return true;
};

//turn a string into a number
const parse = function(ts) {
  log.here('parseNumber', path);
  let str = ts.normal();

  //convert some known-numbers
  if (casualForms[str] !== undefined) {
    return casualForms[str];
  }
  //'a/an' is 1
  if (str === 'a' || str === 'an') {
    return 1;
  }
  //handle a string of mostly numbers
  if (alreadyNumber(ts)) {
    return parseNumeric(ts.normal());
  }
  let modifier = findModifiers(str);
  str = modifier.str;
  let last_mult = null;
  let has = {};
  let sum = 0;
  let isNegative = false;
  let terms = str.split(/[ -]/);
  // console.log(terms);
  for (let i = 0; i < terms.length; i++) {
    let w = terms[i];
    // console.log(i + '  - ' + w);
    if (!w || w === 'and') {
      continue;
    }
    if (w === '-' || w === 'negative') {
      isNegative = true;
      continue;
    }
    if (w.startsWith('-')) {
      isNegative = true;
      w = w.substr(1);
    }
    //decimal mode
    if (w === 'point') {
      sum += section_sum(has);
      sum += parseDecimals(terms.slice(i + 1, terms.length));
      sum *= modifier.amount;
      return sum;
    }
    //improper fraction
    const improperFractionMatch = w.match(/^([0-9,\. ]+)\/([0-9,\. ]+)$/);
    if (improperFractionMatch) {
      log.here('fractionMath', path);
      const num = parseFloat(improperFractionMatch[1].replace(/[, ]/g, ''));
      const denom = parseFloat(improperFractionMatch[2].replace(/[, ]/g, ''));
      if (denom) {
        sum += (num / denom) || 0;
      }
      continue;
    }
    //prevent mismatched units, like 'seven eleven'
    if (!isValid(w, has)) {
      log.tell('invalid state', path);
      log.tell(has, path);
      return null;
    }
    //buildup section, collect 'has' values
    if (w.match(/^[0-9\.]+$/)) {
      has['ones'] = parseFloat(w, 10); //not technically right
    } else if (words.ones[w]) {
      has['ones'] = words.ones[w];
    } else if (words.teens[w]) {
      has['teens'] = words.teens[w];
    } else if (words.tens[w]) {
      has['tens'] = words.tens[w];
    } else if (words.multiples[w]) {
      let mult = words.multiples[w];
      //something has gone wrong : 'two hundred five hundred'
      if (mult === last_mult) {
        log.tell('invalid multiplier', path);
        return null;
      }
      //support 'hundred thousand'
      //this one is tricky..
      if (mult === 100 && terms[i + 1]) {
        // has['hundreds']=
        var w2 = terms[i + 1];
        if (words.multiples[w2]) {
          mult *= words.multiples[w2]; //hundredThousand/hundredMillion
          i += 1;
        }
      }
      //natural order of things
      //five thousand, one hundred..
      if (last_mult === null || mult < last_mult) {
        sum += (section_sum(has) || 1) * mult;
        last_mult = mult;
        has = {};
      } else {
        //maybe hundred .. thousand
        sum += section_sum(has);
        last_mult = mult;
        sum = (sum || 1) * mult;
        has = {};
      }
    }
  }
  //dump the remaining has values
  sum += section_sum(has);
  //post-process add modifier
  sum *= modifier.amount;
  sum *= isNegative ? -1 : 1;
  //dont return 0, if it went straight-through
  if (sum === 0) {
    return null;
  }
  return sum;
};

module.exports = parse;

},{"../paths":155,"./data":158,"./findModifiers":159,"./parseDecimals":161,"./parseNumeric":162,"./validate":163}],161:[function(require,module,exports){
'use strict';
const words = require('./data');

//concatenate into a string with leading '0.'
const parseDecimals = function(arr) {
  let str = '0.';
  for (let i = 0; i < arr.length; i++) {
    let w = arr[i];
    if (words.ones[w]) {
      str += words.ones[w];
    } else if (words.teens[w]) {
      str += words.teens[w];
    } else if (words.tens[w]) {
      str += words.tens[w];
    } else if (w.match(/^[0-9]$/)) {
      str += w;
    } else {
      return 0;
    }
  }
  return parseFloat(str);
};

module.exports = parseDecimals;

},{"./data":158}],162:[function(require,module,exports){
'use strict';
//parse a string like "4,200.1" into Number 4200.1
const parseNumeric = (str) => {
  //remove ordinal - 'th/rd'
  str = str.replace(/1st$/, '1');
  str = str.replace(/2nd$/, '2');
  str = str.replace(/3rd$/, '3');
  str = str.replace(/([4567890])r?th$/, '$1');
  //remove prefixes
  str = str.replace(/^[$€¥£¢]/, '');
  //remove suffixes
  str = str.replace(/[%$€¥£¢]$/, '');
  //remove commas
  str = str.replace(/,/g, '');
  //split '5kg' from '5'
  str = str.replace(/([0-9])([a-z]{1,2})$/, '$1');
  return parseFloat(str);
};

module.exports = parseNumeric;

},{}],163:[function(require,module,exports){
'use strict';
const words = require('./data')

//prevent things like 'fifteen ten', and 'five sixty'
const isValid = (w, has) => {
  if (words.ones[w]) {
    if (has.ones || has.teens) {
      return false;
    }
  } else if (words.teens[w]) {
    if (has.ones || has.teens || has.tens) {
      return false;
    }
  } else if (words.tens[w]) {
    if (has.ones || has.teens || has.tens) {
      return false;
    }
  }
  return true;
};
module.exports = isValid

},{"./data":158}],164:[function(require,module,exports){
'use strict';
// turns an integer/float into a textual number, like 'fifty-five'

//turn number into an array of magnitudes, like [[5, million], [2, hundred]]
const breakdown_magnitudes = function(num) {
  let working = num;
  let have = [];
  const sequence = [
    [1000000000, 'million'],
    [100000000, 'hundred million'],
    [1000000, 'million'],
    [100000, 'hundred thousand'],
    [1000, 'thousand'],
    [100, 'hundred'],
    [1, 'one']
  ];
  sequence.forEach((a) => {
    if (num > a[0]) {
      let howmany = Math.floor(working / a[0]);
      working -= howmany * a[0];
      if (howmany) {
        have.push({
          unit: a[1],
          count: howmany
        });
      }
    }
  });
  return have;
};

//turn numbers from 100-0 into their text
const breakdown_hundred = function(num) {
  const tens_mapping = [
    ['ninety', 90],
    ['eighty', 80],
    ['seventy', 70],
    ['sixty', 60],
    ['fifty', 50],
    ['forty', 40],
    ['thirty', 30],
    ['twenty', 20]
  ];
  const ones_mapping = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen'
  ];
  let arr = []
  for (let i = 0; i < tens_mapping.length; i++) {
    if (num >= tens_mapping[i][1]) {
      num -= tens_mapping[i][1];
      arr.push(tens_mapping[i][0])
    }
  }
  //(hopefully) we should only have 20-0 now
  if (ones_mapping[num]) {
    arr.push(ones_mapping[num])
  }
  return arr
};

/** print-out 'point eight nine'*/
const handle_decimal = (num) => {
  const names = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'
  ]
  let arr = []
  //parse it out like a string, because js math is such shit
  let decimal = ('' + num).match(/\.([0-9]+)/)
  if (!decimal || !decimal[0]) {
    return arr
  }
  arr.push('point')
  let decimals = decimal[0].split('')
  for (let i = 0; i < decimals.length; i++) {
    arr.push(names[decimals[i]])
  }
  return arr
}

/** turns an integer into a textual number */
const to_text = function(num) {
  let arr = []
  //handle negative numbers
  if (num < 0) {
    arr.push('negative')
    num = Math.abs(num);
  }
  //break-down into units, counts
  let units = breakdown_magnitudes(num);
  //build-up the string from its components
  for (let i = 0; i < units.length; i++) {
    let unit_name = units[i].unit;
    if (unit_name === 'one') {
      unit_name = '';
      //put an 'and' in here
      if (arr.length > 1) {
        arr.push('and')
      }
    }
    arr = arr.concat(breakdown_hundred(units[i].count))
    arr.push(unit_name)
  }
  //also support decimals - 'point eight'
  arr = arr.concat(handle_decimal(num))
  //remove empties
  arr = arr.filter((s) => s)
  if (arr.length === 0) {
    arr[0] = 'zero'
  }
  return arr
};

module.exports = to_text;

// console.log(to_text(-1000.8));

},{}],165:[function(require,module,exports){
'use strict';
const paths = require('../../paths');
const Terms = paths.Terms;
const parse = require('./toNumber');
const toText = require('./toText');
const toNiceNumber = require('./toNiceNumber');
const numOrdinal = require('./numOrdinal');
const textOrdinal = require('./textOrdinal');

const isOrdinal = (ts) => {
  let t = ts.lastTerm();
  return t.tag.Ordinal === true;
};
const isText = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    if (ts.terms[i].tag.TextValue) {
      return true;
    }
  }
  return false;
};
const isNumber = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (t.tag.TextValue || t.tag.NiceNumber || !t.tag.NumericValue) {
      return false;
    }
  }
  return true;
};

class Value extends Terms {

  number() {
    let num = parse(this);
    return num;
  }
  /** five -> '5' */
  toNumber() {
    //is already
    if (isNumber(this)) {
      return this;
    }
    //otherwise,
    if (isOrdinal(this)) {
      let num = numOrdinal(this);
      this.replaceWith(num, 'Value');
    } else {
      let num = parse(this);
      if (num !== null) {
        this.replaceWith('' + num, 'Value');
      }
    }
    return this;
  }
  /**5 -> 'five' */
  toTextValue() {
    //is already
    if (isText(this)) {
      return this;
    }
    //otherwise, parse it
    if (isOrdinal(this)) {
      let str = textOrdinal(this);
      this.replaceWith(str, 'Value');
    } else {
      let num = '' + parse(this);
      let str = toText(num).join(' ');
      this.replaceWith(str, 'Value');
    }
    return this;
  }

  /**5th -> 5 */
  toCardinal() {
    //already
    if (!isOrdinal(this)) {
      return this;
    }
    //otherwise,
    if (isText(this)) {
      let num = '' + parse(this);
      let str = toText(num).join(' ');
      this.replaceWith(str, 'Value');
    } else {
      let num = '' + parse(this);
      this.replaceWith(num, 'Value');
    }
    return this;
  }

  /**5 -> 5th */
  toOrdinal() {
    //already
    if (isOrdinal(this)) {
      return this;
    }
    //otherwise,
    if (isText(this)) {
      let str = textOrdinal(this);
      this.replaceWith(str, 'Value');
    } else {
      //number-ordinal
      let str = numOrdinal(this);
      this.replaceWith(str, 'Value');
    }
    return this;
  }

  /**5900 -> 5,900 */
  toNiceNumber() {
    let num = parse(this);
    let str = toNiceNumber(num);
    this.replaceWith(str, 'Value');
    return this;
  }

  parse() {
    let numV = this.clone().toNumber();
    let txtV = this.clone().toTextValue();
    let obj = {
      NumericValue: {
        cardinal: numV.toCardinal().plaintext(),
        ordinal: numV.toOrdinal().plaintext(),
        nicenumber: this.toNiceNumber().plaintext(),
      },
      TextValue : {
        cardinal: txtV.toCardinal().plaintext(),
        ordinal: txtV.toOrdinal().plaintext(),
      }
    };
    obj.number = this.number();
    return obj;
  }
}
Value.prototype.clone = function() {
  let terms = this.terms.map((t) => {
    return t.clone();
  });
  return new Value(terms, this.lexicon, this.parent, this.parentTerms);
};
module.exports = Value;

},{"../../paths":122,"./numOrdinal":154,"./textOrdinal":156,"./toNiceNumber":157,"./toNumber":160,"./toText":164}],166:[function(require,module,exports){
'use strict';
const Text = require('../../index');

class Verbs extends Text {
  parse() {
    return this.mapTerms((t) => {
      return t.verb.conjugate();
    });
  }
  conjugate(verbose) {
    return this.mapTerms((t) => {
      return t.verb.conjugate(verbose);
    });
  }
  isNegative() {
    return this.match('#Negative').found;
  }
  toNegative() {
    if (this.isNegative()) {
      return this;
    }
    let t = this.lastTerm().list[0].terms[0];
    if (t.tag.Copula) {
      t.copula.toNegative();
    } else {
      t.verb.toNegative();
    }
    return this;
  }
  toPositive() {
    return this;
  }
  toPast() {
    let t = this.list[0].terms[0];
    this.contractions().expand();
    if (t) {
      t.text = t.verb.pastTense();
    }
    return this;
  }
  toPresent() {
    let t = this.list[0].terms[0];
    this.contractions().expand();
    if (t) {
      t.text = t.verb.presentTense();
    }
    return this;
  }
  toFuture() {
    let t = this.list[0].terms[0];
    this.contractions().expand();
    if (t) {
      t.text = t.verb.futureTense();
    }
    return this;
  }
  static find(r) {
    return r.match('#Verb+');
  }
}


module.exports = Verbs;

},{"../../index":106}],167:[function(require,module,exports){
'use strict';
const log = require('../paths').log;
const path = 'date_correction';

//ambiguous 'may' and 'march'
const months = '(may|march|jan|april|sep)';
const preps = '(in|by|before|for|during|on|until|after|of)';
const thisNext = '(last|next|this|previous|current|upcoming|coming)';
const sections = '(start|end|middle|starting|ending|midpoint|beginning)';
// const dayTime = '(night|evening|morning|afternoon|day|daytime)';

// const isDate = (num) => {
//   if (num && num < 31 && num > 0) {
//     return true;
//   }
//   return false;
// };

//please change in one thousand years
const isYear = (num) => {
  if (num && num > 1000 && num < 3000) {
    return true;
  }
  return false;
};

const corrections = function (r) {
  log.here(path);

  //months
  r.match(`${months} (#Determiner|#Value|#Date)`).term(0).tag('Month', 'correction-may');
  r.match(`#Date ${months}`).term(1).tag('Month', 'correction-may');
  r.match(`${preps} ${months}`).term(1).tag('Month', 'correction-may');
  r.match(`(next|this|last) ${months}`).term(1).tag('Month', 'correction-may'); //maybe not 'this'

  //values
  r.match('#Value #Abbreviation').tag('Value', 'value-abbr');
  r.match('a #Value').tag('Value', 'a-value');
  r.match('(minus|negative) #Value').tag('Value', 'minus-value');
  r.match('#Value grand').tag('Value', 'value-grand');
  r.match('#Ordinal (half|quarter)').tag('Value', 'ordinal-half');
  r.match('(half|quarter) #Ordinal').tag('Value', 'half-ordinal');
  r.match('#Value and #Value').tag('Value', 'value-and-value');
  r.match('#Value point #Value').tag('Value', 'value-point-value');

  //time
  r.match('#Cardinal #Time').tag('Time', 'value-time');
  r.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time');
  r.match('(#Value|#Time) (am|pm)').tag('Time', 'value-ampm');
  r.match('all day').tag('Time', 'all-day');

  //seasons
  r.match(`${preps}? ${thisNext} (spring|summer|winter|fall|autumn)`).tag('Date', 'thisNext-season');
  r.match(`the? ${sections} of (spring|summer|winter|fall|autumn)`).tag('Date', 'section-season');

  //june the 5th
  r.match('#Date the? #Ordinal').tag('Date', 'correction-date');
  //5th of March
  r.match('#Value of? #Month').tag('Date', 'value-of-month');
  //5 March
  r.match('#Cardinal #Month').tag('Date', 'cardinal-month');
  //march 5 to 7
  r.match('#Month #Value to #Value').tag('Date', 'value-to-value');

  //last month
  r.match(`${thisNext} #Date`).tag('Date', 'thisNext-date');
  //for four days
  r.match(`${preps}? #Value #Duration`).tag('Date', 'value-duration');

  //by 5 March
  r.match('due? (by|before|after|until) #Date').tag('Date', 'by-date');
  //tomorrow before 3
  r.match('#Date (by|before|after|at|@|about) #Cardinal').not('^#Date').tag('Time', 'date-before-Cardinal');
  //2pm est
  r.match('#Time (eastern|pacific|central|mountain)').term(1).tag('Time', 'timezone');
  r.match('#Time (est|pst|gmt)').term(1).tag('Time', 'timezone abbr');
  //saturday am
  r.match('#Date (am|pm)').term(1).unTag('Verb').unTag('Copula').tag('Time', 'date-am');
  //late at night
  r.match('at night').tag('Time', 'at-night');
  r.match('in the (night|evening|morning|afternoon|day|daytime)').tag('Time', 'in-the-night');
  r.match('(early|late) (at|in)? the? (night|evening|morning|afternoon|day|daytime)').tag('Time', 'early-evening');
  //march 12th 2018
  r.match('#Month #Value #Cardinal').tag('Date', 'month-value-cardinal');
  r.match('(last|next|this|previous|current|upcoming|coming|the) #Date').tag('Date', 'next-feb');
  r.match('#Date #Value').tag('Date', 'date-value');
  r.match('#Value #Date').tag('Date', 'value-date');
  r.match('#Date #Preposition #Date').tag('Date', 'date-prep-date');

  //two days before
  r.match('#Value #Duration #Conjunction').tag('Date', 'val-duration-conjunction');

  //start of june
  r.match(`the? ${sections} of #Date`).tag('Date', 'section-of-date');

  //year tagging
  let value = r.match(`#Date #Value #Cardinal`).lastTerm().values();
  let num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'date-year');
  }
  value = r.match(`#Date #Cardinal`).lastTerm().values();
  num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'date-year');
  }

  return r;
};
module.exports = corrections;

},{"../paths":169}],168:[function(require,module,exports){
'use strict';
const log = require('../paths').log;
const path = 'correction';
const date_corrections = require('./date_corrections');

//
const corrections = function (r) {
  log.here(path);
  //the word 'so'
  //so funny
  r.match('so #Adjective').match('so').tag('Adverb', 'so-adv');
  //so the
  r.match('so #Noun').match('so').tag('Conjunction', 'so-conj');
  //do so
  r.match('do so').match('so').tag('Noun', 'so-noun');
  //still good
  r.match('still #Adjective').match('still').tag('Adverb', 'still-advb');
  //'more' is not always an adverb
  r.match('more #Noun').tag('Noun', 'more-noun');
  //still make
  r.match('still #Verb').term(0).tag('Adverb', 'still-verb');

  //the word 'second'
  r.match('second #Noun').term(0).unTag('Unit').tag('Ordinal', 'second-noun');

  //will secure our
  r.match('will #Adjective').term(1).tag('Verb', 'will-adj');

  //is no walk
  r.match('is no #Verb').term(2).tag('Noun', 'is-no-verb');

  //Determiner-signals
  //the wait to vote
  r.match('the #Verb #Preposition .').match('#Verb').tag('Noun', 'correction-determiner1');
  //the swim
  r.match('the #Verb').match('#Verb').tag('#Noun', 'correction-determiner2');
  //the nice swim
  r.match('the #Adjective #Verb').match('#Verb').tag('#Noun', 'correction-determiner3');
  //the truly nice swim
  r.match('the #Adverb #Adjective #Verb').match('#Verb').tag('#Noun', 'correction-determiner4');

  //people chunks
  //John L. Foo
  r.match('#FirstName #Acronym #TitleCase').tag('Person', 'firstname-acronym-titlecase');
  //Mr Foo
  r.match('#Honorific #FirstName? #TitleCase').tag('Person', 'Honorific-TitleCase');
  //John Foo
  r.match('#FirstName #TitleCase').match('#FirstName #Noun').tag('Person', 'firstname-titlecase');
  //peter the great
  r.match('#FirstName the #Adjective').tag('Person', 'correction-determiner5');


  //book the flight
  r.match('#Noun the #Noun').term(0).tag('Verb', 'correction-determiner6');
  //a sense of
  r.match('#Determiner #Verb of').term(1).tag('Noun', 'the-verb-of');

  //past-tense copula
  r.match('has #Adverb? #Negative? #Adverb? been').tag('Copula', 'has-been');

  //he quickly foo
  r.match('#Noun #Adverb #Noun').term(2).tag('Verb', 'correction');

  //is eager to go
  r.match('#Copula #Adjective to #Verb').match('#Adjective to').tag('Verb', 'correction');

  //different views than
  r.match('#Verb than').term(0).tag('Noun', 'correction');

  //her polling
  r.match('#Possessive #Verb').term(1).tag('Noun', 'correction-possessive');

  //folks like her
  r.match('#Noun like #Noun').term(1).tag('Preposition', 'correction');

  //the threat of force
  r.match('#Determiner #Noun of #Verb').match('#Verb').tag('Noun', 'noun-of-noun');

  //big dreams, critical thinking
  r.match('#Adjective #PresentTense').term(1).tag('Noun', 'adj-presentTense');

  //'a/an' can mean 1
  r.match('(a|an) (#Duration|#Value)').term(0).tag('Value', 'a-is-one');
  //half a million
  r.match('(half|quarter) a? #Value').tag('Value', 'half-a-value');
  //all values are either ordinal or cardinal
  r.match('#Value').match('!#Ordinal').tag('#Cardinal', 'not-ordinal');

  //money
  r.match('#Value+ #Currency').tag('#Money', 'value-currency');
  r.match('#Money and #Money #Currency?').tag('#Money', 'money-and-money');

  //last names
  let reason = 'person-correction';
  r.match('#FirstName #Acronym? #TitleCase').ifNo('#Date').tag('#Person', reason).lastTerm().tag('#LastName', reason);
  r.match('#FirstName (#Singular|#Possessive)').ifNo('#Date').tag('#Person', reason).lastTerm().tag('#LastName', reason);
  r.match('#FirstName #Acronym #Noun').ifNo('#Date').tag('#Person', reason).lastTerm().tag('#LastName', reason);
  r.match('(lady|queen) #TitleCase').ifNo('#Date').tag('#FemalePerson', reason);
  r.match('(king|pope) #TitleCase').ifNo('#Date').tag('#MalePerson', reason);

  r = date_corrections(r);

  return r;
};

module.exports = corrections;

},{"../paths":169,"./date_corrections":167}],169:[function(require,module,exports){
module.exports = require('../paths');

},{"../paths":122}],170:[function(require,module,exports){
'use strict';

//
const conditionPass = function(r) {
  //'if it really goes, I will..'
  let m = r.match('#Condition {1,7} #ClauseEnd');
  //make sure it ends on a comma
  if (m.found && m.match('#Comma$')) {
    m.tag('ConditionPhrase');
  }
  //'go a bit further, if it then has a pronoun
  m = r.match('#Condition {1,13} #ClauseEnd #Pronoun');
  if (m.found && m.match('#Comma$')) {
    m.not('#Pronoun$').tag('ConditionPhrase', 'end-pronoun');
  }
  //if it goes then ..
  m = r.match('#Condition {1,7} then');
  if (m.found) {
    m.not('then$').tag('ConditionPhrase', 'cond-then');
  }
  //at the end of a sentence:
  //'..., if it really goes.'
  m = r.match('#Comma #Condition {1,7} .$');
  if (m.found) {
    m.not('^#Comma').tag('ConditionPhrase', 'comma-7-end');
  }
  // '... if so.'
  m = r.match('#Condition {1,4}$');
  if (m.found) {
    m.tag('ConditionPhrase', 'cond-4-end');
  }
  return r;
};

module.exports = conditionPass;

},{}],171:[function(require,module,exports){
'use strict';
//
const verbPhrase = function (r) {
  r.match('#Verb').tag('VerbPhrase', 'verbphrase-verb');
  //was quickly
  r.match('#Adverb? #Verb #Adverb?').tag('VerbPhrase', 'verbphrase-verb');
  //is not
  r.match('#Verb #Negative').tag('VerbPhrase', 'verb-not');
  //never is
  r.match('never #Verb').tag('VerbPhrase', 'not-verb');
  //'will have had'..
  r.match('#Auxillary+').tag('VerbPhrase', '2');
  // 'is'
  r.match('#Copula').tag('VerbPhrase', '#3');
  //'really will'..
  r.match('#Adverb #Auxillary').tag('VerbPhrase', '#4');
  //to go
  r.match('to #Infinitive').tag('VerbPhrase', '#5');
  //work with
  r.match('#Verb #Preposition').tag('VerbPhrase', '#6');
  return r;
};

module.exports = verbPhrase;

},{}],172:[function(require,module,exports){
'use strict';
//
const nounPhrase = function (r) {
  let reason = 'noun-phrase-correction';
  //fifty stars
  r.match('#Value #Noun').tag('NounPhrase', reason);
  //nice house
  r.match('#Adjective #NounPhrase').tag('NounPhrase', reason);
  //tag preceding determiner 'the nice house'
  r.match('#Determiner #NounPhrase').tag('NounPhrase', reason);
  //
  r.match('#Noun #Preposition #Noun').tag('NounPhrase', reason);
  //john and sara
  r.match('#Noun #Conjunction #Noun').tag('NounPhrase', reason);
  //difficult but necessary talks
  r.match('#Adjective #Conjunction #Adjective #NounPhrase').tag('NounPhrase', reason);

  return r;
};

module.exports = nounPhrase;

},{}],173:[function(require,module,exports){
'use strict';
//
const adjectivePhrase = function (r) {
  let reason = 'adjPhrase-correction';
  //is really not so good
  // r.match('#Copula+ #Adverb? #Negative? as? #Adverb? #Adjective').tag('AdjectivePhrase').term(0).tag('#Copula');
  // //stonger than
  // r.match('#Comparative than').tag('AdjectivePhrase');
  //very easy
  r.match('#Copula #Adverb? #Negative? #Adverb? #Adjective #Adverb?').match('#Adverb? #Adjective #Adverb?').tag('AdjectivePhrase', reason);
  //difficult but necessary
  r.match('#AdjectivePhrase #Conjunction #Adjective').tag('AdjectivePhrase', reason);
  //is as strong as
  r.match('#AdjectivePhrase as').tag('AdjectivePhrase', reason);
  return r;
};

module.exports = adjectivePhrase;

},{}],174:[function(require,module,exports){
'use strict';
const conditionPass = require('./00-conditionPass');
const verbPhrase = require('./01-verbPhrase');
const nounPhrase = require('./02-nounPhrase');
const AdjectivePhrase = require('./03-adjectivePhrase');
//
const phraseTag = function (Text) {
  Text = conditionPass(Text);
  Text = verbPhrase(Text);
  Text = nounPhrase(Text);
  Text = AdjectivePhrase(Text);
  return Text;
};

module.exports = phraseTag;

},{"./00-conditionPass":170,"./01-verbPhrase":171,"./02-nounPhrase":172,"./03-adjectivePhrase":173}],175:[function(require,module,exports){
//(Rule-based sentence boundary segmentation) - chop given text into its proper sentences.
// Ignore periods/questions/exclamations used in acronyms/abbreviations/numbers, etc.
// @spencermountain 2015 MIT
'use strict';
const fns = require('./paths').fns;
const data = require('../data/index');
const abbreviations = Object.keys(data.abbreviations);

const naiive_split = function (text) {
  //first, split by newline
  let splits = text.split(/(\n+)/);
  //split by period, question-mark, and exclamation-mark
  splits = splits.map(function (str) {
    return str.split(/(\S.+?[.!?])(?=\s+|$)/g);
  });
  return fns.flatten(splits);
};

const sentence_parser = function (text) {
  const sentences = [];
  text = fns.ensureString(text);
  //first do a greedy-split..
  let chunks = [];
  //ensure it 'smells like' a sentence
  if (!text || typeof text !== 'string' || !text.match(/\S/)) {
    return sentences;
  }
  // This was the splitter regex updated to fix quoted punctuation marks.
  // let splits = text.split(/(\S.+?[.\?!])(?=\s+|$|")/g);
  // todo: look for side effects in this regex replacement:
  let splits = naiive_split(text);
  //filter-out the grap ones
  for (let i = 0; i < splits.length; i++) {
    let s = splits[i];
    if (!s || s === '') {
      continue;
    }
    //this is meaningful whitespace
    if (!s.match(/\S/)) {
      //add it to the last one
      if (chunks[chunks.length - 1]) {
        chunks[chunks.length - 1] += s;
        continue;
      } else if (splits[i + 1]) { //add it to the next one
        splits[i + 1] = s + splits[i + 1];
        continue;
      }
    //else, only whitespace, no terms, no sentence
    }
    chunks.push(s);
  }

  //detection of non-sentence chunks
  const abbrev_reg = new RegExp('\\b(' + abbreviations.join('|') + ')[.!?] ?$', 'i');
  const acronym_reg = new RegExp('[ |\.][A-Z]\.?( *)?$', 'i');
  const elipses_reg = new RegExp('\\.\\.\\.* +?$');
  //loop through these chunks, and join the non-sentence chunks back together..
  for (let i = 0; i < chunks.length; i++) {
    //should this chunk be combined with the next one?
    if (chunks[i + 1] && (chunks[i].match(abbrev_reg) || chunks[i].match(acronym_reg) || chunks[i].match(elipses_reg))) {
      chunks[i + 1] = (chunks[i] + (chunks[i + 1] || '')); //.replace(/ +/g, ' ');
    } else if (chunks[i] && chunks[i].length > 0) { //this chunk is a proper sentence..
      sentences.push(chunks[i]);
      chunks[i] = '';
    }

  }
  //if we never got a sentence, return the given text
  if (sentences.length === 0) {
    return [text];
  }

  return sentences;
};

module.exports = sentence_parser;
// console.log(sentence_parser('john f. kennedy'));

},{"../data/index":72,"./paths":122}],176:[function(require,module,exports){
'use strict';

//list of inconsistent parts-of-speech
const conflicts = [
  //top-level pos are all inconsistent
  ['Noun', 'Verb', 'Adjective', 'Adverb', 'Determiner', 'Conjunction', 'Preposition', 'QuestionWord', 'Expression', 'Url', 'PhoneNumber', 'Email', 'Emoji'],
  //exlusive-nouns
  ['Person', 'Organization', 'Value', 'Place', 'Actor', 'Demonym', 'Pronoun'],
  //things that can't be plural
  ['Plural', 'Singular'],
  ['Plural', 'Pronoun'],
  ['Plural', 'Person'],
  ['Plural', 'Organization'],
  ['Plural', 'Currency'],
  ['Plural', 'Ordinal'],
  //exlusive-people
  ['MaleName', 'FemaleName'],
  ['FirstName', 'LastName', 'Honorific'],
  //adjectives
  ['Comparative', 'Superlative'],
  //values
  ['Value', 'Verb', 'Adjective'],
  ['Value', 'Year'],
  ['Ordinal', 'Cardinal'],
  ['TextValue', 'NumericValue'],
  ['NiceNumber', 'TextValue'],
  ['Ordinal', 'Currency'], //$5.50th
  //verbs
  ['PastTense', 'PerfectTense', 'Pluperfect', 'FuturePerfect', 'Copula', 'Modal', 'Participle', 'Infinitive', 'Gerund'],
  //date
  ['Month', 'WeekDay', 'Year', 'Duration'],
  ['Particle', 'Conjunction', 'Adverb', 'Preposition'],
  ['Date', 'Verb', 'Adjective', 'Person'],
  //phrases
  ['NounPhrase', 'VerbPhrase', 'AdjectivePhrase', 'ConditionalPhrase'],
  //a/an -> 1
  ['Value', 'Determiner'],
  ['Verb', 'NounPhrase'],
  ['Noun', 'VerbPhrase'],
  //cases
  ['UpperCase', 'TitleCase', 'CamelCase']

];

const find = (tag) => {
  let arr = [];
  for (let i = 0; i < conflicts.length; i++) {
    if (conflicts[i].indexOf(tag) !== -1) {
      arr = arr.concat(conflicts[i]);
    }
  }
  return arr.filter((t) => t !== tag);
};

module.exports = find;

// console.log(find('Person'));

},{}],177:[function(require,module,exports){
'use strict';
const conflicts = require('./conflicts');
const tree = require('./tree');

const extra = {
  Month: 'Singular',
  Year: 'Noun',
  Time: 'Noun',
  WeekDay: 'Noun',
  Duration: 'Noun',
};

//make tags
let all = {};

const all_children = (obj) => {
  let children = Object.keys(obj || {});
  //two levels deep
  children.forEach((str) => {
    if (typeof obj[str] === 'object') {
      let kids = Object.keys(obj[str]);
      kids.forEach((gc) => {
        if (typeof obj[str][gc] === 'object') {
          let grandkids = Object.keys(obj[str][gc]);
          children = children.concat(grandkids);
        }
      });
      children = children.concat(kids);
    }
  });
  return children;
};

//recursively add them, with is
const add_tags = (obj, is) => {
  Object.keys(obj).forEach((k) => {
    is = is.slice(0); //clone it
    if (extra[k]) {
      is.push(extra[k]);
    }
    all[k] = {
      parents: is,
      children: all_children(obj[k])
    };
    if (obj[k] !== true) {
      add_tags(obj[k], is.concat([k])); //recursive
    }
  });
};
add_tags(tree, []);

//add conflicts
Object.keys(all).forEach((tag) => {
  all[tag].not = conflicts(tag);
  let parents = all[tag].parents;
  for(let i = 0; i < parents.length; i++) {
    let alsoNot = conflicts(parents[i]);
    all[tag].not = all[tag].not.concat(alsoNot);
  }
});

module.exports = all;
// console.log(all.Month);
// console.log(all_children(tree['NounPhrase']));

},{"./conflicts":176,"./tree":178}],178:[function(require,module,exports){
//the POS tags we use, according to their dependencies
//(dont make it too deep, cause fns aren't properly clever-enough)
module.exports = {
  NounPhrase: {
    Noun: {
      Singular: {
        Pronoun: true,
        Person: {
          FirstName: {
            MaleName: true,
            FemaleName: true,
          },
          LastName: true,
          Honorific: true
        },
        Place: {
          Country: true,
          City: true,
          Address: true
        },
        Organization: {
          SportsTeam: true,
          Company: true,
          School: true,
        },
      },
      Plural: true,
      Actor: true,
      Unit: true,
      Demonym: true,
      Possessive: true,
    },
    Date: { //not a noun, but usually is
      Month: true,
      WeekDay: true,
      RelativeDay: true,
      Year: true,
      Duration: true,
      Time: true,
      Holiday: true
    },
  },
  Verb: {
    PresentTense: {
      Infinitive: true,
      Gerund: true
    },
    PastTense: true,
    PerfectTense: true,
    FuturePerfect: true,
    Pluperfect: true,
    Copula: true,
    Modal: true,
    Participle: true
  },
  VerbPhrase: {
    Particle: true
  },
  Adjective: {
    Comparative: true,
    Superlative: true
  },
  Adverb: true,
  Value: {
    Ordinal: true,
    Fraction: true,
    Cardinal: true,
    TextValue: true,
    NumericValue: true,
    NiceNumber: true,
    Money: true,
  },
  Currency: true,
  NumberRange: true,
  //glue
  Determiner: true,
  Conjunction: true,
  Preposition: true,
  QuestionWord: true,
  Expression: true,
  Url: true,
  PhoneNumber: true,
  HashTag: true,
  Emoji: true,
  Email: true,

  //non-exclusive
  Condition: true,
  Auxillary: true,
  Negative: true,
  Contraction: true,

  TitleCase: true,
  CamelCase: true,
  UpperCase: true,
  Hyphenated: true,
  Acronym: true,
  //phrases
  Quotation: true,
  ValuePhrase: true,
  AdjectivePhrase: true,
  ConditionPhrase: true,

};

},{}],179:[function(require,module,exports){
'use strict';
const toAdverb = require('./toAdverb');
const toNoun = require('./toNoun');
const toComparative = require('./toComparative');
const toSuperlative = require('./toSuperlative');

const adjective = {
  adverbForm: function() {
    return toAdverb(this.normal);
  },
  nounForm: function() {
    return toNoun(this.normal);
  },
  comparative: function() {
    return toComparative(this.normal);
  },
  superlative: function() {
    return toSuperlative(this.normal);
  },
  conjugate: function() {
    return {
      adverbForm: this.adjective.adverbForm(),
      nounForm: this.adjective.nounForm(),
      comparative: this.adjective.comparative(),
      superlative: this.adjective.superlative(),
    };
  }
};
module.exports = adjective;

},{"./toAdverb":181,"./toComparative":182,"./toNoun":183,"./toSuperlative":184}],180:[function(require,module,exports){
arguments[4][169][0].apply(exports,arguments)
},{"../paths":204,"dup":169}],181:[function(require,module,exports){
//turn 'quick' into 'quickly'
'use strict';
const adj_to_adv = function(str) {
  const irregulars = {
    'idle': 'idly',
    'public': 'publicly',
    'vague': 'vaguely',
    'day': 'daily',
    'icy': 'icily',
    'single': 'singly',
    'female': 'womanly',
    'male': 'manly',
    'simple': 'simply',
    'whole': 'wholly',
    'special': 'especially',
    'straight': 'straight',
    'wrong': 'wrong',
    'fast': 'fast',
    'hard': 'hard',
    'late': 'late',
    'early': 'early',
    'well': 'well',
    'good': 'well',
    'little': 'little',
    'long': 'long',
    'low': 'low',
    'best': 'best',
    'latter': 'latter',
    'bad': 'badly'
  };

  const dont = {
    'foreign': 1,
    'black': 1,
    'modern': 1,
    'next': 1,
    'difficult': 1,
    'degenerate': 1,
    'young': 1,
    'awake': 1,
    'back': 1,
    'blue': 1,
    'brown': 1,
    'orange': 1,
    'complex': 1,
    'cool': 1,
    'dirty': 1,
    'done': 1,
    'empty': 1,
    'fat': 1,
    'fertile': 1,
    'frozen': 1,
    'gold': 1,
    'grey': 1,
    'gray': 1,
    'green': 1,
    'medium': 1,
    'parallel': 1,
    'outdoor': 1,
    'unknown': 1,
    'undersized': 1,
    'used': 1,
    'welcome': 1,
    'yellow': 1,
    'white': 1,
    'fixed': 1,
    'mixed': 1,
    'super': 1,
    'guilty': 1,
    'tiny': 1,
    'able': 1,
    'unable': 1,
    'same': 1,
    'adult': 1
  };

  const transforms = [{
    reg: /al$/i,
    repl: 'ally'
  }, {
    reg: /ly$/i,
    repl: 'ly'
  }, {
    reg: /(.{3})y$/i,
    repl: '$1ily'
  }, {
    reg: /que$/i,
    repl: 'quely'
  }, {
    reg: /ue$/i,
    repl: 'uly'
  }, {
    reg: /ic$/i,
    repl: 'ically'
  }, {
    reg: /ble$/i,
    repl: 'bly'
  }, {
    reg: /l$/i,
    repl: 'ly'
  }];

  const not_matches = [
    /airs$/,
    /ll$/,
    /ee.$/,
    /ile$/
  ];

  if (dont[str]) {
    return null;
  }
  if (irregulars[str]) {
    return irregulars[str];
  }
  if (str.length <= 3) {
    return null;
  }
  for (let i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return null;
    }
  }
  for (let i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }
  return str + 'ly';
};
// console.log(adj_to_adv('direct'))

module.exports = adj_to_adv;

},{}],182:[function(require,module,exports){
//turn 'quick' into 'quickly'
'use strict';
const convertables = require('./paths').data.superlatives;

const irregulars = {
  'grey': 'greyer',
  'gray': 'grayer',
  'green': 'greener',
  'yellow': 'yellower',
  'red': 'redder',
  'good': 'better',
  'well': 'better',
  'bad': 'worse',
  'sad': 'sadder',
  'big': 'bigger'
};

const dont = {
  'overweight': 1,
  'main': 1,
  'nearby': 1,
  'asleep': 1,
  'weekly': 1,
  'secret': 1,
  'certain': 1
};

const transforms = [{
  reg: /y$/i,
  repl: 'ier'
}, {
  reg: /([aeiou])t$/i,
  repl: '$1tter'
}, {
  reg: /([aeou])de$/i,
  repl: '$1der'
}, {
  reg: /nge$/i,
  repl: 'nger'
}];

const matches = [
  /ght$/,
  /nge$/,
  /ough$/,
  /ain$/,
  /uel$/,
  /[au]ll$/,
  /ow$/,
  /old$/,
  /oud$/,
  /e[ae]p$/
];

const not_matches = [
  /ary$/,
  /ous$/
];

const to_comparative = function(str) {
  if (dont.hasOwnProperty(str)) {
    return null;
  }

  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }

  for (let i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }

  if (convertables.indexOf(str) !== -1) {
    if (str.match(/e$/)) {
      return str + 'r';
    }
    return str + 'er';
  }

  for (let i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return 'more ' + str;
    }
  }

  for (let i = 0; i < matches.length; i++) {
    if (str.match(matches[i])) {
      return str + 'er';
    }
  }
  return 'more ' + str;
};

// console.log(to_comparative('big'));

module.exports = to_comparative;

},{"./paths":180}],183:[function(require,module,exports){
'use strict';
//convert 'cute' to 'cuteness'

const to_noun = function(w) {
  const irregulars = {
    'clean': 'cleanliness',
    'naivety': 'naivety',
    hurt: 'hurt'
  };
  if (!w) {
    return '';
  }
  if (irregulars.hasOwnProperty(w)) {
    return irregulars[w];
  }
  if (w.match(' ')) {
    return w;
  }
  if (w.match(/w$/)) {
    return w;
  }
  const transforms = [{
    'reg': /y$/,
    'repl': 'iness'
  }, {
    'reg': /le$/,
    'repl': 'ility'
  }, {
    'reg': /ial$/,
    'repl': 'y'
  }, {
    'reg': /al$/,
    'repl': 'ality'
  }, {
    'reg': /ting$/,
    'repl': 'ting'
  }, {
    'reg': /ring$/,
    'repl': 'ring'
  }, {
    'reg': /bing$/,
    'repl': 'bingness'
  }, {
    'reg': /sing$/,
    'repl': 'se'
  }, {
    'reg': /ing$/,
    'repl': 'ment'
  }, {
    'reg': /ess$/,
    'repl': 'essness'
  }, {
    'reg': /ous$/,
    'repl': 'ousness'
  }];

  for (let i = 0; i < transforms.length; i++) {
    if (w.match(transforms[i].reg)) {
      return w.replace(transforms[i].reg, transforms[i].repl);
    }
  }

  if (w.match(/s$/)) {
    return w;
  }
  return w + 'ness';
};

// console.log(to_noun("great"))

module.exports = to_noun;

},{}],184:[function(require,module,exports){
//turn 'quick' into 'quickest'
'use strict';
const convertables = require('./paths').data.superlatives;

const irregulars = {
  'nice': 'nicest',
  'late': 'latest',
  'hard': 'hardest',
  'inner': 'innermost',
  'outer': 'outermost',
  'far': 'furthest',
  'worse': 'worst',
  'bad': 'worst',
  'good': 'best',
  'big': 'biggest'
};

const dont = {
  'overweight': 1,
  'ready': 1
};

const transforms = [{
  'reg': /y$/i,
  'repl': 'iest'
}, {
  'reg': /([aeiou])t$/i,
  'repl': '$1ttest'
}, {
  'reg': /([aeou])de$/i,
  'repl': '$1dest'
}, {
  'reg': /nge$/i,
  'repl': 'ngest'
}];

const matches = [
  /ght$/,
  /nge$/,
  /ough$/,
  /ain$/,
  /uel$/,
  /[au]ll$/,
  /ow$/,
  /oud$/,
  /...p$/
];

const not_matches = [
  /ary$/
];

const generic_transformation = function(s) {
  if (s.match(/e$/)) {
    return s + 'st';
  }
  return s + 'est';
};


const to_superlative = function(str) {
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  for (let i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }

  if (convertables.indexOf(str) !== -1) {
    return generic_transformation(str);
  }

  if (dont.hasOwnProperty(str)) {
    return 'most ' + str;
  }

  for (let i = 0; i < not_matches.length; i++) {
    if (str.match(not_matches[i])) {
      return 'most ' + str;
    }
  }

  for (let i = 0; i < matches.length; i++) {
    if (str.match(matches[i])) {
      if (irregulars.hasOwnProperty(str)) {
        return irregulars[str];
      }
      return generic_transformation(str);
    }
  }
  return 'most ' + str;
};

// console.log(to_superlative("great"))

module.exports = to_superlative;

},{"./paths":180}],185:[function(require,module,exports){
'use strict';
const toAdjective = require('./to_adjective');
const adverb = {
  adjectiveForm: function() {
    return toAdjective(this.normal);
  },
};
module.exports = adverb;

},{"./to_adjective":186}],186:[function(require,module,exports){
//turns 'quickly' into 'quick'
'use strict';
const to_adjective = function(str) {
  const irregulars = {
    'idly': 'idle',
    'sporadically': 'sporadic',
    'basically': 'basic',
    'grammatically': 'grammatical',
    'alphabetically': 'alphabetical',
    'economically': 'economical',
    'conically': 'conical',
    'politically': 'political',
    'vertically': 'vertical',
    'practically': 'practical',
    'theoretically': 'theoretical',
    'critically': 'critical',
    'fantastically': 'fantastic',
    'mystically': 'mystical',
    'pornographically': 'pornographic',
    'fully': 'full',
    'jolly': 'jolly',
    'wholly': 'whole'
  };
  const transforms = [{
    'reg': /bly$/i,
    'repl': 'ble'
  }, {
    'reg': /gically$/i,
    'repl': 'gical'
  }, {
    'reg': /([rsdh])ically$/i,
    'repl': '$1ical'
  }, {
    'reg': /ically$/i,
    'repl': 'ic'
  }, {
    'reg': /uly$/i,
    'repl': 'ue'
  }, {
    'reg': /ily$/i,
    'repl': 'y'
  }, {
    'reg': /(.{3})ly$/i,
    'repl': '$1'
  }];
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  for (let i = 0; i < transforms.length; i++) {
    if (str.match(transforms[i].reg)) {
      return str.replace(transforms[i].reg, transforms[i].repl);
    }
  }
  return str;
};

// console.log(to_adjective('quickly') === 'quick')
// console.log(to_adjective('marvelously') === 'marvelous')
module.exports = to_adjective;

},{}],187:[function(require,module,exports){
'use strict';

module.exports = {
  /**negative/positive*/
  toNegative: function () {
    this.term.insertAfter('not')
    return this;
  },
  toPositive: function () {
    return this
  },
}

},{}],188:[function(require,module,exports){
'use strict';
//a hugely-ignorant, and widely subjective transliteration of latin, cryllic, greek unicode characters to english ascii.
//approximate visual (not semantic or phonetic) relationship between unicode and ascii characters
//http://en.wikipedia.org/wiki/List_of_Unicode_characters
//https://docs.google.com/spreadsheet/ccc?key=0Ah46z755j7cVdFRDM1A2YVpwa1ZYWlpJM2pQZ003M0E
let compact = {
  '!': '¡',
  '?': '¿Ɂ',
  'a': 'ªÀÁÂÃÄÅàáâãäåĀāĂăĄąǍǎǞǟǠǡǺǻȀȁȂȃȦȧȺΆΑΔΛάαλАДадѦѧӐӑӒӓƛɅæ',
  'b': 'ßþƀƁƂƃƄƅɃΒβϐϦБВЪЬбвъьѢѣҌҍҔҕƥƾ',
  'c': '¢©ÇçĆćĈĉĊċČčƆƇƈȻȼͻͼͽϲϹϽϾϿЄСсєҀҁҪҫ',
  'd': 'ÐĎďĐđƉƊȡƋƌǷ',
  'e': 'ÈÉÊËèéêëĒēĔĕĖėĘęĚěƎƏƐǝȄȅȆȇȨȩɆɇΈΕΞΣέεξϱϵ϶ЀЁЕЭеѐёҼҽҾҿӖӗӘәӚӛӬӭ',
  'f': 'ƑƒϜϝӺӻҒғӶӷſ',
  'g': 'ĜĝĞğĠġĢģƓǤǥǦǧǴǵ',
  'h': 'ĤĥĦħƕǶȞȟΉΗЂЊЋНнђћҢңҤҥҺһӉӊ',
  'I': 'ÌÍÎÏ',
  'i': 'ìíîïĨĩĪīĬĭĮįİıƖƗȈȉȊȋΊΐΪίιϊІЇії',
  'j': 'ĴĵǰȷɈɉϳЈј',
  'k': 'ĶķĸƘƙǨǩΚκЌЖКжкќҚқҜҝҞҟҠҡ',
  'l': 'ĹĺĻļĽľĿŀŁłƚƪǀǏǐȴȽΙӀӏ',
  'm': 'ΜϺϻМмӍӎ',
  'n': 'ÑñŃńŅņŇňŉŊŋƝƞǸǹȠȵΝΠήηϞЍИЙЛПийлпѝҊҋӅӆӢӣӤӥπ',
  'o': 'ÒÓÔÕÖØðòóôõöøŌōŎŏŐőƟƠơǑǒǪǫǬǭǾǿȌȍȎȏȪȫȬȭȮȯȰȱΌΘΟθοσόϕϘϙϬϭϴОФоѲѳӦӧӨөӪӫ¤ƍΏ',
  'p': 'ƤƿΡρϷϸϼРрҎҏÞ',
  'q': 'Ɋɋ',
  'r': 'ŔŕŖŗŘřƦȐȑȒȓɌɍЃГЯгяѓҐґ',
  's': 'ŚśŜŝŞşŠšƧƨȘșȿςϚϛϟϨϩЅѕ',
  't': 'ŢţŤťŦŧƫƬƭƮȚțȶȾΓΤτϮϯТт҂Ҭҭ',
  'u': 'µÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųƯưƱƲǓǔǕǖǗǘǙǚǛǜȔȕȖȗɄΰμυϋύϑЏЦЧцџҴҵҶҷӋӌӇӈ',
  'v': 'νѴѵѶѷ',
  'w': 'ŴŵƜωώϖϢϣШЩшщѡѿ',
  'x': '×ΧχϗϰХхҲҳӼӽӾӿ',
  'y': 'ÝýÿŶŷŸƳƴȲȳɎɏΎΥΫγψϒϓϔЎУучўѰѱҮүҰұӮӯӰӱӲӳ',
  'z': 'ŹźŻżŽžƩƵƶȤȥɀΖζ'
};
//decompress data into two hashes
let unicode = {};
Object.keys(compact).forEach(function (k) {
  compact[k].split('').forEach(function (s) {
    unicode[s] = k;
  });
});

const fixUnicode = (str) => {
  let chars = str.split('');
  chars.forEach((s, i) => {
    if (unicode[s]) {
      chars[i] = unicode[s];
    }
  });
  return chars.join('');
};
module.exports = fixUnicode;
// console.log(fixUnicode('bjŏȒk'));

},{}],189:[function(require,module,exports){
'use strict';
const Term = require('./index');
const fns = require('./paths').fns;

module.exports = {
  makeTerm: (str, t) => {
    let c = fns.copy(t.context);
    let index = t.term.index();
    let s = t.parent;

    let term = new Term(str, c);
    //create the proper whitespace for this term
    if (index === s.arr.length - 1) {
      term.whitespace.before = ' ';
    } else {
      term.whitespace.before = ' ';
    }
    return term;
  }
};

},{"./index":190,"./paths":204}],190:[function(require,module,exports){
'use strict';
const setTag = require('./setTag');
const unTag = require('./unTag');
const isMatch = require('./isMatch');
const addNormal = require('./normalize');
const addRoot = require('./root');
const fns = require('./paths').fns;
const build_whitespace = require('./whitespace');

const bindMethods = (o, str, self) => {
  self[str] = {};
  Object.keys(o).forEach((fn) => {
    self[str][fn] = o[fn].bind(self);
  });
};

class Term {
  constructor(str) {
    this._text = fns.ensureString(str);
    this.tag = {};
    this.whitespace = build_whitespace(str || '');
    this._text = this._text.trim();
    this._text = this._text.replace(/([a-z])\-$/, '$1');
    this.parent = null;
    this.silent_term = '';
    //has this term been modified
    this.dirty = false;

    bindMethods(require('./term'), 'term', this);
    bindMethods(require('./verb'), 'verb', this);
    bindMethods(require('./noun'), 'noun', this);
    bindMethods(require('./adjective'), 'adjective', this);
    bindMethods(require('./adverb'), 'adverb', this);
    bindMethods(require('./value'), 'value', this);
    bindMethods(require('./pronoun'), 'pronoun', this);
    bindMethods(require('./render'), 'render', this);
    bindMethods(require('./month'), 'month', this);
    bindMethods(require('./copula'), 'copula', this);
    bindMethods(require('./weekday'), 'weekday', this);

    this.normalize();
    this.helpers = require('./helpers');
  }

  set text(str) {
    str = str || '';
    this._text = str.trim();
    this.dirty = true;
    if (this._text !== str) {
      this.whitespace = build_whitespace(str);
    }
    this.normalize();
  }

  get text() {
    return this._text;
  }
  get isA() {
    return 'Term';
  }

  normalize() {
    addNormal(this);
    addRoot(this);
  }

  /** the comma, period ... punctuation that ends this sentence */
  endPunctuation() {
    let m = this._text.match(/([\.\?\!,;:])$/);
    if (m) {
      //remove it from end of text
      // this.text = this._text.substr(0, this._text.length - 1);
      return m[0];
    }
    return '';
  }

  /** print-out this text, as it was given */
  plaintext() {
    let str = this.whitespace.before + this._text + this.whitespace.after;
    return str;
  }

  index() {
    let ts = this.parentTerms;
    if (!ts) {
      return null;
    }
    return ts.terms.indexOf(this);
  }

  /** delete this term from its sentence */
  remove() {
    let ts = this.parent;
    this.dirty = true; //redundant
    if (!ts) {
      return null;
    }
    ts.terms.splice(this.index(), 1);
    return ts;
  }

  /** set the term as this part-of-speech */
  tagAs(tag, reason) {
    setTag(this, tag, reason);
  }
  /** remove this part-of-speech from the term*/
  unTag(tag, reason) {
    unTag(this, tag, reason);
  }

  /** true/false helper for terms.match()*/
  isMatch(reg, verbose) {
    return isMatch(this, reg, verbose);
  }

  /** make a copy with no references to the original  */
  clone() {
    let term = new Term(this._text, null);
    term.tag = fns.copy(this.tag);
    term.whitespace = fns.copy(this.whitespace);
    term.silent_term = this.silent_term;
    return term;
  }
}
module.exports = Term;

},{"./adjective":179,"./adverb":185,"./copula":187,"./helpers":189,"./isMatch":191,"./month":193,"./normalize":194,"./noun":196,"./paths":204,"./pronoun":205,"./render":206,"./root":208,"./setTag":209,"./term":210,"./unTag":211,"./value":212,"./verb":222,"./weekday":231,"./whitespace":232}],191:[function(require,module,exports){
'use strict';
const fns = require('./paths').fns;

//compare 1 term to one reg
const perfectMatch = (term, reg, verbose) => {
  if (!term || !reg) {
    return false;
  }
  //support '.' - any
  if (reg.anyOne) {
    return true;
  }
  //pos-match
  if (reg.tag) {
    for (let i = 0; i < reg.tag.length; i++) {
      let tag = reg.tag[i];
      if (term.tag[tag]) {
        return true;
      }
    }
    return false;
  }
  //one-of term-match
  if (reg.oneOf) {
    for (let i = 0; i < reg.oneOf.length; i++) {
      let str = reg.oneOf[i];
      //try a tag match
      if (str.match(/^#/)) {
        let tag = str.replace(/^#/, '');
        tag = fns.titleCase(tag);
        if (term.tag[tag]) {
          return true;
        }
        //try a string-match
      } else if (term.normal === str || term.text === str) {
        return true;
      }
    }
    return false;
  }
  //text-match
  if (reg.normal) {
    if (term.normal === reg.normal || term.text === reg.normal || term.root === reg.normal) {
      return true;
    }
    //try contraction match too
    if (term.silent_term === reg.normal) {
      return true;
    }
  }
  return false;
};

//wrap above method, to support '!' negation
const isMatch = (term, reg, verbose) => {
  let found = perfectMatch(term, reg, verbose);
  if (reg.negative) {
    found = !!!found;
  }
  return found;
};
module.exports = isMatch

},{"./paths":204}],192:[function(require,module,exports){
//follow the javascript scheme
//january is 0
exports.longMonths = {
  'january': 0,
  'february': 1,
  'march': 2,
  'april': 3,
  'may': 4,
  'june': 5,
  'july': 6,
  'august': 7,
  'september': 8,
  'october': 9,
  'november': 10,
  'december': 11,
};
exports.shortMonths = {
  'jan': 0,
  'feb': 1,
  'febr': 1,
  'mar': 2,
  'apr': 3,
  'may': 4,
  'jun': 5,
  'jul': 6,
  'aug': 7,
  'sep': 8,
  'sept': 8,
  'nov': 10,
  'dec': 11,
};

},{}],193:[function(require,module,exports){
'use strict';
const data = require('./data');
const shortMonths = data.shortMonths;
const longMonths = data.longMonths;

module.exports = {
  index: function () {
    if (this.tag.Month) {
      if (longMonths[this.normal] !== undefined) {
        return longMonths[this.normal];
      }
      if (shortMonths[this.normal] !== undefined) {
        return shortMonths[this.normal];
      }
    }
    return null;
  },
  toShortForm: function () {
    if (this.tag.Month !== undefined) {
      if (longMonths[this.normal] !== undefined) {
        let shorten = Object.keys(shortMonths);
        this.text = shorten[longMonths[this.normal]];
      }
    }
    this.dirty = true;
    return this;
  },
  toLongForm: function () {
    if (this.tag.Month !== undefined) {
      if (shortMonths[this.normal] !== undefined) {
        let longer = Object.keys(longMonths);
        this.text = longer[shortMonths[this.normal]];
      }
    }
    this.dirty = true;
    return this;
  }

};

},{"./data":192}],194:[function(require,module,exports){
'use strict';
const fixUnicode = require('./fixUnicode');

const normalize = function (term) {
  let str = term._text || '';
  str = str.toLowerCase();
  //(very) rough asci transliteration -  bjŏrk -> bjork
  str = fixUnicode(str);
  //convert hyphenations to a multiple-word term
  // str = str.replace(/([a-z])\-([a-z0-9])/g, '$1 $2');
  //
  // str = str.replace(/([a-z])\-$/, '$1');
  //hashtags, atmentions
  str = str.replace(/^[#@]/, '');
  // coerce single curly quotes
  str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, '\'');
  // coerce double curly quotes
  str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '');

  //strip leading & trailing grammatical punctuation
  if (!str.match(/^[:;]/)) {
    str = str.replace(/['",\.!:;\?\)]$/g, '');
    str = str.replace(/^['"\(]/g, '');
  }
  //compact acronyms
  if (term.term.isAcronym()) {
    str = str.replace(/\./g, '');
  }
  //nice-numbers
  str = str.replace(/([0-9]),([0-9])/g, '$1$2');
  term.normal = str;
};

module.exports = normalize;

// console.log(normalize('Dr. V Cooper'));

},{"./fixUnicode":188}],195:[function(require,module,exports){
'use strict';
const uncountables = require('../paths').data.uncountables;

//certain words can't be plural, like 'peace'
const hasPlural = function (t) {
  //end quick
  if (!t.tag.Noun) {
    return false;
  }
  if (t.tag.Plural) {
    return true;
  }
  //is it potentially plural?
  const noPlural = [
    'Pronoun',
    'Place',
    'Value',
    'Person',
    'Month',
    'WeekDay',
    'RelativeDay',
    'Holiday',
  ];
  for (let i = 0; i < noPlural.length; i++) {
    if (t.tag[noPlural[i]]) {
      return false;
    }
  }
  //terms known as un-inflectable, like 'peace'
  for (let i = 0; i < uncountables.length; i++) {
    if (t.normal === uncountables[i]) {
      return false;
    }
  }
  return true;
};

module.exports = hasPlural;

},{"../paths":204}],196:[function(require,module,exports){
'use strict';
const hasPlural = require('./hasPlural');
const makeArticle = require('./makeArticle');
const toPlural = require('./inflect/toPlural');
const toSingular = require('./inflect/toSingle');
const isPlural = require('./inflect/isPlural');

module.exports = {
  plural: function () {
    if (!this.noun.hasPlural() || this.noun.isPlural()) {
      return this.text;
    }
    return toPlural(this.normal);
  },
  singular: function () {
    if (!this.noun.hasPlural() || !this.noun.isPlural()) {
      return this.text;
    }
    return toSingular(this.normal);
  },
  hasPlural: function () {
    return hasPlural(this);
  },
  isPlural: function () {
    return isPlural(this);
  },
  makeArticle: function () {
    return makeArticle(this);
  }
};

},{"./hasPlural":195,"./inflect/isPlural":200,"./inflect/toPlural":201,"./inflect/toSingle":202,"./makeArticle":203}],197:[function(require,module,exports){
'use strict';
//similar to plural/singularize rules, but not the same
const plural_indicators = [
  /(^v)ies$/i,
  /ises$/i,
  /ives$/i,
  /(antenn|formul|nebul|vertebr|vit)ae$/i,
  /(octop|vir|radi|nucle|fung|cact|stimul)i$/i,
  /(buffal|tomat|tornad)oes$/i,
  /(analy|ba|diagno|parenthe|progno|synop|the)ses$/i,
  /(vert|ind|cort)ices$/i,
  /(matr|append)ices$/i,
  /(x|ch|ss|sh|s|z|o)es$/i,
  /men$/i,
  /news$/i,
  /.tia$/i,
  /(^f)ves$/i,
  /(lr)ves$/i,
  /(^aeiouy|qu)ies$/i,
  /(m|l)ice$/i,
  /(cris|ax|test)es$/i,
  /(alias|status)es$/i,
  /ics$/i
];

//similar to plural/singularize rules, but not the same
const singular_indicators = [
  /(ax|test)is$/i,
  /(octop|vir|radi|nucle|fung|cact|stimul)us$/i,
  /(octop|vir)i$/i,
  /(rl)f$/i,
  /(alias|status)$/i,
  /(bu)s$/i,
  /(al|ad|at|er|et|ed|ad)o$/i,
  /(ti)um$/i,
  /(ti)a$/i,
  /sis$/i,
  /(?:(^f)fe|(lr)f)$/i,
  /hive$/i,
  /(^aeiouy|qu)y$/i,
  /(x|ch|ss|sh|z)$/i,
  /(matr|vert|ind|cort)(ix|ex)$/i,
  /(m|l)ouse$/i,
  /(m|l)ice$/i,
  /(antenn|formul|nebul|vertebr|vit)a$/i,
  /.sis$/i,
  /^(?!talis|.*hu)(.*)man$/i
];
module.exports = {
  singular_indicators: singular_indicators,
  plural_indicators: plural_indicators
}

},{}],198:[function(require,module,exports){
//patterns for turning 'bus' to 'buses'
module.exports = [
  [/(ax|test)is$/i, '$1es'],
  [/(octop|vir|radi|nucle|fung|cact|stimul)us$/i, '$1i'],
  [/(octop|vir)i$/i, '$1i'],
  [/(kn|l|w)ife$/i, '$1ives'],
  [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)f$/i, '$1ves'],
  [/^(dwar|handkerchie|hoo|scar|whar)f$/i, '$1ves'],
  [/(alias|status)$/i, '$1es'],
  [/(bu)s$/i, '$1ses'],
  [/(al|ad|at|er|et|ed|ad)o$/i, '$1oes'],
  [/([ti])um$/i, '$1a'],
  [/([ti])a$/i, '$1a'],
  [/sis$/i, 'ses'],
  [/(hive)$/i, '$1s'],
  [/([^aeiouy]|qu)y$/i, '$1ies'],
  [/(x|ch|ss|sh|s|z)$/i, '$1es'],
  [/(matr|vert|ind|cort)(ix|ex)$/i, '$1ices'],
  [/([m|l])ouse$/i, '$1ice'],
  [/([m|l])ice$/i, '$1ice'],
  [/^(ox)$/i, '$1en'],
  [/^(oxen)$/i, '$1'],
  [/(quiz)$/i, '$1zes'],
  [/(antenn|formul|nebul|vertebr|vit)a$/i, '$1ae'],
  [/(sis)$/i, 'ses'],
  [/^(?!talis|.*hu)(.*)man$/i, '$1men'],
  [/(.*)/i, '$1s']
].map(function(a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

},{}],199:[function(require,module,exports){
//patterns for turning 'dwarves' to 'dwarf'
module.exports = [
  [/([^v])ies$/i, '$1y'],
  [/ises$/i, 'isis'],
  [/(kn|[^o]l|w)ives$/i, '$1ife'],
  [/^((?:ca|e|ha|(?:our|them|your)?se|she|wo)l|lea|loa|shea|thie)ves$/i, '$1f'],
  [/^(dwar|handkerchie|hoo|scar|whar)ves$/i, '$1f'],
  [/(antenn|formul|nebul|vertebr|vit)ae$/i, '$1a'],
  [/(octop|vir|radi|nucle|fung|cact|stimul)(i)$/i, '$1us'],
  [/(buffal|tomat|tornad)(oes)$/i, '$1o'],
  [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1sis'],
  [/(vert|ind|cort)(ices)$/i, '$1ex'],
  [/(matr|append)(ices)$/i, '$1ix'],
  [/(x|ch|ss|sh|s|z|o)es$/i, '$1'],
  [/men$/i, 'man'],
  [/(n)ews$/i, '$1ews'],
  [/([ti])a$/i, '$1um'],
  [/([^aeiouy]|qu)ies$/i, '$1y'],
  [/(s)eries$/i, '$1eries'],
  [/(m)ovies$/i, '$1ovie'],
  [/([m|l])ice$/i, '$1ouse'],
  [/(cris|ax|test)es$/i, '$1is'],
  [/(alias|status)es$/i, '$1'],
  [/(ss)$/i, '$1'],
  [/(ics)$/i, '$1'],
  [/s$/i, '']
].map(function(a) {
  return {
    reg: a[0],
    repl: a[1]
  };
});

},{}],200:[function(require,module,exports){
'use strict';
const irregulars = require('../../paths').data.irregular_plurals;
const rules = require('./data/indicators');


//is it potentially plural?
const noPlural = [
  'Pronoun',
  'Place',
  'Value',
  'Person',
  'Month',
  'WeekDay',
  'RelativeDay',
  'Holiday',
];
//first, try to guess based on existing tags
const couldEvenBePlural = (t) => {
  for (let i = 0; i < noPlural.length; i++) {
    if (t.tag[noPlural[i]]) {
      return false
    }
  }
  return true;
};

const is_plural = function (t) {
  let str = t.normal;
  //inspect the existing tags to see if a plural is valid
  if (!couldEvenBePlural(t)) {
    return false;
  }
  //handle 'mayors of chicago'
  const preposition = str.match(/([a-z]*) (of|in|by|for) [a-z]/);
  if (preposition && preposition[1]) {
    str = preposition[1];
  }
  // if it's a known irregular case
  if (irregulars.toSingle[str]) {
    return true;
  }
  if (irregulars.toPlural[str]) {
    return false;
  }
  //check the suffix-type rules for indications
  for (let i = 0; i < rules.plural_indicators.length; i++) {
    if (str.match(rules.plural_indicators[i])) {
      return true;
    }
  }
  for (let i = 0; i < rules.singular_indicators.length; i++) {
    if (str.match(rules.singular_indicators[i])) {
      return false;
    }
  }
  // a fallback 'looks check plural' rule..
  if (str.match(/s$/) && !str.match(/ss$/) && str.length > 3) { //needs some lovin'
    return true;
  }
  return false;
};

// console.log(is_plural('octopus') === false)
// console.log(is_plural('octopi') === true)
// console.log(is_plural('eyebrow') === false)
// console.log(is_plural('eyebrows') === true)
// console.log(is_plural('child') === false)
// console.log(is_plural('children') === true)
// console.log(is_plural('days') === true)

module.exports = is_plural;

},{"../../paths":204,"./data/indicators":197}],201:[function(require,module,exports){
'use strict';
const irregulars = require('../../paths').data.irregular_plurals.toPlural;
const pluralRules = require('./data/pluralRules');

//turn 'shoe' into 'shoes'
const pluralize = function(str) {
  //irregular
  if (irregulars[str]) {
    return irregulars[str];
  }

  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    const first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];
    if (first) {
      const better_first = pluralize(first); //recursive
      return better_first + str.replace(first, '');
    }
  }

  //regular rule-based inflector
  for (let i = 0; i < pluralRules.length; i++) {
    if (str.match(pluralRules[i].reg)) {
      return str.replace(pluralRules[i].reg, pluralRules[i].repl);
    }
  }
  return null;
};

module.exports = pluralize;

},{"../../paths":204,"./data/pluralRules":198}],202:[function(require,module,exports){
'use strict';
const irregulars = require('../../paths').data.irregular_plurals.toSingle;
const singleRules = require('./data/singleRules');

//turn 'shoes' into 'shoe'
const toSingle = function (str) {
  //irregular
  if (irregulars[str]) {
    return irregulars[str];
  }
  //inflect first word of preposition-phrase
  if (str.match(/([a-z]*) (of|in|by|for) [a-z]/)) {
    const first = (str.match(/^([a-z]*) (of|in|by|for) [a-z]/) || [])[1];
    if (first) {
      const better_first = toSingle(first); //recursive
      return better_first + str.replace(first, '');
    }
  }

  //regular rule-based inflector
  for (let i = 0; i < singleRules.length; i++) {
    if (str.match(singleRules[i].reg)) {
      return str.replace(singleRules[i].reg, singleRules[i].repl);
    }
  }
  return null;
};

// console.log(toSingle('gases') === 'gas')
module.exports = toSingle;
// console.log(toSingle('days'))

},{"../../paths":204,"./data/singleRules":199}],203:[function(require,module,exports){
'use strict';

//chooses an indefinite aricle 'a/an' for a word
const irregulars = {
  'hour': 'an',
  'heir': 'an',
  'heirloom': 'an',
  'honest': 'an',
  'honour': 'an',
  'honor': 'an',
  'uber': 'an' //german u
};
//pronounced letters of acronyms that get a 'an'
const an_acronyms = {
  a: true,
  e: true,
  f: true,
  h: true,
  i: true,
  l: true,
  m: true,
  n: true,
  o: true,
  r: true,
  s: true,
  x: true
};
//'a' regexes
const a_regexs = [
  /^onc?e/i, //'wu' sound of 'o'
  /^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
  /^eul/i
];

const indefinite_article = function(t) {
  let str = t.normal;

  //explicit irregular forms
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str];
  }
  //spelled-out acronyms
  let firstLetter = str.substr(0, 1);
  if (t.term.isAcronym() && an_acronyms.hasOwnProperty(firstLetter)) {
    return 'an';
  }
  //'a' regexes
  for (let i = 0; i < a_regexs.length; i++) {
    if (str.match(a_regexs[i])) {
      return 'a';
    }
  }
  //basic vowel-startings
  if (str.match(/^[aeiou]/i)) {
    return 'an';
  }
  return 'a';
};

module.exports = indefinite_article;

},{}],204:[function(require,module,exports){
module.exports = {
  fns: require('../fns'),
  log: require('../logger'),
  data: require('../data'),
  tags: require('../tags')
};

},{"../data":72,"../fns":102,"../logger":104,"../tags":177}],205:[function(require,module,exports){
'use strict';

let pluralMap = {
  'he': 'they',
  'she': 'they',
  'it': 'they',
  'they': 'they',
  'this': 'those',
};
let singularMap = {
  'those': 'this',
};

module.exports = {
  toPlural : function() {
    if (pluralMap[this.normal]) {
      return pluralMap[this.normal];
    }
    return this.text;
  },
  toSingular : function() {
    if (singularMap[this.normal]) {
      return singularMap[this.normal];
    }
    return this.text;
  }
};

},{}],206:[function(require,module,exports){
'use strict';
const renderHtml = require('./renderHtml');
const chalk = require('chalk');
const paths = require('../paths');
const fns = paths.fns;

const colors = {
  Noun: chalk.cyan,
  Verb: chalk.magenta,
  Adjective: chalk.yellow,
  Adverb: chalk.red,
};

//supported Sentence.return() methods
module.exports = {
  /** a pixel-perfect reproduction of the input, with whitespace preserved */
  text: function() {
    return this.whitespace.before + this.text + this.whitespace.after;
  },
  /** a lowercased, punctuation-cleaned, whitespace-trimmed version of the word */
  normal: function() {
    return this.normal;
  },
  /** the &encoded term in a span element, with POS as classNames */
  html: function() {
    return renderHtml(this);
  },
  /** a simplified response for Part-of-Speech tagging*/
  tags: function() {
    return {
      text: this.text,
      normal: this.normal,
      tags: Object.keys(this.tag)
    };
  },
  /** check-print information for the console */
  check: function() {
    let tags = Object.keys(this.tag).map((tag) => {
      if (colors[tag]) {
        return colors[tag](tag);
      }
      return tag;
    }).join(', ');
    let word = this.text;
    // word = this.whitespace.before + word + this.whitespace.after;
    word = '\'' + chalk.green(word || '-') + '\'';
    if(this.dirty){
      word+='*'
    }
    let silent = '';
    if (this.silent_term) {
      silent = '[' + this.silent_term + ']';
    }
    // word += fns.leftPad(silent, 10);
    word = fns.leftPad(word, 25);
    word += fns.leftPad(silent, 10);
    // word = fns.leftPad(word, 32);
    // word = fns.rightPad(word, 28);
    console.log('   ' + word + '   ' + '     - ' + tags);
  }
};

},{"../paths":204,"./renderHtml":207,"chalk":8}],207:[function(require,module,exports){
'use strict';
//turn xml special characters into apersand-encoding.
//i'm not sure this is perfectly safe.
const escapeHtml = (s) => {
  const HTML_CHAR_MAP = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    '\'': '&#39;',
    ' ': '&nbsp;'
  };
  return s.replace(/[<>&"' ]/g, function(ch) {
    return HTML_CHAR_MAP[ch];
  });
};

//remove html elements already in the text
//not tested!
//http://stackoverflow.com/questions/295566/sanitize-rewrite-html-on-the-client-side
const sanitize = (html) => {
  const tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
  const tagOrComment = new RegExp(
    '<(?:'
    // Comment body.
    + '!--(?:(?:-*[^->])*--+|-?)'
    // Special "raw text" elements whose content should be elided.
    + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
    + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
    // Regular name
    + '|/?[a-z]'
    + tagBody
    + ')>',
    'gi');
  let oldHtml;
  do {
    oldHtml = html;
    html = html.replace(tagOrComment, '');
  } while (html !== oldHtml);
  return html.replace(/</g, '&lt;');
}

//turn the term into ~properly~ formatted html
const renderHtml = function(t) {
  let classes = Object.keys(t.tag).filter((tag) => tag !== 'Term');
  classes = classes.map(c => 'nlp' + c);
  classes = classes.join(' ');
  let text = sanitize(t.text)
  text = escapeHtml(text);
  let el = '<span class="' + classes + '">' + text + '</span>';
  return escapeHtml(t.whitespace.before) + el + escapeHtml(t.whitespace.after)
};

module.exports = renderHtml;

},{}],208:[function(require,module,exports){
'use strict';
//
const rootForm = function(term) {
  let str = term.normal || term.silent_term || '';
  //plural
  // if (term.tag.Plural) {
  // str = term.noun.Singular() || str;
  // }
  str = str.replace(/'s\b/, '');
  str = str.replace(/'\b/, '');
  term.root = str;
};

module.exports = rootForm;

},{}],209:[function(require,module,exports){
'use strict';
//set a term as a particular Part-of-speech
const path = require('./paths');
const log = path.log;
const tagset = path.tags;
const unTag = require('./unTag');


const makeCompatible = (term, tag, reason) => {
  if (!tagset[tag]) {
    return;
  }
  //find incompatible tags
  let not = tagset[tag].not || [];
  for (let i = 0; i < not.length; i++) {
    unTag(term, not[i], reason);
  }
};

const tag_one = (term, tag, reason) => {
  //ignore if already tagged
  if (term.tag[tag]) {
    return;
  }
  reason = reason || '';
  //clean first
  makeCompatible(term, tag, reason);
  // unTag(term, tag, reason);
  log.tagAs(term, tag, reason);
  term.tag[tag] = true;
};

const tagAll = function (term, tag, reason) {
  if (!term || !tag || typeof tag !== 'string') {
    // console.log(tag)
    return;
  }
  tag = tag || '';
  tag = tag.replace(/^#/, '');
  tag_one(term, tag, reason);
  //find assumed-tags
  if (tagset[tag]) {
    let tags = tagset[tag].parents || [];
    for (let i = 0; i < tags.length; i++) {
      tag_one(term, tags[i], '-');
    }
  }
};


module.exports = tagAll;
// console.log(tagset['Person']);

},{"./paths":204,"./unTag":211}],210:[function(require,module,exports){
'use strict';
// const normalize = require('./normalize');
const path = require('../paths');
const fns = path.fns;
const tagset = path.tags;
const term = {

  /** the punctuation at the end of this term*/
  endPunctuation: function () {
    let m = this.text.match(/[a-z]([,:;\/.(\.\.\.)\!\?]+)$/i);
    if (m) {
      const allowed = {
        ',': 'comma',
        ':': 'colon',
        ';': 'semicolon',
        '.': 'period',
        '...': 'elipses',
        '!': 'exclamation',
        '?': 'question'
      };
      if (allowed[m[1]]) {
        return allowed[m[1]];
      }
    }
    return null;
  },

  /** interpret a term's hyphenation */
  hyphenation: function () {
    let m = this.normal.match(/^([a-z]+)-([a-z]+)$/);
    if (m && m[1] && m[2]) {
      return {
        start: m[1],
        end: m[2]
      };
    }
    return null;
  },

  /** interpret a terms' contraction */
  contraction: function () {
    let t = this;
    const allowed = {
      're': true,
      've': true,
      'll': true,
      't': true,
      's': true,
      'd': true,
      'm': true
    };
    let parts = t.normal.match(/^([a-z]+)'([a-z][a-z]?)$/);
    if (parts && parts[1] && allowed[parts[2]]) {
      //handle n't
      if (parts[2] === 't' && parts[1].match(/[a-z]n$/)) {
        parts[1] = parts[1].replace(/n$/, '');
        parts[2] = 'n\'t'; //dunno..
      }
      //fix titlecase
      if (t.tag.TitleCase) {
        parts[1] = fns.titleCase(parts[1]);
      }
      return {
        start: parts[1],
        end: parts[2]
      };
    }
    // "flanders' house"
    parts = t.text.match(/[a-z]s'$/i);
    if (parts) {
      return {
        start: t.normal.replace(/s'?$/, ''),
        end: ''
      };
    }
    return null;
  },

  /** check if the term ends with a comma */
  hasComma: function () {
    if (this.term.endPunctuation() === 'comma') {
      return true;
    }
    return false;
  },

  /** where in the sentence is it? zero-based. */
  index: function () {
    let t = this;
    let terms = t.parent.arr;
    for (let i = 0; i < terms.length; i++) {
      if (terms[i] === t) {
        return i;
      }
    }
    return null;
  },

  /** ensure the first character is a capital. Ignore other characters. */
  titlecase: function () {
    return this.text.replace(/^[a-z]/, (x) => x.toUpperCase());
  },

  noPunctuation: function () {
    return this.text.replace(/([,;:])$/, '');
  },
  /** does it appear to be an acronym, like FBI or M.L.B. */
  isAcronym: function () {
    //like N.D.A
    if (this.text.match(/([A-Z]\.)+[A-Z]?$/)) {
      return true;
    }
    //like 'F.'
    if (this.text.match(/^[A-Z]\.$/)) {
      return true;
    }
    //like NDA
    if (this.text.match(/[A-Z]{3}$/)) {
      return true;
    }
    return false;
  },


  /** is this tag compatible with this word */
  canBe: function (tag) {
    tag = tag || ''
    tag = tag.replace(/^#/, '')
    let not = tagset[tag].not || [];
    for (let i = 0; i < not.length; i++) {
      if (this.tag[not[i]]) {
        return false
      }
    }
    return true
  },

  /** check if it is word-like in english */
  isWord: function () {
    let t = this;
    //assume a contraction produces a word-word
    if (t.silent_term) {
      return true;
    }
    //no letters or numbers
    if (!t.text.match(/[a-z|0-9]/i)) {
      return false;
    }
    //has letters, but with no vowels
    if (t.normal.match(/[a-z]/) && t.normal.length > 1 && !t.normal.match(/[aeiouy]/i)) {
      return false;
    }
    //has numbers but not a 'value'
    if (t.normal.match(/[0-9]/)) {
      //s4e
      if (t.normal.match(/[a-z][0-9][a-z]/)) {
        return false;
      }
      //ensure it looks like a 'value' eg '-$4,231.00'
      if (!t.normal.match(/^([$-])*?([0-9,\.])*?([s\$%])*?$/)) {
        return false;
      }
    }
    return true;
  },

  insertAfter: function () {
    let index = this.index()
      // console.log(this.parent)
  }

};

module.exports = term;

},{"../paths":204}],211:[function(require,module,exports){
'use strict';
//set a term as a particular Part-of-speech
const path = require('./paths');
const log = path.log;
const tagset = path.tags;

//remove a tag from a term
const unTagOne = (term, tag, reason) => {
  if (term.tag[tag]) {
    log.tell('   --' + tag + ' ' + (reason || ''));
    delete term.tag[tag];
  }
};

const unTagAll = (term, tag, reason) => {
  if (!term || !tag) {
    return;
  }
  unTagOne(term, tag, reason);
  if (tagset[tag]) {
    //pull-out their children (dependants) too
    //this should probably be recursive, instead of just 2-deep
    let killAlso = tagset[tag].children || [];
    for (let o = 0; o < killAlso.length; o++) {
      //kill its child
      unTagOne(term, killAlso[o], reason);
      //kill grandchildren too
      let kill2 = tagset[killAlso[o]].children || []
      for (let i2 = 0; i2 < kill2.length; i2++) {
        unTagOne(term, kill2[i2], reason);
      }
    }
  }
  return;
};
module.exports = unTagAll;

},{"./paths":204}],212:[function(require,module,exports){
'use strict';
// const numericValue = require('./numericValue');
// const textValue = require('./textValue');
// const parseNumber = require('./parse');

const value = {
  //
  // /* return a number, like '5th', as a cardinal, like 5 */
  // cardinal: function () {
  //   let num = parseNumber(this);
  //   //if it is textual, make a textCardinal
  //   if (this.tag.TextValue) {
  //     return textValue.cardinal(num);
  //   }
  //   //otherwise, numerical form
  //   return num;
  // },
  //
  // /* return a number, like '5', as an ordinal, like '5th' */
  // ordinal: function () {
  //   let num = parseNumber(this);
  //   //if it is textual, make a textCardinal
  //   if (this.tag.TextValue) {
  //     return textValue.ordinal(num);
  //   }
  //   //otherwise, numerical form
  //   return numericValue.ordinal(num);
  // },
  //
  // /** return a float/integer version of this number*/
  // number: function () {
  //   let num = parseNumber(this);
  //   if (this.tag.Ordinal) {
  //     return numericValue.ordinal(num);
  //   }
  //   return num;
  // },
  //
  // /** return a textual version of this number*/
  // textValue: function () {
  //   let num = parseNumber(this);
  //   if (this.tag.Ordinal) {
  //     return textValue.ordinal(num);
  //   } else {
  //     return textValue.cardinal(num);
  //   }
  // },
  //
  // nicenumber: function () {
  //   let num = parseNumber(this);
  //   if (!num && num !== 0) {
  //     return null;
  //   }
  //   num = '' + num;
  //   let x = num.split('.');
  //   let x1 = x[0];
  //   let x2 = x.length > 1 ? '.' + x[1] : '';
  //   let rgx = /(\d+)(\d{3})/;
  //   while (rgx.test(x1)) {
  //     x1 = x1.replace(rgx, '$1' + ',' + '$2');
  //   }
  //   return x1 + x2;
  // }

};
module.exports = value;

},{}],213:[function(require,module,exports){
module.exports = [
  {
    reg: /(eave)$/i,
    repl: {
      pr: '$1s',
      pa: '$1d',
      gr: 'eaving',
      ar: '$1r'
    }
  },
  {
    reg: /(ink)$/i,
    repl: {
      pr: '$1s',
      pa: 'unk',
      gr: '$1ing',
      ar: '$1er'
    }
  },
  {
    reg: /(end)$/i,
    repl: {
      pr: '$1s',
      pa: 'ent',
      gr: '$1ing',
      ar: '$1er'
    }
  },
  {
    reg: /(ide)$/i,
    repl: {
      pr: '$1s',
      pa: 'ode',
      gr: 'iding',
      ar: 'ider'
    }
  },
  {
    reg: /(ake)$/i,
    repl: {
      pr: '$1s',
      pa: 'ook',
      gr: 'aking',
      ar: '$1r'
    }
  },
  {
    reg: /(eed)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ed',
      gr: '$1ing',
      ar: '$1er'
    }
  },

  {
    reg: /(e)(ep)$/i,
    repl: {
      pr: '$1$2s',
      pa: '$1pt',
      gr: '$1$2ing',
      ar: '$1$2er'
    }
  }, {
    reg: /(a[tg]|i[zn]|ur|nc|gl|is)e$/i,
    repl: {
      pr: '$1es',
      pa: '$1ed',
      gr: '$1ing',
      prt: '$1en'
    }
  }, {
    reg: /([i|f|rr])y$/i,
    repl: {
      pr: '$1ies',
      pa: '$1ied',
      gr: '$1ying'
    }
  }, {
    reg: /([td]er)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ed',
      gr: '$1ing'
    }
  }, {
    reg: /([bd]l)e$/i,
    repl: {
      pr: '$1es',
      pa: '$1ed',
      gr: '$1ing'
    }
  }, {
    reg: /(ish|tch|ess)$/i,
    repl: {
      pr: '$1es',
      pa: '$1ed',
      gr: '$1ing'
    }
  }, {
    reg: /(ion|end|e[nc]t)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ed',
      gr: '$1ing'
    }
  }, {
    reg: /(om)e$/i,
    repl: {
      pr: '$1es',
      pa: 'ame',
      gr: '$1ing'
    }
  }, {
    reg: /([aeiu])([pt])$/i,
    repl: {
      pr: '$1$2s',
      pa: '$1$2',
      gr: '$1$2$2ing'
    }
  }, {
    reg: /(er)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ed',
      gr: '$1ing'
    }
  }, {
    reg: /(en)$/i,
    repl: {
      pr: '$1s',
      pa: '$1ed',
      gr: '$1ing'
    },
  },
  {
    reg: /(..)(ow)$/i,
    repl: {
      pr: '$1$2s',
      pa: '$1ew',
      gr: '$1$2ing',
      prt: '$1$2n'
    }
  },
  {
    reg: /(..)([cs]h)$/i,
    repl: {
      pr: '$1$2es',
      pa: '$1$2ed',
      gr: '$1$2ing'
    },
  },
  {
    reg: /([^aeiou][ou])(g|d)$/i,
    repl: {
      pr: '$1$2s',
      pa: '$1$2$2ed',
      gr: '$1$2$2ing'
    },
  },
  {
    reg: /([^aeiou][aeiou])(b|t|p|m)$/i,
    repl: {
      pr: '$1$2s',
      pa: '$1$2$2ed',
      gr: '$1$2$2ing'
    },
  },
  {
    reg: /([aeiou]zz)$/i,
    repl: {
      pr: '$1es',
      pa: '$1ed',
      gr: '$1ing'
    }
  }
];

},{}],214:[function(require,module,exports){
'use strict';
const checkIrregulars = require('./irregulars');
const suffixPass = require('./suffixes');
const generic = require('./generic');
//this method is the same as regular conjugate, but optimised for use in the lexicon during warm-up.
//it's way faster because it knows input is already infinitive

const want = [
  'PastTense',
  'PresentTense',
  'FutureTense',
  'Gerund'
];

const fasterConjugate = (inf) => {
  let all = {
    Infinitive: inf
  };
  const irregObj = checkIrregulars(all['Infinitive']);
  if (irregObj !== null) {
    Object.keys(irregObj).forEach((k) => {
      if (irregObj[k] && !all[k]) {
        all[k] = irregObj[k];
      }
    });
  }
  //check suffix rules
  const suffObj = suffixPass(inf);
  Object.keys(suffObj).forEach((k) => {
    if (suffObj[k] && !all[k]) {
      all[k] = suffObj[k];
    }
  });
  for(let i = 0; i < want.length; i++) {
    if (!all[want[i]]) {
      all[want[i]] = generic[want[i]](all);
    }
  }
  return all;
};
module.exports = fasterConjugate;
// console.log(fasterConjugate('play'));

},{"./generic":215,"./irregulars":217,"./suffixes":219}],215:[function(require,module,exports){
'use strict';
//non-specifc, 'hail-mary' transforms from infinitive, into other forms
const fns = require('./paths').fns;

const generic = {

  Gerund: (o) => {
    let inf = o.Infinitive;
    if (fns.endsWith(inf, 'e')) {
      return inf.replace(/e$/, 'ing');
    }
    return inf + 'ing';
  },

  PresentTense: (o) => {
    let inf = o.Infinitive;
    if (fns.endsWith(inf, 's')) {
      return inf + 'es';
    }
    if (inf.match(/[bcdfghjklmnpqrstvwxz]y$/)) {
      return inf.slice(0, -1) + 'ies';
    }
    return inf + 's';
  },

  PastTense: (o) => {
    let inf = o.Infinitive;
    if (fns.endsWith(inf, 'e')) {
      return inf + 'd';
    }
    if (fns.endsWith(inf, 'ed')) {
      return inf;
    }
    if (inf.match(/[bcdfghjklmnpqrstvwxz]y$/)) {
      return inf.slice(0, -1) + 'ied';
    }
    return inf + 'ed';
  },

  FutureTense: (o) => {
    return 'will ' + o.Infinitive;
  },

  PerfectTense: (o) => {
    return 'have ' + (o.Participle || o.PastTense);
  },

  Pluperfect: (o) => {
    if (o.PastTense) {
      return 'had ' + o.PastTense;
    }
    return null;
  },
  FuturePerfect: (o) => {
    if (o.PastTense) {
      return 'will have ' + o.PastTense;
    }
    return null;
  }

};

module.exports = generic;

},{"./paths":218}],216:[function(require,module,exports){
'use strict';
const checkIrregulars = require('./irregulars');
const suffixPass = require('./suffixes');
const toActor = require('./toActor');
const toAdjective = require('./toAdjective');
const generic = require('./generic');

//turn a verb into all it's forms
const conjugate = function(t, verbose) {
  //dont conjugate didn't
  if (t.tag.Contraction) {
    t.text = t.silent_term;
  }
  let all = {
    PastTense: null,
    PresentTense: null,
    FutureTense: null,
    Infinitive: null,
    Gerund: null,
    Actor: null,
    PerfectTense: null,
    Pluperfect: null,
  };
  //first, get its current form
  let form = t.verb.conjugation(verbose);
  if (form) {
    all[form] = t.normal;
  }
  if (form !== 'Infinitive') {
    all['Infinitive'] = t.verb.infinitive(verbose) || '';
  }
  //check irregular forms
  const irregObj = checkIrregulars(all['Infinitive']);
  Object.keys(irregObj).forEach((k) => {
    if (irregObj[k] && !all[k]) {
      all[k] = irregObj[k];
    }
  });
  //ok, send this infinitive to all conjugators
  let inf = all['Infinitive'] || t.normal;

  //check suffix rules
  const suffObj = suffixPass(inf);
  Object.keys(suffObj).forEach((k) => {
    if (suffObj[k] && !all[k]) {
      all[k] = suffObj[k];
    }
  });
  //ad-hoc each missing form
  //to Actor
  if (!all.Actor) {
    //a phrasal like 'step up' can't be an actor -'step upper'?
    // if (!t.tag.PhrasalVerb) {
    all.Actor = toActor(inf);
  // }
  }
  //add adjective, like walk->walkable
  all.Adjective = toAdjective(all.Infinitive);

  //use fallback, generic transformations
  Object.keys(all).forEach((k) => {
    if (!all[k] && generic[k]) {
      all[k] = generic[k](all);
    }
  });

  return all;
};

module.exports = conjugate;

},{"./generic":215,"./irregulars":217,"./suffixes":219,"./toActor":220,"./toAdjective":221}],217:[function(require,module,exports){
'use strict';
const irregulars = require('./paths').data.irregular_verbs;
const infArr = Object.keys(irregulars);
const forms = [
  'Participle',
  'Gerund',
  'PastTense',
  'PresentTense',
  'FuturePerfect',
  'PerfectTense',
  'Actor'
];

const checkIrregulars = function(str) {
  //fast infinitive lookup
  if (irregulars[str] !== undefined) {
    let obj = Object.assign({}, irregulars[str]);
    obj.Infinitive = str;
    return obj;
  }
  for(let i = 0; i < infArr.length; i++) {
    for(let o = 0; o < forms.length; o++) {
      let irObj = irregulars[infArr[i]];
      if (irObj[forms[o]]) {
        let obj = Object.assign({}, irObj);
        obj.Infinitive = str;
        return obj;
      }
    }
  }
  return null;
};

module.exports = checkIrregulars;
// console.log(checkIrregulars('understood'));

},{"./paths":218}],218:[function(require,module,exports){
arguments[4][169][0].apply(exports,arguments)
},{"../paths":223,"dup":169}],219:[function(require,module,exports){
'use strict';
const rules = require('./data/rules');
const mapping = {
  pr: 'PresentTense',
  pa: 'PastTense',
  gr: 'Gerund',
  prt: 'Participle',
  ar: 'Actor',
};
const keys = Object.keys(mapping);

//check suffix rules
const suffixPass = function(inf) {
  let found = {};
  for(let i = 0; i < rules.length; i++) {
    if (inf.match(rules[i].reg)) {
      let obj = rules[i].repl;
      for(let o = 0; o < keys.length; o++) {
        if (obj[keys[o]]) {
          let key = mapping[keys[o]];
          found[key] = inf.replace(rules[i].reg, obj[keys[o]]);
        }
      }
      return found;
    }
  }
  return found;
};

module.exports = suffixPass;

},{"./data/rules":213}],220:[function(require,module,exports){
'use strict';
//turn 'walk' into 'walker'
const irregulars = {
  'tie': 'tier',
  'dream': 'dreamer',
  'sail': 'sailer',
  'run': 'runner',
  'rub': 'rubber',
  'begin': 'beginner',
  'win': 'winner',
  'claim': 'claimant',
  'deal': 'dealer',
  'spin': 'spinner'
};
const dont = {
  'aid': 1,
  'fail': 1,
  'appear': 1,
  'happen': 1,
  'seem': 1,
  'try': 1,
  'say': 1,
  'marry': 1,
  'be': 1,
  'forbid': 1,
  'understand': 1,
  'bet': 1
};
const rules = [{
  'reg': /e$/i,
  'repl': 'er'
}, {
  'reg': /([aeiou])([mlgp])$/i,
  'repl': '$1$2$2er'
}, {
  'reg': /([rlf])y$/i,
  'repl': '$1ier'
}, {
  'reg': /^(.?.[aeiou])t$/i,
  'repl': '$1tter'
}];

const toActor = function(inf) {
  //check blacklist
  if (dont[inf]) {
    return null
  }
  //check irregulars
  if (irregulars[inf]) {
    return irregulars[inf]
  }
  //try rules
  for (let i = 0; i < rules.length; i++) {
    if (inf.match(rules[i].reg)) {
      return inf.replace(rules[i].reg, rules[i].repl)
    }
  }
  //yup,
  return inf + 'er'
}

module.exports = toActor

},{}],221:[function(require,module,exports){
'use strict';
//turn a infinitiveVerb, like "walk" into an adjective like "walkable"

const rules = [
  [/[^aeiou]y$/, 'i'], //relay - reliable
  [/([aeiou][n])$/, '$1n'], //win - winnable
];

//convert - 'convertible'
//http://grammarist.com/usage/able-ible/
//http://blog.oxforddictionaries.com/2012/10/ibles-and-ables/
const ible_suffixes = {
  collect: true,
  exhaust: true,
  convert: true,
  digest: true,
  discern: true,
  dismiss: true,
  reverse: true,
  access: true,
  collapse: true,
  express: true
};

const irregulars = {
  eat: 'edible',
  hear: 'audible',
  see: 'visible',
  defend: 'defensible',
  write: 'legible',
  move: 'movable',
  divide: 'divisible',
  perceive: 'perceptible'
};

//takes an infitive verb, and returns an adjective form
const toAdjective = function(str) {
  if (irregulars[str]) {
    return irregulars[str];
  }
  for(let i = 0; i < rules.length; i++) {
    if (str.match(rules[i][0])) {
      str = str.replace(rules[i][0], rules[i][1]);
    }
  }
  let adj = str + 'able';
  if (ible_suffixes[str]) {
    adj = str + 'ible';
  }
  return adj;
};

module.exports = toAdjective;
// console.log(toAdjective('buy'));

},{}],222:[function(require,module,exports){
'use strict';
const predict = require('./predict');
const toInfinitive = require('./toInfinitive');
const toNegative = require('./toNegative');
const toPositive = require('./toPositive');
const conjugate = require('./conjugate');
let pluralMap = {
  'is': 'are',
  'have': 'has'
};
let singularMap = {
  'are': 'is',
  'has': 'have'
};

module.exports = {
  /**inflection*/
  toPlural: function () {
    if (pluralMap[this.normal]) {
      return pluralMap[this.normal];
    }
    if (this.tag.PresentTense) {
      return this.text.replace(/s$/, '');
    }
    return this.text;
  },
  toSingular: function () {
    if (singularMap[this.normal]) {
      return singularMap[this.normal];
    }
    return this.text;
  },

  /**negative/positive*/
  toNegative: function () {
    return toNegative(this);
  },
  toPositive: function () {
    return toPositive(this);
  },

  /**conjugation*/
  infinitive: function (verbose) {
    return toInfinitive(this, verbose);
  },
  conjugation: function (verbose) {
    return predict(this, verbose);
  },
  conjugate: function (verbose) {
    return conjugate(this, verbose);
  },
  pastTense: function () {
    return conjugate(this).PastTense;
  },
  presentTense: function () {
    return conjugate(this).PresentTense;
  },
  futureTense: function () {
    return conjugate(this).FutureTense;
  }
};

},{"./conjugate":216,"./predict":224,"./toInfinitive":226,"./toNegative":228,"./toPositive":229}],223:[function(require,module,exports){
arguments[4][169][0].apply(exports,arguments)
},{"../paths":204,"dup":169}],224:[function(require,module,exports){
'use strict';
const paths = require('../paths');
const log = paths.log;
const fns = paths.fns;
const suffix_rules = require('./suffix_rules');
const path = 'conjugation';

const goodTypes = {
  Infinitive: true,
  Gerund: true,
  PastTense: true,
  PresentTense: true,
  FutureTense: true,
  PerfectTense: true,
  Pluperfect: true,
  FuturePerfect: true,
  Participle: true
};

const predictForm = function(term, verbose) {
  //do we already know the form?
  let keys = Object.keys(goodTypes);
  for (let i = 0; i < keys.length; i++) {
    if (term.tag[keys[i]]) {
      // if (verbose) {
      //   console.log('predicted ' + keys[i] + ' from pos', path);
      // }
      return keys[i];
    }
  }
  //consult our handy suffix rules
  const arr = Object.keys(suffix_rules);
  for (let i = 0; i < arr.length; i++) {
    if (fns.endsWith(term.normal, arr[i]) && arr[i].length < term.normal.length) {
      // if (verbose) {
      //   const msg = 'predicted ' + suffix_rules[arr[i]] + ' from suffix ' + arr[i];
      //   console.log(msg, path);
      // }
      return suffix_rules[arr[i]];
    }
  }
  return null;
};

module.exports = predictForm;

},{"../paths":223,"./suffix_rules":225}],225:[function(require,module,exports){
'use strict';
//suffix signals for verb tense, generated from test data
const compact = {
  'Gerund': [
    'ing'
  ],
  'Actor': [
    'erer'
  ],
  'Infinitive': [
    'ate',
    'ize',
    'tion',
    'rify',
    'then',
    'ress',
    'ify',
    'age',
    'nce',
    'ect',
    'ise',
    'ine',
    'ish',
    'ace',
    'ash',
    'ure',
    'tch',
    'end',
    'ack',
    'and',
    'ute',
    'ade',
    'ock',
    'ite',
    'ase',
    'ose',
    'use',
    'ive',
    'int',
    'nge',
    'lay',
    'est',
    'ain',
    'ant',
    'ent',
    'eed',
    'er',
    'le',
    'own',
    'unk',
    'ung',
    'en'
  ],
  'PastTense': [
    'ed',
    'lt',
    'nt',
    'pt',
    'ew',
    'ld'
  ],
  'PresentTense': [
    'rks',
    'cks',
    'nks',
    'ngs',
    'mps',
    'tes',
    'zes',
    'ers',
    'les',
    'acks',
    'ends',
    'ands',
    'ocks',
    'lays',
    'eads',
    'lls',
    'els',
    'ils',
    'ows',
    'nds',
    'ays',
    'ams',
    'ars',
    'ops',
    'ffs',
    'als',
    'urs',
    'lds',
    'ews',
    'ips',
    'es',
    'ts',
    'ns',
    's'
  ]
};
const suffix_rules = {};
const keys = Object.keys(compact);
const l = keys.length;

for (let i = 0; i < l; i++) {
  let l2 = compact[keys[i]].length;
  for (let o = 0; o < l2; o++) {
    suffix_rules[compact[keys[i]][o]] = keys[i];
  }
}
module.exports = suffix_rules;

},{}],226:[function(require,module,exports){
'use strict';
//turn any verb into its infinitive form
const rules = require('./rules');
let irregulars = require('../paths').data.irregular_verbs;

//map the irregulars for easy infinitive lookup
// {bought: 'buy'}
const verb_mapping = () => {
  return Object.keys(irregulars).reduce((h, k) => {
    Object.keys(irregulars[k]).forEach((pos) => {
      h[irregulars[k][pos]] = k;
    });
    return h;
  }, {});
};

irregulars = verb_mapping();

const toInfinitive = function(t, verbose) {
  if (t.tag.Infinitive) {
    return t.normal;
  }
  //check the irregular verb conjugations
  if (irregulars[t.normal]) {
    return irregulars[t.normal];
  }
  //check the suffix rules
  let form = t.verb.conjugation();
  if (rules[form]) {
    for (let i = 0; i < rules[form].length; i++) {
      let rule = rules[form][i];
      if (t.normal.match(rule.reg)) {
        return t.normal.replace(rule.reg, rule.to);
      }
    }
  }
  return t.normal;
};

module.exports = toInfinitive;

},{"../paths":223,"./rules":227}],227:[function(require,module,exports){
'use strict';
//rules for turning a verb into infinitive form
let rules = {
  Participle: [
    {
      reg: /own$/i,
      to: 'ow'
    },
    {
      reg: /(.)un([g|k])$/i,
      to: '$1in$2'
    }
  ],
  Actor: [
    {
      reg: /(er)er$/i,
      to: '$1'
    }
  ],
  PresentTense: [
    {
      reg: /(ies)$/i,
      to: 'y'
    }, {
      reg: /(tch|sh)es$/i,
      to: '$1'
    }, {
      reg: /(ss|zz)es$/i,
      to: '$1'
    }, {
      reg: /([tzlshicgrvdnkmu])es$/i,
      to: '$1e'
    }, {
      reg: /(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$/i,
      to: '$1'
    }, {
      reg: /(ow)s$/i,
      to: '$1'
    }, {
      reg: /(op)s$/i,
      to: '$1'
    }, {
      reg: /([eirs])ts$/i,
      to: '$1t'
    }, {
      reg: /(ll)s$/i,
      to: '$1'
    }, {
      reg: /(el)s$/i,
      to: '$1'
    }, {
      reg: /(ip)es$/i,
      to: '$1e'
    }, {
      reg: /ss$/i,
      to: 'ss'
    }, {
      reg: /s$/i,
      to: ''
    }],
  Gerund: [
    {
      reg: /pping$/i,
      to: 'p'
    }, {
      reg: /lling$/i,
      to: 'll'
    }, {
      reg: /tting$/i,
      to: 't'
    }, {
      reg: /ssing$/i,
      to: 'ss'
    }, {
      reg: /gging$/i,
      to: 'g'
    }, {
      reg: /([^aeiou])ying$/i,
      to: '$1y'
    }, {
      reg: /([^ae]i.)ing$/i,
      to: '$1e'
    }, {
      reg: /(ea.)ing$/i,
      to: '$1'
    }, {
      reg: /(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$/i,
      to: '$1e'
    }, {
      reg: /(ch|sh)ing$/i,
      to: '$1'
    }, {
      reg: /(..)ing$/i,
      to: '$1'
    }],
  PastTense: [
    {
      reg: /(ued)$/i,
      to: 'ue'
    }, {
      reg: /([aeiou]zz)ed$/i,
      to: '$1'
    }, {
      reg: /(e|i)lled$/i,
      to: '$1ll'
    }, {
      reg: /(sh|ch)ed$/i,
      to: '$1'
    }, {
      reg: /(tl|gl)ed$/i,
      to: '$1e'
    }, {
      reg: /(um?pt?)ed$/i,
      to: '$1'
    }, {
      reg: /(ss)ed$/i,
      to: '$1'
    }, {
      reg: /pped$/i,
      to: 'p'
    }, {
      reg: /tted$/i,
      to: 't'
    }, {
      reg: /gged$/i,
      to: 'g'
    }, {
      reg: /(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$/i,
      to: '$1'
    }, {
      reg: /(.ut)ed$/i,
      to: '$1e'
    }, {
      reg: /(us)ed$/i,
      to: '$1e'
    }, {
      reg: /(..[^aeiouy])ed$/i,
      to: '$1e'
    }, {
      reg: /ied$/i,
      to: 'y'
    }, {
      reg: /(.o)ed$/i,
      to: '$1o'
    }, {
      reg: /(.i)ed$/i,
      to: '$1'
    }, {
      reg: /(a[^aeiou])ed$/i,
      to: '$1'
    }, {
      reg: /([rl])ew$/i,
      to: '$1ow'
    }, {
      reg: /([pl])t$/i,
      to: '$1t'
    }]
};
module.exports = rules;

},{}],228:[function(require,module,exports){
'use strict';
//
const toNegative = (t) => {
  return t
}
module.exports = toNegative

},{}],229:[function(require,module,exports){
'use strict';
//
const toPositive = (t) => {
  return t
}
module.exports = toPositive

},{}],230:[function(require,module,exports){
//follow the javascript scheme
//sunday is 0
exports.longDays = {
  'sunday': 0,
  'monday': 1,
  'tuesday': 2,
  'wednesday': 3,
  'thursday': 4,
  'friday': 5,
  'saturday': 6,
}
exports.shortDays = {
  'sun': 0,
  'mon': 1,
  'tues': 2,
  'wed': 3,
  'thurs': 4,
  'fri': 5,
  'sat': 6,
}

},{}],231:[function(require,module,exports){
'use strict';
const data = require('./data');
const shortDays = data.shortDays
const longDays = data.longDays

module.exports = {
  index: function () {
    if (this.tag.WeekDay) {
      if (longDays[this.normal] !== undefined) {
        return longDays[this.normal]
      }
      if (shortDays[this.normal] !== undefined) {
        return shortDays[this.normal]
      }
    }
    return null
  },
  toShortForm: function () {
    if (this.tag.WeekDay) {
      if (longDays[this.normal] !== undefined) {
        let shorten = Object.keys(shortDays)
        this.text = shorten[longDays[this.normal]]
      }
    }
    return this
  },
  toLongForm: function () {
    if (this.tag.WeekDay) {
      if (shortDays[this.normal] !== undefined) {
        let longer = Object.keys(longDays)
        this.text = longer[shortDays[this.normal]]
      }
    }
    return this
  }
}

},{"./data":230}],232:[function(require,module,exports){
'use strict';
const build_whitespace = (str) => {
  let whitespace = {
    before: '',
    after: ''
  };
  //get before
  let m = str.match(/^\s+/);
  if (m) {
    whitespace.before = m[0];
  }
  //get after
  m = str.match(/(\s+|-)$/);
  if (m) {
    str = str.replace(/(\s+|-)$/, '');
    whitespace.after = m[0];
  }
  return whitespace;
};
module.exports = build_whitespace;

},{}],233:[function(require,module,exports){
'use strict';
const Term = require('../term');

//turn a string into an array of terms (naiive for now, lumped later)
const fromString = function (str) {
  let all = [];
  //start with a naiive split
  str = str || '';
  let firstSplit = str.split(/(\S+)/);
  let arr = [];
  for(let i = 0; i < firstSplit.length; i++) {
    let word = firstSplit[i];
    let hyphen = word.match(/^([a-z]+)(-)([a-z0-9].*)/i);
    if (hyphen) { //we found one 'word-word'
      arr.push(hyphen[1] + hyphen[2]);
      arr.push(hyphen[3]);
    } else {
      arr.push(word);
    }
  }
  //greedy merge whitespace+arr to the right
  let carry = '';
  for (let i = 0; i < arr.length; i++) {
    //if it's more than a whitespace
    if (arr[i].match(/\S/)) {
      all.push(carry + arr[i]);
      carry = '';
    } else {
      carry += arr[i];
    }
  }
  //handle last one
  if (carry && all.length > 0) {
    all[all.length - 1] += carry; //put it on the end
  }
  return all.map((t) => new Term(t));
};
module.exports = fromString;

},{"../term":190}],234:[function(require,module,exports){
'use strict';
const tagger = require('./tagger');
const fromString = require('./fromString');

class Terms {
  constructor(arr, lexicon, originalText, termsFull) {
    this.terms = arr;
    this.lexicon = lexicon;
    this._parent = originalText;
    this.parentTerms = termsFull || this;
    this.get = (n) => {
      return this.terms[n];
    };
  }
  get found() {
    return this.terms.length > 0;
  }
  get length() {
    return this.terms.length;
  }
  get isA() {
    return 'Terms';
  }
  set dirty(dirt) {
    this.terms.forEach((t) => {
      t.dirty = dirt;
    });
  }
  posTag() {
    tagger(this);
    return this;
  }
  firstTerm() {
    return this.terms[0];
  }
  lastTerm() {
    return this.terms[this.terms.length - 1];
  }
  get parent() {
    return this._parent || this;
  }
  set parent(r) {
    this._parent = r;
    return this;
  }
  all() {
    return this.parent;
  }
  get whitespace() {
    return {
      before: (str) => {
        this.firstTerm().whitespace.before = str;
        return this;
      },
      after: (str) => {
        this.lastTerm().whitespace.after = str;
        return this;
      },
    };
  }

  static fromString(str, lexicon, parent) {
    let termArr = fromString(str);
    let ts = new Terms(termArr, lexicon, null);
    //give each term a reference to this ts
    ts.terms.forEach((t) => {
      t.parentTerms = ts;
    });
    ts.posTag();
    return ts;
  }
}
Terms = require('./match')(Terms);
Terms = require('./methods/case')(Terms);
Terms = require('./methods/split')(Terms);
Terms = require('./methods/insert')(Terms);
Terms = require('./methods/replace')(Terms);
Terms = require('./methods/tag')(Terms);
Terms = require('./methods/delete')(Terms);
Terms = require('./methods/render')(Terms);
Terms = require('./methods/misc')(Terms);
Terms = require('./methods/transform')(Terms);
module.exports = Terms;

},{"./fromString":233,"./match":235,"./methods/case":240,"./methods/delete":241,"./methods/insert":242,"./methods/misc":243,"./methods/render":244,"./methods/replace":245,"./methods/split":246,"./methods/tag":247,"./methods/transform":248,"./tagger":257}],235:[function(require,module,exports){
'use strict';
//
const syntax = require('./lib/syntax');
const startHere = require('./lib/startHere');
const Text = require('../../result/index');


const matchMethods = (Terms) => {
  const methods = {

    /**match all */
    match: function (str, verbose) {
      let matches = [];
      let regs = syntax(str);
      for (let t = 0; t < this.terms.length; t++) {
        //don't loop through if '^'
        if (regs[0] && regs[0].starting && t > 0) {
          break;
        }
        let m = startHere(this, t, regs, verbose);
        if (m) {
          matches.push(m);
          //ok, don't try to match these again.
          let skip = m.length - 1;
          t += skip; //this could use some work
        }
      }
      matches = matches.map((a) => {
        return new Terms(a, this.lexicon, this.parent, this.parentTerms);
      });
      // return matches
      let r = new Text(matches, this.lexicon, this.parent);
      return r;
    },

    /**return first match */
    matchOne: function (str) {
      let regs = syntax(str);
      for (let t = 0; t < this.terms.length; t++) {
        //don't loop through if '^'
        if (regs[0] && regs[0].starting && t > 0) {
          break;
        }
        let m = startHere(this, t, regs);
        if (m) {
          return m;
        }
      }
      return null;
    },

    /**return first match */
    has: function (str) {
      let m = this.matchOne(str);
      return !!m;
    },

    /**everything but these matches*/
    not: function (str, verbose) {
      let matches = [];
      let regs = syntax(str);
      let terms = [];
      //try the match starting from each term
      for(let i = 0; i < this.terms.length; i++) {
        let bad = startHere(this, i, regs, verbose);
        if (bad) {
          //reset matches
          if (terms.length > 0) {
            matches.push(terms);
            terms = [];
          }
          //skip these terms now
          i += bad.length - 1;
          continue;
        }
        terms.push(this.terms[i]);
      }
      //remaining ones
      if (terms.length > 0) {
        matches.push(terms);
      }
      matches = matches.map((a) => {
        return new Terms(a, this.lexicon, this.parent, this.parentTerms);
      });
      // return matches
      let r = new Text(matches, this.lexicon, this.parent);
      return r;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = matchMethods;

},{"../../result/index":106,"./lib/startHere":238,"./lib/syntax":239}],236:[function(require,module,exports){
'use strict';
const fns = require('./paths').fns;

const almostMatch = (reg_str, term) => {
  return fns.startsWith(term.normal, reg_str);
};

// match ['john', 'smith'] regs, when the term is lumped
const lumpMatch = function(term, regs, reg_i) {
  let reg_str = regs[reg_i].normal;
  //is this a partial match? 'tony'& 'tony hawk'
  if (almostMatch(reg_str, term)) {
    //try to grow it
    for (reg_i = reg_i + 1; reg_i < regs.length; reg_i++) {
      reg_str += ' ' + regs[reg_i].normal;
      //is it now perfect?
      if (reg_str === term.normal) {
        return reg_i;
      }
      //is it still almost?
      if (almostMatch(reg_str, term)) {
        continue;
      }
      return null;
    }
  }
  return null;
};

module.exports = lumpMatch;

},{"./paths":237}],237:[function(require,module,exports){
module.exports = {
  fns: require('../../../fns'),
  log: require('../../../logger'),
};

},{"../../../fns":102,"../../../logger":104}],238:[function(require,module,exports){
'use strict';
const lumpMatch = require('./lumpMatch');

// match everything until this point - '*'
const greedyUntil = (ts, i, reg) => {
  for (i = i; i < ts.length; i++) {
    let t = ts.terms[i]
    if (t.isMatch(reg)) {
      return i;
    }
  }
  return null;
};

//keep matching this reg as long as possible
const greedyOf = (ts, i, reg, until) => {
  for (i = i; i < ts.length; i++) {
    let t = ts.terms[i]
      //found next reg ('until')
    if (until && t.isMatch(until)) {
      return i;
    }
    //die here
    if (!t.isMatch(reg)) {
      return i;
    }
  }
  return i;
};

//try and match all regs, starting at this term
const startHere = (ts, startAt, regs, verbose) => {
  let term_i = startAt;
  //check each regex-thing
  for (let reg_i = 0; reg_i < regs.length; reg_i++) {
    let term = ts.terms[term_i];
    let reg = regs[reg_i];
    let next_reg = regs[reg_i + 1];

    if (!term) {
      //we didn't need it anyways
      if (reg.optional) {
        continue;
      }
      return null;
    }

    //catch '^' errors
    if (reg.starting && term_i > 0) {
      return null;
    }

    //catch '$' errors
    if (reg.ending && term_i !== ts.length - 1 && !reg.minMax) {
      return null;
    }

    //support '*'
    if (regs[reg_i].astrix) {
      //just grab until the end..
      if (!next_reg) {
        return ts.terms.slice(startAt, ts.length);
      }
      let foundAt = greedyUntil(ts, term_i, regs[reg_i + 1]);
      if (!foundAt) {
        return null;
      }
      term_i = foundAt + 1;
      reg_i += 1;
      continue;
    }

    //support '{x,y}'
    if (regs[reg_i].minMax) {
      //on last reg?
      if (!next_reg) {
        let len = ts.length;
        let max = regs[reg_i].minMax.max + startAt;
        //if it must go to the end, but can't
        if (regs[reg_i].ending && max < len) {
          return null;
        }
        //dont grab past the end
        if (max < len) {
          len = max;
        }
        return ts.terms.slice(startAt, len);
      }
      //otherwise, match until this next thing
      let foundAt = greedyUntil(ts, term_i, next_reg);
      if (!foundAt) {
        return null;
      }
      //if it's too close/far..
      let minMax = regs[reg_i].minMax;
      if (foundAt < minMax.min || foundAt > minMax.max) {
        return null;
      }
      term_i = foundAt + 1;
      reg_i += 1;
      continue;
    }

    //if optional, check next one
    if (reg.optional) {
      let until = regs[reg_i + 1];
      term_i = greedyOf(ts, term_i, reg, until);
      continue;
    }

    //check a perfect match
    if (term.isMatch(reg, verbose)) {
      term_i += 1;
      //try to greedy-match '+'
      if (reg.consecutive) {
        let until = regs[reg_i + 1];
        term_i = greedyOf(ts, term_i, reg, until);
      }
      continue;
    }

    if (term.silent_term && !term.normal) { //skip over silent contraction terms
      //we will continue on it, but not start on it
      if (reg_i === 0) {
        return null
      }
      //try the next term, but with this regex again
      term_i += 1;
      reg_i -= 1;
      continue;
    }

    //handle partial-matches of lumped terms
    let lumpUntil = lumpMatch(term, regs, reg_i);
    if (lumpUntil) {
      reg_i = lumpUntil;
      term_i += 1;
      continue;
    }


    //was it optional anways?
    if (reg.optional) {
      continue;
    }
    return null;
  }
  return ts.terms.slice(startAt, term_i);
};

module.exports = startHere;

},{"./lumpMatch":236}],239:[function(require,module,exports){
'use strict';
// parse a search lookup term find the regex-like syntax in this term
const fns = require('./paths').fns;

//turn 'regex-like' search string into parsed json
const parse_term = function (term, i) {
  term = term || '';
  term = term.trim();
  let reg = {};
  //order matters..

  //negation ! flag
  if (fns.startsWith(term, '!')) {
    term = term.substr(1, term.length);
    reg.negative = true;
  }
  //leading ^ flag
  if (fns.startsWith(term, '^')) {
    term = term.substr(1, term.length);
    reg.starting = true;
  }
  //trailing $ flag means ending
  if (fns.endsWith(term, '$')) {
    term = term.replace(/\$$/, '');
    reg.ending = true;
  }
  //optional flag
  if (fns.endsWith(term, '?')) {
    term = term.replace(/\?$/, '');
    reg.optional = true;
  }
  //atleast-one-but-greedy flag
  if (fns.endsWith(term, '+')) {
    term = term.replace(/\+$/, '');
    reg.optional = false;
    reg.consecutive = true;
  }

  //pos flag
  if (fns.startsWith(term, '#')) {
    term = term.replace(/^\#/, '');
    reg.tag = [fns.titleCase(term)]
    term = null;
  }
  //one_of options flag
  if (fns.startsWith(term, '(') && fns.endsWith(term, ')')) {
    term = term.replace(/\)$/, '');
    term = term.replace(/^\(/, '');
    reg.oneOf = term.split(/\|/g)
    term = null;
  }
  //min/max any '{1,3}'
  if (fns.startsWith(term, '{') && fns.endsWith(term, '}')) {
    let m = term.match(/\{([0-9]+), ?([0-9]+)\}/);
    reg.minMax = {
      min: parseInt(m[1], 10),
      max: parseInt(m[2], 10)
    };
    term = null;
  }
  //a period means any one term
  if (term === '.') {
    reg.anyOne = true;
    term = null;
  }
  //a * means anything until sentence end
  if (term === '*') {
    reg.astrix = true;
    term = null;
  }
  reg.normal = term;
  if (reg.normal) {
    reg.normal = reg.normal.toLowerCase();
  }
  return reg;
};

//turn a match string into an array of objects
const parse_all = function (reg) {
  reg = reg || ''
  reg = reg.split(/ +/);
  return reg.map(parse_term);
};
// console.log(parse_all(''));

module.exports = parse_all;

},{"./paths":237}],240:[function(require,module,exports){
'use strict';

const caseMethods = (Terms) => {

  const methods = {

    toTitleCase: function () {
      this.terms.forEach((t) => {
        t.text = t.term.titlecase();
      });
      this.tagAs('#TitleCase', 'toTitleCase');
      return this;
    },
    toLowerCase: function () {
      this.terms.forEach((t) => {
        t.text = t.text.toLowerCase();
      });
      this.unTag('#TitleCase');
      this.unTag('#UpperCase');
      return this;
    },
    toUpperCase: function () {
      this.terms.forEach((t) => {
        t.text = t.text.toUpperCase();
      });
      this.tagAs('#UpperCase', 'toUpperCase');
      return this;
    },
    toCamelCase: function() {
      this.toTitleCase();
      this.terms.forEach((t, i) => {
        if (i !== 0) {
          t.whitespace.before = '';
        }
        t.whitespace.after = '';
      });
      this.tagAs('#CamelCase', 'toCamelCase');
      return this;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = caseMethods;

},{}],241:[function(require,module,exports){
'use strict';
const mutate = require('../mutate');

const deleteMethods = (Terms) => {

  const methods = {

    delete: function (reg) {
      //don't touch parent if empty
      if (!this.found) {
        return this;
      }
      //remove all selected
      if (!reg) {
        this.parentTerms = mutate.deleteThese(this.parentTerms, this);
        return this;
      }
      //only remove a portion of this
      let found = this.match(reg);
      if (found.found) {
        let r = mutate.deleteThese(this, found);
        return r;
      }
      return this;
    },


    //like match, but remove them from original
    // pluck: function (reg) {
    //   let found = this.match(reg);
    //   //remove them from `this`
    //   let index = 0;
    //   let lookFor = found.terms[index];
    //   this.terms = this.terms.filter((t) => {
    //     if (t === lookFor) {
    //       index += 1;
    //       lookFor = found.terms[index];
    //       return false;
    //     }
    //     return true;
    //   });
    //   return found;
    // }

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = deleteMethods;

},{"../mutate":249}],242:[function(require,module,exports){
'use strict';
const Terms = require('../index');
const mutate = require('../mutate');

//whitespace
const addSpaceAt = (ts, i) => {
  if (!ts.terms.length || !ts.terms[i]) {
    return ts;
  }
  ts.terms[i].whitespace.before = ' ';
  return ts;
};

const insertMethods = (Terms) => {

  const methods = {
    insertBefore: function (str) {
      let ts = Terms.fromString(str);
      let index = this.index();
      //pad a space on parent
      addSpaceAt(this.parentTerms, index);
      if (index > 0) {
        addSpaceAt(ts, 0); //if in middle of sentence
      }
      this.parentTerms = mutate.insertAt(this.parentTerms, index, ts);
      return this.parentTerms;
    },
    insertAfter: function (str) {
      let ts = Terms.fromString(str);
      let index = this.terms[this.terms.length - 1].index();
      //beginning whitespace to ts
      addSpaceAt(ts, 0);
      this.parentTerms = mutate.insertAt(this.parentTerms, index + 1, ts);
      return this.parentTerms;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = insertMethods;

},{"../index":234,"../mutate":249}],243:[function(require,module,exports){
'use strict';

const miscMethods = (Terms) => {

  const methods = {
    term: function (n) {
      return this.terms[n];
    },
    first: function () {
      let t = this.terms[0];
      return new Terms([t]);
    },
    last: function () {
      let t = this.terms[this.terms.length - 1];
      return new Terms([t]);
    },
    endPunctuation: function () {
      return this.last().terms[0].endPunctuation();
    },
    canBe: function (tag) {
      tag = tag || '';
      tag = tag.replace(/^#/, '');
      //atleast one of these
      for (let i = 0; i < this.terms.length; i++) {
        if (!this.terms[i].term.canBe(tag)) {
          return false;
        }
      }
      return true;
    },
    index: function() {
      let parent = this.parentTerms;
      let first = this.terms[0];
      if (!parent || !first) {
        return null; //maybe..
      }
      for(let i = 0; i < parent.terms.length; i++) {
        if (first === parent.terms[i]) {
          return i;
        }
      }
      return null;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = miscMethods;

},{}],244:[function(require,module,exports){
'use strict';

const renderMethods = (Terms) => {

  const methods = {

    plaintext: function () {
      return this.terms.reduce((str, t) => {
        str += t.whitespace.before + t.text + t.whitespace.after;
        return str;
      }, '');
    },

    normal: function () {
      return this.terms.filter((t) => t.text).map((t) => t.normal).join(' ');
    },

    root: function () {
      return this.terms.filter((t) => t.text).map((t) => t.normal).join(' ').toLowerCase();
    },

    check: function () {
      this.terms.forEach((t) => {
        t.render.check();
      });
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = renderMethods;

},{}],245:[function(require,module,exports){
'use strict';
const mutate = require('../mutate');

const replaceMethods = (Terms) => {
  const methods = {

    /**swap this for that */
    replace: function (str1, str2) {
      //in this form, we 'replaceWith'
      if (str2 === undefined) {
        return this.replaceWith(str1);
      }
      this.match(str1).replaceWith(str2);
      return this;
    },


    /**swap this for that */
    replaceWith: function (str, tag) {
      let ts = Terms.fromString(str);
      if (tag) {
        ts.tagAs(tag, 'user-given');
      }
      let index = this.index();
      this.parentTerms = mutate.deleteThese(this.parentTerms, this);
      let parent = mutate.insertAt(this.parentTerms, index, ts);
      this.terms = ts.terms;
      this.parentTerms = parent;
      return ts;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = replaceMethods;

},{"../mutate":249}],246:[function(require,module,exports){
'use strict';

//break apart a termlist into (before, match after)
const breakUpHere = (terms, ts) => {
  let firstTerm = ts.terms[0]
  let len = ts.terms.length
  for (let i = 0; i < terms.length; i++) {
    if (terms[i] === firstTerm) {
      return {
        before: terms.slice(0, i),
        match: terms.slice(i, i + len),
        after: terms.slice(i + len, terms.length),
      }
    }
  }
  return {
    after: terms
  }
}

const splitMethods = (Terms) => {

  const methods = {

    /** at the end of the match, split the terms **/
    splitAfter: function (reg, verbose) {
      let ms = this.match(reg, verbose); //Array[ts]
      let termArr = this.terms
      let all = []
      ms.list.forEach((lookFor) => {
          let section = breakUpHere(termArr, lookFor)
          if (section.before && section.match) {
            all.push(section.before.concat(section.match))
          }
          termArr = section.after
        })
        //add the remaining
      if (termArr.length) {
        all.push(termArr)
      }
      //make them termlists
      all = all.map((ts) => new Terms(ts))
      return all;
    },

    /** return only before & after  the match**/
    splitOn: function (reg, verbose) {
      let ms = this.match(reg, verbose); //Array[ts]
      let termArr = this.terms
      let all = []
      ms.list.forEach((lookFor) => {
          let section = breakUpHere(termArr, lookFor)
          if (section.before) {
            all.push(section.before)
          }
          termArr = section.after
        })
        //add the remaining
      if (termArr.length) {
        all.push(termArr)
      }
      //make them termlists
      all = all.filter(a => a && a.length)
      all = all.map((ts) => new Terms(ts))
      return all;
    },

    /** at the start of the match, split the terms**/
    splitBefore: function (reg, verbose) {
      let ms = this.match(reg, verbose); //Array[ts]
      let termArr = this.terms
      let all = []
      ms.list.forEach((lookFor) => {
          let section = breakUpHere(termArr, lookFor)
          if (section.before) {
            all.push(section.before)
          }
          if (section.match) {
            all.push(section.match)
          }
          termArr = section.after
        })
        //add the remaining
      if (termArr.length) {
        all.push(termArr)
      }
      //cleanup-step: merge all (middle) matches with the next one
      for (let i = 0; i < all.length; i++) {
        for (let o = 0; o < ms.length; o++) {
          if (ms.list[o].terms[0] === all[i][0]) {
            if (all[i + 1]) {
              all[i] = all[i].concat(all[i + 1])
              all[i + 1] = []
            }
          }
        }
      }
      //make them termlists
      all = all.filter(a => a && a.length)
      all = all.map((ts) => new Terms(ts))
      return all;
    },

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = splitMethods;
exports = splitMethods;

},{}],247:[function(require,module,exports){
'use strict';

const tagMethods = (Terms) => {

  const methods = {
    tagAs: function (tag, reason) {
      this.terms.forEach((t) => {
        t.tagAs(tag, reason);
      });
      return this
    },
    unTag: function (tag, reason) {
      this.terms.forEach((t) => {
        t.unTag(tag, reason);
      });
      return this
    },
    canBe: function (tag) {
      this.terms = this.terms.filter((t) => {
        return t.term.canBe(tag)
      })
      return this
    }
  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = tagMethods;

},{}],248:[function(require,module,exports){
'use strict';
const Term = require('../../term');

const transforms = (Terms) => {

  const methods = {

    insertAt: function (text, i) {
      let term = new Term(text, this.context);
      this.terms.splice(i + 1, 0, term);
      return this;
    },
    clone: function () {
      let terms = this.terms.map((t) => {
        return t.clone();
      });
      return new Terms(terms, this.lexicon, this.parent);
    },
    hyphenate: function () {
      this.terms.forEach((t, i) => {
        if (i !== this.terms.length - 1) {
          t.whitespace.after = '-';
        }
        if (i !== 0) {
          t.whitespace.before = '';
        }
      });
      return this;
    },
    deHyphenate: function () {
      this.terms.forEach((t, i) => {
        if (t.whitespace.after === '-') {
          t.whitespace.after = ' ';
        }
      });
      return this;
    },

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = transforms;

},{"../../term":190}],249:[function(require,module,exports){
'use strict';
//
const getTerms = (needle) => {
  let arr = [];
  if (needle.isA === 'Terms') {
    arr = needle.terms;
  } else if (needle.isA === 'Text') {
    arr = needle.flatten().list[0].terms;
  } else if (needle.isA === 'Term') {
    arr = [needle];
  }
  return arr;
};

//remove them
exports.deleteThese = (source, needle) => {
  let arr = getTerms(needle);
  source.terms = source.terms.filter((t) => {
    for (let i = 0; i < arr.length; i++) {
      if (t === arr[i]) {
        return false;
      }
    }
    return true;
  });
  return source;
};

//add them
exports.insertAt = (parent, i, needle) => {
  needle.dirty = true;
  let arr = getTerms(needle);
  //handle whitespace
  if (i > 0 && arr[0]) {
    arr[0].whitespace.before = ' ';
  }
  //gnarly splice
  //-( basically  - terms.splice(i+1, 0, arr) )
  Array.prototype.splice.apply(parent.terms, [i, 0].concat(arr));
  return parent;
};

},{}],250:[function(require,module,exports){
module.exports = {
  data: require('../data/index'),
  lexicon: require('../data/lexicon'),
  fns: require('../fns'),
  log: require('../logger'),
  Term: require('../term')
};

},{"../data/index":72,"../data/lexicon":73,"../fns":102,"../logger":104,"../term":190}],251:[function(require,module,exports){
'use strict';
const fixContraction = require('./fix');

const irregulars = {
  'wanna': ['want', 'to'],
  'gonna': ['going', 'to'],
  'im': ['i', 'am'],
  'alot': ['a', 'lot'],

  'dont': ['do', 'not'],
  'dun': ['do', 'not'],

  'won\'t': ['will', 'not'],
  'wont': ['will', 'not'],

  'can\'t': ['can', 'not'],
  'cant': ['can', 'not'],
  'cannot': ['can', 'not'],

  'aint': ['is', 'not'], //or 'are'
  'ain\'t': ['is', 'not'],
  'shan\'t': ['should', 'not'],

  'where\'d': ['where', 'did'],
  'whered': ['where', 'did'],
  'when\'d': ['when', 'did'],
  'whend': ['when', 'did'],
  'how\'d': ['how', 'did'],
  'howd': ['how', 'did'],
  'what\'d': ['what', 'did'],
  'whatd': ['what', 'did'],
  'let\'s': ['let', 'us'],
// 'dunno': ['do', 'not', 'know'],
// 'brb': ['be', 'right', 'back']
};

//check irregulars
const checkIrregulars = (ts) => {
  let irreg = Object.keys(irregulars);
  for(let i = 0; i < irreg.length; i++) {
    for(let t = 0; t < ts.terms.length; t++) {
      if (ts.terms[t].normal === irreg[i]) {
        let fix = irregulars[irreg[i]];
        ts = fixContraction(ts, fix, t);
        break;
      }
    }
  }
  return ts;
};
module.exports = checkIrregulars;

},{"./fix":255}],252:[function(require,module,exports){
'use strict';
const fixContraction = require('./fix');


//these are always contractions
// const blacklist = {
//   'it\'s': true,
//   'that\'s': true
// };

// //rocket's red glare
// if (nextWord.tag['Adjective'] && terms.get(x + 2) && terms.get(x + 2).tag['Noun']) {
//   return true;
// }
// //next word is an adjective
// if (nextWord.tag['Adjective'] || nextWord.tag['Verb'] || nextWord.tag['Adverb']) {
//   return false;
// }



// "'s" may be a contraction or a possessive
// 'spencer's house' vs 'spencer's good'
const isPossessive = (ts, i) => {
  let t = ts.terms[i];
  let next_t = ts.terms[i + 1];
  //a pronoun can't be possessive - "he's house"
  if (t.tag.Pronoun) {
    return false;
  }
  //if end of sentence, it is possessive - "was spencer's"
  if (!next_t) {
    return true;
  }
  //a gerund suggests 'is walking'
  if (next_t.tag.VerbPhrase) {
    return false;
  }
  //spencer's house
  if (next_t.tag.Noun) {
    return true;
  }
  //rocket's red glare
  if (next_t.tag.Adjective && ts.terms[i + 2] && ts.terms[i + 2].tag.Noun) {
    return true;
  }
  //an adjective suggests 'is good'
  if (next_t.tag.Adjective || next_t.tag.Adverb || next_t.tag.Verb) {
    return false;
  }
  return false;
};


//handle ambigous contraction "'s"
const hardOne = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    //skip existing
    if (ts.terms[i].silent_term) {
      continue;
    }
    let parts = ts.terms[i].term.contraction();
    if (parts) {
      //have we found a hard one
      if (parts.end === 's') {
        //spencer's house
        if (isPossessive(ts, i)) {
          ts.terms[i].tagAs('#Possessive', 'hard-contraction');
          // console.log('==possessive==');
          continue;
        }
        //is vs was
        let arr = [parts.start, 'is'];
        ts = fixContraction(ts, arr, i);
        i += 1;
      }
    }
  }
  return ts;
};

module.exports = hardOne;

},{"./fix":255}],253:[function(require,module,exports){
'use strict';
const fixContraction = require('./fix');

//the formulaic contraction types:
const easy_ends = {
  'll': 'will',
  'd': 'would',
  've': 'have',
  're': 'are',
  'm': 'am',
  'n\'t': 'not'
//these ones are a bit tricksier:
// 't': 'not',
// 's': 'is' //or was
};

//unambiguous contractions, like "'ll"
const easyOnes = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    //skip existing
    if (ts.terms[i].silent_term) {
      continue;
    }
    let parts = ts.terms[i].term.contraction();
    if (parts) {
      //make sure its an easy one
      if (easy_ends[parts.end]) {
        let arr = [
          parts.start,
          easy_ends[parts.end]
        ];
        ts = fixContraction(ts, arr, i);
        i += 1;
      }
    }
  }
  return ts;
};
module.exports = easyOnes;

},{"./fix":255}],254:[function(require,module,exports){
'use strict';

const numberRange = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //skip existing
    if (t.silent_term) {
      continue;
    }
    if (t.tag.NumberRange) {
      let parts = t.text.split(/-/);
      ts.insertAt('-', i);
      ts.insertAt(parts[1], i + 1);
      t.text = parts[0];
      let t2 = ts.terms[i + 1];
      t2.silent_term = 'to';
      let t3 = ts.terms[i + 2];
      t2.whitespace.before = '';
      t2.whitespace.after = '';
      t3.whitespace.before = '';
      t3.whitespace.after = t.whitespace.after;
      t.whitespace.after = '';
      t.tag = {
        Value: true,
      };
      t2.tag = {
        Preposition: true,
      };
      t3.tag = {
        Value: true,
      };
    }
  }
  return ts;
};
module.exports = numberRange;

},{}],255:[function(require,module,exports){
'use strict';
//add a silent term
const fixContraction = (ts, arr, i) => {
  //add a new term
  ts.insertAt('', i);
  let t = ts.terms[i];
  let t2 = ts.terms[i + 1];
  //add the interpretation silently
  t.silent_term = arr[0];
  t2.silent_term = arr[1];
  t.tagAs('Contraction', 'tagger-contraction');
  t2.tagAs('Contraction', 'tagger-contraction');
  return ts;
};

module.exports = fixContraction;

},{}],256:[function(require,module,exports){
'use strict';
const irregulars = require('./01-irregulars');
const hardOne = require('./02-hardOne');
const easyOnes = require('./03-easyOnes');
const numberRange = require('./04-numberRange');

//find and pull-apart contractions
const interpret = function(ts) {
  //check irregulars
  ts = irregulars(ts);
  //guess-at ambiguous "'s" one
  ts = hardOne(ts);
  //check easy ones
  ts = easyOnes(ts);
  //5-7
  ts = numberRange(ts);
  return ts;
};

module.exports = interpret;

},{"./01-irregulars":251,"./02-hardOne":252,"./03-easyOnes":253,"./04-numberRange":254}],257:[function(require,module,exports){
'use strict';
//the steps and processes of pos-tagging
const contraction = {
  interpret: require('./contraction')
};
const lumper = {
  lexicon_lump: require('./lumper/lexicon_lump'),
  lump_two: require('./lumper/lump_two'),
  lump_three: require('./lumper/lump_three')
};
const step = {
  punctuation_step: require('./steps/01-punctuation_step'),
  lexicon_step: require('./steps/02-lexicon_step'),
  capital_step: require('./steps/03-capital_step'),
  web_step: require('./steps/04-web_step'),
  suffix_step: require('./steps/05-suffix_step'),
  neighbour_step: require('./steps/06-neighbour_step'),
  noun_fallback: require('./steps/07-noun_fallback'),
  date_step: require('./steps/08-date_step'),
  auxillary_step: require('./steps/09-auxillary_step'),
  negation_step: require('./steps/10-negation_step'),
  adverb_step: require('./steps/11-adverb_step'),
  phrasal_step: require('./steps/12-phrasal_step'),
  comma_step: require('./steps/13-comma_step'),
  possessive_step: require('./steps/14-possessive_step'),
  value_step: require('./steps/15-value_step'),
  acronym_step: require('./steps/16-acronym_step'),
  emoji_step: require('./steps/17-emoji_step'),
  person_step: require('./steps/18-person_step')
};
// const corrections = require('./corrections');
// const tagPhrase = require('./tagPhrase');


const tagger = function (ts) {
  ts = step.punctuation_step(ts);
  ts = step.emoji_step(ts);
  ts = lumper.lexicon_lump(ts);
  ts = step.lexicon_step(ts);
  ts = step.web_step(ts);
  ts = step.suffix_step(ts);
  ts = step.neighbour_step(ts);
  ts = step.capital_step(ts);
  ts = step.noun_fallback(ts);
  ts = contraction.interpret(ts);
  ts = step.date_step(ts);
  ts = step.auxillary_step(ts);
  ts = step.negation_step(ts);
  // ts = step.adverb_step(ts);
  ts = step.phrasal_step(ts);
  ts = step.comma_step(ts);
  ts = step.possessive_step(ts);
  ts = step.value_step(ts);
  ts = step.acronym_step(ts);
  ts = step.person_step(ts);
  //lump a couple times, for long ones
  for (let i = 0; i < 3; i++) {
    ts = lumper.lump_three(ts);
    ts = lumper.lump_two(ts);
  }
  // ts = corrections(ts)
  return ts;
};

module.exports = tagger;

},{"./contraction":256,"./lumper/lexicon_lump":261,"./lumper/lump_three":262,"./lumper/lump_two":263,"./steps/01-punctuation_step":265,"./steps/02-lexicon_step":266,"./steps/03-capital_step":267,"./steps/04-web_step":268,"./steps/05-suffix_step":269,"./steps/06-neighbour_step":270,"./steps/07-noun_fallback":271,"./steps/08-date_step":272,"./steps/09-auxillary_step":273,"./steps/10-negation_step":274,"./steps/11-adverb_step":275,"./steps/12-phrasal_step":276,"./steps/13-comma_step":277,"./steps/14-possessive_step":278,"./steps/15-value_step":279,"./steps/16-acronym_step":280,"./steps/17-emoji_step":281,"./steps/18-person_step":282}],258:[function(require,module,exports){
'use strict';
const paths = require('../paths');
const Term = paths.Term;
const log = paths.log;
const path = 'tagger/combine';
//merge two term objects.. carefully

const makeText = (a, b) => {
  let text = a.whitespace.before + a.text + a.whitespace.after;
  text += b.whitespace.before + b.text + b.whitespace.after;
  return text;
};

const combine = function(s, i) {
  let a = s.terms[i];
  let b = s.terms[i + 1];
  if (!b) {
    return;
  }
  log.tell('--combining: "' + a.normal + '"+"' + b.normal + '"', path);
  let text = makeText(a, b);
  s.terms[i] = new Term(text, a.context);
  s.terms[i].normal = a.normal + ' ' + b.normal;
  s.terms[i + 1] = null;
  s.terms = s.terms.filter((t) => t !== null);
  return;
};

module.exports = combine;

},{"../paths":264}],259:[function(require,module,exports){
//rules for combining three terms into one
module.exports = [
  // {
  //   //john f kennedy
  //   condition: (a, b, c) => (a.tag.Person && b.term.isAcronym() && c.tag.Noun),
  //   result: 'Person',
  //   reason: 'Name-Initial-Capital'
  // },
  {
    //John & Joe's
    condition: (a, b, c) => (a.tag.Noun && (b.text === '&' || b.normal === 'n') && c.tag.Noun),
    result: 'Person',
    reason: 'Noun-&-Noun'
  },
  // {
  //   //President of Mexico
  //   condition: (a, b, c) => (a.tag.TitleCase && b.normal === 'of' && c.tag.TitleCase),
  //   result: 'Noun',
  //   reason: 'Capital-of-Capital'
  // },
  {
    //three-word quote
    condition: (a, b, c) => (a.text.match(/^["']/) && !b.text.match(/["']/) && c.text.match(/["']$/)),
    result: 'Quotation',
    reason: 'Three-word-quote'
  },
  {
    //1 800 PhoneNumber
    condition: (a, b, c) => (a.tag.Value && b.tag.Value && c.tag.PhoneNumber && b.normal.length === 3 && a.normal.length < 3),
    result: 'PhoneNumber',
    reason: '1-800-PhoneNumber'
  },
// {
//   //two hundred sixty three
//   condition: (a, b, c) => (a.tag.Value && b.tag.Value && c.tag.Value),
//   result: 'Value',
//   reason: 'Value-Value-Value'
// },
// {
//   //two hundred and three
//   condition: (a, b, c) => (a.tag.Value && b.normal === 'and' && c.tag.Value),
//   result: 'Value',
//   reason: 'Value-and-Value'
// },
// {
//   //two point three
//   condition: (a, b, c) => (a.tag.Value && b.normal === 'point' && c.tag.Value),
//   result: 'Value',
//   reason: 'Value-point-Value'
// }
];

},{}],260:[function(require,module,exports){
'use strict';
const timezones = {
  standard: true,
  daylight: true,
  summer: true,
  eastern: true,
  pacific: true,
  central: true,
  mountain: true,
};

//rules that combine two words
module.exports = [
  // {
  //   condition: (a, b) => ((a.tag.Person && b.tag.Honorific) || (a.tag.Honorific && b.tag.Person)), //"John sr."
  //   result: 'Person',
  //   reason: 'person-words'
  // },
  // {
  //   condition: (a, b) => (a.tag.Person && b.tag.Person && !a.tag.Comma), //john stewart
  //   result: 'Person',
  //   reason: 'firstname-firstname'
  // },
  // {
  //   //'Dr. John'
  //   condition: (a, b) => (a.tag.Honorific && b.tag.TitleCase),
  //   result: 'Person',
  //   reason: 'person-honorific'
  // },
  // {
  //   // "john lkjsdf's"
  //   condition: (a, b) => (a.tag.Person && b.tag.tagsessive),
  //   result: 'Person',
  //   reason: 'person-possessive'
  // },
  // {
  //   //"John Abcd" - needs to be careful
  //   condition: (a, b) => (a.tag.Person && !a.tag.Pronoun && !a.tag.tagsessive && !a.term.hasComma() && b.tag.TitleCase && !a.term.isAcronym() && !b.tag.Verb), //'Person, Capital -> Person'
  //   result: 'Person',
  //   reason: 'person-titleCase'
  // },
  {
    //6 am
    condition: (a, b) => (a.tag.Holiday && (b.normal === 'day' || b.normal === 'eve')),
    result: 'Holiday',
    reason: 'holiday-day'
  }, {
    //Aircraft designer
    condition: (a, b) => (a.tag.Noun && b.tag.Actor),
    result: 'Actor',
    reason: 'thing-doer'
  }, {
    //Canada Inc
    condition: (a, b) => (a.tag.TitleCase && a.tag.Noun && b.tag['Organization'] || b.tag.TitleCase && a.tag['Organization']),
    result: 'Organization',
    reason: 'organization-org'
  }, {
    //two-word quote
    condition: (a, b) => (a.text.match(/^["']/) && b.text.match(/["']$/)),
    result: 'Quotation',
    reason: 'two-word-quote'
  }, {
    //timezones
    condition: (a, b) => (timezones[a.normal] && (b.normal === 'standard time' || b.normal === 'time')),
    result: 'Time',
    reason: 'timezone'
  }, {
    //canadian dollar, Brazilian pesos
    condition: (a, b) => (a.tag.Demonym && b.tag.Currency),
    result: 'Currency',
    reason: 'demonym-currency'
  }, {
    //(454) 232-9873
    condition: (a, b, c) => (a.tag.NumericValue && b.tag.PhoneNumber && a.normal.length <= 3),
    result: 'PhoneNumber',
    reason: '(800) PhoneNumber'
  },
  // {
  //   //NASA Flordia
  //   condition: (a, b) => ((a.tag.Noun && b.tag.Abbreviation) || (a.tag.Abbreviation && b.tag.Noun)),
  //   result: 'Noun',
  //   reason: 'noun-abbreviation'
  // },

  // {
  //   //7 ft
  //   condition: (a, b) => ((a.tag.Value && b.tag.Abbreviation) || (a.tag.Abbreviation && b.tag.Value)),
  //   result: 'Value',
  //   reason: 'value-abbreviation'
  // },
  // {
  //   //a hundred
  //   condition: (a, b) => ((a.normal === 'a' || a.normal === 'an') && b.tag.Value),
  //   result: 'Value',
  //   reason: 'determiner-value'
  // }, {
  //   //minus two
  //   condition: (a, b) => ((a.normal === 'minus' || a.normal === 'negative') && b.tag.Value),
  //   result: 'Value',
  //   reason: 'minus-value'
  // }, {
  //   //six grand
  //   condition: (a, b) => (a.tag.Value && b.normal === 'grand'),
  //   result: 'Value',
  //   reason: 'value-grand'
  // },
  // {
  //   //fourth quarter
  //   condition: (a, b) => (a.tag.Ordinal && (b.normal === 'half' || b.normal === 'quarter')),
  //   result: 'Value',
  //   reason: 'half-value'
  // }, {
  //   //half a million
  //   condition: (a, b) => ((a.normal === 'half' || a.normal === 'quarter') && b.tag.Value),
  //   result: 'Value',
  //   reason: 'half-value'
  // },
  // {
  //   //both values, not ordinals, not '5 20'
  //   condition: (a, b) => (a.tag.Value && b.tag.Value && !a.tag.Ordinal && !b.tag.NumericValue),
  //   result: 'Value',
  //   reason: 'two-values'
  // },
  // {
  //   //both places
  //   condition: (a, b) => (a.tag.Place && b.tag.Place),
  //   result: 'Place',
  //   reason: 'two-places'
  // },
  // {
  //   //
  //   condition: (a, b) => (a.normal === 'air' && b.tag.Country),
  //   result: 'Company',
  //   reason: 'air-country'
  // }

];

},{}],261:[function(require,module,exports){
'use strict';
//check for "united" + "kingdom" in lexicon, and combine + tag it
const combine = require('./combine');
const p = require('../paths');
const log = p.log;
const lexicon = p.lexicon;
const fns = p.fns;
const path = 'tagger/multiple';

const combineMany = (s, i, count) => {
  for (let n = 0; n < count; n++) {
    combine(s, i);
  }
};

//try to concatenate multiple-words to get this term
const tryStringFrom = (want, start, s) => {
  let text = '';
  let normal = '';
  for (let i = start; i < s.terms.length; i++) {
    if (i === start) {
      text = s.terms[i].text;
      normal = s.terms[i].normal;
    } else {
      text += ' ' + s.terms[i].text;
      normal += ' ' + s.terms[i].normal;
    }
    //we've gone too far
    if (normal.length > want.length) {
      return false;
    }
    if (text === want || normal === want) {
      let count = i - start;
      combineMany(s, start, count);
      return true;
    }
  }
  return false;
};

const lexicon_lump = function (s) {
  log.here(path);
  let uLexicon = s.lexicon || {};

  //try the simpler, known lexicon
  for (let i = 0; i < s.terms.length - 1; i++) {
    //try 'A'+'B'
    let normal = s.terms[i].normal + ' ' + s.terms[i + 1].normal;
    let text = s.terms[i].text + ' ' + s.terms[i + 1].text;
    let pos = lexicon[normal] || lexicon[text];
    if (pos) {
      combine(s, i);
      s.terms[i].tagAs(pos, 'multiples-lexicon');
    }
  }

  //try the user's lexicon
  Object.keys(uLexicon).forEach((str) => {
    for (let i = 0; i < s.terms.length; i++) {
      if (fns.startsWith(str, s.terms[i].normal) || fns.startsWith(str, s.terms[i].text)) {
        if (tryStringFrom(str, i, s)) {
          s.terms[i].tagAs(uLexicon[str], 'user-lexicon-lump');
        }
      }
    }
  });
  return s;
};

module.exports = lexicon_lump;

},{"../paths":264,"./combine":258}],262:[function(require,module,exports){
'use strict';
const log = require('../paths').log;
const path = 'lumper/lump_three';
const combine = require('./combine');
const do_three = require('./data/do_three');
// const dont_three = require('./data/dont_three');

const lump_three = function(s) {
  log.here(path);
  for (let o = 0; o < do_three.length; o++) {
    for (let i = 0; i < s.terms.length - 2; i++) {
      let a = s.terms[i];
      let b = s.terms[i + 1];
      let c = s.terms[i + 2];
      if (do_three[o].condition(a, b, c)) {
        //merge terms A+B
        combine(s, i);
        //merge A+C
        combine(s, i);
        //tag it as POS
        s.terms[i].tagAs(do_three[o].result, 'lump-three (' + do_three[o].reason + ')');
      }
    }
  }
  return s;
};

module.exports = lump_three;

},{"../paths":264,"./combine":258,"./data/do_three":259}],263:[function(require,module,exports){
'use strict';
const log = require('../paths').log;
const path = 'lumper/lump_two';
const do_two = require('./data/do_two');
const combine = require('./combine');
// const dont_two = require('./data/dont_two');

const lump_two = function (s) {
  log.here(path);
  for (let o = 0; o < do_two.length; o++) {
    for (let i = 0; i < s.terms.length - 1; i++) {
      let a = s.terms[i];
      let b = s.terms[i + 1];
      if (do_two[o].condition(a, b)) {
        //merge terms
        combine(s, i);
        //tag it as POS
        s.terms[i].tagAs(do_two[o].result, 'lump-two (' + do_two[o].reason + ')');
      }
    }
  }
  return s;
};

module.exports = lump_two;

},{"../paths":264,"./combine":258,"./data/do_two":260}],264:[function(require,module,exports){
arguments[4][169][0].apply(exports,arguments)
},{"../paths":250,"dup":169}],265:[function(require,module,exports){
'use strict';
const log = require('../paths').log;
const rules = require('./data/punct_rules');
const path = 'tagger/punctuation';

const oneLetters = {
  a: true,
  i: true,
  //e-speak
  u: true,
  r: true,
  c: true,
  k: true
}

const punctuation_step = function (ts) {
  log.here(path);
  ts.terms.forEach((t) => {
    //don't over-write any known tags
    if (Object.keys(t.tag).length > 0) {
      return;
    }
    //ok, normalise it a little,
    let str = t.text
    str = str.replace(/[,\.\?]$/, '')
      //do punctuation rules (on t.text)
    for (let i = 0; i < rules.length; i++) {
      let r = rules[i];
      if (str.match(r.reg)) {
        t.tagAs(r.tag, 'punctuation-rule- "' + r.str + '"');
        return;
      }
    }
    //terms like 'e'
    if (str.length === 1 && !oneLetters[str]) {
      t.tagAs('Acronym', 'one-letter-acronym')
    }

  });
  return ts;
};

module.exports = punctuation_step;

},{"../paths":264,"./data/punct_rules":287}],266:[function(require,module,exports){
'use strict';
const p = require('../paths');
const lexicon = p.lexicon;
const log = p.log;
const path = 'tagger/lexicon';

const check_lexicon = (str, sentence) => {
  //check a user's custom lexicon
  let custom = sentence.lexicon || {};
  if (custom[str]) {
    return custom[str];
  }
  if (lexicon[str]) {
    return lexicon[str];
  }
  return null;
};

const lexicon_pass = function (ts) {
  log.here(path);
  let found;
  //loop through each term
  for (let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //basic term lookup
    found = check_lexicon(t.normal, ts);
    if (found) {
      t.tagAs(found, 'lexicon-match');
      continue;
    }
    found = check_lexicon(t.text, ts);
    if (found) {
      t.tagAs(found, 'lexicon-match-text');
      continue;
    }
    //support contractions (manually)
    let parts = t.term.contraction();
    if (parts && parts.start) {
      found = check_lexicon(parts.start.toLowerCase(), ts);
      if (found) {
        t.tagAs(found, 'contraction-lexicon');
        continue;
      }
    }
    //support silent_term matches
    found = check_lexicon(t.silent_term, ts);
    if (t.silent_term && found) {
      t.tagAs(found, 'silent_term-lexicon');
      continue;
    }
    //multiple-words / hyphenation
    let words = t.normal.split(/[ -]/);
    if (words.length > 1) {
      found = check_lexicon(words[words.length - 1], ts);
      if (found) {
        t.tagAs(found, 'multiword-lexicon');
        continue;
      }
    }
  }
  return ts;
};

module.exports = lexicon_pass;

},{"../paths":264}],267:[function(require,module,exports){
'use strict';
//titlecase is a signal for a noun
const log = require('../paths').log;
const path = 'tagger/capital';

const capital_logic = function (s) {
  log.here(path);
  //(ignore first word)
  for (let i = 1; i < s.terms.length; i++) {
    let t = s.terms[i];
    //has a capital, but isn't too weird.
    if (t.tag.TitleCase && t.term.isWord()) {
      t.tagAs('Noun', 'capital-step');
      t.tagAs('TitleCase', 'capital-step');
    }
  }
  //support first-word of sentence as proper titlecase
  let t = s.terms[0];
  if (t && t.tag.TitleCase) {
    if (t.tag.Person || t.tag.Organization || t.tag.Place) {
      t.tagAs('TitleCase', 'first-term-capital');
    }
  }
  return s;
};

module.exports = capital_logic;

},{"../paths":264}],268:[function(require,module,exports){
'use strict';
//identify urls, hashtags, @mentions, emails
const log = require('../paths').log;
const path = 'tagger/web_step';
// 'Email': Noun,
// 'Url': Noun,
// 'AtMention': Noun,
// 'HashTag': Noun,

const is_email = function(str) {
  if (str.match(/^\w+@\w+\.[a-z]{2,3}$/)) { //not fancy
    return true;
  }
  return false;
};

const is_hashtag = function(str) {
  if (str.match(/^#[a-z0-9_]{2,}$/)) {
    return true;
  }
  return false;
};

const is_atmention = function(str) {
  if (str.match(/^@\w{2,}$/)) {
    return true;
  }
  return false;
};

const is_url = function(str) {
  //with http/www
  if (str.match(/^(https?:\/\/|www\.)\w+\.[a-z]{2,3}/)) { //not fancy
    return true;
  }
  // 'boo.com'
  //http://mostpopularwebsites.net/top-level-domain
  if (str.match(/^[\w\.\/]+\.(com|net|gov|org|ly|edu|info|biz|ru|jp|de|in|uk|br)/)) {
    return true;
  }
  return false;
};

const web_pass = function(terms) {
  log.here(path);
  for (let i = 0; i < terms.length; i++) {
    let t = terms.get(i);
    let str = t.text.trim().toLowerCase();
    if (is_email(str)) {
      t.tagAs('Email', 'web_pass');
    }
    if (is_hashtag(str)) {
      t.tagAs('HashTag', 'web_pass');
    }
    if (is_atmention(str)) {
      t.tagAs('AtMention', 'web_pass');
    }
    if (is_url(str)) {
      t.tagAs('Url', 'web_pass');
    }
  }
  return terms;
};

module.exports = web_pass;

},{"../paths":264}],269:[function(require,module,exports){
'use strict';
const log = require('../paths').log;
const rules = require('./data/word_rules');
const path = 'tagger/suffix';

const suffix_step = function(s) {
  log.here(path);
  s.terms.forEach((t) => {
    //don't over-write any known tags
    if (Object.keys(t.tag).length > 0) {
      return;
    }
    //do normalized rules (on t.normal)
    for (let o = 0; o < rules.length; o++) {
      let r = rules[o];
      if (t.normal.match(r.reg)) {
        t.tagAs(r.tag, 'word-rule- "' + r.str + '"');
        return;
      }
    }
  });
  return s;
};

module.exports = suffix_step;

},{"../paths":264,"./data/word_rules":288}],270:[function(require,module,exports){
'use strict';
const markov = require('./data/neighbours');
const afterThisWord = markov.afterThisWord;
const beforeThisWord = markov.beforeThisWord;
const beforeThisPos = markov.beforeThisPos;
const afterThisPos = markov.afterThisPos;
const log = require('../paths').log;
const path = 'tagger/neighbours';

//basically a last-ditch effort before everything falls back to a noun
//for unknown terms, look left + right first, and hit-up the markov-chain for clues
const neighbour_step = function (ts) {
  log.here(path);
  ts.terms.forEach((t, n) => {
    //is it still unknown?
    let termTags = Object.keys(t.tag);
    if (termTags.length === 0) {
      let lastTerm = ts.terms[n - 1];
      let nextTerm = ts.terms[n + 1];
      //look at last word for clues
      if (lastTerm && afterThisWord[lastTerm.normal]) {
        t.tagAs(afterThisWord[lastTerm.normal], 'neighbour-after-"' + lastTerm.normal + '"');
        return;
      }
      //look at next word for clues
      if (nextTerm && beforeThisWord[nextTerm.normal]) {
        t.tagAs(beforeThisWord[nextTerm.normal], 'neighbour-before-"' + nextTerm.normal + '"');
        return;
      }
      //look at the last POS for clues
      let tags = [];
      if (lastTerm) {
        tags = Object.keys(lastTerm.tag);
        for (let i = 0; i < tags.length; i++) {
          if (afterThisPos[tags[i]]) {
            t.tagAs(afterThisPos[tags[i]], 'neighbour-after-[' + tags[i] + ']');
            return;
          }
        }
      }
      //look at the next POS for clues
      if (nextTerm) {
        tags = Object.keys(nextTerm.tag);
        for (let i = 0; i < tags.length; i++) {
          if (beforeThisPos[tags[i]]) {
            t.tagAs(beforeThisPos[tags[i]], 'neighbour-before-[' + tags[i] + ']');
            return;
          }
        }
      }
    }
  });

  return ts;
};

module.exports = neighbour_step;

},{"../paths":264,"./data/neighbours":285}],271:[function(require,module,exports){
'use strict';
const log = require('../paths').log;
const path = 'tagger/noun_fallback';
//tag word as noun if we know nothing about it, still.

const noun_fallback = function(s) {
  log.here(path);
  for (let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
    //fail-fast
    if (t.tag.Noun || t.tag.Verb) {
      continue;
    }
    //ensure it only has the tag 'Term'
    let tags = Object.keys(t.tag);
    if (tags.length === 0) {
      //ensure it's atleast word-looking
      if (t.term.isWord() === false) {
        continue;
      }
      t.tagAs('Noun', 'noun-fallback');
      //check if it's plural, too
      if (t.tag.Plural) {
        t.tagAs('Plural', 'fallback-plural');
      }
    }
  }
  return s;
};

module.exports = noun_fallback;

},{"../paths":264}],272:[function(require,module,exports){
'use strict';
const log = require('../paths').log;
const path = 'tagger/datePass';

const preDate = {
  on: true,
  in: true,
  before: true,
  by: true,
  after: true,
  during: true,
};

//ensure a year is approximately typical for common years
const isYear = (t) => {
  if (t.tag.Ordinal) {
    return false;
  }
  let num = t.value.cardinal;
  if (!num || num < 1000 || num > 3000) {
    return false;
  }
  return true;
};

//rules for two-term dates
const twoDates = [{
  condition: (a, b) => (preDate[a.normal] && b.tag.Date),
  reason: 'predate-date'
}, ];

//rules for three-term dates
const threeDates = [{
  condition: (a, b, c) => (a.tag.Month && b.tag.Value && c.tag.Cardinal && isYear(c)),
  reason: 'month-value-year'
}, {
  condition: (a, b, c) => (a.tag.Date && b.normal === 'and' && c.tag.Date),
  reason: 'date-and-date'
}, ];

//non-destructively tag values & prepositions as dates
const datePass = function (s) {
  log.here(path);
  //set verbs as auxillaries
  for (let i = 0; i < s.terms.length - 1; i++) {
    let a = s.terms[i];
    let b = s.terms[i + 1];
    let c = s.terms[i + 2];
    if (c) {
      for (let o = 0; o < threeDates.length; o++) {
        if (threeDates[o].condition(a, b, c)) {
          a.tagAs('Date', threeDates[o].reason);
          b.tagAs('Date', threeDates[o].reason);
          c.tagAs('Date', threeDates[o].reason);
        }
      }
    }
    for (let o = 0; o < twoDates.length; o++) {
      if (twoDates[o].condition(a, b)) {
        a.tagAs('Date', twoDates[o].reason);
        b.tagAs('Date', twoDates[o].reason);
      }
    }
    //in 2018
    if (a.tag.Date || (preDate[a.normal]) && b.tag.Value) {
      let year = parseInt(b.normal, 10);
      if (year && year > 1200 && year < 2090) {
        a.tagAs('Date', 'in-year');
        b.tagAs('Date', 'in-year');
      }
    }
  }
  return s;
};

module.exports = datePass;

},{"../paths":264}],273:[function(require,module,exports){
'use strict';
const log = require('../paths').log;
const path = 'tagger/auxillary';
//

const auxillary = {
  'do': true,
  'don\'t': true,
  'does': true,
  'doesn\'t': true,
  'will': true,
  'wont': true,
  'won\'t': true,
  'have': true,
  'haven\'t': true,
  'had': true,
  'hadn\'t': true,
  'not': true,
};

const corrections = function(ts) {
  log.here(path);
  //set verbs as auxillaries
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (auxillary[t.normal] || auxillary[t.silent_term]) {
      let next = ts.terms[i + 1];
      //if next word is a verb
      if (next && (next.tag.Verb || next.tag.Adverb || next.tag.Negative)) {
        t.tagAs('Auxillary', 'corrections-auxillary');
        continue;
      }
    }
  }
  return ts;
};

module.exports = corrections;

},{"../paths":264}],274:[function(require,module,exports){
'use strict';
const log = require('../paths').log;
const path = 'tagger/negation';

// 'not' is sometimes a verb, sometimes an adjective
const negation_step = function(ts) {
  log.here(path);
  for(let i = 0; i < ts.length; i++) {
    let t = ts.get(i);
    if (t.normal === 'not' || t.silent_term === 'not') {
      //find the next verb/adjective
      for(let o = i + 1; o < ts.length; o++) {
        if (ts.get(o).tag.Verb) {
          t.tagAs('VerbPhrase', 'negate-verb');
          break;
        }
        if (ts.get(o).tag.Adjective) {
          t.tagAs('AdjectivePhrase', 'negate-adj');
          break;
        }
      }
    }
  }
  return ts;
};

module.exports = negation_step;

},{"../paths":264}],275:[function(require,module,exports){
'use strict';
const log = require('../paths').log;
const path = 'tagger/adverb';

//adverbs can be for verbs or nouns
const adverb_step = function(ts) {
  log.here(path);
  for(let i = 0; i < ts.length; i++) {
    let t = ts.get(i);
    if (t.tag.Adverb) {
      //find the next verb/adjective
      for(let o = 0; o < 7; o++) {
        //look forward first
        let after = ts.get(i + o);
        if (after) {
          if (after.tag.Verb) {
            t.tagAs('VerbPhrase', 'adverb-verb');
            break;
          }
          if (after.tag.Adjective) {
            t.tagAs('AdjectivePhrase', 'adverb-adj');
            break;
          }
        }
        //look before the adverb now
        let before = ts.get(i - o);
        if (before) {
          if (before.tag.Verb) {
            t.tagAs('VerbPhrase', 'verb-adverb');
            break;
          }
          if (before.tag.Adjective) {
            t.tagAs('AdjectivePhrase', 'adj-adverb');
            break;
          }
        }
      }

    }
  }
  return ts;
};

module.exports = adverb_step;

},{"../paths":264}],276:[function(require,module,exports){
'use strict';
const log = require('../paths').log;
const phrasals = require('./data/phrasal_verbs');
const path = 'tagger/phrasal';

//words that could be particles
const particles = {
  'away': true,
  'back': true,
  'in': true,
  'out': true,
  'on': true,
  'off': true,
  'over': true,
  'under': true,
  'together': true,
  'apart': true,
  'up': true,
  'down': true
};

//phrasal verbs are compound verbs like 'beef up'
const phrasals_step = function(ts) {
  log.here(path);
  for(let i = 1; i < ts.length; i++) {
    let t = ts.get(i);
    //is it a particle, like 'up'
    if (particles[t.normal]) {
      //look backwards
      let last = ts.get(i - 1);
      if (last.tag.Verb) {
        let inf = last.verb.infinitive();
        if (phrasals[inf + ' ' + t.normal]) {
          t.tagAs('Particle', 'phrasalVerb-particle');
        }
      }
    }

  }
  return ts;
};

module.exports = phrasals_step;

},{"../paths":264,"./data/phrasal_verbs":286}],277:[function(require,module,exports){
'use strict';
//-types of comma-use-
// PlaceComma - Hollywood, California
// List       - cool, fun, and great.
// ClauseEnd  - if so, we do.

//like Toronto, Canada
const isPlaceComma = (ts, i) => {
  let t = ts.terms[i];
  let nextTerm = ts.terms[i + 1];
  //'australia, canada' is a list
  if (nextTerm && t.tag.Place && !t.tag.Country && nextTerm.tag.Country) {
    return true;
  }
  return false;
};

//adj, noun, or verb
const mainTag = (t) => {
  if (t.tag.Adjective) {
    return 'Adjective';
  }
  if (t.tag.Noun) {
    return 'Noun';
  }
  if (t.tag.Verb) {
    return 'Verb';
  }
  return null;
};

const tagAsList = (ts, start, end) => {
  for(let i = start; i <= end; i++) {
    ts.terms[i].tag.List = true;
  }
};

//take the first term with a comma, and test to the right.
//the words with a comma must be the same pos.
const isList = (ts, i) => {
  let start = i;
  let tag = mainTag(ts.terms[i]);
  //ensure there's a following comma, and its the same pos
  //then a Conjunction
  let sinceComma = 0;
  let count = 0;
  let hasConjunction = false;
  for(i = i + 1; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //are we approaching the end
    if (count > 0 && t.tag.Conjunction) {
      hasConjunction = true;
      continue;
    }
    //found one,
    if (t.tag[tag]) {
      //looks good. keep it going
      if (t.tag.Comma) {
        count += 1;
        sinceComma = 0;
        continue;
      }
      if (count > 0 && hasConjunction) { //is this the end of the list?
        tagAsList(ts, start, i);
        return true;
      }
    }
    sinceComma += 1;
    //have we gone too far without a comma?
    if (sinceComma > 5) {
      return false;
    }
  }
  return false;
};

const commaStep = function(ts) {
  //tag the correct punctuation forms
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    let punct = t.endPunctuation();
    if (punct === ',') {
      t.tag.Comma = true;
      continue;
    }
    if (punct === ';') {
      t.tag.ClauseEnd = true;
      continue;
    }
    if (punct === ':') {
      t.tag.ClauseEnd = true;
      continue;
    }
  }

  //disambiguate the commas now
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (t.tag.Comma) {
      //if we already got it
      if (t.tag.List) {
        continue;
      }
      //like 'Hollywood, California'
      if (isPlaceComma(ts, i)) {
        continue;
      }
      //like 'cold, wet hands'
      if (isList(ts, i)) {
        continue;
      }
      //otherwise, it's a phrasal comma, like 'you must, if you think so'
      t.tag.ClauseEnd = true;
    }
  }
  return ts;
};

module.exports = commaStep;

},{}],278:[function(require,module,exports){
'use strict';
//decide if an apostrophe s is a contraction or not
// 'spencer's nice' -> 'spencer is nice'
// 'spencer's house' -> 'spencer's house'

//these are always contractions
const blacklist = {
  'it\'s': true,
  'that\'s': true
};

//a possessive means "'s" describes ownership, not a contraction, like 'is'
const is_possessive = function(terms, x) {
  let t = terms.get(x);
  //these are always contractions, not possessive
  if (blacklist[t.normal]) {
    return false;
  }
  //"spencers'" - this is always possessive - eg "flanders'"
  if (t.normal.match(/[a-z]s'$/)) {
    return true;
  }
  //if no apostrophe s, return
  if (!t.normal.match(/[a-z]'s$/)) {
    return false;
  }
  //some parts-of-speech can't be possessive
  if (t.tag['Pronoun']) {
    return false;
  }
  let nextWord = terms.get(x + 1);
  //last word is possessive  - "better than spencer's"
  if (!nextWord) {
    return true;
  }
  //next word is 'house'
  if (nextWord.tag['Noun']) {
    return true;
  }
  //rocket's red glare
  if (nextWord.tag['Adjective'] && terms.get(x + 2) && terms.get(x + 2).tag['Noun']) {
    return true;
  }
  //next word is an adjective
  if (nextWord.tag['Adjective'] || nextWord.tag['Verb'] || nextWord.tag['Adverb']) {
    return false;
  }
  return false;
};

//tag each term as possessive, if it should
const possessiveStep = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    if (is_possessive(terms, i)) {
      let t = terms.get(i);
      //if it's not already a noun, co-erce it to one
      if (!t.tag['Noun']) {
        t.tagAs('Noun', 'possessive_pass');
      }
      t.tagAs('Possessive', 'possessive_pass');
    }
  }
  return terms;
};
module.exports = possessiveStep;

},{}],279:[function(require,module,exports){
'use strict';
'use strict';
const log = require('../paths').log;
const path = 'tagger/value';

const value_step = function(ts) {
  log.here(path);
  ts.terms.forEach((t) => {
    if (t.tag.Value) {
      //ordinal/cardinal
      if (!t.tag.Ordinal && !t.tag.Cardinal) {
        if (t.normal.match(/^[0-9]([0-9]+,)*?(\.[0-9])$/)) {
          t.tagAs('Cardinal', 'ordinal-regex');
        } else {
          t.tagAs('Cardinal', 'cardinal-regex');
        }
      }
      //text/number
      if (!t.tag.TextValue && !t.tag.NumericValue) {
        if (t.normal.match(/^[a-z]/)) {
          t.tagAs('TextValue', 'TextValue-regex');
        } else {
          t.tagAs('NumericValue', 'NumericValue-regex');
        }
      }
    }
  });
  return ts;
};

module.exports = value_step;

},{"../paths":264}],280:[function(require,module,exports){
'use strict';
'use strict';
const log = require('../paths').log;
const path = 'tagger/acronym_step';

const isAcronym = (t) => {
  //like N.D.A
  if (t.text.match(/([A-Z]\.)+[A-Z]?$/)) {
    return true;
  }
  //like 'F.'
  if (t.text.match(/^[A-Z]\.$/)) {
    return true;
  }
  //like NDA
  if (t.text.match(/[A-Z]{3}$/)) {
    return true;
  }
  return false;
};

const acronym_step = function(ts) {
  log.here(path);
  ts.terms.forEach((t) => {
    if (isAcronym(t)) {
      t.tagAs('Acronym', 'acronym-step');
    }
  });
  return ts;
};

module.exports = acronym_step;

},{"../paths":264}],281:[function(require,module,exports){
'use strict';
const fns = require('../paths').fns;
const emojiReg = require('./data/emoji_regex');
const emoticon = require('./data/emoticon_list');
//test for forms like ':woman_tone2:‍:ear_of_rice:'
//https://github.com/Kikobeats/emojis-keywords/blob/master/index.js
const isCommaEmoji = (t) => {
  if (fns.startsWith(t.text, ':')) {
    //end comma can be last or second-last ':haircut_tone3:‍♀️'
    if (!t.text.match(/:.?$/)) {
      return false;
    }
    //ensure no spaces
    if (t.text.match(' ')) {
      return false;
    }
    //reasonably sized
    if (t.text.length > 35) {
      return false;
    }
    return true
  }
  return false;
};

//check against emoticon whitelist
const isEmoticon = (t) => {
  //normalize the 'eyes'
  let str = t.text.replace(/^[:;]/, ':')
  str = str.replace(/[:;]$/, ':')
  return emoticon[str]
}

//
const emojiStep = (ts) => {
  for (let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //test for :keyword: emojis
    if (isCommaEmoji(t)) {
      t.tagAs('Emoji', 'comma-emoji');
    }
    //test for unicode emojis
    if (t.text.match(emojiReg)) {
      t.tagAs('Emoji', 'unicode-emoji');
    }
    //test for emoticon ':)' emojis
    if (isEmoticon(t)) {
      t.tagAs('Emoji', 'emoticon-emoji');
    }
  }
  return ts;
};
module.exports = emojiStep;

},{"../paths":264,"./data/emoji_regex":283,"./data/emoticon_list":284}],282:[function(require,module,exports){
'use strict';
'use strict';
const log = require('../paths').log;
const path = 'tagger/person_step';

const person_step = function (ts) {
  log.here(path);
  let reason = 'person-step';
  // x Lastname
  ts.match('#Noun #LastName').firstTerm().canBe('#FirstName').tag('#FirstName', reason);

  // Firstname x (dangerous)
  let tmp = ts.match('#FirstName #Noun').ifNo('^#Possessive');
  tmp.lastTerm().canBe('#LastName').tag('#LastName', reason);

  //j.k Rowling
  ts.match('#Acronym #TitleCase').canBe('#Person').tag('#Person', reason);
  ts.match('#Noun van der? #Noun').canBe('#Person').tag('#Person', reason);
  ts.match('#FirstName de #Noun').canBe('#Person').tag('#Person', reason);
  ts.match('(king|queen|prince|saint|lady) of? #Noun').canBe('#Person').tag('#Person', reason);
  ts.match('#FirstName (bin|al) #Noun').canBe('#Person').tag('#Person', reason);

  //ambiguous firstnames
  let maybe = ['will', 'may', 'april', 'june', 'said', 'rob', 'wade', 'ray', 'rusty', 'drew', 'miles', 'jack', 'chuck', 'randy', 'jan', 'pat', 'cliff', 'bill'];
  maybe = '(' + maybe.join('|') + ')';
  ts.match(maybe + ' #LastName').firstTerm().tag('#FirstName', reason);

  //ambiguous lastnames
  maybe = ['green', 'white', 'brown', 'hall', 'young', 'king', 'hill', 'cook', 'gray', 'price'];
  maybe = '(' + maybe.join('|') + ')';
  ts.match('#FirstName ' + maybe).tag('#Person', reason);
  return ts;
};

module.exports = person_step;

},{"../paths":264}],283:[function(require,module,exports){
//yep,
//https://github.com/mathiasbynens/emoji-regex/blob/master/index.js
module.exports = /(?:0\u20E3\n1\u20E3|2\u20E3|3\u20E3|4\u20E3|5\u20E3|6\u20E3|7\u20E3|8\u20E3|9\u20E3|#\u20E3|\*\u20E3|\uD83C(?:\uDDE6\uD83C(?:\uDDE8|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDEE|\uDDF1|\uDDF2|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFC|\uDDFD|\uDDFF)|\uDDE7\uD83C(?:\uDDE6|\uDDE7|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDEF|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFB|\uDDFC|\uDDFE|\uDDFF)|\uDDE8\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF5|\uDDF7|\uDDFA|\uDDFB|\uDDFC|\uDDFD|\uDDFE|\uDDFF)|\uDDE9\uD83C(?:\uDDEA|\uDDEC|\uDDEF|\uDDF0|\uDDF2|\uDDF4|\uDDFF)|\uDDEA\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEC|\uDDED|\uDDF7|\uDDF8|\uDDF9|\uDDFA)|\uDDEB\uD83C(?:\uDDEE|\uDDEF|\uDDF0|\uDDF2|\uDDF4|\uDDF7)|\uDDEC\uD83C(?:\uDDE6|\uDDE7|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDF1|\uDDF2|\uDDF3|\uDDF5|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFC|\uDDFE)|\uDDED\uD83C(?:\uDDF0|\uDDF2|\uDDF3|\uDDF7|\uDDF9|\uDDFA)|\uDDEE\uD83C(?:\uDDE8|\uDDE9|\uDDEA|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9)|\uDDEF\uD83C(?:\uDDEA|\uDDF2|\uDDF4|\uDDF5)|\uDDF0\uD83C(?:\uDDEA|\uDDEC|\uDDED|\uDDEE|\uDDF2|\uDDF3|\uDDF5|\uDDF7|\uDDFC|\uDDFE|\uDDFF)|\uDDF1\uD83C(?:\uDDE6|\uDDE7|\uDDE8|\uDDEE|\uDDF0|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFB|\uDDFE)|\uDDF2\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF5|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFB|\uDDFC|\uDDFD|\uDDFE|\uDDFF)|\uDDF3\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEB|\uDDEC|\uDDEE|\uDDF1|\uDDF4|\uDDF5|\uDDF7|\uDDFA|\uDDFF)|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C(?:\uDDE6|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF7|\uDDF8|\uDDF9|\uDDFC|\uDDFE)|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C(?:\uDDEA|\uDDF4|\uDDF8|\uDDFA|\uDDFC)|\uDDF8\uD83C(?:\uDDE6|\uDDE7|\uDDE8|\uDDE9|\uDDEA|\uDDEC|\uDDED|\uDDEE|\uDDEF|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF7|\uDDF8|\uDDF9|\uDDFB|\uDDFD|\uDDFE|\uDDFF)|\uDDF9\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEB|\uDDEC|\uDDED|\uDDEF|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF7|\uDDF9|\uDDFB|\uDDFC|\uDDFF)|\uDDFA\uD83C(?:\uDDE6|\uDDEC|\uDDF2|\uDDF8|\uDDFE|\uDDFF)|\uDDFB\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEC|\uDDEE|\uDDF3|\uDDFA)|\uDDFC\uD83C(?:\uDDEB|\uDDF8)|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C(?:\uDDEA|\uDDF9)|\uDDFF\uD83C(?:\uDDE6|\uDDF2|\uDDFC)))|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD79\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED0\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3]|\uD83E[\uDD10-\uDD18\uDD80-\uDD84\uDDC0]/g;

},{}],284:[function(require,module,exports){
//just some of the most common emoticons
//faster than
//http://stackoverflow.com/questions/28077049/regex-matching-emoticons
module.exports = {
  ':(': true,
  ':)': true,
  ':P': true,
  ':p': true,
  ':O': true,
  ':3': true,
  ':|': true,
  ':/': true,
  ':\\': true,
  ':$': true,
  ':*': true,
  ':@': true,
  ':-(': true,
  ':-)': true,
  ':-P': true,
  ':-p': true,
  ':-O': true,
  ':-3': true,
  ':-|': true,
  ':-/': true,
  ':-\\': true,
  ':-$': true,
  ':-*': true,
  ':-@': true,
  ':^(': true,
  ':^)': true,
  ':^P': true,
  ':^p': true,
  ':^O': true,
  ':^3': true,
  ':^|': true,
  ':^/': true,
  ':^\\': true,
  ':^$': true,
  ':^*': true,
  ':^@': true,
  '):': true,
  '(:': true,
  '$:': true,
  '*:': true,
  ')-:': true,
  '(-:': true,
  '$-:': true,
  '*-:': true,
  ')^:': true,
  '(^:': true,
  '$^:': true,
  '*^:': true,
  '<3': true,
  '</3': true,
  '<\\3': true
};

},{}],285:[function(require,module,exports){
'use strict';
//markov-like stats about co-occurance, for hints about unknown terms
//basically, a little-bit better than the noun-fallback
//just top n-grams from nlp tags, generated from nlp-corpus

//after this word, here's what happens usually
let afterThisWord = {
  i: 'Verb', //44% //i walk..
  first: 'Noun', //50% //first principles..
  it: 'Verb', //33%
  there: 'Verb', //35%
  to: 'Verb', //32%
  not: 'Verb', //33%
  because: 'Noun', //31%
  if: 'Noun', //32%
  but: 'Noun', //26%
  who: 'Verb', //40%
  this: 'Noun', //37%
  his: 'Noun', //48%
  when: 'Noun', //33%
  you: 'Verb', //35%
  very: 'Adjective', // 39%
  old: 'Noun', //51%
  never: 'Verb', //42%
  before: 'Noun', //28%
};

//in advance of this word, this is what happens usually
let beforeThisWord = {
  there: 'Verb', //23% // be there
  me: 'Verb', //31% //see me
  man: 'Adjective', // 80% //quiet man
  only: 'Verb', //27% //sees only
  him: 'Verb', //32% //show him
  were: 'Noun', //48% //we were
  what: 'Verb', //25% //know what
  took: 'Noun', //38% //he took
  himself: 'Verb', //31% //see himself
  went: 'Noun', //43% //he went
  who: 'Noun', //47% //person who
  jr: 'Person'
};

//following this POS, this is likely
let afterThisPos = {
  Adjective: 'Noun', //36% //blue dress
  Possessive: 'Noun', //41% //his song
  Determiner: 'Noun', //47%
  Adverb: 'Verb', //20%
  // Person: 'Verb', //40%
  Pronoun: 'Verb', //40%
  Value: 'Noun', //47%
  Ordinal: 'Noun', //53%
  Modal: 'Verb', //35%
  Superlative: 'Noun', //43%
  Demonym: 'Noun', //38%
  Organization: 'Verb', //33%
  Honorific: 'Person', //
// FirstName: 'Person', //
};

//in advance of this POS, this is likely
let beforeThisPos = {
  Copula: 'Noun', //44% //spencer is
  PastTense: 'Noun', //33% //spencer walked
  Conjunction: 'Noun', //36%
  Modal: 'Noun', //38%
  PluperfectTense: 'Noun', //40%
  PerfectTense: 'Verb', //32%
// LastName: 'FirstName', //
};
module.exports = {
  beforeThisWord: beforeThisWord,
  afterThisWord: afterThisWord,

  beforeThisPos: beforeThisPos,
  afterThisPos: afterThisPos
};

},{}],286:[function(require,module,exports){
//phrasal verbs are two words that really mean one verb.
//'beef up' is one verb, and not some direction of beefing.
//by @spencermountain, 2015 mit
//many credits to http://www.allmyphrasalverbs.com/
'use strict';

//start the list with some randoms
let main = {
  'be onto': true,
  'fall behind': true,
  'fall through': true,
  'fool with': true,
  'get across': true,
  'get along': true,
  'get at': true,
  'give way': true,
  'hear from': true,
  'hear of': true,
  'lash into': true,
  'make do': true,
  'run across': true,
  'set upon': true,
  'take aback': true,
  'keep from': true,
};

//if there's a phrasal verb "keep on", there's often a "keep off"
const opposites = {
  'away': 'back',
  'in': 'out',
  'on': 'off',
  'over': 'under',
  'together': 'apart',
  'up': 'down'
};

//forms that have in/out symmetry
const symmetric = {
  'away': 'blow,bounce,bring,call,come,cut,drop,fire,get,give,go,keep,pass,put,run,send,shoot,switch,take,tie,throw',
  'in': 'bang,barge,bash,beat,block,book,box,break,bring,burn,butt,carve,cash,check,come,cross,drop,fall,fence,fill,give,grow,hand,hang,head,jack,keep,leave,let,lock,log,move,opt,pack,peel,pull,put,reach,ring,rub,send,set,settle,shut,sign,smash,snow,strike,take,try,turn,type,warm,wave,wean,wear,wheel',
  'on': 'add,call,carry,catch,count,feed,get,give,go,grind,head,hold,keep,lay,log,pass,pop,power,put,send,show,snap,switch,take,tell,try,turn,wait',
  'over': 'come,go,look,read,run,talk',
  'together': 'come,pull,put',
  'up': 'add,back,beat,bend,blow,boil,bottle,break,bring,buckle,bulk,bundle,call,carve,clean,cut,dress,fill,flag,fold,get,give,grind,grow,hang,hold,keep,let,load,lock,look,man,mark,melt,move,pack,pin,pipe,plump,pop,power,pull,put,rub,scale,scrape,send,set,settle,shake,show,sit,slow,smash,square,stand,strike,take,tear,tie,top,turn,use,wash,wind'
};
Object.keys(symmetric).forEach(function(k) {
  symmetric[k].split(',').forEach(function(s) {
    //add the given form
    main[s + ' ' + k] = true;
    //add its opposite form
    main[s + ' ' + opposites[k]] = true;
  });
});

//forms that don't have in/out symmetry
const asymmetric = {
  'about': 'bring,fool,gad,go,root,mess',
  'after': 'go,look,take',
  'ahead': 'get,go,press',
  'along': 'bring,move',
  'apart': 'fall,take',
  'around': 'ask,boss,bring,call,come,fool,get,horse,joke,lie,mess,play',
  'away': 'back,carry,file,frighten,hide,wash',
  'back': 'fall,fight,hit,hold,look,pay,stand,think',
  'by': 'come,drop,get,go,stop,swear,swing,tick,zip',
  'down': 'bog,calm,fall,hand,hunker,jot,knock,lie,narrow,note,pat,pour,run,tone,trickle,wear',
  'for': 'fend,file,gun,hanker,root,shoot',
  'forth': 'bring,come',
  'forward': 'come,look',
  'in': 'cave,chip,hone,jump,key,pencil,plug,rein,shade,sleep,stop,suck,tie,trade,tuck,usher,weigh,zero',
  'into': 'look,run',
  'it': 'go,have',
  'off': 'auction,be,beat,blast,block,brush,burn,buzz,cast,cool,drop,end,face,fall,fend,frighten,goof,jack,kick,knock,laugh,level,live,make,mouth,nod,pair,pay,peel,read,reel,ring,rip,round,sail,shave,shoot,sleep,slice,split,square,stave,stop,storm,strike,tear,tee,tick,tip,top,walk,work,write',
  'on': 'bank,bargain,frown,hit,latch,pile,prattle,press,spring,spur,tack,urge,yammer',
  'out': 'act,ask,back,bail,bear,black,blank,bleed,blow,blurt,branch,buy,cancel,cut,eat,edge,farm,figure,find,fill,find,fish,fizzle,flake,flame,flare,flesh,flip,geek,get,help,hide,hold,iron,knock,lash,level,listen,lose,luck,make,max,miss,nerd,pan,pass,pick,pig,point,print,psych,rat,read,rent,root,rule,run,scout,see,sell,shout,single,sit,smoke,sort,spell,splash,stamp,start,storm,straighten,suss,time,tire,top,trip,trot,wash,watch,weird,whip,wimp,wipe,work,zone,zonk',
  'over': 'bend,bubble,do,fall,get,gloss,hold,keel,mull,pore,sleep,spill,think,tide,tip',
  'round': 'get,go',
  'through': 'go,run',
  'to': 'keep,see',
  'up': 'act,beef,board,bone,boot,brighten,build,buy,catch,cheer,cook,end,eye,face,fatten,feel,fess,finish,fire,firm,flame,flare,free,freeze,freshen,fry,fuel,gang,gear,goof,hack,ham,heat,hit,hole,hush,jazz,juice,lap,light,lighten,line,link,listen,live,loosen,make,mash,measure,mess,mix,mock,mop,muddle,open,own,pair,patch,pick,prop,psych,read,rough,rustle,save,shack,sign,size,slice,slip,snap,sober,spark,split,spruce,stack,start,stay,stir,stitch,straighten,string,suck,suit,sum,step,team,tee,think,tidy,tighten,toss,trade,trip,type,vacuum,wait,wake,warm,weigh,whip,wire,wise,word,write,zip'
};
Object.keys(asymmetric).forEach(function(k) {
  asymmetric[k].split(',').forEach(function(s) {
    main[s + ' ' + k];
  });
});

module.exports = main;

},{}],287:[function(require,module,exports){
//these are regexes applied to t.text, instead of t.normal
module.exports = [

  ['[A-Z][a-z]*', 'TitleCase'],
  //#funtime
  ['^#[a-z]+', 'HashTag'],
  //spencer's
  ['[a-z]s\'', 'Possessive'],
  //589-3809
  ['[0-9]{3}-[0-9]{4}', 'PhoneNumber'],
  //632-589-3809
  ['\\(?[0-9]{3}\\)?[ -]?[0-9]{3}-[0-9]{4}', 'PhoneNumber'],

  //dates/times
  ['[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])', 'Time'], //4:32:32
  ['[012]?[0-9](:[0-5][0-9])?(:[0-5][0-9])? ?(am|pm)', 'Time'], //4pm
  ['[012]?[0-9](:[0-5][0-9])(:[0-5][0-9])? ?(am|pm)?', 'Time'], //4:00pm
  ['[PMCE]ST', 'Time'], //PST, time zone abbrevs
  ['utc ?[\+\-]?[0-9]\+?', 'Time'], //UTC 8+
  ['[a-z0-9]*? o\'?clock', 'Time'], //3 oclock
  ['[0-9]{1,4}[/\\-\\.][0-9]{1,2}[/\\-\\.][0-9]{1,4}', 'Date'], //03/02/89, 03-02-89

  //money
  ['^[\-\+]?[$€¥£][0-9]+(\.[0-9]{1,2})?$', 'Money'], //like $5.30
  ['^[\-\+]?[$€¥£][0-9]{1,3}(,[0-9]{3})+(\.[0-9]{1,2})?$', 'Money'], //like $5,231.30

  //values
  ['[0-9]{1,2}(st|nd|rd|th)?-[0-9]{1,2}(st|nd|rd|th)?', 'NumberRange'], //5-7
  ['^[\-\+]?[0-9]{1,3}(,[0-9]{3})+(\.[0-9]+)?$', 'NiceNumber'], //like 5,999.0
  ['^[\-\+]?[0-9]+(\.[0-9]+)?$', 'NumericValue'], //like +5.0

  ['[0-9]{1,4}/[0-9]{1,4}', 'Fraction'], //3/2ths
  ['[0-9]{1,2}-[0-9]{1,2}', 'Value'], //7-8

  //mc'adams
  ['ma?c\'.*', 'LastName'],
  //o'douggan
  ['o\'[^aeiouy].*', 'LastName'],


  //de/van

].map(function (a) {
  return {
    reg: new RegExp('^' + a[0] + '$'),
    tag: a[1],
    str: a[0]
  };
});

},{}],288:[function(require,module,exports){
'use strict';
//regex suffix patterns and their most common parts of speech,
//built using wordnet, by spencer kelly.

//the order here matters.
module.exports = [
  ['^[0-9]+ ?(am|pm)$', 'Date'],
  ['[0-9](st|nd|rd|r?th)$', 'Ordinal'], //like 5th
  ['([0-9])([a-z]{1,2})$', 'Cardinal'], //like 5kg
  ['^[0-9,\.]+$', 'Cardinal'], //like 5
  ['^[a-z]et$', 'Verb'],
  ['cede$', 'Infinitive'],
  ['.[cts]hy$', 'Adjective'],
  ['.[st]ty$', 'Adjective'],
  ['.[lnr]ize$', 'Infinitive'],
  ['.[gk]y$', 'Adjective'],
  ['.fies$', 'PresentTense'],
  ['ities$', 'Plural'],
  ['.some$', 'Adjective'],
  ['.[nrtumcd]al$', 'Adjective'],
  ['.que$', 'Adjective'],
  ['.[tnl]ary$', 'Adjective'],
  ['.[di]est$', 'Superlative'],
  ['^(un|de|re)\\-[a-z]..', 'Verb'],
  ['.lar$', 'Adjective'],
  ['[bszmp]{2}y', 'Adjective'],
  ['.zes$', 'PresentTense'],
  ['.[icldtgrv]ent$', 'Adjective'],
  ['.[rln]ates$', 'PresentTense'],
  ['.[oe]ry$', 'Singular'],
  ['[rdntkbhs]ly$', 'Adverb'],
  ['.[lsrnpb]ian$', 'Adjective'],
  ['.[^aeiou]ial$', 'Adjective'],
  ['.[^aeiou]eal$', 'Adjective'],
  ['.[vrl]id$', 'Adjective'],
  ['.[ilk]er$', 'Comparative'],
  ['.ike$', 'Adjective'],
  ['.ends?$', 'Verb'],
  ['.wards$', 'Adverb'],
  ['.rmy$', 'Adjective'],
  ['.rol$', 'Singular'],
  ['.tors$', 'Noun'],
  ['.azy$', 'Adjective'],
  ['.where$', 'Adverb'],
  ['.ify$', 'Infinitive'],
  ['.bound$', 'Adjective'],
  ['.[^z]ens$', 'Verb'],
  ['.oid$', 'Adjective'],
  ['.vice$', 'Singular'],
  ['.rough$', 'Adjective'],
  ['.mum$', 'Adjective'],
  ['.teen(th)?$', 'Value'],
  ['.oses$', 'PresentTense'],
  ['.ishes$', 'PresentTense'],
  ['.ects$', 'PresentTense'],
  ['.tieth$', 'Ordinal'],
  ['.ices$', 'Plural'],
  ['.tage$', 'Infinitive'],
  ['.ions$', 'Plural'],
  ['.tion$', 'Singular'],
  ['.ean$', 'Adjective'],
  ['.[ia]sed$', 'Adjective'],
  ['.urned', 'PastTense'],
  ['.tized$', 'PastTense'],
  ['.[aeiou][td]ed', 'PastTense'],
  ['.llen$', 'Adjective'],
  ['.fore$', 'Adverb'],
  ['.ances$', 'Plural'],
  ['.gate$', 'Infinitive'],
  ['.nes$', 'PresentTense'],
  ['.less$', 'Adverb'],
  ['.ried$', 'Adjective'],
  ['.gone$', 'Adjective'],
  ['.made$', 'Adjective'],
  ['.ing$', 'Gerund'], //likely to be converted to adjective after lexicon pass
  ['.tures$', 'Plural'],
  ['.ous$', 'Adjective'],
  ['.ports$', 'Plural'],
  ['. so$', 'Adverb'],
  ['.ints$', 'Plural'],
  ['.[gt]led$', 'Adjective'],
  ['.lked$', 'PastTense'],
  ['.fully$', 'Adverb'],
  ['.*ould$', 'Modal'],
  ['^[\-\+]?[0-9]+(\.[0-9]+)?$', 'NumericValue'],
  ['[a-z]*\\-[a-z]*\\-', 'Adjective'],
  ['[a-z]\'s$', 'Noun'],
  ['.\'n$', 'Verb'],
  ['.\'re$', 'Copula'],
  ['.\'ll$', 'Modal'],
  ['.\'t$', 'Verb'],
  ['.tches$', 'PresentTense'],
  ['^https?\:?\/\/[a-z0-9]', 'Url'], //the colon is removed in normalisation
  ['^www\.[a-z0-9]', 'Url'],
  ['.ize$', 'Infinitive'],
  ['.[^aeiou]ise$', 'Infinitive'],
  ['.[aeiou]te$', 'Infinitive'],
  ['.ea$', 'Singular'],
  ['[aeiou][pns]er$', 'Singular'],
  ['.ia$', 'Noun'],
  ['.sis$', 'Singular'],
  ['.[aeiou]na$', 'Noun'],
  ['.[^aeiou]ity$', 'Singular'],
  ['.[^aeiou]ium$', 'Singular'],
  ['.[^aeiou][ei]al$', 'Adjective'],
  ['.ffy$', 'Adjective'],
  ['.[^aeiou]ic$', 'Adjective'],
  ['.(gg|bb|zz)ly$', 'Adjective'],
  ['.[aeiou]my$', 'Adjective'],
  ['.[^aeiou][ai]ble$', 'Adjective'],
  ['.[^aeiou]eable$', 'Adjective'],
  ['.[^aeiou]ful$', 'Adjective'],
  ['.[^aeiou]ish$', 'Adjective'],
  ['.[^aeiou]ica$', 'Singular'],
  ['[aeiou][^aeiou]is$', 'Singular'],
  ['[^aeiou]ard$', 'Singular'],
  ['[^aeiou]ism$', 'Singular'],
  ['.[^aeiou]ity$', 'Singular'],
  ['.[^aeiou]ium$', 'Singular'],
  ['.[lstrn]us$', 'Singular'],
  ['..ic$', 'Adjective'],
  ['[aeiou][^aeiou]id$', 'Adjective'],
  ['.[^aeiou]ish$', 'Adjective'],
  ['.[^aeiou]ive$', 'Adjective'],
  ['[ea]{2}zy$', 'Adjective'],
  ['[^aeiou]ician$', 'Actor'],
  ['.keeper$', 'Actor'],
  ['.logist$', 'Actor'],
  ['..ier$', 'Actor'],
  ['.ettes$', 'Plural'],
  ['.ette$', 'Singular'],
  ['.[^aeiou][ao]pher$', 'Actor'],
  ['.tive$', 'Actor'],
  ['[aeiou].*ist$', 'Adjective'],
  ['[^i]fer$', 'Infinitive'],
  ['(bb|tt|gg|pp|ll)..?$', 'Verb'], //rubbed
  ['[aeiou]c?ked$', 'PastTense'], //hooked
  ['(eastern|central|mountain|pacific)( standard)? time', 'Time'], //PST, eastern time.  Todo:(only American right now)
  //slang things
  ['^um+$', 'Expression'], //ummmm
  ['^([hyj]a)+$', 'Expression'], //hahah
  ['^(k)+$', 'Expression'], //kkkk
  ['^(yo)+$', 'Expression'], //yoyo
  ['^yes+$', 'Expression'], //yessss
  ['^no+$', 'Expression'], //noooo
  ['^lol[sz]$', 'Expression'], //lol
  ['^woo+[pt]?$', 'Expression'], //woo
  ['^ug?h+$', 'Expression'], //uhh
  ['^uh[ -]?oh$', 'Expression'], //uhoh

  //lastname patterns
  //https://en.wikipedia.org/wiki/List_of_family_name_affixes
  //macdonell
  ['^ma?cd[aeiou]', 'LastName'],
  //icelandic/swedish
  ['.sdottir$', 'LastName'], //female
  ['.sson$', 'LastName'], //male
  //polish
  ['.[oau][wvl]ski$', 'LastName'], //male
  ['.[oau][wvl]ska$', 'LastName'], //female
  ['.czyk$', 'LastName'], //male
  ['.marek$', 'LastName'], //male
  //east-europe Hasanov, etc
  ['.[^aeiou][ai][kln]ov$', 'LastName'], //
  ['..chuk$', 'LastName'], //
  ['..enko$', 'LastName'], //
  ['.v[iy]ch$', 'LastName'], //
  //greek
  ['.opoulos$', 'LastName'], //
  ['.akis$', 'LastName'], //
  //lithuania
  ['.auskas$', 'LastName'],
  //norway
  ['.nss?en$', 'LastName']

].map(function (a) {
  return {
    reg: new RegExp(a[0]),
    tag: a[1],
    str: a[0]
  };
});

},{}],289:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;

test('==Adjective==', function (T) {

  T.test('to_adverb:', function (t) {
    [
      ['quick', 'quickly'],
      // ['idle', 'idly'],
      ['dirty', null],
      ['fun', null],
      ['full', null],
      ['quixotic', 'quixotically'],
      ['cute', 'cutely'],
      ['good', 'well'],
      ['low', 'low']
    ].forEach(function (a) {
      var arr = nlp(a[0]).adjectives().parse();
      var obj = arr[0];
      str_test(obj.adverbForm, a[0], a[1], t);
    });
    t.end();
  });

  T.test(' to_superlative', function (t) {
    [
      ['quick', 'quickest'],
      ['friendly', 'friendliest'],
      // ['caring', 'most caring'],
      ['fun', 'most fun'],
      ['full', 'fullest'],
      ['quixotic', 'most quixotic'],
      ['cute', 'cutest'],
    ].forEach(function (a) {
      var arr = nlp(a[0]).adjectives().parse();
      var obj = arr[0];
      str_test(obj.superlative, a[0], a[1], t);
    });
    t.end();
  });
  //
  T.test(' to_comparative', function (t) {
    [
      ['quick', 'quicker'],
      ['friendly', 'friendlier'],
      // ['caring', 'more caring'],
      ['fun', 'more fun'],
      ['full', 'fuller'],
      ['quixotic', 'more quixotic'],
      ['cute', 'cuter'],
    ].forEach(function (a) {
      var arr = nlp(a[0]).adjectives().parse();
      var obj = arr[0];
      str_test(obj.comparative, a[0], a[1], t);
    });
    t.end();
  });
  //
  T.test(' to_noun', function (t) {
    [
      ['quick', 'quickness'],
      ['fancy', 'fanciness'],
      // ['ferocious', 'ferociousness'],
      // ['', ''],
      // [' ', ''],
      ['clean', 'cleanliness'],
    ].forEach(function (a) {
      var arr = nlp(a[0]).adjectives().parse();
      var obj = arr[0];
      str_test(obj.nounForm, a[0], a[1], t);
    });
    t.end();
  });
  //
  T.test(' conjugate', function (t) {
    var o = nlp('nice').adjectives().parse()[0];
    str_test(o.comparative, 'nice', 'nicer', t);
    str_test(o.superlative, 'nice', 'nicest', t);
    str_test(o.adverbForm, 'nice', 'nicely', t);
    str_test(o.nounForm, 'nice', 'niceness', t);
    t.end();
  });

  T.end();
});

},{"../lib/fns":292,"../lib/nlp":294,"tape":60}],290:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('==Adverb==', function (T) {

  T.test('to_adjective:', function (t) {
    [
      ['quickly', 'quick'],
      ['garishly', 'garish'],
      ['tediously', 'tedious'],
      ['frightfully', 'frightful'],
      ['tortuously', 'tortuous'],
      ['privately', 'private'],
      ['unambiguously', 'unambiguous'],
      ['cortically', 'cortic'],
      ['biradially', 'biradial'],
      ['meanly', 'mean'],
      ['raspingly', 'rasping'],
      ['comprehensively', 'comprehensive'],
      ['fervently', 'fervent'],
      ['nationally', 'national'],
      ['maternally', 'maternal'],
      ['flashily', 'flashy'],
      ['only', 'only'],
      ['narrowly', 'narrow'],
      ['blasphemously', 'blasphemous'],
      ['abortively', 'abortive'],
      ['inoffensively', 'inoffensive'],
      ['truly', 'true'],
      ['gently', 'gent'],
      ['tolerantly', 'tolerant'],
      ['enchantingly', 'enchanting'],
      ['unswervingly', 'unswerving'],
      ['grubbily', 'grubby'],
      ['longitudinally', 'longitudinal'],
      ['thermodynamically', 'thermodynamic'],
      ['mirthfully', 'mirthful'],
      ['salaciously', 'salacious'],
      ['dourly', 'dour'],
      ['credulously', 'credulous'],
      ['carefully', 'careful'],
      ['knowingly', 'knowing'],
      ['geometrically', 'geometrical'],
      ['unassailably', 'unassailable'],
      ['antecedently', 'antecedent'],
      ['adjectively', 'adjective'],
      ['hebdomadally', 'hebdomadal'],
      ['dizzily', 'dizzy'],
      ['obnoxiously', 'obnoxious'],
      ['thirstily', 'thirsty'],
      ['biennially', 'biennial'],
      ['roguishly', 'roguish'],
      ['mentally', 'mental'],
      ['incessantly', 'incessant'],
      ['intelligently', 'intelligent'],
      ['perseveringly', 'persevering'],
      ['namely', 'name'],
      ['formidably', 'formidable'],
      ['vertically', 'vertical']
    ].forEach(function (a) {
      var o = nlp(a[0]).tag('Adverb').adverbs().parse()[0];
      var msg = a[0] + ' -> ' + o.adjectiveForm;
      t.equal(o.adjectiveForm, a[1], msg);
    });
    t.end();
  });
});

},{"../lib/nlp":294,"tape":60}],291:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');


test('one big dates', function (t) {
  var r = nlp('six years and 2 days before the start of this next wednesday january 5th 1992 at 6pm');
  var dates = r.dates().parse();
  t.equal(dates.length, 1, 'one long date');

  var o = dates[0];
  t.equal(o.punt.direction, 'backward', 'direction');
  t.equal(o.punt.duration.year, 6, 'durationyear');
  t.equal(o.punt.duration.day, 2, 'durationday');
  t.equal(o.section, 'start', 'section');
  t.equal(o.relative.month, 0, 'relativemonth');
  t.equal(o.relative.date, 5, 'relativedate');
  t.equal(o.relative.weekday, 3, 'relativeweekday');
  t.equal(o.relative.year, 1992, 'relativeyear');
  t.equal(o.relative.knownDate, null, 'knowndate');
  // t.equal(o.article, a[1], msg);
  t.end();
});

test('short+long form', function (t) {
  var r = nlp('wednesday, january 2nd, 2016');
  var shorter = r.dates().toShortForm().normal();
  t.equal(shorter, 'wed jan 2nd 2016');

  var r2 = nlp('Thurs, feb 2nd, 2016');
  var longer = r2.dates().toLongForm().normal();
  t.equal(longer, 'thursday february 2nd 2016');
  //
  // var r2 = nlp('Thurs, feb 2nd, 2016')
  // var longer = r2.dates().toLongForm().plaintext()
  // t.equal(longer, 'Thursday, February 2nd, 2016')

  t.end();
});

},{"../lib/nlp":294,"tape":60}],292:[function(require,module,exports){
//helpers to make test output messages nicer
var str_test = function(got, input, want, t) {
  var msg = '\'-> - - -> \'' + got + '\'- - - - (want: \'' + want + '\' )'; //'\'' + input +
  t.equal(got, want, msg);
  return;
};

var arr_test = function(got, input, want, t) {
  got = JSON.stringify(got);
  want = JSON.stringify(want);
  var msg = '\'-> - - -> \'' + got + '\'- - - - (want: \'' + want + '\' )'; //'\'' + input +
  t.equal(got, want, msg);
  return;
};

var has_pos = function(r, tags) {
  var terms = r.terms();
  if (r.length !== r.length) {
    return false;
  }
  for(var i = 0; i < terms.list.length; i++) {
    var t = terms.list[i].terms[0];
    if (!t.tag[tags[i]]) {
      return false;
    }
  }
  return true;
};

var pos_test = function(r, tags, t) {
  var str = '';
  var got = r.mapTerms(function(term) {
    str += ' ' + term.normal;
    return Object.keys(term.tag).join('|');
  }).join(', ');
  var msg = '"' + str.trim() + '" has tags [' + tags.join(',') + ']   (' + got + ')';
  t.equal(has_pos(r, tags), true, msg);
  return;
};

var terms_test = function(terms, want, t, isText) {
  var str = '';
  var got = terms.map(function(term) {
    str += ' ' + term.text;
    if (isText) {
      return term.text;
    }
    return term.normal;
  });
  var msg = '"' + str + '"  got: [' + got.join(',') + ']  want: [' + want.join(',') + ']';
  t.deepEqual(got, want, msg);
};

var isArray = function(someVar) {
  if (Object.prototype.toString.call(someVar) === '[object Array]') {
    return true;
  }
  return false;
};

module.exports = {
  str_test: str_test,
  pos_test: pos_test,
  terms_test: terms_test,
  arr_test: arr_test,
  isArray: isArray
};

},{}],293:[function(require,module,exports){
module.exports = `Now this is a story all about how my life got flipped-turned upside down.
and I'd like to take a minute, just sit right there, I'll tell you how I became the prince of a town called Bel-Air.

In west Philadelphia born and raised, on the playground was where I spent most of my days.
Chillin' out maxin' relaxin' all cool, and all shooting some b-ball outside of the school.
When a couple of guys who were up to no good started making trouble in my neighborhood,
I got in one little fight and my mom got scared, she said, "You're movin' with your auntie and uncle in Bel-Air".

I begged and pleaded with her day after day but she packed my suitcase and sent me on my way.
She gave me a kiss and then she gave me my ticket. I put my Walkman on and said, "I might as well kick it".

First class, yo, this is bad. Drinking orange juice out of a champagne glass.
Is this what the people of Bel-Air living like? Hmm, this might be alright.

But wait I hear they're prissy, bourgeois, all that. Is this the type of place that they just send this cool cat?
I don't think so, I'll see when I get there.
I hope they're prepared for the prince of Bel-Air.

Well, the plane landed and when I came out. There was a dude who looked like a cop standing there with my name out.
I ain't trying to get arrested yet, I just got here.
I sprang with the quickness like lightning, disappeared.

I whistled for a cab and when it came near. The license plate said "Fresh" and it had dice in the mirror.
If anything I could say that this cab was rare, but I thought, "Nah, forget it" – "Yo, home to Bel-Air"!

I pulled up to the house about 7 or 8 and I yelled to the cabbie, "Yo home smell ya later".
I looked at my kingdom, I was finally there. To sit on my throne as the Prince of Bel-Air.
`

},{}],294:[function(require,module,exports){
var nlp;
if (typeof window !== undefined) {
  nlp = require('../../../src/index');
} else {
  nlp = window.nlp_compromise;
  alert('browser');
}
// var nlp = require('../../builds/nlp_compromise');
// var nlp = require('../../builds/nlp_compromise.min');

module.exports = nlp;

},{"../../../src/index":103}],295:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('insert-basic :', function(t) {

  var m = nlp('the dog sat').insertBefore('and');
  t.equal(m.plaintext(), 'and the dog sat', 'and-dog');

  m = nlp('the dog sat').insertAfter('patiently');
  t.equal(m.plaintext(), 'the dog sat patiently', 'sat-patiently');

  m = nlp('the dog sat').match('dog').insertBefore('nice');
  t.equal(m.plaintext(), 'the nice dog sat', 'nice-dog');

  m = nlp('a dog sat').match('sat').insertAfter('quickly');
  t.equal(m.plaintext(), 'a dog sat quickly', 'sat-quickly');

  m = nlp('a dog sat').match('a dog sat').insertAfter('quickly');
  t.equal(m.plaintext(), 'a dog sat quickly', 'multi-match-quickly');

  m = nlp('a dog sat').match('asdf').insertAfter('no no no');
  t.equal(m.plaintext(), 'a dog sat', 'no no no no');

  t.end();
});

},{"../lib/nlp":294,"tape":60}],296:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;


test('==Match ==', function (T) {

  T.test('term-match :', function (t) {
    [
      ['quick', 'quick', true],
      ['Quick', 'Quick', true],
      ['quick', 's', false],
      ['quick', '#Adjective', true],
      ['quick', '#Noun', false],
      ['quick', '(fun|nice|quick|cool)', true],
      ['quick', '(fun|nice|good)', false],
    ].forEach(function (a) {
      var m = nlp(a[0]).match(a[1]);
      var msg = a[0] + ' matches ' + a[1] + ' ' + a[2];
      t.equal(m.found, a[2], msg);
    });
    t.end();
  });

  T.test('sentence-match:', function (t) {
    [
      ['the dog played', 'the dog', 'the dog'],
      ['the dog played', 'the dog played', 'the dog played'],
      ['the dog played', 'the #Noun', 'the dog'],
      ['the dog played', 'the #Noun played', 'the dog played'],
      ['the dog played', 'the cat played', ''],
      ['the dog played', 'the #Adjective played', ''],
      ['the dog played', 'the (cat|dog|piano) played', 'the dog played'],
      ['the dog played', 'the (cat|piano) played', ''],
      ['the dog played', 'the . played', 'the dog played'],
      //optional
      ['the dog played', 'the dog quickly? played', 'the dog played'],
      ['the dog played', 'the dog #Adverb? played', 'the dog played'],
      ['the dog quickly played', 'the dog #Adverb? played', 'the dog quickly played'],
      ['the dog quickly played', 'the dog #Adverb played', 'the dog quickly played'],
      ['the dog quickly played', 'the dog . played', 'the dog quickly played'],
      ['the dog quickly played', 'the dog .? played', 'the dog quickly played'],
      // ['the dog played', 'the dog .? played', 'the dog played'],

      //leading/trailing logic
      ['the dog played', 'the dog played$', 'the dog played'],
      ['the dog played', 'the dog', 'the dog'],
      ['the dog played', 'the dog$', ''],
      ['the dog played', 'the dog$ played', ''],
      ['the dog played', '^the dog', 'the dog'],
      ['the dog played', 'dog played', 'dog played'],
      ['the dog played', '^dog played', ''],
      ['the dog played', '^played', ''],
      ['the dog played', '^the', 'the'],

      ['john eats glue', 'john eats glue', 'john eats glue'],
      ['john eats glue', 'john eats', 'john eats'],
      ['john eats glue', 'eats glue', 'eats glue'],
      ['john eats glue', 'eats glue all day', ''],

      //test contractions
      // [`if you don't mind`, `you don't mind`, `you don't mind`],
      [`if you don't mind`, `you don't care`, ``],
      // [`if you don't mind`, `you don't`, `you don't`],
      // [`if you don't mind`, `don't mind`, `don't mind`],
      [`if you didn't care`, `didn't`, `didn't`],
      // [`if you wouldn't care, i'll eat here`, `i'll eat`, `i'll eat`], //omg hard one

      // [`don't go`, `do not`, `don't`],
      [`do not go`, `do not`, `do not`],
      // [`i dunno`, `do not`, `dunno`],
      //bugs
      // [`really remind me to buy`, '#Adverb? #Infinitive (me|us) (to|for)', `really remind me to`],

    ].forEach(function (a) {
      var m = nlp(a[0]).match(a[1]);
      if (!m.found) {
        t.equal(a[2], '', 'no-match: ' + a[0] + ' - -' + a[1]);
      } else {
        var msg = '\'' + a[0] + '\'  - ' + a[1] + ' - - have : \'' + m.normal() + '\'';
        t.equal(m.normal(), a[2], msg);
      }
    });
    t.end();
  });

});

},{"../lib/fns":292,"../lib/nlp":294,"tape":60}],297:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');


test('fancy match', function (t) {
  [
    //misc
    ['doug is good', '', 0],
    ['doug is good', '.', 3],
    ['doug is good', '.?', 3],
    ['doug is good', '.+', 3],

    //contractions
    ['he\'s nice', 'he is', 2],
    ['he\'s nice', 'is nice', 2],
    ['he\'s nice', 'he\'s', 1],
    ['he\'s nice', 'he\'s nice', 3],
    ['he\'s nice', 'nice', 1],

    //over/under
    ['he is nice', 'is nice and good', 0],
    ['is nice', 'he is nice', 0],

    //dot
    ['doug is good', 'doug is good', 3],
    ['doug is good', 'doug . good', 3],
    ['doug is good', 'doug is .', 3],
    ['doug is good', '. is .', 3],
    ['doug is good', '. . .', 3],
    ['doug is good', '. . . .', 0],

    //optional miss
    ['doug is good', 'doug is really? good', 3],
    ['doug is good', 'doug is .? good', 3], //tricky 'greedy optional' bug
    ['doug is good', 'doug is #Adverb? good', 3],
    //optional has
    ['doug is really good', 'doug is really? good', 4],
    ['doug is really good', 'doug is .? good', 4],
    ['doug is really good', 'doug is #Adverb? good', 4],
    //asterix empty
    ['doug is good', 'doug *', 3],
    ['doug is good', 'doug is *', 3],
    ['doug is good', '*', 3],
    //asterix positive
    ['doug is good', 'doug * good', 3],
    ['doug is really good', 'doug * good', 4],
    ['doug is really so very good', 'doug * good', 6],
    ['doug is really so very good at stuff', 'doug * good', 6],
    ['we think doug is really so very good at stuff', 'doug * good', 6],
    //asterix negative
    ['doug is good', 'doug * bad', 0],
    ['doug is good', 'spencer * bad', 0],
    ['doug is good', 'spencer *', 0],
    ['doug is good', 'doug * is', 2], //another tricky 'greedy optional' bug
    ['cool, fun, great, nice', '#Adjective+ great', 3],

    //
    ['Dr. Spencer Smith says hi', 'dr', 1],
    ['Dr. Spencer Smith says hi', 'dr spencer', 2],
    ['Dr. Spencer Smith says hi', 'dr spencer smith', 3],
    ['Dr. Spencer Smith says hi', 'dr spencer smith says', 4],
    ['Lately, Dr. Spencer Smith says hi', 'lately dr spencer smith', 4],
    //start ^
    ['in toronto', '^toronto', 0],
    ['toronto', '^toronto', 1],
    ['in toronto', '^in toronto', 2],
    ['in toronto', 'in ^toronto', 0],
    //end $
    ['it snows', 'it snows', 2],
    ['it snows', 'snows$', 1],
    ['it snows', 'it snows$', 2],
    ['it snows', 'it$ snows', 0],
    ['it snows', 'foo$', 0],
    //negative !
    ['it really snows', 'it #adverb snows', 3],
    ['it really snows', 'it !#adverb snows', 0],
    ['it really snows. it goes.', 'it !#adverb', 2],
    ['it is nice.', '!#adverb', 3],
    //max/min {}
    ['if it goes really well', 'if {1,2} well', 0],
    ['if it goes really well', 'if {1,6} well', 5],
    ['so i said that spencer is nice', '^{1,3} spencer', 0],
    ['so i said that spencer is nice', '^{1,6} spencer', 5],
  ].forEach(function (a) {
    var r = nlp(a[0]).match(a[1]).terms() || [];
    var msg = '\'' + a[0] + '\' - - - \'' + a[1] + '\' - - got:' + r.length + '  want:' + a[2];
    t.equal(r.length, a[2], msg);
  });
  t.end();
});

},{"../lib/nlp":294,"tape":60}],298:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('not-basic :', function(t) {

  var m = nlp('spencer is really cool').not('brown');
  t.equal(m.plaintext(), 'spencer is really cool', 'missing-not');
  t.equal(m.length, 1, 'one-result');

  m = nlp('spencer is really cool').not('#Adverb');
  t.equal(m.plaintext(), 'spencer is cool', 'one-not');
  t.equal(m.length, 2, 'two-result');

  m = nlp('spencer is really cool').not('#Adverb+');
  t.equal(m.plaintext(), 'spencer is cool', 'still-one-not');
  t.equal(m.length, 2, 'two-results');

  m = nlp('spencer is really cool').not('#Adverb+');
  t.equal(m.plaintext(), 'spencer is cool', 'two-not');
  t.equal(m.length, 2, 'two-results');

  m = nlp('spencer is really cool').not('is #Adverb+');
  t.equal(m.plaintext(), 'spencer cool', 'three-not');
  t.equal(m.length, 2, 'two-results');

  m = nlp('spencer is really cool. John is really nice.').not('#Adverb');
  t.equal(m.plaintext(), 'spencer is cool. John is nice.', 'two-terms-matches');
  t.equal(m.length, 4, 'four-results');

  m = nlp('spencer is really cool. John is really nice.').not('pardon me, #Adverb');
  t.equal(m.plaintext(), 'spencer is really cool. John is really nice.', 'tricky-no-match');
  t.equal(m.length, 2, 'two-original-results');


  t.end();
});

},{"../lib/nlp":294,"tape":60}],299:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('remove-basic :', function(t) {

  var m = nlp('the brown cat played').match('brown').delete();
  t.equal(m.plaintext(), 'the cat played', 'brown-cat');

  m = nlp('the nice brown cat played').match('nice brown').delete();
  t.equal(m.plaintext(), 'the cat played', 'nice-brown');

  m = nlp('the nice brown cat played').match('#Adjective').delete();
  t.equal(m.plaintext(), 'the cat played', 'adj-each');

  m = nlp('the nice brown cat played').match('#Adjective+').delete();
  t.equal(m.plaintext(), 'the cat played', 'adj-consecutive');

  t.end();
});

test('remove-match :', function(t) {

  var m = nlp('the brown cat played').delete('brown');
  t.equal(m.plaintext(), 'the cat played', 'brown-cat');

  m = nlp('the brown cat played. The brown dog sat down.').delete('brown');
  t.equal(m.plaintext(), 'the cat played. The dog sat down.', 'brown-cat');

  m = nlp('the nice brown cat played. The nice dog waited.').delete('nice brown');
  t.equal(m.plaintext(), 'the cat played. The nice dog waited.', 'nice-brown');

  m = nlp('the nice brown cat played. The cute dogs ate.').delete('#Adjective');
  t.equal(m.plaintext(), 'the cat played. The dogs ate.', 'adj-each');

  m = nlp('the nice brown cat played. The cute dogs ate.').delete('#Adjective+');
  t.equal(m.plaintext(), 'the cat played. The dogs ate.', 'adj-consecutive');

  t.end();
});

test('remove-logic :', function(t) {
  var m = nlp('spencer kelly is here').match('spencer kelly').delete('spencer');
  t.equal(m.normal(), 'kelly', 'remove(reg) returns this');

  m = nlp('spencer kelly is here').match('spencer kelly').delete();
  t.equal(m.normal(), 'is here', 'remove() returns parent');

  m = nlp('spencer kelly is here').match('spencer kelly').delete('notfound');
  t.equal(m.normal(), 'spencer kelly', 'remove(notfound) returns this');
  t.end();
});

},{"../lib/nlp":294,"tape":60}],300:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('replace-basic :', function(t) {

  var m = nlp('the dog played').match('dog').replace('cat');
  t.equal(m.plaintext(), 'the cat played', 'dog-cat');

  m = nlp('the dog played').match('the dog').replace('a cat');
  t.equal(m.plaintext(), 'a cat played', 'a-cat');

  m = nlp('the dog played').match('#Noun').replace('snake');
  t.equal(m.plaintext(), 'the snake played', 'snake');

  m = nlp('the pit bull played').match('#Noun+').replace('snake');
  t.equal(m.plaintext(), 'the snake played', 'pit bull');

  m = nlp('the pit bull dog played').match('#Noun+').replace('grey snake');
  t.equal(m.plaintext(), 'the grey snake played', 'pit bull dog');

  t.end();
});

// test('match-replace :', function(t) {
//   [
//     ['the dog played', 'the dog', 'the cat', 'the cat played'],
//     ['the dog played', 'the #Noun', 'the cat', 'the cat played'],
//     ['the dog played', 'the (dog|hamster|pet-snake)', 'the cat', 'the cat played'],
//     ['the boy and the girl', 'the #Noun#', 'the house', 'the house and the house'],
//     ['the boy and the girl', 'the cat', 'the house', 'the boy and the girl'],
//   ].forEach(function(a) {
//     var str = nlp(a[0]).replace(a[1], a[2]).plaintext();
//     str_test(str, a[0], a[3], t);
//   });
//   t.end();
// });

},{"../lib/nlp":294,"tape":60}],301:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;

test('.article():', function(t) {
  [
    ['duck', 'a'],
    ['eavesdropper', 'an'],
    ['alligator', 'an'],
    ['hour', 'an'],
    ['NDA', 'an'],
    ['F.B.I', 'an'],
    ['N.D.A.', 'an'],
    ['eulogy', 'a'],
    ['ukalele', 'a'],
  ].forEach(function (a) {
    var o = nlp(a[0]).tag('Noun').nouns().parse()[0];
    var msg = a[0] + ' -> ' + o.article;
    t.equal(o.article, a[1], msg);
  });
  t.end();
});

},{"../lib/fns":292,"../lib/nlp":294,"tape":60}],302:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;

test('==Plurals==', function(T) {

  T.test('is_plural():', function(t) {
    [
      ['octopus', false],
      ['tree', false],
      ['trees', true],
      ['i', false],
      ['mayor of chicago', false],
      ['mayors of chicago', true],
      ['octopus', false],
      ['octopi', true],
      ['eyebrow', false],
      ['eyebrows', true],
      ['child', false],
      ['children', true],
      ['spencer\'s', false],
      ['toronto\'s', false],
      // ['simpsons\'', false],
      ['she\'s', false],
    ].forEach(function (a) {
      var term = nlp(a[0]).list[0].terms[0];
      var msg = a[0] + ' ' + term.noun.isPlural();
      t.equal(term.noun.isPlural(), a[1], msg);
    });
    t.end();
  });

  T.test('singularize:', function(t) {
    [
      // ["Joneses", "Jones"],
      ['children', 'child'],
      ['women', 'woman'],
      ['men', 'man'],
      ['people', 'person'],
      ['geese', 'goose'],
      ['mice', 'mouse'],
      ['barracks', 'barracks'],
      ['deer', 'deer'],
      ['nuclei', 'nucleus'],
      ['syllabi', 'syllabus'],
      ['fungi', 'fungus'],
      ['cacti', 'cactus'],
      ['theses', 'thesis'],
      ['crises', 'crisis'],
      ['phenomena', 'phenomenon'],
      ['embryos', 'embryo'],
      ['frescos', 'fresco'],
      ['ghettos', 'ghetto'],
      ['halos', 'halo'],
      ['mangos', 'mango'],
      ['mementos', 'memento'],
      ['mottos', 'motto'],
      ['tornados', 'tornado'],
      ['tuxedos', 'tuxedo'],
      ['volcanos', 'volcano'],
      ['crises', 'crisis'],
      ['analyses', 'analysis'],
      ['aircraft', 'aircraft'],
      ['bass', 'bass'],
      ['bison', 'bison'],
      ['fish', 'fish'],
      ['fowl', 'fowl'],
      ['kilos', 'kilo'],
      ['kimonos', 'kimono'],
      ['logos', 'logo'],
      ['memos', 'memo'],
      ['ponchos', 'poncho'],
      ['photos', 'photo'],
      ['pimentos', 'pimento'],
      ['pros', 'pro'],
      ['sombreros', 'sombrero'],
      ['tacos', 'taco'],
      ['memos', 'memo'],
      ['torsos', 'torso'],
      ['xylophones', 'xylophone'],
      ['quintuplets', 'quintuplet'],
      ['worrywarts', 'worrywart'],
      ['nerds', 'nerd'],
      ['lollipops', 'lollipop'],
      ['eyebrows', 'eyebrow'],
      // ['mayors of chicago', 'mayor of chicago'],
      //test that sungular.singularize()==singular..
      ['mango', 'mango'],
      ['memento', 'memento'],
      ['motto', 'motto'],
      ['tornado', 'tornado'],
      ['person', 'person'],
      ['goose', 'goose'],
      ['mouse', 'mouse'],
      ['calves', 'calf'],
      ['olives', 'olive'],
      ['loaves', 'loaf'],
      ['oafs', 'oaf'],
      ['wives', 'wife'],
      ['roofs', 'roof'],
      ['hooves', 'hoof']
    ].forEach(function (a) {
      var term = nlp(a[0]).tag('Noun').list[0].terms[0];
      var str = term.noun.singular();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('pluralize:', function(t) {
    [
      ['snake', 'snakes'],
      ['ski', 'skis'],
      // ["Barrymore", "Barrymores"],
      ['witch', 'witches'],
      ['box', 'boxes'],
      ['gas', 'gases'],
      ['kiss', 'kisses'],
      ['index', 'indices'],
      ['appendix', 'appendices'],
      ['criterion', 'criteria'],
      ['berry', 'berries'],
      ['activity', 'activities'],
      ['daisy', 'daisies'],
      ['church', 'churches'],
      ['fox', 'foxes'],
      ['stomach', 'stomachs'],
      ['epoch', 'epochs'],
      ['knife', 'knives'],
      ['half', 'halves'],
      ['scarf', 'scarves'],
      ['chief', 'chiefs'],
      ['spoof', 'spoofs'],
      ['cafe', 'cafes'],
      ['gulf', 'gulfs'],
      ['alternative', 'alternatives'],
      ['solo', 'solos'],
      ['zero', 'zeros'],
      ['avocado', 'avocados'],
      ['studio', 'studios'],
      ['zoo', 'zoos'],
      ['embryo', 'embryos'],
      ['hero', 'heroes'],
      ['banjo', 'banjos'],
      ['cargo', 'cargos'],
      ['flamingo', 'flamingos'],
      ['fresco', 'frescos'],
      ['ghetto', 'ghettos'],
      ['halo', 'halos'],
      ['mango', 'mangos'],
      ['memento', 'mementos'],
      ['motto', 'mottos'],
      ['tornado', 'tornados'],
      ['tuxedo', 'tuxedos'],
      ['volcano', 'volcanos'],
      ['bus', 'buses'],
      ['crisis', 'crises'],
      ['analysis', 'analyses'],
      ['neurosis', 'neuroses'],
      ['aircraft', 'aircraft'],
      ['halibut', 'halibut'],
      ['moose', 'moose'],
      ['salmon', 'salmon'],
      ['sheep', 'sheep'],
      ['spacecraft', 'spacecraft'],
      ['tuna', 'tuna'],
      ['trout', 'trout'],
      ['armadillo', 'armadillos'],
      ['auto', 'autos'],
      ['bravo', 'bravos'],
      ['bronco', 'broncos'],
      ['casino', 'casinos'],
      ['combo', 'combos'],
      ['gazebo', 'gazebos'],
      //test that plural.pluralize()==plural..
      ['snakes', 'snakes'],
      ['skis', 'skis'],
      // ['mayor of chicago', 'mayors of chicago'],
      // ["Barrymores", "Barrymores"],
      ['witches', 'witches'],
      ['boxes', 'boxes'],
      ['gases', 'gases'],
      ['spoofs', 'spoofs'],
      ['solos', 'solos'],
      ['avocados', 'avocados'],
      ['studios', 'studios'],
      ['zoos', 'zoos'],
    ].forEach(function (a) {
      var term = nlp(a[0]).tag('Noun').list[0].terms[0];
      var str = term.noun.plural();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });
});

},{"../lib/fns":292,"../lib/nlp":294,"tape":60}],303:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('sanity-check case:', function (t) {
  var str = 'John xoo, John fredman';
  var r = nlp(str);
  str = r.toUpperCase().plaintext();
  t.equal(str, 'JOHN XOO, JOHN FREDMAN', 'uppercase');
  str = r.toLowerCase().plaintext();
  t.equal(str, 'john xoo, john fredman', 'lowercase');
  str = r.toCamelCase().plaintext();
  t.equal(str, 'JohnXoo,JohnFredman', 'camelcase');

  t.end();
});

test('tricky case:', function (t) {
  var str = 'i am spencer kelly here with Amy Adams.';
  var r = nlp(str);
  r.people().toUpperCase();
  str = r.plaintext();
  t.equal(str, 'i am SPENCER KELLY here with AMY ADAMS.', 'tricky-uppercase');

  str = 'the Spencer Kelly Festival of Silly Walks';
  r = nlp(str);
  r.match('#TitleCase+').toCamelCase();
  t.equal(r.plaintext(), 'the SpencerKellyFestival of SillyWalks', 'tricky-camelcase');

  t.end();
});

},{"../lib/nlp":294,"tape":60}],304:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('if-basic:', function (t) {
  var r = nlp('spencer is here');
  var m = r.if('asdf');
  t.equal(m.plaintext(), '', 'if-negative');

  m = r.if('spencer');
  t.equal(m.plaintext(), 'spencer is here', 'if-positive');

  r = nlp('spencer is here. john was here.');
  m = r.if('is');
  t.equal(m.normal(), 'spencer is here.', 'if-partial');

  t.end();
});

test('ifNo:', function (t) {
  var r = nlp('spencer is here');
  //ifNo
  m = r.ifNo('spencer');
  t.equal(m.plaintext(), '', 'ifNo-positive');

  m = r.ifNo('asdf');
  t.equal(m.plaintext(), 'spencer is here', 'ifNo-negative');

  r = nlp('spencer is here. john was here.');
  m = r.ifNo('is');
  t.equal(m.normal(), 'john was here.', 'if-no-partial');

  t.end();
});

},{"../lib/nlp":294,"tape":60}],305:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

var garbage = [
  '',
  '  ',
  null,
  '\n\n', [], {},
];
test('garbage:', function (t) {
  garbage.forEach(function (g, i) {
    var num = nlp(g).list.length;
    var msg = (typeof g) + ' text input #' + i;
    t.equal(num, 0, msg);
  });
  t.end();
});

test('misc:', function (t) {
  var str = '2 million five hundred thousand and fifty nine is bigger than 2882';
  var m = nlp(str);
  m.values().toNumber();
  t.equal(m.normal(), '2500059 is bigger than 2882', str);

  str = '2 million five hundred thousand and fifty nine is bigger than 2882';
  m = nlp(str);
  m.values().toNiceNumber();
  t.equal(m.plaintext(), '2,500,059 is bigger than 2,882', str);

  str = 'doug is 5 years old';
  m = nlp(str);
  m.values().toTextValue();
  t.equal(m.normal(), 'doug is five years old', str);

  // str = 'i\'d buy those nachos';
  // m = nlp(str).sentences().toSingular();
  // t.equal(m.normal(), 'i\'d buy that nacho', str);
  //
  // str = 'i\'d buy these nachos';
  // m = nlp(str).sentences().toSingular();
  // t.equal(m.normal(), 'i\'d buy this nacho', str);
  //
  // str = 'i\'d buy nachos';
  // m = nlp(str).sentences().toSingular();
  // t.equal(m.normal(), 'i\'d buy a nacho', str);
  //
  // str = 'i\'d buy the nachos';
  // m = nlp(str).sentences().toSingular();
  // t.equal(m.normal(), 'i\'d buy a nacho', str);
  //
  // str = 'i\'d buy the eggs';
  // m = nlp(str).sentences().toSingular();
  // t.equal(m.normal(), 'i\'d buy an egg', str);
  //
  // str = 'men go';
  // m = nlp(str).sentences().toPast().nouns().toSingular();
  // t.equal(m.normal(), 'a man went', str);
  t.end();
});

},{"../lib/nlp":294,"tape":60}],306:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;


test('sentence():', function(t) {
  [
    ['he is good', 'he is good'],
    ['Jack and Jill went up the hill.', 'jack and jill went up the hill.'],
    ['Mr. Clinton did so.', 'mr clinton did so.'],
    ['he is good', 'he is good'],
    ['Jack and Jill   went up the hill. She got  water.', 'jack and jill went up the hill. she got water.'],
    ['Joe', 'joe'],
    ['just-right', 'just right'],
    ['camel', 'camel'],
    // ['4', '4'],
    // ['four', '4'],
    ['john smith', 'john smith'],
    // ['John G. Smith','John Smith'],
    // ['Dr. John Smith-McDonald', 'john smith mcdonald'],

  // ['Contains no fruit juice \n\n All rights reserved', 'contains no fruit juice. all rights reserved'],
  ].forEach(function (a) {
    var str = nlp(a[0]).normal();
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

},{"../lib/fns":292,"../lib/nlp":294,"tape":60}],307:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('result methods', function (t) {
  var text = 'this :cookie: <3 💯 so good. It is really nice. Yes it is <3';

  //has method
  var m = nlp(text);
  t.equal(m.has('#Emoji'), true, 'nlp.has positive');
  t.equal(m.has('#SportsTeam'), false, 'nlp.has neg');

  //filter string
  var small = m.filter('#Emoji');
  t.equal(small.normal(), 'this :cookie: <3 💯 so good. yes it is <3', 'nlp.filter string');

  //filter method
  small = m.filter((ts) => {
    return !ts.has('#Emoji');
  });
  t.equal(small.normal(), 'it is really nice.', 'nlp.filter method');

  t.end();
});

},{"../lib/nlp":294,"tape":60}],308:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var fns = require('../lib/fns');


test('sortAlpha:', function (t) {
  var str = 'John xoo, John fredman, John davis';
  var r = nlp(str);
  r = r.people();
  r.sortAlpha();
  var want = ['john davis', 'john fredman', 'john xoo'];
  fns.arr_test(r.asArray(), str, want, t);
  t.end();
});

test('reverse:', function (t) {
  var str = 'John xoo, John fredman, John davis';
  var r = nlp(str);
  r = r.people();
  r.sortAlpha();
  r.reverse();
  var want = ['john xoo', 'john fredman', 'john davis'];
  fns.arr_test(r.asArray(), str, want, t);
  t.end();
});

test('unique:', function (t) {
  var str = 'John xoo, John fredman, john xoo, John davis';
  var r = nlp(str);
  r = r.people();
  r.unique();
  var want = ['john xoo', 'john fredman', 'john davis'];
  fns.arr_test(r.asArray(), str, want, t);
  t.end();
});

test('topk:', function (t) {
  var str = 'John xoo, John fredman, john xoo, John davis';
  var r = nlp(str).people();
  var a = r.topk();
  t.equal(a[0].normal, 'john xoo', 'topk is sorted');
  t.equal(a[0].count, 2, 'topk finds two');
  t.end();
});

},{"../lib/fns":292,"../lib/nlp":294,"tape":60}],309:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var arr_test = require('../lib/fns').arr_test;

test('splitAfter', function (t) {
  [
    ['doug and nancy', 'and', ['doug and', 'nancy']],
    ['doug and also nancy', 'and also', ['doug and also', 'nancy']],
    ['doug and definetly nancy', 'and #Adverb', ['doug and definetly', 'nancy']],
    ['maybe doug but possibly nancy', 'but', ['maybe doug but', 'possibly nancy']],

    ['a x b x c', 'x', ['a x', 'b x', 'c']],
    ['a b x c x', 'x', ['a b x', 'c x']],
    ['x a b x c', 'x', ['x', 'a b x', 'c']],
    ['x x a b c', 'x', ['x', 'x', 'a b c']],
    ['a x b x', 'x', ['a x', 'b x']],
    ['a x b c x', 'x', ['a x', 'b c x']],
    ['x x a b c', 'x', ['x', 'x', 'a b c']],

    ['john, paul, george, ringo', '#Comma', ['john', 'paul', 'george', 'ringo']],
    ['doug is really nice', 'is', ['doug is', 'really nice']],
  ].forEach(function (a) {
    var want = a[2];
    var got = nlp(a[0]).splitAfter(a[1]).asArray()
    arr_test(got, a[0], want, t);
  });
  t.end();
});

test('splitBefore', function (t) {
  [
    ['doug and nancy', 'and', ['doug', 'and nancy']],
    ['doug and also nancy', 'and also', ['doug', 'and also nancy']],
    ['doug and definetly nancy', 'and #Adverb', ['doug', 'and definetly nancy']],
    ['maybe doug but possibly nancy', 'but', ['maybe doug', 'but possibly nancy']],
    ['doug is really nice', 'is', ['doug', 'is really nice']],

    ['a x b x c', 'x', ['a', 'x b', 'x c']],
    ['a b x x c', 'x', ['a b', 'x', 'x c']],
    ['x a b x c', 'x', ['x a b', 'x c']],
    ['x x a b c', 'x', ['x', 'x a b c']],
    ['a x b x', 'x', ['a', 'x b', 'x']],
  ].forEach(function (a) {
    var want = a[2];
    var got = nlp(a[0]).splitBefore(a[1]).asArray()
    arr_test(got, a[0], want, t);
  });
  t.end();
});

test('splitOn', function (t) {
  [
    ['doug and nancy', 'and', ['doug', 'nancy']],
    ['doug and also nancy', 'and also', ['doug', 'nancy']],
    ['doug and definetly nancy', 'and #Adverb', ['doug', 'nancy']],
    ['maybe doug but possibly nancy', 'but', ['maybe doug', 'possibly nancy']],
    ['doug is really nice', 'is', ['doug', 'really nice']],

    ['a x b x c', 'x', ['a', 'b', 'c']],
    ['a b x x c', 'x', ['a b', 'c']],
    ['x a b x c', 'x', ['a b', 'c']],
    ['x x a b c', 'x', ['a b c']],
    ['a x b x', 'x', ['a', 'b']],
  ].forEach(function (a) {
    var want = a[2];
    var got = nlp(a[0]).splitOn(a[1]).asArray()
    arr_test(got, a[0], want, t);
  });
  t.end();
});

},{"../lib/fns":292,"../lib/nlp":294,"tape":60}],310:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var fns = require('../lib/fns');
var freshPrince = require('../lib/freshPrince');

var subsets = [
  'acronyms',
  'adjectives',
  'adverbs',
  'contractions',
  'dates',
  'hashTags',
  'organizations',
  'people',
  'phoneNumbers',
  'places',
  'sentences',
  'questions',
  'statements',
  'nouns',
  'urls',
  'values',
  'verbs'
];

test('all combined subsets empty:', function (t) {
  var r = nlp(freshPrince);
  var small = r.all();
  for(var i = 0; i < subsets.length; i++) {
    var sub = subsets[i];
    small = small[sub]();
  }
  t.equal(small.plaintext(), '', 'no-uber subset');
  t.end();
});


test('all subsets have a parse method:', function (t) {
  var r = nlp(freshPrince);
  subsets.forEach((s) => {
    var sub = r[s]();
    var arr = sub.parse();
    t.ok(fns.isArray(arr), s + '.parse() is an array');
  });
  t.end();
});


test('all subsets support .all():', function (t) {
  var txt = freshPrince;
  var r = nlp(txt);
  subsets.forEach((s) => {
    var sub = r[s]();
    var str = sub.all().plaintext();
    var msg = s + '.all() works';
    t.equal(str, txt, msg);
  });
  t.end();
});

},{"../lib/fns":292,"../lib/freshPrince":293,"../lib/nlp":294,"tape":60}],311:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

const firstTerm = (str) => {
  return nlp(str).list[0].terms[0];
};

test('==Term_fns==', function (T) {
  T.test('noun:', function (t) {

    var term = firstTerm('flower');
    t.equal(term.noun.plural(), 'flowers');
    term = firstTerm('flowers');
    t.equal(term.noun.singular(), 'flower');

    t.end();
  });

  T.test('pronoun:', function (t) {

    var term = firstTerm('he');
    t.equal(term.pronoun.toPlural(), 'they');

    term = firstTerm('those');
    t.equal(term.pronoun.toSingular(), 'this');

    t.end();
  });

  T.test('verb:', function (t) {

    var term = firstTerm('is');
    t.equal(term.verb.toPlural(), 'are');

    term = firstTerm('walks');
    t.equal(term.verb.toPlural(), 'walk');

    term = firstTerm('walked');
    t.equal(term.verb.conjugation(), 'PastTense');

    var conj = term.verb.conjugate();
    t.equal(conj.Gerund, 'walking');
    t.end();
  });
});

},{"../lib/nlp":294,"tape":60}],312:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('topics concat:', function (t) {
  var things = nlp('spencer and danny are in Paris France, and germany for Google Inc and IBM').things().asArray();
  var want = [
    'spencer',
    'danny',
    'paris france',
    'germany',
    'google inc',
    'ibm'
  ];
  t.equal(things.join(', '), want.join(', '), 'found right things');
  t.end();
});

},{"../lib/nlp":294,"tape":60}],313:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('sanity-check case:', function (t) {
  var m = nlp('john is cool. he is nice');
  m.whitespace.before('  ');
  t.equal(m.plaintext(), '  john is cool.  he is nice');

  m = nlp('john is cool. he is nice');
  m.whitespace.after('    ');
  t.equal(m.plaintext(), 'john is cool.     he is nice    ');

  m = nlp('so john smith is cool.');
  m.people().whitespace.before('  ');
  m.people().whitespace.after('  ');
  t.equal(m.plaintext(), 'so  john smith   is cool.');


  t.end();
});

},{"../lib/nlp":294,"tape":60}],314:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;

test('==contractions==', function(T) {

  T.test('possessives-or-contractions:', function(t) {
    [
      [`spencer's good`, `spencer is good`],
      [`spencer's house`, `spencer's house`],
      [`spencer's really good`, `spencer is really good`],
      [`he's good`, `he is good`],
      [`google's about to earn money`, `google is about to earn money`],
      [`toronto's citizens`, `toronto's citizens`],
      [`rocket's red glare`, `rocket's red glare`],
      [`somebody's walking`, `somebody is walking`],
      [`everyone's victories`, `everyone's victories`],
      [`the tornado's power`, `the tornado's power`],
    ].forEach(function(a) {
      var str = nlp(a[0]).contractions().expand().normal();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('contraction-pos:', function(t) {
    [
      [`john's good`, `Person`],
      [`ankara's good`, `Place`],
      [`January's good`, `Date`],
      [`john's cousin`, `Person`],
      [`ankara's citizens`, `Place`],
      [`January's weather`, `Date`],
    ].forEach(function(a) {
      var term = nlp(a[0]).list[0].terms[0];
      var msg = term.text + ' has tag ' + a[1];
      t.equal(term.tag[a[1]], true, msg);
    });
    t.end();
  });

  T.test('expand:', function(t) {
    [
      [`he's a hero`, ['he', 'is']],
      [`she's here`, ['she', 'is']],
      [`it's a hero`, ['it', 'is']],
      [`he'd win`, ['he', 'would']],
      [`they'd win`, ['they', 'would']],
      [`they've begun`, ['they', 'have']],
      [`they'll begun`, ['they', 'will']],
      [`we've begun`, ['we', 'have']],
      [`don't go`, ['do', 'not', 'go']],
      // dont expand leading 'nt contraction
      [`mustn't go`, ['must', 'not', 'go']],
      [`haven't gone`, ['have', 'not', 'gone']],
      [`isn't going`, ['is', 'not', 'going']],
      ['can\'t go', ['can', 'not', 'go']],
      ['ain\'t going', ['is', 'not', 'going']],
      ['won\'t go', ['will', 'not', 'go']],

      ['i\'d go', ['i', 'would']],
      ['she\'d go', ['she', 'would']],
      ['he\'d go', ['he', 'would']],
      ['they\'d go', ['they', 'would']],
      ['we\'d go', ['we', 'would']],

      ['i\'ll go', ['i', 'will']],
      ['she\'ll go', ['she', 'will']],
      ['he\'ll go', ['he', 'will']],
      ['they\'ll go', ['they', 'will']],
      ['we\'ll go', ['we', 'will']],

      ['i\'ve go', ['i', 'have']],
      ['they\'ve go', ['they', 'have']],
      ['we\'ve go', ['we', 'have']],
      ['should\'ve go', ['should', 'have']],
      ['would\'ve go', ['would', 'have']],
      ['could\'ve go', ['could', 'have']],
      ['must\'ve go', ['must', 'have']],

      ['i\'m going', ['i', 'am']],
      ['we\'re going', ['we', 'are']],
      ['they\'re going', ['they', 'are']],

      [`don't`, ['do', 'not']],
      [`do not`, ['do', 'not']],
      // [`dunno`, ['do', 'not', 'know']],

      [`spencer's going`, ['spencer', 'is']],
      [`he's going`, ['he', 'is']],
    ].forEach(function(a) {
      var s = nlp(a[0]).contractions().expand().list[0];
      var got = [s.terms[0].normal];
      if (a[1][1] && s.terms[1]) {
        got.push(s.terms[1].normal);
      }
      if (a[1][2] && s.terms[2]) {
        got.push(s.terms[2].normal);
      }
      var msg = '[' + got.join(', ') + '] should be [' + a[1].join(', ') + ']';
      t.deepEqual(got, a[1], msg);
    });
    t.end();
  });

  T.test('contract:', function(t) {
    [
      [`he is a hero`, `he's`],
      [`she is here`, `she's`],
      [`it is a hero`, `it's`],
      [`he would win`, `he'd`],
      [`they would win`, `they'd`],
      [`they have begun`, `they've`],
    ].forEach(function(a) {
      var term = nlp(a[0]).contractions().contract().list[0].terms[0];
      str_test(term.normal, a[0], a[1], t);
    });
    t.end();
  });

  T.test('preserve-contractions:', function(t) {
    [
      `he is a hero`,
      `she is here`,
      `it is a hero`,
      `he would win`,
      `they would win`,
    ].forEach(function(a) {
      var str = nlp(a[0]).normal();
      str_test(str, a[0], a[0], t);
    });
    t.end();
  });

  T.test('contraction-supports-whitespace:', function(t) {
    [
      ['We\'ve only just begun', 'we have only just begun'],
      ['We\'ve   only just begun', 'we have   only just begun']
    ].forEach(function(a) {
      var str = nlp(a[0]).contractions().expand().plaintext();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

});

},{"../lib/fns":292,"../lib/nlp":294,"tape":60}],315:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;

test('=Whitespace=', function(T) {

  T.test('preserve whitespace:', function(t) {
    [
      'John Smith',
      'John   Smith',
      'John Smith  ',
      'John   Smith  ',
      ' John',
      ' John   Smith  ',
      //no joins
      'he is nice',
      'he   is nice',
      'he   is   nice',
      'he   is   nice  ',
      '  he   is   nice  ',
      //contractions
      `he isn't nice`,
      `he  isn't nice`,
      `he isn't  nice`,
      `he isn't     nice   `,
      `    he   isn't     nice   `,
      //multiples
      'it is ipso facto',
      'it is ipso facto  ',
      'it is   ipso facto  ',
      'it is   ipso    facto  ',
      '2nd of march, 2015'
    ].forEach(function (a) {
      var str = nlp(a).plaintext();
      str_test(str, a, a, t);
    });
    t.end();
  });

  T.test('inter-sentence whitespace:', function(t) {
    [
      'John Smith is nice.',
      '   John Smith is nice.',
      '   John Smith is nice.   ',
      'John Smith is nice. He lives in Spain.',
      'John Smith is nice.    He lives in Spain.',
      'John Smith is nice.    He lives in Spain.  ',
      '    John Smith is nice.    He lives in Spain.  ',
      'Dr. Smith is nice.  He lives in Spain.  ',
      '    Dr. Smith is nice.    He lives in Spain.  ',
      'Dr. Smith is nice?  He lives in Spain.  ',
      '    Dr. Smith is nice?    He lives in Spain?  ',
      '    Dr. Smith is nice?    He lives in UCLA?  He does? ',
      '    Dr. Smith is nice?    He lives in Spain?  He does?? ',
    ].forEach(function (a) {
      var str = nlp(a).plaintext();
      str_test(str, a, a, t);
    });
    t.end();
  });

  // T.test('contraction whitespace:', function(t) {
  //   [
  //     ['John\'s    nice.', 'John is    nice.'],
  //     ['John Smith\'s    nice.', 'John Smith is    nice.'],
  //     ['John isn\'t    nice.', 'John is not    nice.'],
  //     ['John didn\'t    go.', 'John did not    go.'],
  //     ['I wanna    go.', 'I want to    go.'],
  //     ['they\'ve    gone.', 'they have    gone.'],
  //   ].forEach(function (a) {
  //     var str = nlp(a[0]).expand().plaintext();
  //     str_test(str, a[0], a[1], t);
  //   });
  //   t.end();
  // });


});

},{"../lib/fns":292,"../lib/nlp":294,"tape":60}],316:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('date-tag :', function(t) {
  [
    'yesterday',
    'today',
    'tomorrow',
    'morning',
    'afternoon',
    'evening',
    'noon',
    'midnight',
    'yesterday at noon',
    'yesterday at midnight',
    'today at noon',
    'today at midnight',
    'tomorrow at noon',
    'tomorrow at midnight',
    'this morning',
    'this afternoon',
    'this evening',
    'yesterday morning',
    'yesterday afternoon',
    'yesterday evening',
    'today morning',
    'today afternoon',
    'today evening',
    'tomorrow morning',
    'tomorrow afternoon',
    'tomorrow evening',
    'thursday morning',
    'thursday afternoon',
    'thursday evening',
    '6:00 yesterday',
    '6:00 today',
    '6:00 tomorrow',
    '5am yesterday',
    '5am today',
    '5am tomorrow',
    '4pm yesterday',
    '4pm today',
    '4pm tomorrow',
    'tuesday last week',
    'tuesday this week',
    'tuesday next week',
    'last week wednesday',
    'this week wednesday',
    'next week wednesday',
    '10 seconds ago',
    '10 minutes ago',
    '10 hours ago',
    '10 days ago',
    '10 weeks ago',
    '10 months ago',
    '10 years ago',
    'saturday',
    'sunday 11:00',
    'yesterday at 4:00',
    'today at 4:00',
    'tomorrow at 4:00',
    'yesterday at 6:45am',
    'today at 6:45am',
    'tomorrow at 6:45am',
    'yesterday at 6:45pm',
    'today at 6:45pm',
    'tomorrow at 6:45pm',
    'yesterday at 2:32 AM',
    'today at 2:32 AM',
    'tomorrow at 2:32 AM',
    'yesterday at 2:32 PM',
    'today at 2:32 PM',
    'tomorrow at 2:32 PM',
    'yesterday 02:32',
    'today 02:32',
    'tomorrow 02:32',
    'yesterday 2:32am',
    'today 2:32am',
    'tomorrow 2:32am',
    'yesterday 2:32pm',
    'today 2:32pm',
    'tomorrow 2:32pm',
    'wednesday at 14:30',
    'wednesday at 02:30am',
    'wednesday at 02:30pm',
    'wednesday 14:30',
    'wednesday 02:30am',
    'wednesday 02:30pm',
    'friday 03:00 am',
    'friday 03:00 pm',
    'sunday at 05:00 am',
    'sunday at 05:00 pm',
    '4th february',
    'november 3rd',
    'last june',
    'next october',
    '6 am',
    '5am',
    '5:30am',
    '8 pm',
    '4pm',
    '4:20pm',
    '06:56:06 am',
    '06:56:06 pm',
    'mon 2:35',
    '1:00 sun',
    '1am sun',
    '1pm sun',
    '1:00 on sun',
    '1am on sun',
    '1pm on sun',
    '12:14 PM',
    '12:14 AM',
    '2 seconds before now',
    '2 minutes before now',
    '2 hours before now',
    '2 days before now',
    '2 weeks before now',
    '2 months before now',
    '2 years before now',
    '4 seconds from now',
    '4 minutes from now',
    '4 hours from now',
    '4 days from now',
    '4 weeks from now',
    '4 months from now',
    '4 years from now',
    // '6 in the morning',
    // '4 in the afternoon',
    // '9 in the evening',
    // 'monday 6 in the morning',
    // 'monday 4 in the afternoon',
    // 'monday 9 in the evening',
    'last sunday at 21:45',
    'monday last week',
    '12th day last month',
    '12th day this month',
    '12th day next month',
    '1st tuesday last november',
    '1st tuesday this november',
    '1st tuesday next november',
    '10 hours before noon',
    '10 hours before midnight',
    '5 hours after noon',
    '5 hours after midnight',
    'noon last friday',
    'midnight last friday',
    'noon this friday',
    'midnight this friday',
    'noon next friday',
    'midnight next friday',
    'last friday at 20:00',
    'this friday at 20:00',
    'next friday at 20:00',
    '1:00 last friday',
    '1:00 this friday',
    '1:00 next friday',
    '1am last friday',
    '1am this friday',
    '1am next friday',
    '1pm last friday',
    '1pm this friday',
    '1pm next friday',
    '5 am last monday',
    '5 am this monday',
    '5 am next monday',
    '5 pm last monday',
    '5 pm this monday',
    '5 pm next monday',
    'last wednesday 7am',
    'this wednesday 7am',
    'next wednesday 7am',
    'last wednesday 7pm',
    'this wednesday 7pm',
    'next wednesday 7pm',
    'last tuesday 11 am',
    'this tuesday 11 am',
    'next tuesday 11 am',
    'last tuesday 11 pm',
    'this tuesday 11 pm',
    'next tuesday 11 pm',
    'yesterday at 13:00',
    'today at 13:00',
    '2nd friday in august',
    '3rd wednesday in november',
    'tomorrow 1 year ago',
    '11 january 2 years ago',
    '6 mondays from now',
    // 'final thursday in april',
    'last thursday in april',
    'monday to friday',
    '1 April to 31 August',
    '1999-12-31 to tomorrow',
    // 'now to 2010-01-01',
    '2009-03-10 9:00 to 11:00',
    '26 oct 10:00 am to 11:00 am',
    // 'jan 1 to 2',
    '16:00 nov 6 to 17:00',
    'may 2nd to 5th',
    '6am dec 5 to 7am',
    // '1/3 to 2/3',
    // '2/3 to in 1 week',
    // '3/3 21:00 to in 5 days',
    // 'first day of 2009 to last day of 2009',
    // 'first day of may to last day of may',
    // 'first to last day of 2008',
    // 'first to last day of september',
    'for 4 seconds',
    'for 4 minutes',
    'for 4 hours',
    'for 4 days',
    'for 4 weeks',
    'for 4 months',
    'for 4 years',
    'january 11',
    '11 january',
    '18 oct 17:00',
    '18 oct 5am',
    '18 oct 5pm',
    '18 oct 5 am',
    '18 oct 5 pm',
    'dec 25',
    'feb 28 3:00',
    'feb 28 3am',
    'feb 28 3pm',
    'feb 28 3 am',
    'feb 28 3 pm',
    '19:00 jul 1',
    '7am jul 1',
    '7pm jul 1',
    '7 am jul 1',
    '7 pm jul 1',
    'jan 24, 2011 12:00',
    'jan 24, 2011 12am',
    'jan 24, 2011 12pm',
    'may 27th',
    // '2005',
    'march 1st 2009',
    'february 14, 2004',
    'jan 3 2010',
    '3 jan 2000',
    '2010 october 28',
    // '1/3',
    // '1/3 16:00',
    '4:00',
    '17:00',
    '3:20:00',
    '1st day last year',
    '1st day this year',
    '1st day next year',
    '6th day last week',
    '6th day this week',
    '6th day next week',
    'yesterday 7 seconds ago',
    'yesterday 7 minutes ago',
    'yesterday 7 hours ago',
    'yesterday 7 days ago',
    'yesterday 7 weeks ago',
    'yesterday 7 months ago',
    'yesterday 7 years ago',
    'tomorrow 3 seconds ago',
    'tomorrow 3 minutes ago',
    'tomorrow 3 hours ago',
    'tomorrow 3 days ago',
    'tomorrow 3 weeks ago',
    'tomorrow 3 months ago',
    'tomorrow 3 years ago',
    '2nd monday',
    '100th day',
    '11 january next year',
    '11 january this year',
    '11 january last year',
    '6 hours before yesterday',
    '6 hours before tomorrow',
    '3 hours after yesterday',
    '3 hours after tomorrow',
    'saturday 3 months ago at 17:00',
    'saturday 3 months ago at 5:00am',
    'saturday 3 months ago at 5:00pm',
    '4th day last week',
    '8th month last year',
    '8th month this year',
    '8th month next year',
    'fri 3 months ago at 5am',
    'wednesday 1 month ago at 8pm',
    'October 2006',
    '27/5/1979',
  // '-5min',
  // '+2d',
  // '100th day to 200th',
  // 'march'
  ].forEach(function(first) {
    var str = nlp(first).match('#Date+').plaintext();
    var msg = first + '  -> ' + str;
    t.equal(first, str, msg);
  });
  t.end();
});

},{"../lib/nlp":294,"tape":60}],317:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;


test('keyword emojis', function (t) {
  [
    ['he is so nice :heart:', ':heart:'],
    [':cool: :wine_glass: yeah party', ':cool: :wine_glass:'],
    ['to be or not to be: this is a question :cookie:', ':cookie:'],
  ].forEach(function (a) {
    var have = nlp(a[0]).match('#Emoji').normal()
    var msg = 'have: \'' + have + '\'  want: \'' + a[1] + '\''
    t.equal(have, a[1], msg);
  });
  t.end();
});

test('unicode emojis', function (t) {
  [
    ['nice job 💯 ❤️', '💯 ❤️'],
    ['💚 good job 🎇', '💚 🎇'],
    ['visit Brunei', ''],
    ['visit Brunei 🇧🇳', '🇧🇳'],
    ['visit Brunei 🇧🇳🇧🇳🇧🇳', '🇧🇳🇧🇳🇧🇳'],
  ].forEach(function (a) {
    var have = nlp(a[0]).match('#Emoji').normal()
    var msg = 'have: \'' + have + '\'  want: \'' + a[1] + '\''
    t.equal(have, a[1], msg);
  });
  t.end();
});

test('emoticon emojis', function (t) {
  [
    ['nice job :)', ':)'],
    [';) good work', ';)'],
    [';( oh no :(', ';( :('],
    ['to be: that is th3 question', ''],
    ['</3 </3 </3 sad', '</3 </3 </3'],
    // ['</3</3', '</3</3'],
  ].forEach(function (a) {
    var have = nlp(a[0]).match('#Emoji').normal()
    var msg = 'have: \'' + have + '\'  want: \'' + a[1] + '\''
    t.equal(have, a[1], msg);
  });
  t.end();
});

},{"../lib/fns":292,"../lib/nlp":294,"tape":60}],318:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var pos_test = require('../lib/fns').pos_test;

test('=Lexicon test=', function (T) {

  T.test('default lexicon:', function (t) {
    [
      ['great', 'Adjective'],
      ['walked', 'PastTense'],
      ['singing', 'Gerund'],
      ['funniest', 'Superlative'],
      ['sillier', 'Comparative'],
      ['the', 'Determiner'],
      ['iraqi', 'Demonym'],
      ['december', 'Date'],
      ['fifth', 'Value'],
      ['suddenly', 'Adverb'],
      ['shanghai', 'City'],
      ['google', 'Organization'],
    ].forEach(function (a) {
      var r = nlp(a[0]);
      pos_test(r, [a[1]], t);
    });
    t.end();
  });

  T.test('adjusted lexicon:', function (t) {
    //place new words
    var lexicon = {
      'paris': 'Person',
      'lkjj': 'Adjective',
      'donkey kong': 'City'
    };

    var arr = [
      ['paris is nice', ['Person', 'Copula', 'Adjective']],
      ['he is lkjj', ['Pronoun', 'Copula', 'Adjective']],
      ['donkey kong wins the award', ['City', 'Verb', 'Determiner', 'Noun']],
    ];
    arr.forEach(function (a) {
      var r = nlp(a[0], lexicon);
      pos_test(r, a[1], t);
    });
    //
    // //set gender from lexicon
    // var terms = nlp('Kelly', context).terms;
    // pos_test(terms, ['FemaleName'], t);
    // //set as male:
    // context = {
    //   lexicon: {
    //     kelly: 'MaleName'
    //   }
    // };
    // terms = nlp('Kelly', context).terms;
    // pos_test(terms, ['MaleName'], t);
    // //gender follows lumping
    // terms = nlp.sentence('Kelly Gruber', context).terms;
    // pos_test(terms, ['MaleName'], t);

    t.end();
  });
});

},{"../lib/fns":292,"../lib/nlp":294,"tape":60}],319:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('organization test', function(t) {
  var arr = [
    'google',
  // 'google inc',
  ];
  arr.forEach(function (str) {
    var terms = nlp(str).list[0].terms;
    var msg = '\'' + str + '\' ' + terms.length + ' terms';
    t.equal(terms.length, 1, msg);

    var term = terms[0];
    msg = '\'' + term.normal + '\' is org -  (' + Object.keys(term.tag).join(',') + ')';
    t.equal(term.tag.Organization, true, msg);
  });
  t.end();
});

},{"../lib/nlp":294,"tape":60}],320:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

//test a word from each file in ./data/**
test('pos from-lexicon', function (t) {
  var arr = [
    ['toronto', 'City'],
    ['mexico', 'Country'],
    ['Jamaica', 'Country'],
    ['legendary', 'Adjective'],
    ['above', 'Adjective'],
    ['moderate', 'Adjective'],
    ['extreme', 'Adjective'],
    ['august', 'Month'],
    ['saturday', 'WeekDay'],
    ['minute', 'Duration'],
    ['valentines day', 'Holiday'],
    ['ash wednesday', 'Holiday'],
    ['really', 'Adverb'],
    ['each', 'Determiner'],
    ['voila', 'Expression'],
    ['new england', 'Place'],
    ['hers', 'Possessive'],
    ['onto', 'Preposition'],
    ['blvd', 'Place'],
    ['belgian', 'Demonym'],
    ['cactus', 'Singular'],
    ['cacti', 'Plural'],
    ['economy', 'Noun'],
    ['engineer', 'Noun'],
    ['clothing', 'Noun'],
    ['duran duran', 'Organization'],
    ['american express', 'Organization'],
    ['brotherhood', 'Noun'],
    ['oakland athletics', 'SportsTeam'],
    ['jaime', 'Person'],
    ['claire', 'FemaleName'],
    ['arthur', 'MaleName'],
    ['¥', 'Currency'],
    ['pence', 'Currency'],
    ['seven', 'Value'],
    ['seventeen', 'Value'],
    ['twenty', 'Value'],
    ['thousand', 'Value'],
    ['eighteenth', 'Value'],
    ['tbsp', 'Unit'],
    ['wrote', 'PastTense'],
    ['write', 'Verb'],
    ['survive', 'Verb'],
    ['attempt', 'Verb'],
    ['mc\'adams', 'LastName'],
    ['Müller', 'LastName'],
    ['muller', 'LastName'],
    ['425-1231', 'PhoneNumber'],
    ['823-425-1231', 'PhoneNumber'],
    ['823 425-1231', 'PhoneNumber'],
    ['(823) 425-1231', 'PhoneNumber'],
    ['invest', 'Verb'],
    ['investing', 'Verb'],
  ];
  arr.forEach(function (a) {
    var term = nlp(a[0]).list[0].terms[0];
    var msg = '\'' + term.normal + '\' has - ' + a[1] + '  (' + Object.keys(term.tag).join(',') + ')';
    t.equal(term.tag[a[1]], true, msg);
  });
  t.end();
});

},{"../lib/nlp":294,"tape":60}],321:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('tag inference:', function (t) {
  var m = nlp('aasdf2').unTag('Noun').unTag('NounPhrase');
  var term = m.list[0].terms[0];
  t.equal(Object.keys(term.tag).length, 0, 'aasdf2 has no tags');
  //give it a specific tag-
  m.tag('SportsTeam');
  term = m.list[0].terms[0];
  t.equal(term.tag.Noun, true, 'aasdf2 now has Noun');
  t.equal(term.tag.Organization, true, 'aasdf2 now has Organization(inferred)');
  //give it a redundant tag-
  m.tag('Organization');
  term = m.list[0].terms[0];
  t.equal(term.tag.Noun, true, 'aasdf2 still has Noun');
  t.equal(term.tag.Organization, true, 'aasdf2 still has Organization');
  t.end();
});

test('untag inference:', function (t) {
  var m = nlp('aasdf');
  m.tag('FemaleName');
  var term = m.list[0].terms[0];
  t.equal(term.tag.FemaleName, true, 'aasdf first has FemaleName');
  t.equal(term.tag.Person, true, 'aasdf first has person');
  t.equal(term.tag.Noun, true, 'aasdf first has noun');
  //remove the assumption..
  term.unTag('Noun');
  t.equal(term.tag.Noun, undefined, 'aasdf now has no noun');
  t.equal(term.tag.Person, undefined, 'aasdf now has no person(inferred)');
  t.equal(term.tag.FemaleName, undefined, 'aasdf now has no FemaleName(inferred)');
  t.end();
});



test('tag idempodence:', function (t) {
  var m = nlp('walk').tag('Verb');
  var term = m.list[0].terms[0];
  t.equal(term.tag.Verb, true, 'walk has Verb');
  t.equal(term.tag.Value, undefined, 'walk has no Value');
  //untag irrelevant stuff
  term.unTag('Value');
  term.unTag('Determiner');
  term.unTag('Country');
  term.unTag('Place');
  t.equal(term.tag.Verb, true, 'walk has Verb after');
  t.equal(term.tag.Value, undefined, 'walk has no Value after');
  t.end();
});


test('tags are self-removing', function (t) {
  var terms = [
    'Person',
    'Place',
    'PastTense',
    'FemaleName',
    'Infinitive',
    'HashTag',
    'Month',
  ];
  terms.forEach((tag) => {
    m = nlp('aasdf').tag(tag).unTag(tag);
    var t0 = m.list[0].terms[0];
    t.equal(t0.tag[tag], undefined, 'tag removes self ' + tag);
  });
  t.end();
});

},{"../lib/nlp":294,"tape":60}],322:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;

test('=Web Terminology=', function(T) {

  T.test('is-email:', function(t) {
    [
      [`s@s.com`, true],
      [`sasdf@sasdf.com`, true],
      [`sasdf@sasdf.ti`, true],
      [`sasdf@sasdf.t`,],
      [`sasdf@sasdft`,],
      [`sasdfsasdft.com`,],
      [`@sasdft.com`,],
      [`_@_.com`, true],
      [`_@_._`,],
      [`sas df@sasdf.com`,],
      [`sasdf@sa sdf.com`,],
    ].forEach(function (a) {
      var term = nlp(a[0]).list[0].terms[0];
      var msg = a[0] + ' is email: ' + a[1];
      t.equal(term.tag['Email'], a[1], msg);
    });
    t.end();
  });

  T.test('is-hashtag:', function(t) {
    [
      [`#lkjsdf`, true],
      [`#ll`, true],
      [`#22ll`, true],
      [`#_22ll`, true],
      // [`#l`,],
      [`# l`,],
      [`l#l`,],
    ].forEach(function (a) {
      var term = nlp(a[0]).list[0].terms[0];
      var msg = a[0] + ' is hashtag: ' + a[1];
      t.equal(term.tag['HashTag'], a[1], msg);
    });
    t.end();
  });

  T.test('is-url:', function(t) {
    [
      [`http://cool.com/fun`, true],
      [`https://cool.com`, true],
      [`https://cool.com/`, true],
      [`https://www.cool.com/`, true],
      [`http://subdomain.cool.com/`, true],
      [`www.fun.com/`, true],
      [`www.fun.com`, true],
      [`www.fun.com/foobar/fun`, true],
      [`www.subdomain.cool.com/`, true],
      [`wwwsubdomain.cool.com/`, true],
      [`woo.br`, true],
      [`woohoo.biz`, true],
      [`woop.org/news`, true],
      [`http://woop.org/news?foo=bar`, true],
      [`http:subdomain.cool.com/`,],
      [`coolcom`,],
    ].forEach(function (a) {
      var term = nlp(a[0]).list[0].terms[0];
      var msg = a[0] + ' is url: ' + a[1];
      t.equal(term.tag['Url'], a[1], msg);
    });
    t.end();
  });

});

},{"../lib/fns":292,"../lib/nlp":294,"tape":60}],323:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('hyphen-tokenize', function (t) {
  var r = nlp('super-cool work');
  t.equal(r.terms().length, 3, 'super, cool');
  t.equal(r.plaintext(), 'super-cool work', 'preserve hyphen');
  t.equal(r.normal(), 'super cool work', 'normalize-out hyphen');

  r = nlp('http://about.com/my-summer-vacation');
  t.equal(r.terms().length, 1, 'url hyphen');
  r = nlp('http://about.com/my-summer');
  t.equal(r.terms().length, 1, 'url hyphen2');

  r = nlp('421-0059');
  t.equal(r.terms().length, 1, 'phoneNuumber hyphen');

  r = nlp('sept-2');
  t.equal(r.terms().length, 2, 'date hyphen');

  r = nlp('-2 degrees');
  t.equal(r.terms().length, 2, 'minus hyphen');

  t.end();
});


test('hyphenate', function (t) {
  var str = 'it is cool. he is nice';
  var m = nlp(str);
  m.hyphenate();
  t.equal(m.terms().length, 6, 'seperate terms');
  t.equal(m.plaintext(), 'it-is-cool. he-is-nice', 'hyphenate');
  m.deHyphenate();
  t.equal(m.plaintext(), str, 'dehyphenate');


  str = 'i payed seven-hundred for the back-rub';
  m = nlp(str);
  m.values().deHyphenate();
  t.equal(m.plaintext(), 'i payed seven hundred for the back-rub', 'dehyphenate-values');


  str = 'he is the king of rock. she is the queen of cool.';
  m = nlp(str);
  m.match('(king|queen) of (#Noun|#Adjective)').hyphenate();
  t.equal(m.plaintext(), 'he is the king-of-rock. she is the queen-of-cool.', 'hyphenate-match');

  t.end();
});

},{"../lib/nlp":294,"tape":60}],324:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('money-basic:', function (t) {
  var r = nlp('it is $70.23');
  var m = r.match('#Money');
  t.equal(m.normal(), '$70.23', 'match-$70.23');

  r = nlp('it is $703');
  m = r.match('#Money+');
  t.equal(m.normal(), '$703', 'match-$703');

  r = nlp('it is five euros');
  m = r.match('#Money+');
  t.equal(m.normal(), 'five euros', 'match-five-euros');

  r = nlp('i said five times, you should pay 12 dollars');
  m = r.match('#Money+');
  t.equal(m.normal(), '12 dollars', 'match-12 dollars');

  r = nlp('you should pay sixty five dollars and four cents USD');
  m = r.match('#Money+');
  t.equal(m.normal(), 'sixty five dollars and four cents usd', 'match-long-usd');

  t.end();
});

test('money-has:', function (t) {
  var tests = [
    ['$7', true],
    ['$7.0', true],
    ['$7.00', true],
    ['$7.003', false],

    ['$7082.03', true],
    ['$2,082.03', true],
    ['€7.00', true],
    ['¥70', true],
    ['£0.20', true],
    ['@0.20', false],

    ['8 cents', true],
    ['60 pence', true],
    ['sixty pence', true],
    ['sixty USD', true],
  ];
  tests.forEach((a) => {
    var r = nlp(a[0]);
    var m = r.match('#Money');
    t.equal(m.found, a[1], 'money-has: \'' + a[0] + '\'');
  });
  t.end();
});

},{"../lib/nlp":294,"tape":60}],325:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

test('to_number:', function (t) {
  [
    ['twenty two thousand five hundred', 22500],
    ['two thousand five hundred and sixty', 2560],
    ['a hundred and two', 102],
    ['a hundred', 100],
    ['seven', 7],
    ['seven grand', 7000],
    ['104', 104],
    ['13 thousand', 13000],
    ['17,983', 17983],
    ['nine hundred', 900],
    ['twenty one hundred', 2100],
    ['twenty one', 21],
    ['seventy two', 72],
    ['two hundred two', 202],
    ['one thousand one', 1001],
    ['minus five hundred', -500],
    ['minus fifteen', -15],
    ['five hundred million', 500000000],
    // ['$12.03', 12.03],
    // ['$12', 12],
    ['5 hundred', 500],
    ['5.2 thousand', 5200],
    ['million', 1000000],
    ['hundred one', 101],
    ['minus fifty', -50],
    ['twenty thousand', 20000],
    ['four point six', 4.6],
    ['nine hundred point five', 900.5],
    ['sixteen hundred sixteen point eight', 1616.8],
    ['four point seven nine', 4.79],
    ['four point sixteen', 4.16],
    ['twenty first', '21st'],
    ['fifty ninth', '59th'],
    ['nine hundred fiftieth', '950th'],
    ['nine hundred and second', '902nd'],
    ['five thousand nine hundred fiftieth', '5950th'],
    ['six hundred and fifty nine', 659],
    ['six hundred and fifty nine thousand', 659000],
    [950, 950],
    [999999950, 999999950],
    [8080999999950, 8080999999950],
    ['fifteen million and two', 15000002],
    ['six hundred and eighteen', 618],
    ['two hundred thousand', 200000],
    ['six million ninety', 6000090],
    ['twenty-two hundred', 2200],

    ['two million five hundred thousand', 2500000],
    ['one billion five hundred thousand', 1000500000],
    ['one billion five hundred thousand and eight', 1000500008],
    ['a million fifty thousand and eight', 1050008],
    ['a million twenty five thousand and fifty-two', 1025052],
    ['minus two million twenty five thousand and eighty', -2025080],

    ['7 hundred and 8 thousand', 708000],
    ['2 hundred and sixty 9 thousand seven hundred', 269700],
    ['2 hundred and six million 7 hundred thousand seven hundred', 206700700],

    ['minus 70', -70],
    ['minus eight', -8],
    ['minus 8 hundred', -800],
    ['twenty-seven hundred', 2700],
    ['minus eight thousand two hundred', -8200],
    ['twenty-five', 25],
    ['half a million', 500000],
    ['five hundred eighteen', 518],
    ['eighty eight point nine nine', 88.99],
    ['minus eighty eight point nine nine', -88.99],
    // ['1/2', 1 / 2],
    // ['-1/5', -1 / 5],
    // ['-1 1/10', -1 - 1 / 10],
    // ['1 1/20', 1 + 1 / 20],
    // ['1/2 million', 500000],
    // ['1 1/2 million', 1500000],
    ['negative five', -5],
    ['negative hundred', -100],
    // ['12:32', ''],
    // ['123-1231', ''],
    ['seven eleven', ''],
    ['ten-four', ''],
    ['one seven', ''],
    ['one ten', ''],
    ['one twelve', ''],
    ['one thirty', ''],
    ['nine fifty', ''],
    ['five six', ''],
    ['nine seventy', ''],
    ['nine two hundred', ''],
    ['ten one', ''],
    ['twelve one', ''],
    ['seventy five two', ''],
    ['two hundred three hundred', ''],
    ['sixty fifteen hundred', ''],
    ['one twenty', ''],
    ['twenty five twenty', ''],
  // ['',''],
  // [null,''],
  ].forEach(function (a) {
    var num = nlp(a[0]).values().toNumber().plaintext();
    var want = '' + a[1] || a[0];
    var msg = '\'' + a[0] + '\' - - have: \'' + num + '\'   want:\'' + a[1] + '\'';
    t.equal(num, '' + want, msg);
  });
  t.end();
});

},{"../lib/nlp":294,"tape":60}],326:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;

test('to_text:', function (t) {
  [
    // [-5, 'negative five'],
    [5, 'five'],
    [15, 'fifteen'],
    [10, 'ten'],
    [20, 'twenty'],
    [75, 'seventy five'],
    [97, 'ninety seven'],
    [111, 'one hundred and eleven'],
    [175, 'one hundred and seventy five'],
    [900, 'nine hundred'],
    [1175, 'one thousand one hundred and seventy five'],
    [2000, 'two thousand'],
    [2100, 'two thousand one hundred'],
    [2102, 'two thousand one hundred and two'],
    [70000, 'seventy thousand'],
    [72000, 'seventy two thousand'],
    [900000, 'nine hundred thousand'],
    [900001, 'nine hundred thousand and one'],
    [900200, 'nine hundred thousand two hundred'],
    [900205, 'nine hundred thousand two hundred and five'],
    [7900205, 'seven million nine hundred thousand two hundred and five'],
    [90000000, 'ninety million'],
    [900000000, 'nine hundred million'],
    [900000080, 'nine hundred million and eighty'],
  ].forEach(function (a) {
    var str = nlp(a[0]).values().toTextValue().plaintext();
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

},{"../lib/fns":292,"../lib/nlp":294,"tape":60}],327:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');
var str_test = require('../lib/fns').str_test;

test('==Value==', function (T) {

  T.test('to_ordinal:', function (t) {
    [
      [11, '11th'],
      [5, '5th'],
      [22, '22nd'],
    ].forEach(function (a) {
      var str = nlp(a[0]).values().toOrdinal().normal();
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  T.test('number:', function (t) {
    [
      ['five hundred feet', 500],
      ['fifty square feet', 50],
      ['90 hertz', 90],
      // ['5 six-ounce containers', 5],
      ['twelve 2-gram containers', 12],
      ['thirty-seven forever-21 stores', 37],
    ].forEach(function (a) {
      var str = nlp(a[0]).values().toNumber().term(0).first().normal();
      a[1] = '' + a[1];
      str_test(str, a[0], a[1], t);
    });
    t.end();
  });

  // T.test('unit:', function(t) {
  //   [
  //     ['five hundred feet', 'feet'],
  //     ['fifty hertz', 'hertz'],
  //     ['100 dollars', 'dollars'],
  //     ['$100', 'dollar'],
  //     ['¥2.5', 'yen'],
  //     ['€3,000,100', 'euro'],
  //     ['EUR 9.99', 'eur'],
  //     ['5 g', 'g'],
  //     ['3 grams', 'gram'],
  //     ['2 inches', 'inch'],
  //     ['2 in', 'in'],
  //     ['5 g sugar', 'g'],
  //     ['10 grams of sugar', 'gram'],
  //     ['fifty inches of snow', 'inch'],
  //   ].forEach(function (a) {
  //     var str = nlp.value(a[0]).unit;
  //     str_test(str, a[0], a[1], t);
  //   });
  //   t.end();
  // });
  //
  // T.test('measurement:', function(t) {
  //   [
  //     ['five hundred feet', 'Distance'],
  //     ['100 kilometers', 'Distance'],
  //     ['fifty hertz', 'Frequency'],
  //     ['59 thousand $', 'Money'],
  //     ['100 mb', 'Data'],
  //     ['50 руб', 'Money'],
  //     ['EUR 9.99', 'Money'],
  //     ['100 dollars', 'Money'],
  //     ['256 bitcoins', 'Money'],
  //   ].forEach(function (a) {
  //     var str = nlp.value(a[0]).measurement;
  //     str_test(str, a[0], a[1], t);
  //   });
  //   t.end();
  // });
  //
  // T.test('of_what:', function(t) {
  //   [
  //     ['nine kg', 'kg'],
  //     ['5 kg of copper', 'copper'],
  //     ['many of these stories', 'many of these stories'],
  //     ['room full of beautiful creatures', 'full of beautiful creatures'],
  //     ['boxes of bags of food', 'boxes of bags of food'],
  //     ['5 boxes of water', 'boxes of water'],
  //     ['6 of kids', 'kids'],
  //     ['10 kids', 'kids'],
  //     ['just nothing', 'just nothing'],
  //     ['EUR 77', 'eur'],
  //     ['kg', 'kg']
  //   ].forEach(function (a) {
  //     var str = nlp.value(a[0]).of_what;
  //     str_test(str, a[0], a[1], t);
  //   });
  //   t.end();
  // });




});

},{"../lib/fns":292,"../lib/nlp":294,"tape":60}],328:[function(require,module,exports){
var test = require('tape');
var nlp = require('../lib/nlp');

var arr = [
  {
    'Infinitive': 'convolute',
    'PresentTense': 'convolutes',
    'Gerund': 'convoluting',
    'PastTense': 'convoluted'
  }, {
    'PresentTense': 'presents',
    'Gerund': 'presenting',
    'PastTense': 'presented',
    'Infinitive': 'present'
  }, {
    'PresentTense': 'angulates',
    'Gerund': 'angulating',
    'PastTense': 'angulated',
    'Infinitive': 'angulate'
  }, {
    'PresentTense': 'conjures',
    'Gerund': 'conjuring',
    'PastTense': 'conjured',
    'Infinitive': 'conjure'
  }, {
    'PresentTense': 'denounces',
    'Gerund': 'denouncing',
    'PastTense': 'denounced',
    'Infinitive': 'denounce'
  }, {
    'PresentTense': 'watches',
    'Gerund': 'watching',
    'PastTense': 'watched',
    'Infinitive': 'watch'
  }, {
    'PresentTense': 'tingles',
    'Gerund': 'tingling',
    'PastTense': 'tingled',
    'Infinitive': 'tingle'
  }, {
    'PresentTense': 'mortises',
    'Gerund': 'mortising',
    'PastTense': 'mortised',
    'Infinitive': 'mortise'
  }, {
    'PresentTense': 'disguises',
    'Gerund': 'disguising',
    'PastTense': 'disguised',
    'Infinitive': 'disguise'
  }, {
    'Infinitive': 'effect',
    'Gerund': 'effecting',
    'PastTense': 'effected',
    'PresentTense': 'effects'
  }, {
    'Infinitive': 'want',
    'Gerund': 'wanting',
    'PastTense': 'wanted',
    'PresentTense': 'wants'
  }, {
    'Infinitive': 'power',
    'Gerund': 'powering',
    'PastTense': 'powered',
    'PresentTense': 'powers'
  }, {
    'Infinitive': 'overcompensate',
    'PresentTense': 'overcompensates',
    'PastTense': 'overcompensated',
    'Gerund': 'overcompensating'
  }, {
    'Infinitive': 'ice',
    'PresentTense': 'ices',
    'PastTense': 'iced',
    'Gerund': 'icing'
  }, {
    'Infinitive': 'buy',
    'PresentTense': 'buys',
    'PastTense': 'bought',
    'Gerund': 'buying'
  }, {
    'Infinitive': 'flower',
    'PresentTense': 'flowers',
    'PastTense': 'flowered',
    'Gerund': 'flowering'
  }, {
    'Infinitive': 'rage',
    'PresentTense': 'rages',
    'PastTense': 'raged',
    'Gerund': 'raging'
  }, {
    'Infinitive': 'drive',
    'PresentTense': 'drives',
    'PastTense': 'drove',
    'Gerund': 'driving'
  }, {
    'Infinitive': 'foul',
    'PresentTense': 'fouls',
    'PastTense': 'fouled',
    'Gerund': 'fouling'
  }, {
    'Infinitive': 'overthrow',
    'PresentTense': 'overthrows',
    'Gerund': 'overthrowing',
    'PastTense': 'overthrew'
  }, {
    'Infinitive': 'aim',
    'PresentTense': 'aims',
    'PastTense': 'aimed',
    'Gerund': 'aiming'
  }, {
    'PresentTense': 'unifies',
    'Gerund': 'unifying',
    'PastTense': 'unified',
    'Infinitive': 'unify'
  }, {
    'PresentTense': 'addresses',
    'Gerund': 'addressing',
    'PastTense': 'addressed',
    'Infinitive': 'address'
  }, {
    'Infinitive': 'bumble',
    'PresentTense': 'bumbles',
    'PastTense': 'bumbled',
    'Gerund': 'bumbling'
  }, {
    'Infinitive': 'snipe',
    'PresentTense': 'snipes',
    'PastTense': 'sniped',
    'Gerund': 'sniping'
  }, {
    'PresentTense': 'relishes',
    'Gerund': 'relishing',
    'PastTense': 'relished',
    'Infinitive': 'relish'
  }, {
    'Infinitive': 'lengthen',
    'Gerund': 'lengthening',
    'PastTense': 'lengthened',
    'PresentTense': 'lengthens'
  }, {
    'Infinitive': 'farm',
    'PresentTense': 'farms',
    'PastTense': 'farmed',
    'Gerund': 'farming'
  },
  // {
  //   'Infinitive': 'develop',
  //   'PresentTense': 'develops',
  //   'PastTense': 'developed',
  //   'Gerund': 'developing'
  // },
  {
    'Infinitive': 'study',
    'PresentTense': 'studies',
    'PastTense': 'studied',
    'Gerund': 'studying'
  },
  {
    'Infinitive': 'criticise',
    'PresentTense': 'criticises',
    'PastTense': 'criticised',
    'Gerund': 'criticising'
  }, {
    'Infinitive': 'speak',
    'PresentTense': 'speaks',
    'PastTense': 'spoke',
    'Gerund': 'speaking',
  }, {
    'Infinitive': 'fuzz',
    'PresentTense': 'fuzzes',
    'PastTense': 'fuzzed',
    'Gerund': 'fuzzing',
  }, {
    'Infinitive': 'invest',
    'PresentTense': 'invests',
    'PastTense': 'invested',
    'Gerund': 'investing'
  }
];
test('conjugation:', function(t) {

  var test_conjugation = function(inf, o, form, original) {
    var msg = 'from ' + original + ' to ' + form + ':  [' + o[original] + '] -> [' + inf[form] + ']';
    t.equal(inf[form], o[form], msg);
  };

  arr.forEach(function(o) {
    var forms = ['Infinitive', 'PastTense', 'PresentTense', 'Gerund'];
    for(var i = 0; i < forms.length; i++) {
      var from = forms[i];
      var inf = nlp(o[from]).tag('Verb').verbs().parse()[0];
      test_conjugation(inf, o, 'Infinitive', from);
      test_conjugation(inf, o, 'PastTense', from);
      test_conjugation(inf, o, 'PresentTense', from);
      test_conjugation(inf, o, 'Gerund', from);
    }
  });
  t.end();
});

},{"../lib/nlp":294,"tape":60}]},{},[289,290,291,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328]);
