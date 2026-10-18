'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const splitSentences = (text, nlp) => {
  return nlp.methods().one.tokenize.splitSentences(text, nlp.world())
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

const plugin = {
  lib: { ...keyPress$1.lib, ...lazyParse.lib },
  version,
};

exports.default = plugin;
exports.keyPress = keyPress$1;
exports.lazyParse = lazyParse;
