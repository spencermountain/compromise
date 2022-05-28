import rip from './rip.js'
import makePool from './pool.js'
import os from 'os'
const cpuCount = os.cpus().length
let workerCount = cpuCount


const workerPool = function (txt) {
  let workers = makePool(workerCount)
  let parts = rip(txt, workerCount)
  let results = []

  // workers.foreach
  workers.forEach((worker, i) => {
    worker.postMessage({ type: 'work', work: parts[i] || [] })
  })


  return new Promise((resolve, reject) => {
    let isRunning = workers.map(_ => true)

    // setup listeners
    workers.forEach(worker => {
      worker.on('message', (msg) => {
        if (msg.type === 'match') {
          results.push(msg.match)
        }
        if (msg.type === 'drained') {
          let index = msg.status.workerIndex
          isRunning[index] = false
          console.log(index, 'drained')

          if (isRunning.every(b => b === false)) {
            resolve(results)
            workers.forEach(w => w.terminate())
            console.log('done!')
          }
        }
      })


    })



  })
}
export default workerPool

