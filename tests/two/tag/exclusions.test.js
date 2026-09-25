import test from 'tape'
import nlp from '../_lib.js'

const here = '[two/exclusions] '
const blank = () => nlp('xyz').unTag('*')

test('exclusions: reciprocal links across registration batches', function (t) {
  const model = nlp.world().model.one
  const original = model.tagSet
  t.teardown(() => { model.tagSet = original })

  nlp.addTags({ Existing: {}, ExistingChild: { also: ['Existing'] } })
  const previous = model.tagSet
  const previousExclusions = [...previous.Existing.not]
  nlp.addTags({ Special: { not: ['Existing', 'Noun'] }, SpecialChild: { is: 'Special' } })
  t.deepEqual(previous.Existing.not, previousExclusions, here + 'previous compiled model is unchanged')
  for (const [a, b] of [['Special', 'Noun'], ['Special', 'Existing'], ['SpecialChild', 'ExistingChild']]) {
    for (const [first, second] of [[a, b], [b, a]]) {
      const doc = blank().tag(first)
      const before = [...doc.termList()[0].tags].sort()
      t.equal(doc.canBe(second).found, false, here + `${first} cannot be ${second}`)
      doc.tagSafe(second)
      t.deepEqual([...doc.termList()[0].tags].sort(), before, here + `${second} is safely rejected`)
      doc.tag(second)
      t.ok(doc.has(`#${second}`), here + `${second} is assigned`)
      t.notOk(doc.has(`#${first}`), here + `${first} is removed`)
    }
  }

  // Descendants introduced in yet another batch inherit the reciprocal edge.
  nlp.addTags({ LaterChild: { is: 'ExistingChild' } })
  t.equal(blank().tag('SpecialChild').canBe('LaterChild').found, false, here + 'later descendant conflicts')
  t.equal(blank().tag('LaterChild').canBe('SpecialChild').found, false, here + 'later descendant reciprocates')
  t.end()
})

test('exclusions: string and array references normalize identically', function (t) {
  const compile = nlp.world().methods.one.addTags
  for (const property of ['not', 'notA']) {
    for (const existing of [{}, compile({ Earlier: {} }, {})]) {
      const stringForm = compile({ Special: { [property]: 'Implicit' } }, existing)
      const arrayForm = compile({ Special: { [property]: ['Implicit'] } }, existing)
      t.deepEqual(arrayForm, stringForm, here + property + ' string and array produce the same model')
      t.ok(arrayForm.Implicit.not.includes('Special'), here + property + ' implicit tag reciprocates')
    }
  }
  const existing = compile({ Earlier: {} }, {})
  const result = compile({ Special: { not: ['Earlier', 'ImplicitA', 'ImplicitB', 'ImplicitA'] } }, existing)
  for (const tag of ['Earlier', 'ImplicitA', 'ImplicitB']) {
    t.equal(result.Special.not.filter(value => value === tag).length, 1, here + tag + ' excluded once')
    t.equal(result[tag].not.filter(value => value === 'Special').length, 1, here + tag + ' reciprocates once')
  }
  t.deepEqual(existing.Earlier.not, [], here + 'normalization does not mutate existing exclusions')
  t.end()
})

test('exclusions: shared arrays and reusable definitions', function (t) {
  const shared = Object.freeze(['Entity'])
  const definitions = Object.freeze({
    Entity: Object.freeze({}),
    PronounLike: Object.freeze({ not: shared }),
    UnitLike: Object.freeze({ not: shared }),
    AcronymLike: Object.freeze({ not: Object.freeze(['PronounLike']) }),
    Child: Object.freeze({ also: Object.freeze(['UnitLike']) }),
  })
  const compile = nlp.world().methods.one.addTags
  // Both initial compilation and extension must accept immutable definitions.
  const first = compile(definitions, {})
  const repeated = compile(definitions, {})
  const extended = compile(definitions, first)
  for (const result of [first, repeated, extended]) {
    t.ok(result.PronounLike.not.includes('AcronymLike'), here + 'reciprocal exclusion reaches intended tag')
    t.notOk(result.UnitLike.not.includes('AcronymLike'), here + 'reciprocal exclusion does not leak to sibling')
    t.notOk(result.Child.not.includes('AcronymLike'), here + 'descendant does not inherit leaked exclusion')
    t.ok(result.Entity.not.includes('UnitLike'), here + 'intended reciprocal exclusions remain')
  }
  t.deepEqual(shared, ['Entity'], here + 'shared source array remains unchanged')
  t.deepEqual(definitions.UnitLike, { not: ['Entity'] }, here + 'source definition remains unchanged')
  t.end()
})

test('exclusions: acronyms coexist with units and demonyms', function (t) {
  for (const tag of ['Unit', 'Demonym']) {
    for (const [first, second] of [[tag, 'Acronym'], ['Acronym', tag]]) {
      const doc = blank().tag(first)
      t.ok(doc.canBe(second).found, here + `${first} can be ${second}`)
      doc.tagSafe(second)
      t.ok(doc.has(`#${first}`) && doc.has(`#${second}`), here + `${first} + ${second} survive safe tagging`)
    }
  }
  t.equal(blank().tag('Pronoun').canBe('Acronym').found, false, here + 'Pronoun still excludes Acronym')
  t.equal(blank().tag('Acronym').canBe('Pronoun').found, false, here + 'Acronym still excludes Pronoun')
  t.end()
})

test('exclusions: plural acronyms', function (t) {
  for (const text of ['CPUs', 'UFOs']) {
    const doc = nlp(text)
    t.ok(doc.has('#Acronym'), here + text + ' is an acronym')
    t.ok(doc.has('#Plural'), here + text + ' is plural')
    t.ok(doc.canBe('Plural').found, here + text + ' has compatible tags')
  }
  for (const method of ['tag', 'tagSafe']) {
    for (const [first, second] of [['Acronym', 'Plural'], ['Plural', 'Acronym']]) {
      const doc = blank().tag(first)
      doc[method](second)
      t.ok(doc.has('#Acronym') && doc.has('#Plural'), here + `${first} -> ${method}(${second}) preserves both`)
    }
  }
  t.end()
})
