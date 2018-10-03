'use strict';
const topk = require('./topk');
const offset = require('./offset');
const termIndex = require('./indexes');
const fns = require('../paths').fns;

const methods = {
  text: r => {
    return r.list.reduce((str, ts) => {
      str += ts.out('text');
      return str;
    }, '');
  },
  match: r => {
    return r.list.reduce((str, ts) => {
      str += ts.out('match');
      return str;
    }, '');
  },
  normal: r => {
    return r.list
      .map(ts => {
        let str = ts.out('normal');
        let last = ts.last();
        if (last) {
          let punct = ts.getPunctuation();
          if (punct === '.' || punct === '!' || punct === '?') {
            str += punct;
          }
        }
        return str;
      })
      .join(' ');
  },
  root: r => {
    return r.list
      .map(ts => {
        return ts.out('root');
      })
      .join(' ');
  },
  /** output where in the original output string they are*/
  offsets: r => {
    return offset(r);
  },
  /** output the tokenized location of this match*/
  index: r => {
    return termIndex(r);
  },
  grid: r => {
    return r.list.reduce((str, ts) => {
      str += ts.out('grid');
      return str;
    }, '');
  },
  color: r => {
    return r.list.reduce((str, ts) => {
      str += ts.out('color');
      return str;
    }, '');
  },
  array: r => {
    return r.list.map(ts => {
      return ts.out('normal');
    });
  },
  csv: r => {
    return r.list
      .map(ts => {
        return ts.out('csv');
      })
      .join('\n');
  },
  newlines: r => {
    return r.list
      .map(ts => {
        return ts.out('newlines');
      })
      .join('\n');
  },
  json: r => {
    return r.list.reduce((arr, ts) => {
      let terms = ts.terms.map(t => {
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
  html: r => {
    let html = r.list.reduce((str, ts) => {
      let sentence = ts.terms.reduce((sen, t) => {
        sen += '\n    ' + t.out('html');
        return sen;
      }, '');
      return (str += '\n  <span>' + sentence + '\n  </span>');
    }, '');
    return '<span> ' + html + '\n</span>';
  },
  terms: r => {
    let arr = [];
    r.list.forEach(ts => {
      ts.terms.forEach(t => {
        arr.push({
          text: t.text,
          normal: t.normal,
          tags: Object.keys(t.tags)
        });
      });
    });
    return arr;
  },
  debug: r => {
    console.log('====');
    r.list.forEach(ts => {
      console.log('   --');
      ts.debug();
    });
    return r;
  },
  topk: r => {
    return topk(r);
  },
  custom: (r, obj) => {
    return r.list.map((ts) => ts.out(obj));
  }
};
methods.plaintext = methods.text;
methods.normalized = methods.normal;
methods.colors = methods.color;
methods.tags = methods.terms;
methods.offset = methods.offsets;
methods.idexes = methods.index;
methods.frequency = methods.topk;
methods.freq = methods.topk;
methods.arr = methods.array;



const addMethods = Text => {
  Text.prototype.out = function(fn) {
    if (typeof fn === 'string') {
      if (methods[fn]) {
        return methods[fn](this);
      }
    } else if (fns.isObject(fn) === true) { //support .out({})
      return methods.custom(this, fn);
    }
    return methods.text(this);
  };
  Text.prototype.debug = function() {
    return methods.debug(this);
  };
  return Text;
};

module.exports = addMethods;
