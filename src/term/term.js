'use strict';
const syllables = require('./syllables');
const is_acronym = require('./is_acronym');
const americanize = require('./localization/toAmerican');
const britishize = require('./localization/toBritish');

class Term {
  constructor(str, tag) {
    this.changeTo(str);
    this.reason = '';
    let types = {
      Determiner: 'Determiner',
      Conjunction: 'Conjunction',
      Preposition: 'Preposition',
      Posessive: 'Posessive',
    };
    this.pos = {};
    this.tag = types[tag] || '?';
  }

  changeTo(str) {
    str = str || '';
    this.text = str.trim();
    this.normal = '';
    this.normalize();
  }

  //Term methods..
  is_capital() {
    if (this.text.match(/[A-Z][a-z]/)) { //tranditional capital
      return true;
    }
    return false;
  }
  is_acronym() {
    return is_acronym(this.text);
  }

  normalize() {
    let str = this.text || '';
    str = str.toLowerCase();
    str = str.replace(/[,\.!:;\?\(\)]/, '');
    str = str.replace(/’/g, '\'');
    str = str.replace(/"/g, '');
    // coerce single curly quotes
    str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, '\'');
    // coerce double curly quotes
    str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '"');
    if (!str.match(/[a-z0-9]/i)) {
      return '';
    }
    this.normal = str;
    return this.normal;
  }
  americanize() {
    return americanize(this.normal);
  }
  britishize() {
    return britishize(this.normal);
  }
  syllables() {
    return syllables(this.normal);
  }
}

// let t = new Term('NSA');
// console.log(t.britishize());

module.exports = Term;
