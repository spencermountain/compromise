// The tag-inheritance subset of grad-school;
// https://github.com/spencermountain/grad-school
import fromArray from './input/from-array.js'
import cacheParents from './crawl/cache.js'
import fillDown from './crawl/fillDown.js'
import nodesByDepth from './toArray.js'

class Graph {
  constructor(json) {
    Object.defineProperty(this, 'json', {
      enumerable: false,
      value: json,
      writable: true,
    })
  }
  cache() {
    cacheParents(this.json)
    return this
  }
  fillDown() {
    fillDown(this.json)
    return this
  }
  // the graph's nodes, parents first
  toArray() {
    // fillDown changes properties, so the cached graph relationships still hold.
    return nodesByDepth(this.json)
  }
}

const graph = rows => new Graph(fromArray(rows))

export default graph
