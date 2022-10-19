import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/clauses] '

test('clauses-count', function (t) {
  let arr = [
    ['In fact, you are the most beautiful', 2],
    ['And this July, we will begin to bring our troops home.', 2],
    ['And keep ya cup, we drink whole bottles', 2],
    [`I think I'm gonna stay here.. I desperately need to pack`, 2],
    ['and if time and budget permits, make cute little thank-you bags for your friends.', 2],
    [`Located at the mouth of the Demerara River, it's the capital & largest city`, 2],
    [`For the most part, I really like this Starbucks.`, 2],
    [`I'm telling you, she gives the worst massages ever!!`, 2],
    [`Emily won't let Ross see Rachel, we're not gonna stop seeing Rachel, hence Ross stops seeing us!`, 3],
    [`More than anyone else in our society, they know the true difficulty`, 2],
    [`Dear ladies and gentlemen, im organising a trip to ily `, 2],
    [`According to some sources, his heart remained at Missolonghi.`, 2],
    [`After the 1979 electoral defeat of the Labour Party, she took over for Prime Minister James Callaghan`, 2],
    [`Robinsonade is not a refreshing drink, it's a novel similar in theme`, 2],
    [`this might be a convenient stop, I highly encourage you to take it`, 2],
    [`Thanks again to Lisa, she is the best!`, 2],
    [`Off he flew; and there he was`, 2],
    [`to cut spending, we're going to have to do more`, 2],
    [`Just look at them I mean, is it okay if they come visit?`, 2],
    // single
    [`Make sure you look clean, neat, and groomed at all times.`, 1],
    ['but, no thank you', 1],
    [`Use quinoa in any place you’d use lentils, corn, millet, rice, or pasta.`, 1],
    [`These are the steps I used.`, 1],
    [`actually, that's the shirt`, 1],
    [`we can help the world if Congress gives us the means `, 2],
    // [``, 2],
    // [``, 2],
    // [``, 2],

    // "Stances include regular, goofy foot & this one ",
    // "He got in touch with me last night and wants me to meet him today at 2 pm",
  ]
  arr.forEach(function (a) {
    const clauses = nlp(a[0]).clauses()
    t.equal(clauses.length, a[1], here + '[number of clauses] ' + a[0])
  })
  t.end()
})

test('clauses', function (t) {
  let arr = [
    // ['string', ['expected clauses', 'in an array']]
    ['fun, cool, etc...', ['fun, cool, etc...']],
    ['cool, and fun', ['cool, and fun']],
    ['one, two, and three', ['one, two, and three']],
    ['just one clause here!', ['just one clause here!']],
    ['if you must, go to the basement', ['if you must,', 'go to the basement']],
    ['an apple, washed and dried', ['an apple,', 'washed and dried']],
    ['one thing, at a time. and then another, right afterwards', ['one thing,', 'at a time.', 'and then another,', 'right afterwards']],
    ['oh and something else, too', ['oh and something else, too']],
    ['tuesday, march 2nd', ['tuesday, march 2nd']],
    ['toronto, canada', ['toronto, canada']],
    ['june 6, 1992', ['june 6, 1992']],
    // ['In fact, you are the most beautiful', ['in fact', 'you are the most beautiful']]
  ]
  arr.forEach(function (a) {
    const clauses = nlp(a[0]).clauses().out('array')
    t.equal(clauses.length, a[1].length, here + '[number of clauses] ' + a[0])
    t.deepEqual(clauses, a[1], here + '[clause content] ' + a[0])
  })
  t.end()
})