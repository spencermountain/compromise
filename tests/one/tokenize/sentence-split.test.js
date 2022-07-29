import test from 'tape'
import nlp from '../../two/_lib.js'
const here = '[one/sentence-split] '


test('sentence tokenizer', function (t) {
  let arr = [
    [``, 0],
    [`1`, 1],
    [`&`, 1],
    [`oh yeah??`, 1],
    [`Sam Davis, Sr. (senior - the father)`, 1],
    [`C.S. Lewis in N.Y.C?!`, 1],
    [`1. Cherry tomatoes et al.`, 1],
    [`see J. R. R. Tolkien in Jan. at booking.com arena! wear warm socks.`, 2],
    [`Dr. Phil bid $5.00 on Jeopardy?`, 1],
    [`so... did you finish your phd.. or  B.A.?`, 1],
    [`Editing Inc. Alberta`, 1],
    [`W. Kensington`, 1],
    [`between 6 a.m. and 7 a.m.`, 1],
    [`Our Father which art in Heaven...\nsays the bible`, 2],
    [`Our Father which art in Heaven\nsays the bible`, 2],
    // parentheses
    // [`it fell out of the bag. (I wasn't fast enough.) Now it's on the floor.`, 3],
    [`the scent of basil (my favorite).`, 1],
    [`Your whole life (right? right?) might go smoothly this year.`, 1],
    [`before. (inside word) and (inside). after`, 3],
    [`before. (inside word?) and (inside!). after`, 3],
    [`before. (the whole thing is inside). after`, 3],
    // quotation wrapper
    [`the doc said "no sir" and walked away. the end`, 2],
    [`Kendal asked, “What time is it?”`, 1],
    [`he famously asks, “Are you talkin’ to me?” and responds`, 1],
    [`he famously asks, "you talkin’ to me? you talkin to me?" and responds`, 1],
    [`"You will be recruited to the Marines." said Prof. Turtle`, 1],
    [`the doc said "no sir. i will not beg" and walked away. the end`, 2],
    [`the novel is called "Guards! Guards!".`, 1],
    [`start "the. one two. three" end`, 1],
    [`start 'the. one two. three' end`, 3],//dont support single-quotes
    // mis-matched examples
    ['i thought "no way! and he said "yes way".', 2],//
    ['i thought (no way! and he said (yes)', 2],//
  ]
  arr.forEach(a => {
    let [str, len] = a
    t.equal(nlp(str).length, len, here + `"${str}"`)
  })
  t.end()
})

test('em-dash, en-dash', function (t) {
  // '-':  //dash
  // '–':  //en-dash
  // '—':  //em-dash
  let doc = nlp('fun-time')
  t.equal(doc.terms().length, 2, here + 'dash')
  doc = nlp('fun–time')
  t.equal(doc.terms().length, 2, here + 'en-dash')
  doc = nlp('fun—time')
  t.equal(doc.terms().length, 2, here + 'em-dash')

  //not a full word, either
  doc = nlp('fun - time')
  t.equal(doc.terms().length, 2, here + 'dash-word')
  doc = nlp('fun – time')
  t.equal(doc.terms().length, 2, here + 'en-dash-word')
  doc = nlp('fun — time')
  t.equal(doc.terms().length, 2, here + 'em-dash-word')

  //numeric forms are split, but contractions too
  doc = nlp('20-20')
  t.equal(doc.terms().length, 3, here + 'dash-num')
  doc = nlp('20–20')
  t.equal(doc.terms().length, 3, here + 'en-dash-num')
  doc = nlp('20—20')
  t.equal(doc.terms().length, 3, here + 'em-dash-num')

  doc = nlp('79-years-old')
  t.equal(doc.terms().length, 3, here + 'x-years-old')

  t.end()
})

test('emoji-only sentence', function (t) {
  let doc = nlp('good night! 💋')
  t.equal(doc.length, 2, here + 'boemojith sentence')
  t.end()
})

test('nested quotes', function (t) {
  let doc = nlp(`The hero was stunned by the scary monster. The glowing girl said "Hey! Leave him alone!".`)
  t.equal(doc.length, 2, here + 'nested quote sentence')

  doc = nlp(`foo bar. Before "quote here" and "quote here".`)
  t.equal(doc.length, 2, here + '2 quote sentence')

  doc = nlp(`foo bar. Before "quote here?" and "quote here?".`)
  t.equal(doc.length, 2, here + '2 quotes with sentence')

  doc = nlp(`Foo bar. Before "quote here? and quote here?". After`)
  t.equal(doc.length, 3, here + '1 quotes with 2 sentences')

  doc = nlp(`Foo bar. Before "quote here? and quote here? also here!". After`)
  t.equal(doc.length, 3, here + '1 quotes with 3 sentences')
  t.end()
})
