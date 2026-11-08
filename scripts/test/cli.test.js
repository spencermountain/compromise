import test from 'tape'
import fs from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const here = '[scripts/test/cli] '
const bin = fileURLToPath(new URL('../../bin/compromise.js', import.meta.url))
const fixture = fileURLToPath(new URL('./_cli-fixture.txt', import.meta.url))

// run the cli with args, and optional stdin text. colours are off unless env says otherwise
const run = (args, input, env = { NO_COLOR: '1' }) => {
  const res = spawnSync(process.execPath, [bin, ...args], { input, encoding: 'utf8', env: { ...process.env, ...env } })
  return { out: res.stdout.trim(), raw: res.stdout.trimEnd(), err: res.stderr.trim(), code: res.status }
}
const lines = res => res.out.split('\n').filter(Boolean).map(line => JSON.parse(line))

test(here + 'jsonl by default, one line per sentence', t => {
  const res = run(['--input=she sells seashells. he walked home.'])
  t.equal(res.code, 0, 'exits 0')
  const json = lines(res)
  t.equal(json.length, 2, 'two lines')
  t.equal(json[0].text, 'she sells seashells.', 'first sentence')
  t.equal(json[1].terms.length, 3, 'has terms')
  t.equal(lines(run(['--input=one dog.', '--jsonl']))[0].text, 'one dog.', '--jsonl is the same')
  t.equal(run(['--input=hi', '--format=json']).code, 1, 'pretty json is gone')
  t.end()
})

test(here + 'text, spec, and debug outputs', t => {
  t.equal(run(['--input=one dog. two cats.', '--text']).out, 'one dog.\ntwo cats.', 'one sentence per line')
  t.equal(run(['--input=one dog. two cats.', '--format', 'spec']).out, 'one dog. {Val,Noun}\ntwo cats. {Val,Noun}', 'spec format')
  t.ok(run(['--input=she sells seashells', '--debug']).out.includes('sells'), 'debug prints the terms')
  t.end()
})

test(here + 'json extras', t => {
  const json = lines(run(['--input=she sells seashells', '--offsets', '--bestTag', '--confidence', '--normal', '--root']))[0]
  t.deepEqual(json.offset, { index: 0, start: 0, length: 19 }, 'sentence offset')
  t.equal(json.terms[1].offset.start, 4, 'term offset')
  t.equal(json.terms[1].bestTag, 'PresentTense', 'best tag')
  t.equal(typeof json.confidence, 'number', 'confidence')
  t.equal(json.normal, 'she sells seashells', 'normal')
  t.equal(json.root, 'she sell seashell', 'root')
  t.equal(lines(run(['--input=she sells seashells']))[0].offset, undefined, 'no extras by default')
  const bad = run(['--input=hi', '--text', '--offsets'])
  t.equal(bad.code, 1, 'extras need jsonl output')
  t.ok(bad.err.includes('--offsets'), 'names the flag')
  t.end()
})

test(here + 'match, if, and has', t => {
  const text = 'and but so she left. he stayed. and but so it goes.'
  t.equal(run(['--input=' + text, '--match=#Pronoun', '--text']).out, 'she\nhe\nit', 'one line per match')
  t.equal(lines(run(['--input=' + text, '--match', '#Pronoun']))[1].text, 'he', 'json of matches')
  t.equal(run(['--input=' + text, '--if=and but so', '--text']).out, 'and but so she left.\nand but so it goes.', 'if keeps sentences')
  t.equal(run(['--input=' + text, '--if=#Verb', '--match=#Pronoun', '--text']).out, 'she\nhe\nit', 'if runs before match')
  t.equal(run(['--input=' + text, '--has=and but so', '--text']).out, 'and but so she left.', 'has keeps the first sentence')
  t.equal(run(['--input=' + text, '--has=and but so', '--match=#Verb', '--text']).out, 'left.', 'has runs before match')
  t.equal(run(['--input=' + text, '--if=nothing', '--text']).out, '', 'no sentences, no output')
  t.end()
})

