const lexicon = require('./lexicon/init');
const tagset = require('./tagset');
const firstWords = require('./lexicon/firstWords');
const buildOut = require('./lexicon/buildOut');
const normalize = require('./term/methods/normalize/normalize').normalize;

//cleanup a directly-entered user lexicon.
//basically really dirty and stupid.
const normalizeLex = function(lex) {
  lex = lex || {};
  return Object.keys(lex).reduce((h, k) => {
    let normal = normalize(k);
    //normalize whitesace
    normal = normal.replace(/\s+/, ' ');
    //remove sentence-punctuaion too
    normal = normal.replace(/[.\?\!]/g, '');
    h[normal] = lex[k];
    return h;
  }, {});
};

//basically really dirty and stupid.
const unpackLex = function(lex) {
  lex = lex || {};
  if (typeof lex === 'string') {
    lex = JSON.parse(lex);
    lex = efrt.unpack(lex);
  } else {
    lex = normalizeLex(lex);
  }
  lex = buildOut(lex);
  return {
    lexicon: lex,
    firstWords: firstWords(lex)
  };
};

class World {
  constructor() {
    this.lexicon = lexicon.lexicon;
    this.firstWords = lexicon.firstWords;
    this.tagset = tagset;
  }
  addWords(lex) {
    lex = lex || {};
    let l = unpackLex(lex);
    lex = l.lexicon;
    //'upsert' into lexicon object
    Object.keys(lex).forEach(k => {
      this.lexicon[k] = lex[k];
    });
    //merge 'firstWord' cache-objects too
    let first = l.firstWords;
    Object.keys(first).forEach(k => {
      this.firstWords[k] = this.firstWords[k] || {};
      Object.keys(first[k]).forEach(str => {
        this.firstWords[k][str] = true;
      });
    });
  }
  clone() {}
}
module.exports = World;
