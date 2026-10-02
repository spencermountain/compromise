import test from 'tape'
import nlp from '../../../src/two.js'
import fromHere from '../../../src/1-one/match/methods/match/02-from-here.js'
import { isFixed, fromFixed } from '../../../src/1-one/match/methods/match/_fixed.js'

test('fixed patterns preserve matches and capture pointers', t => {
  const world = nlp.world()
  const patterns = ['alpha beta', '[alpha beta]', 'alpha [beta]', '[alpha] [beta]',
    '^alpha beta', 'alpha beta$', '(alpha|beta)', '#Noun', '#Determiner #Adjective #Noun',
    "we've", "[we've] walked", 'we have', 'have walked', 'have [walked]', 'hello']
  const texts = ['alpha beta', 'gamma alpha beta alpha beta', 'alpha beta gamma',
    'the red car', "we've walked home", "they said we've walked", "we've", 'Hello', '']
  patterns.forEach(pattern => {
    const regs = world.methods.one.parseMatch(pattern, {}, world)
    t.ok(isFixed(regs), `eligible: ${pattern}`)
    texts.forEach(text => {
      nlp(text).docs.forEach(terms => {
        for (let i = 0; i <= terms.length; i += 1) {
          t.deepEqual(fromFixed(terms, regs, i, terms.length, i),
            fromHere(terms, regs, i, terms.length, i), `${pattern}: ${text} at ${i}`)
        }
      })
    })
  })
  t.end()
})

test('complex patterns retain the general matcher', t => {
  const world = nlp.world()
  const patterns = ['alpha? beta', 'alpha+ beta', '!alpha beta', '.* beta',
    '(alpha beta|gamma)', '(alpha && #Noun)', '/alpha/', '@hasContraction']
  patterns.forEach(pattern => {
    const regs = world.methods.one.parseMatch(pattern, {}, world)
    t.notOk(isFixed(regs), pattern)
  })
  const regs = world.methods.one.parseMatch('alpha beta', {}, world)
  t.ok(isFixed(regs), 'initially simple')
  regs[0].optional = true
  t.notOk(isFixed(regs), 'eligibility follows edited parsed patterns')
  t.end()
})
