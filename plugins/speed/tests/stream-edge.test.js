import test from 'tape'
import { nlp, words, withFile, rejects } from './edge-lib.js'

test('streaming handles byte boundaries and explicit encodings', async t => {
  const input = 'Café 🎉. Naïve birds fly. 日本語。A résumé arrived. Last sentence.'
  await withFile(input, async path => {
    for (const highWaterMark of [1, 2, 3, 7, 64, 257, 4096]) {
      const result = await nlp.streamFile(path, doc => doc, { highWaterMark })
      t.equal(result.text(), nlp(input).text(), 'UTF-8 text with ' + highWaterMark + '-byte reads')
      t.deepEqual(words(result), words(nlp(input)), 'UTF-8 terms with ' + highWaterMark + '-byte reads')
    }
  })
  for (const encoding of ['utf16le', 'latin1']) {
    const text = 'Café déjà vu. A résumé arrived. Done.'
    await withFile(text, async path => {
      const result = await nlp.streamFile(path, doc => doc, { encoding, highWaterMark: 1 })
      t.equal(result.text(), text, encoding + ' with one-byte reads')
      t.equal((await nlp.streamFile(path, doc => doc, encoding)).text(), text, encoding + ' string option')
    }, encoding)
  }
  t.end()
})

test('streaming awaits callbacks and can select or discard results', async t => {
  const input = 'A cat walks. A dog runs. A cat sleeps. A bird flies. '.repeat(8)
  await withFile(input, async path => {
    let active = 0
    let peak = 0
    const received = []
    const selected = await nlp.streamFile(path, async doc => {
      active += 1
      peak = Math.max(peak, active)
      await Promise.resolve()
      received.push(doc.text())
      active -= 1
      return doc.match('cat')
    }, { highWaterMark: 17 })
    t.equal(peak, 1, 'callbacks do not overlap')
    t.equal(active, 0, 'the final callback finishes before resolution')
    t.equal(received.join(''), input, 'callbacks see all text in order')
    t.deepEqual(words(selected), words(nlp(input).match('cat')), 'only selected matches are collected')
    for (const result of [undefined, null, false]) {
      const empty = await nlp.streamFile(path, () => result, { highWaterMark: 17 })
      t.equal(empty.length, 0, 'callback may return ' + result)
    }
    const none = await nlp.streamFile(path, doc => doc.match('missing'))
    t.equal(none.length, 0, 'empty selections are not collected')
    let callbacks = 0
    const discarded = await nlp.streamFile(path, doc => {
      callbacks += 1
      return doc
    }, { highWaterMark: 17, collect: false })
    t.ok(callbacks > 1, 'non-collecting mode processes multiple batches')
    t.equal(discarded.length, 0, 'non-collecting mode returns an empty View')
  })
  t.end()
})

test('streaming propagates async failures and keeps subsequent reads usable', async t => {
  await withFile('A cat sleeps. A dog runs. '.repeat(20), async path => {
    let calls = 0
    await rejects(t, () => nlp.streamFile(path, async () => {
      calls += 1
      await Promise.resolve()
      throw new Error('async filter failure')
    }, { highWaterMark: 8 }), /async filter failure/, 'async callback failure rejects')
    t.equal(calls, 1, 'processing stops after the failing callback')
    await rejects(t, async () => {
      for await (const _doc of nlp.streamFileIterator(path + '.missing')) {
        t.fail('missing file must not yield a document')
      }
    }, /ENOENT/, 'iterator file errors propagate')
    const result = await nlp.streamFile(path, doc => doc)
    t.ok(result.found, 'subsequent reads still work')
  })
  t.end()
})

test('streaming keeps very long words and sentences intact', async t => {
  const input = 'Intro. ' + 'x'.repeat(20000) + ' finishes. ' + 'small '.repeat(2000) + 'ends. Last.'
  await withFile(input, async path => {
    const received = []
    for await (const doc of nlp.streamFileIterator(path, { highWaterMark: 31 })) {
      received.push(...words(doc))
    }
    t.deepEqual(received, words(nlp(input)), 'long content is not split into artificial sentences or terms')
  })
  t.end()
})
