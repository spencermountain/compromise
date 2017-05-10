'use strict';
const paths = require('../../paths');
const Terms = paths.Terms;
const parse = require('./parse');
const fmt = require('./format');

const unpackRange = function(ts) {
  if (ts.has('#NumberRange')) {
    ts.terms.forEach((t) => {
      if (t.silent_term && !t._text) {
        t.text = t.silent_term;
      }
    });
  }
  return ts;
};

const Value = function(arr, lexicon, refText, refTerms) {
  Terms.call(this, arr, lexicon, refText, refTerms);
  this.val = this.match('#Value+').list[0];
  this.val = unpackRange(this.val);
  this.unit = this.match('#Unit$');
  if (this.unit.found) {
    this.unit = this.unit.list[0];
  }
};

const isPercent = function(val, unit) {
  //pre-tagged
  if (val.has('#Percent') || unit.has('#Percent')) {
    return true;
  }
  // 'five percent'
  if (unit.out('normal') === 'percent') {
    return true;
  }
  //'5%'
  if (val.out('normal').match(/%$/) !== null) {
    return true;
  }
  return false;
};


//Terms inheritence
Value.prototype = Object.create(Terms.prototype);

const methods = {
  data: function() {
    let num = parse(this.val);
    return {
      number: num,
      nice: fmt.nice(num),
      ordinal: fmt.ordinal(num),
      niceOrdinal: fmt.niceOrdinal(num),
      text: fmt.text(num),
      textOrdinal: fmt.textOrdinal(num),
      unit: this.unit.out('normal')
    };
  },
  number: function() {
    return parse(this.val);
  },
  // /** five -> '5' */
  toNumber: function() {
    let num = parse(this.val);
    if (num !== null) {
      let str = '';
      if (this.val.has('#Ordinal')) {
        str = fmt.ordinal(num);
      } else {
        str = '' + num;
        if (isPercent(this.val, this.unit)) {
          str = str + '%';
          this.unit.delete();
        }
      }
      this.replaceWith(str, true).tag('NumericValue');
    // this.tag('NumericValue','toNumber');
    }
    return this;
  },
  // /**5 -> 'five' */
  toText: function() {
    let num = parse(this.val);
    if (num !== null) {
      let str = '';
      if (this.val.has('#Ordinal')) {
        str = fmt.textOrdinal(num);
      } else {
        str = fmt.text(num);
        //add percent
        if (isPercent(this.val, this.unit)) {
          str = str + ' percent';
        }
      }
      this.replaceWith(str, true).tag('TextValue');
    }
    return this;
  },
  //
  // /**5th -> 5 */
  toCardinal: function() {
    let num = parse(this.val);
    if (num !== null) {
      let str = '';
      if (this.val.has('#TextValue')) {
        str = fmt.text(num);
      } else {
        str = num;
      }
      this.replaceWith(str, true).tag('Cardinal');
    }
    return this;
  },
  //
  // /**5 -> 5th */
  toOrdinal: function() {
    let num = parse(this.val);
    if (num !== null) {
      let str = '';
      if (this.val.has('#TextValue')) {
        str = fmt.textOrdinal(num);
      } else {
        str = fmt.ordinal(num);
      }
      this.replaceWith(str, true).tag('Ordinal');
    }
    return this;
  },
  //
  // /**5900 -> 5,900 */
  toNice: function() {
    let num = parse(this.val);
    if (num !== null) {
      let str = '';
      if (this.val.has('#Ordinal')) {
        str = fmt.niceOrdinal(num);
      } else {
        str = fmt.nice(num);
      }
      this.replaceWith(str, true).tag('NumericValue');
    }
    return this;
  }
};


Object.keys(methods).forEach((k) => {
  Value.prototype[k] = methods[k];
});
module.exports = Value;
