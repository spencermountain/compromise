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
  number() {
    let num = parse(this);
    return num;
  }
  /** five -> '5' */
  toNumber() {
    //is already
    if (isNumber(this)) {
      return this;
    }
    //otherwise,
    if (isOrdinal(this)) {
      let num = numOrdinal(this);
      this.replaceWith(num, 'Value');
    } else {
      let num = parse(this);
      if (num !== null) {
        this.replaceWith('' + num, 'Value');
      }
    }
    return this;
  }
  /**5 -> 'five' */
  toTextValue() {
    //is already
    if (isText(this)) {
      return this;
    }
    //otherwise, parse it
    if (isOrdinal(this)) {
      let str = textOrdinal(this);
      return this.replaceWith(str, 'Value');
    }
    let num = '' + parse(this);
    let str = toText(num).join(' ');
    return this.replaceWith(str, 'Value');
  }

  /**5th -> 5 */
  toCardinal() {
    //already
    if (!isOrdinal(this)) {
      return this;
    }
    //otherwise,
    if (isText(this)) {
      let num = '' + parse(this);
      let str = toText(num).join(' ');
      return this.replaceWith(str, 'Value');
    }
    let num = '' + parse(this);
    return this.replaceWith(num, 'Value');
  }

  /**5 -> 5th */
  toOrdinal() {
    //already
    if (isOrdinal(this)) {
      return this;
    }
    //otherwise,
    if (isText(this)) {
      let str = textOrdinal(this);
      this.replaceWith(str, 'Value');
    } else {
      //number-ordinal
      let str = numOrdinal(this);
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
      }
    };
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
