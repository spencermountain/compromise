(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('node:fs'), require('node:os'), require('node:worker_threads')) :
  typeof define === 'function' && define.amd ? define(['exports', 'node:fs', 'node:os', 'node:worker_threads'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.compromiseSpeed = {}, global.node_fs, global.os, global.node_worker_threads));
})(this, (function (exports, node_fs, os, node_worker_threads) { 'use strict';

  var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
  const lookahead = 3;

  const splitSentences = (text, nlp) => {
    return nlp.methods().one.tokenize.splitSentences(text, nlp.world())
  };

  const sentenceBuffer = nlp => {
    let pending = '';
    let nextSplit = 0;
    return {
      push(chunk) {
        pending += chunk;
        if (pending.length < nextSplit) {
          return ''
        }
        const sentences = splitSentences(pending, nlp);
        // Keep the unfinished sentence plus quote/parenthesis lookahead.
        if (sentences.length <= lookahead) {
          // Avoid rescanning a growing, very long sentence on every small read.
          nextSplit = Math.max(1, pending.length * 2);
          return ''
        }
        const ready = sentences.slice(0, -lookahead).join('');
        pending = sentences.slice(-lookahead).join('');
        nextSplit = 0;
        return ready
      },
      finish() {
        const tail = pending;
        pending = '';
        nextSplit = 0;
        return tail
      },
    }
  };

  const streamFileIterator = async function* (path, opts = {}) {
    const options = typeof opts === 'string' ? { encoding: opts } : { ...opts };
    delete options.collect;
    // Let the stream decoder retain partial multibyte characters between reads.
    options.encoding ||= 'utf8';
    const stream = node_fs.createReadStream(path, options);
    const buffer = sentenceBuffer(this);
    for await (const chunk of stream) {
      const ready = buffer.push(chunk);
      if (ready) {
        yield this(ready);
      }
    }
    const tail = buffer.finish();
    if (tail) {
      yield this(tail);
    }
  };

  // Assemble parsed terms without running the parsing hooks again.
  const fromDocs = (nlp, docs, freshIds = false) => {
    const doc = nlp('');
    doc.document = docs;
    doc.compute('index');
    if (freshIds) {
      // Repeated cached sentences and separate workers can reuse term IDs.
      docs.forEach(terms => terms.forEach(term => { delete term.id; }));
      doc.compute('id');
    }
    return doc
  };

  const streamFile = async function (path, fn, opts = {}) {
    const docs = [];
    for await (const doc of streamFileIterator.call(this, path, opts)) {
      const match = await fn(doc);
      if (opts?.collect !== false && match?.found) {
        match.docs.forEach(terms => docs.push(terms));
      }
    }
    return fromDocs(this, docs)
  };

  var streamFile$1 = { lib: { streamFile, streamFileIterator } };

  const states = new WeakMap();

  const getState = nlp => {
    if (!states.has(nlp)) {
      const state = { revision: 0, lex: null, sessions: new WeakMap() };
      const addWords = nlp.addWords;
      // Lexicon updates mutate the model in place, so identity is not sufficient.
      nlp.addWords = function (...args) {
        state.revision += 1;
        state.lex = null;
        return addWords.apply(this, args)
      };
      states.set(nlp, state);
    }
    return states.get(nlp)
  };

  const getCache = (nlp, lex, opts) => {
    const state = getState(nlp);
    if (lex && JSON.stringify(lex) !== state.lex) {
      nlp.addWords(lex);
      state.lex = JSON.stringify(lex);
    }
    const key = opts.cache || nlp;
    const hooks = nlp.hooks();
    let cache = state.sessions.get(key);
    if (!cache || opts.reset || cache.revision !== state.revision || cache.hooks !== hooks) {
      cache = { revision: state.revision, hooks, sentences: new Map() };
      state.sessions.set(key, cache);
    }
    return cache
  };

  const keyPress = function (text, lex, opts = {}) {
    const cache = getCache(this, lex, opts);
    const next = new Map();
    const docs = [];
    splitSentences(text, this).forEach(str => {
      let parsed = next.get(str) || cache.sentences.get(str);
      if (!parsed) {
        if (opts.verbose) {
          console.log(`parsing: '${str}'`);// eslint-disable-line no-console
        }
        parsed = this(str).document;
      }
      next.set(str, parsed);
      // Clone each occurrence separately, including duplicate sentences.
      const copy = globalThis.structuredClone(parsed);
      copy.forEach(terms => docs.push(terms));
    });
    cache.sentences = next;
    if (opts.verbose) {
      console.log(`${next.size} sentences in cache`);// eslint-disable-line no-console
    }
    return fromDocs(this, docs, true)
  };

  var keyPress$1 = { lib: { keyPress } };

  const rip = (text, nlp, batchSize) => {
    const batches = [];
    let batch = '';
    splitSentences(text, nlp).forEach(sentence => {
      if (batch && batch.length + sentence.length > batchSize) {
        batches.push(batch);
        batch = '';
      }
      batch += sentence;
    });
    if (batch) {
      batches.push(batch);
    }
    return batches
  };

  const makePool = count => {
    const slots = [];
    let queue = [];
    let cursor = 0;
    let closed = false;
    let closing;

    const close = (error = new Error('Worker pool closed')) => {
      if (!closed) {
        closed = true;
        queue.slice(cursor).forEach(job => job.reject(error));
        queue = [];
        cursor = 0;
        closing = Promise.all(slots.map(slot => {
          if (slot.job) {
            slot.job.reject(error);
            slot.job = null;
          }
          return slot.worker.terminate()
        })).then(() => {});
      }
      return closing
    };

    const dispatch = slot => {
      if (closed || slot.job || cursor === queue.length) {
        return
      }
      const job = queue[cursor++];
      if (cursor === queue.length) {
        queue = [];
        cursor = 0;
      }
      slot.job = job;
      slot.worker.ref();
      try {
        slot.worker.postMessage(job.work);
      } catch (err) {
        close(err);
      }
    };

    const createSlot = () => {
      const worker = new node_worker_threads.Worker(new URL('./worker.js', (typeof document === 'undefined' && typeof location === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : typeof document === 'undefined' ? location.href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('compromise-speed.cjs', document.baseURI).href))), {
        // An eval/stdin parent's input mode does not apply to a worker file.
        execArgv: process.execArgv.filter((arg, i, args) => {
          return !arg.startsWith('--input-type') && args[i - 1] !== '--input-type'
        }),
      });
      const slot = { worker, job: null };
      slots.push(slot);
      worker.on('message', docs => {
        if (closed) {
          return
        }
        const job = slot.job;
        slot.job = null;
        job.resolve(docs);
        worker.unref();
        dispatch(slot);
      });
      worker.on('error', close);
      worker.on('exit', code => {
        if (!closed) {
          close(new Error(`Worker exited unexpectedly (${code})`));
        }
      });
      worker.unref();
      return slot
    };

    const run = work => new Promise((resolve, reject) => {
      if (closed) {
        reject(new Error('Worker pool closed'));
        return
      }
      queue.push({ work, resolve, reject });
      try {
        let slot = slots.find(item => !item.job);
        if (!slot && slots.length < count) {
          slot = createSlot();
        }
        if (slot) {
          dispatch(slot);
        }
      } catch (err) {
        close(err);
      }
    });

    return { run, close, get closed() { return closed } }
  };

  const pools = new WeakMap();
  const coldMinLength = 500000;
  const warmMinLength = 64000;
  const defaultBatchSize = 32000;

  const integer = (value, name, minimum) => {
    if (!Number.isSafeInteger(value) || value < minimum) {
      throw new RangeError(`${name} must be an integer >= ${minimum}`)
    }
    return value
  };

  const getOptions = (nlp, opts) => {
    const available = os.availableParallelism ? os.availableParallelism() : os.cpus().length;
    const workers = integer(opts.workers ?? Math.min(4, available || 1), 'workers', 1);
    const pool = pools.get(nlp)?.get(workers);
    const minLength = pool && !pool.closed ? warmMinLength : coldMinLength;
    return {
      workers,
      minLength: integer(opts.minLength ?? minLength, 'minLength', 0),
      batchSize: integer(opts.batchSize ?? defaultBatchSize, 'batchSize', 1),
    }
  };

  const getPool = (nlp, count) => {
    if (!pools.has(nlp)) {
      pools.set(nlp, new Map());
    }
    const cache = pools.get(nlp);
    let pool = cache.get(count);
    if (!pool || pool.closed) {
      pool = makePool(count);
      cache.set(count, pool);
    }
    return pool
  };

  const closeWorkerPool = async function () {
    const cache = pools.get(this);
    pools.delete(this);
    if (cache) {
      await Promise.all(Array.from(cache.values(), pool => pool.close()));
    }
  };

  const workerPool$1 = async function (text, match, opts = {}) {
    const options = getOptions(this, opts);
    if (text.length < options.minLength || options.workers === 1) {
      return fromDocs(this, this(text).match(match).docs)
    }
    const parts = rip(text, this, options.batchSize);
    if (parts.length < 2) {
      return fromDocs(this, this(text).match(match).docs)
    }
    const pool = getPool(this, options.workers);
    if (typeof match === 'string') {
      match = this.parseMatch(match);
    }
    // Promise.all preserves input order even when workers finish out of order.
    const results = await Promise.all(parts.map(part => pool.run({ text: part, match })));
    return fromDocs(this, results.flat(), true)
  };

  var workerPool = { lib: { workerPool: workerPool$1, closeWorkerPool } };

  const filters = new WeakMap();

  const getNeeds = net => {
    if (!filters.has(net)) {
      const rules = new Set(net.always);
      Object.values(net.hooks).forEach(bucket => bucket.forEach(rule => rules.add(rule)));
      const needs = Array.from(rules, rule => {
        // Only mandatory, exact literals are safe before tagging. Unknown rules
        // and alternatives stay eligible, even if other rules have literal hooks.
        return (rule.regs || [])
          .filter(reg => reg.word && !reg.optional && !reg.negative && !reg.fuzzy && !reg.use)
          .map(reg => reg.word)
      });
      filters.set(net, needs);
    }
    return filters.get(net)
  };

  const maybeMatch = (doc, net) => {
    const needs = getNeeds(net);
    if (needs.some(words => words.length === 0)) {
      return doc
    }
    doc.cache();
    doc.document.forEach((terms, i) => {
      terms.forEach(term => doc._cache[i].add(term.text));
    });
    const pointers = [];
    doc._cache.forEach((cache, i) => {
      if (needs.some(words => words.every(word => cache.has(word)))) {
        // Tagging may expand contractions; keep an open sentence boundary.
        pointers.push([i]);
      }
    });
    return doc.update(pointers)
  };

  const compiled = new WeakMap();
  const maxPatterns = 100;

  const getNet = (nlp, pattern) => {
    if (typeof pattern !== 'string') {
      return pattern
    }
    let cache = compiled.get(nlp);
    if (!cache || cache.hooks !== nlp.hooks()) {
      cache = { hooks: nlp.hooks(), patterns: new Map() };
      compiled.set(nlp, cache);
    }
    let net = cache.patterns.get(pattern);
    if (!net) {
      net = nlp.buildNet([{ match: pattern }]);
      if (cache.patterns.size >= maxPatterns) {
        cache.patterns.delete(cache.patterns.keys().next().value);
      }
    }
    cache.patterns.delete(pattern);
    cache.patterns.set(pattern, net);
    return net
  };

  // Tokenize first, then only tag sentences required.
  const lazyParse$1 = function (input, reg) {
    const net = getNet(this, reg);
    const doc = this.tokenize(input);
    const m = maybeMatch(doc, net);
    if (m.found) {
      m.uncache().compute(this.hooks());
      return m.match(reg)
    }
    return doc.none()
  };

  var lazyParse = {
    lib: {
      lazy: lazyParse$1
    }
  };

  var version = '0.2.0';

  // combine all the plugins
  const plugin = {
    lib: { ...streamFile$1.lib, ...keyPress$1.lib, ...workerPool.lib, ...lazyParse.lib },
    version: version
  };

  exports.default = plugin;
  exports.keyPress = keyPress$1;
  exports.lazyParse = lazyParse;
  exports.streamFile = streamFile$1;
  exports.workerPool = workerPool;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
