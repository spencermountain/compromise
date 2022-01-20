(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('efrt')) :
  typeof define === 'function' && define.amd ? define(['efrt'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseStats = factory(global.efrt));
})(this, (function (efrt) { 'use strict';

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

  const hasNumber = /[0-9,;!:|¦]/;

  const compile = function (view, opts = {}) {
    let counts = {};
    let total = 0;
    let use = opts.use || 'normal';
    view.docs.forEach(terms => {
      terms.forEach(term => {
        let str = term[use];
        if (str) {
          counts[str] = counts[str] || 0;
          counts[str] += 1;
          total += 1;
        }
      });
    });
    if (total === 0) {
      return {}
    }
    // turn into percentages
    let arr = Object.keys(counts).map(k => {
      let per = counts[k] / total;
      per = Math.round(per * 1000) / 1000; // round to 3 digits
      return [k, per]
    });
    arr = arr.sort((a, b) => {
      if (a[1] > b[1]) {
        return -1
      } else if (a[1] < b[1]) {
        return 1
      }
      return 0
    });
    // remove anything so small
    arr = arr.filter(a => a[1] > 0 && hasNumber.test(a[0]) === false);
    let obj = arr.reduce((h, a) => {
      h[a[0]] = a[1];
      return h
    }, {});
    return obj
  };

  var pcked = {
    "0.052": "true¦the",
    "0.027": "true¦to",
    "0.026": "true¦and",
    "0.023": "true¦a,of",
    "0.018": "true¦in",
    "0.015": "true¦i",
    "0.011": "true¦you",
    "0.01": "true¦for,that",
    "0.009": "true¦i0;s,t",
    "0.008": "true¦this,was",
    "0.007": "true¦on,with",
    "0.006": "true¦he",
    "0.005": "true¦a1b0have,my,not,we;e,ut;s,t",
    "0.004": "true¦a0by,his,me,so,they,your;ll,re",
    "0.003": "true¦an,can,do,from,h4if,just,o2she,up,w0;h0ill;at,en;ne,r,u0;r,t;ad,er",
    "0.002": "true¦about,been,don't,first,gChBi9know,like,mo8n6people,s4t2w0;e7h0ould;ich,o;he0i2oron7;ir,m,n,re;aid,o0;me;ew,o0;!w;re;'m,n0t's;to;as,im;et,o",
    "0.001": "true¦&,a0Vb0Qc0Jd0Ge0Cf0Ag07h04i03k02lWmTnQoOpMrLsItAu7ve0Mw2y0;ea0ou'0S;h,rE;a3e2h1ithout,or0;k,ld;e0OiUy;ll,nt;nt,y;!nd0Ss0;!e0;!d;ake,e8h1o0wo;ld,o,p;a4e0Hin2o1r0;ee,ough;se,uC;g0k;!s;n,t's;a1ee,hould,omethi09ti0uW;ll;me,y;eally,i5;la0rin0ut;ce;ff,h,ld,n0th0Bv0Bwn;ce,ly;ame,e1i0;ght;ed,v07xt;a1o7u0;ch,st;de,ke,nIy;a4e3i1o0;ng,ok,ve;fe,tt0;le;ft,t;st;eep,iP;'5ts;e1o0;me,uOw;lp,re;i1o0reat;iJod,t;ve;iLo0;od,uK;a2ve0;n,r0;!y;ch;ay,id1o0;es,wn;!n5;a3ity,o0;me,u0;ld,nt0rt;ry;ll1me,n0;'t;!ed;ack,e0oth;cau2fo1i0st,tt8;ng;re;se;ft4gain,l3m2n1rou0sk,way;nd;oth2y;!erican;so,ways;er"
  };

  const diff = function (doc, globe) {
    doc.forEach(a => {
      let global = globe[a[0]] || 0;
      a[2] = a[1] - global;
    });
    return doc.sort((a, b) => {
      if (a[2] > b[2]) {
        return -1
      } else if (a[2] < b[2]) {
        return 1
      }
      return 0
    })
  };

  const unzip = function (model) {
    let all = {};
    Object.keys(model).forEach(k => {
      model[k] = efrt.unpack(model[k]);
      let num = Number(k);
      Object.keys(model[k]).forEach(w => {
        all[w] = num;
      });
    });
    return all
  };

  const model = unzip(pcked);


  const addMethods = function (View) {
    View.prototype.tfidf = function (mod) {
      if (!mod) {
        mod = model;
      }
      let freq = Object.entries(compile(this));
      return diff(freq, mod)
    };

    View.prototype.freq = function () {
      return compile(this)
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
