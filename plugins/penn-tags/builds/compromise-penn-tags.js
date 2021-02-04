/* compromise-penn-tags 0.0.1 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromisePennTags = factory());
}(this, (function () { 'use strict';

  // order here matters
  var mapping = [// adverbs
  ['Comparative', 'RBR'], ['Superlative', 'RBS'], ['Adverb', 'RB'], // adjectives
  ['Comparative', 'JJR'], ['Superlative', 'JJS'], ['Adjective', 'JJ'], ['TO', 'Conjunction'], // verbs
  ['Modal', 'MD'], ['Auxiliary', 'MD'], ['Gerund', 'VBG'], //throwing
  ['PastTense', 'VBD'], //threw
  ['Participle', 'VBN'], //thrown
  ['Infinitive', 'VBP'], //throw
  ['PresentTense', 'VBZ'], //throws
  ['Particle', 'RP'], //phrasal particle
  ['Verb', 'VB'], // throw
  // pronouns
  ['Possessive', 'POS'], ['Pronoun', 'PRP'], // misc
  ['Cardinal', 'CD'], ['Conjunction', 'CC'], ['Determiner', 'DT'], ['Preposition', 'IN'], ['Determiner', 'WDT'], ['Expression', 'FW'], ['QuestionWord', 'WP'], ['Expression', 'UH'], //nouns
  ['ProperNoun', 'NNP'], ['Person', 'NNP'], ['Place', 'NNP'], ['Organization', 'NNP'], // ['ProperNoun', 'NNPS'],
  ['Plural', 'NNS'], ['Noun', 'NN'] // ['Noun', 'EX'], //'there'
  // ['Adverb', 'WRB'],
  // ['Noun', 'PDT'], //predeterminer
  // ['Noun', 'SYM'], //symbol
  // ['Noun', 'NFP'], //
  ];
  var tags = mapping;

  var mapping$1 = tags.reduce(function (h, a) {
    h[a[0]] = a[1];
    return h;
  }, {});

  var addMethods = function addMethods(Doc) {
    Doc.prototype.pennTags = function () {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      opts.terms = opts.terms || {};
      opts.terms.bestTag = true;
      var json = this.json(opts);
      return json.map(function (obj) {
        obj.terms = obj.terms.map(function (o) {
          var penn = mapping$1[o.bestTag];

          if (!penn) {
            var found = o.tags.find(function (tag) {
              return mapping$1[tag];
            });
            penn = mapping$1[found];
          }

          return {
            text: o.text,
            penn: penn,
            tags: o.tags
          };
        });
        return obj;
      });
    };
  };

  var src = addMethods;

  return src;

})));
//# sourceMappingURL=compromise-penn-tags.js.map
