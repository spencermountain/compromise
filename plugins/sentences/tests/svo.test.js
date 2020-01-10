const test = require('tape')
const nlp = require('./_lib')

test('svo parser', function(t) {
  let arr = [
    ['My dog loves pizza crusts.', 'my dog', 'loves'],
    ['My grey dog loves pizza crusts.', 'my grey dog', 'loves'],
    ['if i can recall, my grey dog loves pizza crusts.', 'my grey dog', 'loves'],

    ['I remember what you said yesterday.', 'i', 'remember'],
    ['I eat bananas in the kitchen.', 'i', 'eat'],
    ['I thought what she wore was so chic.', 'i', 'thought'],

    ['In the kitchen, I eat', 'i', 'eat'],
    // ['every day the kitten tries to eat the mouse', 'the kitten', 'tries to eat'],
    ['smoked poutine is delicious', 'smoked poutine', 'is'],
    // ["please tell me you'll address the issue", 'you', 'will address'],

    ['Every night before I go to bed, I eat bananas.', 'i', 'eat'],

    // ['The store that the boy robbed is on the corner.', 'the store', 'is'],
    [
      'Diane decided to plant tomatoes in the back of the yard, where the sun blazed the longest during the day.',
      'diane',
      'decided',
    ],
    ['Once Adam smashed the spider, he ran into the bathroom', 'he', 'ran into'],

    // ['The boy who you saw at the store committed a robbery.', 'the boy', 'committed'],
    // [
    //   'After dripping mustard all over his chest, the man who was wearing a red shirt wished that he had instead chosen ketchup for his hotdog.',
    //   'the man',
    //   'wished',
    // ],
  ]
  arr.forEach(a => {
    let doc = nlp(a[0])
    let obj = doc.sentences().json(0)
    t.equal(obj.subject.normal, a[1], 'subject: ' + a[1])
    t.equal(obj.verb.normal, a[2], 'verb: ' + a[2])
  })
  t.end()
})
