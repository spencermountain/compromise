import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/coreference] '

// https://github.com/google-research-datasets/gap-coreference
test('coreference:', function (t) {
  let arr = [
    // one-sentence
    [
      `spencer is not working because he is unemployed`,
      { he: `spencer` }
    ],
    // back-sentence
    [
      `spencer is quiet. he is not loud`,
      { he: `spencer` }
    ],
    // back-two-sentences
    [
      `spencer is quiet. I mean, not always, but usually. he is not loud`,
      { he: `spencer` }
    ],
    [
      "Spencer kelly forgot to update github. Maybe he should remember to",
      { he: `spencer kelly` }
    ],
    [
      "Lester B. Pearson founded Canada but despite being 6ft tall, he forgot to update github.",
      { he: `lester b. pearson` }
    ],
    [
      "i don't know why jack layton won his election, but he did.",
      { he: `jack layton`, his: 'jack layton' }
    ],
    [
      "you said kirk douglass won, and he'll fall asleep afterwards",
      { he: `kirk douglass` }
    ],
    // two pronouns
    [
      `i saw spencer kelly. he forgot his name`,
      { he: `spencer kelly`, his: 'spencer kelly' }
    ],
    // basic she
    [
      `Judy Dench is an American film director. She wrote, directed and starred in three films`,
      { she: `judy dench` }
    ],
    // ambiguous person names
    [
      `jamie smith said no and she left`,
      { she: `jamie smith` }
    ],
    // ambiguous person names
    [
      `jamie smith said no and he bailed out`,
      { he: `jamie smith` }
    ],
    [
      `nobody tell Josh's mom that she burned her toast.`,
      { she: `josh's mom`, her: `josh's mom` }
    ],
    // basic they
    [
      `Goaltenders often trick their opponents`,
      { their: `goaltenders` },
    ],
    [
      `they said i was losing my marbles`,
      {},
    ],
    [
      `the American people are using their money far better`,
      { their: 'the american people' },
    ],
    [
      `a medicine given to cows to increase their milk`,
      { their: 'cows' },
    ],
    [
      `every time someone gave me their dog`,
      { their: 'someone' },
    ],
    [
      `But we shouldn't put them and their children out on the street`,
      {},
    ],
    [
      `People go out of their way`,
      { their: 'people' },
    ],
    // [
    //   `give a precise scientific theory of the syntax rules of grammar and their function`,
    //   { their: 'the syntax rules' },
    // ],
    [
      `17 taxpayers would see their taxes rise`,
      { their: '17 taxpayers' },
    ],
    [
      `ensure that all African Americans could exercise their right`,
      { their: 'all african americans' },
    ],
    [
      `all states and school districts must turn around their worst performing schools`,
      { their: 'all states and school districts' },
    ],
    [
      `It will raise critical questions about the way we finance our campaigns and how lobbyists yield their influence.`,
      { their: 'lobbyists' },
    ],
    // [
    //   `the copy-holders had writings with their holdings.`,
    //   { their: 'the copy-holders' },
    // ],
    [
      `9 out of 10 people who have insurance get it through their employers`,
      { their: '9 out of 10 people' },
    ],
    // singular word as group
    // [
    //   `the committee gathered their delegates`,
    //   { their: 'the committee' },
    // ],
    [
      `the boys and girls studied their numbers`,
      { their: 'the boys and girls' },
    ],
    // [`Tornadoes are swirling clouds. They arrive during the summer`,
    //   { they: `Tornadoes` },
    // ],
    [
      `plumbers are funny. they never stop talking`,
      { they: `plumbers` }
    ],
    [
      `the viola player said no and she dropped her bow`,
      { she: `the viola player`, her: `the viola player` }
    ],

    // basic 'her'
    [
      `Sally arrived, but nobody saw her`,
      { her: `sally` }
    ],
    // basic it
    // [    //   `my toaster heated and it started smoking`,    //    { it: `my toaster` },    // ],
    // generic 'it'
    // [    //   `the plane took off. it was exciting.`,    //    {},    // ],
    // 'it' as verb.
    // [    //   ` If Sam buys a new bike, I will do it as well.`,    //    {  },    // ],

    // person-like
    [
      `the cowboy shot his gun and he walked away`,
      { his: `the cowboy`, he: `the cowboy` }
    ],
    [
      `spencer's aunt is fun. she is smart`,
      { she: `spencer's aunt` },
    ],
    [
      `the cheerleader did a flip but she landed awkwardly`,
      { she: `the cheerleader` }
    ],
    [
      `the boys play video games in their free time`,
      { their: 'the boys' }
    ],
    [
      `i walked to my school`,
      {}
    ],
    [
      `her opinion was that he missed`,
      {}
    ],
    [
      `her son brushed his teeth`,
      { his: 'her son' }
    ],
    [
      `somebody shaved their legs`,
      { their: 'somebody' }
    ],
    [
      `thom is the singer of his band`,
      { his: 'thom' }
    ],
    [
      `spencer likes john but not his brother`,
      { his: 'john' }
    ],
    [
      `i saw sara. spencer likes the captain but not her brother`,
      { her: 'the captain' }
    ],
    // double they
    // [    //   ` Gas prices are a top issue heading into the midterms. Polls show they’re high on voters’ minds`,    //    { they: 'Gas prices' },    // ],
    // anaphor-before
    // [   ` In their free time, the boys play video games`,    //    { their: 'the boys' },    // ],

  ]
  arr.forEach(a => {
    let [text, refs] = a
    let doc = nlp(text)
    let pronouns = doc.pronouns().hasReference()
    t.equal(Object.keys(refs).length, pronouns.length, here + `[count] '${text}'`)
    Object.keys(refs).forEach(k => {
      let m = pronouns.if(k).refersTo()
      t.equal(m.text('normal'), refs[k], here + ` [${k}] - ${refs[k]}`)
    })
  })
  t.end()
})
