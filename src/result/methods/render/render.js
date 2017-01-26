'use strict';
const chalk = require('chalk');

const prettyPrint = (Text) => {

  const methods = {

    check: function (r) {
      console.log('====');
      r.list.forEach((ts) => {
        console.log('   --');
        ts.check();
      });
      return this;
    },

    /** a character-perfect form*/
    text: function (r) {
      return r.list.reduce((str, ts) => {
        str += ts.out('text');
        return str;
      }, '');
    },

    /** a human-readable form*/
    normal: function (r) {
      return r.list.map((ts) => {
        let str = ts.out('normal');
        let last = ts.last();
        if (last) {
          let punct = last.endPunctuation();
          if (punct === '.' || punct === '!' || punct === '?') {
            str += punct;
          }
        }
        return str;
      }).join(' ');
    },

    /** a computer-focused, more aggressive normalization than normal()*/
    root: function (r) {
      return r.list.map((ts) => {
        return ts.out('root');
      }).join(' ');
    },

    data: function(r) {
      return r.list.map((ts) => {
        return {
          normal: ts.out('normal'),
          text: ts.out('text')
        };
      });
    },

    terms: function(r) {
      let arr = [];
      r.list.forEach((ts) => {
        ts.terms.forEach((t) => {
          arr.push({
            normal: t.normal,
            text: t.text,
            tags: Object.keys(t.tag)
          });
        });
      });
      return arr;
    },

    array: function (r) {
      return r.list.map((ts) => ts.out('normal'));
    },

    html: function (r) {
      let html = r.list.map((ts) => ts.out('html'));
      return '<span>' + html + '</span>';
    },

  };
  Text.prototype.out = function(str) {
    if (methods[str]) {
      return methods[str](this);
    }
    return methods['text'](this);
  };
  Text.prototype.check = function() {
    methods.check(this);
    return this;
  };
  Text.prototype.data = function() {
    return methods.data(this);
  };
  return Text;
};

module.exports = prettyPrint;
