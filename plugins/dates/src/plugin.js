import api from './api/index.js'
import compute from './compute/index.js'
import tags from './model/tags.js'
import words from './model/words/index.js'
import regex from './model/regex.js'

export default {
  tags,
  words,
  compute,
  api,
  mutate: (world) => {
    world.model.two.regexNormal = world.model.two.regexNormal.concat(regex)
  },
  hooks: ['dates']
}