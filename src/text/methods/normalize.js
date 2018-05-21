'use strict';
//
const defaults = {
  whitespace: true,
  case: true,
  numbers: true,
  punctuation: true,
  unicode: true,
  contractions: true,

  parentheses: false,
  possessives: false,
  plurals: false,
  verbs: false,
};

const methods = {
  /** make only one space between each word */
  whitespace: r => {
    r.terms().list.forEach((ts, i) => {
      let t = ts.terms[0];
      if (i > 0) {
        t.whitespace.before = ' ';
      } else if (i === 0) {
        t.whitespace.before = '';
      }
      t.whitespace.after = '';
    });
    return r;
  },

  /** make first-word titlecase, and people, places titlecase */
  case: r => {
    r.list.forEach(ts => {
      ts.terms.forEach((t, i) => {
        if (i === 0 || t.tags.Person || t.tags.Place || t.tags.Organization) {
          // ts.toTitleCase() //fixme: too weird here.
        } else {
          ts.toLowerCase();
        }
      });
    });
    return r;
  },

  /** turn 'five' to 5, and 'fifth' to 5th*/
  numbers: r => {
    r.values().toNumber();
    return r;
  },

  /** remove commas, semicolons - but keep sentence-ending punctuation*/
  punctuation: r => {
    r.list.forEach(ts => {
      if (!ts.terms.length) {
        return;
      }

      //first-term punctuation
      ts.terms[0]._text = ts.terms[0]._text.replace(/^¿/, '');
      //middle-terms
      for (let i = 0; i < ts.terms.length - 1; i++) {
        let t = ts.terms[i];
        //remove non-sentence-ending stuff
        t._text = t._text.replace(/[:;,]$/, '');
      }
      //replace !!! with !
      let last = ts.terms[ts.terms.length - 1];
      last._text = last._text.replace(/\.+$/, '.');
      last._text = last._text.replace(/!+$/, '!');
      last._text = last._text.replace(/\?+!?$/, '?'); //support '?!'
    });
    return r;
  },

  contractions: r => {
    r.contractions().expand();
    return r;
  },
  //turn david's → david
  possessives: r => {
    r.possessives().strip();
    return r;
  },
  //strip out parts in (brackets)
  parentheses: r => {
    r.parentheses().delete();
    return r;
  },
  //turn sandwhiches → sandwhich
  plurals: r => { //todo:this has a non-cooperative bug
    r.nouns().toSingular();
    return r;
  },
  //turn ate → eat
  verbs: r => {
    r.verbs().toInfinitive();
    return r;
  },
};

const addMethods = Text => {
  Text.prototype.normalize = function(options) {
    let doc = this;
    //set defaults
    options = options || {};
    let obj = Object.assign({}, defaults);
    let keys = Object.keys(options);
    keys.forEach((k) => {
      obj[k] = options[k];
    });
    //do each type of normalization
    Object.keys(obj).forEach(fn => {
      if (obj[fn] && methods[fn] !== undefined) {
        doc = methods[fn](doc);
      }
    });
    return doc;
  };
};
module.exports = addMethods;
