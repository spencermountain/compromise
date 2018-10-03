const eachTerm = function(doc, fn) {
  doc.list.forEach((p) => {
    p.terms().forEach(t => t[fn]());
  });
  return doc;
};

module.exports = {
  toTitleCase: function() {
    return eachTerm(this, 'toTitleCase');
  },
  toLowerCase: function() {
    return eachTerm(this, 'toLowerCase');
  },
  toUpperCase: function() {
    return eachTerm(this, 'toUpperCase');
  },
  // output
  text: function( options = {} ) {
    return this.list.reduce((str, p) => str + p.text(options), '');
  },
  json: function( options = {} ) {
    return this.list.map((p) => p.json(options));
  },
  array: function( options = {} ) {
    return this.list.map((p) => p.text(options));
  }
};
