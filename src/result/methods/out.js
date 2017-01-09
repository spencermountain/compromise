'use strict';
const ngram = require('./render/ngram');
const topk = require('./render/topk');

const render = {
  text: (r) => {
    return r.list.reduce((str, ts) => {
      str += ts.plaintext();
      return str;
    }, '');
  },
  normal: (r) => {
    return r.list.map((ts) => {
      let str = ts.normal();
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
      arr.push(ts.plaintext());
      return arr;
    }, []);
  },
  html: (r) => {
    let html = r.list.reduce((str, ts) => {
      let sentence = ts.terms.reduce((sen, t) => {
        sen += t.render.html();
        return sen;
      }, '');
      return '<span>' + sentence + '</span>';
    }, '');
    return '<span>' + html + '</span>';
  },
  debug: (r) => {
    console.log('====');
    r.list.forEach((ts) => {
      console.log('   --');
      ts.check();
    });
    return this;
  }
};
//render/output methods
const out = (method) => {
  if (method === 'text' || method === 'plaintext') {
    return render.text(this);
  } else if (method === 'normal' || method === 'normalized') {
    return render.normal(this);
  } else if (method === 'array' || method === 'json') {
    return render.array(this);
  } else if (method === 'html') {
    return render.html(this);
  } else if (method === 'debug' || method === 'pretty') {
    return render.debug(this);
  } else if (method === 'topk' || method === 'freq' || method === 'frequency') {
    return topk(this);
  } else if (method === 'ngram') {
    return ngram(this);
  } else if (method === 'bigram') {
    let ops = {
      size: [2]
    };
    return ngram(this, ops);
  } else if (method === 'trigram') {
    let ops = {
      size: [3]
    };
    return ngram(this, ops);
  } else if (method === 'startgram') {
  } else if (method === 'endgram') {
  }
  return render.text(this);
};
module.exports = out;
