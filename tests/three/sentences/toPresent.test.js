import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/sentence-toPresent] '

test('sentence-toPresent', function (t) {
  let arr = [

    [`And Venus Williams owned a ranch outside Green Valley;`, `And Venus Williams owns a ranch outside Green Valley;`],
    // [`I will be out in plenty of time for tomorrow's semi; I trust Uncle Charles.`, `I am out in plenty of time for tomorrow's semi; I trust Uncle Charles.`],
    [`I will play either Stice or Polep in Sunday's final.`, `I play either Stice or Polep in Sunday's final.`],
    // [`She said she would come.`, `She says she would come.`],
    // [`He sat and thought.`, `He sits and thinks.`],
    [`There was an insect on one of the shelves.`, `There is an insect on one of the shelves.`],
    [`The insect was dark and had a shiny case.`, `The insect is dark and has a shiny case.`],
    // [`It protruded, but it did not move.`, `It protrudes, but it does not move.`],
    // [`He tried to decide whether the woman was pretty.`, `He tries to decide whether the woman is pretty.`],
    [`This line of thinking almost caused him to become angry.`, `This line of thinking almost causes him to become angry.`],
    [`No part of the insect he'd seen was now visible.`, `No part of the insect he has seen is now visible.`],
    [`He didn't even know why he liked it anymore.`, `He does not even know why he likes it anymore.`],
    // [`But he would force himself to do it anyway.`, `But he forces himself to do it anyway.`],
    [`It was on the shelf that held his digital equalizer.`, `It is on the shelf that holds his digital equalizer.`],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0]).sentences()
    doc.toPresentTense()
    t.equal(doc.out(), a[1], here + '[toPresent] ' + a[0])
  })
  t.end()
})