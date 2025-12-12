(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('fs'), require('path'), require('url'), require('worker_threads'), require('os')) :
  typeof define === 'function' && define.amd ? define(['exports', 'fs', 'path', 'url', 'worker_threads', 'os'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.compromiseSpeed = {}, global.fs, global.path, global.url, global.worker_threads, global.os));
})(this, (function (exports, fs, path, url, worker_threads, os) { 'use strict';

  var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
  function _interopNamespaceDefault(e) {
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
    n.default = e;
    return Object.freeze(n);
  }

  var fs__namespace = /*#__PURE__*/_interopNamespaceDefault(fs);

  const streamFile = function (path, fn, opts = {}) {
    const nlp = this;
    const world = nlp.world();
    const splitSentences = nlp.methods().one.tokenize.splitSentences;
    const s = fs__namespace.createReadStream(path, opts);

    let txt = '';
    const res = [];

    const doIt = (str) => {
      const doc = nlp(str);
      const m = fn(doc);
      if (m && m.found) {
        m.docs.forEach(l => res.push(l));
      }
    };

    const quickSplit = function (str) {
      const end = txt.substring(str.length - 300);
      const arr = splitSentences(end, world);
      const last = arr[arr.length - 1];
      const main = str.substr(0, str.length - last.length);
      return [main, last]
    };


    return new Promise((resolve, reject) => {
      s.on('data', function (chunk) {
        txt += chunk;
        const [main, end] = quickSplit(txt);
        doIt(main);
        txt = end;
      });
      s.on('end', function () {
        doIt(txt);// do dangling one
        // construct document of only results
        const doc = nlp('');
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

  const sentenceCache = {};

  /** memoize tagger per-sentence */
  const keyPress = function (text, lex, opts = {}) {
    const nlp = this;
    const splitSentences = this.methods().one.tokenize.splitSentences;
    const arr = splitSentences(text, this.world());

    const list = [];
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
        const json = nlp(str, lex).json(0);
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

  var keyPress$1 = {
    lib: {
      keyPress
    }
  };

  const fastSplit = function (str, numChunks = 1) {
    const size = Math.ceil(str.length / numChunks);
    const chunks = new Array(numChunks);
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size);
    }
    return chunks
  };

  const pluckStarts = function (arr, nlp) {
    const world = nlp.world();
    const splitSentences = nlp.methods().one.tokenize.splitSentences;

    for (let i = 1; i < arr.length; i += 1) {
      const top = arr[i].substr(0, 200);
      const first = splitSentences(top, world)[0];
      // move the first (part) sentence onto the end of the last one
      const len = first.length;
      arr[i - 1] += first;
      arr[i] = arr[i].substring(len);
    }
    return arr
  };

  // split a text quickly, then repair splits by sentence
  const rip = function (txt, nlp, parts = 1) {
    let arr = fastSplit(txt, parts);
    arr = pluckStarts(arr, nlp);
    return arr
  };

  // let res = rip('one, two, three. four five six. seven eight nine', 4)
  // console.log(JSON.stringify(res, null, 2))

  const dir = path.dirname(url.fileURLToPath((typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('compromise-speed.cjs', document.baseURI).href))));

  const makePool = function (count, reg) {
    const workers = [];
    for (let i = 0; i < count; i += 1) {
      const info = {
        workerData: {
          workerIndex: i,
          workerCount: count,
          reg
        }
      };
      const file = path.join(dir, './worker.js');
      const worker = new worker_threads.Worker(file, info);
      worker.on('error', (err) => console.error(err));// eslint-disable-line
      workers.push(worker);
    }
    return workers
  };

  const cpuCount = os.cpus().length;
  const workerCount = cpuCount;

  const workerPool$1 = function (txt, reg) {
    const nlp = this;
    if (typeof reg === 'string') {
      reg = nlp.parseMatch(reg);
    }

    const workers = makePool(workerCount, reg);
    const parts = rip(txt, nlp, workerCount);
    // console.log(parts.length)
    const results = [];
    const isRunning = workers.map(_ => true);// eslint-disable-line

    // workers.foreach
    workers.forEach((worker, i) => {
      worker.postMessage({ type: 'work', work: parts[i] || [] });
    });

    return new Promise((resolve) => {
      // setup listeners
      workers.forEach(worker => {
        worker.on('message', (msg) => {
          if (msg.type === 'match') {
            msg.match.forEach(m => {
              results.push(m);
            });
          }
          if (msg.type === 'drained') {
            const index = msg.status.workerIndex;
            isRunning[index] = false;
            // console.log(index, 'drained')
            if (isRunning.every(b => b === false)) {
              const doc = nlp('');
              doc.document = results;
              workers.forEach(w => w.terminate());
              // console.log('done!')
              resolve(doc);
            }
          }
        });
      });
    })
  };

  var workerPool = {
    lib: {
      workerPool: workerPool$1
    }
  };

  const getWords = function (net) {
    return Object.keys(net.hooks).filter(w => !w.startsWith('#') && !w.startsWith('%'))
  };

  const maybeMatch = function (doc, net) {
    // must have *atleast* one of these words
    const words = getWords(net);
    if (words.length === 0) {
      return doc
    }
    if (!doc._cache) {
      doc.cache();
    }
    const cache = doc._cache;
    // return sentences that have one of our needed words
    return doc.filter((_m, i) => {
      return words.some(str => cache[i].has(str))
    })
  };

  // tokenize first, then only tag sentences required
  const lazyParse$1 = function (input, reg) {
    let net = reg;
    if (typeof reg === 'string') {
      net = this.buildNet([{ match: reg }]);
    }
    const doc = this.tokenize(input);
    const m = maybeMatch(doc, net);
    if (m.found) {
      m.compute(['index', 'tagger']);
      return m.match(reg)
    }
    return doc.none()
  };

  var lazyParse = {
    lib: {
      lazy: lazyParse$1
    }
  };

  var version = '0.1.2';

  // combine all the plugins
  const plugin = {
    lib: Object.assign({}, streamFile$1.lib, keyPress$1.lib, workerPool.lib, lazyParse.lib),
    version: version
  };

  exports.default = plugin;
  exports.keyPress = keyPress$1;
  exports.lazyParse = lazyParse;
  exports.streamFile = streamFile$1;
  exports.workerPool = workerPool;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
