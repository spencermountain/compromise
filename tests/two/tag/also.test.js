import test from 'tape'
import nlp from '../_lib.js'

const here = '[two/also] '

// addTags replaces the compiled tagset; restore it after each synchronous test
// so these custom tags do not change the exhaustive built-in tag matrix.
const isolatedTags = function (t) {
  const model = nlp.world().model.one
  const original = model.tagSet
  t.teardown(() => { model.tagSet = original })
  return nlp
}

test('also: transitive parents, descendants, and exclusions', function (t) {
  const custom = isolatedTags(t)
  custom.addTags({
    Primary: {},
    Secondary: { not: 'Opponent' },
    Extra: { also: 'Secondary' },
    Combined: { is: 'Primary', also: ['Extra', 'Secondary'] },
    Leaf: { is: 'Combined' },
    Opponent: {},
    OpponentChild: { is: 'Opponent' },
  })
  const blank = () => custom('xyz').unTag('*')
  const tagSet = custom.world().model.one.tagSet
  const parents = ['Primary', 'Secondary', 'Extra', 'Combined']
  t.deepEqual([...tagSet.Leaf.parents].sort(), parents.sort(), here + 'deduplicated transitive parents')
  parents.forEach(parent => {
    t.ok(blank().tag('Leaf').has(`#${parent}`), here + `Leaf implies ${parent}`)
    t.ok(tagSet[parent].children.includes('Leaf'), here + `${parent} includes Leaf as a descendant`)
    t.equal(blank().tag('Leaf').unTag(parent).has('#Leaf'), false, here + `removing ${parent} removes Leaf`)
  })
  for (const [first, second] of [['Leaf', 'OpponentChild'], ['OpponentChild', 'Leaf']]) {
    const doc = blank().tag(first)
    const before = [...doc.termList()[0].tags].sort()
    t.equal(doc.canBe(second).found, false, here + `${first} cannot be ${second}`)
    doc.tagSafe(second)
    t.deepEqual([...doc.termList()[0].tags].sort(), before, here + `${second} is rejected without mutation`)
    doc.tag(second)
    t.ok(doc.has(`#${second}`), here + `${second} is assigned`)
    t.equal(doc.has(`#${first}`), false, here + `${first} is removed`)
  }

  // Extending an already compiled tagset must retain the same graph semantics.
  custom.addTags({ Later: { also: ['Leaf'] } })
  t.ok(blank().tag('Later').has('#Secondary'), here + 'later extension inherits also ancestors')
  t.equal(blank().tag('Later').unTag('Secondary').has('#Later'), false, here + 'later extension is a descendant')
  t.equal(blank().tag('OpponentChild').canBe('Later').found, false, here + 'later extension inherits exclusions')
  t.end()
})

test('also: implicit parents and cycle detection', function (t) {
  const custom = isolatedTags(t)
  custom.addTags({ Child: { also: ['ImplicitParent'] } })
  t.ok(custom.world().model.one.tagSet.ImplicitParent, here + 'implicit parent has a tagset entry')
  const doc = custom('xyz').unTag('*').tag('Child')
  t.ok(doc.has('#ImplicitParent'), here + 'implicit parent is assigned')
  t.equal(doc.unTag('ImplicitParent').has('#Child'), false, here + 'implicit parent tracks descendants')

  t.throws(() => custom.addTags({ Loop: { also: ['Loop'] } }), /cyclic tag inheritance/, here + 'self cycle rejected')
  t.throws(() => custom.addTags({
    First: { also: ['Second'] },
    Second: { is: 'First' },
  }), /cyclic tag inheritance/, here + 'mixed is/also cycle rejected')
  t.end()
})
