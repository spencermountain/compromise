import path from 'path'
import { fileURLToPath } from 'url'
import { Worker } from 'worker_threads'
const dir = path.dirname(fileURLToPath(import.meta.url))

const makePool = function (count, reg) {
  let workers = []
  for (let i = 0; i < count; i += 1) {
    let info = {
      workerData: {
        workerIndex: i,
        workerCount: count,
        reg
      }
    }
    const file = path.join(dir, './worker.js')
    const worker = new Worker(file, info)
    worker.on('error', (err) => console.error(err))// eslint-disable-line
    workers.push(worker)
  }
  return workers
}
export default makePool