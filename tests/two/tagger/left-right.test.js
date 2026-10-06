import test from 'tape'
import nlp from '../_lib.js'
// Exercise the source rule compiler and executor directly as internal unit tests.
import leftRight from '../../../src/2-two/left-right/plugin.js'
import compileLeftRight from '../../../src/2-two/left-right/model/_lib.js'

test('left/right tag and untag actions run in source order', t => {
  const cases = [
    ['!#Verb', 'PastTense', [], ['Verb', 'PastTense']],
    ['#Noun | #Hyphenated', 'Verb', ['Noun', 'Singular', 'Hyphenated'], ['Verb']],
    ['#Noun | !#Singular', 'Verb', ['Noun'], ['Singular', 'Verb']],
    ['#Noun | !#Noun', 'Verb', [], ['Noun', 'Singular', 'Verb']],
    ['!#Noun | #Noun', 'Singular', ['Noun', 'Singular'], []],
    ['#Noun | #Adjective', 'Verb', ['Adjective'], ['Noun', 'Singular', 'Verb']],
    ['!#PastTense|#Adverb|!#Verb', 'PastTense', ['Adverb'], ['PastTense', 'Verb']],
  ]
  cases.forEach(([actions, initial, present, absent]) => {
    const doc = nlp('before foo after')
    const target = doc.match('foo').tag(initial)
    const byWord = compileLeftRight({ foo: [`before _ after -> ${actions}`] })
    leftRight.methods.two.leftRight(doc.docs, { byWord, byTag: {} }, doc.world)
    present.forEach(tag => t.equal(target.has('#' + tag), true, `${actions}: has ${tag}`))
    absent.forEach(tag => t.equal(target.has('#' + tag), false, `${actions}: lacks ${tag}`))
  })
  const doc = nlp('before foo after')
  const target = doc.match('foo').tag('PastTense')
  const term = target.docs[0][0]
  term.switch = 'Noun|Verb'
  const byWord = compileLeftRight({ foo: ['before _ after -> !#Verb'] })
  const byTag = compileLeftRight({ '#PastTense': ['before _ after -> #Adjective | #Hyphenated'] })
  const bySwitch = compileLeftRight({ '%Noun|Verb%': ['before _ after -> !#Hyphenated'] })
  leftRight.methods.two.leftRight(doc.docs, { byWord, byTag, bySwitch }, doc.world)
  t.equal(target.has('#Adjective'), true, 'tag rules still see incoming tags before an untag action')
  t.equal(target.has('#Hyphenated'), false, 'switch rules can untag after tag rules')

  const unmatched = nlp('near foo after')
  unmatched.match('foo').tag('PastTense')
  leftRight.methods.two.leftRight(unmatched.docs, { byWord, byTag: {} }, unmatched.world)
  t.equal(unmatched.match('foo').has('#PastTense'), true, 'unmatched untag rule leaves tags alone')

  const frozen = nlp('before foo after')
  frozen.match('foo').tag('PastTense').docs[0][0].frozen = true
  leftRight.methods.two.leftRight(frozen.docs, { byWord, byTag: {} }, frozen.world)
  t.equal(frozen.match('foo').has('#PastTense'), true, 'untag respects frozen terms')
  const invalid = ['', '!Noun', '#Noun |', '| #Noun', '#Noun || #Verb', '#Noun #Verb', '!!#Noun', '#Noun | nope']
  invalid.forEach(actions => {
    t.throws(() => compileLeftRight({ foo: [`_ -> ${actions}`] }), /Invalid left-right rule/, actions)
  })
  t.end()
})

