import test from 'tape'
import nlp from '../../lib/one.js'
const here = '[one/sweep/sweep-fixed-pattern] '

test(here + 'fixed patterns preserve matches and captures', t => {
  const cases = [
    ['alpha beta', 'alpha beta', ['alpha beta']],
    ['alpha beta', '[alpha beta]', ['alpha beta']],
    ['alpha beta', 'alpha [beta]', ['beta']],
    ['alpha beta', '[alpha] beta', ['alpha']],
    ['gamma alpha beta alpha beta', 'alpha beta', ['alpha beta', 'alpha beta']],
    ['gamma alpha beta alpha beta', 'alpha [beta]', ['beta', 'beta']],
    ['alpha beta gamma', '^alpha beta', ['alpha beta']],
    ['gamma alpha beta', '^alpha beta', []],
    ['gamma alpha beta', 'alpha beta$', ['alpha beta']],
    ['alpha beta gamma', 'alpha beta$', []],
    ['alpha beta', '^alpha [beta]$', ['beta']],
    ['alpha beta', 'alpha beta gamma', []],
    ['alpha gamma beta', '(alpha|beta)', ['alpha', 'beta']],
    ['Hello', 'hello', ['Hello']],
    ['', 'alpha beta', []],
  ]
  cases.forEach(([input, pattern, expected]) => {
    const doc = nlp(input)
    const group = pattern.includes('[') ? 0 : undefined
    const net = nlp.buildNet([{ match: pattern, group }])
    t.deepEqual(doc.match(pattern, group).out('array'), expected, `${here}${input}: match ${pattern}`)
    t.deepEqual(doc.sweep(net, { tagger: false }).view.out('array'), expected, `${here}${input}: sweep ${pattern}`)
  })
  t.end()
})

test(here + 'tag patterns and named groups preserve selections', t => {
  const doc = nlp('the red car')
  doc.match('the').tag('Determiner')
  doc.match('red').tag('Adjective')
  doc.match('car').tag('Noun')
  const pattern = '#Determiner [<description>#Adjective #Noun]'
  const match = doc.match(pattern)
  t.equal(match.text(), 'the red car', here + 'named capture retains the complete match')
  t.equal(match.groups('description').text(), 'red car', here + 'named group selects its terms')
  const net = nlp.buildNet([{ match: '#Determiner [#Adjective #Noun]', group: 0 }])
  t.deepEqual(doc.sweep(net, { tagger: false }).view.out('array'), ['red car'], here + 'sweep preserves tag capture')
  t.end()
})

test(here + 'complex patterns preserve optional and repeated matches', t => {
  const cases = [
    ['beta', 'alpha? beta', ['beta']],
    ['alpha alpha beta', 'alpha+ beta', ['alpha alpha beta']],
    ['gamma beta', '!alpha beta', ['gamma beta']],
    ['gamma', '(alpha beta|gamma)', ['gamma']],
    ['alpha beta', '/alpha/', ['alpha']],
  ]
  cases.forEach(([input, pattern, expected]) => {
    const doc = nlp(input)
    const net = nlp.buildNet([{ match: pattern }])
    t.deepEqual(doc.match(pattern).out('array'), expected, `${here}${input}: match ${pattern}`)
    t.deepEqual(doc.sweep(net, { tagger: false }).view.out('array'), expected, `${here}${input}: sweep ${pattern}`)
  })
  t.end()
})

test(here + 'matching respects edits to parsed patterns', t => {
  const doc = nlp('beta')
  const pattern = nlp.parseMatch('alpha beta')
  t.equal(doc.match(pattern).found, false, here + 'required prefix is missing')
  pattern[0].optional = true
  t.equal(doc.match(pattern).text(), 'beta', here + 'prefix can become optional')
  pattern[0].optional = false
  t.equal(doc.match(pattern).found, false, here + 'prefix can become required again')
  t.end()
})
