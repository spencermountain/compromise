import rip from './rip.js'
import { getOptions, getPool } from './_lib.js'
import fromDocs from '../_lib/document.js'

const workerPool = async function (text, match, opts = {}) {
  const options = getOptions(this, opts)
  if (text.length < options.minLength || options.workers === 1) {
    return fromDocs(this, this(text).match(match).docs)
  }
  const parts = rip(text, this, options.batchSize)
  if (parts.length < 2) {
    return fromDocs(this, this(text).match(match).docs)
  }
  const pool = getPool(this, options.workers)
  if (typeof match === 'string') {
    match = this.parseMatch(match)
  }
  // Promise.all preserves input order even when workers finish out of order.
  const results = await Promise.all(parts.map(part => pool.run({ text: part, match })))
  return fromDocs(this, results.flat(), true)
}

export default workerPool
