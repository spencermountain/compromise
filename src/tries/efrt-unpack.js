/* efrt trie-compression v0.0.5  github.com/nlp-compromise/efrt  - MIT */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.unpack = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';
const BASE = 36;

const seq = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const cache = seq.split('').reduce((h, c, i) => {
  h[c] = i;
  return h;
}, {});

// 0, 1, 2, ..., A, B, C, ..., 00, 01, ... AA, AB, AC, ..., AAA, AAB, ...
const toAlphaCode = function(n) {
  if (seq[n] !== undefined) {
    return seq[n];
  }
  let places = 1;
  let range = BASE;
  let s = '';

  for (; n >= range; n -= range, places++, range *= BASE) {
  }
  while (places--) {
    const d = n % BASE;
    s = String.fromCharCode((d < 10 ? 48 : 55) + d) + s;
    n = (n - d) / BASE;
  }
  return s;
};


const fromAlphaCode = function(s) {
  if (cache[s] !== undefined) {
    return cache[s];
  }
  let n = 0;
  let places = 1;
  let range = BASE;
  let pow = 1;

  for (; places < s.length; n += range, places++, range *= BASE) {
  }
  for (let i = s.length - 1; i >= 0; i--, pow *= BASE) {
    let d = s.charCodeAt(i) - 48;
    if (d > 10) {
      d -= 7;
    }
    n += d * pow;
  }
  return n;
};

module.exports = {
  toAlphaCode: toAlphaCode,
  fromAlphaCode: fromAlphaCode
};

},{}],2:[function(_dereq_,module,exports){
'use strict';
const Ptrie = _dereq_('./ptrie');

const unpack = (str) => {
  return new Ptrie(str);
};
module.exports = unpack;

},{"./ptrie":4}],3:[function(_dereq_,module,exports){
'use strict';

//are we on the right path with this string?
const isPrefix = function(str, want) {
  //allow perfect equals
  if (str === want) {
    return true;
  }
  //compare lengths
  let len = str.length;
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

},{}],4:[function(_dereq_,module,exports){
'use strict';
const encoding = _dereq_('../encoding');
const isPrefix = _dereq_('./prefix');
const unravel = _dereq_('./unravel');

//PackedTrie - Trie traversal of the Trie packed-string representation.
class PackedTrie {
  constructor(str) {
    this.nodes = str.split(';'); //that's all ;)!
    this.syms = [];
    this.symCount = 0;
    this._cache = null;
    //process symbols, if they have them
    if (str.match(':')) {
      this.initSymbols();
    }
  }

  //the symbols are at the top of the array.
  initSymbols() {
    //... process these lines
    const reSymbol = new RegExp('([0-9A-Z]+):([0-9A-Z]+)');
    for(let i = 0; i < this.nodes.length; i++) {
      const m = reSymbol.exec(this.nodes[i]);
      if (!m) {
        this.symCount = i;
        break;
      }
      this.syms[encoding.fromAlphaCode(m[1])] = encoding.fromAlphaCode(m[2]);
    }
    //remove from main node list
    this.nodes = this.nodes.slice(this.symCount, this.nodes.length);
  }

  // Return largest matching string in the dictionary (or '')
  has(want) {
    //fail-fast
    if (!want) {
      return false;
    }
    //then, try cache-lookup
    if (this._cache) {
      return this._cache[want] || false;
    }
    const crawl = (index, prefix) => {
      let node = this.nodes[index];
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
      const matches = node.split(/([A-Z0-9,]+)/g);
      for (let i = 0; i < matches.length; i += 2) {
        const str = matches[i];
        const ref = matches[i + 1];
        if (!str) {
          continue;
        }
        const have = prefix + str;
        //we're at the branch's end, so try to match it
        if (ref === ',' || ref === undefined) {
          if (have === want) {
            return true;
          }
          continue;
        }
        //ok, not a match.
        //well, should we keep going on this branch?
        //if we do, we ignore all the others here.
        if (isPrefix(have, want)) {
          index = this.indexFromRef(ref, index);
          return crawl(index, have);
        }
        //nah, lets try the next branch..
        continue;
      }

      return false;
    };
    return crawl(0, '');
  }

  // References are either absolute (symbol) or relative (1 - based)
  indexFromRef(ref, index) {
    const dnode = encoding.fromAlphaCode(ref);
    if (dnode < this.symCount) {
      return this.syms[dnode];
    }
    return index + dnode + 1 - this.symCount;
  }

  toArray() {
    return Object.keys(this.toObject());
  }
  toObject() {
    if (this._cache) {
      return this._cache;
    }
    return unravel(this);
  }
  cache() {
    this._cache = unravel(this);
    this.nodes = null;
    this.syms = null;
  }

}

module.exports = PackedTrie;

},{"../encoding":1,"./prefix":3,"./unravel":5}],5:[function(_dereq_,module,exports){
'use strict';

//spin-out all words from this trie
const unRavel = (trie) => {
  let all = {};
  const crawl = function(index, prefix) {
    let node = trie.nodes[index];
    if (node[0] === '!') {
      all[prefix] = true;
      node = node.slice(1); //ok, we tried. remove it.
    }
    let matches = node.split(/([A-Z0-9,]+)/g);
    for (let i = 0; i < matches.length; i += 2) {
      let str = matches[i];
      let ref = matches[i + 1];
      if (!str) {
        continue;
      }

      let have = prefix + str;
      //branch's end
      if (ref === ',' || ref === undefined) {
        all[have] = true;
        continue;
      }
      let newIndex = trie.indexFromRef(ref, index);
      crawl(newIndex, have);
    }
  };
  crawl(0, '');
  return all;
};
module.exports = unRavel;

},{}]},{},[2])(2)
});