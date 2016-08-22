'use strict';

const misc = {
  'here': 'Adjective',
  'better': 'Comparative',
  'earlier': 'Superlative',
  'make sure': 'Verb',
  'keep tabs': 'Verb',
  'has': 'Verb',
  'sounds': 'PresentTense',
  //special case for took/taken
  'taken': 'PastTense',
  'msg': 'Verb', //slang
  'a few': 'Value', //different than 'few people'
  'years old': 'Unit', //special case
  'not': 'Negative'
};

const compact = {
  Adjective: [
    'so called', //?
    'on board',
    'vice versa',
    'en route',
    'upside down',
    'up front',
    'in front',
    'in situ',
    'in vitro',
    'ad hoc',
    'de facto',
    'ad infinitum',
    'for keeps',
    'a priori',
    'off guard',
    'spot on',
    'ipso facto',
    'fed up',
    'brand new',
    'old fashioned',
    'bona fide',
    'well off',
    'far off',
    'straight forward',
    'hard up',
    'sui generis',
    'en suite',
    'avant garde',
    'sans serif',
    'gung ho',
    'super duper'
  ],

  Place: [
    'new england',
    'new hampshire',
    'new jersey',
    'new mexico',
    'united states',
    'united kingdom',
    'great britain'
  ],
  //conjunctions
  'Conjunction': [
    'yet',
    'therefore',
    'or',
    'while',
    'nor',
    'whether',
    'though',
    'because',
    'cuz',
    'but',
    'for',
    'and',
    'however',
    'before',
    'although',
    'how',
    'plus',
    'versus',
  // 'not'
  ],
  Date: [
    //date
    'noon',
    'midnight',
    'now',
    'morning',
    'evening',
    'afternoon',
    'ago',
    'sometime',
    //end of day, end of month
    'eod',
    'eom',
    'standard time',
    'daylight time',
    'summer time'
  ],
  'Condition': [
    'if',
    'unless',
    'otherwise',
    'notwithstanding'
  ],

  'PastTense': [
    'said',
    'had',
    'been',
    'began',
    'came',
    'did',
    'meant',
    'went'
  ],

  'Verb': [
    'given',
    'known',
    'shown',
    'seen',
    'born'
  ],

  'Gerund': [
    'going',
    'being',
    'according',
    'resulting',
    'developing',
    'staining'
  ],

  'Copula': [
    'is',
    'will be',
    'are',
    'was',
    'were',
    'am',
    'isn\'t',
    'ain\'t',
    'aren\'t'
  ],

  //determiners
  'Determiner': require('./determiners'),

  //prepositions
  'Preposition': require('./prepositions'),

  //modal verbs
  'Modal': [
    'can',
    'may',
    'could',
    'might',
    'will',
    'ought to',
    'would',
    'must',
    'shall',
    'should',
    'ought',
    'shant',
    'lets', //arguable
  ],

  //Possessive pronouns
  'Possessive': [
    'mine',
    'something',
    'none',
    'anything',
    'anyone',
    'theirs',
    'himself',
    'ours',
    'his',
    'my',
    'their',
    'yours',
    'your',
    'our',
    'its',
    'herself',
    'hers',
    'themselves',
    'myself',
    'itself',
    'her', //this one is pretty ambiguous
  ],

  //personal pronouns (nouns)
  'Pronoun': [
    'it',
    'they',
    'i',
    'them',
    'you',
    'she',
    'me',
    'he',
    'him',
    'ourselves',
    'us',
    'we',
    'thou',
    'il',
    'elle',
    'yourself',
    '\'em',
    'he\'s',
    'she\'s'
  ],
  //questions are awkward pos. are clarified in question_pass
  'QuestionWord': [
    'where',
    'why',
    'when',
    'who',
    'whom',
    'whose',
    'what',
    'which'
  ],
  //some manual adverbs (the rest are generated)
  'Adverb': require('./adverbs'),

  //interjections, expressions
  'Expression': require('./expressions'),

  //special nouns that shouldnt be seen as a verb
  'Noun': [
    'nothing',
    'everything',
    'god',
    'student',
    'patent',
    'funding',
    'banking',
    'ceiling',
    'energy',
    'purpose',
    'friend',
    'event',
    'room',
    'door',
    'thing',
    'things',
    'stuff',
    'lunch',
    'breakfast',
    'dinner',
    'home',
    'problem',
    'body',
    'world',
    'city',
    'death',
    'others',
    'there',
    'number',
    'system',
    'example',
    'part',
    'house',
    'head start',
    'credit card',
    'fl oz',
    'ad hominem',
    'us dollar'
  ],
  //family-terms are people
  Person: [
    'father',
    'mother',
    'mom',
    'dad',
    'mommy',
    'daddy',
    'sister',
    'brother',
    'aunt',
    'uncle',
    'grandfather',
    'grandmother',
    'cousin',
    'stepfather',
    'stepmother',
    'boy',
    'girl',
    'man',
    'men',
    'woman',
    'women',
    'guy',
    'dude',
    'bro',
    'gentleman',
    'someone'
  ]
};
//unpack the compact terms into the misc lexicon..
const keys = Object.keys(compact);
for (let i = 0; i < keys.length; i++) {
  const arr = compact[keys[i]];
  for (let i2 = 0; i2 < arr.length; i2++) {
    misc[arr[i2]] = keys[i];
  }
}
module.exports = misc;
// console.log(misc.very);
