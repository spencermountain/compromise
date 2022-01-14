(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseStats = factory());
})(this, (function () { 'use strict';

  const defaults$2 = {
    max: 4,
    min: 1,
  };

  const oneSize$2 = function (list, size) {
    let grams = {};
    // count each instance
    list.forEach(terms => {
      for (let i = 0; i < terms.length; i += 1) {
        let slice = terms.slice(i, i + size);
        if (slice.length === size) {
          let str = slice.join(' ');
          if (grams.hasOwnProperty(str)) {
            grams[str].count += 1;
          } else {
            grams[str] = {
              size: size,
              count: 1,
            };
          }
        }
      }
    });
    // turn them into an array
    let arr = Object.keys(grams).map(k => {
      grams[k].normal = k;
      return grams[k]
    });
    return arr
  };

  const allGrams = function (list, options) {
    // support {size:2} syntax
    if (options.size) {
      options.min = options.size;
      options.max = options.size;
    }
    let max = options.max || defaults$2.max;
    let min = options.min || defaults$2.min;
    let arr = [];
    for (let size = min; size <= max; size += 1) {
      arr = arr.concat(oneSize$2(list, size));
    }
    return arr
  };

  const defaults$1 = {
    max: 4,
    min: 1,
  };

  const oneSize$1 = function (list, size) {
    let grams = {};
    // count each instance
    list.forEach(terms => {
      for (let i = 0; i <= terms.length; i += 1) {
        let slice = terms.slice(0, i);
        if (slice.length === size) {
          let str = slice.join(' ');
          if (grams.hasOwnProperty(str)) {
            grams[str].count += 1;
          } else {
            grams[str] = {
              size: size,
              count: 1,
            };
          }
        }
      }
    });
    // turn them into an array
    let arr = Object.keys(grams).map(k => {
      grams[k].normal = k;
      return grams[k]
    });
    return arr
  };

  const startGrams = function (list, options) {
    // support {size:2} syntax
    if (options.size) {
      options.min = options.size;
      options.max = options.size;
    }
    let max = options.max || defaults$1.max;
    let min = options.min || defaults$1.min;
    let arr = [];
    for (let size = min; size <= max; size++) {
      arr = arr.concat(oneSize$1(list, size));
    }
    return arr
  };

  const defaults = {
    max: 4,
    min: 1,
  };

  const oneSize = function (list, size) {
    let grams = {};
    // count each instance
    list.forEach(terms => {
      let len = terms.length;
      for (let i = 0; i <= terms.length; i += 1) {
        let slice = terms.slice(len - i, len);
        if (slice.length === size) {
          let str = slice.join(' ');
          if (grams.hasOwnProperty(str)) {
            grams[str].count += 1;
          } else {
            grams[str] = {
              size: size,
              count: 1,
            };
          }
        }
      }
    });
    // turn them into an array
    let arr = Object.keys(grams).map(k => {
      grams[k].normal = k;
      return grams[k]
    });
    return arr
  };

  const endGrams = function (list, options) {
    // support {size:2} syntax
    if (options.size) {
      options.min = options.size;
      options.max = options.size;
    }
    let max = options.max || defaults.max;
    let min = options.min || defaults.min;
    let arr = [];
    for (let size = min; size <= max; size++) {
      arr = arr.concat(oneSize(list, size));
    }
    return arr
  };

  // tokenize by term
  const tokenize = function (doc) {
    let list = doc.json({ text: false }).map(o => {
      return o.terms.map(t => t.normal)
    });
    return list
  };

  const sort = function (arr) {
    arr = arr.sort((a, b) => {
      //first sort them by count
      if (a.count > b.count) {
        return -1
      }
      if (a.count < b.count) {
        return 1
      }
      // in a tie, sort them by size
      if (a.size > b.size) {
        return -1
      }
      if (a.size < b.size) {
        return 1
      }
      return 0
    });
    return arr
  };

  const addMethod = function (View) {
    /** list all repeating sub-phrases, by word-count */
    View.prototype.ngrams = function (obj) {
      let list = tokenize(this);
      let arr = allGrams(list, obj || {});
      arr = sort(arr);
      return arr
    };
    View.prototype.nGrams = View.prototype.ngrams;
    View.prototype.ngram = View.prototype.ngrams;

    /** n-grams with one word */
    View.prototype.unigrams = function (n) {
      let arr = allGrams(tokenize(this), { max: 1, min: 1 });
      arr = sort(arr);
      if (typeof n === 'number') {
        arr = arr[n];
      }
      return arr
    };
    View.prototype.uniGrams = View.prototype.unigrams;

    /** n-grams with two words */
    View.prototype.bigrams = function (n) {
      let arr = allGrams(tokenize(this), { max: 2, min: 2 });
      arr = sort(arr);
      if (typeof n === 'number') {
        arr = arr[n];
      }
      return arr
    };
    View.prototype.biGrams = View.prototype.bigrams;

    /** n-grams with three words */
    View.prototype.trigrams = function (n) {
      let arr = allGrams(tokenize(this), { max: 3, min: 3 });
      arr = sort(arr);
      if (typeof n === 'number') {
        arr = arr[n];
      }
      return arr
    };
    View.prototype.triGrams = View.prototype.trigrams;

    /** list all repeating sub-phrases, using the first word */
    View.prototype.startgrams = function (obj) {
      let list = tokenize(this);
      let arr = startGrams(list, obj || {});
      arr = sort(arr);
      return arr
    };
    View.prototype.startGrams = View.prototype.startgrams;

    /** list all repeating sub-phrases, connected to the last word of each phrase */
    View.prototype.endgrams = function (obj) {
      let list = tokenize(this);
      let arr = endGrams(list, obj || {});
      arr = sort(arr);
      return arr
    };
    View.prototype.endGrams = View.prototype.endgrams;

    /** list all repeating sub-phrases, connected to the last word of each phrase */
    View.prototype.edgegrams = function (obj) {
      let list = tokenize(this);
      let start = startGrams(list, obj || {});
      let end = endGrams(list, obj || {});
      // combine them together
      let all = start.concat(end);
      let combine = all.reduce((h, a) => {
        if (h[a.normal]) {
          h[a.normal].count += a.count;
        } else {
          h[a.normal] = a;
        }
        return h
      }, {});
      let arr = Object.keys(combine).map(k => combine[k]);
      arr = sort(arr);
      return arr
    };
    View.prototype.edgeGrams = View.prototype.edgegrams;
  };

  const addMethods = function (View) {
    View.prototype.tfidf = function (model) {
      let arr = [];
      return arr
    };
  };

  const api = function (View) {
    addMethod(View);
    addMethods(View);
  };

  var plugin = {
    api
  };

  return plugin;

}));
