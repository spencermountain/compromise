/* compromise-pronounce 0.0.3 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseRedact = factory());
}(this, (function () { 'use strict';

  //individual manipulations of the text
  var transformations = {
    dedup: function dedup(s) {
      return s.replace(/([^c])\1/g, '$1');
    },
    dropInitialLetters: function dropInitialLetters(s) {
      if (s.match(/^(kn|gn|pn|ae|wr)/)) {
        return s.substr(1, s.length - 1);
      }

      return s;
    },
    dropBafterMAtEnd: function dropBafterMAtEnd(s) {
      return s.replace(/mb$/, 'm');
    },
    cchange: function cchange(s) {
      s = s.replace(/([^s]|^)(c)(h)/g, '$1x$3').trim();
      s = s.replace(/cia/g, 'xia');
      s = s.replace(/c(i|e|y)/g, 's$1');
      return s.replace(/c/g, 'k');
    },
    dchange: function dchange(s) {
      s = s.replace(/d(ge|gy|gi)/g, 'j$1');
      return s.replace(/d/g, 't');
    },
    dropG: function dropG(s) {
      s = s.replace(/gh(^$|[^aeiou])/g, 'h$1');
      return s.replace(/g(n|ned)$/g, '$1');
    },
    changeG: function changeG(s) {
      s = s.replace(/gh/g, 'f');
      s = s.replace(/([^g]|^)(g)(i|e|y)/g, '$1j$3');
      s = s.replace(/gg/g, 'g');
      return s.replace(/g/g, 'k');
    },
    dropH: function dropH(s) {
      return s.replace(/([aeiou])h([^aeiou]|$)/g, '$1$2');
    },
    changeCK: function changeCK(s) {
      return s.replace(/ck/g, 'k');
    },
    changePH: function changePH(s) {
      return s.replace(/ph/g, 'f');
    },
    changeQ: function changeQ(s) {
      return s.replace(/q/g, 'k');
    },
    changeS: function changeS(s) {
      return s.replace(/s(h|io|ia)/g, 'x$1');
    },
    changeT: function changeT(s) {
      s = s.replace(/t(ia[^n]|io)/g, 'x$1'); // return s.replace(/th/, '0')

      return s;
    },
    dropT: function dropT(s) {
      return s.replace(/tch/g, 'ch');
    },
    changeV: function changeV(s) {
      return s.replace(/v/g, 'f');
    },
    changeWH: function changeWH(s) {
      return s.replace(/^wh/, 'w');
    },
    dropW: function dropW(s) {
      return s.replace(/w([^aeiou]|$)/g, '$1');
    },
    changeX: function changeX(s) {
      s = s.replace(/^x/, 's');
      return s.replace(/x/g, 'ks');
    },
    dropY: function dropY(s) {
      return s.replace(/y([^aeiou]|$)/g, '$1');
    },
    changeZ: function changeZ(s) {
      return s.replace(/z/, 's');
    },
    dropVowels: function dropVowels(s) {
      return s; //.charAt(0) + s.substr(1, s.length).replace(/[aeiou]/g, '');
    }
  };
  var transformations_1 = transformations;

  //adapted from the work of Chris Umbel
  // https://github.com/NaturalNode/natural/blob/master/lib/natural/phonetics/metaphone.js

  var metaphone = function metaphone(s) {
    s = transformations_1.dedup(s);
    s = transformations_1.dropInitialLetters(s);
    s = transformations_1.dropBafterMAtEnd(s);
    s = transformations_1.changeCK(s);
    s = transformations_1.cchange(s);
    s = transformations_1.dchange(s);
    s = transformations_1.dropG(s);
    s = transformations_1.changeG(s);
    s = transformations_1.dropH(s);
    s = transformations_1.changePH(s);
    s = transformations_1.changeQ(s);
    s = transformations_1.changeS(s);
    s = transformations_1.changeX(s);
    s = transformations_1.changeT(s);
    s = transformations_1.dropT(s);
    s = transformations_1.changeV(s);
    s = transformations_1.changeWH(s);
    s = transformations_1.dropW(s);
    s = transformations_1.dropY(s);
    s = transformations_1.changeZ(s);
    s = transformations_1.dropVowels(s);
    return s.trim();
  };

  var metaphone_1 = metaphone;

  /** adds .numbers() method */

  var plugin = function plugin(Doc) {
    Doc.prototype.pronounce = function () {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      opts.normal = true;
      var json = this.json(opts);
      json.forEach(function (obj) {
        obj.pronounce = metaphone_1(obj.normal);
      });
      return json;
    };
  };

  var src = plugin;

  return src;

})));
//# sourceMappingURL=compromise-pronounce.js.map