test('left/right switch keys use exact incoming ambiguity', t => {
  const bySwitch = compileLeftRight({
    '%Noun|Verb%': ['^(my|your) _ (dog|#Plural)$ -> #Adjective'],
  })
  const cases = [
    ['my foo dog', 'Noun|Verb', true],
    ['your foo dogs', 'Noun|Verb', true],
    ['my foo dog', 'Verb|Noun', false],
    ['my foo dog', 'Adj|Noun', false],
    ['my foo dog', undefined, false],
    ['their foo dog', 'Noun|Verb', false],
    ['near my foo dog', 'Noun|Verb', false],
    ['my foo dog outside', 'Noun|Verb', false],
  ]
  cases.forEach(([text, ambiguity, expected]) => {
    const doc = nlp(text)
    const target = doc.match('foo').tag('Verb')
    target.docs[0][0].switch = ambiguity
    leftRight.methods.two.leftRight(doc.docs, { byWord: {}, byTag: {}, bySwitch }, doc.world)
    t.equal(target.has('#Adjective'), expected, `${text}: ${ambiguity}`)
  })
  const doc = nlp('my foo dog')
  doc.match('foo').tag('Verb').docs[0][0].switch = 'Noun|Verb'
  const byWord = compileLeftRight({ foo: ['my _ -> #Noun'] })
  const byTag = compileLeftRight({ '#Verb': ['my _ -> #Adverb'] })
  leftRight.methods.two.leftRight(doc.docs, { byWord, byTag, bySwitch }, doc.world)
  t.equal(doc.match('foo').has('#Adjective'), true, 'switch action follows word and incoming-tag actions')

  const neighbours = nlp('my foo bar')
  neighbours.match('foo bar').tag('Verb')
  neighbours.match('foo').docs[0][0].switch = 'Noun|Verb'
  neighbours.match('bar').docs[0][0].switch = 'Adj|Noun'
  const deferred = compileLeftRight({
    '%Noun|Verb%': ['my _ -> #Noun'],
    '%Adj|Noun%': ['#Noun _ -> #Adjective'],
  })
  leftRight.methods.two.leftRight(neighbours.docs, { byWord: {}, byTag: {}, bySwitch: deferred }, neighbours.world)
  t.equal(neighbours.match('bar').has('#Verb'), true, 'neighbour checks do not see pending switch actions')
  t.end()
})

test('left/right boundaries anchor targets and neighbours', t => {
  const cases = [
    ['^ _ bar', 'foo bar', true],
    ['^ _ bar', 'other foo bar', false],
    ['^ _ bar', 'foo baz', false],
    ['^ _ bar', 'foo', false],
    ['^ _ bar', 'other. Foo bar.', true],
    ['^ _ bar', 'foo. Bar.', false],
    ['bar _ $', 'bar foo', true],
    ['bar _ $', 'bar foo other', false],
    ['bar _ $', 'baz foo', false],
    ['^ _ $', 'foo', true],
    ['^ _ $', 'bar foo', false],
    ['^ _ $', 'foo bar', false],
    ['^bar _ baz', 'bar foo baz', true],
    ['^bar _ baz', 'other bar foo baz', false],
    ['^bar _ baz', 'bar foo', false],
    ['bar _ baz$', 'bar foo baz', true],
    ['bar _ baz$', 'bar foo baz other', false],
    ['bar _ baz$', 'bar foo', false],
    ['^bar _ baz$', 'bar foo baz', true],
    ['^bar _ baz$', 'bar foo baz other', false],
    ['^(bar|baz) _ $', 'baz foo', true],
    ['^(bar|baz) _ $', 'other baz foo', false],
    ['^ _ (bar|baz)$', 'foo baz', true],
    ['^ _ (bar|baz)$', 'foo baz other', false],
    ['^#Determiner _ #Plural$', 'the foo dogs', true],
    ['^#Determiner _ #Plural$', 'with the foo dogs', false],
    ['^(my|#Determiner) _ (bar|#Plural)$', 'my foo bar', true],
    ['^(my|#Determiner) _ (bar|#Plural)$', 'the foo dogs', true],
  ]
  cases.forEach(([pattern, text, expected]) => {
    const doc = nlp(text)
    doc.match('foo').tag('Verb')
    const byWord = compileLeftRight({ foo: [`${pattern} -> #Adjective`] })
    leftRight.methods.two.leftRight(doc.docs, { byWord, byTag: {} }, doc.world)
    t.equal(doc.match('foo').has('#Adjective'), expected, `${pattern}: ${text}`)
  })
  const doc = nlp('left foo bar')
  doc.match('foo').tag('Verb')
  const byTag = compileLeftRight({ '#Verb': ['^ _ bar$ -> #Adjective'] })
  const clauses = [doc.docs[0].slice(0, 1), doc.docs[0].slice(1)]
  leftRight.methods.two.leftRight(clauses, { byWord: {}, byTag }, doc.world)
  t.equal(doc.match('foo').has('#Adjective'), true, 'boundaries use the supplied clause, including byTag rules')
  const invalid = ['$ _', '_ ^', 'bar$ _', '_ ^bar', '^^bar _', '_ bar$$',
    '^(bar|) _', '_ (bar|$)', '^ bar _', '_ bar $', '^_ bar', 'bar _$']
  invalid.forEach(pattern => {
    t.throws(() => compileLeftRight({ foo: [`${pattern} -> #Adjective`] }), /Invalid left-right rule/, pattern)
  })
  t.end()
})

