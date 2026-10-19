import test from 'tape'
import nlp from '../../../tests/03-three/lib.js'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const entry = process.env.TESTENV === 'prod' ? '../builds/compromise-speed.mjs' : '../src/plugin.js'
nlp.plugin((await import(entry)).default)

test('keypress reuses sentences and isolates returned documents', t => {
  let parsed = 0
  nlp.plugin({ hooks: ['countSpeedParses'], compute: { countSpeedParses: () => { parsed += 1 } } })
  const cache = {}
  const input = 'The cat sleeps. The dog runs.'
  const first = nlp.keyPress(input, undefined, { cache })
  parsed = 0
  first.replace('cat', 'bird')
  const second = nlp.keyPress(input, undefined, { cache })
  t.equal(parsed, 0, 'unchanged input does not parse again')
  t.equal(second.text(), input, 'returned views do not mutate the cache')
  parsed = 0
  nlp.keyPress('The cat sleeps. The dog walks.', undefined, { cache })
  t.equal(parsed, 1, 'only the edited sentence is parsed')
  const other = {}
  nlp.keyPress('A separate editor.', undefined, { cache: other })
  parsed = 0
  nlp.keyPress(input, undefined, { cache })
  t.equal(parsed, 1, 'another editor does not evict this editor’s sentences')
  t.end()
})

test('keypress invalidates lexical settings and keeps duplicate sentences independent', t => {
  const cache = {}
  nlp.keyPress('zorb.', { zorb: 'Noun' }, { cache })
  t.ok(nlp.keyPress('zorb.', { zorb: 'Adjective' }, { cache }).has('#Adjective'), 'changed lexicon applies on a cache hit')
  nlp.addWords({ zorb: 'Verb' })
  t.ok(nlp.keyPress('zorb.', undefined, { cache }).has('#Verb'), 'external lexical changes invalidate the cache')
  const lex = { zorb: 'Noun' }
  nlp.keyPress('zorb.', lex, { cache })
  lex.zorb = 'Adjective'
  t.ok(nlp.keyPress('zorb.', lex, { cache }).has('#Adjective'), 'in-place lexical edits are detected')
  const doc = nlp.keyPress('The cat sleeps. The cat sleeps. ')
  doc.eq(0).replace('cat', 'bird')
  t.equal(doc.eq(1).text().trim(), 'The cat sleeps.', 'duplicate sentences are independent')
  t.equal(nlp.keyPress('').text(), '', 'empty text works')
  t.end()
})

test('lazy parsing agrees with ordinary matching', t => {
  const input = 'Dogs run. Cats sleep. A cat walks. A bird flies.'
  const patterns = ['cat', '#Verb', 'cat? #Verb', '(cat|#Verb)', '/run|sleep/', '~sleep~', 'missing #Noun']
  patterns.forEach(pattern => {
    t.equal(nlp.lazy(input, pattern).text(), nlp(input).match(pattern).text(), pattern)
  })
  const nets = [
    nlp.buildNet([{ match: 'cat' }, { match: '#Verb' }]),
    nlp.buildNet([{ match: 'cat' }, { match: '/run|sleep/' }]),
    nlp.buildNet([{ match: 'cat' }, { match: 'bird' }]),
  ]
  nets.forEach(net => {
    t.equal(nlp.lazy(input, net).text(), nlp(input).match(net).text(), 'mixed compiled rules')
  })
  const contractions = "He can't go. She's been working. They won't leave."
  t.equal(nlp.lazy(contractions, 'go').text(), nlp(contractions).match('go').text(), 'contractions preserve match boundaries')
  t.end()
})

