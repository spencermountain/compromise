'use strict';
const Text = require('./text/text');

const nlp = function(str, context) {
  return new Text(str, context);
};

module.exports = nlp;


// console.log(nlp('John is cool. He swims').sentences[0].as('normal'));
// console.log(nlp('John is cool. He swims').to('Exclamation').to('Statement').as('text'));
// console.log(nlp('John is cool!!   He swims').as('normal'));
// let context = {
//   debug: true
// }
// nlp('John is cool. He is nice', context).to('Exclamation')
//
// import futureTense from 'someLibrary';
// nlp('john is cool').to(futureTense).as('normal');
//
// import hulkMode from 'hulkify';
// nlp('john is cool').to(hulkMode).as('html');
//
// nlp('john is cool').get(wordCount);
// nlp('john is cool').get(ngrams);
// nlp('john is cool').get('Nouns');

// nlp('winning').to('infinitive').as('normal');
// nlp('sunblock').to('plural').as('text');
// nlp('5 horses').get('plural').as('json');

// nlp('vacuum').to('Noun').get('article');
// 'a'
