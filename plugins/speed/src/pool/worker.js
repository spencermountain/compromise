import { workerData, parentPort } from 'worker_threads'
import nlp from 'compromise'

let { workerIndex } = workerData

let status = {
  workerIndex,
  running: false,
  queue: []
}

const go = function () {
  status.running = true
  console.log(`${workerIndex} running`)
  while (status.queue.length > 0) {
    let txt = status.queue.pop()
    let doc = nlp(txt)
    let m = doc.match('every single #Noun')
    if (m.found) {
      parentPort.postMessage({
        type: 'match',
        status,
        found: m
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