'use strict';
const isQuestion = require('../subset/sentences/isQuestion');
const addSubsets = Text => {
  //these subsets have no instance methods, so are simply a 'find' method.
  const subsets = {
    clauses: function(n) {
      let r = this.splitAfter('#ClauseEnd');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    hashTags: function(n) {
      let r = this.match('#HashTag').terms();
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    organizations: function(n) {
      let r = this.splitAfter('#Comma');
      r = r.match('#Organization+');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    phoneNumbers: function(n) {
      let r = this.splitAfter('#Comma');
      r = r.match('#PhoneNumber+');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    places: function(n) {
      let r = this.splitAfter('#Comma');
      r = r.match('#Place+');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    quotations: function(n) {
      let r = this.match('#Quotation+');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    topics: function(n) {
      let r = this.clauses();
      //find people, places, and organizations
      let yup = r.people();
      yup.concat(r.places());
      yup.concat(r.organizations());
      //return them to normal ordering
      yup.sort('chronological');
      // yup.unique() //? not sure
      if (typeof n === 'number') {
        yup = yup.get(n);
      }
      return yup;
    },
    urls: function(n) {
      let r = this.match('#Url');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    questions: function(n) {
      let r = this.all();
      if (typeof n === 'number') {
        r = r.get(n);
      }
      let list = r.list.filter(ts => isQuestion(ts));
      return new Text(list, this.world, this.parent);
    },
    statements: function(n) {
      let r = this.all();
      if (typeof n === 'number') {
        r = r.get(n);
      }
      let list = r.list.filter(ts => isQuestion(ts) === false);
      return new Text(list, this.world, this.parent);
    }
  };

  Object.keys(subsets).forEach(k => {
    Text.prototype[k] = subsets[k];
  });
  return Text;
};
module.exports = addSubsets;
