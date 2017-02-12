var test = require('tape');
var nlp = require('../lib/nlp');
var docs = require('../../../docs/api');
var freshPrince = require('../lib/freshPrince');

const getters = {
  found: true,
  length: true,
};
const skip = {
  whitespace: true,
  insertAt: true,
  debug: true //too noisy
};
const needString = {
  insertBefore: true,
  insertAfter: true,
  match: true,
  splitOn: true,
  splitBefore: true,
  splitAfter: true,
};

test('generic-methods-run:', function (t) {
  var r = nlp(freshPrince);
  Object.keys(docs.generic).forEach((fn) => {

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
  t.end();
});

test('subsets-methods-exist:', function (t) {
  var r = nlp(freshPrince);
  Object.keys(docs.subsets).forEach((subset) => {
    //each subset
    t.doesNotThrow(() => r[subset](), true, subset + '()');
    //each method in that subset
    Object.keys(docs.subsets[subset]).forEach((method) => {
      var func = function() {
        r[subset]()[method]();
      };
      var msg = subset + '().' + method;
      t.doesNotThrow(func, true, msg);
    });
  });
  t.end();
});
