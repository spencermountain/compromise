import test from 'tape'
import nlp from '../_lib.js'

test('conditional had requires an inverted clause', t => {
  for (const str of ['I had dinner cooked by six', 'she had the meals prepared', 'I had already cooked dinner']) {
    const had = nlp(str).match('had')
    t.equal(had.has('#Verb'), true, str + ' keeps verb')
    t.equal(had.has('#Condition'), false, str + ' not condition')
  }
  for (const str of ['had he survived, we would know', 'we would know, had he survived']) {
    t.equal(nlp(str).match('had').has('#Condition'), true, str + ' inverted condition')
  }
  t.end()
})

test('embedded demonstrative subjects and predicates', t => {
  for (const [str, subject, verb] of [
    ['I know that works', 'that', 'works'],
    ['I hope this helps', 'this', 'helps'],
    ['she thinks that works well', 'that', 'works'],
    ['we believe those look nice', 'those', 'look'],
  ]) {
    const doc = nlp(str)
    t.equal(doc.match(subject).has('#Pronoun'), true, str + ' subject')
    t.equal(doc.match(verb).has('#PresentTense'), true, str + ' predicate')
    t.equal(doc.match(verb).has('#Noun'), false, str + ' not noun')
  }
  const objects = nlp('I know those works')
  t.equal(objects.match('those').has('#Determiner'), true, 'plural object determiner')
  t.equal(objects.match('works').has('#Noun'), true, 'plural object noun')
  t.equal(nlp('I know that she works').match('that').has('#Conjunction'), true, 'embedded conjunction')
  t.equal(nlp('I hope this plan helps').match('this').has('#Determiner'), true, 'determined subject noun')
  t.end()
})

test('come coordinates ordinary and phrasal imperatives', t => {
  for (const [str, verb] of [
    ['come and sit down', 'sit'],
    ['come and turn off the light', 'turn'],
    ['come and eat', 'eat'],
    ['come eat', 'eat'],
  ]) {
    const doc = nlp(str)
    t.equal(doc.match('come').has('#Imperative'), true, str + ' come imperative')
    t.equal(doc.match(verb).has('#Imperative'), true, str + ' second imperative')
    if (doc.has('and')) {
      t.equal(doc.match('and').has('#Conjunction'), true, str + ' conjunction retained')
    }
  }
  const doc = nlp('come and sit down')
  t.equal(doc.match('sit').has('#PhrasalVerb'), true, 'phrasal verb retained')
  t.equal(doc.match('down').has('#Particle'), true, 'particle retained')
  t.equal(nlp('they come and sit down').has('#Imperative'), false, 'declarative unchanged')
  t.end()
})

test('polite request modifiers can precede please', t => {
  for (const str of ['could you not please leave?', 'could you please not leave?', 'would you quietly please leave?']) {
    const doc = nlp(str)
    t.equal(doc.match('#Imperative').text(), 'leave', str + ' action only')
    t.equal(doc.match('please').has('#Expression'), true, str + ' please retained')
    if (doc.has('not')) {
      t.equal(doc.match('not').has('#Negative'), true, str + ' negation retained')
    }
  }
  t.equal(nlp('could you not leave?').has('#Imperative'), false, 'no request marker')
  t.equal(nlp('could you quietly leave?').has('#Imperative'), false, 'adverb alone is not request marker')
  t.end()
})
