const eachTerm = function(doc, fn) {
  doc.list.forEach(p => {
    p.terms().forEach(t => t[fn]());
  });
  return doc;
};

module.exports = {
  verbose: function(bool) {
    if (bool === undefined) {
      bool = true;
    }
    this.world.verbose = bool;
  },
  toTitleCase: function() {
    return eachTerm(this, 'toTitleCase');
  },
  toLowerCase: function() {
    return eachTerm(this, 'toLowerCase');
  },
  toUpperCase: function() {
    return eachTerm(this, 'toUpperCase');
  },
  toCamelCase: function() {
    this.toTitleCase();
    this.list.forEach(p => {
      //remove whitespace
      p.terms().forEach((t, i) => {
        if (i !== 0) {
          t.preText = '';
        }
        t.postText = '';
      });
    });
    this.tag('#CamelCase', 'toCamelCase');
    return this;
  },
  termList: function() {
    return this.list.reduce((arr, p) => {
      let terms = p.terms();
      arr = arr.concat(terms);
      return arr;
    }, []);
  },
  firstTerm: function() {
    let list = this.list.map(p => {
      let term = p.terms(0);
      return p.buildFrom([term]);
    });
    return this.buildFrom(list);
  },
  lastTerm: function() {
    let list = this.list.map(p => {
      let term = p.lastTerm();
      return p.buildFrom([term]);
    });
    return this.buildFrom(list);
  }
};
