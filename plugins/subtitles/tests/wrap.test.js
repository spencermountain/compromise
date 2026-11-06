import test from 'tape'
import nlp from '../../../tests/03-three/lib.js'
import WrapDoc from '../src/WrapDoc.js'
import { compare, allCases, isSame, expected } from './_differential.js'
const here = '[subtitles/wrap] '

const wrap = (...cues) => new WrapDoc(cues.map(str => nlp(str)))

test('every method matches a single doc', function (t) {
  const results = allCases(nlp).map(([sel, name, args]) => compare(nlp, sel, name, args))
  const different = results.filter(res => !isSame(res) && !expected[res.id])
  t.deepEqual(different.map(res => res.id), [], here + `${results.length} method calls`)
  t.end()
})

test('transforms change each cue', function (t) {
  const doc = wrap('I walk to work. She sings.', 'Oh wow!', 'He eats.')
  doc.verbs().toPastTense()
  t.equal(doc.text(), 'I walked to work. She sang. Oh wow! He ate.', here + 'whole doc')
  t.deepEqual(
    doc.views.map(v => v.text()),
    ['I walked to work. She sang.', 'Oh wow!', 'He ate.'],
    here + 'each cue',
  )
  t.end()
})

test('selections keep one view per cue', function (t) {
  const doc = wrap('I walk. She sings.', 'Oh wow!', 'He eats.')
  const m = doc.verbs()
  t.deepEqual(m.views.map(v => v.length), [2, 0, 1], here + 'verbs')
  t.deepEqual(m.last().views.map(v => v.length), [0, 0, 1], here + 'last')
  t.deepEqual(doc.match('zebra').views.map(v => v.length), [0, 0, 0], here + 'no match')
  t.equal(doc.match('zebra').found, false, here + 'not found')
  t.end()
})

test('positions count across cues', function (t) {
  const m = wrap('one two', 'three', 'four five').terms()
  t.equal(m.length, 5, here + 'length')
  t.equal(m.first().text(), 'one', here + 'first')
  t.equal(m.last().text(), 'five', here + 'last')
  t.equal(m.eq(2).text(), 'three', here + 'eq')
  t.equal(m.eq(9).found, false, here + 'eq past end')
  t.equal(m.get(3).text(), 'four', here + 'get')
  t.equal(m.slice(1, 4).text(), 'two three four', here + 'slice')
  t.equal(m.slice(-1).text(), 'five', here + 'slice negative')
  t.equal(m.random(2).length, 2, here + 'random')
  t.equal(m.terms(3).text(), 'four', here + 'terms(n)')
  t.equal(m.matchOne('(two|four)').text(), 'two', here + 'matchOne')
  t.equal(m.json(1).text, 'two', here + 'json(n)')
  t.equal(m.json().length, 5, here + 'json')
  t.end()
})

test('callbacks get a running index', function (t) {
  const m = wrap('one two', 'three', 'four five').terms()
  const seen = []
  m.forEach((_m, i) => seen.push(i))
  t.deepEqual(seen, [0, 1, 2, 3, 4], here + 'forEach')
  t.deepEqual(m.map((v, i) => v.text() + i), ['one0', 'two1', 'three2', 'four3', 'five4'], here + 'map')
  t.equal(m.filter((_m, i) => i > 2).text(), 'four five', here + 'filter')
  t.equal(m.find(v => v.has('(three|five)')).text(), 'three', here + 'find')
  t.equal(m.find(v => v.has('zebra')).found, false, here + 'find nothing')
  t.equal(m.some((_m, i) => i === 4), true, here + 'some')
  t.equal(m.some((_m, i) => i === 5), false, here + 'none')
  t.end()
})

test('map skips cues without a match', function (t) {
  const doc = wrap('i walk', 'oh wow', 'he eats')
  t.deepEqual(doc.verbs().map(v => v.text()), ['walk', 'eats'], here + 'strings')
  t.end()
})

test('n params count across cues', function (t) {
  const doc = wrap('I walk. She sings.', 'Oh wow!', 'He eats.')
  t.equal(doc.verbs(0).text(), 'walk', here + 'verbs(0)')
  t.equal(doc.verbs(2).text(), 'eats', here + 'verbs(2)')
  t.equal(doc.verbs(3).found, false, here + 'verbs past end')
  t.equal(doc.sentences(2).text(), 'Oh wow!', here + 'sentences(n)')

  const nums = wrap('i have 1 apple and 2 pears', 'oh wow', 'give me 3 grapes')
  t.equal(nums.numbers(2).text(), '3', here + 'numbers(n)')
  t.deepEqual(nums.numbers().get(1), [2], here + 'get(n) in a subclass')

  const emails = wrap('ask a@b.com', 'or c@d.com', 'or e@f.com')
  t.equal(emails.emails(1).text(), 'c@d.com', here + 'generated selection')

  // only change that one verb
  doc.verbs(2).toPastTense()
  t.equal(doc.text(), 'I walk. She sings. Oh wow! He ate.', here + 'transform one')
  doc.verbs().toPastTense(0)
  t.equal(doc.text(), 'I walked. She sings. Oh wow! He ate.', here + 'transform(n)')
  t.end()
})

