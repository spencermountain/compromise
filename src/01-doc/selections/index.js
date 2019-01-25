
//simpler selection methods
const find = {
  people: (doc) => {
    var m = doc.clauses();
    return m.match('#Person+');
  },
  terms: (doc) => {
    return doc.match('.');
  }
};

module.exports = {
  terms: {
    find: find.terms,
    subclass: require('./terms/Term')
  },
  nouns: {
    find: require('./nouns'),
    subclass: require('./nouns/Noun')
  },
  people: {
    find: find.people,
    subclass: require('./people/Person')
  },
  values: {
    find: require('./values'),
    subclass: require('./values/Value')
  },
};
