import nouns from './nouns.js'
import verbs from './verbs.js'
import values from './values.js'
import misc from './misc.js'
import inferTags from './_lib/index.js'

let tags = Object.assign({}, nouns, verbs, values, misc)
// do the graph-stuff
tags = inferTags(tags)
export default tags
