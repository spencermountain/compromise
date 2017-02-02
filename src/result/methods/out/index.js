'use strict';
const ngram = require('./ngram');
const edgegram = require('./edgegram');
const topk = require('./topk');

const render = {
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
        sen += '\n    ' + t.render.html();
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
  check: (r) => {
    console.log('====');
    r.list.forEach((ts) => {
      console.log('   --');
      ts.check();
    });
    return r;
  },
  freq: (r) => {
    return topk(r);
  }
};
render.plaintext = render.text;
render.normalized = render.normal;
render.debug = render.check;
render.freq = render.topk;
render.frequency = render.topk;

//render/output fns
const out = (r, fn, opts) => {
  if (render[fn]) {
    return render[fn](r);
  }
  if (fn === 'bigram') {
    opts = opts || {
      size: [2]
    };
    return ngram(r, opts);
  }
  if (fn === 'trigram') {
    opts = opts || {
      size: [3]
    };
    return ngram(r, opts);
  }
  if (fn === 'edgegram') {
    return edgegram.both(r, opts);
  }
  if (fn === 'startgram') {
    return edgegram.start(r, opts);
  }
  if (fn === 'endgram') {
    return edgegram.end(r, opts);
  }
  return render.text(r);
};
module.exports = out;
