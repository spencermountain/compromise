'use strict';
const paths = require('../../paths');
const Terms = paths.Terms;
const parse = require('./toNumber');
const toText = require('./toText');
const toNiceNumber = require('./toNiceNumber');

const numOrdinal = require('./numOrdinal');
const textOrdinal = require('./textOrdinal');

const isOrdinal = (ts) => {
  let t = ts.lastTerm();
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
  return !isText(ts);
};

class Value extends Terms {
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
      let num = '' + parse(this);
      this.replaceWith(num, 'Value');
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
      this.replaceWith(str, 'Value');
    } else {
      let num = '' + parse(this);
      let words = toText(num);
      return this.replaceWith(words.join(' '), 'Value');
    }
    return this;
  }

  /**5th -> 5 */
  toCardinal() {
    //already
    if (!isOrdinal(this)) {
      return this;
    }
    //otherwise,
    if (isText(this)) {
      let str = toText(this);
      this.replaceWith(str, 'Value');
    } else {
      let num = '' + parse(this);
      this.replaceWith(num, 'Value');
    }
    return this;
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

  parse() {
    // let numV = this.toNumber();
    // console.log(numV.normal());
    // let txtV = this.toTextValue();
    // console.log(txtV.normal());
    return {
      // NumericValue: {
      //   cardinal: this.toNumber().toCardinal().normal(),
      //   ordinal: this.toNumber().toOrdinal().normal(),
      // },
      // TextValue: {
      //   cardinal: this.toTextValue().toCardinal().normal(),
      //   ordinal: this.toTextValue().toOrdinal().normal(),
      //   nicenumber: this.toNiceNumber().normal(),
      // }
    };
  }
}
Value.prototype.clone = function() {
  let terms = this.terms.map((t) => {
    return t.clone();
  });
  return new Value(terms, this.lexicon, this.parent, this.parentTerms);
};
module.exports = Value;
