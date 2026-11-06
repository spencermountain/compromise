import test from 'tape'
import vttpeg from 'vttpeg'
import nlp from '../../../tests/03-three/lib.js'
import plugin from '../src/plugin.js'
import WrapDoc from '../src/WrapDoc.js'
const here = '[subtitles/fromSubtitle] '

nlp.plugin(plugin)

const file = `WEBVTT
Kind: captions

NOTE this is a comment

1
00:00:01.000 --> 00:00:03.000 line:90%
I walk to
the big store.

00:00:03.500 --> 00:00:05.000
-Who is here?
-This is a mirror ball suit.

00:00:05.500 --> 00:00:07.000
[SIGHING]

3
00:00:08.000 --> 00:00:10.000
John didn't buy
3 red apples &amp; pears.
`

// a one-cue file
const oneCue = (...lines) => `WEBVTT\n\n00:00:01.000 --> 00:00:02.000\n${lines.join('\n')}`

test('returns a wrapped doc', function (t) {
  const doc = nlp.fromSubtitle(file)
  t.ok(doc instanceof WrapDoc, here + 'is a WrapDoc')
  t.equal(doc.views.length, 4, here + 'one doc per cue')
  t.equal(doc.length, 5, here + 'sentences')
  t.equal(doc.people().text(), 'John', here + 'named selection')
  t.equal(doc.verbs(0).text(), 'walk', here + 'first verb overall')
  t.equal(doc.match('john').views[3].found, true, here + 'finds the cue')
  t.end()
})

test('cue data lines up with each doc', function (t) {
  const doc = nlp.fromSubtitle(file)
  t.equal(doc.cues.length, 4, here + 'cues')
  t.equal(doc.cues[3].startTime, 8, here + 'startTime')
  t.equal(doc.cues[3].endTime, 10, here + 'endTime')
  t.equal(doc.cues[3].label, '3', here + 'label')
  t.equal(doc.cues[0].attributes, 'line:90%', here + 'attributes')
  // and from a chain of selections
  const m = doc.match('john').first()
  t.equal(m.cues[3].startTime, 8, here + 'after a selection')
  t.equal(m.views[3].text(), 'John', here + 'matching view')
  t.end()
})

test('unchanged output is the same as vttpeg', function (t) {
  t.equal(nlp.fromSubtitle(file).toSubtitle(), vttpeg(file).out(), here + 'whole file')
  // awkward things around a line-break
  const arr = [
    ['It was the best of times,', 'it was the worst of times.'],
    ["I didn't", 'know that.'],
    ["It wasn't", "John's dog, it's"],
    ['we paid $5.50', 'for 20km of 3pm rides'],
    ['-What are you wearing?', '-This is the mirror ball suit.'],
    ['-Hello there', '-Hi there'],
    ['<i>Come with us</i>', 'to the <b>Mighty</b> Boosh'],
    ['♪ a song', 'goes here ♪'],
    ['[SIGHING]', 'oh well...'],
    ['well-known', 'and/or better'],
    ['"quoted', 'text"'],
    ['(in parens', 'too)'],
    ['one  two', 'three'],
    ['>> speaker one', '>> speaker two'],
    ['café déjà', 'vu 😀'],
    ['ends with dash -', 'next line'],
    ['single line only'],
    ['Dr.', 'Smith is here.'],
    ['wow!', 'ok'],
    ['one', 'two', 'three', 'four'],
  ]
  arr.forEach(lines => {
    const str = oneCue(...lines)
    t.equal(nlp.fromSubtitle(str).toSubtitle(), vttpeg(str).out(), here + lines.join(' / '))
  })
  t.end()
})

test('samples from the vttpeg readme', function (t) {
  const compact = `WEBVTT

00:10.845 --> 00:17.845
<i>-♪ The Mighty Boosh ♪
-♪ Come with us to the Mighty Boosh ♪</i>

00:23.965 --> 00:26.195
[ELECTRONIC SQUELCHES, HUMMING]

00:34.204 --> 00:39.278
-What the hell are you wearing?
-This is the mirror ball suit.`
  t.equal(nlp.fromSubtitle(compact).toSubtitle(), vttpeg(compact).out(), here + 'compact timestamps')
  t.ok(nlp.fromSubtitle(compact).toSubtitle().includes('00:34.204'), here + 'style is kept')

  const inline = `WEBVTT
1
00:16.500 --> 00:18.500
When the moon <00:17.500>hits your eye

1
00:00:18.500 --> 00:00:20.500
Like a <00:19.000>big-a <00:19.500>pizza <00:20.000>pie`
  t.equal(nlp.fromSubtitle(inline).toSubtitle(), vttpeg(inline).out(), here + 'inline timestamps')
  t.end()
})

test('wrapped lines are one text', function (t) {
  const doc = nlp.fromSubtitle(oneCue('I want to', 'walk the dog'))
  t.equal(doc.sentences().length, 1, here + 'one sentence')
  t.equal(doc.has('want to walk'), true, here + 'matches over the wrap')
  t.equal(doc.match('walk').has('#Imperative'), false, here + 'not tagged as a fragment')
  t.equal(doc.views[0].text(), 'I want to\nwalk the dog', here + 'keeps its line-break')
  t.equal(doc.match('to walk').text('normal'), 'to walk', here + 'normal form has a space')
  t.end()
})

test('new speakers are new sentences', function (t) {
  const doc = nlp.fromSubtitle(oneCue('-Hello there', '-Hi there'))
  t.deepEqual(doc.sentences().out('array'), ['-Hello there', '-Hi there'], here + 'dash')
  const arrows = nlp.fromSubtitle(oneCue('>> one thing', '>> another thing'))
  t.equal(arrows.sentences().length, 2, here + 'arrows')
  t.end()
})

