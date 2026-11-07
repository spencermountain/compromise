import test from 'tape'
import fs from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const here = '[scripts/test/cli] '
const bin = fileURLToPath(new URL('../../bin/compromise.js', import.meta.url))

// run the cli with args, and optional stdin text
const run = (args, input, env = { NO_COLOR: '1' }) => {
  const res = spawnSync(process.execPath, [bin, ...args], { input, encoding: 'utf8', env: { ...process.env, ...env } })
  return { out: res.stdout.trim(), err: res.stderr.trim(), code: res.status }
}

test(here + 'json by default', t => {
  const res = run(['--input=she sells seashells'])
  t.equal(res.code, 0, 'exits 0')
  const json = JSON.parse(res.out)
  t.equal(json[0].text, 'she sells seashells', 'parses the text')
  t.equal(json[0].terms.length, 3, 'has terms')
  t.end()
})

test(here + 'text, spec, and debug outputs', t => {
  t.equal(run(['--input=one dog. two cats.', '--format=text']).out, 'one dog.\ntwo cats.', 'one sentence per line')
  t.equal(run(['--input=she sells seashells', '--format=spec']).out, 'she sells seashells {Noun,Vb,Noun}', 'spec format')
  t.ok(run(['--input=she sells seashells', '--format=debug']).out.includes('sells'), 'debug prints the terms')
  t.equal(run(['--input=one dog. two cats.', '--text']).out, 'one dog.\ntwo cats.', '--text alias')
  t.equal(run(['--input=she sells seashells', '--spec']).out, 'she sells seashells {Noun,Vb,Noun}', '--spec alias')
  t.ok(run(['--input=she sells seashells', '--debug']).out.includes('sells'), '--debug alias')
  t.end()
})

test(here + 'jsonl output', t => {
  const one = run(['--input=she sells seashells', '--format=jsonl']).out
  t.equal(one.split('\n').length, 1, 'one line')
  t.equal(JSON.parse(one)[0].text, 'she sells seashells', 'valid json')
  const alias = run(['--input=she sells seashells', '--jsonl']).out
  t.equal(alias.split('\n').length, 1, '--jsonl alias is one line')
  t.equal(JSON.parse(alias)[0].text, 'she sells seashells', '--jsonl alias is valid json')
  t.ok(run(['--stream', '--json'], 'one dog\ntwo cats\n').out.split('\n').length > 2, '--json forces pretty output')
  t.equal(JSON.parse(run(['--input=hi there', '--jsonl', '--offsets']).out)[0].offset.length, 8, 'extras work with jsonl')
  t.end()
})

test(here + 'json extras', t => {
  const json = JSON.parse(run(['--input=she sells seashells', '--offsets', '--bestTag', '--confidence', '--normal', '--root']).out)
  t.deepEqual(json[0].offset, { index: 0, start: 0, length: 19 }, 'sentence offset')
  t.equal(json[0].terms[1].offset.start, 4, 'term offset')
  t.equal(json[0].terms[1].bestTag, 'PresentTense', 'best tag')
  t.equal(typeof json[0].confidence, 'number', 'confidence')
  t.equal(json[0].normal, 'she sells seashells', 'normal')
  t.equal(json[0].root, 'she sell seashell', 'root')
  const plain = JSON.parse(run(['--input=she sells seashells']).out)
  t.equal(plain[0].offset, undefined, 'no extras by default')
  const bad = run(['--input=hi', '--text', '--offsets'])
  t.equal(bad.code, 1, 'extras need json output')
  t.ok(bad.err.includes('--offsets'), 'names the flag')
  t.end()
})

test(here + 'match filters the output', t => {
  t.equal(run(['--input=she sells seashells', '--match=#Verb', '--format=text']).out, 'sells', 'text of matches')
  const json = JSON.parse(run(['--input=she sells seashells', '--match', '#Verb']).out)
  t.equal(json[0].text, 'sells', 'json of matches')
  t.end()
})

test(here + 'if keeps whole sentences', t => {
  const text = 'and but so she left. he stayed. and but so it goes.'
  t.equal(run(['--input=' + text, '--if=and but so', '--text']).out, 'and but so she left.\nand but so it goes.', 'sentences with a match')
  t.equal(run(['--input=' + text, '--if=#Verb', '--match=#Pronoun', '--text']).out, 'she\nhe\nit', 'if runs before match')
  t.equal(run(['--input=' + text, '--if=nothing', '--text']).out, '', 'no sentences, no output')
  t.end()
})

