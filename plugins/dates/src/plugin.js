import api from './api/index.js'
import compute from './compute/index.js'
import tags from './model/tags.js'
import words from './model/words/index.js'
import regex from './model/regex.js'
import version from './_version.js'

// import matches from './compute/matches.js'

export default {
  tags,
  words,
  compute,
  api,
  mutate: (world) => {
    world.model.two.regexText = world.model.two.regexText || []
    world.model.two.regexText = world.model.two.regexText.concat(regex)
    // net = net || methods.one.buildNet(matches, world)
    // world.model.two.matches = world.model.two.matches.concat(matches)
  },
  hooks: ['dates'],
  version
}