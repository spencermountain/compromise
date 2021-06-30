const test = require('tape')
const nlp = require('./_lib')

test('many-unicode', function (t) {
  let str = `✐✠✰❀❐❞❰➀➐➠➰✁✑✡✱❁❑❡❱➁➑➡➱✂✒✢✲❂❒❢❲➂➒➢➲✃✓✣✳❃❓❣❳➃➓➣➳✄✔✤✴❄❔❤❴➄➔➤➴✅✕✥✵❅❕❥❵➅➕➥➵✆✖✦✶❆❖❦❶➆➖➦➶✇✗✧✷❇❗❧❷➇➗➧➷✈✘✨✸❈❘❨❸➈➘➨➸✉✙✩✹❉❙❩❹➉➙➩➹✊✚✪✺❊❚❪❺➊➚➪➺✋✛✫✻❋❛❫❻➋➛➫➻✌✜✬✼❌❜❬❼➌➜➬➼✍✝✭✽❍❝❭❽➍➝➭➽✎✞✮✾❎❞❮❾➎➞➮➾✏✟✯✿❏❜❯❿➏➟➯➿😀😐😠😰🙀😁😑😡😱🙁😂😒😢😲🙂😃😓😣😳🙃😄😔😤😴🙄😅😕😥😵🙅😆😖😦😶🙆😇😗😧😷🙇😈😘😨😸🙈😉😙😩😹🙉😊😚😪😺🙊😋😛😫😻🙋😌😜😬😼🙌😍😝😭😽🙍😎😞😮😾🙎😏😟😯😿🙏,&、*.+-;<:>?=!—\($)%{@}〔〕₠₰₡₱₢₲₣₳₤₴₥₵₦₶₧₷₸₩₹₪₺₫₻€₼₭₽₮₾₯₿`
  let doc = nlp(str)
  t.equal(doc.text(), str, 'identical-text')
  t.equal(doc.length, 1, 'one-sentence')
  t.equal(doc.terms().length, 1, 'one-term')
  t.end()
})

test('em-dashes', function (t) {
  let str = 'text—text'
  let doc = nlp(str)
  t.equal(doc.text() === str, true, 'emdash')
  t.end()
})

// this section is very cursed
test('zero-width-chars', function (t) {
  let str = `before​ after` //this has a zero-width character
  let doc = nlp(str)
  t.equal(doc.text(), str, 'zero-width passes-through')
  let json = doc.json({ terms: { normal: true } })
  let before = json[0].terms[0]
  t.equal(before.normal, 'before', 'normalized-out in json')
  t.equal(before.post, ' ', 'normal whitespace in json')
  t.ok(doc.text() !== 'before after', 'default text has 0-width-char')
  t.equal(doc.text('normal'), 'before after', 'normal text removes 0-width-char')
  t.equal(doc.text('clean'), 'before after', 'clean text removes 0-width-char')
  t.equal(doc.text('reduced'), 'before after', 'reduced text removes 0-width-char')
  t.equal(doc.text('root'), 'before after', 'root text removes 0-width-char')
  t.end()
})
