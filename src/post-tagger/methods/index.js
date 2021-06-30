import compile from './compile/index.js'
import bulkMatch from './matcher/index.js'
import bulkTagger from './tagger/index.js'
export { compile }
export { bulkMatch }
export { bulkTagger }
export default {
  compile: compile,
  bulkMatch: bulkMatch,
  bulkTagger: bulkTagger,
}