test('left/right dates, units and local prepositions: re-tagging', t => {
  const cases = [
    'It costs five bucks.',
    'The board is five feet long.',
    'The park covers three square miles.',
    'We need five gb of storage.',
    'Wait a half second.',
    'We meet on sat.',
    'We meet on wed.',
    'We arrive in March.',
    'We arrive in early May.',
    'They march quickly.',
    'We need some kind of help.',
    'She teaches dance music.',
    'We meet at 5pm eastern.',
    'The plane is right above the clouds.',
    'The boat is directly below the bridge.',
    'They stood just under our balcony.',
    'The bird flew well over them.',
  ]
  cases.forEach(text => {
    const doc = nlp(text)
    const before = doc.docs.flat().map(term => [...term.tags].sort())
    doc.compute('tagger')
    const after = doc.docs.flat().map(term => [...term.tags].sort())
    t.deepEqual(after, before, 'retag: ' + doc.text().trim())
  })
  t.end()
})

test('left/right alternatives preserve context and action order', t => {
  const byWord = compileLeftRight({
    foo: ['(my|your) _ (cat|dog) -> #Adjective'],
    bar: ['(near|#Determiner) _ (#Plural|#Pronoun) -> #Adjective'],
    baz: ['as _ as -> #Adjective', 'more _ than -> #Adjective'],
    quux: ['_ (cat|dog) -> #Adjective', 'my _ -> #Verb'],
  })
  const cases = [
    ['my foo cat', 'foo', true],
    ['your foo dog', 'foo', true],
    ['their foo dog', 'foo', false],
    ['my foo horse', 'foo', false],
    ['foo dog', 'foo', false],
    ['my foo', 'foo', false],
    ['my. foo dog', 'foo', false],
    ['near bar cats', 'bar', true],
    ['the bar she', 'bar', true],
    ['near bar cat', 'bar', false],
    ['as baz as', 'baz', true],
    ['more baz than', 'baz', true],
    ['as baz than', 'baz', false],
    ['more baz as', 'baz', false],
    ['my quux dog', 'quux', false],
  ]
  cases.forEach(([text, target, expected]) => {
    const doc = nlp(text)
    doc.match(target).tag('Verb')
    leftRight.methods.two.leftRight(doc.docs, { byWord, byTag: {} }, doc.world)
    t.equal(doc.match(target).has('#Adjective'), expected, text)
  })
  const invalid = ['(my|)', '(|my)', '(my)', '(my|(your|their))', 'my|your', '(#Noun|!)']
  invalid.forEach(context => {
    t.throws(() => compileLeftRight({ foo: [`${context} _ -> #Adjective`] }), /Invalid left-right rule/, context)
  })
  t.end()
})

test('migrated tag-based left/right contexts: re-tagging', t => {
  const cases = [
    'a well made table',
    'as entertaining as a movie',
    'more amusing than a movie',
    'very annoying',
    'a blown motor',
    'no doubt',
    'any charge',
    'the above is clear',
    'who he knows',
  ]
  cases.forEach(text => {
    const doc = nlp(text)
    const before = doc.docs.flat().map(term => [...term.tags].sort())
    doc.compute('tagger')
    const after = doc.docs.flat().map(term => [...term.tags].sort())
    t.deepEqual(after, before, 'retag: ' + doc.text().trim())
  })
  t.end()
})

test('left/right gerund modifier with an incoming Gerund tag', t => {
  const gerund = nlp('the running horse')
  gerund.match('running').tag('Gerund')
  leftRight.methods.two.leftRight(gerund.docs, gerund.world.model.two.leftRight, gerund.world)
  t.equal(gerund.match('running').has('#Adjective'), true, 'gerund modifier with incoming Gerund tag')
  t.end()
})

