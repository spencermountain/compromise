import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../', import.meta.url))
const runtime = 'src/2-two/preTagger/model/lexicon/'

const list = dir => fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap(entry => {
  const file = path.join(dir, entry.name)
  if (entry.isDirectory()) {
    return list(file)
  }
  return file.endsWith('.js') ? [file] : []
})

// Literal source hits deliberately do not claim merge/expansion provenance.
const sources = word => {
  const files = [...list('data/lexicon'), ...['misc.js', 'frozenLex.js', 'emoticons.js'].map(file => runtime + file)]
  const quoted = [`'${word}'`, `"${word}"`]
  return files.sort().flatMap(file => fs.readFileSync(path.join(root, file), 'utf8').split('\n').flatMap((text, i) => {
    const line = text.trim()
    if (quoted.some(value => line.includes(value)) || line.startsWith(word + ':')) {
      return [{ file: file.split(path.sep).join('/'), line: i + 1, text: line }]
    }
    return []
  }))
}

export default sources
