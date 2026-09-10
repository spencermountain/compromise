import test from 'tape'
import nlp from '../_lib.js'
const here = '[one/unicode] '

test('many-unicode', function (t) {
  const str = `✐✠✰❀❐❞❰➀➐➠➰✁✑✡✱❁❑❡❱➁➑➡➱✂✒✢✲❂❒❢❲➂➒➢➲✃✓✣✳❃❓❣❳➃➓➣➳✄✔✤✴❄❔❤❴➄➔➤➴✅✕✥✵❅❕❥❵➅➕➥➵✆✖✦✶❆❖❦❶➆➖➦➶✇✗✧✷❇❗❧❷➇➗➧➷✈✘✨✸❈❘❨❸➈➘➨➸✉✙✩✹❉❙❩❹➉➙➩➹✊✚✪✺❊❚❪❺➊➚➪➺✋✛✫✻❋❛❫❻➋➛➫➻✌✜✬✼❌❜❬❼➌➜➬➼✍✝✭✽❍❝❭❽➍➝➭➽✎✞✮✾❎❞❮❾➎➞➮➾✏✟✯✿❏❜❯❿➏➟➯➿😀😐😠😰🙀😁😑😡😱🙁😂😒😢😲🙂😃😓😣😳🙃😄😔😤😴🙄😅😕😥😵🙅😆😖😦😶🙆😇😗😧😷🙇😈😘😨😸🙈😉😙😩😹🙉😊😚😪😺🙊😋😛😫😻🙋😌😜😬😼🙌😍😝😭😽🙍😎😞😮😾🙎😏😟😯😿🙏,&、*.+-;<:>?=!—\($)%{@}〔〕₠₰₡₱₢₲₣₳₤₴₥₵₦₶₧₷₸₩₹₪₺₫₻€₼₭₽₮₾₯₿` // eslint-dis
  const doc = nlp(str)
  t.equal(doc.text(), str, here + 'identical-text')
  t.equal(doc.length, 1, here + 'one-sentence')
  t.equal(doc.terms().length, 1, here + 'one-term')
  t.end()
})

test('em-dashes', function (t) {
  const str = 'text—text'
  const doc = nlp(str)
  t.equal(doc.text() === str, true, here + 'emdash')
  t.end()
})

// this section is very cursed
test('zero-width-chars', function (t) {
  //this has a zero-width character
  const str = `before​ after`
  const doc = nlp(str)
  t.equal(doc.text(), str, here + 'zero-width passes-through')
  const json = doc.json({ terms: { normal: true } })
  const before = json[0].terms[0]
  t.equal(before.normal, 'before', here + 'normalized-out in json')
  t.equal(before.post, ' ', here + 'normal whitespace in json')
  t.ok(doc.text() !== 'before after', here + 'default text has 0-width-char')
  t.equal(doc.text('normal'), 'before after', here + 'normal text removes 0-width-char')
  t.equal(doc.text('clean'), 'before after', here + 'clean text removes 0-width-char')
  t.equal(doc.text('reduced'), 'before after', here + 'reduced text removes 0-width-char')
  t.equal(doc.text('root'), 'before after', here + 'root text removes 0-width-char')
  t.end()
})

test('fullwidth-ascii', function (t) {
  t.equal(nlp('ＡＢＣ').has('abc'), true, here + 'fullwidth match')
  t.equal(nlp('Ｈｅｌｌｏ ２０２４').out('normal'), 'hello 2024', here + 'fullwidth normal')
  t.equal(nlp('Ｈｅｌｌｏ ２０２４').text(), 'Ｈｅｌｌｏ ２０２４', here + 'fullwidth text unchanged')
  t.end()
})
