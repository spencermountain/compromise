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
  text() {
    return this.terms().reduce((str, t) => {
      return str + t.toText();
    }, '');
  }
}
module.exports = Phrase;
