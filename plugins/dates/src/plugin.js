import api from './api/index.js'
import compute from './compute/index.js'
import tags from './model/tags.js'
import words from './model/words/index.js'
import regex from './model/regex.js'
import version from './_version.js'
import debug from './debug.js'

export default {
  tags,
  words,
  compute,
  api,
  mutate: world => {
    // add our regexes
    world.model.two.regexText = world.model.two.regexText || []
    world.model.two.regexText = world.model.two.regexText.concat(regex)
    // add our debug('dates') method
    world.methods.one.debug = world.methods.one.debug || {}
    world.methods.one.debug.dates = debug
  },
  hooks: ['dates'],
  version,
}
