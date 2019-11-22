(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.nlp = factory());
}(this, (function () { 'use strict';

  var addMethods = function addMethods(Doc) {
    /** smart-replace based on tense, inflection, and part-of-speech */
    Doc.prototype.swap = function (match, replace) {
      return this;
    };
  };

  var src = addMethods;

  return src;

})));
//# sourceMappingURL=compromise-swap.js.map
