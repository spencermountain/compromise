const test = require('tape')
const nlp = require('./_lib')

test('reserved words:', function (t) {
  const reserved = [
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
    // "'",
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
    '..(',
  ]
  const str = reserved.join(' ')
  const r = nlp(str)
  t.equal(r.out('text'), str, 'reserved-words-are-printed')
  t.equal(r.terms().length, reserved.length, 'reserved-length')
  t.ok(r.contractions().data(), 'runs contractions subset')
  t.ok(r.parentheses().data(), 'runs parentheses subset')
  t.ok(r.lists().data(), 'runs lists subset')
  t.ok(r.terms().data(), 'runs terms subset')
  t.ok(r.pronouns().data(), 'runs pronouns subset')
  t.end()
})

test('co-erce reserved words', function (t) {
  const r = nlp('constructor prototype')
  r.tag('Verb')
  t.ok(r.match('#Verb').data(), 'runs tag/match')
  r.tag('Adjective')
  t.ok(r.match('#Noun').data(), 'runs untag')
  t.equal(r.terms().slice(0, 2).length, 2, 'runs slice')
  t.ok(r.append('constructor').text(), 'runs append')
  t.end()
})
