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
  termList: function() {
    return this.list.reduce((arr, p) => {
      let terms = p.terms();
      arr = arr.concat(terms);
      return arr;
    }, []);
  },
  // output
  text: function( options = {} ) {
    return this.list.reduce((str, p) => str + p.text(options), '');
  },
  json: function( options = {} ) {
    return this.list.map(p => p.json(options));
  },
  array: function( options = {} ) {
    return this.list.map(p => p.text(options));
  }
};
