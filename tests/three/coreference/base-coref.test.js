import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/coreference] '

// https://github.com/google-research-datasets/gap-coreference
test('basic-coreference:', function (t) {
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

    // single-sentence misc
    [
      "I was looking at black crows go by and right after they went by, a good 100+ more crows flew by",
      {
        "they": "black crows"
      }
    ],

    [
      "As its Valentines Day, the missus has said she'll go on top tonight for a change.",
      {
        "she'll": "the missus"
      }
    ],
    [
      "You must really like... Joey... to go to all that trouble for him.",
      {
        "him": "joey"
      }
    ],
    [
      "When the children saw they were left alone.",
      {
        "they": "the children"
      }
    ],
    [
      "One mother of two, a woman named Kathy Proctor, had worked in the furniture industry since she was 18 years old.",
      {
        "she": "kathy proctor"
      }
    ],
    [
      "We've got to do something to empower people to improve their skills.",
      {
        "their": "people"
      }
    ],
    [
      "Hey Mon, that was really nice of you to loan Rachel your car so she could  go and get the cake.",
      {
        "she": "rachel"
      }
    ],
    [
      "Sweet justice: after the doc pulled the gigantic beetle out of my ear, my mom asked if she could have it.",
      {
        "she": "my mom"
      }
    ],
    [
      "Elaine Kinslow and all those like her are the real heroes of the welfare revolution.",
      {
        "her": "elaine kinslow"
      }
    ],
    [
      "Contrary to public opinion, most people want to work to get their income.",
      {
        "their": "most people"
      }
    ],
    [
      "The giants were terrified at the apparition, and, fearful lest he should slay them, they all took to their heels",
      {
        "they": "the giants",
        "their": "the giants"
      }
    ],
    [
      "Mrs and 3 of her pals squeezed into my car after weight watchers.",
      {
        "her": "mrs"
      }
    ],
    [
      "One time I heard this woman to the right of me complaining how spicy her curry was.",
      {
        "her": "this woman"
      }
    ],
    [
      "When people put their party's fortunes, whatever the party, whatever side of this aisle, before the public good, they court defeat not only for their country but for themselves.",
      {
        "their": "people",
        "they": "people"
      }
    ],

    [
      "Social Security now offers workers a return of less than 2 percent on the money they pay into the system.",
      {
        "they": "workers"
      }
    ],
    [
      "There's a scene where Drake sneaks into Olivia's bedroom, and she doesn't know he's there - which never happened with us!",
      {
        "she": "olivia's"
      }
    ],
    [
      "If you are going to send someone to save the world, make sure they like it the way it is.",
      {
        "they": "someone"
      }
    ],
    [
      "The Queen was so confused that at first she did not notice another little door in the orange tree, but presently it opened and she found herself in a field of thistles and nettles.",
      {
        "she": "the queen"
      }
    ],
    [
      "Gandhi moved his headquarters to Nadiad, organising scores of supporters and fresh volunteers",
      {
        "his": "gandhi"
      }
    ],
    [
      "In a moment Prince Ricardo's foot was on the blade of the diamond sword, which he passed thrice through the body of the Yellow Dwarf.",
      {
        "he": "prince ricardo's"
      }
    ],

    [
      "The Princess was very sorry, but as Grabugeon was really dead, she allowed the Captain of the Guard to take her tongue; but, alas!",
      {
        "she": "the princess",
        "her": "the princess"
      }
    ],
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
