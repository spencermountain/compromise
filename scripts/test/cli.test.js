import test from 'tape'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const here = '[scripts/test/cli] '
const bin = fileURLToPath(new URL('../../bin/compromise.js', import.meta.url))

// run the cli with args, and optional stdin text
const run = (args, input) => {
  const res = spawnSync(process.execPath, [bin, ...args], { input, encoding: 'utf8' })
  return { out: res.stdout.trim(), err: res.stderr.trim(), code: res.status }
}

test(here + 'json by default', t => {
  const res = run(['she sells seashells'])
  t.equal(res.code, 0, 'exits 0')
  const json = JSON.parse(res.out)
  t.equal(json[0].text, 'she sells seashells', 'parses the text')
  t.equal(json[0].terms.length, 3, 'has terms')
  t.end()
})

test(here + 'text, spec, and debug outputs', t => {
  t.equal(run(['one dog. two cats.', '--out=text']).out, 'one dog.\ntwo cats.', 'one sentence per line')
  t.equal(run(['she sells seashells', '--out=spec']).out, 'she sells seashells {Noun,Vb,Noun}', 'spec format')
  t.ok(run(['she sells seashells', '--out=debug']).out.includes('sells'), 'debug prints the terms')
  t.end()
})

test(here + 'match filters the output', t => {
  t.equal(run(['she sells seashells', '--match=#Verb', '--out=text']).out, 'sells', 'text of matches')
  const json = JSON.parse(run(['she sells seashells', '--match', '#Verb']).out)
  t.equal(json[0].text, 'sells', 'json of matches')
  t.end()
})

test(here + 'stdin, whole and streamed', t => {
  t.equal(run(['--out=text'], 'the cat sat').out, 'the cat sat', 'reads stdin')
  const lines = run(['--stream', '--out=text'], 'one dog\n\ntwo cats\n').out.split('\n')
  t.deepEqual(lines, ['one dog', 'two cats'], 'one output per non-empty line')
  const ndjson = run(['--stream'], 'one dog\ntwo cats\n').out.split('\n')
  t.equal(ndjson.length, 2, 'streamed json is newline-delimited')
  t.equal(JSON.parse(ndjson[1])[0].text, 'two cats', 'each line is valid json')
  t.end()
})

test(here + 'file input', t => {
  const res = run(['--file=' + fileURLToPath(new URL('./_cli-fixture.txt', import.meta.url)), '--out=text'])
  t.equal(res.out, 'the quick brown fox.\njumps over the lazy dog.', 'reads a file')
  t.end()
})

test(here + 'errors and help', t => {
  t.ok(run(['--help']).out.startsWith('Usage:'), 'prints help')
  t.ok(/^\d+\.\d+\.\d+/.test(run(['--version']).out), 'prints version')
  const bad = run(['hi', '--out=nope'])
  t.equal(bad.code, 1, 'bad output exits 1')
  t.ok(bad.err.includes('Unknown output'), 'explains the error')
  t.equal(run(['hi', '--wat']).code, 1, 'unknown option exits 1')
  t.equal(run(['--file=/no/such/file.txt']).code, 1, 'missing file exits 1')
  t.end()
})
