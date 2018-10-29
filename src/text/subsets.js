'use strict';
const isQuestion = require('../subset/sentences/isQuestion');
const addSubsets = Text => {
  //these subsets have no instance methods, so are simply a 'find' method.
  const subsets = {
    clauses: function (n) {
      let r = this.splitAfter('#ClauseEnd');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    hashTags: function (n) {
      let r = this.match('#HashTag').terms();
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    organizations: function (n) {
      let r = this.splitAfter('#Comma');
      r = r.match('#Organization+');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    phoneNumbers: function (n) {
      let r = this.splitAfter('#Comma');
      r = r.match('#PhoneNumber+');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    places: function (n) {
      let r = this.splitAfter('#Comma');
      r = r.match('#Place+');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    quotations: function (n) {
      let matches = this.match('#Quotation+');
      let found = [];
      matches.list.forEach((ts) => {
        let open = 0;
        let start = null;
        //handle nested quotes - 'startQuote->startQuote->endQuote->endQuote'
        ts.terms.forEach((t, i) => {
          if (t.tags.StartQuotation === true) {
            if (open === 0) {
              start = i;
            }
            open += 1;
          }
          if (open > 0 && t.tags.EndQuotation === true) {
            open -= 1;
          }
          if (open === 0 && start !== null) {
            found.push(ts.slice(start, i + 1));
            start = null;
          }
        });
        //maybe we messed something up..
        if (start !== null) {
          found.push(ts.slice(start, ts.terms.length));
        }
      });
      matches.list = found;
      if (typeof n === 'number') {
        matches = matches.get(n);
      }
      return matches;
    },
    topics: function (n) {
      let r = this.clauses();
      // Find people, places, and organizations
      let yup = r.people();
      yup.concat(r.places());
      yup.concat(r.organizations());
      let ignore = ['someone', 'man', 'woman', 'mother', 'brother', 'sister', 'father'];
      yup = yup.not(ignore);
      //return them to normal ordering
      yup.sort('chronological');
      // yup.unique() //? not sure
      if (typeof n === 'number') {
        yup = yup.get(n);
      }
      return yup;
    },
    urls: function (n) {
      let r = this.match('#Url');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    questions: function (n) {
      let r = this.all();
      if (typeof n === 'number') {
        r = r.get(n);
      }
      let list = r.list.filter(ts => isQuestion(ts));
      return new Text(list, this.world, this.parent);
    },
    statements: function (n) {
      let r = this.all();
      if (typeof n === 'number') {
        r = r.get(n);
      }
      let list = r.list.filter(ts => isQuestion(ts) === false);
      return new Text(list, this.world, this.parent);
    },
    parentheses: function (n) {
      let r = this.match('#Parentheses+');
      //split-up consecutive ones
      r = r.splitAfter('#EndBracket');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
  };

  Object.keys(subsets).forEach(k => {
    Text.prototype[k] = subsets[k];
  });
  return Text;
};
module.exports = addSubsets;
