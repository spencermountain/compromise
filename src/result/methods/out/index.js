'use strict';
const ngram = require('./ngram');
const edgegram = require('./edgegram');
const topk = require('./topk');

const methods = {
  text: (r) => {
    return r.list.reduce((str, ts) => {
      str += ts.out('text');
      return str;
    }, '');
  },
  normal: (r) => {
    return r.list.map((ts) => {
      let str = ts.out('normal');
      let last = ts.last();
      if (last) {
        let punct = last.endPunctuation();
        if (punct === '.' || punct === '!' || punct === '?') {
          str += punct;
        }
      }
      return str;
    }).join(' ');
  },
  grid: (r) => {
    return r.list.reduce((str, ts) => {
      str += ts.out('grid');
      return str;
    }, '');
  },
  color: (r) => {
    return r.list.reduce((str, ts) => {
      str += ts.out('color');
      return str;
    }, '');
  },
  array: (r) => {
    return r.list.reduce((arr, ts) => {
      arr.push(ts.out('normal'));
      return arr;
    }, []);
  },
  json: (r) => {
    return r.list.reduce((arr, ts) => {
      let terms = ts.terms.map((t) => {
        return {
          text: t.text,
          normal: t.normal,
          tags: t.tag
        };
      });
      arr.push(terms);
      return arr;
    }, []);
  },
  html: (r) => {
    let html = r.list.reduce((str, ts) => {
      let sentence = ts.terms.reduce((sen, t) => {
        sen += '\n    ' + t.methods.html();
        return sen;
      }, '');
      return str += '\n  <span>' + sentence + '\n  </span>';
    }, '');
    return '<span> ' + html + '\n</span>';
  },
  terms: (r) => {
    let arr = [];
    r.list.forEach((ts) => {
      ts.terms.forEach((t) => {
        arr.push({
          text: t.text,
          normal: t.normal,
          tags: Object.keys(t.tag)
        });
      });
    });
    return arr;
  },
  debug: (r) => {
    console.log('====');
    r.list.forEach((ts) => {
      console.log('   --');
      ts.debug();
    });
    return r;
  },
  freq: (r) => {
    return topk(r);
  }
};
methods.plaintext = methods.text;
methods.normalized = methods.normal;
methods.freq = methods.topk;
methods.colors = methods.color;
methods.frequency = methods.topk;

const addMethods = (Text) => {
  Text.prototype.debug = function() {
    return methods.debug(this);
  };
  Text.prototype.out = function(fn, opts) {
    if (methods[fn]) {
      return methods[fn](this);
    }
    if (fn === 'bigram') {
      opts = opts || {
        size: [2]
      };
      return ngram(this, opts);
    }
    if (fn === 'trigram') {
      opts = opts || {
        size: [3]
      };
      return ngram(this, opts);
    }
    if (fn === 'edgegram') {
      return edgegram.both(this, opts);
    }
    if (fn === 'startgram') {
      return edgegram.start(this, opts);
    }
    if (fn === 'endgram') {
      return edgegram.end(this, opts);
    }
    return methods.text(this);
  };
  return Text;
};


module.exports = addMethods;
