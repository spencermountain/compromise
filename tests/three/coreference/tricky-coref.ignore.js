import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/coreference] '

// https://github.com/google-research-datasets/gap-coreference
test('coreference:', function (t) {
  let arr = [

    // double they
    // [    //   ` Gas prices are a top issue heading into the midterms. Polls show they’re high on voters’ minds`,    //    { they: 'Gas prices' },    // ],
    // anaphor-before
    // [   ` In their free time, the boys play video games`,    //    { their: 'the boys' },    // ],


    // tricky:

    // [
    //   "The queen, who did not believe in Firedrakes, alone took his side.",
    //   {
    //     "his": "the queen"
    //   }
    // ],
    // [
    //   "In his 1811 will, Byron requested that he be buried with him.",
    //   {
    //     "he": "byron",
    //     "him": "byron"
    //   }
    // ],
    [
      "In 2010 she got engaged to a choreographer she met on the set of \"Black Swan\"",
      {
        "she": "a choreographer"
      }
    ],
    [
      "And let's close the loopholes that lead to inequality by allowing the top one percent to avoid paying taxes on their accumulated wealth.",
      {
        "their": "the top one percent"
      }
    ],

    [
      "The Sultan asked her kindly what she had in the napkin, whereupon she unfolded the jewels and presented them.",
      {}
    ],

    [
      "Then the magician went back and told to the Sultan his story.",
      {
        "his": "the magician",
      }
    ],

    [
      "This now takes 15 days, but they give you a piece of paper to use as ID in the interim.",
      {

      }
    ],
    [
      "When his twentieth birthday was passed the Queen thought it was time that he should be married, so she commanded that the portraits of several princesses should be brought for him to see",
      {
        "she": "the queen",
      }
    ],

    [
      "His mother wrote, \"He has no indisposition that I know of but love, desperate love, the worst of all maladies in my opinion.",
      {
      }
    ],
    [
      "To ensure these plants set seed, biologists rappel down 3000 foot cliffs to brush pollen onto their stigmas.",
      {
        "their": "these plants"
      }
    ],
    [
      "Byron was a bitter opponent of Lord Elgin's removal of the Parthenon marbles from Greece and \"reacted with fury\" when Elgin's agent gave him a tour of the Parthenon, during which he saw the spaces left by the missing friezes and metopes.",
      {
        "him": "Byron",
        "he": "Byron"
      }
    ],
    [
      "The Grand Vizier and the lords of council had just gone in as she entered the hall and placed herself in front of the Sultan.",
      {
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
