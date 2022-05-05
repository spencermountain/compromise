import makeNet from './build/index.js'
import bulkMatch from './sweep/index.js'
import bulkTagger from './tagger/index.js'

export default {
  compile: makeNet,
  bulkMatch,
  bulkTagger
}