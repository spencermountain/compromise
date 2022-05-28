import { workerData, parentPort } from 'worker_threads'
// import nlp from 'compromise'
import nlp from '../../../../../src/three.js'

let { workerIndex, reg } = workerData

let status = {
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
    let txt = status.queue.join('')
    status.queue = []
    let doc = nlp(txt)
    let m = doc.match(reg)
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
    msg.work.forEach(str => {
      status.queue.push(str)
    })
    // kick it off
    if (!status.running) {
      go()
    }
  }
})