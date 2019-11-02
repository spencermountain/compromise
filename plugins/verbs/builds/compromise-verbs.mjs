// turn 'would not really walk up' into parts
const parseVerb = function(vb) {
  let parsed = {
    adverb: vb.match('#Adverb+'), // 'really'
    negative: vb.match('#Negative'), // 'not'
    auxiliary: vb.match('#Auxiliary').not('(#Negative|#Adverb)'), // 'will' of 'will go'
    particle: vb.match('#Particle'), // 'up' of 'pull up'
    verb: vb.match('#Verb').not('(#Adverb|#Negative|#Auxiliary|#Particle)'),
  };
  return parsed
};
var parse = parseVerb;

// walked => walk  - turn a verb into it's root form
const toInfinitive = function(parsed, world) {
  let verb = parsed.verb;

  //1. if it's already infinitive
  let str = verb.out('normal');
  if (verb.has('#Infinitive')) {
    return str
  }

  // 2. world transform does the heavy-lifting
  let tense = null;
  if (verb.has('#PastTense')) {
    tense = 'PastTense';
  } else if (verb.has('#Gerund')) {
    tense = 'Gerund';
  } else if (verb.has('#PresentTense')) {
    tense = 'PresentTense';
  } else if (verb.has('#Participle')) {
    tense = 'Participle';
  } else if (verb.has('#Actor')) {
    tense = 'Actor';
  }
  return world.transforms.toInfinitive(str, world, tense)
};
var toInfinitive_1 = toInfinitive;

// spencer walks -> singular
// we walk -> plural

// the most-recent noun-phrase, before this verb.
const findNoun = function(vb) {
  let noun = vb.lookBehind('#Noun+').last();
  return noun
};

//sometimes you can tell if a verb is plural/singular, just by the verb
// i am / we were
// othertimes you need its subject 'we walk' vs 'i walk'
const isPlural = function(parsed) {
  let vb = parsed.verb;
  if (vb.has('(are|were|does)') || parsed.auxiliary.has('(are|were|does)')) {
    return true
  }
  if (vb.has('(is|am|do|was)') || parsed.auxiliary.has('(is|am|do|was)')) {
    return false
  }
  //consider its prior noun
  let noun = findNoun(vb);
  if (noun.has('(we|they|you)')) {
    return true
  }
  if (noun.has('#Plural')) {
    return true
  }
  if (noun.has('#Singular')) {
    return false
  }
  return null
};
var isPlural_1 = isPlural;

/** too many special cases for is/was/will be*/
const toBe = parsed => {
  let plural = isPlural_1(parsed);
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
  if (plural) {
    obj.PastTense = 'were';
    obj.PresentTense = 'are';
    obj.Infinitive = 'are';
  }
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
  // console.log(infinitive)
  let forms = world.transforms.conjugate(infinitive, world);
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
  let vb = parsed.verb;
  // if it's already negative...
  if (parsed.negative.found) {
    return
  }

  // would walk -> would not walk
  if (parsed.auxiliary.found) {
    parsed.auxiliary.eq(0).append('not');
    return
  }
  // is walking -> is not walking
  if (vb.has('(#Copula|will|has|had|do)')) {
    vb.append('not');
    return
  }
  // walked -> did not walk
  if (vb.has('#PastTense')) {
    let inf = toInfinitive_1(parsed, world);
    vb.replace(inf);
    vb.prepend('did not');
    return
  }
  // walks -> does not walk
  if (vb.has('#PresentTense')) {
    let inf = toInfinitive_1(parsed, world);
    vb.replace(inf);
    if (isPlural_1(parsed)) {
      vb.prepend('do not');
    } else {
      vb.prepend('does not');
    }
    return
  }
  //walking -> not walking
  if (vb.has('#Gerund')) {
    let inf = toInfinitive_1(parsed, world);
    vb.replace(inf);
    vb.prepend('not');
    return
  }

  //fallback 1:  walk -> does not walk
  if (isPlural_1(parsed)) {
    vb.prepend('does not');
    return
  }
  //fallback 2:  walk -> do not walk
  vb.prepend('do not');
  return
};
var toNegative_1 = toNegative;

/** return only verbs with 'not'*/
var isNegative = function() {
  return this.if('#Negative')
};

/**  return only verbs without 'not'*/
var isPositive = function() {
  return this.ifNo('#Negative')
};

/** add a 'not' to these verbs */
var toNegative_1$1 = function() {
  this.list.forEach(p => {
    let doc = this.buildFrom([p]);
    let parsed = parse(doc);
    toNegative_1(parsed, doc.world);
  });
  return this
};

