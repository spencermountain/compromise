
//simpler selection methods
const find = {
  people: (doc) => {
    var m = doc.clauses();
    return m.match('#Person+');
  },
  terms: (doc) => {
    return doc.match('.');
  },
  adjectives: (doc) => {
    return doc.match('#Adjective');
  }
};

const cl = {
  Term : function(Doc) {
    return class Term extends Doc {
    };
  },
  Person : function(Doc) {
    return class Person extends Doc {
    };
  },
  Quotation : function(Doc) {
    return class Quotation extends Doc {
    };
  }
};

module.exports = {
  terms: {
    find: find.terms,
    subclass: cl.Term
  },
  people: {
    find: find.people,
    subclass: cl.Person
  },
  adjectives: {
    find: find.adjectives,
    subclass: require('./adjectives/Adjective')
  },
  quotations: {
    find: require('./quotations/find'),
    subclass: cl.Quotation
  },
  nouns: {
    find: require('./nouns/find'),
    subclass: require('./nouns/Noun')
  },
  values: {
    find: require('./values/find'),
    subclass: require('./values/Value')
  },
};