test('streaming preserves Unicode and sentence boundaries', async t => {
  const dir = await mkdtemp(join(tmpdir(), 'compromise-speed-'))
  const path = join(dir, 'input.txt')
  const input = 'Café déjà vu. ' + 'word '.repeat(300) + 'ends. He said “One. Two. Three.” Then left. Done.'
  try {
    await writeFile(path, input)
    for (const highWaterMark of [1, 7, 400]) {
      const sentences = []
      const result = await nlp.streamFile(path, doc => {
        sentences.push(...doc.out('array'))
        return doc
      }, { highWaterMark })
      t.equal(result.text(), input, 'preserves text with chunk size ' + highWaterMark)
      t.deepEqual(sentences, nlp(input).out('array'), 'preserves sentences')
    }
    const parts = []
    for await (const doc of nlp.streamFileIterator(path, { highWaterMark: 7 })) {
      parts.push(doc.text())
    }
    t.equal(parts.join(''), input, 'iterator preserves text')
    let count = 0
    const result = await nlp.streamFile(path, async doc => {
      count += doc.length
      return doc
    }, { collect: false, highWaterMark: 7 })
    t.equal(count, nlp(input).length, 'async callback receives all sentences')
    t.equal(result.length, 0, 'non-collecting mode retains no results')
    let rejected = false
    try {
      await nlp.streamFile(path, () => { throw new Error('callback failed') })
    } catch (err) {
      rejected = err.message === 'callback failed'
    }
    t.ok(rejected, 'callback errors reject the promise')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
  t.end()
})

test('streaming handles contextual boundaries and early termination', async t => {
  const dir = await mkdtemp(join(tmpdir(), 'compromise-speed-'))
  const path = join(dir, 'input.txt')
  const texts = [
    '',
    '   ',
    'First sentence. Dr. Smith arrived. He went home. Last sentence.',
    'First. Second. He said "Stop. Wait. Go." Then she left. Third. Fourth. Fifth.',
    'First. Second. He left (early. Very early.) Then she left. Third. Fourth. Fifth.',
    'First. Second. Café 🎉. Third. Fourth. Fifth. Sixth. Seventh.',
    '第一句。第二句。第三句。第四句。第五句。',
    'First.\nSecond.\nThird.\nFourth.\nFifth.\n',
  ]
  try {
    for (const input of texts) {
      await writeFile(path, input)
      const sentences = []
      await nlp.streamFile(path, doc => {
        sentences.push(...doc.out('array'))
      }, { highWaterMark: 1, collect: false })
      t.deepEqual(sentences, nlp(input).out('array'), 'boundaries: ' + input.slice(0, 25))
    }
    await writeFile(path, 'A sentence. '.repeat(1000))
    let batches = 0
    for await (const _doc of nlp.streamFileIterator(path, { highWaterMark: 32 })) {
      batches += 1
      break
    }
    t.equal(batches, 1, 'iterator can stop early')
    let rejected = false
    try {
      await nlp.streamFile(join(dir, 'missing.txt'), doc => doc)
    } catch (err) {
      rejected = err.code === 'ENOENT'
    }
    t.ok(rejected, 'file errors reject')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
  t.end()
})

test('worker pooling preserves order, boundaries, and concurrent jobs', async t => {
  const options = { workers: 2, minLength: 0, batchSize: 100 }
  const input = 'A cat walks. ' + 'word '.repeat(200) + 'ends. A dog runs. A bird flies.'
  try {
    const patterns = ['.', 'word ends', '#Noun', 'dog']
    const results = await Promise.all(patterns.map(pattern => nlp.workerPool(input, pattern, options)))
    results.forEach((doc, i) => {
      const words = view => view.json().map(sentence => sentence.terms.map(term => term.text))
      t.deepEqual(words(doc), words(nlp(input).match(patterns[i])), 'ordered matches for ' + patterns[i])
    })
    const local = await nlp.workerPool(input, 'word ends', { ...options, minLength: input.length + 1 })
    t.equal(results[1].text(), local.text(), 'local and parallel results preserve the same punctuation')
    t.equal((await nlp.workerPool('Hi.', '.', options)).text(), 'Hi.', 'short input works')
    t.equal((await nlp.workerPool('', '.', options)).text(), '', 'empty input works')
    t.equal((await nlp.workerPool(input, '.', options)).text(), input, 'pool can be reused')
    const net = nlp.buildNet([{ match: 'cat' }, { match: 'dog' }])
    const netResult = await nlp.workerPool(input, net, options)
    t.equal(netResult.text('normal').trim(), nlp(input).match(net).text('normal').trim(), 'compiled networks work')
    let rejected = false
    try {
      await nlp.workerPool(input, { isNet: true, hooks: null, always: [] }, options)
    } catch {
      rejected = true
    }
    t.ok(rejected, 'worker failures reject')
    t.equal((await nlp.workerPool(input, '.', options)).text(), input, 'pool recovers after failure')
  } finally {
    await nlp.closeWorkerPool()
  }
  t.end()
})

test('worker pools can close pending jobs and reopen', async t => {
  const input = 'A cat walks. '.repeat(500)
  const options = { workers: 2, minLength: 0, batchSize: 100 }
  const pending = nlp.workerPool(input, '.', options).then(() => false, () => true)
  await nlp.closeWorkerPool()
  t.ok(await pending, 'closing a pool rejects unfinished work')
  try {
    t.equal((await nlp.workerPool(input, '.', options)).text(), input, 'closed pools are recreated')
  } finally {
    await nlp.closeWorkerPool()
  }
  t.end()
})
