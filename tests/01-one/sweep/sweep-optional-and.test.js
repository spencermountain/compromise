import test from 'tape'
import nlp from '../lib.js'
const here = '[one/sweep/sweep-optional-and] '

const parity = (t, match, str) => {
  const doc = nlp(str)
  doc.match('#Noun').tag('Noun')
  const found = doc.sweep(nlp.buildNet([{ match }])).found.length
  t.equal(found, doc.match(match).length, here + `'${match}' on '${str}'`)
  return found
}

test(here + 'an optional AND block requires nothing', t => {
  t.equal(parity(t, '(#Adjective && !foo)? bar', 'bar'), 1, here + 'matches without the block')
  t.equal(parity(t, '(foo && #Noun)? bar', 'bar'), 1, here + 'matches without the word')
  t.equal(parity(t, '(#Adjective && !foo)+? bar', 'bar'), 1, here + 'optional greedy block')
  t.equal(parity(t, '(foo && #Noun)? bar', 'baz'), 0, here + 'still needs the required word')
  t.end()
})

test(here + 'a negative AND block requires nothing', t => {
  t.equal(parity(t, '!(foo && #Adjective) bar', 'baz bar'), 1, here + 'matches without the tag')
  t.end()
})

test(here + 'a required AND block still filters', t => {
  const net = nlp.buildNet([{ match: '(foo && #Adjective) bar' }])
  t.equal(nlp('foo bar').sweep(net).found.length, 0, here + 'missing tag')
  t.ok(net.hooks['#Adjective'], here + 'tag is a required hook')
  t.ok(net.hooks.foo, here + 'word is a required hook')
  t.end()
})

test(here + 'optional AND terms are not hooks', t => {
  const net = nlp.buildNet([{ match: '(foo && #Adjective)? bar' }])
  t.deepEqual(Object.keys(net.hooks), ['bar'], here + 'only the required word')
  t.throws(() => nlp.buildNet([{ match: '(foo && #Adjective)? bar', hook: 'foo' }]), here + 'invalid explicit hook')
  t.end()
})
