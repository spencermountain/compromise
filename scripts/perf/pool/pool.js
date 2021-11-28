import { Worker } from 'worker_threads'
import os from 'os'
const cpus = os.cpus().length

//eslint-disable-next-line
let dir = new URL('./', import.meta.url).pathname // eslint-disable-line

class Pool {
  constructor() {
    this.workers = []
    for (let i = 0; i < cpus; i += 1) {
      this.workers.push(new Worker(dir + '/worker.js'))
      // this.workers.push(new Worker(dir + '/lookup-worker.js'))
    }
  }
  do(msg) {
    let ps = this.workers.map(w => {
      return new Promise(resolve => {
        w.on('message', res => {
          w.removeAllListeners('message')
          resolve(res)
        })
        w.postMessage(msg)
      })
    })
    return Promise.all(ps).then(nums => {
      // console.log(nums)
      let avg = nums.reduce((h, n) => h + n, 0) / nums.length
      avg = Math.round(avg * 10) / 10
      return avg
    })
  }
  count() {
    return this.workers.length
  }
  close() {
    this.workers.forEach(w => w.terminate())
  }
}
export default Pool

// let p = new Pool()
// p.do("hey now, you're a rockstar").then(() => p.close())
