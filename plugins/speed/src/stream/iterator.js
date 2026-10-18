import { createReadStream } from 'node:fs'
import { sentenceBuffer } from '../_lib/sentences.js'

const streamFileIterator = async function* (path, opts = {}) {
  const options = typeof opts === 'string' ? { encoding: opts } : { ...opts }
  delete options.collect
  // Let the stream decoder retain partial multibyte characters between reads.
  options.encoding ||= 'utf8'
  const stream = createReadStream(path, options)
  const buffer = sentenceBuffer(this)
  for await (const chunk of stream) {
    const ready = buffer.push(chunk)
    if (ready) {
      yield this(ready)
    }
  }
  const tail = buffer.finish()
  if (tail) {
    yield this(tail)
  }
}

export default streamFileIterator
