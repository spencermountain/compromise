import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/imperative] '

test('isImperative:', function (t) {
  const arr = [
    ['do speak', true],
    ['do not walk', true],
    ['please do not speak', true],
    ['go!', true],
    ['go home!', true],
    ['come home now.', true],
    ['we go home.', false],
    ['they come home now.', false],
    ['did you go home?', false],
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
    [`take a look at your dropsuit fittings.`, true],
    [`I'll sing the same old song, hear me call your name`, true],
    [`Use the ESRB rating system.`, true],
    [`Don’t help in avoiding situations.`, true],
    [`Open the Port Forwarding section.`, true],
    [`allow yourself to heal`, true],
    [`and then allow yourself a time`, true],
    // [`simply stop the music`, true],

    ["UPDATE: /u/Averyhonestguy has raised a very sobering point", false],
    ["Bike Share rolls out Pride themed bikes in New York", false],
    ["Like I don't need nobody else", false],
    ["Right after we broke up, my ex-girlfriend asked me how to change.", false],
    // ["C'mon, Luisa, you have a chance to be the bigger person here!", false],
    // ["Listen, calling people names says a lot more about you than it does about them, idiot.", true],
    ["Hook, line, and sinker", false],
    ["Brand new bags.", false],

    ["Know your flaws intimately.", true],
    ["Look for alternate avenues.", true],
    ["Speak to your child’s teacher and doctor.", true],
    ["Stick it in the microwave until it's Bill Withers", true],
    ["Continue playing until you are familiar with it.", true],
    ["Learn to recognize stress.", true],
    ["Treat your baby as you would any other child.", true],
    ["Find the root of each negative thought.", true],
    // ["Do quick and easy exercises at home.", true],
    // ["Determine whether you have the necessary qualities for the profession.", true],
    // ["Be sure to say goodbye to the interviewers before you leave.", true],
    // ["Make room for flexibility in your schedule.", true],
    // ["Reduce medications during less stressful periods.", true],
    // ["Focus on her qualities and accomplishments", true],
    ["Go into the cocoa hut in the mountains.", true],
    ["Find a leatherworker villager to trade with.", true],
    ["Develop a personal tagline.", true],
    ["Relax and take a deep breath before heading into the management job interview.", true],
    ["Apply to a doctoral program in industrial-organizational psychology.", true],
    ["Find a suitable location for your castle.", true],
    ["Find the positive side of life’s challenges.", true],
    ["Smell the gasoline and smoke", true],
    ["Go to a trip to the mall, and relax.", true],
    ["Tell her what the young boy gon do", true],
  ]
  arr.forEach(function (a) {
    const doc = nlp(a[0])
    const m = doc.verbs().isImperative()
    t.equal(m.found, a[1], `${here} ${a[0]}`)
  })
  t.end()
})

test('imperative keeps tense:', function (t) {
  const arr = [
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

test('imperative captures preserve surrounding tags', function (t) {
  const cases = [
    ['keep it quiet', 'keep', 'it', 'Pronoun'],
    ['stay away', 'stay', 'away', 'Adverb'],
    ['stay out of my garden', 'stay', 'out', 'Preposition'],
    ['go please', 'go', 'please', 'Expression'],
    ['stop please', 'stop', 'please', 'Expression'],
  ]
  cases.forEach(([str, verb, other, tag]) => {
    const doc = nlp(str)
    t.equal(doc.match('#Imperative').text(), verb, str + ' only the verb is imperative')
    t.equal(doc.match(other).has('#' + tag), true, str + ' preserves ' + tag)
    t.equal(doc.match(other).has('#Verb'), false, str + ' preserves non-verb')
  })
  t.end()
})

test('modal questions require an explicit request marker', function (t) {
  const questions = [
    'could you swim when you were young?',
    'would you know the answer?',
    'can you speak French?',
    'will you attend tomorrow?',
    'should you leave now?',
    'would you like a snack?',
  ]
  questions.forEach(str => {
    const doc = nlp(str)
    t.equal(doc.has('#Imperative'), false, str + ' is a question')
    t.equal(doc.has('#Infinitive'), true, str + ' keeps the verb')
  })
  const requests = [
    ['could you please open the door?', 'open'],
    ['can you please help?', 'help'],
    ['will you please stop?', 'stop'],
    ['would you please leave?', 'leave'],
    ['please could you open the door?', 'open'],
    ['could you open the door please?', 'open'],
    ['could you help please?', 'help'],
  ]
  requests.forEach(([str, verb]) => {
    const doc = nlp(str)
    t.equal(doc.match('#Imperative').text(), verb, str + ' tags the requested action')
    t.equal(doc.match('you').has('#Pronoun'), true, str + ' keeps pronoun')
    t.equal(doc.match('please').has('#Expression'), true, str + ' keeps request marker')
  })
  t.end()
})
