/* compromise-typeahead 0.1.0 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseTypeahead = factory());
}(this, (function () { 'use strict';

  var tryPrefix = function tryPrefix(doc, lex) {
    var world = doc.world; // get end-part of text

    var end = doc.last();
    var m = end.terms().last();
    var json = m.json({
      terms: {
        normal: true
      }
    })[0].terms[0]; // if we've already put whitespace, end.

    if (json.post) {
      return;
    } // if we found something


    if (world.prefixes.hasOwnProperty(json.normal)) {
      var found = world.prefixes[json.normal]; // add full-word as an implicit result

      m.termList()[0].implicit = found; // tag it too?

      if (lex.hasOwnProperty(found)) {
        m.tag(lex[found], 'typeahead');
      }
    }
  };

  var tryPrefix_1 = tryPrefix;

  // generate all the possible prefixes up-front
  var createIndex = function createIndex(arr, opts, world) {
    var index = {};
    var collisions = [];
    arr.forEach(function (str) {
      str = str.toLowerCase().trim();
      var max = str.length;

      if (opts.max && max > opts.max) {
        max = opts.max;
      }

      var min = opts.min;

      for (var size = min; size < max; size += 1) {
        var prefix = str.substr(0, size); // ensure prefix is not a word

        if (opts.safe && world.words.hasOwnProperty(prefix)) {
          continue;
        }

        if (index.hasOwnProperty(prefix) === true) {
          collisions.push(prefix);
        }

        index[prefix] = str;
      }
    }); // remove ambiguous-prefixes

    collisions.forEach(function (str) {
      delete index[str];
    });
    return index;
  };

  var getPrefixes = createIndex;

  var isObject = function isObject(obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Object]';
  };

  var defaults = {
    safe: true,
    min: 3
  };

  var plugin = function plugin(Doc, world, _nlp) {
    /** add words that can be predicted from their prefix */
    _nlp.typeahead = function () {
      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var lex = {};
      opts = Object.assign({}, defaults, opts); // wiggle-out our params

      if (isObject(arr)) {
        lex = arr;
        arr = Object.keys(lex);
      } // pre-compute all prefixes


      world.prefixes = getPrefixes(arr, opts, world); // each keypress, try the end

      world.postProcess(function (doc) {
        tryPrefix_1(doc, lex);
      });
    }; // alias


    _nlp.typeAhead = Doc.prototype.typeahead;
  };

  var src = plugin;

  return src;

})));
//# sourceMappingURL=compromise-typeahead.js.map