test('broadcast speaker marks are not words', function (t) {
  const lines = ['>> What are you', 'wearing?', '>>> John left.']
  const doc = nlp.fromSubtitle(oneCue(...lines))
  t.equal(doc.terms().has('>>'), false, here + 'not a term')
  t.equal(doc.nouns().has('>>'), false, here + 'not a noun')
  t.equal(doc.match('^what').has('#QuestionWord'), true, here + 'tags the next word')
  t.equal(doc.match('john').has('#Person'), true, here + 'second speaker')
  t.equal(doc.toSubtitle(), vttpeg(oneCue(...lines)).out(), here + 'written back')
  // on its own or mid-line, there's nothing to tag instead
  const alone = oneCue('>>')
  t.equal(nlp.fromSubtitle(alone).toSubtitle(), vttpeg(alone).out(), here + 'alone')
  const mid = oneCue('one >> two')
  t.equal(nlp.fromSubtitle(mid).toSubtitle(), vttpeg(mid).out(), here + 'mid-line')
  t.end()
})

test('questions from a speaker are still questions', function (t) {
  const str = oneCue('-Did you want', 'some coffee?', '>> What are you wearing?')
  const doc = nlp.fromSubtitle(str)
  doc.verbs().toPastTense()
  t.deepEqual(
    vttpeg(doc.toSubtitle()).json()[0].text,
    ['-Did you want', 'some coffee?', '>> What were you wearing?'],
    here + 'past tense',
  )
  doc.verbs().toPresentTense()
  t.ok(doc.toSubtitle().includes('-Do you'), here + 'present tense')
  t.end()
})

test('changes are written to the file', function (t) {
  const doc = nlp.fromSubtitle(file)
  doc.match('walk').verbs().toPastTense()
  doc.match('john').replaceWith('Mary')
  doc.match('sighing').toUpperCase()
  const want = `WEBVTT

1
00:00:01.000 --> 00:00:03.000 line:90%
I walked to
the big store.

00:00:03.500 --> 00:00:05.000
-Who is here?
-This is a mirror ball suit.

00:00:05.500 --> 00:00:07.000
[SIGHING]

3
00:00:08.000 --> 00:00:10.000
Mary didn't buy
3 red apples &amp; pears.`
  t.equal(doc.toSubtitle(), want, here + 'whole file')
  t.equal(doc.match('mary').toSubtitle(), want, here + 'from a selection')
  t.equal(vttpeg(doc.toSubtitle()).lint({ silent: true }).length, 0, here + 'is valid')
  t.end()
})

test('options go to vttpeg', function (t) {
  const doc = nlp.fromSubtitle(file)
  t.ok(doc.toSubtitle({ showZeroHours: false }).includes('00:01.000 --> 00:03.000'), here + 'showZeroHours')
  t.end()
})

test('removing text keeps the file parseable', function (t) {
  const doc = nlp.fromSubtitle(file)
  // the last line of one cue, and all of the next
  doc.match('This is a mirror ball suit').remove()
  doc.views[2].all().remove()
  const res = vttpeg(doc.toSubtitle()).json()
  t.equal(res.length, 4, here + 'same cues')
  t.deepEqual(res[1].text, ['-Who is here?'], here + 'no blank line')
  t.deepEqual(res[2].text, [], here + 'emptied cue')
  t.equal(res[3].startTime, 8, here + 'next cue is safe')
  t.equal(vttpeg(doc.toSubtitle()).normalize().json().length, 3, here + 'vttpeg can remove it')

  // a blank line in the middle would end the cue
  const middle = nlp.fromSubtitle(oneCue('-one', '-two', '-three'))
  middle.match('two').post('\n\n')
  t.ok(middle.views[0].text().includes('\n\n'), here + 'has a blank line')
  t.deepEqual(vttpeg(middle.toSubtitle()).json()[0].text.at(-1), '-three', here + 'keeps the last line')
  t.end()
})

test('clones write their own text', function (t) {
  const doc = nlp.fromSubtitle(file)
  const copy = doc.clone()
  copy.match('john').replaceWith('Mary')
  t.ok(copy.toSubtitle().includes('Mary'), here + 'copy')
  t.equal(doc.toSubtitle(), vttpeg(file).out(), here + 'original')
  t.equal(copy.cues[3].startTime, 8, here + 'timing')
  t.end()
})

test('files with no cues', function (t) {
  ;['', 'WEBVTT', 'WEBVTT\n\nNOTE just a comment'].forEach(str => {
    const doc = nlp.fromSubtitle(str)
    t.equal(doc.found, false, here + 'not found')
    t.equal(doc.text(), '', here + 'no text')
    t.equal(doc.match('foo').found, false, here + 'still chainable')
    t.equal(doc.cues.length, 0, here + 'no cues')
    t.equal(doc.toSubtitle(), 'WEBVTT', here + 'empty file')
  })
  t.end()
})

test('cleaning up a file first, with vttpeg', function (t) {
  const str = oneCue('<i>John walked to</i>', 'the <b>big</b> store.')
  const doc = nlp.fromSubtitle(vttpeg(str).normalize().out())
  t.equal(doc.match('john').has('#Person'), true, here + 'finds the word')
  t.equal(doc.has('big store'), true, here + 'finds the phrase')
  t.equal(doc.views[0].text(), 'John walked to\nthe big store.', here + 'tags are gone')
  t.end()
})

test('not a subtitle file', function (t) {
  t.throws(() => nlp.fromSubtitle('just some text'), /WebVTT/, here + 'throws')
  t.end()
})
