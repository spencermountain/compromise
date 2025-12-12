import { workerData, parentPort } from 'worker_threads'
// import nlp from 'compromise'
import nlp from '../../../../../src/three.js'

const { workerIndex, reg } = workerData

const status = {
  workerIndex,
  running: false,
  queue: []
}

const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

export const isNet = val => val && isObject(val) && val.isNet === true

const go = function () {
  status.running = true
  // console.log(`${workerIndex} running`)
  while (status.queue.length > 0) {
    const txt = status.queue.pop()//.join('')
    status.queue = []
    const doc = nlp(txt)
    const m = doc.match(reg)
    if (m.found) {
      parentPort.postMessage({
        type: 'match',
        status,
        match: m.docs
      })
    }
    // console.log(workerIndex, '  - ', status.queue.length)
  }
  status.running = false
  parentPort.postMessage({
    type: 'drained',
    status,
  })
}

// log the status of this worker, when asked
parentPort.on('message', (msg) => {
  // recieve more sentences to do
  if (msg.type === 'work') {
    status.queue.push(msg.work)
    // kick it off
    if (!status.running) {
      go()
    }
  }
})