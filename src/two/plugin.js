import preTagger from './pre-tagger/index.js'
import contractions from './contractions/index.js'
import postTagger from './post-tagger/index.js'

const plugin = world => {
  preTagger(world)
  contractions(world)
  postTagger(world)
}
export default plugin
