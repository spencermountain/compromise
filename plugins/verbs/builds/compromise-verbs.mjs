//rules for turning a verb into infinitive form
let rules = {
  Participle: [
    {
      reg: /own$/i,
      to: 'ow',
    },
    {
      reg: /(.)un([g|k])$/i,
      to: '$1in$2',
    },
  ],

  Actor: [
    {
      reg: /(er)er$/i,
      to: '$1',
    },
  ],

  PresentTense: [
    {
      reg: /(..)(ies)$/i,
      to: '$1y',
    },
    {
      reg: /(tch|sh)es$/i,
      to: '$1',
    },
    {
      reg: /(ss|zz)es$/i,
      to: '$1',
    },
    {
      reg: /([tzlshicgrvdnkmu])es$/i,
      to: '$1e',
    },
    {
      reg: /(n[dtk]|c[kt]|[eo]n|i[nl]|er|a[ytrl])s$/i,
      to: '$1',
    },
    {
      reg: /(ow)s$/i,
      to: '$1',
    },
    {
      reg: /(op)s$/i,
      to: '$1',
    },
    {
      reg: /([eirs])ts$/i,
      to: '$1t',
    },
    {
      reg: /(ll)s$/i,
      to: '$1',
    },
    {
      reg: /(el)s$/i,
      to: '$1',
    },
    {
      reg: /(ip)es$/i,
      to: '$1e',
    },
    {
      reg: /ss$/i,
      to: 'ss',
    },
    {
      reg: /s$/i,
      to: '',
    },
  ],

  Gerund: [
    {
      reg: /pping$/i,
      to: 'p',
    },
    {
      reg: /lling$/i,
      to: 'll',
    },
    {
      reg: /tting$/i,
      to: 't',
    },
    {
      reg: /dding$/i,
      to: 'd',
    },
    {
      reg: /ssing$/i,
      to: 'ss',
    },
    {
      reg: /(..)gging$/i,
      to: '$1g',
    },
    {
      reg: /([^aeiou])ying$/i,
      to: '$1y',
    },
    {
      reg: /([^ae]i.)ing$/i,
      to: '$1e',
    },
    {
      reg: /(ea.)ing$/i,
      to: '$1',
    },
    {
      reg: /(u[rtcb]|[bdtpkg]l|n[cg]|a[gdkvtc]|[ua]s|[dr]g|yz|o[rlsp]|cre)ing$/i,
      to: '$1e',
    },
    {
      reg: /(ch|sh)ing$/i,
      to: '$1',
    },
    {
      reg: /(..)ing$/i,
      to: '$1',
    },
  ],

  PastTense: [
    {
      reg: /(ued)$/i,
      to: 'ue',
    },
    {
      reg: /a([^aeiouy])ed$/i,
      to: 'a$1e',
    },
    {
      reg: /([aeiou]zz)ed$/i,
      to: '$1',
    },
    {
      reg: /(e|i)lled$/i,
      to: '$1ll',
    },
    {
      reg: /(.)(sh|ch)ed$/i,
      to: '$1$2',
    },
    {
      reg: /(tl|gl)ed$/i,
      to: '$1e',
    },
    {
      reg: /(um?pt?)ed$/i,
      to: '$1',
    },
    {
      reg: /(ss)ed$/i,
      to: '$1',
    },
    {
      reg: /pped$/i,
      to: 'p',
    },
    {
      reg: /tted$/i,
      to: 't',
    },
    {
      reg: /(..)gged$/i,
      to: '$1g',
    },
    {
      reg: /(..)lked$/i,
      to: '$1lk',
    },
    {
      reg: /([^aeiouy][aeiou])ked$/i,
      to: '$1ke',
    },
    {
      reg: /(.[aeiou])led$/i,
      to: '$1l',
    },
    {
      reg: /(..)(h|ion|n[dt]|ai.|[cs]t|pp|all|ss|tt|int|ail|ld|en|oo.|er|k|pp|w|ou.|rt|ght|rm)ed$/i,
      to: '$1$2',
    },
    {
      reg: /(.ut)ed$/i,
      to: '$1e',
    },
    {
      reg: /(.pt)ed$/i,
      to: '$1',
    },
    {
      reg: /(us)ed$/i,
      to: '$1e',
    },
    {
      reg: /(..[^aeiouy])ed$/i,
      to: '$1e',
    },
    {
      reg: /(..)ied$/i,
      to: '$1y',
    },
    {
      reg: /(.o)ed$/i,
      to: '$1o',
    },
    {
      reg: /(..i)ed$/i,
      to: '$1',
    },
    {
      reg: /(.a[^aeiou])ed$/i,
      to: '$1',
    },
    {
      reg: /([rl])ew$/i,
      to: '$1ow',
    },
    {
      reg: /([pl])t$/i,
      to: '$1t',
    },
  ],
};
var _rules = rules;

