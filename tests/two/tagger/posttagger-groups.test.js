import test from 'tape'
import nlp from '../../../src/two.js'
import model from '../../../src/2-two/postTagger/model/index.js'
import secondPass from '../../../src/2-two/postTagger/model/second-pass.js'

test('post-tagger captures and groups agree', t => {
  const world = nlp.world()
  const invalid = [...model.two.matches, ...secondPass].filter(rule => {
    const terms = world.methods.one.parseMatch(rule.match, {}, world)
    const groups = terms.filter(term => term.group !== undefined).map(term => String(term.group))
    if (rule.group === undefined) {
      return groups.length > 0
    }
    return !groups.includes(String(rule.group))
  })
  t.deepEqual(invalid.map(rule => rule.reason), [], 'each capture has a group, and each group selects a capture')
  t.end()
})
