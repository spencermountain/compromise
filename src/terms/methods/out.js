'use strict';
const fns = require('../paths').fns;

const methods = {
  text: function(ts) {
    return ts.terms.reduce((str, t) => {
      str += t.out('text');
      return str;
    }, '');
  },
  //like 'text', but no leading/trailing whitespace
  match: function(ts) {
    let str = '';
    let len = ts.terms.length;
    for (let i = 0; i < len; i++) {
      if (i > 0) {
        str += ts.terms[i].whitespace.before;
      }
      str += ts.terms[i].text.replace(/[,.?!]$/, ''); //remove comma
      if (i < len - 1) {
        str += ts.terms[i].whitespace.after;
      }
    }
    return str;
  },

  normal: function(ts) {
    let terms = ts.terms.filter(t => {
      return t.text;
    });
    terms = terms.map(t => {
      return t.normal; //+ punct;
    });
    return terms.join(' ');
  },

  grid: function(ts) {
    let str = '  ';
    str += ts.terms.reduce((s, t) => {
      s += fns.leftPad(t.text, 11);
      return s;
    }, '');
    return str + '\n\n';
  },

  color: function(ts) {
    return ts.terms.reduce((s, t) => {
      s += fns.printTerm(t);
      return s;
    }, '');
  },
  csv: function(ts) {
    return ts.terms.map(t => t.normal.replace(/,/g, '')).join(',');
  },

  newlines: function(ts) {
    return ts.terms
      .reduce((str, t) => {
        str += t.out('text').replace(/\n/g, ' ');
        return str;
      }, '')
      .replace(/^\s/, '');
  },
  /** no punctuation, fancy business **/
  root: function(ts) {
    return ts.terms.map(t => t.silent_term || t.root).join(' ').toLowerCase();
  },

  html: function(ts) {
    return ts.terms.map(t => t.render.html()).join(' ');
  },
  debug: function(ts) {
    ts.terms.forEach(t => {
      t.out('debug');
    });
  },
  custom: function(ts, obj) {
    return ts.terms.map((t) => {
      return Object.keys(obj).reduce((h, k) => {
        if (obj[k] && t[k]) {
          if (typeof t[k] === 'function') {
            h[k] = t[k]();
          } else {
            h[k] = t[k];
          }
        }
        return h;
      }, {});
    });
  }
};
methods.plaintext = methods.text;
methods.normalize = methods.normal;
methods.normalized = methods.normal;
methods.colors = methods.color;
methods.tags = methods.terms;

const renderMethods = Terms => {
  Terms.prototype.out = function(fn) {
    if (typeof fn === 'string') {
      if (methods[fn]) {
        return methods[fn](this);
      }
    } else if (fns.isObject(fn) === true) { //support .out({})
      return methods.custom(this, fn);
    }
    return methods.text(this);
  };
  //check method
  Terms.prototype.debug = function() {
    return methods.debug(this);
  };
  return Terms;
};

module.exports = renderMethods;