let guessVerb = {
  Gerund: ['ing'],
  Actor: ['erer'],
  Infinitive: [
    'ate',
    'ize',
    'tion',
    'rify',
    'then',
    'ress',
    'ify',
    'age',
    'nce',
    'ect',
    'ise',
    'ine',
    'ish',
    'ace',
    'ash',
    'ure',
    'tch',
    'end',
    'ack',
    'and',
    'ute',
    'ade',
    'ock',
    'ite',
    'ase',
    'ose',
    'use',
    'ive',
    'int',
    'nge',
    'lay',
    'est',
    'ain',
    'ant',
    'ent',
    'eed',
    'er',
    'le',
    'own',
    'unk',
    'ung',
    'en',
  ],
  PastTense: ['ed', 'lt', 'nt', 'pt', 'ew', 'ld'],
  PresentTense: [
    'rks',
    'cks',
    'nks',
    'ngs',
    'mps',
    'tes',
    'zes',
    'ers',
    'les',
    'acks',
    'ends',
    'ands',
    'ocks',
    'lays',
    'eads',
    'lls',
    'els',
    'ils',
    'ows',
    'nds',
    'ays',
    'ams',
    'ars',
    'ops',
    'ffs',
    'als',
    'urs',
    'lds',
    'ews',
    'ips',
    'es',
    'ts',
    'ns',
  ],
};
//flip it into a lookup object
guessVerb = Object.keys(guessVerb).reduce((h, k) => {
  guessVerb[k].forEach(a => (h[a] = k));
  return h
}, {});
var _guess = guessVerb;

/** it helps to know what we're conjugating from */
const pickTense = function(verb) {
  // 1. decide from known-tags
  if (verb.has('#PastTense')) {
    return 'PastTense'
  } else if (verb.has('#Gerund')) {
    return 'Gerund'
  } else if (verb.has('#PresentTense')) {
    return 'PresentTense'
  } else if (verb.has('#Participle')) {
    return 'Participle'
  } else if (verb.has('#Actor')) {
    return 'Actor'
  }
  // 2. guess a little-bit
  let str = verb.out('normal');
  let three = str.substr(str.length - 3);
  if (_guess.hasOwnProperty(three) === true) {
    return _guess[three]
  }
  let two = str.substr(str.length - 2);
  if (_guess.hasOwnProperty(two === true)) {
    return _guess[two]
  }
  let one = str.substr(str.length - 1);
  if (one === 's') {
    return 'PresentTense'
  }
  return null
};
var pickTense_1 = pickTense;

const toInfinitive = function(parsed, world) {
  let verb = parsed.verb;

  //1. if it's already infinitive
  let str = verb.out('normal');
  if (verb.has('#Infinitive')) {
    return str
  }
  //2. look at known irregulars
  if (world.lexicon.hasOwnProperty(str) === true) {
    let irregs = world.irregulars.verbs;
    let keys = Object.keys(irregs);
    for (let i = 0; i < keys.length; i++) {
      let forms = Object.keys(irregs[keys[i]]);
      for (let o = 0; o < forms.length; o++) {
        if (str === irregs[keys[i]][forms[o]]) {
          return keys[i]
        }
      }
    }
  }
  //3. look at our rules
  let tense = pickTense_1(verb);
  if (tense && _rules[tense]) {
    for (let i = 0; i < _rules[tense].length; i++) {
      const rule = _rules[tense][i];
      if (rule.reg.test(str) === true) {
        return str.replace(rule.reg, rule.to)
      }
    }
  }
  // fallback
  return str
};
var toInfinitive_1 = toInfinitive;

/** too many special cases for is/was/will be*/
const toBe = parsed => {
  let isNegative = parsed.negative.found;
  //account for 'i is' -> 'i am' irregular
  // if (vb.parent && vb.parent.has('i #Adverb? #Copula')) {
  //   isI = true;
  // }

  let obj = {
    PastTense: 'was',
    PresentTense: 'is',
    FutureTense: 'will be',
    Infinitive: 'is',
    Gerund: 'being',
    Actor: '',
    PerfectTense: 'been',
    Pluperfect: 'been',
  };
  if (isNegative) {
    obj.PastTense += ' not';
    obj.PresentTense += ' not';
    obj.FutureTense = 'will not be';
    obj.Infinitive += ' not';
    obj.PerfectTense = 'not ' + obj.PerfectTense;
    obj.Pluperfect = 'not ' + obj.Pluperfect;
    obj.Gerund = 'not ' + obj.Gerund;
  }
  return obj
};
var toBe_1 = toBe;

