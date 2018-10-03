const makeId = require('./_id');
const parseTerm = function(str) {
  return {
    text: str.trim(),
    normal: str.toLowerCase().trim(),
    root: '',
    preText: '',
    postText: '',
  };
};

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
  toText() {
    return this.preText + this.text + this.postText + ' ';
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
}
module.exports = Term;
