import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/noun-find] '

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

    [`spencer's friend is upset`, [`spencer's friend`]],

    // #Noun - #Pronoun
    [`he says sorry there is no gravy`, ['he', 'gravy']],
    [`The next time I met him`, ['The next time', 'I', 'him']],
    [`Next morning they went`, ['Next morning', 'they']],
    [`Huh, I would’ve thought it was the other way around.`, ['I', 'it', 'the other way around.']],
    [`I remember this semi truck coming towards me`, ['I', 'this semi truck', 'me']],
    [`As he recalled the misfortune he wept bitterly`, ['he', 'the misfortune', 'he']],
    [`The data we are receiving`, ['The data', 'we']],
    [`The next two folks I have seen`, ['The next two folks', 'I']],
    [`Every second word he swore`, ['Every second word', 'he']],
    [`your forgiveness I implore`, ['your forgiveness', 'I']],
    [`we commended him for his bravery`, ['we', 'him', 'his bravery']],
    ['because you are a client i can not ask', ['you', 'a client', 'i']],
    ['with the black suit i wore', ['the black suit', 'i']],
    // ['give them the best meal', ['them', 'the best meal']],
    // ['teach him five lessons', ['him', 'five lessons']],
    // #Noun in #Noun
    [`I told my wife I wanted breakfast in bed`, ['I', 'my wife', 'I', 'breakfast in bed']],
    ['everybody in the tavern', ['everybody in the tavern']],
    // ['he was a person of interest in the case', ['he', 'a person of interest', 'the case']],

    ['the service techs are friendly', ['the service techs']],
    [`piece of that Butterfinger I ate in january '07`, ['piece of that Butterfinger', 'I', "january '07"]],
    ['the noise the slide makes', ['the noise', 'the slide']],
    ['Had to lick his shoe', ['his shoe']],
    ['precisely to relieve the burden', ['the burden']],
    // [`are we going to the premium one at two `, ['we','the premium one','two']],
    // [`you will read a page and want to shoot yourself`, ['you', 'a page', 'yourself']],
    // [`check some benchmarks for c and java `, ['some benchmarks','c and java']],
    // [`As a result of this decision, the Nation reinstated the class`, []],
    [`heavy rains wash away stagnant pools `, ['heavy rains', 'stagnant pools']],
    // [`'My first play through of it'`,[]]
    [`They walked on through the night`, ['They', 'the night']],
    [`you have only the practice of friendship`, ['you', 'the practice of friendship']],
    [`we commended him for his bravery`, ['we', 'him', 'his bravery']],
    [`should give parents their power`, ['parents', 'their power']],
    [`Sweet is the scent`, ['the scent']],
    [`the surly captain of the basketball team`, ['the surly captain of the basketball team']],
    [`the nine captains of the new orleans basketball team`, ['the nine captains of the new orleans basketball team']],
    // [`the captain of the winning basketball team`, ['the captain of the winning basketball team']],
    // [`the unlikely captain of the largest international basketball team`, ['the unlikely captain of the largest international basketball team'],],
    [`are you here spencer?`, ['you', 'here', 'spencer?']],
    [`put it right there`, ['it', 'there']],
  ]
  arr.forEach(function (a) {
    const nouns = nlp(a[0]).nouns().out('array')
    t.deepEqual(nouns, a[1], here + a[0])
  })
  t.end()
})