test('left/right target tags', t => {
  const byTag = compileLeftRight({ '#ProperNoun': ['in _ -> #Place'] })
  const run = (doc, byWord = {}) => leftRight.methods.two.leftRight(doc.docs, { byWord, byTag }, doc.world)
  const doc = nlp('in foo near bar')
  doc.match('(foo|bar)').tag('ProperNoun')
  run(doc)
  t.equal(doc.match('foo').has('#Place'), true, 'matching target tag and left neighbour')
  t.equal(doc.match('bar').has('#Place'), false, 'target tag still requires the neighbour')

  const ordinary = nlp('in box')
  run(ordinary)
  t.equal(ordinary.match('box').has('#Place'), false, 'ordinary noun does not match ProperNoun')

  const both = nlp('in foo')
  both.match('foo').tag('ProperNoun')
  run(both, compileLeftRight({ foo: ['in _ -> #Adjective'] }))
  t.equal(both.match('foo').has('#Place'), true, 'tag rules see incoming tags even when a word rule removes them')

  const fresh = nlp('in foo')
  fresh.match('foo').tag('Verb')
  run(fresh, compileLeftRight({ foo: ['in _ -> #ProperNoun'] }))
  t.equal(fresh.match('foo').has('#ProperNoun'), true, 'word rule applies')
  t.equal(fresh.match('foo').has('#Place'), false, 'new tags do not trigger tag rules in the same pass')
  run(fresh)
  t.equal(fresh.match('foo').has('#Place'), true, 'new tag is available on the next pass')
  t.end()
})

test('matching respects edits to parsed patterns', t => {
  const doc = nlp('red blue')
  const pattern = nlp.parseMatch('green red blue')
  t.equal(doc.match(pattern).found, false, 'required prefix is missing')
  pattern[0].optional = true
  t.equal(doc.match(pattern).text(), 'red blue', 'prefix can become optional')
  pattern[0].optional = false
  t.equal(doc.match(pattern).found, false, 'prefix can become required again')
  t.end()
})

test('more left/right tagging contexts: re-tagging', t => {
  const cases = [
    'They have running water.',
    'It left an enduring legacy.',
    'She is pretty happy.',
    'Even the dog left.',
    'He looks happy.',
    'She sounds happy.',
    'They start singing.',
    'We left right after lunch.',
    'It is always there.',
    'I said sorry.',
    'We flew to Turkey.',
    'Is there any more?',
  ]
  cases.forEach(text => {
    const doc = nlp(text)
    const before = doc.docs.flat().map(term => [...term.tags].sort())
    doc.compute('tagger')
    const after = doc.docs.flat().map(term => [...term.tags].sort())
    t.deepEqual(after, before, 'retag: ' + doc.text().trim())
  })
  t.end()
})

test('left/right string rules', t => {
  const rules = compileLeftRight({
    second: ['#Cardinal _ -> #Unit', '_ #Noun -> #Ordinal'],
    said: ['the _ #Noun -> #Adjective'],
  })
  const cases = [
    ['one second', 'second', 'Unit'],
    ['second dog', 'second', 'Ordinal'],
    ['the said dog', 'said', 'Adjective'],
  ]
  cases.forEach(([text, target, tag]) => {
    const doc = nlp(text)
    doc.match(target).tag('Verb')
    leftRight.methods.two.leftRight(doc.docs, { byWord: rules, byTag: {} }, doc.world)
    t.equal(doc.match(target).has('#' + tag), true, text)
  })
  const invalid = [
    '#Cardinal -> #Unit',
    '_ _ -> #Unit',
    'one two _ -> #Unit',
    '_ -> Unit',
    '_ -> #Unit -> #Ordinal',
    '(one|) _ -> #Unit',
    '$ _ -> #Unit',
  ]
  invalid.forEach(rule => {
    t.throws(() => compileLeftRight({ second: [rule] }), /Invalid left-right rule for "second"/, rule)
  })
  t.end()
})

