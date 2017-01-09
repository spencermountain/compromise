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
    return r;
  }
};
//render/output methods
const out = (r, method) => {
  if (method === 'text' || method === 'plaintext') {
    return render.text(r);
  } else if (method === 'normal' || method === 'normalized') {
    return render.normal(r);
  } else if (method === 'array') {
    return render.array(r);
  } else if (method === 'json') {
    return render.json(r);
  } else if (method === 'html') {
    return render.html(r);
  } else if (method === 'debug' || method === 'pretty') {
    return render.debug(r);
  } else if (method === 'topk' || method === 'freq' || method === 'frequency') {
    return topk(r);
  } else if (method === 'ngram') {
    return ngram(r);
  } else if (method === 'bigram') {
    let ops = {
      size: [2]
    };
    return ngram(r, ops);
  } else if (method === 'trigram') {
    let ops = {
      size: [3]
    };
    return ngram(r, ops);
  } else if (method === 'startgram') {
  } else if (method === 'endgram') {
  }
  return render.text(r);
};
module.exports = out;
