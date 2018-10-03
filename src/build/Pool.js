class Pool {
  constructor() {
    this.words = {};
  }
  add(term) {
    this.words[term.id] = term;
    return this;
  }
  get(id) {
    return this.words[id];
  }
}
module.exports = Pool;
