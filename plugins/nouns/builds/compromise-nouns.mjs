const noPlural =
  '(#Pronoun|#Place|#Value|#Person|#Uncountable|#Month|#WeekDay|#Holiday|#Possessive)';

//certain words can't be plural, like 'peace'
const hasPlural = function(doc) {
  if (doc.has('#Plural') === true) {
    return true
  }
  // these can't be plural
  if (doc.has(noPlural) === true) {
    return false
  }
  return true
};

var hasPlural_1 = hasPlural;

//chooses an indefinite aricle 'a/an' for a word
const irregulars = {
  hour: 'an',
  heir: 'an',
  heirloom: 'an',
  honest: 'an',
  honour: 'an',
  honor: 'an',
  uber: 'an', //german u
};
//pronounced letters of acronyms that get a 'an'
const an_acronyms = {
  a: true,
  e: true,
  f: true,
  h: true,
  i: true,
  l: true,
  m: true,
  n: true,
  o: true,
  r: true,
  s: true,
  x: true,
};
//'a' regexes
const a_regexs = [
  /^onc?e/i, //'wu' sound of 'o'
  /^u[bcfhjkqrstn][aeiou]/i, // 'yu' sound for hard 'u'
  /^eul/i,
];

const makeArticle = function(doc) {
  //no 'the john smith', but 'a london hotel'
  if (doc.has('#Person') || doc.has('#Place')) {
    return ''
  }
  //no a/an if it's plural
  if (doc.has('#Plural')) {
    return 'the'
  }
  let str = doc.text('normal').trim();
  //explicit irregular forms
  if (irregulars.hasOwnProperty(str)) {
    return irregulars[str]
  }
  //spelled-out acronyms
  let firstLetter = str.substr(0, 1);
  if (doc.has('^@isAcronym') && an_acronyms.hasOwnProperty(firstLetter)) {
    return 'an'
  }
  //'a' regexes
  for (let i = 0; i < a_regexs.length; i++) {
    if (a_regexs[i].test(str)) {
      return 'a'
    }
  }
  //basic vowel-startings
  if (/^[aeiou]/i.test(str)) {
    return 'an'
  }
  return 'a'
};

var getArticle = makeArticle;

//similar to plural/singularize rules, but not the same
const isPlural = [
  /(antenn|formul|nebul|vertebr|vit)ae$/i,
  /(octop|vir|radi|nucle|fung|cact|stimul)i$/i,
  /men$/i,
  /.tia$/i,
  /(m|l)ice$/i,
];

//similar to plural/singularize rules, but not the same
const isSingular = [
  /(ax|test)is$/i,
  /(octop|vir|radi|nucle|fung|cact|stimul)us$/i,
  /(octop|vir)i$/i,
  /(rl)f$/i,
  /(alias|status)$/i,
  /(bu)s$/i,
  /(al|ad|at|er|et|ed|ad)o$/i,
  /(ti)um$/i,
  /(ti)a$/i,
  /sis$/i,
  /(?:(^f)fe|(lr)f)$/i,
  /hive$/i,
  /(^aeiouy|qu)y$/i,
  /(x|ch|ss|sh|z)$/i,
  /(matr|vert|ind|cort)(ix|ex)$/i,
  /(m|l)ouse$/i,
  /(m|l)ice$/i,
  /(antenn|formul|nebul|vertebr|vit)a$/i,
  /.sis$/i,
  /^(?!talis|.*hu)(.*)man$/i,
];
var _rules = {
  isSingular: isSingular,
  isPlural: isPlural,
};

const endS = /s$/;
// double-check this term, if it is not plural, or singular.
// (this is a partial copy of ./tagger/fallbacks/plural)
// fallback plural if it ends in an 's'.
const isPlural$1 = function(str) {
  // isSingular suffix rules
  if (_rules.isSingular.find(reg => reg.test(str))) {
    return false
  }
  // does it end in an s?
  if (endS.test(str) === true) {
    return true
  }
  // is it a plural like 'fungi'?
  if (_rules.isPlural.find(reg => reg.test(str))) {
    return true
  }
  return null
};
var isPlural_1 = isPlural$1;

