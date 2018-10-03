class Doc {
  constructor( list = [] , from ) {
    this.list = list;
    Object.defineProperty(this, 'from', {
      enumerable: false,
      value: from
    });
  }
  //go up one
  parent() {
    if (this.from) {
      return this.from;
    }
    return this;
  }
  //return a list of all parents
  stack() {
    let arr = [];
    const addParent = function(doc) {
      if (doc.from) {
        arr.push(doc.from);
        addParent(doc.from);
      }
    };
    addParent(this);
    return arr.reverse();
  }
  //return first document
  all() {
    return this.stack()[0];
  }

  text( options = {} ) {
    return this.list.reduce((str, p) => str + p.text(options), '');
  }
  json( options = {} ) {
    return this.list.map((p) => p.json(options));
  }
}

//return a new Doc, with us as a parent
Doc.prototype.match = function(str) {
  let matches = this.list.reduce((arr, p) => {
    return arr.concat(p.match(str));
  }, []);
  return new Doc(matches, this);
};

const sub = require('../subclass');
const Nouns = sub.buildNoun(Doc);
Doc.prototype.nouns = function() {
  let matches = sub.findNouns(this);
  return new Nouns(matches.list, this);
};

module.exports = Doc;
