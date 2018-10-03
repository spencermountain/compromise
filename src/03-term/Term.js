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
  tag(tag) {
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

//  ¯\_(:/)_/¯
Term.prototype.clone = function() {
  let term = new Term(this.text);
  term.preText = this.preText;
  term.postText = this.postText;
  term.tags = this.tags.slice(0);
  return term;
};

const methods = [
  require('./easy'),
];
methods.forEach((obj) => Object.assign(Term.prototype, obj));


module.exports = Term;
