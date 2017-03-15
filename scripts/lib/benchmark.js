'use strict';
const corpus = require('nlp-corpus');
const filesize = require('./filesize');
const path = require('path');
let start;
let end;
let src = path.join(__dirname, '../../builds/compromise.min.js');

const benchmark = function(cb) {
  var obj = {};
  setTimeout(() => {

    //init
    start = new Date().getTime();
    const nlp = require(src);
    end = new Date().getTime();
    obj.init = end - start;

    //small parse
    start = new Date().getTime();
    var m = nlp('spencer kelly and dr. spencer kelly');
    end = new Date().getTime();
    obj.sentence = end - start;

    //small match
    start = new Date().getTime();
    m.match('#Person').out();
    end = new Date().getTime();
    obj.match = end - start;

    (() => {
      let str = corpus.poe.parsed()[5];

      //big parse
      start = new Date().getTime();
      let m2 = nlp(str);
      end = new Date().getTime();
      obj.big = end - start;

      //big match
      start = new Date().getTime();
      m2.match('#Person').out('normal');
      end = new Date().getTime();
      obj.bigMatch = end - start;

      obj.size = filesize(src);
      cb(obj);
    })();

  }, 200);
};
module.exports = benchmark;
