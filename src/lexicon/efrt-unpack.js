(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.unpack = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  NODE_SEP: ';',
  STRING_SEP: ',',
  TERMINAL_PREFIX: '!',
  BASE: 36
};

},{}],2:[function(_dereq_,module,exports){
'use strict';

var config = _dereq_('./config');

var seq = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var cache = seq.split('').reduce(function (h, c, i) {
  h[c] = i;
  return h;
}, {});
// console.log(cache);

// 0, 1, 2, ..., A, B, C, ..., 00, 01, ... AA, AB, AC, ..., AAA, AAB, ...
var toAlphaCode = function toAlphaCode(n) {
  if (seq[n] !== undefined) {
    return seq[n];
  }
  var places = 1;
  var range = config.BASE;
  var s = '';

  for (; n >= range; n -= range, places++, range *= config.BASE) {}
  while (places--) {
    var d = n % config.BASE;
    s = String.fromCharCode((d < 10 ? 48 : 55) + d) + s;
    n = (n - d) / config.BASE;
  }
  return s;
};

var fromAlphaCode = function fromAlphaCode(s) {
  if (cache[s] !== undefined) {
    return cache[s];
  }
  var n = 0;
  var places = 1;
  var range = config.BASE;
  var pow = 1;

  for (; places < s.length; n += range, places++, range *= config.BASE) {}
  for (var i = s.length - 1; i >= 0; i--, pow *= config.BASE) {
    var d = s.charCodeAt(i) - 48;
    if (d > 10) {
      d -= 7;
    }
    n += d * pow;
  }
  return n;
};

/* Sort elements and remove duplicates from array (modified in place) */
var unique = function unique(a) {
  a.sort();
  for (var i = 1; i < a.length; i++) {
    if (a[i - 1] === a[i]) {
      a.splice(i, 1);
    }
  }
};

var commonPrefix = function commonPrefix(w1, w2) {
  var len = Math.min(w1.length, w2.length);
  while (len > 0) {
    var prefix = w1.slice(0, len);
    if (prefix === w2.slice(0, len)) {
      return prefix;
    }
    len -= 1;
  }
  return '';
};

module.exports = {
  toAlphaCode: toAlphaCode,
  fromAlphaCode: fromAlphaCode,
  unique: unique,
  commonPrefix: commonPrefix
};

// let out = fromAlphaCode('A');
// console.log(out);
// console.log(fromAlphaCode(out));
// console.log(fromAlphaCode('R'));

},{"./config":1}],3:[function(_dereq_,module,exports){
'use strict';

var Ptrie = _dereq_('./ptrie');
// const Ptrie = require('./ptrie_old');

var unpack = function unpack(str) {
  return new Ptrie(str);
};
module.exports = unpack;

},{"./ptrie":5}],4:[function(_dereq_,module,exports){
'use strict';

//are we on the right path with this string?

var isPrefix = function isPrefix(str, want) {
  //allow perfect equals
  if (str === want) {
    return true;
  }
  //compare lengths
  var len = str.length;
  if (len >= want.length) {
    return false;
  }
  //quick slice
  if (len === 1) {
    return str === want[0];
  }
  return want.slice(0, len) === str;
};
module.exports = isPrefix;
// console.log(isPrefix('harvar', 'harvard'));

},{}],5:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = _dereq_('../config');
var fns = _dereq_('../fns');
var isPrefix = _dereq_('./prefix');

//PackedTrie - Trie traversal of the Trie packed-string representation.

var PackedTrie = function () {
  function PackedTrie(str) {
    _classCallCheck(this, PackedTrie);

    this.nodes = str.split(config.NODE_SEP); //that's all ;)!
    this.syms = [];
    this.symCount = 0;
    //process symbols, if they have them
    if (str.match(':')) {
      this.initSymbols();
    }
  }

  //the symbols are at the top of the array.


  _createClass(PackedTrie, [{
    key: 'initSymbols',
    value: function initSymbols() {
      //... process these lines
      var reSymbol = new RegExp('([0-9A-Z]+):([0-9A-Z]+)');
      for (var i = 0; i < this.nodes.length; i++) {
        var m = reSymbol.exec(this.nodes[i]);
        if (!m) {
          this.symCount = i;
          break;
        }
        this.syms[fns.fromAlphaCode(m[1])] = fns.fromAlphaCode(m[2]);
      }
      //remove from main node list
      this.nodes = this.nodes.slice(this.symCount, this.nodes.length);
    }

    // Return largest matching string in the dictionary (or '')

  }, {
    key: 'has',
    value: function has(want) {
      var _this = this;

      // console.log(this.nodes);
      //fail-fast
      if (!want) {
        return false;
      }
      var crawl = function crawl(inode, prefix) {
        var node = _this.nodes[inode];
        //the '!' means a prefix-alone is a good match
        if (node[0] === '!') {
          //try to match the prefix (the last branch)
          if (prefix === want) {
            return true;
          }
          node = node.slice(1); //ok, we tried. remove it.
        }
        //each possible match on this line is something like 'me,me2,me4'.
        //try each one
        var matches = node.split(/([A-Z0-9,]+)/g);
        for (var i = 0; i < matches.length; i += 2) {
          var str = matches[i];
          var ref = matches[i + 1];
          if (!str) {
            continue;
          }
          var have = prefix + str;
          //we're at the branch's end, so try to match it
          if (ref === ',' || ref === undefined) {
            if (have === want) {
              // console.log('::end');
              return true;
            }
            continue;
          }
          //ok, not a match.
          //well, should we keep going on this branch?
          //if we do, we ignore all the others here.
          if (isPrefix(have, want)) {
            inode = _this.inodeFromRef(ref, inode);
            return crawl(inode, have);
          }
          //nah, lets try the next branch..
          continue;
        }

        return false;
      };
      return crawl(0, '');
    }

    // References are either absolute (symbol) or relative (1 - based)

  }, {
    key: 'inodeFromRef',
    value: function inodeFromRef(ref, inode) {
      var dnode = fns.fromAlphaCode(ref);
      if (dnode < this.symCount) {
        return this.syms[dnode];
      }
      return inode + dnode + 1 - this.symCount;
    }
  }]);

  return PackedTrie;
}();

module.exports = PackedTrie;

},{"../config":1,"../fns":2,"./prefix":4}]},{},[3])(3)
});