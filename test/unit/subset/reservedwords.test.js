var test = require('tape');
var nlp = require('../lib/nlp');

test('reserved words:', function(t) {
  var reserved = [
    'abstract',
    'boolean',
    'break',
    'byte',
    'case',
    'catch',
    'char',
    'class',
    'const',
    'constructor',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'double',
    'else',
    'enum',
    'export',
    'extends',
    'false',
    'final',
    'finally',
    'float',
    'for',
    'function',
    'goto',
    'if',
    'implements',
    'import',
    'in',
    'instanceof',
    'int',
    'interface',
    'let',
    'long',
    'native',
    'new',
    'null',
    'package',
    'private',
    'protected',
    'prototype',
    'public',
    'return',
    'short',
    'static',
    'super',
    'switch',
    'synchronized',
    'this',
    'throw',
    'throws',
    'transient',
    'true',
    'try',
    'typeof',
    'var',
    'void',
    'volatile',
    'while',
    'with',
    'yeild',
    '__prototype__',
    '&&',
    '||',
    '|',
    "'",
    '&',
    'Math.PI',
    12e34,
    '#§$%',
    'π',
    'привет',
    // 'hasOwnProperty',
    'café',
    '$$$',
    1e2,
    '{}',
    '[]',
    'constructor',
    'prototype',
    ')&@)^',
    ' -@%@',
    '-constructor',
    '#!^@#$',
    '..('
  ];
  var str = reserved.join(' ');
  var r = nlp(str);
  t.equal(r.out('text'), str, 'reserved-words-are-printed');
  t.equal(r.terms().length, reserved.length, 'reserved-length');
  t.ok(r.verbs().data(), 'runs verb subset');
  t.ok(r.values().data(), 'runs value subset');
  t.ok(r.nouns().data(), 'runs noun subset');
  t.ok(r.ngrams().data(), 'runs ngrams subset');
  t.ok(r.people().data(), 'runs people subset');
  t.ok(r.places().data(), 'runs places subset');
  t.ok(r.adjectives().data(), 'runs adjectives subset');
  t.ok(r.sentences().data(), 'runs sentences subset');
  t.ok(r.dates().data(), 'runs dates subset');
  t.ok(r.contractions().data(), 'runs contractions subset');
  t.ok(r.terms().data(), 'runs terms subset');
  t.end();
});

test('co-erce reserved words', function(t) {
  var r = nlp('constructor prototype');
  r.tag('Verb');
  t.ok(r.verbs().data(), 'runs verb subset');
  r.tag('Adjective');
  t.ok(r.adjectives().data(), 'runs adjective subset');
  r.tag('Value');
  t.ok(r.values().data(), 'runs values subset');
  r.tag('Person');
  t.ok(r.people().data(), 'runs values subset');
  r.tag('Noun');
  t.ok(r.nouns().data(), 'runs values subset');
  r.tag('Place');
  t.ok(r.places().data(), 'runs place subset');
  t.end();
});
