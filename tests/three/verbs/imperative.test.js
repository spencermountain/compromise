import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/imperative] '

test('isImperative:', function (t) {
  let arr = [
    ['do speak', true],
    ['do not walk', true],
    ['please do not speak', true],
    ['go!', true],
    ['go fast.', true],
    ["don't go", true],
    ['shut the door', true],
    ['eat your vegetables', true],
    // ['you should eat your vegetables', true],
    ['you eat?', false],
    ['do you eat?', false],
    ['i often use the stairs', false],
    ['i ate at the bar', false],
    ['walk the plank', true],
    ['turn down the music', true],
    ['is it over', false],
    // ['go to hell', false],
    ['save some for me please', true],
    ['stay real', true],
    ['stay the course', true],
    ['do help yourself', true],
    ['everybody sit down', true],
    ['stop', true],
    [`don't quit now`, true],
    [`let's leave`, true],
    [`come here right now`, true],
    ['stop please', true],
    ['stay out of my garden', true],
    ['return my hat', true],
    ['swim carefully', true],
    ['go backwards', true],
    ['walking is allowed', false],
    ['stay away from death mountain', true],
    ['never lie', true],
    ['keep it quiet', true],
    [`Eliminate unnecessary noises.`, true],
    [`Limit the amount of sugary foods that you eat.`, true],
    [`Restructure your thoughts about swimming.`, true],
    [`If you fall for the third time, tie your shoelaces already.`, true],
    [`Please don't forget this word, from the Greek for "oblivion"`, true],
    [`Taste the Italian roots of Todd English, who also owns Olives.`, true],
    [`Respect the rules and the spirit of the game `, true],
    [`Let's make it easier for these kids to have parents who love them.`, true],
    [`Add a cold local beer and it's a done deal.`, true],
    [`Be friendly, nice and interesting.  `, true],
    [`Get your foot off my contestant!`, true],
    [`Let me ask you some questions about, is it, uh, Marcel?`, true],
    [`Next, take a look at your dropsuit fittings.`, true],
    [`I'll sing the same old song, hear me call your name`, true],
    [`Use the ESRB rating system.`, true],
    [`Don’t help in avoiding situations.`, true],
    [`Open the Port Forwarding section.`, true],
    [`allow yourself to heal`, true],
    [`and then allow yourself a time`, true],
    // [`simply stop the music`, true],
  ]
  arr.forEach(function (a) {
    const doc = nlp(a[0])
    let m = doc.verbs().isImperative()
    t.equal(m.found, a[1], `${here} ${a[0]}`)
  })
  t.end()
})

test('imperative keeps tense:', function (t) {
  let arr = [
    'do speak',
    'do not walk',
    'please do not speak',
    'go!',
    "don't go",
    'shut the door',
    'eat your vegetables',
    // 'you should eat your vegetables',
  ]
  arr.forEach(function (str) {
    const doc = nlp(str)
    doc.verbs().toPastTense()
    t.equal(doc.text(), str, here + str + ' [toPast]')
  })
  t.end()
})
