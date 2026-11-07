import test from 'tape'
import nlp from '../lib.js'

const here = '[two/tag/allow] '

// addTags replaces the compiled tagset; restore it after each synchronous test
const isolatedTags = function (t) {
  const model = nlp.world().model.one
  const { tagSet, tagAliases } = model
  t.teardown(() => {
    model.tagSet = tagSet
    model.tagAliases = tagAliases
  })
  return nlp
}

const coexist = (custom, t, first, second) => {
  const blank = () => custom('xyz').unTag('*')
  for (const method of ['tag', 'tagSafe']) {
    const doc = blank().tag(first)
    t.ok(doc.canBe(second).found, here + `${first} can be ${second}`)
    doc[method](second)
    t.ok(doc.has(`#${first}`) && doc.has(`#${second}`), here + `${first} -> ${method}(${second}) keeps both`)
  }
}

const conflict = (custom, t, first, second) => {
  const blank = () => custom('xyz').unTag('*')
  const doc = blank().tag(first)
  const before = [...doc.termList()[0].tags].sort()
  t.equal(doc.canBe(second).found, false, here + `${first} cannot be ${second}`)
  doc.tagSafe(second)
  t.deepEqual([...doc.termList()[0].tags].sort(), before, here + `${second} is safely rejected`)
  doc.tag(second)
  t.ok(doc.has(`#${second}`) && !doc.has(`#${first}`), here + `${second} replaces ${first}`)
}

test('allow: an exception to an inherited exclusion', function (t) {
  const custom = isolatedTags(t)
  custom.addTags({
    Left: { not: 'Right' },
    Right: {},
    LeftKid: { is: 'Left', allow: ['RightKid'] },
    LeftOther: { is: 'Left' },
    RightKid: { is: 'Right' },
    RightOther: { is: 'Right' },
  })
  const tagSet = custom.world().model.one.tagSet
  // the exception is mutual, and keeps each side's parents
  for (const [first, second] of [['LeftKid', 'RightKid'], ['RightKid', 'LeftKid']]) {
    coexist(custom, t, first, second)
    const doc = custom('xyz').unTag('*').tag(first).tag(second)
    t.ok(doc.has('#Left') && doc.has('#Right'), here + `${first} + ${second} keep both parents`)
  }
  t.notOk(tagSet.LeftKid.not.includes('RightKid'), here + 'LeftKid no longer excludes RightKid')
  t.notOk(tagSet.RightKid.not.includes('LeftKid'), here + 'RightKid no longer excludes LeftKid')
  t.deepEqual(tagSet.RightKid.allow, ['LeftKid'], here + 'the exception is recorded on both tags')
  // everything else keeps the exclusion, including the parents themselves
  conflict(custom, t, 'Left', 'Right')
  conflict(custom, t, 'Right', 'Left')
  conflict(custom, t, 'LeftKid', 'Right')
  conflict(custom, t, 'Right', 'LeftKid')
  conflict(custom, t, 'Left', 'RightKid')
  conflict(custom, t, 'LeftOther', 'RightKid')
  conflict(custom, t, 'RightKid', 'LeftOther')
  conflict(custom, t, 'LeftKid', 'RightOther')
  conflict(custom, t, 'RightOther', 'LeftKid')
  t.ok(tagSet.LeftKid.not.includes('RightOther'), here + 'LeftKid still excludes siblings of the allowed tag')
  t.ok(tagSet.Left.not.includes('RightKid'), here + 'parent still excludes the allowed tag')

  // descendants added later inherit the exception
  custom.addTags({ RightGrandKid: { is: 'RightKid' }, LeftGrandKid: { is: 'LeftKid' } })
  coexist(custom, t, 'LeftKid', 'RightGrandKid')
  coexist(custom, t, 'RightGrandKid', 'LeftKid')
  coexist(custom, t, 'LeftGrandKid', 'RightKid')
  coexist(custom, t, 'LeftGrandKid', 'RightGrandKid')
  conflict(custom, t, 'LeftOther', 'RightGrandKid')
  t.end()
})

test('allow: string and array forms normalize identically', function (t) {
  const compile = nlp.world().methods.one.addTags
  const base = { Left: { not: 'Right' }, Right: {}, RightKid: { is: 'Right' } }
  const stringForm = compile({ ...base, LeftKid: { is: 'Left', allow: 'RightKid' } }, {})
  const arrayForm = compile({ ...base, LeftKid: { is: 'Left', allow: ['RightKid'] } }, {})
  t.deepEqual(arrayForm, stringForm, here + 'string and array produce the same model')
  t.deepEqual(arrayForm.LeftKid.allow, ['RightKid'], here + 'allow list is kept on the compiled tag')
  t.deepEqual(arrayForm.RightKid.allow, ['LeftKid'], here + 'reciprocal allow list is compiled')
  t.ok(arrayForm.LeftKid.not.includes('Right'), here + 'the allowed parent stays excluded')
  t.notOk(arrayForm.RightKid.not.includes('LeftKid'), here + 'reciprocal exception')
  const unknown = compile({ ...base, LeftKid: { is: 'Left', allow: 'Missing' } }, {})
  t.ok(unknown.LeftKid.not.includes('Right'), here + 'an unknown allowed tag changes nothing')
  t.end()
})
