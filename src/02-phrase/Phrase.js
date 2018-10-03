class Phrase {
  constructor(id, length, pool) {
    this.start = id;
    this.length = length;
    Object.defineProperty(this, 'pool', {
      enumerable: false,
      value: pool
    });
  }
  terms() {
    let terms = [this.pool.get(this.start)];
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
Phrase.prototype.match = function(str) {
  let matches = [];
  let terms = this.terms();
  for(let i = 0; i < terms.length; i += 1) {
    if (typeof str === 'string' && terms[i].normal === str) {
      matches.push([terms[i]]);
    } else if (str.includes(terms[i].normal)) {
      matches.push([terms[i]]);
    }
  }
  //make them phrase objects
  matches = matches.map((list) => {
    return new Phrase(list[0].id, list.length, this.pool);
  });
  return matches;
};
module.exports = Phrase;
