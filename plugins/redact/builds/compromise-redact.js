/* compromise-redact 0.0.3 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseRedact = factory());
}(this, (function () { 'use strict';

  var randChar = function randChar(_char) {
    var len = Math.random() * 10;
    len = Math.ceil(len);
    var str = '';

    for (var i = 0; i < len; i++) {
      str += _char;
    }

    return str;
  };

  var doProp = function doProp(doc, prop, options, tag) {
    // not false
    if (options[prop]) {
      var m = doc[prop](); // replace with custom char of random length

      if (typeof options[prop] === 'string') {
        if (options[prop].length === 1) {
          m.replaceWith(randChar(options[prop]));
        } else {
          m.replaceWith(options[prop]);
        }
      } // support a custom function
      else if (typeof options[prop] === 'function') {
          var fn = options[prop];
          m.replaceWith(fn(m));
        } // optionally, tag the replacement


      if (tag) {
        m.tag(tag, 'redact-' + prop);
      }
    }
  };

  var redact = function redact(doc, options) {
    doProp(doc, 'dates', options, 'Date');
    doProp(doc, 'numbers', options, 'Value');
    doProp(doc, 'money', options, 'Money');
    doProp(doc, 'people', options, 'Person');
    doProp(doc, 'places', options, 'Place');
    doProp(doc, 'organizations', options, 'Organization');
    return doc;
  };

  var redact_1 = redact;

  var defaults = {
    dates: '▇',
    numbers: false,
    money: '▇',
    people: '▇',
    places: '▇',
    organizations: '▇'
  };

  var addMethod = function addMethod(Doc) {
    /** remove or obfuscate certain parts of the text */
    Doc.prototype.redact = function (options) {
      options = Object.assign({}, defaults, options);
      return redact_1(this, options);
    };

    return Doc;
  };

  var src = addMethod;

  return src;

})));
//# sourceMappingURL=compromise-redact.js.map
