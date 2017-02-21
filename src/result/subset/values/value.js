'use strict';
const paths = require('../../paths');
const Terms = paths.Terms;
const parse = require('./toNumber');
const toText = require('./toText');
const toNiceNumber = require('./toNiceNumber');
const numOrdinal = require('./numOrdinal');
const textOrdinal = require('./textOrdinal');

const isOrdinal = (ts) => {
  let t = ts.terms[ts.terms.length - 1];
  if (!t) {
    return false;
  }
  return t.tag.Ordinal === true;
};
const isText = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    if (ts.terms[i].tag.TextValue) {
      return true;
    }
  }
  return false;
};
const isNumber = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (t.tag.TextValue || t.tag.NiceNumber || !t.tag.NumericValue) {
      return false;
    }
  }
  return true;
};

class Value extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.val = this.match('#Value+').list[0];
    this.unit = this.match('#Unit$').list[0];
  }
  number() {
    let num = parse(this.val);
    return num;
  }
  /** five -> '5' */
  toNumber() {
    let val = this.val;
    // this.debug();
    //is already
    if (isNumber(val)) {
      return this;
    }
    //otherwise,
    if (isOrdinal(val)) {
      let num = numOrdinal(val);
      this.replaceWith(num, 'Value');
    } else {
      let num = parse(val);
      // console.log(num);
      if (num !== null) {
        this.replaceWith('' + num, 'Value');
      }
    }
    return this;
  }
  /**5 -> 'five' */
  toTextValue() {
    let val = this.val;
    //is already
    if (isText(val)) {
      return this;
    }
    //otherwise, parse it
    if (isOrdinal(val)) {
      let str = textOrdinal(val);
      return this.replaceWith(str, 'Value');
    }
    let num = '' + parse(val);
    let str = toText(num).join(' ');
    this.replaceWith(str, 'Value');
    return this;
  }

  /**5th -> 5 */
  toCardinal() {
    let val = this.val;
    //already
    if (!isOrdinal(val)) {
      return this;
    }
    //otherwise,
    if (isText(val)) {
      let num = '' + parse(val);
      let str = toText(num).join(' ');
      return this.replaceWith(str, 'Value');
    }
    let num = '' + parse(val);
    return this.replaceWith(num, 'Value');
  }

  /**5 -> 5th */
  toOrdinal() {
    let val = this.val;
    //already
    if (isOrdinal(val)) {
      return this;
    }
    //otherwise,
    if (isText(val)) {
      let str = textOrdinal(val);
      this.replaceWith(str, 'Value');
    } else {
      //number-ordinal
      let str = numOrdinal(val);
      this.replaceWith(str, 'Value');
    }
    return this;
  }

  /**5900 -> 5,900 */
  toNiceNumber() {
    let num = parse(this);
    let str = toNiceNumber(num);
    this.replaceWith(str, 'Value');
    return this;
  }

  data() {
    let numV = this.clone().toNumber();
    let txtV = this.clone().toTextValue();
    let obj = {
      NumericValue: {
        cardinal: numV.toCardinal().out('text'),
        ordinal: numV.toOrdinal().out('text'),
        nicenumber: this.toNiceNumber().out('text'),
      },
      TextValue : {
        cardinal: txtV.toCardinal().out('text'),
        ordinal: txtV.toOrdinal().out('text'),
      },
      unit: ''
    };
    if (this.unit) {
      obj.unit = this.unit.out('text');
    }
    obj.number = this.number();
    return obj;
  }
}
Value.prototype.clone = function() {
  let terms = this.terms.map((t) => {
    return t.clone();
  });
  return new Value(terms, this.lexicon, this.refText, this.refTerms);
};
module.exports = Value;
