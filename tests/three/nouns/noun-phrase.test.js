import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/noun-phrase]'

//(from https://brenocon.com/JustesonKatz1995.pdf)
// AN: linear function; lexical ambiguity; mobile phase
// NN: regression coefficients; word sense; surface area
// AAN: Gaussian random variable; lexical conceptual paradigm; aqueous mobile
// phase
// ANN: cumulative distribution function; lexical ambiguity resolution; accessible
// surface area
// NAN: mean squared error; domain independent set; silica based packing
// NNN: class probability function; text analysis system; gradient elution chromatography
// NPN: degrees of freedom; [no example]; energy of adsorption

test('noun-phrases', function (t) {
  let arr = [
    ['he was a person of interest in the case', ['he', 'a person of interest', 'the case']],
    ['he was the mayor of chicago', ['he', 'the mayor of chicago']],
    ['he was the captain of the football team', ['he', 'the captain of the football team']],
    ['he was the Knight of the Round Table', ['he', 'the Knight of the Round Table']],
    ['i was in the pit of despair', ['i', 'the pit of despair']],
    ['she is a piece of work', ['she', 'a piece of work']],
    // ['business and desire', ['business']],
    // ['day and night', ['day']],
    ['i saw the central processing unit', ['i', 'the central processing unit']],
    ['most people built a binary tree', ['most people', 'a binary tree']],
    ['it had good air-flow', ['it', 'good air-flow']],
    ['it was good', ['it']],
    ['the 5-person chairlift', ['the 5-person chairlift']],
    ['he had the right of way', ['he', 'the right of way']],
    ['my retail bank sucks', ['my retail bank']],
    ["my activation code isn't working", ['my activation code']],
    ['my speech recognition system served us well', ['my speech recognition system', 'us']],
    ['a typical machine learning documentary film', ['a typical machine learning documentary film']],
    ['every cold war re-enactment is boring', ['every cold war re-enactment']],
    ['two slices of cranberry', ['two slices of cranberry']],
    // [`Japan 'Twitter killer' pleads guilty to murders`, ['Japan', `'Twitter killer''`, 'murders']],
    [`At Corky's carnival, this attraction uses the "human"`, ["Corky's carnival,", 'this attraction', 'the "human"']],
    [`a Gaussian random variable for determining true north`, ['a Gaussian random variable', 'true north']],
    [
      `the witty mathematics professor set the accessible surface area`,
      ['the witty mathematics professor', 'the accessible surface area'],
    ],
    [`the team of chearleaders drew closer`, ['the team of chearleaders']],
    [`nobody suspected that the mobile phone was working`, ['nobody', 'the mobile phone']],
    [
      `a slew of gadgets was sitting on the delicate table near the door`,
      ['a slew of gadgets', 'the delicate table near the door'],
    ],

    /*
    are we going to the premium one at two 
    you will read a page and want to shoot yourself
    check some benchmarks for c and java 
    As a result of this decision, the Nation reinstated the class
    heavy rains wash away stagnant pools 
    */
  ]
  arr.forEach(function (a) {
    const nouns = nlp(a[0]).nouns().out('array')
    t.deepEqual(nouns, a[1], here + a[0])
  })
  t.end()
})
