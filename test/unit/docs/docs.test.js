var test = require('tape');
var nlp = require('../lib/nlp');
var docs = require('../../../docs/api');
var freshPrince = require('../lib/freshPrince');

test('generic-methods-run:', function(t) {
  var getters = {
    found: true,
    length: true
  };
  var skip = {
    whitespace: true,
    insertAt: true,
    debug: true, //too noisy
    forEach: true,
    filter: true,
    map: true,
    find: true,
    reduce: true,
  };
  var needString = {
    insertBefore: true,
    insertAfter: true,
    match: true,
    splitOn: true,
    splitBefore: true,
    splitAfter: true
  };

  var r = nlp(freshPrince);
  Object.keys(docs.generic).forEach(function(type) {
    Object.keys(docs.generic[type]).forEach(function(fn) {
      //simply call this method to see if it throws an error
      var func = function() {
        if (getters[fn]) {
          //getters dont have a '()'
          return r[fn];
        } else if (needString[fn]) {
          //give a dummy param
          return r[fn]('fun');
        } else if (skip[fn]) {
          //these are too fancy to call
          return typeof r[fn] === 'function';
        } else {
          //call this method
          return r[fn]();
        }
      };

      t.doesNotThrow(func, true, fn);
    });
  });
  t.end();
});

test('subsets-methods-exist:', function(t) {
  var addParam = {
    sentences: {
      append: true,
      prepend: true
    }
  };
  var r = nlp(freshPrince);
  Object.keys(docs.subsets).forEach(function(subset) {
    //each subset
    t.doesNotThrow(function() {
      return r[subset](), true, subset + '()';
    });
    //each method in that subset
    Object.keys(docs.subsets[subset]).forEach(function(method) {
      var func = function() {
        if (addParam[subset] && addParam[subset][method]) {
          r[subset]()[method]('fun');
        } else {
          r[subset]()[method]();
        }
      };
      var msg = subset + '().' + method;
      t.doesNotThrow(func, true, msg);
    });
  });
  t.end();
});
