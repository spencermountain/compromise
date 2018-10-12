const matchAll = require('./match');
const tagger = require('../tagger');

class Doc {
  constructor(list, from, world ) {
    this.list = list;
    //quiet these properties in console.logs
    Object.defineProperty(this, 'from', {
      enumerable: false,
      value: from
    });
    //try this..
    if (world === undefined && from !== undefined) {
      world = from.world;
    }
    Object.defineProperty(this, 'world', {
      enumerable: false,
      value: world
    });
  }
  tagger() {
    return tagger(this);
  }

  //pool is stored on phrase objects
  pool() {
    if (this.list.length > 0) {
      return this.list[0].pool;
    }
    return this.all().list[0].pool;
  }
  //go up one
  parent() {
    if (this.from) {
      return this.from;
    }
    return this;
  }
  //return a list of all parents
  parents() {
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
    return this.parents()[0];
  }

}

//return a new Doc, with us as a parent
Doc.prototype.match = function(str) {
  let matches = matchAll(this, str);
  return new Doc(matches, this, this.world);
};


const methods = [
  require('./easy'),
  require('./hard'),
  require('./utilities'),
  require('./out'),
];
methods.forEach((obj) => Object.assign(Doc.prototype, obj));


//fancy match statements
const sub = require('../subs');
const Nouns = sub.buildNoun(Doc);
Doc.prototype.nouns = function() {
  let matches = sub.findNouns(this);
  return new Nouns(matches.list, this);
};

module.exports = Doc;
