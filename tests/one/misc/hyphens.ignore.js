import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/tokenize] '


// test('independence', function (t) {
//   let doc
//   doc = nlp(`The 2015–2016 fiscal year`)
//   t.equal(doc.has('2015'), true, here + '2015')
//   t.equal(doc.has('2016'), true, here + '2016')

//   doc = nlp(`the cable installation is 1:00–3:00pm.`)
//   t.equal(doc.has('1:00'), true, here + '1:00')
//   t.equal(doc.has('3:00pm'), true, here + '3:00pm')

//   doc = nlp(`pages 101–181 for tonight’s reading`)
//   t.equal(doc.has('101'), true, here + '101')
//   t.equal(doc.has('181'), true, here + '181')

//   doc = nlp(`The pro-choice movement`)
//   t.equal(doc.has('pro'), false, here + 'pro')
//   t.equal(doc.has('choice'), false, here + 'choice')
//   t.equal(doc.has('pro-choice'), true, here + 'pro-choice')
//   t.equal(doc.has('prochoice'), true, here + 'prochoice')

//   doc = nlp('any load-bearing walls ')
//   t.equal(doc.has('load'), true, here + 'load')
//   t.equal(doc.has('bearing'), true, here + 'bearing')
//   t.equal(doc.has('load-bearing walls'), true, here + 'load-bearing')

//   doc = nlp('a half-baked idea')
//   t.equal(doc.has('half'), true, here + 'half')
//   t.equal(doc.has('baked'), true, here + 'baked')
//   t.equal(doc.has('half-baked idea'), true, here + 'half-baked')
//   t.equal(doc.has('half baked idea'), true, here + 'half baked')

//   doc = nlp('re-do and reuse')
//   t.equal(doc.has('redo'), true, here + 're- one word')
//   t.equal(doc.has('re-do'), true, here + 're- dashed word')
//   t.equal(doc.has('re do'), true, here + 'two words')

//   doc = nlp('inter-species communication')
//   t.equal(doc.has('interspecies'), true, here + 'inter one word')
//   t.equal(doc.has('inter-species'), true, here + 'inter dashed word')
//   t.equal(doc.has('inter species'), true, here + 'inter two words')

//   // unsupported prefix
//   doc = nlp('the counter-argument')
//   t.equal(doc.has('counterargument'), true, here + 'counter one word')
//   t.equal(doc.has('counter-argument'), true, here + 'counter dashed word')
//   t.equal(doc.has('counter argument'), true, here + 'counter two words')

//   doc = nlp(`additional non-urgent appointment.`)
//   let m = doc.match(`additional non? urgent? appointment`)
//   t.equal(m.found, true, here + 'non-urgent')

//   t.end()
// })


test('match-dash', function (t) {
  let arr = [
    're-purpose',
    'co-opting',
    'mis-information',
    'proto-plasmic',
    'counter-argument',
    'soft-sell',
    'big-news',
    'do-over',
    'over-the-top',
    'larger-than-life',
    're-zoning-laws',
    'inter-sectional',
    'counter-argument',
    're-purpose itself',
    'full-enough tank',
    'the size-difference',
    'counter-balance',
    'score was 10-2',
    'Nobel Prize–winning',
    'take-down ',
    'the non-player-character',
    'load-bearing walls',
    'this clearly-impossible story',
    'beautiful-looking flowers ',
    'community-based education',
    'Mother-in-law',
    'Master-at-arms',
    'Editor-in-chief',
    'Ten-year-old',
    'Factory-made',
    'Twelve-pack',
    'fifty-six bottles',
    'a 10-minute speech',
    'self-serve',
    'non-sequitur'
  ]
  arr.forEach(str => {
    t.equal(nlp(str).has(str), true, here + '[dash] ' + str)
  })
  t.end()
})

