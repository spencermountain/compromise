'use strict';
const paths = require('../../paths');
const Terms = paths.Terms;
const parse = require('./toNumber');
const toText = require('./toText');
const toNiceNumber = require('./toNiceNumber');
const numOrdinal = require('./numOrdinal');
const textOrdinal = require('./textOrdinal');

const Value = function(arr, lexicon, refText, refTerms) {
  Terms.call(this, arr, lexicon, refText, refTerms);
  this.val = this.match('#Value+').list[0];
  this.unit = this.match('#Unit$').list[0];
};
//Terms inheritence
Value.prototype = Object.create(Terms.prototype);


const isOrdinal = (ts) => {
  let t = ts.terms[ts.terms.length - 1];
  if (!t) {
    return false;
  }
  return t.tags.Ordinal === true;
};
const isText = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    if (ts.terms[i].tags.TextValue) {
      return true;
    }
  }
  return false;
};
const isNumber = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (t.tags.TextValue || t.tags.NiceNumber || !t.tags.NumericValue) {
      return false;
    }
  }
  return true;
};


const methods = {
  number: function() {
    let num = parse(this.val);
    return num;
  },
  /** five -> '5' */
  toNumber: function() {
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
  },
  /**5 -> 'five' */
  toTextValue: function() {
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
  },

  /**5th -> 5 */
  toCardinal: function() {
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
  },

  /**5 -> 5th */
  toOrdinal: function() {
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
  },

  /**5900 -> 5,900 */
  toNiceNumber: function() {
    let num = parse(this);
    let str = toNiceNumber(num);
    this.replaceWith(str, 'Value');
    return this;
  },

  data: function() {
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
  },
  clone : function() {
    let terms = this.terms.map((t) => {
      return t.clone();
    });
    return new Value(terms, this.lexicon, this.refText, this.refTerms);
  }
};


Object.keys(methods).forEach((k) => {
  Value.prototype[k] = methods[k];
});
module.exports = Value;
