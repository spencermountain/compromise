import fs from 'node:fs'
import { sentenceBuffer } from './sentences.js'

// expand paths or globs into file paths (fs.glob is node 22+; older nodes get the literal path)
const expandFiles = async function (patterns) {
  const paths = []
  for (const pattern of patterns) {
    if (fs.promises.glob) {
      for await (const p of fs.promises.glob(pattern)) {
        paths.push(p)
      }
    } else {
      paths.push(pattern)
    }
  }
  if (patterns.length > 0 && paths.length === 0) {
    throw new Error(`No files matched: ${patterns.join(', ')}`)
  }
  return paths
}

// every input, as something that yields utf8 chunks
const sources = function* (opts, paths) {
  for (const text of opts.text) {
    yield { name: 'input', chunks: [text] }
  }
  for (const path of paths) {
    yield { name: path, chunks: fs.createReadStream(path, { encoding: 'utf8' }) }
  }
  if (opts.text.length === 0 && paths.length === 0 && !process.stdin.isTTY) {
    process.stdin.setEncoding('utf8')
    yield { name: 'stdin', chunks: process.stdin }
  }
}

// sentence-aligned batches of text, as each input arrives.
// `offset` is where the batch starts in its source, in characters
const batches = async function* (nlp, opts, paths) {
  for (const source of sources(opts, paths)) {
    const buffer = sentenceBuffer(nlp)
    let offset = 0
    for await (const chunk of source.chunks) {
      const ready = buffer.push(chunk)
      if (ready) {
        yield { text: ready, offset, file: source.name }
        offset += ready.length
      }
    }
    const tail = buffer.finish()
    if (tail) {
      yield { text: tail, offset, file: source.name }
    }
  }
}

export { expandFiles, batches }