test(here + 'has stops at the first sentence', t => {
  const text = 'and but so she left. he stayed. and but so it goes.'
  t.equal(run(['--input=' + text, '--has=and but so', '--text']).out, 'and but so she left.', 'first sentence only')
  t.equal(run(['--input=' + text, '--has=and but so', '--match=#Verb', '--text']).out, 'left.', 'has runs before match')
  const lines = run(['--stream', '--has=and but so', '--text'], 'he stayed\nand but so she left\nand but so it goes\n').out
  t.equal(lines, 'and but so she left', 'stops the stream after the first hit')
  t.equal(run(['--input=' + text, '--has=nothing', '--text']).out, '', 'no sentences, no output')
  t.end()
})

test(here + 'highlight output', t => {
  const text = 'the quick brown fox jumps over the lazy dog. nothing here.'
  t.equal(run(['--input=' + text, '--highlight', '--match=lazy']).out, 'the quick brown fox jumps over the lazy dog.', 'plain with NO_COLOR')
  const color = run(['--input=' + text, '--highlight', '--match=lazy'], undefined, {}).out
  t.ok(color.includes('\x1b[32mlazy'), 'match is green')
  t.ok(color.includes('\x1b[90mthe '), 'context is grey')
  t.equal(run(['--input=' + text, '--highlight', '--match=lazy', '--width=20']).out, '… over the lazy dog.', 'trims the longer side')
  t.equal(run(['--input=' + text, '--highlight', '--match=quick', '--width=20']).out, 'the quick brown fox …', 'trims the other side')
  t.equal(run(['--input=' + text, '--highlight', '--match=jumps', '--width=1']).out, '… jumps …', 'never trims the match')
  t.equal(run(['--input=' + text, '--highlight', '--if=lazy']).out, 'the quick brown fox jumps over the lazy dog.', 'if supplies the pattern')
  t.equal(run(['--input=' + text, '--highlight', '--match=zebra']).out, '', 'no match, no output')
  t.equal(run(['--input=' + text, '--highlight']).code, 1, 'needs a pattern')
  t.equal(run(['--input=' + text, '--highlight', '--match=lazy', '--width=0']).code, 1, 'width must be positive')
  t.end()
})

test(here + 'stdin, whole and streamed', t => {
  t.equal(run(['--format=text'], 'the cat sat').out, 'the cat sat', 'reads stdin')
  const lines = run(['--stream', '--format=text'], 'one dog\n\ntwo cats\n').out.split('\n')
  t.deepEqual(lines, ['one dog', 'two cats'], 'one output per non-empty line')
  const ndjson = run(['--stream'], 'one dog\ntwo cats\n').out.split('\n')
  t.equal(ndjson.length, 2, 'streamed json is newline-delimited')
  t.equal(JSON.parse(ndjson[1])[0].text, 'two cats', 'each line is valid json')
  t.end()
})

test(here + 'file input', t => {
  const res = run([fileURLToPath(new URL('./_cli-fixture.txt', import.meta.url)), '--format=text'])
  t.equal(res.out, 'the quick brown fox.\njumps over the lazy dog.', 'reads a file')
  t.end()
})

test(here + 'errors and help', t => {
  t.ok(run(['--help']).out.startsWith('Usage:'), 'prints help')
  t.ok(/^\d+\.\d+\.\d+/.test(run(['--version']).out), 'prints version')
  const bad = run(['--input=hi', '--format=nope'])
  t.equal(bad.code, 1, 'bad output exits 1')
  t.ok(bad.err.includes('Unknown format'), 'explains the error')
  t.equal(run(['--input=hi', '--wat']).code, 1, 'unknown option exits 1')
  t.equal(JSON.parse(run(['--input', 'one dog', '--input', 'two cats']).out.split('\n')[1])[0].text, 'two cats', 'each --input is its own document')
  t.equal(run(['/no/such/file.txt']).code, 1, 'missing file exits 1')
  t.end()
})

test(here + 'glob input is newline-delimited json', { skip: !fs.promises.glob }, t => {
  const two = fileURLToPath(new URL('./_cli-fixture-two.txt', import.meta.url))
  fs.writeFileSync(two, 'hello there.\n')
  const res = run([fileURLToPath(new URL('./_cli-fixture*.txt', import.meta.url))])
  fs.unlinkSync(two)
  const lines = res.out.split('\n')
  t.equal(lines.length, 2, 'one line per file')
  const texts = lines.map(line => JSON.parse(line)[0].text).sort()
  t.deepEqual(texts, ['hello there.', 'the quick brown fox.'], 'each line is valid json')
  t.end()
})