/** remove 'not' from these verbs */
var toPositive = function() {
  return this.remove('#Negative')
};

var methods = {
	isNegative: isNegative,
	isPositive: isPositive,
	toNegative: toNegative_1$1,
	toPositive: toPositive
};

/** */
var isPlural_1$1 = function() {
  let list = [];
  this.forEach(vb => {
    let parsed = parse(vb);
    if (isPlural_1(parsed, this.world) === true) {
      list.push(vb.list[0]);
    }
  });
  return this.buildFrom(list)
};
/** */
var isSingular = function() {
  let list = [];
  this.forEach(vb => {
    let parsed = parse(vb);
    if (isPlural_1(parsed, this.world) === false) {
      list.push(vb.list[0]);
    }
  });
  return this.buildFrom(list)
};

var methods$1 = {
	isPlural: isPlural_1$1,
	isSingular: isSingular
};

/**  */
// exports.tenses = function() {
// }
//

/**  */
var conjugate_1$1 = function() {
  let result = [];
  this.forEach(vb => {
    let parsed = parse(vb);
    let forms = conjugate_1(parsed, this.world);
    result.push(forms);
  });
  return result
};
/** */
var toPastTense = function() {
  this.forEach(vb => {
    let parsed = parse(vb);
    let str = conjugate_1(parsed, this.world).PastTense;
    vb.replace(str);
  });
  return this
};
/** */
var toPresentTense = function() {
  this.forEach(vb => {
    let parsed = parse(vb);
    let str = conjugate_1(parsed, this.world).PresentTense;
    vb.replace(str);
  });
  return this
};
/** */
var toFutureTense = function() {
  this.forEach(vb => {
    let parsed = parse(vb);
    let inf = toInfinitive_1(parsed, this.world);
    vb.replace('will ' + inf); //not smart.
  });
  return this
};
/** */
var toInfinitive_1$1 = function() {
  this.forEach(vb => {
    let parsed = parse(vb);
    let inf = toInfinitive_1(parsed, this.world);
    vb.replace(inf);
  });
  return this
};
/** */
var toGerund = function() {
  this.forEach(vb => {
    let parsed = parse(vb);
    let str = conjugate_1(parsed, this.world).Gerund;
    vb.replace(str);
  });
  return this
};
/** */
// exports.asAdjective=function(){}

var methods$2 = {
	conjugate: conjugate_1$1,
	toPastTense: toPastTense,
	toPresentTense: toPresentTense,
	toFutureTense: toFutureTense,
	toInfinitive: toInfinitive_1$1,
	toGerund: toGerund
};

const methods$3 = [
  methods,
  methods$1,
  methods$2,
];

const addMethod = function(Doc) {
  /**  */
  class Verbs extends Doc {
    constructor(list, from, world) {
      super(list, from, world);
    }

    /** overload the original json with verb information */
    json(options) {
      let n = null;
      if (typeof options === 'number') {
        n = options;
        options = null;
      }
      options = options || { text: true, normal: true, trim: true, terms: true };
      let res = [];
      this.forEach(p => {
        let json = p.json(options)[0];
        let parsed = parse(p);
        json.parts = {};
        Object.keys(parsed).forEach(k => {
          json.parts[k] = parsed[k].text('normal');
        });
        json.isNegative = p.has('#Negative');
        json.conjugations = conjugate_1(parsed, this.world);
        res.push(json);
      });
      if (n !== null) {
        return res[n]
      }
      return res
    }

    /** grab the adverbs describing these verbs */
    adverbs() {
      let list = [];
      this.forEach(vb => {
        let advb = parse(vb).adverb;
        if (advb.found) {
          list = list.concat(advb.list);
        }
      });
      return this.buildFrom(list)
    }
  }

  // add-in our methods
  methods$3.forEach(obj => Object.assign(Verbs.prototype, obj));

  // aliases
  Verbs.prototype.negate = Verbs.prototype.toNegative;

  Doc.prototype.verbs = function(n) {
    let match = this.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+');
    // handle commas
    match = match.splitAfter('@hasComma');
    // match = match.clauses()
    //handle slashes?
    // match = match.splitAfter('@hasSlash')
    //ensure there's actually a verb
    match = match.if('#Verb'); //this could be smarter
    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n);
    }
    let vb = new Verbs(match.list, this, this.world);
    // this.before(match).debug()
    return vb
  };
  return Doc
};
var src = addMethod;

export default src;
