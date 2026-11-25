import test from 'tape'
import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'
import { fileURLToPath } from 'url'
import { unpack } from 'efrt'
import * as shared from '../../src/shared/index.js'
import { root, importGraph } from './_graph.js'
const here = '[shared] '

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const entry = pkg.exports['./shared'].import

// the i18n libraries import these by name - removing one is a breaking change
test('shared export names', function (t) {
  const want = ['checkSpec', 'clauses', 'europeanNumbers', 'lazy', 'misc', 'properNouns', 'redact', 'tagSet', 'topics']
  t.deepEqual(Object.keys(shared).sort(), want, here + 'export names')
  const pluginKeys = ['api', 'lib', 'model', 'methods', 'compute', 'hooks', 'tags', 'words', 'frozen', 'mutate']
  want.filter(k => k !== 'properNouns' && k !== 'tagSet').forEach(k => {
    const keys = Object.keys(shared[k])
    t.ok(keys.length > 0 && keys.every(key => pluginKeys.includes(key)), here + k + ' is a plugin')
  })
  t.end()
})

// packed by tag, the way each i18n lexicon is - countries and honorifics are translated, so left out
test('shared word-lists', function (t) {
  const want = ['City', 'FemaleName', 'FirstName', 'LastName', 'MaleName', 'Organization', 'Person', 'Place', 'ProperNoun', 'Region']
  t.deepEqual(Object.keys(shared.properNouns).sort(), want, here + 'list names')
  want.forEach(tag => {
    const words = Object.keys(unpack(shared.properNouns[tag]))
    t.ok(words.length > 10 && words.every(str => str !== ''), here + tag + ' unpacks')
    t.ok(shared.tagSet[tag], here + tag + ' is in the tagset')
  })
  t.ok(unpack(shared.properNouns.City).toronto, here + 'has toronto')
  t.ok(unpack(shared.properNouns.Person)['barack obama'], here + 'has multi-word names')
  t.end()
})

test('shared tagset', function (t) {
  const tags = Object.keys(shared.tagSet)
  t.ok(tags.length > 50, here + 'has tags')
  const core = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Value', 'Person', 'Place', 'Organization']
  t.deepEqual(core.filter(tag => !shared.tagSet[tag]), [], here + 'has core tags')
  const parents = tags.map(tag => shared.tagSet[tag].is).filter(str => str)
  t.deepEqual(parents.filter(str => !shared.tagSet[str]), [], here + 'every parent exists')
  t.end()
})

// a file that is not published breaks every import of 'compromise/shared'
test('shared entry is published', function (t) {
  t.ok(fs.existsSync(path.join(root, entry.default)), here + 'entry exists')
  t.ok(fs.existsSync(path.join(root, entry.types)), here + 'types exist')
  const graph = importGraph(entry.default)
  t.deepEqual(graph.missing, [], here + 'no broken imports')
  t.deepEqual(graph.bare, [], here + 'no dependencies')
  const isPublished = file => pkg.files.some(str => file === str || (str.endsWith('/') && file.startsWith(str)))
  const unpublished = Object.keys(graph.files).filter(file => !isPublished(file))
  t.deepEqual(unpublished, [], here + 'every import is in package.json files')
  // guard against pulling-in the english model
  const code = Object.keys(graph.files).filter(file => !file.endsWith('/_built.js'))
  const bytes = code.reduce((sum, file) => sum + graph.files[file], 0)
  t.ok(bytes < 60000, here + `code stays small - ${bytes} bytes`)
  t.end()
})

test('shared types match exports', function (t) {
  const types = fs.readFileSync(path.join(root, entry.types), 'utf8')
  Object.keys(shared).forEach(k => {
    t.ok(types.includes(`export const ${k}:`), here + k + ' has a type')
  })
  t.end()
})

// plugins are applied to one shared View, so use a fresh process
test('shared plugins on a tokenize-only build', function (t) {
  const file = fileURLToPath(new URL('./_bare.js', import.meta.url))
  const res = spawnSync(process.execPath, [file], { encoding: 'utf8' })
  t.equal(res.status, 0, here + 'runs' + res.stderr)
  const out = JSON.parse(res.stdout || '{}')
  t.equal(out.before, 'undefined', here + 'build starts without .people()')
  t.deepEqual(out.threw, {}, here + 'no method throws without a tagger')
  t.deepEqual(out.lib, ['lazy', 'checkSpec', 'assertSpec'], here + 'adds lib methods')
  t.deepEqual(out.parens, ['(the F.B.I. guy)'], here + 'parentheses need no tags')
  t.deepEqual(out.quotes, ['"Paris, France".'], here + 'quotations need no tags')
  t.deepEqual(out.tags, [true, true, true, false], here + 'tagset adds parents and aliases')
  t.deepEqual(out.clauses, ['before we go;', 'we eat'], here + 'clauses split on punctuation')
  t.equal(out.noEnglish, 1, here + 'clauses has no english word-rules')
  t.deepEqual(out.ownRules, ['il part', 'mais elle reste'], here + 'clauses takes rules from the model')
  t.deepEqual(out.spec, ['skip'], here + 'checkSpec runs')
  t.end()
})
