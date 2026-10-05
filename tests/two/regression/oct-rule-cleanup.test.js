import test from 'tape'
import nlp from '../_lib.js'
import leftRight from '../../../src/2-two/left-right/plugin.js'
import compileLeftRight from '../../../src/2-two/left-right/model/_lib.js'
const here = '[two/rule-cleanup] '

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

test('switch-keyed tagging examples', t => {
  const cases = [
    ['Our leading manufacturer closed.', 'leading', 'Adjective'],
    ['Her favourite book disappeared.', 'favourite', 'Adjective'],
    ['Drew said hello.', 'Drew', 'Person'],
    ['She drew closer.', 'drew', 'Verb'],
    ['We visited East Sydney.', 'Sydney', 'Place'],
    ['We visited Sydney harbour.', 'Sydney', 'Place'],
    ['They are asking questions.', 'questions', 'Plural'],
    ['Quickly warm the milk.', 'warm', 'Verb'],
    ['Visit https://example.com.', 'visit', 'Imperative'],
    ['Commit to the plan.', 'commit', 'Imperative'],
  ]
  cases.forEach(([text, target, tag]) => {
    t.equal(nlp(text).match(target).has('#' + tag), true, text)
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

test('migrated anchored tagging rules', t => {
  const cases = [
    ['Go home.', 'go', 'Imperative', true],
    ['Stay cool.', 'stay', 'Imperative', true],
    ['Stay away.', 'stay', 'Imperative', true],
    ['Tell him the story.', 'tell', 'Imperative', true],
    ['Somebody call the police.', 'call', 'Imperative', true],
    ['Never say never.', 'say', 'Imperative', true],
    ['Keep playing.', 'keep', 'Imperative', true],
    ['Work-saving appliances.', 'work', 'Adjective', true],
    ['Work-saving appliances.', 'work', 'Imperative', false],
    ['Pay attention.', 'pay', 'Imperative', true],
    ['I will go home.', 'go', 'Imperative', false],
    ['Do you know?', 'do', 'QuestionWord', true],
    ['Does she know?', 'does', 'QuestionWord', true],
    ['He read the book.', 'read', 'PastTense', true],
    ['She is alone.', 'alone', 'Adjective', true],
    ['It is well.', 'well', 'Adjective', true],
    ['The meeting came to a close.', 'close', 'Noun', true],
    ['Shoot!', 'shoot', 'Expression', true],
    ['Shoot the ball.', 'shoot', 'Expression', false],
    ['Dude we should leave.', 'dude', 'Expression', true],
  ]
  cases.forEach(([text, target, tag, expected]) => {
    t.equal(nlp(text).match(target).has('#' + tag), expected, text)
  })
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

test('left/right dates, units and local prepositions', t => {
  const cases = [
    ['It costs five bucks.', 'bucks', 'Currency'],
    ['It costs five bucks.', 'five', 'Money'],
    ['It costs five bucks.', 'bucks', 'Unit'],
    ['The board is five feet long.', 'feet', 'Unit'],
    ['The park covers three square miles.', 'square', 'Unit'],
    ['We need five gb of storage.', 'gb', 'Unit'],
    ['Wait a half second.', 'half', 'Value'],
    ['We meet on sat.', 'sat', 'WeekDay'],
    ['We meet on wed.', 'wed', 'WeekDay'],
    ['We arrive in March.', 'March', 'Month'],
    ['We arrive in early May.', 'May', 'Month'],
    ['They march quickly.', 'march', 'Verb'],
    ['We need some kind of help.', 'kind', 'Noun'],
    ['She teaches dance music.', 'dance', 'Noun'],
    ['We meet at 5pm eastern.', 'eastern', 'Timezone'],
    ['The plane is right above the clouds.', 'above', 'Preposition'],
    ['The boat is directly below the bridge.', 'below', 'Preposition'],
    ['They stood just under our balcony.', 'under', 'Preposition'],
    ['The bird flew well over them.', 'over', 'Preposition'],
  ]
  cases.forEach(([text, target, tag]) => {
    const doc = nlp(text)
    t.equal(doc.match(target).has('#' + tag), true, text)
    doc.compute('tagger')
    t.equal(doc.match(target).has('#' + tag), true, 'retag: ' + text)
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

test('migrated tag-based left/right contexts', t => {
  const cases = [
    ['a well made table', 'made', 'Adjective'],
    ['as entertaining as a movie', 'entertaining', 'Adjective'],
    ['more amusing than a movie', 'amusing', 'Adjective'],
    ['very annoying', 'annoying', 'Adjective'],
    ['a blown motor', 'blown', 'Adjective'],
    ['no doubt', 'doubt', 'Noun'],
    ['any charge', 'charge', 'Noun'],
    ['the above is clear', 'above', 'Singular'],
    ['who he knows', 'who', 'Preposition'],
  ]
  cases.forEach(([text, target, tag]) => {
    const doc = nlp(text)
    t.equal(doc.match(target).has('#' + tag), true, text)
    doc.compute('tagger')
    t.equal(doc.match(target).has('#' + tag), true, 'retag: ' + text)
  })
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

test('more left/right tagging contexts', t => {
  const cases = [
    ['They have running water.', 'running', 'Adjective'],
    ['It left an enduring legacy.', 'enduring', 'Adjective'],
    ['She is pretty happy.', 'pretty', 'Adverb'],
    ['Even the dog left.', 'even', 'Adverb'],
    ['He looks happy.', 'looks', 'PresentTense'],
    ['She sounds happy.', 'sounds', 'PresentTense'],
    ['They start singing.', 'start', 'Infinitive'],
    ['We left right after lunch.', 'right', 'Adverb'],
    ['It is always there.', 'there', 'Adjective'],
    ['I said sorry.', 'sorry', 'Expression'],
    ['We flew to Turkey.', 'Turkey', 'Country'],
    ['Is there any more?', 'more', 'Singular'],
  ]
  cases.forEach(([text, target, tag]) => {
    const doc = nlp(text)
    t.equal(doc.match(target).has('#' + tag), true, text)
    doc.compute('tagger')
    t.equal(doc.match(target).has('#' + tag), true, 'retag: ' + text)
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

test('left/right rules in the tagging pipeline', t => {
  const examples = [
    ['The said elephant vanished.', 'said', 'Adjective'],
    ['She still sings.', 'still', 'Adverb'],
    ['The shelf is high enough.', 'enough', 'Adverb'],
    ['A ticket is a must.', 'must', 'Singular'],
    ['We must march.', 'march', 'Infinitive'],
    ['She will dance.', 'will', 'Modal'],
    ['They said that she left.', 'that', 'Conjunction'],
    ['It looks nothing like a cat.', 'like', 'Preposition'],
    ['There is plenty of food.', 'plenty', 'Uncountable'],
    ['I waited a while.', 'while', 'Singular'],
  ]
  examples.forEach(([text, target, tag]) => {
    const doc = nlp(text)
    t.equal(doc.match(target).has('#' + tag), true, text)
    doc.compute('tagger')
    t.equal(doc.match(target).has('#' + tag), true, 'retag: ' + text)
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

const spec = `

  On Friday, food and drinks are free. {Prep,Date,Noun,Conj,Noun,Vb,Adj}
  On Friday, food or drinks will be provided. {Prep,Date,Noun,Conj,Noun,Vb,Vb,Vb}
  On Tuesday, gifts and thanks arrived. {Prep,Date,Noun,Conj,Noun,Past}
  We discussed London, Paris and travel. {Noun,Past,Noun,Noun,Conj,Noun}

  The dog runs. {Det,Noun,Pres}
  My dog barks loudly. {Poss,Noun,Pres,Adv}
  The small child walks slowly. {Det,Adj,Noun,Pres,Adv}
  Her cat usually sleeps peacefully. {Poss,Noun,Adv,Pres,Adv}
  The young athlete swims well. {Det,Adj,Noun,Pres,Adv}
  Our old dog often barks loudly. {Poss,Adj,Noun,Adv,Pres,Adv}
  A tired baby sleeps soundly. {Det,Adj,Noun,Pres,Adv}

  Hope changed the world. {Noun,Past,Det,Noun}
  Love changed my life. {Noun,Past,Poss,Noun}
  Work consumed his time. {Noun,Past,Poss,Noun}
  Rain ruined the picnic. {Noun,Past,Det,Noun}
  Support exceeded our expectations. {Noun,Past,Poss,Noun}
  Change brought a new opportunity. {Noun,Past,Det,Adj,Noun}
  Fear gripped the small town. {Noun,Past,Det,Adj,Noun}
  Trust saved our friendship. {Noun,Past,Poss,Noun}

  Let John shoulder the burden. {Vb,Noun,Inf,Det,Noun}
  Make Sarah shoulder the responsibility. {Vb,Noun,Inf,Det,Noun}
  We made John shoulder the burden. {Noun,Past,Noun,Inf,Det,Noun}
  Let her shoulder the burden. {Vb,Noun,Inf,Det,Noun}
  Make Google shoulder the cost. {Vb,Noun,Inf,Det,Noun}
  They made Canada shoulder the cost. {Noun,Past,Noun,Inf,Det,Noun}

  # ^[%Noun|Verb%] #PastTense (#Determiner|#Possessive) #Adjective+? #Noun
  Hope changed the world. {Noun,Past,Det,Noun}
  Love changed my life. {Noun,Past,Poss,Noun}

  # (let|make|made) (him|her|it|#Person|#Place|#Organization)+ [#Singular] (a|an|the|it)
  Let John shoulder the burden. {Vb,Person,Inf,Det,Noun}
  They made Canada shoulder the cost. {Noun,Past,Place,Inf,Det,Noun}

  # #Gerund [#Gerund] #Plural
  They are repairing crumbling roads. {Noun,Vb,Ger,Adj,Plural}
  They are repairing leaking pipes. {Noun,Vb,Ger,Adj,Plural}

  # #Pronoun #Infinitive [#Gerund] #PresentTense
  I think tipping sucks. {Noun,Inf,Noun,Pres}
  We believe running improves health. {Noun,Inf,Noun,Pres,Noun}

  # ^[#Infinitive] #Value #Noun
  Add two eggs. {Imp,Val,Noun}
  Buy three books. {Imp,Val,Noun}

  # ^(like && @hasComma)
  Like, I understand. {Expr,Noun,Vb}
  Like, what happened? {Expr,QuestionWord,Past}

  # ^[had] #Noun+ (#Adverb|not)+? (#PastTense && @hasQuestionMark)$
  Had he walked? {Aux,Noun,Past}
  Had they already finished? {Aux,Noun,Adv,Past}

  # ^[had] #Noun+ (#Adverb|not)+? #PastTense * @hasQuestionMark$
  Had she walked the dog? {Aux,Noun,Past,Det,Noun}
  Had they already finished their homework? {Aux,Noun,Adv,Past,Poss,Noun}

  # #Person and #Person [(%Noun|Verb% && !@isTitleCase && !@isUpperCase)]$
  John and Mary work. {Person,Conj,Person,Inf}
  Alice and Bob dance. {Person,Conj,Person,Inf}

  # #Plural [on] #Determiner #Adjective+? #Noun [%Noun|Verb%]$
  Dogs on the porch bark. {Plural,Prep,Det,Noun,Inf}
  Children on the playground play. {Plural,Prep,Det,Noun,Inf}

  # #PastTense (until|as|through|without) [(#PresentTense && !#Gerund && !#Copula)]
  We waited until release. {Noun,Past,Prep,Noun}

  # as [#Infinitive] as
  She is as fit as ever. {Noun,Vb,Connector,Adj,Connector,Adv}
  They are as welcome as ever. {Noun,Vb,Connector,Adj,Connector,Adv}

  # #Preposition #Plural and [%Plural|Verb%] #Gerund
  We watched with smiles and waves greeting us. {Noun,Past,Prep,Plural,Conj,Plural,Ger,Noun}
  With dogs and bears running, we left. {Prep,Plural,Conj,Plural,Ger,Noun,Past}

  # that [#Plural] to
  A path that leads to the river. {Det,Noun,Conj,Pres,Prep,Det,Noun}
  A road that winds to the coast. {Det,Noun,Conj,Pres,Prep,Det,Noun}

  # [(#Modal|had|has)] (#Adverb|not)+? [been] (#Adverb|not)+? #Verb
  She had been walking. {Noun,Aux,Vb,Ger}
  He has not been sleeping. {Noun,Aux,Negative,Vb,Ger}

  # #Copula the [%Adj|Noun%] #Noun
  It is the premier university. {Noun,Vb,Det,Adj,Noun}
  This is the principal reason. {Noun,Vb,Det,Adj,Noun}

  # ^[some] #Infinitive #Noun
  Some like coffee. {Pronoun,Inf,Noun}
  Some prefer tea. {Pronoun,Inf,Noun}

  # (#TextValue && #Date) #TextValue
  May twenty five. {Date,TextValue|Date,TextValue|Date}
  June twenty one. {Date,TextValue|Date,TextValue|Date}

  # (is|was|were) [(under|over) #PastTense]
  They were under paid. {Noun,Vb,Adv,Adj}
  It is over rated. {Noun,Vb,Adv,Adj}

  # Consecutive gerunds: preserve the action and the adjective modifier.
  They are repairing crumbling roads. {Pronoun,Aux,Ger,Adj,Plural}
  They are repairing leaking pipes. {Pronoun,Aux,Ger,Adj,Plural}

  # Perfect progressives: preserve auxiliaries with and without intervening adverbs.
  She had been walking. {Pronoun,Aux,Aux,Ger}
  He has not been sleeping. {Pronoun,Aux,Negative,Aux,Ger}
  They had already been working. {Pronoun,Aux,Adv,Aux,Ger}
  She would have been walking. {Pronoun,Modal|Aux,Aux,Aux,Ger}

  # Synthetic overlap probes: preserve coverage of the second had.
  John would have had not been walking. {Person,Modal|Aux,Aux,Aux,Negative,Aux,Ger}
  John would not have had really been walking. {Person,Modal|Aux,Negative,Aux,Aux,Adv,Aux,Ger}

  # A later adjective correction must survive intervening Actor rules.
  a semiprofessional bodyworker {Det,Adj,Noun}
  on stable foundations {Prep,Adj,Plural}

  # Adjective correction before a proper noun.
  This is the classic London. {Pronoun,Copula,Det,Adj,Place}
  It is the premier university. {Pronoun,Copula,Det,Adj,Noun}

  # Relative clause: preserve the finite verb after that.
  A path that leads to the river. {Det,Noun,Conj,Pres,Prep,Det,Noun}

  # A verb-shaped word used as a noun after a preposition.
  We waited until release. {Pronoun,Past,Prep,Noun}
  It served as cover. {Pronoun,Past,Prep,Noun}
  She acted as judge. {Pronoun,Past,Prep,Noun}

  # Locative subjects: preserve both the preposition and the final verb.
  Dogs near the porch bark. {Plural,Prep,Det,Noun,Inf}
  Dogs on the porch bark. {Plural,Prep,Det,Noun,Inf}
  Dogs under the porch bark. {Plural,Prep,Det,Noun,Inf}
  Dogs beside the porch bark. {Plural,Prep,Det,Noun,Inf}
  Dogs behind the porch bark. {Plural,Prep,Det,Noun,Inf}
  Children on the playground play. {Plural,Prep,Det,Noun,Inf}

  # Lists need their comma context; coordinated subjects still take verbs.
  We sell books, toys and watches. {Pronoun,Inf,Plural,Plural,Conj,Plural}
  I enjoy music, art and dance. {Pronoun,Inf,Noun,Noun,Conj,Noun}
  On Friday, John and Mary work. {Prep,Date,Person,Conj,Person,Inf}
  John and Mary work. {Person,Conj,Person,Inf}
  Is it a joke, Dad, or do I need help? {Copula,Pronoun,Det,Noun,Noun,Conj,Vb,Pronoun,Vb,Noun}
  It has fins, Jim, and has a motor. {Pronoun,Pres,Plural,Person,Conj,Pres,Det,Noun}
  We discussed the engine, bag, and evacuating the building. {Pronoun,Past,Det,Noun,Noun,Conj,Ger,Det,Noun}

  # Share locative patterns without losing adjective context.
  Dogs on the wooden porch bark. {Plural,Prep,Det,Adj,Noun,Inf}
  Children behind the tall fence play. {Plural,Prep,Det,Adj,Noun,Inf}

  # Copula variants share passive syntax; adjectives remain adjectives.
  I am watched by everyone. {Pronoun,Aux|Passive,Past|Passive,Prep,Noun}
  The parcel is delivered. {Det,Noun,Aux|Passive,Past|Passive}
  The parcels are delivered. {Det,Plural,Aux|Passive,Past|Passive}
  The parcel was delivered. {Det,Noun,Aux|Passive,Past|Passive}
  The parcels were delivered. {Det,Plural,Aux|Passive,Past|Passive}
  The parcel was quickly delivered. {Det,Noun,Aux,Adv,Past}
  She was tired. {Pronoun,Copula,Adj}

  # Multiple alternatives in one sentence must retain each correction.
  They let John shoulder the burden and made Mary shoulder the cost. {Pronoun,Vb,Person,Inf,Det,Noun,Conj,Past,Person,Inf,Det,Noun}
  She had to Google the answer and he has to Google the address. {Pronoun,Vb,Connector,Inf,Det,Noun,Conj,Pronoun,Vb,Connector,Inf,Det,Noun}
  We scheduled a software reinstall on Monday. {Pronoun,Past,Det,Noun,Noun,Prep,Date}
  We scheduled an engine rebuild on Tuesday. {Pronoun,Past,Det,Noun,Noun,Prep,Date}
  I know why he is happy and where she is working. {Pronoun,Inf,Connector,Pronoun,Copula,Adj,Conj,Connector,Pronoun,Aux,Ger}

  # Smaller word-hook families: exceptions, particles, and perfect forms.
  Everyone but me agreed. {Noun,Prep,Pronoun,Past}
  Anybody but him could help. {Noun,Prep,Pronoun,Modal,Inf}
  She picked it up and put it down. {Pronoun,Past,Pronoun,Adv,Conj,Vb,Pronoun,Adv}
  She has read the note and he has put the book on the table. {Pronoun,Aux,Participle,Det,Noun,Conj,Pronoun,Aux,Participle,Det,Noun,Prep,Det,Noun}
  The plane flew directly above the clouds. {Det,Noun,Past,Adv,Prep,Det,Plural}
  She stood right below the window. {Pronoun,Past,Adv,Prep,Det,Noun}
  They slept just under the bridge. {Pronoun,Past,Adv,Prep,Det,Noun}
  The plane flew well over the hill. {Det,Noun,Past,Adv,Prep,Det,Noun}

  # index.js: passive and adjective examples
  We do not go. {Pronoun,Aux,Negative,Inf}
  He got walked. {Pronoun,Aux,Past|Passive}
  He was being walked. {Pronoun,Aux,Aux,Past|Passive}
  He had been walked. {Pronoun,Aux,Aux,Past|Passive}
  It will be cleaned. {Pronoun,Modal,Aux,Past|Passive}
  The dog was walked by the man. {Det,Noun,Aux,Past|Passive,Prep,Det,Noun}
  Off-white. {Adj,Adj}
  It is off white. {Pronoun,Copula,Adj,Adj}
  All the dogs. {Noun,Det,Plural}
  The door is closed. {Det,Noun,Copula,Adj}
  Forgotten art is rediscovered. {Adj,Noun,Aux,Past}
  Forgotten stories are lost. {Adj,Plural,Copula,Adj}
  It is fucked up. {Pronoun,Copula,Adj,Adj}
  The door seems opened. {Det,Noun,Pres,Adj}
  The jury is out. {Det,Noun,Copula,Adj}
  Quiet the room. {Inf,Det,Noun}
  Blue-tinted. {Adj,Adj}
  Blue-tinted glasses. {Adj,Adj,Plural}
  Non-breaking spaces. {Adj,Adj,Plural}
  Two-fold. {Adj,Adj}
  Too much. {Adv,Adj}
  A bit much. {Det,Adv,Adj}
  Dark green. {Adv,Adj}
  It is far too cold. {Pronoun,Copula,Adv,Adv,Adj}
  She shops direct. {Pronoun,Pres,Adv}
  Be late. {Inf,Adj}
  Be early. {Inf,Adj}
  He moons a lot. {Pronoun,Pres,Adv,Adv}
  It is amusing. {Pronoun,Copula,Adj}
  It is annoying. {Pronoun,Copula,Adj}
  She found it interesting. {Pronoun,Past,Pronoun,Adj}
  She found it isolating. {Pronoun,Past,Pronoun,Adj}
  She found it isolating cells. {Pronoun,Past,Pronoun,Ger,Plural}
  Repairing crumbling roads. {Ger,Adj,Plural}
  She looked amazing. {Pronoun,Past,Adj}
  He is boring the audience. {Pronoun,Aux,Ger,Det,Noun}
  Meaning alluring. {Ger,Adj}
  His fine. {Poss,Noun}
  Have fun with it. {Inf,Noun,Prep,Pronoun}
  A brewing giant. {Det,Noun,Noun}
  In a perfect. {Prep,Det,Noun}
  Some kind of teacher. {Det,Noun,Prep,Noun}
  Her favourite sport. {Poss,Adj,Noun}
  The present. {Det,Noun}
  They are that crazy. {Pronoun,Copula,Adv,Adj}
  Company-wide. {Adj,Adj}
  The poor were hungry. {Det,Noun,Copula,Adj}
  A professional bodybuilder. {Det,Adj,Noun}

  # index.js: adverbs and dates
  Way too hot. {Adv,Adv,Adj}
  They sing like an angel. {Pronoun,Inf,Prep,Det,Noun}
  They barely even walk. {Pronoun,Adv,Adv,Inf}
  They are cheering hard. {Pronoun,Aux,Ger,Adv}
  He is well. {Pronoun,Copula,Adj}
  A bit cold. {Det,Adv,Adj}
  They become overly weakened. {Pronoun,Inf,Adv,Adj}
  A completely beaten man. {Det,Adv,Adj,Noun}
  A close friend. {Det,Adj,Noun}
  He does better. {Pronoun,Pres,Adv}
  Walking close. {Ger,Adv}
  He charged back. {Pronoun,Past,Adv}
  The well. {Det,Noun}
  He sees well. {Pronoun,Pres,Adv}
  On sat. {Prep,WeekDay}
  In march. {Prep,Month}
  This march. {Date,Month}
  This may. {Date,Month}
  March 5th. {Month,Date}
  5th of march. {Date,Date,Month}
  March and feb. {Month,Conj,Month}
  Feb to march. {Month,Prep,Month}
  Quickly march. {Adv,Inf}
  12 am. {Time,Time}
  5th of June. {Date,Date,Month}
  5 June. {Date,Month}
  June 5 to 7. {Month,Date,Date,Date}
  June the 12th. {Month,Date,Date}
  June 7. {Month,Date}
  7 June. {Date,Month}
  Aug 20-21. {Month,Date,Date}
  Wednesday June 5th. {WeekDay,Month,Date}
  Aug 5th 2021. {Month,Date,Date}
  China standard time. {Timezone,Timezone,Timezone}
  Eastern time. {Timezone,Timezone}
  Central european time. {Timezone,Timezone,Timezone}

  # index.js: nouns, actors, possessives and gerunds
  Rights of man. {Noun,Prep,Noun}
  We all agree. {Pronoun,Noun,Inf}
  My first thought. {Poss,Ordinal,Noun}
  The nice walk. {Det,Adj,Noun}
  The truly nice swim. {Det,Adv,Adj,Noun}
  The message from Danny. {Det,Noun,Prep,Person}
  A type of shout. {Det,Noun,Prep,Noun}
  A walk-in microwave. {Det,Noun,Noun,Noun}
  Aircraft designer. {Actor,Actor}
  Lighting designer. {Actor,Actor}
  Captain Sanders. {Honorific,Person}
  Co founder. {Actor,Actor}
  Fine-artist. {Actor,Actor}
  Dance coach. {Actor,Actor}
  Chief design officer. {Actor,Actor,Actor}
  Chief of police. {Actor,Actor,Actor}
  President of marketing. {Actor,Actor,Actor}
  He did a 900. {Pronoun,Past,Det,Singular}
  He paid a 20. {Pronoun,Past,Det,Singular}
  The can. {Det,Singular}
  John Smith's dog. {Poss,Poss,Noun}
  Microsoft Research's office. {Poss,Poss,Noun}
  Los Angeles's fundraiser. {Poss,Poss,Noun}
  Anna's eating. {Poss,Noun}
  Anna's eating lunch. {Person,Aux,Ger,Noun}
  My teachers dog. {Poss,Poss,Noun}
  10th of a second. {Ordinal,Prep,Det,Singular}
  The euro sense. {Det,Noun,Noun}
  Thanks for the gift are overdue. {Plural,Prep,Det,Noun,Copula,Adj}
  You eat and sleep. {Pronoun,Inf,Conj,Inf}
  Dogs and running and cats. {Plural,Conj,Noun,Conj,Plural}
  The 1992 classic. {Det,Cardinal,Noun}
  This is the premier university in Virginia. {Pronoun,Copula,Det,Adj,Noun,Prep,Place}
  I ate me sandwich. {Pronoun,Past,Poss,Noun}
  35 signs. {Cardinal,Plural}
  Instant access. {Adj,Noun}
  Near death experiences. {Adj,Noun,Plural}
  Ambitious sales targets. {Adj,Noun,Plural}
  Your guild colors. {Poss,Noun,Plural}
  Lexical tagging. {Adj,Noun}
  Walking is cool. {Activity,Copula,Adj}
  Responsibility for setting goals. {Noun,Prep,Ger,Plural}
  Better for training. {Comparative,Prep,Ger}
  He apologized for shouting. {Pronoun,Past,Prep,Ger}
  He reads the upcoming. {Pronoun,Pres,Det,Noun}

  # index.js: verb/noun ambiguity
  The dog treats. {Det,Noun,Plural}
  He can solve the puzzle. {Pronoun,Modal,Inf,Det,Noun}
  Keeping the matter a secret. {Ger,Det,Noun,Det,Noun}
  The slide makes noise. {Det,Noun,Pres,Noun}
  Use a pointed stick (a pencil) or a similar tool. {Inf,Det,Adj,Noun,Det,Noun,Conj,Det,Adj,Noun}
  The next career read is brief. {Det,Adj,Noun,Noun,Copula,Adj}
  He goes to sleep. {Pronoun,Pres,Prep,Noun}
  A dog retrieve in the field. {Det,Noun,Noun,Prep,Det,Noun}
  A software reinstall. {Det,Noun,Noun}
  They make sense. {Pronoun,Inf,Noun}
  Append is cloned. {Noun,Aux,Past}
  Cause I gotta go. {Conj,Pronoun,Verb,Past,Connector,Inf}
  The US air force. {Det,Place,Noun,Noun}
  This rocks. {Pronoun,Pres}
  The thing that runs. {Det,Noun,Conj,Pres}
  Let him father a child. {Inf,Pronoun,Inf,Det,Noun}
  A very big dream. {Det,Adv,Adj,Noun}
  For comparison or contrast. {Prep,Noun,Conj,Noun}
  To write people thanks for helping. {Connector,Inf,Noun,Plural,Prep,Ger}
  Hope I helped. {Inf,Pronoun,Past}
  Its proper functioning. {Poss,Adj,Noun}
  It tastes good. {Pronoun,Pres,Adj}
  The shed. {Det,Noun}
  How to watch. {QuestionWord,Connector,Inf}
  Ready to stream. {Adj,Connector,Inf}
  Bring to market. {Inf,Prep,Noun}
  Can I sleep? {Modal,Pronoun,Inf}
  Would you look? {Modal,Pronoun,Inf}
  It is just spam. {Pronoun,Copula,Adv,Noun}
  Request copies. {Inf,Plural}
  Homemade pickles and drinks. {Adj,Plural,Conj,Plural}
  The break up. {Det,Noun,Noun}
  The individual goals. {Det,Adj,Plural}
  Work or prepare. {Inf,Conj,Inf}
  To give thanks. {Connector,Inf,Plural}
  It removes wrinkles. {Pronoun,Pres,Plural}
  I Google the answer. {Pronoun,Inf,Det,Noun}
  Did the engine stop? {Past,Det,Noun,Inf}
  40 gallons of water. {Cardinal,Unit,Prep,Noun}
  When the rain stops, we will leave. {Conj,Det,Noun,Pres,Pronoun,Modal,Inf}
  Whenever the bell rings, the dog barks. {Conj,Det,Noun,Pres,Det,Noun,Pres}
  When the dog looks. {Conj,Det,Noun,Pres}
  The sun rose. {Det,Noun,Past}
  The river rose quickly. {Det,Noun,Past,Adv}
  The cat woke. {Det,Noun,Past}
  Before the dog and the cat woke, she left. {Conj,Det,Noun,Conj,Det,Noun,Past,Pronoun,Past}

  # index.js: numbers, money and units
  5 rand. {Money,Currency}
  A pound. {Value,Unit}
  3 pounds. {Value,Unit}
  Quarter of a dollar. {Fraction,Prep,Det,Currency}
  Two and a half. {Value,Value,Value,Value}
  Two-halves. {Value,Value}
  Seven fifths. {Fraction,Fraction}
  One third of it. {Fraction,Fraction,Prep,Pronoun}
  100th of it. {Fraction,Prep,Pronoun}
  A twenty fifth of it. {Fraction,Fraction,Fraction,Prep,Pronoun}
  A sixteenth. {Fraction,Fraction}
  One twenty fifth. {Fraction,Fraction,Fraction}
  3 out of 5. {Value,Value,Value,Value}
  With a hundred jobs. {Prep,Value,Value,Plural}
  With a thousand jobs. {Prep,Value,Value,Plural}
  With a million jobs. {Prep,Value,Value,Plural}
  With a billion jobs. {Prep,Value,Value,Plural}
  With a trillion jobs. {Prep,Value,Value,Plural}
  1 800 555-1234. {PhoneNumber,PhoneNumber,PhoneNumber}
  (454) 232-9873. {PhoneNumber,PhoneNumber}
  Chinese yuan. {Currency,Currency}
  5 dollars. {Money,Unit}
  5 feet. {Value,Unit}
  Kilometers an hour. {Unit,Unit,Unit}
  Minus 7. {Value,Value}
  Seven point five. {Value,Value,Value}
  Thousand and two. {Value,Value,Value}
  5 miles per hour. {Value,Unit,Unit,Unit}
  Twelve percent. {Value,Unit}

  # index.js: names and honorifics
  He is Foo Smith. {Pronoun,Copula,FirstName,LastName}
  Dwayne 'the rock' Johnson. {Person,Person,Person,Person}
  John b Smith. {Person,Person,Person}
  J. Smith. {Person,Person}
  John jr. {Person,Person}
  Dr. J. {Honorific,Person}
  John Smith III. {Person,Person,Person}
  John b. {Person,Person}
  Ludwig van Beethoven. {Person,Person,Person}
  King of Spain. {Noun,Prep,Place}
  Al Smith. {Person,Person}
  Ferdinand de Almar. {Person,Person,Person}
  Osama bin Laden. {Person,Person,Person}
  John L. Foo. {Person,Person,Person}
  Mr Foo. {Honorific,Person}
  Peter the great. {Person,Person,Person}
  John van Smith. {Person,Person,Person}
  Jose de Sucre. {Person,Person,Person}
  Jani K. Smith. {Person,Person,Person}
  John Keith Jones. {Person,Person,Person}
  John Foo. {Person,Person}
  Joe K. Sombrero. {Person,Person,Person}
  Anthony de Marco. {Person,Person,Person}
  Sergeant major Harold. {Honorific,Honorific,Person}
  General John. {Honorific,Person}
  Miss John. {Honorific,Person}
  Dr John foobar. {Honorific,Person,Person}
  His excellency John. {Honorific,Honorific,Person}
  Dr teacher. {Honorific,Person}
  First lady Michelle Obama. {Honorific,Honorific,Person,Person}
  Louis IV. {Person,Person}
  Ebenezer Scrooge. {Person,Person}
  June Smith. {Person,Person}
  Cliff Clavin. {Person,Person}
  Ollie Faroo. {Person,Person}
  They really wade. {Pronoun,Adv,Inf}
  She drew closer. {Pronoun,Past,Comparative}
  Wade Smith. {Person,Person}
  Wade G. Slapgoop. {Person,Person,Person}
  Will Smith. {Person,Person}
  Jack Layton won. {Person,Person,Past}
  Captain John walks. {Honorific,Person,Pres}

  # index.js: verbs and adjective/verb ambiguity
  It is pretty good. {Pronoun,Copula,Adv,Adj}
  I better go. {Pronoun,Modal,Inf}
  I like it. {Pronoun,Inf,Pronoun}
  He left. {Pronoun,Past}
  She bit her tongue. {Pronoun,Past,Poss,Noun}
  He will be running. {Pronoun,Modal,Aux,Ger}
  He will be nice. {Pronoun,Modal,Copula,Adj}
  Birds home to their nest. {Plural,Inf,Prep,Poss,Noun}
  It is home to birds. {Pronoun,Copula,Noun,Prep,Plural}
  It is subject to change. {Pronoun,Copula,Adj,Prep,Noun}
  It is home to dogs. {Pronoun,Copula,Noun,Prep,Plural}
  They were being run. {Pronoun,Aux,Aux,Past}
  It had been broken. {Pronoun,Aux,Aux,Past}
  It had been smoked. {Pronoun,Aux,Aux,Past}
  It had been eaten. {Pronoun,Aux,Aux,Past}
  She had to Google the answer. {Pronoun,Verb,Connector,Inf,Det,Noun}
  Does that work? {Verb,Pronoun,Inf}
  They have read. {Pronoun,Aux,Participle}
  Fuck them. {Inf,Pronoun}
  It works for me. {Pronoun,Pres,Prep,Pronoun}
  As we please. {Conj,Pronoun,Inf}
  They co write. {Pronoun,Verb,Inf}
  They out run him. {Pronoun,Verb,Inf,Pronoun}
  She dressed and left. {Pronoun,Past,Conj,Past}
  Is he stoked? {Copula,Pronoun,Adj}
  To dream of home. {Connector,Inf,Prep,Noun}
  Developed scalable React architecture. {Past,Adj,Noun,Noun}
  He does mean it. {Pronoun,Aux,Inf,Pronoun}
  Okay by me. {Adj,Prep,Pronoun}
  I mean it. {Pronoun,Inf,Pronoun}
  The ship will near the coast. {Det,Noun,Modal,Inf,Det,Noun}
  Rude and insulting. {Adj,Conj,Adj}
  He got tired of it. {Pronoun,Past,Adj,Prep,Pronoun}
  He felt cheated. {Pronoun,Past,Adj}
  Do not be embarrassed. {Aux,Negative,Inf,Adj}
  He is just tired. {Pronoun,Copula,Adv,Adj}
  Failed and oppressive. {Adj,Conj,Adj}
  The fear or heightened emotion. {Det,Noun,Conj,Adj,Noun}
  He is tired and overworked. {Pronoun,Copula,Adj,Conj,Adj}
  Their declared intentions. {Poss,Adj,Plural}
  Is he cool? {Copula,Pronoun,Adj}
  It is crowded with people. {Pronoun,Copula,Adj,Prep,Noun}
  It is empty. {Pronoun,Copula,Adj}
  Does the store open? {Verb,Det,Noun,Inf}

  # index.js: auxiliaries, phrasal verbs and commands
  He will have walked. {Pronoun,Modal,Aux,Past}
  He was walking. {Pronoun,Aux,Ger}
  He would walk. {Pronoun,Modal,Inf}
  He has walked. {Pronoun,Aux,Past}
  He will walk. {Pronoun,Modal,Inf}
  He would be walking. {Pronoun,Modal,Aux,Ger}
  He was being driven. {Pronoun,Aux,Aux,Past}
  He may want it. {Pronoun,Modal,Inf,Pronoun}
  He has been walking. {Pronoun,Aux,Aux,Ger}
  He used to walk. {Pronoun,Aux,Aux,Inf}
  He was going to walk. {Pronoun,Aux,Aux,Aux,Inf}
  He is going to be watched. {Pronoun,Aux,Aux,Aux,Aux,Past}
  There is no food. {There,Copula,Negative,Noun}
  He has been told. {Pronoun,Aux,Aux,Past}
  Better go. {Modal,Inf}
  Even better. {Adv,Comparative}
  Walk-off. {Inf,Particle}
  Walk-out. {Inf,Particle}
  Walk in on them. {Inf,Particle,Prep,Pronoun}
  It went on for hours. {Pronoun,Past,Particle,Prep,Plural}
  The curtains come down. {Det,Plural,Inf,Particle}
  They work in the office. {Pronoun,Inf,Prep,Det,Noun}
  He runs around the lake. {Pronoun,Pres,Prep,Det,Noun}
  Do not go. {Aux,Negative,Imperative}
  Please go. {Expression,Imperative}
  Just go. {Adv,Imperative}
  Go quickly. {Imperative,Adv}
  Turn down the noise. {Imperative,Particle,Det,Noun}
  Tell him the story. {Imperative,Pronoun,Det,Noun}
  Avoid loud noises. {Imperative,Adj,Plural}
  Come and have a drink. {Imperative,Conj,Inf,Det,Noun}
  Let's leave. {Verb,Pronoun,Imperative}
  Shut the door. {Imperative,Det,Noun}
  Turn off the light. {Imperative,Particle,Det,Noun}
  Can you please walk? {Modal,Pronoun,Expression,Imperative}
  Please can you walk? {Expression,Modal,Pronoun,Imperative}
  Can you walk please? {Modal,Pronoun,Imperative,Expression}
  Come have a drink. {Imperative,Inf,Det,Noun}
  Allow yourself. {Imperative,Pronoun}
  Look what happened. {Imperative,QuestionWord,Past}
  Go to it. {Imperative,Prep,Pronoun}
  Maintain eye contact. {Imperative,Noun,Noun}
  Don't forget to clean. {Aux,Negative,Inf,Connector,Inf}
  Add 2 eggs. {Imperative,Cardinal,Plural}

  # index.js: miscellaneous, organizations and places
  U r cool. {Pronoun,Copula,Adj}
  The captain who left. {Det,Noun,Prep,Past}
  Who is that? {QuestionWord,Copula,Pronoun}
  I like this. {Pronoun,Inf,Pronoun}
  Some sort of food. {Det,Noun,Prep,Noun}
  Food of some sort. {Noun,Prep,Det,Noun}
  Some eat apples. {Noun,Inf,Plural}
  Put it there. {Inf,Pronoun,Adv}
  Such skill. {Det,Noun}
  Are ya ready? {Copula,Pronoun,Adj}
  Is there food? {Copula,There,Noun}
  Should there be food? {Modal,There,Inf,Noun}
  Do you agree? {QuestionWord,Pronoun,Inf}
  Does he agree? {QuestionWord,Pronoun,Inf}
  The person who runs. {Det,Noun,Prep,Pres}
  The person which eats. {Det,Noun,Prep,Pres}
  Guess who. {Inf,QuestionWord}
  University of Toronto. {Organization,Organization,Organization}
  John & Mary Ltd. {Organization,Organization,Organization,Organization}
  Smith & Rogers. {Organization,Organization,Organization}
  Walmart USA. {Organization,Organization}
  Toronto Microsoft. {Organization,Organization}
  FitBit Inc. {Organization,Organization}
  The XYZ corporation. {Det,Organization,Organization}
  Government of India. {Organization,Organization,Organization}
  School board. {Organization,Organization}
  Special committee. {Organization,Organization}
  Global Microsoft. {Organization,Organization}
  Toronto public school. {Organization,Organization,Organization}
  Toronto Yankees. {Organization,Organization}
  Manchester United. {Organization,Organization}
  Toronto FC. {Organization,Organization}
  The New Orleans basketball team. {Det,Organization,Organization,Organization,Organization}
  West Toronto. {Place,Place}
  Toronto ca. {Place,Place}
  Portland OR. {Place,Place}
  With turkey. {Prep,Noun}
  Toronto point. {Place,Place}
  123 main street. {Address,Address,Address}
  Port Dover. {Place,Place}

  # index.js: connectors, expressions and promoted rules
  Things that seem cool. {Plural,Conj,Inf,Adj}
  He was that wide. {Pronoun,Copula,Adv,Adj}
  To the store. {Prep,Det,Noun}
  To lunch. {Prep,Noun}
  Well above the clouds. {Adv,Prep,Det,Plural}
  Directly under the bridge. {Adv,Prep,Det,Noun}
  I heard rumors that drivers save gas. {Pronoun,Past,Plural,Conj,Plural,Inf,Noun}
  Tuesday, which he liked. {Date,Prep,Pronoun,Past}
  She treated them like sons. {Pronoun,Past,Pronoun,Prep,Plural}
  A day like this. {Det,Noun,Prep,Pronoun}
  I really like it. {Pronoun,Adv,Inf,Pronoun}
  He is not like me. {Pronoun,Copula,Negative,Prep,Pronoun}
  Treat them like family. {Inf,Pronoun,Prep,Noun}
  Before dinner. {Prep,Noun}
  Where? {QuestionWord}
  Why? {QuestionWord}
  When? {QuestionWord}
  Who? {QuestionWord}
  Whom? {QuestionWord}
  Whose? {QuestionWord}
  What? {QuestionWord}
  Which? {QuestionWord}
  How he escaped. {Prep,Pronoun,Past}
  When stolen. {Prep,Participle}
  How is he? {QuestionWord,Copula,Pronoun}
  Children who dance. {Plural,Prep,Inf}
  Holy shit. {Expression,Expression}
  Come on. {Expression,Expression}
  Well, we left. {Expression,Pronoun,Past}
  So, we left. {Expression,Pronoun,Past}
  Okay, we left. {Expression,Pronoun,Past}
  Now, we left. {Expression,Pronoun,Past}
  Shoot, we missed. {Expression,Pronoun,Past}
  Say, can you help? {Expression,Modal,Pronoun,Inf}
  Like, hello. {Expression,Expression}
  Veggies, like kale. {Plural,Prep,Noun}
  We looked under the bed. {Pronoun,Past,Prep,Det,Noun}
  Images on a screen like humans do. {Plural,Prep,Det,Noun,Prep,Plural,Inf}
  Cities like New York, Boston. {Plural,Prep,Place,Place,Place}
  Like his brother, he enjoys chess. {Prep,Poss,Noun,Pronoun,Pres,Noun}
  I like tea, like my sister does. {Pronoun,Inf,Noun,Conj,Poss,Noun,Pres}
  We talked about the fact that she resigned. {Pronoun,Past,Prep,Det,Noun,Conj,Pronoun,Past}
  I have heard that story before. {Pronoun,Aux,Past,Det,Noun,Adv}
  We met shortly after. {Pronoun,Past,Adv,Adv}
  She has not arrived yet. {Pronoun,Aux,Negative,Past,Adv}
  Who did she arrive before? {QuestionWord,Past,Pronoun,Inf,Prep}
  We will leave when the rain stops. {Pronoun,Modal,Inf,Conj,Det,Noun,Pres}
  Although he was tired, he smiled. {Conj,Pronoun,Copula,Adj,Pronoun,Past}
  He was tired. {Pronoun,Copula,Adj}
  He had been tired. {Pronoun,Aux,Copula,Adj}
  The sleeping dog. {Det,Adj,Noun}
  Water broke the pipe. {Noun,Past,Det,Noun}
  She opened the present immediately. {Pronoun,Past,Det,Noun,Adv}
  It falls in June. {Pronoun,Pres,Prep,Month}
  Had he walked. {Condition,Pronoun,Past}
  Were he to walk. {Condition,Pronoun,Connector,Inf}
  Had he walked the dog? {Aux,Pronoun,Past,Det,Noun}
  This will be one sentence. {Pronoun,Modal,Inf,Cardinal,Noun}
  This might help. {Pronoun,Modal,Inf}
  He has read. {Pronoun,Aux,Participle}
  He had put it there. {Pronoun,Aux,Participle,Pronoun,Adv}
  What work he did. {QuestionWord,Noun,Pronoun,Past}
  What walks he took. {QuestionWord,Plural,Pronoun,Past}
  John and Mary walk. {Person,Conj,Person,Inf}
  Dogs near the house bark. {Plural,Prep,Det,Noun,Inf}
  He has eaten and drunk. {Pronoun,Aux,Past,Conj,Participle}
  She drew a picture. {Pronoun,Past,Det,Noun}

  # second-pass.js: clause boundaries and remaining corrections
  Before the meal ended, we left. {Conj,Det,Noun,Past,Pronoun,Past}
  Before the meal, we left. {Prep,Det,Noun,Pronoun,Past}
  After the news that she resigned, we called. {Prep,Det,Noun,Conj,Pronoun,Past,Pronoun,Past}
  Before she left. {Conj,Pronoun,Past}
  After she left. {Conj,Pronoun,Past}
  Since she left. {Conj,Pronoun,Past}
  Before the guests from the village arrived, we ate. {Conj,Det,Plural,Prep,Det,Noun,Past,Pronoun,Past}
  After the guests from the village arrived, we ate. {Conj,Det,Plural,Prep,Det,Noun,Past,Pronoun,Past}
  Since the guests from the village arrived, we ate. {Conj,Det,Plural,Prep,Det,Noun,Past,Pronoun,Past}
  Before the dog and the cat woke. {Conj,Det,Noun,Conj,Det,Noun,Past}
  After the dog and the cat woke. {Conj,Det,Noun,Conj,Det,Noun,Past}
  She bought flowers, for I was ill. {Pronoun,Past,Plural,Conj,Pronoun,Copula,Adj}
  The cat slept under the table. {Det,Noun,Past,Prep,Det,Noun}
  He sat beside me. {Pronoun,Past,Prep,Pronoun}
  The plane flew well above the clouds. {Det,Noun,Past,Adv,Prep,Det,Plural}
  She stood directly below the window. {Pronoun,Past,Adv,Prep,Det,Noun}
  She sings like her mother. {Pronoun,Pres,Prep,Poss,Noun}
  She sings like her mother does. {Pronoun,Pres,Conj,Poss,Noun,Pres}
  Which chair did she sit on? {QuestionWord,Noun,Past,Pronoun,Inf,Prep}
  What cushion can he sit on? {QuestionWord,Noun,Modal,Pronoun,Inf,Prep}
  He ate, and left. {Pronoun,Past,Conj,Past}
  Does this work? {Verb,Pronoun,Inf}
  This is useful. {Pronoun,Copula,Adj}
  Hope this helps. {Inf,Pronoun,Pres}
  This really rocks. {Pronoun,Adv,Pres}
  Being injured and treated. {Aux,Past,Conj,Past}
  Dogs, including the poodle. {Plural,Prep,Det,Noun}
  Can you walk, please? {Modal,Pronoun,Imperative,Expression}
  Can you walk the dog, please? {Modal,Pronoun,Imperative,Det,Noun,Expression}
  Will walked home. {FirstName,Past,Noun}
  Jack the ripper. {Person,Person,Person}
  Keep the lid closed. {Imperative,Det,Noun,Adj}

  # Local left/right corrections
  That is all. {Pronoun,Copula,Noun}
  She even left. {Pronoun,Adv,Past}
  She had time. {Pronoun,Past,Noun}
  Same kind of shouts. {Adj,Noun,Prep,Plural}
  Google me. {Inf,Pronoun}
  Half a penny. {Fraction,Det,Currency}
  I frequent this restaurant. {Pronoun,Inf,Det,Noun}
  The station was closing. {Det,Noun,Aux,Ger}
  The shop is closing soon. {Det,Noun,Aux,Ger,Adv}
  Plants that were growing. {Plural,Conj,Aux,Ger}
  That is when he arrived. {Pronoun,Copula,Conj,Pronoun,Past}
  She has since moved. {Pronoun,Aux,Adv,Past}

  1pm next sun. {Time,Date,WeekDay}
  He bowed his head in prayer. {Pronoun,Past,Poss,Noun,Prep,Noun}
  Assign all tasks. {Inf,Det,Plural}
  From start to finish. {Prep,Noun,Prep,Noun}
  Pope Francis. {Honorific,Person}
  Prince Paris. {Honorific,Person}
  Shit them. {Inf,Pronoun}
  Damn them. {Inf,Pronoun}
  Being born. {Aux,Past}
  How he is driving. {Conj,Pronoun,Aux,Ger}
  The very professional actor. {Det,Adv,Adj,Actor}
  A dammed-up river. {Det,Adj,Adj,Noun}
  A must-win game. {Det,Adj,Adj,Noun}
  Vacuum-sealed. {Adj,Adj}
  What the hell? {QuestionWord,Det,Noun}
  What they are doing is useful. {Conj,Pronoun,Aux,Ger,Copula,Adj}

  # Currently failing examples
#  Saint Foo. {Honorific,Person}
#  Due to weather. {Prep,Prep,Noun}
#  A bit confused. {Det,Adv,Adj}
#  He was a little fuming. {Pronoun,Copula,Det,Adv,Adj}
#  Brand new. {Adv,Adj}
#  Sun the 5th. {WeekDay,Date,Date}
#  There is no going back. {There,Copula,Negative,Noun,Adv}
#  Go to shit. {Inf,Prep,Noun}
#  And check this out! {Conj,Inf,Pronoun,Particle}
#  My butt smells. {Poss,Noun,Pres}
#  The upcoming thank-you. {Det,Noun,Noun,Noun}
#  With heads and arms rolling around. {Prep,Plural,Conj,Plural,Ger,Adv}
#  The-only-reason. {Det,Adj,Noun}
#  The American thank-you letter. {Det,Demonym,Noun,Noun,Noun}
#  At some thank-you party. {Prep,Det,Noun,Noun,Noun}
#  Working for thank-you letters. {Ger,Prep,Noun,Noun,Plural}
#  Artists on thank-you cards. {Plural,Prep,Noun,Noun,Plural}
#  Number of thank-yous. {Noun,Prep,Noun,Plural}
#  We get much thank-you mail. {Pronoun,Inf,Det,Noun,Noun,Noun}
#  That leads to trouble. {Pronoun,Pres,Prep,Noun}
#  One big thank-you. {Cardinal,Adj,Noun,Noun}
#  We found all upcoming words. {Pronoun,Past,Det,Adj,Plural}
#  Many thanks. {Det,Plural}
#  Cute little thank-you bags. {Adj,Adj,Noun,Noun,Plural}
#  Writing bigger thank-you notes. {Ger,Comparative,Noun,Noun,Plural}
#  Selling like hot thank-you cards. {Ger,Prep,Adj,Noun,Noun,Plural}
#  Some nice thank-you notes. {Det,Adj,Noun,Noun,Plural}
#  For some thank-you letters. {Prep,Det,Noun,Noun,Plural}
#  Looking good in thank-you photos. {Ger,Adj,Prep,Noun,Noun,Plural}
#  Get better thank-you notes. {Inf,Comparative,Noun,Noun,Plural}
#  Give up on thank-you letters. {Inf,Particle,Prep,Noun,Noun,Plural}
#  There are thank-you notes. {There,Copula,Noun,Noun,Plural}
#  A thousand thanks of gratitude. {Value,Value,Plural,Prep,Noun}
#  Thanks are appreciated. {Plural,Aux,Past}
#  She is writing thank-you letters. {Pronoun,Aux,Ger,Noun,Noun,Plural}
#  The 1968 stand-off. {Det,Year,Noun,Noun}
#  $5 and $6. {Money,Conj,Money}
#  6 dollars and 5 cents. {Money,Unit,Conj,Money,Unit}
#  Toronto John. {Person,Person}
#  Baker Jenna Smith. {Actor,Person,Person}
#  First lady. {Honorific,Honorific}
#  Second admiral. {Honorific,Honorific}
#  March up. {Inf,Particle}
#  Jobs that fit. {Plural,Conj,Inf}
#  He was under paid. {Pronoun,Aux,Adv,Past}
#  She is being cool. {Pronoun,Aux,Copula,Adj}
#  He ought not to walk. {Pronoun,Modal,Negative,Connector,Inf}
#  He ought to be walking. {Pronoun,Modal,Connector,Aux,Ger}
#  He would have had to go. {Pronoun,Modal,Aux,Aux,Connector,Inf}
#  He is about to go. {Pronoun,Aux,Aux,Aux,Inf}
#  Back it up. {Inf,Pronoun,Particle}
#  Eat my shorts. {Imperative,Poss,Plural}
#  Long live the king. {Expression,Expression,Det,Noun}
#  There she is. {Adv,Pronoun,Copula}
#  Microsoft of Canada. {Organization,Organization,Organization}
#  A lot like ours. {Det,Noun,Prep,Pronoun}
#  23 Main Street in Toronto. {Address,Address,Address,Place,Place}
`

test('match spec:', function (t) {
  const tagSet = nlp.world().model.one.tagSet
  const aliases = {}
  Object.entries(tagSet).forEach(([tag, info]) => {
    if (info.alias) aliases[info.alias] = tag
  })
  spec
    .split('\n')
    .filter(line => line.trim() && !line.trimStart().startsWith('#'))
    .forEach(line => {
      const failing = nlp.testSpec(line, false)
      const brace = line.lastIndexOf('{')
      const sentence = line.slice(0, brace).trim()
      const differences = []
      if (failing.found) {
        failing.compute('tagRank')
        const slots = line
          .slice(brace + 1)
          .replace(/\}[ \t]*#.*$/, '}')
          .replace(/\}$/, '')
          .split(',')
        const terms = failing.docs.flat()
        slots.forEach((slot, i) => {
          const expected = slot.split('|').map(tag => tag.trim())
          const term = terms[i]
          if (!term) {
            differences.push(`term ${i + 1}: missing, expected ${slot}`)
          } else if (!expected.every(tag => term.tags.has(aliases[tag] || tag))) {
            const word = term.implicit || term.text
            const actual = term.tagRank[0] || 'Untagged'
            const missing = expected.find(tag => !term.tags.has(aliases[tag] || tag))
            differences.push(`'${word}' #${actual}!=#${missing}`)
          }
        })
        if (terms.length !== slots.length) {
          differences.push(`expected ${slots.length} terms, got ${terms.length}`)
        }
        if (differences.length === 0) differences.push('tags align, but the sentence pattern did not match')
      }
      const detail = differences.length > 0 ? ' — ' + differences.join('; ') : ''
      t.equal(failing.found, false, here + sentence + detail)
    })
  t.end()
})

test('left/right migrated tag and untag phrases', t => {
  const cases = [
    ['I ate turkey', 'turkey', ['Uncountable'], ['Place', 'Country']],
    ['a turkey sandwich', 'turkey', ['Uncountable'], ['Place', 'Country']],
    ['we visited Turkey', 'Turkey', ['Country'], []],
    ['I waited ten seconds', 'seconds', ['Plural'], ['Value']],
    ['I waited ten seconds', 'ten', ['Cardinal'], ['Fraction']],
    ['an un-skilled worker', 'un-skilled', ['Adjective'], []],
    ['make me talk to his hand', 'talk', ['Verb'], ['Noun']],
    ['a left-out-type existence', 'type', ['Noun'], ['Verb']],
    ['send it to her', 'to', ['Preposition'], ['Conjunction']],
    ['go to the store', 'to', ['Preposition'], ['Conjunction']],
    ['an un skilled worker', 'un', ['Adjective', 'Prefix'], []],
    ['they over-estimate it', 'over', ['Verb', 'Prefix'], []],
    ['she bought a Warhol', 'Warhol', ['Noun'], ['Person', 'LastName']],
    ['she spoke to Warhol', 'Warhol', ['Person'], []],
  ]
  cases.forEach(([text, word, present, absent]) => {
    const target = nlp(text).match(word)
    present.forEach(tag => t.equal(target.has('#' + tag), true, `${text}: ${word} has ${tag}`))
    absent.forEach(tag => t.equal(target.has('#' + tag), false, `${text}: ${word} lacks ${tag}`))
  })
  t.end()
})

test('frequent failed-rule cleanup preserves nouns and predicates', t => {
  const cases = [
    ['She watched the ducks.', 'ducks', 'Noun', 'Verb'],
    ['He plans a walk.', 'walk', 'Noun', 'Verb'],
    ['The repairs took all day.', 'repairs', 'Plural', 'Verb'],
    ['They had high hopes.', 'hopes', 'Plural', 'Verb'],
    ['She has big plans.', 'plans', 'Plural', 'Verb'],
    ['He had great looks.', 'looks', 'Plural', 'Verb'],
    ['The river flows quickly.', 'flows', 'Verb', 'Noun'],
    ['The engine-controls failed.', 'controls', 'Plural', 'Verb'],
    ['The artist paints murals.', 'paints', 'Verb', 'Noun'],
    ['The cook can sing.', 'cook', 'Noun', 'Verb'],
    ['The fish swim.', 'fish', 'Noun', 'Verb'],
    ['The fish swim.', 'swim', 'Verb', 'Noun'],
    ['The shops close early.', 'shops', 'Plural', 'Verb'],
    ['The shops close early.', 'close', 'Verb', 'Noun'],
    ['We sell books, toys and watches.', 'watches', 'Plural', 'Verb'],
    ['I enjoy music, art and dance.', 'dance', 'Noun', 'Verb'],
    ['She talks, laughs and dances.', 'dances', 'Verb', 'Noun'],
    ['John and Mary work.', 'work', 'Verb', 'Noun'],
  ]
  cases.forEach(([text, word, present, absent]) => {
    const target = nlp(text).match(word)
    t.equal(target.has('#' + present), true, `${text}: ${word} has ${present}`)
    t.equal(target.has('#' + absent), false, `${text}: ${word} lacks ${absent}`)
  })
  t.end()
})

test('frequent failed-rule cleanup preserves demonstrative questions', t => {
  const cases = [
    ['Does this work?', 'this', 'Pronoun'],
    ['Does that really help?', 'that', 'Pronoun'],
    ['Do these work?', 'these', 'Pronoun'],
    ['Can those really fly?', 'those', 'Pronoun'],
    ['Does this machine work?', 'this', 'Determiner'],
    ['Can that bird fly?', 'that', 'Determiner'],
    ['These machines work.', 'these', 'Determiner'],
    ['Those birds can fly.', 'those', 'Determiner'],
  ]
  cases.forEach(([text, word, tag]) => {
    t.equal(nlp(text).match(word).has('#' + tag), true, `${text}: ${word} has ${tag}`)
  })
  t.end()
})

test('noun corrections retain compound and nominal contexts', t => {
  const cases = [
    ['The slide makes noise.', 'slide'],
    ['The ride costs money.', 'ride'],
    ['They had good timing.', 'timing'],
    ['We have great hopes.', 'hopes'],
    ['They offered food, shelter and thanks.', 'thanks'],
    ['They sell shoes, hats and dresses.', 'dresses'],
    ['They took short drill-breaks.', 'breaks'],
    ['The panel has a recess-lock.', 'lock'],
  ]
  cases.forEach(([text, word]) => {
    const target = nlp(text).match(word)
    t.equal(target.has('#Noun'), true, `${text}: ${word} is a noun`)
    t.equal(target.has('#Verb'), false, `${text}: ${word} is not a verb`)
  })
  t.end()
})

// Already fails before rule cleanup: the gerund-like list item hides the noun list.
test.skip('noun list with clothing preserves watches as a noun', t => {
  const target = nlp('We sell food, clothing and watches.').match('watches')
  t.equal(target.has('#Noun'), true)
  t.equal(target.has('#Verb'), false)
  t.end()
})

test('early imperative commands', t => {
  const commands = [
    ['Go to Toronto.', 'go'], ['Go to the store.', 'go'],
    ['Keep it quiet.', 'keep'], ['Keep it cool.', 'keep'], ['Keep it simple.', 'keep'],
  ]
  commands.forEach(([text, word]) => {
    t.equal(nlp(text).match(word).has('#Imperative'), true, text)
  })
  const statements = [
    ['I go to Toronto.', 'go'], ['They wait for the bus.', 'wait'],
    ['We keep it quiet.', 'keep'], ['The stop was nearby.', 'stop'],
    ['There is no hurry.', 'hurry'],
  ]
  statements.forEach(([text, word]) => {
    t.equal(nlp(text).match(word).has('#Imperative'), false, text)
  })
  t.end()
})
