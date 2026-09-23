// Standalone regression checks and optional performance measurements.
// node scripts/test/regex-audit.mjs [--bench]
// Core regressions also run in tests/two/regex-audit.test.js.
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import nlp from '../../src/three.js'
import regexNormal from '../../src/2-two/preTagger/model/regex/regex-normal.js'
import pluralRules from '../../src/2-two/preTagger/methods/transform/nouns/toPlural/_rules.js'
import endings from '../../src/2-two/preTagger/model/patterns/endsWith.js'

const root = fileURLToPath(new URL('../../', import.meta.url))
let failed = 0
let passed = 0
function check(name, actual, expected) {
  try {
    assert.deepEqual(actual(), expected)
    passed++
    console.log(`PASS ${name}`)
  } catch (error) {
    failed++
    console.log(`FAIL ${name}: ${error.message}`)
  }
}

check('control: ordinary email', () => nlp('alice@example.com').has('#Email'), true)
check('email with long TLD', () => nlp('alice@example.technology').has('#Email'), true)
check('email with hyphenated domain', () => nlp('alice@my-domain.com').has('#Email'), true)
check('email with hyphenated local part stays intact',
  () => nlp('first-last@example.com').match('#Email').text(), 'first-last@example.com')
check('single-character bare hostname', () => nlp('x.io').has('#Url'), true)
check('explicit URL with hyphenated hostname', () => nlp('https://my-site.xyz').has('#Url'), true)
check('TLD prefix is not a complete TLD', () => nlp('file.completely').has('#Url'), false)
check('control: ordinary named capture',
  () => nlp('foo').match('[<name>/foo/]').groups('name').text(), 'foo')
check('greater-than inside named regex capture',
  () => nlp('foo>bar').match('[<name>/foo>bar/]').groups('name').text(), 'foo>bar')
check('control: ordinary compiled regex',
  () => nlp('foo foo foo foo').match([{ regex: /foo/ }]).out('array').length, 4)
check('compiled global regex matches every term',
  () => nlp('foo foo foo foo').match([{ regex: /foo/g }]).out('array').length, 4)
check('compiled sticky regex matches every term',
  () => nlp('foo foo foo foo').match([{ regex: /foo/y }]).out('array').length, 4)
check('non-acronym preserves its periods', () => nlp('v1.2a.b').json()[0].terms[0].normal, 'v1.2a.b')
check('prefix-verb model rule accepts a literal hyphen',
  () => regexNormal.find(([, tag]) => tag === 'Verb')[0].test('un-vite'), true)
check('timezone model rule accepts normalized lowercase',
  () => regexNormal.find(([, tag]) => tag === 'Timezone')[0].test('est'), true)
check('mouse plural rule does not match a pipe', () => pluralRules.e[2][0].test('|ouse'), false)

// Compare the actual model rule with the previous behavior on generated inputs.
check('suffix rule agrees with the original on 18,662 generated inputs', () => {
  const before = /[aeiou].*ist$/
  const after = endings.t.find(([regex]) => regex.source.endsWith('ist$'))[0]
  let level = ['']
  for (let length = 0; length <= 5; length++) {
    for (const prefix of level) {
      for (const text of [prefix, prefix + 'ist']) {
        assert.equal(after.test(text), before.test(text), JSON.stringify(text))
      }
    }
    level = level.flatMap(prefix => [...'abist\n'].map(char => prefix + char))
  }
  return true
}, true)

if (process.argv.includes('--bench')) {
  // Run each size in a separate process with a timeout; no hanging stress test.
  // Measurements are diagnostic, not hardware-dependent pass/fail thresholds.
  const benchmarks = [
    ['punctuation', "'!'.repeat(n)", 'nlp(input)'],
    ['suffix', "'a'.repeat(n) + 't'", 'nlp(input)'],
    ['parser-flags', "'!'.repeat(n) + 'x'", 'nlp.parseMatch(input)'],
    ['parser-parens', "'('.repeat(n) + 'x'", 'nlp.parseMatch(input)'],
    ['tokenizer-fallback', "' '.repeat(n) + '!'", 'nlp(input)'],
    ['remove-spaces', "' '.repeat(n) + 'x'", "const doc = nlp('one two'); doc.docs[0][0].post = input; doc.remove('two')"],
    ['remove-commas', "','.repeat(n) + 'x'", "const doc = nlp('one two'); doc.docs[0][0].post = input; doc.remove('two')"],
    ['output-helper', "','.repeat(n) + 'x'", "textFromTerms([{text: 'word', post: input, tags: new Set()}], {keepPunct: false})"],
    ['ellipse-helper', "'a' + '.'.repeat(n) + 'xx'", 'isSentence(input, {})'],
  ]
  for (const [kind, input, action] of benchmarks) {
    for (const size of [4000, 8000, 16000]) {
      const code = `
        import nlp from './src/three.js';
        import {textFromTerms} from './src/1-one/output/api/_text.js';
        import isSentence from './src/1-one/tokenize/methods/01-sentences/is-sentence.js';
        nlp('warm up');
        const n = ${size};
        const input = ${input};
        const start = performance.now();
        ${action};
        console.log((performance.now() - start).toFixed(2));
      `
      const result = spawnSync(process.execPath, ['--input-type=module', '-e', code], {
        cwd: root, encoding: 'utf8', timeout: 5000,
      })
      console.log(`BENCH ${kind} n=${size}: ${result.error?.code || result.stdout.trim()} ms`)
      if (result.stderr) console.log(result.stderr.trim())
      if (result.error || result.status !== 0) failed++
    }
  }
}
console.log(`\n${passed} passed; ${failed} failed.`)
process.exitCode = failed ? 1 : 0
