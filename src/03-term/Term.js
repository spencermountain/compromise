const makeId = require('./_id');
const parseTerm = require('./parse');

class Term {
  constructor( text = '' ) {
    text = String(text);
    let obj = parseTerm(text);
    this.text = obj.text || '';
    this.normal = obj.normal || '';
    this.root = obj.root || '';
    this.preText = obj.preText || '';
    this.postText = obj.postText || '';
    this.tags = [];
    this.prev = null;
    this.next = null;
    this.id = makeId(this.normal);
  }
  addTag(tag) {
    this.tags.push(tag);
    return this;
  }
  unTag(tag) {
    this.tags = this.tags.filter((t) => t !== tag);
    return this;
  }
  hasComma() {
    return this.postText.includes(',');
  }
  hasPeriod() {
    return this.postText.includes('.');
  }
  hasExclamation() {
    return this.postText.includes('!');
  }
  hasQuestionMark() {
    return this.postText.includes('?');
  }
  startsQuote() {
    return this.preText.includes('"');
  }
  endsQuote() {
    return this.postText.includes('"');
  }
  startsParentheses() {
    return this.preText.includes('(');
  }
  endsParentheses() {
    return this.postText.includes(')');
  }

  toText() {
    return this.preText + this.text + this.postText + ' ';
  }
  json( options = {} ) {
    let out = {};
    let defaultOn = ['text', 'normal', 'tags'];
    defaultOn.forEach((k) => {
      if (options[k] !== false) {
        out[k] = this[k];
      }
    });
    let defaultOff = ['preText', 'postText'];
    defaultOff.forEach((k) => {
      if (options[k] === true) {
        out[k] = this[k];
      }
    });
    return out;
  }
}
module.exports = Term;
