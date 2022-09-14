import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/hyphens] '


test('independence', function (t) {
  let doc
  doc = nlp(`The 2015–2016 fiscal year`)
  t.equal(doc.has('2015'), true, here + '2015')
  t.equal(doc.has('2016'), true, here + '2016')
  t.equal(doc.has('20152016'), false, here + 'combined-year')

  doc = nlp(`the cable installation is 1:00–3:00pm.`)
  t.equal(doc.has('1:00'), true, here + '1:00')
  t.equal(doc.has('3:00pm'), true, here + '3:00pm')

  doc = nlp(`pages 101–181 for tonight’s reading`)
  t.equal(doc.has('101'), true, here + '101')
  t.equal(doc.has('181'), true, here + '181')
  t.equal(doc.has('181181'), false, here + 'combined-number')

  doc = nlp(`The pro-choice movement`)
  t.equal(doc.has('pro'), true, here + 'pro')
  t.equal(doc.has('choice'), true, here + 'choice')
  t.equal(doc.has('pro-choice'), true, here + 'pro-choice')
  t.equal(doc.has('prochoice'), true, here + 'prochoice')
  t.equal(doc.has('the pro movement'), false, here + 'pro movement')

  doc = nlp('any load-bearing walls ')
  t.equal(doc.has('load'), true, here + 'load')
  t.equal(doc.has('bearing'), true, here + 'bearing')
  t.equal(doc.has('load-bearing walls'), true, here + 'load-bearing')
  // t.equal(doc.has('loadbearing'), true, here + 'loadbearing')
  // t.equal(doc.has('loadbearing walls'), true, here + 'loadbearing walls')
  t.equal(doc.has('load walls'), false, here + 'load walls')

  doc = nlp('a half-baked idea')
  t.equal(doc.has('half'), true, here + 'half')
  t.equal(doc.has('baked'), true, here + 'baked')
  t.equal(doc.has('half-baked idea'), true, here + 'half-baked')
  t.equal(doc.has('half baked idea'), true, here + 'half baked')

  doc = nlp('re-do and reuse')
  t.equal(doc.has('redo'), true, here + 're- one word')
  t.equal(doc.has('re-do'), true, here + 're- dashed word')
  t.equal(doc.has('re do'), true, here + 'two words')
  t.equal(doc.has('re and'), false, here + 're and')

  doc = nlp('inter-species communication')
  t.equal(doc.has('interspecies'), true, here + 'inter one word')
  t.equal(doc.has('inter-species'), true, here + 'inter dashed word')
  t.equal(doc.has('inter species'), true, here + 'inter two words')
  t.equal(doc.has('interspecies communication'), true, here + 'interspecies communication')
  t.equal(doc.has('inter communication'), false, here + 'inter communication')

  // unsupported prefix
  doc = nlp('the counter-argument')
  // t.equal(doc.has('counterargument'), true, here + 'counter one word')
  t.equal(doc.has('counter-argument'), true, here + 'counter dashed word')
  t.equal(doc.has('counter argument'), true, here + 'counter two words')

  doc = nlp(`additional non-urgent appointment.`)
  let m = doc.match(`additional non? urgent? appointment`)
  t.equal(m.found, true, here + 'non-urgent')
  t.equal(doc.has('additional non'), true, here + 'additional non')
  // t.equal(doc.has('additional nonurgent'), true, here + 'additional nonurgent')
  t.equal(doc.has('additional non-urgent'), true, here + 'additional non-urgent')
  t.equal(doc.has('additional urgent'), false, here + 'additional urgent')
  t.equal(doc.has('additional appointment'), false, here + 'additional appointment')

  t.end()
})


