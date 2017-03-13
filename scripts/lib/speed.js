'use strict';
const corpus = require('nlp-corpus');
let start;
let end;

const benchmark = function(cb) {
  var obj = {};
  setTimeout(() => {

    start = new Date().getTime();
    const nlp = require('../../src/index');
    end = new Date().getTime();
    obj.init = end - start;

    start = new Date().getTime();
    var m = nlp('spencer kelly and dr. spencer kelly');
    end = new Date().getTime();
    obj.sentence = end - start;

    start = new Date().getTime();
    m.match('#Person').out();
    end = new Date().getTime();
    obj.match = end - start;

    (() => {
      let str = corpus.poe.parsed()[5];

      start = new Date().getTime();
      let m2 = nlp(str);
      end = new Date().getTime();
      obj.big = end - start;

      start = new Date().getTime();
      m2.match('#Person').out('normal');
      end = new Date().getTime();
      obj.bigMatch = end - start;
      cb(obj);
    })();

  }, 200);
};
module.exports = benchmark;