test(here + 'highlight output', t => {
  const text = 'the quick brown fox jumps over the lazy dog. nothing here.'
  const col = str => str.indexOf('lazy')
  const plain = run(['--input=' + text, '--highlight', '--match=lazy']).raw
  t.equal(plain, '… brown fox jumps over the lazy dog.', 'plain with NO_COLOR, left trimmed to half')
  t.equal(col(plain), 27, 'match starts at the middle column of 55')
  const color = run(['--input=' + text, '--highlight', '--match=lazy'], undefined, {}).raw
  t.ok(color.includes('\x1b[32mlazy'), 'match is green')
  t.ok(color.includes('\x1b[90mfox '), 'context is grey')
  const narrow = run(['--input=' + text, '--highlight', '--match=lazy', '--width=20']).raw
  t.equal(narrow, '    … the lazy dog.', 'trims the left to half, then pads')
  t.equal(col(narrow), 10, 'still at the middle column')
  t.equal(run(['--input=' + text, '--highlight', '--match=quick', '--width=20']).raw, '      the quick …', 'pads the left, trims the right')
  t.equal(run(['--input=' + text, '--highlight', '--match=jumps', '--width=1']).raw, '… jumps …', 'never trims the match')
  t.equal(run(['--input=' + text, '--highlight', '--if=lazy']).raw, plain, 'if supplies the pattern')
  t.equal(run(['--input=' + text, '--highlight', '--match=zebra']).raw, '', 'no match, no output')
  t.equal(run(['--input=' + text, '--highlight']).code, 1, 'needs a pattern')
  t.equal(run(['--input=' + text, '--highlight', '--match=lazy', '--width=0']).code, 1, 'width must be positive')
  const twice = run(['--input=the lazy fox and the lazy dog.', '--highlight', '--match=lazy', '--width=16']).raw.split('\n')
  t.deepEqual(twice, ['    the lazy …', '  … the lazy …'], 'one line per match, each trimmed around its own')
  t.equal(col(twice[0]), col(twice[1]), 'both matches share a column')
  const grouped = run(['--input=the lazy fox and the lazy dog.', '--highlight', '--match=lazy'], undefined, {}).raw
  t.ok(grouped.split('\n')[0].includes('\x1b[90mlazy '), 'the other match is grey on each line')
  t.end()
})

test(here + 'stdin', t => {
  t.equal(run(['--text'], 'the cat sat').out, 'the cat sat', 'reads stdin')
  const two = run(['--text'], 'one dog\n\ntwo cats\n').out.split('\n')
  t.deepEqual(two, ['one dog', 'two cats'], 'splits on sentence boundaries')
  // the tokenizer keeps a line break inside this one; every format must still print one line per sentence
  const inner = 'one dog\n\n. two cats.'
  const count = lines(run([], inner)).length
  t.ok(lines(run([], inner)).some(o => o.text.includes('\n')), 'jsonl keeps the raw line break')
  t.equal(run(['--text'], inner).out.split('\n').length, count, 'text: one line per sentence')
  t.equal(run(['--spec'], inner).out.split('\n').length, count, 'spec: one line per sentence')
  t.equal(run(['--highlight', '--match=dog'], inner).raw.split('\n').length, 1, 'highlight: one line per match')
  t.equal(run(['--has=two', '--text'], 'one dog. two cats. three birds.').out, 'two cats.', 'has stops at the first hit')
  t.end()
})

test(here + 'files and globs', t => {
  t.equal(run([fixture, '--text']).out, 'the quick brown fox.\njumps over the lazy dog.', 'reads a file')
  const text = fs.readFileSync(fixture, 'utf8')
  const json = lines(run([fixture, '--offsets']))
  t.equal(json[1].offset.start, text.indexOf('jumps'), 'offsets count from the start of the file')
  t.equal(json[1].terms[0].offset.start, text.indexOf('jumps'), 'term offsets too')
  const many = lines(run(['--input=one dog.', fixture]))
  t.equal(many.length, 3, 'inputs and files are all sentences in one stream')
  t.equal(run(['/no/such/file.txt']).code, 1, 'missing file exits 1')
  t.end()
})

test(here + 'glob input', { skip: !fs.promises.glob }, t => {
  const two = fileURLToPath(new URL('./_cli-fixture-two.txt', import.meta.url))
  fs.writeFileSync(two, 'hello there.\n')
  const res = run([fileURLToPath(new URL('./_cli-fixture*.txt', import.meta.url)), '--text'])
  fs.unlinkSync(two)
  t.deepEqual(res.out.split('\n').sort(), ['hello there.', 'jumps over the lazy dog.', 'the quick brown fox.'], 'all files, one line per sentence')
  t.end()
})

test(here + 'a long file streams', t => {
  // 3000 sentences, well past one read chunk - output must arrive in order and complete
  const big = fileURLToPath(new URL('./_cli-fixture-big.txt', import.meta.url))
  fs.writeFileSync(big, Array.from({ length: 3000 }, (_, i) => `sentence number ${i} is here.`).join(' '))
  const res = run([big, '--text']).out.split('\n')
  fs.unlinkSync(big)
  t.equal(res.length, 3000, 'every sentence')
  t.equal(res[2999], 'sentence number 2999 is here.', 'in order, to the end')
  t.end()
})

test(here + 'errors and help', t => {
  t.ok(run(['--help']).out.startsWith('Usage:'), 'prints help')
  t.ok(/^\d+\.\d+\.\d+/.test(run(['--version']).out), 'prints version')
  const bad = run(['--input=hi', '--format=nope'])
  t.equal(bad.code, 1, 'bad format exits 1')
  t.ok(bad.err.includes('Unknown format'), 'explains the error')
  t.equal(run(['--input=hi', '--wat']).code, 1, 'unknown option exits 1')
  t.equal(run(['--input=hi', '--stream']).code, 1, '--stream is gone')
  t.end()
})