const conjugate = function(parsed, world) {
  let verb = parsed.verb;

  //special handling of 'is', 'will be', etc.
  if (verb.has('#Copula') || (verb.out('normal') === 'be' && parsed.auxiliary.has('will'))) {
    return toBe_1(parsed)
  }

  let infinitive = toInfinitive_1(parsed, world);
  let forms = world.transforms.verbs(infinitive, world);
  forms.Infinitive = infinitive;

  //apply negative
  const isNegative = parsed.negative.found;
  if (isNegative) {
    forms.PastTense = 'did not ' + forms.Infinitive;
    forms.PresentTense = 'does not ' + forms.Infinitive;
    forms.Gerund = 'not ' + forms.Gerund;
  }
  //future Tense is pretty straightforward
  if (!forms.FutureTense) {
    if (isNegative) {
      forms.FutureTense = 'will not ' + forms.Infinitive;
    } else {
      forms.FutureTense = 'will ' + forms.Infinitive;
    }
  }
  if (isNegative) {
    forms.Infinitive = 'not ' + forms.Infinitive;
  }
  return forms
};
var conjugate_1 = conjugate;

// #Modal : would walk    -> 'would not walk'
// #Copula : is           -> 'is not'
// #PastTense : walked    -> did not walk
// #PresentTense : walks  -> does not walk
// #Gerund : walking:     -> not walking
// #Infinitive : walk     -> do not walk

const toNegative = function(parsed, world) {
  // if it's already negative...
  if (parsed.negative.found) {
    return
  }

  // would walk -> would not walk
  if (parsed.auxiliary.found) {
    parsed.auxiliary.append('not');
    return
  }
  // is walking -> is not walking
  if (parsed.verb.has('#Copula')) {
    parsed.verb.append('not');
    return
  }
};
var toNegative_1 = toNegative;

// turn 'would not really walk up' into parts
const parseVerb = function(vb) {
  return {
    adverb: vb.match('#Adverb+'), // 'really'
    negative: vb.match('#Negative'), // 'not'
    auxiliary: vb.match('#Auxiliary'), // 'will' of 'will go'
    particle: vb.match('#Particle'), // 'up' of 'pull up'
    verb: vb.match('#Verb').not('(#Adverb|#Negative|#Auxiliary|#Particle)'),
  }
};

const addMethod = function(Doc) {
  /**  */
  class Verbs extends Doc {
    constructor(list, from, world) {
      super(list, from, world);
    }

    /** grab the adverbs describing these verbs */
    adverbs() {
      let list = [];
      this.forEach(vb => {
        let advb = parseVerb(vb).adverb;
        if (advb.found) {
          list = list.concat(advb.list);
        }
      });
      return this.buildFrom(list)
    }
    /** */
    // conjugation(){}
    /** */
    conjugations() {
      let result = [];
      this.forEach(vb => {
        let parsed = parseVerb(vb);
        let forms = conjugate_1(parsed, this.world);
        result.push(forms);
      });
      return result
    }
    /** */
    // isPlural(){}
    /** */
    // isSingular(){}

    /** return only verbs with 'not'*/
    isNegative() {
      return this.if('#Negative')
    }
    /**  return only verbs without 'not'*/
    isPositive() {
      return this.ifNo('#Negative')
    }
    /** add a 'not' to these verbs */
    toNegative() {
      // not native forEach!
      this.list.forEach(p => {
        let doc = this.buildFrom([p]);
        let parsed = parseVerb(doc);
        toNegative_1(parsed, doc.world);
      });
      return this
    }
    /** remove 'not' from these verbs */
    toPositive() {
      return this.remove('#Negative')
    }
    /** */
    toPastTense() {
      let transforms = this.world.transforms;
      return this.map(vb => {
        let verb = parseVerb(vb).verb;
        let str = verb.out('normal');
        let past = transforms.verbs(str).PastTense;
        if (past) {
          let p = vb.list[0];
          // console.log(p.buildFrom)
          // let p = vb.buildP
          // console.log(vb.list[0].replace(past))
          return vb //.replaceWith(past, this)
        }
        return vb
      })
    }
    /** */
    // toPresentTense(){}
    /** */
    // toFutureTense(){}
    /** */
    // toInfinitive(){}
    /** */
    // toGerund(){}
    /** */
    // asAdjective(){}
  }

  Doc.prototype.verbs = function(n) {
    let match = this.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+');
    // handle commas
    // match = match.splitAfter('!#Adverb @hasComma')
    //handle slashes?
    // match = match.splitAfter('@hasSlash')
    //ensure there's actually a verb
    match = match.if('#Verb'); //this could be smarter
    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n);
    }
    let vb = new Verbs(match.list, this, this.world);
    return vb
  };
  return Doc
};
var src = addMethod;

export default src;
