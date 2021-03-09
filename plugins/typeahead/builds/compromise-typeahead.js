/* compromise-typeahead 0.0.1 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseTypeahead = factory());
}(this, (function () { 'use strict';

  var minSize = 3;

  var isObject = function isObject(obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Object]';
  };

  var allPrefixes = function allPrefixes(arr) {

    var obj = {};
    arr.forEach(function (str) {
      str = str.toLowerCase().trim();

      for (var i = minSize; i < str.length; i += 1) {
        var prefix = str.substr(0, i);
        obj[prefix] = str;
      }
    });
    return obj;
  };

  var plugin = function plugin(Doc, world, _nlp) {
    _nlp.typeahead = function () {
      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var lex = {};

      if (isObject(arr)) {
        lex = arr;
        arr = Object.keys(lex);
      }

      world.prefixes = allPrefixes(arr);
      world.postProcess(function (doc) {
        // get end-part of text
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
      });
    }; // alias


    _nlp.typeAhead = Doc.prototype.typeahead;
  };

  var src = plugin;

  return src;

})));
//# sourceMappingURL=compromise-typeahead.js.map
