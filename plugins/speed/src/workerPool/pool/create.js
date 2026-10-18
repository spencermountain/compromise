import { Worker } from 'node:worker_threads'

const makePool = count => {
  const slots = []
  let queue = []
  let cursor = 0
  let closed = false
  let closing

  const close = (error = new Error('Worker pool closed')) => {
    if (!closed) {
      closed = true
      queue.slice(cursor).forEach(job => job.reject(error))
      queue = []
      cursor = 0
      closing = Promise.all(slots.map(slot => {
        if (slot.job) {
          slot.job.reject(error)
          slot.job = null
        }
        return slot.worker.terminate()
      })).then(() => {})
    }
    return closing
  }

  const dispatch = slot => {
    if (closed || slot.job || cursor === queue.length) {
      return
    }
    const job = queue[cursor++]
    if (cursor === queue.length) {
      queue = []
      cursor = 0
    }
    slot.job = job
    slot.worker.ref()
    try {
      slot.worker.postMessage(job.work)
    } catch (err) {
      close(err)
    }
  }

  const createSlot = () => {
    const worker = new Worker(new URL('./worker.js', import.meta.url), {
      // An eval/stdin parent's input mode does not apply to a worker file.
      execArgv: process.execArgv.filter((arg, i, args) => {
        return !arg.startsWith('--input-type') && args[i - 1] !== '--input-type'
      }),
    })
    const slot = { worker, job: null }
    slots.push(slot)
    worker.on('message', docs => {
      if (closed) {
        return
      }
      const job = slot.job
      slot.job = null
      job.resolve(docs)
      worker.unref()
      dispatch(slot)
    })
    worker.on('error', close)
    worker.on('exit', code => {
      if (!closed) {
        close(new Error(`Worker exited unexpectedly (${code})`))
      }
    })
    worker.unref()
    return slot
  }

  const run = work => new Promise((resolve, reject) => {
    if (closed) {
      reject(new Error('Worker pool closed'))
      return
    }
    queue.push({ work, resolve, reject })
    try {
      let slot = slots.find(item => !item.job)
      if (!slot && slots.length < count) {
        slot = createSlot()
      }
      if (slot) {
        dispatch(slot)
      }
    } catch (err) {
      close(err)
    }
  })

  return { run, close, get closed() { return closed } }
}

export default makePool
