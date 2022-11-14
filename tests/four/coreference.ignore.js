import test from 'tape'
import nlp from '../three/_lib.js'
const here = '[three/coreference] '

// https://github.com/google-research-datasets/gap-coreference
test('anaphor:', function (t) {
  let arr = [
    // one-sentence
    {
      text: `spencer is not working because he is unemployed`,
      refs: { he: `spencer` },
    },
    // back-sentence
    {
      text: `spencer is quiet. he is not loud`,
      refs: { he: `spencer` },
    },
    // back-two-sentences
    {
      text: `spencer is quiet. I mean, not always, but usually. he is not loud`,
      refs: { he: `spencer` },
    },
    // two pronouns
    {
      text: `i saw spencer kelly. he forgot his name`,
      refs: { he: `spencer kelly`, his: 'spencer kelly' },
    },
    // basic she
    {
      text: `Judy Dench is an American film director. She wrote, directed and starred in three films`,
      refs: { she: `Judy Dench` },
    },
    // basic it
    {
      text: `my toaster heated and it started smoking`,
      refs: { it: `my toaster` },
    },
    // basic they
    {
      text: `Tornadoes are swirling clouds, they arrive during the summer`,
      refs: { they: `Tornadoes` },
    },
    {
      text: `plumbers are funny. they never stop talking`,
      refs: { they: `plumbers` },
    },

    // basic 'her'
    // {
    //   text: `Sally arrived, but nobody saw her`,
    //   refs: { her: `sally` },
    // },
    // generic 'it'
    // {
    //   text: `the plane took off. it was exciting.`,
    //   refs: {},
    // },
    // 'it' as verb.
    // {
    //   text: ` If Sam buys a new bike, I will do it as well.`,
    //   refs: {  },
    // },

    // double they
    {
      text: ` Gas prices are a top issue heading into the midterms. Polls show they’re high on voters’ minds`,
      refs: { they: 'Gas prices' },
    },

    // person-like
    {
      text: `the cowboy shot his gun and he walked away`,
      refs: { his: `the cowboy`, he: `the cowboy` },
    },
    {
      text: `spencer's aunt is fun. she is smart`,
      refs: { she: `spencer's aunt` },
    },
    {
      text: `the cheerleader did a flip but she landed awkwardly`,
      refs: { she: `the cheerleader` },
    },
    // anaphor-before
    // {
    //   text: ` In their free time, the boys play video games`,
    //   refs: { their: 'the boys' },
    // },

  ]
  arr.forEach(obj => {
    let { text, refs } = obj
    let doc = nlp(text).compute('coreference')
    let pronouns = doc.pronouns()
    Object.keys(refs).forEach(k => {
      let m = pronouns.if(k).refersTo()
      t.equal(m.text(), refs[k], here + ` [${k}] - ${refs[k]}`)
    })
  })
  t.end()
})