const exceptions = {
  he: 'his',
  she: 'hers',
  they: 'theirs',
  we: 'ours',
  i: 'mine',
  you: 'yours',

  her: 'hers',
  their: 'theirs',
  our: 'ours',
  my: 'mine',
  your: 'yours',
};

// turn "David" to "David's"
const toPossessive = function(doc) {
  let str = doc.text('text').trim();
  // exceptions
  if (exceptions.hasOwnProperty(str)) {
    doc.replaceWith(exceptions[str]);
    doc.tag('Possessive', 'toPossessive');
    return
  }
  // flanders'
  if (/s$/.test(str)) {
    str += "'";
    doc.replaceWith(str);
    doc.tag('Possessive', 'toPossessive');
    return
  }
  //normal form:
  str += "'s";
  doc.replaceWith(str);
  doc.tag('Possessive', 'toPossessive');
  return
};
var toPossessive_1 = toPossessive;

// .nouns() supports some noun-phrase-ish groupings
// pull these apart, if necessary
const parse = function(doc) {
  let res = {
    main: doc,
  };
  //support 'mayor of chicago' as one noun-phrase
  if (doc.has('#Noun (of|by|for) .')) {
    let m = doc.splitAfter('[#Noun+]');
    res.main = m.eq(0);
    res.post = m.eq(1);
  }
  return res
};
var parse_1 = parse;

const addMethod = function(Doc) {
  /**  */
  class Nouns extends Doc {
    /** overload the original json with noun information */
    json(options) {
      options = options || { text: true, normal: true, trim: true, terms: true };
      let res = [];
      this.forEach(doc => {
        let json = doc.json(options)[0];
        json.article = getArticle(doc);
        res.push(json);
      });
      return res
    }

    isPlural() {
      return this.if('#Plural') //assume tagger has run?
    }
    hasPlural() {
      return this.filter(d => hasPlural_1(d))
    }
    toPlural() {
      let toPlural = this.world.transforms.toPlural;
      this.forEach(doc => {
        if (doc.has('#Plural') || hasPlural_1(doc) === false) {
          return
        }
        // double-check it isn't an un-tagged plural
        let main = parse_1(doc).main;
        let str = main.text();
        if (!main.has('#Singular') && isPlural_1(str) === true) {
          return
        }
        str = toPlural(str, this.world);
        main.replace(str).tag('#Plural');
      });
      return this
    }
    toSingular() {
      let toSingular = this.world.transforms.toSingular;
      this.forEach(doc => {
        if (doc.has('#Singular') || hasPlural_1(doc) === false) {
          return
        }
        // double-check it isn't an un-tagged plural
        let main = parse_1(doc).main;
        let str = main.text();
        if (!main.has('#Plural') && isPlural_1(str) !== true) {
          return
        }
        str = toSingular(str, this.world);
        main.replace(str).tag('#Singular');
      });
      return this
    }
    toPossessive() {
      this.forEach(d => {
        toPossessive_1(d);
      });
      return this
    }
  }

  Doc.prototype.nouns = function(n) {
    let match = this.clauses();
    match = match.match('#Noun+ (of|by)? the? #Noun+?');
    //nouns that we don't want in these results, for weird reasons
    match = match.not('#Pronoun');
    match = match.not('(there|these)');
    match = match.not('(#Month|#WeekDay)'); //allow Durations, Holidays
    // //allow possessives like "spencer's", but not generic ones like,
    match = match.not('(my|our|your|their|her|his)');
    match = match.not('(of|for|by|the)$');

    // match = match.splitAfter('@hasComma')

    if (typeof n === 'number') {
      match = match.get(n);
    }
    return new Nouns(match.list, this, this.world)
  };
  return Doc
};
var src = addMethod;

export default src;
