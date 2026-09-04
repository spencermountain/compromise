import test from 'tape'
import nlp from '../../two/_lib.js'
const here = '[one/sentence-split] '

test('sentence tokenizer', function (t) {
  const arr = [
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
    [`start 'the. one two. three' end`, 3], //dont support single-quotes
    [`“Yes!” said Tom. “No!” said Ann.`, 2],
    // mis-matched examples
    ['i thought "no way! and he said "yes way".', 2], //
    ['i thought (no way! and he said (yes)', 2], //
    ['i thought (no way! and he said yes', 2],
    ['(no way! and he said yes', 2],
    ['"no way! and he\'s cool', 2],
    // japanese
    ['少年は店に向かった。 彼はパンを買った', 2],
    // abbr with punctuation
    [`12 mg. tumeric`, 1],
    [`12 mg? tumeric`, 2],
    [`12 mg! tumeric`, 2],
  ]
  arr.forEach(a => {
    const [str, len] = a
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
  const doc = nlp('good night! 💋')
  t.equal(doc.length, 2, here + 'boemojith sentence')
  t.end()
})


test('newline-seperated sentence', function (t) {
  let one = `1

two

Three:`
  let doc = nlp(one)
  t.equal(doc.length, 3, here + 'first newline ')
  let two = `10/10/2025

two

Three:`
  doc = nlp(two)
  t.equal(doc.length, 3, here + 'second newline sentence')

  let three = `One

two

Three:`

  doc = nlp(three)
  t.equal(doc.length, 3, here + 'third newline sentence')
  let four = `
To the window, to the wall below.
_________________________________________________`
  doc = nlp(four)
  t.equal(doc.length, 1, here + 'underscore sentence')
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

test('cjk sentence-split', function (t) {
  const arr = [
    // no whitespace after 。
    ['今日は良い天気です。明日は雨が降るでしょう。', 2],
    // fullwidth ？ ！ and halfwidth ｡
    ['元気ですか？はい、元気です！', 2],
    ['元気ですか？ はい。', 2],
    ['本当？！すごい。', 2],
    ['ﾃｷｼﾞ｡ﾃｽﾄ｡', 2],
    // mixed with english
    ['東京に行きました。That was fun. 楽しかった。', 3],
    // 。」 inside a sentence
    ['彼は「行きません。」と言った。それで終わりだ。', 2],
    ['「はい。」「いいえ。」', 2],
    ['「はい。」 「いいえ。」', 2],
    ['「はい！すごい。」と言った。', 1],
    ['東京（日本の首都。人口が多い）は大きい。', 1],
    ['東京（日本の首都）は大きい。人口が多い。', 2],
    // not a sentence boundary
    ['そうですね…わかりました。', 1],
    ['ver 2.0。次。', 2],
    ['3.5 million。', 1],
    // newline, ideographic space
    ['一行目です。\n二行目です。', 2],
    ['今日は良い天気です。　明日は雨です。', 2],
    // chinese
    ['今天天气很好。明天会下雨。', 2],
    ['他说：“你好。”然后走了。', 1],
    // korean, and kanji with an ascii period
    ['안녕하세요. 만나서 반갑습니다.', 2],
    ['東京. 大阪.', 2],
  ]
  arr.forEach(a => {
    const [str, len] = a
    t.equal(nlp(str).length, len, here + `"${str}"`)
  })
  const doc = nlp('元気ですか？はい、元気です！')
  t.deepEqual(doc.sentences().out('array'), ['元気ですか？', 'はい、元気です！'], here + 'cjk sentence text')
  t.equal(doc.text(), '元気ですか？はい、元気です！', here + 'cjk roundtrip')
  t.end()
})
