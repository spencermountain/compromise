'use strict';
const is_acronym = require('./is_acronym');
const match_term = require('../match/match_term');
const syntax_parse = require('../match/syntax_parse');
const implied = require('./implied');

class Term {
  constructor(str, tag, whitespace) {
    //don't pass non-strings through here any further..
    if (typeof str === 'number') {
      str = '' + str;
    } else if (typeof str !== 'string') {
      str = '';
    }
    str = (str).toString();
    //trailing & preceding whitespace
    this.whitespace = whitespace || {};
    this.whitespace.preceding = this.whitespace.preceding || '';
    this.whitespace.trailing = this.whitespace.trailing || '';
    //set .text
    this.text = str;
    //the normalised working-version of the word
    this.normal = '';
    //if it's a contraction or slang, the implication, or 'hidden word'
    this.expansion = '';
    //set .normal
    this.rebuild();
    //the reasoning behind it's part-of-speech
    this.reasoning = [];
    //these are orphaned POS that have no methods
    this.pos = {};
    this.tag = tag || '?';
    if (tag) {
      this.pos[tag] = true;
    }
  }

  //when the text changes, rebuild derivative fields
  rebuild() {
    this.text = this.text || '';
    this.text = this.text.trim();

    this.normal = '';
    this.normalize();
    this.expansion = implied(this.normal);
  }
  changeTo(str) {
    this.text = str;
    this.rebuild();
  }
  //a regex-like string search
  match(match_str, options) {
    let reg = syntax_parse([match_str]);
    return match_term(this, reg[0], options);
  }
  //the 'root' singular/infinitive/whatever.
  // method is overloaded by each pos type
  root() {
    return this.strip_apostrophe();
  }
  //strip apostrophe s
  strip_apostrophe() {
    if (this.normal.match(/[a-z]'[a-z][a-z]?$/)) {
      let split = this.normal.split(/'/);
      if (split[1] === 's') {
        return split[0];
      }
    }
    return this.normal;
  }

  has_comma() {
    if (this.text.match(/,$/)) {
      return true;
    }
    return false;
  }
  has_abbreviation() {
    // "spencer's"
    if (this.text.match(/[a-z]'[a-z][a-z]?$/)) {
      return true;
    }
    // "flanders' house"
    if (this.text.match(/[a-z]s'$/)) {
      return true;
    }
    return false;
  }

  is_capital() {
    if (this.text.match(/[A-Z][a-z]/)) {
      return true;
    }
    return false;
  }
  //utility method to avoid lumping words with non-word stuff
  is_word() {
    if (this.text.match(/^\[.*?\]\??$/)) {
      return false;
    }
    if (!this.text.match(/[a-z|0-9]/i)) {
      return false;
    }
    if (this.text.match(/[\|#\<\>]/i)) {
      return false;
    }
    return true;
  }
  //FBI or F.B.I.
  is_acronym() {
    return is_acronym(this.text);
  }
  //working word
  normalize() {
    let str = this.text || '';
    str = str.toLowerCase();
    //strip grammatical punctuation
    str = str.replace(/[,\.!:;\?\(\)^$]/g, '');
    //hashtags, atmentions
    str = str.replace(/^[#@]/, '');
    //convert hyphenations to a multiple-word term
    str = str.replace(/([a-z])\-([a-z])/g, '$1 $2');
    // coerce single curly quotes
    str = str.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]+/g, '\'');
    // coerce double curly quotes
    str = str.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]+/g, '');
    //remove quotations + scare-quotes
    str = str.replace(/^'/g, '');
    str = str.replace(/'$/g, '');
    str = str.replace(/"/g, '');
    if (!str.match(/[a-z0-9]/i)) {
      return '';
    }
    this.normal = str;
    return this.normal;
  }

  all_forms() {
    return {};
  }

}
Term.fn = Term.prototype;

module.exports = Term;