test('left/right rules in the tagging pipeline: re-tagging', t => {
  const cases = [
    'The said elephant vanished.',
    'She still sings.',
    'The shelf is high enough.',
    'A ticket is a must.',
    'We must march.',
    'She will dance.',
    'They said that she left.',
    'It looks nothing like a cat.',
    'There is plenty of food.',
    'I waited a while.',
  ]
  cases.forEach(text => {
    const doc = nlp(text)
    const before = doc.docs.flat().map(term => [...term.tags].sort())
    doc.compute('tagger')
    const after = doc.docs.flat().map(term => [...term.tags].sort())
    t.deepEqual(after, before, 'retag: ' + doc.text().trim())
  })
  t.end()
})

test('left/right tagger sketch', t => {
  const run = (doc, rules) => leftRight.methods.two.leftRight(doc.docs, { byWord: rules, byTag: {} }, doc.world)
  const doc = nlp('my foo and your foo')
  doc.match('foo').tag('Verb')
  run(doc, { foo: [{ pre: 'my', post: '', tag: 'Noun' }] })
  t.equal(doc.match('my #Noun').found, true, 'left literal selects the target')
  t.equal(doc.match('your #Verb').found, true, 'unmatched target stays unchanged')

  const right = nlp('foo bar')
  right.match('foo').tag('Verb')
  right.match('bar').tag('Noun')
  run(right, { foo: [{ post: '#Noun', tag: 'Adjective' }] })
  t.equal(right.match('#Adjective #Noun').found, true, 'right tag condition')

  const boundary = nlp('my. foo')
  boundary.match('foo').tag('Verb')
  run(boundary, { foo: [{ pre: 'my', tag: 'Noun' }] })
  t.equal(boundary.match('foo').has('#Verb'), true, 'does not cross sentences')

  const deferred = nlp('my foo bar')
  deferred.match('foo bar').tag('Verb')
  run(deferred, {
    foo: [{ pre: 'my', tag: 'Noun' }],
    bar: [{ pre: '#Noun', tag: 'Adjective' }],
  })
  t.equal(deferred.match('bar').has('#Verb'), true, 'checks see tags from before the pass')
  run(deferred, { foo: [{ pre: 'my', tag: 'Adjective' }, { pre: 'my', tag: 'Verb' }] })
  t.equal(deferred.match('foo').has('#Verb'), true, 'bucket order resolves conflicting actions')
  t.end()
})

test('fixed-length matches preserve captures and fallbacks', t => {
  t.deepEqual(nlp('the red fox and the red fox').match('the [red fox]', 0).out('array'), ['red fox', 'red fox'], 'capture offsets at multiple starts')
  t.equal(nlp('the red fox').match('^the [red fox]$', 0).text(), 'red fox', 'anchored capture')
  t.equal(nlp('the red fox').match('the red fox jumps').found, false, 'short input')
  t.equal(nlp("we've arrived").match("we've arrived").text(), "we've arrived", 'contraction consumes its implicit terms')
  t.equal(nlp('the red fox').match('the very? red fox').text(), 'the red fox', 'optional term fallback')
  t.equal(nlp('red red fox').match('red+ fox').text(), 'red red fox', 'repetition fallback')
  t.end()
})

test('matcher cleanup preserves occurrence order and boundaries', t => {
  const doc = nlp('red blue red blue')
  t.deepEqual(doc.match('red blue').out('array'), ['red blue', 'red blue'], 'repeated matches')
  t.deepEqual(doc.match('^red blue').out('array'), ['red blue'], 'first occurrence')
  t.deepEqual(doc.match('red blue$').out('array'), ['red blue'], 'last occurrence')
  t.deepEqual(doc.match('!blue blue').out('array'), ['red blue', 'red blue'], 'negative first term')
  t.deepEqual(nlp('red red red').match('red red').out('array'), ['red red'], 'nonoverlapping matches')
  t.deepEqual(nlp('red blue. red blue.').match('^red blue$').out('array'), ['red blue.', 'red blue.'], 'sentence boundaries')
  t.end()
})

test('second-pass cleanup: date numbers do not leak into other sentences', t => {
  const ordinary = ['May ended. Twenty five apples remained.', 'June began. Thirty one people arrived.', 'August ended. Twenty two birds left.']
  ordinary.forEach(text => {
    const values = nlp(text).match('#TextValue')
    t.ok(values.found, `${text}: written numbers are present`)
    t.notOk(values.has('#Date'), `${text}: separate sentence numbers are not dates`)
  })
  t.end()
})
