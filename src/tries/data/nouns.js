'use strict';
//most nouns do not nead to be listed
//for whatever reasons, these look like not-nouns
//so make sure they become nouns
const toPlural = require('../../result/subset/nouns/methods/pluralize');

let nouns = [
  //double-consonant rule
  'egg',
  'bottle',
  'cottage',
  'kitty',
  'doggy',

  'ad hominem',
  'banking',
  'body',
  'breakfast',
  'canary',
  'ceiling',
  'city',
  'credit card',
  'death',
  'dinner',
  'door',
  'economy',
  'energy',
  'event',
  'example',
  'fl oz',
  'friend',
  'funding',
  'glacier',
  'god',
  'grand slam',
  'head start',
  'home',
  'house',
  'lunch',
  'nothing',
  'number',
  'others',
  'part',
  'patent',
  'problem',
  'purpose',
  'room',
  'student',
  'stuff',
  'super bowl',
  'system',
  'tic',
  'there',
  'thing',
  'things',
  'tragedy',
  'us dollar'
];
let len = nouns.length;
for(let i = 0; i < len; i++) {
  nouns.push(toPlural(nouns[i]));
}
module.exports = nouns;
