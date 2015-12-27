'use strict';
const syllables = require('./syllables');
const is_acronym = require('./is_acronym');
const americanize = require('./localization/to_american');
const britishize = require('./localization/to_british');

class Term {
  constructor(str, tag) {
    if (str === null || str === undefined) {
      str = '';
    }
    str = (str).toString();
    this.changeTo(str);
    this.reason = '';
    //orphaned POS that have no methods
    let types = {
      Determiner: 'Determiner',
      Conjunction: 'Conjunction',
      Preposition: 'Preposition',
      Posessive: 'Posessive',
    };
    this.pos = {};
    this.tag = types[tag] || '?';
    if (types[tag]) {
      this.pos[types[tag]] = true;
    }
  }

  //when the text changes, rebuild derivative fields
  rebuild() {
    this.text = this.text || '';
    this.text = this.text.trim();
    this.normal = '';
    this.normalize();
  }
  changeTo(str) {
    this.text = str;
    this.rebuild();
  }

  //Term methods..
  is_capital() {
    if (this.text.match(/[A-Z][a-z]/)) { //tranditional capital
      return true;
    }
    return false;
  }
  //FBI or F.B.I.
  is_acronym() {
    return is_acronym(this.text);
  }
  //working word
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

Term.fn = Term.prototype;
// let t = new Term('NSA');
// console.log(t.britishize());

module.exports = Term;
