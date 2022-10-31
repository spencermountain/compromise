import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/anaphor] '

// https://github.com/google-research-datasets/gap-coreference
test('anaphor:', function (t) {
  let arr = [
    // basic he
    {
      text: `spencer is quiet. he is lame`,
      refs: { he: `spencer` },
    },
    // basic she
    {
      text: `Miranda July is an American film director. She wrote, directed and starred in three films`,
      refs: { she: `Miranda July` },
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

    // basic 'her'
    {
      text: `Sally arrived, but nobody saw her`,
      refs: { her: `sally` },
    },
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
      refs: { he: `the cowboy` },
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
    let doc = nlp(text).compute('anaphor')
    t.equal()
  })
  t.end()
})
