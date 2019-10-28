const test = require('tape')
const nlp = require('./_lib')

test('svo parser', function(t) {
  let arr = [
    ['My dog loves pizza crusts.', 'my dog', 'loves'],
    ['I remember what you said yesterday.', 'i', 'remember'],
    ['I eat bananas in the kitchen.', 'i', 'eat'],
    ['I thought what she wore was so chic.', 'i', 'thought'],

    //
    ['In the kitchen, I eat.', 'i', 'eat'],
    ['Every night before I go to bed, I eat bananas.', 'i', 'eat'],

    ['The boy who you saw at the store committed a robbery.', 'the boy', 'committed'],
    ['The store that the boy robbed is on the corner.', 'the store', 'is'],
    [
      'After dripping mustard all over his chest, the man who was wearing a red shirt wished that he had instead chosen ketchup for his hotdog.',
      'the man',
      'wished',
    ],
    [
      'Diane decided to plant tomatoes in the back of the yard, where the sun blazed the longest during the day.',
      'Diane',
      'decided',
    ],
    ['Once Adam smashed the spider, he ran into the bathroom', 'he', 'ran'],
  ]

  t.end()
})
