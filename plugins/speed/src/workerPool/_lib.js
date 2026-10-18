import os from 'node:os'
import makePool from './pool/create.js'

const pools = new WeakMap()
const coldMinLength = 500000
const warmMinLength = 64000
const defaultBatchSize = 32000

const integer = (value, name, minimum) => {
  if (!Number.isSafeInteger(value) || value < minimum) {
    throw new RangeError(`${name} must be an integer >= ${minimum}`)
  }
  return value
}

const getOptions = (nlp, opts) => {
  const available = os.availableParallelism ? os.availableParallelism() : os.cpus().length
  const workers = integer(opts.workers ?? Math.min(4, available || 1), 'workers', 1)
  const pool = pools.get(nlp)?.get(workers)
  const minLength = pool && !pool.closed ? warmMinLength : coldMinLength
  return {
    workers,
    minLength: integer(opts.minLength ?? minLength, 'minLength', 0),
    batchSize: integer(opts.batchSize ?? defaultBatchSize, 'batchSize', 1),
  }
}

const getPool = (nlp, count) => {
  if (!pools.has(nlp)) {
    pools.set(nlp, new Map())
  }
  const cache = pools.get(nlp)
  let pool = cache.get(count)
  if (!pool || pool.closed) {
    pool = makePool(count)
    cache.set(count, pool)
  }
  return pool
}

const closeWorkerPool = async function () {
  const cache = pools.get(this)
  pools.delete(this)
  if (cache) {
    await Promise.all(Array.from(cache.values(), pool => pool.close()))
  }
}

export { getOptions, getPool, closeWorkerPool }
