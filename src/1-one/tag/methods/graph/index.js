// The tag-inheritance subset of grad-school;
// https://github.com/spencermountain/grad-school
import fromArray from './input/from-array.js'
import { cacheUp, cacheDown } from './crawl/cache.js'
import fillDown from './crawl/fillDown.js'
import out from './out/index.js'

class Graph {
  constructor(json) {
    Object.defineProperty(this, 'json', {
      enumerable: false,
      value: json,
      writable: true,
    })
  }
  cache() {
    cacheUp(this.json)
    return this
  }
  fillDown() {
    fillDown(this.json)
    return this
  }
  out(fmt) {
    // The full API refreshes parent caches before flattening the graph.
    cacheDown(this.json)
    return out(this.json, fmt)
  }
}

const graph = rows => new Graph(fromArray(rows))

export default graph
