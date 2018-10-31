const matchAll = require('./match');

class Phrase {
  constructor(id, length, pool) {
    this.start = id;
    this.length = length;
    Object.defineProperty(this, 'pool', {
      enumerable: false,
      writable: true,
      value: pool
    });
  }
  terms() {
    let terms = [this.pool.get(this.start)];
    if (this.length === 0) {
      return [];
    }
    for(let i = 0; i < this.length - 1; i += 1) {
      let id = terms[terms.length - 1].next;
      if (id === null) {
        console.warn('linked-list broken');
        break;
      }
      let term = this.pool.get(id);
      terms.push(term);
    }
    return terms;
  }
  hasId(id) {
    let terms = this.terms();
    return terms.find(t => t.id === id) !== undefined;
  }
  text( options = {} ) {
    return this.terms().reduce((str, t) => {
      return str + t.toText(options);
    }, '');
  }
  normal() {
    return this.terms().map((t) => t.normal).join(' ');
  }
  json( options = {} ) {
    let out = {};
    out.text = this.text();
    out.normal = this.normal();
    if (options.terms !== false) {
      out.terms = this.terms().map((t) => t.json(options));
    }
    return out;
  }
}
//  ¯\_(:/)_/¯
Phrase.prototype.clone = function() { //how do we clone part of the pool?
  let terms = this.terms();
  let newTerms = terms.map((t) => t.clone());
  //connect these new ids up
  newTerms.forEach((t, i) => {
    //add it to the pool..
    this.pool.add(t);
    if (newTerms[i + 1]) {
      t.next = newTerms[i + 1].id;
    }
    if (newTerms[i - 1]) {
      t.prev = newTerms[i - 1].id;
    }
  });
  return new Phrase(newTerms[0].id, newTerms.length, this.pool);
};

Phrase.prototype.match = function(str) {
  let matches = matchAll(this, str);
  //make them phrase objects
  matches = matches.map((list) => {
    return new Phrase(list[0].id, list.length, this.pool);
  });
  return matches;
};
// Phrase.prototype.fromId = function(id) {
//   if (!this.pool.get(id)) {
//     return null;
//   }
//   return new Phrase(id, 1, this.pool);
// };
// Phrase.prototype.build = function(id, length) {
//   return new Phrase(id, length, this.pool);
// };

const methods = [
  require('./hard'),
];
methods.forEach((obj) => Object.assign(Phrase.prototype, obj));


module.exports = Phrase;
