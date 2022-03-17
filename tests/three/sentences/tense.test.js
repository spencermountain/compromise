import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/sentence-conjugate] '

test('sentence-change-tense:', function (t) {
  let arr = [
    ['john walks quickly', 'john walked quickly', 'john will walk quickly'],
    ['he is quick', 'he was quick', 'he will be quick'],
    ['the stool falls over', 'the stool fell over', 'the stool will fall over'],
    ['i usually take the stairs', 'i usually took the stairs', 'i usually will take the stairs'],
    ['i usually use the stairs', 'i usually used the stairs', 'i usually will use the stairs'],
    ['he finishes first', 'he finished first', 'he will finish first'],
    ['our house looks great', 'our house looked great', 'our house will look great'],
    [
      'temptation is a desire to engage',
      'temptation was a desire to engage',
      'temptation will be a desire to engage',
    ],
    // [`the vision appears and starts to walk and sing`, `the vision appeared and started to walk and sing`, `the vision will appear and start to walk and sing`],
    // [
    //   'Capital punishment, also known as the death penalty, is the state-sanctioned killing of a person as punishment for a crime.',
    //   'Capital punishment, also known as the death penalty, was the state-sanctioned killing of a person as punishment for a crime.',
    //   'Capital punishment, also known as the death penalty, will be the state-sanctioned killing of a person as punishment for a crime.',
    // ],
    // [
    //   `A greeting is an act of communication in which human beings intentionally make their presence known`,
    //   `A greeting was an act of communication in which human beings intentionally made their presence known`,
    //   `A greeting will be an act of communication in which human beings intentionally make their presence known`,
    // ],
    // [
    //   'Pigeonholing is a process that attempts to classify disparate entities',
    //   'Pigeonholing was a process that attempted to classify disparate entities',
    //   'Pigeonholing will be a process that attempts to classify disparate entities',
    // ],
    // [
    //   `Breathing is the process of moving air into and out of the lungs to facilitate gas exchange with the internal environment`,
    //   `Breathing was the process of moving air into and out of the lungs to facilitate gas exchange with the internal environment`,
    //   `Breathing will be the process of moving air into and out of the lungs to facilitate gas exchange with the internal environment`,
    // ],
    // [
    //   `A shoehorn or shoe horn is a tool with a short handle that flares into a longer spoon-like head`,
    //   `A shoehorn or shoe horn was a tool with a short handle that flared into a longer spoon-like head`,
    //   `A shoehorn or shoe horn will be a tool with a short handle that flares into a longer spoon-like head`,
    // ],
    // [
    //   `A hinge is a mechanical bearing that connects two solid objects, typically allowing only a limited angle of rotation between them.`,
    //   `A hinge was a mechanical bearing that connected two solid objects, typically allowing only a limited angle of rotation between them.`,
    //   `A hinge will be a mechanical bearing that connects two solid objects, typically allowing only a limited angle of rotation between them.`,
    // ],
    [
      `Sugaring is a food preservation method similar to pickling.`,
      `Sugaring was a food preservation method similar to pickling.`,
      `Sugaring will be a food preservation method similar to pickling.`,
    ],
    // [
    //   `Sugaring is the process of desiccating a food by first dehydrating it, then packing it with pure sugar.`,
    //   `Sugaring was the process of desiccating a food by first dehydrating it, then packing it with pure sugar.`,
    //   `Sugaring will be the process of desiccating a food by first dehydrating it, then packing it with pure sugar.`,
    // ],
    // [
    //   `A Bank is a financial institution that accepts deposits from the public and creates a demand deposit while simultaneously making loans.`,
    //   `A Bank was a financial institution that accepted deposits from the public and created a demand deposit while simultaneously making loans.`,
    //   `A Bank will be a financial institution that accepts deposits from the public and creates a demand deposit while simultaneously making loans.`,
    // ],
    // [
    //   `Checkmate is a game position in chess in which a player's king is in check and there is no way to avoid the threat.`,
    //   `Checkmate was a game position in chess in which a player's king was in check and there was no way to avoid the threat.`,
    //   `Checkmate will be a game position in chess in which a player's king will be in check and there will be no way to avoid the threat.`,
    // ],
    //infinitives
    // [
    //   'he does what he can to stop',
    //   'he did what he could to stop',
    //   'he will do what he can to stop',
    // ],
    ['goes to sleep', 'went to sleep', 'will go to sleep'],

    //passive
    // ['cardboard is made of tree fibre', 'cardboard was made of tree fibre', 'cardboard will be made of tree fibre'],

    //grammatical-number
    // ['we do what we can to stop', 'we did what we could to stop', 'we will do what we can to stop'],

    //multi-sentence
    [
      'this is one sentence. This makes two now.',
      'this was one sentence. This made two now.',
      'this will be one sentence. This will make two now.',
    ],

    //support negative
    // ['this isn\'t one sentence. This doesn\'t make two now.', 'this was not one sentence. This didn\'t make two now.', 'this won\'t be one sentence. This won\'t make two now.']
  ]
  arr.forEach(function (a) {
    let doc = nlp(a[0])

    doc.sentences().toPastTense()
    let str = doc.out('text')
    t.equal(str, a[1], here + '[pres->pastTense] ' + str)

    doc.sentences().toFutureTense()
    str = doc.out('text')
    t.equal(str, a[2], here + '[past->future] ' + str)

    doc.sentences().toPresentTense()
    str = doc.out('text')
    t.equal(str, a[0], here + '[future->present] ' + str)
  })
  t.end()
})

