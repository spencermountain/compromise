import nlp from 'compromise'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const entry = process.env.TESTENV === 'prod' ? '../builds/compromise-speed.mjs' : '../src/plugin.js'
const pluginUrl = new URL(entry, import.meta.url).href
nlp.plugin((await import(pluginUrl)).default)

const words = doc => doc.json().map(sentence => sentence.terms.map(term => term.text))

const withFile = async (text, run, encoding = 'utf8') => {
  const dir = await mkdtemp(join(tmpdir(), 'speed-edge-'))
  const path = join(dir, 'input.txt')
  try {
    await writeFile(path, text, encoding)
    await run(path)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
}

const rejects = async (t, run, pattern, label) => {
  try {
    await run()
    t.fail(label)
  } catch (err) {
    t.ok(pattern.test(err.message), label + ': ' + err.message)
  }
}

export { nlp, words, withFile, rejects, pluginUrl }
