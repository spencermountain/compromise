import test from 'tape'
import model from '../../../src/2-two/postTagger/model/index.js'
import secondPass from '../../../src/2-two/postTagger/model/second-pass.js'

test('post-tagger reasons are unique kebab-case names', t => {
  const rules = [...model.two.matches, ...secondPass]
  const reasons = rules.map(rule => rule.reason)
  const invalid = reasons.filter(reason => typeof reason !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(reason))
  const duplicates = reasons.filter((reason, i) => reasons.indexOf(reason) !== i)
  t.deepEqual(invalid, [], 'every expanded rule has a kebab-case reason')
  t.deepEqual(duplicates, [], 'reasons are unique across both passes')
  t.end()
})