test('numbers that are not positions', function (t) {
  const nums = () => wrap('i have 1 apple and 2 pears', 'oh wow', 'give me 3 grapes').numbers()
  t.deepEqual(nums().greaterThan(0).get(), [1, 2, 3], here + 'greaterThan(0)')
  t.deepEqual(nums().greaterThan(1).get(), [2, 3], here + 'greaterThan(1)')
  t.deepEqual(nums().lessThan(3).get(), [1, 2], here + 'lessThan')
  t.deepEqual(nums().between(0, 3).get(), [1, 2], here + 'between')
  t.deepEqual(nums().isEqual(3).get(), [3], here + 'isEqual')

  const doc = wrap('i have 1 apple', 'give me 3 grapes')
  doc.numbers().add(2)
  t.equal(doc.text(), 'i have 3 apple give me 5 grapes', here + 'add')
  t.end()
})

test('getNth is restored after each call', function (t) {
  const doc = wrap('i walk', 'he eats')
  const proto = Object.getPrototypeOf(Object.getPrototypeOf(doc.verbs().views[0]))
  const { getNth, get } = proto
  doc.verbs(1)
  t.equal(proto.getNth, getNth, here + 'getNth')
  t.equal(proto.get, get, here + 'get')
  nlp.plugin({
    api: View => {
      View.prototype.boom = () => {
        throw new Error('boom')
      }
    },
  })
  t.throws(() => doc.boom(1), /boom/, here + 'throws')
  t.equal(proto.getNth, getNth, here + 'getNth after throw')
  t.end()
})

test('subclass methods and late plugins', function (t) {
  const doc = wrap('my dog', 'his cat')
  t.equal(doc.nouns().viewType, 'Nouns', here + 'viewType')
  doc.nouns().toPlural()
  t.equal(doc.text(), 'my dogs his cats', here + 'subclass method')

  // added after the wrapper was made
  nlp.plugin({
    api: View => {
      View.prototype.shout = function () {
        return this.text().toUpperCase()
      }
    },
  })
  t.equal(doc.shout(), 'MY DOGS HIS CATS', here + 'plugin method')
  t.end()
})

test('results merge by type', function (t) {
  const doc = wrap('I walk to work.', 'Oh wow!', 'He eats. I walk.')
  t.equal(doc.length, 4, here + 'length')
  t.equal(doc.found, true, here + 'found')
  t.equal(doc.isView, true, here + 'isView')
  t.equal(doc.wordCount(), 10, here + 'number')
  t.equal(doc.has('wow'), true, here + 'boolean')
  t.equal(doc.has('zebra'), false, here + 'boolean, no match')
  t.equal(doc.isFull(), true, here + 'isFull')
  t.equal(doc.match('walk').isFull(), false, here + 'isFull, no')
  t.deepEqual(doc.out('array').length, 4, here + 'array')
  t.equal(doc.world, doc.views[0].world, here + 'shared object')
  t.ok(doc.confidence() <= 1, here + 'confidence is not a sum')

  const groups = doc.match('[<who>#Pronoun] .').groups()
  t.equal(groups.who.text(), 'I He I', here + 'object of views')

  const repeats = wrap('one two', 'two three', 'two').terms().out('freq')
  t.deepEqual(repeats[0], { normal: 'two', count: 3 }, here + 'freq adds up')
  t.end()
})

test('unique across cues', function (t) {
  const doc = wrap('John saw Mary.', 'Mary saw Tom.', 'John left.')
  t.deepEqual(doc.people().unique().out('array'), ['John', 'Mary.', 'Tom.'], here + 'unique')
  t.end()
})

test('replace ignores cues without a match', function (t) {
  const doc = wrap('a big dog', 'oh wow', 'a big cat')
  const res = doc.replace('big', 'small')
  t.deepEqual(res.out('array'), ['small', 'small'], here + 'selection')
  t.equal(doc.text(), 'a small dog oh wow a small cat', here + 'document')
  t.end()
})

test('concat goes on the last cue', function (t) {
  const doc = wrap('one two.', 'three four.')
  doc.concat('five six.')
  t.equal(doc.views[0].text(), 'one two.', here + 'first cue')
  // the same as a single doc
  const last = nlp('three four.')
  last.concat('five six.')
  t.equal(doc.views[1].text(), last.text(), here + 'last cue')
  t.end()
})

test('a WrapDoc can be a param', function (t) {
  const doc = wrap('one two', 'three four')
  const m = doc.match('(two|three)')
  t.equal(doc.terms().not(m).text(), 'one four', here + 'not')
  t.equal(doc.terms().if(m).text(), 'two three', here + 'if')
  t.equal(doc.isDoc(doc.all()), true, here + 'isDoc')
  t.equal(doc.isDoc(m), false, here + 'isDoc, no')
  t.end()
})

test('clone leaves the original', function (t) {
  const doc = wrap('i walk', 'he eats')
  const copy = doc.clone()
  copy.verbs().toPastTense()
  t.equal(copy.text(), 'i walked he ate', here + 'copy')
  t.equal(doc.text(), 'i walk he eats', here + 'original')
  t.end()
})

test('extending keeps extra data', function (t) {
  class Cues extends WrapDoc {
    constructor(views, times) {
      super(views)
      this.times = times
    }
    update(views) {
      return new Cues(views, this.times)
    }
    // a new method, using the wrapped ones
    wordsPerCue() {
      return this.views.map(v => v.wordCount())
    }
  }
  const doc = new Cues([nlp('i walk'), nlp('he eats food')], [0, 2])
  const m = doc.verbs().first()
  t.ok(m instanceof Cues, here + 'same class')
  t.deepEqual(m.times, [0, 2], here + 'extra data')
  t.deepEqual(doc.wordsPerCue(), [2, 3], here + 'new method')
  t.end()
})
