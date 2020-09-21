'use strict';

//individual manipulations of the text
const transformations = {
  dedup: (s) => {
    return s.replace(/([^c])\1/g, '$1');
  },
  dropInitialLetters: (s) => {
    if (s.match(/^(kn|gn|pn|ae|wr)/)) {
      return s.substr(1, s.length - 1);
    }
    return s;
  },
  dropBafterMAtEnd: (s) => {
    return s.replace(/mb$/, 'm');
  },
  cchange: (s) => {
    s = s.replace(/([^s]|^)(c)(h)/g, '$1x$3').trim();
    s = s.replace(/cia/g, 'xia');
    s = s.replace(/c(i|e|y)/g, 's$1');
    return s.replace(/c/g, 'k');
  },
  dchange: (s) => {
    s = s.replace(/d(ge|gy|gi)/g, 'j$1');
    return s.replace(/d/g, 't');
  },
  dropG: (s) => {
    s = s.replace(/gh(^$|[^aeiou])/g, 'h$1');
    return s.replace(/g(n|ned)$/g, '$1');
  },
  changeG: (s) => {
    s = s.replace(/gh/g, 'f');
    s = s.replace(/([^g]|^)(g)(i|e|y)/g, '$1j$3');
    s = s.replace(/gg/g, 'g');
    return s.replace(/g/g, 'k');
  },
  dropH: (s) => {
    return s.replace(/([aeiou])h([^aeiou]|$)/g, '$1$2');
  },
  changeCK: (s) => {
    return s.replace(/ck/g, 'k');
  },
  changePH: (s) => {
    return s.replace(/ph/g, 'f');
  },
  changeQ: (s) => {
    return s.replace(/q/g, 'k');
  },
  changeS: (s) => {
    return s.replace(/s(h|io|ia)/g, 'x$1');
  },
  changeT: (s) => {
    s = s.replace(/t(ia[^n]|io)/g, 'x$1');
    return s.replace(/th/, '0');
  },
  dropT: (s) => {
    return s.replace(/tch/g, 'ch');
  },
  changeV: (s) => {
    return s.replace(/v/g, 'f');
  },
  changeWH: (s) => {
    return s.replace(/^wh/, 'w');
  },
  dropW: (s) => {
    return s.replace(/w([^aeiou]|$)/g, '$1');
  },
  changeX: (s) => {
    s = s.replace(/^x/, 's');
    return s.replace(/x/g, 'ks');
  },
  dropY: (s) => {
    return s.replace(/y([^aeiou]|$)/g, '$1');
  },
  changeZ: (s) => {
    return s.replace(/z/, 's');
  },
  dropVowels: (s) => {
    return s; //.charAt(0) + s.substr(1, s.length).replace(/[aeiou]/g, '');
  }
};
module.exports = transformations;