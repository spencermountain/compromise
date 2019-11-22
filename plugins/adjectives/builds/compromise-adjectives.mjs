//turn 'quick' into 'quickly'
const not_matches = [/airs$/, /ll$/, /ee.$/, /ile$/, /y$/];

const irregulars = {
  bad: 'badly',
  good: 'well',
  icy: 'icily',
  idle: 'idly',
  male: 'manly',
  public: 'publicly',
  simple: 'simply',
  single: 'singly',
  special: 'especially',
  straight: 'straight',
  vague: 'vaguely',
  whole: 'wholly',
};
const dontChange = ['best', 'early', 'hard', 'fast', 'wrong', 'well', 'late', 'latter', 'little', 'long', 'low'].reduce(
  (h, c) => {
    h[c] = true;
    return h
  },
  {}
);

const transforms = [
  {
    reg: /al$/i,
    repl: 'ally',
  },
  {
    reg: /ly$/i,
    repl: 'ly',
  },
  {
    reg: /(.{3})y$/i,
    repl: '$1ily',
  },
  {
    reg: /que$/i,
    repl: 'quely',
  },
  {
    reg: /ue$/i,
    repl: 'uly',
  },
  {
    reg: /ic$/i,
    repl: 'ically',
  },
  {
    reg: /ble$/i,
    repl: 'bly',
  },
  {
    reg: /l$/i,
    repl: 'ly',
  },
];

const adj_to_adv = function(str) {
  if (irregulars.hasOwnProperty(str) === true) {
    return irregulars[str]
  }
  if (dontChange.hasOwnProperty(str) === true) {
    return str
  }
  for (let i = 0; i < not_matches.length; i++) {
    if (not_matches[i].test(str) === true) {
      return null
    }
  }
  for (let i = 0; i < transforms.length; i++) {
    if (transforms[i].reg.test(str) === true) {
      return str.replace(transforms[i].reg, transforms[i].repl)
    }
  }
  return str + 'ly'
};

var toAdverb = adj_to_adv;

//convert 'cute' to 'cuteness'
const irregulars$1 = {
  clean: 'cleanliness',
  naivety: 'naivety',
  hurt: 'hurt',
};

const transforms$1 = [
  {
    reg: /y$/,
    repl: 'iness',
  },
  {
    reg: /le$/,
    repl: 'ility',
  },
  {
    reg: /ial$/,
    repl: 'y',
  },
  {
    reg: /al$/,
    repl: 'ality',
  },
  {
    reg: /ting$/,
    repl: 'ting',
  },
  {
    reg: /ring$/,
    repl: 'ring',
  },
  {
    reg: /bing$/,
    repl: 'bingness',
  },
  {
    reg: /sing$/,
    repl: 'se',
  },
  {
    reg: /ing$/,
    repl: 'ment',
  },
  {
    reg: /ess$/,
    repl: 'essness',
  },
  {
    reg: /ous$/,
    repl: 'ousness',
  },
];

const to_noun = function(w) {
  if (irregulars$1.hasOwnProperty(w)) {
    return irregulars$1[w]
  }
  const lastChar = w.charAt(w.length - 1);
  if (lastChar === 'w' || lastChar === 's') {
    return null
  }
  for (let i = 0; i < transforms$1.length; i++) {
    if (transforms$1[i].reg.test(w) === true) {
      return w.replace(transforms$1[i].reg, transforms$1[i].repl)
    }
  }
  return w + 'ness'
};

var toNoun = to_noun;

//turn an adjective like 'soft' into a verb like 'soften'
//(don't do words like 'green' -> 'greenen')

//these are suffices that are usually too weird
let dontDo = ['c', 'e', 'g', 'l', 'n', 'r', 'w', 'y'].reduce((h, c) => {
  h[c] = true;
  return h
}, {});

const dontDoTwo = { ed: true, nt: true };

const blacklist = {
  random: true,
  wild: true,
};

const irregulars$2 = {
  bored: 'bore',
  red: 'redden',
  sad: 'sadden',
  fat: 'fatten',
  small: 'shrink',
  full: 'fill',
  tired: 'tire',
};

const toVerb = str => {
  if (irregulars$2.hasOwnProperty(str) === true) {
    return irregulars$2[str]
  }
  //don't bother with these:
  if (str.length <= 3) {
    return null
  }
  if (blacklist.hasOwnProperty(str) === true) {
    return null
  }
  //suffixes to avoid
  if (dontDo.hasOwnProperty(str[str.length - 1])) {
    return null
  }
  let suffix = str.substr(str.length - 2);
  if (dontDoTwo.hasOwnProperty(suffix) === true) {
    return null
  }

  if (/e$/.test(str) === true) {
    return str + 'n'
  }
  return str + 'en'
};
var toVerb_1 = toVerb;

const addMethods = function(Doc) {
  /**  */
  class Adjective extends Doc {
    /** overload the original json with noun information */
    json(options) {
      let n = null;
      if (typeof options === 'number') {
        n = options;
        options = null;
      }
      let res = [];
      this.forEach(doc => {
        let json = doc.json(options)[0];
        let str = doc.text('reduced');
        json.toAdverb = toAdverb(str);
        json.toNoun = toNoun(str);
        json.toVerb = toVerb_1(str);
        res.push(json);
      });
      if (n !== null) {
        return res[n]
      }
      return res
    }
    conjugate(n) {
      let transform = this.world.transforms.adjectives;
      let arr = [];
      this.forEach(doc => {
        let str = doc.text('reduced');
        let obj = transform(str);
        obj.Adverb = toAdverb(str);
        obj.Noun = toNoun(str);
        obj.Verb = toVerb_1(str);
        arr.push(obj);
      });
      //support nth result
      if (typeof n === 'number') {
        return arr[n]
      }
      return arr
    }

    toSuperlative() {
      let transform = this.world.transforms.adjectives;
      this.forEach(doc => {
        let obj = transform(doc.text('reduced'));
        doc.replaceWith(obj.Superlative, true);
      });
      return this
    }
    toComparative() {
      let transform = this.world.transforms.adjectives;
      this.forEach(doc => {
        let obj = transform(doc.text('reduced'));
        doc.replaceWith(obj.Comparative, true);
      });
      return this
    }
    toAdverb() {
      this.forEach(doc => {
        let adverb = toAdverb(doc.text('reduced'));
        doc.replaceWith(adverb, true);
      });
      return this
    }
    toVerb() {
      this.forEach(doc => {
        let verb = toVerb_1(doc.text('reduced'));
        doc.replaceWith(verb, true);
      });
      return this
    }
    toNoun() {
      this.forEach(doc => {
        let noun = toNoun(doc.text('reduced'));
        doc.replaceWith(noun, true);
      });
      return this
    }
  }

  /** grab all the adjectives */
  Doc.prototype.adjectives = function(n) {
    let m = this.match('#Adjective');
    //grab (n)th result
    if (typeof n === 'number') {
      m = m.get(n);
    }
    return new Adjective(m.list, this, this.world)
  };
};
var src = addMethods;

export default src;
