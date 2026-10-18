import test from 'tape'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { nlp, words, rejects, pluginUrl } from './edge-lib.js'

const execute = promisify(execFile)

test('worker options reject invalid values before starting work', async t => {
  const cases = {
    workers: [0, -1, 1.5, NaN, Infinity],
    batchSize: [0, -1, 1.5, NaN, Infinity],
    minLength: [-1, 1.5, NaN, Infinity],
  }
  try {
    for (const [name, values] of Object.entries(cases)) {
      for (const value of values) {
        await rejects(t, () => nlp.workerPool('A cat sleeps.', '.', { [name]: value }), new RegExp(name), `${name} rejects ${value}`)
      }
    }
  } finally {
    await nlp.closeWorkerPool()
  }
  t.end()
})

test('worker batches preserve matches for varied sizes and concurrency', async t => {
  const input = 'Café birds fly. A cat sleeps. ' + 'small '.repeat(150) + 'dogs run. A dog sleeps. Done.'
  const patterns = ['cat', '#Verb', 'missing', nlp.parseMatch('dog'), nlp.buildNet([{ match: 'cat' }, { match: 'dog' }])]
  try {
    for (const workers of [1, 2, 3]) {
      for (const batchSize of [1, 71, input.length + 1]) {
        const options = { workers, batchSize, minLength: 0 }
        const results = await Promise.all(patterns.map(pattern => nlp.workerPool(input, pattern, options)))
        results.forEach((result, i) => {
          t.deepEqual(words(result), words(nlp(input).match(patterns[i])), `${workers} workers, batch ${batchSize}, pattern ${i}`)
        })
      }
    }
    t.equal((await nlp.workerPool('   ', '.', { workers: 3, minLength: 0 })).length, 0, 'whitespace input returns no matches')
  } finally {
    await nlp.closeWorkerPool()
  }
  t.end()
})

test('worker calls do not mix concurrent inputs or retain earlier matches', async t => {
  const inputs = [
    'First cat. Second cat. Third cat.',
    'A bird flies. A dog sleeps. A fish swims.',
    'No matching animals. Nothing here.',
    'A cat runs. A dog walks. Another cat sleeps.',
  ]
  const options = { workers: 2, batchSize: 10, minLength: 0 }
  try {
    const results = await Promise.all(inputs.map(input => nlp.workerPool(input, 'cat', options)))
    results.forEach((result, i) => {
      t.deepEqual(words(result), words(nlp(inputs[i]).match('cat')), 'isolated input ' + i)
    })
    const empty = await nlp.workerPool(inputs[0], 'missing', options)
    t.equal(empty.length, 0, 'reused workers do not retain prior matches')
    await nlp.closeWorkerPool()
    await nlp.closeWorkerPool()
    t.deepEqual(words(await nlp.workerPool(inputs[0], 'cat', options)), words(results[0]), 'reopens after repeated close calls')
  } finally {
    await nlp.closeWorkerPool()
  }
  t.end()
})

test('idle workers do not keep a Node process alive', async t => {
  const script = `
    import nlp from 'compromise'
    import speed from ${JSON.stringify(pluginUrl)}
    nlp.plugin(speed)
    const doc = await nlp.workerPool('One cat. Two cats. Three cats.', '.', {
      workers: 2, minLength: 0, batchSize: 10,
    })
    console.log(doc.text())
  `
  const { stdout, stderr } = await execute(process.execPath, ['--input-type=module', '-e', script], { timeout: 10000 })
  t.equal(stdout.trim(), 'One cat. Two cats. Three cats.', 'child completes without explicitly closing its pool')
  t.equal(stderr, '', 'child exits without errors')
  t.end()
})
