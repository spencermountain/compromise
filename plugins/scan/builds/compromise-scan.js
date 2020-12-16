/* compromise-scan 0.1.1 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseScan = factory());
}(this, (function () { 'use strict';

  // edited by Spencer Kelly
  // credit to https://github.com/BrunoRB/ahocorasick by Bruno Roberto Búrigo.
  // object v. array
  var isObject = function isObject(obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Object]';
  }; // turn an array or object into a compressed aho-corasick structure


  var buildTrie = function buildTrie(keywords) {
    var values = [];
    var isObj = isObject(keywords);

    if (isObj === true) {
      keywords = Object.keys(keywords).map(function (k) {
        values.push(keywords[k]);
        return k;
      });
    }

    var gotoFn = {
      0: {}
    };
    var output = {};
    var state = 0;
    keywords.forEach(function (word, w) {
      var value = true;

      if (values[w] !== undefined) {
        value = values[w];
      }

      var curr = 0;
      var words = word.split(/ /g);

      for (var i = 0; i < words.length; i++) {
        var l = words[i];

        if (gotoFn[curr] && l in gotoFn[curr]) {
          curr = gotoFn[curr][l];
        } else {
          state++;
          gotoFn[curr][l] = state;
          gotoFn[state] = {};
          curr = state;
          output[state] = [];
        }
      }

      output[curr] = [{
        len: words.length,
        value: value
      }];
    });
    var failure = {};
    var xs = []; // f(s) = 0 for all states of depth 1 (the ones from which the 0 state can transition to)

    for (var l in gotoFn[0]) {
      state = gotoFn[0][l];
      failure[state] = 0;
      xs.push(state);
    }

    while (xs.length) {
      var r = xs.shift(); // for each symbol a such that g(r, a) = s

      for (var _l in gotoFn[r]) {
        var s = gotoFn[r][_l];
        xs.push(s); // set state = f(r)

        state = failure[r];

        while (state > 0 && !(_l in gotoFn[state])) {
          state = failure[state];
        }

        if (_l in gotoFn[state]) {
          var fs = gotoFn[state][_l];
          failure[s] = fs;
          output[s] = output[s].concat(output[fs]);
        } else {
          failure[s] = 0;
        }
      }
    }

    return {
      isObj: isObj,
      gotoFn: gotoFn,
      output: output,
      failure: failure
    };
  };

  var build = buildTrie;

  // follow our trie structure
  var scanWords = function scanWords(terms, trie) {
    var state = 0;
    var results = [];

    for (var i = 0; i < terms.length; i++) {
      var l = terms[i].reduced;

      if (trie.gotoFn[state] === undefined) {
        trie.gotoFn[state] = [];
      }

      while (state > 0 && !(l in trie.gotoFn[state])) {
        state = trie.failure[state];
      }

      if (!(l in trie.gotoFn[state])) {
        continue;
      }

      state = trie.gotoFn[state][l];

      if (trie.output[state] !== undefined) {
        var arr = trie.output[state];

        for (var o = 0; o < arr.length; o++) {
          var obj = arr[o];
          var start = terms[i - obj.len + 1];
          results.push({
            id: start.id,
            len: obj.len,
            value: obj.value
          });
        }
      }
    }

    return results;
  };

  var scan = function scan(doc, trie) {
    var results = []; // do each phrase

    for (var i = 0; i < doc.list.length; i++) {
      var words = doc.list[i].terms() || [];
      var found = scanWords(words, trie);

      if (found.length > 0) {
        results = results.concat(found);
      }
    }

    var byVal = {};
    var p = doc.list[0];
    results.forEach(function (obj) {
      byVal[obj.value] = byVal[obj.value] || [];
      byVal[obj.value].push(p.buildFrom(obj.id, obj.len));
    });
    Object.keys(byVal).forEach(function (k) {
      byVal[k] = doc.buildFrom(byVal[k]);
    }); // return object-format

    if (trie.isObj === true) {
      return byVal;
    } // return array format


    return byVal[true] || [];
  };

  var scan_1 = scan;

  var addMethod = function addMethod(Doc, world, nlp) {
    /** turn an array or object into a compressed trie*/
    nlp.buildTrie = function (obj) {
      return build(obj);
    };
    /** find all matches in this document */


    Doc.prototype.scan = function (trie) {
      // cache it first
      if (!this._cache || this._cache.set !== true) {
        this.cache();
      }

      return scan_1(this, trie);
    };

    return Doc;
  };

  var src = addMethod;

  return src;

})));
//# sourceMappingURL=compromise-scan.js.map
