(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('fs')) :
  typeof define === 'function' && define.amd ? define(['exports', 'fs'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.compromiseSpeed = {}, global.fs));
})(this, (function (exports, fs) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var fs__namespace = /*#__PURE__*/_interopNamespace(fs);

  const defaults = { highWaterMark: 64 };//change this for smaller chunks

  const streamFile = function (path, fn, opts) {
    const nlp = this;
    opts = Object.assign({}, defaults, opts);
    return new Promise((resolve, reject) => {
      let model = nlp.model();
      const splitSentences = nlp.methods().one.tokenize.splitSentences;
      const s = fs__namespace.createReadStream(path, opts);

      let txt = '';
      let res = [];

      const doIt = (str) => {
        let m = fn(nlp(str));
        if (m && m.found) {
          res.push(m.document[0]);
        }
      };

      s.on('data', function (chunk) {
        txt += chunk;
        let arr = splitSentences(txt, model);
        txt = arr.pop(); //keep last one
        arr.forEach(doIt);
      });
      s.on('end', function () {
        doIt(txt);// do dangling one
        // construct document of only results
        let doc = nlp('');
        doc.document = res;
        resolve(doc);
      });
      s.on('error', function (err) {
        console.error(err.stack); // eslint-disable-line
        reject(err);
      });
    })


  };

  var streamFile$1 = {
    lib: {
      streamFile
    }
  };

  let sentenceCache = {};

  /** memoize tagger per-sentence */
  const keyPress = function (text, lex, opts = {}) {
    const nlp = this;
    const splitSentences = this.methods().one.tokenize.splitSentences;
    let arr = splitSentences(text, this.model());

    let list = [];
    arr.forEach(str => {
      //do we already have it parsed?
      if (sentenceCache.hasOwnProperty(str) === true) {
        //use the cache
        list.push(sentenceCache[str].data);
        sentenceCache[str].used = true;
        // console.log('used cache: ', str, '\n')
      } else {
        //otherwise, parse it!
        if (opts.verbose) {
          console.log(`parsing: '${str}'\n`);//eslint-disable-line
        }
        let json = nlp(str, lex).json(0);
        //cache it
        sentenceCache[str] = {
          data: json,
          used: true,
        };
        list.push(json);
      }
    });
    // delete any unused cache
    Object.keys(sentenceCache).forEach(k => {
      if (sentenceCache[k].used !== true) {
        delete sentenceCache[k];
      } else {
        sentenceCache[k].used = null;
      }
    });
    if (opts.verbose) {
      console.log(`${Object.keys(sentenceCache).length}' sentences in cache\n`);//eslint-disable-line
    }
    return nlp(list)
  };

  var index = {
    lib: {
      keyPress
    }
  };

  exports.keyPress = index;
  exports.streamFile = streamFile$1;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
