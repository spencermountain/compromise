import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/out-best-tag] '

test('out best-tag ranks tags automatically', function (t) {
  const examples = [
    ['john smith was really working', '#MaleName #LastName #Copula #Adverb #Gerund'],
    ['he sang in June', '#Pronoun #PastTense #Preposition #Month'],
    ['fastest shooter in Canada', '#Superlative #Singular #Preposition #Country'],
    ["John's dog", '#MaleName #Singular'],
    ['5 5% $5', '#NumericValue #Percent #Money'],
    ['cat cat', '#Singular #Singular'],
  ]
  examples.forEach(([str, want]) => {
    t.equal(nlp(str).out('best-tag'), want, here + str)
  })
  t.end()
})

test('out best-tag formats sentences and selections', function (t) {
  const doc = nlp('he sang in June. fastest shooter in Canada!')
  t.equal(
    doc.out('best-tag'),
    '#Pronoun #PastTense #Preposition #Month\n#Superlative #Singular #Preposition #Country',
    here + 'newline between sentences, without punctuation or trailing newline'
  )
  t.equal(doc.match('in June').out('best-tag'), '#Preposition #Month', here + 'only selected terms')
  t.equal(doc.match('(June|Canada)').out('best-tag'), '#Month\n#Country', here + 'matches across sentences')
  const sentence = nlp('the cat sat')
  t.equal(
    sentence.match('(the|sat)').out('best-tag'),
    '#Determiner\n#PastTense',
    here + 'separate matches within one sentence get separate lines'
  )
  t.equal(sentence.terms().out('best-tag'), '#Determiner\n#Singular\n#PastTense', here + 'one line per term view')
  t.equal(
    nlp('  he\t sang   in June!  ').out('best-tag'),
    '#Pronoun #PastTense #Preposition #Month',
    here + 'normalized spacing'
  )
  t.end()
})

test('out best-tag empty views', function (t) {
  t.equal(nlp('').out('best-tag'), '', here + 'empty input')
  t.equal(nlp('   \n\t').out('best-tag'), '', here + 'whitespace input')
  t.equal(nlp('the cat sat').match('dog').out('best-tag'), '', here + 'no matches')
  t.equal(nlp('the cat sat').none().out('best-tag'), '', here + 'empty selection')
  t.end()
})

test('out best-tag retains slots for untagged terms', function (t) {
  // tokenize bypasses the tagger while retaining the tagRank compute method.
  t.equal(nlp.tokenize('hello').out('best-tag'), '', here + 'one untagged term')
  t.equal(nlp.tokenize('hello world').out('best-tag'), ' ', here + 'two empty slots')
  t.equal(nlp.tokenize('one two. three four.').out('best-tag'), ' \n ', here + 'untagged sentences')
  const doc = nlp.tokenize('alpha beta gamma')
  doc.match('beta').tag('Custom')
  t.equal(doc.out('best-tag'), ' #Custom ', here + 'leading and trailing empty slots')
  doc.match('alpha').tag('First')
  doc.match('beta').unTag('*')
  doc.match('gamma').tag('Last')
  t.equal(doc.out('best-tag'), '#First  #Last', here + 'middle empty slot')
  t.end()
})

test('out best-tag includes implicit contraction terms', function (t) {
  const doc = nlp("he isn't here")
  const want = '#Pronoun #Copula #Negative #Uncountable'
  t.equal(doc.out('best-tag'), want, here + 'implicit not has its own tag')
  t.equal(doc.text(), "he isn't here", here + 'output does not expand text')
  doc.contractions().expand()
  t.equal(doc.out('best-tag'), want, here + 'same tags after expanding')
  t.end()
})

test('out best-tag refreshes rankings without changing text or tags', function (t) {
  const doc = nlp('cat')
  const tags = doc.out('tags')
  t.equal(doc.out('best-tag'), '#Singular', here + 'initial output')
  t.equal(doc.out('best-tag'), '#Singular', here + 'repeat output')
  t.equal(doc.text(), 'cat', here + 'text preserved')
  t.deepEqual(doc.out('tags'), tags, here + 'tags and their order preserved')
  doc.tag('Verb')
  t.equal(doc.out('best-tag'), '#Verb', here + 'retagging replaces old ranking')
  doc.unTag('*')
  t.equal(doc.out('best-tag'), '', here + 'removing all tags clears old ranking')
  doc.tag('Custom')
  t.equal(doc.out('best-tag'), '#Custom', here + 'tagging an untagged term refreshes ranking')
  t.end()
})

test('out best-tag prefers custom tags', function (t) {
  t.equal(nlp('cat').tag('Custom').out('best-tag'), '#Custom', here + 'custom tag outranks built-in tags')
  t.equal(nlp('john smith').tag('Foo Bar').out('best-tag'), '#Foo #Bar', here + 'per-term custom tags')
  t.end()
})
