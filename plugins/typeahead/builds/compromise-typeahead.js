/* compromise-typeahead 0.3.1 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseTypeahead = factory());
}(this, (function () { 'use strict';

  const tryPrefix = function (doc, lex) {
    let world = doc.world;
    world.prefixes = world.prefixes || {}; // get end-part of text

    let end = doc.last();
    let m = end.terms().last();
    let json = m.json({
      terms: {
        normal: true
      }
    });

    if (!json[0] || !json[0].terms) {
      return;
    }

    json = json[0].terms[0]; // if we've already put whitespace, end.

    if (json.post) {
      return;
    } // if we found something


    if (world.prefixes.hasOwnProperty(json.normal)) {
      let found = world.prefixes[json.normal]; // add full-word as an implicit result

      m.termList()[0].implicit = found;
      m.termList()[0].typeAhead = true; // tag it too?

      if (lex.hasOwnProperty(found)) {
        m.tag(lex[found], 'typeahead');
      }
    }
  };

  var tryPrefix_1 = tryPrefix;

  // generate all the possible prefixes up-front
  const createIndex = function (arr, opts, world) {
    let index = {};
    let collisions = [];
    let existing = world.prefixes || {};
    arr.forEach(str => {
      str = str.toLowerCase().trim();
      let max = str.length;

      if (opts.max && max > opts.max) {
        max = opts.max;
      }

      for (let size = opts.min; size < max; size += 1) {
        let prefix = str.substr(0, size); // ensure prefix is not a word

        if (opts.safe && world.words.hasOwnProperty(prefix)) {
          continue;
        } // does it already exist?


        if (existing.hasOwnProperty(prefix) === true) {
          collisions.push(prefix);
          continue;
        }

        if (index.hasOwnProperty(prefix) === true) {
          collisions.push(prefix);
          continue;
        }

        index[prefix] = str;
      }
    }); // merge with existing prefixes

    index = Object.assign({}, existing, index); // remove ambiguous-prefixes

    collisions.forEach(str => {
      delete index[str];
    });
    return index;
  };

  var getPrefixes = createIndex;

  const isObject = function (obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Object]';
  };

  const defaults = {
    safe: true,
    min: 3
  };

  const plugin = function (Doc, world, _nlp) {
    /** add words that can be predicted from their prefix */
    _nlp.typeahead = function (arr = [], opts = {}) {
      let lex = {};
      opts = Object.assign({}, defaults, opts); // wiggle-out our params

      if (isObject(arr)) {
        lex = arr;
        arr = Object.keys(lex);
      } // pre-compute all prefixes


      world.prefixes = getPrefixes(arr, opts, world); // each keypress, try the end

      world.postProcess(doc => {
        tryPrefix_1(doc, lex);
      });
    }; //assume the typeahead as a full-word


    Doc.prototype.autoFill = function () {
      this.termList().forEach(t => {
        if (t.typeAhead === true && t.implicit) {
          t.set(t.implicit);
          t.implicit = null;
          t.typeAhead = undefined;
        }
      });
    }; // alias


    _nlp.typeAhead = Doc.prototype.typeahead;
  };

  var src = plugin;

  return src;

})));
//# sourceMappingURL=compromise-typeahead.js.map
