import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/adj-comparative] '

test('toComparative misc', function (t) {
  let doc = nlp('he is really cool')
  doc.adjectives().toComparative()
  t.equal(doc.text(), 'he is really cooler', here + 'really cool')

  doc = nlp('he is simply cooler')
  doc.adjectives().toComparative()
  t.equal(doc.text(), 'he is simply cooler', here + 'simply cooler')

  doc = nlp('he is simply the coolest')
  doc.adjectives().toComparative()
  t.equal(doc.text(), 'he is simply the cooler', here + 'simply coolest')

  t.end()
})


test('.toComparative():', function (t) {
  let arr = [
    ["high", "higher"],
    ["great", "greater"],
    ["further", "further"],
    ["good", "better"],
    ["low", "lower"],
    ["large", "larger"],
    ["small", "smaller"],
    ["old", "older"],
    ["broad", "broader"],
    ["strong", "stronger"],
    ["few", "fewer"],
    ["long", "longer"],
    ["easy", "easier"],
    ["early", "earlier"],
    ["lesser", "lesser"],
    ["wide", "wider"],
    ["young", "younger"],
    ["late", "later"],
    ["close", "closer"],
    ["short", "shorter"],
    ["fast", "faster"],
    ["slow", "slower"],
    ["clear", "clearer"],
    ["weak", "weaker"],
    ["safe", "safer"],
    ["new", "newer"],
    ["healthy", "healthier"],
    ["big", "bigger"],
    ["bad", "worse"],
    ["lame", "lamer"],
    ["large", "larger"],
    ["late", "later"],
    ["lewd", "lewder"],
    ["likely", "likelier"],
    ["little", "littler"],
    ["lively", "livelier"],
    ["lofty", "loftier"],
    ["soft", "softer"],
    ["steep", "steeper"],
    ["stiff", "stiffer"],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    doc.adjectives().toComparative()
    t.equal(doc.text(), a[1], here + a[0])
  })
  t.end()
})