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

    // phrases: function (r) {
    //   this.list.forEach((ts) => {
    //     let str = '';
    //     ts.terms.forEach((t) => {
    //       let text = t.out('text');
    //       if (t.tag.ConditionPhrase) {
    //         str += chalk.magenta(text);
    //         return;
    //       }
    //       if (t.tag.NounPhrase) {
    //         str += chalk.cyan(text);
    //         return;
    //       }
    //       if (t.tag.VerbPhrase) {
    //         str += chalk.red(text);
    //         return;
    //       }
    //       if (t.tag.AdjectivePhrase) {
    //         str += chalk.green(text);
    //         return;
    //       }
    //       str += text;
    //     });
    //     console.log('\n' + str);
    //   });
    // },

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

    asArray: function (r) {
      return r.list.map((ts) => ts.out('normal'));
    },

    asHtml: function (r) {
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
  return Text;
};

module.exports = prettyPrint;
