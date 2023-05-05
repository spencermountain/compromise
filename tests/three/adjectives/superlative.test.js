import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/adj-superlative] '

test('toSuperlative misc', function (t) {
  let doc = nlp('he is really cool')
  doc.adjectives().toSuperlative()
  t.equal(doc.text(), 'he is really coolest', here + 'really cool')

  doc = nlp('he is simply cooler')
  doc.adjectives().toSuperlative()
  t.equal(doc.text(), 'he is simply coolest', here + 'simply cooler')

  doc = nlp('he is simply the coolest')
  doc.adjectives().toSuperlative()
  t.equal(doc.text(), 'he is simply the coolest', here + 'simply coolest')

  t.end()
})


test('.toSuperlative():', function (t) {
  let arr = [
    ["great", "greatest"],
    ["low", "lowest"],
    ["near", "nearest"],
    ["big", "biggest"],
    ["strong", "strongest"],
    ["early", "earliest"],
    ["old", "oldest"],
    ["small", "smallest"],
    ["fast", "fastest"],
    ["bright", "brightest"],
    ["new", "newest"],
    ["bad", "worst"],
    ['inner', 'innermost'],
    ['outer', 'outermost'],
    ['far', 'furthest'],
    ['worse', 'worst'],
    ['bad', 'worst'],
    ["black", "blackest"],
    ["bland", "blandest"],
    ["blond", "blondest"],
    ["bloody", "bloodiest"],
    ["blue", "bluest"],
    ["stiff", "stiffest"],
    ["straight", "straightest"],
    ["sweet", "sweetest"],
    ["thick", "thickest"],
    ["tight", "tightest"],
    ['happy', 'happiest'],
    ['polite', 'politest'],
    ['tidy', 'tidiest'],
    ['prompt', 'promptest'],
    ['bright', 'brightest'],
    ['gentle', 'gentlest'],
    ['quick', 'quickest'],
    ['cheerful', 'cheerfullest'],
    ['kind', 'kindest'],
    ['sincere', 'sincerest'],
    ['brave', 'bravest'],
    ['pleasant', 'pleasantest'],
    // ['modest', 'modestest'],
    // ['fearless', 'fearlessest'],
    ['content', 'contentedst'],
    ['friendly', 'friendliest'],
    ['sincere', 'sincerest'],
    ['calm', 'calmest'],
    ['eager', 'eagerest'],
    ['witty', 'wittiest'],
    ['lively', 'liveliest'],
    ['secure', 'securest'],
    ['strong', 'strongest'],
    ['quick', 'quickest'],

  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.adjectives().toSuperlative()
    t.equal(doc.text(), a[1], here + a[0])
  })
  t.end()
})