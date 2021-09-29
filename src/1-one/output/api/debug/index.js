/* eslint-disable no-console */
import logClientSide from './client-side.js'
import showTags from './tags.js'
import showChunks from './chunks.js'
import showHighlight from './highlight.js'

function isClientSide() {
  return typeof window !== 'undefined' && window.document
}
//output some helpful stuff to the console
const debug = function (opts = {}) {
  let view = this
  if (typeof opts === 'string') {
    let tmp = {}
    tmp[opts] = true //allow string input
    opts = tmp
  }
  if (isClientSide()) {
    logClientSide(view)
    return view
  }
  if (opts.tags !== false) {
    showTags(view)
    console.log('\n')
  }
  // output chunk-view, too
  if (opts.chunks === true) {
    showChunks(view)
    console.log('\n')
  }
  // highlight match in sentence
  if (opts.highlight === true) {
    showHighlight(view)
    console.log('\n')
  }
  return view
}
export default debug
