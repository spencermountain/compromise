import api from './api/index.js'
import compute from './compute/index.js'
import tags from './tags.js'
import words from './words/index.js'

export default {
  tags,
  words,
  compute,
  api,
  hooks: ['dates']
}